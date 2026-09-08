const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
(async()=>{
  const source=fs.readFileSync(path.join(root,'game-of-worms/edinburgh-pipes.js'),'utf8');
  const {pipeScore,pipeDuration,pipeMotion,createPipeAudio}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
  assert.notDeepEqual(pipeScore(),pipeScore(true));
  for(const male of [false,true]){
    const score=pipeScore(male),end=pipeDuration(male);
    assert.ok(end>3&&end<6);
    for(let i=0;i<score.length;i++){
      assert.ok(score[i].note>=0&&score[i].note<8);
      assert.ok(score[i].duration>0);
      if(i)assert.ok(Math.abs(score[i].at-score[i-1].at-score[i-1].duration)<1e-10);
      assert.equal(pipeMotion(score[i].at+.01,male).finger,score[i].note%3);
    }
    assert.equal(pipeMotion(0,male).hold,0);
    assert.equal(pipeMotion(end,male).hold,0);
    for(let t=0;t<end;t+=.01){
      const p=pipeMotion(t,male),r=pipeMotion(t,male,true);
      assert.ok(p.hold>=0&&p.hold<=1&&p.squeeze>=0&&p.squeeze<=.018);
      assert.equal(r.hold,0);assert.equal(r.squeeze,0);
    }
  }
  const contexts=[];
  class Param {
    constructor(){this.events=[];this.value=0;}
    setValueAtTime(...a){this.events.push(['set',...a]);}
    linearRampToValueAtTime(...a){this.events.push(['ramp',...a]);}
    cancelScheduledValues(...a){this.events.push(['cancel',...a]);}
    cancelAndHoldAtTime(...a){this.events.push(['hold',...a]);}
    setTargetAtTime(...a){this.events.push(['target',...a]);}
  }
  class Audio {
    constructor(){this.state='suspended';this.currentTime=10;this.destination={};this.oscs=[];this.gains=[];contexts.push(this);}
    resume(){this.state='running';return Promise.resolve();}
    createPeriodicWave(real,imag){assert.equal(imag.length,13);return {};}
    createGain(){const g={gain:new Param(),connect(){},disconnect(){this.disconnected=true;}};this.gains.push(g);return g;}
    createOscillator(){const o={frequency:new Param(),starts:[],stops:[],setPeriodicWave(){},connect(){},disconnect(){this.disconnected=true;},start(t){this.starts.push(t);},stop(t){this.stops.push(t);}};this.oscs.push(o);return o;}
  }
  global.window={AudioContext:Audio};global.document={hidden:false};
  const sound=createPipeAudio();
  assert.equal(contexts.length,0);assert.equal(sound.play(),false);
  await sound.prepare();assert.equal(sound.play(),true);
  const a=contexts[0];assert.equal(a.oscs.length,4);
  assert.equal(a.oscs[0].frequency.events[0][1],466.16/4);
  assert.equal(a.oscs[1].frequency.events[0][1],466.16/2);
  assert.equal(a.oscs[3].frequency.events.length,pipeScore().length*2);
  assert.ok(a.oscs.every(o=>o.starts.length===1&&o.stops.length===1));
  sound.stop();assert.ok(a.oscs.every(o=>o.stops.length===2));
  assert.ok(a.gains[0].gain.events.some(e=>e[0]==='hold'));
  a.oscs.forEach(o=>o.onended());assert.ok(a.gains.every(g=>g.disconnected));
  sound.stop();document.hidden=true;assert.equal(sound.play(),false);
  document.hidden=false;a.state='suspended';assert.equal(sound.play(),false);
  window.AudioContext=undefined;const silent=createPipeAudio();await silent.prepare();assert.equal(silent.play(),false);
  const game=fs.readFileSync(path.join(root,'game-of-worms/game.js'),'utf8');
  assert.match(game,/edinburghPipes\.start\(piece\)/);
  assert.match(source,/visibilitychange/);assert.match(source,/pagehide/);
  assert.match(source,/wrapper\.replaceWith\(r\.art\)/);
  console.log('Edinburgh pipes: paired scores, motion, note fingering, gesture-only audio, drones and cleanup pass.');
})().catch(e=>{console.error(e);process.exitCode=1;});
