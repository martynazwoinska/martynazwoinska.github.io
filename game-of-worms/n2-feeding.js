import {workingBody} from './scene-body-motion.js?v=20260923-four-scenes-1';
import {add,at,relative,ease,clamp} from './scene-performance.js?v=20260919-uniform-1';

export const FEEDING_DURATION=3600;
export function feedingFrame(ms){
 const lift=ease(ms/900)*(1-ease((ms-2650)/950));
 return {lift,feeding:ms>=1150&&ms<2500,consumed:ms>=2300,pump:ms>=1150&&ms<2500?.5+.5*Math.sin((ms-1150)*.028):0,done:ms>=FEEDING_DURATION};
}
// The plate's own placement is never rewritten. A temporary inner carrier
// lifts it and returns it, while the eaten portions remain visible as progress.
export function createN2Feeding(habitat,onChange=()=>{}){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),eaten=new Map();let run=null,raf=0;
 const handles=p=>p?.dataset.accessoryFamily==='ngm-agar-plate';
 function paint(piece){const n=eaten.get(piece)||0;piece.querySelectorAll('.op50-colony').forEach((c,i)=>c.setAttribute('opacity',i<n?'0':'1'));}
 function cancel(){cancelAnimationFrame(raf);raf=0;if(!run)return;const old=run;run=null;old.restore();paint(old.piece);onChange();}
 function clear(){cancel();eaten.clear();habitat.querySelectorAll('[data-accessory-family="ngm-agar-plate"]').forEach(paint);}
 function start(piece){
  if(!handles(piece)||piece.closest('[hidden]'))return false;
  cancel();const colonies=[...piece.querySelectorAll('.op50-colony')];let portion=eaten.get(piece)||0;
  if(portion>=colonies.length){eaten.set(piece,0);paint(piece);return true;}
  if(reduced.matches){eaten.set(piece,portion+1);paint(piece);return true;}
  const part=piece.dataset.wormPart,small=part==='companion',root=habitat.querySelector('#worm-species');
  const rig=workingBody(habitat,part,['n2-lab-coat','n2-lab-goggles','cryo-vial-jetpack']);
  const art=piece.querySelector('.location-accessory-art'),styles=[piece,art].map(n=>{const style=n.getAttribute('style'),b=n.getBBox();n.style.transformBox='view-box';n.style.transformOrigin=`${b.x+b.width/2}px ${b.y+b.height/2}px`;return {n,style};});
  const parent=art.parentNode,carrier=add(parent,'g',{'data-feeding-carrier':''});art.before(carrier);carrier.append(art);
  const origin=relative(root,art),space=relative(root,parent),layer=add(root,'g',{'data-n2-feeding':part,'pointer-events':'none','aria-hidden':'true'});
  const shadow=art.querySelector('.plate-shadow'),shadowOpacity=shadow.getAttribute('opacity');
  const hands=[-1,1].map(side=>({side,edge:add(layer,'path',{fill:'none',stroke:'var(--worm-deep)','stroke-width':small?3.5:6,'stroke-linecap':'round'}),line:add(layer,'path',{fill:'none',stroke:'var(--worm-color)','stroke-width':small?2.1:4.1,'stroke-linecap':'round'}),tip:add(layer,'ellipse',{rx:small?2.2:3.5,ry:small?1.8:2.5,fill:'var(--worm-color)'})}));
  const smile=rig.body.querySelector('.worm-smile'),smileOpacity=smile?.getAttribute('opacity');
  const mouth=add(layer,'ellipse',{rx:small?1.6:2.5,ry:1,fill:'#29444b',opacity:0});
  const restore=()=>{rig.restore();carrier.replaceWith(art);styles.forEach(({n,style})=>style===null?n.removeAttribute('style'):n.setAttribute('style',style));layer.remove();shadowOpacity===null?shadow.removeAttribute('opacity'):shadow.setAttribute('opacity',shadowOpacity);if(smile)smileOpacity===null?smile.removeAttribute('opacity'):smile.setAttribute('opacity',smileOpacity);};
  run={piece,restore,committed:false,started:performance.now()};onChange();
  function tick(now){if(!run)return;if(!piece.isConnected||piece.closest('[hidden]')||document.hidden){cancel();return;}
   const f=feedingFrame(now-run.started);rig.set(8*f.lift,16*f.lift,-7*f.lift);
   const head=rig.point(331,77),rim=at(origin,small?-26:-39,-2),dx=(head.x-rim.x)*f.lift,dy=(head.y+3-rim.y)*f.lift;
   const a=at(space.inverse(),0,0),b=at(space.inverse(),dx,dy);carrier.setAttribute('transform',`translate(${b.x-a.x} ${b.y-a.y})`);shadow.setAttribute('opacity',1-f.lift);
   for(const h of hands){const from=rig.point(h.side<0?253:282,h.side<0?134:117),grip=at(origin,h.side*(small?34:49),12);grip.x+=dx;grip.y+=dy;
    const reach=ease(f.lift*2),x=from.x+(grip.x-from.x)*reach,y=from.y+(grip.y-from.y)*reach;
    const d=`M${from.x} ${from.y}Q${(from.x+x)/2} ${Math.max(from.y,y)+7} ${x} ${y}`;for(const n of[h.edge,h.line]){n.setAttribute('d',d);n.setAttribute('opacity',clamp(f.lift*4));}h.tip.setAttribute('cx',x);h.tip.setAttribute('cy',y);h.tip.setAttribute('opacity',clamp(f.lift*4));}
   mouth.setAttribute('cx',head.x);mouth.setAttribute('cy',head.y);mouth.setAttribute('ry',(small?.8:1.2)+f.pump*(small?.7:1.1));mouth.setAttribute('opacity',f.feeding?'1':'0');smile?.setAttribute('opacity',f.feeding?'0':'1');
   colonies[portion].setAttribute('opacity',1-ease((now-run.started-1450)/850));
   if(f.consumed&&!run.committed){run.committed=true;eaten.set(piece,portion+1);}
   if(f.done){cancel();return;}raf=requestAnimationFrame(tick);
  }
  raf=requestAnimationFrame(tick);return true;
 }
 document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});reduced.addEventListener('change',cancel);window.addEventListener('resize',cancel);window.addEventListener('pagehide',cancel);
 return {handles,start,cancel,clear,get active(){return !!run;}};
}
