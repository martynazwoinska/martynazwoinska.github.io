const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');const path=require('node:path');
(async()=>{
 const {SHELL,BELL,measurePath,pointAt,bentPath,foldedPoint,tuckedPoint,tailOffset,nextState,actionFrame}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/praslin-play.js')));
 const d='M78 228 C122 280 173 255 181 203 C188 151 225 105 278 113 C330 121 355 82 326 54',curve=measurePath(d),anchor=pointAt(curve,.32);
 assert.equal(nextState('out',SHELL),'hidden');assert.equal(nextState('hidden',BELL),'peek');assert.equal(nextState('peek',BELL),'out');assert.equal(nextState('hidden',SHELL),'out');
 // Different shell positions and sizes must retain the tail and full body topology.
 for(const centre of [{x:226,y:190},{x:340,y:245},{x:210,y:110}]){
  let previous=curve.points;
  for(let step=0;step<=100;step++){
   const amount=step/100,points=curve.points.map(p=>foldedPoint(p,p.d/curve.length,centre,anchor,amount));
   assert.deepEqual(points[0],curve.points[0]);
   for(let i=0;i<points.length;i++)assert(Math.hypot(points[i].x-previous[i].x,points[i].y-previous[i].y)<4,'No pose discontinuity');
   const shape=bentPath(curve,centre,anchor,amount);assert.equal((shape.match(/L/g)||[]).length,curve.points.length-1,'Body is bent, never truncated');assert(!/NaN|undefined|Infinity/.test(shape));
   previous=points;
  }
  const hidden=foldedPoint(pointAt(curve,1),1,centre,anchor,1);assert(Math.hypot(hidden.x-centre.x,hidden.y-centre.y)<1e-8);
 }
 const centre={x:226,y:190},seat={tail:{x:160,y:217},turn:{x:218,y:212},head:pointAt(curve,1)};
 const tail=curve.points[0];
 assert.deepEqual(tuckedPoint(tail,0,centre,anchor,1,1,seat),seat.tail,'Rear enters the shell');
 assert.deepEqual(tuckedPoint(tail,0,centre,anchor,.3,1,seat),seat.tail,'Peek keeps rear tucked');
 assert.deepEqual(tuckedPoint(tail,0,centre,anchor,0,0,seat),tail,'Original rear restored');
 for(let i=0;i<=100;i++){const f=i/100,p=tuckedPoint(pointAt(curve,f),f,centre,anchor,1,1,seat);assert(p.x>=160&&p.x<=226&&p.y>=190&&p.y<=217,'Hidden centreline contained beneath shell');}
 assert.deepEqual(tailOffset(326,54,1),{x:326,y:54});
 for(const [from,to]of [['out','hidden'],['hidden','peek'],['peek','out'],['out','out']]){
  let before=0,last;
  for(let ms=0;ms<3200;ms+=10){const f=actionFrame(ms,from,to);assert(f.progress>=before&&f.progress<=1);assert(f.progress-before<.04);assert(Math.abs(f.ring)<=1&&Math.abs(f.answer)<=1);before=f.progress;last=f;}
  assert(last.done);assert.equal(last.progress,1);assert.equal(last.ring,0);assert.equal(last.answer,0);
  const quiet=actionFrame(180,from,to,true);assert(quiet.done);assert.equal(quiet.progress,1);assert.equal(quiet.ring+quiet.answer,0);
 }
 console.log('Praslin: bilateral hide/peek/emerge, body bend topology, full tuck with persistent tip during peeks, continuous motion and quiet reduced-motion pass.');
})().catch(e=>{console.error(e);process.exitCode=1;});
