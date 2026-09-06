const assert = require('node:assert/strict');
const {pathToFileURL} = require('node:url');
const path = require('node:path');
class Element {
  constructor(tag) { this.tag=tag; this.attributes={}; this.children=[]; this.dataset={}; }
  setAttribute(k,v) { this.attributes[k]=String(v); }
  appendChild(n) { this.children.push(n); return n; }
}
global.document={createElementNS:(_,tag)=>new Element(tag)};
const walk=n=>[n,...n.children.flatMap(walk)];
(async()=>{
  const {drawTrivandrumRefinement:draw}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/trivandrum-refinement.js')));
  for(const family of ['trivandrum-field-loupe','trivandrum-garden-watering-can','trivandrum-sample-tube']) {
    const pair=[false,true].map(male=>{
      const g=new Element('g');
      assert(draw(g,{id:'nigoni::Trivandrum, Kerala · JU1325::headwear',family},male));
      const nodes=walk(g), shapes=nodes.filter(n=>['path','ellipse'].includes(n.tag));
      assert(shapes.length>=10);
      for(const n of shapes) {
        assert(n.attributes.fill); assert(n.attributes.stroke);
        assert(!Object.values(n.attributes).some(v=>/NaN|undefined|Infinity/.test(v)));
        if(n.tag==='path') assert(!/[^MmZzLlHhVvCcSsQqTtAaEe0-9.,+\s-]/.test(n.attributes.d));
      }
      if(family==='trivandrum-sample-tube') {
        assert(nodes.some(n=>n.attributes.id===`tri-tube-contents-${male?'male':'female'}`));
        assert(nodes.some(n=>n.attributes['clip-path']===`url(#tri-tube-contents-${male?'male':'female'})`));
        assert.equal(nodes.find(n=>n.tag==='text').textContent,'14 DAYS');
      }
      if(family==='trivandrum-field-loupe') {
        assert(nodes.some(n=>n.attributes['fill-opacity']==='.3'||n.attributes['fill-opacity']==='0.3'));
        assert(nodes.filter(n=>n.tag==='ellipse'&&n.attributes.fill==='none').length>=2);
      }
      return shapes.map(n=>n.attributes);
    });
    assert.notDeepEqual(pair[0],pair[1],`${family}: separately constructed pair`);
  }
  assert.equal(draw(new Element('g'),{id:'nigoni::Praslin::headwear',family:'trivandrum-field-loupe'},false),false);
  console.log('Trivandrum: six distinct props, explicit paint, transparent lenses, contained specimens and scoped dispatch.');
})().catch(e=>{console.error(e);process.exitCode=1});
