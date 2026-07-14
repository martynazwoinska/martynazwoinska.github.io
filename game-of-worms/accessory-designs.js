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
  ["elegans", "Tenerife, Spain", "avocado microhabitat viewer", "avocado-microhabitat-viewer", "aerial-root harp", "aerial-root-harp", "Linnaean seed-exchange engine", "linnaean-seed-exchange-engine"],
  ["elegans", "Kauaʻi, Hawaiʻi", "decay-substrate theatre", "decay-substrate-theatre", "Kōkeʻe cloud-water collector", "kokee-cloud-water-collector", "XZ1516 haplotype viewer", "xz1516-haplotype-viewer"],
  ["elegans", "Australian Capital Territory", "QG2811 Baermann fig-recovery rig", "qg2811-baermann-fig-recovery", "Yellow Box seed orrery", "yellow-box-seed-orrery", "Black Mountain signal theremin", "black-mountain-signal-theremin"],
  ["elegans", "Auckland, New Zealand", "ECA36 grass-litter profiler", "eca36-grass-litter-profiler", "Auckland volcanic-field monitor", "auckland-volcanic-field-monitor", "ECA36 reproductive-timing clock", "eca36-reproductive-timing-clock"],
  ["elegans", "Araucanía, Chile", "JU4400 compost labyrinth", "compost-labyrinth", "Llaima ashfall recorder", "ashfall-recorder", "JU4400 test-cross identifier", "test-cross-mechanism"],
  ["nigoni", "Trivandrum, Kerala · JU1325", "JU1325 sample-tube timekeeper", "ju1325-sample-tube-timekeeper", "Trivandrum garden waterworks", "trivandrum-garden-waterworks", "Trivandrum bandstand music box", "trivandrum-bandstand-music-box"],
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
  "basalt-cuffs",
  "boulder-spectacles",
  "cacao-cuirass",
  "caldera-headband",
  "cane-ankle-bells",
  "canoe-paddle-bow",
  "coconut-cloche",
  "erosion-crinoline",
  "fan-palm-collar",
  "fern-epaulettes",
  "fig-fascinator",
  "fruit-sampling-tool",
  "hoodoo-helmet",
  "lagoon-wind-vane",
  "le-morne-pauldron",
  "paddy-metronome",
  "palm-bustle",
  "reef-mask",
  "research-headphones",
  "salt-crystal-jacket",
  "seagrass-tail",
  "shade-visor",
  "terrace-boots",
  "two-river-yoke",
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
const tenerifeRendererFamilies = new Set(["avocado-microhabitat-viewer", "aerial-root-harp", "linnaean-seed-exchange-engine"]);
const kauaiRendererFamilies = new Set(["decay-substrate-theatre", "kokee-cloud-water-collector", "xz1516-haplotype-viewer"]);
const actRendererFamilies = new Set(["qg2811-baermann-fig-recovery", "yellow-box-seed-orrery", "black-mountain-signal-theremin"]);
const aucklandRendererFamilies = new Set(["eca36-grass-litter-profiler", "auckland-volcanic-field-monitor", "eca36-reproductive-timing-clock"]);
const araucaniaRendererIds = new Set([
  "elegans::Araucanía, Chile::headwear",
  "elegans::Araucanía, Chile::wrap",
  "elegans::Araucanía, Chile::charm"
]);
const trivandrumRendererIds = new Set([
  "nigoni::Trivandrum, Kerala · JU1325::headwear",
  "nigoni::Trivandrum, Kerala · JU1325::wrap",
  "nigoni::Trivandrum, Kerala · JU1325::charm"
]);
const instrumentRendererPattern = /fiddle|flute|piccolo|lyre|concertina|accordion|ocarina|saxophone|ukulele|drum|tambourine|marimba|xylophone|chimes|harmonica|trumpet|maracas/i;
const fieldToolRendererPattern = /sieve|dip net|sampler|pannier|trug|quadrat|telescope|periscope|snorkel|compass|press|gauge rod|camera rig/i;
const naturalRendererPattern = /wings|glider|fan|umbrella|stilts|skates|snowshoes|crampons|pennant|streamer wand|claws|waterwheel|carousel|fruit capsule/i;

function hasNamedRenderer(item) {
  return explicitUniqueRendererFamilies.has(item.family)
    || repeatedRendererFamilies.has(item.family)
    || n2RendererFamilies.has(item.family)
    || santeuilRendererFamilies.has(item.family)
    || edinburghRendererFamilies.has(item.family)
    || tenerifeRendererFamilies.has(item.family)
    || kauaiRendererFamilies.has(item.family)
    || actRendererFamilies.has(item.family)
    || aucklandRendererFamilies.has(item.family)
    || araucaniaRendererIds.has(item.id)
    || trivandrumRendererIds.has(item.id)
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

function drawTenerifeAccessory(group, item, companion) {
  if (item.family === "avocado-microhabitat-viewer") {
    group.classList.add("tenerife-accessory", "avocado-viewer", companion ? "avocado-viewer-companion" : "avocado-viewer-primary");
    if (companion) {
      add(group, "path", { class: "tenerife-accessory-shadow", d: "M-72 88Q2 106 75 85Q38 116-64 111Z" });
      add(group, "path", { class: "viewer-triptych-spine", d: "M-26-80Q0-97 27-78L31 72Q2 87-30 72Z" });
      add(group, "path", { class: "viewer-peel-panel left", d: "M-31-68Q-63-84-79-53L-71 54Q-56 77-31 63Z" });
      add(group, "path", { class: "viewer-peel-panel right", d: "M31-70Q64-88 82-55L73 52Q59 74 31 62Z" });
      add(group, "path", { class: "viewer-flesh-panel centre", d: "M-18-61Q0-74 19-59L21 48Q1 60-21 48Z" });
      add(group, "path", { class: "viewer-flesh-panel left", d: "M-40-54Q-59-65-67-43L-60 41Q-49 55-36 47Z" });
      add(group, "path", { class: "viewer-flesh-panel right", d: "M40-56Q59-68 70-44L62 39Q53 54 37 46Z" });
      add(group, "path", { class: "viewer-hinge-strap", d: "M-34-45H-22M-33-12H-21M-31 25H-20M22-46H35M23-11H36M25 25H38" });
      [-45,-12,25].forEach(y => {
        add(group, "circle", { class: "viewer-hinge-pin", cx: -28, cy: y, r: 3.5 });
        add(group, "circle", { class: "viewer-hinge-pin", cx: 29, cy: y - 1, r: 3.5 });
      });
      add(group, "ellipse", { class: "viewer-pit", cx: -3, cy: 12, rx: 16, ry: 19, transform: "rotate(-9 -3 12)" });
      add(group, "ellipse", { class: "viewer-lens-frame", cx: 51, cy: -19, rx: 21, ry: 25, transform: "rotate(8 51 -19)" });
      add(group, "ellipse", { class: "viewer-lens-glass", cx: 51, cy: -19, rx: 14, ry: 18, transform: "rotate(8 51 -19)" });
      add(group, "path", { class: "viewer-lens-glint", d: "M44-30Q50-37 57-30" });
      add(group, "path", { class: "viewer-drawer-housing", d: "M-47 57Q1 69 49 55L45 86Q0 101-50 85Z" });
      add(group, "path", { class: "viewer-litter-drawer", d: "M-41 64Q1 75 42 62L39 81Q0 92-43 80Z" });
      [[-24,73,-10,69],[-5,80,7,74],[16,72,31,68]].forEach(([x1,y1,x2,y2], index) => add(group, "path", { class: index % 2 ? "viewer-litter green" : "viewer-litter", d: `M${x1} ${y1}Q${(x1+x2)/2} ${Math.min(y1,y2)-6} ${x2} ${y2}Q${(x1+x2)/2} ${Math.max(y1,y2)+5} ${x1} ${y1}Z` }));
      add(group, "path", { class: "viewer-drawer-handle", d: "M-9 84Q0 92 9 84" });
      add(group, "path", { class: "viewer-triptych-foot", d: "M-51 84L-61 99H-27L-20 88ZM20 88L28 99H62L50 83Z" });
    } else {
      add(group, "path", { class: "tenerife-accessory-shadow", d: "M-112 46Q0 75 114 42Q58 87-102 80Z" });
      add(group, "path", { class: "viewer-rind", d: "M-99 7Q-93-31-57-45Q-25-59-4-37Q26-56 61-43Q91-31 101-4Q110 25 86 45Q56 62 20 54Q-11 65-41 50Q-75 59-96 32Q-106 20-99 7Z" });
      add(group, "path", { class: "viewer-flesh", d: "M-82 5Q-75-22-49-32Q-24-43-8-25Q18-39 47-29Q69-22 79-1Q86 18 69 31Q44 43 17 37Q-10 48-33 35Q-61 43-78 24Q-86 16-82 5Z" });
      add(group, "path", { class: "viewer-collapsed-flesh", d: "M-76 13Q-47-1-24 19Q2-2 28 17Q51 2 75 14Q58 39 29 37Q0 48-27 34Q-54 42-76 13Z" });
      add(group, "ellipse", { class: "viewer-pit", cx: 27, cy: 2, rx: 23, ry: 19, transform: "rotate(9 27 2)" });
      add(group, "path", { class: "viewer-pit-fissure", d: "M18-12Q27-1 20 17M37-10Q28 2 35 18" });
      [[-62,-9,5],[-43,19,3],[-19,-28,3],[3,26,4],[57,-12,4],[64,18,3]].forEach(([cx,cy,r], index) => add(group, "circle", { class: index % 2 ? "viewer-mottle dark" : "viewer-mottle", cx, cy, r }));
      add(group, "path", { class: "viewer-hood-bracket", d: "M-73-25Q-77-60-47-70M63-35Q80-61 62-77" });
      add(group, "circle", { class: "viewer-hood-hinge", cx: -73, cy: -25, r: 7 });
      add(group, "circle", { class: "viewer-hood-hinge", cx: 63, cy: -35, r: 7 });
      add(group, "path", { class: "viewer-magnifying-hood", d: "M-52-72Q2-106 63-78L70-54Q4-79-58-49Z" });
      add(group, "ellipse", { class: "viewer-lens-frame", cx: 7, cy: -65, rx: 38, ry: 19, transform: "rotate(-4 7 -65)" });
      add(group, "ellipse", { class: "viewer-lens-glass", cx: 7, cy: -65, rx: 29, ry: 12, transform: "rotate(-4 7 -65)" });
      add(group, "path", { class: "viewer-lens-glint", d: "M-13-69Q2-78 18-70" });
      add(group, "path", { class: "viewer-rind-flap", d: "M-88 24Q-109 46-91 58Q-61 68-37 49Q-66 53-88 24Z" });
    }
    return true;
  }

  if (item.family === "aerial-root-harp") {
    group.classList.add("tenerife-accessory", "root-harp", companion ? "root-harp-companion" : "root-harp-primary");
    if (companion) {
      add(group, "path", { class: "tenerife-accessory-shadow", d: "M-101 51Q0 75 103 47Q50 86-91 81Z" });
      add(group, "path", { class: "root-harp-buttress-frame", d: "M-91 43L-68-43L-33-24L45-36L84 39L63 55L42-13L-27-3L-48 55Z" });
      add(group, "path", { class: "root-harp-branch-box", d: "M38-39Q72-54 94-27L81 9Q59 1 39 13L19-5Z" });
      add(group, "path", { class: "root-harp-box-grain", d: "M45-31Q66-35 82-21M39-16Q61-20 79-7" });
      [-32, 1, 35].forEach((x, index) => add(group, "path", { class: `root-harp-string chunky string-${index}`, d: `M${x}-8Q${x + (index - 1) * 5} 17 ${x + (index - 1) * 3} 47` }));
      [-34, 0, 34].forEach((cx, index) => add(group, "circle", { class: "root-harp-anchor", cx, cy: 48 - index % 2 * 3, r: 5 }));
      add(group, "path", { class: "root-harp-foot left", d: "M-74 38Q-96 48-104 70Q-73 65-48 50Z" });
      add(group, "path", { class: "root-harp-foot right", d: "M57 42Q85 48 102 68Q71 68 47 52Z" });
      add(group, "path", { class: "root-harp-bridge", d: "M-42 42Q0 53 46 40" });
    } else {
      add(group, "path", { class: "tenerife-accessory-shadow", d: "M-75 92Q4 111 82 88Q42 122-67 116Z" });
      add(group, "path", { class: "root-harp-living-arch", d: "M-63 89Q-78 28-51-49Q-34-91 8-103Q55-98 73-54Q44-72 17-67Q-19-59-24-20Q-31 33-13 85Z" });
      add(group, "path", { class: "root-harp-crown-branch", d: "M-48-51Q-8-92 50-67Q71-58 81-35L63-21Q51-45 24-48Q-10-53-34-24Z" });
      add(group, "path", { class: "root-harp-root-base", d: "M-64 76Q-37 55-12 72Q15 52 38 73Q59 59 77 82L66 101Q40 88 17 100Q-7 84-30 101Q-52 94-70 102Z" });
      [-34,-15,8,29,50].forEach((x, index) => add(group, "path", { class: `root-harp-string living string-${index}`, d: `M${x}${-43 + index%2*5}Q${x + (index-2)*3} ${5 + index*2} ${x + (index%2 ? 5 : -3)} ${76 - index%3*4}` }));
      add(group, "path", { class: "root-harp-leaf-resonator", d: "M-31 34Q-80 8-83 51Q-65 91-20 75Q4 60-31 34Z" });
      add(group, "path", { class: "root-harp-leaf-vein", d: "M-70 49Q-46 55-22 69M-51 50L-58 30M-39 58L-30 40" });
      [[-33,-48,-16],[-8,-68,8],[19,-68,-7],[48,-51,13]].forEach(([x,y,angle], index) => {
        add(group, "path", { class: index % 2 ? "root-harp-fig-peg ripe" : "root-harp-fig-peg", d: `M${x-6} ${y-3}Q${x} ${y-13} ${x+6} ${y-3}Q${x+9} ${y+8} ${x} ${y+12}Q${x-9} ${y+8} ${x-6} ${y-3}Z`, transform: `rotate(${angle} ${x} ${y})` });
        add(group, "path", { class: "root-harp-peg-stem", d: `M${x} ${y-10}L${x+2} ${y-17}` });
      });
      add(group, "path", { class: "root-harp-bridge", d: "M-37 73Q10 87 56 69" });
      [-33,-12,12,34,54].forEach((cx, index) => add(group, "circle", { class: "root-harp-anchor", cx, cy: 77 - index%3*3, r: 4.5 }));
    }
    return true;
  }

  if (item.family === "linnaean-seed-exchange-engine") {
    group.classList.add("tenerife-accessory", "seed-exchange-engine", companion ? "seed-engine-companion" : "seed-engine-primary");
    if (companion) {
      add(group, "path", { class: "tenerife-accessory-shadow", d: "M-87 94Q3 114 91 91Q47 125-78 120Z" });
      add(group, "path", { class: "seed-cabinet-shell", d: "M-76-78L-27-91L22-84L76-69L72 91H-73Z" });
      add(group, "path", { class: "seed-cabinet-wing left", d: "M-73-67L-29-79V82L-73 91Z" });
      add(group, "path", { class: "seed-cabinet-wing right", d: "M25-75L73-62L72 91L25 82Z" });
      add(group, "path", { class: "seed-cabinet-centre", d: "M-27-78L24-75L25 86L-29 84Z" });
      add(group, "path", { class: "seed-cabinet-hinge", d: "M-29-70V82M25-68V80" });
      add(group, "rect", { class: "herbarium-sheet", x: -20, y: -69, width: 38, height: 57, rx: 2 });
      add(group, "path", { class: "herbarium-stem", d: "M-11-21Q-2-40 7-58M-5-35Q-15-45-17-53M1-43Q12-48 15-57" });
      add(group, "path", { class: "herbarium-leaf", d: "M-7-37Q-22-45-19-57Q-6-57-1-45ZM3-44Q14-58 20-51Q18-39 6-36Z" });
      const drawerBanks = [
        { x: -68, y: -54, widths: [31,33,29,34,30,32,28,35], gap: 15, bank: "left" },
        { x: -20, y: -2, widths: [34,32,36,30,35,31,37,33], gap: 11, bank: "centre" },
        { x: 31, y: -49, widths: [32,29,35,31,34,30,36,33], gap: 15, bank: "right" }
      ];
      drawerBanks.forEach(({ x, y, widths, gap, bank }) => widths.forEach((width, index) => {
        const drawerY = y + index * gap;
        add(group, "rect", { class: `seed-drawer ${bank}`, x, y: drawerY, width, height: bank === "centre" ? 8 : 11, rx: 1 });
        add(group, "circle", { class: "seed-drawer-pull", cx: x + width / 2, cy: drawerY + (bank === "centre" ? 4 : 5.5), r: bank === "centre" ? 1.5 : 1.8 });
      }));
      add(group, "path", { class: "seed-cabinet-cornice", d: "M-80-77L-29-94L24-87L81-70L76-58L23-73L-28-80L-76-65Z" });
      add(group, "path", { class: "seed-engine-crank", d: "M74 5Q95 7 94 28L108 38" });
      add(group, "circle", { class: "seed-engine-crank-knob", cx: 112, cy: 41, r: 6 });
      add(group, "path", { class: "seed-cabinet-foot", d: "M-74 89L-84 104H-49L-42 92ZM41 92L50 104H85L73 88Z" });
    } else {
      add(group, "path", { class: "tenerife-accessory-shadow", d: "M-126 61Q2 91 130 57Q67 105-114 99Z" });
      add(group, "path", { class: "seed-board-frame", d: "M-116-44Q-94-60-68-54L91-49Q112-46 119-24L112 54Q88 69 57 62L-92 65Q-117 54-120 30Z" });
      add(group, "rect", { class: "seed-board-field", x: -99, y: -34, width: 194, height: 82, rx: 5 });
      for (let row = 0; row < 4; row += 1) {
        for (let column = 0; column < 6; column += 1) {
          const x = -94 + column * 32;
          const y = -29 + row * 19;
          add(group, "rect", { class: `seed-accession-cell tone-${(row + column) % 3}`, x, y, width: 27, height: 14, rx: 2 });
          add(group, "circle", { class: "seed-accession-dot", cx: x + 7 + (column % 2) * 4, cy: y + 7, r: 2 + (row % 2) * .5 });
        }
      }
      add(group, "path", { class: "seed-bridge-rail", d: "M-83-49Q0-91 86-48" });
      add(group, "circle", { class: "seed-bridge-axle", cx: 0, cy: -61, r: 9 });
      [[-69,-56,-14],[-43,-70,-9],[-15,-79,-3],[16,-78,4],[46,-68,9],[73,-53,14]].forEach(([x,y,angle], index) => {
        const capsule = add(group, "g", { class: `seed-capsule capsule-${index}`, transform: `translate(${x} ${y}) rotate(${angle})` });
        add(capsule, "path", { class: index % 2 ? "seed-capsule-shell warm" : "seed-capsule-shell", d: "M-8-7Q0-15 8-7L9 7Q0 15-9 7Z" });
        add(capsule, "path", { class: "seed-capsule-seam", d: "M0-10V11M-6 0H6" });
        add(group, "path", { class: "seed-capsule-link", d: `M${x} ${y+10}L${x*.82} ${-49 + Math.abs(x)*.08}` });
      });
      add(group, "path", { class: "seed-index-arm", d: "M0-60Q13-31 22-3" });
      add(group, "path", { class: "seed-leaf-pointer", d: "M22-3Q43-18 52 0Q39 18 20 8Z" });
      add(group, "path", { class: "seed-leaf-vein", d: "M25 5L47-1M36 2L40-8" });
      add(group, "path", { class: "seed-board-foot", d: "M-106 54L-119 76H-77L-68 62ZM69 61L79 76H121L109 53Z" });
      const classCount = add(group, "text", { class: "seed-class-count", x: -104, y: 58, "text-anchor": "start" });
      classCount.textContent = "24";
    }
    return true;
  }

  return false;
}

function drawKauaiAccessory(group, item, companion) {
  if (item.family === "decay-substrate-theatre") {
    group.classList.add("kauai-accessory", "decay-theatre", companion ? "decay-theatre-companion" : "decay-theatre-primary");
    if (companion) {
      add(group, "path", { class: "kauai-accessory-shadow", d: "M-75 94Q5 114 84 91Q45 123-67 119Z" });
      add(group, "path", { class: "decay-rack-frame", d: "M-3-105L78 68L54 85H-62L-83 65Z" });
      add(group, "path", { class: "decay-rack-inner", d: "M-3-78L54 49L40 61H-43L-58 48Z" });
      add(group, "path", { class: "decay-rack-crossbar", d: "M-57 47L57 47M-39 7L40 7M-22-33L23-33" });
      const wells = [
        { cx: -30, cy: 33, rx: 20, ry: 14, angle: -8, tone: "brown" },
        { cx: 17, cy: 29, rx: 15, ry: 21, angle: 7, tone: "green" },
        { cx: 0, cy: -18, rx: 12, ry: 10, angle: 0, tone: "gold" }
      ];
      wells.forEach(({ cx, cy, rx, ry, angle, tone }, index) => {
        add(group, "ellipse", { class: `decay-sample-well ${tone}`, cx, cy, rx, ry, transform: `rotate(${angle} ${cx} ${cy})` });
        add(group, "path", { class: "decay-sample-mark", d: `M${cx-rx*.55} ${cy}Q${cx} ${cy-ry*.55-index*2} ${cx+rx*.55} ${cy+1}` });
      });
      add(group, "path", { class: "decay-lens-arm", d: "M35-20Q61-42 74-19" });
      add(group, "ellipse", { class: "decay-lens-rim", cx: 76, cy: -8, rx: 23, ry: 28, transform: "rotate(13 76 -8)" });
      add(group, "ellipse", { class: "decay-lens-glass", cx: 76, cy: -8, rx: 15, ry: 19, transform: "rotate(13 76 -8)" });
      add(group, "path", { class: "decay-lens-glint", d: "M68-20Q75-27 83-19" });
      add(group, "path", { class: "decay-altitude-tag", d: "M-55 65H18L27 91H-48Z" });
      const altitude = add(group, "text", { class: "decay-altitude-text", x: -14, y: 82, "text-anchor": "middle" });
      altitude.textContent = "983 m";
      add(group, "path", { class: "decay-rack-foot", d: "M-61 82L-72 102H-37L-30 84ZM39 84L48 102H82L68 80Z" });
    } else {
      add(group, "path", { class: "kauai-accessory-shadow", d: "M-124 65Q0 92 127 62Q65 106-114 101Z" });
      add(group, "path", { class: "decay-case-shell", d: "M-117 39L-109-23Q-89-67-40-75L57-67Q96-59 112-20L118 40Q93 65 57 64L-83 67Q-110 61-117 39Z" });
      add(group, "path", { class: "decay-case-window", d: "M-95 29L-89-16Q-72-48-35-54L48-48Q77-43 90-14L96 28Q75 45 47 44L-69 47Q-90 44-95 29Z" });
      add(group, "path", { class: "decay-case-fragment", d: "M-70 17L-56-18L-27-29L-7-13L19-27L51-12L73 14L57 33L25 28L-5 39L-37 29L-61 36Z" });
      add(group, "path", { class: "decay-case-split", d: "M-28-22Q-15-7-22 24M-7-10Q10 3 3 30M22-20Q37-5 29 24" });
      [[-50,5,4],[-32,20,3],[-6,7,3],[17,23,4],[44,-3,3],[55,17,3]].forEach(([cx, cy, r], index) => add(group, "circle", { class: index % 2 ? "decay-case-pore deep" : "decay-case-pore", cx, cy, r }));
      add(group, "ellipse", { class: "decay-moisture-window", cx: 73, cy: -22, rx: 17, ry: 13, transform: "rotate(8 73 -22)" });
      add(group, "path", { class: "decay-moisture-glint", d: "M64-25Q72-32 80-26M67-17Q74-13 81-18" });
      [-73,-15,44].forEach((x, index) => {
        add(group, "path", { class: "decay-case-latch", d: `M${x}-48V-61Q${x+8} ${-70-index} ${x+16}-59V-48` });
        add(group, "circle", { class: "decay-case-hinge", cx: x + 8, cy: -49, r: 4 });
      });
      add(group, "path", { class: "decay-specimen-ticket", d: "M-106 37H-43L-39 62H-102Z" });
      const ticket = add(group, "text", { class: "decay-ticket-text", x: -72, y: 53, "text-anchor": "middle" });
      ticket.textContent = "XZ1516";
      add(group, "path", { class: "decay-case-foot", d: "M-100 58L-112 78H-72L-63 65ZM68 63L78 78H116L103 57Z" });
    }
    return true;
  }

  if (item.family === "kokee-cloud-water-collector") {
    group.classList.add("kauai-accessory", "cloud-collector", companion ? "cloud-collector-companion" : "cloud-collector-primary");
    if (companion) {
      add(group, "path", { class: "kauai-accessory-shadow", d: "M-119 68Q0 98 121 64Q61 110-108 105Z" });
      add(group, "circle", { class: "cloud-ring-frame", cx: 0, cy: -8, r: 79 });
      add(group, "circle", { class: "cloud-ring-mesh", cx: 0, cy: -8, r: 65 });
      [0,30,60,90,120,150].forEach(angle => add(group, "path", { class: "cloud-ring-spoke", d: "M-65 0H65", transform: `translate(0 -8) rotate(${angle})` }));
      add(group, "path", { class: "cloud-ring-spiral", d: "M4-8C4-24 27-27 36-12C49 10 25 31 0 29C-36 26-51-8-37-37C-18-73 31-76 61-46" });
      add(group, "path", { class: "cloud-ring-gutter", d: "M-76 39Q0 78 78 38L70 58Q0 92-70 60Z" });
      add(group, "path", { class: "cloud-ring-pipe left", d: "M-43 64Q-50 75-50 86" });
      add(group, "path", { class: "cloud-ring-pipe right", d: "M42 64Q51 75 51 86" });
      add(group, "path", { class: "cloud-condensate-bulb left", d: "M-51 75Q-70 96-57 111Q-43 121-31 106Q-24 91-43 75Z" });
      add(group, "path", { class: "cloud-condensate-bulb right", d: "M49 75Q27 96 42 113Q56 122 69 107Q78 91 58 75Z" });
      [-98,-87,-78].forEach((cx, index) => add(group, "circle", { class: `cloud-droplet drop-${index}`, cx, cy: 40 + index * 14, r: 5 - index * .7 }));
      add(group, "path", { class: "cloud-ring-stand", d: "M-77 56L-98 91M76 55L98 91M-108 92H-75M75 92H108" });
    } else {
      add(group, "path", { class: "kauai-accessory-shadow", d: "M-82 110Q2 132 86 106Q44 143-74 139Z" });
      add(group, "path", { class: "cloud-comb-frame", d: "M-69-105H67L61 39Q0 57-63 39Z" });
      const vanes = [
        { x: -54, top: -89, width: 14 },
        { x: -31, top: -111, width: 15 },
        { x: -7, top: -96, width: 16 },
        { x: 19, top: -120, width: 15 },
        { x: 43, top: -84, width: 14 }
      ];
      vanes.forEach(({ x, top, width }, index) => {
        add(group, "path", { class: index % 2 ? "cloud-comb-vane deep" : "cloud-comb-vane", d: `M${x} ${top}H${x+width}L${x+width-2} 28Q${x+width/2} ${35+index%2*3} ${x+2} 28Z` });
        [-67,-42,-17,8].forEach(y => {
          if (y > top + 12) add(group, "path", { class: "cloud-comb-mesh", d: `M${x+3} ${y}H${x+width-3}` });
        });
      });
      add(group, "path", { class: "cloud-comb-gutter", d: "M-66 28Q0 47 64 27L61 47Q0 67-63 47Z" });
      add(group, "path", { class: "cloud-comb-downpipe", d: "M3 53V73" });
      add(group, "path", { class: "cloud-pear-bulb", d: "M3 67Q-27 88-20 116Q-11 139 5 141Q23 137 28 115Q32 89 3 67Z" });
      add(group, "path", { class: "cloud-bulb-glint", d: "M-9 92Q-1 83 7 91" });
      [-7,2,11].forEach((y, index) => add(group, "path", { class: "cloud-bulb-graduation", d: `M-12 ${108+y}H${2+index*3}` }));
      add(group, "path", { class: "cloud-side-gauge", d: "M68-70H88V72H68Z" });
      [-54,-29,-4,21,46].forEach((y, index) => add(group, "path", { class: "cloud-gauge-tick", d: `M72 ${y}H${index % 2 ? 82 : 86}` }));
      add(group, "path", { class: "cloud-gauge-level", d: "M73 40H84V66H73Z" });
      add(group, "path", { class: "cloud-comb-foot", d: "M-55 45L-69 76H-36L-28 53ZM38 52L46 76H79L62 43Z" });
    }
    return true;
  }

  if (item.family === "xz1516-haplotype-viewer") {
    group.classList.add("kauai-accessory", "haplotype-viewer", companion ? "haplotype-viewer-companion" : "haplotype-viewer-primary");
    if (companion) {
      add(group, "path", { class: "kauai-accessory-shadow", d: "M-92 91Q3 117 98 88Q51 127-83 122Z" });
      add(group, "circle", { class: "haplotype-drum-shell", cx: -12, cy: -9, r: 78 });
      add(group, "circle", { class: "haplotype-drum-field", cx: -12, cy: -9, r: 64 });
      [0,60,120,180,240,300].forEach((angle, index) => {
        add(group, "path", { class: "haplotype-sector-line", d: "M-12-9L52-9", transform: `rotate(${angle} -12 -9)` });
        add(group, "path", { class: `haplotype-radial-strip tone-${index % 3}`, d: "M4-15H42L49-9L42-3H4Z", transform: `rotate(${angle} -12 -9)` });
      });
      add(group, "circle", { class: "haplotype-drum-hub", cx: -12, cy: -9, r: 12 });
      add(group, "path", { class: "haplotype-drum-pointer", d: "M-12-97L-2-78L-22-78Z" });
      add(group, "path", { class: "haplotype-panel-hinge", d: "M56 16Q76 12 82 28" });
      add(group, "path", { class: "haplotype-result-panel", d: "M75 23L126 38L116 99L68 84Z" });
      add(group, "path", { class: "haplotype-result-line", d: "M82 43L115 52M79 55L110 64M76 68L99 74" });
      const result = add(group, "text", { class: "haplotype-result-text", x: 91, y: 90, "text-anchor": "middle", transform: "rotate(16 91 90)" });
      result.textContent = "XZ";
      add(group, "path", { class: "haplotype-drum-stand", d: "M-49 62L-67 103H-28L-17 69ZM23 63L34 103H74L51 55Z" });
    } else {
      add(group, "path", { class: "kauai-accessory-shadow", d: "M-131 62Q0 92 133 58Q67 107-119 101Z" });
      add(group, "path", { class: "haplotype-lightbox-shell", d: "M-123-38L-101-59H101L124-36L115 48L93 64H-99L-122 45Z" });
      add(group, "path", { class: "haplotype-lightbox-field", d: "M-102-31L-87-43H87L103-28L97 35L83 48H-85L-102 33Z" });
      [ -12, 15 ].forEach((y, trackIndex) => {
        add(group, "path", { class: `haplotype-ribbon-track track-${trackIndex}`, d: `M-84 ${y}C-65 ${y-18} -45 ${y+18} -25 ${y}S15 ${y-18} 35 ${y}S70 ${y+17} 88 ${y}` });
        [-65,-37,-8,22,52,78].forEach((x, index) => add(group, "rect", { class: `haplotype-track-block tone-${(index + trackIndex) % 3}`, x, y: y - 6, width: 11 + index % 2 * 4, height: 12, rx: 2 }));
      });
      add(group, "path", { class: "haplotype-magnifier-rail", d: "M-91-45H88" });
      add(group, "rect", { class: "haplotype-magnifier-carriage", x: 14, y: -51, width: 34, height: 9, rx: 3 });
      add(group, "circle", { class: "haplotype-magnifier-rim", cx: 31, cy: 1, r: 28 });
      add(group, "circle", { class: "haplotype-magnifier-glass", cx: 31, cy: 1, r: 20 });
      add(group, "path", { class: "haplotype-magnifier-glint", d: "M20-8Q29-17 38-8" });
      add(group, "path", { class: "haplotype-side-crank", d: "M111 2Q139 5 137 28L151 39" });
      add(group, "circle", { class: "haplotype-crank-knob", cx: 156, cy: 42, r: 7 });
      const label = add(group, "text", { class: "haplotype-lightbox-label", x: -91, y: 57, "text-anchor": "start" });
      label.textContent = "XZ1516";
      add(group, "path", { class: "haplotype-lightbox-foot", d: "M-105 50L-117 77H-78L-67 61ZM72 59L82 77H121L108 48Z" });
    }
    return true;
  }

  return false;
}

function drawAustralianCapitalTerritoryAccessory(group, item, companion) {
  if (item.family === "qg2811-baermann-fig-recovery") {
    group.classList.add("act-accessory", "baermann-rig", companion ? "baermann-rig-companion" : "baermann-rig-primary");
    if (companion) {
      add(group, "path", { class: "act-accessory-shadow", d: "M-111 81Q3 108 122 77Q62 119-101 114Z" });
      add(group, "path", { class: "baermann-tripod-frame", d: "M-78-41Q0-77 76-41M-73-39L-96 83M71-39L82 83M0-55L-5 85M-108 84H-79M-18 86H10M68 84H98" });
      add(group, "path", { class: "baermann-reservoir companion", d: "M-83-38Q-2-57 80-36L63 5Q38 31 5 36Q-31 32-59 6Z" });
      add(group, "path", { class: "baermann-water companion", d: "M-69-23Q-2-38 68-21L56 1Q31 20 3 24Q-27 20-51 1Z" });
      add(group, "path", { class: "baermann-reservoir-rim", d: "M-83-38Q-2-57 80-36Q-1-20-83-38Z" });
      add(group, "path", { class: "baermann-basket-frame", d: "M-32-53L-25-5Q0 10 28-5L35-52M-27-29Q1-15 31-29" });
      add(group, "path", { class: "baermann-fig-sample", d: "M-24-25L-15-41L-1-46L9-35L22-42L29-25L19-14L3-17L-8-10L-21-15Z" });
      [[-13,-29],[1,-34],[15,-27],[5,-19]].forEach(([cx, cy], index) => add(group, "circle", { class: index % 2 ? "baermann-fig-speck deep" : "baermann-fig-speck", cx, cy, r: 2.7 }));
      add(group, "path", { class: "baermann-outlet companion", d: "M5 35Q9 45 25 48" });
      add(group, "path", { class: "baermann-tube coiled", d: "M24 47C53 45 55 66 34 69C13 72 15 91 43 89C71 87 69 50 91 45Q105 42 108 55V70" });
      add(group, "circle", { class: "baermann-clamp-wheel", cx: 91, cy: 46, r: 12 });
      add(group, "path", { class: "baermann-clamp-spokes", d: "M79 46H103M91 34V58M83 38L99 54M99 38L83 54" });
      add(group, "path", { class: "baermann-vial companion", d: "M94 67H121L118 103Q108 112 98 103Z" });
      add(group, "path", { class: "baermann-vial-cap", d: "M92 62H123V72H92Z" });
      add(group, "path", { class: "baermann-vial-level", d: "M99 91Q108 87 117 91V102Q108 108 99 102Z" });
    } else {
      add(group, "path", { class: "act-accessory-shadow", d: "M-92 106Q4 131 99 102Q52 141-83 137Z" });
      add(group, "path", { class: "baermann-stand-base", d: "M-86 91H4L19 109H-99Z" });
      add(group, "path", { class: "baermann-ring-stand", d: "M-61 93V-112M-77-111H-45M-61-80H24M-61 13H32" });
      add(group, "path", { class: "baermann-ring-brace", d: "M-61-80L-49-68M-61 13L-48 24" });
      add(group, "ellipse", { class: "baermann-support-ring", cx: 25, cy: -55, rx: 45, ry: 13 });
      add(group, "path", { class: "baermann-funnel", d: "M-18-57Q25-73 68-56L53-8Q42 20 29 35Q14 17 3-9Z" });
      add(group, "path", { class: "baermann-water", d: "M-9-37Q25-48 59-37L51-12Q39 9 29 22Q16 7 8-13Z" });
      add(group, "path", { class: "baermann-hammock", d: "M-6-46Q25-27 57-45Q47-12 27-8Q7-14-6-46Z" });
      add(group, "path", { class: "baermann-fig-sample", d: "M5-38L14-52L27-55L35-44L48-49L55-34L45-23L31-27L19-20L8-26Z" });
      [[15,-38],[27,-45],[39,-36],[30,-28]].forEach(([cx, cy], index) => add(group, "circle", { class: index % 2 ? "baermann-fig-speck deep" : "baermann-fig-speck", cx, cy, r: 2.7 }));
      add(group, "path", { class: "baermann-filter-line", d: "M-2-43Q25-31 60-43M3-38Q26-24 56-38" });
      add(group, "path", { class: "baermann-outlet", d: "M29 34V46Q30 56 45 61Q61 66 62 78" });
      add(group, "path", { class: "baermann-tube", d: "M29 40V53Q30 64 47 68Q62 72 62 84" });
      add(group, "path", { class: "baermann-clamp", d: "M42 59L58 51L65 62L49 70ZM55 55L70 45" });
      add(group, "path", { class: "baermann-vial", d: "M48 78H78L74 113Q63 122 52 113Z" });
      add(group, "path", { class: "baermann-vial-cap", d: "M46 73H80V83H46Z" });
      add(group, "path", { class: "baermann-vial-level", d: "M53 101Q63 96 73 101V112Q63 118 53 112Z" });
      const vialLabel = add(group, "text", { class: "baermann-vial-label", x: 63, y: 95, "text-anchor": "middle" });
      vialLabel.textContent = "QG2811";
    }
    return true;
  }

  if (item.family === "yellow-box-seed-orrery") {
    group.classList.add("act-accessory", "seed-orrery", companion ? "seed-orrery-companion" : "seed-orrery-primary");
    if (companion) {
      add(group, "path", { class: "act-accessory-shadow", d: "M-70 105Q2 126 74 102Q38 134-63 131Z" });
      add(group, "path", { class: "seed-column-frame", d: "M-42-92H40L50 91H-50ZM-42-46H43M-46 25H46" });
      add(group, "path", { class: "seed-column-spine", d: "M0-91V91" });
      [[0,-51,32,25],[0,20,36,29]].forEach(([cx, cy, rx, ry], index) => {
        add(group, "path", { class: index ? "seed-column-capsule lower" : "seed-column-capsule", d: `M${cx-rx} ${cy}Q${cx-rx*.6} ${cy-ry} ${cx} ${cy-ry*.82}Q${cx+rx*.68} ${cy-ry} ${cx+rx} ${cy}Q${cx+rx*.55} ${cy+ry} ${cx} ${cy+ry*.72}Q${cx-rx*.65} ${cy+ry} ${cx-rx} ${cy}Z` });
        add(group, "path", { class: "seed-star-valve", d: `M${cx} ${cy-18}L${cx+6} ${cy-6}L${cx+19} ${cy-5}L${cx+9} ${cy+4}L${cx+12} ${cy+17}L${cx} ${cy+10}L${cx-12} ${cy+17}L${cx-9} ${cy+4}L${cx-19} ${cy-5}L${cx-6} ${cy-6}Z` });
        add(group, "circle", { class: "seed-valve-hub", cx, cy, r: 5 });
      });
      add(group, "path", { class: "seed-leaf-vane-arm", d: "M0-91V-116M0-111L-31-126M0-111L29-132" });
      add(group, "path", { class: "seed-leaf-vane", d: "M-31-126Q-55-137-60-116Q-43-102-25-118ZM29-132Q53-147 60-126Q46-107 25-123Z" });
      add(group, "path", { class: "seed-leaf-vein act", d: "M-53-120L-30-124M51-128L29-130" });
      add(group, "path", { class: "seed-crescent-tray", d: "M-65 80Q0 118 65 79L55 110Q0 137-56 109Z" });
      [[-29,96],[-10,108],[13,106],[33,94]].forEach(([cx, cy], index) => add(group, "ellipse", { class: index % 2 ? "seed-release-seed deep" : "seed-release-seed", cx, cy, rx: 4, ry: 8, transform: `rotate(${index % 2 ? 28 : -28} ${cx} ${cy})` }));
      add(group, "path", { class: "seed-column-foot", d: "M-47 91L-60 116H-27L-20 94ZM25 94L32 116H64L49 89Z" });
    } else {
      add(group, "path", { class: "act-accessory-shadow", d: "M-133 75Q0 105 136 71Q69 120-121 114Z" });
      add(group, "circle", { class: "seed-orrery-outer-ring", cx: 0, cy: -5, r: 65 });
      add(group, "circle", { class: "seed-orrery-inner-ring", cx: 0, cy: -5, r: 29 });
      const arms = [
        [0,-5,-102,-39,-118,-52,-18], [0,-5,-54,-77,-60,-103,20], [0,-5,46,-88,55,-111,-12],
        [0,-5,104,-32,121,-39,16], [0,-5,77,59,91,80,-24], [0,-5,-73,62,-90,82,25]
      ];
      arms.forEach(([x1,y1,cx,cy,x2,y2,angle], index) => {
        add(group, "path", { class: "seed-orrery-arm", d: `M${x1} ${y1}Q${cx*.55} ${cy*.55} ${x2} ${y2}` });
        add(group, "circle", { class: "seed-arm-joint", cx: x2, cy: y2, r: 6 });
        add(group, "path", { class: index % 2 ? "seed-arm-leaf deep" : "seed-arm-leaf", d: `M${x2} ${y2}q${-19 * Math.cos(angle*Math.PI/180)} ${-13 * Math.sin(angle*Math.PI/180)-8} ${-33 * Math.cos(angle*Math.PI/180)} ${-5 * Math.sin(angle*Math.PI/180)-2}q${15 * Math.cos(angle*Math.PI/180)} ${17 * Math.sin(angle*Math.PI/180)+9} ${33 * Math.cos(angle*Math.PI/180)} ${5 * Math.sin(angle*Math.PI/180)+2}Z`, transform: `rotate(${angle} ${x2} ${y2})` });
        add(group, "path", { class: "seed-arm-shutter", d: `M${x2-8} ${y2-4}L${x2+8} ${y2-4}L${x2+5} ${y2+13}L${x2-5} ${y2+13}Z`, transform: `rotate(${angle} ${x2} ${y2})` });
      });
      add(group, "path", { class: "seed-capsule-cutaway", d: "M-25-7Q-20-36 0-45Q23-34 27-7Q20 23 0 36Q-22 24-25-7Z" });
      add(group, "path", { class: "seed-capsule-half", d: "M0-42Q23-30 25-7Q18 17 0 31Z" });
      add(group, "path", { class: "seed-capsule-septa", d: "M0-40V32M-19-17L0-6L20-18M-20 9L0 1L20 10" });
      [[-8,-22],[9,-18],[-10,10],[10,13]].forEach(([cx, cy], index) => add(group, "ellipse", { class: index % 2 ? "seed-release-seed deep" : "seed-release-seed", cx, cy, rx: 3.5, ry: 7, transform: `rotate(${index % 2 ? 24 : -24} ${cx} ${cy})` }));
      add(group, "path", { class: "seed-winding-shaft", d: "M0 36V71H31" });
      add(group, "path", { class: "seed-winding-key", d: "M31 58V84M31 65Q51 53 58 69Q50 85 31 77" });
      add(group, "circle", { class: "seed-orrery-hub", cx: 0, cy: -5, r: 10 });
    }
    return true;
  }

  if (item.family === "black-mountain-signal-theremin") {
    group.classList.add("act-accessory", "signal-theremin", companion ? "signal-theremin-companion" : "signal-theremin-primary");
    if (companion) {
      add(group, "path", { class: "act-accessory-shadow", d: "M-125 68Q0 96 128 65Q65 110-114 104Z" });
      add(group, "path", { class: "theremin-crescent-body", d: "M-111 25Q-47-7 10 15Q64-5 112 24L101 66Q45 92-9 70Q-60 91-108 65Z" });
      add(group, "path", { class: "theremin-body-panel", d: "M-83 31Q-38 13 5 29Q45 13 83 30L77 55Q42 69 3 55Q-39 70-79 55Z" });
      add(group, "path", { class: "theremin-loop left", d: "M-89 29V-19Q-87-43-61-42Q-31-40 5 13" });
      add(group, "path", { class: "theremin-loop right", d: "M87 29V-17Q85-42 58-40Q28-37-7 14" });
      add(group, "path", { class: "theremin-short-mast", d: "M91 30V-69L102-79L107 31" });
      add(group, "path", { class: "theremin-frequency-scale", d: "M-55 40H42M-47 34V46M-28 35V45M-9 33V47M10 35V45M29 34V46" });
      add(group, "rect", { class: "theremin-slider", x: -18, y: 32, width: 15, height: 16, rx: 3 });
      add(group, "ellipse", { class: "theremin-speaker", cx: 64, cy: 48, rx: 17, ry: 13 });
      [-7,0,7].forEach(y => add(group, "path", { class: "theremin-speaker-line", d: `M52 ${48+y*.65}Q64 ${43+y*.65} 76 ${48+y*.65}` }));
    } else {
      add(group, "path", { class: "act-accessory-shadow", d: "M-91 100Q2 125 96 97Q49 136-82 132Z" });
      add(group, "path", { class: "theremin-soundbox", d: "M-76 52Q-9 25 75 48L67 96Q4 118-69 94Z" });
      add(group, "path", { class: "theremin-soundbox-panel", d: "M-59 57Q0 39 58 56L52 83Q1 99-54 83Z" });
      add(group, "path", { class: "theremin-mast", d: "M-13 51L-7-107L8-121L18 51Z" });
      add(group, "path", { class: "theremin-mast-seam", d: "M-2-91L9 42M-6-56L13-56M-8-17L15-17" });
      add(group, "path", { class: "theremin-pitch-rod", d: "M58 54V-94M51-94H65" });
      add(group, "path", { class: "theremin-volume-loop", d: "M-61 55V-18Q-61-42-37-42H-12Q9-41 9-18V3Q8 22-12 23H-39Q-61 22-61 2" });
      [-73,-55,-37].forEach((cy, index) => add(group, "ellipse", { class: `theremin-signal-ring ring-${index}`, cx: 2, cy, rx: 21 + index * 9, ry: 7 + index * 3 }));
      add(group, "path", { class: "theremin-waveform-gauge", d: "M-42 68H39V85H-42ZM-35 77L-27 72L-19 81L-10 69L0 80L10 73L20 82L31 75" });
      add(group, "circle", { class: "theremin-control", cx: 51, cy: 76, r: 8 });
      add(group, "path", { class: "theremin-foot", d: "M-59 91L-68 112H-37L-29 99ZM42 98L49 112H79L66 92Z" });
    }
    return true;
  }

  return false;
}

function drawAucklandAccessory(group, item, companion) {
  if (item.family === "eca36-grass-litter-profiler") {
    group.classList.add("auckland-accessory", "grass-profiler", companion ? "grass-profiler-companion" : "grass-profiler-primary");
    if (companion) {
      add(group, "path", { class: "auckland-accessory-shadow", d: "M-76 111Q2 132 80 108Q41 142-68 137Z" });
      add(group, "path", { class: "profiler-tower-frame", d: "M-51-118H43L55 95H-60ZM-45-68H47M-52-5H51M-56 59H54" });
      const windows = [[-31,-91,47,41],[-8,-28,46,43],[-35,36,48,43]];
      windows.forEach(([x,y,width,height], index) => {
        add(group, "rect", { class: index % 2 ? "profiler-window warm" : "profiler-window", x, y, width, height, rx: 6 });
        add(group, "path", { class: "profiler-window-glint", d: `M${x+7} ${y+8}L${x+width-8} ${y+8}` });
      });
      const rollers = [[-23,-70],[22,-8],[-26,58]];
      rollers.forEach(([cx,cy], index) => {
        add(group, "circle", { class: "profiler-roller", cx, cy, r: 13 });
        add(group, "circle", { class: "profiler-roller-hub", cx, cy, r: 4 });
        add(group, "path", { class: "profiler-roller-spokes", d: `M${cx-10} ${cy}H${cx+10}M${cx} ${cy-10}V${cy+10}` });
      });
      add(group, "path", { class: "profiler-litter-ribbon", d: "M-23-107C10-97 11-79-23-70C-55-60-48-27 5-25C49-23 52-2 22-8C-19-16-48 10-26 29C-8 45 7 51-26 58C-52 64-43 85 6 92" });
      [[-19,-99,-4,-91],[4,-47,21,-38],[-12,17,6,26],[-20,72,-2,80]].forEach(([x1,y1,x2,y2], index) => add(group, "path", { class: index % 2 ? "profiler-ribbon-leaf deep" : "profiler-ribbon-leaf", d: `M${x1} ${y1}Q${(x1+x2)/2} ${Math.min(y1,y2)-7} ${x2} ${y2}Q${(x1+x2)/2} ${Math.max(y1,y2)+5} ${x1} ${y1}Z` }));
      add(group, "path", { class: "profiler-crank-shaft", d: "M45-69H69Q86-69 86-52V-39" });
      add(group, "circle", { class: "profiler-crank-wheel", cx: 86, cy: -25, r: 16 });
      add(group, "path", { class: "profiler-crank-spokes", d: "M70-25H102M86-41V-9M75-36L97-14M97-36L75-14" });
      add(group, "path", { class: "profiler-catch-drawer", d: "M-39 87H39L46 119H-47Z" });
      add(group, "path", { class: "profiler-drawer-front", d: "M-35 98H34L31 113H-32Z" });
      add(group, "circle", { class: "profiler-drawer-pull", cx: 0, cy: 105, r: 4 });
      add(group, "path", { class: "profiler-tower-foot", d: "M-53 94L-66 122H-29L-20 97ZM24 98L34 122H70L53 93Z" });
    } else {
      add(group, "path", { class: "auckland-accessory-shadow", d: "M-144 79Q0 109 148 75Q75 124-132 117Z" });
      add(group, "path", { class: "profiler-rail-bed", d: "M-131 62H128L142 80H-145ZM-116 45V77M-58 45V77M61 45V77M116 45V77" });
      add(group, "path", { class: "profiler-chamber-shell", d: "M-112 49V-15Q-109-82-43-98Q12-114 70-88Q111-68 113-18V51Z" });
      add(group, "path", { class: "profiler-chamber-glass", d: "M-96 44V-12Q-93-66-40-81Q10-96 59-73Q92-57 96-15V44Z" });
      add(group, "path", { class: "profiler-chamber-floor", d: "M-96 27Q-49 10-7 25Q38 6 95 25V45H-96Z" });
      add(group, "path", { class: "profiler-litter-layer deep", d: "M-91 28Q-68 4-43 20Q-21-4 3 19Q27-3 51 19Q74 4 91 27L85 42H-87Z" });
      add(group, "path", { class: "profiler-litter-layer", d: "M-88 22Q-66 8-45 24Q-24 3-2 22Q23 4 43 22Q66 9 88 23V34Q62 27 40 37Q17 25-5 37Q-30 25-52 37Q-72 29-88 35Z" });
      [[-75,25,-63,-6],[-57,28,-44,-13],[-37,27,-28,3],[-18,27,-6,-17],[3,26,17,-3],[22,27,36,-16],[46,27,57,0],[65,25,77,-12]].forEach(([x1,y1,x2,y2], index) => add(group, "path", { class: index % 3 === 0 ? "profiler-grass-blade dry" : "profiler-grass-blade", d: `M${x1} ${y1}Q${(x1+x2)/2 + (index%2 ? 4 : -3)} ${(y1+y2)/2} ${x2} ${y2}` }));
      add(group, "path", { class: "profiler-door left", d: "M-97-9L-111-2V44H-97Z" });
      add(group, "path", { class: "profiler-door right", d: "M97-10L112-2V44H97Z" });
      [-1,1].forEach(side => {
        add(group, "path", { class: "profiler-door-hinge", d: `M${side*102} 3V15M${side*102} 27V39` });
        add(group, "circle", { class: "profiler-door-latch", cx: side*104, cy: 22, r: 3.5 });
      });
      add(group, "path", { class: "profiler-magnifier-rail", d: "M-91-45H87" });
      add(group, "path", { class: "profiler-magnifier-carriage", d: "M-21-57H31V-39H-21Z" });
      add(group, "circle", { class: "profiler-magnifier-lens", cx: 6, cy: -11, r: 25 });
      add(group, "circle", { class: "profiler-magnifier-glass", cx: 6, cy: -11, r: 17 });
      add(group, "path", { class: "profiler-magnifier-arm", d: "M6-38V-21M23 7L43 27" });
      add(group, "path", { class: "profiler-ticket", d: "M-119-74H-61L-57-49H-115Z" });
      const ticket = add(group, "text", { class: "profiler-ticket-text", x: -88, y: -58, "text-anchor": "middle" });
      ticket.textContent = "ECA36";
      add(group, "path", { class: "profiler-rail-foot", d: "M-124 79L-132 100H-97L-88 80ZM88 80L97 100H132L123 79Z" });
    }
    return true;
  }

  if (item.family === "auckland-volcanic-field-monitor") {
    group.classList.add("auckland-accessory", "volcanic-monitor", companion ? "volcanic-monitor-companion" : "volcanic-monitor-primary");
    if (companion) {
      add(group, "path", { class: "auckland-accessory-shadow", d: "M-86 109Q0 132 89 105Q45 144-77 138Z" });
      add(group, "path", { class: "monitor-triangle-frame", d: "M0-119L-70 87H72ZM0-91L-50 72H52Z" });
      add(group, "path", { class: "monitor-triangle-brace", d: "M-54 42H56M-36-8H37M-18-60H19" });
      add(group, "path", { class: "monitor-pendulum-wire", d: "M0-87V22" });
      add(group, "ellipse", { class: "monitor-pendulum-bob", cx: 0, cy: 34, rx: 17, ry: 24 });
      add(group, "path", { class: "monitor-pendulum-pointer", d: "M0 58L-12 77H12Z" });
      add(group, "circle", { class: "monitor-amplitude-dial", cx: 0, cy: -25, r: 30 });
      add(group, "path", { class: "monitor-amplitude-arc", d: "M-20-17Q0-43 21-17M0-25L16-38" });
      [-18,-9,0,9,18].forEach(x => add(group, "path", { class: "monitor-dial-tick", d: `M${x} ${-18-Math.abs(x)*.18}L${x*.82} ${-23-Math.abs(x)*.2}` }));
      add(group, "path", { class: "monitor-sensor-link", d: "M-69 87L-88 111M0 87V118M71 87L91 111" });
      [[-89,114],[0,121],[92,114]].forEach(([cx,cy], index) => add(group, "ellipse", { class: index === 1 ? "monitor-sensor-foot centre" : "monitor-sensor-foot", cx, cy, rx: 18, ry: 7 }));
      add(group, "path", { class: "monitor-folded-chart", d: "M56-23L103-38L116 32L70 48Z" });
      add(group, "path", { class: "monitor-chart-fold", d: "M80-30L92 39M60 4L111-11" });
      add(group, "path", { class: "monitor-chart-trace", d: "M64 18L74 8L83 22L93-3L103 15L111 7" });
    } else {
      add(group, "path", { class: "auckland-accessory-shadow", d: "M-150 83Q-1 112 153 80Q76 127-138 121Z" });
      add(group, "path", { class: "monitor-wide-frame", d: "M-133-77V68H135V-77M-133-61H135M-133 58H135" });
      add(group, "path", { class: "monitor-frame-brace", d: "M-109-61V61M105-61V61M-133 19H135" });
      add(group, "path", { class: "monitor-drum-axle", d: "M-102-5H111" });
      add(group, "path", { class: "monitor-paper-drum", d: "M-86-46H55Q81-44 81-4Q81 37 55 42H-86Z" });
      add(group, "ellipse", { class: "monitor-drum-end", cx: -86, cy: -2, rx: 21, ry: 44 });
      add(group, "ellipse", { class: "monitor-drum-cap", cx: 55, cy: -2, rx: 22, ry: 43 });
      [-67,-46,-25,-4,17,38].forEach(x => add(group, "path", { class: "monitor-paper-rule", d: `M${x}-41V37` }));
      [-29,-11,7,25].forEach(y => add(group, "path", { class: "monitor-paper-rule faint", d: `M-84 ${y}H57` }));
      add(group, "path", { class: "monitor-trace", d: "M-84 11L-66 8L-55 18L-44-4L-31 16L-15 12L-2-17L12 19L26 8L39 14L55-2" });
      add(group, "path", { class: "monitor-suspension", d: "M76-77V-45L93-30V5" });
      add(group, "path", { class: "monitor-spring", d: "M76-47L68-40L84-33L68-26L84-19L68-12L84-5L76 3" });
      add(group, "ellipse", { class: "monitor-suspended-mass", cx: 76, cy: 22, rx: 20, ry: 17 });
      add(group, "path", { class: "monitor-stylus-arm", d: "M76 20L39 4L15 10" });
      add(group, "circle", { class: "monitor-stylus-tip", cx: 14, cy: 10, r: 4 });
      add(group, "path", { class: "monitor-four-feet", d: "M-119 67L-132 96H-95L-84 68ZM-42 68L-52 96H-17L-8 68ZM15 68L25 96H60L49 68ZM91 68L103 96H140L125 67Z" });
    }
    return true;
  }

  if (item.family === "eca36-reproductive-timing-clock") {
    group.classList.add("auckland-accessory", "timing-clock", companion ? "timing-clock-companion" : "timing-clock-primary");
    if (companion) {
      add(group, "path", { class: "auckland-accessory-shadow", d: "M-78 119Q0 140 82 116Q42 150-70 145Z" });
      add(group, "path", { class: "timing-counter-frame", d: "M-53-121H52L63 97H-63Z" });
      add(group, "path", { class: "timing-counter-branch", d: "M0-95V-66L-31-45V-15M0-66L31-45V-15" });
      add(group, "rect", { class: "timing-flip-window early", x: -50, y: -21, width: 45, height: 39, rx: 5 });
      add(group, "rect", { class: "timing-flip-window late", x: 5, y: -21, width: 45, height: 39, rx: 5 });
      const early = add(group, "text", { class: "timing-window-label", x: -28, y: 4, "text-anchor": "middle" });
      early.textContent = "EARLY";
      const late = add(group, "text", { class: "timing-window-label", x: 28, y: 4, "text-anchor": "middle" });
      late.textContent = "LATE";
      add(group, "path", { class: "timing-progeny-chute", d: "M-42 18V65L-58 86H-16L-31 65V18" });
      add(group, "path", { class: "timing-male-chute", d: "M19 18V48L7 66H47L34 48V18" });
      [[-43,30],[-32,39],[-46,49],[-27,57],[-39,66],[-21,73]].forEach(([cx,cy], index) => add(group, "circle", { class: index % 2 ? "timing-progeny-bead deep" : "timing-progeny-bead", cx, cy, r: 4.2 }));
      [[24,30],[31,41],[23,51]].forEach(([cx,cy]) => add(group, "circle", { class: "timing-male-tally", cx, cy, r: 3.7 }));
      add(group, "path", { class: "timing-x-gate", d: "M-16 77H39V104H-16ZM-6 84L28 98M28 84L-6 98" });
      const xLabel = add(group, "text", { class: "timing-x-label", x: 12, y: 94, "text-anchor": "middle" });
      xLabel.textContent = "X";
      add(group, "path", { class: "timing-counter-foot", d: "M-57 96L-70 126H-31L-22 99ZM22 99L31 126H71L57 95Z" });
    } else {
      add(group, "path", { class: "auckland-accessory-shadow", d: "M-130 102Q0 130 133 99Q67 144-119 137Z" });
      add(group, "circle", { class: "timing-clock-outer", cx: 0, cy: -7, r: 90 });
      add(group, "circle", { class: "timing-clock-face", cx: 0, cy: -7, r: 70 });
      add(group, "path", { class: "timing-clock-sector early", d: "M0-7L0-77A70 70 0 0 0-61 27Z" });
      add(group, "path", { class: "timing-clock-sector late", d: "M0-7L-61 27A70 70 0 1 0 0-77Z" });
      add(group, "path", { class: "timing-clock-divider", d: "M0-76V-7L-60 27" });
      add(group, "path", { class: "timing-clock-hand", d: "M0-7L43-47M0-7L-28 38" });
      add(group, "circle", { class: "timing-clock-hub", cx: 0, cy: -7, r: 8 });
      const labels = [[0,-51,"0"],[-42,19,"36"],[42,28,"72"]];
      labels.forEach(([x,y,value]) => {
        const label = add(group, "text", { class: "timing-hour-label", x, y, "text-anchor": "middle" });
        label.textContent = value;
      });
      for (let index = 0; index < 14; index += 1) {
        const angle = (-154 + index * 24) * Math.PI / 180;
        add(group, "circle", { class: index % 3 ? "timing-progeny-bead" : "timing-progeny-bead deep", cx: Math.cos(angle) * 106, cy: -7 + Math.sin(angle) * 106, r: index % 2 ? 4.5 : 5.4 });
      }
      add(group, "path", { class: "timing-bead-rail", d: "M-101-44A108 108 0 1 0 103-39" });
      add(group, "path", { class: "timing-male-aperture", d: "M-35 62H37L42 88H-40Z" });
      [[-22,74],[-8,75],[7,74],[21,76]].forEach(([cx,cy], index) => add(group, "circle", { class: index === 2 ? "timing-male-tally warm" : "timing-male-tally", cx, cy, r: 4 }));
      const labLabel = add(group, "text", { class: "timing-assay-label", x: 0, y: 85, "text-anchor": "middle" });
      labLabel.textContent = "LAB ASSAY";
      add(group, "path", { class: "timing-eca36-tag", d: "M75-93H132L139-67L83-61Z" });
      const tag = add(group, "text", { class: "timing-eca36-text", x: 108, y: -72, "text-anchor": "middle" });
      tag.textContent = "ECA36";
    }
    return true;
  }

  return false;
}

function drawAraucaniaAccessory(group, item, companion) {
  if (!item.id.startsWith("elegans::Araucanía, Chile::")) return false;

  if (item.family === "compost-labyrinth") {
    group.dataset.renderer = "araucania-ju4400-compost-labyrinth";
    group.classList.add("araucania-accessory", "compost-labyrinth", companion ? "compost-labyrinth-companion" : "compost-labyrinth-primary");
    if (companion) {
      add(group, "path", { class: "araucania-accessory-shadow", d: "M-89 112Q0 137 91 109Q45 150-81 145Z" });
      add(group, "path", { class: "labyrinth-helix-chassis", d: "M-61-112H60L72 92H-70ZM-52-82H52M-60-10H61M-65 59H67" });
      const decks = [[0,-70,48,17],[3,0,55,19],[-2,69,61,21]];
      decks.forEach(([cx, cy, rx, ry], index) => {
        add(group, "ellipse", { class: index % 2 ? "labyrinth-helix-deck deep" : "labyrinth-helix-deck", cx, cy, rx, ry });
        add(group, "ellipse", { class: "labyrinth-helix-deck-inner", cx, cy, rx: rx - 11, ry: ry - 6 });
      });
      add(group, "path", { class: "labyrinth-helix-track", d: "M-42-74C-9-92 43-85 42-65C40-43-40-51-38-20C-36 7 52-18 50 8C48 37-49 25-49 62C-48 91 26 86 47 72" });
      [[-45,-72,-57,-49],[49,-2,64,19]].forEach(([x1,y1,x2,y2], index) => {
        add(group, "path", { class: "labyrinth-sliding-gate", d: `M${x1} ${y1}L${x2} ${y2}` });
        add(group, "rect", { class: "labyrinth-gate-slider", x: index ? 51 : -62, y: index ? 6 : -58, width: 14, height: 9, rx: 2 });
      });
      add(group, "path", { class: "labyrinth-catch-drawer", d: "M-48 88H49L58 120H-59Z" });
      add(group, "path", { class: "labyrinth-drawer-front", d: "M-42 98H43L39 114H-40Z" });
      add(group, "circle", { class: "labyrinth-drawer-pull", cx: 0, cy: 106, r: 4 });
      add(group, "path", { class: "labyrinth-ch417-plate", d: "M-51-106H37L43-83H-48Z" });
      const formerName = add(group, "text", { class: "labyrinth-plate-text", x: -4, y: -91, "text-anchor": "middle" });
      formerName.textContent = "Ch41.7";
      add(group, "path", { class: "labyrinth-helix-foot", d: "M-64 91L-76 124H-35L-26 94ZM28 95L38 124H78L64 90Z" });
    } else {
      add(group, "path", { class: "araucania-accessory-shadow", d: "M-153 78Q0 112 157 74Q79 129-140 122Z" });
      add(group, "path", { class: "labyrinth-table-frame", d: "M-143-14Q-132-71-79-83Q-34-105 11-80Q58-94 105-68Q143-47 141 8Q142 56 96 75Q49 96 4 76Q-45 99-93 75Q-139 57-143-14ZM-120-9Q-111-52-71-62Q-34-79 3-60Q43-72 82-51Q114-34 114 5Q115 40 79 54Q42 70 5 55Q-33 73-71 55Q-112 41-120-9Z" });
      add(group, "path", { class: "labyrinth-kidney-surface", d: "M-115-8Q-105-46-69-56Q-35-72 1-55Q39-67 78-47Q108-31 109 4Q110 35 76 49Q40 64 6 50Q-30 68-67 50Q-106 37-115-8Z" });
      add(group, "path", { class: "labyrinth-grooved-track", d: "M-93-14C-77-48-36-50-20-25C-3 1-46 17-22 39C3 60 30 25 52 39C74 54 99 26 90 4C81-19 42-9 31-31C19-55 66-67 91-39" });
      const clasts = [
        [-74,-22,-16,11],[-42,19,9,-13],[-12,-26,-9,14],[18,16,10,-12],[49,-25,-12,14],[76,8,13,-9],[6,43,-14,8]
      ];
      clasts.forEach(([cx,cy,rx,ry], index) => {
        add(group, "path", { class: index % 3 === 0 ? "labyrinth-compost-island green" : (index % 2 ? "labyrinth-compost-island deep" : "labyrinth-compost-island"), d: `M${cx-rx} ${cy}Q${cx} ${cy+ry*1.4} ${cx+rx} ${cy}Q${cx} ${cy-ry*1.4} ${cx-rx} ${cy}Z` });
        add(group, "path", { class: "labyrinth-island-vein", d: `M${cx-rx*.65} ${cy+1}L${cx+rx*.65} ${cy-1}` });
      });
      add(group, "path", { class: "labyrinth-worm-token", d: "M-83 10Q-66-3-54 12Q-43 25-28 10" });
      add(group, "circle", { class: "labyrinth-worm-token-head", cx: -27, cy: 10, r: 4.5 });
      add(group, "circle", { class: "labyrinth-gate-hinge", cx: 103, cy: -25, r: 7 });
      add(group, "path", { class: "labyrinth-articulated-gate", d: "M103-25L126-3L116 7L94-15Z" });
      add(group, "path", { class: "labyrinth-ticket", d: "M-138-75H-63L-57-48H-132Z" });
      const ticketTop = add(group, "text", { class: "labyrinth-ticket-text", x: -98, y: -64, "text-anchor": "middle" });
      ticketTop.textContent = "JU4400";
      const ticketBottom = add(group, "text", { class: "labyrinth-ticket-text small", x: -96, y: -54, "text-anchor": "middle" });
      ticketBottom.textContent = "COMPOST";
      add(group, "path", { class: "labyrinth-table-feet", d: "M-114 58L-129 95H-92L-80 67ZM78 60L90 95H128L112 55Z" });
    }
    return true;
  }

  if (item.family === "ashfall-recorder") {
    group.dataset.renderer = "araucania-llaima-ashfall-recorder";
    group.classList.add("araucania-accessory", "ashfall-recorder", companion ? "ashfall-recorder-companion" : "ashfall-recorder-primary");
    if (companion) {
      add(group, "path", { class: "araucania-accessory-shadow", d: "M-82 115Q3 139 88 112Q46 151-74 145Z" });
      add(group, "path", { class: "ash-cassette-chassis", d: "M-54-116H49L61 100H-63Z" });
      [-82,-38,6,50].forEach((y, index) => {
        add(group, "path", { class: index % 2 ? "ash-cassette-tray deep" : "ash-cassette-tray", d: `M-43 ${y}H40L46 ${y+29}H-48Z` });
        add(group, "rect", { class: "ash-cassette-window", x: -30 + (index % 2) * 7, y: y + 7, width: 57, height: 12, rx: 3 });
        add(group, "path", { class: "ash-cassette-handle", d: `M-10 ${y+24}H11` });
      });
      add(group, "circle", { class: "ash-analog-dial", cx: 0, cy: -91, r: 23 });
      add(group, "path", { class: "ash-dial-scale", d: "M-15-84Q0-105 16-84M0-91L11-102" });
      add(group, "path", { class: "ash-vial-chamber", d: "M-38 91H38L44 122H-44Z" });
      add(group, "path", { class: "ash-vial-body", d: "M-12 88H13L10 113Q0 121-10 113Z" });
      add(group, "path", { class: "ash-vial-cap", d: "M-15 82H16V91H-15Z" });
      add(group, "path", { class: "ash-panel-hinge", d: "M51-55H68M54-17H74M57 20H78" });
      add(group, "path", { class: "ash-supported-side-panel", d: "M70-70L112-55L107 53L76 67Z" });
      add(group, "path", { class: "ash-side-panel-brace", d: "M70-55L102-42M74-13L107 0M77 30L105 41M75 66L58 92" });
      add(group, "path", { class: "ash-cassette-foot", d: "M-57 98L-70 128H-31L-21 102ZM24 102L35 128H74L58 97Z" });
    } else {
      add(group, "path", { class: "araucania-accessory-shadow", d: "M-151 88Q0 119 155 84Q78 135-139 128Z" });
      add(group, "path", { class: "ash-sector-cabinet", d: "M-109-77L91-77L139-32V48L97 84H-103L-140 43V-34Z" });
      add(group, "circle", { class: "ash-sector-wheel", cx: -9, cy: 1, r: 62 });
      [-90,-30,30,90,150,210].forEach((angle, index) => {
        const radians = angle * Math.PI / 180;
        const x = -9 + Math.cos(radians) * 61;
        const y = 1 + Math.sin(radians) * 61;
        add(group, "path", { class: "ash-sector-divider", d: `M-9 1L${x.toFixed(1)} ${y.toFixed(1)}` });
        const coverX = -9 + Math.cos(radians + Math.PI / 6) * 39;
        const coverY = 1 + Math.sin(radians + Math.PI / 6) * 39;
        add(group, "path", { class: index % 2 ? "ash-deposition-cell deep" : "ash-deposition-cell", d: `M${(coverX-11).toFixed(1)} ${(coverY-7).toFixed(1)}h22v14h-22Z` });
      });
      add(group, "path", { class: "ash-direction-pointer", d: "M-9 1L30-41L20-12Z" });
      add(group, "circle", { class: "ash-pointer-hub", cx: -9, cy: 1, r: 8 });
      add(group, "path", { class: "ash-counter-shell", d: "M65-54H117L123-17H70Z" });
      [-47,-29,-11].forEach((y, index) => add(group, "rect", { class: index % 2 ? "ash-counter-window deep" : "ash-counter-window", x: 76, y, width: 34, height: 12, rx: 2 }));
      add(group, "path", { class: "ash-chart-hinge", d: "M103 48H124M106 66H126" });
      add(group, "path", { class: "ash-fold-chart", d: "M124 34L157 45L151 100L119 87Z" });
      add(group, "path", { class: "ash-chart-folds", d: "M136 39L133 92M122 61L154 72" });
      add(group, "path", { class: "ash-chart-trace", d: "M124 78L132 69L138 80L144 58L151 67" });
      add(group, "path", { class: "ash-cabinet-feet", d: "M-113 72L-126 105H-87L-77 83ZM75 82L88 105H128L108 73Z" });
    }
    return true;
  }

  if (item.family === "test-cross-mechanism") {
    group.dataset.renderer = "araucania-ju4400-test-cross-identifier";
    group.classList.add("araucania-accessory", "test-cross-identifier", companion ? "test-cross-identifier-companion" : "test-cross-identifier-primary");
    if (companion) {
      add(group, "path", { class: "araucania-accessory-shadow", d: "M-108 91Q0 121 111 87Q56 137-99 130Z" });
      add(group, "circle", { class: "cross-dial-outer", cx: -12, cy: -5, r: 78 });
      add(group, "circle", { class: "cross-dial-gate outer", cx: -12, cy: -5, r: 59 });
      add(group, "circle", { class: "cross-dial-gate middle", cx: -12, cy: -5, r: 39 });
      add(group, "circle", { class: "cross-dial-gate inner", cx: -12, cy: -5, r: 20 });
      add(group, "path", { class: "cross-dial-spokes", d: "M-90-5H66M-12-83V73M-67-60L43 50M43-60L-67 50" });
      add(group, "path", { class: "cross-entry-port left", d: "M-111-24H-77V14H-111L-126 2V-12Z" });
      add(group, "path", { class: "cross-entry-port right", d: "M53-24H87L103-12V2L87 14H53Z" });
      add(group, "circle", { class: "cross-dial-hub", cx: -12, cy: -5, r: 9 });
      add(group, "path", { class: "cross-observation-hinge", d: "M56 44L76 58M65 29L84 42" });
      add(group, "path", { class: "cross-folding-panel", d: "M78 38L128 55L117 113L68 95Z" });
      [[81,54],[104,62],[77,76],[100,84]].forEach(([x,y], index) => add(group, "rect", { class: index % 2 ? "cross-blank-window deep" : "cross-blank-window", x, y, width: 16, height: 13, rx: 2 }));
      add(group, "path", { class: "cross-panel-brace", d: "M70 94L51 113M78 38L64 22" });
    } else {
      add(group, "path", { class: "araucania-accessory-shadow", d: "M-161 75Q0 106 165 71Q83 121-148 115Z" });
      add(group, "path", { class: "cross-bridge-base", d: "M-150 43H151L137 74H-139Z" });
      add(group, "path", { class: "cross-track-rail upper", d: "M-131-23H-49Q-30-23-25-7H24Q30-23 49-23H129" });
      add(group, "path", { class: "cross-track-rail lower", d: "M-131 23H-49Q-30 23-25 7H24Q30 23 49 23H129" });
      add(group, "path", { class: "cross-entry-chamber left", d: "M-150-48H-101L-82-23V23L-101 48H-150Z" });
      add(group, "path", { class: "cross-entry-chamber right", d: "M150-48H101L82-23V23L101 48H150Z" });
      add(group, "path", { class: "cross-central-chamber", d: "M-38-38H38L51 0L38 38H-38L-51 0Z" });
      add(group, "path", { class: "cross-central-gate", d: "M-26-24L26 24M26-24L-26 24" });
      [[-86,-11],[-86,14],[65,-11],[65,14]].forEach(([x,y], index) => add(group, "rect", { class: index % 2 ? "cross-blank-window deep" : "cross-blank-window", x, y, width: 21, height: 15, rx: 3 }));
      add(group, "path", { class: "cross-window-divider", d: "M-76-11V4M-86-3H-65M-76 14V29M-86 22H-65M75-11V4M65-3H86M75 14V29M65 22H86" });
      add(group, "path", { class: "cross-result-mast", d: "M112-47V-72H139" });
      add(group, "circle", { class: "cross-result-hinge", cx: 112, cy: -47, r: 6 });
      add(group, "path", { class: "cross-result-flag", d: "M139-78L169-69L160-47L139-54Z" });
      add(group, "path", { class: "cross-bridge-feet", d: "M-133 64L-145 94H-108L-97 68ZM99 68L111 94H149L134 63Z" });
      add(group, "path", { class: "cross-ju4400-plate", d: "M-31 46H35L40 67H-36Z" });
      const identifierLabel = add(group, "text", { class: "cross-ju4400-text", x: 2, y: 60, "text-anchor": "middle" });
      identifierLabel.textContent = "JU4400";
    }
    return true;
  }

  return false;
}

function drawTrivandrumAccessory(group, item, companion) {
  if (!item.id.startsWith("nigoni::Trivandrum, Kerala · JU1325::")) return false;

  if (item.family === "ju1325-sample-tube-timekeeper") {
    group.dataset.renderer = "trivandrum-ju1325-sample-tube-timekeeper";
    group.classList.add("trivandrum-accessory", "sample-tube-timekeeper", companion ? "sample-tube-timekeeper-companion" : "sample-tube-timekeeper-primary");
    if (companion) {
      add(group, "path", { class: "trivandrum-accessory-shadow", d: "M-86 119Q5 145 95 115Q49 155-77 150Z" });
      add(group, "path", { class: "timekeeper-tripod", d: "M-47 82L-76 132H-39L-14 88ZM35 84L58 132H93L55 78ZM-9 81L-18 132H19L9 81Z" });
      add(group, "rect", { class: "timekeeper-upright-frame", x: -43, y: -119, width: 82, height: 204, rx: 16 });
      add(group, "rect", { class: "timekeeper-glass chamber-upper", x: -28, y: -101, width: 50, height: 77, rx: 19 });
      add(group, "rect", { class: "timekeeper-glass chamber-lower", x: -28, y: -13, width: 50, height: 78, rx: 18 });
      add(group, "path", { class: "timekeeper-chamber-divider", d: "M-31-21H26V-13H-31Z" });
      [[-17,-78,-5,-91],[1,-72,14,-86],[-10,-51,6,-66],[5,-41,18,-53]].forEach(([x1,y1,x2,y2], index) => {
        add(group, "path", { class: index % 2 ? "timekeeper-petal deep" : "timekeeper-petal", d: `M${x1} ${y1}Q${(x1+x2)/2} ${Math.min(y1,y2)-7} ${x2} ${y2}Q${(x1+x2)/2+3} ${Math.max(y1,y2)+4} ${x1} ${y1}Z` });
      });
      [[-18,17,-2,3],[-4,31,13,14],[-16,49,2,34],[4,56,17,40]].forEach(([x1,y1,x2,y2], index) => {
        add(group, "path", { class: index % 2 ? "timekeeper-leaf deep" : "timekeeper-leaf", d: `M${x1} ${y1}Q${(x1+x2)/2} ${Math.min(y1,y2)-6} ${x2} ${y2}Q${(x1+x2)/2+4} ${Math.max(y1,y2)+5} ${x1} ${y1}Z` });
        add(group, "path", { class: "timekeeper-leaf-vein", d: `M${x1+2} ${y1-1}L${x2-2} ${y2+1}` });
      });
      add(group, "path", { class: "timekeeper-stopper", d: "M-32-126H26L30-105H-35Z" });
      add(group, "path", { class: "timekeeper-side-port-housing", d: "M38-16H70L82-5V14L70 26H38Z" });
      add(group, "circle", { class: "timekeeper-side-port-valve", cx: 66, cy: 5, r: 13 });
      add(group, "path", { class: "timekeeper-side-port-spokes", d: "M53 5H79M66-8V18M57-4L75 14M75-4L57 14" });
      add(group, "path", { class: "timekeeper-day-counter-frame", d: "M-82-83H-44V56H-82Z" });
      [-65,-37,-9,19].forEach((y, index) => add(group, "rect", { class: index % 2 ? "timekeeper-day-window deep" : "timekeeper-day-window", x: -74, y, width: 22, height: 17, rx: 3 }));
      const dayLabel = add(group, "text", { class: "timekeeper-day-label", x: -63, y: 49, "text-anchor": "middle" });
      dayLabel.textContent = "14 D";
      add(group, "path", { class: "timekeeper-agar-drawer", d: "M-36 70H47L58 105H-47Z" });
      add(group, "path", { class: "timekeeper-drawer-front", d: "M-31 82H42L39 99H-35Z" });
      add(group, "circle", { class: "timekeeper-drawer-pull", cx: 4, cy: 90, r: 4 });
    } else {
      add(group, "path", { class: "trivandrum-accessory-shadow", d: "M-157 91Q0 123 164 87Q82 139-145 132Z" });
      add(group, "path", { class: "timekeeper-yoke-base", d: "M-130 52H131L146 84H-143Z" });
      add(group, "ellipse", { class: "timekeeper-rotating-yoke", cx: -8, cy: -9, rx: 126, ry: 71 });
      add(group, "path", { class: "timekeeper-yoke-supports", d: "M-129-10V53M113-10V53M-139 53L-151 96H-112L-97 55M102 55L117 96H157L140 52" });
      [-1, 1].forEach(side => add(group, "circle", { class: "timekeeper-yoke-pivot", cx: side < 0 ? -129 : 113, cy: -10, r: 11 }));
      add(group, "rect", { class: "timekeeper-glass horizontal", x: -116, y: -42, width: 213, height: 65, rx: 31 });
      add(group, "path", { class: "timekeeper-tube-meniscus", d: "M-100 10Q-52-3-8 10Q41-4 82 8" });
      add(group, "path", { class: "timekeeper-stopper", d: "M-137-35H-109V17H-137L-147 7V-25Z" });
      [[-88,-17,-68,-31],[-64,4,-42,-16],[-34,-19,-14,-33],[-6,4,16,-14]].forEach(([x1,y1,x2,y2], index) => {
        add(group, "path", { class: index % 2 ? "timekeeper-petal deep" : "timekeeper-petal", d: `M${x1} ${y1}Q${(x1+x2)/2} ${Math.min(y1,y2)-8} ${x2} ${y2}Q${(x1+x2)/2+3} ${Math.max(y1,y2)+5} ${x1} ${y1}Z` });
      });
      [[20,-13,39,-28],[39,5,60,-13],[58,-12,78,-27],[67,11,88,-4]].forEach(([x1,y1,x2,y2], index) => {
        add(group, "path", { class: index % 2 ? "timekeeper-leaf deep" : "timekeeper-leaf", d: `M${x1} ${y1}Q${(x1+x2)/2} ${Math.min(y1,y2)-7} ${x2} ${y2}Q${(x1+x2)/2+3} ${Math.max(y1,y2)+5} ${x1} ${y1}Z` });
        add(group, "path", { class: "timekeeper-leaf-vein", d: `M${x1+2} ${y1-1}L${x2-2} ${y2+1}` });
      });
      for (let index = 0; index < 14; index += 1) {
        const angle = (-164 + index * (328 / 13)) * Math.PI / 180;
        const x1 = -8 + Math.cos(angle) * 132;
        const y1 = -9 + Math.sin(angle) * 77;
        const x2 = -8 + Math.cos(angle) * 143;
        const y2 = -9 + Math.sin(angle) * 85;
        add(group, "path", { class: index % 7 === 0 ? "timekeeper-ring-tick major" : "timekeeper-ring-tick", d: `M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}` });
      }
      add(group, "path", { class: "timekeeper-date-tag", d: "M-87-94H4L9-66H-82Z" });
      const dateText = add(group, "text", { class: "timekeeper-date-text", x: -39, y: -76, "text-anchor": "middle" });
      dateText.textContent = "21 DEC 2007";
      add(group, "circle", { class: "timekeeper-transfer-hinge", cx: 93, cy: 30, r: 9 });
      add(group, "path", { class: "timekeeper-transfer-chute", d: "M96 22L139 35L128 54L91 39Z" });
      add(group, "path", { class: "timekeeper-culture-deck", d: "M113 52H165L157 84H108Z" });
      add(group, "path", { class: "timekeeper-culture-rim", d: "M117 58H159L155 76H113Z" });
      add(group, "path", { class: "timekeeper-deck-brace", d: "M119 82L111 99M151 82L159 99" });
    }
    return true;
  }

  if (item.family === "trivandrum-garden-waterworks") {
    group.dataset.renderer = "trivandrum-garden-waterworks";
    group.classList.add("trivandrum-accessory", "garden-waterworks", companion ? "garden-waterworks-companion" : "garden-waterworks-primary");
    if (companion) {
      add(group, "path", { class: "trivandrum-accessory-shadow", d: "M-79 121Q4 145 87 117Q45 155-71 150Z" });
      add(group, "path", { class: "waterworks-column-base", d: "M-49 91H49L63 127H-62Z" });
      add(group, "path", { class: "waterworks-pump-column", d: "M-31-117H27L37 94H-40Z" });
      add(group, "path", { class: "waterworks-column-cap", d: "M-42-126H38L44-107H-47Z" });
      [[-91,-68],[-91,2]].forEach(([x,y], index) => {
        add(group, "path", { class: index ? "waterworks-stacked-cistern deep" : "waterworks-stacked-cistern", d: `M${x} ${y}H-43V${y+52}H${x-8}L${x-17} ${y+26}Z` });
        add(group, "path", { class: "waterworks-cistern-band", d: `M${x+4} ${y+14}H-47M${x+1} ${y+37}H-47` });
      });
      add(group, "path", { class: "waterworks-s-pipe", d: "M24-87C72-89 80-58 51-40C24-24 34 5 69 8C99 10 96 45 62 50V77" });
      add(group, "path", { class: "waterworks-pipe-joints", d: "M48-48H69M54 3H75M53 48H73M55 76H70" });
      add(group, "path", { class: "waterworks-sprinkler-head", d: "M49 76H77L83 88H43Z" });
      [[44,93,26,103],[53,96,42,112],[62,96,66,112],[72,92,88,103]].forEach(([x1,y1,x2,y2], index) => add(group, "path", { class: index % 2 ? "waterworks-spray-leaf deep" : "waterworks-spray-leaf", d: `M${x1} ${y1}Q${(x1+x2)/2} ${Math.min(y1,y2)-5} ${x2} ${y2}Q${(x1+x2)/2+3} ${Math.max(y1,y2)+4} ${x1} ${y1}Z` }));
      add(group, "path", { class: "waterworks-sight-gauge", d: "M-18-81H13V51H-18Z" });
      [-58,-29,0,29].forEach(y => add(group, "path", { class: "waterworks-gauge-tick", d: `M-10 ${y}H7` }));
      add(group, "path", { class: "waterworks-gauge-level", d: "M-12 18H7V45H-12Z" });
      add(group, "circle", { class: "waterworks-column-valve", cx: -4, cy: 72, r: 16 });
      add(group, "path", { class: "waterworks-valve-spokes", d: "M-20 72H12M-4 56V88M-15 61L7 83M7 61L-15 83" });
    } else {
      add(group, "path", { class: "trivandrum-accessory-shadow", d: "M-158 91Q0 124 163 87Q82 139-146 132Z" });
      add(group, "path", { class: "waterworks-lake-basin", d: "M-151 19Q-127-29-64-39Q-3-53 56-31Q115-39 151 4L139 57Q79 92 12 71Q-55 94-124 66Z" });
      add(group, "path", { class: "waterworks-basin-water", d: "M-134 20Q-107-12-58-20Q-6-33 44-15Q91-22 130 7L122 42Q74 66 15 53Q-43 72-111 51Z" });
      add(group, "path", { class: "waterworks-basin-ripple", d: "M-108 17Q-73 4-42 17M-23 1Q12-10 46 4M60 22Q92 11 119 25" });
      add(group, "path", { class: "waterworks-pump-body", d: "M-119-56H-70L-62 37H-128Z" });
      add(group, "path", { class: "waterworks-pump-cap", d: "M-128-67H-62L-57-49H-133Z" });
      add(group, "circle", { class: "waterworks-handwheel", cx: -96, cy: -41, r: 31 });
      add(group, "circle", { class: "waterworks-wheel-hub", cx: -96, cy: -41, r: 6 });
      [-90,-45,0,45].forEach(angle => {
        const radians = angle * Math.PI / 180;
        const x = Math.cos(radians) * 27;
        const y = Math.sin(radians) * 27;
        add(group, "path", { class: "waterworks-wheel-spoke", d: `M${-96-x} ${-41-y}L${-96+x} ${-41+y}` });
      });
      add(group, "path", { class: "waterworks-feed-pipe", d: "M-69-28H-34V-5H4V15H37" });
      add(group, "path", { class: "waterworks-pipe-joints", d: "M-39-35V-21M-3-12V2M31 7V22" });
      const terraces = [
        [23,-25,122,-25,137,-3,35,-3],
        [40,4,143,4,132,28,52,28],
        [60,34,128,34,112,57,69,57]
      ];
      terraces.forEach((points, index) => {
        const [x1,y1,x2,y2,x3,y3,x4,y4] = points;
        add(group, "path", { class: index % 2 ? "waterworks-terrace-bed deep" : "waterworks-terrace-bed", d: `M${x1} ${y1}H${x2}L${x3} ${y3}H${x4}Z` });
        add(group, "path", { class: "waterworks-terrace-channel", d: `M${x1+6} ${y1+8}H${x2-10}L${x3-10} ${y3-7}H${x4+8}` });
      });
      [[55,-17],[90,-15],[64,13],[104,15],[82,44]].forEach(([x,y], index) => {
        add(group, "path", { class: index % 2 ? "waterworks-bed-leaf deep" : "waterworks-bed-leaf", d: `M${x} ${y+11}Q${x-13} ${y-5} ${x-20} ${y+8}Q${x-8} ${y+18} ${x} ${y+11}ZM${x} ${y+11}Q${x+14} ${y-6} ${x+21} ${y+8}Q${x+9} ${y+18} ${x} ${y+11}Z` });
      });
      add(group, "path", { class: "waterworks-basin-feet", d: "M-126 60L-139 96H-100L-87 70M98 66L112 96H151L136 57" });
    }
    return true;
  }

  if (item.family === "trivandrum-bandstand-music-box") {
    group.dataset.renderer = "trivandrum-bandstand-music-box";
    group.classList.add("trivandrum-accessory", "bandstand-music-box", companion ? "bandstand-music-box-companion" : "bandstand-music-box-primary");
    if (companion) {
      add(group, "path", { class: "trivandrum-accessory-shadow", d: "M-89 119Q4 146 95 115Q49 156-80 150Z" });
      add(group, "path", { class: "music-cabinet-body", d: "M-72-79L-47-111H49L76-78V93H-72Z" });
      add(group, "path", { class: "music-cabinet-canopy", d: "M-84-76L-49-126H51L87-76L69-64H-68Z" });
      add(group, "path", { class: "music-canopy-ribs", d: "M-49-119L-26-72M1-119V-69M50-119L27-72" });
      [-46,0,46].forEach((cx, index) => {
        add(group, "path", { class: index === 1 ? "music-cabinet-arch centre" : "music-cabinet-arch", d: `M${cx-21} 54V-31Q${cx} -59 ${cx+21}-31V54Z` });
      });
      add(group, "rect", { class: "music-vertical-roll", x: -15, y: -43, width: 30, height: 98, rx: 12 });
      [-31,-15,1,17,33].forEach((y, row) => [-7,7].forEach((x, column) => add(group, "circle", { class: (row+column)%2 ? "music-roll-hole deep" : "music-roll-hole", cx: x, cy: y, r: 3.5 })));
      add(group, "path", { class: "music-roll-spindle", d: "M-23-44H23M-23 56H23" });
      [-43,43].forEach((x, index) => {
        add(group, "path", { class: index ? "music-hanging-reed deep" : "music-hanging-reed", d: `M${x}-29V46L${x+9} 62L${x-9} 62Z` });
        add(group, "circle", { class: "music-reed-pin", cx: x, cy: -33, r: 4 });
      });
      add(group, "path", { class: "music-folding-hinges", d: "M-74-48H-60M-74 3H-60M60-48H75M60 3H75" });
      add(group, "path", { class: "music-triangular-base", d: "M-81 91H84L61 126H-58Z" });
      add(group, "path", { class: "music-base-resonator", d: "M-42 99H45L34 116H-31Z" });
    } else {
      add(group, "path", { class: "trivandrum-accessory-shadow", d: "M-160 93Q0 126 165 88Q83 141-147 134Z" });
      add(group, "path", { class: "bandstand-pavilion-base", d: "M-139 57L-105 34H103L141 57L119 91H-117Z" });
      add(group, "path", { class: "bandstand-faceted-roof", d: "M-153-48L-107-87H-46L0-103L48-87H108L154-47L126-32H-128Z" });
      add(group, "path", { class: "bandstand-roof-facets", d: "M-107-87L-75-42M-46-87L-33-38M0-103V-35M48-87L33-38M108-87L74-42" });
      [-112,-80,-48,-16,16,48,80,112].forEach((x, index) => {
        add(group, "path", { class: index % 2 ? "bandstand-column deep" : "bandstand-column", d: `M${x-5}-38H${x+5}V59H${x-5}ZM${x-9}-43H${x+9}V-34H${x-9}ZM${x-9} 55H${x+9}V64H${x-9}Z` });
      });
      add(group, "path", { class: "bandstand-cylinder-frame", d: "M-74-10H75V44H-74Z" });
      add(group, "rect", { class: "bandstand-pinned-cylinder", x: -55, y: -2, width: 110, height: 34, rx: 16 });
      [-43,-25,-7,11,29,47].forEach((x, column) => [-1,10,21].forEach((y, row) => add(group, "circle", { class: (column+row)%2 ? "bandstand-cylinder-pin deep" : "bandstand-cylinder-pin", cx: x, cy: y, r: 2.8 })));
      add(group, "path", { class: "bandstand-cylinder-spindle", d: "M-70 15H-55M55 15H83" });
      add(group, "path", { class: "bandstand-winding-crank", d: "M82 15H111V-5H129" });
      add(group, "circle", { class: "bandstand-crank-handle", cx: 133, cy: -5, r: 6 });
      [-92,-76,-60,64,80,96].forEach((x, index) => add(group, "path", { class: index % 2 ? "bandstand-resonator-slat deep" : "bandstand-resonator-slat", d: `M${x} 2V44` }));
      add(group, "path", { class: "bandstand-pavilion-feet", d: "M-118 84L-130 108H-95L-84 89M84 88L96 108H132L117 82" });
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
      { const count=companion?5:8; for(let i=0;i<count;i+=1){const a=-74+i*(148/(count-1)); path(group,"M0 43Q-15-2 0-67Q16-4 0 43Z",i%2?"acc-accent":"acc-main").setAttribute("transform",`rotate(${a})`);} }
      return true;
    case "monocle":
      if(/cove/i.test(label)) {
        dot(group,0,0,companion?38:50,"acc-soft"); [-17,5,24].slice(0,companion?2:3).forEach((x,i)=>path(group,`M${x-11} ${i*5}Q${x} ${-10+i*3} ${x+11} ${i*5}Q${x} ${14+i*2} ${x-11} ${i*5}Z`,`acc-main`)); line(group,companion?"M30 24L54 61":"M39 31L72 81","acc-line thick");
      } else {
        path(group,companion?"M-51 3Q0-31 51 3Q0 37-51 3Z":"M-67 4Q0-42 67 4Q0 50-67 4Z","acc-soft"); for(let i=-2;i<=2;i+=1) line(group,`M${i*13} 12V${-8-Math.abs(i)*3}`); line(group,companion?"M42 13L63 50":"M55 17L84 67","acc-line thick");
      }
      return true;
    case "skates":
      [-29,29].forEach((x,j)=>{path(group,`M${x-22}-25L${x+20}-17L${x+16} 18L${x-18} 25Z`); const wheels=companion?2:3; for(let i=0;i<wheels;i+=1) dot(group,x-13+i*(26/(wheels-1)),31,6,j?"acc-accent":"acc-dark");});
      return true;
    case "skirt":
      if(/crater/i.test(label)) {
        add(group,"ellipse",{class:"acc-soft",cx:0,cy:5,rx:companion?47:61,ry:companion?28:36}); add(group,"ellipse",{class:"acc-main",cx:0,cy:5,rx:companion?29:39,ry:companion?16:21}); line(group,"M0-35V35");
      } else {
        const count=companion?3:5; for(let i=0;i<count;i+=1){add(group,"ellipse",{class:i%2?"acc-accent":"acc-main",cx:0,cy:-22+i*(companion?22:19),rx:(companion?25:31)+i*(companion?9:11),ry:10});} line(group,companion?"M0-43V51":"M0-57V65");
      }
      return true;
    case "snorkel":
      line(group,companion?"M-24 51Q-11 13-17-47H28V-25H3":"M-32 68Q-15 18-23-63H38V-33H4","acc-line thick"); path(group,companion?"M-41 12Q0-18 41 12Q0 38-41 12Z":"M-55 16Q0-25 55 16Q0 51-55 16Z","acc-soft");
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
      path(group,companion?"M-43 4L18-19L27-2L-34 21Z":"M-57 5L24-25L36-3L-45 28Z"); line(group,companion?"M-5 10L28 38L58 22 M28 38L9 68 M28 38L49 67":"M-7 13L38 51L78 29 M38 51L12 91 M38 51L66 89","acc-line thick");
      return true;
    case "umbrella":
      path(group,companion?"M0-60Q43-27 49 8Q21-5 0 11Q-21-5-49 8Q-43-27 0-60Z":"M0-80Q57-36 65 10Q28-7 0 15Q-28-7-65 10Q-57-36 0-80Z","acc-soft"); line(group,companion?"M0-55V67Q0 81-18 72":"M0-73V90Q0 108-24 97","acc-line thick");
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
      path(group,companion?"M-7 4Q-49-37-61-10Q-44 18-7 13Z M7 4Q49-37 61-10Q44 18 7 13Z":"M-9 3Q-65-60-80-24Q-59 16-9 16Z M9 3Q65-60 80-24Q59 16 9 16Z","acc-soft"); const veins=companion?[[-53,-10,-8,8],[53,-10,8,8]]:[[-70,-23,-9,10],[70,-23,9,10],[-54,4,-8,13],[54,4,8,13]]; veins.forEach(([x1,y1,x2,y2])=>line(group,`M${x1} ${y1}L${x2} ${y2}`));
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
  if (drawTenerifeAccessory(group, item, companion)) return true;
  if (drawKauaiAccessory(group, item, companion)) return true;
  if (drawAustralianCapitalTerritoryAccessory(group, item, companion)) return true;
  if (drawAucklandAccessory(group, item, companion)) return true;
  if (drawAraucaniaAccessory(group, item, companion)) return true;
  if (drawTrivandrumAccessory(group, item, companion)) return true;
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
    "midmar-compost-tumbler": { primary: [325, 134, .56, -2], companion: [48, 127, .48, 3] },
    "galaxy-plate-scanner": { primary: [184, 204, .54, -1], companion: [68, 202, .43, 2] },
    "agassiz-ice-flow-model": { primary: [322, 260, .52, -2], companion: [52, 290, .42, 2] },
    "avocado-microhabitat-viewer": { primary: [322, 140, .52, -2], companion: [47, 124, .39, 3] },
    "aerial-root-harp": { primary: [190, 181, .53, -2], companion: [92, 222, .39, 2] },
    "linnaean-seed-exchange-engine": { primary: [324, 252, .46, -1], companion: [-48, 266, .28, 2] },
    "decay-substrate-theatre": { primary: [385, 145, .44, -2], companion: [12, 135, .32, 2] },
    "kokee-cloud-water-collector": { primary: [265, 185, .43, 2], companion: [150, 210, .29, -2] },
    "xz1516-haplotype-viewer": { primary: [385, 260, .4, -1], companion: [28, 285, .3, 2] },
    "qg2811-baermann-fig-recovery": { primary: [385, 132, .37, -2], companion: [-10, 118, .28, 2] },
    "yellow-box-seed-orrery": { primary: [239, 170, .32, 1], companion: [125, 205, .29, -1] },
    "black-mountain-signal-theremin": { primary: [381, 248, .35, -1], companion: [203, 290, .29, 1] },
    "eca36-grass-litter-profiler": { primary: [370, 125, .46, -2], companion: [-5, 95, .3, 2] },
    "auckland-volcanic-field-monitor": { primary: [225, 185, .43, -1], companion: [85, 195, .3, 2] },
    "eca36-reproductive-timing-clock": { primary: [380, 254, .41, -1], companion: [-15, 284, .28, 2] },
    "compost-labyrinth": { primary: [352, 110, .4, -2], companion: [18, 125, .29, 2] },
    "ashfall-recorder": { primary: [222, 190, .37, -1], companion: [85, 218, .28, 2] },
    "test-cross-mechanism": { primary: [360, 268, .35, -1], companion: [0, 292, .29, 2] },
    "ju1325-sample-tube-timekeeper": { primary: [355, 145, .36, -2], companion: [0, 105, .28, 2] },
    "trivandrum-garden-waterworks": { primary: [220, 188, .35, -1], companion: [112, 215, .28, 2] },
    "trivandrum-bandstand-music-box": { primary: [355, 267, .34, -1], companion: [-2, 290, .28, 2] }
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
