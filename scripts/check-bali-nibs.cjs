const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
let clock=0,sequence=0,queue=new Map();
const reduced={matches:false};
class Matrix {
  constructor(){Object.assign(this,{a:1,b:0,c:0,d:1,e:0,f:0});}
  inverse(){return this;} multiply(){return this;}
}
global.DOMPoint=class {constructor(x,y){this.x=x;this.y=y;}matrixTransform(){return this;}};
class Node {
  constructor(){this.attrs={};this.dataset={};this.children=[];this.isConnected=true;}
  setAttribute(k,v){this.attrs[k]=String(v);if(k.startsWith('data-'))this.dataset[k.slice(5).replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]=String(v);}
  getAttribute(k){return this.attrs[k]??null;}
  removeAttribute(k){delete this.attrs[k];}
  append(...nodes){nodes.forEach(n=>{n.parentNode=this;this.children.push(n);});}
  remove(){this.parentNode.children=this.parentNode.children.filter(n=>n!==this);this.isConnected=false;}
  closest(){return this.hidden?{}:null;}
  getScreenCTM(){return new Matrix();}
  querySelectorAll(s){return this.children.flatMap(n=>[...(n.attrs[s.slice(1,-1)]!==undefined?[n]:[]),...n.querySelectorAll(s)]);}
  querySelector(s){return this.querySelectorAll(s)[0]||null;}
  cloneNode(){const n=new Node();Object.entries(this.attrs).forEach(([k,v])=>n.setAttribute(k,v));this.children.forEach(c=>n.append(c.cloneNode()));return n;}
}
global.document={createElementNS:()=>new Node()};
global.window={matchMedia:()=>reduced};
global.performance={now:()=>clock};
global.requestAnimationFrame=cb=>{queue.set(++sequence,cb);return sequence;};
global.cancelAnimationFrame=id=>queue.delete(id);
function step(ms){clock+=ms;const current=[...queue.values()];queue.clear();current.forEach(cb=>cb(clock));}
(async()=>{
  const {createBaliNibs,nibFeedingFrame}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/bali-nibs.js')));
  for(let ms=-100;ms<2000;ms+=13)assert(nibFeedingFrame(ms).reach>=0&&nibFeedingFrame(ms).reach<=1);
  assert(!nibFeedingFrame(649).eaten);assert(nibFeedingFrame(650).eaten);assert(nibFeedingFrame(1400).done);
  const root=new Node(),smile=new Node(),piece=new Node(),bag=new Node();
  piece.dataset={accessoryFamily:'ju1873-cacao-specimen-lantern',wormPart:'companion'};
  bag.setAttribute('data-cacao-package','');piece.append(bag);root.append(piece);
  const food=Array.from({length:5},(_,i)=>{const n=new Node();n.setAttribute('data-cacao-nib',i);bag.append(n);return n;});
  const habitat={querySelector:s=>s==='#worm-species'?root:s==='#companion-worm .worm-smile'?smile:null};
  const ctl=createBaliNibs(habitat);
  const remaining=()=>food.filter(n=>!n.dataset.consumed).length;
  assert(!ctl.handles({dataset:{...piece.dataset,wormPart:'primary'}}));
  piece.hidden=true;assert(!ctl.start(piece));piece.hidden=false;
  assert(ctl.start(piece));step(300);ctl.cancel();assert.equal(remaining(),5);assert.equal(food[0].getAttribute('opacity'),null);
  for(let i=0;i<5;i++) {
    ctl.start(piece);step(650);assert.equal(remaining(),4-i);step(750);
    assert.equal(queue.size,0);assert.equal(root.children.length,1);assert(!piece.dataset.cacaoFeeding);
  }
  ctl.start(piece);assert.equal(remaining(),5,'Next activation refills an empty packet');
  ctl.start(piece);step(650);ctl.cancel();assert.equal(remaining(),4,'Cancellation after contact keeps the eaten nib consumed');
  ctl.reset(piece);assert.equal(remaining(),5);assert(food.every(n=>n.getAttribute('opacity')===null));
  ctl.start(piece);step(200);ctl.start(piece);assert.equal(queue.size,1,'Replay replaces the active flight');
  ctl.clear();assert.equal(queue.size,0);assert.equal(remaining(),5);
  ctl.start(piece);piece.hidden=true;step(100);assert.equal(queue.size,0);piece.hidden=false;
  reduced.matches=true;ctl.start(piece);assert.equal(remaining(),4);assert.equal(queue.size,0);assert.equal(root.children.length,1);
  ctl.reset(piece);assert.equal(remaining(),5);assert(!ctl.drop(piece),'Dropping far from the mouth does not feed');
  console.log('Bali nibs: male-only feeding, exact consumption, empty/refill, replay, before/after-contact cancellation, hiding, reset and reduced motion pass.');
})().catch(error=>{console.error(error);process.exitCode=1;});
