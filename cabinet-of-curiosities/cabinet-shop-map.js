/* Small local map renderer. Standard Web Mercator, browser-cached OSM tiles.
   Only currently visible tiles are requested, and only while the map is open. */
(() => {
  'use strict';
  window.createCabinetShopMap = (host, places, onSelect, options = {}) => {
    const minZoom = options.minZoom ?? 10, maxZoom = options.maxZoom ?? 18;
    host.innerHTML = '<div class="map-tiles" aria-hidden="true"></div><svg class="map-leaders" aria-hidden="true"></svg><div class="map-pins"></div><div class="map-controls"><button type="button" data-zoom="1" aria-label="Zoom in">+</button><button type="button" data-zoom="-1" aria-label="Zoom out">−</button><button type="button" class="map-fit">All shops</button></div><p class="map-current" aria-live="polite"></p><a class="map-tile-credit" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© OpenStreetMap contributors</a>';
    host.tabIndex = 0; host.setAttribute('role','region'); host.setAttribute('aria-label','Map of Uppsala chocolate shops. Use arrow keys to pan, plus and minus to zoom.');
    if (options.label) host.setAttribute('aria-label', options.label);
    if (options.fitLabel) host.querySelector('.map-fit').textContent = options.fitLabel;
    const tiles = host.querySelector('.map-tiles'), leaders = host.querySelector('.map-leaders'), pins = host.querySelector('.map-pins');
    const project = p => {
      const s = Math.sin(p.lat * Math.PI / 180);
      return [(p.lon + 180) / 360, .5 - Math.log((1+s)/(1-s))/(4*Math.PI)];
    };
    const points = places.map((p,i)=>({...p,number:p.number ?? i+1,point:project(p)}));
    let center = [0,0], zoom = 12, active = false, fitted = false, selected = points[0]?.id, frame = 0;
    let fittedWidth=0,fittedHeight=0;
    const images = new Map();
    const clusterLayer = document.createElement('div'); clusterLayer.className='map-clusters';
    const clusterList = document.createElement('div'); clusterList.className='map-cluster-list';clusterList.hidden=true;
    if(options.clusters){host.append(clusterLayer,clusterList);}
    function closeCluster(restore=false){
      clusterList.hidden=true;clusterList.replaceChildren();host.classList.remove('has-cluster-list');
      clusterLayer.querySelectorAll('[aria-expanded]').forEach(b=>b.setAttribute('aria-expanded','false'));
      if(restore)host.focus({preventScroll:true});
    }
    function showCluster(group){
      clusterList.replaceChildren();clusterList.hidden=false;host.classList.add('has-cluster-list');
      const close=document.createElement('button');close.type='button';close.className='map-cluster-close';close.textContent='Close';
      close.addEventListener('click',()=>closeCluster(true));clusterList.append(close);
      const zoomButton=document.createElement('button');zoomButton.type='button';zoomButton.textContent='Zoom to group';
      zoomButton.disabled=zoom>=maxZoom;
      zoomButton.addEventListener('click',()=>{center=[group.xWorld,group.yWorld];closeCluster(true);changeZoom(2);});clusterList.append(zoomButton);
      for(const a of group.members){
        const b=document.createElement('button');b.type='button';b.textContent=a.p.number+' '+a.p.name;
        b.dataset.maker=a.p.id;b.addEventListener('click',()=>{closeCluster(true);onSelect(a.p.id);});clusterList.append(b);
      }
      close.focus({preventScroll:true});
    }
    function renderClusters(anchors,w,h){
      clusterLayer.replaceChildren();buttons.forEach(b=>{b.hidden=true;b.setAttribute('aria-pressed','false');});
      const visible=anchors.filter(a=>a.x>=0&&a.x<=w&&a.y>=0&&a.y<=h);
      const makeGroup=members=>{
        const x=members.reduce((v,a)=>v+a.x,0)/members.length;
        const y=members.reduce((v,a)=>v+a.y,0)/members.length;
        // Anchor a group at its most central member, not a centroid that could
        // fall offshore. Individual pins remain exactly at their coordinates.
        const anchor=members.reduce((best,a)=>Math.hypot(a.x-x,a.y-y)<Math.hypot(best.x-x,best.y-y)?a:best);
        return {members,x:anchor.x,y:anchor.y,xWorld:anchor.p.point[0],yWorld:anchor.p.point[1]};
      };
      const groups=visible.map(a=>makeGroup([a]));
      // Merge only overlapping marker footprints. Re-evaluate after each
      // merge because a group has a larger touch target than a single pin.
      while(groups.length>1){
        let pair=null,distance=Infinity;
        for(let i=0;i<groups.length;i++)for(let j=i+1;j<groups.length;j++){
          const a=groups[i],b=groups[j];
          const gap=(a.members.length===1?12:16)+(b.members.length===1?12:16)+3;
          const dx=Math.abs(a.x-b.x),dy=Math.abs(a.y-b.y),d=Math.hypot(dx,dy);
          if(dx<gap&&dy<gap&&d<distance){distance=d;pair=[i,j];}
        }
        if(!pair)break;
        const [i,j]=pair;
        groups[i]=makeGroup([...groups[i].members,...groups[j].members]);groups.splice(j,1);
      }
      for(const group of groups){
        if(group.members.length===1){
          const a=group.members[0],b=buttons[a.i];b.hidden=false;
          b.style.left=group.x+'px';b.style.top=group.y+'px';b.setAttribute('aria-pressed',String(a.p.id===selected));
          const line=document.createElementNS('http://www.w3.org/2000/svg','path');line.setAttribute('d','M'+a.x+' '+a.y+'L'+group.x+' '+group.y);leaders.append(line);
          const dot=document.createElementNS('http://www.w3.org/2000/svg','circle');dot.setAttribute('cx',a.x);dot.setAttribute('cy',a.y);dot.setAttribute('r','2.5');leaders.append(dot);
        }else{
          group.members.sort((a,b)=>a.p.number-b.p.number);
          const b=document.createElement('button');b.type='button';b.className='map-cluster';
          b.dataset.members=group.members.map(a=>a.p.id).join(',');
          b.setAttribute('aria-label',group.members.length+' makers: '+group.members.map(a=>a.p.name).join(', '));
          b.setAttribute('aria-expanded','false');
          b.classList.toggle('is-selected',group.members.some(a=>a.p.id===selected));
          const count=document.createElement('strong');count.textContent=group.members.length;
          const caption=document.createElement('span');caption.textContent='makers';b.append(count,caption);
          b.style.left=group.x+'px';b.style.top=group.y+'px';
          b.addEventListener('click',()=>{showCluster(group);b.setAttribute('aria-expanded','true');});clusterLayer.append(b);
        }
      }
    }
    const buttons = points.map(p => {
      const b=document.createElement('button'); b.type='button'; b.className='map-pin'; b.textContent=p.number;
      b.dataset.place=p.id; b.setAttribute('aria-label',p.number+' '+p.name); b.title=p.name;
      b.addEventListener('click',()=>onSelect(p.id)); pins.append(b); return b;
    });
    function fit(keepCluster=false) {
      if(!keepCluster)closeCluster();
      if(!points.length)return;
      fittedWidth=host.clientWidth;fittedHeight=host.clientHeight;
      const xs=points.map(p=>p.point[0]), ys=points.map(p=>p.point[1]);
      const x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys);
      center=[(x0+x1)/2,(y0+y1)/2];
      const padding = options.padding ?? {x:48,y:32};
      zoom=Math.max(minZoom,Math.min(Math.min(16,maxZoom),Math.floor(Math.log2(Math.min((host.clientWidth-padding.x)/((x1-x0)*256),(host.clientHeight-padding.y)/((y1-y0)*256))))));
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
      if(options.clusters){renderClusters(anchors,w,h);host.dataset.zoom=zoom;return;}
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
    function changeZoom(delta){closeCluster();zoom=Math.max(minZoom,Math.min(maxZoom,zoom+delta));render();}
    host.querySelectorAll('[data-zoom]').forEach(b=>b.addEventListener('click',()=>changeZoom(Number(b.dataset.zoom))));
    host.querySelector('.map-fit').addEventListener('click',()=>fit());
    host.addEventListener('keydown',e=>{
      if(e.key==='Escape'&&!clusterList.hidden){e.preventDefault();e.stopPropagation();closeCluster(true);return;}
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
    new ResizeObserver(()=>{
      if(!active)return;
      const width=host.clientWidth,height=host.clientHeight;
      if(width===fittedWidth&&height===fittedHeight)return;
      fittedWidth=width;fittedHeight=height;fit(true);
    }).observe(host);
    return {
      show(){active=true;fitted?render():fit();},
      hide(){active=false;closeCluster();cancelAnimationFrame(frame);},
      select(id){
        closeCluster();
        selected=id;
        const point=points.find(p=>p.id===id);
        host.querySelector('.map-current').textContent=point?.name||'';
        if (point && options.revealSelection && active) {
          const scale=256*2**zoom, x=(point.point[0]-center[0])*scale+host.clientWidth/2, y=(point.point[1]-center[1])*scale+host.clientHeight/2;
          if(x<44||x>host.clientWidth-44||y<64||y>host.clientHeight-64)center=[...point.point];
        }
        render();
      },
      fit
    };
  };
})();
