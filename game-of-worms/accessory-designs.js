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
  ["elegans", "Santeuil, France", "reed boater", "reed-boater", "plot waistcoat", "plot-waistcoat", "stream dip net", "stream-dip-net"],
  ["elegans", "Edinburgh, Scotland", "crag ear-warmers", "crag-ear-warmers", "contour accordion", "bellows-instrument", "loch sampler", "loch-sampler"],
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
    valid: accessoryCatalogue.length === 37 && designIds.size === 111 && !duplicateKeys.length && !duplicateLabels.length && !duplicateDesignIds.length && !duplicateGeometrySignatures.length && !missingKeys.length && !unexpectedKeys.length && !overusedFamilies.length
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

function drawHead(group, item, companion) {
  const form = item.form;
  const skew = (item.variant % 5) - 2;
  switch (form) {
    case 0: path(group, `M-48 8 Q-12 ${-34 - skew} 43-7 L36 14 Q-6 1-43 21Z`); line(group, "M-38 11Q0-2 35 0"); break;
    case 1: path(group, "M-42 12 Q-8-4 34 4 L47 20 Q5 10-38 24Z"); line(group, "M-22 6L4-37L29 5 M4-37V-52"); break;
    case 2: path(group, "M-34 17 L-18-3 L-8-45 L2-68 L13-43 L21-4 L39 17Z"); line(group, "M-15-11H18 M-10-29H13 M-5-47H8"); break;
    case 3: path(group, "M-44 20 Q-42-24 0-36 Q42-24 44 20 Q0 3-44 20Z"); line(group, "M-29 6Q0-22 29 6 M-12-23V9 M12-23V9"); break;
    case 4: for (let i=0;i<7;i+=1){const a=(i/7)*Math.PI*2; add(group,"ellipse",{class:i%2?"acc-accent":"acc-main",cx:(Math.cos(a)*31).toFixed(1),cy:(Math.sin(a)*13).toFixed(1),rx:13,ry:7,transform:`rotate(${i*51})`});} break;
    case 5: path(group, "M-45 18 Q-39-38 0-48 Q39-38 45 18 L28 28 Q0 16-28 28Z"); line(group, "M-29-3Q0-23 29-3 M0-44V19"); break;
    case 6: path(group, "M-42 14 Q-30-29 6-32 Q34-24 42 5 L33 19 Q0 4-42 14Z"); path(group, "M-4-29 Q18-47 39-24 L25-15Z", "acc-accent"); break;
    case 7: path(group, "M-48-4 Q-24-25 0-8 Q24-25 48-4 L34 22 Q12 7 0 18 Q-12 7-34 22Z"); dot(group,-20,0,7,"acc-dark"); dot(group,20,0,7,"acc-dark"); break;
    case 8: motif(group, item.variant); line(group, "M0 17V30"); break;
    case 9: add(group,"ellipse",{class:"acc-main",cx:0,cy:0,rx:47,ry:26}); add(group,"ellipse",{class:"acc-soft",cx:0,cy:0,rx:32,ry:15}); for(let i=-2;i<=2;i+=1) dot(group,i*12,(i%2)*4,3,"acc-dark"); break;
    case 10: path(group, "M-39 15 Q-43-23-5-34 Q34-34 44-4 Q17 15-39 15Z"); path(group, "M-8-34Q4-48 17-32", "acc-accent"); break;
    case 11: add(group,"ellipse",{class:"acc-main",cx:0,cy:-5,rx:45,ry:24,transform:"rotate(6)"}); path(group,"M-39 2Q0 22 40 5","acc-dark"); dot(group,5,-33,8,"acc-accent"); break;
    case 12: path(group, "M-45-8 Q-22-26 0-6 Q22-26 45-8 L34 13 Q15 2 0 16 Q-15 2-34 13Z"); path(group,"M-31-7L-15-20L-3-4L-17 9Z M6-4L19-20L34-5L18 9Z","acc-accent"); line(group,"M-3-4L6-4"); break;
    case 13: path(group,"M-46 15Q-39-26 0-37Q39-26 46 15Q0-1-46 15Z"); for(let i=-3;i<=3;i+=1) line(group,`M${i*11}-19L${i*7} 8`); break;
    case 14: path(group,"M-43 20Q-49-34 0-52Q49-34 43 20L24 31Q0 12-24 31Z"); line(group,"M-24-18Q0-5 24-18"); break;
    case 15: path(group,"M-40 18L0-51L40 18Q0 4-40 18Z"); path(group,"M-18-14L0-37L18-14Z","acc-accent"); break;
    case 16: path(group,"M-45 17Q-52-29-22-37Q0-55 20-37Q52-28 45 17Q29 35 16 20Q0 41-13 21Q-32 36-45 17Z"); line(group,"M-31-10Q-16 5-29 21 M0-28Q11-6 3 25 M29-9Q16 6 28 21"); break;
    case 17: path(group,"M-43 17Q-34-25 0-31Q34-25 43 17Q0 2-43 17Z"); for(let i=-2;i<=2;i+=1) path(group,`M${i*12}-24 Q${i*10-8}-47 ${i*7}-57 Q${i*10+8}-40 ${i*12}-24Z`,i%2?"acc-accent":"acc-main"); break;
    default: path(group,"M-44 19Q-45-20-16-34Q0-50 16-34Q45-20 44 19L27 28Q0 7-27 28Z"); line(group,"M-30-8Q0 8 30-8"); break;
  }
  const badge = add(group,"g",{transform:`translate(${companion ? 20 : -20} ${companion ? 8 : 2}) scale(.55)`});
  motif(badge, item.variant + (companion ? 5 : 0), true);
}

function drawWrap(group, item, companion) {
  const form = item.form;
  const lean = companion ? -5 : 4;
  switch (form) {
    case 0: path(group,"M-50-30Q0-52 50-28L39 45Q0 27-42 48Z"); line(group,"M-18-41L0-9L19-39 M0-9V34"); break;
    case 1: path(group,"M-51-32Q0-51 51-29L43-8Q0-23-44-7Z"); path(group,`M${lean}-13Q24 22 5 61L-17 53Q6 18 ${lean}-13Z`,"acc-accent"); break;
    case 2: path(group,"M-55-34Q0-57 54-31L43 51Q0 32-45 53Z"); line(group,"M0-44V41 M-39 7L-11 15 M12 16L40 8"); dot(group,7,-3,3,"acc-dark"); dot(group,5,13,3,"acc-dark"); break;
    case 3: path(group,"M-48-34Q0-54 49-31L35 43Q0 31-37 45Z"); line(group,"M-35-20Q0 2 36-18 M-29 15Q0 28 28 14"); break;
    case 4: path(group,"M-48-31L-35-48Q0-30 35-48L49-29L34 42Q0 27-35 43Z"); line(group,"M-35-28L35 31 M35-28L-35 31"); break;
    case 5: path(group,"M-41-35Q0-47 41-33L48 48Q0 32-49 49Z"); line(group,"M-36-12H37 M-31 12H40 M-24 34H43"); break;
    case 6: path(group,"M-54-36Q0-58 55-33L43 51Q0 33-46 53Z"); path(group,"M-44-9Q-63 0-53 21L-34 8Z M44-7Q63 2 52 23L34 8Z","acc-accent"); line(group,"M0-44V42"); break;
    case 7: line(group,"M-43-34Q0-58 44-31 M-33-14L35 42 M34-13L-33 43","acc-strap"); dot(group,0,13,11,"acc-accent"); break;
    case 8: path(group,"M-57-30Q0-60 58-27L42 11Q0-15-43 13Z M-42 11L-58 52L-18 33 M42 11L57 49L20 31"); break;
    case 9: path(group,"M-57-35Q0-59 57-32L44 55Q0 34-46 56Z","acc-soft"); path(group,"M-16-46L0-14L17-44L31-31L15-4L0-14L-14-4L-31-31Z"); line(group,"M0-14V43 M-38 28Q0 48 37 27"); add(group,"rect",{class:"acc-accent",x:13,y:4,width:22,height:15,rx:3}); break;
    case 10: path(group,"M-53-34Q0-57 53-31L42 44Q0 30-44 46Z"); line(group,"M-39-8Q0 8 40-7 M-34 18Q0 31 34 17"); break;
    case 11: path(group,"M-51-29Q0-50 51-27L44 18Q0 5-45 20Z"); path(group,"M-45 17L-35 55L-18 28L0 57L17 28L36 54L44 18Z","acc-accent"); line(group,"M-42 4H43 M-31 28L-31 50 M0 25V54 M31 27L31 49"); break;
    case 12: path(group,"M-62-25Q0-65 62-22L44 51Q0 20-46 53Z"); path(group,"M-22-43L0-14L22-41L34-29L0 3L-34-28Z","acc-accent"); break;
    case 13: path(group,"M-48-34L-31-50Q0-35 31-50L49-32L39 45Q0 29-41 47Z"); line(group,"M-31-34L31 35 M30-33L-30 36"); add(group,"rect",{class:"acc-accent",x:-17,y:8,width:34,height:23,rx:5}); break;
    case 14: path(group,"M-53-36Q0-55 53-33L43 47Q0 31-45 49Z"); path(group,"M-39 8Q-19-2-2 8L-5 37Q-23 43-40 32Z M3 8Q22-3 40 7L38 32Q21 43 5 36Z","acc-accent"); line(group,"M0-43V43"); break;
    case 15: path(group,"M-57-38Q0-61 57-35L43 53Q0 35-45 55Z"); line(group,"M-37-28Q0-5 38-27 M-35-3Q0 18 35-2 M-30 23Q0 39 31 22"); break;
    case 16: path(group,"M-62-28Q0-62 62-25L47 8Q0-21-48 10Z M-48 9L-65 54L-16 27 M48 9L64 52L17 27"); line(group,"M-49 10Q0 30 49 8"); break;
    case 17: path(group,"M-48-36Q0-55 48-33L38 4L55 52Q8 35 0 55Q-10 34-56 52L-39 4Z"); line(group,"M-34 5Q0 25 35 4 M0-43V48"); break;
    default: path(group,"M-56-34Q0-58 56-31L46 46Q0 29-48 48Z"); path(group,"M-42-8L-55 14L-33 26L-19 8Z M42-7L55 15L33 27L18 8Z","acc-accent"); line(group,"M-29-19Q0 5 30-18 M-31 27Q0 42 31 26"); break;
  }
  const badge = add(group,"g",{transform:`translate(${companion ? -23 : 24} ${companion ? 12 : 6}) scale(.48)`});
  motif(badge, item.variant + (companion ? 7 : 2), true);
}

function drawCharm(group, item, companion) {
  const form = item.form;
  switch (form) {
    case 0: path(group,"M-8-5Q-58-58-75-26Q-58 12-8 7Z M8-5Q58-58 75-26Q58 12 8 7Z","acc-soft"); line(group,"M-68-27L-8 2 M68-27L8 2 M-4-8Q0-18 5-8"); break;
    case 1: line(group,"M-48-43L48 43 M48-43L-48 43","acc-line thick"); line(group,"M-48-43L-33-29 M48-43L33-29 M48 43L33 29 M-48 43L-33 29","acc-accent-line"); break;
    case 2: add(group,"rect",{class:"acc-main",x:-56,y:-25,width:112,height:55,rx:12}); line(group,"M-38-25V-47 M18-25L31-50 M-15-25L-8-55"); dot(group,-27,1,14,"acc-soft"); dot(group,12,2,14,"acc-accent"); break;
    case 3: add(group,"ellipse",{class:"acc-main",cx:0,cy:0,rx:50,ry:44}); dot(group,0,0,21,"acc-soft"); line(group,"M-50 0H50 M0-44V44 M-35-31L35 31 M35-31L-35 31"); break;
    case 4: path(group,"M-72 22Q0-48 72 20Q0 5-72 22Z","acc-soft"); line(group,"M-62 17Q0-23 62 15 M-43 7L-60-27 M-23-4L-34-42 M0-12V-51 M24-4L38-40 M45 7L63-25"); break;
    case 5: path(group,"M-37 39Q-45-17 0-43Q45-17 37 39Z"); path(group,"M-22 23Q0-9 22 23Q0 45-22 23Z","acc-accent"); line(group,"M0-43V-61 M-12-58H12"); break;
    case 6: path(group,"M-58-25Q0-48 58-22L49 42Q0 58-49 41Z"); line(group,"M-38-28Q0-65 39-27 M-45 3H45 M-31 3V37 M0 3V43 M31 3V37"); break;
    case 7: dot(group,0,0,45,"acc-main"); dot(group,0,0,28,"acc-soft"); path(group,"M0-39L9-8L39 0L9 8L0 39L-9 8L-39 0L-9-8Z","acc-accent"); break;
    case 8: path(group,"M-50 18Q-23-19 0 5Q23-19 50 18Q20 42 0 23Q-20 42-50 18Z"); path(group,"M-28 6Q-9-48 9-2Q29-45 35 6","acc-accent"); dot(group,-12,11,5,"acc-dark"); break;
    case 9: add(group,"rect",{class:"acc-main",x:-43,y:-39,width:86,height:78,rx:15}); [-22,0,22].forEach(x=>{add(group,"rect",{class:"acc-soft",x:x-8,y:-31,width:16,height:49,rx:5}); line(group,`M${x}-31V-48 M${x-8}-48H${x+8}`);}); path(group,"M-34 26L0 47L34 26Z","acc-accent"); break;
    case 10: path(group,"M-56-7Q0-47 56-5L46 40Q0 59-47 39Z"); line(group,"M-39-10Q0-66 40-9 M-39 10H42"); for(let i=-2;i<=2;i+=1) dot(group,i*16,24+(i%2)*5,5,i%2?"acc-accent":"acc-soft"); break;
    case 11: path(group,"M-49 28Q-56-13-22-29Q8-48 39-19Q57 1 43 30Q0 49-49 28Z"); line(group,"M-25-27L-29-68 M-4-37L3-78 M19-32L35-69 M-35-67H-22 M-4-77H10 M29-69H42"); break;
    case 12: path(group,"M-75 16Q0-32 75 14L58 32Q0 7-59 34Z"); line(group,"M-62 13Q0-15 62 11 M-44 2L-55-32 M-18-9L-21-50 M12-11L18-51 M39 0L54-35"); break;
    case 13: path(group,"M-61 5Q-20-48 3-16Q27-45 60-4Q42 4 22 13Q3 21-18 13Q-40 7-61 5Z"); path(group,"M-50 0Q-23-15-6-11 M14-11Q31-17 49-7","acc-accent-line"); break;
    case 14: path(group,"M-43 31Q-52-22-2-35Q47-22 44 31Q0 15-43 31Z"); path(group,"M-17-33L0-55L17-32 M-7-54H8","acc-accent"); line(group,"M-30 12L30-9 M-25-2L31 17"); break;
    case 15: path(group,"M-55 36L-42-26L30-18L50 31Q0 50-55 36Z"); path(group,"M-30-23Q0-58 32-17","acc-soft"); line(group,"M-39 4H39 M-27 25H35"); break;
    case 16: add(group,"rect",{class:"acc-main",x:-48,y:-35,width:96,height:70,rx:8}); line(group,"M-36-19H35 M-36-3H35 M-36 13H35 M-16-30V29 M16-30V29"); path(group,"M-54-11L-76-25 M54 8L75 24","acc-accent-line"); break;
    case 17: path(group,"M-55 34V-12Q0-48 55-9V34Z"); for(let x=-36;x<=36;x+=18) line(group,`M${x} 29V${-4-Math.abs(x)/5}`); line(group,"M-62-6Q0-62 62-3"); break;
    default: path(group,"M-56 23Q-42-34 0-42Q42-34 56 23Q0 50-56 23Z"); path(group,"M-31 15Q-23-11-5-5Q10-29 30-7Q39 9 26 25Q0 38-31 15Z","acc-accent"); line(group,"M-43 22L-58 47 M40 21L59 45"); break;
  }
  const badge = add(group,"g",{transform:`translate(${companion ? 30 : -31} ${companion ? -17 : 19}) scale(.48)`});
  motif(badge, item.variant + (companion ? 9 : 4), true);
}

function drawN2Accessory(group, item, companion) {
  if (item.family === "ngm-agar-plate") {
    add(group, "ellipse", { class: "acc-soft", cx: 0, cy: 0, rx: companion ? 40 : 48, ry: companion ? 28 : 31 });
    add(group, "ellipse", { class: "acc-main", cx: 0, cy: 0, rx: companion ? 32 : 39, ry: companion ? 21 : 24 });
    const colonies = companion ? [[-14,-5,7],[5,-9,5],[14,8,6],[-5,10,4]] : [[-21,-7,6],[-6,-12,4],[9,-8,7],[22,4,4],[-13,10,7],[7,11,4]];
    colonies.forEach(([cx, cy, r]) => dot(group, cx, cy, r, "acc-accent"));
    line(group, companion ? "M-31-20L31 20" : "M-39-24Q0-4 39 24");
    return true;
  }
  if (item.family === "n2-lab-coat") {
    path(group, companion
      ? "M-42-38Q0-57 42-35L33 43Q4 29-28 47L-45 17L-28 4Z"
      : "M-55-39Q0-64 55-36L44 57Q0 36-47 59L-60 13L-37-3Z", "acc-soft");
    path(group, companion ? "M-15-46L0-14L17-43L30-29L13-2L0-14L-13-1L-29-29Z" : "M-19-52L0-15L20-49L36-34L16-2L0-15L-16-1L-37-34Z");
    line(group, companion ? "M0-14V36 M-33 22Q0 40 31 20" : "M0-15V48 M-43 29Q0 53 41 27");
    add(group, "rect", { class: "acc-main", x: companion ? 8 : 12, y: companion ? 5 : 8, width: companion ? 20 : 25, height: companion ? 14 : 17, rx: 3 });
    dot(group, companion ? -4 : -5, 2, 3, "acc-dark");
    dot(group, companion ? -3 : -4, 17, 3, "acc-dark");
    return true;
  }
  if (item.family === "cryo-vial-jetpack") {
    const tubes = companion ? [0] : [-19, 19];
    tubes.forEach(x => {
      add(group, "rect", { class: "acc-soft", x: x - 11, y: -39, width: 22, height: 60, rx: 8 });
      add(group, "rect", { class: "acc-main", x: x - 9, y: -48, width: 18, height: 13, rx: 3 });
      path(group, `M${x-10} 21L${x} 43L${x+10} 21Z`, "acc-accent");
      line(group, `M${x-7}-10H${x+7}`);
    });
    if (companion) {
      path(group, "M-11 5L-39 17L-31 31L-9 18Z M11 5L39 17L31 31L9 18Z", "acc-main");
      line(group, "M-9-20H9");
    } else line(group, "M-30-21Q0-40 30-21 M-30 4Q0 23 30 4");
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
    [-30,30].forEach(x=>{
      path(group, snow ? `M${x-22}-39Q${x} -55 ${x+22}-39V37Q${x} 55 ${x-22} 37Z` : `M${x-23}-18Q${x} -31 ${x+23}-17L${x+17} 21Q${x} 33 ${x-18} 20Z`, "acc-main");
      if(spikes) [-14,0,14].forEach(dx=>path(group,`M${x+dx-4} 19L${x+dx} 38L${x+dx+4} 19Z`,`acc-dark`));
      else if(!snow) line(group,`M${x-21} 27Q${x} ${companion?37:43} ${x+21} 27`,`acc-accent-line`);
      else line(group,`M${x-16}-28L${x+16} 27 M${x+16}-28L${x-16} 27`);
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
      if(/contour/i.test(label)) {
        path(group, companion ? "M-48-22L-29-38L-12-21L6-42L23-20L43-34L52-17V29L33 42L14 25L-5 45L-23 23L-43 38L-52 22Z" : "M-63-28L-39-49L-16-27L7-54L30-25L55-45L67-21V38L42 55L18 32L-7 59L-30 29L-55 49L-68 28Z");
        [-32,-11,10,31].forEach(x=>line(group,`M${x}-23V31`));
      } else {
        path(group, companion ? "M-47-31H47V31H-47Z" : "M-61-40H61V40H-61Z");
        for(let x=companion?-32:-45;x<=(companion?32:45);x+=13) line(group,`M${x} ${companion?-29:-38}V${companion?29:38}`);
        [-56,56].forEach(x=>dot(group,x,0,6,"acc-soft"));
      }
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
        [-27,27].forEach(x=>{line(group,`M${x}-48V49 M${x}-1L${x-24} 69 M${x+1} 8L${x+25} 70 M${x} 21L${x-8} 73`,`acc-line thick`);});
      } else {
        [-30,30].forEach(x=>{path(group,`M${x-27} 12Q${x} -12 ${x+27} 12L${x+20} 31H${x-20}Z`); line(group,`M${x-16} 27L${x-24} 70 M${x+16} 27L${x+24} 70`,`acc-line thick`);});
      }
      return true;
    case "sunglasses":
      if(/confluence/i.test(label)) {
        path(group,"M-61-18Q-31-32-4-8Q-18 29-48 23Q-67 12-61-18Z","acc-dark"); path(group,"M4-8Q31-32 61-18Q67 12 48 23Q18 29 4-8Z","acc-soft"); line(group,"M-5-8H5 M-45 1L-12 14 M45 1L12 14");
      } else {
        path(group,"M-67-9L-31-35L-4-9L-22 24L-55 19Z M4-9L31-35L67-9L55 19L22 24Z","acc-dark"); line(group,"M-4-9H4 M-54 4L-31-18 M54 4L31-18","acc-accent-line");
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

function drawNamedAccessory(group, item, companion) {
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

function drawPairDifference(group, item, companion) {
  const direction = item.geometry.direction;
  if (item.artKind === "head") {
    if (companion) {
      path(group, `M${direction * 24}-12 Q${direction * 53}-25 ${direction * 47} 5 Q${direction * 34} 18 ${direction * 21} 9Z`, "acc-soft");
      dot(group, direction * 36, -11, 5, "acc-accent");
    } else {
      path(group, `M${direction * 28}-18 Q${direction * 65}-44 ${direction * 59} 10 Q${direction * 43} 26 ${direction * 25} 8Z`, "acc-soft");
      line(group, `M${direction * 29}-12Q${direction * 46}-18 ${direction * 56} 4`);
    }
  } else if (item.artKind === "garment") {
    if (companion) path(group, `M${direction * 20} 18 L${direction * 54} 38 L${direction * 33} 57 L${direction * 12} 29Z`, "acc-accent");
    else path(group, `M${direction * 17} 12 Q${direction * 63} 24 ${direction * 57} 65 L${direction * 29} 51 L${direction * 6} 23Z`, "acc-accent");
  } else if (companion) {
    dot(group, direction * 49, -16, 7, "acc-accent");
    dot(group, direction * 59, 4, 5, "acc-soft");
  } else {
    path(group, `M${direction * 31}-14 Q${direction * 70}-25 ${direction * 63} 18 Q${direction * 46} 30 ${direction * 29} 10Z`, "acc-soft");
  }
}

function renderPiece(target, item, wormPart) {
  const companion = wormPart === "companion";
  let [x, y, scale] = layouts[item.slot][item.artKind][wormPart];
  if (item.family === "cryo-vial-jetpack") {
    [x, y, scale] = companion ? [48, 168, .44] : [162, 183, .72];
  }
  const widthBias = 1 + item.geometry.widthStep * .035;
  const heightBias = 1 + item.geometry.heightStep * .03;
  const angle = companion ? -8 + (item.geometry.pairAttachment % 3) * 3 : -2 + item.geometry.angleStep;
  const piece = add(target, "g", {
    class: `accessory-piece location-accessory-piece ${companion ? "companion-accessory" : "primary-accessory"}`,
    "data-worm-part": wormPart,
    "data-accessory-family": item.family
  });
  const artwork = add(piece, "g", { class: "location-accessory-art", transform: `translate(${x} ${y}) rotate(${angle}) scale(${(scale * widthBias).toFixed(3)} ${(scale * heightBias).toFixed(3)})` });
  const drewNamedAccessory = drawNamedAccessory(artwork, item, companion);
  if (!drewNamedAccessory && item.artKind === "head") drawHead(artwork, item, companion);
  if (!drewNamedAccessory && item.artKind === "garment") drawWrap(artwork, item, companion);
  if (!drewNamedAccessory && item.artKind === "prop") drawCharm(artwork, item, companion);
  if (!drewNamedAccessory) drawPairDifference(artwork, item, companion);
  return piece;
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
