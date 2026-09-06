const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
const fs=require('node:fs');
class Element {
  constructor(tag){this.tag=tag;this.attrs={};this.children=[];this.classes=[];this.classList={add:(...values)=>this.classes.push(...values)};}
  setAttribute(k,v){this.attrs[k]=String(v);}
  appendChild(n){this.children.push(n);return n;}
}
global.document={createElementNS:(_,tag)=>new Element(tag)};
const walk=n=>[n,...n.children.flatMap(walk)];
(async()=>{
  const {drawFlyingCockatoos:draw}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/canberra-cockatoos.js')));
  const pair=[false,true].map(male=>{
    const g=new Element('g');
    assert(draw(g,{family:'oconnor-cockatoo-cafe-raid'},male));
    const nodes=walk(g),bird=nodes.find(n=>n.attrs.class==='cockatoo-flight-bird');
    assert(bird);assert.equal(walk(bird).filter(n=>n.attrs.class?.includes('cockatoo-flight-wing')).length,2);
    assert.equal(g.children.length,1,'No stationary tray or bowl under bird');
    assert(nodes.some(n=>Object.hasOwn(n.attrs,'data-cafe-beak')),'Beak anchor for real biscuit pickup');
    assert.equal(nodes.filter(n=>Object.hasOwn(n.attrs,'data-cafe-beak')).length,1);
    for(const n of nodes) {
      assert(!Object.values(n.attrs).some(v=>/NaN|Infinity|undefined/.test(v)));
      if(n.tag==='path'){
        assert(n.attrs.fill&&n.attrs.stroke);
        assert(!/[^MmZzLlHhVvCcSsQqTtAaEe0-9.,+\s-]/.test(n.attrs.d));
      }
    }
    return nodes.map(n=>n.attrs);
  });
  assert.notDeepEqual(pair[0],pair[1]);
  assert.equal(draw(new Element('g'),{family:'canberra-flat-white-cafe'},false),false);
  const css=fs.readFileSync(path.join(__dirname,'../game-of-worms/style.css'),'utf8');
  assert(css.includes('.is-raiding .cockatoo-flight-wing.near'));
  assert(css.includes('cockatoo-near-beat .48s ease-in-out 10 both'));
  assert(css.includes('.is-raiding .cockatoo-flight-wing { animation: none; }'));
  assert(css.includes('.accessory-piece.is-dragging .cockatoo-flight-wing { animation-play-state: paused; }'));
  console.log('Cockatoos: distinct flying birds, layered wings, no bases or pre-drawn loot, beak anchors, finite motion and reduced-motion fallback.');
})().catch(e=>{console.error(e);process.exitCode=1;});
