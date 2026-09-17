const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');const path=require('node:path');
(async()=>{
 const {sunscreenFrame}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/mahahual-play.js')));
 const {angleDelta,umbrellaHeadroom}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/mahahual-pivot.js')));
 assert.equal(umbrellaHeadroom(300),36);assert.equal(umbrellaHeadroom(600),40);
 assert.equal(angleDelta(-179,179),2,'Pivot crosses angle boundary without jumping');
 assert.equal(angleDelta(179,-179),-2);
 assert.equal(angleDelta(10,10),0);
 let prev=sunscreenFrame(0);const reached=[false,false],creamed=[false,false];
 for(let ms=10;ms<=11400;ms+=10){const f=sunscreenFrame(ms);for(const key of ['approach','reach','squeeze','rub','cream','finish'])assert(f[key]>=0&&f[key]<=1,key+' bounded');
  assert(Math.abs(f.approach-prev.approach)<.02,'Smooth arrival and departure');assert(Math.abs(f.reach-prev.reach)<.025,'No hand jump when roles swap');assert(Math.abs(f.cream-prev.cream)<.045,'Cream fades continuously');
  reached[f.turn] ||= f.reach>.99;creamed[f.turn] ||= f.cream>.99;prev=f;
 }
 assert(reached.every(Boolean)&&creamed.every(Boolean),'Both partners apply sunscreen');
 assert(sunscreenFrame(11300).done);assert.equal(prev.approach+prev.reach+prev.cream,0,'No leftover movement or cream');
 const quiet=sunscreenFrame(250,true);assert(quiet.done);assert.equal(quiet.approach+quiet.reach+quiet.cream,0);
 // Regression: missing SVG coordinate separators previously removed both poles.
 const nodes=[];
 global.document={createElementNS:(_,tag)=>{const n={tag,attrs:{},children:[],classList:{add(){}},setAttribute(k,v){this.attrs[k]=String(v);},appendChild(c){this.children.push(c);return c;}};nodes.push(n);return n;}};
 const {drawMahahualBeach}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/mahahual-art.js')));
 for(const [family,male,segment]of [
  ['mahahual-reef-ruffle-swim-costumes',false,'top'],
  ['mahahual-reef-ruffle-swim-costumes',false,'bottom'],
  ['mahahual-reef-ruffle-swim-costumes',true,'bottom'],
  ['mahahual-reef-ruffle-swim-costumes',false,'sunscreen'],
  ['mahahual-sea-grape-beach-parasols',false],
  ['mahahual-sea-grape-beach-parasols',true]
 ])drawMahahualBeach(document.createElementNS('', 'g'),{family,segment},male);
 const arity={m:2,l:2,h:1,v:1,c:6,s:4,q:4,t:2,a:7,z:0};
 for(const n of nodes.filter(n=>n.tag==='path')){
  for(const [,command,args]of n.attrs.d.matchAll(/([MmLlHhVvCcSsQqTtAaZz])([^MmLlHhVvCcSsQqTtAaZz]*)/g)){
   const count=(args.match(/[-+]?(?:\d*\.\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?/g)||[]).length,unit=arity[command.toLowerCase()];
   assert(unit?count>=unit&&count%unit===0:count===0,`Malformed ${command} in ${n.attrs.d}`);
  }
 }
 console.log('Mahahual: both roles, smooth handover, bounded squeeze/rub/cream, clean finish, reduced motion and all revised SVG path coordinates pass.');
})().catch(e=>{console.error(e);process.exitCode=1;});
