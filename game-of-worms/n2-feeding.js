import {add,at,relative,ease,clamp,matrix,recordedSound} from './scene-performance.js?v=20260919-uniform-1';
import {createDiveGeometry,DIVE_PREPARE_MS,DIVE_FLIGHT_MS,DIVE_ENTRY_PHASE} from './n2-dive-motion.js?v=20261107-dive-46';
import {createDivingTower} from './n2-diving-tower.js?v=20261107-tower-44';

export const DIVE_DELAY=DIVE_PREPARE_MS+260-1250;
// Compress only the dive in the existing choreography clock. Once it has
// landed, crawling, eating cues and the return keep their original pace.
const FLIGHT_REFERENCE_MS=2600,FLIGHT_SAVED_MS=FLIGHT_REFERENCE_MS-DIVE_FLIGHT_MS;
export function feedingTime(story){return DIVE_DELAY+(story<=1250?story:story<3850?1250+(story-1250)*DIVE_FLIGHT_MS/FLIGHT_REFERENCE_MS:story-FLIGHT_SAVED_MS);}
function feedingStory(ms){const t=ms-DIVE_DELAY;return t<=1250?t:t<1250+DIVE_FLIGHT_MS?1250+(t-1250)*FLIGHT_REFERENCE_MS/DIVE_FLIGHT_MS:t+FLIGHT_SAVED_MS;}
export const FEEDING_DURATION=feedingTime(28000);
// Softly overlapping excerpts keep feeding audible throughout both laps.
// Leave the take-off quiet, and keep this rhythm independent of dive speed.
export const FEEDING_AUDIO={duration:.42,interval:320,offsets:[.02,.05,.035],levels:[.9,1,.94,.86]};
export const FEEDING_BEATS=Array.from({length:59},(_,i)=>feedingTime(4350+i*FEEDING_AUDIO.interval));
export function playFeedingSound(sound,index,small=false,remaining=FEEDING_AUDIO.duration){return sound.play('eat',FEEDING_AUDIO.offsets[index%FEEDING_AUDIO.offsets.length],Math.min(FEEDING_AUDIO.duration,remaining),(small?.04:.055)*FEEDING_AUDIO.levels[index%FEEDING_AUDIO.levels.length]);}
export function feedingEntryTarget(point,artMap){const width=Math.hypot(artMap.a,artMap.b)||1;return{x:point.x,y:point.y,normal:{x:-artMap.b/width,y:artMap.a/width}};}

export function feedingTravel(progress,ramp=.08){
 const u=clamp(progress),total=1-ramp;
 if(u<ramp)return (.5*u-ramp/(2*Math.PI)*Math.sin(Math.PI*u/ramp))/total;
 if(u>1-ramp){const remaining=1-u;return 1-(.5*remaining-ramp/(2*Math.PI)*Math.sin(Math.PI*remaining/ramp))/total;}
 return (u-.5*ramp)/total;
}

// Crawl-like curvature retained during the fictional jump: about 1.5 spatial
// cycles, travelling from the head (s=1) towards the tail (s=0), with weaker
// posterior bending and fixed endpoints for clean face and tail hand-offs.
export function flightBend(s,progress,small=false,returning=false){
 const position=clamp(s),u=clamp(progress),cycles=small?1.4:1.5,phase=(returning?.52:.68)*u,amplitude=small?(returning?.016:.019):(returning?.032:.042),envelope=Math.sin(Math.PI*position)**1.08*(.68+.32*position);
 return amplitude*envelope*Math.sin(Math.PI*2*(cycles*position+phase))*Math.sin(Math.PI*u);
}

export function feedingFrame(ms){
 const story=feedingStory(ms),takeoff=ease((ms-80)/160),landing=ease((story-3120)/730),departure=ease((story-23350)/650),home=ease((story-26300)/450);
 const impactProgress=clamp((story-3120)/900),plate=ease((ms-80)/620)*(1-ease((story-26700)/800));
 return {
  plate,landing,departure,home,
  // Finish submerging the diver before revealing the worm on the agar.
  crawler:ease((story-3850)/180)*(1-departure),
  crawl:feedingTravel((story-4350)/19000),
  wave:1,
  jumpOut:clamp((story-1250)/FLIGHT_REFERENCE_MS),
  jumpBack:1-clamp((story-24000)/2300),
  jumpOpacity:Math.max(takeoff*(1-landing),departure*(1-home)),
  worm:1-takeoff*(1-home),
  anticipation:clamp((ms-260)/DIVE_PREPARE_MS),
  impact:Math.sin(Math.PI*impactProgress)*(1-impactProgress),
  splash:Math.sin(Math.PI*clamp((story-3100)/1150)),
  consumed:story>=10350,
  done:ms>=FEEDING_DURATION
 };
}

// Two calm laps around an ellipse that follows the plate's perspective.
// The start angle meets the colony being eaten, but the route never loops,
// reverses or leaves the agar.
export function feedingRoute(t,_variant=0,small=false,target={x:1,y:0}){
 const rx=small?26:38,ry=small?7.6:10.5,direction=_variant===-1?-1:1,phase=Math.atan2(target.y/ry,target.x/rx),table=ellipseArcTable(rx,ry),angle=table.angle(table.fraction(phase)+direction*t*2);
 const x=rx*Math.cos(angle),y=ry*Math.sin(angle),vx=-direction*rx*Math.sin(angle),vy=direction*ry*Math.cos(angle),length=Math.hypot(vx,vy)||1;
 return {x,y,dx:vx/length,dy:vy/length,angle:Math.atan2(vy,vx)*180/Math.PI};
}

const arcTables=new Map();
function ellipseArcTable(rx,ry){
 const key=`${rx}:${ry}`;if(arcTables.has(key))return arcTables.get(key);
 const distances=[0],count=720;let before={x:rx,y:0};
 for(let i=1;i<=count;i++){const a=i/count*Math.PI*2,p={x:rx*Math.cos(a),y:ry*Math.sin(a)};distances.push(distances.at(-1)+Math.hypot(p.x-before.x,p.y-before.y));before=p;}
 const perimeter=distances.at(-1),result={perimeter,fraction(angle){const index=((angle/(Math.PI*2)%1+1)%1)*count,lo=Math.floor(index);return (distances[lo]+(distances[lo+1]-distances[lo])*(index-lo))/perimeter;},angle(laps){const whole=Math.floor(laps),distance=(laps-whole)*perimeter;let lo=0,hi=count;while(hi-lo>1){const m=(lo+hi)>>1;if(distances[m]<distance)lo=m;else hi=m;}return (whole+(lo+(distance-distances[lo])/(distances[hi]-distances[lo]))/count)*Math.PI*2;}};arcTables.set(key,result);return result;
}

// The head lays down a sinuous track. Each posterior point occupies an earlier
// head position, reproducing the low-slip travelling wave of crawling on agar.
export function feedingWave(t,small=false,amount=1){
 return (small?1.35:1.95)*amount*Math.sin(Math.PI*40*t);
}

export function feedingTrack(t,direction=1,small=false,target={x:1,y:0},waveAmount=1){
 const base=feedingRoute(t,direction,small,target),wave=feedingWave(t,small,waveAmount);
 return {...base,x:base.x-base.dy*wave,y:base.y+base.dx*wave};
}

function wormMidline(track,t,small){
 const count=33,span=1/13;
 return Array.from({length:count},(_,i)=>{
  const progress=i/(count-1),sampleTime=t-progress*span,p=track(sampleTime);
  return {x:p.x,y:p.y,time:sampleTime};
 });
}

export function feedingWormPose(t,small=false,target={x:1,y:0},waveAmount=1,direction=1){
 const samples=wormMidline(q=>feedingTrack(q,direction,small,target,waveAmount),t,small),head=samples[0],tail=samples.at(-1);
 const length=samples.slice(1).reduce((sum,p,i)=>sum+Math.hypot(p.x-samples[i].x,p.y-samples[i].y),0);
 return {samples,head,tail,length,angle:Math.atan2(head.y-tail.y,head.x-tail.x)};
}

function wormShape(track,t,small){
 const max=small?.88:1.15,head=small?.3:.4,tail=.06,samples=wormMidline(track,t,small);
 const side=(p,i,sign)=>{
  const progress=i/(samples.length-1),before=samples[Math.max(0,i-1)],after=samples[Math.min(samples.length-1,i+1)],length=Math.hypot(after.x-before.x,after.y-before.y)||1;
  const width=(1-progress)*head+progress*tail+max*Math.sin(Math.PI*progress)**.65;
  return {x:p.x-(after.y-before.y)/length*width*sign,y:p.y+(after.x-before.x)/length*width*sign};
 };
 const left=samples.map((p,i)=>side(p,i,1)),right=samples.map((p,i)=>side(p,i,-1)).reverse();
 const highlight=samples.slice(2,9).map((p,i)=>{
  const before=samples[Math.max(0,i+1)],after=samples[Math.min(samples.length-1,i+3)],length=Math.hypot(after.x-before.x,after.y-before.y)||1;
  return {x:p.x-(after.y-before.y)/length*(small?.34:.42),y:p.y+(after.x-before.x)/length*(small?.34:.42)};
 });
 const centreLength=samples.slice(1).reduce((sum,p,i)=>sum+Math.hypot(p.x-samples[i].x,p.y-samples[i].y),0);
 return {
  body:`M${left.map(p=>`${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join('L')}L${right.map(p=>`${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join('L')}Z`,
  highlight:`M${highlight.map(p=>`${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join('L')}`,
  samples,head:samples[0],tail:samples.at(-1),length:centreLength
 };
}

function rippleFrame(ms,start){
 const progress=clamp((ms-start)/420);
 return {progress,opacity:Math.sin(progress*Math.PI)};
}

let clipNumber=0;
function crawlerOverlay(art,small){
 const defs=add(art,'defs'),clipId=`n2-feeding-agar-${++clipNumber}`,clip=add(defs,'clipPath',{id:clipId});
 add(clip,'ellipse',{cx:0,cy:0,rx:small?35:51,ry:small?12.4:16.4});
 const layer=add(art,'g',{'clip-path':`url(#${clipId})`,'pointer-events':'none','aria-hidden':'true'}),crawler=add(layer,'g',{'data-n2-lawn-crawler':'',opacity:0});
 const ripple=add(layer,'ellipse',{class:'n2-landing-ripple',cx:0,cy:0,rx:3,ry:1});
 const body=add(crawler,'path',{class:'n2-crawler-body'}),highlight=add(crawler,'path',{class:'n2-crawler-highlight'});
 const splash=add(art,'g',{'data-n2-pool-splash':'','pointer-events':'none','aria-hidden':'true',opacity:0}),splashCover=add(splash,'ellipse',{class:'n2-splash-cover',rx:5,ry:2}),ringA=add(splash,'ellipse',{class:'n2-splash-ring',rx:4,ry:1.4}),ringB=add(splash,'ellipse',{class:'n2-splash-ring n2-splash-ring-faint',rx:3,ry:1});
 const drops=[[-1,-1],[0,0],[1,1]].map(([side,delay])=>add(splash,'circle',{class:'n2-splash-drop','data-side':side,'data-delay':delay,r:small?.75:1.25}));
 const glare=art.querySelector('.plate-glare');if(glare){glare.before(layer);glare.after(splash);}
 return {defs,layer,crawler,ripple,body,highlight,splash,splashCover,ringA,ringB,drops,remove(){layer.remove();splash.remove();defs.remove();}};
}


function smoothPath(points){
 if(points.length<2)return '';
 let d=`M${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
 for(let i=1;i<points.length-1;i++){const p=points[i],next=points[i+1],mid={x:(p.x+next.x)/2,y:(p.y+next.y)/2};d+=`Q${p.x.toFixed(2)} ${p.y.toFixed(2)} ${mid.x.toFixed(2)} ${mid.y.toFixed(2)}`;}
 const before=points.at(-2),last=points.at(-1);d+=`Q${before.x.toFixed(2)} ${before.y.toFixed(2)} ${last.x.toFixed(2)} ${last.y.toFixed(2)}`;
 return d;
}

function measuredPath(points){
 const distance=[0];
 for(let i=1;i<points.length;i++)distance[i]=distance[i-1]+Math.hypot(points[i].x-points[i-1].x,points[i].y-points[i-1].y);
 const total=distance.at(-1),unit=(a,b)=>{const length=Math.hypot(b.x-a.x,b.y-a.y)||1;return{x:(b.x-a.x)/length,y:(b.y-a.y)/length};},first=unit(points[0],points[1]),last=unit(points.at(-2),points.at(-1));
 return {
  total,
  atDistance(value){
   if(value<=0)return{x:points[0].x+first.x*value,y:points[0].y+first.y*value};
   if(value>=total)return{x:points.at(-1).x+last.x*(value-total),y:points.at(-1).y+last.y*(value-total)};
   let lo=0,hi=points.length-1;
   while(hi-lo>1){const mid=(lo+hi)>>1;if(distance[mid]<=value)lo=mid;else hi=mid;}
   const q=(value-distance[lo])/(distance[hi]-distance[lo]||1);
   return{x:points[lo].x+(points[hi].x-points[lo].x)*q,y:points[lo].y+(points[hi].y-points[lo].y)*q};
  }
 };
}

function launchTravel(progress,ramp=.08){
 const u=clamp(progress),normalizer=1-ramp/2;
 return u<ramp?u*u/(2*ramp*normalizer):(u-ramp/2)/normalizer;
}

function ballisticProfile(origin,target,small){
 const dx=target.x-origin.x,dy=target.y-origin.y,distance=Math.hypot(dx,dy)||1,side=dx>=0?1:-1;
 const height=Math.min(small?86:116,Math.max(small?58:72,distance*(small?.55:.52))),lateral=Math.min(small?28:48,Math.max(small?16:35,distance*(small?.16:.2)));
 return {dx,dy,side,height,lateral};
}

// The head follows a true parabola: it rises first, reaches one clear apex and
// then enters the agar head-first. A small lateral bow prevents a vertical drop.
export function ballisticHeadPath(origin,target,small=false,steps=180){
 const {dx,dy,side,height,lateral}=ballisticProfile(origin,target,small);
 return Array.from({length:steps+1},(_,i)=>{const q=i/steps,arc=4*q*(1-q);return{x:origin.x+dx*q+side*lateral*arc,y:origin.y+dy*q-height*arc};});
}


export function takeoffRelease(progress,position){
 return ease((clamp(progress)-(1-clamp(position))*.15)/.09);
}


function jumpingWorm(root,body,small,towerPosition={x:0,y:0}){
 const paused=[];for(const animation of body.getAnimations?.({subtree:true})||[])if(animation.playState==='running'){animation.pause();paused.push(animation);}
 const base=relative(root,body),spine=body.querySelector('.worm-line,.companion-line'),spineLength=spine.getTotalLength(),sampleCount=33;
 const sourcePoints=Array.from({length:sampleCount},(_,i)=>{const p=spine.getPointAtLength(spineLength*i/(sampleCount-1));return at(base,p.x,p.y);}),tail=sourcePoints[0],start=sourcePoints.at(-1);
 const sourceDistance=[0];for(let i=1;i<sourcePoints.length;i++)sourceDistance[i]=sourceDistance[i-1]+Math.hypot(sourcePoints[i].x-sourcePoints[i-1].x,sourcePoints[i].y-sourcePoints[i-1].y);
 const sourceLength=sourceDistance.at(-1),sourceAngle=Math.atan2(start.y-tail.y,start.x-tail.x),sourceHeadAngle=Math.atan2(start.y-sourcePoints.at(-2).y,start.x-sourcePoints.at(-2).x),rootScale=Math.sqrt(Math.abs(base.a*base.d-base.b*base.c))||1;
 const diver=createDiveGeometry(sourcePoints,small),defs=add(root,'defs'),clipId=`n2-dive-entry-${++clipNumber}`,clip=add(defs,'clipPath',{id:clipId,clipPathUnits:'userSpaceOnUse'}),clipRect=add(clip,'rect',{x:-3000,y:-3000,width:6000,height:3000});
 const layer=add(root,'g',{'data-n2-jump-worm':'','pointer-events':'none','aria-hidden':'true',opacity:0}),shadow=add(layer,'path',{class:'n2-jump-shadow',pathLength:1}),line=add(layer,'path',{class:'n2-jump-body',pathLength:1}),highlight=add(layer,'path',{class:'n2-jump-highlight',pathLength:1}),maleTail=small?add(layer,'path',{class:'male-tail n2-jump-male-tail'}):null,face=add(layer,'g',{'data-n2-jump-face':''});
 // Keep the diver after both worm/accessory groups, in front of the plate.
 // The contact-plane clip below controls entry into food, not the plate art.
 body.querySelectorAll('.worm-cheek,.worm-eye,.worm-eye-shine,.worm-smile').forEach(n=>face.append(n.cloneNode(true)));
 function launchVector(target){const {dx,dy,side,height,lateral}=ballisticProfile(start,target,small),vx=dx+side*lateral*4,vy=dy-height*4,length=Math.hypot(vx,vy)||1;return{x:vx/length,y:vy/length};}
 function preparedPose(anticipation,launch){
  const cycles=small?1.4:1.5,points=sourcePoints.map((p,i)=>{const s=i/(sourcePoints.length-1),before=sourcePoints[Math.max(0,i-1)],after=sourcePoints[Math.min(sourcePoints.length-1,i+1)],length=Math.hypot(after.x-before.x,after.y-before.y)||1,localNormal={x:-(after.y-before.y)/length,y:(after.x-before.x)/length},compression=.085*anticipation*s,envelope=Math.sin(Math.PI*s)**1.08*(.68+.32*s),bend=sourceLength*(small?.016:.014)*anticipation*envelope*Math.sin(Math.PI*2*(cycles*s+.12*anticipation));return{x:tail.x+(p.x-tail.x)*(1-compression)+localNormal.x*bend,y:tail.y+(p.y-tail.y)*(1-compression)+localNormal.y*bend+7*rootScale*anticipation*s*s};});
  const head=points.at(-1),anchor=Math.floor((points.length-1)*.7),steerLength=sourceLength*.24;
  for(let i=anchor+1;i<points.length;i++){const q=(i-anchor)/(points.length-1-anchor),weight=anticipation*ease(q),desired={x:head.x-launch.x*steerLength*(1-q),y:head.y-launch.y*steerLength*(1-q)};points[i]={x:points[i].x+(desired.x-points[i].x)*weight,y:points[i].y+(desired.y-points[i].y)*weight};}
  return points;
 }
 function addWave(points,progress,returning,strengths){
  return points.map((p,i)=>{const s=i/(points.length-1),before=points[Math.max(0,i-1)],after=points[Math.min(points.length-1,i+1)],length=Math.hypot(after.x-before.x,after.y-before.y)||1,normal={x:-(after.y-before.y)/length,y:(after.x-before.x)/length},offset=sourceLength*flightBend(s,progress,small,returning)*(strengths?.[i]??1);return{x:p.x+normal.x*offset,y:p.y+normal.y*offset};});
 }
 function set(progress,target,opacity,_targetLength,_targetAngle,anticipation=0,_impact=0,settle=0,outbound=true){
  if(opacity<=0){layer.setAttribute('opacity','0');return;}
  const u=clamp(progress),launch=launchVector(target),prepared=preparedPose(outbound&&u>0?1:anticipation,launch),flightPoints=ballisticHeadPath(prepared.at(-1),target,small),flight=measuredPath(flightPoints),travel=launchTravel(outbound?u:1-u);
  let head,points,bodyScale=1;
  if(outbound){
   const release=prepared.map((_,i)=>takeoffRelease(u,i/(sampleCount-1)));
   if(small){const flightHead=flight.atDistance(flight.total*travel),dx=flightHead.x-prepared.at(-1).x,dy=flightHead.y-prepared.at(-1).y,hopped=prepared.map((p,i)=>({x:p.x+dx*release[i],y:p.y+dy*release[i]}));points=addWave(hopped,u,false,release);}
   else {const pose=u>0?diver.flight(u,target,towerPosition):diver.prepare(anticipation,towerPosition);points=pose.points;bodyScale=pose.scale;}
  } else {
   const returnProgress=1-u;
   if(small){const flightHead=flight.atDistance(flight.total*(1-travel)),dx=flightHead.x-start.x,dy=flightHead.y-start.y,moving=sourcePoints.map(p=>({x:p.x+dx,y:p.y+dy}));points=addWave(moving,returnProgress,true);}
   else {const pose=diver.return(1-u,target,towerPosition);points=pose.points;bodyScale=pose.scale;}
  }
  const d=smoothPath(points),submerge=outbound?ease(clamp((settle-.06)/.82)):0,emerge=outbound?1:ease(clamp((1-u)/.62)),visible=Math.max(0,(1-submerge)*emerge),pathVisible=small?visible:1;
  line.setAttribute('d',d);shadow.setAttribute('d',d);shadow.setAttribute('transform',`translate(0 ${7*rootScale*bodyScale})`);
  const shine=points.slice(2,-1).map((p,i,a)=>{const before=a[Math.max(0,i-1)],after=a[Math.min(a.length-1,i+1)],length=Math.hypot(after.x-before.x,after.y-before.y)||1,offset=5.5*rootScale*bodyScale;return{x:p.x-(after.y-before.y)/length*offset,y:p.y+(after.x-before.x)/length*offset};});highlight.setAttribute('d',smoothPath(shine));
  for(const p of[shadow,line,highlight]){p.style.strokeDasharray=`${pathVisible} ${Math.max(.001,1-pathVisible)}`;p.style.strokeDashoffset=outbound?'0':String(pathVisible);}
  line.style.strokeWidth=`${(small?42:46)*rootScale*bodyScale}`;shadow.style.strokeWidth=`${(small?50:54)*rootScale*bodyScale}`;highlight.style.strokeWidth=`${(small?7:8)*rootScale*bodyScale}`;
  if(maleTail&&points.length>1){const end=points[0],next=points[1],length=Math.hypot(next.x-end.x,next.y-end.y)||1,tx=(next.x-end.x)/length,ty=(next.y-end.y)/length,nx=-ty,ny=tx,tailScale=rootScale;maleTail.setAttribute('d',`M${end.x.toFixed(2)} ${end.y.toFixed(2)}L${(end.x-tx*29*tailScale+nx*13*tailScale).toFixed(2)} ${(end.y-ty*29*tailScale+ny*13*tailScale).toFixed(2)}L${(end.x-tx*17*tailScale-nx*15*tailScale).toFixed(2)} ${(end.y-ty*17*tailScale-ny*15*tailScale).toFixed(2)}Z`);maleTail.style.strokeWidth=`${3*tailScale}`;maleTail.setAttribute('opacity',String(outbound?visible:emerge));}
  // Enable the food plane only after the whole body has cleared it. It then
  // masks the leading edge progressively, without a half-head pop at entry.
  if(!small&&outbound&&u>=DIVE_ENTRY_PHASE*.82){const n=target.normal||{x:0,y:1};clipRect.setAttribute('transform',`matrix(${n.y} ${-n.x} ${n.x} ${n.y} ${target.x} ${target.y})`);layer.setAttribute('clip-path',`url(#${clipId})`);}else layer.removeAttribute('clip-path');
  head=points.at(-1);const neck=points.at(-2),headAngle=Math.atan2(head.y-neck.y,head.x-neck.x),faceTransform=new DOMMatrix().translate(head.x,head.y).rotate((headAngle-sourceHeadAngle)*180/Math.PI).scale(bodyScale).translate(-start.x,-start.y).multiply(base);
  face.setAttribute('transform',matrix(faceTransform));face.setAttribute('opacity',String(small?(outbound?1-ease(clamp(submerge/.24)):emerge):1));layer.setAttribute('opacity',String(!small&&outbound&&u>0?1:opacity));
 }
 return {sourceAngle,set,remove(){layer.remove();defs.remove();for(const animation of paused)if(animation.playState==='paused')animation.play();}};
}

// The primary worm makes a head-first dive from the movable springboard;
// the companion takes a shorter upright hop. Both then complete two slow,
// head-led circuits of the OP50 lawn before returning home.
export function createN2Feeding(habitat,onChange=()=>{}){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),eaten=new Map(),sound=recordedSound({eat:'reunion-eat.wav'});let run=null,raf=0;
 let tower=null,towerRevealed=false;const towerPosition={x:0,y:0};
 const handles=p=>p?.dataset.accessoryFamily==='ngm-agar-plate';
 function paint(piece){const n=eaten.get(piece)||0;piece.querySelectorAll('.op50-colony').forEach((c,i)=>c.setAttribute('opacity',i<n?'0':'1'));}
 function cancel(){cancelAnimationFrame(raf);raf=0;sound.stop();if(!run)return;const old=run;run=null;old.restore();paint(old.piece);onChange();}
 function clear(){cancel();towerRevealed=false;tower?.remove();tower=null;eaten.clear();habitat.querySelectorAll('[data-accessory-family="ngm-agar-plate"]').forEach(paint);}
 function syncTower(){const plate=habitat.querySelector('[data-accessory-family="ngm-agar-plate"][data-worm-part="primary"]'),root=habitat.querySelector('#worm-species'),available=plate&&!plate.closest('[hidden]')&&root;if(!available)towerRevealed=false;if(towerRevealed&&available){if(!tower?.element?.isConnected){tower?.remove();tower=createDivingTower(root,habitat,towerPosition,cancel);}}else if(tower){tower.remove();tower=null;}}
 if(typeof MutationObserver!=='undefined'){const observer=new MutationObserver(syncTower);observer.observe(habitat,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});syncTower();}
 function start(piece){
  if(!handles(piece)||piece.closest('[hidden]'))return false;
  if(piece.dataset.wormPart==='primary'){towerRevealed=true;syncTower();}
  cancel();const colonies=[...piece.querySelectorAll('.op50-colony')];let portion=eaten.get(piece)||0;
  if(portion>=colonies.length){eaten.set(piece,0);paint(piece);return true;}
  if(reduced.matches){eaten.set(piece,portion+1);paint(piece);return true;}
  const part=piece.dataset.wormPart,small=part==='companion',compact=innerWidth<520,root=habitat.querySelector('#worm-species');
  const body=habitat.querySelector(part==='companion'?'.companion-body':'.worm-body'),art=piece.querySelector('.location-accessory-art'),parent=art.parentNode,artToParent=relative(parent,art),centre=at(artToParent,0,0);
  const carrier=add(parent,'g',{'data-feeding-carrier':''});art.before(carrier);carrier.append(art);
  syncTower();const target={x:+colonies[portion].getAttribute('cx'),y:+colonies[portion].getAttribute('cy')},overlay=crawlerOverlay(art,small),jumper=jumpingWorm(root,body,small,{...towerPosition}),initialMap=relative(root,art);
  const angleFor=direction=>{const pose=feedingWormPose(0,small,target,0,direction),head=at(initialMap,pose.head.x,pose.head.y),tail=at(initialMap,pose.tail.x,pose.tail.y);return Math.atan2(head.y-tail.y,head.x-tail.x);},turnDistance=angle=>Math.abs(Math.atan2(Math.sin(angle-jumper.sourceAngle),Math.cos(angle-jumper.sourceAngle)));
  const direction=turnDistance(angleFor(-1))<turnDistance(angleFor(1))?-1:1,route=t=>feedingRoute(t,direction,small,target);
  const groundShadow=body.parentElement.querySelector(':scope > .worm-ground-shadow'),shadow=art.querySelector('.plate-shadow'),shadowOpacity=shadow.getAttribute('opacity'),actors=[body,groundShadow,habitat.querySelector('#doodle-canvas'),...habitat.querySelectorAll(`.accessory-piece[data-worm-part="${part}"][data-accessory-family="n2-lab-coat"],.accessory-piece[data-worm-part="${part}"][data-accessory-family="n2-lab-goggles"],.accessory-piece[data-worm-part="${part}"][data-accessory-family="cryo-vial-jetpack"]`)].filter(Boolean).map(n=>({n,opacity:n.getAttribute('opacity')}));
  const restore=()=>{jumper.remove();overlay.remove();carrier.replaceWith(art);actors.forEach(({n,opacity})=>opacity===null?n.removeAttribute('opacity'):n.setAttribute('opacity',opacity));shadowOpacity===null?shadow.removeAttribute('opacity'):shadow.setAttribute('opacity',shadowOpacity);};
  run={piece,restore,committed:false,started:null,cues:new Set()};const action=run;onChange();
  sound.prepare(['eat']).finally(()=>{if(run===action)action.started=performance.now();});
  function tick(now){
   if(!run)return;if(!piece.isConnected||piece.closest('[hidden]')||document.hidden){cancel();return;}
   if(run.started===null){raf=requestAnimationFrame(tick);return;}
   const ms=now-run.started,story=feedingStory(ms),f=feedingFrame(ms),scale=1+f.plate*(compact?(small?1.55:1.05):(small?.72:.62)),lift=f.plate*(small?-9:-8),shift=f.plate*(small?(compact?20:30):(compact?18:68));
   carrier.setAttribute('transform',`translate(${centre.x+shift} ${centre.y+lift}) scale(${scale}) translate(${-centre.x} ${-centre.y})`);
   shadow.setAttribute('opacity',String(.25+.75*(1-f.plate)));actors.forEach(({n})=>n.setAttribute('opacity',String(f.worm)));
   overlay.crawler.setAttribute('opacity',String(f.crawler));
   const track=q=>feedingTrack(q,direction,small,target,f.wave),shape=wormShape(track,f.crawl,small);overlay.body.setAttribute('d',shape.body);overlay.highlight.setAttribute('d',shape.highlight);
   const landing=rippleFrame(story,3120),takeoff=rippleFrame(story,23350),ripple=landing.opacity>takeoff.opacity?landing:takeoff,entry=route(0);
   overlay.ripple.setAttribute('cx',entry.x);overlay.ripple.setAttribute('cy',entry.y);overlay.ripple.setAttribute('rx',String(3+ripple.progress*(small?7:10)));overlay.ripple.setAttribute('ry',String(1+ripple.progress*(small?2.2:3.2)));overlay.ripple.setAttribute('opacity',String(ripple.opacity));
   const splashProgress=clamp((story-3100)/1150);overlay.splash.setAttribute('transform',`translate(${entry.x} ${entry.y})`);overlay.splash.setAttribute('opacity',String(f.splash));
   overlay.splashCover.setAttribute('rx',String((small?4.5:8)+splashProgress*(small?7:14)));overlay.splashCover.setAttribute('ry',String((small?1.8:3)+splashProgress*(small?2:4)));
   overlay.ringA.setAttribute('rx',String((small?4:6)+splashProgress*(small?12:18)));overlay.ringA.setAttribute('ry',String((small?1.4:2)+splashProgress*(small?3:5)));
   const second=clamp((splashProgress-.15)/.85);overlay.ringB.setAttribute('rx',String((small?3:5)+second*(small?9:14)));overlay.ringB.setAttribute('ry',String((small?1:1.5)+second*(small?2.5:4)));
   overlay.drops.forEach((drop,i)=>{const q=clamp((splashProgress-i*.08)/.72),side=i-1;drop.setAttribute('cx',String(side*(3+q*(small?5:8))));drop.setAttribute('cy',String(-Math.sin(Math.PI*q)*(small?6:10)-q*(i===1?1.5:0)));drop.setAttribute('opacity',String(Math.sin(Math.PI*q)));});
   const artMap=relative(root,art),mapped=shape.samples.map(p=>at(artMap,p.x,p.y)),jumpTarget=feedingEntryTarget(mapped[0],artMap),jumpTail=mapped.at(-1),targetLength=mapped.slice(1).reduce((sum,p,i)=>sum+Math.hypot(p.x-mapped[i].x,p.y-mapped[i].y),0),targetAngle=Math.atan2(jumpTarget.y-jumpTail.y,jumpTarget.x-jumpTail.x);
   const outbound=story<23350,jumpProgress=outbound?f.jumpOut:f.jumpBack;
   jumper.set(jumpProgress,jumpTarget,f.jumpOpacity,targetLength,targetAngle,f.anticipation,f.impact,outbound?f.landing:f.departure,outbound);
   const fade=ease((story-9700)/650);colonies[portion].setAttribute('opacity',String(1-fade));
   FEEDING_BEATS.forEach((t,i)=>{if(ms>=t&&!action.cues.has(i)){action.cues.add(i);if(ms-t<120)playFeedingSound(sound,i,small,(feedingTime(23350)-ms)/1000);}});
   if(f.consumed&&!run.committed){run.committed=true;eaten.set(piece,portion+1);}
   if(f.done){cancel();return;}raf=requestAnimationFrame(tick);
  }
  raf=requestAnimationFrame(tick);return true;
 }
 document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});reduced.addEventListener('change',cancel);window.addEventListener('resize',cancel);window.addEventListener('pagehide',cancel);
 return {handles,start,cancel,clear,get active(){return !!run;}};
}
