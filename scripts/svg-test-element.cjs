// Small SVG tree for structural catalogue checks in Node.
const walk = node => [node, ...node.children.flatMap(walk)];

class Element {
  constructor(tag) {
    this.tag = this.nodeName = tag;
    this.attributes = {};
    this.children = [];
    this.dataset = {};
    this.style = { setProperty(name, value) { this[name] = value; } };
    Object.defineProperty(this, 'parentNode', {value: null, writable: true});
    this.classList = {
      contains: name => (this.attributes.class || '').split(/\s+/).includes(name),
      add: (...names) => {
        const classes = (this.attributes.class || '').split(/\s+/).filter(Boolean);
        this.setAttribute('class', [...new Set([...classes, ...names])].join(' '));
      }
    };
  }
  setAttribute(name, value) { this.attributes[name] = String(value); }
  getAttribute(name) { return this.attributes[name] ?? null; }
  appendChild(child) {
    if (child.parentNode) {
      const siblings = child.parentNode.children;
      siblings.splice(siblings.indexOf(child), 1);
    }
    this.children.push(child);
    child.parentNode = this;
    return child;
  }
  append(...nodes) { nodes.forEach(node => this.appendChild(node)); }
  replaceChildren(...nodes) {
    this.children.forEach(child => { child.parentNode = null; });
    this.children = [];
    this.append(...nodes);
  }
  querySelectorAll(selector) {
    const descendants = walk(this).slice(1);
    if (/^\.[\w-]+$/.test(selector)) return descendants.filter(n => n.classList.contains(selector.slice(1)));
    if (/^\[[\w-]+\]$/.test(selector)) return descendants.filter(n => Object.hasOwn(n.attributes, selector.slice(1, -1)));
    if (/^[\w-]+$/.test(selector)) return descendants.filter(n => n.tag === selector);
    throw Error('Unsupported SVG test selector: ' + selector);
  }
  querySelector(selector) { return this.querySelectorAll(selector)[0] ?? null; }
}
module.exports = {Element, walk};
