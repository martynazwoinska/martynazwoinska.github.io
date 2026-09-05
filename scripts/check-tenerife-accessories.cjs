// Structural regression check. Visual approval remains a separate browser gate.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
class Element {
  constructor(tag) { this.tag = tag; this.attrs = {}; this.children = []; this.classList = { add() {} }; }
  setAttribute(key, value) { this.attrs[key] = String(value); }
  appendChild(node) { this.children.push(node); }
}
global.document = { createElementNS: (_, tag) => new Element(tag) };
const walk = node => [node, ...node.children.flatMap(walk)];
(async () => {
  const root = path.join(__dirname, "..", "game-of-worms");
  const source = fs.readFileSync(path.join(root, "tenerife-accessories.js"), "utf8");
  const { drawTenerifeRefinement } = await import("data:text/javascript;base64," + Buffer.from(source).toString("base64"));
  const families = ["tenerife-atlantic-canary-costume", "tenerife-timple-guitar", "tenerife-avocado-snack-bowl"];
  for (const family of families) {
    const pair = [];
    for (const small of [false, true]) {
      const group = new Element("g");
      assert(drawTenerifeRefinement(group, { family }, small));
      const nodes = walk(group), ids = nodes.map(n => n.attrs.id).filter(Boolean);
      assert.equal(ids.length, new Set(ids).size);
      for (const node of nodes) for (const value of Object.values(node.attrs)) {
        assert(!/NaN|undefined|Infinity/.test(value));
        for (const match of value.matchAll(/url\(#([^)]*)\)/g)) assert(ids.includes(match[1]));
      }
      // Compare construction coordinates, without colour, scale or wrapper transforms.
      pair.push(JSON.stringify(nodes.map(n => [n.tag, n.attrs.d, n.attrs.x, n.attrs.y, n.attrs.cx, n.attrs.cy, n.attrs.rx, n.attrs.ry])));
      if (family === "tenerife-timple-guitar") {
        assert.equal(nodes.filter(n => n.tag === "ellipse" && ["-20", "26"].includes(n.attrs.cx)).length, 5);
      }
    }
    assert.notEqual(pair[0], pair[1], family + " pair must use different geometry");
  }
  assert.equal(drawTenerifeRefinement(new Element("g"), {family: "other"}, false), false);
  const dispatch = fs.readFileSync(path.join(root, "accessory-designs.js"), "utf8");
  assert(dispatch.includes("if (drawTenerifeRefinement(group, item, companion)) return true"));
  assert(!dispatch.includes("tenerife-teide-star-lantern"));
  console.log("Tenerife: 3 distinct pairs, 5 pegs per timple, valid SVG references and retired lantern dispatch.");
})().catch(error => { console.error(error); process.exitCode = 1; });
