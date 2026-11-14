const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
const mod=name=>import(pathToFileURL(path.resolve(__dirname,'../game-of-worms',name)));
(async()=>{
 const {workingPoint}=await mod('scene-body-motion.js');
 const {feedingFrame,feedingTime,feedingTravel,feedingEntryTravel,feedingSurfaceSamples,feedingOutline,flightBend,ballisticHeadPath,takeoffRelease,feedingRoute,feedingTrack,feedingWave,feedingWormPose,FEEDING_BEATS,FEEDING_DURATION,DIVE_DELAY,createN2Feeding}=await mod('n2-feeding.js');
 const {cartRideFrame}=await mod('araucania-play.js');
 const {fruitFrame}=await mod('dois-rios-play.js');
 for(const pose of[[8,16,-7],[15,42,-13],[-12,35,9],[7,5,11]]){
  assert.deepEqual(workingPoint(78,228,...pose),{x:78,y:228},'Working poses keep the tail planted');
  const middle=workingPoint(230,130,...pose),head=workingPoint(329,65,...pose);
  assert(Math.hypot(middle.x-230,middle.y-130)>1,'The body itself bends');
  assert(Math.abs(head.y-65-pose[1])<.001,'The face follows the front of the body');
 }
 for(let ms=0;ms<=FEEDING_DURATION;ms+=10){
  const f=feedingFrame(ms,true);
  assert(Math.abs(f.worm+f.jumpOpacity+f.crawler-1)<1e-9,'The companion has no visibility gap, including the entire landing interval');
  if(ms>=240&&ms<feedingTime(3850))assert.equal(f.jumpOpacity,1,'The companion never fades away during its incoming hop');
  assert(!(f.jumpOpacity>0&&f.crawler>0),'The companion and plate crawler never overlap, including departure');
 }
 for(const delta of[-1,0,1]){const f=feedingFrame(feedingTime(3850)+delta,true);assert.equal(f.jumpOpacity,delta<0?1:0);assert.equal(f.crawler,delta<0?0:1,'The companion switches directly to its matching complete crawler');}
 for(let ms=0;ms<=FEEDING_DURATION;ms+=10){
  const f=feedingFrame(ms);assert(Object.values(f).every(v=>typeof v==='boolean'||Number.isFinite(v)));
  if(f.crawler>.9)assert(f.plate>.99,'The plate is fully presented before the two laps begin');
  if(ms<feedingTime(10350))assert.equal(f.consumed,false,'Interrupted feeding does not consume a portion');
  if(ms)assert(Math.abs(f.plate-feedingFrame(ms-10).plate)<.05,'Plate emphasis has no abrupt jumps');
  if(ms<feedingTime(23350))assert(!(f.jumpOpacity>0&&f.crawler>0),'The plate worm cannot appear while the incoming diver is visible');
  assert(Math.abs(f.worm+f.jumpOpacity+f.crawler-1)<.00001,'The timeline has no duplicate actor; the food plane alone controls immersion');
 }
 assert.equal(feedingFrame(0).plate,0);assert.equal(feedingFrame(FEEDING_DURATION).plate,0);assert(feedingFrame(FEEDING_DURATION).done);
 assert.equal(feedingFrame(0).crawl,0);assert.equal(feedingFrame(feedingTime(3850)).crawl,0);assert(feedingFrame(feedingTime(4350)).crawl>0,'The head moves out of the entry point instead of materializing stationary');assert.equal(feedingFrame(feedingTime(23350)).crawl,1);assert.equal(feedingFrame(feedingTime(10350)).consumed,true);
 assert.equal(feedingFrame(feedingTime(1250)).jumpOut,0);assert.equal(feedingFrame(feedingTime(2550)).jumpOut,.5,'The outbound flight keeps a deliberate linear clock');assert.equal(feedingFrame(feedingTime(3850)).jumpOut,1);assert.equal(feedingFrame(feedingTime(23350)).jumpBack,1);assert.equal(feedingFrame(feedingTime(27200)).jumpBack,0);
 assert.equal(feedingFrame(feedingTime(1250)).plate,1,'The enlarged plate is stable before take-off');assert.equal(feedingFrame(feedingTime(1250)).anticipation,1);assert(feedingFrame(feedingTime(1240)).anticipation<1,'Push-off continues directly into flight without a frozen hold');assert(feedingFrame(feedingTime(3675)).splash>.99);assert(Math.abs(feedingFrame(feedingTime(4250)).splash)<.00001);
 assert(FEEDING_BEATS.every((beat,index)=>!index||beat>FEEDING_BEATS[index-1]),'Eating cues remain ordered');assert(FEEDING_BEATS.every(beat=>feedingFrame(beat).crawler===1),'Every eating cue occurs while the plate worm is visible');
 assert.equal(feedingTime(3850)-feedingTime(1250),1820,'The outbound flight is thirty percent shorter');
 assert.equal(feedingTime(1250)-260,2233,'Boarding and push-off accelerate by the same proportion');
 assert.equal(feedingTime(23350)-feedingTime(3850),19500,'The two slow plate laps keep their established duration');
 assert(FEEDING_BEATS.at(-1)<feedingTime(23350),'Feeding ends before the return jump');
 let previous=-1;for(let u=0;u<=1;u+=.001){const travel=feedingTravel(u);assert(travel>=previous&&travel>=0&&travel<=1,'Crawl progress stays monotonic and bounded');previous=travel;}assert.equal(feedingTravel(0),0);assert.equal(feedingTravel(1),1);
 for(const progress of[0,.001,.01,.05,.1,.5,1])assert(feedingEntryTravel(progress)>=0&&feedingEntryTravel(progress)<=1,'Entry travel is bounded');
 for(const direction of[-1,1])for(const target of[{x:-36,y:-2},{x:17,y:6},{x:35,y:-3}]){
  const entry=feedingTrack(0,direction,false,target),early=feedingEntryTravel(100/19500),first=feedingWormPose(early,false,target,1,direction),visible=feedingSurfaceSamples(first.samples,early,entry);
  assert(Math.hypot(first.head.x-entry.x,first.head.y-entry.y)>2,'The small head visibly leaves the entry point within 100 ms');
  assert(visible.length<33&&visible.length>1,'The head emerges first rather than revealing a complete miniature');
  assert(Math.hypot(visible.at(-1).x-entry.x,visible.at(-1).y-entry.y)<1e-8,'The emerging body remains attached to the real entry point');
  assert(!/NaN|Infinity/.test(feedingOutline(visible).body),'Partial body outlines remain finite');
  const full=feedingWormPose(1/13,false,target,1,direction);assert.deepEqual(feedingSurfaceSamples(full.samples,1/13,entry),full.samples,'Emergence joins the full crawler without replacing its shape');
 }
 const origin={x:0,y:100},target={x:100,y:200},flight=ballisticHeadPath(origin,target,false,200);assert.deepEqual(flight[0],origin);assert.deepEqual(flight.at(-1),target);assert(flight[1].y<origin.y,'The head launches upward');assert(Math.min(...flight.map(p=>p.y))<90,'The jump has one clear apex above take-off');assert(flight.at(-1).y>flight.at(-2).y,'The head enters the agar downward');
 const bendTransitions=(u,small=false,returning=false)=>{const transitions=[];let last=null;for(let i=1;i<1000;i++){const s=i/1000,value=flightBend(s,u,small,returning);if(Math.abs(value)<1e-6)continue;const sign=Math.sign(value);if(last&&sign!==last.sign)transitions.push((last.s+s)/2);last={s,sign};}return transitions;};
 for(const small of[false,true])for(const returning of[false,true]){
  assert.equal(flightBend(0,.5,small,returning),0,'The travelling wave leaves the tail hand-off fixed');
  assert(Math.abs(flightBend(1,.5,small,returning))<1e-12,'The travelling wave leaves the face hand-off fixed');
  assert(Math.abs(flightBend(.5,0,small,returning))<1e-12,'No extra bend appears before take-off');
  assert(Math.abs(flightBend(.5,1,small,returning))<1e-12,'The extra bend resolves before landing');
  const early=bendTransitions(.35,small,returning),late=bendTransitions(.45,small,returning);
  assert.equal(early.length,3,'The airborne body carries three alternating internal bends');
  assert.equal(late.length,3,'The three-bend posture persists through mid-flight');
  assert(late.every((zero,i)=>zero<early[i]),'Each bend travels from the head towards the tail');
  let maximum=0;for(let i=0;i<=1000;i++)maximum=Math.max(maximum,Math.abs(flightBend(i/1000,.5,small,returning)));
  assert(maximum<.05,'Airborne curvature stays bounded without hooks or loops');
 }
 for(const small of [false,true])for(const direction of[-1,1])for(let t=0;t<=1;t+=.002){const p=feedingRoute(t,direction,small,{x:17,y:6}),rx=small?26:38,ry=small?7.6:10.5;assert(Object.values(p).every(Number.isFinite),'Every circular route point is finite');assert(Math.abs((p.x/rx)**2+(p.y/ry)**2-1)<.00001,'The route stays on one smooth plate ellipse');}
 for(const direction of[-1,1]){const start=feedingRoute(0,direction,false,{x:17,y:6}),lap=feedingRoute(.5,direction,false,{x:17,y:6}),end=feedingRoute(1,direction,false,{x:17,y:6});assert(Math.hypot(start.x-lap.x,start.y-lap.y)<.001,'Half the timeline completes exactly one lap');assert(Math.hypot(start.x-end.x,start.y-end.y)<.001,'The full timeline completes exactly two laps');}
 assert.equal(feedingWave(0),0);assert(feedingWave(1/80)>1.9,'The head lays down a visible sinusoidal track');assert(Math.abs(feedingWave(1/80)-feedingWave(1/80+1/20))<.00001,'The head track repeats at a stable crawling frequency');
 for(const small of[false,true])for(const direction of[-1,1]){
  const start=feedingWormPose(0,small,{x:17,y:6},0,direction),end=feedingWormPose(1,small,{x:17,y:6},0,direction);
  if(small){
   assert(Math.hypot(start.head.x-end.head.x,start.head.y-end.head.y)<.001);assert(Math.hypot(start.tail.x-end.tail.x,start.tail.y-end.tail.y)<.001);assert(Math.abs(start.length-end.length)<.001,'Companion geometry keeps its closed ellipse');
  }else assert(Math.hypot(start.head.x,start.head.y)<1e-10,'The primary emerges from the agar centre');
  const span=1/13,step=span/32,clipRx=small?35:51,clipRy=small?12.4:16.4;
  for(let t=0;t<1;t+=.004){const a=feedingWormPose(t,small,{x:17,y:6},1,direction),b=feedingWormPose(t+step,small,{x:17,y:6},1,direction);for(let i=1;i<b.samples.length;i++)assert(Math.hypot(b.samples[i].x-a.samples[i-1].x,b.samples[i].y-a.samples[i-1].y)<.00001,'Each posterior segment follows the preceding segment\'s earlier track');for(const p of a.samples.filter(p=>small||p.time>=0))assert((p.x/clipRx)**2+(p.y/clipRy)**2<1,'The natural crawl remains inside the agar');
   const next=feedingWormPose(t+.001,small,{x:17,y:6},1,direction);assert(Math.max(...a.samples.map((p,i)=>Math.hypot(p.x-next.samples[i].x,p.y-next.samples[i].y)))<1.4,'Plate crawling has no abrupt body jumps');}
  const base=feedingRoute(1/80,direction,small,{x:17,y:6}),track=feedingTrack(1/80,direction,small,{x:17,y:6},1);assert(Math.hypot(base.x-track.x,base.y-track.y)>1.3,'The head track visibly departs from a rigid ellipse');
 }
 for(let t=0;t<=1;t+=.005){const f=cartRideFrame(t);
  if(f.travel>.01)assert(f.boarding>.99,'The cart rolls only after the passenger is aboard');
  for(const v of Object.values(f))assert(Number.isFinite(v)&&v>=0&&v<=1.000001);
 }
 assert.equal(cartRideFrame(0).boarding,0);assert.equal(cartRideFrame(1).boarding,0);assert.equal(cartRideFrame(1).travel,0);
 for(const male of[false,true]){
  const release=male?1250:850;
  assert.equal(fruitFrame(release-10,male).recoil,0);
  assert(fruitFrame(release+200,male).recoil>.6,'Body reaction follows the sticky release');
 }
 // The companion plate stays decorative, including under reduced motion.
 // The primary keeps portion consumption, refill and scene cleanup.
 global.matchMedia=()=>({matches:true,addEventListener(){}});global.window={addEventListener(){}};global.document={addEventListener(){}};
 global.cancelAnimationFrame=()=>{};global.requestAnimationFrame=()=>{throw Error('Reduced motion must not animate');};
 const plate=(count,part)=>{const dots=Array.from({length:count},()=>({opacity:'1',setAttribute(k,v){this[k]=v;}}));return {dataset:{accessoryFamily:'ngm-agar-plate',wormPart:part},closest:()=>null,querySelectorAll:()=>dots,dots};};
 const plates=[plate(5,'primary'),plate(4,'companion')],feed=createN2Feeding({querySelector:()=>null,querySelectorAll:()=>plates});
 assert(feed.handles(plates[0]));assert.equal(feed.handles(plates[1]),false);assert.equal(feed.start(plates[1]),false);assert(plates[1].dots.every(d=>d.opacity==='1'));
 for(let n=1;n<=5;n++){assert(feed.start(plates[0]));assert.equal(plates[0].dots.filter(d=>d.opacity==='0').length,n);assert(plates[1].dots.every(d=>d.opacity==='1'));}
 feed.start(plates[0]);assert(plates[0].dots.every(d=>d.opacity==='1'));assert.equal(feed.active,false);
 feed.start(plates[0]);feed.clear();assert(plates.every(p=>p.dots.every(d=>d.opacity==='1')));
 console.log('Four scenes: continuous landing and return, no duplicate worm, two slow sinusoidal plate laps, safe boarding and sticky-release follow-through pass.');
})().catch(e=>{console.error(e);process.exitCode=1;});
