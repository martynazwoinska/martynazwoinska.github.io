const SVG_NS = "http://www.w3.org/2000/svg";

/*
 * One explicit wardrobe for every displayed collection record. The `family`
 * value is deliberately auditable: no semantic accessory family occurs more
 * than twice across the full catalogue. Each button reveals a coordinated but
 * non-identical pair, one drawing for each independently movable worm.
 */
const rows = [
  ["inopinata", "Ishigaki, Japan", "fig fascinator", "fig-fascinator", "sample pannier", "sample-pannier", "fig-wasp wings", "wings"],
  ["briggsae", "Ahmedabad, India · AF16", "shade visor", "shade-visor", "current-streamer wand", "current-streamer-wand", "soil sieve", "soil-sieve"],
  ["briggsae", "Taipei, Taiwan · BRC20390", "boulder spectacles", "boulder-spectacles", "fern fan", "fan", "tower fiddle", "bowed-strings"],
  ["briggsae", "Kerala, India · JU1337", "coconut cloche", "coconut-cloche", "irrigation flute", "flute-piccolo", "fruit-sampling tool", "fruit-sampling-tool"],
  ["briggsae", "Kauaʻi, Hawaiʻi · QG130", "pandanus glider", "glider", "waterfall lyre", "waterfall-lyre", "fruit capsule", "fruit-capsule"],
  ["briggsae", "Réunion Island · JU1375", "mollusk casque", "casque", "cane piccolo", "flute-piccolo", "basalt carousel", "basalt-carousel"],
  ["briggsae", "Orsay, France · JU2518", "pond-disc bonnet", "bonnet", "reed concertina", "bellows-instrument", "garden trug", "garden-trug"],
  ["briggsae", "Angra dos Reis, Rio de Janeiro · EG5612", "cove monocle", "monocle", "mangrove claws", "mangrove-claws", "island compass", "compass"],
  ["briggsae", "Nambucca Heads, New South Wales · QG2814", "banksia wig", "wig", "eucalyptus cape", "cape", "flower press", "flower-press"],
  ["elegans", "Bristol N2, England", "seeded NGM agar plates", "ngm-agar-plate", "fitted lab coats", "n2-lab-coat", "cryo-vial jetpacks", "cryo-vial-jetpack"],
  ["elegans", "Santeuil, France", "hollow-stem specimen lantern", "hogweed-specimen-lantern", "Santeuil cylinder organ", "santeuil-cylinder-organ", "Couleuvre dragonfly automaton", "couleuvre-dragonfly-automaton"],
  ["elegans", "Edinburgh, Scotland", "Midmar compost tumbler", "midmar-compost-tumbler", "GALAXY plate-scanner engine", "galaxy-plate-scanner", "Agassiz ice-flow model", "agassiz-ice-flow-model"],
  ["elegans", "Tenerife, Spain", "obsidian goggles", "obsidian-goggles", "broom plume", "broom-plume", "caldera glider", "glider"],
  ["elegans", "Kauaʻi, Hawaiʻi", "canyon crest", "canyon-crest", "waterfall scarf", "waterfall-scarf", "fern abseil reel", "fern-abseil-reel"],
  ["elegans", "Australian Capital Territory", "seedpod maracas", "seedpod-maracas", "quadrat shield", "quadrat-shield", "lake-reed snorkel", "snorkel"],
  ["elegans", "Auckland, New Zealand", "scoria bowler", "scoria-bowler", "harbour-sail wings", "wings", "pōhutukawa umbrella", "umbrella"],
  ["elegans", "Araucanía, Chile", "araucaria halo", "araucaria-halo", "volcano-lake diving bell", "volcano-lake-diving-bell", "snowline telescope", "telescope"],
  ["nigoni", "Trivandrum, Kerala · JU1325", "coconut rain hood", "coconut-rain-hood", "backwater skates", "skates", "sandbar tambourine", "sandbar-tambourine"],
  ["nigoni", "Singapore · ZF1220", "mangrove stilts", "stilts", "mudflat waders", "waders", "skyline fan", "fan"],
  ["nigoni", "Praslin, Seychelles · YR106", "granite casque", "casque", "palm bustle", "palm-bustle", "coco-de-mer hand drum", "coco-de-mer-drum"],
  ["nigoni", "São Tomé · JU2484", "volcanic-needle ruff", "volcanic-needle-ruff", "cacao ocarina", "cacao-ocarina", "waterfall pennant", "waterfall-pennant"],
  ["nigoni", "Mahahual, Mexico · JU2617", "reef mask", "reef-mask", "seagrass tail", "seagrass-tail", "lagoon saxophone", "lagoon-saxophone"],
  ["nigoni", "Mauritius · JU2909", "Le Morne pauldron", "le-morne-pauldron", "lagoon wind-vane", "lagoon-wind-vane", "cane ankle bells", "cane-ankle-bells"],
  ["nigoni", "Ho Chi Minh City · JU4356", "pneumatophore snowshoes", "pneumatophore-snowshoes", "salt-crystal jacket", "salt-crystal-jacket", "tidal waterwheel", "tidal-waterwheel"],
  ["nigoni", "Lombok, Indonesia · HPT26", "caldera headband", "caldera-headband", "crater-lake skirt", "skirt", "altimeter ukulele", "altimeter-ukulele"],
  ["wallacei", "Sanda, Bali · JU1873", "cacao cuirass", "cacao-cuirass", "terrace boots", "terrace-boots", "cacao-pod xylophone", "cacao-pod-xylophone"],
  ["tropicalis", "Barro Colorado Island, Panama", "research headphones", "research-headphones", "canal periscope", "canal-periscope", "canopy-camera rig", "canopy-camera-rig"],
  ["tropicalis", "La Selva, Costa Rica", "two-river yoke", "two-river-yoke", "transect telescope", "telescope", "station rain cape", "cape"],
  ["tropicalis", "Guadeloupe", "fumarole wig", "wig", "waterfall glass harmonica", "waterfall-glass-harmonica", "fern epaulettes", "fern-epaulettes"],
  ["tropicalis", "Nouragues, French Guiana", "inselberg compass", "compass", "canoe-paddle bow", "canoe-paddle-bow", "river gauge rod", "river-gauge-rod"],
  ["tropicalis", "Manaus region, Brazil", "confluence sunglasses", "sunglasses", "igapó stilts", "stilts", "river marimba", "river-marimba"],
  ["tropicalis", "Oʻahu, Hawaiʻi", "knife-ridge sunglasses", "sunglasses", "watershed swimwear", "watershed-swimwear", "waterfall umbrella", "umbrella"],
  ["tropicalis", "Kauaʻi, Hawaiʻi", "taro bonnet", "bonnet", "wetland waders", "waders", "paddy metronome", "paddy-metronome"],
  ["tropicalis", "New Taipei City, Taiwan", "hoodoo helmet", "hoodoo-helmet", "erosion crinoline", "erosion-crinoline", "cape fiddle", "bowed-strings"],
  ["tropicalis", "Pohnpei, Micronesia", "basalt cuffs", "basalt-cuffs", "lagoon snorkel", "snorkel", "basalt-log chimes", "basalt-log-chimes"],
  ["tropicalis", "Queensland, Australia", "fan-palm collar", "fan-palm-collar", "reef monocle", "monocle", "continuum skates", "skates"],
  ["tropicalis", "Réunion Island", "cirque hoop skirt", "skirt", "lava crampons", "lava-crampons", "ravine trumpet", "ravine-trumpet"]
];

const explicitUniqueRendererFamilies = new Set([
  "araucaria-halo",
  "basalt-cuffs",
  "boulder-spectacles",
  "broom-plume",
  "cacao-cuirass",
  "caldera-headband",
  "cane-ankle-bells",
  "canoe-paddle-bow",
  "canyon-crest",
  "coconut-cloche",
  "coconut-rain-hood",
  "erosion-crinoline",
  "fan-palm-collar",
  "fern-abseil-reel",
  "fern-epaulettes",
  "fig-fascinator",
  "fruit-sampling-tool",
  "hoodoo-helmet",
  "lagoon-wind-vane",
  "le-morne-pauldron",
  "obsidian-goggles",
  "paddy-metronome",
  "palm-bustle",
  "reef-mask",
  "research-headphones",
  "salt-crystal-jacket",
  "scoria-bowler",
  "seagrass-tail",
  "shade-visor",
  "terrace-boots",
  "two-river-yoke",
  "volcano-lake-diving-bell",
  "waterfall-scarf",
  "watershed-swimwear"
]);

const repeatedRendererFamilies = new Set([
  "bellows-instrument", "bonnet", "bowed-strings", "cape", "casque",
  "compass", "fan", "flute-piccolo", "glider", "monocle", "skates",
  "skirt", "snorkel", "stilts", "sunglasses", "telescope", "umbrella",
  "waders", "wig", "wings"
]);

const n2RendererFamilies = new Set(["ngm-agar-plate", "n2-lab-coat", "cryo-vial-jetpack"]);
const santeuilRendererFamilies = new Set(["hogweed-specimen-lantern", "santeuil-cylinder-organ", "couleuvre-dragonfly-automaton"]);
const edinburghRendererFamilies = new Set(["midmar-compost-tumbler", "galaxy-plate-scanner", "agassiz-ice-flow-model"]);
const instrumentRendererPattern = /fiddle|flute|piccolo|lyre|concertina|accordion|ocarina|saxophone|ukulele|drum|tambourine|marimba|xylophone|chimes|harmonica|trumpet|maracas/i;
const fieldToolRendererPattern = /sieve|dip net|sampler|pannier|trug|quadrat|telescope|periscope|snorkel|compass|press|gauge rod|camera rig/i;
const naturalRendererPattern = /wings|glider|fan|umbrella|stilts|skates|snowshoes|crampons|pennant|streamer wand|claws|waterwheel|carousel|fruit capsule/i;

function hasNamedRenderer(item) {
  return explicitUniqueRendererFamilies.has(item.family)
    || repeatedRendererFamilies.has(item.family)
    || n2RendererFamilies.has(item.family)
    || santeuilRendererFamilies.has(item.family)
    || edinburghRendererFamilies.has(item.family)
    || item.family === "volcanic-needle-ruff"
    || instrumentRendererPattern.test(item.label)
    || fieldToolRendererPattern.test(item.label)
    || naturalRendererPattern.test(item.label);
}

function artworkKind(label) {
  if (/coat|waistcoat|cape|waders|jacket|swimwear|skirt|cuirass|boots|pauldron|epaulettes|ruff|collar|diving bell|crinoline|scarf|tail/i.test(label)) return "garment";
  if (/visor|fascinator|spectacles|cloche|casque|bonnet|monocle|wig|agar plate|boater|ear-warmers|goggles|crest|bowler|halo|hood|mask|headband|helmet|headphones|sunglasses/i.test(label)) return "head";
  return "prop";
}

function artworkForm(label, kind) {
  if (kind === "head") {
    if (/spectacles|goggles|sunglasses/i.test(label)) return 12;
    if (/monocle|mask/i.test(label)) return 7;
    if (/fascinator/i.test(label)) return 1;
    if (/visor/i.test(label)) return 0;
    if (/cloche/i.test(label)) return 3;
    if (/casque|helmet/i.test(label)) return 5;
    if (/bonnet/i.test(label)) return 18;
    if (/wig/i.test(label)) return 16;
    if (/agar plate/i.test(label)) return 9;
    if (/boater|bowler/i.test(label)) return 13;
    if (/hood/i.test(label)) return 14;
    if (/ear-warmers|headphones/i.test(label)) return 8;
    if (/halo|headband/i.test(label)) return 4;
    return 17;
  }
  if (kind === "garment") {
    if (/lab coat/i.test(label)) return 9;
    if (/coat|jacket/i.test(label)) return 2;
    if (/waistcoat/i.test(label)) return 0;
    if (/cuirass/i.test(label)) return 4;
    if (/cape|pauldron|epaulettes|collar|ruff/i.test(label)) return 16;
    if (/waders|boots/i.test(label)) return 14;
    if (/skirt|crinoline|swimwear/i.test(label)) return 17;
    if (/scarf|tail/i.test(label)) return 1;
    return 13;
  }
  if (/wings/i.test(label)) return 0;
  if (/wand|pennant|gauge rod/i.test(label)) return 1;
  if (/pannier|trug|basket/i.test(label)) return 10;
  if (/fan/i.test(label)) return 4;
  if (/fiddle|flute|piccolo|lyre|concertina|accordion|ocarina|saxophone|ukulele|harmonica|trumpet/i.test(label)) return 11;
  if (/drum|tambourine|marimba|xylophone|chimes|bells/i.test(label)) return 3;
  if (/glider|umbrella/i.test(label)) return 4;
  if (/sieve|net|shield|press/i.test(label)) return 6;
  if (/compass/i.test(label)) return 7;
  if (/jetpack|waterwheel|camera rig/i.test(label)) return 9;
  if (/telescope|periscope|snorkel/i.test(label)) return 12;
  if (/skates|snowshoes|stilts|crampons/i.test(label)) return 13;
  if (/capsule|sampler|sampling tool|carousel|claws|reel|maracas|wind-vane|paddle|yoke|metronome/i.test(label)) return 8;
  return 18;
}

function freezeDesign([speciesId, placeName, headLabel, headFamily, wrapLabel, wrapFamily, charmLabel, charmFamily], index) {
  const make = (label, family, slot) => {
    const artKind = artworkKind(label);
    const form = artworkForm(label, artKind);
    const geometry = Object.freeze({
      widthStep: ((index * 7) % 5) - 2,
      heightStep: ((index * 11) % 5) - 2,
      direction: index % 2 ? 1 : -1,
      motifMode: index % 12,
      angleStep: index % 4,
      pairAttachment: (index * 5) % 7
    });
    return Object.freeze({
    id: `${speciesId}::${placeName}::${slot}`,
    geometrySignature: `${artKind}:${form}:${geometry.widthStep}:${geometry.heightStep}:${geometry.direction}:${geometry.motifMode}:${geometry.angleStep}:${geometry.pairAttachment}:${slot}`,
    label,
    family,
    slot,
    artKind,
    form,
    geometry,
    variant: index
    });
  };
  return Object.freeze({
    speciesId,
    placeName,
    key: `${speciesId}::${placeName}`,
    headwear: make(headLabel, headFamily, "headwear"),
    wrap: make(wrapLabel, wrapFamily, "wrap"),
    charm: make(charmLabel, charmFamily, "charm")
  });
}

export const accessoryCatalogue = Object.freeze(rows.map(freezeDesign));
const catalogueByKey = new Map(accessoryCatalogue.map(design => [design.key, design]));

export function getAccessoryDesign(speciesId, placeName) {
  return catalogueByKey.get(`${speciesId}::${placeName}`) || null;
}

export function auditAccessoryCatalogue(expectedKeys = []) {
  const keys = accessoryCatalogue.map(design => design.key);
  const items = accessoryCatalogue.flatMap(design => [design.headwear, design.wrap, design.charm]);
  const duplicateKeys = keys.filter((key, index) => keys.indexOf(key) !== index);
  const missingKeys = expectedKeys.filter(key => !catalogueByKey.has(key));
  const unexpectedKeys = keys.filter(key => expectedKeys.length && !expectedKeys.includes(key));
  const familyCounts = new Map();
  const designIds = new Set();
  const geometrySignatures = new Set();
  const duplicateDesignIds = [];
  const duplicateGeometrySignatures = [];
  const duplicateLabels = [];
  const labels = new Set();
  accessoryCatalogue.forEach(design => {
    [design.headwear, design.wrap, design.charm].forEach(item => {
      familyCounts.set(item.family, (familyCounts.get(item.family) || 0) + 1);
      if (designIds.has(item.id)) duplicateDesignIds.push(item.id);
      designIds.add(item.id);
      if (geometrySignatures.has(item.geometrySignature)) duplicateGeometrySignatures.push(item.geometrySignature);
      geometrySignatures.add(item.geometrySignature);
      if (labels.has(item.label)) duplicateLabels.push(item.label);
      labels.add(item.label);
    });
  });
  const overusedFamilies = [...familyCounts].filter(([, count]) => count > 2);
  const missingNamedRenderers = items.filter(item => !hasNamedRenderer(item)).map(item => item.label);
  const namedCoverageCount = items.length - missingNamedRenderers.length;
  return Object.freeze({
    recordCount: accessoryCatalogue.length,
    duplicateKeys,
    duplicateLabels,
    designCount: designIds.size,
    duplicateDesignIds,
    duplicateGeometrySignatures,
    missingKeys,
    unexpectedKeys,
    overusedFamilies,
    namedCoverageCount,
    missingNamedRenderers,
    valid: accessoryCatalogue.length === 37 && designIds.size === 111 && namedCoverageCount === 111 && !duplicateKeys.length && !duplicateLabels.length && !duplicateDesignIds.length && !duplicateGeometrySignatures.length && !missingKeys.length && !unexpectedKeys.length && !overusedFamilies.length && !missingNamedRenderers.length
  });
}

function svg(name, attributes = {}) {
  const node = document.createElementNS(SVG_NS, name);
  Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, String(value)));
  return node;
}

function add(parent, name, attributes = {}) {
  const child = svg(name, attributes);
  parent.appendChild(child);
  return child;
}

function path(parent, d, className = "acc-main") {
  return add(parent, "path", { d, class: className });
}

function line(parent, d, className = "acc-line") {
  return path(parent, d, className);
}

function dot(parent, cx, cy, r = 5, className = "acc-accent") {
  return add(parent, "circle", { cx, cy, r, class: className });
}

function motif(parent, variant, compact = false) {
  const mode = variant % 12;
  const scale = compact ? .72 : 1;
  const group = add(parent, "g", { class: "acc-motif", transform: `scale(${scale})` });
  if (mode === 0) path(group, "M0-17 Q-22-10-17 9 Q-7 24 0 10 Q8 24 18 8 Q22-10 0-17Z", "acc-accent");
  if (mode === 1) path(group, "M0-20 L19 0 L0 20 L-19 0Z M0-20V20 M-19 0H19", "acc-accent");
  if (mode === 2) path(group, "M-15 18 L-9-11 L0-25 L9-11 L15 18Z M-20-2H20", "acc-accent");
  if (mode === 3) { path(group, "M-18 15 Q-22-10 0-21 Q22-10 18 15Z", "acc-accent"); line(group, "M-10 11Q0-3 10 11 M0-18V15"); }
  if (mode === 4) [-14, 0, 14].forEach((x, i) => add(group, "ellipse", { class: "acc-accent", cx: x, cy: i === 1 ? -7 : 3, rx: 9, ry: 15, transform: `rotate(${x * 2} ${x} ${i === 1 ? -7 : 3})` }));
  if (mode === 5) path(group, "M-18 16 L-13-12 L0-22 L14-11 L18 16Z M-13-12L14-11 M-8 3H9", "acc-accent");
  if (mode === 6) { dot(group, 0, 0, 16, "acc-accent"); line(group, "M-22 0H22 M0-22V22 M-16-16L16 16 M16-16L-16 16"); }
  if (mode === 7) path(group, "M-20 12 Q-17-15 0-18 Q17-15 20 12 Q0 25-20 12Z M-12 4Q0-8 12 4", "acc-accent");
  if (mode === 8) path(group, "M0-22 C8-9 21-10 16 2 C8 7 8 18 0 23 C-8 18-8 7-16 2 C-21-10-8-9 0-22Z", "acc-accent");
  if (mode === 9) { dot(group, 0, 0, 8, "acc-dark"); [0, 60, 120, 180, 240, 300].forEach(angle => add(group, "ellipse", { class: "acc-accent", cx: 0, cy: -15, rx: 7, ry: 12, transform: `rotate(${angle})` })); }
  if (mode === 10) path(group, "M-21 13 Q-4-18 0-22 Q5-18 21 13 Q0 5-21 13Z M0-22V18", "acc-accent");
  if (mode === 11) { path(group, "M-18 13 Q0-22 18 13 Q0 26-18 13Z", "acc-accent"); dot(group, 0, 3, 5, "acc-dark"); }
  return group;
}

function drawN2Accessory(group, item, companion) {
  if (item.family === "ngm-agar-plate") {
    group.classList.add("ngm-plate", companion ? "ngm-plate-companion" : "ngm-plate-primary");
    if (companion) {
      add(group, "circle", { class: "plate-shadow", cx: 4, cy: 7, r: 39 });
      add(group, "circle", { class: "plate-base", cx: 0, cy: 3, r: 38 });
      add(group, "circle", { class: "plate-rim", cx: 0, cy: 0, r: 36 });
      add(group, "circle", { class: "plate-agar", cx: 0, cy: 0, r: 29 });
      add(group, "path", { class: "bacterial-lawn", d: "M-21-8Q-12-22 3-18Q20-20 24-5Q18 10 4 14Q-13 17-24 4Q-25-2-21-8Z" });
      const tracks = add(group, "g", { class: "worm-tracks" });
      add(tracks, "path", { d: "M-18-7Q-9-14-1-6T15-8" });
      add(tracks, "path", { d: "M-14 8Q-5 1 4 8T18 5" });
      add(group, "path", { class: "plate-glare", d: "M-23-20Q-8-33 10-29" });
      add(group, "path", { class: "plate-label-tab", d: "M-18 35Q0 42 18 35L16 49Q0 54-16 48Z" });
      const label = add(group, "text", { class: "plate-label-text companion", x: 0, y: 46, "text-anchor": "middle" });
      label.textContent = "N2";
    } else {
      add(group, "ellipse", { class: "plate-shadow", cx: 2, cy: 15, rx: 60, ry: 13 });
      add(group, "ellipse", { class: "plate-base", cx: 0, cy: 8, rx: 59, ry: 22 });
      add(group, "ellipse", { class: "plate-rim", cx: 0, cy: 1, rx: 57, ry: 21 });
      add(group, "ellipse", { class: "plate-agar", cx: 0, cy: 0, rx: 49, ry: 16 });
      add(group, "path", { class: "bacterial-lawn", d: "M-44 0Q-27-15-5-10Q18-17 43-1Q25 15 3 11Q-22 17-44 0Z" });
      const tracks = add(group, "g", { class: "worm-tracks" });
      add(tracks, "path", { d: "M-34 1Q-23-10-12-1T11-2T33 1" });
      add(tracks, "path", { d: "M-24 8Q-12 0 1 7T27 5" });
      add(group, "path", { class: "plate-glare", d: "M-45-7Q-21-27 9-22" });
      add(group, "circle", { class: "plate-highlight", cx: 32, cy: -5, r: 3 });
      const n2 = add(group, "text", { class: "plate-label-text", x: -33, y: 5, "text-anchor": "middle" });
      n2.textContent = "N2";
      const op50 = add(group, "text", { class: "plate-label-text op50", x: 31, y: 6, "text-anchor": "middle" });
      op50.textContent = "OP50";
    }
    return true;
  }
  if (item.family === "n2-lab-coat") {
    group.classList.add("n2-lab-coat", companion ? "n2-lab-coat-companion" : "n2-lab-coat-primary");
    if (companion) {
      add(group, "path", { class: "lab-coat-body male", d: "M-36 5C-24 23-5 23 5 3C12-12 13-27 27-39L42-28C31-13 30 4 23 18C10 43-20 47-42 19Z" });
      add(group, "path", { class: "lab-coat-sleeve male", d: "M24-35Q41-45 50-30L42-11Q34-17 29-11L16-20Z" });
      add(group, "path", { class: "lab-coat-collar male", d: "M21-32L31-46L45-31L36-18L29-29L19-14L10-24Z" });
      add(group, "path", { class: "lab-coat-opening male", d: "M29-27Q18-3 13 24" });
      add(group, "path", { class: "lab-coat-seam male", d: "M-28 14Q-8 30 13 21M-20 24Q-2 38 16 29" });
      add(group, "path", { class: "lab-coat-pocket male", d: "M-20 8Q-6 14 5 7L3 21Q-8 27-21 19Z" });
      add(group, "path", { class: "lab-coat-pocket male narrow", d: "M22-4L34-7L34 7L21 10Z" });
      [-12, 2, 15].forEach(y => add(group, "circle", { class: "lab-coat-button", cx: 18 - y * .07, cy: y, r: 2.4 }));
      add(group, "path", { class: "lab-coat-cuff", d: "M41-11L49-9L53-21L45-24Z" });
      const badge = add(group, "g", { class: "lab-badge companion", transform: "translate(-12 -14) rotate(6)" });
      add(badge, "rect", { class: "lab-id-badge", x: -8, y: -6, width: 16, height: 12, rx: 2 });
      const badgeText = add(badge, "text", { class: "lab-id-text male", x: 0, y: 3, "text-anchor": "middle" });
      badgeText.textContent = "N2";
    } else {
      add(group, "path", { class: "lab-coat-body", d: "M-66 29C-40 53-7 49 7 15C18-11 19-36 41-62L65-45C48-24 45 1 35 27C17 69-31 81-75 44Z" });
      add(group, "path", { class: "lab-coat-sleeve", d: "M36-56Q58-72 76-52L66-20Q54-31 44-20L24-34Z" });
      add(group, "path", { class: "lab-coat-collar", d: "M31-53L47-72L68-50L56-29L43-47L29-25L17-38Z" });
      add(group, "path", { class: "lab-coat-opening", d: "M44-45C32-19 29 12 16 41" });
      add(group, "path", { class: "lab-coat-seam", d: "M-51 37Q-20 58 10 38M-62 48Q-30 69 1 53" });
      add(group, "path", { class: "lab-coat-pocket", d: "M-40 24Q-20 33-2 23L-5 43Q-24 53-43 42Z" });
      add(group, "path", { class: "lab-coat-pocket upper", d: "M-4-8Q9-4 20-9L18 8Q6 14-6 8Z" });
      [-23, -5, 13, 30].forEach(y => add(group, "circle", { class: "lab-coat-button", cx: 35 - (y + 23) * .13, cy: y, r: 3 }));
      add(group, "path", { class: "lab-coat-cuff", d: "M64-21L76-16L82-34L70-40Z" });
      const badge = add(group, "g", { class: "lab-badge", transform: "translate(-19 -16) rotate(-4)" });
      add(badge, "rect", { class: "lab-id-badge", x: -13, y: -8, width: 26, height: 17, rx: 3 });
      const badgeText = add(badge, "text", { class: "lab-id-text", x: 0, y: 4, "text-anchor": "middle" });
      badgeText.textContent = "N2";
      add(group, "path", { class: "lab-pen", d: "M-14 23L-5 28M-10 20L-1 25" });
      add(group, "path", { class: "lab-coat-piping", d: "M-71 42Q-30 70 4 50M65-45Q54-28 44-20" });
    }
    return true;
  }
  if (item.family === "cryo-vial-jetpack") {
    group.classList.add("cryo-jetpack", companion ? "cryo-pack-companion" : "cryo-pack-primary");
    if (companion) {
      add(group, "path", { class: "pack-harness", d: "M16-24Q41-29 48-9M18 2Q40 4 45 24" });
      add(group, "path", { class: "cryo-pack-shell companion", d: "M-27-29Q-6-39 18-27L24 19Q4 36-25 24Z" });
      add(group, "rect", { class: "cryo-vial-body companion", x: -13, y: -58, width: 24, height: 70, rx: 9 });
      add(group, "rect", { class: "cryo-vial-cap companion", x: -11, y: -68, width: 20, height: 14, rx: 4 });
      add(group, "path", { class: "cryo-ice", d: "M-10-10Q-1-17 8-9V8Q0 14-10 7Z" });
      add(group, "circle", { class: "cryo-gauge", cx: 9, cy: 14, r: 8 });
      add(group, "path", { class: "cryo-gauge-mark", d: "M9 14L13 9M4 14H9" });
      add(group, "path", { class: "cryo-nozzle", d: "M-20 22L-28 39H-12L-9 25ZM8 27L6 44H22L18 24Z" });
      add(group, "path", { class: "cryo-plume small", d: "M-24 42Q-31 54-21 62Q-13 54-18 44M10 46Q4 57 14 66Q22 56 17 46" });
      add(group, "path", { class: "cryo-frost", d: "M-23-17L-15-11M17-15L10-9M-23 6L-15 3" });
    } else {
      add(group, "path", { class: "pack-harness", d: "M-48-24Q-20-44 13-29M-46 3Q-16-18 17-3" });
      add(group, "path", { class: "cryo-pack-shell", d: "M-28-35Q8-48 42-31L49 29Q12 48-27 31Z" });
      [-11, 22].forEach((x, index) => {
        add(group, "rect", { class: "cryo-vial-body", x: x - 11, y: -67 + index * 3, width: 22, height: 78 - index * 4, rx: 8 });
        add(group, "rect", { class: "cryo-vial-cap", x: x - 9, y: -78 + index * 3, width: 18, height: 14, rx: 4 });
        add(group, "path", { class: "cryo-ice", d: `M${x - 8} ${-16 + index * 4}Q${x} ${-23 + index * 3} ${x + 8} ${-15 + index * 4}V${7 + index * 3}Q${x} ${13 + index * 2} ${x - 8} ${7 + index * 3}Z` });
        add(group, "path", { class: "cryo-vial-tick", d: `M${x - 7}-37H${x + 5}M${x - 7}-27H${x + 2}` });
      });
      add(group, "circle", { class: "cryo-medallion", cx: 9, cy: 18, r: 13 });
      add(group, "path", { class: "snow-mark", d: "M9 8V28M-1 18H19M2 11L16 25M16 11L2 25" });
      add(group, "path", { class: "cryo-nozzle", d: "M-18 29L-24 47H-7L-4 33ZM30 32L27 50H44L40 29Z" });
      add(group, "path", { class: "cryo-plume", d: "M-20 49Q-30 65-18 75Q-6 65-14 51M31 52Q22 67 34 78Q46 67 38 52" });
      const label = add(group, "text", { class: "cryo-label", x: 35, y: 13, "text-anchor": "middle" });
      label.textContent = "LN₂";
      add(group, "path", { class: "cryo-hose", d: "M-23-8Q-41-3-37 14Q-33 29-20 22" });
    }
    return true;
  }
  return false;
}

function drawSanteuilAccessory(group, item, companion) {
  if (item.family === "hogweed-specimen-lantern") {
    group.classList.add("santeuil-accessory", "hogweed-lantern", companion ? "hogweed-lantern-companion" : "hogweed-lantern-primary");
    if (companion) {
      add(group, "path", { class: "stem-lantern-shadow", d: "M-79 24Q-4 42 77 21Q49 48-71 43Z" });
      add(group, "path", { class: "stem-lantern-section lower", d: "M-74 2L-34-23L-24-10L-63 18Z" });
      add(group, "path", { class: "stem-lantern-section upper", d: "M35-16L72-38L82-23L45 0Z" });
      add(group, "ellipse", { class: "stem-lantern-hollow", cx: -70, cy: 10, rx: 10, ry: 15, transform: "rotate(55 -70 10)" });
      add(group, "ellipse", { class: "stem-lantern-hollow", cx: 76, cy: -30, rx: 9, ry: 14, transform: "rotate(58 76 -30)" });
      add(group, "path", { class: "stem-lantern-frame", d: "M-36-17L-27 28L50 22L39-20ZM-26 28L-11 38L38 34L50 22" });
      add(group, "path", { class: "stem-lantern-glass", d: "M-31-12L-24 23L45 18L36-15Z" });
      add(group, "path", { class: "stem-lantern-handle companion", d: "M-27-17Q0-55 39-19" });
      add(group, "path", { class: "stem-lantern-hinge", d: "M-35-8L-45-4L-42 12L-31 12M39-9L49-5" });
      add(group, "path", { class: "stem-lantern-specimen", d: "M-9 9Q0-6 11 6T28 3" });
      add(group, "circle", { class: "stem-lantern-lens", cx: 1, cy: 4, r: 12 });
      const seeds = add(group, "g", { class: "stem-seed-cage", transform: "translate(48 15)" });
      add(seeds, "path", { d: "M0-25V24M-13-18L0-5L14-18M-16 5L0 19L17 3" });
      [[-13,-18],[14,-18],[-16,5],[17,3],[0,24]].forEach(([cx, cy], index) => add(seeds, "ellipse", { cx, cy, rx: 4 + index % 2, ry: 7, transform: `rotate(${index % 2 ? 25 : -25} ${cx} ${cy})` }));
    } else {
      add(group, "path", { class: "stem-lantern-shadow", d: "M-52 76Q2 92 56 74Q30 99-45 94Z" });
      add(group, "path", { class: "stem-lantern-handle", d: "M-38-51Q-20-91 0-96Q23-91 40-50" });
      add(group, "path", { class: "stem-lantern-frame", d: "M-44-52L-38 71L39 71L45-52ZM-44-11H44M-41 34H41" });
      [-30, 14, 58].forEach(y => add(group, "ellipse", { class: "stem-lantern-node", cx: 0, cy: y, rx: 42 - (y + 30) * .035, ry: 7 }));
      add(group, "path", { class: "stem-lantern-glass", d: "M-35-43L-31 62H31L36-43Z" });
      add(group, "path", { class: "stem-lantern-glass-highlight", d: "M-24-34Q-17 8-21 48" });
      add(group, "path", { class: "stem-lantern-cutaway", d: "M-45-52Q0-70 45-52Q0-34-45-52Z" });
      add(group, "ellipse", { class: "stem-lantern-hollow", cx: 0, cy: -52, rx: 27, ry: 10 });
      add(group, "path", { class: "stem-lantern-specimen", d: "M-20 27Q-10 4 3 22Q13 36 24 16" });
      add(group, "circle", { class: "stem-lantern-lens", cx: 2, cy: 22, r: 19 });
      add(group, "path", { class: "stem-lantern-base", d: "M-48 70Q0 84 48 70L39 86Q0 96-40 85Z" });
      const umbel = add(group, "g", { class: "stem-umbel", transform: "translate(0 -96)" });
      add(umbel, "path", { d: "M0 13V-4M0-3L-31-27M0-3L-17-36M0-3L0-42M0-3L18-35M0-3L32-25" });
      [[-31,-27],[-17,-36],[0,-42],[18,-35],[32,-25]].forEach(([cx, cy], index) => {
        add(umbel, "circle", { cx, cy, r: 4 + index % 2 });
        add(umbel, "circle", { cx: cx - 6, cy: cy + 1, r: 2.5 });
        add(umbel, "circle", { cx: cx + 6, cy: cy + 2, r: 2.5 });
      });
    }
    return true;
  }

  if (item.family === "santeuil-cylinder-organ") {
    group.classList.add("santeuil-accessory", "santeuil-organ", companion ? "santeuil-organ-companion" : "santeuil-organ-primary");
    if (companion) {
      add(group, "path", { class: "organ-shadow", d: "M-47 72Q3 88 55 69Q28 94-42 91Z" });
      add(group, "path", { class: "organ-cabinet companion", d: "M-41-66L28-75L43-58V65L-40 72Z" });
      add(group, "path", { class: "organ-cabinet-cap", d: "M-47-66L30-80L48-60L39-49L-41-51Z" });
      add(group, "path", { class: "organ-window", d: "M-28-45Q0-61 29-43V2Q0 16-29 1Z" });
      add(group, "ellipse", { class: "organ-cylinder", cx: 0, cy: -20, rx: 25, ry: 11 });
      [-16,-8,0,8,16].forEach((x, index) => add(group, "circle", { class: "organ-pin", cx: x, cy: -22 + index % 2 * 4, r: 1.8 }));
      add(group, "path", { class: "organ-bellows companion", d: "M-38 19L20 11L36 36L-37 47Z" });
      [-25,-8,9,24].forEach(x => add(group, "path", { class: "organ-bellows-fold", d: `M${x} 18L${x + 5} 43` }));
      add(group, "rect", { class: "organ-keybed", x: -30, y: 48, width: 61, height: 17, rx: 2 });
      for (let index = 0; index < 8; index += 1) add(group, "path", { class: "organ-key", d: `M${-27 + index * 7.5} 49V63` });
      add(group, "path", { class: "organ-crank", d: "M42-17Q63-15 62 5L75 12" });
      add(group, "circle", { class: "organ-crank-knob", cx: 78, cy: 13, r: 5 });
      add(group, "path", { class: "organ-vent", d: "M-24 7Q0 21 25 5M-18 14Q0 25 19 13" });
    } else {
      add(group, "path", { class: "organ-shadow", d: "M-73 78Q7 101 81 75Q38 108-65 103Z" });
      add(group, "path", { class: "organ-cabinet", d: "M-67-58Q-51-82-30-91H63L70 78L-65 84Z" });
      add(group, "path", { class: "organ-secretary-lid", d: "M-51-70H48L60-44L-58-39Z" });
      add(group, "path", { class: "organ-window", d: "M-47-32Q0-47 49-31V12Q0 28-49 13Z" });
      add(group, "ellipse", { class: "organ-cylinder", cx: 0, cy: -8, rx: 43, ry: 15 });
      [-32,-24,-16,-8,0,8,16,24,32].forEach((x, index) => add(group, "circle", { class: "organ-pin", cx: x, cy: -11 + index % 3 * 3, r: 2 }));
      add(group, "path", { class: "organ-bellows", d: "M-57 23L31 18L59 47L-57 58Z" });
      [-43,-26,-9,8,25,42].forEach(x => add(group, "path", { class: "organ-bellows-fold", d: `M${x} 23L${x + 6} 54` }));
      add(group, "path", { class: "organ-keybed-frame", d: "M-58 57Q0 49 59 55L55 79Q0 89-58 81Z" });
      for (let index = 0; index < 13; index += 1) {
        const x = -52 + index * 8.7;
        add(group, "path", { class: "organ-key", d: `M${x} 58L${x + .5} 80` });
        add(group, "path", { class: "organ-key dark", d: `M${x + 4.2} 58L${x + 4.5} 70` });
      }
      const rack = add(group, "g", { class: "organ-pipe-rack", transform: "translate(30 -83)" });
      add(rack, "path", { class: "organ-rack-frame", d: "M-23 1H35V47H-23ZM-23 15H35M-23 37H35" });
      [-16,-7,2,11,20,29].forEach((x, index) => {
        if (index === 1 || index === 4) {
          add(rack, "circle", { class: "organ-empty-socket", cx: x, cy: 39, r: 3 });
        } else {
          add(rack, "path", { class: "organ-pipe", d: `M${x - 3} ${38 - index % 2 * 2}V${7 + index * 4}H${x + 3}V${38 - index % 2 * 2}Z` });
        }
      });
      add(group, "path", { class: "organ-crank", d: "M68-3Q94-5 95 20L111 29" });
      add(group, "circle", { class: "organ-crank-knob", cx: 115, cy: 31, r: 6 });
      add(group, "path", { class: "organ-brass-inlay", d: "M-48-77Q-25-93 0-79Q26-94 51-76M-38 34Q0 47 39 33" });
    }
    return true;
  }

  if (item.family === "couleuvre-dragonfly-automaton") {
    group.classList.add("santeuil-accessory", "couleuvre-automaton", companion ? "couleuvre-automaton-companion" : "couleuvre-automaton-primary");
    if (companion) {
      add(group, "path", { class: "automaton-shadow", d: "M-68 49Q9 72 78 45Q38 78-58 72Z" });
      add(group, "path", { class: "automaton-base companion", d: "M-60 23Q4 5 70 24L63 51Q5 70-59 49Z" });
      add(group, "ellipse", { class: "automaton-pond", cx: 4, cy: 24, rx: 58, ry: 18 });
      add(group, "path", { class: "automaton-post", d: "M-13 24L-4-39L8-38L17 25Z" });
      add(group, "path", { class: "automaton-carousel-arm", d: "M2-33Q34-48 53-25M1-31Q-34-38-48-10" });
      const dragonfly = add(group, "g", { class: "automaton-dragonfly broad", transform: "translate(47 -29) rotate(12)" });
      add(dragonfly, "path", { class: "dragonfly-wing broad", d: "M-3-3Q-33-35-48-13Q-34 7-4 5ZM4-3Q28-40 48-20Q38 5 5 5ZM-2 6Q-29 16-36 34Q-17 42 3 11ZM5 7Q33 13 41 30Q24 43 5 12Z" });
      add(dragonfly, "path", { class: "dragonfly-body", d: "M-3-20Q0-28 4-20L7 23L1 43L-5 23Z" });
      [-14,-4,7,18].forEach(y => add(dragonfly, "circle", { class: "dragonfly-joint", cx: 1, cy: y, r: 2.5 }));
      add(group, "path", { class: "automaton-gear-link", d: "M3-14L-39 10M-39 10L-47-10" });
      add(group, "circle", { class: "automaton-gear", cx: -40, cy: 12, r: 13 });
      [0,45,90,135].forEach(angle => add(group, "path", { class: "automaton-gear-tooth", d: "M-40-5V2", transform: `rotate(${angle} -40 12)` }));
      add(group, "path", { class: "automaton-crank", d: "M-52 12Q-76 10-75-11L-88-17" });
      add(group, "circle", { class: "automaton-crank-knob", cx: -91, cy: -18, r: 5 });
    } else {
      add(group, "path", { class: "automaton-shadow", d: "M-85 54Q6 83 91 51Q45 90-74 81Z" });
      add(group, "path", { class: "automaton-base", d: "M-80 22Q1-3 82 20L76 54Q3 81-78 53Z" });
      add(group, "ellipse", { class: "automaton-pond", cx: 1, cy: 22, rx: 71, ry: 23 });
      add(group, "path", { class: "automaton-pond-ripple", d: "M-49 22Q-24 7 1 20Q26 7 53 21M-33 32Q0 20 35 32" });
      add(group, "circle", { class: "automaton-gear", cx: -28, cy: 22, r: 18 });
      add(group, "circle", { class: "automaton-gear small", cx: 10, cy: 27, r: 11 });
      [0,30,60,90,120,150].forEach(angle => add(group, "path", { class: "automaton-gear-tooth", d: "M-28-1V7", transform: `rotate(${angle} -28 22)` }));
      add(group, "path", { class: "automaton-post", d: "M-4 21L-2-41L10-42L18 23Z" });
      add(group, "path", { class: "automaton-linkage", d: "M-28 22L5-23L46-33M10 27L43-9" });
      const damselfly = add(group, "g", { class: "automaton-dragonfly damselfly", transform: "translate(45 -37) rotate(-7)" });
      add(damselfly, "path", { class: "dragonfly-wing narrow", d: "M-5-2Q-70-25-89-9Q-66 7-5 7ZM5-2Q66-28 88-12Q68 8 5 7Z" });
      add(damselfly, "path", { class: "dragonfly-wing narrow rear", d: "M-4 5Q-51 14-69 28Q-43 36-3 12ZM5 5Q51 11 71 24Q47 36 5 12Z" });
      add(damselfly, "path", { class: "dragonfly-body", d: "M-4-20Q0-30 5-20L7 35L1 65L-5 35Z" });
      [-15,-5,6,17,28,39].forEach((y, index) => add(damselfly, "circle", { class: "dragonfly-joint", cx: index % 2 ? 1 : 0, cy: y, r: index < 2 ? 3 : 2.5 }));
      add(damselfly, "path", { class: "dragonfly-antenna", d: "M-2-22L-12-34M3-22L13-34" });
      add(group, "path", { class: "automaton-crank", d: "M-61 37Q-89 39-90 13L-107 4" });
      add(group, "circle", { class: "automaton-crank-knob", cx: -112, cy: 2, r: 7 });
    }
    return true;
  }

  return false;
}

function drawEdinburghAccessory(group, item, companion) {
  if (item.family === "midmar-compost-tumbler") {
    group.classList.add("edinburgh-accessory", "midmar-tumbler", companion ? "midmar-tumbler-companion" : "midmar-tumbler-primary");
    if (companion) {
      add(group, "path", { class: "edinburgh-accessory-shadow", d: "M-80 54Q0 75 82 51Q43 82-72 76Z" });
      add(group, "path", { class: "tumbler-cradle", d: "M-65 31Q-49 61 0 64Q50 61 66 29L56 22Q39 46 0 48Q-39 46-55 22Z" });
      add(group, "path", { class: "tumbler-axis", d: "M-81-2H82" });
      add(group, "path", { class: "tumbler-barrel companion", d: "M-62-35Q0-49 62-34L68 23Q0 42-68 24Z" });
      [-47,-28,-9,10,29,48].forEach((x, index) => add(group, "path", { class: "tumbler-slat", d: `M${x}-37Q${x + (index % 2 ? 3 : -2)} -4 ${x + (index % 2 ? 4 : -3)} 29` }));
      add(group, "path", { class: "tumbler-door upper", d: "M-28-37Q0-43 28-36L27-5Q0 2-28-5Z" });
      add(group, "path", { class: "tumbler-door lower", d: "M-27 1Q0 8 28 1L29 27Q0 35-29 28Z" });
      add(group, "circle", { class: "tumbler-latch", cx: 22, cy: -20, r: 4 });
      add(group, "circle", { class: "tumbler-latch", cx: -21, cy: 14, r: 4 });
      add(group, "circle", { class: "tumbler-handwheel-rim", cx: 78, cy: -2, r: 21 });
      add(group, "circle", { class: "tumbler-handwheel-hub", cx: 78, cy: -2, r: 5 });
      [0,45,90,135].forEach(angle => add(group, "path", { class: "tumbler-handwheel-spoke", d: "M57-2H99", transform: `rotate(${angle} 78 -2)` }));
      add(group, "path", { class: "tumbler-foot", d: "M-67 40L-78 66H-53L-47 48ZM48 47L54 67H79L66 37Z" });
      add(group, "path", { class: "tumbler-vent companion", d: "M-52-18L-38-20M37-22L51-19M-50 14L-37 17M38 12L53 9" });
    } else {
      add(group, "path", { class: "edinburgh-accessory-shadow", d: "M-76 89Q5 109 80 85Q43 117-68 111Z" });
      add(group, "path", { class: "tumbler-a-frame", d: "M-72 85L-45-39L-31-39L-48 85ZM72 85L45-39L31-39L48 85ZM-58 55H58" });
      add(group, "path", { class: "tumbler-axis", d: "M-67-21H68" });
      add(group, "path", { class: "tumbler-barrel", d: "M-45-72L28-77L55-50L49 35L22 62L-41 54L-57 20L-55-45Z" });
      add(group, "path", { class: "tumbler-facet", d: "M-45-72L-26-48L-34 35L-41 54M28-77L16-48L23 39L22 62M-55-45L-26-48L16-48L55-50M-57 20L-34 35L23 39L49 35" });
      add(group, "path", { class: "tumbler-cutaway", d: "M-34 4L22 1L24 39L-34 35Z" });
      add(group, "path", { class: "tumbler-compost green", d: "M-31 11Q-17-2-3 12Q12-3 21 9V22Q-7 31-32 23Z" });
      add(group, "path", { class: "tumbler-compost brown", d: "M-32 23Q-15 14 1 27Q12 17 23 23V37L-33 34Z" });
      add(group, "path", { class: "tumbler-hatch", d: "M-32-45L21-49L26-11L-28-7Z" });
      add(group, "path", { class: "tumbler-hatch-hinge", d: "M-23-43V-7M13-47V-11" });
      add(group, "circle", { class: "tumbler-latch", cx: 22, cy: -29, r: 5 });
      [[-39,-58],[-7,-62],[28,-61],[-45,-25],[-8,-27],[37,-31]].forEach(([cx, cy], index) => add(group, "circle", { class: "tumbler-vent", cx, cy, r: index % 3 === 1 ? 3.5 : 3 }));
      add(group, "path", { class: "tumbler-crank", d: "M56-21Q84-24 84 1L100 11" });
      add(group, "circle", { class: "tumbler-crank-knob", cx: 104, cy: 13, r: 7 });
      add(group, "path", { class: "tumbler-ground-pin", d: "M-51 85V99M51 85V99M-62 99H-40M40 99H62" });
    }
    return true;
  }

  if (item.family === "galaxy-plate-scanner") {
    group.classList.add("edinburgh-accessory", "galaxy-scanner", companion ? "galaxy-scanner-companion" : "galaxy-scanner-primary");
    if (companion) {
      add(group, "path", { class: "edinburgh-accessory-shadow", d: "M-58 82Q5 98 65 79Q34 105-52 103Z" });
      add(group, "path", { class: "scanner-portal", d: "M-48 77V-65H42V77H24V-46H-30V77Z" });
      add(group, "path", { class: "scanner-portal-rivet", d: "M-39-54H-37M31-54H33M-39 63H-37M31 63H33" });
      const carriage = add(group, "g", { class: "scanner-plate-carriage companion", transform: "rotate(-20 0 14)" });
      add(carriage, "rect", { class: "scanner-carriage", x: -37, y: -20, width: 74, height: 68, rx: 2 });
      add(carriage, "rect", { class: "scanner-star-plate", x: -28, y: -12, width: 56, height: 50, rx: 1 });
      [[-18,-3,2.6],[-6,9,1.6],[11,-2,2.1],[18,18,1.4],[-14,27,1.5],[5,29,1.2]].forEach(([cx,cy,r]) => add(carriage, "circle", { class: "scanner-star", cx, cy, r }));
      add(group, "path", { class: "scanner-head-arm", d: "M-30-42H11L22-23" });
      add(group, "path", { class: "scanner-head", d: "M7-36L31-31L27-5L4-11Z" });
      add(group, "circle", { class: "scanner-lens", cx: 17, cy: -20, r: 6 });
      add(group, "path", { class: "scanner-guide", d: "M-37 57H32M-22 49V68M18 49V68" });
      add(group, "path", { class: "scanner-counter", d: "M41 8L67 13L62 40L40 35Z" });
      const companionCounter = add(group, "text", { class: "scanner-counter-text", x: 52, y: 29, "text-anchor": "middle" });
      companionCounter.textContent = "12";
      add(group, "path", { class: "scanner-foot", d: "M-52 76L-61 91H-29L-23 77ZM18 77L25 91H56L47 76Z" });
    } else {
      add(group, "path", { class: "edinburgh-accessory-shadow", d: "M-108 65Q1 89 111 62Q55 99-98 92Z" });
      add(group, "path", { class: "scanner-cast-frame", d: "M-96 54V-42H-60V-59H59V-42H96V54H70V-23H-68V54Z" });
      add(group, "path", { class: "scanner-frame-brace", d: "M-96 34H96M-78-41V54M78-41V54M-60-49H59" });
      [[-87,-31],[-69,-31],[69,-31],[87,-31],[-87,44],[-69,44],[69,44],[87,44]].forEach(([cx,cy]) => add(group, "circle", { class: "scanner-rivet", cx, cy, r: 3 }));
      add(group, "path", { class: "scanner-rail", d: "M-72 44H73M-58 55H59" });
      add(group, "path", { class: "scanner-carriage", d: "M-54-20H55V48H-54Z" });
      add(group, "rect", { class: "scanner-star-plate", x: -43, y: -11, width: 86, height: 50, rx: 1 });
      [[-32,-1,2.8],[-20,19,1.5],[-3,5,2],[15,-3,1.5],[31,21,2.4],[4,29,1.2],[28,6,1.1],[-35,31,1.3]].forEach(([cx,cy,r]) => add(group, "circle", { class: "scanner-star", cx, cy, r }));
      add(group, "path", { class: "scanner-head-column", d: "M-18-79H17L24-24H-25Z" });
      add(group, "path", { class: "scanner-head", d: "M-32-33H32L27-2H-28Z" });
      add(group, "circle", { class: "scanner-lens", cx: 0, cy: -17, r: 10 });
      add(group, "path", { class: "scanner-aperture", d: "M0-27L8-22L10-13L2-7L-7-11L-10-20Z" });
      add(group, "circle", { class: "scanner-wheel-rim", cx: 87, cy: 8, r: 20 });
      add(group, "circle", { class: "scanner-wheel-hub", cx: 87, cy: 8, r: 5 });
      [0,45,90,135].forEach(angle => add(group, "path", { class: "scanner-wheel-spoke", d: "M67 8H107", transform: `rotate(${angle} 87 8)` }));
      add(group, "rect", { class: "scanner-counter", x: -103, y: -18, width: 34, height: 27, rx: 3 });
      const counter = add(group, "text", { class: "scanner-counter-text", x: -86, y: 0, "text-anchor": "middle" });
      counter.textContent = "04";
      add(group, "path", { class: "scanner-plate-guide", d: "M-50 42L-68 61M50 42L68 61" });
      add(group, "path", { class: "scanner-foot", d: "M-99 54L-108 72H-67L-62 54ZM62 54L68 72H109L99 54Z" });
      const galaxy = add(group, "text", { class: "scanner-label", x: 0, y: -48, "text-anchor": "middle" });
      galaxy.textContent = "GALAXY";
    }
    return true;
  }

  if (item.family === "agassiz-ice-flow-model") {
    group.classList.add("edinburgh-accessory", "agassiz-model", companion ? "agassiz-model-companion" : "agassiz-model-primary");
    if (companion) {
      add(group, "path", { class: "edinburgh-accessory-shadow", d: "M-69 79Q7 99 73 75Q39 106-61 102Z" });
      add(group, "path", { class: "agassiz-theatre-frame", d: "M-63 77V-71H59V77H46V-57H-49V77Z" });
      add(group, "path", { class: "agassiz-cutaway", d: "M-46 54L-31-27L-8-65L13-31L42 8L47 55Z" });
      add(group, "path", { class: "agassiz-crag-core", d: "M-42 50L-30-20L-8-57L6-28L-2 9L28 47Z" });
      add(group, "path", { class: "agassiz-tail-core", d: "M-2 9L8-28L42 9L47 55L28 47Z" });
      add(group, "path", { class: "agassiz-ice-ribbon", d: "M-33-19Q-22-39-9-46Q3-31 9-11Q18 8 39 22L36 36Q9 22-2 2Q-13-18-25-6Z" });
      add(group, "path", { class: "agassiz-flow-arrow", d: "M-18-20Q2-2 23 18M17 8L24 18L12 20" });
      add(group, "path", { class: "agassiz-crank", d: "M47-32Q69-34 69-12L83-3" });
      add(group, "circle", { class: "agassiz-crank-knob", cx: 87, cy: -1, r: 6 });
      add(group, "path", { class: "agassiz-pulley", d: "M-39-43H-7M-23-43V-18" });
      add(group, "circle", { class: "agassiz-pulley-wheel", cx: -23, cy: -44, r: 9 });
      add(group, "path", { class: "agassiz-foot", d: "M-65 76L-73 91H-38L-32 77ZM31 77L38 91H72L64 76Z" });
      const west = add(group, "text", { class: "agassiz-direction", x: -36, y: 68, "text-anchor": "middle" });
      west.textContent = "W";
      const east = add(group, "text", { class: "agassiz-direction", x: 35, y: 68, "text-anchor": "middle" });
      east.textContent = "E";
    } else {
      add(group, "path", { class: "edinburgh-accessory-shadow", d: "M-112 49Q0 75 115 46Q58 86-102 80Z" });
      add(group, "path", { class: "agassiz-base", d: "M-104 32L88 25L109 49L-86 59Z" });
      add(group, "path", { class: "agassiz-andesite-slab", d: "M-91-24L63-31L88-7L73 30L-79 36L-103 11Z" });
      add(group, "path", { class: "agassiz-groove", d: "M-75-7Q-30-18 18-16Q46-15 69-7M-76 9Q-35-1 11 1Q44 2 70 10M-64 23Q-22 13 23 15Q49 16 67 22" });
      add(group, "path", { class: "agassiz-brass-rail", d: "M-87-33L80-40M-87-28L80-35" });
      add(group, "path", { class: "agassiz-rail-tie", d: "M-66-36L-63-25M-25-38L-22-27M17-40L20-29M58-42L61-31" });
      add(group, "path", { class: "agassiz-ice-carriage", d: "M0-56L50-61L69-43L60-11L10-7L-8-25Z" });
      add(group, "path", { class: "agassiz-ice-facet", d: "M0-56L15-35L10-7M50-61L43-36L60-11M15-35L43-36L69-43" });
      add(group, "circle", { class: "agassiz-carriage-wheel", cx: 4, cy: -29, r: 5 });
      add(group, "circle", { class: "agassiz-carriage-wheel", cx: 61, cy: -36, r: 5 });
      add(group, "path", { class: "agassiz-flow-arrow", d: "M-70-48H61M48-58L62-48L48-38" });
      const east = add(group, "text", { class: "agassiz-direction", x: 82, y: -42, "text-anchor": "middle" });
      east.textContent = "E";
      add(group, "path", { class: "agassiz-level", d: "M-91 37V50M76 31V44" });
    }
    return true;
  }

  return false;
}

function drawInstrument(group, item, companion) {
  const label = item.label;
  if (/fiddle/i.test(label)) {
    path(group, companion ? "M-20 19Q-39 4-20-12Q-27-33-8-37Q0-19 8-37Q27-33 20-12Q39 4 20 19Q0 35-20 19Z" : "M-27 28Q-52 7-27-16Q-37-43-11-50Q0-28 11-50Q37-43 27-16Q52 7 27 28Q0 48-27 28Z");
    line(group, companion ? "M0-36V53 M-8-28L-8 38 M8-28L8 38" : "M0-48V67 M-9-38L-9 49 M9-38L9 49");
    path(group, companion ? "M-6 51H6L9 68H-9Z" : "M-8 64H8L12 84H-12Z", "acc-dark");
    line(group, companion ? "M34-46L-30 49" : "M48-63L-39 65", "acc-accent-line");
    return true;
  }
  if (/flute|piccolo/i.test(label)) {
    const d = companion ? "M-53 18Q-4-7 50-27" : "M-65 25Q-2-10 64-35";
    line(group, d, "acc-line thick");
    [-35,-17,2,21,38].slice(0, companion ? 4 : 5).forEach((x, index) => dot(group, x, 8-index*7, 3.5, "acc-soft"));
    path(group, companion ? "M47-33L65-29L52-20Z" : "M60-42L82-37L64-27Z", "acc-accent");
    return true;
  }
  if (/lyre/i.test(label)) {
    path(group, companion ? "M-34-39Q-43 16 0 39Q43 16 34-39L21-29Q27 5 0 22Q-27 5-21-29Z" : "M-47-51Q-58 22 0 54Q58 22 47-51L29-37Q37 8 0 34Q-37 8-29-37Z");
    const count = companion ? 4 : 6;
    for(let i=0;i<count;i+=1){const x=(i-(count-1)/2)*9; line(group, `M${x}-26V${29-Math.abs(x)*.25}`);}
    line(group, companion ? "M-34 34H34" : "M-47 47H47", "acc-accent-line");
    return true;
  }
  if (/concertina|accordion/i.test(label)) {
    path(group, companion ? "M-49-27L-29-38L29-38L49-27V28L29 39H-29L-49 28Z" : "M-61-31L-37-45L37-45L61-31V34L37 48H-37L-61 34Z");
    const lines = companion ? [-21,-10,1,12,23] : [-29,-17,-5,7,19,31];
    lines.forEach(x => line(group, `M${x}-35V36`));
    [-39,39].forEach(x => { dot(group,x,-9,4,"acc-soft"); dot(group,x,10,4,"acc-soft"); });
    return true;
  }
  if (/ocarina/i.test(label)) {
    path(group, companion ? "M-44 15Q-45-23-3-31Q33-33 45-4L67 9L43 17Q20 43-14 34Q-37 31-44 15Z" : "M-57 20Q-58-31-4-41Q43-43 59-5L83 11L56 23Q25 56-18 45Q-48 41-57 20Z");
    [[-18,-6],[2,-15],[20,-1],[-2,12]].slice(0,companion?3:4).forEach(([x,y])=>dot(group,x,y,5,"acc-dark"));
    return true;
  }
  if (/saxophone/i.test(label)) {
    line(group, companion ? "M-18-48Q12-26-1 6Q-13 39 23 43Q47 45 49 19" : "M-25-62Q17-35-2 9Q-19 54 31 58Q64 60 66 25", "acc-line thick");
    path(group, companion ? "M39 15L67 2L55 31Z" : "M53 20L88 2L73 43Z", "acc-accent");
    [-9,6,19].forEach((y,index)=>dot(group,index*8-4,y,3.5,"acc-soft"));
    return true;
  }
  if (/ukulele/i.test(label)) {
    path(group, companion ? "M-31 27Q-50 6-27-8Q-43-29-20-39Q0-28 20-39Q43-29 27-8Q50 6 31 27Q0 45-31 27Z" : "M-43 37Q-67 9-37-12Q-57-40-26-54Q0-38 26-54Q57-40 37-12Q67 9 43 37Q0 61-43 37Z");
    dot(group,0,-5,companion?9:12,"acc-dark");
    line(group, companion ? "M0-34V66 M-7-30V52 M7-30V52" : "M0-49V85 M-9-44V67 M9-44V67");
    path(group, companion ? "M-9 62H9L13 76H-13Z" : "M-12 80H12L17 99H-17Z", "acc-accent");
    return true;
  }
  if (/drum|tambourine/i.test(label)) {
    add(group,"ellipse",{class:"acc-main",cx:0,cy:0,rx:companion?43:55,ry:companion?35:44});
    add(group,"ellipse",{class:"acc-soft",cx:0,cy:0,rx:companion?31:41,ry:companion?24:31});
    const count=companion?6:9; for(let i=0;i<count;i+=1){const a=(i/count)*Math.PI*2; dot(group,Math.cos(a)*(companion?37:49),Math.sin(a)*(companion?29:38),4,"acc-accent");}
    line(group, companion ? "M-48-45L21 34 M48-43L-18 35" : "M-64-59L29 44 M64-56L-24 45", "acc-accent-line");
    return true;
  }
  if (/marimba|xylophone|chimes|harmonica/i.test(label)) {
    const count=companion?5:7;
    for(let i=0;i<count;i+=1){const x=(i-(count-1)/2)*14; const h=(companion?38:49)-Math.abs(i-(count-1)/2)*4; add(group,"rect",{class:i%2?"acc-accent":"acc-main",x:x-6,y:-h/2,width:12,height:h,rx:3});}
    line(group, companion ? "M-48-27L48 27 M48-27L-48 27" : "M-63-38L63 38 M63-38L-63 38", "acc-accent-line");
    return true;
  }
  if (/trumpet/i.test(label)) {
    line(group, companion ? "M-55 13H22Q37 12 38-8" : "M-70 17H30Q48 15 49-12", "acc-line thick");
    path(group, companion ? "M35-24L72-43V22L35 5Z" : "M46-32L94-57V29L46 7Z", "acc-accent");
    [-15,2,19].forEach(x=>line(group,`M${x} 9V-16`));
    return true;
  }
  if (/maracas/i.test(label)) {
    [-25,25].forEach((x,index)=>{add(group,"ellipse",{class:index?"acc-accent":"acc-main",cx:x,cy:-10,rx:companion?17:22,ry:companion?25:31,transform:`rotate(${index?18:-18} ${x} -10)`}); line(group,`M${x} 10L${x+(index?17:-17)} ${companion?52:66}`,"acc-line thick");});
    return true;
  }
  return false;
}

function drawSamplingOrFieldTool(group, item, companion) {
  const label=item.label;
  if (/sieve/i.test(label)) {
    dot(group,0,0,companion?40:51,"acc-soft");
    for(let i=-3;i<=3;i+=1){line(group,`M${i*11} -${Math.sqrt(Math.max(0,(companion?40:51)**2-(i*11)**2)).toFixed(1)}V${Math.sqrt(Math.max(0,(companion?40:51)**2-(i*11)**2)).toFixed(1)}`); line(group,`M-${Math.sqrt(Math.max(0,(companion?40:51)**2-(i*11)**2)).toFixed(1)} ${i*11}H${Math.sqrt(Math.max(0,(companion?40:51)**2-(i*11)**2)).toFixed(1)}`);}
    path(group, companion ? "M34 25L70 47L62 59L25 34Z" : "M43 32L91 60L80 75L31 44Z", "acc-main"); return true;
  }
  if (/dip net|sampler/i.test(label)) {
    const triangular=/triangular|twin/i.test(label)||companion;
    if(triangular) path(group,"M-43-28L43-28L0 43Z","acc-soft"); else add(group,"ellipse",{class:"acc-soft",cx:0,cy:-4,rx:51,ry:42});
    line(group, triangular ? "M0 42L56 86" : "M39 24L79 75", "acc-line thick");
    if(/sampler/i.test(label)){add(group,"rect",{class:"acc-main",x:-11,y:-18,width:22,height:42,rx:6}); line(group,"M-8-4H8");}
    return true;
  }
  if (/pannier|trug/i.test(label)) {
    path(group, companion ? "M-46-14Q0-34 46-12L38 39Q0 54-39 38Z" : "M-60-18Q0-45 60-15L49 51Q0 70-51 50Z");
    line(group, companion ? "M-35-15Q0-62 36-14 M-38 5H39 M-28 24H34" : "M-46-19Q0-80 47-18 M-50 7H51 M-39 31H44"); return true;
  }
  if (/quadrat/i.test(label)) {
    add(group,"rect",{class:"acc-soft",x:companion?-40:-52,y:companion?-40:-52,width:companion?80:104,height:companion?80:104,rx:3,transform:companion?"rotate(45)":""});
    [-1,0,1].forEach(i=>{line(group,`M${i*18}-50V50`);line(group,`M-50 ${i*18}H50`);}); return true;
  }
  if (/telescope|periscope|snorkel/i.test(label)) {
    if(/periscope|snorkel/i.test(label)) line(group,companion?"M-16 48V-42H35V-18H5":"M-22 64V-56H47V-24H7","acc-line thick");
    else {path(group,companion?"M-55 13L43-23L51-5L-47 31Z":"M-72 17L57-31L67-7L-62 41Z"); line(group,"M-7 8L-23 57 M18-1L37 53 M-23 57H37");}
    return true;
  }
  if (/compass/i.test(label)) {
    dot(group,0,0,companion?43:55,"acc-main"); dot(group,0,0,companion?31:41,"acc-soft");
    path(group, companion?"M0-32L10-8L32 0L10 8L0 32L-10 8L-32 0L-10-8Z":"M0-43L13-11L43 0L13 11L0 43L-13 11L-43 0L-13-11Z","acc-accent"); return true;
  }
  if (/press/i.test(label)) {
    add(group,"rect",{class:"acc-main",x:companion?-42:-54,y:companion?-31:-40,width:companion?84:108,height:companion?62:80,rx:4});
    add(group,"rect",{class:"acc-soft",x:companion?-33:-43,y:companion?-22:-29,width:companion?66:86,height:companion?44:58,rx:3});
    line(group,companion?"M0-31V-55 M-20-54H20":"M0-40V-71 M-27-70H27","acc-line thick"); motif(group,item.variant,true); return true;
  }
  if (/gauge rod/i.test(label)) {
    add(group,"rect",{class:"acc-soft",x:-9,y:companion?-58:-74,width:18,height:companion?116:148,rx:4});
    for(let y=companion?-45:-60;y<(companion?55:70);y+=15) line(group,`M-8 ${y}H${y%30===0?14:7}`); return true;
  }
  if (/camera rig/i.test(label)) {
    add(group,"rect",{class:"acc-main",x:companion?-43:-55,y:companion?-28:-36,width:companion?86:110,height:companion?56:72,rx:10}); dot(group,0,0,companion?17:23,"acc-dark"); dot(group,0,0,companion?8:11,"acc-soft");
    line(group,companion?"M-29 28L-42 67 M29 28L42 67 M0 28V71":"M-38 35L-54 87 M38 35L54 87 M0 35V91","acc-line thick"); return true;
  }
  return false;
}

function drawNaturalOrMotionAccessory(group, item, companion) {
  const label=item.label;
  if (item.family === "volcanic-needle-ruff") {
    path(group, companion
      ? "M-45 24L-22-16L-8-54L8-12L24-46L45 24Q0 49-45 24Z"
      : "M-57 30L-28-20L0-73L18-18L36-55L58 30Q0 62-57 30Z");
    line(group, companion ? "M-34 20L-8-39L7 19 M16-31L34 20" : "M-45 25L0-59L14 24 M27-43L46 25");
    return true;
  }
  if (/wings/i.test(label)) {
    if(companion){path(group,"M-7 3Q-52-37-64-9Q-45 18-7 13Z M7 3Q52-37 64-9Q45 18 7 13Z","acc-soft"); line(group,"M-56-8L-6 8 M56-8L6 8");}
    else {path(group,"M-9 2Q-67-62-82-25Q-60 15-9 15Z M9 2Q67-62 82-25Q60 15 9 15Z M-7 14Q-61 17-59 49Q-31 55-2 21Z M7 14Q61 17 59 49Q31 55 2 21Z","acc-soft"); line(group,"M-73-25L-8 9 M73-25L8 9 M-50 43L-5 18 M50 43L5 18");}
    return true;
  }
  if (/glider/i.test(label)) {
    if(companion) path(group,"M-68 20L0-34L68 20L28 15L0 47L-25 14Z","acc-soft");
    else {path(group,"M-86 24Q0-61 86 22Q34 8 0 55Q-36 8-86 24Z","acc-soft"); for(let x=-55;x<=55;x+=22) line(group,`M0 44L${x} ${17-Math.abs(x)/8}`);}
    return true;
  }
  if (/ fan/i.test(` ${label}`)) {
    const count=companion?5:8;
    for(let i=0;i<count;i+=1){const angle=-64+i*(128/(count-1)); path(group,`M0 38Q-9-4 0-58Q11-5 0 38Z`,i%2?"acc-accent":"acc-main").setAttribute("transform",`rotate(${angle})`);}
    dot(group,0,38,8,"acc-dark"); return true;
  }
  if (/umbrella/i.test(label)) {
    path(group, companion ? "M-52 1Q0-47 52 1Q28-11 0 4Q-28-11-52 1Z" : "M-70 3Q0-64 70 3Q37-15 0 6Q-37-15-70 3Z", "acc-soft");
    line(group, companion ? "M0 3V53Q0 71-18 62" : "M0 5V72Q0 96-25 83", "acc-line thick");
    if(!companion) [-45,-22,0,22,45].forEach(x=>line(group,`M0-49L${x} 0`)); return true;
  }
  if (/stilts/i.test(label)) {
    if(companion){[-30,30].forEach(x=>{path(group,`M${x-18} 19Q${x} 4 ${x+18} 19L${x+13} 36H${x-13}Z`); line(group,`M${x-9} 25L${x-16} 70 M${x+9} 25L${x+16} 70`,`acc-line thick`);});}
    else {[-31,31].forEach(x=>{line(group,`M${x}-44Q${x-12} 10 ${x-8} 76 M${x}-7L${x-25} 18 M${x+1} 12L${x+23} 34`,`acc-line thick`);});}
    return true;
  }
  if (/skates|snowshoes|crampons/i.test(label)) {
    const snow=/snowshoes/i.test(label), spikes=/crampons/i.test(label);
    const offsets = companion ? [-27, 27] : [-32, 32];
    offsets.forEach(x=>{
      if (snow) {
        path(group, companion
          ? `M${x-18}-34Q${x} -49 ${x+18}-34L${x+16} 29Q${x} 44 ${x-16} 29Z`
          : `M${x-25}-46Q${x} -66 ${x+25}-46V43Q${x} 63 ${x-25} 43Z`, "acc-main");
        line(group, companion
          ? `M${x-13}-23L${x+13} 20 M${x+12}-22L${x-12} 21`
          : `M${x-19}-34L${x+19} 31 M${x+19}-34L${x-19} 31 M${x-23}-2H${x+23}`);
      } else {
        path(group, companion
          ? `M${x-19}-15Q${x} -26 ${x+19}-14L${x+14} 17Q${x} 27 ${x-15} 16Z`
          : `M${x-26}-22Q${x} -37 ${x+26}-21L${x+20} 26Q${x} 41 ${x-21} 25Z`, "acc-main");
        const spikeOffsets = companion ? [-10, 10] : [-15, 0, 15];
        spikeOffsets.forEach(dx=>path(group, companion
          ? `M${x+dx-3} 16L${x+dx} 31L${x+dx+3} 16Z`
          : `M${x+dx-5} 24L${x+dx} 45L${x+dx+5} 24Z`, "acc-dark"));
        line(group, companion ? `M${x-14}-2L${x+14} 9` : `M${x-20}-7L${x+20} 11 M${x-19} 7L${x+18} 21`, "acc-accent-line");
      }
    }); return true;
  }
  if (/pennant|streamer wand/i.test(label)) {
    line(group, companion ? "M-38 55L-18-57" : "M-52 73L-25-76", "acc-line thick");
    if(companion) path(group,"M-19-53Q22-34 45-47L34-6Q10-19-25-11Z","acc-accent");
    else {path(group,"M-25-72Q24-47 58-65L42-14Q12-28-33-16Z","acc-accent"); [-8,12,32].forEach((x,i)=>{dot(group,x,-29+i*5,4,"acc-soft"); line(group,`M${x}-24Q${x+8} 4 ${x-2} 38`);});}
    return true;
  }
  if (/claws/i.test(label)) {
    const count=companion?3:5;
    for(let i=0;i<count;i+=1){const x=(i-(count-1)/2)*18; path(group,`M${x-7} 31Q${x-13}-18 ${x+2}-52Q${x+14}-9 ${x+7} 31Z`,i%2?"acc-accent":"acc-main");}
    return true;
  }
  if (/waterwheel/i.test(label)) {
    dot(group,0,0,companion?36:48,"acc-soft"); dot(group,0,0,companion?10:13,"acc-dark");
    const count=companion?6:8; for(let i=0;i<count;i+=1){const a=i*360/count; add(group,"rect",{class:i%2?"acc-accent":"acc-main",x:-7,y:companion?-55:-70,width:14,height:companion?25:32,rx:3,transform:`rotate(${a})`}); line(group,`M0 0V${companion?-37:-50}`).setAttribute("transform",`rotate(${a})`);} return true;
  }
  if (/carousel/i.test(label)) {
    dot(group,0,0,companion?34:45,"acc-soft"); const count=companion?3:6; for(let i=0;i<count;i+=1){const a=i*Math.PI*2/count; dot(group,Math.cos(a)*(companion?32:43),Math.sin(a)*(companion?32:43),companion?8:10,i%2?"acc-accent":"acc-main");} return true;
  }
  if (/fruit capsule/i.test(label)) {
    path(group, companion ? "M0-48Q35-23 29 15Q22 45 0 55Q-22 45-29 15Q-35-23 0-48Z" : "M0-64Q47-31 39 20Q29 60 0 73Q-29 60-39 20Q-47-31 0-64Z", "acc-soft");
    line(group, companion ? "M0-43V49 M-22-6H22" : "M0-58V66 M-30-8H30 M-25 23H25"); return true;
  }
  return false;
}

function drawRepeatedFamilyAccessory(group, item, companion) {
  const label=item.label;
  switch(item.family) {
    case "bellows-instrument":
      path(group, companion ? "M-47-31H47V31H-47Z" : "M-61-40H61V40H-61Z");
      for(let x=companion?-32:-45;x<=(companion?32:45);x+=13) line(group,`M${x} ${companion?-29:-38}V${companion?29:38}`);
      [-56,56].forEach(x=>dot(group,x,0,6,"acc-soft"));
      return true;
    case "bonnet":
      if(/pond-disc/i.test(label)) {
        add(group,"ellipse",{class:"acc-main",cx:0,cy:3,rx:companion?47:62,ry:companion?25:33});
        add(group,"ellipse",{class:"acc-soft",cx:0,cy:-3,rx:companion?28:36,ry:companion?17:21});
        line(group, companion?"M-33 8Q0 27 35 7":"M-45 9Q0 36 47 8");
      } else {
        path(group, companion ? "M0-49Q-51-29-38 13Q-16 48 0 25Q17 48 39 12Q51-29 0-49Z" : "M0-65Q-68-39-51 17Q-21 64 0 33Q23 64 52 16Q68-39 0-65Z");
        line(group, companion?"M0-44V30 M-34 9Q0-2 35 8":"M0-58V40 M-47 12Q0-3 48 11");
      }
      return true;
    case "bowed-strings":
      if(/tower/i.test(label)) {
        path(group, companion?"M-15 30Q-31 3-13-12L0-58L13-12Q31 3 15 30Q0 45-15 30Z":"M-20 42Q-41 4-17-17L0-78L18-17Q41 4 20 42Q0 62-20 42Z");
        line(group, companion?"M0-55V68 M-7-38L-7 52 M7-38L7 52":"M0-76V91 M-9-54L-9 68 M9-54L9 68");
      } else {
        path(group, companion?"M-45 17Q-24-17 0-5Q25-18 45 16Q19 31 0 22Q-21 32-45 17Z":"M-60 22Q-32-24 0-7Q33-24 60 21Q25 43 0 30Q-28 44-60 22Z");
        line(group,companion?"M-37 11H68 M-28 3H59":"M-50 14H90 M-38 4H78"); path(group,companion?"M65-8L83 0L65 8Z":"M86-11L110 0L86 11Z","acc-accent");
      }
      return true;
    case "cape":
      if(/eucalyptus/i.test(label)) {
        for(let i=0;i<(companion?4:7);i+=1){const x=(i-(companion?1.5:3))*14; path(group,`M${x}-37Q${x-18} 6 ${x+3} 55Q${x+23} 5 ${x}-37Z`,i%2?"acc-accent":"acc-main");}
      } else {
        path(group, companion?"M-45-35Q0-54 45-33L36 42L23 31L11 48L0 34L-12 49L-25 31L-37 43Z":"M-59-45Q0-71 59-43L47 55L31 41L15 64L0 44L-16 65L-33 40L-49 56Z");
        [-25,0,25].forEach(x=>path(group,`M${x}-8Q${x-9} 8 ${x} 19Q${x+9} 8 ${x}-8Z`,`acc-soft`));
      }
      return true;
    case "casque":
      if(/mollusk/i.test(label)) {
        path(group, companion?"M-46 24Q-52-24-7-43Q36-55 49-17Q58 16 21 29Q-19 43-46 24Z":"M-61 32Q-70-32-9-58Q48-73 65-23Q78 21 28 39Q-26 57-61 32Z");
        line(group, companion?"M-28 16Q-33-15-5-25Q23-30 31-8Q36 12 14 17Q-8 22-13 5Q-16-8-2-12Q11-14 15-4":"M-38 22Q-45-20-7-34Q31-40 42-11Q49 16 19 24Q-11 30-18 7Q-22-11-3-16Q15-19 20-5");
      } else {
        path(group, companion?"M-52 24L-39-20L-9-43L19-36L48-2L43 27Z":"M-68 31L-51-27L-12-57L25-48L64-3L57 36Z");
        line(group,companion?"M-39-19L-8-4L19-35 M-8-4L43 25":"M-51-26L-11-5L25-47 M-11-5L57 34");
      }
      return true;
    case "compass":
      if(/island/i.test(label)) {
        dot(group,0,0,companion?43:56,"acc-main");
        [-22,0,23].slice(0,companion?2:3).forEach((x,i)=>path(group,`M${x-12} ${i*6}Q${x} ${-15+i*5} ${x+12} ${i*6}Q${x} ${16+i*3} ${x-12} ${i*6}Z`,`acc-soft`));
        path(group,"M0-35L8-8L34 0L8 8L0 35L-8 8L-34 0L-8-8Z","acc-accent");
      } else {
        path(group, companion?"M-49 29Q-38-37 0-48Q38-37 49 29Q0 50-49 29Z":"M-65 38Q-51-49 0-64Q51-49 65 38Q0 67-65 38Z");
        line(group,companion?"M-37 24Q0-12 37 24 M0-39V35":"M-50 31Q0-16 50 31 M0-53V46");
      }
      return true;
    case "fan":
      if(/fern/i.test(label)) {
        const count=companion?3:5; for(let i=0;i<count;i+=1){const a=-45+i*(90/(count-1)); line(group,"M0 43Q-10-5 0-60","acc-line thick").setAttribute("transform",`rotate(${a})`); for(let y=-38;y<=15;y+=15){path(group,`M0 ${y}q-17-13-22 2Q-10 ${y+10} 0 ${y} M0 ${y}q17-13 22 2Q10 ${y+10} 0 ${y}`,"acc-accent-line").setAttribute("transform",`rotate(${a})`);}}
      } else {
        const heights=companion?[28,47,37,61,42]:[36,61,48,79,58,69,43]; let x=-(heights.length-1)*8; heights.forEach((h,i)=>{path(group,`M${x+i*16} 35V${35-h}H${x+12+i*16}V35Z`,i%2?"acc-accent":"acc-main");}); line(group,`M${x-5} 35Q0 56 ${-x+16} 35`);
      }
      return true;
    case "flute-piccolo":
      if(/irrigation/i.test(label)) {
        line(group,companion?"M-54 30H8V-21H54":"M-72 39H12V-28H72","acc-line thick"); [-35,-15,5,26].slice(0,companion?3:4).forEach((x,i)=>dot(group,x,30-i*0,4,"acc-soft"));
      } else {
        const count=companion?2:4; for(let i=0;i<count;i+=1){const y=(i-(count-1)/2)*13; line(group,`M-58 ${y}L58 ${y-18}`,"acc-line thick"); [-27,0,27].forEach(x=>dot(group,x,y-9-x*.15,3,"acc-soft"));}
      }
      return true;
    case "glider":
      if(/caldera/i.test(label)) {
        add(group,"ellipse",{class:"acc-main",cx:0,cy:0,rx:companion?56:73,ry:companion?34:44}); add(group,"ellipse",{class:"acc-soft",cx:0,cy:0,rx:companion?33:46,ry:companion?18:25});
        path(group,companion?"M-52-4Q0-38 52-4L38 24Q0 6-38 24Z":"M-68-5Q0-50 68-5L49 32Q0 8-49 32Z","acc-accent");
      } else {
        const count=companion?5:8; for(let i=0;i<count;i+=1){const a=-74+i*(148/(count-1)); path(group,"M0 43Q-15-2 0-67Q16-4 0 43Z",i%2?"acc-accent":"acc-main").setAttribute("transform",`rotate(${a})`);}
      }
      return true;
    case "monocle":
      if(/cove/i.test(label)) {
        dot(group,0,0,companion?38:50,"acc-soft"); [-17,5,24].slice(0,companion?2:3).forEach((x,i)=>path(group,`M${x-11} ${i*5}Q${x} ${-10+i*3} ${x+11} ${i*5}Q${x} ${14+i*2} ${x-11} ${i*5}Z`,`acc-main`)); line(group,companion?"M30 24L54 61":"M39 31L72 81","acc-line thick");
      } else {
        path(group,companion?"M-51 3Q0-31 51 3Q0 37-51 3Z":"M-67 4Q0-42 67 4Q0 50-67 4Z","acc-soft"); for(let i=-2;i<=2;i+=1) line(group,`M${i*13} 12V${-8-Math.abs(i)*3}`); line(group,companion?"M42 13L63 50":"M55 17L84 67","acc-line thick");
      }
      return true;
    case "skates":
      if(/backwater/i.test(label)) {
        [-28,28].forEach(x=>{path(group,`M${x-17}-31Q${x} -43 ${x+17}-30L${x+12} 31H${x-13}Z`); line(group,`M${x-18} 36Q${x} ${companion?44:51} ${x+18} 36`,`acc-line thick`);});
      } else {
        [-29,29].forEach((x,j)=>{path(group,`M${x-22}-25L${x+20}-17L${x+16} 18L${x-18} 25Z`); const wheels=companion?2:3; for(let i=0;i<wheels;i+=1) dot(group,x-13+i*(26/(wheels-1)),31,6,j?"acc-accent":"acc-dark");});
      }
      return true;
    case "skirt":
      if(/crater/i.test(label)) {
        add(group,"ellipse",{class:"acc-soft",cx:0,cy:5,rx:companion?47:61,ry:companion?28:36}); add(group,"ellipse",{class:"acc-main",cx:0,cy:5,rx:companion?29:39,ry:companion?16:21}); line(group,"M0-35V35");
      } else {
        const count=companion?3:5; for(let i=0;i<count;i+=1){add(group,"ellipse",{class:i%2?"acc-accent":"acc-main",cx:0,cy:-22+i*(companion?22:19),rx:(companion?25:31)+i*(companion?9:11),ry:10});} line(group,companion?"M0-43V51":"M0-57V65");
      }
      return true;
    case "snorkel":
      if(/lake-reed/i.test(label)) {
        line(group,companion?"M-14 52V-51H17":"M-19 69V-68H23","acc-line thick"); dot(group,18,14,companion?22:29,"acc-soft"); line(group,"M-3 14H39");
      } else {
        line(group,companion?"M-24 51Q-11 13-17-47H28V-25H3":"M-32 68Q-15 18-23-63H38V-33H4","acc-line thick"); path(group,companion?"M-41 12Q0-18 41 12Q0 38-41 12Z":"M-55 16Q0-25 55 16Q0 51-55 16Z","acc-soft");
      }
      return true;
    case "stilts":
      if(/mangrove/i.test(label)) {
        const offsets = companion ? [-24, 24] : [-29, 29];
        offsets.forEach(x=>line(group, companion
          ? `M${x}-39V43 M${x} 5L${x-19} 62 M${x} 14L${x+18} 64`
          : `M${x}-53V54 M${x}-4L${x-27} 77 M${x+1} 9L${x+29} 79 M${x} 24L${x-10} 82`, "acc-line thick"));
      } else {
        const offsets = companion ? [-27, 27] : [-33, 33];
        offsets.forEach(x=>{
          path(group, companion
            ? `M${x-22} 10Q${x} -9 ${x+22} 10L${x+16} 27H${x-16}Z`
            : `M${x-31} 14Q${x} -17 ${x+31} 14L${x+23} 36H${x-23}Z`);
          line(group, companion
            ? `M${x-12} 24L${x-19} 62 M${x+12} 24L${x+19} 62`
            : `M${x-19} 32L${x-29} 79 M${x+19} 32L${x+29} 79 M${x} 35V72`, "acc-line thick");
        });
      }
      return true;
    case "sunglasses":
      if(/confluence/i.test(label)) {
        path(group, companion ? "M-48-14Q-25-26-3-7Q-14 22-37 18Q-53 9-48-14Z" : "M-65-21Q-33-38-5-10Q-20 34-52 29Q-73 15-65-21Z", "acc-dark");
        path(group, companion ? "M3-7Q25-26 48-14Q53 9 37 18Q14 22 3-7Z" : "M5-10Q33-38 65-21Q73 15 52 29Q20 34 5-10Z", "acc-soft");
        line(group, companion ? "M-3-7H3 M-37 0L-11 11 M37 0L11 11" : "M-5-10H5 M-49 1L-14 18 M49 1L14 18 M-56 13Q-37 30-18 17 M18 17Q37 30 56 13");
      } else {
        path(group, companion
          ? "M-53-7L-26-28L-3-7L-18 18L-44 15Z M3-7L26-28L53-7L44 15L18 18Z"
          : "M-71-11L-34-43L-5-11L-24 29L-59 24Z M5-11L34-43L71-11L59 24L24 29Z", "acc-dark");
        line(group, companion
          ? "M-3-7H3 M-43 3L-26-17 M43 3L26-17"
          : "M-5-11H5 M-57 5L-34-25 M57 5L34-25 M-45-3L-24 20 M45-3L24 20", "acc-accent-line");
      }
      return true;
    case "telescope":
      if(/snowline/i.test(label)) {
        path(group,companion?"M-55 14L44-22L52-4L-47 32Z":"M-73 18L58-29L68-6L-63 42Z"); for(let x=-28;x<=29;x+=19) line(group,`M${x} ${8-x*.35}L${x+5} ${22-x*.35}`); line(group,"M0 10L-25 70 M0 10L28 70 M-25 70H28");
      } else {
        path(group,companion?"M-43 4L18-19L27-2L-34 21Z":"M-57 5L24-25L36-3L-45 28Z"); line(group,companion?"M-5 10L28 38L58 22 M28 38L9 68 M28 38L49 67":"M-7 13L38 51L78 29 M38 51L12 91 M38 51L66 89","acc-line thick");
      }
      return true;
    case "umbrella":
      if(/pōhutukawa/i.test(label)) {
        const petals=companion?7:11; for(let i=0;i<petals;i+=1){const a=i*360/petals; add(group,"ellipse",{class:i%2?"acc-accent":"acc-main",cx:0,cy:companion?-35:-47,rx:10,ry:companion?22:29,transform:`rotate(${a})`});} dot(group,0,0,companion?20:27,"acc-soft"); line(group,companion?"M0 0V67Q0 79-15 73":"M0 0V88Q0 105-21 97","acc-line thick");
      } else {
        path(group,companion?"M0-60Q43-27 49 8Q21-5 0 11Q-21-5-49 8Q-43-27 0-60Z":"M0-80Q57-36 65 10Q28-7 0 15Q-28-7-65 10Q-57-36 0-80Z","acc-soft"); line(group,companion?"M0-55V67Q0 81-18 72":"M0-73V90Q0 108-24 97","acc-line thick");
      }
      return true;
    case "waders":
      if(/mudflat/i.test(label)) {
        path(group,companion?"M-43-48H43L35 8L25 67H1L0 16L-2 67H-27L-36 8Z":"M-56-63H56L46 10L33 89H1L0 22L-3 89H-36L-47 10Z"); line(group,"M-34-25H34 M0-46V16");
      } else {
        path(group,companion?"M-47-25H47L35 16L26 62H2L0 20L-2 62H-27L-36 16Z":"M-62-33H62L46 21L34 82H2L0 27L-3 82H-36L-48 21Z"); path(group,companion?"M-43-21Q0 0 43-21L35 14Q0-2-35 14Z":"M-57-28Q0 0 57-28L46 18Q0-2-46 18Z","acc-accent");
      }
      return true;
    case "wig":
      if(/banksia/i.test(label)) {
        const count=companion?11:17; for(let i=0;i<count;i+=1){const a=i*360/count; path(group,"M0-24L-7-68L0-82L7-68Z",i%2?"acc-accent":"acc-main").setAttribute("transform",`rotate(${a})`);} dot(group,0,0,companion?31:42,"acc-soft");
      } else {
        const count=companion?5:8; for(let i=0;i<count;i+=1){const x=(i-(count-1)/2)*14; line(group,`M${x} 29Q${x-25} -4 ${x+3} -26Q${x+26} -50 ${x+8} -72`,`acc-line thick`);} dot(group,0,25,companion?26:35,"acc-soft");
      }
      return true;
    case "wings":
      if(/harbour-sail/i.test(label)) {
        path(group,companion?"M-5 9L-62-45L-56 20Z M5 9L61-36L56 25Z":"M-7 12L-82-61L-74 28Z M7 12L81-49L74 34Z","acc-soft"); line(group,companion?"M-56-41L-5 9L-56 18 M60-33L5 9L55 22":"M-76-57L-7 12L-74 25 M79-46L7 12L73 31");
      } else {
        path(group,companion?"M-7 4Q-49-37-61-10Q-44 18-7 13Z M7 4Q49-37 61-10Q44 18 7 13Z":"M-9 3Q-65-60-80-24Q-59 16-9 16Z M9 3Q65-60 80-24Q59 16 9 16Z","acc-soft"); const veins=companion?[[-53,-10,-8,8],[53,-10,8,8]]:[[-70,-23,-9,10],[70,-23,9,10],[-54,4,-8,13],[54,4,8,13]]; veins.forEach(([x1,y1,x2,y2])=>line(group,`M${x1} ${y1}L${x2} ${y2}`));
      }
      return true;
    default: return false;
  }
}

function drawUniqueNamedAccessory(group, item, companion) {
  switch (item.family) {
    case "fig-fascinator": {
      const halves = companion ? [[-14, -18, -18], [13, -13, 14]] : [[-22, -24, -24], [0, -33, 2], [23, -19, 23]];
      halves.forEach(([x, y, angle], index) => {
        path(group, `M${x} ${y - 22}Q${x - 20} ${y - 3} ${x} ${y + 19}Q${x + 20} ${y - 3} ${x} ${y - 22}Z`, index % 2 ? "acc-accent" : "acc-main").setAttribute("transform", `rotate(${angle} ${x} ${y})`);
        line(group, `M${x} ${y - 16}V${y + 13}`);
      });
      path(group, companion ? "M-39 8Q0-9 39 8L29 21Q0 9-29 21Z" : "M-52 10Q0-14 52 9L39 28Q0 12-39 28Z", "acc-soft");
      return true;
    }
    case "shade-visor":
      path(group, companion ? "M-54-10Q-8-39 48-16L57 1Q5-8-48 13Z" : "M-72-13Q-10-53 64-21L76 1Q7-10-64 18Z", "acc-main");
      [0, 1, 2].slice(0, companion ? 2 : 3).forEach(index => line(group, companion ? `M${-42 + index * 34} ${-10 - index * 4}L${-33 + index * 37} ${7 - index * 3}` : `M${-56 + index * 44} ${-14 - index * 5}L${-44 + index * 48} ${9 - index * 4}`));
      line(group, companion ? "M-46-8L-61-28 M47-14L58-31" : "M-61-11L-81-38 M62-19L78-42", "acc-accent-line");
      return true;
    case "boulder-spectacles":
      path(group, companion ? "M-58-8L-38-29L-8-20L-3 9L-25 27L-53 19Z" : "M-73-10L-49-39L-11-27L-4 12L-31 35L-67 25Z", "acc-dark");
      path(group, companion ? "M5-19L35-31L59-9L51 22L21 28L2 8Z" : "M7-26L46-41L76-12L66 29L27 37L3 11Z", "acc-soft");
      line(group, companion ? "M-4-5L5-7 M-51 4L-70-2 M52 3L70-6" : "M-5-7L7-9 M-66 5L-91-3 M67 4L91-8", "acc-line thick");
      return true;
    case "coconut-cloche":
      path(group, companion ? "M-48 19Q-45-33 0-48Q46-32 48 19Q0 3-48 19Z" : "M-64 25Q-60-45 0-64Q61-43 64 25Q0 4-64 25Z");
      [-2, -1, 0, 1, 2].slice(companion ? 1 : 0, companion ? 4 : 5).forEach(index => line(group, companion ? `M${index * 15} 10Q${index * 11} -22 ${index * 6} -43` : `M${index * 19} 13Q${index * 14} -30 ${index * 8} -58`));
      path(group, companion ? "M-52 16Q0 35 53 15" : "M-69 21Q0 47 70 20", "acc-accent-line");
      return true;
    case "fruit-sampling-tool":
      line(group, companion ? "M-52 48L-4-13L45-45 M-4-13L56 35" : "M-69 64L-5-18L59-60 M-5-18L75 47", "acc-line thick");
      path(group, companion ? "M35-50Q51-67 65-48Q68-25 48-18Q29-29 35-50Z" : "M46-67Q67-89 86-64Q91-33 64-24Q38-39 46-67Z", "acc-main");
      path(group, companion ? "M-56 42L-66 58L-48 63L-39 49Z" : "M-74 56L-88 77L-64 84L-52 65Z", "acc-accent");
      return true;
    case "obsidian-goggles":
      path(group, companion ? "M-61-13L-28-35L-3-13L-18 18L-49 20Z M3-13L29-35L61-13L49 20L18 18Z" : "M-80-17L-37-47L-4-17L-24 24L-65 27Z M4-17L38-47L80-17L65 27L24 24Z", "acc-dark");
      line(group, companion ? "M-3-13H3 M-46 3L-27-21 M46 3L28-21" : "M-4-17H4 M-60 4L-36-28 M60 4L37-28", "acc-accent-line");
      [companion ? -38 : -50, companion ? 38 : 50].forEach((x, index) => path(group, `M${x - 8}-11L${x + 4}-22L${x + 9}-4L${x - 3} 9Z`, index ? "acc-soft" : "acc-main"));
      return true;
    case "broom-plume": {
      line(group, companion ? "M-39 55Q-5 7 18-55" : "M-53 73Q-7 9 24-74", "acc-line thick");
      const count = companion ? 5 : 8;
      for (let index = 0; index < count; index += 1) {
        const y = (companion ? -42 : -57) + index * (companion ? 12 : 14);
        path(group, companion ? `M${12 - index * 2} ${y}Q${35 + index * 2} ${y - 14} ${47 + index} ${y - 2}Q${30 + index} ${y + 6} ${12 - index * 2} ${y}Z` : `M${16 - index * 2} ${y}Q${47 + index * 2} ${y - 19} ${63 + index} ${y - 3}Q${40 + index} ${y + 8} ${16 - index * 2} ${y}Z`, index % 2 ? "acc-accent" : "acc-main");
      }
      return true;
    }
    case "canyon-crest":
      path(group, companion ? "M-50 19L-39-8L-22 2L-9-45L7-12L22-36L34-3L51 19Q0 6-50 19Z" : "M-66 25L-52-11L-29 3L-12-60L9-16L29-48L45-4L68 25Q0 8-66 25Z");
      line(group, companion ? "M-42 13L-8-32L8-5L23-25L43 14" : "M-56 18L-11-43L11-7L31-34L58 19", "acc-accent-line");
      return true;
    case "waterfall-scarf":
      path(group, companion ? "M-42-28Q0-46 42-26L34-5Q0-21-34-3Z" : "M-55-37Q0-61 55-34L45-7Q0-28-45-4Z", "acc-main");
      path(group, companion ? "M17-13Q55 10 28 55L7 44Q32 14 17-13Z M-10-11Q-43 21-20 63L0 49Q-22 18-10-11Z" : "M22-17Q73 14 37 73L9 58Q43 19 22-17Z M-13-15Q-57 28-27 84L0 65Q-29 24-13-15Z", "acc-soft");
      [companion ? -19 : -26, companion ? 25 : 34].forEach((x, index) => dot(group, x, companion ? 68 - index * 8 : 91 - index * 11, companion ? 5 : 7, "acc-accent"));
      return true;
    case "fern-abseil-reel":
      dot(group, 0, 0, companion ? 39 : 52, "acc-main");
      path(group, companion ? "M0-30Q25-21 17 2Q9 20-10 12Q-23 5-14-9Q-7-19 4-12Q11-6 5 2" : "M0-41Q34-28 23 3Q12 27-13 16Q-31 7-19-12Q-9-26 6-16Q15-8 7 3", "acc-accent-line");
      line(group, companion ? "M35 20L63 55Q71 67 57 76" : "M47 27L84 73Q95 89 76 101", "acc-line thick");
      path(group, companion ? "M54 69Q65 87 80 70" : "M72 92Q87 116 107 93", "acc-dark");
      return true;
    case "scoria-bowler":
      add(group, "ellipse", { class: "acc-soft", cx: 0, cy: companion ? 15 : 20, rx: companion ? 56 : 74, ry: companion ? 17 : 23 });
      path(group, companion ? "M-38 13Q-36-39 0-48Q37-39 38 13Z" : "M-50 17Q-48-52 0-64Q49-52 50 17Z", "acc-main");
      [[-19,-15],[7,-26],[22,-6],[-3,2]].slice(0, companion ? 3 : 4).forEach(([x,y], index) => dot(group, companion ? x * .8 : x, companion ? y * .8 : y, companion ? 4 : 6, index % 2 ? "acc-dark" : "acc-accent"));
      return true;
    case "araucaria-halo": {
      const radius = companion ? 43 : 58;
      add(group, "ellipse", { class: "acc-line", cx: 0, cy: 0, rx: radius, ry: companion ? 24 : 32 });
      const count = companion ? 8 : 12;
      for (let index = 0; index < count; index += 1) {
        const angle = index * Math.PI * 2 / count;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * (companion ? 24 : 32);
        path(group, `M${x.toFixed(1)} ${(y - (companion ? 8 : 11)).toFixed(1)}L${(x - (companion ? 7 : 9)).toFixed(1)} ${(y + (companion ? 7 : 9)).toFixed(1)}L${(x + (companion ? 7 : 9)).toFixed(1)} ${(y + (companion ? 7 : 9)).toFixed(1)}Z`, index % 2 ? "acc-accent" : "acc-main");
      }
      return true;
    }
    case "volcano-lake-diving-bell":
      path(group, companion ? "M-42 37V-10Q0-49 42-8V37Z" : "M-56 50V-14Q0-66 56-11V50Z", "acc-main");
      dot(group, 0, companion ? -4 : -6, companion ? 20 : 27, "acc-soft");
      dot(group, 0, companion ? -4 : -6, companion ? 12 : 17, "acc-dark");
      path(group, companion ? "M-48 36H48L37 55H-37Z" : "M-64 49H64L49 73H-49Z", "acc-accent");
      line(group, companion ? "M-30 18L-39 42 M30 18L39 42" : "M-40 24L-52 56 M40 24L52 56");
      return true;
    case "coconut-rain-hood":
      path(group, companion ? "M-46 24Q-54-31 0-56Q54-31 46 24L28 35Q0 15-28 35Z" : "M-61 32Q-72-42 0-75Q72-42 61 32L37 47Q0 20-37 47Z", "acc-main");
      line(group, companion ? "M0-52V17 M-33-17Q0-1 33-17" : "M0-70V23 M-44-23Q0-1 44-23");
      [-1, 1].forEach(side => path(group, companion ? `M${side * 35}-13Q${side * 55} 5 ${side * 42} 28` : `M${side * 47}-18Q${side * 73} 7 ${side * 56} 38`, "acc-accent-line"));
      return true;
    case "palm-bustle": {
      const count = companion ? 5 : 8;
      for (let index = 0; index < count; index += 1) {
        const angle = -70 + index * (140 / (count - 1));
        path(group, companion ? "M0 26Q-12-7 0-58Q13-8 0 26Z" : "M0 35Q-16-9 0-77Q17-10 0 35Z", index % 2 ? "acc-accent" : "acc-main").setAttribute("transform", `rotate(${angle})`);
        line(group, companion ? "M0 24V-49" : "M0 33V-65").setAttribute("transform", `rotate(${angle})`);
      }
      path(group, companion ? "M-31 26Q0 45 31 26L23 40Q0 58-23 40Z" : "M-41 35Q0 60 41 35L31 53Q0 78-31 53Z", "acc-soft");
      return true;
    }
    case "reef-mask":
      path(group, companion ? "M-51-13Q-26-38-3-10Q-15 21-40 20Q-56 10-51-13Z M3-10Q26-38 51-13Q56 10 40 20Q15 21 3-10Z" : "M-68-17Q-35-51-4-13Q-20 28-53 27Q-75 14-68-17Z M4-13Q35-51 68-17Q75 14 53 27Q20 28 4-13Z", "acc-soft");
      path(group, companion ? "M-4-8H4L18 28L0 42L-18 28Z" : "M-5-11H5L24 37L0 56L-24 37Z", "acc-accent");
      [companion ? -45 : -60, companion ? 45 : 60].forEach((x, index) => path(group, `M${x} 10q${index ? 14 : -14} 14 0 28`, "acc-main"));
      return true;
    case "seagrass-tail": {
      const blades = companion ? 4 : 7;
      for (let index = 0; index < blades; index += 1) {
        const x = (index - (blades - 1) / 2) * (companion ? 11 : 13);
        const sway = index % 2 ? 30 : -28;
        path(group, companion ? `M${x - 4}-31Q${x + sway} 10 ${x + sway * .4} 65Q${x + 4} 28 ${x + 4}-31Z` : `M${x - 5}-42Q${x + sway * 1.35} 14 ${x + sway * .55} 87Q${x + 5} 37 ${x + 5}-42Z`, index % 2 ? "acc-accent" : "acc-main");
      }
      return true;
    }
    case "le-morne-pauldron":
      path(group, companion ? "M-57 19L-35-21L-9-49L14-23L35-40L57 8L43 32L9 21L-17 35L-44 30Z" : "M-76 25L-47-28L-12-65L19-31L47-53L76 11L58 43L12 28L-23 47L-59 40Z", "acc-main");
      line(group, companion ? "M-47 16L-9-36L12-14L34-30L47 12 M-16 28L-33 53" : "M-63 21L-12-48L16-19L45-40L63 16 M-22 38L-44 71", "acc-accent-line");
      return true;
    case "lagoon-wind-vane":
      line(group, companion ? "M0-55V59" : "M0-74V79", "acc-line thick");
      path(group, companion ? "M-55-31H43L65-17L43-3H-55L-38-17Z" : "M-74-42H57L87-23L57-4H-74L-51-23Z", "acc-main");
      path(group, companion ? "M-34 27Q-10 10 15 27Q38 44 58 24Q36 55 8 42Q-18 29-34 45Z" : "M-45 36Q-13 13 20 36Q51 59 78 32Q48 74 11 56Q-24 39-45 60Z", "acc-soft");
      return true;
    case "cane-ankle-bells":
      [-1, 1].forEach(side => {
        path(group, companion ? `M${side * 35}-25Q${side * 18}-10 ${side * 37} 8Q${side * 56}-10 ${side * 35}-25Z` : `M${side * 47}-33Q${side * 24}-13 ${side * 49} 11Q${side * 75}-13 ${side * 47}-33Z`, "acc-main");
        const count = companion ? 3 : 5;
        for (let index = 0; index < count; index += 1) dot(group, side * (companion ? 24 : 32) + (index - (count - 1) / 2) * (companion ? 8 : 10), companion ? 18 + Math.abs(index - 1) * 3 : 25 + Math.abs(index - 2) * 3, companion ? 5 : 7, index % 2 ? "acc-accent" : "acc-soft");
      });
      return true;
    case "salt-crystal-jacket":
      path(group, companion ? "M-46-39L-15-51L0-22L16-51L47-37L38 50L0 35L-39 52Z" : "M-61-52L-20-68L0-29L21-68L63-49L50 67L0 47L-52 69Z", "acc-main");
      [[-26,-5],[-12,23],[18,-9],[29,25],[0,4]].slice(0, companion ? 4 : 5).forEach(([x,y], index) => path(group, companion ? `M${x} ${y - 12}L${x + 9} ${y}L${x} ${y + 15}L${x - 9} ${y}Z` : `M${x} ${y - 16}L${x + 12} ${y}L${x} ${y + 20}L${x - 12} ${y}Z`, index % 2 ? "acc-accent" : "acc-soft"));
      line(group, companion ? "M0-21V39" : "M0-28V52");
      return true;
    case "caldera-headband":
      path(group, companion ? "M-54 9Q0-44 54 9L45 22Q0-21-45 22Z" : "M-72 12Q0-59 72 12L60 30Q0-28-60 30Z", "acc-main");
      add(group, "ellipse", { class: "acc-soft", cx: 0, cy: companion ? -17 : -23, rx: companion ? 26 : 35, ry: companion ? 11 : 15 });
      add(group, "ellipse", { class: "acc-dark", cx: 0, cy: companion ? -17 : -23, rx: companion ? 14 : 19, ry: companion ? 5 : 7 });
      return true;
    case "cacao-cuirass":
      path(group, companion ? "M-47-39L-31-52Q0-33 31-52L48-37L35 49Q0 33-36 51Z" : "M-62-52L-41-69Q0-44 42-69L64-49L47 66Q0 44-48 68Z", "acc-main");
      const pods = companion ? [[-19,-9,-18],[17,-7,17],[0,23,0]] : [[-26,-13,-20],[24,-10,19],[-12,29,-10],[15,31,12]];
      pods.forEach(([x,y,angle], index) => {
        add(group, "ellipse", { class: index % 2 ? "acc-accent" : "acc-soft", cx: x, cy: y, rx: companion ? 9 : 12, ry: companion ? 18 : 24, transform: `rotate(${angle} ${x} ${y})` });
        line(group, `M${x} ${y - (companion ? 13 : 18)}V${y + (companion ? 13 : 18)}`);
      });
      return true;
    case "terrace-boots":
      [-1, 1].forEach(side => {
        path(group, companion ? `M${side * 12}-43L${side * 41}-36L${side * 35} 17L${side * 62} 30L${side * 58} 48L${side * 9} 40Z` : `M${side * 16}-58L${side * 55}-48L${side * 47} 23L${side * 83} 40L${side * 77} 64L${side * 12} 53Z`, side < 0 ? "acc-main" : "acc-accent");
        [0, 1, 2].slice(0, companion ? 2 : 3).forEach(index => line(group, companion ? `M${side * (16 + index * 8)} ${-20 + index * 18}L${side * (38 + index * 6)} ${-17 + index * 18}` : `M${side * (22 + index * 10)} ${-27 + index * 24}L${side * (51 + index * 8)} ${-23 + index * 24}`));
      });
      return true;
    case "research-headphones":
      path(group, companion ? "M-50 8Q-41-49 0-55Q42-49 50 8" : "M-67 11Q-55-66 0-74Q56-65 67 11", "acc-line thick");
      [-1, 1].forEach(side => add(group, "rect", { class: side < 0 ? "acc-main" : "acc-accent", x: side < 0 ? (companion ? -58 : -77) : (companion ? 35 : 47), y: companion ? -4 : -5, width: companion ? 23 : 30, height: companion ? 42 : 56, rx: companion ? 9 : 12 }));
      line(group, companion ? "M45 29Q64 38 56 57L43 59" : "M60 39Q85 51 75 76L57 79", "acc-accent-line");
      dot(group, companion ? 40 : 53, companion ? 59 : 79, companion ? 4 : 6, "acc-dark");
      return true;
    case "two-river-yoke":
      path(group, companion ? "M-64-18Q0-37 64-18L59-5Q0-20-59-5Z" : "M-85-24Q0-49 85-24L79-7Q0-27-79-7Z", "acc-main");
      [-1, 1].forEach(side => {
        line(group, companion ? `M${side * 49}-10Q${side * 58} 13 ${side * 46} 32` : `M${side * 65}-14Q${side * 77} 17 ${side * 61} 43`, "acc-line thick");
        path(group, companion ? `M${side * 62} 24Q${side * 85} 44 ${side * 58} 65Q${side * 34} 47 ${side * 62} 24Z` : `M${side * 82} 32Q${side * 112} 59 ${side * 77} 87Q${side * 45} 63 ${side * 82} 32Z`, side < 0 ? "acc-soft" : "acc-accent");
      });
      line(group, companion ? "M-26 2Q-13 24 0 7Q13-10 27 3" : "M-35 3Q-17 32 0 9Q17-14 36 4", "acc-accent-line");
      return true;
    case "fan-palm-collar": {
      const blades = companion ? 5 : 8;
      for (let index = 0; index < blades; index += 1) {
        const angle = (companion ? -58 : -76) + index * ((companion ? 116 : 152) / (blades - 1));
        const length = companion ? 45 + (index % 2) * 8 : 59 + (index % 3) * 9;
        path(group, `M0 16L-10 ${16 - length * .68}L0 ${16 - length}L10 ${16 - length * .68}Z`, index % 2 ? "acc-accent" : "acc-main").setAttribute("transform", `rotate(${angle} 0 16)`);
        line(group, `M0 14V${18 - length}`).setAttribute("transform", `rotate(${angle} 0 16)`);
      }
      path(group, companion ? "M-43 12Q0 34 43 12L35 30Q0 49-35 30Z" : "M-57 16Q0 45 57 16L47 40Q0 65-47 40Z", "acc-soft");
      line(group, companion ? "M-34 18Q0 35 35 18" : "M-46 24Q0 47 47 24", "acc-accent-line");
      return true;
    }
    case "fern-epaulettes":
      [-1, 1].forEach(side => {
        line(group, companion ? `M${side * 7}-29Q${side * 41}-8 ${side * 57} 38` : `M${side * 9}-39Q${side * 55}-11 ${side * 76} 51`, "acc-line thick");
        const count = companion ? 4 : 6;
        for (let index = 0; index < count; index += 1) {
          const x = side * (16 + index * (companion ? 8 : 10));
          const y = -20 + index * (companion ? 11 : 14);
          path(group, companion ? `M${x} ${y}q${side * 17} -13 ${side * 21} 3Q${side * 10} ${y + 12} ${x} ${y}Z` : `M${x} ${y}q${side * 23} -17 ${side * 28} 4Q${side * 13} ${y + 16} ${x} ${y}Z`, index % 2 ? "acc-accent" : "acc-main");
        }
      });
      return true;
    case "canoe-paddle-bow":
      [-1, 1].forEach(side => {
        line(group, companion ? `M${side * 58}-48L${side * 3} 42` : `M${side * 77}-64L${side * 4} 56`, "acc-line thick");
        path(group, companion ? `M${side * 58}-48Q${side * 82}-58 ${side * 78}-30L${side * 49}-21Z` : `M${side * 77}-64Q${side * 109}-78 ${side * 104}-40L${side * 65}-28Z`, side < 0 ? "acc-main" : "acc-accent");
      });
      path(group, companion ? "M-4 35Q0 57 4 35L12 65L0 79L-12 65Z" : "M-5 47Q0 76 5 47L16 87L0 105L-16 87Z", "acc-soft");
      return true;
    case "watershed-swimwear":
      path(group, companion ? "M-43-38Q0-54 43-36L30-5L45 45L14 34L0 11L-15 34L-46 45L-31-5Z" : "M-57-51Q0-72 57-48L40-7L60 60L19 45L0 15L-20 45L-61 60L-41-7Z", "acc-main");
      path(group, companion ? "M-35-11L-10-27L0-9L11-27L35-10Q18 5 0 21Q-18 4-35-11Z" : "M-47-15L-13-36L0-12L15-36L47-13Q24 7 0 28Q-24 5-47-15Z", "acc-soft");
      line(group, companion ? "M-31 5Q-15 22 0 9Q16-4 32 6 M-21 26Q0 42 22 25" : "M-42 7Q-20 30 0 12Q21-6 43 8 M-28 35Q0 56 29 33", "acc-accent-line");
      return true;
    case "paddy-metronome":
      path(group, companion ? "M-38 45L-26-45H27L39 45Z" : "M-51 60L-35-60H36L52 60Z", "acc-main");
      line(group, companion ? "M0-33L19 31 M0-33L-6-4" : "M0-44L25 42 M0-44L-8-5", "acc-line thick");
      dot(group, companion ? 13 : 18, companion ? 10 : 13, companion ? 6 : 8, "acc-accent");
      [-1, 0, 1].slice(0, companion ? 2 : 3).forEach((offset, index) => path(group, companion ? `M${-22 + index * 21} 31Q${-12 + index * 21} 19 ${-2 + index * 21} 31` : `M${-30 + index * 30} 42Q${-15 + index * 30} 25 ${index * 30} 42`, "acc-soft"));
      return true;
    case "hoodoo-helmet":
      path(group, companion ? "M-45 21L-37-17L-20-25L-13-57L0-45L12-72L24-35L39-27L46 21Q0 4-45 21Z" : "M-60 28L-49-23L-27-33L-17-76L0-60L16-96L32-47L52-36L61 28Q0 5-60 28Z", "acc-main");
      path(group, companion ? "M-31-18L-19-47L-5-39L8-60L19-31L35-24" : "M-42-24L-25-63L-7-52L11-80L26-41L47-32", "acc-accent-line");
      line(group, companion ? "M-42 12Q0-3 43 12" : "M-56 16Q0-4 57 16");
      return true;
    case "erosion-crinoline": {
      const hoops = companion ? 4 : 6;
      for (let index = 0; index < hoops; index += 1) {
        add(group, "ellipse", { class: index % 2 ? "acc-accent" : "acc-main", cx: 0, cy: (companion ? -24 : -32) + index * (companion ? 17 : 20), rx: (companion ? 21 : 28) + index * (companion ? 10 : 13), ry: companion ? 8 : 10 });
      }
      [-1, 1].forEach(side => line(group, companion ? `M${side * 13}-31Q${side * 28} 7 ${side * 51} 38` : `M${side * 17}-42Q${side * 37} 9 ${side * 68} 51`, "acc-line thick"));
      path(group, companion ? "M-52 40Q-24 23 0 43Q25 23 53 40" : "M-69 54Q-32 31 0 57Q33 31 70 54", "acc-soft");
      return true;
    }
    case "basalt-cuffs":
      [-1, 1].forEach(side => {
        path(group, companion ? `M${side * 19}-33L${side * 50}-25L${side * 55} 26L${side * 23} 37L${side * 12} 5Z` : `M${side * 25}-44L${side * 67}-34L${side * 73} 35L${side * 31} 50L${side * 16} 7Z`, side < 0 ? "acc-dark" : "acc-main");
        path(group, companion ? `M${side * 26}-19L${side * 44}-14L${side * 46} 15L${side * 29} 21Z` : `M${side * 35}-26L${side * 59}-19L${side * 62} 20L${side * 39} 28Z`, "acc-accent");
      });
      return true;
    default:
      return false;
  }
}

function drawNamedAccessory(group, item, companion) {
  if (drawSanteuilAccessory(group, item, companion)) return true;
  if (drawEdinburghAccessory(group, item, companion)) return true;
  if (drawUniqueNamedAccessory(group, item, companion)) return true;
  if (drawRepeatedFamilyAccessory(group, item, companion)) return true;
  if (drawN2Accessory(group, item, companion)) return true;
  if (drawInstrument(group, item, companion)) return true;
  if (drawSamplingOrFieldTool(group, item, companion)) return true;
  if (drawNaturalOrMotionAccessory(group, item, companion)) return true;
  return false;
}

const layouts = {
  headwear: {
    head: { primary: [330, 48, 1], companion: [111, 99, .62] },
    garment: { primary: [286, 114, .67], companion: [101, 127, .4] },
    prop: { primary: [306, 105, .66], companion: [105, 125, .4] }
  },
  wrap: {
    head: { primary: [252, 104, .72], companion: [87, 126, .43] },
    garment: { primary: [218, 180, .82], companion: [70, 166, .48] },
    prop: { primary: [170, 176, .65], companion: [51, 164, .39] }
  },
  charm: {
    head: { primary: [286, 93, .68], companion: [94, 118, .4] },
    garment: { primary: [168, 198, .66], companion: [49, 178, .39] },
    prop: { primary: [266, 203, .67], companion: [89, 183, .4] }
  }
};

function renderPiece(target, item, wormPart) {
  const companion = wormPart === "companion";
  let [x, y, scale] = layouts[item.slot][item.artKind][wormPart];
  let angleOverride = null;
  const customLayouts = {
    "ngm-agar-plate": { primary: [345, 210, .86, -8], companion: [45, 270, .65, 4] },
    "n2-lab-coat": { primary: [170, 210, 1, 0], companion: [82, 175, 1, 0] },
    "cryo-vial-jetpack": { primary: [278, 143, .9, -3], companion: [31, 155, .72, 5] },
    "hogweed-specimen-lantern": { primary: [327, 133, .66, 3], companion: [61, 126, .58, -4] },
    "santeuil-cylinder-organ": { primary: [183, 191, .59, -2], companion: [86, 208, .52, 2] },
    "couleuvre-dragonfly-automaton": { primary: [304, 235, .61, -2], companion: [76, 266, .5, 3] },
    "midmar-compost-tumbler": { primary: [321, 160, .61, -2], companion: [78, 167, .52, 3] },
    "galaxy-plate-scanner": { primary: [184, 203, .56, -1], companion: [77, 218, .47, 2] },
    "agassiz-ice-flow-model": { primary: [300, 246, .58, -2], companion: [73, 260, .47, 2] }
  };
  const customLayout = customLayouts[item.family]?.[wormPart];
  if (customLayout) [x, y, scale, angleOverride] = customLayout;
  const widthBias = 1 + item.geometry.widthStep * .035;
  const heightBias = 1 + item.geometry.heightStep * .03;
  const angle = angleOverride ?? (companion ? -8 + (item.geometry.pairAttachment % 3) * 3 : -2 + item.geometry.angleStep);
  const useGeometryBias = !customLayout;
  const artworkScaleX = scale * (useGeometryBias ? widthBias : 1);
  const artworkScaleY = scale * (useGeometryBias ? heightBias : 1);
  const piece = add(target, "g", {
    class: `accessory-piece location-accessory-piece ${companion ? "companion-accessory" : "primary-accessory"}`,
    "data-worm-part": wormPart,
    "data-accessory-family": item.family
  });
  const artwork = add(piece, "g", { class: "location-accessory-art", transform: `translate(${x} ${y}) rotate(${angle}) scale(${artworkScaleX.toFixed(3)} ${artworkScaleY.toFixed(3)})` });
  const drewNamedAccessory = drawNamedAccessory(artwork, item, companion);
  if (!drewNamedAccessory) throw new Error(`No named accessory renderer for ${item.label}`);
  return piece;
}

function normalizedArtworkSignature(node, isRoot = true) {
  const rawAttributes = node?.attributes;
  const attributes = rawAttributes && typeof rawAttributes[Symbol.iterator] === "function"
    ? [...rawAttributes].map(attribute => [attribute.name, attribute.value])
    : Object.entries(rawAttributes || {});
  const normalizedAttributes = attributes
    .filter(([name]) => !isRoot || (name !== "class" && name !== "transform" && !name.startsWith("data-")))
    .sort(([left], [right]) => left.localeCompare(right));
  const children = [...(node?.children || [])].map(child => normalizedArtworkSignature(child, false));
  return [node?.nodeName || node?.name || "", normalizedAttributes, children];
}

export function auditAccessoryPairGeometry() {
  const identicalNormalizedPairs = [];
  let pairCount = 0;
  accessoryCatalogue.forEach(design => {
    [design.headwear, design.wrap, design.charm].forEach(item => {
      const primaryTarget = svg("g");
      const companionTarget = svg("g");
      const primaryPiece = renderPiece(primaryTarget, item, "primary");
      const companionPiece = renderPiece(companionTarget, item, "companion");
      const primaryArtwork = primaryPiece.children[0];
      const companionArtwork = companionPiece.children[0];
      const primarySignature = JSON.stringify(normalizedArtworkSignature(primaryArtwork));
      const companionSignature = JSON.stringify(normalizedArtworkSignature(companionArtwork));
      pairCount += 1;
      if (primarySignature === companionSignature) identicalNormalizedPairs.push(item.label);
    });
  });
  return Object.freeze({
    pairCount,
    distinctPairCount: pairCount - identicalNormalizedPairs.length,
    identicalNormalizedPairs: Object.freeze(identicalNormalizedPairs),
    valid: pairCount === 111 && !identicalNormalizedPairs.length
  });
}

export function renderLocationAccessories(targets, speciesId, placeName) {
  const design = getAccessoryDesign(speciesId, placeName);
  if (!design) return null;
  const assignments = [
    [targets.headwear, design.headwear],
    [targets.wrap, design.wrap],
    [targets.charm, design.charm]
  ];
  assignments.forEach(([target, item]) => {
    if (!target) return;
    target.replaceChildren();
    target.dataset.accessoryFamily = item.family;
    renderPiece(target, item, "primary");
    renderPiece(target, item, "companion");
  });
  return design;
}
