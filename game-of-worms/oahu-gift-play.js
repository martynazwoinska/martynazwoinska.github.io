import {GIFTS,setGiftArt} from './oahu-gift-art.js?v=20260909-gift-3';
import {add,path,C} from './oahu-bike-art.js?v=20260909-bike-1';
import {createChocolateSound} from './oahu-chocolate-audio.js?v=20260909-gift-3';
export const giftClips=Object.freeze({foil:new URL('./assets/audio/oahu-gift-foil.mp3',import.meta.url).href,paper:new URL('./assets/audio/nambucca-paper-slide.wav',import.meta.url).href});
export function giftCue(kind,male=false){return kind==='foil'?{offset:male?2.4:.6,duration:.48,peak:.065}:{offset:0,duration:.44,peak:.06};}
const clamp=x=>Math.max(0,Math.min(1,x)),ease=x=>{x=clamp(x);return x*x*(3-2*x);},mix=(a,b,q)=>a+(b-a)*q;
export function giftFrame(ms,opening=false,reduced=false){
  if(reduced)return{wrap:1,offer:1,open:opening?1:0,reach:0,settle:opening?1:0,wiggle:0,ready:!opening,done:opening};
  if(opening)return{wrap:1,offer:1,open:ease(ms/1100),reach:1-ease((ms-1300)/550),settle:ease((ms-2000)/800),wiggle:Math.sin(ms/145)*Math.sin(clamp((ms-1100)/1600)*Math.PI),ready:false,done:ms>=2900};
  return{wrap:ease((ms-500)/2200),offer:ease((ms-2900)/1100),open:0,reach:ease(ms/450),settle:0,wiggle:0,ready:ms>=4000,done:false};
}
// Clamp translation in root coordinates while retaining the selected user scale.
export function fitGiftPoint(point,half,bounds){return{x:Math.max(bounds.left+half.x,Math.min(bounds.right-half.x,point.x)),y:Math.max(bounds.top+half.y,Math.min(bounds.bottom-half.y,point.y))};}
export function giftOfferLayout(bounds,faces,scale,lift=52){
  const faceBottom=Math.max(...faces.map(p=>p.y))-lift+14;
  const size=Math.min(scale*5.4,(bounds.right-bounds.left)*.64/108,(bounds.bottom-faceBottom)/78);
  const safeSize=Math.max(.35,size);
  return{scale:safeSize,x:(bounds.left+bounds.right)/2,y:bounds.bottom-39*safeSize};
}
function hand(parent,small){
  const a=add(parent,'g',{'data-gift-arm':''}),skin=path(a,'','var(--worm-color)',C.ink,small?.5:.65),highlight=path(a,'','none','#d8ffee',small?.8:1.25),palm=add(a,'g');
  path(palm,'M-4 4Q-8 1-5-4L-2-5Q1-7 4-3L6 1Q7 5 2 6Z','#fff0dc',C.ink,.85);
  path(palm,'M-3 0Q-8-3-5-6L-1-2M1-3L2 0M3-2L4 1','none','#b39a84',.7);
  return{a,skin,highlight,palm,small};
}
function moveHand(a,from,to,opacity){
  const dx=to.x-from.x,dy=to.y-from.y,l=Math.max(1,Math.hypot(dx,dy)),nx=-dy/l,ny=dx/l,w=a.small?2.4:4.4;
  const ex=mix(from.x,to.x,.52)-Math.min(12,l*.25),ey=mix(from.y,to.y,.48)+Math.min(12,l*.20);
  a.skin.setAttribute('d',`M${from.x+nx*w} ${from.y+ny*w}Q${ex+nx*w} ${ey+ny*w} ${to.x+nx} ${to.y+ny}L${to.x-nx} ${to.y-ny}Q${ex-nx*w} ${ey-ny*w} ${from.x-nx*w} ${from.y-ny*w}Z`);
  a.highlight.setAttribute('d',`M${from.x} ${from.y}Q${ex} ${ey} ${to.x} ${to.y}`);
  a.palm.setAttribute('transform',`translate(${to.x} ${to.y}) rotate(${Math.atan2(dy,dx)*180/Math.PI-90}) scale(${a.small?.60:.82})`);a.a.setAttribute('opacity',opacity);
}
export function createOahuGifts(habitat,refresh=()=>{}){
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const sound=createChocolateSound({clips:giftClips,cueFor:giftCue,keysFor:()=>Object.values(giftClips)});
  let run=null,raf=0;
  const handles=p=>p?.dataset.accessoryFamily===GIFTS;
  function cancel(){
    cancelAnimationFrame(raf);raf=0;sound.stop();if(!run)return;
    const r=run;run=null;r.hit?.remove();r.effects?.remove();
    for(const[n,attrs]of r.saved)for(const[k,v]of Object.entries(attrs))v===null?n.removeAttribute(k):n.setAttribute(k,v);
    delete habitat.dataset.oahuGift;refresh();
  }
  function start(piece){
    if(!handles(piece)||!piece.isConnected||piece.closest('[hidden]'))return false;
    if(run?.piece===piece){
      if(run.phase==='offered'){
        run.phase='opening';run.started=performance.now();run.cues.clear();habitat.dataset.oahuGift='opening';
        if(!reduced.matches)sound.unlock(run.small);raf=requestAnimationFrame(run.tick);
      }else cancel();
      return true;
    }
    cancel();
    const root=habitat.querySelector('#worm-species'),art=piece.querySelector('.location-accessory-art'),drawing=piece.querySelector('[data-gift-art]');
    if(!root||!art||!drawing)return false;
    const small=false;
    const r={piece,art,drawing,small,saved:new Map(),phase:'wrapping',started:performance.now(),cues:new Set()};run=r;
    const save=(n,keys=['transform','opacity','style'])=>{if(n&&!r.saved.has(n))r.saved.set(n,Object.fromEntries(keys.map(k=>[k,n.getAttribute(k)])));return n;};
    // Folding changes the bounding box. Keep a user-scaled piece's pivot fixed.
    const pieceBox=piece.getBBox();save(piece,['aria-label','style']);
    piece.style.transformBox='view-box';piece.style.transformOrigin=`${pieceBox.x+pieceBox.width/2}px ${pieceBox.y+pieceBox.height/2}px`;
    const bodies=[false,true].map(male=>{
      const body=habitat.querySelector(male?'.companion-body':'.worm-body');
      save(body,['style']);const from=new DOMMatrix(getComputedStyle(body).transform);
      body.style.animation='none';body.style.transform=from.toString();return{body,from,male};
    });
    const matrix=n=>{const m=root.getScreenCTM().inverse().multiply(n.getScreenCTM());return new DOMMatrix([m.a,m.b,m.c,m.d,m.e,m.f]);};
    const at=(n,x,y)=>new DOMPoint(x,y).matrixTransform(matrix(n));
    const base=matrix(art),parentInverse=matrix(piece).inverse(),scale=Math.hypot(base.a,base.b),angle=Math.atan2(base.b,base.a)*180/Math.PI;
    const rect=habitat.getBoundingClientRect(),screenToRoot=root.getScreenCTM().inverse();
    const tl=new DOMPoint(rect.left+12,rect.top+12).matrixTransform(screenToRoot),br=new DOMPoint(rect.right-12,rect.bottom-45).matrixTransform(screenToRoot);
    const bounds={left:tl.x,right:br.x,top:tl.y,bottom:br.y};
    const faces=bodies.map(p=>at(p.body,330,79));
    const work=fitGiftPoint({x:(faces[0].x+faces[1].x)/2,y:Math.max(...faces.map(p=>p.y))+55},{x:70*scale,y:80*scale},bounds);
    const offer=giftOfferLayout(bounds,faces,scale,reduced.matches?0:52);
    bodies.forEach(p=>p.rootScale=Math.hypot(matrix(p.body).a,matrix(p.body).b));
    const origin={x:base.e,y:base.f};
    save(art,['transform','opacity']);
    drawing.querySelectorAll('[data-gift-part]').forEach(n=>save(n));
    for(const n of habitat.querySelectorAll('.accessory-piece'))if(n!==piece){save(n,['style']);n.style.opacity='0';n.style.pointerEvents='none';}
    const oldHit=piece.querySelector(':scope > .accessory-hit-target');save(oldHit,['style']);if(oldHit)oldHit.style.display='none';
    r.hit=add(art,'rect',{'data-gift-hit':'',x:-52,y:-35,width:104,height:72,fill:'transparent','pointer-events':'all','aria-hidden':'true'});
    r.effects=add(root,'g',{'data-oahu-gift-effects':'','aria-hidden':'true','pointer-events':'none'});
    bodies.forEach(p=>p.arms=[hand(r.effects,p.male),hand(r.effects,p.male)]);
    habitat.dataset.oahuGift='wrapping';
    if(!reduced.matches)sound.unlock(small);
    function tick(now){
      if(run!==r)return;
      if(document.hidden||!piece.isConnected||piece.closest('[hidden]')){cancel();return;}
      const opening=r.phase==='opening',ms=now-r.started,s=giftFrame(ms,opening,reduced.matches);
      setGiftArt(drawing,s.wrap,s.open);
      const reach=opening?1:ease(ms/650),cx=mix(mix(mix(origin.x,work.x,reach),offer.x,s.offer),origin.x,s.settle),cy=mix(mix(mix(origin.y,work.y,reach),offer.y,s.offer),origin.y,s.settle);
      const turned=mix(mix(angle,0,s.offer),angle,s.settle),size=mix(mix(scale,offer.scale,s.offer),scale,s.settle);
      const placed=new DOMMatrix().translate(cx,cy).rotate(turned).scale(size);
      art.setAttribute('transform',parentInverse.multiply(placed).toString());
      // Hands follow the actual folds, then support the parcel from its sides.
      const folding=opening?1:s.wrap,lift=Math.sin(folding*Math.PI);
      bodies.forEach(p=>{
        const support=s.offer*(1-s.settle),shift=reduced.matches?0:-52*support/p.rootScale;
        p.body.style.transform=p.from.translate(0,shift).rotate(reduced.matches?0:(p.male?-1:1)*1.4*s.wiggle).toString();
        const coords=p.male?
          [[mix(-50,-39,folding),mix(20,8,folding)],[-19-lift*10,mix(-27,-3,s.offer)]]:
          [[mix(47,41,folding),mix(-35,4,folding)],[17+lift*9,mix(-27,13,s.offer)]];
        p.arms.forEach((arm,i)=>moveHand(arm,at(p.body,i?308:287,i?99:118),new DOMPoint(...coords[i]).matrixTransform(placed),s.reach));
      });
      if(!reduced.matches){
        const cues=opening?[[80,'paper'],[690,'foil']]:[[700,'foil'],[1450,'paper'],[2280,'paper']];
        for(const [time,kind]of cues)if(ms>=time&&!r.cues.has(time)){r.cues.add(time);sound.play(kind,small,ms-time);}
      }
      if(s.ready){
        r.phase='offered';habitat.dataset.oahuGift='offered';piece.setAttribute('aria-label','Unwrap chocolate gift');
        // No idle loop or automatic opening. The next pointer/keyboard activation unwraps it.
        raf=0;return;
      }
      if(s.done){
        cancel();setGiftArt(drawing,1,1);refresh();return;
      }
      raf=requestAnimationFrame(tick);
    }
    r.tick=tick;raf=requestAnimationFrame(tick);return true;
  }
  function reset(){cancel();habitat.querySelectorAll('[data-gift-art]').forEach(n=>setGiftArt(n,0,0));refresh();}
  for(const event of['pagehide','resize'])window.addEventListener(event,cancel);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});reduced.addEventListener('change',cancel);
  return{handles,start,cancel,reset,get active(){return!!run;}};
}
