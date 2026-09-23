const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
const mod=name=>import(pathToFileURL(path.resolve(__dirname,'../game-of-worms',name)));
(async()=>{
 const {workingPoint}=await mod('scene-body-motion.js');
 const {feedingFrame,FEEDING_BEATS,FEEDING_DURATION,createN2Feeding}=await mod('n2-feeding.js');
 const {cartRideFrame}=await mod('araucania-play.js');
 const {fruitFrame}=await mod('dois-rios-play.js');
 for(const pose of[[8,16,-7],[15,42,-13],[-12,35,9],[7,5,11]]){
  assert.deepEqual(workingPoint(78,228,...pose),{x:78,y:228},'Working poses keep the tail planted');
  const middle=workingPoint(230,130,...pose),head=workingPoint(329,65,...pose);
  assert(Math.hypot(middle.x-230,middle.y-130)>1,'The body itself bends');
  assert(Math.abs(head.y-65-pose[1])<.001,'The face follows the front of the body');
 }
 for(let ms=0;ms<=FEEDING_DURATION;ms+=10){
  const f=feedingFrame(ms);assert(Object.values(f).every(v=>typeof v==='boolean'||Number.isFinite(v)));
  if(f.feeding)assert(f.lift>.97,'Feeding begins only when the plate reaches the mouth');
  if(ms<2050)assert.equal(f.consumed,false,'Interrupted reaching does not consume a portion');
  if(ms)assert(Math.abs(f.lift-feedingFrame(ms-10).lift)<.025,'Plate travel has no abrupt jumps');
 }
 assert.equal(feedingFrame(0).lift,0);assert.equal(feedingFrame(FEEDING_DURATION).lift,0);assert(feedingFrame(FEEDING_DURATION).done);
 assert.equal(feedingFrame(450).reach,1,'Hands grip before lifting');
 assert.equal(feedingFrame(450).lift,0);
 assert.equal(feedingFrame(2050).transfer,1,'The portion reaches the mouth before it is consumed');
 assert.equal(feedingFrame(2050).consumed,true);
 for(const beat of FEEDING_BEATS){assert.equal(feedingFrame(beat).pump,0);assert.equal(feedingFrame(beat+140).pump,1);assert.equal(feedingFrame(beat+300).pump,0);}
 assert.equal(feedingFrame(3400).feeding,false,'Mouth closes before lowering the plate');
 assert.equal(feedingFrame(3400).lift,1);
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
 // Exercise the actual reduced-motion controller: separate portions for each
 // plate, no animation callbacks, an explicit refill, and scene cleanup.
 global.matchMedia=()=>({matches:true,addEventListener(){}});global.window={addEventListener(){}};global.document={addEventListener(){}};
 global.cancelAnimationFrame=()=>{};global.requestAnimationFrame=()=>{throw Error('Reduced motion must not animate');};
 const plate=count=>{const dots=Array.from({length:count},()=>({opacity:'1',setAttribute(k,v){this[k]=v;}}));return {dataset:{accessoryFamily:'ngm-agar-plate'},closest:()=>null,querySelectorAll:()=>dots,dots};};
 const plates=[plate(5),plate(4)],feed=createN2Feeding({querySelectorAll:()=>plates});
 for(let n=1;n<=4;n++){assert(feed.start(plates[1]));assert.equal(plates[1].dots.filter(d=>d.opacity==='0').length,n);assert(plates[0].dots.every(d=>d.opacity==='1'));}
 feed.start(plates[1]);assert(plates[1].dots.every(d=>d.opacity==='1'));assert.equal(feed.active,false);
 feed.start(plates[0]);feed.clear();assert(plates.every(p=>p.dots.every(d=>d.opacity==='1')));
 console.log('Four scenes: planted tails, body deformation, feeding contact and consumption timing, continuous plate travel, safe boarding and sticky-release follow-through pass.');
})().catch(e=>{console.error(e);process.exitCode=1;});
