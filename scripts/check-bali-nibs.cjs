const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
let clock=0,sequence=0,queue=new Map();
const events={};
const reduced={matches:false,addEventListener:(name,fn)=>events.reduced=fn};
class Matrix {
  constructor(values={}){Object.assign(this,{a:1,b:0,c:0,d:1,e:0,f:0},values);}
  inverse(){const det=this.a*this.d-this.b*this.c;return new Matrix({
    a:this.d/det,b:-this.b/det,c:-this.c/det,d:this.a/det,
    e:(this.c*this.f-this.d*this.e)/det,f:(this.b*this.e-this.a*this.f)/det});}
  multiply(m){return new Matrix({
    a:this.a*m.a+this.c*m.b,b:this.b*m.a+this.d*m.b,
    c:this.a*m.c+this.c*m.d,d:this.b*m.c+this.d*m.d,
    e:this.a*m.e+this.c*m.f+this.e,f:this.b*m.e+this.d*m.f+this.f});}
}
global.DOMPoint=class {constructor(x,y){this.x=x;this.y=y;}matrixTransform(m){return new DOMPoint(m.a*this.x+m.c*this.y+m.e,m.b*this.x+m.d*this.y+m.f);}};
class Node {
  constructor(){this.attrs={};this.dataset={};this.children=[];this.isConnected=true;}
  setAttribute(k,v){this.attrs[k]=String(v);if(k.startsWith('data-'))this.dataset[k.slice(5).replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]=String(v);}
  getAttribute(k){return this.attrs[k]??null;}
  removeAttribute(k){delete this.attrs[k];}
  append(...nodes){nodes.forEach(n=>{n.parentNode=this;this.children.push(n);});}
  remove(){this.parentNode.children=this.parentNode.children.filter(n=>n!==this);this.isConnected=false;}
  closest(){return this.hidden?{}:null;}
  getScreenCTM(){return this.matrix||new Matrix();}
  querySelectorAll(s){return this.children.flatMap(n=>[...(n.attrs[s.slice(1,-1)]!==undefined?[n]:[]),...n.querySelectorAll(s)]);}
  querySelector(s){return this.querySelectorAll(s)[0]||null;}
  cloneNode(){const n=new Node();Object.entries(this.attrs).forEach(([k,v])=>n.setAttribute(k,v));this.children.forEach(c=>n.append(c.cloneNode()));return n;}
}
global.document={hidden:false,createElementNS:()=>new Node(),addEventListener:(name,fn)=>events[name]=fn};
global.window={matchMedia:()=>reduced,addEventListener:(name,fn)=>events[name]=fn};
global.performance={now:()=>clock};
global.requestAnimationFrame=cb=>{queue.set(++sequence,cb);return sequence;};
global.cancelAnimationFrame=id=>queue.delete(id);
function step(ms){clock+=ms;const current=[...queue.values()];queue.clear();current.forEach(cb=>cb(clock));}
(async()=>{
  const {createBaliNibs,nibFeedingFrame,nibBiteCue}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/bali-nibs.js')));
  for(let ms=-100;ms<2400;ms+=13)for(const key of ['reach','bite','chew','face'])assert(nibFeedingFrame(ms)[key]>=0&&nibFeedingFrame(ms)[key]<=1);
  assert(!nibFeedingFrame(849).eaten);assert(nibFeedingFrame(850).eaten);assert(nibFeedingFrame(2120).done);
  assert.equal(nibFeedingFrame(850).reach,1);
  assert.equal(nibFeedingFrame(850).bite,0,'Food reaches the mouth intact');
  assert.equal(nibFeedingFrame(1020).bite,.48,'A first bite leaves a visible second piece');
  assert.equal(nibFeedingFrame(1300).bite,1);
  assert(nibFeedingFrame(1100).chew>0);
  assert.equal(nibBiteCue().at,850);
  assert(nibBiteCue().at+nibBiteCue().duration*1000<1840,'Recording ends within the chew');
  const root=new Node(),smile=new Node(),piece=new Node(),bag=new Node();
  piece.dataset={accessoryFamily:'ju1873-cacao-specimen-lantern',wormPart:'companion'};
  bag.setAttribute('data-cacao-package','');piece.append(bag);root.append(piece);
  const food=Array.from({length:5},(_,i)=>{const n=new Node();n.setAttribute('data-cacao-nib',i);bag.append(n);return n;});
  const habitat={querySelector:s=>s==='#worm-species'?root:s==='#companion-worm .worm-smile'?smile:null};
  const calls=[],sound={unlock:()=>calls.push('unlock'),play:(...args)=>calls.push(args),stop:()=>calls.push('stop')};
  const ctl=createBaliNibs(habitat,{sound});
  const remaining=()=>food.filter(n=>!n.dataset.consumed).length;
  assert(!ctl.handles({dataset:{...piece.dataset,wormPart:'primary'}}));
  piece.hidden=true;assert(!ctl.start(piece));piece.hidden=false;
  assert(ctl.start(piece));step(300);ctl.cancel();assert.equal(remaining(),5);assert.equal(food[0].getAttribute('opacity'),null);
  assert.equal(calls.filter(Array.isArray).length,0,'No sound before contact');
  assert.equal(smile.getAttribute('opacity'),null);
  for(let i=0;i<5;i++) {
    ctl.start(piece);step(850);assert.equal(remaining(),4-i);
    assert.deepEqual(calls.filter(Array.isArray).at(-1),['bite',true,0]);
    assert.equal(smile.getAttribute('opacity'),'0');
    const effect=root.children.at(-1),flight=effect.children[2],edge=flight.children[0].children[0].children[0];
    assert.equal(edge.getAttribute('width'),'16');
    assert.equal(flight.getAttribute('transform'),'matrix(0.58 0 0 0.58 331 76)');
    step(170);assert.equal(Number(edge.getAttribute('width')),16*.52);
    step(1100);
    assert.equal(queue.size,0);assert.equal(root.children.length,1);assert(!piece.dataset.cacaoFeeding);
    assert.equal(smile.getAttribute('opacity'),null,'Original smile restored exactly');
  }
  ctl.start(piece);assert.equal(remaining(),5,'Next activation refills an empty packet');
  ctl.start(piece);step(850);ctl.cancel();assert.equal(remaining(),4,'Cancellation after contact keeps the eaten nib consumed');
  ctl.reset(piece);assert.equal(remaining(),5);assert(food.every(n=>n.getAttribute('opacity')===null));
  ctl.start(piece);step(200);ctl.start(piece);assert.equal(queue.size,1,'Replay replaces the active flight');
  ctl.clear();assert.equal(queue.size,0);assert.equal(remaining(),5);
  ctl.start(piece);piece.hidden=true;step(100);assert.equal(queue.size,0);piece.hidden=false;
  for(const event of ['resize','pagehide','reduced']){
    smile.setAttribute('opacity','.8');ctl.start(piece);step(850);events[event]();
    assert.equal(queue.size,0);assert.equal(smile.getAttribute('opacity'),'.8');assert.equal(calls.at(-1),'stop');ctl.reset(piece);
  }
  ctl.start(piece);document.hidden=true;events.visibilitychange();assert.equal(queue.size,0);
  assert(!ctl.start(piece));document.hidden=false;
  const unlocks=calls.filter(c=>c==='unlock').length;
  reduced.matches=true;ctl.start(piece);assert.equal(remaining(),4);assert.equal(queue.size,0);assert.equal(root.children.length,1);
  assert.equal(calls.filter(c=>c==='unlock').length,unlocks,'Reduced motion is immediate and silent');
  ctl.reset(piece);assert.equal(remaining(),5);assert(!ctl.drop(piece),'Dropping far from the mouth does not feed');
  reduced.matches=false;smile.matrix=new Matrix({a:.42,b:.06,c:-.06,d:.42,e:-28,f:82});
  food[0].matrix=new Matrix({a:2,b:.3,c:-.3,d:2,e:52,f:119});
  piece.setAttribute('transform','translate(18 26) scale(1.6)');
  ctl.start(piece);step(850);
  const posed=root.children.at(-1).children[2].getAttribute('transform').match(/-?\d*\.?\d+(?:e[-+]?\d+)?/g).map(Number);
  const mouth=new DOMPoint(331,76).matrixTransform(smile.matrix);
  assert(Math.abs(posed[4]-mouth.x)<1e-8&&Math.abs(posed[5]-mouth.y)<1e-8,'Rotated/scaled face is the target');
  assert.equal(piece.getAttribute('transform'),'translate(18 26) scale(1.6)','User packet size and placement remain intact');
  ctl.cancel();assert.equal(root.children.length,1);
  console.log('Bali nibs: mouth contact, two-stage bite, chewing, recorded cue timing, exact consumption, refills, replay, face restoration, cancellation and reduced motion pass.');
})().catch(error=>{console.error(error);process.exitCode=1;});
