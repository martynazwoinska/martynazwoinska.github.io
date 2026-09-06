const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
(async()=>{
  const {fanFrame,createAhmedabadFans}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/ahmedabad-fans.js')));
  for(const male of [false,true]) {
    for(let ms=0;ms<3400;ms+=13) {
      const state=fanFrame(ms,male);
      assert(Object.values(state).every(v=>typeof v==='boolean'||Number.isFinite(v)));
      assert(Math.abs(state.angle)<=24);assert(state.breeze>=0&&state.breeze<=.7);
      assert.equal(fanFrame(ms,male,true).angle,0);
      assert.equal(fanFrame(ms,male,true).phase,0);
    }
    assert(fanFrame(3200,male).done);assert(fanFrame(1100,male,true).done);
  }
  assert.notEqual(fanFrame(850).angle,fanFrame(850,true).angle);
  let clock=0,id=0,queue=new Map();const events={};
  global.performance={now:()=>clock};
  global.requestAnimationFrame=cb=>{queue.set(++id,cb);return id;};
  global.cancelAnimationFrame=id=>queue.delete(id);
  global.window={matchMedia:()=>({matches:false,addEventListener:(type,cb)=>events.reduced=cb}),addEventListener:(type,cb)=>events[type]=cb};
  const matrix={inverse(){return this;}};
  class Node {
    constructor(){this.attrs={};this.children=[];this.dataset={};this.isConnected=true;}
    setAttribute(k,v){this.attrs[k]=String(v);}
    getAttribute(k){return this.attrs[k]??null;}
    removeAttribute(k){delete this.attrs[k];}
    append(n){n.parent=this;this.children.push(n);}
    remove(){this.parent.children=this.parent.children.filter(n=>n!==this);}
    getScreenCTM(){return matrix;}
    closest(){return this.hidden?{}:null;}
  }
  global.DOMPoint=class {constructor(x,y){this.x=x;this.y=y;}matrixTransform(){return this;}};
  global.document={hidden:false,createElementNS:()=>new Node(),addEventListener:(type,cb)=>events[type]=cb};
  const root=new Node(),cheek=new Node();cheek.setAttribute('cx',311);cheek.setAttribute('cy',70);
  const habitat={querySelector:s=>s==='#worm-species'?root:cheek},motion=new Node(),piece=new Node();
  piece.dataset={accessoryFamily:'lattice-fan',wormPart:'primary'};piece.querySelector=()=>motion;
  const controller=createAhmedabadFans(habitat);
  const step=ms=>{clock=ms;const pending=[...queue.values()];queue.clear();pending.forEach(cb=>cb(ms));};
  assert(controller.start(piece));step(700);assert(motion.getAttribute('transform').startsWith('rotate('));assert.equal(root.children.length,1);
  assert(root.children[0].children.every(n=>!n.getAttribute('d').includes('NaN')));
  controller.cancel();assert.equal(root.children.length,0);assert.equal(motion.getAttribute('transform'),null);assert.equal(queue.size,0);
  motion.setAttribute('transform','translate(2 3)');
  controller.start(piece);step(4000);assert.equal(motion.getAttribute('transform'),'translate(2 3)');assert(!piece.dataset.fanning);
  controller.start(piece);piece.hidden=true;step(4100);assert.equal(root.children.length,0);
  piece.hidden=false;controller.start(piece);controller.start(piece);assert.equal(root.children.length,1);
  document.hidden=true;events.visibilitychange();assert.equal(root.children.length,0);
  document.hidden=false;controller.start(piece);events.reduced();assert.equal(root.children.length,0);
  assert.equal(controller.start({dataset:{accessoryFamily:'other'}}),false);
  console.log('Ahmedabad fans: independent rhythms, bounded motion, reduced motion, directed breeze, replay, exact restoration and cancellation pass.');
})().catch(e=>{console.error(e);process.exitCode=1;});
