const assert=require('node:assert/strict');const fs=require('fs');const {pathToFileURL}=require('node:url');const path=require('node:path');
(async()=>{
 const {sampleFrame,sampleReturnFrame,isSamplePlate,SAMPLE_DURATION,SAMPLE_RETURN_DURATION}=await import(pathToFileURL(path.resolve('game-of-worms/trivandrum-samples.js')));
 let previous=sampleFrame(0);
 for(let ms=0;ms<=SAMPLE_DURATION;ms+=10){const f=sampleFrame(ms);
  for(const key of ['reach','open','lift','tip','transfer','inspect']){assert(Number.isFinite(f[key]));assert(f[key]>=0&&f[key]<=1);assert(Math.abs(f[key]-previous[key])<.04,'Continuous '+key);}
  if(f.transfer>0&&f.transfer<1){assert.equal(f.open,1,'Cap fully clear during transfer');assert.equal(f.lift,1,'Tube held over the dish before transfer');assert(f.tip>.95,'Tube tilted before the leaf slides');}
  if(f.inspect>0)assert.equal(f.transfer,1,'Examination follows delivery');previous=f;
 }
 const end=sampleFrame(SAMPLE_DURATION);assert(end.holding);assert.equal(end.reach,1);assert.equal(end.inspect,1);assert.equal(end.transfer,1);
 for(const key of ['open','lift','tip'])assert.equal(end[key],0,'Tube back at rest '+key);
 for(const ms of [11900,60000,3600000])assert.deepEqual(sampleFrame(ms),end,'No timed return from examination');
 assert.deepEqual(sampleReturnFrame(0,end),{...end,holding:false,done:false},'Return starts at the held pose');
 let previousReturn=sampleReturnFrame(0,end);
 for(let ms=10;ms<=SAMPLE_RETURN_DURATION;ms+=10){const f=sampleReturnFrame(ms,end);assert(f.reach<=previousReturn.reach);assert(Math.abs(f.reach-previousReturn.reach)<.04);previousReturn=f;}
 const returned=sampleReturnFrame(SAMPLE_RETURN_DURATION,end);assert(returned.done);assert.equal(returned.reach,0);assert.equal(returned.inspect,0);
 const still=sampleFrame(0,true);assert(still.holding);assert.equal(still.transfer,1);assert.equal(still.reach,1);assert.equal(still.inspect,1);assert(sampleReturnFrame(0,still,true).done);
 assert(isSamplePlate({dataset:{accessoryFamily:'trivandrum-sample-tube',wormPart:'companion'}}));
 assert(!isSamplePlate({dataset:{accessoryFamily:'trivandrum-sample-tube',wormPart:'primary'}}),'Tube cannot start sampling');
 assert(!isSamplePlate({dataset:{accessoryFamily:'trivandrum-field-loupe',wormPart:'companion'}}),'Loupe cannot start sampling');
 const art=fs.readFileSync('game-of-worms/trivandrum-refinement.js','utf8');assert(art.includes("tri-tube-contents-${male?'male':'female'}"),'Female gem mounting point retained');
 const hunt=fs.readFileSync('game-of-worms/treasure-hunt.js','utf8');assert(hunt.includes('url(#tri-tube-contents-female)'));
 const water=fs.readFileSync('game-of-worms/trivandrum-watering.js','utf8');assert(water.includes('if(samples.handles(piece)){if(active)cancel();return samples.start(piece);}'));assert(water.includes('samples.cancel()'));assert(water.includes('!!active||samples.active'));
 console.log('PASS: plate-only trigger, staged transfer, persistent examination, smooth explicit return, reduced motion and female-tube gem hook.');
})().catch(e=>{console.error(e);process.exitCode=1;});
