import {workingBody,workingPoint} from './scene-body-motion.js?v=20260923-four-scenes-1';
import {add,at,relative,ease,clamp,recordedSound} from './scene-performance.js?v=20260919-uniform-1';

export const FEEDING_DURATION=4500;
export const FEEDING_BEATS=[2050,2450,2850];
export function feedingFrame(ms){
 const lift=ease((ms-450)/850)*(1-ease((ms-3400)/1100));
 const reach=ease(ms/450)*(1-ease((ms-4200)/300));
 const bite=ease((ms-1350)/400)*(1-ease((ms-3150)/250));
 const pump=FEEDING_BEATS.reduce((p,t)=>Math.max(p,ms>=t&&ms<t+280?Math.sin((ms-t)/280*Math.PI):0),0);
 return {lift,reach,bite,transfer:ease((ms-1750)/300),feeding:ms>=1750&&ms<3150,consumed:ms>=2050,pump,done:ms>=FEEDING_DURATION};
}
// The plate's own placement is never rewritten. A temporary inner carrier
// lifts it and returns it, while the eaten portions remain visible as progress.
export function createN2Feeding(habitat,onChange=()=>{}){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),eaten=new Map(),sound=recordedSound({eat:'reunion-eat.wav'});let run=null,raf=0;
 const handles=p=>p?.dataset.accessoryFamily==='ngm-agar-plate';
 function paint(piece){const n=eaten.get(piece)||0;piece.querySelectorAll('.op50-colony').forEach((c,i)=>c.setAttribute('opacity',i<n?'0':'1'));}
 function cancel(){cancelAnimationFrame(raf);raf=0;sound.stop();if(!run)return;const old=run;run=null;old.restore();paint(old.piece);onChange();}
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
  const morsel=colonies[portion].cloneNode(true),foodInk=getComputedStyle(colonies[portion]);morsel.setAttribute('fill',foodInk.fill);morsel.setAttribute('stroke',foodInk.stroke);morsel.setAttribute('stroke-width',.65);morsel.setAttribute('r',small?1.9:3.2);morsel.setAttribute('opacity',0);layer.append(morsel);
  const restore=()=>{rig.restore();carrier.replaceWith(art);styles.forEach(({n,style})=>style===null?n.removeAttribute('style'):n.setAttribute('style',style));layer.remove();shadowOpacity===null?shadow.removeAttribute('opacity'):shadow.setAttribute('opacity',shadowOpacity);if(smile)smileOpacity===null?smile.removeAttribute('opacity'):smile.setAttribute('opacity',smileOpacity);};
  run={piece,restore,committed:false,started:null,cues:new Set()};const action=run;onChange();
  // Unlock on the gesture and wait for the recording before starting the bite.
  // A failed recording load still permits a silent, fully usable action.
  sound.prepare(['eat']).finally(()=>{if(run===action)action.started=performance.now();});
  function tick(now){if(!run)return;if(!piece.isConnected||piece.closest('[hidden]')||document.hidden){cancel();return;}
   if(run.started===null){raf=requestAnimationFrame(tick);return;}
   const ms=now-run.started,f=feedingFrame(ms);rig.set(8*f.lift+4*f.bite,18*f.lift+8*f.bite,-7*f.lift);
   const steady=workingPoint(331,77,8,18,-7),restMouth=at(rig.base,steady.x,steady.y);
   const head=rig.point(331,77),rim=at(origin,small?-26:-39,-2),unit=small?.45:1,dx=(restMouth.x+(small?14:8)-rim.x)*f.lift,dy=(restMouth.y+18-rim.y)*f.lift;
   const a=at(space.inverse(),0,0),b=at(space.inverse(),dx,dy);carrier.setAttribute('transform',`translate(${b.x-a.x} ${b.y-a.y})`);shadow.setAttribute('opacity',1-f.lift);
   for(const h of hands){const from=rig.point(h.side<0?253:282,h.side<0?134:117),grip=at(origin,h.side*(small?34:49),12);grip.x+=dx;grip.y+=dy;
    const reach=f.reach,x=from.x+(grip.x-from.x)*reach,y=from.y+(grip.y-from.y)*reach;
    const d=`M${from.x} ${from.y}Q${(from.x+x)/2} ${Math.max(from.y,y)+7} ${x} ${y}`;for(const n of[h.edge,h.line]){n.setAttribute('d',d);n.setAttribute('opacity',clamp(reach*4));}h.tip.setAttribute('cx',x);h.tip.setAttribute('cy',y);h.tip.setAttribute('opacity',clamp(reach*4));}
   mouth.setAttribute('cx',head.x);mouth.setAttribute('cy',head.y);mouth.setAttribute('rx',(small?1.8:3.8)-f.pump*(small?.5:1));mouth.setAttribute('ry',(small?.8:1.2)+(ms<2050?1:f.pump)*(small?1.2:2.4));mouth.setAttribute('opacity',f.feeding?'1':'0');smile?.setAttribute('opacity',f.feeding?'0':'1');
   const food=at(origin,+colonies[portion].getAttribute('cx'),+colonies[portion].getAttribute('cy')),q=f.transfer;
   morsel.setAttribute('cx',(food.x+dx)*(1-q)+head.x*q);morsel.setAttribute('cy',(food.y+dy)*(1-q)+head.y*q-5*unit*Math.sin(q*Math.PI));morsel.setAttribute('opacity',ms>=1750&&!f.consumed?1:0);
   colonies[portion].setAttribute('opacity',ms>=1750?'0':'1');
   FEEDING_BEATS.forEach((t,i)=>{if(ms>=t&&!action.cues.has(i)){action.cues.add(i);if(ms-t<120)sound.play('eat',i%2?.25:0,.29,small?.085:.11);}});
   if(f.consumed&&!run.committed){run.committed=true;eaten.set(piece,portion+1);}
   if(f.done){cancel();return;}raf=requestAnimationFrame(tick);
  }
  raf=requestAnimationFrame(tick);return true;
 }
 document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});reduced.addEventListener('change',cancel);window.addEventListener('resize',cancel);window.addEventListener('pagehide',cancel);
 return {handles,start,cancel,clear,get active(){return !!run;}};
}
