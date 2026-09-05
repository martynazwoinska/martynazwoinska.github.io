// Run with Node. No browser or external dependencies are required.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const css = fs.readFileSync(path.join(root, 'game-of-worms/style.css'), 'utf8');
const renderer = fs.readFileSync(path.join(root, 'game-of-worms/accessory-designs.js'), 'utf8');
const palette = css.match(/\.ahmedabad-af16-accessory\s*\{([^}]+)\}/)?.[1];
assert(palette, 'Ahmedabad must define its palette on its own accessory group');
assert(renderer.includes('group.classList.add("ahmedabad-af16-accessory"'), 'Renderer must carry its palette class');
const used = [...new Set([...css.matchAll(/var\((--af16-[\w-]+)/g)].map(m => m[1]))];
assert(used.length >= 8, 'Expected the complete Ahmedabad palette');
for (const name of used) {
  assert(new RegExp(name + ':\\s*#[0-9a-fA-F]{6}\\s*;').test(palette), `Missing explicit Ahmedabad colour: ${name}`);
}
console.log(`Ahmedabad palette: all ${used.length} colour definitions are present on the renderer`);
