const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
class Element {
  constructor(tag){this.tag=tag;this.children=[];this.attributes={};this.dataset={};}
  setAttribute(k,v){this.attributes[k]=String(v);}
  appendChild(n){this.children.push(n);return n;}
}
global.document={createElementNS:(_,tag)=>new Element(tag)};
const walk=n=>[n,...n.children.flatMap(walk)];
(async()=>{
  const {drawPanamaRefinement:draw}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/panama-refinement.js')));
  const {closedPetalPath}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/panama-play.js')));
  const ids=[];
  for(const family of ['qg2726-gustavia-flower-headpiece','qg2726-flower-bait','qg2726-leaf-cutting']){
    const pair=[false,true].map(male=>{
      const g=new Element('g');assert(draw(g,{id:'tropicalis::Barro Colorado Island, Panama::wrap',family},male));
      const nodes=walk(g), shapes=nodes.filter(n=>['path','ellipse'].includes(n.tag));
      assert(shapes.length>=12,'Complete construction without padding the leaf with decorative marks');
      for(const n of shapes){
        assert(n.attributes.fill);assert(n.attributes.stroke);
        assert(!Object.values(n.attributes).some(v=>/NaN|Infinity|undefined/.test(v)));
        if(n.tag==='path')assert(!/[^MmZzLlHhVvCcSsQqTtAaEe0-9.,+\s-]/.test(n.attributes.d));
      }
      for(const n of nodes){
        if(n.attributes.id)ids.push(n.attributes.id);
        const ref=n.attributes['clip-path'];
        if(ref)assert(nodes.some(c=>ref===`url(#${c.attributes.id})`));
      }
      if(family==='qg2726-leaf-cutting')assert(nodes.some(n=>n.attributes[male?'data-panama-leaf':'data-panama-scissors']!==undefined));
      if(male&&family==='qg2726-gustavia-flower-headpiece'){
        const petals=nodes.filter(n=>n.attributes['data-panama-closed-petal']);
        assert.equal(petals.length,4);
        for(const n of petals){
          const open=n.attributes.d,closed=n.attributes['data-panama-closed-petal'];
          assert.equal(open.replace(/[-\d.\s]/g,''),closed.replace(/[-\d.\s]/g,''),'Identical path commands for smooth closing');
          assert.equal(open.match(/-?\d*\.?\d+/g).length,closed.match(/-?\d*\.?\d+/g).length);
          assert.equal(closedPetalPath(open,closed,0),open);
          assert.equal(closedPetalPath(open,closed,1),closed);
          for(let t=0;t<=1;t+=.05)assert(!/NaN|Infinity|undefined/.test(closedPetalPath(open,closed,t)));
        }
        assert(nodes.some(n=>n.attributes['data-panama-stamens']!==undefined));
      }
      return nodes.map(n=>n.attributes);
    });
    assert.notDeepEqual(pair[0],pair[1]);
  }
  assert.equal(new Set(ids).size,ids.length,'No duplicate clip identifiers');
  assert.equal(draw(new Element('g'),{id:'tropicalis::Oahu::wrap',family:'qg2726-golden-fleece-cape'},false),false);
  console.log('Panama: six distinct drawings, contained glass, separate scissors and leaf, explicit paint, scoped dispatch and valid geometry.');
})().catch(e=>{console.error(e);process.exitCode=1});
