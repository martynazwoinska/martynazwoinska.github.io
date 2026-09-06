const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
const walk=n=>[n,...n.children.flatMap(walk)];
let clock=0,id=0,queue=new Map(),events={},reduce={matches:false,addEventListener:(k,cb)=>events.reduce=cb};
class Matrix {inverse(){return this;}multiply(){return this;}translate(){return this;}toString(){return 'matrix(1 0 0 1 0 0)';}}
global.DOMMatrix=Matrix;
global.DOMPoint=class {constructor(x,y){this.x=x;this.y=y;}matrixTransform(){return this;}};
class Node {
  constructor(tag='g'){this.tag=tag;this.attrs={};this.dataset={};this.children=[];this.isConnected=true;this.classList={add:(...v)=>this.setAttribute('class',v.join(' '))};}
  setAttribute(k,v){this.attrs[k]=String(v);if(k.startsWith('data-'))this.dataset[k.slice(5).replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]=String(v);}
  getAttribute(k){return this.attrs[k]??null;}
  removeAttribute(k){delete this.attrs[k];}
  appendChild(n){n.parentNode=this;this.children.push(n);return n;}
  append(...ns){ns.forEach(n=>this.appendChild(n));}
  remove(){this.parentNode.children=this.parentNode.children.filter(n=>n!==this);}
  getScreenCTM(){return new Matrix();}
  getBoundingClientRect(){return {left:300,right:350,top:60,bottom:90};}
  closest(){return this.hidden?{}:null;}
  matches(s){if(s.startsWith('.'))return this.attrs.class?.split(' ').includes(s.slice(1));const m=s.match(/^\[([^=\]]+)(?:="([^"]*)")?\]$/);return m&&Object.hasOwn(this.attrs,m[1])&&(m[2]===undefined||this.attrs[m[1]]===m[2]);}
  querySelectorAll(s){return walk(this).slice(1).filter(n=>n.matches(s));}
  querySelector(s){return this.querySelectorAll(s)[0]||null;}
  cloneNode(){const n=new Node(this.tag);Object.entries(this.attrs).forEach(([k,v])=>n.setAttribute(k,v));n.dataset={...this.dataset};this.children.forEach(c=>n.append(c.cloneNode()));return n;}
}
global.document={createElementNS:(_,tag)=>new Node(tag),addEventListener:(k,cb)=>events[k]=cb};
global.window={matchMedia:()=>reduce,addEventListener:(k,cb)=>events[k]=cb};
global.performance={now:()=>clock};
global.requestAnimationFrame=cb=>{queue.set(++id,cb);return id;};
global.cancelAnimationFrame=i=>queue.delete(i);
const step=ms=>{clock+=ms;const cbs=[...queue.values()];queue.clear();cbs.forEach(cb=>cb(clock));};
(async()=>{
  const url=name=>pathToFileURL(path.join(__dirname,'../game-of-worms',name));
  const {drawCafeProps,COOKIE_BITTEN}=await import(url('canberra-cafe-art.js'));
  const {drawFlyingCockatoos}=await import(url('canberra-cockatoos.js'));
  const {cafeFrame,createCanberraCafe}=await import(url('canberra-cafe.js'));
  for(const kind of ['sip','bite','raid','wipe'])for(const reduced of [false,true]) {
    for(let ms=0;ms<5100;ms+=11){const s=cafeFrame(ms,kind,reduced);assert(s.reach>=0&&s.reach<=1);assert(Number.isFinite(s.t));}
    assert(cafeFrame(5000,kind,reduced).done);assert(cafeFrame(reduced?350:kind==='raid'?2000:kind==='wipe'?750:1000,kind,reduced).contact);
  }
  const root=new Node(),primary=new Node(),companion=new Node();
  const pMouth=new Node('path'),mMouth=new Node('path');primary.append(pMouth);companion.append(mMouth);root.append(primary,companion);
  const habitat={querySelector:s=>s==='#worm-species'?root:s.includes('.worm-smile')?(s.includes('#companion')?mMouth:pMouth):root.querySelector(s),querySelectorAll:s=>root.querySelectorAll(s)};
  const makePiece=(family,part,draw)=>{const piece=new Node();piece.dataset={accessoryFamily:family,wormPart:part};root.append(piece);draw(piece,{family},part==='companion');return piece;};
  const food=makePiece('canberra-flat-white-cafe','companion',drawCafeProps);
  const napkin=makePiece('canberra-linen-napkins','companion',drawCafeProps);
  const bird=makePiece('oconnor-cockatoo-cafe-raid','companion',drawFlyingCockatoos);
  const ctl=createCanberraCafe(habitat);
  assert.equal(food.querySelectorAll('[data-cafe-cookie]').length,3);
  assert(ctl.start(food));step(1050);assert(root.querySelector('[data-cafe-mouth="companion"]'));step(1300);
  const last=food.querySelectorAll('[data-cafe-cookie]')[2];assert(last.dataset.bitten);assert.equal(last.querySelector('[data-cookie-face]').getAttribute('d'),COOKIE_BITTEN);
  assert(ctl.start(bird));step(2000);assert.equal(last.dataset.consumed,'stolen');step(2900);assert.equal(last.getAttribute('opacity'),'0');assert.equal(root.querySelectorAll('[data-cafe-overlay]').length,0);
  assert(ctl.wipe(napkin));assert(!root.querySelector('[data-cafe-mouth]'));assert.equal(napkin.querySelector('[data-cafe-stain]').getAttribute('opacity'),'.7');
  ctl.reset(food);assert(food.querySelectorAll('[data-cafe-cookie]').every(n=>!n.dataset.consumed&&!n.dataset.bitten));
  ctl.start(bird);step(500);ctl.cancel();assert.equal(root.querySelectorAll('[data-cafe-overlay]').length,0);assert(food.querySelectorAll('[data-cafe-cookie]').every(n=>!n.dataset.consumed));
  ctl.start(food);step(1000);step(1300);ctl.start(napkin);step(750);step(1100);assert(!root.querySelector('[data-cafe-mouth]'));
  for(const reason of ['visibilitychange','pagehide','reduce']) {ctl.start(bird);document.hidden=true;events[reason]();assert.equal(queue.size,0);assert.equal(root.querySelectorAll('[data-cafe-overlay]').length,0);}
  document.hidden=false;reduce.matches=true;ctl.start(bird);step(350);step(400);assert.equal(root.querySelectorAll('[data-cafe-overlay]').length,0);
  ctl.reset(food);ctl.start(food);step(1000);ctl.clear();assert(!root.querySelector('[data-cafe-mouth]'));
  assert.equal(ctl.start({dataset:{accessoryFamily:'other'}}),false);
  console.log('Café: three real biscuits, bite state, stolen inventory, drag and keyboard wipe, stains, reset, cancellation, reduced motion and bounded timelines pass.');
})().catch(e=>{console.error(e);process.exitCode=1;});
