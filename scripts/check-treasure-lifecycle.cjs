const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
class Matrix{
 constructor(a=1,d=1,e=0,f=0){Object.assign(this,{a,b:0,c:0,d,e,f});}
 multiply(m){return new Matrix(this.a*m.a,this.d*m.d,this.a*m.e+this.e,this.d*m.f+this.f);}
 inverse(){return new Matrix(1/this.a,1/this.d,-this.e/this.a,-this.f/this.d);}
}
class Point{constructor(x,y){Object.assign(this,{x,y});}matrixTransform(m){return new Point(this.x*m.a+this.y*m.c+m.e,this.x*m.b+this.y*m.d+m.f);}}
class Node extends EventTarget{
 constructor(tag='g'){super();this.tag=tag;this.attrs={};this.dataset={};this.children=[];this.style={setProperty(k,v){this[k]=v;}};this.classList={toggle(){}};this.viewBox={baseVal:{x:0,y:0,width:100,height:100}};}
 setAttribute(k,v){this.attrs[k]=String(v);if(k.startsWith('data-'))this.dataset[k.slice(5).replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]=String(v);}
 getAttribute(k){return this.attrs[k]??(k.startsWith('data-')?this.dataset[k.slice(5).replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]:null)??null;}removeAttribute(k){delete this.attrs[k];}
 set className(v){this.attrs.class=v;}get className(){return this.attrs.class||'';}
 set id(v){this.attrs.id=v;}get id(){return this.attrs.id||'';}
 get parentNode(){return this.parent;}get parentElement(){return this.parent;}
 append(...nodes){nodes.forEach(n=>{n.remove();n.parent=this;this.children.push(n);});}appendChild(n){this.append(n);return n;}
 prepend(n){this.append(n);this.children.unshift(this.children.pop());}
 after(n){n.remove();n.parent=this.parent;this.parent.children.splice(this.parent.children.indexOf(this)+1,0,n);}
 remove(){if(this.parent){this.parent.children=this.parent.children.filter(n=>n!==this);this.parent=null;}}
 replaceChildren(...nodes){for(const n of [...this.children])n.remove();this.append(...nodes);}
 get isConnected(){return this===document.body||!!this.parent?.isConnected;}
 matches(selector){
  if(selector.includes(','))return selector.split(',').some(s=>this.matches(s));
  const attrs=[...selector.matchAll(/\[([^=\]]+)(?:="([^"]*)")?\]/g)];
  if(!attrs.every(([,k,v])=>v===undefined?this.getAttribute(k)!==null:this.getAttribute(k)===v))return false;
  const bare=selector.replace(/\[[^\]]+\]/g,'');
  return !bare||bare[0]==='.'?(!bare||this.className.split(' ').includes(bare.slice(1))):bare[0]==='#'?this.attrs.id===bare.slice(1):this.tag===bare;
 }
 closest(selector){return this.matches(selector)?this:this.parent?.closest(selector)||null;}
 querySelectorAll(selector){
  const nodes=this.children.flatMap(n=>[n,...n.querySelectorAll('*')]);if(selector==='*')return nodes;
  if(selector==='[data-live-loupe] svg')return nodes.filter(n=>n.tag==='svg'&&n.parent?.closest('[data-live-loupe]'));
  return nodes.filter(n=>n.matches(selector));
 }
 querySelector(s){return this.querySelectorAll(s)[0]||null;}
 getScreenCTM(){
  if(this.screen)return this.screen;let m=this.parent?.getScreenCTM()||new Matrix();
  const t=this.getAttribute('transform')?.match(/translate\(([-\d.]+)[ ,]+([-\d.]+)\)/);if(t)m=m.multiply(new Matrix(1,1,+t[1],+t[2]));return m;
 }
 getBoundingClientRect(){return this.bounds||{left:0,top:0,right:600,bottom:430,width:600,height:430};}
 get clientHeight(){return this.getBoundingClientRect().height;}
 focus(){document.activeElement=this;}animate(){return {finished:Promise.resolve()};}
}
const add=(parent,tag,attrs={})=>{const n=new Node(tag);for(const[k,v]of Object.entries(attrs))n.setAttribute(k,v);parent?.append(n);return n;};
const fire=(target,type,detail)=>{const e=new Event(type);e.detail=detail;target.dispatchEvent(e);};
(async()=>{
 const geometry=await import('../game-of-worms/treasure-geometry.js'),model=await import('../game-of-worms/treasure-model.js'),pieces=await import('../game-of-worms/treasure-pieces.js');
 const {gemLanding,gemDropFrames}=await import('../game-of-worms/treasure-motion.js');
 let now=0,nextFrame=0;const frames=new Map(),stored=new Map();
 global.document=new EventTarget();document.body=new Node('body');document.createElementNS=(_,tag)=>new Node(tag);document.hidden=false;
 document.createElement=tag=>new Node(tag);document.getElementById=id=>document.body.querySelector('#'+id);
 for(const id of['treasure-toggle','treasure-count','treasure-announcement'])add(document.body,'button',{id});
 const window=new EventTarget(),context={console,Math,Map,Set,Number,JSON,Promise,document,window,DOMPoint:Point,
  localStorage:{getItem:k=>stored.get(k)||null,setItem:(k,v)=>stored.set(k,v)},
  performance:{now:()=>now},matchMedia:()=>({matches:true}),setTimeout:()=>0,clearTimeout(){},queueMicrotask:fn=>fn(),
  requestAnimationFrame:fn=>{frames.set(++nextFrame,fn);return nextFrame;},cancelAnimationFrame:id=>frames.delete(id),
  CustomEvent:class extends Event{constructor(type,{detail}={}){super(type);this.detail=detail;}},
  svg:add,drawGem:(parent,id,size)=>add(parent,'g',{'data-gem-art':id,transform:`scale(${size})`}),
  ...geometry,...model,pieces:pieces.pieces,gemLanding,gemDropFrames};
 context.revealTreasure=(habitat,id,node,x=0,y=0,options={})=>{if(habitat.dataset.treasureId===id&&habitat.dataset.treasureState==='hidden')fire(habitat,'treasure-reveal',{id,node,x,y,...options});};
 vm.createContext(context);
 let huntCode=fs.readFileSync(path.join(__dirname,'../game-of-worms/treasure-hunt.js'),'utf8').replace(/^import .*\r?\n/gm,'').replace(/\bexport /g,'');
 // Expose the existing confirmation renderer, rather than bypass its click callback.
 huntCode=huntCode.replace('return{mount,telescope};','return{mount,telescope,confirmRestart};');vm.runInContext(huntCode,context);
 const frame=()=>{now+=40;const pending=[...frames.values()];frames.clear();pending.forEach(fn=>fn(now));};
 const habitat=add(document.body,'div'),tube=add(habitat,'g',{'clip-path':'url(#tri-tube-contents-female)'});tube.screen=new Matrix(1,1,100,100);
 const lensFrame=add(habitat,'g',{'data-live-loupe':'female'}),lens=add(lensFrame,'svg');lens.screen=new Matrix(1,1,146,54);
 const hunt=context.createTreasureHunt(habitat);hunt.mount('nigoni','Trivandrum, Kerala · JU1325');
 let clue=habitat.querySelector('[data-treasure-clue="india"]');assert.equal(clue.parent,tube);assert.equal(clue.getAttribute('transform'),'translate(96 4)');
 assert.equal(clue.querySelector('[data-gem-art]').getAttribute('transform'),'scale(0.4)');
 // Its source is at (196,104), precisely the centre of this optical window.
 frame();assert.equal(habitat.dataset.treasureState,'revealed');
 let hit=habitat.querySelector('[data-treasure-gem="india"]');assert(hit);assert.equal(hit.querySelector('svg'),null,'No floating duplicate on top of the glass');
 const at=()=>({x:parseFloat(hit.style.left)*6,y:parseFloat(hit.style.top)*4.3});assert(Math.abs(at().x-196)<1e-8);
 // Off-centre magnification follows the rendered optical image, not the source.
 lens.screen=new Matrix(1,1,136,54);frame();assert(Math.abs(at().x-206)<1e-8);
 // With no visible lens, the same transparent target follows only the tube.
 lensFrame.setAttribute('hidden','');tube.screen=new Matrix(1.5,1.5,120,90);frame();assert(Math.abs(at().x-264)<1e-8);assert(Math.abs(at().y-96)<1e-8);
 tube.setAttribute('hidden','');frame();assert(hit.hidden);tube.removeAttribute('hidden');frame();assert(!hit.hidden);
 hunt.mount('nigoni','Trivandrum, Kerala · JU1325');hit=habitat.querySelector('[data-treasure-gem="india"]');assert(hit&&!hit.querySelector('svg'),'Revisit preserves in-tube artwork without duplicate');
 hit.dispatchEvent(new Event('click'));assert.equal(habitat.dataset.treasureState,'collected');assert.equal(habitat.querySelector('[data-treasure-clue="india"]'),null);
 hunt.mount('nigoni','Trivandrum, Kerala · JU1325');assert.equal(habitat.querySelector('[data-treasure-clue="india"]'),null,'Collected gems stay absent after re-entry');

 // Reuse the real Mauritius restart listener and cancellation closure. Seed only
 // an already-active harvest, whose rendering was covered by scene tests.
 const root=add(habitat,'g',{id:'worm-species'}),grabbers=[],baskets=[];
 for(const part of['primary','companion']){
  const piece=add(habitat,'g',{'class':'accessory-piece','data-accessory-family':'mauritius-dodo-beak-fruit-grabber','data-worm-part':part,style:'--accessory-user-x:37px;scale:.8',transform:'translate(8 9)'});piece.dataset.mauritiusCollected='5';grabbers.push(piece);
  const basket=add(habitat,'g',{'data-basket-fruits':'',hidden:''});for(let i=0;i<5;i++)add(basket,'g',{'data-fruit-slot':i});baskets.push(basket);
 }
 context.window.matchMedia=()=>({matches:false,addEventListener(){}});context.basketSlot=()=>({r:20});context.drawFruit=parent=>add(parent,'path',{d:'M0 0L1 1'});
 let playCode=fs.readFileSync(path.join(__dirname,'../game-of-worms/mauritius-play.js'),'utf8').replace(/^import .*\r?\n/gm,'').replace(/\bexport /g,'').replaceAll('import.meta.url',"'https://example.test/mauritius-play.js'");
 playCode=playCode.replace('return {handles,start,cancel,resetGround,','return {seed(action){active=action;raf=requestAnimationFrame(()=>{});},handles,start,cancel,resetGround,');vm.runInContext(playCode,context);
 const play=context.createMauritiusPlay(habitat,()=>{}),before=grabbers.map(p=>JSON.stringify(p.attrs));let resumed=0,stopped=0;
 const harvest=()=>{const effects=add(root,'g',{'data-mauritius-effects':''}),fruit=add(root,'g',{visibility:'hidden'});grabbers[0].dataset.mauritiusAction='gather';play.seed({piece:grabbers[0],effects,saved:[[fruit,'visibility','visible']],paused:[{playState:'paused',play(){resumed++;}}],voices:new Set([{stop(){stopped++;}}])});return {effects,fruit};};
 hunt.mount('nigoni','Mauritius · JU2909');const active=harvest();
 const dialog=document.body.querySelector('#treasure-dialog');add(dialog,'button',{class:'treasure-restart'});hunt.confirmRestart();
 const confirmation=dialog.querySelector('.treasure-restart-confirmation');confirmation.querySelectorAll('button').find(n=>n.textContent==='Restart gem hunt').dispatchEvent(new Event('click'));
 assert(!play.active);assert(!active.effects.isConnected);assert.equal(active.fruit.getAttribute('visibility'),'visible');assert.equal(resumed,1);assert.equal(stopped,1);
 assert.equal(root.querySelectorAll('[data-ground-part]').length,10);assert(baskets.every(b=>b.children.length===0));assert(grabbers.every(p=>p.dataset.mauritiusCollected===undefined));
 assert.deepEqual(grabbers.map(p=>JSON.stringify(p.attrs)),before,'Restart preserves all saved accessory placement and size attributes');
 assert(baskets.every(b=>'hidden' in b.attrs),'Hidden accessory selections remain hidden');
 // Another tab restarts during a later harvest. Same path must clean up once
 // and recreate exactly five ground fruits per worm, never append duplicates.
 harvest();const previous=JSON.parse(stored.get(model.SAVE_KEY)),next=model.restartHunt(previous);stored.set(model.SAVE_KEY,JSON.stringify(next));
 const event=new Event('storage');event.key=model.SAVE_KEY;event.newValue=JSON.stringify(next);window.dispatchEvent(event);
 assert(!play.active);assert.equal(root.querySelectorAll('[data-ground-part]').length,10);assert.equal(resumed,2);assert.equal(stopped,2);
 window.dispatchEvent(event);assert.equal(root.querySelectorAll('[data-ground-part]').length,10);assert.equal(resumed,2);
 assert.deepEqual(grabbers.map(p=>JSON.stringify(p.attrs)),before);
 console.log('PASS: India optical target, tube scaling/hiding/re-entry/collection; local and cross-tab Mauritius restart, active cleanup, refill, no duplicates, saved adjustments.');
})().catch(e=>{console.error(e);process.exitCode=1;});
