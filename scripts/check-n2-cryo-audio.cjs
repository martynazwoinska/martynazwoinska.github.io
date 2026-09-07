const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
let clock=0,contexts=[];
class Param {
  constructor(){this.events=[];}
  setValueAtTime(...v){this.events.push(['set',...v]);}
  linearRampToValueAtTime(...v){this.events.push(['linear',...v]);}
  exponentialRampToValueAtTime(...v){this.events.push(['exp',...v]);}
  cancelScheduledValues(...v){this.events.push(['cancel',...v]);}
  setTargetAtTime(...v){this.events.push(['target',...v]);}
}
class Node {
  constructor(){this.gain=new Param();this.frequency=new Param();this.Q={};this.stops=[];}
  connect(n){this.connected=n;}
  disconnect(){this.disconnected=true;}
  start(at){this.started=at;}
  stop(at){this.stops.push(at);}
}
class Audio {
  constructor(){this.currentTime=10;this.sampleRate=48000;this.state='running';this.destination={};this.sources=[];this.nodes=[];this.buffers=[];contexts.push(this);}
  resume(){return Promise.resolve();}
  node(){const n=new Node();this.nodes.push(n);return n;}
  createGain(){return this.node();}
  createBiquadFilter(){return this.node();}
  createOscillator(){const n=this.node();this.sources.push(n);return n;}
  createBufferSource(){return this.createOscillator();}
  createBuffer(ch,length,rate){const samples=new Float32Array(length);const b={samples,getChannelData:()=>samples};this.buffers.push(b);return b;}
}
global.window={AudioContext:Audio};global.document={hidden:false};global.performance={now:()=>clock};
const flush=async()=>{await Promise.resolve();await Promise.resolve();};
(async()=>{
  const {cryoSoundScore,createN2CryoAudio}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/n2-cryo-audio.js')));
  const score=cryoSoundScore();assert.equal(score.length,6);
  assert.deepEqual(score.filter(s=>s.kind==='jet').map(s=>s.at),[1250,1530]);
  assert(cryoSoundScore(true).every(s=>s.kind!=='jet'),'No flight sound in stationary reduced motion');
  for(const cue of score){assert(cue.level>0&&cue.level<=.15);assert(cue.at+cue.duration*1000<3400);}
  const ctl=createN2CryoAudio();assert.equal(contexts.length,0,'No AudioContext on page load');
  ctl.start();await flush();const ctx=contexts[0];assert.equal(ctx.sources.length,6);
  assert.deepEqual(ctx.sources.map(s=>Math.round((s.started-10)*1000)),score.map(s=>s.at));
  assert.equal(ctx.buffers.length,1,'One reusable noise buffer');
  assert(ctx.buffers[0].samples.every(n=>Number.isFinite(n)&&Math.abs(n)<=1));
  ctl.cancel();assert(ctx.sources.every(s=>s.stops.at(-1)===10.04),'Every scheduled source stops on cancel');
  ctx.sources.forEach(s=>s.onended());assert(ctx.nodes.every(n=>n.disconnected),'Ended nodes disconnect');
  ctl.start(true);await flush();assert.equal(contexts.length,1);assert.equal(ctx.sources.length,10);
  ctl.start();ctl.cancel();await flush();assert.equal(ctx.sources.length,10,'Cancel before resume creates no voices');
  document.hidden=true;ctl.start();await flush();assert.equal(ctx.sources.length,10);document.hidden=false;
  ctx.resume=()=>new Promise(resolve=>ctx.release=resolve);
  ctl.start();clock=1700;ctx.release();await flush();assert.equal(ctx.sources.length,10,'Delayed resume cannot play stale freeze or launch cues');
  ctl.start();const oldRelease=ctx.release;ctl.cancel();oldRelease();await flush();assert.equal(ctx.sources.length,10);
  ctx.resume=()=>Promise.reject(new Error('blocked'));ctl.start();await flush();
  window.AudioContext=undefined;createN2CryoAudio().start();
  window.AudioContext=class {constructor(){throw new Error('unsupported');}};createN2CryoAudio().start();
  const fs=require('node:fs');const flight=fs.readFileSync(path.join(__dirname,'../game-of-worms/n2-cryo-flight.js'),'utf8');
  assert(flight.includes('sound.start(reduced.matches)'));assert(flight.includes('sound.cancel()'));
  console.log('N2 audio: gesture-only context, aligned freeze/launch cues, bounded levels, reduced-motion score, cleanup, replay, delayed/failed resume and silent fallback pass.');
})().catch(e=>{console.error(e);process.exitCode=1;});
