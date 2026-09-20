const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
(async()=>{
 const {canopySearchReady,towelGemFrame}=await import(pathToFileURL(path.resolve(__dirname,'../game-of-worms/treasure-discoveries.js')).href);
 for(const height of [0,.3,.9])assert.equal(canopySearchReady(height,false,false,false),false,'a ground or rising photo must not reveal the leaf');
 assert.equal(canopySearchReady(1,false,false,false),true);
 assert.equal(canopySearchReady(1,true,false,true),false,'returning to ground cannot uncover a new clue');
 assert.equal(canopySearchReady(0,false,true,false),false);
 assert.equal(canopySearchReady(0,false,true,true),true,'reduced-motion ride still enables the photo search');
 assert.equal(towelGemFrame(1100).peek,0);
 let previous=0;
 for(let ms=0;ms<1900;ms+=20){const frame=towelGemFrame(ms);assert.equal(frame.release,false);assert.ok(frame.peek>=previous&&frame.peek<=1);previous=frame.peek;}
 assert.equal(towelGemFrame(1900).release,true);
 assert.equal(towelGemFrame(649,true).release,false);
 assert.equal(towelGemFrame(650,true).release,true,'reduced-motion find happens before the 700ms activity ends');
 console.log('PASS: canopy photo requires a completed ride; towel crystal peeks before dropping; both reduced-motion paths remain discoverable.');
})().catch(error=>{console.error(error);process.exitCode=1;});
