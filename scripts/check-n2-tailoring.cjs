// Structural checks accompany the separate in-page visual and interaction review.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {pathToFileURL} = require('node:url');
class Element {
  constructor(tag) {
    this.nodeName = tag;
    this.attributes = {};
    this.children = [];
    this.dataset = {};
    this.style = {setProperty(k,v){this[k]=v;}};
    this.classList = {
      add: (...names) => { this.attributes.class = [...new Set([...(this.attributes.class || '').split(' ').filter(Boolean),...names])].join(' '); },
      contains: name => (this.attributes.class || '').split(' ').includes(name)
    };
  }
  setAttribute(k,v) { this.attributes[k] = String(v); }
  getAttribute(k) { return this.attributes[k] ?? null; }
  appendChild(n) { this.children.push(n); return n; }
  append(...nodes) { this.children.push(...nodes); }
  replaceChildren(...nodes) { this.children = nodes; }
  querySelector(selector) {
    assert(selector.startsWith('.'),'Mock supports class selectors only');
    return walk(this).slice(1).find(n=>n.classList.contains(selector.slice(1))) || null;
  }
}
global.document = {createElementNS:(_,tag)=>new Element(tag)};
const walk = n => [n,...n.children.flatMap(walk)];
(async()=>{
  const root=path.join(__dirname,'..','game-of-worms');
  const {renderLocationAccessories,auditAccessoryPairGeometry} =
    await import(pathToFileURL(path.join(root,'accessory-designs.js')));
  const targets=Object.fromEntries(['headwear','wrap','charm','extra'].map(k=>[k,new Element('g')]));
  renderLocationAccessories(targets,'elegans','Bristol N2, England');
  assert(Object.values(targets).every(g=>g.children.length===2),'Eight independently rendered objects');
  const pieces=Object.values(targets).flatMap(g=>g.children);
  const coats=pieces.filter(p=>p.querySelector('.n2-tailored-coat'));
  assert.equal(coats.length,2);
  const firstPath=p=>walk(p).find(n=>n.nodeName==='path').getAttribute('d');
  assert.notEqual(firstPath(coats[0]),firstPath(coats[1]));
  for(const coat of coats) assert(coat.querySelector('.fitted-headwear-motion'));
  const packs=pieces.filter(p=>p.querySelector('.n2-side-cryopack'));
  assert.equal(packs.length,2);
  for(const pack of packs) {
    assert(pack.querySelector('.cryo-rear-exhaust'),'Tail-directed exhaust');
    assert(pack.querySelector('.cryo-cap-top'),'Closed cryovial cap face');
    assert(pack.querySelector('.cryo-outlet-opening'),'Distinct rear outlet');
    assert(!pack.querySelector('.cryo-plume'),'No closed gas loops');
  }
  for(const coat of coats) assert(coat.querySelector('.n2-waist-tie'),'Tailored fastening');
  assert.notEqual(firstPath(packs[0]),firstPath(packs[1]),'Independently fitted harnesses');
  for(const pack of packs) assert(pack.querySelector('.fitted-headwear-motion'),'Pack follows its body');
  assert(packs[0].querySelector('.location-accessory-art').getAttribute('transform').includes('rotate(38)'));
  assert(packs[1].querySelector('.location-accessory-art').getAttribute('transform').includes('rotate(30)'));
  assert(packs[0].querySelector('.location-accessory-art').getAttribute('transform').includes('scale(0.740 0.740)'));
  assert(packs[1].querySelector('.location-accessory-art').getAttribute('transform').includes('scale(0.430 0.430)'));
  assert.equal(walk(packs[0]).filter(n=>n.classList.contains('cryo-side-vial')).length,2);
  assert.equal(walk(packs[1]).filter(n=>n.classList.contains('cryo-side-vial')).length,1);
  assert.equal(walk(packs[0]).filter(n=>n.classList.contains('cryo-outlet-opening')).length,2);
  for(const p of pieces) for(const n of walk(p)) {
    assert(!Object.values(n.attributes).some(v=>/NaN|undefined|Infinity/.test(v)));
    if(n.nodeName==='path') assert(!/[^MmZzLlHhVvCcSsQqTtAaEe0-9.,+\s-]/.test(n.getAttribute('d')));
  }
  const goggles=pieces.filter(p=>p.querySelector('.n2-lab-goggles'));
  assert.equal(goggles.length,2);
  assert(goggles[0].querySelector('.location-accessory-art').getAttribute('transform').includes('scale(0.680 0.680)'));
  assert(goggles[1].querySelector('.location-accessory-art').getAttribute('transform').includes('scale(0.380 0.380)'));
  assert(auditAccessoryPairGeometry().valid);
  console.log('N2: eight pieces, distinct body-fitted coats, reduced goggles, valid path data and full catalogue geometry.');
})().catch(e=>{console.error(e);process.exitCode=1});
