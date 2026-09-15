const assert = require('node:assert/strict');
const {pathToFileURL} = require('node:url');
const path = require('node:path');
(async()=> {
  const {fruitFrame,drumScore} = await import(pathToFileURL(path.join(__dirname,'../game-of-worms/mauritius-play.js')));
  for (const male of [false,true]) {
    const stages=[];
    for (let ms=0;ms<=5000;ms+=10) {
      const state=fruitFrame(ms,male);
      assert(Number.isFinite(state.progress)&&state.progress>=0&&state.progress<=1);
      assert(Number.isFinite(state.effort)&&state.effort>=0&&state.effort<=1);
      if (stages.at(-1)!==state.stage) stages.push(state.stage);
      const quiet=fruitFrame(ms,male,true);
      assert.equal(quiet.stage,'deposit');
      assert.equal(quiet.effort,0);
    }
    assert.deepEqual(stages,['reach','grip','carry','deposit','return']);
    const score=drumScore(male);
    assert.equal(score.length,5);
    assert(score.every((at,i)=>at>=200&&at<2000&&(!i||at>score[i-1])));
    assert(fruitFrame(5000,male).done,'Both sequences finish within five seconds');
  }
  assert(!fruitFrame(4000,true).done,'The male has extra time for his heavier fruit');
  assert(fruitFrame(4000,false).done);
  let peaks=0,last=0,rising=false;
  for(let ms=750;ms<1950;ms+=5){
    const value=fruitFrame(ms,true).effort;
    if(value<last&&rising){peaks++;rising=false;}
    if(value>last)rising=true;
    last=value;
  }
  assert.equal(peaks,2,'Two distinct unsuccessful lifting attempts precede the carry');
  assert.notDeepEqual(drumScore(false),drumScore(true),'The two drums have distinct phrases');
  console.log('Mauritius: ordered pickup/deposit/return, two male lifting attempts, bounded duration, quiet reduced-motion result and distinct short drum phrases pass.');
})().catch(error=>{console.error(error);process.exitCode=1;});
