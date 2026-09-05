// Run with Node. No browser or external dependencies required.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..', 'game-of-worms');
class Element {
  constructor(tag) { this.tag = tag; this.attrs = {}; this.children = []; this.dataset = {}; this.classList = {add(){}}; }
  setAttribute(k,v) { this.attrs[k] = String(v); }
  appendChild(n) { this.children.push(n); }
}
global.document = {createElementNS: (_,tag) => new Element(tag)};
const walk = n => [n,...n.children.flatMap(walk)];
(async()=>{
  const source = fs.readFileSync(path.join(root,'accessory-refinements.js'),'utf8');
  const {drawRefinedAccessory,refinedLayouts} = await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
  assert.equal(Object.keys(refinedLayouts).length,18);
  const dispatch = fs.readFileSync(path.join(root,'accessory-designs.js'),'utf8');
  assert.match(dispatch,/function drawNamedAccessory\(group, item, companion\)\s*\{\s*if \(drawRefinedAccessory\(group, item, companion\)\) return true/);
  for(const family of Object.keys(refinedLayouts)){
    const signatures=[];
    for(const small of [false,true]){
      const group = new Element('g');
      assert(drawRefinedAccessory(group,{family},small));
      const nodes=walk(group),ids=nodes.filter(n=>n.attrs.id).map(n=>n.attrs.id);
      assert.equal(new Set(ids).size,ids.length,'Duplicate gradient IDs');
      for(const n of nodes)for(const value of Object.values(n.attrs)){
        assert(!/NaN|undefined|Infinity/.test(value),family+' invalid attribute');
        for(const m of value.matchAll(/url\(#([^)]*)\)/g))assert(ids.includes(m[1]),family+' missing paint definition');
      }
      const shapes=nodes.filter(n=>['path','rect','ellipse'].includes(n.tag));
      assert(shapes.length>0,family+' must render geometry');
      signatures.push(JSON.stringify(shapes.map(n=>({tag:n.tag,d:n.attrs.d,x:n.attrs.x,y:n.attrs.y,cx:n.attrs.cx,cy:n.attrs.cy,rx:n.attrs.rx,ry:n.attrs.ry}))));
    }
    assert.notEqual(signatures[0],signatures[1],family+' must have separate paired geometry');
  }
  assert.equal(drawRefinedAccessory(new Element('g'),{family:'not-a-refined-family'},false),false);
  console.log('18 refined families: 36 distinct pieces, dispatch and SVG paint references valid');
})().catch(e=>{console.error(e);process.exit(1)});
