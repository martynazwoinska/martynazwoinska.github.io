import {add,at,ease,matrix} from './scene-performance.js?v=20260919-uniform-1';
export const RAILWAY_DURATION=16200;
// Board, depart, pause at the end of the line, then return to the same station.
export function railwayProgress(ms){
 const out=ease((ms-2200)/4600),back=ease((ms-8800)/4600);
 return {travel:64*(out-back),aboard:ease((ms-150)/1700)*(1-ease((ms-13900)/1600))};
}
export function drawRailwayTrack(layer,vehicles){
 const contacts=vehicles.map(p=>at(p.base,0,p.part==='primary'?55:41)).sort((a,b)=>a.x-b.x);
 const left=contacts[0],right=contacts.at(-1),slope=contacts.length>1&&Math.abs(right.x-left.x)>50?(right.y-left.y)/(right.x-left.x):0;
 const y=x=>left.y+(x-left.x)*slope;
 const track=add(layer,'g',{'data-woodland-railway':'','pointer-events':'none','aria-hidden':'true'});layer.insertBefore(track,layer.firstChild);
 const start=left.x-80,end=right.x+142;
 // Sleepers rest on two longitudinal wooden bearers; rails sit on their chairs.
 for(const dy of [-3,4])add(track,'path',{d:`M${start} ${y(start)+dy+3}L${end} ${y(end)+dy+3}`,fill:'none',stroke:'#685440','stroke-width':5,'stroke-linecap':'round'});
 for(let x=start+5;x<end;x+=15){
  add(track,'path',{d:`M${x-3} ${y(x)-7}l7 15`,stroke:'#a88958','stroke-width':4,'stroke-linecap':'round'});
  for(const dy of [-3,4])add(track,'circle',{cx:x,cy:y(x)+dy,r:1.2,fill:'#3c4848'});
 }
 for(const dy of [-3,4]){
  add(track,'path',{d:`M${start} ${y(start)+dy}L${end} ${y(end)+dy}`,fill:'none',stroke:'#35494b','stroke-width':3});
  add(track,'path',{d:`M${start} ${y(start)+dy-.7}L${end} ${y(end)+dy-.7}`,fill:'none',stroke:'#a6b4ae','stroke-width':.9});
 }
 return {track,slope};
}
export function prepareRailway(s,trainFamily){
 const vehicles=['primary','companion'].map(part=>s.prop(trainFamily,part)).filter(Boolean);
 const {track,slope}=drawRailwayTrack(s.layer,vehicles);
 const male=s.actors.companion,base=male.base;
 const uniform=s.props.filter(p=>p.part==='companion'&&p.family==='santeuil-railway-driver-uniform');
 const instrument=s.prop('santeuil-cylinder-organ-instrument','companion');
 const engine=s.prop(trainFamily,'primary');
 if(engine)engine.puffs=Array.from({length:4},()=>add(engine.copy,'ellipse',{cx:52,cy:-71,rx:5,ry:4,fill:'#e9ebe1',opacity:0}));
 return {vehicles,track,slope,male,base,uniform,instrument,lastTravel:0};
}
export function moveRailway(s,ride,ms,env){
 const {travel,aboard}=railwayProgress(ms),moving=Math.abs(travel-ride.lastTravel)>.001;
 ride.lastTravel=travel;ride.track.setAttribute('opacity',env);
 let trolley;
 for(const p of ride.vehicles){
  const delta=new DOMMatrix().translate(travel,travel*ride.slope);
  const m=delta.multiply(p.base);p.g.setAttribute('transform',matrix(m));
  const scale=Math.hypot(p.base.a,p.base.b),distance=travel*Math.hypot(1,ride.slope)/scale;
  for(const w of p.copy.querySelectorAll('[data-rail-wheel]')){
   const [x,y,r]=w.dataset.railWheel.split(' ').map(Number);w.setAttribute('transform',`rotate(${distance/r*180/Math.PI} ${x} ${y})`);
  }
  const phase=distance/19;p.copy.querySelector('[data-rail-rod]')?.setAttribute('transform',`translate(${5*Math.sin(phase)} ${5*Math.cos(phase)-5})`);
  if(p.part==='companion'){
   trolley={p,m};const pump=16*Math.sin(distance/10)*aboard;
   p.copy.querySelector('[data-trolley-handle]')?.setAttribute('transform',`rotate(${pump} 31 -49)`);trolley.pump=pump;
  }
  p.puffs?.forEach((n,i)=>{const age=((ms/1000*.75+i/4)%1);n.setAttribute('cx',52-age*18);n.setAttribute('cy',-71-age*34);n.setAttribute('rx',3+age*8);n.setAttribute('ry',3+age*6);n.setAttribute('opacity',moving?env*.35*Math.sin(Math.PI*age):0);});
 }
 if(trolley){
  const tail=at(ride.base,78,228),deck=at(trolley.m,-62,-3);
  const dx=(deck.x-tail.x)*aboard,dy=(deck.y-tail.y)*aboard-14*Math.sin(Math.PI*aboard);
  const move=new DOMMatrix().translate(tail.x+dx,tail.y+dy).rotate(-25*aboard).translate(-tail.x,-tail.y);
  ride.male.base=move.multiply(ride.base);ride.male.copy.parentNode.setAttribute('transform',matrix(ride.male.base));
  for(const p of ride.uniform)p.g.setAttribute('transform',matrix(move.multiply(p.base)));
  // The concertina travels quietly with its owner, leaving both hands for pumping.
  if(ride.instrument)ride.instrument.g.setAttribute('transform',matrix(move.multiply(ride.instrument.base)));
  s.pose('companion',(.5*Math.sin(travel/8)+1.2*Math.sin(Math.PI*aboard))*env,.15*aboard);
  const handle=new DOMMatrix().translate(-60,0).translate(31,-49).rotate(trolley.pump).translate(-31,49);
  s.reach(ride.hands[0],at(trolley.m.multiply(handle),72,-39),aboard*env);
  s.reach(ride.hands[1],at(trolley.m.multiply(handle),-5,-60),aboard*env,[228,160]);
 }
}
