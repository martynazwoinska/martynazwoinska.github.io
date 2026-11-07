import {boardContact} from './n2-diving-tower.js?v=20261107-tower-44';
const clamp=x=>Math.max(0,Math.min(1,x));
const smooth=x=>{const t=clamp(x);return t*t*(3-2*t);};
const softer=x=>{const t=clamp(x);return t*t*t*(10+t*(-15+6*t));};
const mix=(a,b,t)=>a+(b-a)*t;
export const DIVE_PREPARE_MS=2233;
export const DIVE_FLIGHT_MS=1820;
export const DIVE_ENTRY_PHASE=.72;
const ENTRY_PHASE=DIVE_ENTRY_PHASE;
const hermite=(a,b,va,vb,t)=>(2*t**3-3*t*t+1)*a+(t**3-2*t*t+t)*va+(-2*t**3+3*t*t)*b+(t**3-t*t)*vb;
const anglesOf=points=>points.slice(1).map((p,i)=>Math.atan2(p.y-points[i].y,p.x-points[i].x));
const mixAngle=(a,b,t)=>a+Math.atan2(Math.sin(b-a),Math.cos(b-a))*t;
const centre=points=>points.reduce((a,p)=>({x:a.x+p.x/points.length,y:a.y+p.y/points.length}),{x:0,y:0});
function chain(lengths,angles,tail={x:0,y:0}){const points=[tail];for(let i=0;i<lengths.length;i++){const p=points.at(-1);points.push({x:p.x+lengths[i]*Math.cos(angles[i]),y:p.y+lengths[i]*Math.sin(angles[i])});}return points;}
function centredChain(lengths,angles){const points=chain(lengths,angles),c=centre(points);return points.map(p=>({x:p.x-c.x,y:p.y-c.y}));}
function localBody(lengths,fold,knee=0){
 // A diver-like hip fold and lower-body crouch. No travelling wave in the air:
 // the worm keeps its anatomy, but the comic action follows a human diver.
 const angles=lengths.map((_,i)=>{const s=(i+.5)/lengths.length;return fold*Math.tanh((s-.48)/.11)+(s<.52?knee*Math.sin(2*Math.PI*s/.52):0);});
 return centredChain(lengths,angles);
}
function place(points,c,a){const cs=Math.cos(a),sn=Math.sin(a);return points.map(p=>({x:c.x+p.x*cs-p.y*sn,y:c.y+p.x*sn+p.y*cs}));}

// The centre of mass travels independently of posture. The body first rises,
// rotates forward, opens from its pike, and then passes through the agar plane.
export function createDiveGeometry(source,small=false){
 const lengths=source.slice(1).map((p,i)=>Math.hypot(p.x-source[i].x,p.y-source[i].y)),scale=small?.9:.60,flightLengths=lengths.map(v=>v*scale),length=flightLengths.reduce((a,b)=>a+b,0),tail=source[0],angle=-1.05;
 const localStart=localBody(flightLengths,.40,.60),startRotated=place(localStart,{x:0,y:0},angle),sourceAngles=anglesOf(source);
 const poseAngles=(fold,knee=0)=>anglesOf(place(localBody(flightLengths,fold,knee),{x:0,y:0},-.95));
 const stanceAngles=poseAngles(.45,.18),crouchAngles=poseAngles(.90,1.40),launchAngles=anglesOf(startRotated);
 const releaseLocalAngles=anglesOf(localStart),extendedLocalAngles=anglesOf(localBody(flightLengths,.08));
 let launchTangent,jointTangents,lastPlan;
 const lowest=source.reduce((a,p,i)=>p.y>source[a].y?i:a,0);
 function launch(offset){const anchor=boardContact(offset,scale);return{x:anchor.x-startRotated[0].x,y:anchor.y-startRotated[0].y};}
 function airBody(air,entryAngle){
  const rotation=mix(angle,entryAngle,smooth(air)),fold=air<.50?mix(.08,1.10,smooth((air-.18)/.32)):mix(1.10,0,smooth((air-.50)/.50));
  const local=air<.18?centredChain(flightLengths,releaseLocalAngles.map((a,i)=>hermite(a,extendedLocalAngles[i],jointTangents[i],0,air/.18))):localBody(flightLengths,fold);
  return {points:place(local,{x:0,y:0},rotation),rotation};
 }
 function flightPlan(target,offset){
  const raw=target.normal||{x:0,y:1},norm=Math.hypot(raw.x,raw.y)||1,n={x:raw.x/norm,y:raw.y/norm},t={x:n.y,y:-n.x};
  const key=[target.x,target.y,n.x,n.y,offset.x,offset.y].join(':');if(lastPlan?.key===key)return lastPlan;
  const project=(p,axis)=>p.x*axis.x+p.y*axis.y,entryAngle=Math.atan2(n.y,n.x),start=launch(offset),entry=airBody(1,entryAngle).points.at(-1),end={x:target.x-entry.x,y:target.y-entry.y};
  const startN=project(start,n),endN=project(end,n),startT=project(start,t),endT=project(end,t),vn=project(launchTangent,n),vt=project(launchTangent,t),plane=project(target,n);
  // Keep the real push-off velocity. Adapt the arc's height to the target,
  // including a plate above the board, so the opened body approaches from
  // above rather than crossing the food plane and then climbing back out.
  let entrySpeed=Math.max(32,2*(endN-startN)-vn);
  for(let i=400;i<1000;i+=5){const a=i/1000,body=airBody(a,entryAngle).points,maxN=Math.max(...body.map(p=>project(p,n))),clearance=length*.06*softer((1-a)/.12);
   const needed=(hermite(startN,endN,vn,0,a)+maxN+clearance-plane)/(a*a*(1-a));entrySpeed=Math.max(entrySpeed,needed*1.01);
  }
  lastPlan={key,n,t,entryAngle,startN,endN,startT,endT,vn,vt,entrySpeed};return lastPlan;
 }
 const geometry={
  scale,length,
  prepare(t,offset={x:0,y:0}){
   const anchor=boardContact(offset,scale),u=clamp(t),dockedTail={x:anchor.x-(source[lowest].x-tail.x)*scale,y:anchor.y-(source[lowest].y-tail.y)*scale};
   // First hop onto the board with the original silhouette intact. Only after
   // landing does the body change posture; translation and posing do not compete.
   if(u<.34){const q=softer(u/.34),bodyScale=mix(1,scale,q),hop=38*Math.sin(Math.PI*q);return {scale:bodyScale,points:source.map(p=>({x:mix(tail.x,dockedTail.x,q)+(p.x-tail.x)*bodyScale,y:mix(tail.y,dockedTail.y,q)+(p.y-tail.y)*bodyScale-hop}))};}
   let angles,x=anchor.x;
   if(u<.61){const q=softer((u-.42)/.19);angles=sourceAngles.map((a,i)=>mixAngle(a,stanceAngles[i],q));x=mix(dockedTail.x,anchor.x,q);}
   else if(u<.80){const q=smooth((u-.61)/.19);angles=stanceAngles.map((a,i)=>mixAngle(a,crouchAngles[i],q));}
   else {const p=(u-.80)/.20,q=p*p*(1.5-.5*p);angles=crouchAngles.map((a,i)=>mixAngle(a,launchAngles[i],q));}
   const raw=chain(flightLengths,angles),supportY=Math.max(...raw.map(p=>p.y));
   return {scale,points:raw.map(p=>({x:p.x+x,y:p.y+anchor.y-supportY}))};
  },
  flight(t,target,offset={x:0,y:0}){
   const u=clamp(t),air=clamp(u/ENTRY_PHASE),plan=flightPlan(target,offset),body=airBody(air,plan.entryAngle);
   // Release momentum fades early enough that even a nearly aligned or
   // left-hand target has no sideways overshoot during the final approach.
   const along=mix(plan.startT,plan.endT,smooth(air/.82))+plan.vt*air*Math.max(0,1-air/.6)**3;
   let depth=hermite(plan.startN,plan.endN,plan.vn,plan.entrySpeed,air);
   if(u>ENTRY_PHASE){const q=(u-ENTRY_PHASE)/(1-ENTRY_PHASE),speed=plan.entrySpeed*(1-ENTRY_PHASE)/ENTRY_PHASE;
    // Continue through the surface with the same velocity. Extra travel is
    // harmless below the clip; slowing to a fixed depth could reverse a fast
    // dive from a high tower and bring its tail back out of the plate.
    depth+=speed*q+Math.max(0,length+32-speed)*q*q;
   }
   const c={x:plan.t.x*along+plan.n.x*depth,y:plan.t.y*along+plan.n.y*depth};
   return {points:body.points.map(p=>({x:p.x+c.x,y:p.y+c.y})),scale,centre:c,rotation:body.rotation,entered:u>=ENTRY_PHASE};
  },
  return(t,target,offset={x:0,y:0}){
   const u=clamp(t);
   if(u>=.65)return geometry.prepare(.61*(1-smooth((u-.65)/.35)),offset);
   const prepared=geometry.prepare(.61,offset).points,c=centre(prepared),travel=u/.65,q=smooth(travel),points=prepared.map(p=>({x:mix(target.x+(p.x-c.x)*.08,p.x,q),y:mix(target.y+(p.y-c.y)*.08,p.y,q)-40*Math.sin(Math.PI*travel)}));
   return {points,scale:scale*(.08+.92*q)};
  }
 };
 const step=.00001,beforePose=geometry.prepare(1-step).points,end=centre(geometry.prepare(1).points),before=centre(beforePose),timeRatio=DIVE_FLIGHT_MS*ENTRY_PHASE/(DIVE_PREPARE_MS*step),beforeAngles=anglesOf(beforePose);
 launchTangent={x:(end.x-before.x)*timeRatio,y:(end.y-before.y)*timeRatio};
 jointTangents=launchAngles.map((a,i)=>Math.atan2(Math.sin(a-beforeAngles[i]),Math.cos(a-beforeAngles[i]))*timeRatio*.18);
 return geometry;
}
