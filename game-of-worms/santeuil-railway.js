import {add,at,ease,matrix} from './scene-performance.js?v=20260919-uniform-1';
export const RAILWAY_DURATION=18200;
// Board, depart, pause at the end of the line, then return to the same station.
export function railwayProgress(ms){
 const out=ease((ms-2400)/5200),back=ease((ms-9000)/5600);
 return {travel:140*(out-back),aboard:ease((ms-150)/1800)*(1-ease((ms-15100)/2200))};
}
export function drawRailwayTrack(layer,vehicles,journey=140){
 const contacts=vehicles.map(p=>at(p.base,0,p.part==='primary'?55:41)).sort((a,b)=>a.x-b.x);
 const left=contacts[0],right=contacts.at(-1),slope=contacts.length>1&&Math.abs(right.x-left.x)>50?(right.y-left.y)/(right.x-left.x):0;
 const y=x=>left.y+(x-left.x)*slope;
 const track=add(layer,'g',{'data-woodland-railway':'','pointer-events':'none','aria-hidden':'true'});layer.insertBefore(track,layer.firstChild);
 const start=left.x-80,end=right.x+100+Math.max(0,journey);
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
 // Limit the journey to available scene space, even after visitor edits.
 const scene=s.root.closest('svg'),bounds=scene.viewBox.baseVal;
 const inverse=s.root.getScreenCTM().inverse().multiply(scene.getScreenCTM());
 const right=at(inverse,bounds.x+bounds.width-18,0).x;
 const engineEdge=Math.max(...vehicles.map(p=>at(p.base,p.part==='primary'?101:73,0).x));
 const distance=Math.max(0,Math.min(140,right-engineEdge));
 const {track,slope}=drawRailwayTrack(s.layer,vehicles,distance);
 const male=s.actors.companion,base=male.base;
 const uniform=s.props.filter(p=>p.part==='companion'&&p.family==='santeuil-railway-driver-uniform');
 const instrument=s.prop('santeuil-cylinder-organ-instrument','companion');
 const engine=s.prop(trainFamily,'primary');
 if(engine)engine.puffs=Array.from({length:4},()=>add(engine.copy,'ellipse',{cx:52,cy:-71,rx:5,ry:4,fill:'#e9ebe1',opacity:0}));
 return {vehicles,track,slope,male,base,uniform,instrument,lastTravel:0,odometer:0,distance,clack:0};
}
export function moveRailway(s,ride,ms,env){
 const progress=railwayProgress(ms),aboard=progress.aboard,travel=progress.travel*ride.distance/140;
 const speed=(railwayProgress(ms+16).travel-railwayProgress(ms-16).travel)/32*1000*ride.distance/140;
 const moving=Math.abs(speed)>.8;ride.speed=speed;ride.travel=travel;
 ride.phase=ms<2400?'boarding':ms<7600?'departing':ms<9000?'stopped':ms<14600?'returning':'arriving';
 ride.odometer+=Math.abs(travel-ride.lastTravel);ride.lastTravel=travel;ride.track.setAttribute('opacity',env);
 let trolley;ride.engineMatrix=null;
 for(const p of ride.vehicles){
  const contact=at(p.base,0,p.part==='primary'?55:41);
  const railAngle=Math.atan(ride.slope)*180/Math.PI,artAngle=Math.atan2(p.base.b,p.base.a)*180/Math.PI;
  const align=new DOMMatrix().translate(contact.x,contact.y).rotate((railAngle-artAngle)*aboard).translate(-contact.x,-contact.y);
  const delta=new DOMMatrix().translate(travel,travel*ride.slope).multiply(align);
  const m=delta.multiply(p.base);p.g.setAttribute('transform',matrix(m));
  const scale=Math.hypot(p.base.a,p.base.b),distance=travel*Math.hypot(1,ride.slope)/scale;
  for(const w of p.copy.querySelectorAll('[data-rail-wheel]')){
   const [x,y,r]=w.dataset.railWheel.split(' ').map(Number);w.setAttribute('transform',`rotate(${distance/r*180/Math.PI} ${x} ${y})`);
  }
  const phase=distance/19;p.copy.querySelector('[data-rail-rod]')?.setAttribute('transform',`translate(${-5*Math.sin(phase)} ${5*Math.cos(phase)-5})`);
  if(p.part==='primary')ride.engineMatrix=m;
  if(p.part==='companion'){
   trolley={p,m};const pump=23*Math.sin(distance/10)*aboard;
   p.copy.querySelector('[data-trolley-handle]')?.setAttribute('transform',`rotate(${pump} 31 -49)`);trolley.pump=pump;
  }
  p.puffs?.forEach((n,i)=>{const age=((ms/1000*.35+ride.odometer/95+i/4)%1);n.setAttribute('cx',52-age*18);n.setAttribute('cy',-71-age*34);n.setAttribute('rx',3+age*8);n.setAttribute('ry',3+age*6);n.setAttribute('opacity',moving?env*.35*Math.sin(Math.PI*age):0);});
 }
 if(trolley){
  const tail=at(ride.base,78,228),deck=at(trolley.m,-62,-3);
  const dx=(deck.x-tail.x)*aboard,dy=(deck.y-tail.y)*aboard-14*Math.sin(Math.PI*aboard);
  const move=new DOMMatrix().translate(tail.x+dx,tail.y+dy).rotate(-28*aboard).scale(1-.18*aboard).translate(-tail.x,-tail.y);
  ride.male.base=move.multiply(ride.base);ride.male.copy.parentNode.setAttribute('transform',matrix(ride.male.base));
  for(const p of ride.uniform)p.g.setAttribute('transform',matrix(move.multiply(p.base)));
  // The concertina travels quietly with its owner, leaving both hands for pumping.
  if(ride.instrument)ride.instrument.g.setAttribute('transform',matrix(move.multiply(ride.instrument.base)));
  const effort=Math.sin(travel/Math.max(.1,Math.hypot(trolley.p.base.a,trolley.p.base.b))/10);
  s.pose('companion',(-.4+1.35*effort)*aboard*env,(.2+.7*effort)*aboard*env);
  const handle=new DOMMatrix().translate(-60,0).translate(31,-49).rotate(trolley.pump).translate(-31,49);
  s.reach(ride.hands[0],at(trolley.m.multiply(handle),72,-39),aboard*env);
  s.reach(ride.hands[1],at(trolley.m.multiply(handle),-5,-60),aboard*env,[228,160]);
 }
}

// Gentle mechanical clacks use a short filtered noise impact, never a pitched
// UI beep. Emission follows distance travelled so braking slows the rhythm.
export function createRailwaySound(){
 let ctx,noise;const voices=new Set();
 function prepare(){try{ctx??=new(window.AudioContext||window.webkitAudioContext)();ctx.resume().catch(()=>{});
  if(!noise){noise=ctx.createBuffer(1,Math.ceil(ctx.sampleRate*.09),ctx.sampleRate);const data=noise.getChannelData(0);for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*Math.exp(-i/(ctx.sampleRate*.018));}
 }catch{}}
 function clack(speed){if(!ctx||ctx.state!=='running'||document.hidden||!noise)return;
  const now=ctx.currentTime,source=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),gain=ctx.createGain();
  source.buffer=noise;filter.type='lowpass';filter.frequency.value=1350;filter.Q.value=.5;
  gain.gain.setValueAtTime(Math.min(.09,.035+Math.abs(speed)*.0007),now);gain.gain.exponentialRampToValueAtTime(.001,now+.08);
  source.connect(filter);filter.connect(gain);gain.connect(ctx.destination);voices.add(source);
  source.onended=()=>{voices.delete(source);source.disconnect();filter.disconnect();gain.disconnect();};source.start(now);source.stop(now+.09);
 }
 function stop(){for(const source of voices){try{source.stop();}catch{}}voices.clear();}
 return {prepare,clack,stop};
}
