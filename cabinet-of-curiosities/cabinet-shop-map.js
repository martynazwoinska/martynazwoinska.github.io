/* Small local map renderer. Standard Web Mercator, browser-cached OSM tiles.
   Only currently visible tiles are requested, and only while the map is open. */
(() => {
  'use strict';
  window.createCabinetShopMap = (host, places, onSelect) => {
    host.innerHTML = '<div class="map-tiles" aria-hidden="true"></div><svg class="map-leaders" aria-hidden="true"></svg><div class="map-pins"></div><div class="map-controls"><button type="button" data-zoom="1" aria-label="Zoom in">+</button><button type="button" data-zoom="-1" aria-label="Zoom out">−</button><button type="button" class="map-fit">All shops</button></div><p class="map-current" aria-live="polite"></p><a class="map-tile-credit" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© OpenStreetMap contributors</a>';
    host.tabIndex = 0; host.setAttribute('role','region'); host.setAttribute('aria-label','Map of Uppsala chocolate shops. Use arrow keys to pan, plus and minus to zoom.');
    const tiles = host.querySelector('.map-tiles'), leaders = host.querySelector('.map-leaders'), pins = host.querySelector('.map-pins');
    const project = p => {
      const s = Math.sin(p.lat * Math.PI / 180);
      return [(p.lon + 180) / 360, .5 - Math.log((1+s)/(1-s))/(4*Math.PI)];
    };
    const points = places.map((p,i)=>({...p,number:i+1,point:project(p)}));
    let center = [0,0], zoom = 12, active = false, fitted = false, selected = points[0].id, frame = 0;
    const images = new Map();
    const buttons = points.map(p => {
      const b=document.createElement('button'); b.type='button'; b.className='map-pin'; b.textContent=p.number;
      b.dataset.place=p.id; b.setAttribute('aria-label',p.number+' '+p.name); b.title=p.name;
      b.addEventListener('click',()=>onSelect(p.id)); pins.append(b); return b;
    });
    function fit() {
      const xs=points.map(p=>p.point[0]), ys=points.map(p=>p.point[1]);
      const x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys);
      center=[(x0+x1)/2,(y0+y1)/2];
      zoom=Math.max(10,Math.min(16,Math.floor(Math.log2(Math.min((host.clientWidth-48)/((x1-x0)*256),(host.clientHeight-32)/((y1-y0)*256))))));
      fitted=true; render();
    }
    function render() {
      if(!active || !host.clientWidth) return;
      const w=host.clientWidth,h=host.clientHeight,scale=256*2**zoom;
      const left=center[0]*scale-w/2,top=center[1]*scale-h/2,needed=new Set();
      // Native image requests retain browser UA, Referer and normal HTTP caching.
      for(let x=Math.floor(left/256);x<=Math.floor((left+w-1)/256);x++) for(let y=Math.floor(top/256);y<=Math.floor((top+h-1)/256);y++) {
        if(x<0||y<0||x>=2**zoom||y>=2**zoom) continue;
        const key=zoom+'/'+x+'/'+y;needed.add(key);let img=images.get(key);
        if(!img){img=new Image(256,256);img.alt='';img.draggable=false;img.referrerPolicy='strict-origin-when-cross-origin';img.src='https://tile.openstreetmap.org/'+key+'.png';images.set(key,img);}
        if(!img.isConnected) tiles.append(img);
        img.style.left=(x*256-left)+'px';img.style.top=(y*256-top)+'px';
      }
      for(const [key,img] of images) if(!needed.has(key)) img.remove();
      // Keep only a modest in-memory pool; the browser owns the persistent cache.
      if(images.size>64) for(const key of images.keys()){if(!needed.has(key))images.delete(key);if(images.size<=48)break;}
      leaders.setAttribute('viewBox','0 0 '+w+' '+h);leaders.replaceChildren();
      const anchors=points.map((p,i)=>({p,i,x:p.point[0]*scale-left,y:p.point[1]*scale-top}));
      const visible=anchors.filter(a=>a.x>=0&&a.x<=w&&a.y>=0&&a.y<=h);
      const isolation=a=>Math.min(...visible.filter(b=>b!==a).map(b=>Math.hypot(a.x-b.x,a.y-b.y)));
      const placements=new Map();
      // Place the more isolated locations first, so a busy city-centre cluster
      // cannot push an outlying shop to the wrong side of town. Geographic dots
      // never move. Compact labels can move at most 40 CSS pixels from a dot.
      const ordered=[...visible].sort((a,b)=>isolation(b)-isolation(a)||a.i-b.i);
      const candidates=ordered.map(({x,y})=>{
        const options=[];
        for(let ring=0;ring<8;ring++)for(let n=0;n<(ring?24:1);n++){
          const a=n*Math.PI/12,cx=x+ring*8*Math.cos(a),cy=y-13+ring*8*Math.sin(a);
          const distance=Math.hypot(cx-x,cy-y);
          if(distance>40||cx<13||cx>w-13||cy<13||cy>h-25)continue;
          options.push([cx,cy]);
        }
        return options.length?options:[[x,y-13]];
      });
      // Reconsider nearby label choices instead of pushing the last shop far
      // away. The bounded search stays small for this eleven-stop collection.
      const chosen=[];let visits=0;
      const collides=(a,b)=>Math.abs(a[0]-b[0])<26&&Math.abs(a[1]-b[1])<26;
      function arrange(i){
        if(i===ordered.length)return true;
        for(const point of candidates[i]){
          if(++visits>20000)return false;
          if(chosen.some(other=>collides(point,other)))continue;
          chosen.push(point);if(arrange(i+1))return true;chosen.pop();
        }
        return false;
      }
      if(!arrange(0)){
        // At extreme zoom-out/pan, geography takes priority over label spacing.
        chosen.length=0;
        for(const options of candidates)chosen.push(options.find(point=>!chosen.some(other=>collides(point,other)))||options[0]);
      }
      ordered.forEach(({p},i)=>placements.set(p.id,chosen[i]));
      anchors.forEach(({p,i,x,y})=>{
        const b=buttons[i],position=placements.get(p.id);
        b.hidden=!position;if(!position)return;
        const [bx,by]=position;
        b.style.left=bx+'px';b.style.top=by+'px';b.setAttribute('aria-pressed',String(p.id===selected));
        const line=document.createElementNS('http://www.w3.org/2000/svg','path');
        line.setAttribute('d','M'+x+' '+y+'L'+bx+' '+by);line.setAttribute('class',p.id===selected?'is-selected':'');leaders.append(line);
        const dot=document.createElementNS('http://www.w3.org/2000/svg','circle');dot.setAttribute('cx',x);dot.setAttribute('cy',y);dot.setAttribute('r','2.5');leaders.append(dot);
      });
      host.dataset.zoom=zoom;
    }
    function schedule(){cancelAnimationFrame(frame);frame=requestAnimationFrame(render);}
    function changeZoom(delta){zoom=Math.max(10,Math.min(18,zoom+delta));render();}
    host.querySelectorAll('[data-zoom]').forEach(b=>b.addEventListener('click',()=>changeZoom(Number(b.dataset.zoom))));
    host.querySelector('.map-fit').addEventListener('click',fit);
    host.addEventListener('keydown',e=>{
      if(e.target!==host)return;
      const moves={ArrowLeft:[-70,0],ArrowRight:[70,0],ArrowUp:[0,-70],ArrowDown:[0,70]};
      if(moves[e.key]){e.preventDefault();center=center.map((v,i)=>v+moves[e.key][i]/(256*2**zoom));render();}
      else if(['+','=','-','Home'].includes(e.key)){e.preventDefault();e.key==='Home'?fit():changeZoom(e.key==='-'?-1:1);}
    });
    let drag=null;
    host.addEventListener('pointerdown',e=>{if(e.target.closest('button,a'))return;drag={id:e.pointerId,x:e.clientX,y:e.clientY,c:[...center]};host.setPointerCapture(e.pointerId);});
    host.addEventListener('pointermove',e=>{if(!drag||e.pointerId!==drag.id)return;center=[drag.c[0]-(e.clientX-drag.x)/(256*2**zoom),drag.c[1]-(e.clientY-drag.y)/(256*2**zoom)];schedule();});
    const release=()=>{drag=null;};
    host.addEventListener('pointerup',release);host.addEventListener('pointercancel',release);
    new ResizeObserver(()=>{if(active)fit();}).observe(host);
    return {
      show(){active=true;fitted?render():fit();},
      hide(){active=false;cancelAnimationFrame(frame);},
      select(id){selected=id;host.querySelector('.map-current').textContent=points.find(p=>p.id===id)?.name||'';render();},
      fit
    };
  };
})();
