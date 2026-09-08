const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
class Element{constructor(tag){this.tag=tag;this.children=[];this.attributes={};}setAttribute(k,v){this.attributes[k]=String(v);}appendChild(n){this.children.push(n);return n;}}
global.document={createElementNS:(_,tag)=>new Element(tag)};
const walk=n=>[n,...n.children.flatMap(walk)];
const mod=n=>import(pathToFileURL(path.join(__dirname,'../game-of-worms/',n)));
(async()=>{
 const {drawDoisRios:draw,FRUIT,MUSIC,CLOTH,doisRiosLayouts}=await mod('dois-rios-art.js');
 const {fruitFrame,duetFrame}=await mod('dois-rios-play.js');
 const {makePluck,makeDrum,DUET_BEATS}=await mod('dois-rios-audio.js');
 const ids=[];
 for(const family of [FRUIT,MUSIC,CLOTH]){
  const pairs=[false,true].map(male=>{
   const g=new Element('g');assert(draw(g,{family},male));const nodes=walk(g);
   for(const n of nodes){
    assert(!Object.values(n.attributes).some(v=>/NaN|undefined|Infinity/.test(v)));
    if(n.tag==='path')assert(n.attributes.fill&&n.attributes.stroke);
    if(n.attributes.id)ids.push(n.attributes.id);
    if(n.attributes['clip-path'])assert(nodes.some(c=>`url(#${c.attributes.id})`===n.attributes['clip-path']));
   }
   assert(doisRiosLayouts[family][male?'companion':'primary'].every(Number.isFinite));
   if(family===FRUIT)assert(nodes.some(n=>'data-dr-fork' in n.attributes));
   if(family===MUSIC){assert(nodes.some(n=>'data-dr-instrument' in n.attributes));if(!male)assert.equal(nodes.find(n=>'data-dr-strings' in n.attributes).children.length,4);}
   return JSON.stringify(nodes.map(n=>n.attributes));
  });
  assert.notEqual(pairs[0],pairs[1],family+' is independently drawn');
 }
 assert.equal(ids.length,new Set(ids).size);
 assert.equal(draw(new Element('g'),{family:'unrelated'},false),false);
 for(const male of [false,true])for(const reduced of [false,true]){
  for(let ms=0;ms<=4300;ms+=20){
   const fruit=fruitFrame(ms,male,reduced),music=duetFrame(ms,male,reduced);
   for(const s of [fruit,music])assert(Object.values(s).every(v=>typeof v==='boolean'||Number.isFinite(v)));
   if(reduced){assert.equal(fruit.lift,0);assert.equal(fruit.lean,0);assert.equal(music.hit,0);}
  }
  assert(fruitFrame(3000,male).done);assert(duetFrame(4200,male).done);
 }
 assert(!fruitFrame(1100,true).release);assert(fruitFrame(1100,false).release);
 assert.equal(fruitFrame(1400,true).stretch,0);
 assert.equal(DUET_BEATS.length,12);
 for(const data of [makePluck(44100,392),makeDrum(44100),makeDrum(44100,true)]){
  assert(data.every(Number.isFinite));const peak=data.reduce((p,x)=>Math.max(p,Math.abs(x)),0);assert(peak>.05&&peak<1);
  const energy=(a,b)=>data.slice(a,b).reduce((s,x)=>s+x*x,0)/(b-a);
  assert(energy(0,4000)>energy(data.length-2000,data.length)*3,'Short decaying sound, not a sustained hiss');
 }
 console.log('Dois Rios: six distinct SVG drawings, four strings, scoped families, valid geometry, finite action frames, later male release, static reduced-motion state and bounded sound envelopes.');
})().catch(e=>{console.error(e);process.exitCode=1});
