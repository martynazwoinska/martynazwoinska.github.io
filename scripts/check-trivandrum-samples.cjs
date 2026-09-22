const assert=require('node:assert/strict');const fs=require('fs');const {pathToFileURL}=require('node:url');const path=require('node:path');
(async()=>{
 const {sampleFrame,SAMPLE_DURATION}=await import(pathToFileURL(path.resolve('game-of-worms/trivandrum-samples.js')));
 let previous=sampleFrame(0);
 for(let ms=0;ms<=SAMPLE_DURATION;ms+=10){const f=sampleFrame(ms);
  for(const key of ['reach','open','lift','tip','transfer','inspect']){assert(Number.isFinite(f[key]));assert(f[key]>=0&&f[key]<=1);assert(Math.abs(f[key]-previous[key])<.04,'Continuous '+key);}
  if(f.transfer>0&&f.transfer<1){assert.equal(f.open,1,'Cap fully clear during transfer');assert.equal(f.lift,1,'Tube held over the dish before transfer');assert(f.tip>.95,'Tube tilted before the leaf slides');}
  if(f.inspect>0)assert.equal(f.transfer,1,'Examination follows delivery');previous=f;
 }
 const end=sampleFrame(SAMPLE_DURATION);for(const key of ['reach','open','lift','tip','inspect'])assert.equal(end[key],0,'Exact return '+key);assert(end.done);assert.equal(end.transfer,1);
 const still=sampleFrame(100,true);assert.equal(still.transfer,1);for(const key of ['reach','open','lift','tip','inspect'])assert.equal(still[key],0);assert(sampleFrame(300,true).done);
 const art=fs.readFileSync('game-of-worms/trivandrum-refinement.js','utf8');assert(art.includes("tri-tube-contents-${male?'male':'female'}"),'Female gem mounting point retained');
 const hunt=fs.readFileSync('game-of-worms/treasure-hunt.js','utf8');assert(hunt.includes('url(#tri-tube-contents-female)'));
 const water=fs.readFileSync('game-of-worms/trivandrum-watering.js','utf8');assert(water.includes('if(samples.handles(piece)){cancel();return samples.start(piece);}'));assert(water.includes('samples.cancel()'));assert(water.includes('!!active||samples.active'));
 console.log('PASS: staged cap/tilt/transfer/examination, continuous motion, exact settling, reduced motion, gem hook and shared cancellation.');
})().catch(e=>{console.error(e);process.exitCode=1;});
