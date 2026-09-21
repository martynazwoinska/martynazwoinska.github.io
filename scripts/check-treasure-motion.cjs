const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
(async()=>{
 const {gemLanding,gemDropFrames}=await import(pathToFileURL(path.resolve(__dirname,'../game-of-worms/treasure-motion.js')));
 for(const width of [320,700,1100])for(const height of [270,500,700])for(const id of ['bali','compost','towel','bubbles'])for(const start of [{x:3,y:14},{x:50,y:48},{x:97,y:83}]){
  const end=gemLanding(start,id,-1),plan=gemDropFrames(start,end,width,height,26),frames=plan.frames;
  assert.ok(end.x>=7&&end.x<=93);assert.ok(end.y>=start.y&&end.y<=84,'a low release must not fall upward');
  assert.equal(frames[0].offset,0);assert.equal(frames.at(-1).offset,1);assert.equal(frames.at(-1).translate,'0 0px');
  let lastOffset=-1,lastY=-Infinity,lastStep=0;
  frames.forEach((f,i)=>{assert.ok(f.offset>lastOffset);lastOffset=f.offset;assert.ok(!/NaN|Infinity/.test(f.translate));if(i<=24){const y=parseFloat(f.translate.split(' ')[1]);assert.ok(y>=lastY-1e-8);if(i>0){const step=y-lastY;assert.ok(step>=lastStep-1e-8,'fall should accelerate');lastStep=step;}lastY=y;}});
  assert.ok(plan.duration<=1000);assert.ok(frames.every(f=>!('scale' in f)),'hard gems do not inflate or squash');
 }
 const still=gemDropFrames({x:50,y:83},{x:50,y:83},700,500,0);assert.equal(still.frames[24].rotate,'0deg');
 const {parseSave}=await import(pathToFileURL(path.resolve(__dirname,'../game-of-worms/treasure-model.js')));
 const saved=parseSave(JSON.stringify({version:1,revealed:{towel:{x:55,y:81,size:.027,angle:-18}}}));
 assert.equal(saved.revealed.towel.size,.027);assert.equal(saved.revealed.towel.angle,342);
 const corrupt=parseSave(JSON.stringify({version:1,revealed:{towel:{x:55,y:81,size:-1,angle:'oops'}}}));assert.deepEqual(corrupt.revealed.towel,{x:55,y:81});
 console.log('PASS: 108 scene/size/release combinations accelerate downward, land within bounds, keep size, and settle without jumps.');
})().catch(e=>{console.error(e);process.exitCode=1;});
