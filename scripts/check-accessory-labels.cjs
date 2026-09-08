const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '../game-of-worms/accessory-designs.js'), 'utf8');
const context = {};
vm.runInNewContext(source.slice(0, source.indexOf('const catalogueByKey'))
  .replace(/^import .*$/gm, '').replace(/^export /gm, '')
  + '\nthis.catalogue = accessoryCatalogue; this.raw = rows; this.format = formatAccessoryLabel;', context);
const slots = ['headwear', 'wrap', 'charm', 'extra'];
const changes = [];
let count = 0;
context.catalogue.forEach((design, i) => {
  slots.forEach((slot, j) => {
    const item = design[slot];
    if (!item) return;
    count++;
    const raw = context.raw[i][2 + j * 2];
    assert.equal(item.label, raw.replace(/^\p{Ll}/u, c => c.toLocaleUpperCase('en')));
    assert.equal(item.label.slice(1), raw.slice(1), 'Preserve the rest of each label');
    assert.equal(item.id, `${design.speciesId}::${design.placeName}::${slot}`);
    assert.equal(item.family, context.raw[i][3 + j * 2]);
    assert.ok(!/^\p{Ll}/u.test(item.label));
    if (item.label !== raw) changes.push({place: design.placeName, before: raw, after: item.label});
  });
});
for (const name of ['18S DNA cards', 'ITS2 DNA cards', 'Ficus fruit transformations', 'São Tomé chocolate bars']) assert.equal(context.format(name), name);
assert.equal(context.format('fig UV visors'), 'Fig UV visors');
assert.equal(context.format(''), '');
assert.match(source, /piece\.dataset\.pieceLabel = formatAccessoryLabel\(piece\.dataset\.pieceLabel\)/);
const pieceLabels = [...source.matchAll(/piece\.dataset\.pieceLabel = ([^;]+);/g)]
  .flatMap(m => [...m[1].matchAll(/"([^"]+)"/g)].map(v => v[1]));
for (const name of pieceLabels) assert.ok(!/^\p{Ll}/u.test(context.format(name)));
if (process.argv.includes('--review')) console.log(JSON.stringify({count,changes,pieces:pieceLabels.map(before=>({before,after:context.format(before)}))}));
else console.log(`${count} accessory labels checked, ${changes.length} normalized. IDs, family keys, proper names and abbreviations preserved. ${pieceLabels.length} paired labels checked.`);
