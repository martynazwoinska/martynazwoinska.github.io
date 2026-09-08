const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '../game-of-worms');
const source = fs.readFileSync(path.join(root, 'game.js'), 'utf8');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const ids = ['local-headwear', 'local-wrap', 'local-charm', 'local-extra'];
for (const id of ids) {
  assert.match(html, new RegExp(`<g[^>]+id="${id}"[^>]+hidden`));
  assert.match(html, new RegExp(`<button[^>]+data-accessory="${id}"[^>]+aria-pressed="false"`));
}
assert.match(source, /const wardrobes = new Map\(\)/);
assert.match(source, /if \(!wardrobes.has\(key\)\) wardrobes.set\(key, new Set\(\)\)/);
assert.ok(!/localStorage|sessionStorage/.test(source), 'Accessory switches must not be restored from storage');
const reset = source.slice(source.indexOf('function resetVisitAccessoryVisibility()'), source.indexOf('function refreshAccessoryPieceControls()'));
const events = source.slice(source.lastIndexOf('document.addEventListener("visibilitychange"'), source.indexOf('\ntry {\n  drawMap();'));
const handlers = new Map();
const state = {
  wardrobes: new Map(), drawingModes: new Map(), drawingEnabled: false,
  selectedAccessorySizeTarget: null, activeAccessoryDrag: null, activeDoodle: null,
  accessoryPositions: new Map([['male', {x:15, y:30, scale:1.4}]]),
  drawings: new Map([['scene', ['M0 0L10 10']]]), visited: new Set(['elegans','briggsae']),
  document: {hidden:false, addEventListener:(name,fn)=>handlers.set(name,fn)},
  window: {addEventListener:(name,fn)=>handlers.set(name,fn)},
  modeSyncs:0, accessorySyncs:0, narrationStops:0, dragCancelled:false, doodleSaved:false
};
state.stopNarration = () => state.narrationStops++;
state.syncDrawingMode = () => {assert.equal(state.drawingEnabled,false); state.modeSyncs++;};
state.syncAccessories = () => {assert.equal(state.wardrobes.size,0); state.accessorySyncs++;};
state.finishAccessoryDrag = event => {
  assert.equal(event.type,'pointercancel'); assert.equal(event.pointerId,7);
  state.activeAccessoryDrag=null; state.dragCancelled=true;
};
state.saveActiveDoodle = () => {state.activeDoodle=null; state.doodleSaved=true;};
vm.runInNewContext(reset+'\n'+events,state);
const dress = () => {
  state.wardrobes.set('elegans::Bristol',new Set(ids));
  state.wardrobes.set('elegans::Araucanía',new Set(ids.slice(0,3)));
  state.wardrobes.set('briggsae::Ahmedabad',new Set(ids.slice(0,3)));
  state.drawingModes.set('elegans::Araucanía',true); state.drawingEnabled=true;
  state.selectedAccessorySizeTarget={id:ids[0],wormPart:'primary'};
};
dress(); handlers.get('pageshow')({persisted:false});
assert.equal(state.wardrobes.size,3,'An ordinary pageshow must not erase an in-progress visit');
state.document.hidden=true; handlers.get('visibilitychange')();
state.document.hidden=false; handlers.get('visibilitychange')();
assert.equal(state.wardrobes.size,3,'Changing tabs must preserve accessories');
state.activeAccessoryDrag={pointers:new Map([[7,{}]])}; state.activeDoodle={};
handlers.get('pagehide')();
assert.equal(state.wardrobes.size,0); assert.equal(state.drawingModes.size,0);
assert.equal(state.selectedAccessorySizeTarget,null); assert.ok(state.dragCancelled&&state.doodleSaved);
dress(); handlers.get('pageshow')({persisted:true});
assert.equal(state.wardrobes.size,0,'Back/Forward restoration must start undressed at every location');
assert.equal(state.drawingEnabled,false); assert.equal(state.drawingModes.size,0);
handlers.get('pageshow')({persisted:true});
assert.equal(state.modeSyncs,3); assert.equal(state.accessorySyncs,3);
assert.deepEqual(state.accessoryPositions.get('male'),{x:15,y:30,scale:1.4});
assert.equal(state.drawings.size,1); assert.equal(state.visited.size,2);
console.log('Accessory visits: initial HTML off, empty wardrobes, Back/Forward reset, tab-switch preservation and safe gesture cleanup pass.');
