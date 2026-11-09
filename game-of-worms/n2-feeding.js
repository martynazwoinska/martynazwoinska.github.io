import {add,at,relative,ease,clamp,matrix,recordedSound} from './scene-performance.js?v=20261109-n2-soft-audio-60';
import {createDiveGeometry,DIVE_PREPARE_MS,DIVE_FLIGHT_MS,DIVE_ENTRY_PHASE} from './n2-dive-motion.js?v=20261107-dive-46';
import {createDivingTower,defaultTowerPosition} from './n2-diving-tower.js?v=20261109-n2-tower-61';
import {createDiveOutfit} from './n2-dive-outfit.js?v=20261108-n2-outfit-55';

export const DIVE_DELAY=DIVE_PREPARE_MS+260-1250;
// Compress only the dive in the choreography clock. Surface movement and
// feeding use their own slower timing; the return is not sped up.
const FLIGHT_REFERENCE_MS=2600,FLIGHT_SAVED_MS=FLIGHT_REFERENCE_MS-DIVE_FLIGHT_MS;
export function feedingTime(story){return DIVE_DELAY+(story<=1250?story:story<3850?1250+(story-1250)*DIVE_FLIGHT_MS/FLIGHT_REFERENCE_MS:story-FLIGHT_SAVED_MS);}
function feedingStory(ms){const t=ms-DIVE_DELAY;return t<=1250?t:t<1250+DIVE_FLIGHT_MS?1250+(t-1250)*FLIGHT_REFERENCE_MS/DIVE_FLIGHT_MS:t+FLIGHT_SAVED_MS;}
export const FEEDING_DURATION=feedingTime(29000);
export const FEEDING_LAPS=2;
// Distinct recorded nibbles are grouped into short grazing pauses. Their
// natural attacks drive the mouth pulse, with several quiet seconds between
// clusters. The source already carries gentle filtering and endpoint fades.
export const FEEDING_AUDIO={level:.009,attack:.005,release:.01};
export const FEEDING_CLIPS={a:{file:'n2-nibble-a.wav',duration:.24,peak:.065},b:{file:'n2-nibble-b.wav',duration:.23,peak:.085},c:{file:'n2-nibble-c.wav',duration:.26,peak:.055}};
export const FEEDING_CUES=[
 {story:5300,key:'a',level:1,cluster:1},{story:5650,key:'b',level:.85,cluster:1},{story:6080,key:'c',level:.92,cluster:1},
 {story:9760,key:'b',level:.96,cluster:2},{story:10120,key:'a',level:.88,cluster:2},
 {story:15200,key:'c',level:1,cluster:3},{story:15540,key:'a',level:.86,cluster:3},{story:15960,key:'b',level:.94,cluster:3},
 {story:20730,key:'b',level:.95,cluster:4},{story:21180,key:'c',level:.84,cluster:4}
];
export const FEEDING_BEATS=FEEDING_CUES.map(cue=>feedingTime(cue.story));
export function playFeedingSound(sound,index,lateMs=0){
 const cue=FEEDING_CUES[index];if(!cue)return false;
 const clip=FEEDING_CLIPS[cue.key],offset=Math.max(0,lateMs)/1000,duration=clip.duration-offset;if(duration<=.02)return false;
 return sound.play(cue.key,offset,duration,FEEDING_AUDIO.level*cue.level);
}
export function feedingBiteFrame(ms){
 for(let i=0;i<FEEDING_CUES.length;i++){
  const clip=FEEDING_CLIPS[FEEDING_CUES[i].key],elapsed=(ms-FEEDING_BEATS[i])/1000;
  if(elapsed>=0&&elapsed<clip.duration)return{amount:elapsed<clip.peak?ease(elapsed/clip.peak):1-ease((elapsed-clip.peak)/(clip.duration-clip.peak)),index:i};
 }
 return {amount:0,index:-1};
}
export function feedingMouthPose(samples,amount,scale=1){
 const head=samples[0],neck=samples[1],throat=samples[3],after=samples[4],angle=Math.atan2(head.y-neck.y,head.x-neck.x),open=clamp(amount);
 return{x:head.x-Math.cos(angle)*.18*scale,y:head.y-Math.sin(angle)*.18*scale,angle:angle*180/Math.PI,rx:(.07+.12*open)*scale,ry:(.22+.1*open)*scale,throatX:throat.x,throatY:throat.y,throatAngle:Math.atan2(neck.y-after.y,neck.x-after.x)*180/Math.PI,throatRx:(.32+.18*open)*scale,throatRy:(.22+.14*open)*scale,throatOpacity:.22+.33*open};
}
export function feedingEntryTarget(point,artMap){const width=Math.hypot(artMap.a,artMap.b)||1;return{x:point.x,y:point.y,normal:{x:-artMap.b/width,y:artMap.a/width}};}

export function feedingSceneChanged(before,after){return Math.abs(before.width-after.width)>.5||Math.abs(before.height-after.height)>.5;}

// Solve the fully enlarged pose once. Interpolating from the saved resting
// pose keeps the entire plate inside the scene throughout expansion/return.
export function feedingPlatePlacement(bounds,origin,scene,wanted){
 const scale=Math.min(wanted.scale,(scene.right-scene.left)/bounds.width,(scene.bottom-scene.top)/bounds.height);
 const fit=(value,min,max)=>Math.max(min,Math.min(max,value));
 return {scale,x:fit(wanted.x,scene.left-origin.x-(bounds.left-origin.x)*scale,scene.right-origin.x-(bounds.right-origin.x)*scale),y:fit(wanted.y,scene.top-origin.y-(bounds.top-origin.y)*scale,scene.bottom-origin.y-(bounds.bottom-origin.y)*scale)};
}

export function feedingTravel(progress,ramp=.08){
 const u=clamp(progress),total=1-ramp;
 if(u<ramp)return (.5*u-ramp/(2*Math.PI)*Math.sin(Math.PI*u/ramp))/total;
 if(u>1-ramp){const remaining=1-u;return 1-(.5*remaining-ramp/(2*Math.PI)*Math.sin(Math.PI*remaining/ramp))/total;}
 return (u-.5*ramp)/total;
}

// Move out of the entry point immediately. A short, gently slowing emergence
// feeds into the normal crawl speed, rather than hiding the head in a slow start.
export function feedingEntryTravel(progress){
 const u=clamp(progress),entry=.9/19.5,stop=1.2/19.5,body=1/13,speed=(1-body)/(1-entry-stop/2),initial=2*body/entry-speed;
 if(u===0||u===1)return u;
 if(u<entry){const q=u/entry;return speed*u+(initial-speed)*entry*(q-q**3+.5*q**4);}
 const t=u-entry,steady=1-entry-stop;
 if(t<=steady)return body+speed*t;
 const q=(t-steady)/stop;return body+speed*(steady+stop*(q/2+Math.sin(Math.PI*q)/(2*Math.PI)));
}

// Crawl-like curvature retained during the fictional jump: about 1.5 spatial
// cycles, travelling from the head (s=1) towards the tail (s=0), with weaker
// posterior bending and fixed endpoints for clean face and tail hand-offs.
export function flightBend(s,progress,small=false,returning=false){
 const position=clamp(s),u=clamp(progress),cycles=small?1.4:1.5,phase=(returning?.52:.68)*u,amplitude=small?(returning?.016:.019):(returning?.032:.042),envelope=Math.sin(Math.PI*position)**1.08*(.68+.32*position);
 return amplitude*envelope*Math.sin(Math.PI*2*(cycles*position+phase))*Math.sin(Math.PI*u);
}

export function feedingFrame(ms,small=false){
 const story=feedingStory(ms),takeoff=ease((ms-80)/160),landing=ease((story-3120)/730),departure=ease((story-23350)/650),home=ease((story-27200)/450);
 const impactProgress=clamp((story-3120)/900),plate=ease((ms-80)/620)*(1-ease((story-27600)/800));
 return {
  plate,landing,departure,home,
  // The primary emerges head first after its tail has entered the food.
  crawler:Number(story>=3850&&story<23350),
  crawl:(small?feedingTravel:feedingEntryTravel)((story-3850)/19500),
  wave:1,
  jumpOut:clamp((story-1250)/FLIGHT_REFERENCE_MS),
  jumpBack:1-clamp((story-23350)/3850),
  jumpOpacity:Math.max(takeoff*Number(story<3850),Number(story>=23350)*(1-home)),
  worm:1-takeoff*(1-home),
  anticipation:clamp((ms-260)/DIVE_PREPARE_MS),
  impact:Math.sin(Math.PI*impactProgress)*(1-impactProgress),
  splash:Math.sin(Math.PI*clamp((story-3100)/1150)),
  consumed:story>=10350,
  done:ms>=FEEDING_DURATION
 };
}

// An early tap waits only until the tail has emerged. Departure then starts
// from that exact crawling pose, without completing another circuit first.
export function feedingExit(ms){
 if(ms>=feedingTime(23350))return null;
 const at=Math.max(ms,feedingTime(4750)),frame=feedingFrame(at);
 return {at,crawl:frame.crawl,consumed:frame.consumed};
}
export function feedingPlayback(ms,exit=null){
 const leaving=exit&&ms>=exit.at,mealStory=feedingStory(leaving?exit.at:ms),story=leaving?23350+ms-exit.at:mealStory,frame=feedingFrame(feedingTime(story));
 if(leaving){frame.crawl=exit.crawl;frame.consumed=exit.consumed;}
 return {story,mealStory,frame};
}

// Two calm laps around an ellipse that follows the plate's perspective.
// The start angle meets the colony being eaten, but the route never loops,
// reverses or leaves the agar.
export function feedingRoute(t,_variant=0,small=false,target={x:1,y:0}){
 const rx=small?26:38,ry=small?7.6:10.5,direction=_variant===-1?-1:1,phase=Math.atan2(target.y/ry,target.x/rx),table=ellipseArcTable(rx,ry),angle=table.angle(table.fraction(phase)+direction*t*FEEDING_LAPS);
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

const BODY_HISTORY=1/13;
function wormMidline(track,t,small){
 const count=33,span=BODY_HISTORY;
 return Array.from({length:count},(_,i)=>{
  const progress=i/(count-1),sampleTime=t-progress*span,p=track(sampleTime);
  return {x:p.x,y:p.y,time:sampleTime,position:progress};
 });
}

export function feedingWormPose(t,small=false,target={x:1,y:0},waveAmount=1,direction=1){
 const samples=wormMidline(q=>feedingTrack(q,direction,small,target,waveAmount),t,small),head=samples[0],tail=samples.at(-1);
 const length=samples.slice(1).reduce((sum,p,i)=>sum+Math.hypot(p.x-samples[i].x,p.y-samples[i].y),0);
 return {samples,head,tail,length,angle:Math.atan2(head.y-tail.y,head.x-tail.x)};
}

export function feedingOutline(samples,small=false,widthScale=1){
 const max=small?.88:1.15,head=small?.3:.4,tail=.06;
 const side=(p,i,sign)=>{
  const progress=p.position,before=samples[Math.max(0,i-1)],after=samples[Math.min(samples.length-1,i+1)],length=Math.hypot(after.x-before.x,after.y-before.y)||1;
  const width=((1-progress)*head+progress*tail+max*Math.sin(Math.PI*progress)**.65)*widthScale;
  return {x:p.x-(after.y-before.y)/length*width*sign,y:p.y+(after.x-before.x)/length*width*sign};
 };
 const left=samples.map((p,i)=>side(p,i,1)),right=samples.map((p,i)=>side(p,i,-1)).reverse();
 const highlight=samples.slice(2,9).map((p,i)=>{
  const before=samples[Math.max(0,i+1)],after=samples[Math.min(samples.length-1,i+3)],length=Math.hypot(after.x-before.x,after.y-before.y)||1;
  return {x:p.x-(after.y-before.y)/length*(small?.34:.42)*widthScale,y:p.y+(after.x-before.x)/length*(small?.34:.42)*widthScale};
 });
 const centreLength=samples.slice(1).reduce((sum,p,i)=>sum+Math.hypot(p.x-samples[i].x,p.y-samples[i].y),0);
 return {
  body:samples.length<2?'':`M${left.map(p=>`${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join('L')}L${right.map(p=>`${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join('L')}Z`,
  highlight:highlight.length<2?'':`M${highlight.map(p=>`${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join('L')}`,
  length:centreLength
 };
}

export function feedingSurfaceSamples(samples,progress,entry){
 if(progress>=BODY_HISTORY)return samples;
 const visible=samples.filter(p=>p.time>=0);
 if(progress>0&&visible.at(-1)?.time>0)visible.push({...entry,time:0,position:progress/BODY_HISTORY});
 return visible;
}

function wormShape(track,t,small){
 const whole=wormMidline(track,t,small),samples=small?whole:feedingSurfaceSamples(whole,t,track(0));
 const length=whole.slice(1).reduce((sum,p,i)=>sum+Math.hypot(p.x-whole[i].x,p.y-whole[i].y),0);
 return {...feedingOutline(samples,small),length,samples:whole,head:whole[0],tail:whole.at(-1)};
}

function rippleFrame(ms,start,duration=420){
 const progress=clamp((ms-start)/duration);
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

// Keep one visible body throughout the size change. Interpolating the
// segment angles and lengths avoids a collapsed silhouette while it turns and
// shrinks into the exact head-to-tail pose already used by the plate crawler.
export function companionLandingPose(source,plate,progress){
 const u=clamp(progress),destination=[...plate].reverse(),n=source.length;
 const segments=points=>points.slice(1).map((p,i)=>({length:Math.hypot(p.x-points[i].x,p.y-points[i].y),angle:Math.atan2(p.y-points[i].y,p.x-points[i].x)}));
 const a=segments(source),b=segments(destination),wrap=x=>Math.atan2(Math.sin(x),Math.cos(x));
 for(let i=n-3;i>=0;i--){a[i].angle=a[i+1].angle+wrap(a[i].angle-a[i+1].angle);b[i].angle=b[i+1].angle+wrap(b[i].angle-b[i+1].angle);}
 const turn=a.at(-1).angle+wrap(b.at(-1).angle-a.at(-1).angle)-b.at(-1).angle;
 const length=a.reduce((s,p)=>s+p.length,0),targetLength=b.reduce((s,p)=>s+p.length,0),scale=1+(targetLength/length-1)*ease((u-.08)/.92),blend=ease((u-.12)/.88);
 const flight=measuredPath(ballisticHeadPath(source.at(-1),destination.at(-1),true)),head=flight.atDistance(flight.total*ease(u)),points=Array(n);points[n-1]=head;
 for(let i=n-2;i>=0;i--){const bend=flightBend(i/(n-1),u,true)*3*Math.sin(Math.PI*u),angle=a[i].angle+(b[i].angle+turn-a[i].angle)*blend+bend,span=a[i].length*scale*(1-blend)+b[i].length*blend;points[i]={x:points[i+1].x-Math.cos(angle)*span,y:points[i+1].y-Math.sin(angle)*span};}
 // Preserve exact coordinates at either handoff, including rounded SVG paths.
 return {points:u===0?source.map(p=>({x:p.x,y:p.y})):u===1?destination:points,scale,appearance:ease((u-.3)/.4)};
}

// Keep the opened, head-first dive intact. Only the food plane hides it.
// Bound the underwater travel so even a high tower does not finish sinking
// early and leave an empty pause before the small head emerges.
export function createPrimaryImmersion(diver,target,offset={x:0,y:0},clearance=8){
 const start=DIVE_ENTRY_PHASE,n=target.normal||{x:0,y:1},contact=diver.flight(start,target,offset),epsilon=.00001,before=diver.flight(start-epsilon,target,offset).points.at(-1),head=contact.points.at(-1),distance=-Math.min(...contact.points.map(p=>(p.x-target.x)*n.x+(p.y-target.y)*n.y))+clearance;
 const speed=Math.max(0,((head.x-before.x)*n.x+(head.y-before.y)*n.y)/epsilon*(1-start)),rate=Math.max(1,speed/(3*distance)),control=speed/(3*rate);
 return {pose(t){
  if(t<=start)return {...diver.flight(t,target,offset),appearance:0};
  const q=clamp((t-start)/(1-start)),w=1-(1-q)**rate,r=1-w,depth=3*r*r*w*control+(3*r*w*w+w**3)*distance;
  return {points:contact.points.map(p=>({x:p.x+n.x*depth,y:p.y+n.y*depth})),scale:contact.scale,appearance:0};
 }};
}

// Uncoil while still tiny, then grow on one direct route home. Local body
// coordinates avoid accumulated joint-angle turns and the old tower detour.
export function returnToSourcePose(source,plate,progress,normal={x:0,y:1}){
 const u=clamp(progress),from=[...plate].reverse(),start=from.at(-1),end=source.at(-1),frame=points=>{const h=points.at(-1),t=points[0],length=Math.hypot(h.x-t.x,h.y-t.y),angle=Math.atan2(h.y-t.y,h.x-t.x),c=Math.cos(angle),s=Math.sin(angle);return{length,angle,points:points.map(p=>({x:((p.x-h.x)*c+(p.y-h.y)*s)/length,y:(-(p.x-h.x)*s+(p.y-h.y)*c)/length}))};},a=frame(from),b=frame(source);
 const reshape=ease(u/.32),growth=ease((u-.32)/.68),angle=a.angle+Math.atan2(Math.sin(b.angle-a.angle),Math.cos(b.angle-a.angle))*reshape,c=Math.cos(angle),s=Math.sin(angle);
 const unit=(p,q)=>{const d=Math.hypot(q.x-p.x,q.y-p.y)||1;return{x:(q.x-p.x)/d,y:(q.y-p.y)/d};},incoming=unit(from.at(-2),start),outgoing=unit(source.at(-2),end),distance=Math.hypot(end.x-start.x,end.y-start.y),reach=Math.min(55,distance*.22),lift=Math.min(65,Math.max(20,distance*.24)),p1={x:start.x+incoming.x*reach-normal.x*lift,y:start.y+incoming.y*reach-normal.y*lift},p2={x:end.x-outgoing.x*reach,y:end.y-outgoing.y*reach},q=ease(u),r=1-q,head={x:r**3*start.x+3*r*r*q*p1.x+3*r*q*q*p2.x+q**3*end.x,y:r**3*start.y+3*r*r*q*p1.y+3*r*q*q*p2.y+q**3*end.y};
 const length=ps=>ps.slice(1).reduce((v,p,i)=>v+Math.hypot(p.x-ps[i].x,p.y-ps[i].y),0),initialLength=length(from),sourceLength=length(source),targetLength=initialLength*Math.exp(Math.log(sourceLength/initialLength)*growth);
 // First straighten, then recover the home curve. Directly mixing opposite
 // neck bends creates a tiny cusp, even when the centreline never crosses.
 const local=a.points.map((p,i)=>{const straight={x:i/(source.length-1)-1,y:0},from=u<.16?p:straight,to=u<.16?straight:b.points[i],blend=ease(u<.16?u/.16:(u-.16)/.16);return{x:from.x+(to.x-from.x)*blend,y:from.y+(to.y-from.y)*blend};}),size=targetLength/length(local),points=local.map(p=>({x:head.x+(p.x*c-p.y*s)*size,y:head.y+(p.x*s+p.y*c)*size}));
 return {points:u===0?from:u===1?source.map(p=>({x:p.x,y:p.y})):points,scale:targetLength/sourceLength,appearance:1-ease((u-.35)/.45)};
}


function jumpingWorm(root,body,small,towerPosition={x:0,y:0}){
 const paused=[];for(const animation of body.getAnimations?.({subtree:true})||[])if(animation.playState==='running'){animation.pause();paused.push(animation);}
 const base=relative(root,body),spine=body.querySelector('.worm-line,.companion-line'),spineLength=spine.getTotalLength(),sampleCount=33;
 const sourcePoints=Array.from({length:sampleCount},(_,i)=>{const p=spine.getPointAtLength(spineLength*i/(sampleCount-1));return at(base,p.x,p.y);}),tail=sourcePoints[0],start=sourcePoints.at(-1);
 const sourceDistance=[0];for(let i=1;i<sourcePoints.length;i++)sourceDistance[i]=sourceDistance[i-1]+Math.hypot(sourcePoints[i].x-sourcePoints[i-1].x,sourcePoints[i].y-sourcePoints[i-1].y);
 const sourceLength=sourceDistance.at(-1),sourceAngle=Math.atan2(start.y-tail.y,start.x-tail.x),sourceHeadAngle=Math.atan2(start.y-sourcePoints.at(-2).y,start.x-sourcePoints.at(-2).x),rootScale=Math.sqrt(Math.abs(base.a*base.d-base.b*base.c))||1;
 const diver=createDiveGeometry(sourcePoints,small),defs=add(root,'defs'),clipId=`n2-entry-plane-${++clipNumber}`,clip=add(defs,'clipPath',{id:clipId,clipPathUnits:'userSpaceOnUse'}),clipRect=add(clip,'rect',{x:-3000,y:-3000,width:6000,height:3000});
 const layer=add(root,'g',{'data-n2-jump-worm':'','pointer-events':'none','aria-hidden':'true',opacity:0}),shadow=add(layer,'path',{class:'n2-jump-shadow',pathLength:1}),line=add(layer,'path',{class:'n2-jump-body',pathLength:1}),highlight=add(layer,'path',{class:'n2-jump-highlight',pathLength:1}),maleTail=small?add(layer,'path',{class:'male-tail n2-jump-male-tail'}):null,face=add(layer,'g',{'data-n2-jump-face':''});
 const landingArt=add(layer,'g',{class:'n2-surface-body','data-n2-surface-body':'',opacity:0}),landingBody=add(landingArt,'path',{class:'n2-crawler-body'}),landingHighlight=add(landingArt,'path',{class:'n2-crawler-highlight'}),landingMouth=add(landingArt,'ellipse',{class:'n2-crawler-mouth','data-n2-feeding-mouth':''}),landingThroat=add(landingArt,'ellipse',{class:'n2-crawler-throat'});
 let landingPlan=null,landingKey='';
 // Keep the diver after both worm/accessory groups, in front of the plate.
 body.querySelectorAll('.worm-cheek,.worm-eye,.worm-eye-shine,.worm-smile').forEach(n=>face.append(n.cloneNode(true)));
 const outfit=createDiveOutfit(root,body,layer,sourcePoints,small?'companion':'primary');
 function launchVector(target){const {dx,dy,side,height,lateral}=ballisticProfile(start,target,small),vx=dx+side*lateral*4,vy=dy-height*4,length=Math.hypot(vx,vy)||1;return{x:vx/length,y:vy/length};}
 function preparedPose(anticipation,launch){
  const cycles=small?1.4:1.5,points=sourcePoints.map((p,i)=>{const s=i/(sourcePoints.length-1),before=sourcePoints[Math.max(0,i-1)],after=sourcePoints[Math.min(sourcePoints.length-1,i+1)],length=Math.hypot(after.x-before.x,after.y-before.y)||1,localNormal={x:-(after.y-before.y)/length,y:(after.x-before.x)/length},compression=.085*anticipation*s,envelope=Math.sin(Math.PI*s)**1.08*(.68+.32*s),bend=sourceLength*(small?.016:.014)*anticipation*envelope*Math.sin(Math.PI*2*(cycles*s+.12*anticipation));return{x:tail.x+(p.x-tail.x)*(1-compression)+localNormal.x*bend,y:tail.y+(p.y-tail.y)*(1-compression)+localNormal.y*bend+7*rootScale*anticipation*s*s};});
  const head=points.at(-1),anchor=Math.floor((points.length-1)*.7),steerLength=sourceLength*.24;
  for(let i=anchor+1;i<points.length;i++){const q=(i-anchor)/(points.length-1-anchor),weight=anticipation*ease(q),desired={x:head.x-launch.x*steerLength*(1-q),y:head.y-launch.y*steerLength*(1-q)};points[i]={x:points[i].x+(desired.x-points[i].x)*weight,y:points[i].y+(desired.y-points[i].y)*weight};}
  return points;
 }
 function set(progress,target,opacity,_targetLength,_targetAngle,anticipation=0,_impact=0,settle=0,outbound=true,platePose=null){
  if(opacity<=0){layer.setAttribute('opacity','0');return;}
  const u=clamp(progress),launch=launchVector(target),prepared=preparedPose(outbound&&u>0?1:ease(anticipation),launch);
  let head,points,bodyScale=1,appearance=0;
  if(!outbound){
   const pose=returnToSourcePose(sourcePoints,platePose.mapped,1-u,target.normal);points=pose.points;bodyScale=pose.scale;appearance=pose.appearance;
  }else if(small){
   const pose=companionLandingPose(prepared,platePose.mapped,u);points=pose.points;bodyScale=pose.scale;appearance=pose.appearance;
  }else if(outbound&&u===1){
   points=platePose.mapped.slice().reverse();appearance=1;
  }else if(outbound){
   let pose;
   if(u===0)pose=diver.prepare(anticipation,towerPosition);
   else {const key=`${target.x}:${target.y}:${target.normal.x}:${target.normal.y}`;if(key!==landingKey){landingPlan=createPrimaryImmersion(diver,target,towerPosition,23*rootScale*diver.scale);landingKey=key;}pose=landingPlan.pose(u);}
   points=pose.points;bodyScale=pose.scale;appearance=pose.appearance||0;
  }
  const inverse=platePose.map.inverse(),local=points.slice().reverse().map((p,i)=>{const q=at(inverse,p.x,p.y);return{x:q.x,y:q.y,position:i/(points.length-1)};}),localLength=local.slice(1).reduce((s,p,i)=>s+Math.hypot(p.x-local[i].x,p.y-local[i].y),0),outline=u===1?platePose.shape:feedingOutline(local,small,localLength/platePose.shape.length);
  landingArt.setAttribute('transform',matrix(platePose.map));landingArt.setAttribute('opacity',String(appearance));landingBody.setAttribute('d',outline.body);landingHighlight.setAttribute('d',outline.highlight);
  const mouth=feedingMouthPose(local,platePose.bite||0,localLength/platePose.shape.length),emerging=outbound&&u===1;
  landingMouth.setAttribute('transform',`translate(${mouth.x} ${mouth.y}) rotate(${mouth.angle})`);landingMouth.setAttribute('rx',String(mouth.rx));landingMouth.setAttribute('ry',String(mouth.ry));landingMouth.setAttribute('opacity',String(emerging?clamp(platePose.shape.samples[0].time*150):1));
  landingThroat.setAttribute('transform',`translate(${mouth.throatX} ${mouth.throatY}) rotate(${mouth.throatAngle})`);landingThroat.setAttribute('rx',String(mouth.throatRx));landingThroat.setAttribute('ry',String(mouth.throatRy));landingThroat.setAttribute('opacity',String(mouth.throatOpacity*(emerging?clamp(platePose.shape.samples[3].time*150):1)));
  const d=smoothPath(points);
  line.setAttribute('d',d);shadow.setAttribute('d',d);shadow.setAttribute('transform',`translate(0 ${7*rootScale*bodyScale})`);
  const shine=points.slice(2,-1).map((p,i,a)=>{const before=a[Math.max(0,i-1)],after=a[Math.min(a.length-1,i+1)],length=Math.hypot(after.x-before.x,after.y-before.y)||1,offset=5.5*rootScale*bodyScale;return{x:p.x-(after.y-before.y)/length*offset,y:p.y+(after.x-before.x)/length*offset};});highlight.setAttribute('d',smoothPath(shine));
  for(const p of[shadow,line,highlight])p.setAttribute('opacity',String(1-appearance));
  line.style.strokeWidth=`${(small?42:46)*rootScale*bodyScale}`;shadow.style.strokeWidth=`${(small?50:54)*rootScale*bodyScale}`;highlight.style.strokeWidth=`${(small?7:8)*rootScale*bodyScale}`;
  if(maleTail&&points.length>1){const end=points[0],next=points[1],length=Math.hypot(next.x-end.x,next.y-end.y)||1,tx=(next.x-end.x)/length,ty=(next.y-end.y)/length,nx=-ty,ny=tx,tailScale=rootScale*bodyScale;maleTail.setAttribute('d',`M${end.x.toFixed(2)} ${end.y.toFixed(2)}L${(end.x-tx*29*tailScale+nx*13*tailScale).toFixed(2)} ${(end.y-ty*29*tailScale+ny*13*tailScale).toFixed(2)}L${(end.x-tx*17*tailScale-nx*15*tailScale).toFixed(2)} ${(end.y-ty*17*tailScale-ny*15*tailScale).toFixed(2)}Z`);maleTail.style.strokeWidth=`${3*tailScale}`;maleTail.setAttribute('opacity',String(1-appearance));}
  // Install the surface mask before contact, while the whole diver is above
  // it. The head, body and tail then pass through the same real entry plane.
  if(!small&&outbound&&u>=DIVE_ENTRY_PHASE*.82&&u<1){const n=target.normal;clipRect.setAttribute('transform',`matrix(${n.y} ${-n.x} ${n.x} ${n.y} ${target.x} ${target.y})`);layer.setAttribute('clip-path',`url(#${clipId})`);}else layer.removeAttribute('clip-path');
  head=points.at(-1);const neck=points.at(-2),headAngle=Math.atan2(head.y-neck.y,head.x-neck.x),faceTransform=new DOMMatrix().translate(head.x,head.y).rotate((headAngle-sourceHeadAngle)*180/Math.PI).scale(bodyScale).translate(-start.x,-start.y).multiply(base);
  face.setAttribute('transform',matrix(faceTransform));face.setAttribute('opacity',String(1-appearance));layer.setAttribute('opacity',String(!small&&outbound&&u>0?1:opacity));
  const outfitScale=outbound&&u===1?points.slice(1).reduce((sum,p,i)=>sum+Math.hypot(p.x-points[i].x,p.y-points[i].y),0)/sourceLength:bodyScale;
  outfit.set(points,outfitScale,outbound&&u===1?clamp(platePose.shape.samples[0].time/BODY_HISTORY):1);
 }
 return {sourceAngle,set,remove(){outfit.remove();layer.remove();defs.remove();for(const animation of paused)if(animation.playState==='paused')animation.play();}};
}

// The primary dives from the movable springboard, makes two slow circuits
// of the OP50 lawn and returns home. The companion plate is only a movable prop.
export function createN2Feeding(habitat,onChange=()=>{}){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),eaten=new Map(),sound=recordedSound(Object.fromEntries(Object.entries(FEEDING_CLIPS).map(([key,clip])=>[key,clip.file])),FEEDING_AUDIO);let run=null,held=null,raf=0;
 let tower=null,towerRevealed=false,towerUserPlaced=false;const towerPosition={x:0,y:0};
 const handles=p=>p?.dataset.accessoryFamily==='ngm-agar-plate'&&p.dataset.wormPart==='primary';
 function paint(piece){const n=eaten.get(piece)||0;piece.querySelectorAll('.op50-colony').forEach((c,i)=>c.setAttribute('opacity',i<n?'0':'1'));}
 function hideTower(){const focused=tower&&tower.element===document.activeElement;towerRevealed=false;tower?.remove();tower=null;if(focused)habitat.querySelector('[data-accessory-family="ngm-agar-plate"][data-worm-part="primary"]')?.focus({preventScroll:true});}
 function cancel(){cancelAnimationFrame(raf);raf=0;sound.stop();tower?.element?.removeAttribute('opacity');if(held){const old=held;held=null;old.restore();onChange();}if(!run)return;const old=run;run=null;old.restore();paint(old.piece);onChange();}
 function grab(piece){
  if(held?.piece===piece){cancelAnimationFrame(raf);return true;}
  if(run?.piece!==piece)return false;
  cancelAnimationFrame(raf);sound.stop();run.pausedAt??=performance.now();return true;
 }
 function drag(piece){
  if(run?.piece===piece&&run.pausedAt!=null){const old=run;run=null;old.detach();held={piece,art:old.art,scene:old.scene,restore:()=>old.restorePlate(true)};paint(piece);onChange();}
 }
 function requestExit(piece){
  if(run?.piece!==piece)return false;
  run.exit??=feedingExit(run.lastMs||0);sound.stop();return true;
 }
 function release(piece,reposition,cancelled=false){
  if(run?.piece===piece&&run.pausedAt!=null){
   if(cancelled){cancel();return true;}
   if(run.started!==null)run.started+=performance.now()-run.pausedAt;
   run.pausedAt=null;requestExit(piece);raf=requestAnimationFrame(run.tick);return true;
  }
  if(held?.piece!==piece)return false;
  // Save the displayed pose, restore the resting art, and keep its centre at
  // the drop point. A short matrix tween removes the meal's magnification.
  const old=held,art=old.art,before=DOMMatrix.fromMatrix(art.getScreenCTM()),box=art.getBoundingClientRect();held=null;old.restore();
  const rest=art.getBoundingClientRect();reposition((box.left+box.right-rest.left-rest.right)/2,(box.top+box.bottom-rest.top-rest.bottom)/2);
  const hit=piece.querySelector(':scope > .accessory-hit-target'),hitNext=hit?.nextSibling;
  const pivots=[piece,art].map(n=>({n,style:n.getAttribute('style'),box:n.getBBox()}));
  pivots.forEach(({n,box})=>{n.style.transformBox='view-box';n.style.transformOrigin=`${box.x+box.width/2}px ${box.y+box.height/2}px`;});
  const parent=art.parentNode,from=DOMMatrix.fromMatrix(parent.getScreenCTM()).inverse().multiply(before).multiply(relative(parent,art).inverse()),carrier=add(parent,'g',{'data-n2-held-plate':''});art.before(carrier);carrier.append(art);
  const restore=()=>{carrier.replaceWith(art);const currentHit=piece.querySelector(':scope > .accessory-hit-target');if(currentHit!==hit){currentHit?.remove();if(hit)piece.insertBefore(hit,hitNext?.parentNode===piece?hitNext:null);}const values=['--accessory-user-x','--accessory-user-y','--accessory-user-scale'].map(k=>[k,piece.style.getPropertyValue(k)]);pivots.forEach(({n,style})=>style===null?n.removeAttribute('style'):n.setAttribute('style',style));values.forEach(([k,v])=>piece.style.setProperty(k,v));};
  const settling=held={piece,art,scene:old.scene,restore},started=performance.now();carrier.setAttribute('transform',matrix(from));
  function settle(now){if(held!==settling)return;const t=reduced.matches?1:ease((now-started)/260),m=new DOMMatrix();for(const k of['a','b','c','d','e','f'])m[k]=(k==='a'||k==='d'?1:0)*t+from[k]*(1-t);carrier.setAttribute('transform',matrix(m));if(t===1){held=null;restore();onChange();}else raf=requestAnimationFrame(settle);}
  raf=requestAnimationFrame(settle);return true;
 }
 function clear(){cancel();hideTower();eaten.clear();habitat.querySelectorAll('[data-accessory-family="ngm-agar-plate"]').forEach(paint);}
 function syncTower(resetDefault=false){const plate=habitat.querySelector('[data-accessory-family="ngm-agar-plate"][data-worm-part="primary"]'),root=habitat.querySelector('#worm-species'),available=plate&&!plate.closest('[hidden]')&&root;if(!available)towerRevealed=false;if(resetDefault===true&&!towerUserPlaced){tower?.remove();tower=null;}if(towerRevealed&&available){if(!tower?.element?.isConnected){tower?.remove();if(!towerUserPlaced)Object.assign(towerPosition,defaultTowerPosition());tower=createDivingTower(root,habitat,towerPosition,reset=>{towerUserPlaced=!reset;cancel();});}}else if(tower){tower.remove();tower=null;}}
 if(typeof MutationObserver!=='undefined'){const observer=new MutationObserver(syncTower);observer.observe(habitat,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});syncTower();}
 function start(piece){
  if(!handles(piece)||piece.closest('[hidden]'))return false;
  if(requestExit(piece))return true;
  cancel();const colonies=[...piece.querySelectorAll('.op50-colony')];let portion=eaten.get(piece)||0;
  if(portion>=colonies.length){hideTower();eaten.set(piece,0);paint(piece);return true;}
  if(reduced.matches){hideTower();eaten.set(piece,portion+1);paint(piece);return true;}
  towerRevealed=true;syncTower(true);
  const part=piece.dataset.wormPart,small=part==='companion',compact=innerWidth<520,root=habitat.querySelector('#worm-species');
  const body=habitat.querySelector(part==='companion'?'.companion-body':'.worm-body'),art=piece.querySelector('.location-accessory-art'),parent=art.parentNode;
  // A resized accessory must keep its original pivot while its child grows.
  // Capture both before adding the carrier, crawler and splash to their bounds.
  const hitTarget=piece.querySelector(':scope > .accessory-hit-target'),hitNext=hitTarget?.nextSibling;
  const pivots=[piece,art].map(n=>({n,style:n.getAttribute('style'),box:n.getBBox()}));
  pivots.forEach(({n,box})=>{n.style.transformBox='view-box';n.style.transformOrigin=`${box.x+box.width/2}px ${box.y+box.height/2}px`;});
  const artToParent=relative(parent,art),centre=at(artToParent,0,0),parentMap=parent.getScreenCTM(),screenCentre=at(parentMap,centre.x,centre.y),scene=habitat.getBoundingClientRect(),wanted=at(parentMap,centre.x+(compact?18:68),centre.y-8);
  const placement=feedingPlatePlacement(art.getBoundingClientRect(),screenCentre,{left:scene.left+10,right:scene.right-10,top:scene.top+10,bottom:scene.bottom-10},{scale:compact?2.05:1.62,x:wanted.x-screenCentre.x,y:wanted.y-screenCentre.y}),placed=at(parentMap.inverse(),screenCentre.x+placement.x,screenCentre.y+placement.y);
  const carrier=add(parent,'g',{'data-feeding-carrier':''});art.before(carrier);carrier.append(art);
  syncTower();const target={x:+colonies[portion].getAttribute('cx'),y:+colonies[portion].getAttribute('cy')},overlay=crawlerOverlay(art,small),jumper=jumpingWorm(root,body,small,{...towerPosition}),initialMap=relative(root,art);
  const angleFor=direction=>{const pose=feedingWormPose(0,small,target,0,direction),head=at(initialMap,pose.head.x,pose.head.y),tail=at(initialMap,pose.tail.x,pose.tail.y);return Math.atan2(head.y-tail.y,head.x-tail.x);},turnDistance=angle=>Math.abs(Math.atan2(Math.sin(angle-jumper.sourceAngle),Math.cos(angle-jumper.sourceAngle)));
  const direction=turnDistance(angleFor(-1))<turnDistance(angleFor(1))?-1:1,route=t=>feedingRoute(t,direction,small,target);
  const groundShadow=body.parentElement.querySelector(':scope > .worm-ground-shadow'),shadow=art.querySelector('.plate-shadow'),shadowOpacity=shadow.getAttribute('opacity'),actors=[body,groundShadow,habitat.querySelector('#doodle-canvas'),...habitat.querySelectorAll(`.accessory-piece[data-worm-part="${part}"][data-accessory-family="n2-lab-coat"],.accessory-piece[data-worm-part="${part}"][data-accessory-family="n2-lab-goggles"],.accessory-piece[data-worm-part="${part}"][data-accessory-family="cryo-vial-jetpack"]`)].filter(Boolean).map(n=>({n,opacity:n.getAttribute('opacity'),inactive:n.getAttribute('data-n2-feeding-inactive')}));
  const restoreActor=({n,opacity,inactive})=>{opacity===null?n.removeAttribute('opacity'):n.setAttribute('opacity',opacity);inactive===null?n.removeAttribute('data-n2-feeding-inactive'):n.setAttribute('data-n2-feeding-inactive',inactive);};
  const detach=()=>{jumper.remove();overlay.remove();actors.forEach(restoreActor);shadowOpacity===null?shadow.removeAttribute('opacity'):shadow.setAttribute('opacity',shadowOpacity);tower?.element?.removeAttribute('opacity');};
  const restorePlate=(keepPosition=false)=>{const values=keepPosition?['--accessory-user-x','--accessory-user-y','--accessory-user-scale'].map(k=>[k,piece.style.getPropertyValue(k)]):[];carrier.replaceWith(art);
   // ResizeObserver may have rebuilt this from the enlarged carrier. Restore
   // the original target before releasing the saved fill-box pivot.
   const currentHit=piece.querySelector(':scope > .accessory-hit-target');if(currentHit!==hitTarget){currentHit?.remove();if(hitTarget)piece.insertBefore(hitTarget,hitNext?.parentNode===piece?hitNext:null);}
   pivots.forEach(({n,style})=>style===null?n.removeAttribute('style'):n.setAttribute('style',style));values.forEach(([k,v])=>piece.style.setProperty(k,v));
  };
  const restore=()=>{detach();restorePlate();};
  run={piece,art,restore,restorePlate,detach,scene,tick,committed:false,started:null,pausedAt:null,lastMs:0,exit:null,cues:new Set()};const action=run;onChange();
  sound.prepare(Object.keys(FEEDING_CLIPS)).finally(()=>{if(run===action)action.started=action.pausedAt??performance.now();});
  function tick(now){
   if(run!==action)return;if(!piece.isConnected||piece.closest('[hidden]')||document.hidden){cancel();return;}
   if(run.pausedAt!==null)return;
   if(run.started===null){raf=requestAnimationFrame(tick);return;}
   const ms=now-run.started,{story,mealStory,frame:f}=feedingPlayback(ms,action.exit),scale=1+f.plate*(placement.scale-1),lift=f.plate*(placed.y-centre.y),shift=f.plate*(placed.x-centre.x);action.lastMs=ms;
   carrier.setAttribute('transform',`translate(${centre.x+shift} ${centre.y+lift}) scale(${scale}) translate(${-centre.x} ${-centre.y})`);
   shadow.setAttribute('opacity',String(.25+.75*(1-f.plate)));actors.forEach(actor=>{actor.n.setAttribute('opacity',String(f.worm));if(f.worm<.01)actor.n.setAttribute('data-n2-feeding-inactive','');else if(actor.inactive===null)actor.n.removeAttribute('data-n2-feeding-inactive');else actor.n.setAttribute('data-n2-feeding-inactive',actor.inactive);});
   // Keep each worm in the same foreground layer from hop through crawl
   // and return. Its body cannot jump behind the plate glare or splash.
   overlay.crawler.setAttribute('opacity','0');
   const track=q=>feedingTrack(q,direction,small,target,f.wave),shape=wormShape(track,f.crawl,small);overlay.body.setAttribute('d',shape.body);overlay.highlight.setAttribute('d',shape.highlight);
   const contact=small?3830:1250+FLIGHT_REFERENCE_MS*DIVE_ENTRY_PHASE,landing=rippleFrame(story,contact,1400),takeoff=rippleFrame(story,23350),ripple=landing.opacity>takeoff.opacity?landing:takeoff,entry=route(0);
   const ripplePoint=story>=23350?shape.head:entry;
   overlay.ripple.setAttribute('cx',ripplePoint.x);overlay.ripple.setAttribute('cy',ripplePoint.y);overlay.ripple.setAttribute('rx',String(3+ripple.progress*(small?7:10)));overlay.ripple.setAttribute('ry',String(1+ripple.progress*(small?2.2:3.2)));overlay.ripple.setAttribute('opacity',String(ripple.opacity));
   const splashProgress=clamp((story-contact)/(small?650:1400));overlay.splash.setAttribute('transform',`translate(${entry.x} ${entry.y})`);overlay.splash.setAttribute('opacity',String(Math.sin(Math.PI*splashProgress)));
   overlay.splashCover.setAttribute('rx',String((small?4.5:8)+splashProgress*(small?7:14)));overlay.splashCover.setAttribute('ry',String((small?1.8:3)+splashProgress*(small?2:4)));
   overlay.ringA.setAttribute('rx',String((small?4:6)+splashProgress*(small?12:18)));overlay.ringA.setAttribute('ry',String((small?1.4:2)+splashProgress*(small?3:5)));
   const second=clamp((splashProgress-.15)/.85);overlay.ringB.setAttribute('rx',String((small?3:5)+second*(small?9:14)));overlay.ringB.setAttribute('ry',String((small?1:1.5)+second*(small?2.5:4)));
   overlay.drops.forEach((drop,i)=>{const q=clamp((splashProgress-i*.08)/.72),side=i-1;drop.setAttribute('cx',String(side*(3+q*(small?5:8))));drop.setAttribute('cy',String(-Math.sin(Math.PI*q)*(small?6:10)-q*(i===1?1.5:0)));drop.setAttribute('opacity',String(Math.sin(Math.PI*q)));});
   const outbound=story<23350,jumpProgress=outbound?f.jumpOut:f.jumpBack;
   const artMap=relative(root,art),mapped=shape.samples.map(p=>at(artMap,p.x,p.y)),jumpTarget=feedingEntryTarget(outbound?at(artMap,entry.x,entry.y):mapped[0],artMap),jumpTail=mapped.at(-1),targetLength=mapped.slice(1).reduce((sum,p,i)=>sum+Math.hypot(p.x-mapped[i].x,p.y-mapped[i].y),0),targetAngle=Math.atan2(jumpTarget.y-jumpTail.y,jumpTarget.x-jumpTail.x);
   const bite=!action.exit&&f.crawler?feedingBiteFrame(ms).amount:0;
   jumper.set(jumpProgress,jumpTarget,f.jumpOpacity+f.crawler,targetLength,targetAngle,f.anticipation,f.impact,outbound?f.landing:f.departure,outbound,{mapped,map:artMap,shape,bite});
   const fade=ease((mealStory-9700)/650)*(action.exit&&!f.consumed?1-f.home:1);colonies[portion].setAttribute('opacity',String(1-fade));
   if(!action.exit)FEEDING_BEATS.forEach((t,i)=>{if(ms>=t&&!action.cues.has(i)){action.cues.add(i);if(ms-t<120)playFeedingSound(sound,i,ms-t);}});
   if(f.consumed&&!run.committed){run.committed=true;eaten.set(piece,portion+1);}
   // Clear the scene only after the worm and plate have returned home.
   tower?.element?.setAttribute('opacity',String(1-ease((story-28400)/600)));
   if(f.done){cancel();hideTower();return;}raf=requestAnimationFrame(tick);
  }
  raf=requestAnimationFrame(tick);return true;
 }
 document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});reduced.addEventListener('change',cancel);
 // Mobile browser bars can resize the viewport without changing the scene.
 window.addEventListener('resize',()=>{const active=run||held;if(active&&feedingSceneChanged(active.scene,habitat.getBoundingClientRect()))cancel();});window.addEventListener('pagehide',cancel);
 return {handles,start,cancel,clear,grab,drag,release,get active(){return !!(run||held);}};
}
