const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
(async()=>{
 const load=f=>import(pathToFileURL(path.resolve(__dirname,'../game-of-worms',f)).href);
 const {makeHeartPlayable}=await load('treasure-heart-play.js'),{newPuzzle}=await load('treasure-model.js');
 let animations=[],reduced=false,sounds=0,stops=0;
 class Node extends EventTarget{
  constructor(){super();this.attrs={};this.style={};this.children=[];this.classes=new Set();this.classList={add:c=>this.classes.add(c),remove:c=>this.classes.delete(c)};}
  setAttribute(k,v){this.attrs[k]=v;}removeAttribute(k){delete this.attrs[k];}
  append(n){n.parent=this;this.children.push(n);}remove(){this.removed=true;}
  querySelector(){return this.children[0];}querySelectorAll(){return this.pieces||[];}
  contains(n){return this.children.includes(n);}focus(){document.activeElement=this;}
  getAnimations(){return animations.filter(a=>a.node===this&&!a.cancelled);}
  animate(frames,options){const a={node:this,frames,options,cancel(){this.cancelled=true;}};animations.push(a);return a;}
  setPointerCapture(id){this.capture=id;}hasPointerCapture(id){return this.capture===id;}
  releasePointerCapture(){this.capture=null;this.dispatchEvent(new Event('lostpointercapture'));}
 }
 global.document=new EventTarget();document.createElementNS=()=>new Node();document.hidden=false;
 global.matchMedia=()=>({matches:reduced});
 const board=new Node(),assembly=new Node();board.append(assembly);board.pieces=Array.from({length:8},()=>new Node());
 const controller=makeHeartPlayable(board,newPuzzle('easy'),{play(kind){assert.equal(kind,'heartbeat');sounds++;},stop(){stops++;}}),hit=board.children[1];
 const send=(type,props={})=>{const event=new Event(type,{cancelable:true});Object.assign(event,props);hit.dispatchEvent(event);};
 send('pointerdown',{button:0,pointerId:1});assert.equal(hit.capture,1);assert.ok(hit.classes.has('is-pressed'));
 send('pointerup',{pointerId:2});assert.equal(sounds,0,'another finger cannot release this press');
 send('pointerup',{pointerId:1});assert.equal(sounds,1);assert.equal(hit.capture,null);assert.ok(!hit.classes.has('is-pressed'));
 assert.equal(assembly.getAnimations().at(-1).options.duration,780);
 send('pointerdown',{button:0,pointerId:3});send('pointercancel');assert.equal(sounds,1,'cancellation stays quiet');
 send('keydown',{key:' ',repeat:false});send('keydown',{key:' ',repeat:true});send('keyup',{key:' '});assert.equal(sounds,2,'held keys do not repeat');
 send('keydown',{key:'Enter',repeat:false});send('blur');send('keyup',{key:'Enter'});assert.equal(sounds,2,'blur cancels a held key');
 reduced=true;const start=animations.length;send('click',{detail:0});assert.equal(sounds,3);assert.ok(animations.slice(start).every(a=>a.node!==assembly),'reduced motion has no squeeze or bounce');
 send('pointerdown',{button:0,pointerId:4});document.hidden=true;document.dispatchEvent(new Event('visibilitychange'));send('pointerup',{pointerId:4});assert.equal(sounds,3);assert.equal(stops,1);
 controller.dispose();assert.ok(hit.removed);assert.ok(animations.every(a=>a.cancelled));document.hidden=false;send('click',{detail:0});assert.equal(sounds,3,'disposed boards cannot play');
 console.log('PASS: pointer identity, repeated presses, keyboard hold, cancellation, focus loss, reduced motion, hidden page and disposal.');
})().catch(e=>{console.error(e);process.exitCode=1;});
