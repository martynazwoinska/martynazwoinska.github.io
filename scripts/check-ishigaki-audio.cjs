const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
let clock=0,contexts=[];
class Param {
  constructor(){this.events=[];}
  setValueAtTime(...v){this.events.push(['set',...v]);}
  linearRampToValueAtTime(...v){this.events.push(['ramp',...v]);}
  cancelScheduledValues(){}
  setTargetAtTime(){}
}
class Node {
  constructor(){this.gain=new Param();this.frequency=new Param();this.Q={};this.stops=[];}
  connect(){}
  disconnect(){this.disconnected=true;}
  start(at){this.started=at;}
  stop(at){this.stops.push(at);}
}
class Audio {
  constructor(){this.currentTime=10;this.state='running';this.destination={};this.sources=[];this.nodes=[];contexts.push(this);}
  resume(){return Promise.resolve();}
  node(){const node=new Node();this.nodes.push(node);return node;}
  createGain(){return this.node();}
  createBiquadFilter(){return this.node();}
  createOscillator(){const node=this.node();this.sources.push(node);return node;}
}
global.window={AudioContext:Audio};global.document={hidden:false};global.performance={now:()=>clock};
const flush=async()=>{await Promise.resolve();await Promise.resolve();};
(async()=>{
  const {createIshigakiAudio}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/ishigaki-audio.js')));
  const ctl=createIshigakiAudio();assert.equal(contexts.length,0);
  ctl.start(false,true);await flush();assert.equal(contexts.length,0,'No buzz for stationary reduced motion');
  ctl.start();await flush();const ctx=contexts[0];assert.equal(ctx.sources.length,2);
  assert(ctx.sources.every(n=>Math.abs(n.stops[0]-13.62)<1e-8),'Sound ends with female flight');
  const gains=ctx.nodes.flatMap(n=>n.gain.events).filter(e=>e[0]==='ramp').map(e=>e[1]);
  assert(gains.every(v=>v>=0&&v<=.045),'Bounded quiet envelope');
  ctl.cancel();assert(ctx.sources.every(n=>n.stops.at(-1)===10.05));
  ctx.sources.forEach(n=>n.onended());assert(ctx.nodes.every(n=>n.disconnected));
  ctl.start(true);await flush();assert(Math.abs(ctx.sources[2].stops[0]-13.12)<1e-8);
  ctl.cancel();
  const count=ctx.sources.length;
  ctl.start();ctl.cancel();await flush();assert.equal(ctx.sources.length,count,'Cancelled resume stays silent');
  ctx.resume=()=>new Promise(resolve=>ctx.release=resolve);
  ctl.start();clock=1000;ctx.release();await flush();assert.equal(ctx.sources.length,count,'No late buzz');
  ctx.resume=()=>Promise.reject(Error('blocked'));ctl.start();await flush();
  window.AudioContext=undefined;createIshigakiAudio().start();
  window.AudioContext=class{constructor(){throw Error('unsupported');}};createIshigakiAudio().start();
  console.log('Ishigaki audio: gesture-only start, flight timing, low gain, reduced motion, cleanup and blocked/late resume pass.');
})().catch(error=>{console.error(error);process.exitCode=1;});
