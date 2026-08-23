// Rockman et al. (2025 preprint), File S2: 70-species tree inferred from 2,955 genes.
const publishedTree = "(HPT10:0.0495103109,((((((((((HPT35:0.0093985357,HPT43:0.0104055943)1:0.0016520895,tribulationis:0.0122101713)1:0.0059699379,(HPT5:0.0070168963,sp41:0.0083462369)1:0.0084910665)1:0.0079359672,zanzibari:0.0192165669)1:0.0032916367,(HPT50:0.0236936152,sinica:0.0239019341)0.95:0.0025577783)1:0.0153050530,(briggsae:0.0074238045,nigoni:0.0049930057)1:0.0316503334)1:0.0127565000,((latens:0.0084472514,remanei:0.0050803620)1:0.0084309336,sp33:0.0147042246)1:0.0252357907)1:0.0080679290,((((QG4628:0.0418879774,(kamaaina:0.0117234114,oiwi:0.0120913356)1:0.0373368263)1:0.0160741821,((((((((QG4644:0.0085045488,QG4848:0.0089868791)1:0.0029198081,imperialis:0.0114918817)1:0.0034417231,QG4797:0.0113341994)1:0.0199703763,(sp25:0.0274834149,sp49:0.0273469495)1:0.0118858024)1:0.0270369534,japonica:0.0680398352)1:0.0063817007,QG4708:0.0692810693)1:0.0154584698,((((afra:0.0328399627,sulstoni:0.0251542432)1:0.0444152247,niphades:0.0643602049)1:0.0060874939,((((becei:0.0099738511,nouraguensis:0.0124594150)1:0.0114219958,yunquensis:0.0200725503)1:0.0134126760,(panamensis:0.0326618503,waitukubuli:0.0347795283)1:0.0095763627)1:0.0102384690,macrosperma:0.0387033479)1:0.0239572536)1:0.0035783900,sp67:0.0749673703)1:0.0037708870)1:0.0057344402,((((((((agridulce:0.0049360678,sp56:0.0050055620)1:0.0102752388,sp8:0.0175374175)1:0.0347981024,(dolens:0.0133373060,quiockensis:0.0133848146)1:0.0191814913)1:0.0259704602,(angaria:0.0133337131,castelli:0.0106255376)1:0.0565998890)1:0.1018293030,((((drosophilae:0.0205691597,sp2:0.0151071918)1:0.0729463824,sp30:0.0843282936)1:0.0572419339,virilis:0.1261875271)1:0.0203949080,((portoensis:0.0371738708,vivipara:0.0288092895)1:0.0329973096,sp27:0.0725218587)1:0.0620270872)1:0.0066817938)1:0.0053575730,(((((auricularia:0.1710756407,monodelphis:0.1803107109)1:0.0573150287,krikudae:0.1714448323)1:0.0383562519,parvicauda:0.3342568750)1:0.0534586346,sp52:0.1409058746)1:0.0554412123,(bovis:0.1306274094,plicata:0.2098742996):0.0410399273)1:0.0266877839)1:0.0062955013,astrocarya:0.1551484112)0.47:0.0189409869,((guadeloupensis:0.0252782468,sp45:0.0200101575)1:0.0719185746,uteleia:0.1248264054)1:0.0280667892)1:0.0641763590)1:0.0137898200)1:0.0094621215,(elegans:0.0471703005,inopinata:0.0727138899)1:0.0075236415)1:0.0044635952,sp54:0.0345196812)1:0.0071721053)1:0.0103596309,((brenneri:0.0094602650,sp48:0.0088114859)1:0.0216324133,(sp44:0.0296369658,sp51:0.0249187567)1:0.0039738248)1:0.0137134397)1:0.0033863656,doughertyi:0.0369158168)0.95:0.0049331453,(tropicalis:0.0303912766,wallacei:0.0220682406)1:0.0139666011)1;";

const gameSpecies = new Set(["elegans", "inopinata", "briggsae", "nigoni", "tropicalis", "wallacei"]);
const selfingSpecies = new Set(["elegans", "briggsae", "tropicalis"]);
const displayNames = new Map([
  ["HPT10", "indonesiana"],
  ["HPT35", "malinoi"],
  ["HPT43", "ceno"],
  ["HPT50", "brawijaya"],
  ["HPT5", "ubi"],
  ["QG4628", "pwilidak"],
  ["QG4644", "ileile"],
  ["QG4848", "nansapw"],
  ["QG4797", "mwetiwel"],
  ["QG4708", "losolos"],
  ["auricularia", "auriculariae"]
]);
const svgNamespace = "http://www.w3.org/2000/svg";

function parseNewick(source) {
  let cursor = 0;

  function readToken() {
    const start = cursor;
    while (cursor < source.length && !",():;".includes(source[cursor])) cursor += 1;
    return source.slice(start, cursor).trim();
  }

  function readBranchLength() {
    if (source[cursor] !== ":") return;
    cursor += 1;
    readToken();
  }

  function readNode() {
    const node = { children: [] };
    if (source[cursor] === "(") {
      cursor += 1;
      do {
        node.children.push(readNode());
        if (source[cursor] === ",") cursor += 1;
      } while (source[cursor] !== ")" && cursor < source.length);
      cursor += 1;
      readToken();
    } else {
      node.name = readToken();
    }
    readBranchLength();
    return node;
  }

  return readNode();
}

function collectLeaves(node, leaves = []) {
  if (!node.children.length) leaves.push(node);
  node.children.forEach(child => collectLeaves(child, leaves));
  return leaves;
}

function rerootAtClade(root, tipNames) {
  const nodes = [];
  const parent = new Map();
  const visit = (node, parentNode = null) => {
    nodes.push(node);
    parent.set(node, parentNode);
    node.children.forEach(child => visit(child, node));
  };
  visit(root);

  const clade = nodes.find(node => {
    const names = collectLeaves(node, []).map(leaf => leaf.name);
    return names.length === tipNames.size && names.every(name => tipNames.has(name));
  });
  const outside = clade ? parent.get(clade) : null;
  if (!clade || !outside) return root;

  const neighbours = new Map(nodes.map(node => [node, new Set()]));
  nodes.forEach(node => node.children.forEach(child => {
    neighbours.get(node).add(child);
    neighbours.get(child).add(node);
  }));
  const cloneAwayFrom = (node, previous) => ({
    name: node.name,
    children: [...neighbours.get(node)]
      .filter(neighbour => neighbour !== previous)
      .map(neighbour => cloneAwayFrom(neighbour, node))
  });
  return { children: [cloneAwayFrom(clade, outside), cloneAwayFrom(outside, clade)] };
}

function createSvgElement(name, attributes = {}) {
  const element = document.createElementNS(svgNamespace, name);
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, String(value)));
  return element;
}

function maximumDepth(node, depth = 0) {
  if (!node.children.length) return depth;
  return Math.max(...node.children.map(child => maximumDepth(child, depth + 1)));
}

function findSmallestClade(node, tipNames) {
  for (const child of node.children) {
    const match = findSmallestClade(child, tipNames);
    if (match) return match;
  }
  const descendantNames = new Set(collectLeaves(node, []).map(leaf => leaf.name));
  return [...tipNames].every(name => descendantNames.has(name)) ? node : null;
}

function assignCoordinates(node, depth, maxDepth, leafRows) {
  const branchStart = 56;
  const branchEnd = 500;
  node.x = node.children.length ? branchStart + ((branchEnd - branchStart) * depth / maxDepth) : branchEnd;
  if (!node.children.length) {
    node.y = 22 + leafRows.get(node) * 22;
    return;
  }
  node.children.forEach(child => assignCoordinates(child, depth + 1, maxDepth, leafRows));
  node.y = node.children.reduce((sum, child) => sum + child.y, 0) / node.children.length;
}

function addGroupBracket(svg, clade, label) {
  if (!clade) return;
  const groupLeaves = collectLeaves(clade, []);
  const startY = Math.min(...groupLeaves.map(leaf => leaf.y)) - 9;
  const endY = Math.max(...groupLeaves.map(leaf => leaf.y)) + 9;
  const centreY = (startY + endY) / 2;
  const bracket = createSvgElement("path", {
    d: `M44 ${startY}H34V${endY}H44`,
    class: "phylogeny-group-bracket",
    "aria-hidden": "true"
  });
  const text = createSvgElement("text", {
    x: 17,
    y: centreY,
    class: "phylogeny-group-label",
    transform: `rotate(-90 17 ${centreY})`
  });
  text.textContent = label;
  svg.append(bracket, text);
}

function addBranches(node, group) {
  if (!node.children.length) return;
  const childY = node.children.map(child => child.y);
  group.append(createSvgElement("line", { x1: node.x, x2: node.x, y1: Math.min(...childY), y2: Math.max(...childY), class: "phylogeny-branch" }));
  node.children.forEach(child => {
    group.append(createSvgElement("line", { x1: node.x, x2: child.x, y1: child.y, y2: child.y, class: "phylogeny-branch" }));
    addBranches(child, group);
  });
}

function readableName(rawName) {
  if (displayNames.has(rawName)) return displayNames.get(rawName);
  const numberedSpecies = rawName.match(/^sp\.?\s?(\d+)$/i);
  return numberedSpecies ? `sp. ${numberedSpecies[1]}` : rawName;
}

function addTip(svg, leaf) {
  const isGameSpecies = gameSpecies.has(leaf.name);
  const isSelfer = selfingSpecies.has(leaf.name);

  if (isGameSpecies) {
    svg.append(createSvgElement("rect", {
      x: 488,
      y: leaf.y - 9,
      width: 342,
      height: 18,
      rx: 9,
      class: isSelfer ? "phylogeny-game-row phylogeny-game-row--selfing" : "phylogeny-game-row phylogeny-game-row--outcrossing"
    }));
  }

  svg.append(createSvgElement(isSelfer ? "circle" : "rect", isSelfer
    ? { cx: 500, cy: leaf.y, r: 4.5, class: "phylogeny-tip-marker phylogeny-tip-marker--selfing" }
    : { x: 496.5, y: leaf.y - 3.5, width: 7, height: 7, rx: 1.5, class: isGameSpecies ? "phylogeny-tip-marker phylogeny-tip-marker--outcrossing" : "phylogeny-tip-marker" }));

  const label = createSvgElement("text", { x: 512, y: leaf.y, class: `phylogeny-tip-label${isGameSpecies ? " phylogeny-tip-label--game" : ""}` });
  label.textContent = `C. ${readableName(leaf.name)}`;
  svg.append(label);

  if (isSelfer) {
    const origin = createSvgElement("text", { x: 686, y: leaf.y, class: "phylogeny-origin-label" });
    origin.textContent = "selfing arose here";
    svg.append(origin);
  }
}

export function renderCaenorhabditisTree(container) {
  if (!container || container.childElementCount) return;
  const parsedTree = parseNewick(publishedTree);
  const root = rerootAtClade(parsedTree, new Set(["auricularia", "monodelphis", "krikudae"]));
  const leaves = collectLeaves(root);
  const leafRows = new Map(leaves.map((leaf, index) => [leaf, index]));
  const height = 44 + leaves.length * 22;
  assignCoordinates(root, 0, maximumDepth(root), leafRows);

  const svg = createSvgElement("svg", {
    class: "caenorhabditis-tree-svg",
    viewBox: `0 0 850 ${height}`,
    width: 850,
    height,
    role: "img",
    "aria-label": "Family tree of 70 Caenorhabditis species. The Elegans group is marked. The six species in the game are highlighted. Caenorhabditis elegans, briggsae and tropicalis mark three separate origins of selfing."
  });
  const elegansGroup = findSmallestClade(root, new Set(["HPT10", "QG4628"]));
  addGroupBracket(svg, elegansGroup, "Elegans group");
  const branchGroup = createSvgElement("g", { "aria-hidden": "true" });
  addBranches(root, branchGroup);
  svg.append(branchGroup);
  leaves.forEach(leaf => addTip(svg, leaf));
  container.append(svg);
}
