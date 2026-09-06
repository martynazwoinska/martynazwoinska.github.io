const assert = require('node:assert/strict');
const {pathToFileURL} = require('node:url');
const path = require('node:path');
const fs = require('node:fs');
let clock = 0, id = 0, queue = new Map(), events = {};
const reduced = {matches:false,addEventListener:(k,cb)=>events.reduce=cb};
class Matrix {
  constructor(){this.a=1;this.b=0;}
  inverse(){return this;} multiply(){return this;}
}
global.DOMPoint = class {constructor(x,y){this.x=x;this.y=y;}matrixTransform(){return this;}};
const walk = n => [n,...n.children.flatMap(walk)];
class Node {
  constructor(tag='g'){this.tag=tag;this.attrs={};this.dataset={};this.children=[];this.isConnected=true;}
  setAttribute(k,v){this.attrs[k]=String(v);if(k.startsWith('data-'))this.dataset[k.slice(5).replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]=String(v);}
  getAttribute(k){return this.attrs[k]??null;}
  removeAttribute(k){delete this.attrs[k];}
  append(...ns){ns.forEach(n=>{n.parentNode=this;this.children.push(n);});}
  remove(){this.parentNode.children=this.parentNode.children.filter(n=>n!==this);this.isConnected=false;}
  getScreenCTM(){return new Matrix();}
  closest(){return this.hidden?{}:null;}
  matches(s){if(s.startsWith('.'))return this.attrs.class===s.slice(1);if(s.startsWith('#'))return this.attrs.id===s.slice(1);return s[0]==='['&&this.attrs[s.slice(1,-1)]!==undefined;}
  querySelector(s){return walk(this).slice(1).find(n=>n.matches(s))||null;}
  cloneNode(){const n=new Node(this.tag);Object.entries(this.attrs).forEach(([k,v])=>n.setAttribute(k,v));this.children.forEach(c=>n.append(c.cloneNode()));return n;}
}
global.document={createElementNS:(_,tag)=>new Node(tag),addEventListener:(k,cb)=>events[k]=cb};
global.window={matchMedia:()=>reduced,addEventListener:(k,cb)=>events[k]=cb};
global.Image=class {decode(){return Promise.resolve();}};
global.performance={now:()=>clock};
global.requestAnimationFrame=cb=>{queue.set(++id,cb);return id;};
global.cancelAnimationFrame=i=>queue.delete(i);
const step=ms=>{clock+=ms;const pending=[...queue.values()];queue.clear();pending.forEach(cb=>cb(clock));};
const flush=async()=>{await Promise.resolve();await Promise.resolve();await Promise.resolve();};
(async()=>{
  const {createBaliCacao,cacaoCutFrame,cacaoBladePose,withinCacaoPod,CACAO_FAMILY}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/bali-cacao.js')));
  for(let ms=-100;ms<3600;ms+=7)for(const [k,v] of Object.entries(cacaoCutFrame(ms)))if(k!=='done')assert(v>=0&&v<=1);
  assert(cacaoCutFrame(2150).done);assert(withinCacaoPod(541,157));assert(!withinCacaoPod(314,330));assert(!withinCacaoPod(20,20));
  assert.equal(cacaoCutFrame(790).reveal,0,'The shell stays closed at impact');
  assert.equal(cacaoCutFrame(840).reveal,0,'Opening follows the impact hold');
  const start={x:100,y:100},grip={x:200,y:160};
  assert.equal(cacaoBladePose(640,start,grip,-12).tilt,-70);
  assert.equal(cacaoBladePose(790,start,grip,-12).tilt,22);
  assert.equal(cacaoBladePose(975,start,grip,-12).tilt,-6);
  assert.deepEqual(cacaoBladePose(2150,start,grip,-12),{x:100,y:100,tilt:-12});
  assert.equal(cacaoCutFrame(715).strike,.25,'The strike accelerates into contact');
  const habitat=new Node(),root=new Node(),bg=new Node('image'),env=new Node(),piece=new Node(),source=new Node();
  root.setAttribute('id','worm-species');bg.setAttribute('class','sanda-ju1873-painted-background');
  source.setAttribute('class','location-accessory-art');source.setAttribute('transform','translate(410 124) rotate(-12) scale(.46)');
  piece.dataset={accessoryFamily:CACAO_FAMILY,wormPart:'primary'};
  env.append(bg);habitat.append(env,root);root.append(piece);piece.append(source);
  const ctl=createBaliCacao(habitat),opened=()=>habitat.querySelector('[data-cacao-opened]');
  assert(!ctl.start({dataset:{accessoryFamily:CACAO_FAMILY,wormPart:'companion'},isConnected:false}));
  assert(!ctl.drop(piece));
  assert(ctl.start(piece));await flush();assert.equal(source.getAttribute('opacity'),'0');
  step(1300);assert(root.querySelector('[data-cacao-machete-flight]'));step(2200);
  assert.equal(opened().getAttribute('opacity'),'1');assert.equal(source.getAttribute('opacity'),null);
  assert(!root.querySelector('[data-cacao-machete-flight]'));assert.equal(queue.size,0);
  assert.equal(source.getAttribute('transform'),'translate(410 124) rotate(-12) scale(.46)');
  ctl.reset(piece);assert(!opened());
  ctl.start(piece);ctl.cancel();await flush();assert(!opened());assert.equal(queue.size,0);
  for(const reason of ['visibilitychange','pagehide','resize','reduce']){
    ctl.start(piece);await flush();step(1400);document.hidden=true;events[reason]();document.hidden=false;
    assert.equal(queue.size,0);assert.equal(source.getAttribute('opacity'),null);assert.equal(opened().getAttribute('opacity'),'0');
  }
  reduced.matches=true;ctl.start(piece);await flush();assert.equal(opened().getAttribute('opacity'),'1');assert.equal(queue.size,0);
  ctl.clear();assert(!opened());
  bg.hidden=true;assert(!ctl.start(piece));bg.hidden=false;piece.hidden=true;assert(!ctl.start(piece));piece.hidden=false;
  // A failed optional image never hides the tool, mounts a broken image or blocks a retry.
  global.Image=class {decode(){return Promise.reject(new Error('offline'));}};
  const failed=createBaliCacao(habitat);failed.start(piece);await flush();assert(!opened());assert.equal(source.getAttribute('opacity'),null);
  const game=fs.readFileSync(path.join(__dirname,'../game-of-worms/game.js'),'utf8');
  for(const call of ['baliCacao.start(piece)','baliCacao.drop(piece)','baliCacao.clear()','baliCacao.reset(piece)','baliCacao.cancel()'])assert(game.includes(call));
  for(const name of ['sanda-hanging-pod-backing.png','sanda-hanging-pod-halves.png'])assert(fs.existsSync(path.join(__dirname,'../game-of-worms/assets',name)));
  const png=fs.readFileSync(path.join(__dirname,'../game-of-worms/assets/sanda-hanging-pod-halves.png'));
  assert.equal(png[25],6,'The two pod-half sprites must have genuine RGBA transparency');
  console.log('Bali cacao: hanging-pod target only, delayed physical opening, bounded motion, female-only scope, load cancellation/failure, reset, tool restoration and reduced motion pass.');
})().catch(e=>{console.error(e);process.exitCode=1;});
