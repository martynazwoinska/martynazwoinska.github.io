// Run with Node. No browser or external dependencies required.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..', 'game-of-worms');
const {pathToFileURL} = require('node:url');
const {Element, walk} = require('./svg-test-element.cjs');
global.document = {createElementNS: (_, tag) => new Element(tag)};
(async()=>{
  const source = fs.readFileSync(path.join(root,'accessory-refinements.js'),'utf8');
  const {drawRefinedAccessory,refinedLayouts} = await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
  assert.equal(Object.keys(refinedLayouts).length,18);
  const dispatch = fs.readFileSync(path.join(root,'accessory-designs.js'),'utf8');
  const drawNamed = dispatch.slice(dispatch.indexOf('function drawNamedAccessory('), dispatch.indexOf('\n}', dispatch.indexOf('function drawNamedAccessory(')));
  const specialized = drawNamed.indexOf('if (drawDoisRios(group, item, companion)) return true;');
  const fallback = drawNamed.indexOf('if (drawRefinedAccessory(group, item, companion)) return true;');
  assert(specialized >= 0 && specialized < fallback, 'Specialized Dois Rios drawing precedes the six-location fallback');
  const {accessoryCatalogue, renderLocationAccessories} = await import(pathToFileURL(path.join(root, 'accessory-designs.js')));
  const location = accessoryCatalogue.find(design => design.headwear.family === 'eg5612-sticky-jackfruit');
  const slots = ['headwear', 'wrap', 'charm'];
  const targets = Object.fromEntries(slots.map(slot => [slot, new Element('g')]));
  assert.equal(renderLocationAccessories(targets, location.speciesId, location.placeName), location);
  for (const slot of slots) {
    assert.deepEqual(targets[slot].querySelectorAll('[data-dois-rios-art]').map(n => n.getAttribute('data-dois-rios-art')),
      ['primary', 'companion'], 'The live catalogue dispatches both pieces to their specialized renderer');
  }
  for(const family of Object.keys(refinedLayouts)){
    const signatures=[];
    for(const small of [false,true]){
      const group = new Element('g');
      assert(drawRefinedAccessory(group,{family},small));
      const nodes=walk(group),ids=nodes.filter(n=>n.attributes.id).map(n=>n.attributes.id);
      assert.equal(new Set(ids).size,ids.length,'Duplicate gradient IDs');
      for(const n of nodes)for(const value of Object.values(n.attributes)){
        assert(!/NaN|undefined|Infinity/.test(value),family+' invalid attribute');
        for(const m of value.matchAll(/url\(#([^)]*)\)/g))assert(ids.includes(m[1]),family+' missing paint definition');
      }
      const shapes=nodes.filter(n=>['path','rect','ellipse'].includes(n.tag));
      assert(shapes.length>0,family+' must render geometry');
      signatures.push(JSON.stringify(shapes.map(n=>({tag:n.tag,d:n.attributes.d,x:n.attributes.x,y:n.attributes.y,cx:n.attributes.cx,cy:n.attributes.cy,rx:n.attributes.rx,ry:n.attributes.ry}))));
    }
    assert.notEqual(signatures[0],signatures[1],family+' must have separate paired geometry');
  }
  assert.equal(drawRefinedAccessory(new Element('g'),{family:'not-a-refined-family'},false),false);
  console.log('18 refined families: 36 distinct pieces, dispatch and SVG paint references valid');
})().catch(e=>{console.error(e);process.exit(1)});
