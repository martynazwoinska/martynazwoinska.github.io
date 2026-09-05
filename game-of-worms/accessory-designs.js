import { drawRefinedAccessory, refinedLayouts } from "./accessory-refinements.js?v=20260905-six-locations-1";

const SVG_NS = "http://www.w3.org/2000/svg";

/*
 * One explicit wardrobe for every displayed collection record. The `family`
 * value is deliberately auditable: no semantic accessory family occurs more
 * than twice across the full catalogue. Each button reveals a coordinated but
 * non-identical pair, one drawing for each independently movable worm.
 */
const rows = [
  ["inopinata", "Ishigaki, Japan", "fig UV visors", "fig-fascinator", "field specimen baskets", "sample-pannier", "fig-wasp wings", "wings"],
  ["briggsae", "Ahmedabad, India · AF16", "lattice fans", "lattice-fan", "kite rigs", "kite-rig", "soil kits", "soil-kit"],
  ["briggsae", "Salt Lake City, Utah · EG4181", "apricot blossom hats", "eg4181-apricot-blossom-hat", "beehive saddle packs", "eg4181-beehive-saddle-pack", "single-tail mountain skis", "eg4181-single-tail-mountain-ski"],
  ["briggsae", "Kauaʻi, Hawaiʻi · QG130", "kukui-shell glow carts", "qg130-kukui-glow-cart", "root-loop carousel rides", "qg130-root-carousel", "three-worm ribbon hoops", "qg130-three-ribbon-hoops"],
  ["briggsae", "Réunion Island · JU1375", "vanilla vine wraps", "ju1375-vanilla-vine-wrap", "sugarcane juice", "ju1375-sugarcane-juice", "Bourbon green gecko companions", "ju1375-bourbon-green-gecko-companion"],
  ["briggsae", "Orsay, France · JU2518", "pressed-flower crowns", "ju2518-rotten-apple-decay-rotoscope", "apple field satchels", "ju2518-virus-association-spectroscope", "notebook & pencil harnesses", "ju2518-six-september-garden-ledger"],
  ["briggsae", "Dois Rios, Ilha Grande, Brazil · EG5612", "jackfruit sample trays", "eg5612-jackfruit-emergence-theatre", "shared sample bags", "eg5612-shared-bag-provenance-bifurcator", "test-cross plates", "eg5612-single-larva-test-cross-gate"],
  ["briggsae", "Nambucca Heads, New South Wales · QG2814", "flower presses", "qg2814-ground-flower-sample-theatre", "two culture plates", "qg2814-five-day-two-plate-relay", "18S DNA cards", "qg2814-18s-identity-ribbon-reader"],
  ["elegans", "Bristol N2, England", "agar plates with bacteria", "ngm-agar-plate", "fitted lab coats", "n2-lab-coat", "cryo-vial jetpacks", "cryo-vial-jetpack", "lab goggles", "n2-lab-goggles"],
  ["elegans", "Santeuil, France", "railway-driver uniforms", "santeuil-railway-driver-uniform", "Santeuil cylinder organs", "santeuil-cylinder-organ-instrument", "hogweed-stem locomotives", "santeuil-hogweed-locomotive"],
  ["elegans", "Edinburgh, Scotland", "Blackford observatory telescopes", "midmar-compost-tumbler", "Edinburgh tartan kilts", "edinburgh-tartan-kilt", "Great Highland bagpipes", "great-highland-bagpipes"],
  ["elegans", "Tenerife, Spain", "Atlantic canary costumes", "tenerife-atlantic-canary-costume", "timple guitars", "tenerife-timple-guitar", "Teide star lanterns", "tenerife-teide-star-lantern"],
  ["elegans", "Kauaʻi, Hawaiʻi", "forest-bird listening headphones", "xz1516-forest-bird-headphones", "ʻōhiʻa blossom microphones", "xz1516-ohia-blossom-microphone", "genome tuning wheels", "xz1516-genome-tuning-wheel"],
  ["elegans", "Australian Capital Territory", "Flat white", "canberra-flat-white-cafe", "Balloon carriages", "canberra-dawn-balloon-carriage", "Cockatoo café raids", "oconnor-cockatoo-cafe-raid"],
  ["elegans", "Claremont, California · ECA250", "Bookworm books", "eca250-bookworm-book", "California lemonade", "eca250-california-lemonade", "sunny reading glasses", "eca250-sunny-reading-glasses"],
  ["elegans", "Araucanía, Chile", "compost sample buckets", "compost-labyrinth", "Llaima ashfall gauges", "ashfall-recorder", "reciprocal-cross plates", "test-cross-mechanism"],
  ["nigoni", "Trivandrum, Kerala · JU1325", "field loupe", "trivandrum-field-loupe", "garden watering can", "trivandrum-garden-watering-can", "sample tube", "trivandrum-sample-tube"],
  ["nigoni", "Praslin, Seychelles · YR106", "giant-tortoise shell costumes", "praslin-giant-tortoise-shell-costume", "black-parrot carnival caps", "praslin-black-parrot-carnival-cap", "Seychelles carnival bell bracelets", "praslin-seychelles-carnival-bell-bracelet"],
  ["nigoni", "São Tomé · JU2484", "São Tomé chocolate bars", "sao-tome-chocolate-bars", "birdsong music boxes", "sao-tome-birdsong-music-boxes", "begonia stained-glass parasols", "sao-tome-begonia-glass-parasols"],
  ["nigoni", "Mahahual, Mexico · JU2617", "reef-ruffle swim costumes", "mahahual-reef-ruffle-swim-costumes", "Caribbean sun spectacles", "mahahual-caribbean-sun-spectacles", "sea-grape beach parasols", "mahahual-sea-grape-beach-parasols"],
  ["nigoni", "Mauritius · JU2909", "wriggle-powered ravanne drums", "mauritius-ravanne-crawler-drum", "Vacoas fruit-gathering tail baskets", "mauritius-vacoas-tail-scoop", "dodo-beak fruit grabbers", "mauritius-dodo-beak-fruit-grabber"],
  ["nigoni", "Ho Chi Minh City · JU4356", "carambola sample trays", "ju4356-carambola-ground-contact-stage", "ITS2 DNA cards", "ju4356-its2-ribbon-reader", "tree survey calipers", "hcmc-urban-canopy-census-engine"],
  ["nigoni", "Lombok, Indonesia · HPT26", "Lingsar spring collars", "lingsar-spring-collar", "Ficus fruit transformations", "lingsar-ficus-fruit-transformation", "spring-water currents", "lingsar-springwater-current"],
  ["wallacei", "Sanda, Bali · JU1873", "cacao pod machete", "ju1873-cacao-specimen-lantern", "Balinese endek wrap", "ju1873-balinese-endek-wrap", "Balinese gamelan gong", "ju1873-balinese-gamelan-gong"],
  ["tropicalis", "Barro Colorado Island, Panama", "Gustavia flower headpiece", "qg2726-gustavia-flower-headpiece", "Golden Fleece cape", "qg2726-golden-fleece-cape", "forest-census map fans", "qg2726-bci-forest-census-map-fans"],
  ["tropicalis", "Guadeloupe · NIC203", "hummingbird costumes", "guadeloupe-hummingbird-costume", "madras carnival crowns", "guadeloupe-madras-carnival-crown", "gwo ka drums", "guadeloupe-gwoka-drum"],
  ["tropicalis", "Oʻahu, Hawaiʻi · ECA789", "petal rain trumpets", "eca789-petal-rain-trumpet", "raindrop harps", "eca789-raindrop-harp", "cacao-key xylophones", "eca789-cacao-key-xylophone"],
  ["tropicalis", "New Taipei City, Taiwan · NIC1648", "Taiwan blue-magpie kites", "nic1648-taiwan-blue-magpie-kites", "single-tail rain boots", "nic1648-single-tail-rain-boots", "bubble-tea jetpacks", "nic1648-bubble-tea-jetpacks"],
  ["tropicalis", "Pohnpei, Micronesia · QG4739", "Kotop-fruit parasols", "qg4739-kotop-fruit-parasol", "Peppercorn rollerboards", "qg4739-peppercorn-rollerboard", "Cloudforest rain-leaf sleds", "qg4739-rain-leaf-sled"],
  ["tropicalis", "Queensland, Australia · QG2904", "Sealed-pod drums", "qg2904-sealed-pod-drum", "Funnel megaphones", "qg2904-funnel-megaphone", "Canopy kaleidoscopes", "qg2904-canopy-kaleidoscope"],
  ["tropicalis", "Saint-Benoît, Réunion · JU1373", "Réunion torch-ginger trays", "ju1373-torch-ginger-bract-collar", "type-isolate badges", "ju1373-type-isolate-signet-engine", "windward rain gauges", "saint-benoit-windward-slope-mobile"]
];

const explicitUniqueRendererFamilies = new Set([
  "canoe-paddle-bow",
  "fig-fascinator",
  "sample-pannier",
  "monocle",
  "shade-visor"
]);

const repeatedRendererFamilies = new Set([
  "bellows-instrument", "bonnet", "bowed-strings", "cape", "casque",
  "compass", "fan", "flute-piccolo", "glider",
  "skirt", "stilts", "telescope",
  "wig", "wings"
]);

const n2RendererFamilies = new Set(["ngm-agar-plate", "n2-lab-coat", "cryo-vial-jetpack", "n2-lab-goggles"]);
const santeuilRendererFamilies = new Set(["santeuil-railway-driver-uniform", "santeuil-cylinder-organ-instrument", "santeuil-hogweed-locomotive"]);
const edinburghRendererFamilies = new Set(["midmar-compost-tumbler", "edinburgh-tartan-kilt", "great-highland-bagpipes"]);
const tenerifeRendererFamilies = new Set(["tenerife-atlantic-canary-costume", "tenerife-timple-guitar", "tenerife-teide-star-lantern"]);
const kauaiRendererFamilies = new Set(["xz1516-forest-bird-headphones", "xz1516-ohia-blossom-microphone", "xz1516-genome-tuning-wheel"]);
const actRendererFamilies = new Set(["canberra-flat-white-cafe", "canberra-dawn-balloon-carriage", "oconnor-cockatoo-cafe-raid"]);
const claremontRendererIds = new Set([
  "elegans::Claremont, California · ECA250::headwear",
  "elegans::Claremont, California · ECA250::wrap",
  "elegans::Claremont, California · ECA250::charm"
]);
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
const praslinRendererIds = new Set([
  "nigoni::Praslin, Seychelles · YR106::headwear",
  "nigoni::Praslin, Seychelles · YR106::wrap",
  "nigoni::Praslin, Seychelles · YR106::charm"
]);
const saoTomeRendererIds = new Set([
  "nigoni::São Tomé · JU2484::headwear",
  "nigoni::São Tomé · JU2484::wrap",
  "nigoni::São Tomé · JU2484::charm"
]);
const pohnpeiQG4739RendererIds = new Set([
  "tropicalis::Pohnpei, Micronesia · QG4739::headwear",
  "tropicalis::Pohnpei, Micronesia · QG4739::wrap",
  "tropicalis::Pohnpei, Micronesia · QG4739::charm"
]);
const queenslandQG2904RendererIds = new Set([
  "tropicalis::Queensland, Australia · QG2904::headwear",
  "tropicalis::Queensland, Australia · QG2904::wrap",
  "tropicalis::Queensland, Australia · QG2904::charm"
]);
const ahmedabadAF16RendererIds = new Set([
  "briggsae::Ahmedabad, India · AF16::headwear",
  "briggsae::Ahmedabad, India · AF16::wrap",
  "briggsae::Ahmedabad, India · AF16::charm"
]);
const barroColoradoQG2726RendererIds = new Set([
  "tropicalis::Barro Colorado Island, Panama::headwear",
  "tropicalis::Barro Colorado Island, Panama::wrap",
  "tropicalis::Barro Colorado Island, Panama::charm"
]);
const sandaJU1873RendererIds = new Set([
  "wallacei::Sanda, Bali · JU1873::headwear",
  "wallacei::Sanda, Bali · JU1873::wrap",
  "wallacei::Sanda, Bali · JU1873::charm"
]);
const saltLakeEG4181RendererIds = new Set([
  "briggsae::Salt Lake City, Utah · EG4181::headwear",
  "briggsae::Salt Lake City, Utah · EG4181::wrap",
  "briggsae::Salt Lake City, Utah · EG4181::charm"
]);
const kauaiQG130RendererIds = new Set([
  "briggsae::Kauaʻi, Hawaiʻi · QG130::headwear",
  "briggsae::Kauaʻi, Hawaiʻi · QG130::wrap",
  "briggsae::Kauaʻi, Hawaiʻi · QG130::charm"
]);
const reunionJU1375RendererIds = new Set([
  "briggsae::Réunion Island · JU1375::headwear",
  "briggsae::Réunion Island · JU1375::wrap",
  "briggsae::Réunion Island · JU1375::charm"
]);
const orsayJU2518RendererIds = new Set([
  "briggsae::Orsay, France · JU2518::headwear",
  "briggsae::Orsay, France · JU2518::wrap",
  "briggsae::Orsay, France · JU2518::charm"
]);
const doisRiosEG5612RendererIds = new Set([
  "briggsae::Dois Rios, Ilha Grande, Brazil · EG5612::headwear",
  "briggsae::Dois Rios, Ilha Grande, Brazil · EG5612::wrap",
  "briggsae::Dois Rios, Ilha Grande, Brazil · EG5612::charm"
]);
const nambuccaQG2814RendererIds = new Set([
  "briggsae::Nambucca Heads, New South Wales · QG2814::headwear",
  "briggsae::Nambucca Heads, New South Wales · QG2814::wrap",
  "briggsae::Nambucca Heads, New South Wales · QG2814::charm"
]);
const guadeloupeNIC203RendererIds = new Set([
  "tropicalis::Guadeloupe · NIC203::headwear",
  "tropicalis::Guadeloupe · NIC203::wrap",
  "tropicalis::Guadeloupe · NIC203::charm"
]);
const oahuECA789RendererIds = new Set([
  "tropicalis::Oʻahu, Hawaiʻi · ECA789::headwear",
  "tropicalis::Oʻahu, Hawaiʻi · ECA789::wrap",
  "tropicalis::Oʻahu, Hawaiʻi · ECA789::charm"
]);
const kauaiQG131RendererIds = new Set([
  "tropicalis::Kauaʻi, Hawaiʻi · QG131::headwear",
  "tropicalis::Kauaʻi, Hawaiʻi · QG131::wrap",
  "tropicalis::Kauaʻi, Hawaiʻi · QG131::charm"
]);
const newTaipeiNIC1648RendererIds = new Set([
  "tropicalis::New Taipei City, Taiwan · NIC1648::headwear",
  "tropicalis::New Taipei City, Taiwan · NIC1648::wrap",
  "tropicalis::New Taipei City, Taiwan · NIC1648::charm"
]);
const mahahualJU2617RendererIds = new Set([
  "nigoni::Mahahual, Mexico · JU2617::headwear",
  "nigoni::Mahahual, Mexico · JU2617::wrap",
  "nigoni::Mahahual, Mexico · JU2617::charm"
]);
const mauritiusJU2909RendererIds = new Set([
  "nigoni::Mauritius · JU2909::headwear",
  "nigoni::Mauritius · JU2909::wrap",
  "nigoni::Mauritius · JU2909::charm"
]);
const hcmcJU4356RendererIds = new Set([
  "nigoni::Ho Chi Minh City · JU4356::headwear",
  "nigoni::Ho Chi Minh City · JU4356::wrap",
  "nigoni::Ho Chi Minh City · JU4356::charm"
]);
const lombokHPT26RendererIds = new Set([
  "nigoni::Lombok, Indonesia · HPT26::headwear",
  "nigoni::Lombok, Indonesia · HPT26::wrap",
  "nigoni::Lombok, Indonesia · HPT26::charm"
]);
const reunionJU1373RendererIds = new Set([
  "tropicalis::Saint-Benoît, Réunion · JU1373::headwear",
  "tropicalis::Saint-Benoît, Réunion · JU1373::wrap",
  "tropicalis::Saint-Benoît, Réunion · JU1373::charm"
]);
const instrumentRendererPattern = /fiddle|flute|piccolo|lyre|concertina|accordion|ocarina|saxophone|ukulele|drum|tambourine|marimba|xylophone|chimes|harmonica|trumpet|maracas/i;
const fieldToolRendererPattern = /sieve|dip net|sampler|pannier|trug|quadrat|telescope|periscope|compass|press|gauge rod|camera rig/i;
const naturalRendererPattern = /wings|glider|fan|stilts|snowshoes|crampons|pennant|streamer wand|claws|waterwheel|carousel|fruit capsule/i;

function hasNamedRenderer(item) {
  return explicitUniqueRendererFamilies.has(item.family)
    || repeatedRendererFamilies.has(item.family)
    || n2RendererFamilies.has(item.family)
    || santeuilRendererFamilies.has(item.family)
    || edinburghRendererFamilies.has(item.family)
    || tenerifeRendererFamilies.has(item.family)
    || kauaiRendererFamilies.has(item.family)
    || actRendererFamilies.has(item.family)
    || claremontRendererIds.has(item.id)
    || araucaniaRendererIds.has(item.id)
    || trivandrumRendererIds.has(item.id)
    || praslinRendererIds.has(item.id)
    || saoTomeRendererIds.has(item.id)
    || pohnpeiQG4739RendererIds.has(item.id)
    || queenslandQG2904RendererIds.has(item.id)
    || ahmedabadAF16RendererIds.has(item.id)
    || saltLakeEG4181RendererIds.has(item.id)
    || kauaiQG130RendererIds.has(item.id)
    || reunionJU1375RendererIds.has(item.id)
    || orsayJU2518RendererIds.has(item.id)
    || doisRiosEG5612RendererIds.has(item.id)
    || nambuccaQG2814RendererIds.has(item.id)
    || barroColoradoQG2726RendererIds.has(item.id)
    || sandaJU1873RendererIds.has(item.id)
    || guadeloupeNIC203RendererIds.has(item.id)
    || oahuECA789RendererIds.has(item.id)
    || kauaiQG131RendererIds.has(item.id)
    || newTaipeiNIC1648RendererIds.has(item.id)
    || mahahualJU2617RendererIds.has(item.id)
    || mauritiusJU2909RendererIds.has(item.id)
    || hcmcJU4356RendererIds.has(item.id)
    || lombokHPT26RendererIds.has(item.id)
    || reunionJU1373RendererIds.has(item.id)
    || instrumentRendererPattern.test(item.label)
    || fieldToolRendererPattern.test(item.label)
    || naturalRendererPattern.test(item.label);
}

function artworkKind(label) {
  if (/coat|waistcoat|cape|cloak|waders|jacket|swimwear|skirt|kilt|cuirass|boots|shoes?|pauldron|epaulettes|ruff|collar|diving bell|crinoline|scarf|tail/i.test(label)) return "garment";
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
    if (/skirt|kilt|crinoline|swimwear/i.test(label)) return 17;
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
  if (/telescope|periscope/i.test(label)) return 12;
  if (/snowshoes|stilts|crampons/i.test(label)) return 13;
  if (/capsule|sampler|sampling tool|carousel|claws|reel|maracas|wind-vane|paddle|yoke|metronome/i.test(label)) return 8;
  return 18;
}

function freezeDesign([speciesId, placeName, headLabel, headFamily, wrapLabel, wrapFamily, charmLabel, charmFamily, extraLabel, extraFamily], index) {
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
    charm: make(charmLabel, charmFamily, "charm"),
    extra: extraLabel ? make(extraLabel, extraFamily, "extra") : null
  });
}

export const accessoryCatalogue = Object.freeze(rows.map(freezeDesign));
const catalogueByKey = new Map(accessoryCatalogue.map(design => [design.key, design]));
const designItems = design => [design.headwear, design.wrap, design.charm, design.extra].filter(Boolean);

export function getAccessoryDesign(speciesId, placeName) {
  return catalogueByKey.get(`${speciesId}::${placeName}`) || null;
}

export function auditAccessoryCatalogue(expectedKeys = []) {
  const keys = accessoryCatalogue.map(design => design.key);
  const items = accessoryCatalogue.flatMap(designItems);
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
    designItems(design).forEach(item => {
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
    valid: (!expectedKeys.length || accessoryCatalogue.length === expectedKeys.length) && designIds.size === items.length && namedCoverageCount === items.length && !duplicateKeys.length && !duplicateLabels.length && !duplicateDesignIds.length && !duplicateGeometrySignatures.length && !missingKeys.length && !unexpectedKeys.length && !overusedFamilies.length && !missingNamedRenderers.length
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
      add(group, "ellipse", { class: "plate-shadow", cx: 3, cy: 17, rx: 46, ry: 14 });
      add(group, "path", { class: "plate-sidewall", d: "M-43 2Q0 22 43 2L43 12Q0 32-43 12Z" });
      add(group, "ellipse", { class: "plate-base", cx: 0, cy: 4, rx: 44, ry: 19 });
      add(group, "ellipse", { class: "plate-rim", cx: 0, cy: 0, rx: 43, ry: 18 });
      add(group, "ellipse", { class: "plate-agar", cx: 0, cy: 0, rx: 36, ry: 13 });
      add(group, "path", { class: "bacterial-lawn", d: "M-31-1Q-21-11-6-8Q9-12 29-2Q22 10 5 9Q-16 12-31-1Z" });
      add(group, "ellipse", { class: "plate-inner-ring", cx: 0, cy: 0, rx: 39, ry: 15.5 });
      [[-22, -2, 1.8], [-9, 6, 1.5], [8, -6, 1.7], [24, 2, 1.4]].forEach(([cx, cy, r]) => add(group, "circle", { class: "op50-colony", cx, cy, r }));
      const tracks = add(group, "g", { class: "worm-tracks" });
      add(tracks, "path", { d: "M-25-2Q-17-7-10-2T4-3T20-1" });
      add(tracks, "path", { d: "M-17 6Q-9 1-1 5T15 4" });
      add(group, "path", { class: "plate-glare", d: "M-31-7Q-18-15-3-12" });
      [[-17, -9], [14, -7], [28, 1]].forEach(([cx, cy]) => add(group, "circle", { class: "plate-condensation", cx, cy, r: 1.25 }));
      add(group, "rect", { class: "plate-label-tape", x: -14, y: 11, width: 28, height: 10, rx: 3 });
      const label = add(group, "text", { class: "plate-label-text companion", x: 0, y: 19, "text-anchor": "middle" });
      label.textContent = "N2";
    } else {
      add(group, "ellipse", { class: "plate-shadow", cx: 3, cy: 20, rx: 64, ry: 15 });
      add(group, "path", { class: "plate-sidewall", d: "M-61 2Q0 29 61 2L61 14Q0 40-61 14Z" });
      add(group, "ellipse", { class: "plate-base", cx: 0, cy: 5, rx: 62, ry: 25 });
      add(group, "ellipse", { class: "plate-rim", cx: 0, cy: 0, rx: 61, ry: 23 });
      add(group, "ellipse", { class: "plate-agar", cx: 0, cy: 0, rx: 52, ry: 17 });
      add(group, "path", { class: "bacterial-lawn", d: "M-46-1Q-31-15-10-11Q13-17 46-2Q34 14 8 12Q-22 17-46-1Z" });
      add(group, "ellipse", { class: "plate-inner-ring", cx: 0, cy: 0, rx: 56, ry: 20 });
      [[-36, -2, 2], [-21, 8, 1.7], [-4, -8, 2], [17, 6, 1.5], [35, -3, 1.8]].forEach(([cx, cy, r]) => add(group, "circle", { class: "op50-colony", cx, cy, r }));
      const tracks = add(group, "g", { class: "worm-tracks" });
      add(tracks, "path", { d: "M-37-2Q-28-8-18-2T2-3T25-1" });
      add(tracks, "path", { d: "M-28 7Q-18 0-7 6T16 5T34 2" });
      add(tracks, "path", { d: "M-10-7Q0-12 10-6T29-7" });
      add(group, "path", { class: "plate-glare", d: "M-47-9Q-29-22-7-17" });
      add(group, "path", { class: "plate-glare fine", d: "M31-12Q43-8 49-2" });
      [[-28, -12], [13, -13], [39, -6]].forEach(([cx, cy]) => add(group, "circle", { class: "plate-condensation", cx, cy, r: 1.5 }));
      add(group, "rect", { class: "plate-label-tape", x: -23, y: 14, width: 46, height: 11, rx: 3 });
      const plateLabel = add(group, "text", { class: "plate-label-text", x: 0, y: 22.5, "text-anchor": "middle" });
      plateLabel.textContent = "N2 · OP50";
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
      add(group, "path", { class: "lab-coat-belt male", d: "M-28 19Q-7 31 18 22" });
      add(group, "path", { class: "lab-coat-stitch male", d: "M-30 8L-23 12M-19 16L-12 20M-1 22L7 20M18-17L23-25M30-17L36-24" });
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
      add(group, "path", { class: "lab-coat-belt", d: "M-59 43Q-29 61 4 49M5 50L18 41" });
      add(group, "path", { class: "lab-coat-stitch", d: "M-52 30L-43 36M-32 43L-22 47M-6 45L4 41M29-30L35-41M43-30L53-42" });
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
      add(group, "path", { class: "pack-harness", d: "M-16-24Q-41-29-48-9M-18 2Q-40 4-45 24" });
      add(group, "path", { class: "cryo-pack-shell companion", d: "M-27-29Q-6-39 18-27L24 19Q4 36-25 24Z" });
      add(group, "rect", { class: "cryo-vial-body companion", x: -13, y: -58, width: 24, height: 70, rx: 9 });
      add(group, "rect", { class: "cryo-vial-cap companion", x: -11, y: -68, width: 20, height: 14, rx: 4 });
      add(group, "path", { class: "cryo-cap-thread", d: "M-10-63H8M-11-59H9M-10-55H8" });
      add(group, "path", { class: "cryo-ice", d: "M-10-10Q-1-17 8-9V8Q0 14-10 7Z" });
      add(group, "path", { class: "cryo-vial-label", d: "M-10-42H9V-23H-10Z" });
      add(group, "circle", { class: "cryo-gauge", cx: 9, cy: 14, r: 8 });
      add(group, "path", { class: "cryo-gauge-mark", d: "M9 14L13 9M4 14H9" });
      add(group, "path", { class: "cryo-nozzle", d: "M-20 22L-28 39H-12L-9 25ZM8 27L6 44H22L18 24Z" });
      add(group, "path", { class: "cryo-plume small", d: "M-24 42Q-31 54-21 62Q-13 54-18 44M10 46Q4 57 14 66Q22 56 17 46" });
      add(group, "path", { class: "cryo-frost", d: "M-23-17L-15-11M17-15L10-9M-23 6L-15 3" });
    } else {
      add(group, "path", { class: "pack-harness", d: "M48-24Q20-44-13-29M46 3Q16-18-17-3" });
      add(group, "path", { class: "cryo-pack-shell", d: "M-28-35Q8-48 42-31L49 29Q12 48-27 31Z" });
      [-11, 22].forEach((x, index) => {
        add(group, "rect", { class: "cryo-vial-body", x: x - 11, y: -67 + index * 3, width: 22, height: 78 - index * 4, rx: 8 });
        add(group, "rect", { class: "cryo-vial-cap", x: x - 9, y: -78 + index * 3, width: 18, height: 14, rx: 4 });
        add(group, "path", { class: "cryo-cap-thread", d: `M${x - 8} ${-73 + index * 3}H${x + 8}M${x - 9} ${-69 + index * 3}H${x + 9}M${x - 8} ${-65 + index * 3}H${x + 8}` });
        add(group, "path", { class: "cryo-ice", d: `M${x - 8} ${-16 + index * 4}Q${x} ${-23 + index * 3} ${x + 8} ${-15 + index * 4}V${7 + index * 3}Q${x} ${13 + index * 2} ${x - 8} ${7 + index * 3}Z` });
        add(group, "path", { class: "cryo-vial-label", d: `M${x - 9} ${-43 + index * 3}H${x + 9}V${-23 + index * 3}H${x - 9}Z` });
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
  if (item.family === "n2-lab-goggles") {
    group.classList.add("n2-lab-goggles", companion ? "n2-goggles-companion" : "n2-goggles-primary");
    if (companion) {
      add(group, "path", { class: "goggle-strap", d: "M-31 0Q-24-14-14-16M17-11Q27-8 31 4" });
      add(group, "path", { class: "goggle-seal", d: "M-28-8Q-18-18-4-13Q8-17 23-7L27 3Q20 14 7 11L-2 7Q-14 15-24 8Q-31 4-28-8Z" });
      add(group, "path", { class: "goggle-lens companion", d: "M-23-7Q-15-13-4-9Q7-13 18-6L22 2Q16 9 8 7L-2 4Q-12 10-20 6Q-25 3-23-7Z" });
      add(group, "rect", { class: "goggle-vent-body", x: -30, y: -2, width: 7, height: 10, rx: 3 });
      add(group, "path", { class: "goggle-vent-slots", d: "M-28 1H-25M-28 4H-25" });
      add(group, "path", { class: "goggle-highlight", d: "M-17-7Q-11-11-6-8" });
      add(group, "rect", { class: "goggle-adjuster", x: 24, y: -5, width: 5, height: 9, rx: 1.5, transform: "rotate(-13 26.5 -.5)" });
    } else {
      add(group, "path", { class: "goggle-strap", d: "M-47 1Q-39-20-24-23M26-15Q40-11 47 7" });
      add(group, "path", { class: "goggle-seal", d: "M-40-12Q-27-25-8-18Q1-14 8-17Q27-19 39-6L40 5Q31 19 12 15L1 10Q-13 20-30 13Q-43 8-40-12Z" });
      add(group, "path", { class: "goggle-lens", d: "M-34-10Q-24-19-9-14Q0-10 8-13Q23-15 33-5L34 3Q26 13 13 10L1 6Q-11 15-25 9Q-36 6-34-10Z" });
      add(group, "rect", { class: "goggle-vent-body", x: -44, y: -4, width: 10, height: 15, rx: 4 });
      add(group, "rect", { class: "goggle-vent-body", x: 33, y: -1, width: 10, height: 15, rx: 4 });
      add(group, "path", { class: "goggle-vent-slots", d: "M-41 0H-36M-41 4H-36M36 3H41M36 7H41" });
      add(group, "path", { class: "goggle-highlight", d: "M-25-11Q-17-16-10-12M11-11Q18-13 24-8" });
      add(group, "rect", { class: "goggle-adjuster", x: 38, y: -9, width: 7, height: 12, rx: 2, transform: "rotate(-16 41.5 -3)" });
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
  if (item.family === "edinburgh-tartan-kilt") {
    group.classList.add("edinburgh-accessory", "edinburgh-kilt", companion ? "edinburgh-kilt-companion" : "edinburgh-kilt-primary");
    if (companion) {
      add(group, "path", { class: "kilt-shadow", d: "M-48 57Q1 77 51 55Q27 82-43 78Z" });
      add(group, "path", { class: "kilt-cloth companion", d: "M-39-10Q-2-25 38-8L45 37Q30 58 5 63Q-22 63-46 49Q-36 18-39-10Z" });
      add(group, "path", { class: "kilt-apron companion", d: "M-10-5Q8-15 27-4L29 39Q18 53-2 56Q-10 33-10-5Z" });
      add(group, "path", { class: "kilt-waistband", d: "M-42-12Q0-28 42-12L40 1Q0-13-40 1Z" });
      [-25,-12,1,14,27].forEach((x, index) => add(group, "path", { class: "kilt-pleat", d: `M${x}-2Q${x + (index % 2 ? 3 : -2)} 24 ${x * .86} 52` }));
      [-1,18,36].forEach(y => add(group, "path", { class: "kilt-sett horizontal", d: `M-35 ${y}Q0 ${y + 6} 34 ${y}` }));
      [-23,0,22].forEach(x => add(group, "path", { class: "kilt-sett vertical", d: `M${x}-7L${x * .9} 50` }));
      add(group, "path", { class: "kilt-hem", d: "M-43 46Q1 68 43 42" });
      add(group, "path", { class: "kilt-sporran", d: "M-11 23Q0 14 11 23L9 38Q0 45-9 38Z" });
      add(group, "path", { class: "kilt-sporran-tassel", d: "M-5 38L-7 47M0 40V49M5 38L7 47" });
    } else {
      add(group, "path", { class: "kilt-shadow", d: "M-67 68Q2 96 72 64Q38 104-59 97Z" });
      add(group, "path", { class: "kilt-cloth primary", d: "M-56-13Q0-38 56-10L63 45Q45 73 12 82Q-26 84-65 66Q-48 29-56-13Z" });
      add(group, "path", { class: "kilt-apron primary", d: "M-15-7Q9-22 35-7L39 48Q27 70 4 76Q-15 76-28 67Q-17 30-15-7Z" });
      add(group, "path", { class: "kilt-waistband", d: "M-62-17Q0-42 62-17L59 1Q0-22-59 2Z" });
      [-43,-28,-13,2,17,32,47].forEach((x, index) => add(group, "path", { class: "kilt-pleat", d: `M${x}-5Q${x + (index % 2 ? 5 : -4)} 30 ${x * .84} 70` }));
      [-3,23,49].forEach(y => add(group, "path", { class: "kilt-sett horizontal", d: `M-51 ${y}Q0 ${y + 10} 49 ${y}` }));
      [-37,-12,13,38].forEach(x => add(group, "path", { class: "kilt-sett vertical", d: `M${x}-10L${x * .88} 67` }));
      add(group, "path", { class: "kilt-hem", d: "M-61 62Q-24 84 12 78Q42 72 59 48" });
      add(group, "path", { class: "kilt-sporran", d: "M-17 30Q0 17 17 30L14 50Q0 61-14 50Z" });
      add(group, "path", { class: "kilt-sporran-cap", d: "M-15 31Q0 23 15 31Q0 39-15 31Z" });
      add(group, "path", { class: "kilt-sporran-tassel", d: "M-8 50L-10 64M0 53V67M8 50L10 64" });
    }
    return true;
  }

  if (item.family === "great-highland-bagpipes") {
    group.classList.add("edinburgh-accessory", "great-highland-bagpipes", companion ? "bagpipes-companion" : "bagpipes-primary");
    if (companion) {
      add(group, "path", { class: "bagpipe-shadow", d: "M-54 41Q2 58 58 37Q28 66-49 63Z" });
      add(group, "path", { class: "bagpipe-bag companion", d: "M-34 22Q-51-4-29-29Q-3-43 25-27Q44-9 32 17Q5 42-34 22Z" });
      add(group, "path", { class: "bagpipe-cover", d: "M-32-18Q-3-37 27-19M-39-3L30 19M-25 25L37-4" });
      add(group, "path", { class: "bagpipe-fringe", d: "M-29 23Q-4 38 25 23M-23 27L-27 36M-10 31L-11 41M4 32L5 42M18 27L22 36" });
      add(group, "path", { class: "bagpipe-cord", d: "M-17-24Q-47-52-40-76Q-31-89-20-78" });
      [[-18,-22,-28,-87],[-1,-27,-5,-98]].forEach(([x1,y1,x2,y2], index) => {
        add(group, "ellipse", { class: "bagpipe-stock", cx: x1, cy: y1, rx: 8, ry: 6, transform: `rotate(${index ? -3 : -9} ${x1} ${y1})` });
        add(group, "path", { class: "bagpipe-drone", d: `M${x1} ${y1}L${x2} ${y2}` });
        add(group, "path", { class: "bagpipe-mount", d: `M${x2-7} ${y2+4}Q${x2} ${y2-6} ${x2+7} ${y2+4}L${x2+5} ${y2+13}H${x2-5}Z` });
        add(group, "circle", { class: "bagpipe-ring", cx: x1 + (x2-x1)*.48, cy: y1 + (y2-y1)*.48, r: 4.4-index*.3 });
      });
      add(group, "path", { class: "bagpipe-chanter", d: "M21 5Q43 31 54 68" });
      add(group, "path", { class: "bagpipe-chanter-foot", d: "M47 65Q54 75 62 65Z" });
      [31,43,55].forEach((y,index) => add(group,"circle",{class:"bagpipe-hole",cx:40+index*5,cy:y,r:2.5}));
      add(group, "path", { class: "bagpipe-blowpipe", d: "M-31-22Q-56-41-70-30" });
      add(group, "path", { class: "bagpipe-blowpipe-tip", d: "M-72-34Q-83-30-72-24" });
    } else {
      add(group, "path", { class: "bagpipe-shadow", d: "M-77 55Q2 82 81 51Q41 92-68 86Z" });
      add(group, "path", { class: "bagpipe-bag primary", d: "M-47 30Q-72-7-45-45Q-9-69 36-42Q65-10 45 27Q5 60-47 30Z" });
      add(group, "path", { class: "bagpipe-cover", d: "M-43-34Q-6-59 39-34M-56-14L43 31M-42 17L52-24M-22 39L56 1" });
      add(group, "path", { class: "bagpipe-fringe", d: "M-39 31Q3 57 42 29M-32 36L-37 49M-16 43L-18 57M2 45L3 59M20 41L24 54M35 34L42 45" });
      add(group, "path", { class: "bagpipe-cord", d: "M-31-39Q-74-79-61-122Q-50-142-33-125M-11-49Q-35-88-22-145" });
      [[-32,-38,-45,-137],[-10,-47,-14,-155],[12,-40,22,-143]].forEach(([x1,y1,x2,y2], index) => {
        add(group, "ellipse", { class: "bagpipe-stock", cx: x1, cy: y1, rx: 10, ry: 7, transform: `rotate(${index * 6 - 8} ${x1} ${y1})` });
        add(group, "path", { class: "bagpipe-drone", d: `M${x1} ${y1}L${x2} ${y2}` });
        add(group, "path", { class: "bagpipe-mount", d: `M${x2-9} ${y2+5}Q${x2} ${y2-9} ${x2+9} ${y2+5}L${x2+6} ${y2+18}H${x2-6}Z` });
        add(group, "circle", { class: "bagpipe-ring", cx: x1 + (x2-x1)*.45, cy: y1 + (y2-y1)*.45, r: 5-index*.4 });
      });
      add(group, "path", { class: "bagpipe-chanter", d: "M34 9Q64 45 82 104" });
      add(group, "path", { class: "bagpipe-chanter-foot", d: "M72 100Q82 115 94 100Z" });
      [48,64,80,96].forEach((y,index) => add(group,"circle",{class:"bagpipe-hole",cx:57+index*7,cy:y,r:3.2}));
      add(group, "path", { class: "bagpipe-blowpipe", d: "M-43-39Q-78-64-99-46" });
      add(group, "path", { class: "bagpipe-blowpipe-tip", d: "M-100-52Q-112-47-102-39" });
    }
    return true;
  }

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
      add(group, "path", { class: "tumbler-frame-brace", d: "M-65 47Q0 66 66 45M-57 53L-42 62M52 51L64 61" });
      [-52,-18,17,50].forEach(x => add(group, "path", { class: "tumbler-stave-band", d: `M${x}-37Q${x + 4} -4 ${x + 5} 28` }));
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
      add(group, "path", { class: "tumbler-frame-brace", d: "M-61 51L59 50M-55 70L-35 55M54 70L35 55" });
      [-34,-9,16,40].forEach(x => add(group, "path", { class: "tumbler-stave-band", d: `M${x}-56Q${x + 4} -5 ${x + 3} 45` }));
      [[-47,84],[48,84]].forEach(([cx,cy]) => {
        add(group, "circle", { class: "tumbler-foot-pad", cx, cy, r: 7 });
        add(group, "circle", { class: "tumbler-foot-bolt", cx, cy, r: 2.4 });
      });
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
  if (item.family === "tenerife-atlantic-canary-costume") {
    group.classList.add("tenerife-accessory", "tenerife-canary-costume", companion ? "tenerife-canary-companion" : "tenerife-canary-primary");
    if (companion) {
      add(group, "path", { class: "ten-canary-wing ten-canary-wing-deep", d: "M-5-30Q-48-55-82-25Q-61-17-46 1Q-65 12-71 39Q-39 30-17 11Q-30 43-19 65Q7 37 13 4Z" });
      add(group, "path", { class: "ten-canary-wing", d: "M7-35Q49-54 78-17Q53-17 37-1Q55 7 64 30Q33 25 13 10Z" });
      add(group, "path", { class: "ten-canary-feather-light", d: "M-62-26Q-37-28-18-6M-58 9Q-36 4-18 11M42-25Q26-21 13-2M43 7Q27 3 15 10" });
      add(group, "path", { class: "ten-canary-bib", d: "M-15-37Q1-48 18-34L22 10Q4 24-18 10Z" });
      add(group, "path", { class: "ten-canary-harness", d: "M-21-31Q1-19 22-31M-17 8Q2 19 20 7" });
      add(group, "path", { class: "ten-canary-tail ten-canary-tail-deep", d: "M-10 12Q-26 57-10 78L3 34Z" });
      add(group, "path", { class: "ten-canary-tail", d: "M5 15Q14 60 32 70L16 29Z" });
      add(group, "circle", { class: "ten-canary-clasp", cx: 2, cy: -31, r: 5 });
    } else {
      add(group, "path", { class: "ten-canary-wing ten-canary-wing-deep", d: "M-8-37Q-72-70-112-24Q-83-21-62 2Q-91 12-101 50Q-63 40-35 13Q-52 59-33 85Q1 54 12 7Z" });
      add(group, "path", { class: "ten-canary-wing", d: "M8-43Q73-68 113-16Q80-20 57 2Q86 11 97 43Q57 36 28 12Q44 55 27 77Q1 51-10 8Z" });
      add(group, "path", { class: "ten-canary-feather-light", d: "M-88-31Q-55-34-26-6M-85 8Q-54 1-26 12M-78 39Q-49 27-30 24M79-25Q48-28 23-3M79 12Q51 4 27 14M70 38Q48 27 30 25" });
      add(group, "path", { class: "ten-canary-bib", d: "M-22-48Q1-65 25-45L31 13Q5 34-28 15Z" });
      add(group, "path", { class: "ten-canary-harness", d: "M-29-40Q1-23 30-40M-25 11Q3 29 28 9" });
      add(group, "path", { class: "ten-canary-tail ten-canary-tail-deep", d: "M-14 15Q-36 73-12 101L4 43Z" });
      add(group, "path", { class: "ten-canary-tail", d: "M5 17Q19 77 44 91L18 38Z" });
      add(group, "circle", { class: "ten-canary-clasp", cx: 2, cy: -42, r: 7 });
      add(group, "path", { class: "ten-canary-clasp-mark", d: "M-1-46L2-37L6-47" });
    }
    return true;
  }

  if (item.family === "tenerife-timple-guitar") {
    group.classList.add("tenerife-accessory", "tenerife-timple", companion ? "tenerife-timple-companion" : "tenerife-timple-primary");
    if (companion) {
      const instrument = add(group, "g", { class: "ten-timple-instrument", transform: "rotate(70)" });
      add(instrument, "path", { class: "ten-timple-body ten-timple-body-deep", d: "M0-30C-27-42-40-25-33-8C-30-1-24 4-17 7C-31 14-39 28-34 43C-27 64-6 71 0 65C7 71 28 64 35 43C40 28 31 14 17 7C24 4 30-1 33-8C40-25 27-42 0-30Z" });
      add(instrument, "path", { class: "ten-timple-soundboard", d: "M0-23C-19-33-29-22-25-9C-22 0-14 4-9 7C-23 16-27 30-21 43C-15 55-5 58 0 54C6 58 16 55 22 43C28 30 23 16 9 7C15 4 22 0 25-9C29-22 19-33 0-23Z" });
      add(instrument, "path", { class: "ten-timple-neck", d: "M-7-31L-6-105H6L7-31Z" });
      add(instrument, "path", { class: "ten-timple-headstock", d: "M-10-105L-13-126Q0-137 13-126L10-105Z" });
      add(instrument, "circle", { class: "ten-timple-rosette", cx: 0, cy: 8, r: 13 });
      add(instrument, "circle", { class: "ten-timple-soundhole", cx: 0, cy: 8, r: 7 });
      [-4,-2,0,2,4].forEach(offset => add(instrument, "path", { class: "ten-timple-string", d: `M${offset} 43L${offset*.7}-126` }));
      [-45,-59,-73,-87].forEach(y => add(instrument, "path", { class: "ten-timple-fret", d: `M-7 ${y}H7` }));
      add(instrument, "path", { class: "ten-timple-bridge", d: "M-17 43Q0 48 17 43" });
      add(instrument, "path", { class: "ten-timple-inlay", d: "M-17 29Q0 17 17 29M-13 34Q0 24 13 34" });
      [[-15,-119],[15,-119],[-14,-108],[14,-108]].forEach(([cx,cy]) => add(instrument, "circle", { class: "ten-timple-peg", cx, cy, r: 3.5 }));
    } else {
      const instrument = add(group, "g", { class: "ten-timple-instrument", transform: "rotate(78)" });
      add(instrument, "path", { class: "ten-timple-body", d: "M0-38C-34-51-53-31-43-9C-39 0-31 6-22 9C-41 18-53 37-45 57C-35 85-8 94 0 84C9 94 36 85 46 57C54 37 41 18 22 9C31 6 39 0 43-9C53-31 34-51 0-38Z" });
      add(instrument, "path", { class: "ten-timple-soundboard", d: "M0-29C-24-40-39-27-33-11C-29-2-21 3-14 8C-31 19-37 38-29 54C-21 72-7 77 0 69C8 77 22 72 30 54C38 38 31 19 14 8C21 3 29-2 33-11C39-27 24-40 0-29Z" });
      add(instrument, "path", { class: "ten-timple-neck", d: "M-9-39L-8-130H8L9-39Z" });
      add(instrument, "path", { class: "ten-timple-headstock", d: "M-13-130L-17-156Q0-170 17-156L13-130Z" });
      add(instrument, "circle", { class: "ten-timple-rosette", cx: 0, cy: 10, r: 16 });
      add(instrument, "circle", { class: "ten-timple-soundhole", cx: 0, cy: 10, r: 9 });
      [-5,-2.5,0,2.5,5].forEach(offset => add(instrument, "path", { class: "ten-timple-string", d: `M${offset} 58L${offset*.65}-157` }));
      [-57,-74,-91,-108].forEach(y => add(instrument, "path", { class: "ten-timple-fret", d: `M-9 ${y}H9` }));
      add(instrument, "path", { class: "ten-timple-bridge", d: "M-22 58Q0 66 22 58" });
      add(instrument, "path", { class: "ten-timple-inlay", d: "M-23 38Q0 20 23 38M-18 46Q0 31 18 46" });
      add(instrument, "path", { class: "ten-timple-scroll", d: "M-32-13Q-14-24-8-9M32-13Q14-24 8-9" });
      [[-20,-148],[20,-148],[-19,-134],[19,-134]].forEach(([cx,cy]) => add(instrument, "circle", { class: "ten-timple-peg", cx, cy, r: 4.5 }));
      add(instrument, "path", { class: "ten-timple-strap", d: "M-39-12Q-67 58 0 91Q71 58 39-12" });
    }
    return true;
  }

  if (item.family === "tenerife-teide-star-lantern") {
    group.classList.add("tenerife-accessory", "tenerife-star-lantern", companion ? "tenerife-star-companion" : "tenerife-star-primary");
    if (companion) {
      add(group, "path", { class: "ten-lantern-handle", d: "M-42-55Q0-116 42-55" });
      add(group, "path", { class: "ten-lantern-crown", d: "M-42-64Q-32-88-17-74Q0-105 17-74Q32-88 42-64L33-53H-33Z" });
      add(group, "path", { class: "ten-lantern-frame", d: "M-52-57Q0-76 52-57L60 51Q0 78-60 51Z" });
      add(group, "path", { class: "ten-lantern-pane", d: "M-41-45Q0-58 41-45L46 39Q0 58-46 39Z" });
      add(group, "path", { class: "ten-lantern-arch", d: "M-33 35V-27Q0-54 33-27V35" });
      add(group, "path", { class: "ten-lantern-teide", d: "M-38 35L-12 7L0 18L16-11L42 36Z" });
      add(group, "path", { class: "ten-lantern-star", d: "M2-38L7-25L21-24L10-15L13-1L2-9L-10-1L-7-15L-18-24L-4-25Z" });
      add(group, "path", { class: "ten-lantern-filigree", d: "M-45-31Q-59-13-43 4Q-56 20-39 34M45-31Q59-13 43 4Q56 20 39 34" });
      add(group, "path", { class: "ten-lantern-spark", d: "M-27-13H-15M-21-19V-7M17 13H29M23 7V19" });
      add(group, "path", { class: "ten-lantern-cap", d: "M-58-61L-36-75H36L58-61L49-51H-49Z" });
      add(group, "path", { class: "ten-lantern-base", d: "M-62 48Q0 70 62 47L52 66Q35 76 22 71Q0 90-22 71Q-37 77-52 66Z" });
      add(group, "circle", { class: "ten-lantern-jewel", cx: 0, cy: -84, r: 6 });
    } else {
      add(group, "path", { class: "ten-lantern-handle", d: "M-57-70Q0-154 57-70" });
      add(group, "path", { class: "ten-lantern-crown", d: "M-55-82Q-43-113-23-95Q0-138 23-95Q43-113 55-82L43-68H-43Z" });
      add(group, "path", { class: "ten-lantern-frame", d: "M-72-72L-35-96H35L72-72L62 69L0 94L-62 69Z" });
      add(group, "path", { class: "ten-lantern-pane", d: "M-56-61L-29-78H29L56-61L48 56L0 75L-48 56Z" });
      add(group, "path", { class: "ten-lantern-arch", d: "M-43 49V-37Q0-77 43-37V49" });
      add(group, "path", { class: "ten-lantern-teide", d: "M-49 51L-21 17L-7 26L15-21L49 52Z" });
      add(group, "path", { class: "ten-lantern-star", d: "M1-54L8-35L28-34L12-21L17-1L1-13L-16-1L-11-21L-27-34L-7-35Z" });
      [[-35,-21],[36,-18],[-28,14],[32,18]].forEach(([x,y]) => add(group, "circle", { class: "ten-lantern-piercing", cx: x, cy: y, r: 4 }));
      add(group, "path", { class: "ten-lantern-filigree", d: "M-58-45Q-78-20-55 5Q-73 29-49 53M58-45Q78-20 55 5Q73 29 49 53" });
      add(group, "path", { class: "ten-lantern-spark", d: "M-38-2H-20M-29-11V7M22 19H40M31 10V28" });
      add(group, "path", { class: "ten-lantern-cap", d: "M-79-76L-42-103H42L79-76L65-64H-65Z" });
      add(group, "circle", { class: "ten-lantern-finial", cx: 0, cy: -119, r: 9 });
      add(group, "path", { class: "ten-lantern-base", d: "M-67 64L0 87L67 63L54 84Q37 91 24 86Q0 116-24 86Q-40 93-54 84Z" });
      add(group, "circle", { class: "ten-lantern-jewel", cx: 0, cy: -119, r: 4 });
    }
    return true;
  }

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
  if (item.family === "canberra-flat-white-cafe") {
    group.classList.add("act-accessory", "canberra-cafe", companion ? "canberra-cafe-companion" : "canberra-cafe-primary");
    if (companion) {
      add(group, "path", { class: "act-accessory-shadow", d: "M-92 92Q0 116 96 89Q48 129-83 123Z" });
      add(group, "path", { class: "cafe-grinder-feet", d: "M-55 83L-64 108H-32L-25 87ZM31 87L39 108H70L58 82Z" });
      add(group, "path", { class: "cafe-grinder-body", d: "M-58-4Q-54-19-38-23H47Q62-18 64-2L59 85Q2 102-56 84Z" });
      add(group, "path", { class: "cafe-grinder-side", d: "M41-19Q60-13 62 1L58 80L39 87Z" });
      add(group, "path", { class: "cafe-grinder-brass", d: "M-47 7Q2-2 51 7V21Q2 11-47 21ZM-42 59H45L41 79Q1 89-39 78Z" });
      add(group, "rect", { class: "cafe-grinder-drawer", x: -30, y: 30, width: 58, height: 28, rx: 7 });
      add(group, "circle", { class: "cafe-grinder-drawer-knob", cx: 0, cy: 44, r: 5 });
      add(group, "path", { class: "cafe-grinder-hopper", d: "M-38-74Q0-91 38-72L30-24Q0-12-30-25Z" });
      add(group, "ellipse", { class: "cafe-grinder-hopper-rim", cx: 0, cy: -74, rx: 40, ry: 13 });
      [[-22,-68],[-8,-74],[8,-70],[22,-75],[-16,-55],[1,-58],[18,-52]].forEach(([cx, cy], index) => add(group, "ellipse", { class: index % 2 ? "cafe-bean deep" : "cafe-bean", cx, cy, rx: 7, ry: 4.5, transform: `rotate(${index % 2 ? 26 : -22} ${cx} ${cy})` }));
      add(group, "path", { class: "cafe-grinder-lid", d: "M-43-80Q0-97 43-79L35-69Q0-82-35-70Z" });
      add(group, "path", { class: "cafe-grinder-crank", d: "M25-86L72-108L92-99" });
      add(group, "circle", { class: "cafe-grinder-crank-knob", cx: 99, cy: -95, r: 10 });
      add(group, "circle", { class: "cafe-grinder-burr", cx: 0, cy: 15, r: 14 });
      add(group, "path", { class: "cafe-grinder-burr-lines", d: "M-9 15H9M0 6V24M-6 9L6 21M6 9L-6 21" });
    } else {
      add(group, "ellipse", { class: "act-accessory-shadow", cx: 0, cy: 89, rx: 112, ry: 21 });
      add(group, "ellipse", { class: "cafe-saucer", cx: -7, cy: 66, rx: 105, ry: 29 });
      add(group, "ellipse", { class: "cafe-saucer-well", cx: -7, cy: 61, rx: 69, ry: 17 });
      add(group, "path", { class: "cafe-spoon", d: "M-106 55Q-60 71-17 72" });
      add(group, "ellipse", { class: "cafe-spoon-bowl", cx: -112, cy: 53, rx: 16, ry: 8, transform: "rotate(14 -112 53)" });
      add(group, "path", { class: "cafe-cup-handle", d: "M64-15Q118-20 116 26Q114 66 72 54Q91 44 92 22Q93 2 69 4Z" });
      add(group, "path", { class: "cafe-cup-body", d: "M-74-27Q0-46 75-26L65 44Q55 68 0 72Q-55 67-64 43Z" });
      add(group, "path", { class: "cafe-cup-shadow", d: "M42-30Q70-28 74-21L65 43Q56 62 28 68Q48 39 42-30Z" });
      add(group, "path", { class: "cafe-cup-ridge", d: "M-57-4Q-51 42-20 54" });
      add(group, "ellipse", { class: "cafe-cup-rim", cx: 0, cy: -28, rx: 77, ry: 26 });
      add(group, "ellipse", { class: "cafe-flat-white", cx: 0, cy: -26, rx: 65, ry: 18 });
      add(group, "path", { class: "cafe-latte-worm", d: "M-36-28C-25-41-12-16 0-29S25-17 36-30" });
      add(group, "path", { class: "cafe-latte-leaves", d: "M-25-26Q-14-39-5-26Q-15-17-25-26ZM6-28Q17-40 27-28Q17-17 6-28Z" });
      add(group, "circle", { class: "cafe-latte-dot", cx: 40, cy: -30, r: 3.5 });
      add(group, "path", { class: "cafe-steam", d: "M-38-54C-51-72-25-79-35-100M1-55C-12-75 14-86 3-111M39-51C26-69 50-77 43-97" });
    }
    return true;
  }

  if (item.family === "canberra-dawn-balloon-carriage") {
    group.classList.add("act-accessory", "canberra-balloon", companion ? "canberra-balloon-companion" : "canberra-balloon-primary");
    if (companion) {
      add(group, "path", { class: "balloon-dawn-cloud", d: "M-83 105Q-61 78-35 93Q-11 62 15 91Q44 70 67 96Q86 94 93 113H-88Z" });
      add(group, "path", { class: "balloon-envelope companion", d: "M0-136C-55-129-80-86-66-40Q-55-3-24 20L-15 45H15L24 20Q57-2 67-41Q80-88 44-122Q25-138 0-136Z" });
      add(group, "path", { class: "balloon-panel berry companion", d: "M0-134Q-30-111-31-61Q-30-7 0 22Q29-9 31-61Q29-111 0-134Z" });
      add(group, "path", { class: "balloon-panel gold companion", d: "M-48-111Q-67-80-58-42Q-50-11-24 17Q-35-43-25-86Q-18-116 0-134Q-28-134-48-111Z" });
      add(group, "path", { class: "balloon-panel aqua companion", d: "M48-112Q69-80 59-41Q51-10 24 18Q35-42 25-86Q18-116 0-134Q28-134 48-112Z" });
      add(group, "path", { class: "balloon-seam", d: "M0-134V22M-48-111Q-22-87-25-44Q-25-3 0 22M48-112Q22-86 25-44Q25-2 0 22" });
      add(group, "path", { class: "balloon-neck", d: "M-16 20H16L12 48H-12Z" });
      add(group, "path", { class: "balloon-cables", d: "M-12 43L-34 80M12 43L34 80M-2 43L-12 80M2 43L12 80" });
      add(group, "path", { class: "balloon-burner", d: "M-10 48H10L15 62H-15Z" });
      add(group, "path", { class: "balloon-basket companion", d: "M-38 79Q0 68 39 79L32 116Q0 128-33 115Z" });
      add(group, "path", { class: "balloon-basket-weave", d: "M-33 92Q0 83 34 92M-35 104Q0 95 33 104M-17 76L-14 120M16 76L14 120" });
    } else {
      add(group, "path", { class: "balloon-dawn-cloud", d: "M-130 100Q-99 68-61 88Q-27 55 6 85Q41 58 72 88Q105 70 129 106H-136Z" });
      add(group, "path", { class: "balloon-envelope primary", d: "M0-132C-72-132-117-88-109-36Q-104 3-61 28Q-38 43-28 62H28Q39 42 62 28Q104 3 109-37Q116-89 70-119Q38-140 0-132Z" });
      add(group, "path", { class: "balloon-panel berry primary", d: "M0-132Q-43-112-47-51Q-48 13-24 61H24Q49 13 47-51Q43-112 0-132Z" });
      add(group, "path", { class: "balloon-panel gold primary", d: "M-69-119Q-111-87-106-37Q-102-1-61 27Q-39 43-28 61Q-56 3-52-53Q-47-108 0-132Q-38-139-69-119Z" });
      add(group, "path", { class: "balloon-panel aqua primary", d: "M69-119Q111-87 106-37Q102-1 61 27Q39 43 28 61Q56 3 52-53Q47-108 0-132Q38-139 69-119Z" });
      add(group, "path", { class: "balloon-seam", d: "M0-132V61M-69-118Q-41-88-48-39Q-48 17-28 61M69-118Q41-88 48-39Q48 17 28 61" });
      add(group, "path", { class: "balloon-highlight", d: "M-80-87Q-99-52-87-20" });
      add(group, "path", { class: "balloon-neck", d: "M-29 59H29L22 80H-22Z" });
      add(group, "path", { class: "balloon-cables", d: "M-22 76L-53 112M22 76L53 112M-8 76L-19 112M8 76L19 112" });
      add(group, "path", { class: "balloon-burner", d: "M-16 79H16L22 96H-22Z" });
      add(group, "path", { class: "balloon-basket primary", d: "M-58 110Q0 95 59 110L49 155Q0 171-51 154Z" });
      add(group, "path", { class: "balloon-basket-rim", d: "M-60 109Q0 93 61 109L58 120Q0 105-58 120Z" });
      add(group, "path", { class: "balloon-basket-weave", d: "M-51 128Q0 114 52 128M-53 141Q0 127 51 141M-28 110L-24 160M0 106V164M29 110L24 160" });
    }
    return true;
  }

  if (item.family === "oconnor-cockatoo-cafe-raid") {
    group.classList.add("act-accessory", "cockatoo-raid", companion ? "cockatoo-raid-companion" : "cockatoo-raid-primary");
    if (companion) {
      add(group, "ellipse", { class: "act-accessory-shadow", cx: 0, cy: 94, rx: 86, ry: 20 });
      add(group, "path", { class: "cockatoo-sugar-bowl", d: "M-70 45Q0 21 70 45L56 91Q0 113-56 91Z" });
      add(group, "ellipse", { class: "cockatoo-bowl-rim", cx: 0, cy: 44, rx: 72, ry: 22 });
      add(group, "path", { class: "cockatoo-tail", d: "M18 23Q46 66 34 103L7 47Z" });
      add(group, "path", { class: "cockatoo-tail yellow", d: "M22 32Q39 66 31 89L13 45Z" });
      add(group, "path", { class: "cockatoo-body companion", d: "M-35 36Q-56 0-37-39Q-24-68 8-68Q43-65 53-32Q66 8 42 42Q4 61-35 36Z" });
      add(group, "path", { class: "cockatoo-wing right", d: "M4-34Q43-44 57-9Q57 24 32 38Q17 12-7 7Q10-4 4-34Z" });
      add(group, "path", { class: "cockatoo-wing-feathers", d: "M15-19Q34-25 47-8M13-7Q34-10 49 6M17 7Q34 7 43 20" });
      add(group, "circle", { class: "cockatoo-head", cx: -31, cy: -58, r: 36 });
      add(group, "path", { class: "cockatoo-crest", d: "M-23-91Q-8-130 13-123Q10-105 0-93Q20-122 38-108Q28-90 11-82Q42-103 51-85Q32-68 4-71Z" });
      add(group, "path", { class: "cockatoo-eye-ring", d: "M-49-69Q-36-78-27-67Q-25-52-40-48Q-54-53-49-69Z" });
      add(group, "circle", { class: "cockatoo-eye", cx: -39, cy: -61, r: 5 });
      add(group, "path", { class: "cockatoo-beak", d: "M-61-60Q-91-56-91-37Q-79-25-64-35Q-76-42-61-60Z" });
      add(group, "path", { class: "cockatoo-claw", d: "M-22 34Q-34 48-46 43M-20 36Q-11 49-2 43" });
      add(group, "path", { class: "cockatoo-sugar-cube", d: "M-96-43L-77-56L-62-41L-80-27Z" });
      add(group, "path", { class: "cockatoo-cube-mark", d: "M-87-43L-74-39M-82-50L-70-45" });
    } else {
      add(group, "ellipse", { class: "act-accessory-shadow", cx: 2, cy: 98, rx: 116, ry: 22 });
      add(group, "path", { class: "cockatoo-tray", d: "M-105 70Q-1 49 106 69L94 88Q0 108-96 88Z" });
      add(group, "path", { class: "cockatoo-tray-rim", d: "M-102 68Q0 48 103 68Q0 78-102 68Z" });
      add(group, "path", { class: "cockatoo-tail", d: "M-45 36Q-52 91-17 98L4 43Z" });
      add(group, "path", { class: "cockatoo-tail yellow", d: "M-31 44Q-35 77-16 86L-4 47Z" });
      add(group, "path", { class: "cockatoo-tail-lines", d: "M-35 51Q-39 77-19 91M-24 49Q-27 72-14 84" });
      add(group, "path", { class: "cockatoo-body primary", d: "M-54 27Q-51-31-18-58Q13-80 43-58Q71-36 67 6Q63 49 29 67Q-10 80-43 54Z" });
      add(group, "path", { class: "cockatoo-wing primary", d: "M-43-4Q-26-36 16-39Q46-33 54-4Q31-15 9 6Q-15 30-35 45Q-50 29-43-4Z" });
      add(group, "path", { class: "cockatoo-wing-feathers", d: "M-27 10Q-4-10 22-14M-22 23Q2 3 31 1M-13 34Q11 17 38 14" });
      add(group, "circle", { class: "cockatoo-head", cx: 44, cy: -55, r: 37 });
      add(group, "path", { class: "cockatoo-cheek-wash", d: "M25-53Q43-69 59-52Q48-35 29-39Z" });
      add(group, "path", { class: "cockatoo-crest", d: "M27-82Q16-122 37-126Q48-106 49-91Q51-128 72-121Q68-100 59-87Q79-114 91-99Q77-80 63-75Z" });
      add(group, "path", { class: "cockatoo-eye-ring", d: "M53-67Q66-72 72-59Q68-45 54-48Q45-56 53-67Z" });
      add(group, "circle", { class: "cockatoo-eye", cx: 61, cy: -58, r: 5 });
      add(group, "path", { class: "cockatoo-beak", d: "M73-55Q101-50 97-31Q88-21 74-30Q85-37 73-55Z" });
      add(group, "path", { class: "cockatoo-toast", d: "M94-62Q118-81 145-59L140-9Q116 5 92-15Z" });
      add(group, "path", { class: "cockatoo-toast-spread", d: "M102-51Q119-66 137-51L134-20Q118-10 101-23Z" });
      add(group, "circle", { class: "cockatoo-toast-seed", cx: 113, cy: -42, r: 3.1 });
      add(group, "circle", { class: "cockatoo-toast-seed", cx: 126, cy: -34, r: 2.7 });
      add(group, "path", { class: "cockatoo-leg", d: "M-4 59L-10 74M22 57L27 70" });
      add(group, "path", { class: "cockatoo-claw", d: "M-10 73Q-22 84-34 76M-9 73Q0 84 9 75M27 70Q17 81 8 75M27 70Q39 80 48 72" });
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

  if (item.family === "trivandrum-field-loupe") {
    group.dataset.renderer = "trivandrum-field-loupe";
    group.classList.add("trivandrum-accessory", "trivandrum-field-loupe", companion ? "field-loupe-companion" : "field-loupe-primary");
    if (companion) {
      add(group, "path", { class: "trivandrum-accessory-shadow", d: "M-98 108Q0 138 104 110Q52 151-89 145Z" });
      add(group, "path", { class: "loupe-handle", d: "M-65 116L-17 51" });
      add(group, "path", { class: "loupe-grip", d: "M-80 122L-64 137L-16 67L-31 52Z" });
      add(group, "circle", { class: "loupe-neck", cx: -9, cy: 41, r: 13 });
      add(group, "circle", { class: "loupe-rim", cx: 38, cy: -25, r: 58 });
      add(group, "circle", { class: "loupe-glass", cx: 38, cy: -25, r: 47 });
      add(group, "path", { class: "loupe-glint", d: "M7-43Q23-65 49-67" });
      add(group, "path", { class: "loupe-worm", d: "M8-24C20-48 33-8 46-33S70-18 66 2" });
      add(group, "path", { class: "loupe-worm second", d: "M18 8C29-5 42 17 54 1S72 8 75 17" });
    } else {
      add(group, "path", { class: "trivandrum-accessory-shadow", d: "M-157 103Q4 137 167 96Q87 150-144 143Z" });
      add(group, "path", { class: "loupe-handle", d: "M-97 118L-29 38" });
      add(group, "path", { class: "loupe-grip", d: "M-116 125L-96 143L-29 57L-48 40Z" });
      add(group, "circle", { class: "loupe-neck", cx: -20, cy: 27, r: 17 });
      add(group, "circle", { class: "loupe-rim", cx: 45, cy: -43, r: 88 });
      add(group, "circle", { class: "loupe-glass", cx: 45, cy: -43, r: 73 });
      add(group, "path", { class: "loupe-glint", d: "M-1-71Q22-105 64-108" });
      add(group, "path", { class: "loupe-worm", d: "M-3-43C13-77 34-19 53-55S91-34 84-4" });
      add(group, "path", { class: "loupe-worm second", d: "M12-2C28-20 47 13 67-10S94 6 98 21" });
    }
    return true;
  }

  if (item.family === "trivandrum-garden-watering-can") {
    group.dataset.renderer = "trivandrum-garden-watering-can";
    group.classList.add("trivandrum-accessory", "garden-watering-can", companion ? "watering-can-companion" : "watering-can-primary");
    if (companion) {
      add(group, "path", { class: "trivandrum-accessory-shadow", d: "M-132 99Q0 136 130 101Q66 148-119 142Z" });
      add(group, "path", { class: "watering-can-handle-under", d: "M-43-12C-101-84-130-5-76 61" });
      add(group, "path", { class: "watering-can-handle", d: "M-43-12C-101-84-130-5-76 61" });
      add(group, "path", { class: "watering-can-handle-glint", d: "M-52-20C-86-54-112-25-103 18" });
      add(group, "path", { class: "watering-can-spout", d: "M23 22C49 1 74-31 98-54L116-42C88-13 64 20 40 48Z" });
      add(group, "path", { class: "watering-can-spout-ridge", d: "M34 24C57 4 79-25 103-47" });
      add(group, "path", { class: "watering-can-spout-collar", d: "M27 18L46 38L40 49L20 27Z" });
      add(group, "ellipse", { class: "watering-can-rose-rim", cx: 118, cy: -55, rx: 29, ry: 19, transform: "rotate(38 118 -55)" });
      add(group, "ellipse", { class: "watering-can-rose", cx: 118, cy: -55, rx: 23, ry: 14, transform: "rotate(38 118 -55)" });
      [[106,-62],[115,-59],[124,-54],[113,-49],[129,-61],[124,-47]].forEach(([cx,cy]) => add(group, "circle", { class: "watering-can-hole", cx, cy, r: 2.3 }));
      add(group, "path", { class: "watering-can-body slim", d: "M-58-26Q-3-44 52-25L45 69Q-5 97-61 68Z" });
      add(group, "ellipse", { class: "watering-can-top", cx: -3, cy: -26, rx: 55, ry: 13 });
      add(group, "ellipse", { class: "watering-can-top-rim", cx: -3, cy: -26, rx: 48, ry: 9 });
      add(group, "ellipse", { class: "watering-can-opening", cx: -3, cy: -30, rx: 21, ry: 7 });
      add(group, "path", { class: "watering-can-opening-glint", d: "M-15-33Q-3-37 10-32" });
      add(group, "path", { class: "watering-can-panel-seam", d: "M-45-11Q-3-24 39-10M-47 43Q-4 58 37 43" });
      add(group, "path", { class: "watering-can-body-band", d: "M-57 58Q-5 78 43 58" });
      add(group, "path", { class: "watering-can-highlight", d: "M-42 3Q-4-12 34 0" });
      add(group, "path", { class: "watering-can-base", d: "M-52 65Q-4 83 39 64" });
      add(group, "circle", { class: "watering-can-rivet", cx: -48, cy: 54, r: 3.5 });
      add(group, "circle", { class: "watering-can-rivet", cx: 35, cy: 53, r: 3.5 });
      add(group, "path", { class: "watering-can-emboss", d: "M-18 20Q-3 5 12 20Q-3 35-18 20ZM-3 8V33" });
    } else {
      add(group, "path", { class: "trivandrum-accessory-shadow", d: "M-166 103Q0 139 173 98Q89 153-151 146Z" });
      add(group, "path", { class: "watering-can-handle-under primary", d: "M-116-18C-183-118-211-4-146 65" });
      add(group, "path", { class: "watering-can-handle primary", d: "M-116-18C-183-118-211-4-146 65" });
      add(group, "path", { class: "watering-can-handle-glint primary", d: "M-127-29C-172-73-201-31-188 23" });
      add(group, "path", { class: "watering-can-spout", d: "M-2 29C39 2 77-42 116-77L139-58C96-14 59 32 21 59Z" });
      add(group, "path", { class: "watering-can-spout-ridge primary", d: "M13 33C52 6 86-34 123-67" });
      add(group, "path", { class: "watering-can-spout-collar primary", d: "M3 23L28 49L21 61L-7 34Z" });
      add(group, "ellipse", { class: "watering-can-rose-rim", cx: 143, cy: -69, rx: 40, ry: 26, transform: "rotate(36 143 -69)" });
      add(group, "ellipse", { class: "watering-can-rose", cx: 143, cy: -69, rx: 33, ry: 20, transform: "rotate(36 143 -69)" });
      [[125,-79],[136,-76],[147,-70],[158,-63],[130,-66],[142,-59],[154,-76],[164,-70],[150,-84]].forEach(([cx,cy]) => add(group, "circle", { class: "watering-can-hole", cx, cy, r: 2.9 }));
      add(group, "path", { class: "watering-can-body", d: "M-140-34Q-70-57 5-31L19 74Q-62 108-143 72Z" });
      add(group, "ellipse", { class: "watering-can-top", cx: -67, cy: -34, rx: 72, ry: 18 });
      add(group, "ellipse", { class: "watering-can-top-rim", cx: -67, cy: -34, rx: 63, ry: 13 });
      add(group, "ellipse", { class: "watering-can-opening", cx: -67, cy: -40, rx: 29, ry: 10 });
      add(group, "path", { class: "watering-can-opening-glint", d: "M-86-43Q-68-49-48-42" });
      add(group, "path", { class: "watering-can-panel-seam", d: "M-125-14Q-65-34-5-12M-128 45Q-57 70 10 45" });
      add(group, "path", { class: "watering-can-body-band primary", d: "M-139 59Q-61 88 16 58" });
      add(group, "path", { class: "watering-can-highlight", d: "M-119 4Q-73-16-21 1" });
      add(group, "path", { class: "watering-can-base", d: "M-130 68Q-62 94 8 69" });
      add(group, "circle", { class: "watering-can-rivet", cx: -129, cy: 59, r: 4.5 });
      add(group, "circle", { class: "watering-can-rivet", cx: 7, cy: 58, r: 4.5 });
      add(group, "path", { class: "watering-can-emboss primary", d: "M-92 24Q-69-1-46 24Q-69 49-92 24ZM-69 4V45" });
    }
    return true;
  }

  if (item.family === "trivandrum-sample-tube") {
    group.dataset.renderer = "trivandrum-sample-tube";
    group.classList.add("trivandrum-accessory", "trivandrum-sample-tube", companion ? "sample-tube-companion" : "sample-tube-primary");
    if (companion) {
      add(group, "path", { class: "trivandrum-accessory-shadow", d: "M-123 84Q0 112 128 82Q64 125-112 120Z" });
      add(group, "path", { class: "sample-tube-cap", d: "M-112-35L-97-70L-68-59L-83-25Z" });
      add(group, "path", { class: "sample-tube-glass horizontal", d: "M-84-31L73 33Q99 43 108 20Q113 1 90-8L-69-69Z" });
      add(group, "path", { class: "sample-tube-glint", d: "M-62-55L78 2Q91 6 93 15" });
      add(group, "path", { class: "sample-leaf", d: "M-43-19Q-23-43-7-16Q-25-2-43-19Z" });
      add(group, "path", { class: "sample-leaf deep", d: "M32 16Q51-10 70 15Q53 33 32 16Z" });
      add(group, "path", { class: "sample-petal", d: "M-4-5C-17-10-12-27 2-25C4-38 22-33 19-19C33-24 39-7 26-1C36 9 22 23 13 12C4 24-13 14-4-5Z" });
      add(group, "path", { class: "sample-tag-string", d: "M-81-46Q-52-81-19-66" });
      add(group, "path", { class: "sample-tag", d: "M-45-78H20L24-52H-42Z" });
      const label = add(group, "text", { class: "sample-tag-text", x: -10, y: -60, "text-anchor": "middle" });
      label.textContent = "14 DAYS";
    } else {
      add(group, "path", { class: "trivandrum-accessory-shadow", d: "M-163 90Q1 126 170 88Q86 142-149 135Z" });
      add(group, "path", { class: "sample-tube-cap", d: "M-153-47L-135-91L-100-77L-118-34Z" });
      add(group, "path", { class: "sample-tube-glass horizontal", d: "M-119-42L105 48Q139 62 151 29Q158 3 126-10L-99-99Z" });
      add(group, "path", { class: "sample-tube-glint", d: "M-88-78L111 1Q128 8 130 21" });
      add(group, "path", { class: "sample-leaf", d: "M-65-28Q-35-62-12-24Q-38-3-65-28Z" });
      add(group, "path", { class: "sample-leaf deep", d: "M36 21Q63-17 91 19Q66 45 36 21Z" });
      add(group, "path", { class: "sample-petal", d: "M-18-7C-37-15-30-39-10-36C-8-55 19-48 15-28C35-35 44-9 25-1C39 14 18 34 5 18C-8 35-32 21-18-7Z" });
      add(group, "path", { class: "sample-petal small", d: "M66 6C54-3 61-19 74-14C77-27 94-19 90-6C104-7 107 11 93 14C99 27 81 34 75 20C62 27 52 15 66 6Z" });
      add(group, "path", { class: "sample-tag-string", d: "M-116-61Q-71-104-29-78" });
      add(group, "path", { class: "sample-tag", d: "M-70-106H22L27-70H-66Z" });
      const label = add(group, "text", { class: "sample-tag-text", x: -22, y: -82, "text-anchor": "middle" });
      label.textContent = "14 DAYS";
    }
    return true;
  }

  return false;
}

function drawPraslinAccessory(group, item, companion) {
  if (!item.id.startsWith("nigoni::Praslin, Seychelles · YR106::")) return false;

  if (item.family === "yr106-long-read-genome-loom") {
    group.dataset.renderer = "yr106-long-read-genome-loom";
    group.classList.add("praslin-accessory", "yr106-genome-loom", companion ? "genome-loom-companion" : "genome-loom-primary");
    if (companion) {
      add(group, "path", { class: "praslin-accessory-shadow", d: "M-99 121Q0 151 103 118Q54 161-91 155Z" });
      add(group, "path", { class: "genome-reel-base", d: "M-79 79H70L90 126H-94Z" });
      add(group, "path", { class: "genome-reel-stand", d: "M-57 76Q-52 51-32 39M48 78Q45 50 28 38" });
      add(group, "path", { class: "genome-open-reel", d: "M41 29A72 72 0 1 1 55-12M50-28Q62-8 55 12" });
      add(group, "circle", { class: "genome-single-pore", cx: -5, cy: -23, r: 18 });
      add(group, "circle", { class: "genome-pore-core", cx: -5, cy: -23, r: 7 });
      add(group, "path", { class: "genome-spiral-strand", d: "M-5-23C19-50 45-25 35 3C24 31-16 35-38 11C-62-16-42-54-9-65C26-77 67-48 70-8" });
      const drawers = [
        [35,-47,"M30-44L72-78L97-51L57-18Z"],
        [48,14,"M43 10L100 9L101 45L48 45Z"],
        [-48,27,"M-43 22L-89 53L-105 22L-63-11Z"]
      ];
      drawers.forEach(([x,y,d], index) => {
        add(group, "path", { class: index % 2 ? "genome-radial-drawer deep" : "genome-radial-drawer", d });
        add(group, "circle", { class: "genome-drawer-pull", cx: x + (index === 1 ? 34 : index === 2 ? -35 : 42), cy: y + (index === 0 ? -19 : index === 1 ? 17 : 14), r: 4 });
      });
      add(group, "path", { class: "genome-counter-arm", d: "M-60-47L-88-77H-114" });
      add(group, "path", { class: "genome-read-counter", d: "M-137-96H-84V-62H-137Z" });
      const counterText = add(group, "text", { class: "genome-small-text", x: -110, y: -73, "text-anchor": "middle" });
      counterText.textContent = "READ";
      add(group, "path", { class: "genome-reel-feet", d: "M-65 121L-76 145M60 121L73 145" });
    } else {
      add(group, "path", { class: "praslin-accessory-shadow", d: "M-171 92Q0 128 174 88Q88 145-158 137Z" });
      add(group, "path", { class: "genome-loom-frame", d: "M-156-77L139-64L160 66L105 91H-139L-166 48Z" });
      add(group, "path", { class: "genome-loom-membrane", d: "M-137-55L122-45L137 48L93 69H-119L-143 38Z" });
      add(group, "path", { class: "genome-membrane-grid", d: "M-111-48L-106 63M-60-50L-57 68M-8-49L-8 68M45-47L42 67M95-44L91 64M-133-17L130-10M-126 23L135 29" });
      [-105,-54,-3,49,99].forEach((cx, index) => {
        add(group, "circle", { class: index % 2 ? "genome-pore-ring deep" : "genome-pore-ring", cx, cy: -8 + (index % 2 ? 5 : -3), r: 16 });
        add(group, "circle", { class: "genome-pore-core", cx, cy: -8 + (index % 2 ? 5 : -3), r: 6 });
      });
      add(group, "path", { class: "genome-continuous-read", d: "M-145 41C-119 4-91 40-68 19C-43-4-24 34 0 17C24 0 43 36 67 14C91-9 112 26 145-2" });
      [[-132,-70,-97,-49],[-83,-72,-43,-50],[-29,-70,8,-48],[27,-68,65,-46],[83,-66,120,-44],[-119,69,-80,89],[-58,69,-18,91],[7,68,47,90],[69,66,106,88]].forEach(([x1,y1,x2,y2], index) => add(group, "path", { class: index % 3 === 1 ? "genome-scaffold-tab deep" : "genome-scaffold-tab", d: `M${x1} ${y1}H${x2}L${x2-5} ${y2}H${x1+5}Z` }));
      add(group, "path", { class: "genome-crank-shaft", d: "M144-32H174V-10H197" });
      add(group, "circle", { class: "genome-crank-wheel", cx: 202, cy: -10, r: 11 });
      add(group, "path", { class: "genome-crank-spokes", d: "M192-10H212M202-20V0" });
      add(group, "path", { class: "genome-record-tag", d: "M-89 74H62L57 103H-95Z" });
      const tagText = add(group, "text", { class: "genome-record-text", x: -16, y: 94, "text-anchor": "middle" });
      tagText.textContent = "YR106 / PR3";
      add(group, "path", { class: "genome-loom-feet", d: "M-132 86L-143 116H-105L-94 90M95 88L107 116H145L127 82" });
    }
    return true;
  }

  if (item.family === "coco-de-mer-growth-monitoring-rig") {
    group.dataset.renderer = "coco-de-mer-growth-monitoring-rig";
    group.classList.add("praslin-accessory", "growth-monitoring-rig", companion ? "growth-rig-companion" : "growth-rig-primary");
    if (companion) {
      add(group, "path", { class: "praslin-accessory-shadow", d: "M-145 90Q0 125 150 86Q74 140-135 134Z" });
      add(group, "path", { class: "growth-census-base", d: "M-137 46H137L153 91H-153Z" });
      const panels = [
        ["M-126-40H-48L-38 48H-122Z", "growth-census-panel"],
        ["M-45-52H31L39 48H-38Z", "growth-census-panel deep"],
        ["M34-38H119L126 48H41Z", "growth-census-panel"]
      ];
      panels.forEach(([d, className]) => add(group, "path", { class: className, d }));
      add(group, "path", { class: "growth-fold-hinge", d: "M-45-43L-38 44M33-43L40 44" });
      [[-104,-15,4],[-82,4,7],[-60,24,10],[-19,-19,5],[3,4,8],[22,27,11],[58,-13,4],[83,5,7],[106,25,10]].forEach(([cx,cy,r], index) => add(group, "circle", { class: index % 3 === 1 ? "growth-stage-counter deep" : "growth-stage-counter", cx, cy, r }));
      add(group, "path", { class: "growth-interval-rail", d: "M-126 61L-91 52L-57 67L-20 54L17 67L55 51L93 65L130 54" });
      [-91,-57,-20,17,55,93].forEach((cx, index) => add(group, "circle", { class: index % 2 ? "growth-interval-node deep" : "growth-interval-node", cx, cy: index % 2 ? 54 : 64, r: 5 }));
      add(group, "path", { class: "growth-mapping-drawer", d: "M-53 80H69L62 113H-59Z" });
      add(group, "path", { class: "growth-map-lines", d: "M-40 91L-12 85L8 96L32 87L55 99M-35 104L-8 96L18 107L48 96" });
      add(group, "circle", { class: "growth-drawer-pull", cx: 5, cy: 84, r: 4 });
      add(group, "path", { class: "growth-census-feet", d: "M-119 88L-130 116M111 89L124 116" });
    } else {
      add(group, "path", { class: "praslin-accessory-shadow", d: "M-125 126Q0 158 131 122Q66 171-114 164Z" });
      add(group, "path", { class: "growth-frame-base", d: "M-113 83H108L128 132H-130Z" });
      add(group, "path", { class: "growth-measuring-frame", d: "M-103 82V-123H91V85M-103-73H91M-103-23H91M-103 28H91" });
      [-78,-28,22,71].forEach((cx, index) => {
        const height = 29 + index * 13;
        const ground = 76;
        add(group, "path", { class: index % 2 ? "growth-model-root deep" : "growth-model-root", d: `M${cx-15} ${ground}Q${cx} ${ground-10} ${cx+15} ${ground}M${cx} ${ground-5}V${ground-height}` });
        [-1,1].forEach(side => add(group, "path", { class: index % 2 ? "growth-model-leaf deep" : "growth-model-leaf", d: `M${cx} ${ground-height+6}Q${cx+side*(12+index*3)} ${ground-height-7-index*2} ${cx+side*(20+index*4)} ${ground-height+2}Q${cx+side*(9+index*2)} ${ground-height+12} ${cx} ${ground-height+6}Z` }));
        add(group, "circle", { class: "growth-stage-marker", cx, cy: ground-height+5, r: 3.5 });
      });
      add(group, "path", { class: "growth-caliper-rail", d: "M-118-98H108" });
      add(group, "path", { class: "growth-sliding-caliper", d: "M18-112V-83M18-101H77M77-112V-83" });
      add(group, "path", { class: "growth-scale-ticks", d: "M-99-119V-108M-69-119V-111M-39-119V-108M-9-119V-111M21-119V-108M51-119V-111M81-119V-108" });
      add(group, "path", { class: "growth-marked-tree-tag", d: "M45-68H105L99-41H41Z" });
      const markedText = add(group, "text", { class: "growth-tag-text", x: 73, y: -49, "text-anchor": "middle" });
      markedText.textContent = "MARKED";
      add(group, "path", { class: "growth-data-roll-arm", d: "M92-10H122V18" });
      add(group, "path", { class: "growth-data-roll", d: "M106 14H139V78L132 68L123 79L114 68L106 78Z" });
      add(group, "path", { class: "growth-data-lines", d: "M113 30H132M113 42H128M113 54H133" });
      add(group, "path", { class: "growth-frame-feet", d: "M-102 128L-113 154M97 128L109 154" });
    }
    return true;
  }

  if (item.family === "praslin-black-parrot-call-listener") {
    group.dataset.renderer = "praslin-black-parrot-call-listener";
    group.classList.add("praslin-accessory", "black-parrot-call-listener", companion ? "call-listener-companion" : "call-listener-primary");
    if (companion) {
      add(group, "path", { class: "praslin-accessory-shadow", d: "M-126 112Q0 146 131 108Q66 158-116 151Z" });
      add(group, "path", { class: "listener-canopy-base", d: "M-105 76H104L119 119H-121Z" });
      add(group, "path", { class: "listener-crescent-arch", d: "M-91 79Q-104-42-12-96Q58-132 108-52Q128-20 103 8Q107-51 55-70Q2-91-40-49Q-77-13-61 80Z" });
      add(group, "path", { class: "listener-arch-inlay", d: "M-65 43Q-64-36-2-70Q53-100 91-45" });
      [[-30,-48,-42,35],[54,-59,66,24]].forEach(([x1,y1,x2,y2], index) => {
        add(group, "path", { class: "listener-resonator-cord", d: `M${x1} ${y1}L${x2} ${y2}` });
        add(group, "path", { class: index ? "listener-hanging-resonator deep" : "listener-hanging-resonator", d: `M${x2-18} ${y2-4}Q${x2} ${y2-22} ${x2+18} ${y2-4}L${x2+10} ${y2+29}Q${x2} ${y2+39} ${x2-10} ${y2+29}Z` });
        add(group, "path", { class: "listener-resonator-ripple", d: `M${x2-11} ${y2+6}Q${x2} ${y2-2} ${x2+11} ${y2+6}M${x2-8} ${y2+16}Q${x2} ${y2+10} ${x2+8} ${y2+16}` });
      });
      add(group, "path", { class: "listener-spectrogram-arm", d: "M86-4H113V31" });
      add(group, "path", { class: "listener-spectrogram-roll", d: "M96 26H137V94L128 84L118 96L107 84L96 94Z" });
      add(group, "path", { class: "listener-spectrogram-lines", d: "M103 43H128M103 53L112 47L119 59L128 49M103 69L111 64L119 75L130 66" });
      add(group, "path", { class: "listener-canopy-feet", d: "M-94 115L-104 141M91 115L103 141" });
    } else {
      add(group, "path", { class: "praslin-accessory-shadow", d: "M-144 119Q0 154 148 115Q76 169-132 161Z" });
      add(group, "path", { class: "listener-tripod-hub", d: "M-22 27H25L37 52L13 65H-18L-39 49Z" });
      add(group, "path", { class: "listener-crooked-tripod", d: "M-11 54L-99 125M4 59L-6 137M19 53L106 120" });
      add(group, "path", { class: "listener-tripod-brace", d: "M-65 98L-7 103L66 94" });
      add(group, "path", { class: "listener-petal-bowl", d: "M-127-42Q-71-112 2-91Q78-112 136-38Q101 25 29 35Q-54 49-127-42Z" });
      add(group, "path", { class: "listener-bowl-inner", d: "M-103-38Q-61-84 1-70Q62-87 112-34Q75 4 24 12Q-37 25-103-38Z" });
      add(group, "path", { class: "listener-bowl-petal-lines", d: "M-104-38Q-52-46 1-69M1-69Q54-45 112-34M-71 1Q-35-18 1-69M68 0Q35-18 1-69" });
      add(group, "path", { class: "listener-bowl-neck", d: "M-17 31L-12 51H18L24 29" });
      [[-91,-78,-123,-104],[-3,-94,-1,-132],[91,-76,126,-100]].forEach(([x1,y1,x2,y2], index) => {
        add(group, "path", { class: "listener-direction-vane", d: `M${x1} ${y1}L${x2} ${y2}` });
        add(group, "path", { class: index % 2 ? "listener-vane-fin deep" : "listener-vane-fin", d: `M${x2} ${y2}L${x2 + (index-1)*14 + 12} ${y2-18}L${x2 + (index-1)*7 - 13} ${y2-10}Z` });
      });
      add(group, "path", { class: "listener-wave-carriage", d: "M-73 73H74L83 104H-81Z" });
      add(group, "path", { class: "listener-waveform", d: "M-62 89L-49 82L-37 96L-23 78L-9 92L5 75L20 97L34 81L48 93L65 84" });
      add(group, "path", { class: "listener-carriage-feet", d: "M-71 101L-84 132M68 101L82 132" });
    }
    return true;
  }

  return false;
}

function drawSaoTomeAccessory(group, item, companion) {
  if (!item.id.startsWith("nigoni::São Tomé · JU2484::")) return false;

  if (item.family === "ju2484-fruit-fall-kinetic-track") {
    group.dataset.renderer = "ju2484-fruit-fall-kinetic-track";
    group.classList.add("sao-tome-accessory", "fruit-fall-track", companion ? "fruit-fall-track-companion" : "fruit-fall-track-primary");
    if (companion) {
      add(group, "path", { class: "sao-accessory-shadow", d: "M-112 126Q0 158 117 122Q58 171-103 165Z" });
      add(group, "path", { class: "fruit-tower-base", d: "M-87 80H78L98 127H-105Z" });
      add(group, "path", { class: "fruit-tower-frame", d: "M-67 81V-115H58V82M-68-114H59M-68 22H59" });
      add(group, "path", { class: "fruit-tower-top-cup", d: "M-34-125H26L14-93H-22Z" });
      add(group, "path", { class: "fruit-tower-helix", d: "M-4-94C57-80 54-52-2-43C-58-34-58-5-1 5C55 15 54 44-3 53C-47 60-50 76-18 82" });
      [[25,-66,-15],[-29,-22,14],[27,21,-13],[-28,62,16]].forEach(([cx,cy,angle], index) => {
        add(group, "path", { class: index % 2 ? "fruit-trapdoor deep" : "fruit-trapdoor", d: `M${cx-26} ${cy-5}L${cx+23} ${cy-10}L${cx+26} ${cy+6}L${cx-23} ${cy+11}Z`, transform: `rotate(${angle} ${cx} ${cy})` });
        add(group, "circle", { class: "fruit-trapdoor-pivot", cx: cx - 24, cy: cy + 2, r: 4 });
      });
      add(group, "path", { class: "fruit-litter-drawer", d: "M-62 75H50L43 111H-68Z" });
      add(group, "path", { class: "fruit-drawer-litter", d: "M-51 91Q-34 76-18 93Q0 76 17 92Q29 80 40 94" });
      add(group, "circle", { class: "fruit-drawer-pull", cx: -8, cy: 80, r: 4 });
      add(group, "path", { class: "fruit-vial-bracket", d: "M58-38H82V20H66" });
      add(group, "rect", { class: "fruit-isofemale-vial", x: 67, y: -27, width: 29, height: 57, rx: 8 });
      add(group, "rect", { class: "fruit-vial-cap", x: 70, y: -37, width: 23, height: 13, rx: 3 });
      const vialText = add(group, "text", { class: "fruit-small-text vertical", x: 82, y: 8, "text-anchor": "middle", transform: "rotate(-90 82 8)" });
      vialText.textContent = "ISO";
      add(group, "circle", { class: "fruit-counter-pulley", cx: -78, cy: -92, r: 11 });
      add(group, "path", { class: "fruit-counter-cord", d: "M-67-92H-47V-61M-89-92V-42" });
      add(group, "circle", { class: "fruit-counter-anchor", cx: -47, cy: -61, r: 4 });
      add(group, "path", { class: "fruit-counterweight", d: "M-103-43H-75L-70-12H-108Z" });
      add(group, "path", { class: "fruit-tower-feet", d: "M-77 124L-88 151M70 124L83 151" });
    } else {
      add(group, "path", { class: "sao-accessory-shadow", d: "M-176 111Q0 147 181 107Q91 163-163 154Z" });
      add(group, "path", { class: "fruit-track-base", d: "M-160 68H145L169 113H-174Z" });
      add(group, "path", { class: "fruit-track-frame", d: "M-145 68V-93H126V69M-145-92H126" });
      add(group, "path", { class: "fruit-glass-beam", d: "M-126-80H108L121-52H-134Z" });
      add(group, "path", { class: "fruit-carriage-rail", d: "M-112-66H99" });
      add(group, "path", { class: "fruit-suspension-carriage", d: "M-12-78H25L31-53H-18Z" });
      add(group, "path", { class: "fruit-suspension-cord", d: "M7-53V-21" });
      add(group, "path", { class: "fruit-anonymous-rind", d: "M-56-8Q-46-35-15-33Q7-48 30-28Q57-28 66-4Q53 24 23 27Q-8 41-36 24Q-62 22-56-8Z" });
      add(group, "path", { class: "fruit-anonymous-pulp", d: "M-42-7Q-33-24-11-22Q6-33 23-18Q43-18 49-1Q39 15 19 14Q-5 27-26 15Q-45 15-42-7Z" });
      add(group, "path", { class: "fruit-rind-tear", d: "M-47 9Q-69 26-51 42Q-24 42-9 25Q-30 31-47 9ZM39 9Q59 26 46 39Q25 39 15 25Q31 28 39 9Z" });
      [[-27,-12,4],[-14,12,3],[8,-18,3],[29,6,4]].forEach(([cx,cy,r], index) => add(group, "circle", { class: index % 2 ? "fruit-decay-mottle deep" : "fruit-decay-mottle", cx, cy, r }));
      add(group, "path", { class: "fruit-catch-bed", d: "M-92 40Q-65 20-39 44Q-14 28 11 47Q34 28 58 45Q77 32 92 50L81 74H-87Z" });
      [[-70,49,-48,35],[-41,61,-14,42],[18,58,41,38],[52,62,76,45]].forEach(([x1,y1,x2,y2], index) => add(group, "path", { class: index % 2 ? "fruit-catch-leaf deep" : "fruit-catch-leaf", d: `M${x1} ${y1}Q${(x1+x2)/2} ${Math.min(y1,y2)-8} ${x2} ${y2}Q${(x1+x2)/2+4} ${Math.max(y1,y2)+6} ${x1} ${y1}Z` }));
      add(group, "circle", { class: "fruit-date-wheel", cx: -110, cy: 31, r: 28 });
      add(group, "path", { class: "fruit-date-axle", d: "M-145 31H-138" });
      add(group, "path", { class: "fruit-date-spokes", d: "M-110 4V58M-137 31H-83M-129 12L-91 50M-91 12L-129 50" });
      const dateText = add(group, "text", { class: "fruit-small-text", x: -110, y: 35, "text-anchor": "middle" });
      dateText.textContent = "28 FEB";
      add(group, "circle", { class: "fruit-counter-pulley", cx: 112, cy: -66, r: 12 });
      add(group, "path", { class: "fruit-counter-cord", d: "M100-66H82V-34M124-66V-11" });
      add(group, "circle", { class: "fruit-counter-anchor", cx: 82, cy: -34, r: 4 });
      add(group, "path", { class: "fruit-counterweight", d: "M109-12H139L144 25H104Z" });
      add(group, "path", { class: "fruit-record-plate", d: "M-47 77H73L65 104H-54Z" });
      const recordText = add(group, "text", { class: "fruit-record-text", x: 9, y: 96, "text-anchor": "middle" });
      recordText.textContent = "GOY1 / JU2484";
      add(group, "path", { class: "fruit-track-feet", d: "M-143 108L-154 138M137 108L150 138" });
    }
    return true;
  }

  if (item.family === "sao-tome-point-count-sound-loom") {
    group.dataset.renderer = "sao-tome-point-count-sound-loom";
    group.classList.add("sao-tome-accessory", "point-count-loom", companion ? "point-count-loom-companion" : "point-count-loom-primary");
    if (companion) {
      add(group, "path", { class: "sao-accessory-shadow", d: "M-105 128Q0 157 112 124Q55 171-96 165Z" });
      add(group, "path", { class: "sound-mast-base", d: "M-79 83H77L96 129H-99Z" });
      add(group, "path", { class: "sound-single-mast", d: "M-30 82V-101H-2" });
      add(group, "path", { class: "sound-single-horn", d: "M-15-111Q26-142 70-119L48-82Q18-98-9-84Z" });
      add(group, "path", { class: "sound-horn-ribs", d: "M-2-104Q20-117 50-112M-7-94Q17-105 43-100" });
      add(group, "path", { class: "sound-cylinder-frame", d: "M-8-63H55V61H-8Z" });
      add(group, "path", { class: "sound-cylinder-bracket", d: "M-30-55H-8M-30 52H-8" });
      add(group, "path", { class: "sound-spiral-cylinder", d: "M2-53C52-45 52-27 3-20C-36-14-34 3 4 10C48 18 47 35 5 43C-24 48-24 57 0 63" });
      add(group, "path", { class: "sound-observer-rail", d: "M68-58V83" });
      [[68,-32,-1],[68,4,1],[68,40,-1]].forEach(([cx,cy,side], index) => {
        add(group, "path", { class: index % 2 ? "sound-observer-slider deep" : "sound-observer-slider", d: `M${cx-12} ${cy-7}H${cx+12}V${cy+7}H${cx-12}Z` });
        add(group, "circle", { class: "sound-observer-knob", cx: cx + side * 18, cy, r: 5 });
      });
      add(group, "path", { class: "sound-pendulum-bracket", d: "M-30-67H-73V-42" });
      add(group, "circle", { class: "sound-ten-minute-dial", cx: -73, cy: -19, r: 18 });
      add(group, "path", { class: "sound-pendulum-cord", d: "M-73-1V62" });
      add(group, "path", { class: "sound-pendulum-weight", d: "M-87 62Q-73 42-59 62Q-61 82-73 88Q-85 82-87 62Z" });
      const dialText = add(group, "text", { class: "sound-small-text", x: -73, y: -15, "text-anchor": "middle" });
      dialText.textContent = "10";
      add(group, "path", { class: "sound-mast-feet", d: "M-69 126L-80 151M69 126L81 151" });
    } else {
      add(group, "path", { class: "sao-accessory-shadow", d: "M-177 117Q0 151 181 113Q91 166-164 160Z" });
      add(group, "path", { class: "sound-arc-base", d: "M-157 73H150L172 119H-173Z" });
      add(group, "path", { class: "sound-listening-arc", d: "M-141 72Q-112-91 4-115Q116-87 142 72" });
      add(group, "path", { class: "sound-arc-inlay", d: "M-116 68Q-89-63 2-83Q91-62 117 68" });
      const funnels = [
        [-88,-42,.72,-22],
        [2,-85,1,0],
        [91,-34,.82,19]
      ];
      funnels.forEach(([cx,cy,scale,angle], index) => {
        const funnel = add(group, "g", { class: "sound-funnel-group", transform: `translate(${cx} ${cy}) rotate(${angle}) scale(${scale})` });
        add(funnel, "path", { class: index % 2 ? "sound-acoustic-funnel deep" : "sound-acoustic-funnel", d: "M-33-18Q0-42 35-17L18 18Q0 7-18 19Z" });
        add(funnel, "path", { class: "sound-funnel-throat", d: "M-11 14L-6 39H7L13 13" });
        add(funnel, "path", { class: "sound-funnel-ripple", d: "M-23-13Q0-28 25-12M-16-4Q0-15 17-4" });
      });
      add(group, "path", { class: "sound-funnel-supports", d: "M-88-14L-56 19M2-46V19M82-3L56 19" });
      add(group, "path", { class: "sound-wave-drum", d: "M-75 19H76L88 73H-86Z" });
      add(group, "path", { class: "sound-woven-wave", d: "M-64 45L-51 32L-38 53L-24 27L-10 49L5 23L20 55L35 30L51 49L66 35M-63 57L-48 47L-34 63L-18 42L-2 61L15 40L31 64L47 45L66 58" });
      add(group, "circle", { class: "sound-ten-minute-dial", cx: 117, cy: 43, r: 24 });
      add(group, "path", { class: "sound-dial-hand", d: "M117 43L128 27M117 19V25M141 43H135M117 67V61M93 43H99" });
      const dialText = add(group, "text", { class: "sound-small-text", x: 117, y: 50, "text-anchor": "middle" });
      dialText.textContent = "10";
      const radiusText = add(group, "text", { class: "sound-radius-text", x: -112, y: 59, "text-anchor": "middle" });
      radiusText.textContent = "20 m";
      add(group, "path", { class: "sound-arc-feet", d: "M-145 115L-156 143M137 115L150 143" });
    }
    return true;
  }

  if (item.family === "sao-tome-begonia-lineage-kinetoscope") {
    group.dataset.renderer = "sao-tome-begonia-lineage-kinetoscope";
    group.classList.add("sao-tome-accessory", "begonia-kinetoscope", companion ? "begonia-kinetoscope-companion" : "begonia-kinetoscope-primary");
    if (companion) {
      add(group, "path", { class: "sao-accessory-shadow", d: "M-108 128Q0 159 115 124Q58 173-99 166Z" });
      add(group, "path", { class: "begonia-strip-base", d: "M-82 83H82L101 129H-103Z" });
      add(group, "path", { class: "begonia-petiole-frame", d: "M-56 84Q-82-5-43-100Q-29-132-2-117Q11-107 5-87M62 83Q83-11 46-80Q31-107 7-97" });
      add(group, "path", { class: "begonia-flip-spine", d: "M1-92V83" });
      const panels = [
        [-43,-72,"M-55-88Q-19-99-4-70Q-27-43-58-51Z"],
        [35,-30,"M4-49Q35-72 61-40Q53-7 14-4Z"],
        [-32,13,"M-58-2Q-25-23-3 8Q-15 39-51 43Z"],
        [36,51,"M8 35Q42 16 66 48Q55 78 18 78Z"]
      ];
      panels.forEach(([cx,cy,d], index) => {
        add(group, "path", { class: index % 2 ? "begonia-flip-panel deep" : "begonia-flip-panel", d });
        add(group, "circle", { class: "begonia-panel-hinge", cx: index % 2 ? 5 : -3, cy, r: 4 });
      });
      add(group, "path", { class: "begonia-lineage-ribbon", d: "M1-82C-26-58-19-38 1-24C23-7 21 12 1 27C-17 41-15 59 0 73M1-24C-38-14-49 4-39 22M1 27C39 20 49 38 41 56" });
      add(group, "circle", { class: "begonia-viewing-aperture", cx: 54, cy: -84, r: 19 });
      add(group, "circle", { class: "begonia-aperture-inner", cx: 54, cy: -84, r: 9 });
      add(group, "path", { class: "begonia-crank-shaft", d: "M63 38H91V59H108" });
      add(group, "circle", { class: "begonia-crank-wheel", cx: 113, cy: 59, r: 11 });
      add(group, "path", { class: "begonia-crank-spokes", d: "M103 59H123M113 49V69" });
      add(group, "path", { class: "begonia-strip-feet", d: "M-70 126L-81 151M71 126L83 151" });
    } else {
      add(group, "path", { class: "sao-accessory-shadow", d: "M-173 119Q0 154 178 115Q89 169-160 162Z" });
      add(group, "path", { class: "begonia-drum-base", d: "M-152 76H146L168 121H-171Z" });
      add(group, "path", { class: "begonia-leaf-drum", d: "M-145-18Q-103-109-5-101Q76-135 146-62Q162 8 90 55Q22 92-47 62Q-112 56-145-18Z" });
      add(group, "path", { class: "begonia-leaf-midvein", d: "M-126 17Q-52-8 13-49Q70-83 132-67" });
      add(group, "path", { class: "begonia-leaf-veins", d: "M-81 1L-100-58M-38-20L-44-82M9-47L27-96M50-66L78-101M-58 22L-59 56M-8-7L14 64M39-35L75 45M82-53L112 9" });
      add(group, "ellipse", { class: "begonia-lineage-ring outer", cx: 18, cy: -18, rx: 65, ry: 52, transform: "rotate(-13 18 -18)" });
      add(group, "ellipse", { class: "begonia-lineage-ring middle", cx: 18, cy: -18, rx: 45, ry: 35, transform: "rotate(-13 18 -18)" });
      add(group, "ellipse", { class: "begonia-lineage-ring inner", cx: 18, cy: -18, rx: 24, ry: 18, transform: "rotate(-13 18 -18)" });
      [[-96,-21,52,24],[-35,34,55,22],[67,14,55,22]].forEach(([x,y,width,height], index) => {
        add(group, "path", { class: index % 2 ? "begonia-shutter deep" : "begonia-shutter", d: `M${x} ${y}H${x+width}L${x+width-7} ${y+height}H${x-6}Z` });
        add(group, "path", { class: "begonia-shutter-slit", d: `M${x+10} ${y+height/2}H${x+width-12}` });
      });
      add(group, "path", { class: "begonia-drum-support", d: "M-96 55L-111 78M91 47L112 78" });
      add(group, "path", { class: "begonia-crank-shaft", d: "M143-37H171V-13H192" });
      add(group, "circle", { class: "begonia-crank-wheel", cx: 198, cy: -13, r: 12 });
      add(group, "path", { class: "begonia-crank-spokes", d: "M187-13H209M198-24V-2" });
      add(group, "circle", { class: "begonia-viewing-aperture", cx: -103, cy: 28, r: 18 });
      add(group, "circle", { class: "begonia-aperture-inner", cx: -103, cy: 28, r: 8 });
      add(group, "path", { class: "begonia-drum-feet", d: "M-139 118L-151 145M132 117L145 145" });
    }
    return true;
  }

  return false;
}

function drawPohnpeiQG4739Accessory(group, item, companion) {
  if (!item.id.startsWith("tropicalis::Pohnpei, Micronesia · QG4739::")) return false;

  if (item.family === "qg4739-kotop-fruit-parasol") {
    group.dataset.renderer = "qg4739-kotop-fruit-parasol";
    group.classList.add("pohnpei-accessory", "kotop-fruit-parasol", companion ? "kotop-fruit-parasol-companion" : "kotop-fruit-parasol-primary");
    if (companion) {
      add(group, "ellipse", { class: "pohnpei-prop-shadow", cx: -2, cy: 122, rx: 74, ry: 13, transform: "rotate(8 -2 122)" });
      add(group, "path", { class: "kotop-parasol-stem", d: "M-60 119Q-18 96 1 50Q15 15 43-17" });
      add(group, "path", { class: "kotop-parasol-handle", d: "M-60 119Q-79 128-77 143Q-74 158-58 157Q-46 156-42 145" });
      add(group, "path", { class: "kotop-parasol-canopy companion", d: "M-80-9Q-30-72 38-69Q86-58 112-18Q79-29 56-6Q28-26 3-1Q-22-25-43 1Q-61-16-80-9Z" });
      add(group, "path", { class: "kotop-parasol-panel berry", d: "M-80-9Q-32-67 38-69Q7-41 3-1Q-22-25-43 1Q-61-16-80-9Z" });
      add(group, "path", { class: "kotop-parasol-panel gold", d: "M38-69Q84-56 112-18Q79-29 56-6Q31-25 3-1Q7-41 38-69Z" });
      add(group, "path", { class: "kotop-parasol-ribs", d: "M38-69Q4-42-43 1M38-69Q23-34 3-1M38-69Q53-37 56-6M38-69Q78-45 112-18" });
      add(group, "path", { class: "kotop-parasol-edge", d: "M-80-9Q-61-16-43 1Q-22-25 3-1Q28-26 56-6Q79-29 112-18" });
      add(group, "path", { class: "kotop-parasol-finial", d: "M31-70Q38-86 46-70" });
      add(group, "circle", { class: "kotop-parasol-cap", cx: 39, cy: -73, r: 6 });
      add(group, "path", { class: "kotop-parasol-grip", d: "M-40 88Q-21 99-9 80L-2 91Q-19 114-46 101Z" });
    } else {
      add(group, "ellipse", { class: "pohnpei-prop-shadow", cx: 0, cy: 132, rx: 93, ry: 15 });
      add(group, "path", { class: "kotop-parasol-stem", d: "M0 129Q12 88 7 38V-26" });
      add(group, "path", { class: "kotop-parasol-handle", d: "M0 128Q-2 151 18 155Q38 158 44 137Q47 126 37 120" });
      add(group, "path", { class: "kotop-parasol-canopy", d: "M-158-17Q-112-88 0-105Q104-91 158-17Q119-36 79-4Q39-39 0-3Q-38-40-80-4Q-119-36-158-17Z" });
      add(group, "path", { class: "kotop-parasol-panel berry", d: "M-158-17Q-112-86 0-105Q-54-69-80-4Q-119-36-158-17Z" });
      add(group, "path", { class: "kotop-parasol-panel cream", d: "M0-105Q-54-69-80-4Q-38-40 0-3Q37-39 79-4Q54-69 0-105Z" });
      add(group, "path", { class: "kotop-parasol-panel gold", d: "M0-105Q104-90 158-17Q119-36 79-4Q54-69 0-105Z" });
      add(group, "path", { class: "kotop-parasol-ribs", d: "M0-105Q-76-73-158-17M0-105Q-52-58-80-4M0-105V-3M0-105Q52-58 79-4M0-105Q77-73 158-17" });
      add(group, "path", { class: "kotop-parasol-edge", d: "M-158-17Q-119-36-80-4Q-38-40 0-3Q39-39 79-4Q119-36 158-17" });
      add(group, "path", { class: "kotop-parasol-finial", d: "M-8-104Q0-124 9-104" });
      add(group, "circle", { class: "kotop-parasol-cap", cx: 0, cy: -108, r: 7 });
      add(group, "path", { class: "kotop-parasol-grip", d: "M5 76Q28 82 31 58L43 65Q39 96 6 94Z" });
    }
    return true;
  }

  if (item.family === "qg4739-peppercorn-rollerboard") {
    group.dataset.renderer = "qg4739-peppercorn-rollerboard";
    group.classList.add("pohnpei-accessory", "peppercorn-rollerboard", companion ? "peppercorn-rollerboard-companion" : "peppercorn-rollerboard-primary");
    if (companion) {
      add(group, "ellipse", { class: "pohnpei-prop-shadow", cx: 0, cy: 82, rx: 112, ry: 15 });
      add(group, "path", { class: "pepper-board-deck companion", d: "M-132 12Q-105 27-65 20Q-7 8 47 16Q89 22 124-5L133 17Q95 48 45 41Q-8 33-65 44Q-112 52-141 31Z" });
      add(group, "path", { class: "pepper-board-edge", d: "M-140 31Q-111 53-65 44Q-8 33 45 41Q95 48 133 17" });
      add(group, "path", { class: "pepper-board-grip", d: "M-105 24Q-54 19-11 21M15 23Q61 31 103 13" });
      add(group, "path", { class: "pepper-board-baseplate", d: "M-96 40H-68L-72 50H-92ZM64 37H88L85 47H67Z" });
      add(group, "path", { class: "pepper-board-truck", d: "M-82 42V61M-105 61H-59M76 39V58M60 58H93" });
      [[-105,66,17],[-59,66,17],[76,64,19]].forEach(([cx,cy,r], index) => {
        add(group, "circle", { class: index === 2 ? "pepper-board-wheel pale" : "pepper-board-wheel", cx, cy, r });
        add(group, "circle", { class: "pepper-board-bearing", cx, cy, r: 6 });
        add(group, "path", { class: "pepper-board-calyx", d: `M${cx-6} ${cy-r+4}L${cx} ${cy-r-5}L${cx+6} ${cy-r+4}` });
      });
      add(group, "path", { class: "pepper-board-vine", d: "M-48 13Q-18-21 17 5Q43 24 59-3" });
      add(group, "path", { class: "pepper-board-harness", d: "M-32 19Q-20-9-5 16M23 18Q34-5 48 24" });
    } else {
      add(group, "ellipse", { class: "pohnpei-prop-shadow", cx: 0, cy: 89, rx: 146, ry: 17 });
      add(group, "path", { class: "pepper-board-deck", d: "M-177-1Q-155 23-111 25Q-45 22 0 8Q52 21 112 24Q154 22 177-1L187 19Q157 53 110 51Q53 47 0 35Q-51 48-112 52Q-159 53-188 18Z" });
      add(group, "path", { class: "pepper-board-edge", d: "M-188 18Q-159 53-112 52Q-51 48 0 35Q53 47 110 51Q157 53 187 19" });
      add(group, "path", { class: "pepper-board-grip", d: "M-142 16Q-85 31-24 17M24 17Q85 31 142 16" });
      add(group, "path", { class: "pepper-board-baseplate", d: "M-137 45H-101L-105 56H-133ZM101 45H137L133 56H105Z" });
      add(group, "path", { class: "pepper-board-truck", d: "M-119 48V66M-147 66H-91M119 48V66M91 66H147" });
      [[-147,72],[-91,72],[91,72],[147,72]].forEach(([cx,cy], index) => {
        add(group, "circle", { class: index % 2 ? "pepper-board-wheel pale" : "pepper-board-wheel", cx, cy, r: 21 });
        add(group, "circle", { class: "pepper-board-bearing", cx, cy, r: 7 });
        add(group, "path", { class: "pepper-board-calyx", d: `M${cx-7} ${cy-17}L${cx} ${cy-27}L${cx+7} ${cy-17}` });
      });
      add(group, "path", { class: "pepper-board-vine", d: "M-69 19Q-41-23 0 8Q39-24 69 20" });
      add(group, "path", { class: "pepper-board-harness", d: "M-68 27Q-52-8-33 22M33 22Q52-8 68 27" });
      add(group, "circle", { class: "pepper-board-vine-berry", cx: -15, cy: -2, r: 7 });
      add(group, "circle", { class: "pepper-board-vine-berry pale", cx: 2, cy: 4, r: 6 });
      add(group, "circle", { class: "pepper-board-vine-berry", cx: 17, cy: -2, r: 7 });
    }
    return true;
  }

  if (item.family === "qg4739-rain-leaf-sled") {
    group.dataset.renderer = "qg4739-rain-leaf-sled";
    group.classList.add("pohnpei-accessory", "rain-leaf-sled", companion ? "rain-leaf-sled-companion" : "rain-leaf-sled-primary");
    if (companion) {
      add(group, "ellipse", { class: "pohnpei-prop-shadow", cx: 2, cy: 103, rx: 94, ry: 14, transform: "rotate(-5 2 103)" });
      add(group, "path", { class: "rain-leaf-sled-shell companion", d: "M-122 34Q-86-17-15-31Q49-23 110-56Q101-5 65 35Q18 75-54 66Q-99 62-122 34Z" });
      add(group, "path", { class: "rain-leaf-sled-fold", d: "M-111 34Q-54 8-15-31Q11 10 64 35Q17 68-54 59Q-91 55-111 34Z" });
      add(group, "path", { class: "rain-leaf-sled-midrib", d: "M-108 39Q-25 22 110-56" });
      add(group, "path", { class: "rain-leaf-sled-ribs", d: "M-73 23L-85-4M-42 8L-46-22M-8-9L-3 28M25-24L37 17M58-38L73-8" });
      add(group, "path", { class: "rain-leaf-sled-runner", d: "M-101 68Q-35 95 50 72M-84 57Q-26 78 35 61M-83 63L-98 73M40 66L54 75" });
      add(group, "path", { class: "rain-leaf-sled-handle", d: "M-49 10Q-41-26-16-21Q9-17 9 15" });
      add(group, "path", { class: "rain-leaf-sled-splash", d: "M-128 42Q-146 30-151 12M-122 52Q-145 55-154 71" });
    } else {
      add(group, "ellipse", { class: "pohnpei-prop-shadow", cx: 0, cy: 116, rx: 132, ry: 16 });
      add(group, "path", { class: "rain-leaf-sled-shell", d: "M-171 21Q-123-46-38-56Q49-66 151-28Q178-17 185-39Q188 29 144 70Q76 113-21 96Q-113 89-171 21Z" });
      add(group, "path", { class: "rain-leaf-sled-fold", d: "M-153 24Q-86-5-38-56Q-10 5 45 38Q92 68 144 70Q77 105-18 87Q-107 82-153 24Z" });
      add(group, "path", { class: "rain-leaf-sled-midrib", d: "M-151 28Q-41 15 185-39" });
      add(group, "path", { class: "rain-leaf-sled-ribs", d: "M-112 16L-127-19M-72 3L-79-39M-29-11L-20 35M16-23L34 21M60-35L83 1M105-44L127-20" });
      add(group, "path", { class: "rain-leaf-sled-runner", d: "M-139 92Q-40 130 91 104M-118 76Q-34 108 73 88M-111 84L-132 99M76 91L99 108" });
      add(group, "path", { class: "rain-leaf-sled-handle", d: "M-71-1Q-58-45-25-39Q7-34 10 10M56-24Q69-55 95-42Q116-32 108-3" });
      add(group, "path", { class: "rain-leaf-sled-splash", d: "M-176 29Q-200 14-204-10M-168 45Q-196 48-208 68M-155 59Q-179 72-183 91" });
    }
    return true;
  }

  const label = (parent, value, x, y, className = "pohnpei-machine-text", anchor = "middle", transform = null) => {
    const attributes = { class: className, x, y, "text-anchor": anchor };
    if (transform) attributes.transform = transform;
    const text = add(parent, "text", attributes);
    text.textContent = value;
    return text;
  };

  if (item.family === "qg4739-kotop-name-concordance") {
    group.dataset.renderer = "qg4739-kotop-name-concordance";
    group.classList.add("pohnpei-accessory", "kotop-concordance", companion ? "kotop-concordance-companion" : "kotop-concordance-primary");
    if (companion) {
      add(group, "path", { class: "pohnpei-machine-shadow", d: "M-112 126Q0 158 116 123Q59 173-101 166Z" });
      add(group, "path", { class: "pohnpei-machine-base", d: "M-87 82H80L100 128H-104Z" });
      add(group, "path", { class: "concordance-tower-frame", d: "M-53 82V-112H45V82M-53-112H45" });
      add(group, "circle", { class: "concordance-index-wheel", cx: -4, cy: -72, r: 35 });
      add(group, "circle", { class: "concordance-index-hub", cx: -4, cy: -72, r: 8 });
      const shutters = [
        [-39,-93,56,23,"KOTOP"],
        [-16,-62,65,23,"CaeNDR"],
        [-39,-31,56,23,"KEW"]
      ];
      shutters.forEach(([x,y,width,height,value], index) => {
        add(group, "path", { class: index === 1 ? "concordance-shutter deep" : "concordance-shutter", d: "M" + x + " " + y + "H" + (x+width) + "L" + (x+width-6) + " " + (y+height) + "H" + (x-5) + "Z" });
        label(group, value, x + width / 2 - 2, y + 15, "pohnpei-machine-text tiny");
      });
      add(group, "path", { class: "concordance-leaf-shutter", d: "M-67-48Q-112-88-103-122Q-66-124-44-85Q-45-57-67-48Z" });
      add(group, "path", { class: "concordance-leaf-rib", d: "M-66-51Q-76-81-96-111M-73-75L-95-81M-80-90L-58-88" });
      add(group, "path", { class: "concordance-specimen-drawer", d: "M-43 9H43L37 62H-49Z" });
      add(group, "path", { class: "concordance-drawer-seam", d: "M-37 30H35M-35 49H32" });
      add(group, "circle", { class: "concordance-drawer-pull", cx: -3, cy: 19, r: 4 });
      add(group, "circle", { class: "concordance-return-gear large", cx: 69, cy: -75, r: 16 });
      add(group, "circle", { class: "concordance-return-gear", cx: 69, cy: 42, r: 11 });
      add(group, "path", { class: "concordance-return-chain", d: "M69-59V31M61-70L50-55M77-70L88-55M61 38L49 27M77 38L88 27" });
      add(group, "path", { class: "concordance-vial-bracket", d: "M-54 3H-83V47H-70" });
      add(group, "rect", { class: "pohnpei-culture-vial", x: -96, y: 19, width: 28, height: 52, rx: 8 });
      add(group, "rect", { class: "pohnpei-vial-cap", x: -93, y: 10, width: 22, height: 12, rx: 3 });
      label(group, "QG", -82, 50, "pohnpei-machine-text tiny", "middle", "rotate(-90 -82 50)");
      add(group, "path", { class: "concordance-kotop-tab", d: "M47-119H94L87-95H47Z" });
      label(group, "KOTOP", 68, -103, "pohnpei-machine-text tiny");
      add(group, "circle", { class: "concordance-viewing-aperture", cx: -4, cy: 67, r: 14 });
      add(group, "circle", { class: "concordance-aperture-inner", cx: -4, cy: 67, r: 6 });
      label(group, "KOTOP", -2, 116, "pohnpei-machine-text pohnpei-machine-mobile-key");
      add(group, "path", { class: "pohnpei-machine-feet", d: "M-75 125L-87 151M71 125L84 151" });
    } else {
      add(group, "path", { class: "pohnpei-machine-shadow", d: "M-181 112Q0 150 185 108Q92 166-168 158Z" });
      add(group, "path", { class: "pohnpei-machine-base", d: "M-164 67H151L175 114H-178Z" });
      add(group, "path", { class: "concordance-cabinet-frame", d: "M-151 67V-85H136V67M-151-85H136" });
      const windows = [
        [-137,-70,78,40,"KOTOP"],
        [-48,-70,83,40,"CaeNDR"],
        [46,-70,74,40,"KEW"]
      ];
      windows.forEach(([x,y,width,height,value], index) => {
        add(group, "rect", { class: index === 1 ? "concordance-window deep" : "concordance-window", x, y, width, height, rx: 7 });
        label(group, value, x + width / 2, y + 25, "pohnpei-machine-text");
      });
      add(group, "path", { class: "concordance-spelling-rail", d: "M-126-13H111M-126-19V-7M111-19V-7" });
      add(group, "rect", { class: "concordance-spelling-carriage", x: -98, y: -24, width: 186, height: 25, rx: 6 });
      label(group, "ponapensis ↔ ponapense", -5, -8, "pohnpei-machine-text micro");
      add(group, "path", { class: "concordance-fruit-cradle", d: "M-76 21Q-57-2-31 16Q-8-3 14 16Q39-3 61 19L51 50H-68Z" });
      add(group, "path", { class: "concordance-fruit-sample", d: "M-49 21Q-43 4-26 3Q-12-7 1 4Q17-3 31 8Q45 16 36 27Q24 39 8 34Q-8 43-22 34Q-41 38-50 28Z" });
      add(group, "path", { class: "concordance-drive-shaft", d: "M111-13H154V8H174" });
      add(group, "circle", { class: "concordance-crank-wheel", cx: 180, cy: 8, r: 12 });
      add(group, "path", { class: "concordance-crank-spokes", d: "M169 8H191M180-3V19" });
      add(group, "path", { class: "concordance-vial-dock", d: "M107 17H142V60H107" });
      add(group, "rect", { class: "pohnpei-culture-vial", x: 117, y: 22, width: 27, height: 47, rx: 8 });
      add(group, "rect", { class: "pohnpei-vial-cap", x: 120, y: 14, width: 21, height: 11, rx: 3 });
      label(group, "QG4739", 131, 51, "pohnpei-machine-text micro", "middle", "rotate(-90 131 51)");
      add(group, "path", { class: "concordance-flipplate", d: "M-62 76H71L62 103H-70Z" });
      label(group, "C-0230F  /  QG4739", 1, 94, "pohnpei-machine-text tiny");
      label(group, "KOTOP", 1, 101, "pohnpei-machine-text pohnpei-machine-mobile-key");
      add(group, "path", { class: "pohnpei-machine-feet", d: "M-149 110L-161 139M139 110L152 139" });
    }
    return true;
  }

  if (item.family === "qg4739-paired-temperature-differential") {
    group.dataset.renderer = "qg4739-paired-temperature-differential";
    group.classList.add("pohnpei-accessory", "temperature-differential", companion ? "temperature-differential-companion" : "temperature-differential-primary");
    if (companion) {
      add(group, "path", { class: "pohnpei-machine-shadow", d: "M-108 130Q0 160 114 126Q57 175-99 168Z" });
      add(group, "path", { class: "pohnpei-machine-base", d: "M-82 84H79L99 130H-102Z" });
      add(group, "path", { class: "temperature-column-frame", d: "M-48 84V-112H44V84M-48-112H44" });
      add(group, "circle", { class: "temperature-air-bulb", cx: 24, cy: -88, r: 23 });
      add(group, "circle", { class: "temperature-contact-bulb", cx: -21, cy: 45, r: 25 });
      add(group, "path", { class: "temperature-closed-capillary", d: "M24-65V-47H-4V25H-21M-21 20H12V-47H24" });
      add(group, "rect", { class: "temperature-value-shutter", x: -43, y: -53, width: 55, height: 25, rx: 5 });
      add(group, "rect", { class: "temperature-value-shutter deep", x: 2, y: 4, width: 57, height: 25, rx: 5 });
      label(group, "26.0", -16, -36, "pohnpei-machine-text");
      label(group, "23.7", 30, 21, "pohnpei-machine-text");
      add(group, "path", { class: "temperature-rack", d: "M-62-75V43M-62-66H-53M-62-49H-53M-62-32H-53M-62-15H-53M-62 2H-53M-62 19H-53M-62 36H-53" });
      add(group, "circle", { class: "temperature-differential-gear", cx: -32, cy: -13, r: 18 });
      add(group, "path", { class: "temperature-gear-spokes", d: "M-50-13H-14M-32-31V5M-45-26L-19 0M-19-26L-45 0" });
      add(group, "path", { class: "temperature-result-window", d: "M-13 38H58L52 70H-19Z" });
      label(group, "Δ 2.3 °C", 19, 59, "pohnpei-machine-text");
      add(group, "path", { class: "temperature-calibration-drawer", d: "M-69 67H-8L-13 97H-75Z" });
      add(group, "circle", { class: "temperature-drawer-pull", cx: -42, cy: 77, r: 4 });
      add(group, "path", { class: "temperature-crank-shaft", d: "M58 49H86V70H101" });
      add(group, "circle", { class: "temperature-crank-wheel", cx: 106, cy: 70, r: 10 });
      add(group, "path", { class: "temperature-crank-spokes", d: "M97 70H115M106 61V79" });
      label(group, "23↔26", -1, 117, "pohnpei-machine-text pohnpei-machine-mobile-key");
      add(group, "path", { class: "pohnpei-machine-feet", d: "M-71 128L-83 153M69 128L81 153" });
    } else {
      add(group, "path", { class: "pohnpei-machine-shadow", d: "M-181 116Q0 152 184 112Q92 168-167 161Z" });
      add(group, "path", { class: "pohnpei-machine-base", d: "M-161 72H153L175 118H-175Z" });
      add(group, "path", { class: "temperature-bridge-frame", d: "M-145 71V-54H132V71M-145-54H132" });
      add(group, "path", { class: "temperature-contact-chamber", d: "M-135 15Q-116-25-75-25Q-36-24-22 13L-30 53H-128Z" });
      add(group, "path", { class: "temperature-contact-pad", d: "M-116 15Q-100-7-76-7Q-51-7-39 15L-46 34H-110Z" });
      add(group, "circle", { class: "temperature-air-bulb", cx: 105, cy: -28, r: 29 });
      add(group, "path", { class: "temperature-air-stand", d: "M105 1V51M83 51H127" });
      add(group, "path", { class: "temperature-closed-capillary", d: "M-26-8H-4V-35H76V-28H76M76-17H15V16H-22" });
      add(group, "circle", { class: "temperature-differential-gear", cx: 6, cy: 31, r: 27 });
      add(group, "path", { class: "temperature-gear-spokes", d: "M-21 31H33M6 4V58M-13 12L25 50M25 12L-13 50" });
      add(group, "path", { class: "temperature-opposed-pointers", d: "M6 31L-8 12M6 31L24 17" });
      add(group, "rect", { class: "temperature-value-shutter", x: -124, y: -43, width: 63, height: 27, rx: 6 });
      add(group, "rect", { class: "temperature-value-shutter deep", x: 66, y: 10, width: 74, height: 27, rx: 6 });
      label(group, "23.7", -92, -24, "pohnpei-machine-text");
      label(group, "26.0", 103, 29, "pohnpei-machine-text");
      add(group, "path", { class: "temperature-result-window", d: "M-32 66H50L43 96H-39Z" });
      label(group, "Δ 2.3 °C", 5, 86, "pohnpei-machine-text");
      add(group, "path", { class: "temperature-crank-shaft", d: "M32 31H62V51H79" });
      add(group, "circle", { class: "temperature-crank-wheel", cx: 85, cy: 51, r: 11 });
      add(group, "path", { class: "temperature-crank-spokes", d: "M75 51H95M85 41V61" });
      add(group, "path", { class: "temperature-vial-dock", d: "M-157-21H-137V57H-151" });
      add(group, "rect", { class: "pohnpei-culture-vial", x: -174, y: 1, width: 29, height: 55, rx: 8 });
      add(group, "rect", { class: "pohnpei-vial-cap", x: -171, y: -9, width: 23, height: 13, rx: 3 });
      label(group, "QG4739", -159, 35, "pohnpei-machine-text micro", "middle", "rotate(-90 -159 35)");
      label(group, "23↔26", 0, 105, "pohnpei-machine-text pohnpei-machine-mobile-key");
      add(group, "path", { class: "pohnpei-machine-feet", d: "M-146 114L-158 142M139 114L152 142" });
    }
    return true;
  }

  if (item.family === "c0230-seven-isotype-registry") {
    group.dataset.renderer = "c0230-seven-isotype-registry";
    group.classList.add("pohnpei-accessory", "seven-isotype-registry", companion ? "seven-isotype-registry-companion" : "seven-isotype-registry-primary");
    if (companion) {
      add(group, "path", { class: "pohnpei-machine-shadow", d: "M-109 131Q0 161 115 127Q57 176-100 169Z" });
      add(group, "path", { class: "pohnpei-machine-base", d: "M-83 85H81L101 131H-103Z" });
      add(group, "path", { class: "registry-spine", d: "M0 83V-117" });
      add(group, "circle", { class: "registry-return-wheel large", cx: 0, cy: -109, r: 16 });
      add(group, "circle", { class: "registry-return-wheel", cx: 0, cy: 76, r: 13 });
      add(group, "path", { class: "registry-return-chain", d: "M-11-98Q-30-58-22-18Q-15 18-11 66M11-98Q30-58 22-18Q15 18 11 66" });
      const drawerData = [
        ["A",-77,-82,58],["B",20,-57,61],["C",-80,-30,61],["D",21,-3,63],
        ["E",-78,25,60],["F",19,51,68],["G",-72,78,56]
      ];
      drawerData.forEach(([value,x,y,width], index) => {
        add(group, "path", { class: value === "F" ? "registry-helical-drawer focus" : (index % 2 ? "registry-helical-drawer deep" : "registry-helical-drawer"), d: "M" + x + " " + y + "H" + (x+width) + "L" + (x+width-6) + " " + (y+22) + "H" + (x-5) + "Z" });
        label(group, value, x + width / 2 - 2, y + 15, "pohnpei-machine-text");
        add(group, "circle", { class: "registry-qg-tab", cx: x < 0 ? x + width + 5 : x - 7, cy: y + 11, r: 4 });
      });
      add(group, "path", { class: "registry-f-view-frame", d: "M87 38H116V87H87" });
      add(group, "circle", { class: "registry-viewing-lens", cx: 101, cy: 58, r: 14 });
      add(group, "circle", { class: "registry-viewing-lens-inner", cx: 101, cy: 58, r: 6 });
      label(group, "QG4739", 101, 84, "pohnpei-machine-text micro");
      add(group, "path", { class: "registry-coordinate-plate", d: "M-90 101H66L59 128H-98Z" });
      label(group, "6.9066 / 158.1818", -16, 119, "pohnpei-machine-text tiny");
      add(group, "path", { class: "registry-winding-shaft", d: "M14-109H65V-91H84" });
      add(group, "circle", { class: "registry-winding-wheel", cx: 89, cy: -91, r: 10 });
      add(group, "path", { class: "registry-winding-spokes", d: "M80-91H98M89-100V-82" });
      label(group, "A–G", -14, 121, "pohnpei-machine-text pohnpei-machine-mobile-key");
      add(group, "path", { class: "pohnpei-machine-feet", d: "M-73 129L-85 154M71 129L83 154" });
    } else {
      add(group, "path", { class: "pohnpei-machine-shadow", d: "M-184 112Q0 151 187 108Q94 167-169 159Z" });
      add(group, "path", { class: "pohnpei-machine-base", d: "M-166 67H156L179 114H-180Z" });
      add(group, "path", { class: "registry-rail-frame", d: "M-148 65V-48H141V65M-148-48H141" });
      add(group, "path", { class: "registry-main-rail", d: "M-126-5H125M-126 34H125M-126-12V42M125-12V42" });
      const gateXs = [-108,-72,-36,0,36,72,108];
      gateXs.forEach((x, index) => {
        const value = String.fromCharCode(65 + index);
        add(group, "path", { class: value === "F" ? "registry-gate focus" : (index % 2 ? "registry-gate deep" : "registry-gate"), d: "M" + (x-14) + "-31H" + (x+14) + "V20H" + (x-14) + "Z" });
        label(group, value, x, -9, "pohnpei-machine-text");
        add(group, "circle", { class: "registry-vial-socket", cx: x, cy: 36, r: 8 });
      });
      add(group, "circle", { class: "registry-geneva-wheel", cx: -151, cy: 10, r: 29 });
      add(group, "circle", { class: "registry-geneva-hub", cx: -151, cy: 10, r: 8 });
      [-90,-30,30,90,150,210].forEach(angle => {
        const rad = angle * Math.PI / 180;
        add(group, "circle", { class: "registry-geneva-slot", cx: -151 + Math.cos(rad) * 19, cy: 10 + Math.sin(rad) * 19, r: 4 });
      });
      add(group, "path", { class: "registry-drive-link", d: "M-122 10H-108V34" });
      add(group, "path", { class: "registry-f-view-frame", d: "M57-58H87V-20H57" });
      add(group, "circle", { class: "registry-viewing-lens", cx: 72, cy: -39, r: 13 });
      add(group, "circle", { class: "registry-viewing-lens-inner", cx: 72, cy: -39, r: 6 });
      label(group, "QG4739", 72, -65, "pohnpei-machine-text micro");
      add(group, "path", { class: "registry-coordinate-drum", d: "M-63 68Q0 53 64 68V101Q0 116-63 101Z" });
      add(group, "path", { class: "registry-drum-ribs", d: "M-63 76Q0 61 64 76M-63 93Q0 108 64 93" });
      label(group, "6.9066 / 158.1818", 0, 89, "pohnpei-machine-text tiny");
      add(group, "path", { class: "registry-drum-axle", d: "M-91 84H-63M64 84H93" });
      add(group, "circle", { class: "registry-winding-wheel", cx: 101, cy: 84, r: 12 });
      add(group, "path", { class: "registry-winding-spokes", d: "M90 84H112M101 73V95" });
      label(group, "A–G", 0, 96, "pohnpei-machine-text pohnpei-machine-mobile-key");
      add(group, "path", { class: "pohnpei-machine-feet", d: "M-151 110L-163 139M143 110L156 139" });
    }
    return true;
  }

  return false;
}

function drawQueenslandQG2904Accessory(group, item, companion) {
  if (!item.id.startsWith("tropicalis::Queensland, Australia · QG2904::")) return false;

  if (item.family === "qg2904-sealed-pod-drum") {
    group.dataset.renderer = "qg2904-sealed-pod-drum";
    group.classList.add("queensland-play-accessory", "sealed-pod-drum", companion ? "sealed-pod-drum-companion" : "sealed-pod-drum-primary");
    if (companion) {
      add(group, "ellipse", { class: "queensland-play-shadow", cx: 0, cy: 112, rx: 66, ry: 14 });
      add(group, "path", { class: "pod-drum-body companion", d: "M-31-104Q24-102 49-49Q68 5 43 67Q18 108-34 95Q-77 77-68 16Q-62-52-31-104Z" });
      add(group, "path", { class: "pod-drum-seam", d: "M-22-92Q1-51 0-4Q2 48-25 84" });
      add(group, "path", { class: "pod-drum-rim", d: "M-50-68Q-15-88 29-66M-51 70Q-12 94 31 72" });
      add(group, "path", { class: "pod-drum-lacing", d: "M-56-52L38-38M-65-17L49-5M-65 19L48 29M-56 54L35 61" });
      add(group, "path", { class: "pod-drum-harness", d: "M-51-45Q-95-10-62 48M35-55Q85-12 47 56" });
      add(group, "path", { class: "pod-drum-stand", d: "M-42 87L-55 111M28 86L43 111M-66 112H55" });
      add(group, "path", { class: "pod-drum-mallet", d: "M43-90L13-32" });
      add(group, "circle", { class: "pod-drum-mallet-head", cx: 49, cy: -101, r: 13 });
      add(group, "circle", { class: "pod-drum-hardware", cx: 13, cy: -32, r: 7 });
    } else {
      add(group, "ellipse", { class: "queensland-play-shadow", cx: 0, cy: 115, rx: 145, ry: 17 });
      add(group, "path", { class: "pod-drum-body", d: "M-170 5Q-147-45-93-49Q-46-58 0-48Q47-58 96-48Q149-42 172 4Q151 53 97 58Q48 67 1 57Q-47 67-96 58Q-150 52-170 5Z" });
      add(group, "path", { class: "pod-drum-seam", d: "M-159 2Q-111-15-62-8Q-8 0 43-8Q104-17 161 2" });
      add(group, "path", { class: "pod-drum-rim", d: "M-145-30Q-173-10-165 22Q-158 50-128 55M141-30Q170-8 165 22Q160 48 132 55" });
      add(group, "path", { class: "pod-drum-lacing", d: "M-137-34L-118 53M-103-47L-85 61M-65-52L-49 63M-23-52L-10 60M22-52L36 61M65-52L80 61M105-45L121 53" });
      add(group, "path", { class: "pod-drum-harness", d: "M-118-29Q-71-96 0-77Q69-95 119-26M-111 56Q-43 101 28 70Q72 92 112 56" });
      add(group, "path", { class: "pod-drum-stand", d: "M-110 60L-127 105M110 59L129 104M-142 106H143" });
      add(group, "path", { class: "pod-drum-mallet", d: "M-94-72L-37-13M78-68L29-10" });
      add(group, "circle", { class: "pod-drum-mallet-head", cx: -102, cy: -81, r: 15 });
      add(group, "circle", { class: "pod-drum-mallet-head alt", cx: 87, cy: -77, r: 15 });
      add(group, "circle", { class: "pod-drum-hardware", cx: -37, cy: -13, r: 8 });
      add(group, "circle", { class: "pod-drum-hardware", cx: 29, cy: -10, r: 8 });
    }
    return true;
  }

  if (item.family === "qg2904-funnel-megaphone") {
    group.dataset.renderer = "qg2904-funnel-megaphone";
    group.classList.add("queensland-play-accessory", "funnel-megaphone", companion ? "funnel-megaphone-companion" : "funnel-megaphone-primary");
    if (companion) {
      add(group, "ellipse", { class: "queensland-play-shadow", cx: 5, cy: 99, rx: 86, ry: 13, transform: "rotate(7 5 99)" });
      add(group, "path", { class: "megaphone-body companion", d: "M-106 31L48-86Q76-101 98-68Q117-39 84-7L-91 62Z" });
      add(group, "ellipse", { class: "megaphone-bell", cx: 78, cy: -46, rx: 42, ry: 54, transform: "rotate(51 78 -46)" });
      add(group, "ellipse", { class: "megaphone-bell-inner", cx: 78, cy: -46, rx: 29, ry: 39, transform: "rotate(51 78 -46)" });
      add(group, "path", { class: "megaphone-mouthpiece", d: "M-110 28L-82 48L-94 66L-122 45Z" });
      add(group, "path", { class: "megaphone-rib", d: "M-64 21L-12-15M-54 47L0 9M-25 55L22 22" });
      add(group, "path", { class: "megaphone-handle", d: "M-35 32Q-9 37-5 62Q-3 83-23 92L-42 75Q-25 66-35 53Z" });
      add(group, "path", { class: "megaphone-grip", d: "M-42 75L-24 92L-9 78L-26 62Z" });
      add(group, "path", { class: "megaphone-strap", d: "M-67 52Q-48 112 17 89Q52 77 54 40" });
      add(group, "path", { class: "megaphone-sound", d: "M121-74Q150-47 130-10M139-94Q184-52 151 9" });
    } else {
      add(group, "ellipse", { class: "queensland-play-shadow", cx: 0, cy: 111, rx: 123, ry: 16 });
      add(group, "path", { class: "megaphone-body", d: "M-158-10L114-119Q145-125 164-84Q180-45 139-2L-149 29Z" });
      add(group, "ellipse", { class: "megaphone-bell", cx: 136, cy: -57, rx: 52, ry: 70, transform: "rotate(73 136 -57)" });
      add(group, "ellipse", { class: "megaphone-bell-inner", cx: 136, cy: -57, rx: 36, ry: 52, transform: "rotate(73 136 -57)" });
      add(group, "path", { class: "megaphone-mouthpiece", d: "M-167-31L-129-21L-133 16L-171 9Z" });
      add(group, "path", { class: "megaphone-rib", d: "M-105-34L-92 27M-47-49L-37 14M13-64L21 1M72-78L81-13" });
      add(group, "path", { class: "megaphone-handle", d: "M-37 15Q-5 16 5 48Q12 73-12 91L-39 72Q-17 56-30 38Z" });
      add(group, "path", { class: "megaphone-grip", d: "M-39 72L-12 91L7 70L-21 50Z" });
      add(group, "path", { class: "megaphone-trigger", d: "M-25 35Q-6 33-2 49" });
      add(group, "path", { class: "megaphone-strap", d: "M-128 22Q-94 117-4 101Q62 90 82-11" });
      add(group, "path", { class: "megaphone-sound", d: "M191-92Q228-56 201-11M211-120Q266-68 228 11" });
    }
    return true;
  }

  if (item.family === "qg2904-canopy-kaleidoscope") {
    group.dataset.renderer = "qg2904-canopy-kaleidoscope";
    group.classList.add("queensland-play-accessory", "canopy-kaleidoscope", companion ? "canopy-kaleidoscope-companion" : "canopy-kaleidoscope-primary");
    if (companion) {
      add(group, "ellipse", { class: "queensland-play-shadow", cx: 4, cy: 105, rx: 91, ry: 14 });
      add(group, "path", { class: "kaleidoscope-body companion", d: "M-112-13L34-58L91-17L78 54L-75 64Z" });
      add(group, "path", { class: "kaleidoscope-side-panel", d: "M-73 64L34-58L91-17L78 54Z" });
      add(group, "path", { class: "kaleidoscope-eye-cup", d: "M-124-25L-89-17L-84 37L-120 47Q-137 10-124-25Z" });
      add(group, "path", { class: "kaleidoscope-collar", d: "M-55-3L-29-12L-15 49L-43 57Z" });
      add(group, "polygon", { class: "kaleidoscope-lens-frame", points: "34,-66 83,-51 105,-14 84,36 39,48 8,9" });
      add(group, "polygon", { class: "kaleidoscope-pane pane-a", points: "34,-55 58,-47 51,-15 18,5" });
      add(group, "polygon", { class: "kaleidoscope-pane pane-b", points: "58,-47 92,-17 66,-2 51,-15" });
      add(group, "polygon", { class: "kaleidoscope-pane pane-c", points: "18,5 51,-15 66,-2 39,35" });
      add(group, "polygon", { class: "kaleidoscope-pane pane-d", points: "66,-2 92,-17 78,27 39,35" });
      add(group, "circle", { class: "kaleidoscope-lens-hub", cx: 53, cy: -4, r: 8 });
      add(group, "path", { class: "kaleidoscope-handle", d: "M-18 48Q7 55 12 80Q17 99-2 109L-26 89Q-8 79-18 65Z" });
      add(group, "path", { class: "kaleidoscope-wrist-loop", d: "M-26 89Q-58 129-85 94" });
    } else {
      add(group, "ellipse", { class: "queensland-play-shadow", cx: 0, cy: 117, rx: 128, ry: 16 });
      add(group, "path", { class: "kaleidoscope-body", d: "M-164 38L72-95L113-31L-126 93Z" });
      add(group, "path", { class: "kaleidoscope-side-panel", d: "M-126 93L72-95L113-31L-73 68Z" });
      add(group, "path", { class: "kaleidoscope-eye-cup", d: "M-177 25L-142 39L-112 84L-146 103Q-183 77-177 25Z" });
      add(group, "path", { class: "kaleidoscope-collar", d: "M-96-1L-60-21L-19 45L-56 65Z" });
      add(group, "path", { class: "kaleidoscope-collar narrow", d: "M13-63L42-80L83-14L53 2Z" });
      add(group, "polygon", { class: "kaleidoscope-lens-frame", points: "65,-111 109,-101 132,-65 125,-23 91,2 49,-7 28,-44 35,-86" });
      add(group, "polygon", { class: "kaleidoscope-pane pane-a", points: "65,-98 91,-91 83,-61 44,-50 43,-80" });
      add(group, "polygon", { class: "kaleidoscope-pane pane-b", points: "91,-91 119,-62 98,-44 83,-61" });
      add(group, "polygon", { class: "kaleidoscope-pane pane-c", points: "44,-50 83,-61 98,-44 83,-10 55,-17" });
      add(group, "polygon", { class: "kaleidoscope-pane pane-d", points: "98,-44 119,-62 113,-30 83,-10" });
      add(group, "circle", { class: "kaleidoscope-lens-hub", cx: 83, cy: -48, r: 10 });
      add(group, "path", { class: "kaleidoscope-handle", d: "M-27 45Q7 52 14 85Q20 111-5 124L-39 99Q-14 84-27 66Z" });
      add(group, "path", { class: "kaleidoscope-grip", d: "M-39 99L-5 124L15 102L-20 76Z" });
      add(group, "path", { class: "kaleidoscope-wrist-loop", d: "M-37 103Q-79 152-112 110" });
      add(group, "path", { class: "kaleidoscope-spark", d: "M145-89L151-71L169-65L151-58L145-40L138-58L120-65L138-71Z" });
    }
    return true;
  }

  const label = (parent, value, x, y, className = "queensland-machine-text", anchor = "middle", transform = null) => {
    const attributes = { class: className, x, y, "text-anchor": anchor };
    if (transform) attributes.transform = transform;
    const text = add(parent, "text", attributes);
    text.textContent = value;
    return text;
  };

  const vial = (parent, x, y, value, transform = null) => {
    const vialGroup = add(parent, "g", { class: "qld-vial-group", transform: transform || `translate(${x} ${y})` });
    add(vialGroup, "rect", { class: "qld-culture-vial", x: -13, y: -23, width: 26, height: 48, rx: 8 });
    add(vialGroup, "rect", { class: "qld-vial-cap", x: -10, y: -31, width: 20, height: 11, rx: 3 });
    label(vialGroup, value, 0, 5, "queensland-machine-text micro", "middle", "rotate(-90 0 5)");
    return vialGroup;
  };

  const sealedPod = (parent, transform, vertical = false) => {
    const pod = add(parent, "g", { class: "qld-sealed-pod", transform });
    if (vertical) {
      add(pod, "path", { class: "qld-pod-body", d: "M0-58Q20-48 23-23Q30 0 22 26Q18 50 0 61Q-18 50-22 26Q-30 0-23-23Q-20-48 0-58Z" });
      add(pod, "path", { class: "qld-pod-seam", d: "M0-51Q-4-27 0-2Q4 24 0 53" });
      add(pod, "path", { class: "qld-pod-contour", d: "M-12-44Q-21-22-16 1Q-20 25-10 44M12-44Q21-22 16 1Q20 25 10 44" });
    } else {
      add(pod, "path", { class: "qld-pod-body", d: "M-104 0Q-91-23-61-25Q-31-31 0-25Q31-31 62-24Q91-20 105 0Q91 22 61 26Q31 32 0 26Q-31 32-62 26Q-92 22-104 0Z" });
      add(pod, "path", { class: "qld-pod-seam", d: "M-97-1Q-65-9-32-5Q0 0 33-5Q66-9 98-1" });
      add(pod, "path", { class: "qld-pod-contour", d: "M-88 12Q-59 21-30 17Q0 12 31 18Q61 22 89 12" });
    }
    return pod;
  };

  const crank = (parent, cx, cy, r = 12) => {
    add(parent, "circle", { class: "qld-crank-wheel", cx, cy, r });
    add(parent, "path", { class: "qld-crank-spokes", d: `M${cx-r+2} ${cy}H${cx+r-2}M${cx} ${cy-r+2}V${cy+r-2}` });
  };

  if (item.family === "qg2904-uncracked-pod-seam-scanner") {
    group.dataset.renderer = "qg2904-uncracked-pod-seam-scanner";
    group.classList.add("queensland-accessory", "pod-seam-scanner", companion ? "pod-seam-scanner-companion" : "pod-seam-scanner-primary");
    if (companion) {
      add(group, "path", { class: "queensland-machine-shadow", d: "M-112 128Q0 159 116 124Q58 174-102 167Z" });
      add(group, "path", { class: "queensland-machine-base", d: "M-85 85H82L101 130H-104Z" });
      add(group, "path", { class: "qld-scanner-tower", d: "M-47 84V-116H49V84M-47-116H49" });
      add(group, "path", { class: "qld-scan-drum", d: "M-38-89Q0-105 38-89V51Q0 67-38 51Z" });
      add(group, "ellipse", { class: "qld-scan-ring outer", cx: 0, cy: -69, rx: 49, ry: 17 });
      add(group, "ellipse", { class: "qld-scan-ring", cx: 0, cy: 31, rx: 45, ry: 16 });
      sealedPod(group, "translate(0 -18)", true);
      add(group, "circle", { class: "qld-chain-sprocket", cx: 69, cy: -84, r: 12 });
      add(group, "circle", { class: "qld-chain-sprocket", cx: 69, cy: 47, r: 12 });
      add(group, "path", { class: "qld-connected-chain", d: "M60-78Q49-50 53-18Q57 12 60 41M78-78Q89-49 85-17Q81 14 78 41" });
      add(group, "path", { class: "qld-lens-carriage", d: "M47-31H87L81 6H43Z" });
      add(group, "circle", { class: "qld-lens-glass", cx: 65, cy: -13, r: 10 });
      add(group, "path", { class: "qld-counterweight-link", d: "M81-84H101V4" });
      add(group, "path", { class: "qld-counterweight", d: "M90 4H112L108 37H94Z" });
      add(group, "path", { class: "qld-trace-strip", d: "M-72-97H-50V48H-72Z" });
      add(group, "path", { class: "qld-trace-line", d: "M-61-83Q-69-56-59-29Q-52-3-62 23Q-68 35-61 43" });
      add(group, "path", { class: "qld-closed-drawer", d: "M-40 60H42L36 91H-46Z" });
      add(group, "circle", { class: "qld-drawer-pull", cx: -2, cy: 72, r: 4 });
      add(group, "path", { class: "qld-vial-dock", d: "M-50 39H-83V82H-68" });
      vial(group, -81, 64, "QG");
      add(group, "path", { class: "qld-record-plate", d: "M50-113H101L94-90H50Z" });
      label(group, "QG2904", 74, -97, "queensland-machine-text tiny");
      label(group, "SEALED", -2, 117, "queensland-machine-text queensland-machine-mobile-key");
      add(group, "path", { class: "queensland-machine-feet", d: "M-74 128L-86 153M71 128L84 153" });
    } else {
      add(group, "path", { class: "queensland-machine-shadow", d: "M-185 113Q0 151 188 109Q94 168-170 160Z" });
      add(group, "path", { class: "queensland-machine-base", d: "M-168 69H157L180 116H-182Z" });
      add(group, "path", { class: "qld-scanner-bridge", d: "M-151 68V-68H142V68M-151-68H142" });
      add(group, "path", { class: "qld-reflection-bracket", d: "M-108-67V-42M82-67V-42" });
      add(group, "path", { class: "qld-reflection-shutter", d: "M-142-41H-74L-80-13H-148Z" });
      add(group, "path", { class: "qld-reflection-shutter deep", d: "M47-41H121L115-13H41Z" });
      add(group, "path", { class: "qld-pod-cradle", d: "M-137 2Q-120-18-99-3V34H-142Z" });
      add(group, "path", { class: "qld-pod-cradle", d: "M93-3Q114-18 133 2L139 34H93Z" });
      sealedPod(group, "translate(-2 12)");
      add(group, "ellipse", { class: "qld-optical-hoop", cx: -3, cy: 11, rx: 27, ry: 62 });
      add(group, "circle", { class: "qld-lens-glass", cx: -3, cy: -44, r: 12 });
      add(group, "path", { class: "qld-lead-screw", d: "M-137 54H143" });
      for (let x = -122; x <= 127; x += 17) add(group, "path", { class: "qld-screw-thread", d: `M${x} 49L${x+8} 59` });
      add(group, "path", { class: "qld-crank-shaft", d: "M143 54H166" });
      crank(group, 177, 54, 13);
      add(group, "path", { class: "qld-vial-dock", d: "M-151 36H-176V78H-161" });
      vial(group, -174, 60, "QG2904");
      add(group, "path", { class: "qld-record-plate", d: "M51 74H142L134 103H43Z" });
      label(group, "179uc", 92, 94, "queensland-machine-text tiny");
      label(group, "SEALED", -2, 107, "queensland-machine-text queensland-machine-mobile-key");
      add(group, "path", { class: "queensland-machine-feet", d: "M-151 113L-164 142M143 113L157 142" });
    }
    return true;
  }

  if (item.family === "qg2904-collection-to-funnel-relay") {
    group.dataset.renderer = "qg2904-collection-to-funnel-relay";
    group.classList.add("queensland-accessory", "recovery-relay", companion ? "recovery-relay-companion" : "recovery-relay-primary");
    if (companion) {
      add(group, "path", { class: "queensland-machine-shadow", d: "M-112 129Q0 159 116 125Q59 174-102 168Z" });
      add(group, "path", { class: "queensland-machine-base", d: "M-86 84H84L103 130H-105Z" });
      add(group, "path", { class: "qld-date-tower", d: "M-50 83V-119H48V83M-50-119H48" });
      add(group, "path", { class: "qld-date-drawer", d: "M-42-106H40L34-73H-48Z" });
      label(group, "10 JUL", -4, -84, "queensland-machine-text tiny");
      add(group, "path", { class: "qld-calendar-cylinder", d: "M-39-64Q0-78 39-64V6Q0 20-39 6Z" });
      for (let index = 0; index < 14; index += 1) {
        const y = -58 + index * 4.7;
        add(group, "path", { class: index % 2 ? "qld-calendar-mark deep" : "qld-calendar-mark", d: `M-34 ${y.toFixed(1)}H34` });
      }
      add(group, "path", { class: "qld-funnel-cassette", d: "M-37 18H37L18 52H-18Z" });
      add(group, "path", { class: "qld-funnel-neck", d: "M-10 51H10V63H-10Z" });
      add(group, "path", { class: "qld-plate-deck", d: "M-48 67H50L43 92H-55Z" });
      add(group, "ellipse", { class: "qld-recovery-plate", cx: -2, cy: 73, rx: 31, ry: 7 });
      add(group, "circle", { class: "qld-chain-sprocket", cx: 70, cy: -94, r: 12 });
      add(group, "circle", { class: "qld-chain-sprocket", cx: 70, cy: 54, r: 12 });
      add(group, "path", { class: "qld-connected-chain", d: "M61-88Q51-55 55-20Q59 14 61 48M79-88Q89-53 85-18Q81 16 79 48" });
      add(group, "path", { class: "qld-counterweight", d: "M88-37H110L107 1H91Z" });
      add(group, "path", { class: "qld-counterweight-link", d: "M79-94H99V-37" });
      add(group, "path", { class: "qld-founder-lift", d: "M-51-52H-82V61H-67" });
      add(group, "path", { class: "qld-vial-platform", d: "M-91 58H-59V71H-91Z" });
      vial(group, -75, 38, "1 ADULT");
      add(group, "path", { class: "qld-record-plate", d: "M50 76H105L98 102H48Z" });
      label(group, "179uc", 76, 94, "queensland-machine-text tiny");
      label(group, "10→24", -2, 119, "queensland-machine-text queensland-machine-mobile-key");
      add(group, "path", { class: "queensland-machine-feet", d: "M-75 128L-87 154M73 128L86 154" });
    } else {
      add(group, "path", { class: "queensland-machine-shadow", d: "M-187 113Q0 151 190 109Q95 168-171 160Z" });
      add(group, "path", { class: "queensland-machine-base", d: "M-170 69H160L183 116H-184Z" });
      add(group, "path", { class: "qld-relay-bench", d: "M-155 68V-47H148V68M-155-47H148" });
      add(group, "path", { class: "qld-date-drawer", d: "M-145-35H-74L-79 19H-151Z" });
      add(group, "circle", { class: "qld-drawer-pull", cx: -111, cy: -21, r: 4 });
      label(group, "10 JUL", -112, 2, "queensland-machine-text tiny");
      add(group, "path", { class: "qld-covered-channel", d: "M-73-21H55V17H-73Z" });
      add(group, "path", { class: "qld-channel-cap", d: "M-73-25H-61V21H-73ZM43-25H55V21H43Z" });
      add(group, "circle", { class: "qld-date-wheel", cx: -8, cy: -2, r: 42 });
      add(group, "circle", { class: "qld-date-hub", cx: -8, cy: -2, r: 9 });
      for (let index = 0; index < 14; index += 1) {
        const angle = (index / 14) * Math.PI * 2;
        const x1 = -8 + Math.cos(angle) * 33;
        const y1 = -2 + Math.sin(angle) * 33;
        const x2 = -8 + Math.cos(angle) * 40;
        const y2 = -2 + Math.sin(angle) * 40;
        add(group, "path", { class: "qld-date-notch", d: `M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}` });
      }
      add(group, "path", { class: "qld-funnel-station", d: "M76-39H139L121 3H94Z" });
      add(group, "path", { class: "qld-funnel-neck", d: "M103 2H116V18H103Z" });
      add(group, "path", { class: "qld-plate-carriage", d: "M69 29H148L141 56H63Z" });
      add(group, "ellipse", { class: "qld-recovery-plate", cx: 106, cy: 34, rx: 28, ry: 7 });
      add(group, "path", { class: "qld-drive-shaft", d: "M34 18V49H63" });
      add(group, "circle", { class: "qld-drive-gear", cx: 34, cy: 49, r: 12 });
      add(group, "path", { class: "qld-drive-teeth", d: "M22 49H46M34 37V61M26 41L42 57M42 41L26 57" });
      add(group, "path", { class: "qld-vial-dock", d: "M-74 31H-46V70H-60" });
      vial(group, -58, 53, "1 ADULT");
      add(group, "path", { class: "qld-record-plate", d: "M-155 75H-62L-69 103H-163Z" });
      label(group, "QG2904", -111, 94, "queensland-machine-text tiny");
      label(group, "24 JUL", 110, 87, "queensland-machine-text tiny");
      label(group, "10→24", 4, 108, "queensland-machine-text queensland-machine-mobile-key");
      add(group, "path", { class: "queensland-machine-feet", d: "M-152 113L-165 142M145 113L158 142" });
    }
    return true;
  }

  if (item.family === "dro-canopy-crane-strata-mapper") {
    group.dataset.renderer = "dro-canopy-crane-strata-mapper";
    group.classList.add("queensland-accessory", "canopy-crane-mapper", companion ? "canopy-crane-mapper-companion" : "canopy-crane-mapper-primary");
    if (companion) {
      add(group, "path", { class: "queensland-machine-shadow", d: "M-112 129Q0 160 116 125Q58 175-102 168Z" });
      add(group, "path", { class: "queensland-machine-base", d: "M-86 85H83L103 131H-105Z" });
      add(group, "path", { class: "qld-crane-mast", d: "M-27 83V-117H29V83M-27-117H29" });
      for (let y = -102; y <= 58; y += 32) {
        add(group, "path", { class: "qld-crane-lattice", d: `M-27 ${y}L29 ${y+32}M29 ${y}L-27 ${y+32}M-27 ${y+32}H29` });
      }
      add(group, "path", { class: "qld-counter-jib", d: "M-28-108H-82L-92-95H-28M29-108H86L99-95H29" });
      add(group, "circle", { class: "qld-lift-pulley", cx: 55, cy: -104, r: 11 });
      add(group, "circle", { class: "qld-lift-pulley", cx: 67, cy: 66, r: 12 });
      add(group, "path", { class: "qld-lift-cable", d: "M55-93V-19" });
      add(group, "path", { class: "qld-lift-cable", d: "M66-104Q76-63 73-20Q70 23 70 54" });
      add(group, "path", { class: "qld-gondola", d: "M36-19H74L69 16H41Z" });
      add(group, "path", { class: "qld-gondola-rail", d: "M42-9H68M46-17V8M64-17V8" });
      const gates = [[-55,-77,"CAN"],[-55,-19,"UND"],[-55,39,"FLR"]];
      gates.forEach(([x,y,value], index) => {
        add(group, "path", { class: index % 2 ? "qld-strata-gate deep" : "qld-strata-gate", d: `M${x} ${y}H-28V${y+26}H${x}Z` });
        label(group, value, x + 13, y + 18, "queensland-machine-text micro");
      });
      add(group, "path", { class: "qld-map-drawer", d: "M-48 86H49L43 116H-55Z" });
      add(group, "circle", { class: "qld-drawer-pull", cx: -3, cy: 97, r: 4 });
      label(group, "1 ha", -3, 112, "queensland-machine-text tiny");
      label(group, "47 m", 0, 119, "queensland-machine-text queensland-machine-mobile-key");
      add(group, "path", { class: "queensland-machine-feet", d: "M-75 129L-87 154M72 129L85 154" });
    } else {
      add(group, "path", { class: "queensland-machine-shadow", d: "M-184 113Q0 152 187 109Q94 168-169 160Z" });
      add(group, "path", { class: "queensland-machine-base", d: "M-166 69H157L180 116H-181Z" });
      add(group, "ellipse", { class: "qld-map-table", cx: -8, cy: -3, rx: 124, ry: 92 });
      add(group, "ellipse", { class: "qld-radius-ring", cx: -8, cy: -3, rx: 102, ry: 74 });
      add(group, "path", { class: "qld-canopy-mosaic", d: "M-88-17Q-72-55-38-47Q-11-68 13-43Q49-58 78-29Q63-2 85 22Q60 54 24 43Q-4 64-31 42Q-70 53-88 21Q-71 2-88-17Z" });
      [
        [-68,-20,18,13,-10,""],[-38,-37,16,11,13,"deep"],[-4,-43,17,13,-7,""],[32,-31,20,14,9,"deep"],
        [62,-12,17,12,-13,""],[-54,17,19,14,8,"deep"],[-18,22,20,13,-4,""],[23,14,18,14,12,"deep"],[55,29,16,11,-8,""]
      ].forEach(([cx,cy,rx,ry,angle,tone]) => add(group, "ellipse", { class: `qld-canopy-token ${tone}`.trim(), cx, cy, rx, ry, transform: `rotate(${angle} ${cx} ${cy})` }));
      add(group, "circle", { class: "qld-map-hub", cx: -8, cy: -3, r: 10 });
      add(group, "path", { class: "qld-radial-jib", d: "M-8-3L82-49" });
      add(group, "path", { class: "qld-access-box", d: "M73-59H96V-40H73Z" });
      label(group, "55 m R", -8, 81, "queensland-machine-text tiny");
      [[-76,1],[-27,-19],[17,34],[49,-4],[5,-58]].forEach(([cx,cy], index) => {
        add(group, "circle", { class: index % 2 ? "qld-tree-position deep" : "qld-tree-position", cx, cy, r: index % 2 ? 5 : 6 });
      });
      add(group, "path", { class: "qld-gear-shaft", d: "M101 39H133V58H145" });
      add(group, "circle", { class: "qld-rotation-gear", cx: 105, cy: 39, r: 17 });
      add(group, "path", { class: "qld-drive-teeth", d: "M88 39H122M105 22V56M93 27L117 51M117 27L93 51" });
      crank(group, 155, 58, 13);
      add(group, "path", { class: "qld-record-plate", d: "M-157 76H-83L-89 103H-164Z" });
      label(group, "DRO", -123, 95, "queensland-machine-text tiny");
      label(group, "55 m", -5, 108, "queensland-machine-text queensland-machine-mobile-key");
      add(group, "path", { class: "queensland-machine-feet", d: "M-150 113L-163 142M143 113L157 142" });
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
  if (/telescope|periscope/i.test(label)) {
    if(/periscope/i.test(label)) line(group,companion?"M-16 48V-42H35V-18H5":"M-22 64V-56H47V-24H7","acc-line thick");
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
  if (/snowshoes|crampons/i.test(label)) {
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
    case "skirt":
      if(/crater/i.test(label)) {
        add(group,"ellipse",{class:"acc-soft",cx:0,cy:5,rx:companion?47:61,ry:companion?28:36}); add(group,"ellipse",{class:"acc-main",cx:0,cy:5,rx:companion?29:39,ry:companion?16:21}); line(group,"M0-35V35");
      } else {
        const count=companion?3:5; for(let i=0;i<count;i+=1){add(group,"ellipse",{class:i%2?"acc-accent":"acc-main",cx:0,cy:-22+i*(companion?22:19),rx:(companion?25:31)+i*(companion?9:11),ry:10});} line(group,companion?"M0-43V51":"M0-57V65");
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
    case "telescope":
      path(group,companion?"M-43 4L18-19L27-2L-34 21Z":"M-57 5L24-25L36-3L-45 28Z"); line(group,companion?"M-5 10L28 38L58 22 M28 38L9 68 M28 38L49 67":"M-7 13L38 51L78 29 M38 51L12 91 M38 51L66 89","acc-line thick");
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
      group.classList.add("ishigaki-accessory", "ishigaki-fascinator", companion ? "ishigaki-fascinator-companion" : "ishigaki-fascinator-primary");
      const brow = companion ? "M-48-13Q0-42 49-14L44-3Q0-25-43-3Z" : "M-70-18Q0-61 70-17L61-1Q0-40-60-1Z";
      const shield = companion ? "M-45-4Q0-28 46-4L39 25Q0 43-40 24Z" : "M-62-2Q0-41 63-2L53 35Q0 61-55 34Z";
      path(group, brow, "uv-visor-brow");
      path(group, shield, "uv-visor-shield");
      path(group, companion ? "M-40 23Q0 40 40 24" : "M-55 33Q0 56 55 34", "uv-visor-edge");
      path(group, companion ? "M-40 15Q0 31 40 16" : "M-53 22Q0 45 53 23", "uv-visor-lower-rim");
      path(group, companion ? "M-45-4Q-50-1-52 4M46-3Q50 0 52 5" : "M-62-1Q-69 2-72 7M63-1Q69 3 72 8", "uv-visor-temple");
      add(group, "circle", { class: "uv-visor-hinge", cx: companion ? -44 : -61, cy: companion ? -3 : -1, r: companion ? 3.5 : 5 });
      add(group, "circle", { class: "uv-visor-hinge", cx: companion ? 45 : 62, cy: companion ? -2 : 0, r: companion ? 3.5 : 5 });
      path(group, companion ? "M-30-4Q-8-16 16-10" : "M-46-5Q-15-29 20-17M-39 3Q-18-8 2-6", "uv-visor-glare");
      const med = add(group, "g", { class: "uv-fig-medallion", transform: companion ? "translate(-36 -17) rotate(-12)" : "translate(-51 -26) rotate(-12)" });
      add(med, "circle", { class: "uv-fig-rind", cx: 0, cy: 0, r: companion ? 12 : 17 });
      add(med, "circle", { class: "uv-fig-flesh", cx: 0, cy: 0, r: companion ? 8 : 12 });
      (companion ? [[-3,-2],[3,-3],[-3,3],[3,3]] : [[-4,-4],[3,-5],[6,0],[-5,3],[2,5]]).forEach(([cx,cy]) => add(med, "circle", { class: "uv-fig-seed", cx, cy, r: companion ? 1.15 : 1.5 }));
      path(med, companion ? "M7-8Q18-18 23-8Q15 1 7-2Z" : "M9-12Q24-27 31-11Q21 3 9-2Z", "uv-fig-leaf");
      return true;
    }
    case "sample-pannier": {
      group.classList.add("ishigaki-accessory", "ishigaki-pannier", companion ? "ishigaki-pannier-male" : "ishigaki-pannier-female");
      const defs = add(group, "defs");
      const prefix = companion ? "ishigaki-cups" : "ishigaki-basket";
      const bodyPaint = add(defs, "linearGradient", { id: prefix + "-body", x1: "0%", y1: "15%", x2: "100%", y2: "55%" });
      [[0,"#254f49"],[.24,"#609989"],[.48,"#417c6b"],[.79,"#285b52"],[1,"#163e3b"]].forEach(([offset, color]) => add(bodyPaint, "stop", { offset, "stop-color": color }));
      const fruitPaint = add(defs, "radialGradient", { id: prefix + "-fruit", cx: "32%", cy: "26%", r: "76%" });
      [[0,"#c2d390"],[.42,"#94b571"],[1,"#4e784a"]].forEach(([offset, color]) => add(fruitPaint, "stop", { offset, "stop-color": color }));
      const fruit = (parent, x, y, r, cut = false) => {
        const fig = add(parent, "g", { transform: `translate(${x} ${y})` });
        add(fig, "circle", { r, fill: `url(#${prefix}-fruit)`, class: "pannier-fruit-volume" });
        if (cut) {
          add(fig, "ellipse", { cx: 1, cy: -1, rx: r * .79, ry: r * .84, class: "pannier-cut-flesh" });
          add(fig, "ellipse", { cx: 1, cy: -1, rx: r * .28, ry: r * .37, class: "pannier-fruit-cavity" });
          [0,55,110,165,220,280].forEach(a => {
            const rad = a * Math.PI / 180;
            add(fig, "ellipse", { cx: 1 + Math.cos(rad) * r * .55, cy: -1 + Math.sin(rad) * r * .58, rx: r * .09, ry: r * .14, class: "pannier-floret" });
          });
        } else {
          path(fig, `M${-r*.64} ${-r*.22}Q${-r*.65} ${-r*.7} ${-r*.2} ${-r*.72}`, "pannier-fruit-highlight");
          add(fig, "ellipse", { cx: r * .24, cy: r * .17, rx: r * .14, ry: r * .1, class: "pannier-ostiole" });
        }
      };
      const wovenBody = (d, id, cx, halfWidth, top, bottom, rows, stakes) => {
        const clip = add(defs, "clipPath", { id });
        path(clip, d);
        path(group, d, "pannier-basket").style.fill = `url(#${prefix}-body)`;
        const weave = add(group, "g", { "clip-path": `url(#${id})`, class: "pannier-weave-field" });
        // Upright stakes bend inward with the tapered basket wall.
        for (let i = 0; i < stakes; i++) {
          const t = -1 + 2 * i / (stakes - 1);
          const x = cx + t * halfWidth;
          path(weave, `M${x} ${top-5}Q${cx+t*halfWidth*.88} ${(top+bottom)/2} ${cx+t*halfWidth*.62} ${bottom+5}`, "pannier-stake");
        }
        for (let i = 0; i < rows; i++) {
          const y = top + 7 + i * (bottom-top-12) / (rows-1);
          const curve = `M${cx-halfWidth-4} ${y}Q${cx} ${y+halfWidth*.28} ${cx+halfWidth+4} ${y}`;
          path(weave, curve, "pannier-strand-shadow");
          path(weave, curve, i % 2 ? "pannier-strand warm" : "pannier-strand");
          // Short alternating overpasses make a woven wall, not an open net.
          for (let j = i % 2; j < stakes-1; j += 2) {
            const t = -1 + 2 * (j+.5)/(stakes-1);
            const x = cx + t * halfWidth * (1-.26*i/rows);
            const yy = y + halfWidth*.14*(1-t*t);
            path(weave, `M${x-2.3} ${yy}L${x+2.3} ${yy}`, "pannier-overpass");
          }
        }
        path(weave, `M${cx+halfWidth*.72} ${top}Q${cx+halfWidth*.85} ${bottom*.5} ${cx+halfWidth*.5} ${bottom+5}L${cx+halfWidth+8} ${bottom+5}V${top}Z`, "pannier-side-shade");
      };
      const rim = (cx, cy, rx, ry, front) => {
        const d = front
          ? `M${cx-rx} ${cy}C${cx-rx} ${cy+ry*1.34} ${cx+rx} ${cy+ry*1.34} ${cx+rx} ${cy}`
          : `M${cx-rx} ${cy}C${cx-rx} ${cy-ry*1.34} ${cx+rx} ${cy-ry*1.34} ${cx+rx} ${cy}`;
        path(group, d, "pannier-rim-shadow");
        path(group, d, front ? "pannier-bound-rim front" : "pannier-bound-rim back");
        if (front) path(group, d, "pannier-rim-lashing");
      };
      if (companion) {
        path(group, "M-64-29Q0-73 64-26", "pannier-yoke");
        path(group, "M-62-30Q0-67 62-27", "pannier-handle-light");
        path(group, "M-20-34Q0-47 20-32L16-23Q0-33-16-24Z", "pannier-yoke-pad");
        const leftBody = "M-68-22C-67 5-61 33-54 43Q-41 53-28 44C-21 27-18 2-18-22Z";
        const rightBody = "M16-19C17 7 21 34 28 44Q40 54 53 45C60 27 66 3 67-18Z";
        wovenBody(leftBody, prefix+"-left", -43, 25, -22, 46, 7, 6);
        wovenBody(rightBody, prefix+"-right", 41, 26, -19, 47, 6, 7);
        add(group, "ellipse", { class: "pannier-interior", cx: -43, cy: -22, rx: 25, ry: 9 });
        add(group, "ellipse", { class: "pannier-interior", cx: 41, cy: -19, rx: 26, ry: 9 });
        rim(-43,-22,26,9,false); rim(41,-19,27,9,false);
        fruit(group,-47,-29,12);
        path(group, "M-43-39Q-31-48-25-35Q-34-28-42-31Z", "pannier-fig-leaf");
        fruit(group,42,-27,13,true);
        rim(-43,-22,26,9,true); rim(41,-19,27,9,true);
        path(group, "M-55 42Q-41 51-28 43M28 44Q40 52 53 44", "pannier-base-band");
        path(group, "M-2-43Q-8-36-7-29", "pannier-tag-cord");
        path(group, "M-8-43L19-40L16-22L-11-26Z", "pannier-tag");
        line(group, "M-2-37L13-34M-3-31L11-29", "pannier-tag-line");
      } else {
        path(group, "M-57-27C-53-98 52-98 59-26", "pannier-handle");
        path(group, "M-55-28C-50-91 48-91 56-28", "pannier-handle-light");
        path(group, "M-57-27C-53-98 52-98 59-26", "pannier-handle-binding");
        // The raised lid has a visible lower edge and its weave stays inside it.
        const lid = add(group, "g", { transform: "rotate(-8 -3 -50)" });
        add(lid, "ellipse", { class: "pannier-lid-edge", cx: -3, cy: -46, rx: 61, ry: 17 });
        add(lid, "ellipse", { class: "pannier-lid", cx: -3, cy: -50, rx: 61, ry: 17 });
        const lidClip = add(defs, "clipPath", { id: prefix+"-lid" });
        add(lidClip, "ellipse", { cx: -3, cy: -50, rx: 58, ry: 14 });
        const lidWeave = add(lid, "g", { "clip-path": `url(#${prefix}-lid)` });
        [-59,-52,-45].forEach(y => path(lidWeave, `M-66 ${y}Q-3 ${y+7} 60 ${y}`, "pannier-lid-weave"));
        [-47,-29,-11,7,25,43].forEach(x => path(lidWeave, `M${x}-69L${x+6}-31`, "pannier-lid-rib"));
        const body = "M-68-28C-65 8-55 43-42 56Q0 72 42 56C55 43 65 8 69-28Z";
        wovenBody(body,prefix+"-main",0,68,-28,62,10,11);
        add(group, "ellipse", { class: "pannier-interior", cx: 0, cy: -28, rx: 66, ry: 16 });
        rim(0,-28,68,17,false);
        path(group, "M-50-29L-47-43M50-27L48-42", "pannier-lid-hinge");
        fruit(group,5,-43,18);
        fruit(group,-31,-39,16);
        path(group, "M-25-54Q-9-67 0-50Q-13-39-24-44Z", "pannier-fig-leaf");
        fruit(group,39,-35,18,true);
        rim(0,-28,68,17,true);
        [-64,64].forEach(cx => {
          add(group, "ellipse", { cx, cy: -23, rx: 3.7, ry: 4.5, class: "pannier-handle-socket" });
          add(group, "circle", { cx: cx-1, cy: -24, r: 1.2, class: "pannier-latch-stud" });
        });
        path(group, "M-43 53Q0 68 43 53", "pannier-base-band");
        path(group, "M-9-12Q0-6 10-12L8 1Q0 5-8 1Z", "pannier-lid-latch");
        add(group, "circle", { cx: 0, cy: -2, r: 2, class: "pannier-latch-stud" });
        path(group, "M46 1Q55 5 58 11", "pannier-tag-cord");
        path(group, "M45 6L78 11L74 39L41 33Z", "pannier-tag-shadow");
        path(group, "M43 3L76 8L72 36L39 30Z", "pannier-tag");
        line(group, "M49 11L69 15M48 18L67 22M47 25L61 28", "pannier-tag-line");
      }
      return true;
    }
    case "wings": {
      group.classList.add("ishigaki-accessory", "ishigaki-wings", companion ? "ishigaki-wings-male" : "ishigaki-wings-female");
      const maskId = companion ? "ishigaki-wing-body-mask-companion" : "ishigaki-wing-body-mask-primary";
      const defs = add(group, "defs");
      const bodyMask = add(defs, "mask", { id: maskId, x: -150, y: -120, width: 300, height: 260, maskUnits: "userSpaceOnUse" });
      add(bodyMask, "rect", { x: -150, y: -120, width: 300, height: 260, fill: "white" });
      path(bodyMask, companion ? "M-24-35Q0-47 24-34L22 45Q0 58-22 44Z" : "M-31-41Q0-57 31-40L28 53Q0 69-28 52Z").setAttribute("fill", "black");
      const farClipId = companion ? "ishigaki-wing-far-clip-companion" : "ishigaki-wing-far-clip-primary";
      const nearClipId = companion ? "ishigaki-wing-near-clip-companion" : "ishigaki-wing-near-clip-primary";
      const farClip = add(defs, "clipPath", { id: farClipId });
      const nearClip = add(defs, "clipPath", { id: nearClipId });
      if (companion) {
        const farFore = "M-8 2C-26-30-53-43-70-25C-69-2-45 17-10 19C-17 11-17 6-8 2Z";
        const farHind = "M-10 15C-33 13-51 28-49 46C-31 53-13 40-4 25Z";
        const nearFore = "M8 3C29-36 62-47 80-22C80 5 53 27 12 25C18 16 17 8 8 3Z";
        const nearHind = "M10 17C37 14 58 31 56 52C37 61 15 45 4 27Z";
        path(farClip, farFore);
        path(farClip, farHind);
        path(nearClip, nearFore);
        path(nearClip, nearHind);
        const farSide = add(group, "g", { class: "fig-wing-far-side", mask: `url(#${maskId})` });
        path(farSide, farFore, "fig-wasp-wing-panel far male");
        path(farSide, farHind, "fig-wasp-hindwing far male");
        const farVeins = add(farSide, "g", { class: "fig-wing-venation far", "clip-path": `url(#${farClipId})` });
        path(farVeins, "M-10 16C-29 9-49-5-66-23M-11 17C-30 20-43 14-56 3M-13 20C-27 28-38 37-46 44M-34 11Q-37 20-33 28", "fig-wing-vein");
        const nearSide = add(group, "g", { class: "fig-wing-near-side" });
        path(nearSide, nearFore, "fig-wasp-wing-panel near male");
        path(nearSide, nearHind, "fig-wasp-hindwing near male");
        const nearVeins = add(nearSide, "g", { class: "fig-wing-venation near", "clip-path": `url(#${nearClipId})` });
        path(nearVeins, "M11 20C31 12 53-1 75-19M12 21C33 23 52 18 68 8M14 24C30 32 43 41 53 50M29 14Q34 23 32 31M48 3Q52 13 49 21", "fig-wing-vein");
        path(nearVeins, "M12 18C31 2 54-14 77-21", "fig-wing-costa");
        add(group, "ellipse", { class: "fig-wing-root", cx: -17, cy: 3, rx: 11, ry: 14, transform: "rotate(-28 -17 3)" });
        add(group, "ellipse", { class: "fig-wing-root", cx: 18, cy: 4, rx: 11, ry: 14, transform: "rotate(28 18 4)" });
        add(group, "ellipse", { class: "fig-wing-thorax", cx: 0, cy: 5, rx: 22, ry: 13, transform: "rotate(-8 0 5)" });
        path(group, "M-10-1Q0-7 10-1", "fig-wing-thorax-highlight");
        path(group, "M-18 1Q0 10 18 1M-15 9Q0 17 15 9", "fig-wing-thorax-band");
        add(group, "circle", { class: "fig-wing-joint", cx: -17, cy: 3, r: 4 });
        add(group, "circle", { class: "fig-wing-joint", cx: 18, cy: 4, r: 4 });
        add(group, "circle", { class: "fig-wing-buckle", cx: 0, cy: 16, r: 4 });
        path(group, "M22-4Q50-19 72-17M27 9Q50-1 66 2", "fig-wing-sheen");
      } else {
        const farFore = "M-12 1C-36-38-73-55-94-32C-91-4-62 22-15 24C-23 14-23 7-12 1Z";
        const farHind = "M-13 18C-43 16-68 35-66 59C-43 69-18 52-6 31Z";
        const nearFore = "M11 3C39-44 87-59 111-27C112 8 77 37 17 32C25 20 24 10 11 3Z";
        const nearHind = "M13 22C50 17 80 39 77 67C51 79 21 59 6 35Z";
        path(farClip, farFore);
        path(farClip, farHind);
        path(nearClip, nearFore);
        path(nearClip, nearHind);
        const farSide = add(group, "g", { class: "fig-wing-far-side", mask: `url(#${maskId})` });
        path(farSide, farFore, "fig-wasp-wing-panel far female");
        path(farSide, farHind, "fig-wasp-hindwing far female");
        const farVeins = add(farSide, "g", { class: "fig-wing-venation far", "clip-path": `url(#${farClipId})` });
        path(farVeins, "M-15 19C-42 9-68-10-89-30M-16 21C-44 23-64 15-78 1M-18 24C-39 34-54 47-62 57M-46 11Q-50 23-45 34M-69-8Q-66 5-57 15", "fig-wing-vein");
        const nearSide = add(group, "g", { class: "fig-wing-near-side" });
        path(nearSide, nearFore, "fig-wasp-wing-panel near female");
        path(nearSide, nearHind, "fig-wasp-hindwing near female");
        const nearVeins = add(nearSide, "g", { class: "fig-wing-venation near", "clip-path": `url(#${nearClipId})` });
        path(nearVeins, "M16 25C44 14 75-5 104-24M17 27C47 30 72 24 94 9M19 31C42 42 60 54 73 65M39 17Q45 28 42 38M67 1Q71 14 66 25", "fig-wing-vein");
        path(nearVeins, "M15 22C43 1 74-18 106-27", "fig-wing-costa");
        add(group, "ellipse", { class: "fig-wing-root", cx: -24, cy: 4, rx: 14, ry: 18, transform: "rotate(-30 -24 4)" });
        add(group, "ellipse", { class: "fig-wing-root", cx: 25, cy: 5, rx: 14, ry: 18, transform: "rotate(30 25 5)" });
        add(group, "ellipse", { class: "fig-wing-thorax", cx: 0, cy: 8, rx: 31, ry: 17, transform: "rotate(-8 0 8)" });
        path(group, "M-15 0Q0-9 15 0", "fig-wing-thorax-highlight");
        path(group, "M-26 2Q0 15 26 2M-22 12Q0 25 22 12", "fig-wing-thorax-band");
        add(group, "circle", { class: "fig-wing-joint", cx: -23, cy: 5, r: 5 });
        add(group, "circle", { class: "fig-wing-joint", cx: 24, cy: 6, r: 5 });
        add(group, "circle", { class: "fig-wing-buckle", cx: 0, cy: 20, r: 5 });
        path(group, "M31-8Q69-29 100-24M38 8Q69-6 91-1M26 39Q53 51 70 61", "fig-wing-sheen");
      }
      return true;
    }
      path(group, companion ? "M-54-10Q-8-39 48-16L57 1Q5-8-48 13Z" : "M-72-13Q-10-53 64-21L76 1Q7-10-64 18Z", "acc-main");
      [0, 1, 2].slice(0, companion ? 2 : 3).forEach(index => line(group, companion ? `M${-42 + index * 34} ${-10 - index * 4}L${-33 + index * 37} ${7 - index * 3}` : `M${-56 + index * 44} ${-14 - index * 5}L${-44 + index * 48} ${9 - index * 4}`));
      line(group, companion ? "M-46-8L-61-28 M47-14L58-31" : "M-61-11L-81-38 M62-19L78-42", "acc-accent-line");
      return true;
    case "canoe-paddle-bow":
      [-1, 1].forEach(side => {
        line(group, companion ? `M${side * 58}-48L${side * 3} 42` : `M${side * 77}-64L${side * 4} 56`, "acc-line thick");
        path(group, companion ? `M${side * 58}-48Q${side * 82}-58 ${side * 78}-30L${side * 49}-21Z` : `M${side * 77}-64Q${side * 109}-78 ${side * 104}-40L${side * 65}-28Z`, side < 0 ? "acc-main" : "acc-accent");
      });
      path(group, companion ? "M-4 35Q0 57 4 35L12 65L0 79L-12 65Z" : "M-5 47Q0 76 5 47L16 87L0 105L-16 87Z", "acc-soft");
      return true;
    default:
      return false;
  }
}

function drawReunionJU1373Accessory(group, item, companion) {
  if (!reunionJU1373RendererIds.has(item.id)) return false;
  const addText = (value, x, y) => { const t = add(group, "text", { class: "acc-label", x, y, "text-anchor": "middle" }); t.textContent = value; };
  group.dataset.renderer = item.family;
  group.classList.add("reunion-ju1373-accessory", companion ? "ju1373-companion" : "ju1373-primary");
  if (item.family === "ju1373-torch-ginger-bract-collar") {
    const bracts = companion ? 3 : 5;
    for (let i = 0; i < bracts; i += 1) {
      const x = (i - (bracts - 1) / 2) * (companion ? 19 : 25);
      add(group, "path", { class: i % 2 ? "acc-accent" : "acc-main", d: `M${x} 8Q${x - 13} ${-28 - i * 2} ${x - 3} ${-54 - i * 3}Q${x + 15} ${-30 - i * 2} ${x + 3} 8Z` });
    }
    add(group, "path", { class: "acc-line", d: companion ? "M-37 10Q0 29 38 10" : "M-64 13Q0 39 64 13" });
    [-1, 1].forEach(side => add(group, "path", { class: "acc-line", d: companion ? `M${side * 27} 8L${side * 42} -34` : `M${side * 45} 12L${side * 67} -43` }));
    add(group, "circle", { class: "acc-accent", cx: companion ? 28 : 49, cy: 4, r: companion ? 6 : 8 });
    addText(companion ? "R4D1" : "JU1373", companion ? 0 : 0, companion ? 25 : 32);
    return true;
  }
  if (item.family === "ju1373-type-isolate-signet-engine") {
    if (companion) {
      add(group, "path", { class: "acc-main", d: "M-48 65V-68H45V65M-48-68H45" });
      add(group, "ellipse", { class: "acc-accent", cx: 0, cy: -15, rx: 31, ry: 22 });
      add(group, "path", { class: "acc-line thick", d: "M-25 7L25 51M25 7L-25 51" });
      add(group, "path", { class: "acc-line", d: "M-45-15H-64M45-15H64M-64-15V28M64-15V28" });
      add(group, "circle", { class: "acc-main", cx: 62, cy: 52, r: 12 });
      addText("JU1373", 0, 0);
    } else {
      add(group, "path", { class: "acc-main", d: "M-76 54H74L88 82H-89Z" });
      add(group, "ellipse", { class: "acc-accent", cx: 0, cy: -4, rx: 43, ry: 27 });
      add(group, "path", { class: "acc-line thick", d: "M-43-4H43M0-31V24M43-4L79-48" });
      add(group, "path", { class: "acc-line", d: "M-78-48H-43M79-48V-25" });
      add(group, "path", { class: "acc-soft", d: "M-72-50H-32V-29H-72Z" });
      addText("JU1373 · TYPE ISOLATE", 0, -1);
    }
    return true;
  }
  if (companion) {
    add(group, "path", { class: "acc-main", d: "M0 76V-67M0-35L53-10M0 7L-43 32" });
    add(group, "path", { class: "acc-accent", d: "M53-10Q75-35 95-17Q76 3 53-10Z" });
    add(group, "path", { class: "acc-soft", d: "M-43 32Q-74 48-91 24Q-69 10-43 32Z" });
    add(group, "path", { class: "acc-line", d: "M0-67L-20-91M0-67L22-91" });
    addText("SAINT-BENOÎT · REGIONAL", 0, 95);
  } else {
    add(group, "path", { class: "acc-main", d: "M-67 52Q-37 4-8 12Q22 20 67-31" });
    add(group, "path", { class: "acc-accent", d: "M-52 4Q-24-35 8-18Q26-3 57-41" });
    add(group, "path", { class: "acc-soft", d: "M-35-62Q0-87 37-62Q7-40-35-62Z" });
    add(group, "path", { class: "acc-line", d: "M-67 52L-82 73M67-31L82-50" });
    addText("REGIONAL", 0, 79);
  }
  return true;
}

function drawAhmedabadAF16Accessory(group, item, companion) {
  if (!ahmedabadAF16RendererIds.has(item.id)) return false;
  group.dataset.renderer = item.family;
  group.classList.add("ahmedabad-af16-accessory", companion ? "af16-companion" : "af16-primary");

  if (item.family === "lattice-fan") {
    const defs = add(group, "defs");
    const clipId = companion ? "af16-lattice-fan-clip-companion" : "af16-lattice-fan-clip-primary";
    const fanClip = add(defs, "clipPath", { id: clipId });
    if (companion) {
      const fanShape = "M0 43L-64-1Q-56-34-33-50Q-17-60 0-63Q18-59 35-48Q58-31 65-1Z";
      path(fanClip, fanShape);
      path(group, fanShape, "af16-fan-panel companion");
      const fanWedges = add(group, "g", { class: "af16-fan-wedges", "clip-path": `url(#${clipId})` });
      path(fanWedges, "M0 43L-64-1Q-56-34-33-50Z", "af16-fan-wedge indigo");
      path(fanWedges, "M0 43L-33-50Q-17-60 0-63Z", "af16-fan-wedge turquoise");
      path(fanWedges, "M0 43L0-63Q18-59 35-48Z", "af16-fan-wedge ivory");
      path(fanWedges, "M0 43L35-48Q58-31 65-1Z", "af16-fan-wedge coral");
      const lattice = add(group, "g", { class: "af16-fan-lattice", "clip-path": `url(#${clipId})` });
      [-82,-60,-38,-16,6,28,50,72].forEach(x => line(lattice, `M${x}-66L${x + 72} 45`, "af16-lattice-line"));
      [-68,-46,-24,-2,20,42,64,86].forEach(x => line(lattice, `M${x} 45L${x + 72}-66`, "af16-lattice-line alt"));
      path(group, "M-64-1Q-56-34-33-50Q-17-60 0-63Q18-59 35-48Q58-31 65-1", "af16-fan-rim");
      [-55,-28,0,28,55].forEach(x => line(group, `M0 43L${x} ${-51 + Math.abs(x) * .72}`, "af16-fan-rib"));
      path(group, "M-7 40L-10 76L11 76L7 40Z", "af16-fan-handle");
      add(group, "circle", { class: "af16-fan-pivot", cx: 0, cy: 43, r: 7.5 });
    } else {
      const fanShape = "M0 48L-82-4Q-71-43-43-62Q-21-76 0-80Q22-76 44-62Q72-43 83-4Z";
      path(fanClip, fanShape);
      path(group, fanShape, "af16-fan-panel primary");
      const fanWedges = add(group, "g", { class: "af16-fan-wedges", "clip-path": `url(#${clipId})` });
      path(fanWedges, "M0 48L-82-4Q-71-43-43-62Z", "af16-fan-wedge coral");
      path(fanWedges, "M0 48L-43-62Q-21-76 0-80Z", "af16-fan-wedge turquoise");
      path(fanWedges, "M0 48L0-80Q22-76 44-62Z", "af16-fan-wedge ivory");
      path(fanWedges, "M0 48L44-62Q72-43 83-4Z", "af16-fan-wedge indigo");
      const lattice = add(group, "g", { class: "af16-fan-lattice", "clip-path": `url(#${clipId})` });
      [-104,-78,-52,-26,0,26,52,78].forEach(x => line(lattice, `M${x}-82L${x + 84} 50`, "af16-lattice-line"));
      [-84,-58,-32,-6,20,46,72,98].forEach(x => line(lattice, `M${x} 50L${x + 84}-82`, "af16-lattice-line alt"));
      path(group, "M-82-4Q-71-43-43-62Q-21-76 0-80Q22-76 44-62Q72-43 83-4", "af16-fan-rim");
      [-72,-48,-24,0,24,48,72].forEach(x => line(group, `M0 48L${x} ${-65 + Math.abs(x) * .58}`, "af16-fan-rib"));
      path(group, "M-8 44L-13 91L13 91L8 44Z", "af16-fan-handle");
      add(group, "circle", { class: "af16-fan-pivot", cx: 0, cy: 48, r: 9 });
    }
    return true;
  }

  if (item.family === "kite-rig") {
    if (companion) {
      const kite = add(group, "g", { transform: "translate(47 -48) rotate(11)" });
      path(kite, "M0-55L42 0L0 51L-42 0Z", "af16-kite-paper companion");
      path(kite, "M0-55L42 0L0 0Z", "af16-kite-quarter turquoise");
      path(kite, "M0 0L0 51L-42 0Z", "af16-kite-quarter coral");
      line(kite, "M0-53V49M-40 0H40", "af16-kite-spar");
      path(kite, "M0 50Q18 65 3 80Q-12 94 8 108", "af16-kite-tail");
      [[9,66],[-1,82],[6,100]].forEach(([cx,cy], index) => path(kite, `M${cx-7} ${cy-4}L${cx} ${cy}L${cx-7} ${cy+5}M${cx+7} ${cy-4}L${cx} ${cy}L${cx+7} ${cy+5}`, index % 2 ? "af16-tail-bow gold" : "af16-tail-bow"));
      const spool = add(group, "g", { transform: "translate(-47 29) rotate(-8)" });
      path(spool, "M-35-20H35V20H-35Z", "af16-spool-thread");
      add(spool, "ellipse", { class: "af16-spool-rim", cx: -35, cy: 0, rx: 8, ry: 27 });
      add(spool, "ellipse", { class: "af16-spool-rim", cx: 35, cy: 0, rx: 8, ry: 27 });
      [-24,-12,0,12,24].forEach(x => line(spool, `M${x}-19V19`, "af16-spool-winding"));
      path(spool, "M-42 26L-25 43M42 26L25 43M-26 43H26", "af16-spool-grip");
      path(group, "M-11 29Q15-9 47-48", "af16-kite-line");
    } else {
      const kite = add(group, "g", { transform: "translate(58 -55) rotate(-6)" });
      path(kite, "M0-72L56 0L0 67L-56 0Z", "af16-kite-paper primary");
      path(kite, "M0-72L56 0L0 0Z", "af16-kite-quarter indigo");
      path(kite, "M0 0L0 67L-56 0Z", "af16-kite-quarter coral");
      line(kite, "M0-70V65M-54 0H54", "af16-kite-spar");
      path(kite, "M0 66Q25 82 5 101Q-16 120 10 140", "af16-kite-tail");
      [[13,83],[1,104],[8,130]].forEach(([cx,cy], index) => path(kite, `M${cx-9} ${cy-5}L${cx} ${cy}L${cx-9} ${cy+6}M${cx+9} ${cy-5}L${cx} ${cy}L${cx+9} ${cy+6}`, index % 2 ? "af16-tail-bow gold" : "af16-tail-bow"));
      const spool = add(group, "g", { transform: "translate(-56 34) rotate(-7)" });
      path(spool, "M-43-27H43V27H-43Z", "af16-spool-thread");
      add(spool, "ellipse", { class: "af16-spool-rim", cx: -43, cy: 0, rx: 10, ry: 36 });
      add(spool, "ellipse", { class: "af16-spool-rim", cx: 43, cy: 0, rx: 10, ry: 36 });
      [-30,-15,0,15,30].forEach(x => line(spool, `M${x}-26V26`, "af16-spool-winding"));
      path(spool, "M-50 35L-31 55M50 35L31 55M-32 55H32", "af16-spool-grip");
      add(spool, "circle", { class: "af16-spool-crank", cx: 54, cy: 39, r: 7 });
      path(group, "M-12 34Q19-17 58-55", "af16-kite-line");
    }
    return true;
  }

  if (item.family === "soil-kit") {
    if (companion) {
      const bag = add(group, "g", { transform: "translate(40 5) rotate(4)" });
      path(bag, "M-29-38H29L34 43Q4 54-34 43Z", "af16-sample-bag");
      path(bag, "M-29-38L-23-49H24L29-38Z", "af16-bag-fold");
      path(bag, "M-31 20Q0 7 32 21L34 43Q4 54-34 43Z", "af16-bag-soil");
      add(bag, "rect", { class: "af16-bag-label", x: -20, y: -24, width: 40, height: 27, rx: 3 });
      line(bag, "M-13-15H13M-13-8H8M-13-1H12", "af16-bag-label-line");
      const trowel = add(group, "g", { transform: "translate(-35 1) rotate(-13)" });
      path(trowel, "M0 55C-20 34-26 4-19-24Q0-39 19-24C26 4 20 34 0 55Z", "af16-trowel-blade");
      path(trowel, "M0-26V42", "af16-trowel-ridge");
      path(trowel, "M-9-30L-7-51H7L9-30Z", "af16-trowel-socket");
      path(trowel, "M-13-88Q0-99 13-88L9-48H-9Z", "af16-trowel-grip");
      [-78,-68,-58].forEach(y => line(trowel, `M-9 ${y}H9`, "af16-grip-line"));
      path(group, "M-76 50Q-13 65 67 55L56 70Q-6 82-67 67Z", "af16-sample-tray");
      [[-52,51],[-25,58],[2,55],[25,60]].forEach(([cx,cy], index) => add(group, "circle", { class: index % 2 ? "af16-soil-grain light" : "af16-soil-grain", cx, cy, r: 4 + index % 2 }));
    } else {
      path(group, "M-58-20Q-47-82 0-88Q48-82 59-20", "af16-bucket-handle");
      [-59,59].forEach(cx => add(group, "circle", { class: "af16-bucket-lug", cx, cy: -18, r: 6 }));
      path(group, "M-64-18L-52 64Q0 82 52 64L64-18Z", "af16-bucket-body");
      add(group, "ellipse", { class: "af16-bucket-rim", cx: 0, cy: -18, rx: 65, ry: 22 });
      add(group, "ellipse", { class: "af16-bucket-soil", cx: 0, cy: -16, rx: 53, ry: 14 });
      [-34,-17,0,17,34].forEach(x => line(group, `M${x}-1L${x * .82} 62`, "af16-bucket-rib"));
      [[-34,-18],[-13,-12],[9,-19],[31,-13]].forEach(([cx,cy],index) => add(group, "circle", { class: index % 2 ? "af16-soil-grain light" : "af16-soil-grain", cx, cy, r: 5 + index % 2 }));
      const probe = add(group, "g", { transform: "translate(19 -35) rotate(13)" });
      path(probe, "M-7-69H7L6 61L0 73L-6 61Z", "af16-soil-probe");
      path(probe, "M-30-76Q0-86 30-76L27-65Q0-72-27-65Z", "af16-probe-handle");
      path(probe, "M-4 15H4V59H-4Z", "af16-probe-slot");
      path(probe, "M-3 34H3V58H-3Z", "af16-probe-soil");
      line(probe, "M-5-45H5M-5-20H5M-5 5H5", "af16-probe-mark");
      const bag = add(group, "g", { transform: "translate(62 27) rotate(7)" });
      path(bag, "M-25-32H25L29 39Q0 50-29 39Z", "af16-sample-bag");
      path(bag, "M-25-32L-20-42H21L25-32Z", "af16-bag-fold");
      path(bag, "M-27 18Q0 7 27 18L29 39Q0 50-29 39Z", "af16-bag-soil");
      add(bag, "rect", { class: "af16-bag-label", x: -17, y: -19, width: 34, height: 23, rx: 3 });
      line(bag, "M-11-11H11M-11-5H7M-11 1H10", "af16-bag-label-line");
    }
    return true;
  }
  return false;
}

function drawMahahualJU2617Accessory(group, item, companion) {
  if (!mahahualJU2617RendererIds.has(item.id)) return false;
  group.dataset.renderer = item.family;
  group.classList.add("mahahual-ju2617-accessory", companion ? "ju2617-companion" : "ju2617-primary");
  const text = (value, x, y, className = "ju2617-label") => {
    const node = add(group, "text", { class: className, x, y, "text-anchor": "middle" });
    node.textContent = value;
  };
  const gear = (cx, cy, radius, className = "ju2617-gear") => {
    add(group, "circle", { class: className, cx, cy, r: radius });
    [0, 45, 90, 135].forEach(angle => {
      const radians = angle * Math.PI / 180;
      line(group, `M${cx - Math.cos(radians) * radius * .72} ${cy - Math.sin(radians) * radius * .72}L${cx + Math.cos(radians) * radius * .72} ${cy + Math.sin(radians) * radius * .72}`, "ju2617-gear-spoke");
    });
    add(group, "circle", { class: "ju2617-gear-hub", cx, cy, r: Math.max(3, radius * .24) });
  };
  const citrus = (cx, cy, rx, ry, rotate = 0, open = false) => {
    const fruit = add(group, "g", { class: open ? "ju2617-citrus open" : "ju2617-citrus", transform: `translate(${cx} ${cy}) rotate(${rotate})` });
    add(fruit, "ellipse", { class: "ju2617-citrus-rind", cx: 0, cy: 0, rx, ry });
    path(fruit, `M${-rx * .78} ${ry * .18}Q${-rx * .2} ${-ry * .32} ${rx * .18} ${ry * .02}Q${rx * .55} ${ry * .34} ${rx * .8} ${-ry * .05}`, "ju2617-citrus-collapse");
    if (open) {
      add(fruit, "ellipse", { class: "ju2617-citrus-pulp", cx: rx * .12, cy: -ry * .08, rx: rx * .48, ry: ry * .43 });
      [-46, 0, 44].forEach(angle => line(fruit, `M${rx * .1} ${-ry * .08}L${rx * .1 + Math.cos(angle * Math.PI / 180) * rx * .42} ${-ry * .08 + Math.sin(angle * Math.PI / 180) * ry * .37}`, "ju2617-segment-line"));
    }
    return fruit;
  };

  if (item.family === "ju2617-citrus-heap-respiration-recorder") {
    if (companion) {
      path(group, "M-42-87H34L47 73H-52Z", "ju2617-u-frame");
      path(group, "M-25-68H18V-26H-25ZM-30-15H24V30H-30ZM-35 40H30V70H-35Z", "ju2617-stacked-chamber");
      citrus(-5, -47, 13, 10, -9, true);
      citrus(-4, 6, 17, 12, 12, false);
      path(group, "M-49-69V48Q-49 67-31 67M37-70V44Q37 61 23 61", "ju2617-u-tube");
      [-50, -29, -8, 13, 34].forEach((y, index) => add(group, "circle", { class: index % 2 ? "ju2617-counter-bead accent" : "ju2617-counter-bead", cx: 51, cy: y, r: 5 }));
      line(group, "M43-57H58V42H43", "ju2617-counter-rail");
      add(group, "rect", { class: "ju2617-culture-vial", x: -73, y: 5, width: 19, height: 43, rx: 7 });
      line(group, "M-71 9H-55", "ju2617-vial-cap");
      path(group, "M-40 55H32L24 80H-46Z", "ju2617-litter-drawer");
      add(group, "circle", { class: "ju2617-drawer-pull", cx: -7, cy: 66, r: 4 });
      text("JU2617", -7, 27, "ju2617-small-label");
    } else {
      path(group, "M-111 31H103L93 72H-105Z", "ju2617-recorder-base");
      path(group, "M-84 27Q-82-63 0-71Q82-63 84 27Z", "ju2617-bell-jar");
      add(group, "ellipse", { class: "ju2617-jar-rim", cx: 0, cy: 27, rx: 91, ry: 17 });
      citrus(-39, 7, 31, 23, -12, true);
      citrus(10, 1, 34, 25, 7, false);
      citrus(48, 13, 25, 18, -4, true);
      path(group, "M78-37Q113-47 119-12Q125 18 146 14", "ju2617-capillary");
      gear(147, 14, 19, "ju2617-bubble-wheel");
      add(group, "circle", { class: "ju2617-bubble", cx: 109, cy: -22, r: 5 });
      add(group, "circle", { class: "ju2617-bubble small", cx: 119, cy: -8, r: 3 });
      add(group, "rect", { class: "ju2617-trace-drum", x: 101, y: 36, width: 63, height: 36, rx: 16 });
      path(group, "M109 54Q122 44 135 55Q148 65 158 53", "ju2617-trace-line");
      path(group, "M-72 72H72L64 94H-79Z", "ju2617-record-plate");
      text("JU2617 / Y2.1", -3, 87, "ju2617-small-label");
    }
    return true;
  }

  if (item.family === "ju2617-test-cross-lock") {
    if (companion) {
      path(group, "M-45-85H39L50 73H-54Z", "ju2617-gate-frame");
      path(group, "M-34-67H-5V42H-34ZM8-54H36V55H8Z", "ju2617-twin-tube");
      path(group, "M-5-48Q3-35 8-29M-5 21Q2 34 8 39", "ju2617-gate-feed");
      [-42, -8, 26].forEach((y, index) => path(group, `M${index % 2 ? -18 : -27} ${y}H${index % 2 ? 31 : 22}V${y + 23}H${index % 2 ? -18 : -27}Z`, "ju2617-blank-window"));
      path(group, "M-43 51H37L29 77H-49Z", "ju2617-progeny-drawer");
      gear(51, -55, 15);
      line(group, "M36-55H51M51-40V22", "ju2617-drive");
      text("TEST", 2, 8, "ju2617-small-label");
      text("CROSS", 2, 21, "ju2617-small-label");
    } else {
      path(group, "M-105 42H104V76H-105Z", "ju2617-lock-bench");
      path(group, "M-90-48L-26 3L-91 53M90-48L27 3L91 53", "ju2617-cross-arm");
      add(group, "circle", { class: "ju2617-culture-well", cx: -82, cy: -47, r: 23 });
      add(group, "circle", { class: "ju2617-culture-well", cx: 82, cy: -47, r: 23 });
      path(group, "M-37-27H38V37H-37Z", "ju2617-observation-cabinet");
      path(group, "M-27-17H28V26H-27Z", "ju2617-observation-window");
      path(group, "M-58-19H-36V31H-58ZM37-19H59V31H37Z", "ju2617-diagnostic-shutter");
      gear(-76, 53, 16);
      gear(76, 53, 16);
      line(group, "M-60 53H-37M38 53H60", "ju2617-drive");
      text("TEST CROSS", 0, 91, "ju2617-small-label");
    }
    return true;
  }

  if (item.family === "mahahual-lighthouse-flash-sequencer") {
    if (companion) {
      add(group, "ellipse", { class: "ju2617-fresnel-drum", cx: 0, cy: 2, rx: 83, ry: 55 });
      add(group, "ellipse", { class: "ju2617-fresnel-ring", cx: 0, cy: 2, rx: 65, ry: 40 });
      [[0, -27], [34, 2], [0, 31], [-34, 2]].forEach(([cx, cy], index) => path(group, `M${cx - 15} ${cy - 9}H${cx + 15}L${cx + 10} ${cy + 10}H${cx - 10}Z`, index === 0 ? "ju2617-flash-aperture lit" : "ju2617-flash-aperture"));
      gear(84, 20, 18, "ju2617-escapement-wheel");
      path(group, "M65-17L91-43L103-31L82-7", "ju2617-escapement-arm");
      path(group, "M-74 42Q0 80 76 43L64 73Q0 101-66 74Z", "ju2617-curved-base");
      text("4 × 16 s", 0, 93, "ju2617-small-label");
    } else {
      path(group, "M-48 66L-34-62H34L49 66Z", "ju2617-lighthouse-tower");
      path(group, "M-41-81H42V-54H-41Z", "ju2617-lantern-room");
      path(group, "M-52-83L0-105L53-83Z", "ju2617-lantern-roof");
      [-30, -10, 10, 30].forEach((x, index) => path(group, `M${x - 8}-77H${x + 8}V-59H${x - 8}Z`, index === 1 ? "ju2617-lantern-shutter lit" : "ju2617-lantern-shutter"));
      add(group, "circle", { class: "ju2617-timing-ring", cx: 0, cy: 8, r: 43 });
      [0, 90, 180, 270].forEach(angle => {
        const radians = angle * Math.PI / 180;
        line(group, `M${Math.cos(radians) * 33} ${8 + Math.sin(radians) * 33}L${Math.cos(radians) * 43} ${8 + Math.sin(radians) * 43}`, "ju2617-timing-tick");
      });
      gear(0, 8, 17);
      path(group, "M-61 66H61L52 92H-69Z", "ju2617-lighthouse-base");
      text("16 s", 0, 80, "ju2617-label");
    }
    return true;
  }

  return false;
}

function drawMauritiusJU2909Accessory(group, item, companion) {
  if (!mauritiusJU2909RendererIds.has(item.id)) return false;
  group.dataset.renderer = item.family;
  group.classList.add("mauritius-ju2909-accessory", companion ? "ju2909-companion" : "ju2909-primary");
  const rivet = (parent, cx, cy, radius = 4) => add(parent, "circle", { class: "ju2909-rivet", cx, cy, r: radius });
  const weave = (parent, lines) => lines.forEach(d => path(parent, d, "ju2909-weave-line"));

  if (item.family === "mauritius-ravanne-crawler-drum") {
    if (companion) {
      const drum = add(group, "g", { transform: "rotate(-12 -2 -2)" });
      add(drum, "ellipse", { class: "ju2909-ravanne-rim-back", cx: -2, cy: -3, rx: 68, ry: 56 });
      add(drum, "ellipse", { class: "ju2909-ravanne-skin companion-skin", cx: -2, cy: -3, rx: 55, ry: 44 });
      path(drum, "M-60-27Q-75-5-61 24M59-28Q72-4 58 24", "ju2909-ravanne-sidewall");
      [-49, -22, 12, 43].forEach((cx, index) => rivet(drum, cx, index % 2 ? 43 : -46, 3.5));
      path(drum, "M-51-21Q-16 8 29-24M-42 25Q-5-5 44 20", "ju2909-ravanne-skin-mark");
      path(drum, "M-48-39L-39-27M-18-52L-14-38M18-49L13-36M47-33L38-23M-51 34L-41 25M-12 47L-9 35M23 43L19 31M50 27L40 19", "ju2909-ravanne-lacing");
      path(group, "M-47-58Q-18-79 13-57", "ju2909-ravanne-harness");
      path(group, "M42-52L72-91M36-47L66-86", "ju2909-beater-shaft");
      add(group, "ellipse", { class: "ju2909-beater-head", cx: 72, cy: -94, rx: 12, ry: 8, transform: "rotate(-14 72 -94)" });
      path(group, "M-52 38Q-23 62 12 50", "ju2909-ravanne-harness accent");
    } else {
      const drum = add(group, "g", { transform: "rotate(8 0 0)" });
      add(drum, "ellipse", { class: "ju2909-ravanne-rim-back", cx: 0, cy: 0, rx: 92, ry: 74 });
      path(drum, "M-84-37Q-105-2-83 42M84-38Q105-3 82 42", "ju2909-ravanne-sidewall");
      add(drum, "ellipse", { class: "ju2909-ravanne-skin", cx: 0, cy: 0, rx: 76, ry: 59 });
      [-68, -34, 0, 34, 68].forEach((cx, index) => rivet(drum, cx, index % 2 ? 59 : -61, 4.3));
      [-38, 0, 38].forEach((cx, index) => rivet(drum, cx, index === 1 ? 68 : -67, 3.6));
      path(drum, "M-63-31Q-24 8 19-36M-61 31Q-13-13 53 27M-18-51Q16-20 62-43", "ju2909-ravanne-skin-mark");
      path(drum, "M-69-49L-58-35M-37-64L-31-47M0-68V-51M38-62L31-46M69-45L57-33M-71 48L-58 35M-38 63L-31 46M0 68V51M39 62L31 45M70 45L57 32", "ju2909-ravanne-lacing");
      path(group, "M-71-74Q-20-105 43-76M-73 61Q-21 94 46 69", "ju2909-ravanne-harness");
      path(group, "M-51-83L-77-121M-39-87L-65-126M52-74L83-109M63-67L93-101", "ju2909-beater-shaft");
      add(group, "ellipse", { class: "ju2909-beater-head", cx: -72, cy: -126, rx: 14, ry: 9, transform: "rotate(22 -72 -126)" });
      add(group, "ellipse", { class: "ju2909-beater-head accent", cx: 90, cy: -106, rx: 14, ry: 9, transform: "rotate(-22 90 -106)" });
      path(group, "M-20 78L-11 99L3 82L15 103L28 77", "ju2909-ravanne-spring");
    }
    return true;
  }

  if (item.family === "mauritius-vacoas-tail-scoop") {
    if (companion) {
      path(group, "M-72-42Q-28-62 17-39Q49-19 58 22Q32 54-8 66Q-50 55-72 20Z", "ju2909-vacoas-basket companion-basket");
      path(group, "M-74-42Q-28-72 20-44Q50-25 61 18", "ju2909-vacoas-rim");
      path(group, "M-63-20Q-21-42 45-12M-61 7Q-13-12 51 14M-48 35Q-5 24 35 35", "ju2909-weave-band");
      weave(group, ["M-45-51Q-39 0-6 59", "M-17-56Q-7-4 18 52", "M11-47Q20-6 42 27"]);
      path(group, "M-76-15Q-103-2-96 29Q-79 44-59 34", "ju2909-tail-clasp");
      path(group, "M-4 60Q18 82 43 63", "ju2909-basket-foot");
      add(group, "ellipse", { class: "ju2909-basket-mouth", cx: 55, cy: 12, rx: 16, ry: 30, transform: "rotate(-20 55 12)" });
      path(group, "M48-2Q80-18 95 8Q83 30 57 35", "ju2909-fruit-lip");
      add(group, "ellipse", { class: "ju2909-gathered-fruit", cx: 82, cy: 9, rx: 16, ry: 12, transform: "rotate(12 82 9)" });
    } else {
      path(group, "M-104-50Q-48-79 18-52Q78-28 98 20Q71 73 10 87Q-55 82-99 39Z", "ju2909-vacoas-basket");
      path(group, "M-107-49Q-49-91 24-57Q82-31 102 18", "ju2909-vacoas-rim");
      path(group, "M-91-23Q-36-53 76-10M-92 8Q-31-19 86 21M-76 42Q-22 22 69 51", "ju2909-weave-band");
      weave(group, ["M-75-65Q-66 4-12 82", "M-39-76Q-25-2 20 82", "M0-70Q17-4 54 66", "M39-54Q54-5 79 41"]);
      path(group, "M-107-14Q-143 0-134 40Q-112 59-87 45", "ju2909-tail-clasp");
      path(group, "M-30 83Q-2 110 32 87", "ju2909-basket-foot");
      add(group, "ellipse", { class: "ju2909-basket-mouth", cx: 94, cy: 12, rx: 22, ry: 42, transform: "rotate(-18 94 12)" });
      path(group, "M87-12Q126-35 148-3Q137 35 98 47", "ju2909-fruit-lip");
      add(group, "ellipse", { class: "ju2909-gathered-fruit", cx: 127, cy: 3, rx: 22, ry: 16, transform: "rotate(16 127 3)" });
      path(group, "M119-8Q128-29 143-21", "ju2909-fruit-stem");
    }
    return true;
  }

  if (item.family === "mauritius-dodo-beak-fruit-grabber") {
    if (companion) {
      path(group, "M-111-34Q-134-9-111 25M-101-27Q-117-7-102 17", "ju2909-body-clamp");
      path(group, "M-111 20Q-99 8-84-1", "ju2909-grabber-bridge");
      add(group, "circle", { class: "ju2909-grabber-coupling", cx: -84, cy: -1, r: 7 });
      path(group, "M-86-12Q-58-39-27-27Q-8-18-2-1Q-20 11-45 10Q-70 10-86-12Z", "ju2909-dodo-head companion-head");
      path(group, "M-67-32Q-74-57-60-66Q-50-49-48-34M-50-36Q-45-61-30-63Q-25-45-31-31", "ju2909-dodo-crest-feathers");
      add(group, "circle", { class: "ju2909-dodo-eye", cx: -33, cy: -17, r: 7 });
      rivet(group, -33, -17, 2.2);
      path(group, "M-4-10Q38-36 85-11Q105 1 87 16Q50 25 7 11Q-4 6-4-10Z", "ju2909-dodo-upper-beak");
      path(group, "M5 12Q50 30 91 11Q79 40 38 42Q13 36 5 12Z", "ju2909-dodo-lower-beak");
      path(group, "M72-13Q103-10 96 10Q94 29 78 34L67 15Z", "ju2909-beak-tip");
      path(group, "M12 4Q47-3 82 8", "ju2909-beak-seam");
      add(group, "ellipse", { class: "ju2909-dodo-nostril", cx: 49, cy: -8, rx: 4, ry: 2.5, transform: "rotate(8 49 -8)" });
      add(group, "ellipse", { class: "ju2909-woody-nut", cx: 62, cy: 20, rx: 18, ry: 14, transform: "rotate(-9 62 20)" });
      add(group, "circle", { class: "ju2909-beak-hinge", cx: -3, cy: 1, r: 10 });
      path(group, "M-75 10Q-108 36-98 72M-89 5Q-119 30-113 61", "ju2909-grabber-harness");
      path(group, "M-99 67L-85 83L-73 66", "ju2909-grabber-trigger");
    } else {
      path(group, "M-160-43Q-190-7-160 38M-145-35Q-168-6-145 29", "ju2909-body-clamp");
      path(group, "M-158 31Q-140 13-118-2", "ju2909-grabber-bridge");
      add(group, "circle", { class: "ju2909-grabber-coupling", cx: -118, cy: -2, r: 9 });
      path(group, "M-120-18Q-82-61-31-42Q-4-31 3-4Q-18 18-56 15Q-95 12-120-18Z", "ju2909-dodo-head");
      path(group, "M-95-41Q-81-68-61-54Q-54-76-35-57", "ju2909-dodo-crest");
      path(group, "M-93-49Q-104-83-84-94Q-67-76-70-53M-70-54Q-65-90-41-91Q-35-66-49-45", "ju2909-dodo-crest-feathers");
      add(group, "circle", { class: "ju2909-dodo-eye", cx: -42, cy: -28, r: 9 });
      rivet(group, -42, -28, 3);
      path(group, "M0-17Q55-58 115-27Q147-12 130 13Q82 28 14 17Q1 11 0-17Z", "ju2909-dodo-upper-beak");
      path(group, "M12 19Q72 45 131 9Q118 52 64 58Q29 53 12 19Z", "ju2909-dodo-lower-beak");
      path(group, "M107-28Q153-25 145 5Q142 34 119 44L102 16Z", "ju2909-beak-tip");
      path(group, "M17 5Q68-6 119 4", "ju2909-beak-seam");
      add(group, "ellipse", { class: "ju2909-dodo-nostril", cx: 72, cy: -17, rx: 5.5, ry: 3.2, transform: "rotate(7 72 -17)" });
      add(group, "ellipse", { class: "ju2909-woody-nut", cx: 91, cy: 30, rx: 27, ry: 20, transform: "rotate(-12 91 30)" });
      path(group, "M77 18Q91-5 109 15", "ju2909-nut-groove");
      add(group, "circle", { class: "ju2909-beak-hinge", cx: 0, cy: 0, r: 13 });
      rivet(group, 0, 0, 4);
      path(group, "M-103 10Q-148 44-132 91M-116 2Q-160 36-151 76", "ju2909-grabber-harness");
      path(group, "M-137 83Q-123 105-101 86L-112 69Z", "ju2909-grabber-trigger");
      path(group, "M-9 11Q11 53 48 57", "ju2909-control-cable");
    }
    return true;
  }

  return false;
}

function drawNambuccaQG2814Accessory(group, item, companion) {
  if (!nambuccaQG2814RendererIds.has(item.id)) return false;
  group.dataset.renderer = item.family;
  group.classList.add("nambucca-qg2814-accessory", companion ? "qg2814-companion" : "qg2814-primary");
  const text = (value, x, y, className = "qg2814-label") => {
    const node = add(group, "text", { class: className, x, y, "text-anchor": "middle" });
    node.textContent = value;
  };
  const flower = (cx, cy, scale, state = "softened") => {
    const flowerGroup = add(group, "g", { transform: `translate(${cx} ${cy}) scale(${scale})` });
    [0,72,144,216,288].forEach((angle,index)=>{
      const rad=angle*Math.PI/180,px=Math.cos(rad)*17,py=Math.sin(rad)*17;
      add(flowerGroup,"ellipse",{class:`qg2814-petal ${state}${index%2?" accent":""}`,cx:px,cy:py,rx:13,ry:20,transform:`rotate(${angle+90} ${px} ${py})`});
    });
    add(flowerGroup,"circle",{class:"qg2814-flower-centre",cx:0,cy:0,r:9});
    return flowerGroup;
  };

  if (item.family === "qg2814-ground-flower-sample-theatre") {
    if (companion) {
      path(group, "M-43-84H36L49 72H-50Z", "qg2814-flower-cabinet");
      [-54,-14,26].forEach((cy,index)=>{
        path(group,`M-30 ${cy-15}H31V${cy+15}H-30Z`,index===1?"qg2814-flower-drawer accent":"qg2814-flower-drawer");
        flower(0,cy,.34,index===2?"collapsed":"softened");
      });
      path(group, "M-28 51H31L23 75H-35Z", "qg2814-litter-tray");
      [[-18,61],[-3,66],[13,59]].forEach(([cx,cy])=>add(group,"circle",{class:"qg2814-litter-chip",cx,cy,r:4}));
      line(group, "M38-64H60M38-20H55M38 23H61", "qg2814-drawer-tabs");
    } else {
      path(group, "M-109 24H106V72H-109Z", "qg2814-sample-table");
      path(group, "M-97 9Q-49-18 0 3Q51 25 97 4V45Q50 66 0 49Q-51 67-97 45Z", "qg2814-ground-membrane");
      flower(-55,-25,.72,"softened");
      flower(2,-33,.63,"collapsed");
      flower(51,-12,.55,"softened");
      add(group, "circle", { class: "qg2814-sampling-aperture", cx: 0, cy: 9, r: 16 });
      line(group, "M0-57V-45M-83 10H-68M0 25V39M68 9H83", "qg2814-theatre-tick");
      path(group, "M-81 72H80L71 94H-89Z", "qg2814-index-plate");
      text("GROUND FLOWER SAMPLE", -4, 87, "qg2814-small-label");
    }
    return true;
  }

  if (item.family === "qg2814-five-day-two-plate-relay") {
    if (companion) {
      path(group, "M-42-84H37L49 72H-50Z", "qg2814-plate-lift");
      [-43,25].forEach((cy,index)=>{
        add(group,"ellipse",{class:index?"qg2814-culture-plate second":"qg2814-culture-plate first",cx:-2,cy,rx:31,ry:14});
        add(group,"ellipse",{class:"qg2814-plate-lid",cx:-2,cy:cy-5,rx:27,ry:10});
      });
      line(group, "M-2-28V8", "qg2814-lift-rail");
      [-57,-35,-13,9,31].forEach(cy=>line(group,`M39 ${cy}H57`,"qg2814-five-notch-column"));
      path(group, "M-63-8H-35V48H-63Z", "qg2814-founder-window");
      text("L4",-49,25,"qg2814-stage-label");
      text("25→30", -2, 67, "qg2814-small-label");
    } else {
      path(group, "M-109 24H106V72H-109Z", "qg2814-relay-table");
      [-58,47].forEach((cx,index)=>{
        add(group,"ellipse",{class:index?"qg2814-culture-plate second":"qg2814-culture-plate first",cx,cy:-22,rx:41,ry:18});
        add(group,"ellipse",{class:"qg2814-plate-lid",cx,cy:-28,rx:36,ry:13});
        text(index?"II":"I",cx,-18,"qg2814-stage-label");
      });
      line(group, "M-18-22H7M-12-31L-2-22L-12-13", "qg2814-transfer-rail");
      [-8,6,20,34,48].forEach(x=>line(group,`M${x} 13V34`,"qg2814-five-notch-column"));
      path(group, "M-89 33H-28V62H-89Z", "qg2814-date-window");
      text("25 MAR",-58,53,"qg2814-small-label");
      path(group, "M43 33H98V62H43Z", "qg2814-date-window");
      text("30 MAR",70,53,"qg2814-small-label");
      path(group, "M-16 36H23V67H-16Z", "qg2814-founder-cradle");
      text("L4",4,58,"qg2814-stage-label");
    }
    return true;
  }

  if (item.family === "qg2814-18s-identity-ribbon-reader") {
    if (companion) {
      path(group, "M-42-83H37L49 72H-50Z", "qg2814-ribbon-cabinet");
      path(group, "M-28-67H29V12H-28Z", "qg2814-ribbon-window");
      path(group, "M-18-55Q14-41-17-25Q14-9-17 8M18-55Q-13-41 18-25Q-13-9 18 8", "qg2814-sequence-ribbon");
      [-46,-31,-16,-1].forEach(cy=>line(group,`M-12 ${cy}H12`,"qg2814-sequence-rung"));
      path(group, "M-27 24H31V49H-27Z", "qg2814-readout-drawer");
      text("18S",2,43,"qg2814-stage-label");
      path(group, "M-61-13H-34V42H-61Z", "qg2814-id-drawer");
      text("ID",-48,21,"qg2814-small-label");
      add(group,"circle",{class:"qg2814-isotype-seal",cx:44,cy:-39,r:18});
      text("2",44,-32,"qg2814-stage-label");
    } else {
      path(group, "M-109 24H106V72H-109Z", "qg2814-reader-table");
      path(group, "M-96-55H24V28H-96Z", "qg2814-sequence-screen");
      path(group, "M-82-42Q-49-27-81-11Q-49 5-81 20M-66-42Q-98-27-66-11Q-98 5-66 20", "qg2814-sequence-ribbon");
      [-35,-20,-5,10].forEach(cy=>line(group,`M-77 ${cy}H-70`,"qg2814-sequence-rung"));
      path(group, "M34-50H96V2H34Z", "qg2814-identification-gate");
      text("18S",65,-17,"qg2814-date-label");
      path(group, "M31 14H99V52H31Z", "qg2814-species-readout");
      text("BRIGGSAE",65,38,"qg2814-small-label");
      add(group,"circle",{class:"qg2814-isotype-seal",cx:-3,cy:52,r:20});
      text("2",-3,59,"qg2814-stage-label");
      path(group, "M-80 72H80L71 94H-89Z", "qg2814-reader-plate");
      text("SEQUENCE IDENTIFICATION", -4, 87, "qg2814-small-label");
    }
    return true;
  }
  return false;
}

function drawDoisRiosEG5612Accessory(group, item, companion) {
  if (!doisRiosEG5612RendererIds.has(item.id)) return false;
  group.dataset.renderer = item.family;
  group.classList.add("dois-rios-eg5612-accessory", companion ? "eg5612-companion" : "eg5612-primary");
  const text = (value, x, y, className = "eg5612-label") => {
    const node = add(group, "text", { class: className, x, y, "text-anchor": "middle" });
    node.textContent = value;
  };
  const jackfruit = (cx, cy, sx, sy, open = true) => {
    const fruit = add(group, "g", { transform: `translate(${cx} ${cy}) scale(${sx} ${sy})` });
    path(fruit, "M-52 0Q-45-40 0-47Q45-40 52 0Q45 41 0 47Q-45 41-52 0Z", "eg5612-jackfruit-rind");
    [-35,-18,0,18,35].forEach((x,index)=>[-21,0,21].forEach((y,row)=>add(fruit,"circle",{class:"eg5612-rind-node",cx:x+(row%2?7:0),cy:y,r:2.6})));
    if (open) {
      path(fruit, "M-43-4Q-24-30 0-25Q27-32 44-4Q29 31 0 27Q-28 33-43-4Z", "eg5612-jackfruit-interior");
      [-22,-7,9,25].forEach((x,index)=>path(fruit,`M${x-7} ${index%2?-8:-15}Q${x} ${index%2?5:0} ${x+7} ${index%2?-8:-15}Q${x} ${index%2?16:12} ${x-7} ${index%2?-8:-15}Z`,"eg5612-fruit-bulb"));
    }
    return fruit;
  };

  if (item.family === "eg5612-jackfruit-emergence-theatre") {
    if (companion) {
      path(group, "M-43-84H36L49 72H-50Z", "eg5612-emergence-cabinet");
      path(group, "M-29-67H30V-9H-29Z", "eg5612-rind-window");
      jackfruit(0,-39,.46,.38,true);
      [-4,20,44].forEach((cy,index)=>path(group,`M-60 ${cy}H-32V${cy+18}H-60Z`,index===2?"eg5612-stage-drawer founding":"eg5612-stage-drawer"));
      path(group, "M-24 5Q-10-13 2 4Q15-15 28 5M-22 25Q-8 8 5 25Q17 8 28 25", "eg5612-stage-traces");
      path(group, "M-28 50H30L22 74H-35Z", "eg5612-founding-cradle");
      text("L4", -3, 68, "eg5612-small-label");
    } else {
      path(group, "M-109 24H106V72H-109Z", "eg5612-theatre-table");
      jackfruit(-22,-18,1.05,.8,true);
      [[-72,-41],[-55,-4],[-24,13],[14,-36],[34,-2]].forEach(([cx,cy],index)=>{
        path(group, `M${cx-10} ${cy}Q${cx} ${cy-14} ${cx+10} ${cy}Q${cx} ${cy+14} ${cx-10} ${cy}Z`, index===4?"eg5612-stage-window founding":"eg5612-stage-window");
      });
      path(group, "M61-48H98V16H61Z", "eg5612-founding-gate");
      text("L4", 79, -6, "eg5612-stage-label");
      line(group, "M58-20H41M41-20L49-29M41-20L49-11", "eg5612-gate-link");
      path(group, "M-80 72H80L71 94H-89Z", "eg5612-index-plate");
      text("MANY STAGES · ONE FOUNDER", -4, 87, "eg5612-small-label");
    }
    return true;
  }

  if (item.family === "eg5612-shared-bag-provenance-bifurcator") {
    if (companion) {
      path(group, "M-43-83H36L49 73H-50Z", "eg5612-bag-ledger");
      path(group, "M-29-67H-2V31H-29ZM8-60H34V38H8Z", "eg5612-bag-pocket");
      jackfruit(-16,-40,.22,.2,true);
      path(group, "M13-42Q22-62 31-42Q39-22 22-16Q5-22 13-42Z", "eg5612-flower-card");
      line(group, "M-18-12L27 21M24-10L-14 23", "eg5612-provenance-ribbon");
      add(group, "circle", { class: "eg5612-shared-seal", cx: 3, cy: 7, r: 13 });
      text("ONE BAG", 1, 65, "eg5612-small-label");
    } else {
      path(group, "M-109 24H106V72H-109Z", "eg5612-bag-viewer-table");
      path(group, "M-96-54Q-65-68-33-52L-18 24H-92ZM21-52Q52-68 91-49L98 25H17Z", "eg5612-transport-bag");
      jackfruit(-58,-22,.43,.36,true);
      path(group, "M42-27Q57-52 73-28Q91-6 68 12Q46 25 34 5Q27-9 42-27Z", "eg5612-flower-card");
      line(group, "M-19-35L20-30M-18-13L18-8M-16 10L17 15", "eg5612-bag-join");
      path(group, "M-14-52H16V25H-14Z", "eg5612-uncertainty-shutter");
      text("?", 1, -3, "eg5612-question");
      path(group, "M-80 72H81L72 94H-89Z", "eg5612-provenance-plate");
      text("SHARED TRANSPORT BAG", -4, 87, "eg5612-small-label");
    }
    return true;
  }

  if (item.family === "eg5612-single-larva-test-cross-gate") {
    if (companion) {
      path(group, "M-43-83H36L49 72H-50Z", "eg5612-cross-tower");
      path(group, "M-28-67H30V-18H-28ZM-27-4H31V45H-27Z", "eg5612-species-window");
      text("ELEGANS", 1, -37, "eg5612-small-label");
      text("BRIGGSAE", 2, 27, "eg5612-small-label");
      line(group, "M-18-52L19-27M-18-27L19-52", "eg5612-closed-cross");
      path(group, "M-19 11Q-3-9 10 11Q22-9 28 10", "eg5612-open-cross");
      path(group, "M-61-15H-35V42H-61Z", "eg5612-larva-lift");
      text("L4", -48, 21, "eg5612-stage-label");
      line(group, "M38-54H61V43H38", "eg5612-test-rail");
    } else {
      path(group, "M-109 24H106V72H-109Z", "eg5612-cross-gate-table");
      path(group, "M-96-51H-13V28H-96ZM14-51H98V28H14Z", "eg5612-cross-channel");
      text("C. ELEGANS", -55, -29, "eg5612-small-label");
      text("C. BRIGGSAE", 56, -29, "eg5612-small-label");
      line(group, "M-82-13L-29 14M-82 14L-29-13", "eg5612-closed-cross");
      path(group, "M29 11Q45-10 59 11Q75-10 88 10", "eg5612-open-cross");
      path(group, "M-9-57H11V35H-9Z", "eg5612-founding-chamber");
      text("L4", 1, -2, "eg5612-stage-label");
      path(group, "M-80 72H81L72 94H-89Z", "eg5612-cross-result-plate");
      text("TEST-CROSS IDENTIFICATION", -4, 87, "eg5612-small-label");
    }
    return true;
  }
  return false;
}

function drawOrsayJU2518Accessory(group, item, companion) {
  if (!orsayJU2518RendererIds.has(item.id)) return false;
  group.dataset.renderer = item.family;
  group.classList.add("orsay-ju2518-accessory", companion ? "ju2518-companion" : "ju2518-primary");
  const text = (value, x, y, className = "ju2518-label") => {
    const node = add(group, "text", { class: className, x, y, "text-anchor": "middle" });
    node.textContent = value;
  };
  const apple = (cx, cy, scale, state = "intact") => {
    const appleGroup = add(group, "g", { transform: `translate(${cx} ${cy}) scale(${scale})` });
    path(appleGroup, "M0-28Q-29-47-44-18Q-58 14-31 38Q-12 54 0 42Q13 55 34 39Q60 14 44-17Q30-45 0-28Z", `ju2518-apple ${state}`);
    line(appleGroup, "M0-28Q2-44 13-50", "ju2518-apple-stem");
    path(appleGroup, "M8-44Q26-57 35-40Q20-34 8-44Z", "ju2518-apple-leaf");
    if (state !== "intact") path(appleGroup, "M20-18Q39-8 34 13Q27 29 11 20Q5 5 20-18Z", "ju2518-decay-window");
    return appleGroup;
  };

  if (item.family === "ju2518-rotten-apple-decay-rotoscope") {
    if (companion) {
      path(group, "M-43-84H35L49 72H-50Z", "ju2518-flipbook-cabinet");
      [-50,-9,31].forEach((cy,index)=>{
        path(group, `M-29 ${cy-15}H30V${cy+15}H-29Z`, index===1?"ju2518-state-window accent":"ju2518-state-window");
        apple(0,cy,.28,index===0?"intact":index===1?"softened":"open");
      });
      path(group, "M-27 52H30L22 75H-35Z", "ju2518-contact-tray");
      line(group, "M37-62H59M37-18H55M37 25H60", "ju2518-flip-tabs");
    } else {
      path(group, "M-109 24H106V72H-109Z", "ju2518-rotoscope-table");
      add(group, "circle", { class: "ju2518-rotoscope-disc", cx: 0, cy: -10, r: 65 });
      apple(-46,-18,.58,"intact");
      apple(5,-29,.48,"softened");
      apple(47,8,.42,"open");
      add(group, "circle", { class: "ju2518-inspection-lens", cx: 1, cy: -10, r: 15 });
      line(group, "M0-75V-61M-65-10H-51M0 55V66M51-10H65", "ju2518-rotoscope-tick");
      path(group, "M-80 72H79L70 94H-89Z", "ju2518-index-plate");
      text("APPLE DECAY STATES", -5, 87, "ju2518-small-label");
    }
    return true;
  }

  if (item.family === "ju2518-virus-association-spectroscope") {
    if (companion) {
      path(group, "M-42-84H36L49 72H-49Z", "ju2518-association-cabinet");
      path(group, "M-29-66H28V-14H-29ZM-27 1H30V52H-27Z", "ju2518-channel-window");
      apple(-1,-40,.34,"softened");
      path(group, "M-19 28Q-6 10 8 28T29 27M-19 40Q-5 22 9 40T29 39", "ju2518-signal-ribbon");
      line(group, "M35-58H60V45H35", "ju2518-channel-rail");
      [ -43,-14,15,43 ].forEach(cy=>add(group,"circle",{class:"ju2518-signal-node",cx:48,cy,r:5}));
    } else {
      path(group, "M-109 24H106V72H-109Z", "ju2518-spectroscope-table");
      path(group, "M-96-51H-21V28H-96ZM22-51H97V28H22Z", "ju2518-record-window");
      apple(-58,-12,.55,"softened");
      path(group, "M34-27Q49-48 64-25T91-25M34-5Q49-26 64-3T91-3M34 17Q49-4 64 19T91 19", "ju2518-signal-ribbon");
      line(group, "M0-58V38M-8-43H8M-8-17H8M-8 9H8", "ju2518-association-bridge");
      add(group, "circle", { class: "ju2518-link-lens", cx: 0, cy: -3, r: 15 });
      path(group, "M-79 72H80L71 94H-88Z", "ju2518-association-plate");
      text("ASSOCIATED RECORD", -4, 87, "ju2518-small-label");
    }
    return true;
  }

  if (item.family === "ju2518-six-september-garden-ledger") {
    if (companion) {
      path(group, "M-42-83H37L49 72H-50Z", "ju2518-fieldbook-tower");
      [["06",-52],["SEP",-16],["2012",20]].forEach(([label,cy],index)=>{
        path(group,`M-27 ${cy-13}H27V${cy+13}H-27Z`,index===1?"ju2518-date-window accent":"ju2518-date-window");
        text(label,0,cy+6,index===2?"ju2518-small-label":"ju2518-date-label");
      });
      line(group, "M-59-61V33", "ju2518-elevation-line");
      path(group, "M-69 31L-59 53L-49 31Z", "ju2518-elevation-weight");
      text("65 m",-59,72,"ju2518-small-label");
      [31,53].forEach(x=>path(group,`M${x-10} 43H${x+10}V68H${x-10}Z`,"ju2518-nd-drawer"));
    } else {
      path(group, "M-109 25H106V72H-109Z", "ju2518-ledger-table");
      add(group, "circle", { class: "ju2518-date-dial", cx: -72, cy: -39, r: 29 });
      text("06", -72, -30, "ju2518-date-number");
      path(group, "M-34-59H25V-11H-34Z", "ju2518-month-window");
      text("SEP",-4,-27,"ju2518-date-label");
      path(group, "M31-59H80V-11H31Z", "ju2518-year-window");
      text("2012",55,-28,"ju2518-small-label");
      path(group, "M-87 12H13V57H-87Z", "ju2518-garden-aperture");
      path(group, "M-78 45Q-58 12-39 40Q-22 8-2 44", "ju2518-garden-symbol");
      add(group, "circle", { class: "ju2518-elevation-dial", cx: 66, cy: 25, r: 26 });
      text("65",66,33,"ju2518-number");
      [28,51,74].forEach(cx=>path(group,`M${cx-9} 49H${cx+9}V72H${cx-9}Z`,"ju2518-nd-shutter"));
    }
    return true;
  }
  return false;
}

function drawKauaiQG130Accessory(group, item, companion) {
  if (!kauaiQG130RendererIds.has(item.id)) return false;
  group.dataset.renderer = item.family;
  group.classList.add("kauai-qg130-accessory", companion ? "qg130-companion" : "qg130-primary");
  if (item.family === "qg130-kukui-glow-cart") {
    if (companion) {
      path(group, "M-73-18Q-48-66 8-69Q53-67 75-33L62 31Q21 61-34 49Q-69 40-73-18Z", "qg130-cart-shell companion");
      path(group, "M-57-17Q-35-49 6-52Q41-50 57-28L48 16Q12 38-30 30Q-51 25-57-17Z", "qg130-cart-glow companion");
      path(group, "M-64-5Q-90-28-104-5Q-112 9-96 18", "qg130-cart-handle");
      add(group, "circle", { class: "qg130-cart-wheel companion", cx: -35, cy: 49, r: 19 });
      add(group, "circle", { class: "qg130-cart-wheel companion", cx: 39, cy: 42, r: 14 });
      path(group, "M-37-47Q6-74 44-44M-37 30Q4 8 48 17", "qg130-shell-rib");
    } else {
      path(group, "M-103-28Q-70-91 5-96Q70-92 101-47L91 40Q34 83-42 67Q-91 56-103-28Z", "qg130-cart-shell");
      path(group, "M-80-25Q-52-65 3-69Q54-67 77-40L70 21Q25 52-34 42Q-69 35-80-25Z", "qg130-cart-glow");
      path(group, "M-93-10Q-128-42-148-14Q-158 2-137 18", "qg130-cart-handle");
      add(group, "circle", { class: "qg130-cart-wheel", cx: -51, cy: 70, r: 27 });
      add(group, "circle", { class: "qg130-cart-wheel", cx: 60, cy: 58, r: 21 });
      add(group, "circle", { class: "qg130-cart-hub", cx: -51, cy: 70, r: 8 });
      add(group, "circle", { class: "qg130-cart-hub", cx: 60, cy: 58, r: 7 });
      path(group, "M-57-70Q2-110 61-67M-72 39Q-4 4 72 23M-87-9Q-12-26 87-16", "qg130-shell-rib");
      path(group, "M-41-52Q-14-68 14-53Q39-40 52-12", "qg130-cart-glint");
    }
    return true;
  }

  if (item.family === "qg130-root-carousel") {
    if (companion) {
      path(group, "M-10-96Q17-68 4-39Q-9-7 12 39V74", "qg130-carousel-mast companion");
      path(group, "M-70-45Q-16-83 54-53Q66-48 73-36Q8-58-70-45Z", "qg130-carousel-canopy companion");
      path(group, "M-48-43V21M42-48V4", "qg130-carousel-cord");
      path(group, "M-70 19Q-45-7-19 17L-27 47Q-50 61-68 43Z", "qg130-carousel-seat companion");
      path(group, "M20 1Q44-19 64 4L57 32Q39 45 20 28Z", "qg130-carousel-seat alt");
      path(group, "M-55 76Q5 54 65 75", "qg130-carousel-base companion");
    } else {
      path(group, "M-17-132Q25-93 6-51Q-13-8 16 54V99", "qg130-carousel-mast");
      path(group, "M-107-62Q-23-119 87-72Q105-65 117-49Q14-82-107-62Z", "qg130-carousel-canopy");
      [-79,-28,36,86].forEach((x, index) => path(group, `M${x} ${index % 2 ? -78 : -67}V${index % 2 ? 17 : 29}`, "qg130-carousel-cord"));
      path(group, "M-105 24Q-78-9-43 18L-50 61Q-81 79-103 55Z", "qg130-carousel-seat");
      path(group, "M-52 11Q-23-20 7 12L2 55Q-24 70-49 49Z", "qg130-carousel-seat alt");
      path(group, "M14 6Q44-25 76 6L70 50Q43 68 17 46Z", "qg130-carousel-seat");
      path(group, "M66 21Q91-5 112 24L104 59Q86 71 68 52Z", "qg130-carousel-seat alt");
      path(group, "M-88 105Q13 70 109 103L97 119Q10 93-79 121Z", "qg130-carousel-base");
      path(group, "M-95-56Q-30-89 15-75Q66-60 102-53", "qg130-root-grain");
    }
    return true;
  }

  if (item.family === "qg130-three-ribbon-hoops") {
    if (companion) {
      add(group, "ellipse", { class: "qg130-ribbon-hoop gold companion", cx: -25, cy: -18, rx: 42, ry: 57, transform: "rotate(-25 -25 -18)" });
      add(group, "ellipse", { class: "qg130-ribbon-hoop aqua companion", cx: 20, cy: 5, rx: 38, ry: 54, transform: "rotate(21 20 5)" });
      add(group, "ellipse", { class: "qg130-ribbon-hoop berry companion", cx: 0, cy: 36, rx: 50, ry: 30, transform: "rotate(-4 0 36)" });
      [[-46,-53],[42,-24],[4,67]].forEach(([cx,cy], index) => add(group, "circle", { class: `qg130-ribbon-knot knot-${index + 1}`, cx, cy, r: 8 }));
      path(group, "M-53 69Q0 83 54 68", "qg130-hoop-stand companion");
    } else {
      add(group, "ellipse", { class: "qg130-ribbon-hoop gold", cx: -48, cy: -7, rx: 60, ry: 82, transform: "rotate(-28 -48 -7)" });
      add(group, "ellipse", { class: "qg130-ribbon-hoop aqua", cx: 37, cy: -11, rx: 60, ry: 82, transform: "rotate(27 37 -11)" });
      add(group, "ellipse", { class: "qg130-ribbon-hoop berry", cx: -2, cy: 45, rx: 82, ry: 49, transform: "rotate(-3 -2 45)" });
      [[-81,-72],[78,-69],[1,94]].forEach(([cx,cy], index) => add(group, "circle", { class: `qg130-ribbon-knot knot-${index + 1}`, cx, cy, r: 11 }));
      path(group, "M-91 102Q-2 130 89 101L80 118Q-2 145-82 119Z", "qg130-hoop-stand");
      path(group, "M-65-21Q-26-52 15-35M-18 13Q20-20 58-2M-46 56Q-1 31 43 54", "qg130-ribbon-highlight");
    }
    return true;
  }
  return false;
}

function drawSaltLakeEG4181Accessory(group, item, companion) {
  if (!saltLakeEG4181RendererIds.has(item.id)) return false;
  group.dataset.renderer = item.family;
  group.classList.add("salt-lake-eg4181-accessory", companion ? "eg4181-companion" : "eg4181-primary");

  const blossom = (parent, cx, cy, scale = 1, alternate = false) => {
    const flower = add(parent, "g", { transform: `translate(${cx} ${cy}) scale(${scale})` });
    [-72, 0, 72, 144, 216].forEach((angle, index) => {
      add(flower, "ellipse", {
        class: `eg4181-blossom-petal${alternate && index % 2 ? " light" : ""}`,
        cx: 0,
        cy: -18,
        rx: 10,
        ry: 19,
        transform: `rotate(${angle})`
      });
    });
    add(flower, "circle", { class: "eg4181-blossom-centre", cx: 0, cy: 0, r: 7 });
  };

  const bee = (parent, x, y, scale = 1, reverse = false) => {
    const insect = add(parent, "g", { transform: `translate(${x} ${y}) scale(${reverse ? -scale : scale} ${scale})` });
    add(insect, "ellipse", { class: "eg4181-bee-wing", cx: -8, cy: -8, rx: 12, ry: 8, transform: "rotate(-28 -8 -8)" });
    add(insect, "ellipse", { class: "eg4181-bee-wing", cx: 7, cy: -9, rx: 11, ry: 7, transform: "rotate(31 7 -9)" });
    add(insect, "ellipse", { class: "eg4181-bee-body", cx: 0, cy: 3, rx: 15, ry: 10 });
    path(insect, "M-8-3V10M2-5V12M13 0Q23-6 28-1M13 7Q23 11 27 17", "eg4181-bee-detail");
  };

  if (item.family === "eg4181-apricot-blossom-hat") {
    if (companion) {
      add(group, "ellipse", { class: "eg4181-object-shadow", cx: 2, cy: 39, rx: 78, ry: 11 });
      path(group, "M-64 15Q-48-43-4-59Q42-57 65-11Q43 1 4 5Q-35 8-64 15Z", "eg4181-hat-crown companion");
      path(group, "M-72 12Q-5 34 78 4Q63 31 14 42Q-38 45-72 12Z", "eg4181-hat-brim companion");
      path(group, "M-48-8Q-4 8 53-11", "eg4181-hat-band companion");
      path(group, "M-54 20Q4 37 61 16", "eg4181-hat-brim-stitch companion");
      path(group, "M-38-39Q-8-58 34-43", "eg4181-orchard-branch companion");
      blossom(group, -29, -48, .72, true);
      blossom(group, 17, -56, .58, false);
      path(group, "M31-45Q60-65 67-33Q54-18 29-25Z", "eg4181-leaf companion");
      add(group, "circle", { class: "eg4181-apricot-fruit companion", cx: 48, cy: -39, r: 13 });
      path(group, "M48-52Q43-61 39-63", "eg4181-apricot-stem companion");
    } else {
      add(group, "ellipse", { class: "eg4181-object-shadow", cx: 4, cy: 52, rx: 112, ry: 14 });
      path(group, "M-91 21Q-74-62-13-79Q53-77 91-14Q62 5 8 9Q-46 12-91 21Z", "eg4181-hat-crown");
      path(group, "M-105 18Q-28 47 111 0Q87 39 21 54Q-55 58-105 18Z", "eg4181-hat-brim");
      path(group, "M-75-6Q-7 17 72-11", "eg4181-hat-band");
      path(group, "M-83 27Q1 53 87 22", "eg4181-hat-brim-stitch");
      path(group, "M-62-49Q-17-78 55-54", "eg4181-orchard-branch");
      blossom(group, -48, -61, .84, true);
      blossom(group, -4, -81, .98, false);
      blossom(group, 43, -64, .78, true);
      path(group, "M49-55Q83-83 93-43Q73-20 43-32Z", "eg4181-leaf");
      path(group, "M-69-51Q-94-69-96-37Q-80-22-58-31Z", "eg4181-leaf alternate");
      add(group, "circle", { class: "eg4181-apricot-fruit", cx: 71, cy: -48, r: 17 });
      path(group, "M71-65Q66-76 58-79", "eg4181-apricot-stem");
      path(group, "M67-59Q74-50 71-35", "eg4181-apricot-seam");
    }
    return true;
  }

  if (item.family === "eg4181-beehive-saddle-pack") {
    if (companion) {
      add(group, "ellipse", { class: "eg4181-object-shadow", cx: 0, cy: 88, rx: 91, ry: 14 });
      path(group, "M-79 45Q-62 74 0 82Q61 75 78 43L64 68Q0 99-66 66Z", "eg4181-saddle-cloth companion");
      path(group, "M-66-27Q-49-72-7-81Q39-78 62-36L70 47Q45 73-1 78Q-48 71-70 45Z", "eg4181-hive-body companion");
      path(group, "M31-72Q62-54 65-25L70 47Q52 68 25 75Q49 23 31-72Z", "eg4181-hive-side companion");
      path(group, "M-42-53Q-55-16-45 44", "eg4181-hive-highlight companion");
      [-38,-12,16,43].forEach((y,index) => path(group, `M${-60+index*2} ${y}Q-2 ${y+17} ${61-index*2} ${y-1}`, "eg4181-hive-wicker companion"));
      path(group, "M-37-55Q-2-72 38-55M-50-45Q-79-7-61 48M50-45Q78-6 60 47", "eg4181-hive-rib companion");
      add(group, "ellipse", { class: "eg4181-hive-door", cx: 17, cy: 50, rx: 15, ry: 12 });
      path(group, "M-44-18L-31-26L-18-18V-3L-31 5L-44-3Z", "eg4181-honeycomb companion berry");
      path(group, "M-14-30L-1-38L12-30V-15L-1-7L-14-15Z", "eg4181-honeycomb companion aqua");
      path(group, "M-56-34Q-90 1-65 53M55-38Q86-5 65 47", "eg4181-harness companion");
      path(group, "M-19-78Q-1-102 21-78", "eg4181-handle companion");
      bee(group, 78, -25, .72, false);
    } else {
      add(group, "ellipse", { class: "eg4181-object-shadow", cx: 2, cy: 122, rx: 126, ry: 17 });
      path(group, "M-111 55Q-89 99 2 113Q89 101 112 49L99 87Q3 139-100 91Z", "eg4181-saddle-cloth");
      path(group, "M-96-47Q-74-104-13-116Q55-112 92-55L103 70Q68 106 2 113Q-67 103-105 67Z", "eg4181-hive-body");
      path(group, "M48-105Q89-87 95-48L103 70Q76 99 38 108Q70 34 48-105Z", "eg4181-hive-side");
      path(group, "M-62-81Q-82-24-68 58", "eg4181-hive-highlight");
      [-65,-29,8,46,76].forEach((y,index) => path(group, `M${-91+index*3} ${y}Q0 ${y+24} ${93-index*3} ${y-2}`, "eg4181-hive-wicker"));
      path(group, "M-57-82Q0-112 60-83M-79-66Q-126-8-94 69M78-70Q124-10 94 68", "eg4181-hive-rib");
      add(group, "ellipse", { class: "eg4181-hive-door", cx: 28, cy: 78, rx: 24, ry: 18 });
      path(group, "M-55-37L-38-48L-21-37V-18L-38-7L-55-18Z", "eg4181-honeycomb berry");
      path(group, "M-4-54L13-65L30-54V-35L13-24L-4-35Z", "eg4181-honeycomb aqua");
      path(group, "M-29 3L-12-8L5 3V22L-12 33L-29 22Z", "eg4181-honeycomb cream");
      path(group, "M-86-51Q-139 3-99 78M84-55Q136 0 98 74", "eg4181-harness");
      path(group, "M-25-111Q2-147 33-110", "eg4181-handle");
      path(group, "M-90 94Q-44 119 4 123Q52 121 93 91", "eg4181-saddle-stitch");
      path(group, "M22 94Q31 106 39 94Q46 107 54 92", "eg4181-honey-drip");
      bee(group, -113, -35, .86, true);
      bee(group, 121, 3, .92, false);
    }
    return true;
  }

  if (item.family === "eg4181-single-tail-mountain-ski") {
    if (companion) {
      add(group, "ellipse", { class: "eg4181-object-shadow", cx: 1, cy: 65, rx: 134, ry: 11 });
      path(group, "M-133 35Q-56 58 45 43Q92 36 126 4Q122 32 94 52Q-4 79-132 58Z", "eg4181-ski-sidewall companion");
      path(group, "M-132 27Q-57 50 43 36Q91 29 127-1Q120 23 91 43Q-8 68-131 49Z", "eg4181-ski companion");
      path(group, "M-103 39Q-44 51 18 42", "eg4181-ski-inlay companion");
      path(group, "M-44 4Q-13-18 20 2L37 38Q5 49-30 42Z", "eg4181-binding companion");
      path(group, "M-28 8Q-8-4 14 7M-18 22Q1 12 25 22", "eg4181-binding-strap companion");
      path(group, "M55 37L87 12L101 29", "eg4181-ski-peak companion");
      path(group, "M111 15Q126 10 133-2", "eg4181-ski-tip-detail companion");
    } else {
      add(group, "ellipse", { class: "eg4181-object-shadow", cx: 1, cy: 83, rx: 184, ry: 14 });
      path(group, "M-186 44Q-70 79 66 54Q137 40 181-9Q176 34 138 61Q-19 105-184 72Z", "eg4181-ski-sidewall");
      path(group, "M-184 34Q-70 69 64 46Q135 32 182-16Q174 23 135 51Q-23 94-183 61Z", "eg4181-ski");
      path(group, "M-150 52Q-74 70 28 53", "eg4181-ski-inlay");
      path(group, "M-61 3Q-24-30 21-1L51 48Q5 65-47 54Z", "eg4181-binding");
      path(group, "M-39 8Q-13-9 14 5M-28 28Q0 13 34 28", "eg4181-binding-strap");
      path(group, "M80 50L127 11L149 37", "eg4181-ski-peak");
      path(group, "M-168 62Q-148 84-126 64", "eg4181-ski-tail-detail");
      path(group, "M153 18Q176 8 185-15", "eg4181-ski-tip-detail");
    }
    return true;
  }
  return false;
}

function drawClaremontECA250Accessory(group, item, companion) {
  if (!claremontRendererIds.has(item.id)) return false;
  group.dataset.renderer = item.family;
  group.classList.add("claremont-eca250-accessory", companion ? "eca250-companion" : "eca250-primary");

  const pageLines = (parent, paths, companionLine = false) => paths.forEach(d => path(parent, d, companionLine ? "eca250-page-line companion" : "eca250-page-line"));
  const label = (parent, value, x, y, className = "eca250-book-title") => {
    const node = add(parent, "text", { class: className, x, y, "text-anchor": "middle" });
    node.textContent = value;
  };
  const lemonWheel = (parent, cx, cy, radius, companionWheel = false) => {
    add(parent, "circle", { class: companionWheel ? "eca250-lemon-rind companion" : "eca250-lemon-rind", cx, cy, r: radius });
    add(parent, "circle", { class: "eca250-lemon-flesh", cx, cy, r: radius * .75 });
    [0, 60, 120].forEach(angle => {
      const dx = Math.cos(angle * Math.PI / 180) * radius * .68;
      const dy = Math.sin(angle * Math.PI / 180) * radius * .68;
      path(parent, `M${cx-dx} ${cy-dy}L${cx+dx} ${cy+dy}`, "eca250-lemon-segment");
    });
  };
  const iceCube = (parent, x, y, size, angle, companionCube = false) => add(parent, "rect", {
    class: companionCube ? "eca250-ice-cube companion" : "eca250-ice-cube",
    x: x - size / 2,
    y: y - size / 2,
    width: size,
    height: size,
    rx: size * .18,
    transform: `rotate(${angle} ${x} ${y})`
  });
  if (item.family === "eca250-bookworm-book") {
    if (companion) {
      add(group, "ellipse", { class: "eca250-ground-shadow", cx: 5, cy: 107, rx: 83, ry: 13 });
      path(group, "M-83-94L72-68L82 84L-70 106Z", "eca250-book-cover companion standing back");
      path(group, "M-67-82L59-61L67 72L-57 91Z", "eca250-book-page companion standing");
      path(group, "M59-61L72-68L82 84L67 72Z", "eca250-book-block companion standing side");
      path(group, "M-57 91L67 72L82 84L-70 106Z", "eca250-book-block companion standing base");
      path(group, "M-79-95L66-70L74 76L-67 98Z", "eca250-book-cover companion standing front");
      path(group, "M-79-95L-67 98L-91 89L-102-86Z", "eca250-book-spine companion standing");
      path(group, "M-96-66L-75-62M-93-27L-72-24M-89 14L-68 17M-86 56L-65 59", "eca250-spine-band companion");
      path(group, "M-50-57L43-42L48 35L-45 49Z", "eca250-title-panel companion standing");
      path(group, "M-43-49L36-36M-39 40L41 28M-43-49L-39 40M36-36L41 28", "eca250-title-frame companion standing");
      label(group, "BOOKWORM", -1, -17, "eca250-book-title companion standing single");
      add(group, "ellipse", { class: "eca250-worm-seal companion", cx: 0, cy: 20, rx: 37, ry: 23 });
      path(group, "M-25 24Q-14 6 1 19Q15 33 27 13", "eca250-seal-worm companion");
      add(group, "circle", { class: "eca250-seal-worm-head companion", cx: 29, cy: 10, r: 8 });
      path(group, "M-19 21Q-11 12-2 18", "eca250-seal-worm-highlight companion");
      add(group, "circle", { class: "eca250-seal-worm-eye companion", cx: 32, cy: 7, r: 2 });
      path(group, "M27 15Q31 18 35 14", "eca250-seal-worm-smile companion");
      path(group, "M46-39L64-34L66-7Q55-1 47-7Z", "eca250-book-corner companion top");
      path(group, "M47 42L67 38L69 67L50 69Z", "eca250-book-corner companion bottom");
      path(group, "M13 74L30 103L43 78", "eca250-bookmark companion standing");
    } else {
      add(group, "ellipse", { class: "eca250-ground-shadow book-serious", cx: 2, cy: 124, rx: 192, ry: 20 });
      path(group, "M-194-29Q-113-105-8-48Q93-114 195-39L185 89Q90 48-8 110Q-109 56-188 103Z", "eca250-book-cover open serious");
      path(group, "M-187-24Q-110-93-10-42Q88-102 187-33L177 81Q87 43-8 98Q-105 49-181 92Z", "eca250-book-cover-edge");
      path(group, "M-179-22Q-104-86-11-38L-9 88Q-104 45-174 86Z", "eca250-book-page left serious");
      path(group, "M-9-38Q84-95 179-30L169 79Q79 42-9 88Z", "eca250-book-page right serious");
      path(group, "M-174 86Q-99 52-9 96Q80 53 169 79L163 103Q78 74-9 116Q-102 74-170 108Z", "eca250-book-block serious");
      path(group, "M-174 93Q-101 62-9 105Q80 63 166 91M-170 101Q-100 72-9 112Q78 73 162 99", "eca250-page-edge serious");
      path(group, "M-9-38Q-25 9-9 114Q9 10-9-38Z", "eca250-book-gutter serious");
      path(group, "M-166-18Q-146-39-130-46M-66-51Q-47-43-28-35M-165 78Q-104 46-29 80", "eca250-page-inner-border left");
      path(group, "M11-34Q84-78 163-25M10 79Q80 49 157 75", "eca250-page-inner-border right");
      label(group, "BACTERIA", -98, -13, "eca250-bacteria-heading");
      path(group, "M-128-5Q-98 1-68-7", "eca250-heading-rule");
      add(group, "ellipse", { class: "eca250-petri-shadow", cx: -97, cy: 41, rx: 54, ry: 41 });
      add(group, "ellipse", { class: "eca250-petri-base", cx: -99, cy: 37, rx: 54, ry: 42 });
      add(group, "ellipse", { class: "eca250-petri-rim", cx: -99, cy: 31, rx: 54, ry: 42 });
      add(group, "ellipse", { class: "eca250-petri-glass", cx: -99, cy: 31, rx: 45, ry: 34 });
      path(group, "M-137 34Q-126 11-108 29Q-90 49-67 22", "eca250-petri-clearing");
      add(group, "circle", { class: "eca250-petri-clearing-head", cx: -67, cy: 22, r: 7 });
      add(group, "circle", { class: "eca250-petri-clearing-eye", cx: -64, cy: 19, r: 1.7 });
      path(group, "M-137 9Q-116-4-91 2", "eca250-petri-highlight");
      [[-131,14],[-108,10],[-81,16],[-130,53],[-102,58],[-75,46],[-104,37]].forEach(([cx, cy], index) => add(group, "circle", { class: index === 0 || index === 4 ? "eca250-bacterial-colony large" : "eca250-bacterial-colony", cx, cy, r: index === 0 || index === 4 ? 4.8 : 3.4 }));

      add(group, "rect", { class: "eca250-food-bacterium rod page", x: 29, y: -19, width: 35, height: 14, rx: 7, transform: "rotate(-10 46 -12)" });
      path(group, "M46-19L48-5", "eca250-food-bacterium-detail page");
      path(group, "M82-12Q91-23 100-12Q109-1 118-12", "eca250-food-bacterium spiral page");
      [[141,-18],[153,-13],[141,-5],[153,0]].forEach(([cx, cy]) => add(group, "circle", { class: "eca250-food-bacterium coccus page", cx, cy, r: 5 }));
      path(group, "M24 18Q90 6 158 15", "eca250-page-divider");

      path(group, "M30 69Q48 39 72 55Q94 72 116 52Q135 35 151 47", "eca250-reading-worm-body");
      path(group, "M34 64Q50 47 69 59Q92 73 113 54", "eca250-reading-worm-highlight");
      add(group, "ellipse", { class: "eca250-reading-worm-head", cx: 157, cy: 47, rx: 15, ry: 14, transform: "rotate(-8 157 47)" });
      add(group, "circle", { class: "eca250-reading-worm-eye", cx: 161, cy: 42, r: 3 });
      path(group, "M154 52Q159 56 164 51", "eca250-reading-worm-smile");
      path(group, "M-9-36V114", "eca250-book-spine serious");
      path(group, "M-3 96L8 125L20 99L13 94Z", "eca250-bookmark serious");
      path(group, "M-178-20Q-153-49-127-39M157-18Q134-42 112-31", "eca250-book-corner serious");
    }
    return true;
  }

  if (item.family === "eca250-california-lemonade") {
    if (companion) {
      add(group, "ellipse", { class: "eca250-ground-shadow", cx: 3, cy: 88, rx: 68, ry: 11 });
      path(group, "M47-28Q91-31 91 13Q91 57 49 56", "eca250-glass-handle-outer companion");
      path(group, "M49-18Q77-20 76 14Q75 43 50 44", "eca250-glass-handle-inner companion");
      path(group, "M-58-48Q-3-61 56-47L48 69Q0 84-49 68Z", "eca250-lemonade-glass companion");
      path(group, "M-51 1Q0-10 51 1L47 66Q0 79-45 66Z", "eca250-lemonade-liquid companion");
      add(group, "ellipse", { class: "eca250-liquid-surface companion", cx: 0, cy: 1, rx: 51, ry: 12 });
      iceCube(group, -28, -20, 24, -12, true);
      iceCube(group, 0, -24, 22, 17, true);
      iceCube(group, 27, -17, 23, -8, true);
      path(group, "M25-50L63-96", "eca250-straw-outline companion");
      path(group, "M25-50L63-96", "eca250-straw companion");
      add(group, "ellipse", { class: "eca250-glass-rim companion back", cx: -1, cy: -48, rx: 59, ry: 14 });
      path(group, "M-60-48Q-2-29 57-47", "eca250-glass-rim-front companion");
      lemonWheel(group, -28, 18, 18, true);
      path(group, "M-39-35Q-49 6-40 50", "eca250-glass-highlight companion");
      path(group, "M-44 68Q1 81 47 66", "eca250-glass-base companion");
      [[-63,11],[-61,35],[59,31],[54,51]].forEach(([cx,cy], index) => add(group, "circle", { class: "eca250-condensation companion", cx, cy, r: index % 2 ? 2.8 : 3.5 }));
      [[18,31],[29,43],[-4,48]].forEach(([cx,cy], index) => add(group, "circle", { class: "eca250-lemon-bubble companion", cx, cy, r: 2.5 + index * .4 }));
    } else {
      add(group, "ellipse", { class: "eca250-ground-shadow", cx: 8, cy: 119, rx: 101, ry: 15 });
      path(group, "M67-59Q132-59 134 17Q136 86 64 83", "eca250-glass-handle-outer");
      path(group, "M76-42Q112-44 113 17Q114 63 66 66", "eca250-glass-handle-inner");
      path(group, "M-82-76Q-15-96 69-70L62 91Q-5 115-72 89Z", "eca250-lemonade-pitcher");
      path(group, "M-74-8Q-7-30 64-7L60 87Q-5 108-66 86Z", "eca250-lemonade-liquid");
      add(group, "ellipse", { class: "eca250-liquid-surface", cx: -5, cy: -8, rx: 69, ry: 16 });
      iceCube(group, -45, -45, 31, 14);
      iceCube(group, -10, -53, 29, -11);
      iceCube(group, 24, -45, 32, 18);
      iceCube(group, 51, -32, 25, -7);
      path(group, "M17-78L77-142", "eca250-straw-outline");
      path(group, "M17-78L77-142", "eca250-straw");
      add(group, "ellipse", { class: "eca250-glass-rim back", cx: -6, cy: -76, rx: 78, ry: 19 });
      path(group, "M-84-76Q-8-48 71-70", "eca250-pitcher-spout");
      path(group, "M-84-76Q-10-50 72-70", "eca250-glass-rim-front");
      lemonWheel(group, -39, 28, 26);
      lemonWheel(group, 33, 48, 21);
      path(group, "M-57-59Q-72 3-56 70", "eca250-glass-highlight");
      path(group, "M-68 89Q-5 110 61 87", "eca250-glass-base");
      [[-90,-22],[-89,8],[-85,39],[78,3],[76,38],[70,64]].forEach(([cx,cy], index) => add(group, "circle", { class: "eca250-condensation", cx, cy, r: index % 2 ? 3.5 : 4.5 }));
      [[-5,30],[15,18],[22,68],[-23,70],[47,9]].forEach(([cx,cy], index) => add(group, "circle", { class: "eca250-lemon-bubble", cx, cy, r: 2.8 + (index % 2) }));
    }
    return true;
  }

  if (item.family === "eca250-sunny-reading-glasses") {
    if (companion) {
      path(group, "M-48-5Q-46-31-22-35Q3-34 6-7Q8 19-18 22Q-44 21-48-5Z", "eca250-glasses-lens companion left");
      path(group, "M0 2Q4-24 27-24Q51-19 49 7Q46 32 23 30Q-2 27 0 2Z", "eca250-glasses-lens companion right");
      path(group, "M-48-5Q-46-31-22-35Q3-34 6-7Q8 19-18 22Q-44 21-48-5ZM0 2Q4-24 27-24Q51-19 49 7Q46 32 23 30Q-2 27 0 2Z", "eca250-glasses-rim companion");
      path(group, "M5-9Q1-2 0 4", "eca250-glasses-bridge companion");
      path(group, "M-47-23L-77-34M48-10L74-17", "eca250-glasses-temple companion");
      add(group, "circle", { class: "eca250-glasses-hinge companion", cx: -47, cy: -23, r: 5 });
      add(group, "circle", { class: "eca250-glasses-hinge companion", cx: 48, cy: -10, r: 5 });
      path(group, "M-32-25Q-23-31-15-25M14-15Q23-21 31-15", "eca250-lens-glint companion");
      path(group, "M-2-5Q-1 3-1 8M5-4Q4 4 4 9", "eca250-nose-pad companion");
    } else {
      path(group, "M-105-11Q-105-51-72-59Q-35-61-25-21Q-19 21-57 31Q-96 35-105-11Z", "eca250-glasses-lens left");
      path(group, "M-25 17Q-14-23 24-17Q59-8 52 32Q44 70 7 66Q-31 57-25 17Z", "eca250-glasses-lens right");
      path(group, "M-105-11Q-105-51-72-59Q-35-61-25-21Q-19 21-57 31Q-96 35-105-11ZM-25 17Q-14-23 24-17Q59-8 52 32Q44 70 7 66Q-31 57-25 17Z", "eca250-glasses-rim");
      path(group, "M-27-19Q-13-5-24 19", "eca250-glasses-bridge");
      path(group, "M-103-39L-151-54M51 3L92 6", "eca250-glasses-temple");
      add(group, "circle", { class: "eca250-glasses-hinge", cx: -104, cy: -39, r: 6 });
      add(group, "circle", { class: "eca250-glasses-hinge", cx: 51, cy: 3, r: 6 });
      path(group, "M-79-45Q-64-54-50-43M-2-10Q13-17 27-3", "eca250-lens-glint");
      path(group, "M-32-14Q-28-3-26 5M-19 12Q-15 24-13 31", "eca250-nose-pad");
      path(group, "M-31-26Q-19-36-8-22", "eca250-glasses-bridge-detail");
    }
    return true;
  }
  return false;
}

function drawTaipeiBRC20390Accessory(group, item, companion) {
  if (!taipeiBRC20390RendererIds.has(item.id)) return false;
  group.dataset.renderer = item.family;
  group.classList.add("taipei-brc20390-accessory", companion ? "brc20390-companion" : "brc20390-primary");
  const text = (value, x, y, className = "brc20390-label") => {
    const node = add(group, "text", { class: className, x, y, "text-anchor": "middle" });
    node.textContent = value;
  };
  if (item.family === "brc20390-two-photo-provenance-viewer") {
    if (companion) {
      path(group, "M-67-31Q0-91 67-31", "brc20390-camera-strap");
      add(group, "rect", { class: "brc20390-camera-body", x: -71, y: -37, width: 142, height: 88, rx: 16 });
      path(group, "M-39-37L-21-59H22L40-37Z", "brc20390-camera-prism");
      add(group, "circle", { class: "brc20390-camera-lens", cx: 9, cy: 8, r: 31 });
      add(group, "circle", { class: "brc20390-camera-glass", cx: 9, cy: 8, r: 19 });
      add(group, "rect", { class: "brc20390-camera-flash", x: -53, y: -20, width: 21, height: 16, rx: 3 });
      path(group, "M50-30H76V42H50Z", "brc20390-camera-grip");
      add(group, "circle", { class: "brc20390-camera-button", cx: 56, cy: -29, r: 5 });
    } else {
      path(group, "M-94-38Q0-122 94-38", "brc20390-camera-strap");
      path(group, "M-112-48H-56L-35-72H38L59-48H112V68H-112Z", "brc20390-camera-body");
      path(group, "M-40-48L-18-82H27L49-48Z", "brc20390-camera-prism");
      add(group, "circle", { class: "brc20390-camera-lens", cx: 9, cy: 10, r: 43 });
      add(group, "circle", { class: "brc20390-camera-glass", cx: 9, cy: 10, r: 27 });
      add(group, "rect", { class: "brc20390-camera-flash", x: -88, y: -25, width: 31, height: 23, rx: 4 });
      path(group, "M78-37H121V58H78Z", "brc20390-camera-grip");
      add(group, "circle", { class: "brc20390-camera-button", cx: 91, cy: -40, r: 7 });
      path(group, "M-76 69H76L69 88H-69Z", "brc20390-photo-tab");
      text("2 PHOTOS", 0, 83, "brc20390-small-label");
    }
    return true;
  }

  if (item.family === "brc20390-eleven-strain-isotype-constellation") {
    if (companion) {
      path(group, "M-82-48H82V63H-82Z", "brc20390-sample-case");
      path(group, "M-69-64H69L82-48H-82Z", "brc20390-case-handle");
      [[-55,-25],[-27,-25],[1,-25],[29,-25],[57,-25],[-55,18],[-27,18],[1,18],[29,18],[57,18],[1,55]].forEach(([cx,cy],index)=>{
        add(group,"rect",{class:index===10?"brc20390-vial reference":"brc20390-vial",x:cx-9,y:cy-15,width:18,height:31,rx:6});
        add(group,"rect",{class:"brc20390-vial-cap",x:cx-10,y:cy-18,width:20,height:7,rx:2});
      });
      add(group, "circle", { class: "brc20390-count-badge", cx: 66, cy: 60, r: 20 });
      text("11", 66, 67, "brc20390-node-number");
    } else {
      path(group, "M-126-64H126V75H-126Z", "brc20390-sample-case");
      path(group, "M-92-82H92L111-64H-111Z", "brc20390-case-handle");
      [[-96,-30],[-58,-30],[-20,-30],[18,-30],[56,-30],[94,-30],[-77,27],[-39,27],[-1,27],[37,27],[75,27]].forEach(([cx,cy],index)=>{
        add(group,"rect",{class:index===8?"brc20390-vial reference":"brc20390-vial",x:cx-12,y:cy-22,width:24,height:44,rx:8});
        add(group,"rect",{class:"brc20390-vial-cap",x:cx-13,y:cy-27,width:26,height:9,rx:3});
      });
      add(group, "circle", { class: "brc20390-count-badge", cx: 103, cy: 69, r: 27 });
      text("11", 103, 77, "brc20390-node-number");
    }
    return true;
  }

  if (item.family === "taipei-174m-forest-record-inclinometer") {
    if (companion) {
      path(group, "M-34-83H34V-57H-34ZM-34 57H34V83H-34Z", "brc20390-altimeter-strap");
      add(group, "circle", { class: "brc20390-altimeter-case", cx: 0, cy: 0, r: 62 });
      add(group, "circle", { class: "brc20390-altimeter-face", cx: 0, cy: 0, r: 47 });
      [-120,-60,0,60,120].forEach(angle=>add(group,"line",{class:"brc20390-altimeter-tick",x1:0,y1:-39,x2:0,y2:-48,transform:`rotate(${angle})`}));
      line(group, "M0 4L26-25", "brc20390-altimeter-hand");
      text("174", 0, 18, "brc20390-altimeter-number");
      text("m", 0, 36, "brc20390-small-label");
    } else {
      path(group, "M-48-111H48V-76H-48ZM-48 77H48V112H-48Z", "brc20390-altimeter-strap");
      add(group, "circle", { class: "brc20390-altimeter-case", cx: 0, cy: 0, r: 84 });
      add(group, "circle", { class: "brc20390-altimeter-face", cx: 0, cy: 0, r: 64 });
      [-150,-120,-90,-60,-30,0,30,60,90,120,150].forEach(angle=>add(group,"line",{class:"brc20390-altimeter-tick",x1:0,y1:-54,x2:0,y2:-65,transform:`rotate(${angle})`}));
      line(group, "M0 5L39-38", "brc20390-altimeter-hand");
      text("174", 0, 22, "brc20390-altimeter-number");
      text("metres", 0, 48, "brc20390-small-label");
      path(group, "M-91 0L-73-14V14Z", "brc20390-altimeter-crown");
    }
    return true;
  }
  return false;
}

function drawLombokHPT26Accessory(group, item, companion) {
  if (!lombokHPT26RendererIds.has(item.id)) return false;
  group.dataset.renderer = item.family;
  group.classList.add("lombok-hpt26-accessory", companion ? "hpt26-companion" : "hpt26-primary");
  const drop = (parent, x, y, size) => {
    const bead = add(parent, "g", { transform: `translate(${x} ${y}) scale(${size})` });
    path(bead, "M0-7C-2-3-5 0-5 3A5 5 0 0 0 5 3C5 0 2-3 0-7Z", "lingsar-drop");
    line(bead, "M-2 1Q-4 4-1 5", "lingsar-glint");
  };

  if (item.family === "lingsar-spring-collar") {
    // Draw the near-side band as a curved cuff across the neck.
    if (companion) {
      path(group, "M-11-4Q-1-8 11-3L10 3Q0 7-11 2Z", "lingsar-collar-band");
      line(group, "M-10-3Q0 0 10-2M-9 2Q0 5 9 2", "lingsar-gold-edge");
      path(group, "M-3-1Q0-4 3-1L2 3H-2Z", "lingsar-enamel");
      line(group, "M0 4V7", "lingsar-chain");
      drop(group, 0, 10, .53);
      add(group, "circle", { class: "lingsar-rivet", cx: -7, cy: 0, r: .8 });
      add(group, "circle", { class: "lingsar-rivet", cx: 7, cy: 0, r: .8 });
    } else {
      path(group, "M-26-7Q-2-13 26-6L24 6Q1 15-25 5Z", "lingsar-collar-band");
      path(group, "M-22-4Q1 1 22-3L21 4Q0 11-22 3Z", "lingsar-enamel");
      line(group, "M-25-6Q0 1 25-5M-24 5Q0 14 23 6", "lingsar-gold-edge");
      path(group, "M-5-2Q0-7 5-2L4 6Q0 9-4 5Z", "lingsar-clasp");
      line(group, "M-15 7V11M0 9V15M15 7V11", "lingsar-chain");
      drop(group, -15, 14, .65);
      drop(group, 0, 20, .92);
      drop(group, 15, 14, .65);
      [-20,-10,10,20].forEach(x => add(group, "circle", { class: "lingsar-rivet", cx: x, cy: 2, r: 1 }));
    }
    return true;
  }

  if (item.family === "lingsar-springwater-current") {
    if (companion) {
      path(group, "M-44 3Q-53-5-38-11Q-19-17 5-9Q27 0 32-17Q35-28 23-30Q35-39 43-25Q54-4 35 9Q9 22-22 15Q-44 13-44 3Z", "lingsar-water");
      path(group, "M-36 1Q-18-7 9 0Q26 5 33-9M-30 9Q-9 16 17 10", "lingsar-water-highlight");
      path(group, "M-19 2Q0-2 13 5Q0 11-16 7", "lingsar-water-ripple");
      line(group, "M38-26Q47-13 35-2", "lingsar-foam");
      drop(group, 27, -39, .54);
      drop(group, -40, -17, .36);
    } else {
      path(group, "M-95 1C-110-16-61-28-18-19C21-11 50-12 64-34C71-47 62-53 55-52C70-69 94-55 91-33C89-15 71-7 62-1C83 0 98 5 97 14C87 33 16 36-37 27C-72 21-88 16-95 1Z", "lingsar-water");
      path(group, "M-85-3C-52-17-21-10 5-5C33 2 66-7 77-29", "lingsar-water-highlight");
      path(group, "M-78 9Q-36 32 27 24Q65 22 82 13", "lingsar-water-highlight");
      path(group, "M-48 2C-25-7 21-4 32 7C35 17-5 21-29 11C-40 5-12 1 3 6", "lingsar-water-ripple");
      path(group, "M69-52Q91-43 77-23M-80 1L-62 5M54 18L66 14", "lingsar-foam");
      drop(group, 53, -63, .85);
      drop(group, 88, -66, .52);
      drop(group, -87, -20, .55);
    }
    return true;
  }

  if (item.family === "lingsar-ficus-fruit-transformation") {
    const seed = (parent, x, y, angle, size = 1) => {
      add(parent, "ellipse", { class: "lingsar-fig-seed", cx: x, cy: y, rx: 1.5 * size, ry: 3 * size, transform: `rotate(${angle} ${x} ${y})` });
    };
    const left = add(group, "g", { class: "lingsar-fig-opening left" });
    const right = add(group, "g", { class: "lingsar-fig-opening right" });
    if (companion) {
      // A narrow side-cut fruit, with its far half turned away.
      path(left, "M-28-62C-64-61-94-25-87 14C-82 46-50 65-6 64C-30 43-39 18-33-9C-29-27-22-44-28-62Z", "lingsar-fig-skin");
      path(left, "M-35-49C-62-43-81-15-75 12C-70 35-51 48-23 53C-41 30-47 7-40-15C-36-29-33-41-35-49Z", "lingsar-fig-pith");
      path(left, "M-40-40C-63-28-72-5-64 19C-58 31-48 40-34 44C-50 21-52 2-46-18Z", "lingsar-fig-flesh");
      path(left, "M-27-61Q-22-77-14-81L-10-75Q-20-67-20-57", "lingsar-fig-stem");
      path(right, "M30-45C54-42 79-15 73 16C68 40 41 55 8 64C30 40 41 19 36-6Z", "lingsar-fig-skin far");
      path(right, "M39-34C61-20 67-1 60 17Q48 36 25 49C42 27 48 6 39-34Z", "lingsar-fig-pith");
      path(right, "M46-22Q66 9 36 36Q53 12 46-22Z", "lingsar-fig-flesh");
      [[-54,-22,25],[-63,-3,12],[-59,16,-30],[-46,32,-48],[54,3,4],[45,24,30]].forEach(([x,y,a]) => seed(x < 0 ? left : right,x,y,a,1.1));
    } else {
      path(left, "M-33-81C-69-79-105-43-102 1C-101 44-65 74-5 75C-31 46-44 21-38-12C-35-39-26-61-33-81Z", "lingsar-fig-skin");
      path(left, "M-42-66C-70-60-93-31-90 0C-88 31-63 55-24 62C-47 30-52 14-48-13C-44-36-39-53-42-66Z", "lingsar-fig-pith");
      path(left, "M-48-56C-76-45-85-18-80 6C-75 29-60 42-39 48C-55 23-61 7-57-14Z", "lingsar-fig-flesh");
      path(left, "M-33-80Q-36-98-20-106L-15-99Q-25-90-25-78Z", "lingsar-fig-stem");
      path(right, "M32-70C69-65 100-31 97 7C93 46 57 70 5 75C31 44 43 14 37-12C32-36 24-51 32-70Z", "lingsar-fig-skin");
      path(right, "M41-56C69-46 88-22 84 8C79 36 58 50 24 62C46 30 53 10 48-14Z", "lingsar-fig-pith");
      path(right, "M48-45C75-31 81-7 70 16C63 30 53 39 40 44C58 16 61-2 48-45Z", "lingsar-fig-flesh");
      [[-61,-37,24],[-73,-20,13],[-74,0,-12],[-68,17,-29],[-53,33,-43],[-54,-13,4],[-60,8,-19],[59,-24,-20],[69,-7,3],[64,12,24],[54,28,36],[58,0,6]].forEach(([x,y,a]) => seed(x < 0 ? left : right,x,y,a));
      line(left, "M-89-32Q-102 0-79 30", "lingsar-fig-bloom");
      line(right, "M85-15Q94 13 70 35", "lingsar-fig-bloom");
    }
    path(group, "M-8 71Q0 67 8 71L5 79H-5Z", "lingsar-fig-stem");
    return true;
  }
  return false;
}

function drawHCMCJU4356Accessory(group, item, companion) {
  if (!hcmcJU4356RendererIds.has(item.id)) return false;
  group.dataset.renderer = item.family;
  group.classList.add("hcmc-ju4356-accessory", companion ? "ju4356-companion" : "ju4356-primary");
  const text = (value, x, y, className = "ju4356-label") => {
    const node = add(group, "text", { class: className, x, y, "text-anchor": "middle" });
    node.textContent = value;
  };
  const carambola = (parent, transform, upright = false) => {
    const fruit = add(parent, "g", { class: "ju4356-carambola", transform });
    path(fruit, upright
      ? "M0-63Q13-48 10-23L27-7L12 10Q15 40 0 62Q-15 40-12 10L-27-7L-10-23Q-13-48 0-63Z"
      : "M-74 0Q-57-15-38-12L-18-29L0-14L22-30L39-12Q59-15 75 0Q59 15 39 12L20 30L0 14L-20 29L-39 12Q-58 15-74 0Z", "ju4356-fruit-rind");
    const ribs = upright
      ? ["M0-56V54", "M-9-45Q-1-9-8 42", "M9-45Q1-9 8 42", "M-20-6Q-5 4-12 28", "M20-6Q5 4 12 28"]
      : ["M-66 0H67", "M-53-9Q0-2 54-9", "M-53 9Q0 2 54 9", "M-29-21Q0-8 30-22", "M-29 21Q0 8 30 22"];
    ribs.forEach((d, index) => line(fruit, d, index === 0 ? "ju4356-fruit-rib strong" : "ju4356-fruit-rib"));
    path(fruit, upright ? "M-14 18Q0 7 14 18Q5 44-8 38Z" : "M13-11Q31-5 43 6Q29 17 8 12Z", "ju4356-softened-patch");
    return fruit;
  };

  if (item.family === "ju4356-carambola-ground-contact-stage") {
    if (companion) {
      path(group, "M-43-84H38L48 73H-51Z", "ju4356-rib-frame");
      carambola(group, "translate(-4 -12) scale(.67)", true);
      path(group, "M-32 39H26L19 68H-39Z", "ju4356-ground-drawer");
      [[-21, 52], [-5, 57], [11, 50]].forEach(([cx, cy], index) => add(group, "circle", { class: index % 2 ? "ju4356-ground-grain accent" : "ju4356-ground-grain", cx, cy, r: 4 }));
      add(group, "rect", { class: "ju4356-culture-vial", x: 42, y: 1, width: 19, height: 44, rx: 7 });
      line(group, "M44 5H59", "ju4356-vial-cap");
      path(group, "M-68-57H-47V42H-68Z", "ju4356-alias-tab");
      text("HCM1", -57, 4, "ju4356-small-label", "middle");
      text("JU4356", 1, 86, "ju4356-small-label");
    } else {
      path(group, "M-109 24H105L97 70H-105Z", "ju4356-contact-tray");
      path(group, "M-84 9Q0-17 84 8L73 45Q0 22-74 47Z", "ju4356-five-rib-cradle");
      carambola(group, "translate(-12 1) scale(.75)", false);
      path(group, "M49-55H104V-19H49Z", "ju4356-sample-shutter");
      line(group, "M49-19L35 7M103-19L84 7", "ju4356-hinge");
      path(group, "M-74 67H72L64 92H-81Z", "ju4356-flipplate");
      text("HCM1 / JU4356", -4, 84, "ju4356-small-label");
      [[-71, 49], [-45, 55], [-18, 47], [13, 54], [42, 48], [69, 54]].forEach(([cx, cy], index) => add(group, "circle", { class: index % 2 ? "ju4356-ground-grain accent" : "ju4356-ground-grain", cx, cy, r: 4 }));
    }
    return true;
  }

  if (item.family === "ju4356-its2-ribbon-reader") {
    if (companion) {
      path(group, "M-37-84H31L43 72H-46Z", "ju4356-spool-tower");
      [-58, -20, 18].forEach((y, index) => path(group, `M${index % 2 ? -17 : -27} ${y}H${index % 2 ? 30 : 20}V${y + 25}H${index % 2 ? -17 : -27}Z`, "ju4356-ribbon-window"));
      path(group, "M-6-70H15V46H-6Z", "ju4356-ribbon");
      [-57, -42, -27, -12, 3, 18, 33].forEach(y => line(group, `M-2 ${y}H11`, "ju4356-registration-mark"));
      add(group, "circle", { class: "ju4356-side-dial", cx: 49, cy: -44, r: 19 });
      line(group, "M49-44L59-55", "ju4356-dial-hand");
      add(group, "circle", { class: "ju4356-catch-reel", cx: 5, cy: 58, r: 20 });
      line(group, "M-15 58H25M5 38V78", "ju4356-reel-spoke");
      text("ITS2", 5, 8, "ju4356-small-label");
    } else {
      path(group, "M-108 18H104V64H-108Z", "ju4356-reader-bed");
      [-77, 76].forEach(cx => {
        add(group, "circle", { class: "ju4356-ribbon-reel", cx, cy: -17, r: 34 });
        add(group, "circle", { class: "ju4356-reel-hub", cx, cy: -17, r: 9 });
        line(group, `M${cx-28}-17H${cx+28}M${cx}-45V11`, "ju4356-reel-spoke");
      });
      path(group, "M-43-30H43V29H-43Z", "ju4356-its2-aperture");
      path(group, "M-69-17H-43M43-17H42M-43 15H43", "ju4356-ribbon");
      [-31, -19, -7, 7, 19, 31].forEach(x => line(group, `M${x}-8V9`, "ju4356-registration-mark"));
      text("ITS2", 0, -1, "ju4356-label");
      path(group, "M17-39H64V13H17Z", "ju4356-uncertainty-shutter");
      text("?", 40, -5, "ju4356-large-symbol");
      line(group, "M-77 17V40M76 17V40", "ju4356-drive");
    }
    return true;
  }

  if (item.family === "hcmc-urban-canopy-census-engine") {
    if (companion) {
      path(group, "M-35-83H30L43 72H-45Z", "ju4356-caliper-cabinet");
      path(group, "M-13-67H11V49H-13Z", "ju4356-trunk-gauge");
      path(group, "M-57-50H-13M11-38H58M-48-20H-13M11-7H49", "ju4356-sliding-arm");
      [-25, 7, 39].forEach((y, index) => path(group, `M${index % 2 ? -24 : -31} ${y}H${index % 2 ? 31 : 24}V${y + 23}H${index % 2 ? -24 : -31}Z`, "ju4356-tag-drawer"));
      add(group, "circle", { class: "ju4356-drawer-pull", cx: 1, cy: -13, r: 4 });
      add(group, "circle", { class: "ju4356-drawer-pull", cx: 3, cy: 19, r: 4 });
      add(group, "circle", { class: "ju4356-drawer-pull", cx: 1, cy: 51, r: 4 });
      path(group, "M30-70H57V50H30Z", "ju4356-path-roll");
      path(group, "M39-60Q53-43 40-25Q52-6 40 12Q53 30 41 45", "ju4356-path-line");
    } else {
      path(group, "M-105 28H103V73H-105Z", "ju4356-census-base");
      path(group, "M-10 29V-40M-10-29L-58-57M-10-18L42-62M-10-2L66-21", "ju4356-crown-branch");
      add(group, "ellipse", { class: "ju4356-canopy-lobe", cx: -69, cy: -55, rx: 39, ry: 28 });
      add(group, "ellipse", { class: "ju4356-canopy-lobe accent", cx: 40, cy: -61, rx: 51, ry: 32 });
      add(group, "ellipse", { class: "ju4356-canopy-lobe deep", cx: 75, cy: -18, rx: 34, ry: 25 });
      path(group, "M-87 42Q-47 15-13 45Q22 70 56 41Q76 25 93 44M-84 57Q-47 42-13 61Q22 80 58 58", "ju4356-path-grid");
      [-78, -24, 31, 78].forEach((x, index) => path(group, `M${x-11} ${index % 2 ? 35 : 25}H${x+11}V${index % 2 ? 49 : 39}H${x-11}Z`, "ju4356-blank-tag"));
      add(group, "circle", { class: "ju4356-crown-counter", cx: -10, cy: 8, r: 18 });
      line(group, "M-10-7V23M-25 8H5", "ju4356-counter-spoke");
    }
    return true;
  }

  return false;
}

function drawKauaiQG131Accessory(group, item, companion) {
  if (!kauaiQG131RendererIds.has(item.id)) return false;
  group.dataset.renderer = item.family;
  group.classList.add("kauai-qg131-accessory", companion ? "qg131-companion" : "qg131-primary");
  const text = (value, x, y, className = "qg131-label") => {
    const node = add(group, "text", { class: className, x, y, "text-anchor": "middle" });
    node.textContent = value;
  };
  const fruitCradle = (x, y, scale = 1, angle = 0) => {
    const fruit = add(group, "g", { class: "qg131-fruit-cradle", transform: `translate(${x} ${y}) rotate(${angle}) scale(${scale})` });
    add(fruit, "ellipse", { class: "qg131-cradle-rim", cx: 0, cy: 9, rx: 34, ry: 17 });
    [-18, 0, 18].forEach((cx, index) => path(fruit, `M${cx - 10} 7Q${cx} ${-20 - index * 2} ${cx + 11} 7Q${cx} 20 ${cx - 10} 7Z`, "qg131-fruit-segment"));
    return fruit;
  };

  if (item.family === "qg131-paired-pandanus-key-sorter") {
    if (companion) {
      path(group, "M-34-83H28L42 69H-45Z", "qg131-elevator-frame");
      add(group, "path", { class: "qg131-input-cup", d: "M-57-61H-17L-22-35H-50Z" });
      add(group, "path", { class: "qg131-input-cup", d: "M18-45H59L52-18H24Z" });
      [-23, 8, 38].forEach((y, index) => path(group, `M${index % 2 ? -21 : -30} ${y}H${index % 2 ? 31 : 21}L${index % 2 ? 23 : 14} ${y + 19}H${index % 2 ? -27 : -36}Z`, "qg131-wedge-tray"));
      line(group, "M-20-67L25-48L-22-28L29-8L-18 12L32 32L-14 53", "qg131-chain");
      add(group, "circle", { class: "qg131-counterweight-wheel", cx: 51, cy: -57, r: 17 });
      line(group, "M34-57H51M51-40V15", "qg131-drive");
      path(group, "M-41 50H30L22 77H-47Z", "qg131-receiving-drawer");
      add(group, "rect", { class: "qg131-vial", x: 43, y: 13, width: 18, height: 44, rx: 7 });
      text("2 FRUITS", -3, 70, "qg131-small-label");
    } else {
      path(group, "M-106 17H101V62H-106Z", "qg131-sorter-bench");
      fruitCradle(-55, -13, .82, -8);
      fruitCradle(25, -10, 1.02, 7);
      add(group, "circle", { class: "qg131-index-wheel", cx: -76, cy: 35, r: 17 });
      add(group, "circle", { class: "qg131-index-wheel", cx: 47, cy: 36, r: 21 });
      line(group, "M-76 35L-55 4M47 36L25 8M-59 35H27M27 35L72 4", "qg131-drive");
      path(group, "M-21 7Q7 34 36 8L67 50Q23 66-19 48Z", "qg131-converging-chute");
      path(group, "M-92-49H-48V-24H-92ZM38-54H83V-28H38Z", "qg131-specimen-shutter");
      add(group, "rect", { class: "qg131-vial", x: 82, y: 21, width: 19, height: 44, rx: 7 });
      text("QG131", 91, 49, "qg131-vial-label");
    }
    return true;
  }

  if (item.family === "qg131-four-date-culture-relay") {
    if (companion) {
      path(group, "M-35-84H31L42 72H-45Z", "qg131-escapement-frame");
      [-62, -28, 6, 40].forEach((y, index) => {
        add(group, "circle", { class: index === 3 ? "qg131-date-station terminal" : "qg131-date-station", cx: index % 2 ? 11 : -9, cy: y, r: 17 });
        line(group, `M${index % 2 ? 11 : -9} ${y}L${index % 2 ? 24 : -22} ${y - 8}`, "qg131-date-hand");
      });
      path(group, "M-29-73H12V-50H-29Z", "qg131-agar-gate");
      add(group, "rect", { class: "qg131-tube-capsule", x: 19, y: -39, width: 20, height: 42, rx: 8, transform: "rotate(8 29 -18)" });
      add(group, "ellipse", { class: "qg131-plate-cradle", cx: -11, cy: 20, rx: 28, ry: 13 });
      path(group, "M-31 43H29V70H-31Z", "qg131-freezer-chamber");
      line(group, "M0-67V56", "qg131-drive-shaft");
      add(group, "rect", { class: "qg131-vial", x: 45, y: 22, width: 18, height: 44, rx: 7 });
      [["03", -9, -58], ["08", 11, -24], ["14", -9, 10], ["23", 11, 44]].forEach(([v, x, y]) => text(v, x, y + 4, "qg131-small-label"));
    } else {
      path(group, "M-108 23H103V65H-108Z", "qg131-relay-rail");
      const stations = [
        [-80, "03 AUG", "agar"], [-27, "08 AUG", "tube"], [28, "14 AUG", "plate"], [80, "23 AUG", "freezer"]
      ];
      stations.forEach(([x, date, kind], index) => {
        add(group, "circle", { class: index === 3 ? "qg131-date-station terminal" : "qg131-date-station", cx: x, cy: 20, r: 18 });
        text(date, x, 54, "qg131-small-label");
        if (kind === "agar") add(group, "ellipse", { class: "qg131-agar-cradle", cx: x, cy: -18, rx: 25, ry: 11 });
        if (kind === "tube") add(group, "rect", { class: "qg131-tube-capsule", x: x - 9, y: -39, width: 18, height: 40, rx: 7 });
        if (kind === "plate") {
          add(group, "ellipse", { class: "qg131-plate-cradle", cx: x, cy: -17, rx: 27, ry: 13 });
          text("NGM", x, -14, "qg131-tiny-label");
          text("OP50", x, -5, "qg131-tiny-label");
        }
        if (kind === "freezer") path(group, `M${x - 25}-39H${x + 25}V1H${x - 25}Z`, "qg131-freezer-chamber");
        if (index < stations.length - 1) line(group, `M${x + 18} 20H${stations[index + 1][0] - 18}`, "qg131-chain");
      });
      add(group, "circle", { class: "qg131-handwheel", cx: -104, cy: 20, r: 14 });
      line(group, "M-104 20L-91 8", "qg131-drive");
    }
    return true;
  }

  if (item.family === "qg131-mating-id-motion-theatre") {
    if (companion) {
      path(group, "M-36-83H31L43 71H-46Z", "qg131-viewer-frame");
      path(group, "M-23-65Q17-53-18-31Q-51-10-14 8Q22 27-18 49", "qg131-spiral-track one");
      path(group, "M21-60Q-17-42 24-22Q55-5 18 16Q-13 34 22 54", "qg131-spiral-track two");
      add(group, "circle", { class: "qg131-culture-well", cx: -48, cy: -46, r: 15 });
      add(group, "circle", { class: "qg131-culture-well", cx: 49, cy: -25, r: 15 });
      path(group, "M-28-7H30V23H-28Z", "qg131-observation-window");
      path(group, "M-4 22H24V67H-4Z", "qg131-motion-strip");
      path(group, "M5 30Q19 37 7 45Q19 53 8 61", "qg131-motion-trace");
      path(group, "M-39 52H-5V74H-39Z", "qg131-id-plate");
      text("QG131", -22, 67, "qg131-small-label");
    } else {
      add(group, "ellipse", { class: "qg131-motion-drum", cx: 0, cy: 3, rx: 87, ry: 49 });
      path(group, "M-104-8Q-74-43-43-11Q-18 16 7-2", "qg131-worm-ribbon one");
      path(group, "M105 13Q74 45 43 15Q19-10-8 5", "qg131-worm-ribbon two");
      add(group, "circle", { class: "qg131-drive-gear", cx: -61, cy: 35, r: 17 });
      add(group, "circle", { class: "qg131-drive-gear", cx: 61, cy: 35, r: 17 });
      line(group, "M-61 35L-41 18M61 35L41 18", "qg131-drive");
      path(group, "M-34-25H35V31H-34Z", "qg131-observation-window");
      path(group, "M-29-19H30V25H-29Z", "qg131-id-shutter");
      text("MATING", 0, -2, "qg131-small-label");
      text("ID", 0, 12, "qg131-label");
      add(group, "circle", { class: "qg131-handwheel", cx: 101, cy: 30, r: 14 });
      line(group, "M101 30L116 16", "qg131-drive");
    }
    return true;
  }
  return false;
}

function drawOahuECA789Accessory(group, item, companion) {
  if (!oahuECA789RendererIds.has(item.id)) return false;
  group.dataset.renderer = item.family;
  group.classList.add("oahu-eca789-accessory", companion ? "eca789-companion" : "eca789-primary");
  const text = (value, x, y, className = "eca789-label") => {
    const node = add(group, "text", { class: className, x, y, "text-anchor": "middle" });
    node.textContent = value;
  };

  if (item.family === "eca789-petal-rain-trumpet") {
    if (companion) {
      path(group, "M-76-35Q-34-78 8-49Q32-31 16-3Q-2 28-39 18Z", "eca789-trumpet-petal companion");
      add(group, "ellipse", { class: "eca789-trumpet-bell companion", cx: -57, cy: -30, rx: 25, ry: 36, transform: "rotate(-50 -57 -30)" });
      path(group, "M-40 1H62Q80 1 84 16Q88 32 69 36H-43Z", "eca789-trumpet-body companion");
      [-2,20,41].forEach((x,index)=>{ add(group,"rect",{class:"eca789-valve-casing companion",x:x-6,y:4,width:12,height:34+index*2,rx:4}); path(group,`M${x} 4V-5`,"eca789-trumpet-valve"); add(group,"circle",{class:"eca789-valve-key",cx:x,cy:-8,r:5}); });
      path(group, "M-29 31Q-4 58 20 36Q43 15 61 36Q73 49 64 61", "eca789-trumpet-tube companion");
      path(group, "M76 15H99M99 8V23", "eca789-trumpet-mouthpiece");
      [[-79,12],[-61,24]].forEach(([cx,cy],index)=>path(group,`M${cx} ${cy-7}Q${cx+7} ${cy} ${cx} ${cy+11}Q${cx-7} ${cy} ${cx} ${cy-7}Z`,index?"eca789-rain-note alt":"eca789-rain-note"));
    } else {
      path(group, "M-112-41Q-50-111 17-62Q57-32 31 13Q2 64-54 39Z", "eca789-trumpet-petal");
      add(group, "ellipse", { class: "eca789-trumpet-bell", cx: -83, cy: -35, rx: 37, ry: 54, transform: "rotate(-50 -83 -35)" });
      path(group, "M-58 15H91Q119 15 124 36Q129 59 99 64H-63Z", "eca789-trumpet-body");
      [0,31,62].forEach((x,index)=>{ add(group,"rect",{class:"eca789-valve-casing",x:x-9,y:19,width:18,height:50+index*2,rx:5}); path(group,`M${x} 20V7`,"eca789-trumpet-valve"); add(group,"circle",{class:"eca789-valve-key",cx:x,cy:2,r:7}); });
      path(group, "M-46 58Q-10 99 26 66Q59 36 86 65Q103 83 90 104", "eca789-trumpet-tube");
      path(group, "M113 34H151M151 23V45", "eca789-trumpet-mouthpiece");
      path(group, "M-87-52Q-54-83-17-58M-95-26Q-58-48-24-28", "eca789-petal-vein");
      [[-116,16],[-91,35],[-66,53]].forEach(([cx,cy],index)=>path(group,`M${cx} ${cy-10}Q${cx+10} ${cy} ${cx} ${cy+16}Q${cx-10} ${cy} ${cx} ${cy-10}Z`,index===1?"eca789-rain-note alt":"eca789-rain-note"));
    }
    return true;
  }

  if (item.family === "eca789-raindrop-harp") {
    if (companion) {
      path(group, "M-58 62Q-55-44 12-77Q45-91 62-57Q28-59 10-34Q-8-8-16 62Z", "eca789-harp-frame companion");
      [-34,-16,2,20,38].forEach((x,index)=>path(group,`M${x} ${48-index*9}V${-13-index*10}`,"eca789-harp-string"));
      path(group, "M-66 61Q-5 78 66 57L58 76Q-4 94-60 77Z", "eca789-harp-base companion");
      [[-34,-19],[2,-40],[38,-59]].forEach(([cx,cy],index)=>path(group,`M${cx} ${cy-7}Q${cx+7} ${cy} ${cx} ${cy+11}Q${cx-7} ${cy} ${cx} ${cy-7}Z`,index===1?"eca789-harp-drop alt":"eca789-harp-drop"));
    } else {
      path(group, "M-87 88Q-82-64 22-111Q68-131 92-79Q42-82 15-45Q-12-7-25 88Z", "eca789-harp-frame");
      [-60,-35,-10,15,40,65].forEach((x,index)=>path(group,`M${x} ${72-index*12}V${-15-index*14}`,"eca789-harp-string"));
      path(group, "M-98 87Q-8 114 101 81L88 108Q-8 137-91 111Z", "eca789-harp-base");
      [[-60,-21],[-10,-55],[40,-86],[66,-100]].forEach(([cx,cy],index)=>path(group,`M${cx} ${cy-10}Q${cx+10} ${cy} ${cx} ${cy+16}Q${cx-10} ${cy} ${cx} ${cy-10}Z`,index===1?"eca789-harp-drop alt":"eca789-harp-drop"));
      path(group, "M-74 75Q-55-25-4-62Q44-96 75-78", "eca789-harp-highlight");
    }
    return true;
  }

  if (item.family === "eca789-cacao-key-xylophone") {
    if (companion) {
      path(group, "M-73-37Q-11-59 67-34L76 35Q5 62-76 36Z", "eca789-xylophone-frame companion");
      const companionKeys=[[-52,-35,20,62],[-28,-41,21,68],[-3,-44,22,72],[23,-41,21,66],[48,-34,19,57]];
      companionKeys.forEach(([x,y,w,h],index)=>add(group,"rect",{class:`eca789-cacao-key ${index % 3 === 1 ? "alt" : index % 3 === 2 ? "bright" : ""}`,x,y,width:w,height:h,rx:6,transform:`rotate(${index*2-4} ${x+w/2} ${y+h/2})`}));
      path(group, "M-55 46Q-39 72-22 47Q-6 72 12 47Q30 69 48 44", "eca789-cacao-resonator companion");
      path(group, "M-59-58L-23-30M31-55L59-28", "eca789-mallet companion");
      add(group,"circle",{class:"eca789-mallet-head companion",cx:-64,cy:-62,r:10});
      add(group,"circle",{class:"eca789-mallet-head alt",cx:64,cy:-59,r:9});
    } else {
      path(group, "M-111-55Q-18-88 103-50L116 53Q10 91-116 57Z", "eca789-xylophone-frame");
      const keys=[[-84,-52,29,89],[-52,-62,30,99],[-19,-69,31,108],[15,-67,31,105],[49,-58,29,93],[80,-47,25,78]];
      keys.forEach(([x,y,w,h],index)=>add(group,"rect",{class:`eca789-cacao-key ${index % 3 === 1 ? "alt" : index % 3 === 2 ? "bright" : ""}`,x,y,width:w,height:h,rx:8,transform:`rotate(${index*1.8-4.5} ${x+w/2} ${y+h/2})`}));
      path(group, "M-88 65Q-66 104-42 66Q-17 105 8 67Q34 101 58 63Q80 92 99 56", "eca789-cacao-resonator");
      path(group, "M-95-89L-38-49M42-86L91-48", "eca789-mallet");
      add(group,"circle",{class:"eca789-mallet-head",cx:-102,cy:-95,r:14});
      add(group,"circle",{class:"eca789-mallet-head alt",cx:98,cy:-93,r:13});
      path(group, "M-89 74Q-117 89-102 113Q-78 126-58 104Q-45 88-58 72", "eca789-cacao-pod");
      path(group, "M-92 82Q-79 94-66 81M-100 96Q-81 112-64 94", "eca789-cacao-pod-rib");
    }
    return true;
  }

  if (item.family === "eca789-fallen-flower-decay-chronoscope") {
    if (companion) {
      path(group, "M-36-83H24L38 69H-45Z", "eca789-lift-frame");
      [-57, -23, 11, 43].forEach((y, index) => {
        path(group, `M${index % 2 ? -24 : -32} ${y}Q${index % 2 ? 1 : -5} ${y + 15} ${index % 2 ? 27 : 20} ${y + 2}Q${index % 2 ? 4 : -3} ${y + 29} ${index % 2 ? -24 : -32} ${y}Z`, "eca789-petal-shutter");
      });
      line(group, "M-28-67L25-49L-27-30L29-12L-25 7L31 25L-20 45", "eca789-chain");
      add(group, "circle", { class: "eca789-return-wheel", cx: 48, cy: -51, r: 18 });
      line(group, "M30-51H48M48-33V16", "eca789-drive");
      add(group, "rect", { class: "eca789-vial", x: 40, y: 13, width: 18, height: 43, rx: 7 });
      path(group, "M-42 51H29L22 77H-48Z", "eca789-specimen-drawer");
      add(group, "circle", { class: "eca789-date-dial", cx: -51, cy: -48, r: 20 });
      text("4 AUG", -51, -51, "eca789-small-label");
      text("2017", -51, -42, "eca789-small-label");
    } else {
      add(group, "ellipse", { class: "eca789-clock-shell", cx: 0, cy: -3, rx: 84, ry: 61, transform: "rotate(-6)" });
      const shutters = [
        [-60, -25, -28], [-31, -48, -10], [2, -53, 8], [36, -43, 27],
        [61, -17, 53], [43, 21, 72], [-20, 29, -61]
      ];
      shutters.forEach(([x, y, angle], index) => {
        path(group, `M${x - 18} ${y + 5}Q${x} ${y - 25 - index % 3 * 2} ${x + 19} ${y + 4}Q${x} ${y + 16} ${x - 18} ${y + 5}Z`, "eca789-petal-shutter").setAttribute("transform", `rotate(${angle} ${x} ${y})`);
      });
      [[-31, -6, 17], [1, 13, 22], [34, -7, 14]].forEach(([cx, cy, r], index) => {
        add(group, "circle", { class: index === 1 ? "eca789-gear accent" : "eca789-gear", cx, cy, r });
      });
      line(group, "M-31-6L1 13L34-7M34-7L73 33", "eca789-drive");
      path(group, "M-99 39Q0 21 96 39L81 70Q0 53-83 71Z", "eca789-litter-tray");
      add(group, "rect", { class: "eca789-vial", x: 78, y: -46, width: 19, height: 44, rx: 7 });
      line(group, "M80-39H95", "eca789-vial-cap");
      text("S-05097 / ECA789", 0, 82, "eca789-small-label");
    }
    return true;
  }

  if (item.family === "eca789-paired-microclimate-harmonograph") {
    if (companion) {
      path(group, "M-27-83L19-73L35 72H-41Z", "eca789-tripod-column");
      line(group, "M-17-59L-57 70M11-57L63 67M-4 8L-1 76", "eca789-tripod-leg");
      add(group, "circle", { class: "eca789-contact-bulb", cx: -43, cy: 44, r: 17 });
      add(group, "circle", { class: "eca789-air-bulb", cx: 40, cy: -53, r: 19 });
      line(group, "M-28-28Q-72-16-50 17Q-27 45 2 20Q37-12 63 12Q82 35 52 55", "eca789-hygrometer-coil");
      [-43, -15, 13].forEach((y, index) => {
        path(group, `M-18 ${y}H20V${y + 21}H-18Z`, "eca789-value-window");
        text(index < 2 ? "22.9" : "93.7", 1, y + 14, "eca789-small-label");
      });
      path(group, "M22 22H49V75H22Z", "eca789-trace-strip");
      path(group, "M28 31Q43 38 29 45Q43 52 29 61", "eca789-trace");
    } else {
      path(group, "M-100-39H94L83 51H-92Z", "eca789-console");
      path(group, "M-86-25H-30V17H-86ZM-18-25H39V17H-18Z", "eca789-sensor-window");
      add(group, "circle", { class: "eca789-humidity-dial", cx: 68, cy: -4, r: 25 });
      line(group, "M-58-4L-49-17M10-4L21-14M68-4L78-15", "eca789-needle");
      text("22.9", -58, 10, "eca789-label");
      text("22.9", 10, 10, "eca789-label");
      text("93.7", 68, 10, "eca789-label");
      path(group, "M-80 48L-104 77H-60L-45 48Z", "eca789-ground-shoe");
      path(group, "M-8-40V-76H45V-40M3-68H34M3-58H34M3-48H34", "eca789-air-cage");
      line(group, "M-58 18Q-35 34-9 40M10 18Q-8 34-9 40M68 22Q40 36 17 40", "eca789-stylus");
      add(group, "rect", { class: "eca789-paper-drum", x: -12, y: 35, width: 82, height: 31, rx: 14 });
      path(group, "M0 48Q18 39 35 50Q51 60 63 48", "eca789-trace");
    }
    return true;
  }

  if (item.family === "c0085-field-record-relay") {
    if (companion) {
      path(group, "M-38-82L28-72L39 70L-47 79Z", "eca789-folding-rack");
      path(group, "M-24-62H20V-37H-24Z", "eca789-tag-aperture");
      [[-15, -55], [-4, -48], [9, -58]].forEach(([cx, cy]) => add(group, "rect", { class: "eca789-tag-cell", x: cx, y: cy, width: 5, height: 5 }));
      add(group, "circle", { class: "eca789-field-drum", cx: 22, cy: -9, r: 23 });
      line(group, "M-2-9H45M22-31V13", "eca789-drum-spoke");
      add(group, "ellipse", { class: "eca789-plate-cradle", cx: -10, cy: 43, rx: 31, ry: 15 });
      add(group, "ellipse", { class: "eca789-culture-plate", cx: -10, cy: 38, rx: 24, ry: 10 });
      path(group, "M30-55Q61-28 43 5Q67 31 36 58", "eca789-belt");
      add(group, "circle", { class: "eca789-crank", cx: 51, cy: 26, r: 14 });
      line(group, "M51 26L69 12", "eca789-drive");
      add(group, "rect", { class: "eca789-vial", x: 44, y: 48, width: 18, height: 42, rx: 7 });
      text("S-05097 / ECA789", -2, 93, "eca789-small-label");
    } else {
      path(group, "M-105 18H98V58H-105Z", "eca789-relay-bench");
      path(group, "M-94-45H-43V16H-94Z", "eca789-bag-frame");
      line(group, "M-83-34V4M-67-34V4M-51-34V4", "eca789-bag-rib");
      path(group, "M-23-39H28V12H-23Z", "eca789-data-tile");
      [[-13, -28], [1, -28], [15, -28], [-13, -14], [8, -14], [-1, -1], [15, -1]].forEach(([x, y]) => add(group, "rect", { class: "eca789-tag-cell", x, y, width: 7, height: 7 }));
      add(group, "ellipse", { class: "eca789-plate-cradle", cx: 66, cy: -8, rx: 32, ry: 17 });
      add(group, "ellipse", { class: "eca789-culture-plate", cx: 66, cy: -13, rx: 25, ry: 11 });
      line(group, "M-43-12H-23M28-12H34M-81 18V37H63V9", "eca789-chain");
      [-63, -32, 0, 31, 62].forEach(cx => add(group, "circle", { class: "eca789-chain-link", cx, cy: 37, r: 6 }));
      add(group, "rect", { class: "eca789-vial", x: 87, y: -50, width: 19, height: 44, rx: 7 });
      line(group, "M89-43H104", "eca789-vial-cap");
      path(group, "M-18 58H36V78H-18Z", "eca789-record-plaque");
      text("C-0085", 9, 72, "eca789-label");
    }
    return true;
  }
  return false;
}

function drawGuadeloupeNIC203Accessory(group, item, companion) {
  if (!guadeloupeNIC203RendererIds.has(item.id)) return false;
  group.dataset.renderer = item.family;
  group.classList.add("guadeloupe-nic203-accessory", companion ? "nic203-companion" : "nic203-primary");
  const text = (value, x, y, cls = "nic203-label") => {
    const node = add(group, "text", { class: cls, x, y, "text-anchor": "middle" });
    node.textContent = value;
  };
  if (item.family === "guadeloupe-hummingbird-costume") {
    if (companion) {
      path(group,"M-8-42Q-52-75-76-24Q-50-10-18 7Q-41 14-57 45Q-23 43 2 20Z","gua-hummingbird-wing");
      path(group,"M8-35Q47-63 69-17Q43-7 16 8Q36 18 49 43Q20 39-2 19Z","gua-hummingbird-wing-alt");
      path(group,"M-15-19Q0-32 15-19L18 24Q0 42-18 24Z","gua-hummingbird-mantle");
      path(group,"M-11 10Q0-3 11 10Q0 31-11 10Z","gua-hummingbird-throat");
      path(group,"M-9 25L-23 64L0 48L21 67L10 25Z","gua-hummingbird-tail");
    } else {
      path(group,"M-14-51Q-72-91-108-25Q-68-15-27 12Q-65 24-82 66Q-31 57 5 25Z","gua-hummingbird-wing");
      path(group,"M14-47Q74-86 108-18Q67-12 27 13Q66 25 82 67Q31 58-5 25Z","gua-hummingbird-wing-alt");
      [-73,-50,-28,28,51,74].forEach((x,i)=>path(group,`M${x} ${i<3?-30:-24}Q${x+(x<0?-19:19)} ${i%2?5:15} ${x+(x<0?-7:7)} ${i%2?41:52}`,"gua-hummingbird-feather"));
      path(group,"M-24-28Q0-48 24-28L27 31Q0 53-27 31Z","gua-hummingbird-mantle");
      path(group,"M-17 4Q0-14 17 4Q0 34-17 4Z","gua-hummingbird-throat");
      path(group,"M-15 31L-37 87L0 65L35 89L15 31Z","gua-hummingbird-tail");
    }
    return true;
  }
  if (item.family === "guadeloupe-madras-carnival-crown") {
    if (companion) {
      path(group,"M-47 28Q-38-18-17-42L0-69L16-39Q39-18 48 28Q0 45-47 28Z","gua-madras-crown");
      line(group,"M-40-3H40M-31-27H29M-20 28V-39M4 34V-61M28 29V-26","gua-madras-check");
      path(group,"M-50 25Q0 47 50 25L44 43Q0 61-44 43Z","gua-madras-band");
      add(group,"circle",{class:"gua-crown-jewel",cx:0,cy:35,r:9});
    } else {
      path(group,"M-75 31Q-65-18-35-48L-10-81L9-42L36-72L48-36Q69-9 77 31Q0 55-75 31Z","gua-madras-crown");
      line(group,"M-68 1H69M-57-26H56M-38 34V-45M-7 45V-76M24 42V-55M52 35V-24","gua-madras-check");
      path(group,"M-79 27Q0 60 79 27L70 52Q0 78-70 52Z","gua-madras-band");
      [-36,0,36].forEach((x,i)=>add(group,"circle",{class:i===1?"gua-crown-jewel":"gua-crown-jewel-alt",cx:x,cy:47,r:i===1?11:8}));
    }
    return true;
  }
  if (item.family === "guadeloupe-gwoka-drum") {
    if (companion) {
      path(group,"M-37-54Q0-69 37-54L31 57Q0 76-31 57Z","gua-drum-body");
      path(group,"M-23-57L-18 61Q-8 68-2 66L-5-66Z","gua-drum-stave-alt");
      path(group,"M7-65L5 66Q16 65 23 58L27-57Z","gua-drum-stave-berry");
      add(group,"ellipse",{class:"gua-drum-head",cx:0,cy:-54,rx:38,ry:14});
      add(group,"ellipse",{class:"gua-drum-rim",cx:0,cy:57,rx:31,ry:11});
      [-25,-8,9,26].forEach(x=>line(group,`M${x}-51L${x*.82} 56`,"gua-drum-rope"));
      line(group,"M-37-43Q0-24 35-42M-34 16Q0 35 33 16","gua-drum-rope-cross");
      path(group,"M-35 3Q0 21 34 3","gua-drum-band");
      add(group,"circle",{class:"gua-drum-medallion",cx:0,cy:11,r:8});
      line(group,"M44-61L62-16M49-59L67-19","gua-drum-stick");
    } else {
      path(group,"M-52-49Q0-69 52-49L44 64Q0 88-44 64Z","gua-drum-body");
      path(group,"M-35-57L-29 69Q-16 77-7 77L-10-66Z","gua-drum-stave-alt");
      path(group,"M11-65L8 77Q23 74 34 67L40-56Z","gua-drum-stave-berry");
      add(group,"ellipse",{class:"gua-drum-head",cx:0,cy:-49,rx:53,ry:18});
      add(group,"ellipse",{class:"gua-drum-rim",cx:0,cy:64,rx:44,ry:14});
      [-39,-20,0,20,39].forEach(x=>line(group,`M${x}-46L${x*.82} 63`,"gua-drum-rope"));
      line(group,"M-51-34Q0-10 49-33M-47 7Q0 31 46 7M-45 46Q0 67 44 45","gua-drum-rope-cross");
      path(group,"M-48-4Q0 20 47-4","gua-drum-band");
      add(group,"circle",{class:"gua-drum-medallion",cx:0,cy:9,r:11});
      path(group,"M-66-43Q-87 7-62 54M66-43Q87 7 62 54","gua-drum-harness");
      line(group,"M61-70L87-13M69-67L94-8","gua-drum-stick");
    }
    return true;
  }
  return false;
}

function drawSandaJU1873Accessory(group, item, companion) {
  if (!sandaJU1873RendererIds.has(item.id)) return false;
  group.dataset.renderer = item.family;
  group.classList.add("sanda-ju1873-accessory", companion ? "ju1873-companion" : "ju1873-primary");
  const label = (value, x, y, className = "ju1873-label") => {
    const node = add(group, "text", { class: className, x, y, "text-anchor": "middle" });
    node.textContent = value;
  };

  if (item.family === "ju1873-cacao-specimen-lantern") {
    if (companion) {
      path(group, "M-92 33Q-42-16 19-40Q52-53 84-43Q70-13 39 5Q7 24-45 56L-76 57Z", "ju1873-machete-blade compact");
      path(group, "M-73 38Q-25 1 25-20Q50-31 69-29Q53-10 27 6Q-8 29-50 51", "ju1873-blade-bevel");
      line(group, "M-88 30Q-35-25 24-47Q59-59 88-45", "ju1873-blade-spine");
      path(group, "M-96 30L-73 55L-94 83L-121 62Z", "ju1873-handguard");
      path(group, "M-116 57L-92 78L-126 121Q-137 127-146 116L-153 104Z", "ju1873-machete-handle");
      [-118,-130,-142].forEach((x, index) => line(group, `M${x} ${72 + index * 12}L${x - 18} ${87 + index * 12}`, "ju1873-handle-wrap"));
      path(group, "M-7 48Q24 30 55 44L70 74Q36 99-2 80Z", "ju1873-pod-half");
      [[18,58],[39,53],[51,69],[26,75]].forEach(([cx,cy], index) => add(group, "ellipse", { class: index % 2 ? "ju1873-pod-seed light" : "ju1873-pod-seed", cx, cy, rx: 6, ry: 9, transform: `rotate(${index * 22 - 28} ${cx} ${cy})` }));
    } else {
      path(group, "M-112 22Q-36-48 54-60Q104-67 150-39Q135-4 94 19Q45 48-33 72L-82 67Z", "ju1873-machete-blade");
      path(group, "M-91 25Q-28-23 57-39Q100-47 130-31Q114-10 80 9Q31 37-38 61", "ju1873-blade-bevel");
      line(group, "M-107 18Q-35-57 57-69Q111-75 155-42", "ju1873-blade-spine");
      path(group, "M-119 18L-83 66L-112 91L-146 57Z", "ju1873-handguard");
      path(group, "M-139 52L-107 84L-158 135Q-171 142-184 129L-197 111Z", "ju1873-machete-handle");
      [-143,-158,-173].forEach((x, index) => line(group, `M${x} ${70 + index * 14}L${x - 21} ${90 + index * 14}`, "ju1873-handle-wrap"));
      path(group, "M52 35Q91 9 128 25L145 62Q104 95 58 73Z", "ju1873-pod-half");
      [[78,46],[101,39],[122,49],[88,63],[116,67]].forEach(([cx,cy], index) => add(group, "ellipse", { class: index % 2 ? "ju1873-pod-seed light" : "ju1873-pod-seed", cx, cy, rx: 7, ry: 11, transform: `rotate(${index * 19 - 32} ${cx} ${cy})` }));
      line(group, "M61 72Q99 55 139 61", "ju1873-pod-rib");
    }
    return true;
  }

  if (item.family === "ju1873-balinese-endek-wrap") {
    const clipId = `ju1873-endek-clip-${companion ? "companion" : "primary"}`;
    const defs = add(group, "defs");
    const clip = add(defs, "clipPath", { id: clipId });
    const clothShape = companion
      ? "M-82-43Q-8-65 75-38L68 66Q4 91-72 65Z"
      : "M-116-50Q-7-82 111-45L101 84Q2 118-105 79Z";
    path(clip, clothShape);
    path(group, clothShape, "ju1873-endek-cloth");
    const textile = add(group, "g", { class: "ju1873-endek-weave", "clip-path": `url(#${clipId})` });
    const verticals = companion ? [-60,-34,-8,18,44,68] : [-92,-62,-32,-2,28,58,88];
    verticals.forEach((x,index) => line(textile, `M${x}-69Q${x+8} 7 ${x-3} 103`, index % 2 ? "ju1873-endek-warp accent" : "ju1873-endek-warp"));
    const horizontals = companion ? [-27,1,29,55] : [-31,0,32,65];
    horizontals.forEach((y,index) => path(textile, `M-126 ${y}Q0 ${y+17-(index%2)*8} 126 ${y-1}`, index % 2 ? "ju1873-endek-weft accent" : "ju1873-endek-weft"));
    const motifs = companion
      ? [[-54,-17,.72],[-12,-9,.83],[31,-15,.72],[-34,35,.72],[12,39,.83],[51,27,.64]]
      : [[-79,-21,.78],[-28,-15,.92],[26,-20,.82],[76,-14,.74],[-59,35,.8],[-5,42,.96],[53,34,.83],[87,47,.66]];
    motifs.forEach(([x,y,s],index) => {
      const motif = add(textile, "g", { transform: `translate(${x} ${y}) scale(${s})` });
      path(motif, "M0-18L18 0L0 18L-18 0Z", index % 3 === 1 ? "ju1873-endek-diamond berry" : "ju1873-endek-diamond");
      path(motif, "M0-9L9 0L0 9L-9 0Z", index % 2 ? "ju1873-endek-diamond-core aqua" : "ju1873-endek-diamond-core");
      add(motif, "circle", { class: "ju1873-endek-knot", cx: 0, cy: 0, r: 3.5 });
    });
    path(group, companion ? "M-82-42Q-8-65 75-38L73-20Q-5-43-80-24Z" : "M-116-50Q-7-82 111-45L109-24Q-5-52-114-27Z", "ju1873-endek-waistband");
    path(group, companion ? "M-73 64Q4 88 68 65L66 78Q4 102-75 77Z" : "M-105 78Q2 113 101 83L98 99Q2 132-108 94Z", "ju1873-endek-border");
    const fringeXs = companion ? [-63,-43,-23,-3,17,37,57] : [-94,-69,-44,-19,6,31,56,81];
    fringeXs.forEach((x,index) => line(group, `M${x} ${companion ? 73 + Math.abs(x)*.04 : 91 + Math.abs(x)*.025}L${x + (index%2 ? 3 : -2)} ${companion ? 88 + Math.abs(x)*.025 : 109 + Math.abs(x)*.02}`, "ju1873-endek-fringe"));
    path(group, companion ? "M-62-29Q-37 21-47 63M48-24Q30 21 40 66" : "M-87-34Q-58 18-70 73M73-29Q48 20 61 79", "ju1873-endek-fold");
    return true;
  }

  if (item.family === "ju1873-balinese-gamelan-gong") {
    if (companion) {
      path(group, "M-84 75H-54L-47-68Q0-106 49-68L57 75H86L78 96H45L39 73H-40L-46 96H-78Z", "ju1873-gong-frame");
      path(group, "M-50-66Q0-103 51-66L43-47Q0-75-43-47Z", "ju1873-gong-crown");
      path(group, "M-54 72L-43-58Q0-90 45-57L54 72M-74 82H-46M45 82H75", "ju1873-gong-frame-inlay");
      path(group, "M-63-31Q-78-42-83-27Q-76-15-62-18M63-31Q78-42 83-27Q76-15 62-18", "ju1873-gong-carving");
      [[-49,-52],[49,-52],[-55,62],[56,62]].forEach(([cx,cy]) => add(group, "circle", { class: "ju1873-gong-frame-bolt", cx, cy, r: 4.5 }));
      line(group, "M-45-53H45", "ju1873-gong-hanger");
      line(group, "M-25-52V-38M25-52V-38", "ju1873-gong-cord");
      add(group, "circle", { class: "ju1873-gong-disc", cx: 0, cy: 15, r: 54 });
      add(group, "circle", { class: "ju1873-gong-ring", cx: 0, cy: 15, r: 40 });
      path(group, "M-41-10Q-10-33 26-20Q46-9 49 7", "ju1873-gong-sheen");
      [[-30,-2],[-34,27],[-17,47],[21,45],[36,22],[30,-7]].forEach(([cx,cy]) => add(group, "circle", { class: "ju1873-gong-hammer-mark", cx, cy, r: 3 }));
      add(group, "circle", { class: "ju1873-gong-boss", cx: 0, cy: 15, r: 17 });
      line(group, "M80 23L106 70", "ju1873-gong-mallet-shaft");
      add(group, "ellipse", { class: "ju1873-gong-mallet-head", cx: 77, cy: 18, rx: 15, ry: 20, transform: "rotate(-31 77 18)" });
      path(group, "M-64 75H-40L-45 91H-73ZM39 75H65L75 91H44Z", "ju1873-gong-foot");
    } else {
      path(group, "M-122 92H-83L-70-84Q0-137 74-83L86 92H125L112 119H65L57 89H-58L-67 119H-111Z", "ju1873-gong-frame");
      path(group, "M-77-82Q0-139 78-81L66-56Q0-99-64-56Z", "ju1873-gong-crown");
      path(group, "M-73 88L-61-72Q0-119 65-70L76 88M-108 104H-67M65 104H109", "ju1873-gong-frame-inlay");
      path(group, "M-89-43Q-113-57-119-34Q-108-13-87-23M89-43Q113-57 119-34Q108-13 87-23", "ju1873-gong-carving");
      [[-72,-69],[73,-68],[-80,74],[82,74]].forEach(([cx,cy]) => add(group, "circle", { class: "ju1873-gong-frame-bolt", cx, cy, r: 6 }));
      line(group, "M-69-68H69", "ju1873-gong-hanger");
      line(group, "M-36-68V-47M36-68V-47", "ju1873-gong-cord");
      add(group, "circle", { class: "ju1873-gong-disc", cx: 0, cy: 19, r: 77 });
      add(group, "circle", { class: "ju1873-gong-ring outer", cx: 0, cy: 19, r: 60 });
      add(group, "circle", { class: "ju1873-gong-ring", cx: 0, cy: 19, r: 44 });
      path(group, "M-59-24Q-14-57 37-38Q63-26 70-3", "ju1873-gong-sheen");
      path(group, "M-54 53Q-4 82 48 57", "ju1873-gong-reflection");
      [[-43,-8],[-52,24],[-40,51],[-15,70],[21,67],[49,45],[55,13],[38,-16]].forEach(([cx,cy]) => add(group, "circle", { class: "ju1873-gong-hammer-mark", cx, cy, r: 4 }));
      add(group, "circle", { class: "ju1873-gong-boss", cx: 0, cy: 19, r: 24 });
      add(group, "circle", { class: "ju1873-gong-boss-light", cx: -7, cy: 10, r: 7 });
      line(group, "M110 10L154 84", "ju1873-gong-mallet-shaft");
      add(group, "ellipse", { class: "ju1873-gong-mallet-head", cx: 106, cy: 3, rx: 21, ry: 27, transform: "rotate(-31 106 3)" });
      path(group, "M-96 91H-57L-65 114H-112ZM58 91H98L115 114H68Z", "ju1873-gong-foot");
    }
    return true;
  }
  return false;
}

function drawBarroColoradoQG2726Accessory(group, item, companion) {
  if (!barroColoradoQG2726RendererIds.has(item.id)) return false;
  group.dataset.renderer = item.family;
  group.classList.add("barro-qg2726-accessory", companion ? "qg2726-companion" : "qg2726-primary");

  if (item.family === "qg2726-gustavia-flower-headpiece") {
    const flower = add(group, "g", { transform: `scale(${companion ? .80 : 1})` });
    path(flower, companion ? "M-54 26C-88 34-105 68-92 101C-55 98-27 76-19 41Z" : "M-60 28C-100 42-112 82-94 115C-54 107-27 80-20 42Z", "bci-gustavia-leaf");
    path(flower, companion ? "M-88 91Q-56 63-27 41" : "M-94 105Q-59 70-27 43", "bci-gustavia-leaf-vein");
    const petalShape = "M0 5C-30-14-39-49-20-73C-5-92 24-88 34-67C44-45 26-12 0 5Z";
    const petals = companion
      ? [[-77,.82,.74,"far"],[-19,.91,.82,"far"],[43,.87,.78,"far"],[99,.82,.73,"far"],[-48,.88,.74,"near"],[13,.94,.78,"near"],[73,.86,.72,"near"]]
      : [[-91,.90,.78,"far"],[-43,1,.86,"far"],[4,.94,.82,"far"],[52,1.02,.87,"far"],[99,.91,.79,"far"],[-67,.96,.79,"near"],[-18,1.04,.87,"near"],[29,1,.83,"near"],[77,.96,.79,"near"]];
    petals.forEach(([angle,sx,sy,layer])=>add(flower,"path",{class:`bci-gustavia-petal ${layer}`,d:petalShape,transform:`rotate(${angle}) scale(${sx} ${sy})`}));
    petals.filter((_,index)=>index%2===0).forEach(([angle,sx,sy])=>add(flower,"path",{class:"bci-gustavia-petal-vein",d:"M0-2Q2-28 4-58",transform:`rotate(${angle}) scale(${sx} ${sy})`}));
    add(flower, "ellipse", { class: "bci-gustavia-centre", cx: 1, cy: 2, rx: companion ? 26 : 31, ry: companion ? 22 : 27 });
    const stamens = companion
      ? [[-39,-13],[-33,19],[-18,-34],[-10,36],[8,-38],[15,35],[31,-23],[39,9],[-4,-28],[25,22]]
      : [[-48,-14],[-42,18],[-30,35],[-23,-38],[-8,-46],[-5,43],[11,-45],[18,42],[31,-33],[37,31],[48,-12],[48,14],[-34,-27],[28,20]];
    stamens.forEach(([x,y],index)=>{line(flower,`M${x*.46} ${y*.42}Q${x*.72} ${y*.67-4} ${x} ${y}`,"bci-gustavia-stamen");add(flower,"ellipse",{class:"bci-gustavia-anther",cx:x,cy:y,rx:index%3===0?5.5:4.5,ry:index%3===0?4:3.5,transform:`rotate(${index*23} ${x} ${y})`});});
    [[-13,-5],[-3,-11],[9,-7],[15,3],[6,12],[-7,12],[-16,4]].forEach(([cx,cy])=>add(flower,"circle",{class:"bci-gustavia-pollen",cx,cy,r:4.2}));
    path(flower, companion ? "M-48 49Q-12 72 29 49L24 65Q-12 86-54 64Z" : "M-48 54Q-10 78 34 53L28 70Q-11 92-55 69Z", "bci-gustavia-band");
    add(flower, "circle", { class: "bci-gustavia-clasp", cx: -10, cy: companion ? 65 : 70, r: 8 });
    return true;
  }

  if (item.family === "qg2726-golden-fleece-cape") {
    const s = companion ? .76 : 1;
    const cape = add(group, "g", { transform: `scale(${s})` });
    path(cape, companion ? "M-105-36Q-39-70 34-42L82-18Q96 2 79 19L67 58L39 50L17 83L-7 66L-39 91L-53 59L-89 68L-82 34Q-111 5-105-36Z" : "M-121-43Q-47-82 42-48L94-19Q111 4 91 24L76 73L43 61L18 101L-12 77L-51 108L-67 70L-108 81L-98 36Q-130 2-121-43Z", "bci-fleece-body");
    path(cape, companion ? "M-78-25Q-28-51 27-29L59-11Q71 0 60 15L47 39L19 35L-4 57L-30 43L-58 52L-54 23Q-79 4-78-25Z" : "M-91-30Q-34-59 32-31L67-11Q82 2 68 18L53 48L21 43L-7 70L-37 51L-72 62L-65 26Q-94 4-91-30Z", "bci-fleece-highlight");
    path(cape, companion ? "M-67-19Q-24-43 24-24L52-8Q61 1 52 12L38 35L13 31L-5 51L-28 38L-52 47L-47 20Q-69 4-67-19Z" : "M-78-23Q-29-49 28-25L59-7Q69 3 58 16L44 40L16 36L-7 61L-34 43L-60 53L-55 23Q-81 5-78-23Z", "bci-fleece-wool-panel");
    const woolSpirals = companion
      ? [[-52,-17,.70,-15],[-22,-29,.76,12],[12,-24,.70,-8],[41,-8,.68,18],[-39,11,.72,8],[-8,7,.78,-12],[24,15,.72,14],[-24,36,.68,-10],[10,42,.64,12]]
      : [[-62,-20,.78,-15],[-29,-35,.82,10],[8,-31,.78,-8],[42,-15,.75,18],[-48,8,.80,7],[-14,2,.86,-12],[23,8,.82,14],[48,24,.68,-5],[-36,34,.75,-10],[-2,39,.79,12],[26,48,.66,-9]];
    woolSpirals.forEach(([x,y,s,angle],index)=>add(cape,"path",{class:index%4===0?"bci-fleece-spiral deep":"bci-fleece-spiral",d:"M-15 4C-18-9-5-19 8-15C21-11 22 5 12 12C2 19-11 13-10 3C-9-4 0-8 6-4C11 0 8 7 3 7",transform:`translate(${x} ${y}) rotate(${angle}) scale(${s})`}));
    (companion ? [[-78,34],[-48,58],[-9,68],[31,60],[61,39]] : [[-93,37],[-66,68],[-29,85],[10,78],[46,68],[72,42]]).forEach(([x,y],index)=>path(cape,`M${x-13} ${y-5}Q${x} ${y+10} ${x+13} ${y-5}`,index%2?"bci-fleece-tuft":"bci-fleece-tuft deep"));
    path(cape, "M61-24Q91-38 108-15Q110 8 87 15Q68 13 58-2", "bci-fleece-collar");
    add(cape, "circle", { class: "bci-fleece-clasp", cx: 82, cy: -5, r: 11 });
    path(cape, "M75-6C80-23 100-18 98-2C95 12 79 11 76 1", "bci-fleece-horn");
    path(cape, "M83 7Q99 29 89 51", "bci-fleece-cord");
    path(cape, "M79 50L89 65L99 50Z", "bci-fleece-tassel");
    return true;
  }

  if (item.family === "qg2726-bci-forest-census-map-fans") {
    const fan = add(group, "g", {});
    path(fan, companion ? "M-102 86Q2 116 105 79Q54 125-91 121Z" : "M-138 92Q0 137 143 87Q72 150-124 141Z", "bci-accessory-shadow");

    const addTreeMark = (parent, cx, cy, r, accent = false) => {
      add(parent, "circle", { class: accent ? "bci-census-tree accent" : "bci-census-tree", cx, cy, r });
      path(parent, `M${cx} ${cy + r}V${cy + r + 8}`, "bci-census-tree-stem");
    };
    const addPlotTag = (parent, x, y, angle = 0) => {
      const tag = add(parent, "g", { transform: `translate(${x} ${y}) rotate(${angle})` });
      path(tag, "M-24-17H24L29 0L24 17H-24L-29 0Z", "bci-census-tag");
      add(tag, "circle", { class: "bci-census-tag-hole", cx: -19, cy: 0, r: 4 });
      const textNode = add(tag, "text", { class: "bci-census-tag-text", x: 4, y: 5 });
      textNode.textContent = "50 HA";
    };

    if (companion) {
      const pivot = { x: 38, y: 66 };
      const blades = [
        { d: "M38 66Q7 24-64-30Q-71-49-53-59Q13-29 38 66Z", cls: "bci-census-panel emerald" },
        { d: "M38 66Q17 12-29-62Q-29-80-8-84Q37-25 38 66Z", cls: "bci-census-panel aqua" },
        { d: "M38 66Q39 6 25-77Q33-94 52-84Q68-15 38 66Z", cls: "bci-census-panel orchid" },
        { d: "M38 66Q62 12 82-61Q96-72 108-55Q99 5 38 66Z", cls: "bci-census-panel gold" }
      ];
      blades.forEach(({ d, cls }) => path(fan, d, cls));
      [[-51,-38],[2,-61],[42,-66],[92,-45]].forEach(([x,y], index) => addTreeMark(fan, x, y, 6, index === 2));
      [[-48,-21],[-5,-45],[37,-48],[79,-32]].forEach(([x,y]) => path(fan, `M${pivot.x} ${pivot.y}L${x} ${y}`, "bci-census-rib"));
      path(fan, "M-44-24Q-7-3 27-8M-14-50Q20-28 52-31M35-56Q61-34 86-37", "bci-census-map-line");
      add(fan, "circle", { class: "bci-census-pivot", cx: pivot.x, cy: pivot.y, r: 15 });
      add(fan, "circle", { class: "bci-census-pivot-inner", cx: pivot.x, cy: pivot.y, r: 6 });
      path(fan, "M26 77Q-5 92-31 106", "bci-census-cord");
      addPlotTag(fan, -52, 108, -7);
      path(fan, "M48 78Q69 98 85 111", "bci-census-ribbon");
    } else {
      const pivot = { x: 0, y: 72 };
      const angles = [-66, -44, -22, 0, 22, 44, 66];
      angles.forEach((angle, index) => {
        const panel = add(fan, "g", { transform: `rotate(${angle} ${pivot.x} ${pivot.y})` });
        path(panel, "M0 72C-19 28-21-46 0-91C21-46 19 28 0 72Z", `bci-census-panel ${index === 3 ? "gold" : index % 3 === 0 ? "orchid" : index % 2 ? "aqua" : "emerald"}`);
        path(panel, "M0 62V-72", "bci-census-rib");
        [-43,-13,18].forEach((y, lineIndex) => path(panel, `M${-10 + lineIndex * 2} ${y}Q0 ${y - 5} ${10 - lineIndex * 2} ${y}`, "bci-census-map-line"));
        if (index % 2 === 0) addTreeMark(panel, index === 0 ? -3 : 3, -30 + (index % 3) * 14, 6, index === 6);
      });
      add(fan, "circle", { class: "bci-census-pivot", cx: pivot.x, cy: pivot.y, r: 19 });
      add(fan, "circle", { class: "bci-census-pivot-inner", cx: pivot.x, cy: pivot.y, r: 8 });
      path(fan, "M-13 85Q-39 111-70 124", "bci-census-cord");
      addPlotTag(fan, -95, 128, -6);
      path(fan, "M14 86Q39 113 64 128", "bci-census-ribbon");
      path(fan, "M64 128Q75 145 58 154Q48 142 64 128Z", "bci-census-ribbon-tip");
    }
    return true;
  }
  return false;
}

function drawBriggsaeFieldAccessory(group, item, companion) {
  const isReunion = reunionJU1375RendererIds.has(item.id);
  const isOrsay = orsayJU2518RendererIds.has(item.id);
  const isDoisRios = doisRiosEG5612RendererIds.has(item.id);
  const isNambucca = nambuccaQG2814RendererIds.has(item.id);
  if (!isReunion && !isOrsay && !isDoisRios && !isNambucca) return false;

  group.dataset.renderer = `${item.family}-field-redesign`;
  group.classList.add(
    "briggsae-field-redesign",
    isReunion ? "bfr-reunion" : isOrsay ? "bfr-orsay" : isDoisRios ? "bfr-dois-rios" : "bfr-nambucca",
    companion ? "bfr-companion" : "bfr-primary"
  );

  const label = (value, x, y, className = "bfr-label") => {
    const node = add(group, "text", { class: className, x, y, "text-anchor": "middle" });
    node.textContent = value;
  };
  const shadow = (wide = 108, y = 101) => add(group, "ellipse", {
    class: "bfr-shadow", cx: 0, cy: y, rx: companion ? wide * .78 : wide, ry: companion ? 12 : 15
  });
  const apple = (cx, cy, scale = 1) => {
    const appleGroup = add(group, "g", { transform: `translate(${cx} ${cy}) scale(${scale})` });
    path(appleGroup, "M0-25C-10-39-30-35-37-17C-47 9-28 35 0 39C28 35 47 9 37-17C30-35 10-39 0-25Z", "bfr-fruit");
    path(appleGroup, "M0-27Q2-43 15-49", "bfr-line");
    path(appleGroup, "M13-45Q29-47 31-34Q20-30 13-45Z", "bfr-leaf");
    path(appleGroup, "M-28 7Q-13-3-4 12Q-14 27-28 18Z", "bfr-decay");
  };
  const flower = (cx, cy, scale = 1, alternate = false) => {
    const flowerGroup = add(group, "g", { transform: `translate(${cx} ${cy}) scale(${scale})` });
    [-90, -18, 54, 126, 198].forEach(angle => {
      const radians = angle * Math.PI / 180;
      add(flowerGroup, "ellipse", {
        class: alternate ? "bfr-flower-alt" : "bfr-flower",
        cx: (Math.cos(radians) * 12).toFixed(1),
        cy: (Math.sin(radians) * 12).toFixed(1),
        rx: 7,
        ry: 12,
        transform: `rotate(${angle + 90} ${(Math.cos(radians) * 12).toFixed(1)} ${(Math.sin(radians) * 12).toFixed(1)})`
      });
    });
    add(flowerGroup, "circle", { class: "bfr-gold", cx: 0, cy: 0, r: 6 });
  };
  const shell = (cx, cy, scale = 1) => {
    const shellGroup = add(group, "g", { transform: `translate(${cx} ${cy}) scale(${scale})` });
    path(shellGroup, "M-34 17C-42-9-25-35 2-39C31-43 48-21 42 5C37 31 7 43-18 33C-27 29-32 24-34 17Z", "bfr-shell");
    path(shellGroup, "M-13 14C-25 1-16-18 1-20C19-22 29-7 24 7C19 22 2 25-7 17C-15 10-10-1 0-3C9-4 12 5 7 10C3 14-2 12-2 7", "bfr-fine");
  };
  const plate = (cx, cy, rx, ry, className = "bfr-glass") => {
    add(group, "ellipse", { class: className, cx, cy, rx, ry });
    add(group, "ellipse", { class: "bfr-fine bfr-no-fill", cx, cy: cy - 4, rx: rx - 7, ry: ry - 7 });
  };

  if (isReunion && item.family === "ju1375-vanilla-vine-wrap") {
    group.classList.add("reunion-vanilla-wrap");
    const vine = companion
      ? "M-82 54C-43 13-61-57-6-70C37-80 72-48 60-10C51 18 20 30-8 17"
      : "M-112 69C-67 25-90-74-19-91C39-105 91-62 78-7C68 35 24 48-17 27C-48 12-46-24-16-38";
    path(group, vine, "ju1375-vanilla-vine");
    path(group, companion ? "M-54 13Q-87-5-91-36Q-61-44-42-22Q-40-2-54 13Z" : "M-75 18Q-117-8-116-49Q-77-55-54-27Q-55-2-75 18Z", "ju1375-vanilla-leaf");
    path(group, companion ? "M32-49Q48-84 78-77Q84-43 56-24Q40-26 32-49Z" : "M42-67Q62-112 101-102Q109-58 73-34Q51-37 42-67Z", "ju1375-vanilla-leaf ju1375-vanilla-leaf-light");
    const flowerGroup = add(group, "g", { transform: companion ? "translate(9 -56) rotate(-12) scale(.78)" : "translate(7 -75) rotate(-8)" });
    [-92,-22,48,118,188].forEach((angle, index) => {
      const radians = angle * Math.PI / 180;
      const cx = Math.cos(radians) * 25;
      const cy = Math.sin(radians) * 20;
      add(flowerGroup, "ellipse", { class: index === 1 ? "ju1375-vanilla-petal warm" : "ju1375-vanilla-petal", cx: cx.toFixed(1), cy: cy.toFixed(1), rx: 13, ry: 28, transform: `rotate(${angle + 90} ${cx.toFixed(1)} ${cy.toFixed(1)})` });
    });
    path(flowerGroup, "M-9-2Q0-19 10-2Q17 12 0 29Q-17 12-9-2Z", "ju1375-vanilla-lip");
    add(flowerGroup, "circle", { class: "ju1375-vanilla-throat", cx: 0, cy: 2, r: 6 });
    if (companion) {
      path(group, "M48-15Q65 17 55 55Q47 72 35 54Q43 16 29-8Z", "ju1375-vanilla-pod");
      path(group, "M-24-58Q-11-35-5-16", "ju1375-vanilla-tendril");
    } else {
      path(group, "M55-15Q75 24 62 69Q52 91 38 67Q48 22 31-7Z", "ju1375-vanilla-pod");
      path(group, "M74-19Q97 12 91 51Q84 73 70 55Q79 15 59-10Z", "ju1375-vanilla-pod ju1375-vanilla-pod-light");
      path(group, "M-26-79Q-8-51-3-24M-37 44Q-57 62-75 45", "ju1375-vanilla-tendril");
    }
    return true;
  }

  if (isReunion && item.family === "ju1375-sugarcane-juice") {
    group.classList.add("reunion-cane-juice");
    shadow(companion ? 64 : 78, companion ? 101 : 111);
    if (companion) {
      path(group, "M-66-44Q0-58 66-44L57 62Q0 79-57 62Z", "ju1375-juice-glass");
      add(group, "ellipse", { class: "ju1375-glass-rim", cx: 0, cy: -44, rx: 66, ry: 15 });
      path(group, "M-53-16Q0-29 53-16L48 57Q0 70-48 57Z", "ju1375-cane-juice");
      path(group, "M-50-16Q0-28 50-16", "ju1375-juice-froth");
      path(group, "M21-75L41 50", "ju1375-cane-straw");
      [ -49,-12,26 ].forEach(y => path(group, `M${17 + (y + 49) * .09} ${y}L${31 + (y + 49) * .09} ${y-2}`, "ju1375-cane-node"));
      path(group, "M37-29Q75-49 85-13Q88 17 67 33", "ju1375-glass-handle");
      add(group, "circle", { class: "ju1375-condensation", cx: -38, cy: 4, r: 5 });
      add(group, "circle", { class: "ju1375-condensation", cx: -26, cy: 30, r: 3.5 });
    } else {
      path(group, "M-77-71Q0-88 77-71L67 74Q0 96-67 74Z", "ju1375-juice-glass");
      add(group, "ellipse", { class: "ju1375-glass-rim", cx: 0, cy: -71, rx: 77, ry: 17 });
      path(group, "M-63-37Q0-51 63-37L57 67Q0 84-57 67Z", "ju1375-cane-juice");
      path(group, "M-61-37Q0-51 61-37", "ju1375-juice-froth");
      path(group, "M29-113L51 63", "ju1375-cane-straw");
      [-86,-39,8].forEach(y => path(group, `M${25 + (y + 86) * .12} ${y}L${42 + (y + 86) * .12} ${y-3}`, "ju1375-cane-node"));
      path(group, "M-16-74Q-3-108 25-115Q45-118 58-101", "ju1375-sipping-straw");
      path(group, "M-18-69Q-4-96 18-101", "ju1375-sipping-straw-highlight");
      [[-47,-2,5],[-37,29,4],[38,10,4],[29,48,3]].forEach(([cx,cy,r]) => add(group, "circle", { class: "ju1375-condensation", cx, cy, r }));
    }
    return true;
  }

  if (isReunion && item.family === "ju1375-bourbon-green-gecko-companion") {
    group.classList.add("reunion-gecko-companion");
    if (companion) {
      path(group, "M-35 13C-61 31-84 18-80-3C-77-19-56-27-46-15C-38-5-48 7-60 2C-68-2-69-12-63-19", "ju1375-gecko-tail");
      path(group, "M-42-27C-20-47 17-47 45-30C61-20 62 3 45 15C21 31-16 25-42 10C-58 1-58-14-42-27Z", "ju1375-gecko-body");
      path(group, "M34-35C49-50 74-49 88-35C98-25 96-10 85-2C69 9 48 5 38-8C31-17 29-28 34-35Z", "ju1375-gecko-head");
      path(group, "M-22-18Q-47-29-58-11Q-61 0-49 5M-15 14Q-37 24-33 42Q-26 53-14 43M28 11Q48 19 55 35Q56 46 46 50M43-29Q63-35 75-23", "ju1375-gecko-limb");
      [[-58,-11,-67,-17],[-49,5,-58,13],[-33,42,-41,51],[-14,43,-10,54],[55,35,65,41],[46,50,50,61],[75,-23,85,-29]].forEach(([x1,y1,x2,y2]) => path(group, `M${x1} ${y1}L${x2} ${y2}`, "ju1375-gecko-toe"));
      [[-67,-17],[-58,13],[-41,51],[-10,54],[65,41],[50,61],[85,-29]].forEach(([cx,cy]) => add(group, "circle", { class: "ju1375-gecko-pad", cx, cy, r: 4 }));
      add(group, "ellipse", { class: "ju1375-gecko-eye", cx: 65, cy: -28, rx: 8, ry: 7 });
      add(group, "ellipse", { class: "ju1375-gecko-pupil", cx: 67, cy: -28, rx: 2.5, ry: 4 });
      path(group, "M68-9Q76-6 82-13", "ju1375-gecko-smile");
      [[-19,-18,4],[0,-3,3.5],[22,-21,3.5]].forEach(([cx,cy,r]) => add(group, "circle", { class: "ju1375-gecko-mark", cx, cy, r }));
      path(group, "M-31-27Q1-40 33-26", "ju1375-gecko-highlight");
    } else {
      path(group, "M-52 19C-92 44-126 26-122-5C-119-31-86-45-69-27C-56-13-69 5-88-1C-101-6-103-22-93-33", "ju1375-gecko-tail");
      path(group, "M-64-38C-34-65 17-65 55-41C77-27 79 3 56 21C23 45-28 36-64 16C-86 4-86-20-64-38Z", "ju1375-gecko-body");
      path(group, "M42-49C64-70 100-68 121-49C134-36 132-14 116-3C94 13 61 8 48-11C38-24 35-39 42-49Z", "ju1375-gecko-head");
      path(group, "M-36-26Q-72-43-88-17Q-92-1-75 7M-26 20Q-59 34-52 59Q-42 75-24 61M37 17Q67 28 77 52Q78 68 62 73M56-41Q86-50 103-32", "ju1375-gecko-limb");
      [[-88,-17,-102,-25],[-75,7,-88,19],[-52,59,-64,72],[-24,61,-18,77],[77,52,92,61],[62,73,68,91],[103,-32,119,-41]].forEach(([x1,y1,x2,y2]) => path(group, `M${x1} ${y1}L${x2} ${y2}`, "ju1375-gecko-toe"));
      [[-102,-25],[-88,19],[-64,72],[-18,77],[92,61],[68,91],[119,-41]].forEach(([cx,cy]) => add(group, "circle", { class: "ju1375-gecko-pad", cx, cy, r: 5.5 }));
      add(group, "ellipse", { class: "ju1375-gecko-eye", cx: 88, cy: -39, rx: 11, ry: 9 });
      add(group, "ellipse", { class: "ju1375-gecko-pupil", cx: 92, cy: -39, rx: 3.5, ry: 5 });
      path(group, "M91-12Q104-8 114-19", "ju1375-gecko-smile");
      [[-43,-30,5.5],[-13,-6,5],[17,-28,5],[43,2,4.5]].forEach(([cx,cy,r]) => add(group, "circle", { class: "ju1375-gecko-mark", cx, cy, r }));
      path(group, "M-50-39Q1-57 48-38M-52 13Q-4 31 45 17", "ju1375-gecko-highlight");
    }
    return true;
  }

  if (isOrsay && item.family === "ju2518-rotten-apple-decay-rotoscope") {
    const width = companion ? 112 : 146;
    path(group, `M${-width / 2}-2Q0-82 ${width / 2}-2`, "bfr-crown-stem");
    path(group, `M${-width / 2 + 3}-4Q0-58 ${width / 2 - 3}-4`, "bfr-crown-twine");
    const blossoms = companion
      ? [[-43,-24,.65,false],[-13,-43,.76,true],[20,-39,.68,false],[45,-19,.58,true]]
      : [[-58,-24,.72,false],[-31,-47,.82,true],[2,-57,.92,false],[35,-46,.8,true],[61,-19,.68,false]];
    blossoms.forEach(([x,y,scale,alternate]) => flower(x,y,scale,alternate));
    [[-49,-8,-66,-21],[-26,-27,-43,-44],[25,-29,43,-47],[50,-7,68,-21]].forEach(([x1,y1,x2,y2]) => {
      path(group, `M${x1} ${y1}Q${(x1+x2)/2} ${y2-8} ${x2} ${y2}`, "bfr-crown-leaf");
    });
    path(group, companion ? "M-53-1Q-60 18-46 29M53-1Q60 18 46 29" : "M-69-1Q-78 21-60 34M69-1Q78 21 60 34", "bfr-crown-ribbon");
    return true;
  }

  if (isOrsay && item.family === "ju2518-virus-association-spectroscope") {
    shadow(companion ? 68 : 83, 103);
    path(group, companion ? "M-72-82Q0-116 72-82" : "M-89-88Q0-130 89-88", "bfr-satchel-strap");
    path(group, companion
      ? "M0-52C-19-75-55-63-65-29C-79 18-46 76 0 91C46 76 79 18 65-29C55-63 19-75 0-52Z"
      : "M0-59C-24-88-68-73-79-33C-96 24-56 88 0 105C56 88 96 24 79-33C68-73 24-88 0-59Z", "bfr-satchel-body");
    path(group, companion ? "M-58-22Q0 22 58-22L51 24Q0 57-51 24Z" : "M-71-26Q0 29 71-26L63 31Q0 72-63 31Z", "bfr-satchel-flap");
    path(group, companion ? "M-13 32H13V59H-13Z" : "M-16 41H16V73H-16Z", "bfr-satchel-buckle");
    path(group, companion ? "M0-55Q4-78 24-88" : "M0-62Q4-91 31-103", "bfr-line");
    path(group, companion ? "M20-84Q43-94 47-71Q29-65 20-84Z" : "M27-99Q56-111 61-81Q37-73 27-99Z", "bfr-satchel-leaf");
    path(group, companion ? "M-43 50Q-25 43-17 63" : "M-54 62Q-30 52-21 78", "bfr-satchel-stitch");
    return true;
  }

  if (isOrsay && item.family === "ju2518-six-september-garden-ledger") {
    shadow(companion ? 66 : 81, 105);
    path(group, companion ? "M-81-77Q-2-112 81-50" : "M-101-86Q-3-132 102-59", "bfr-harness-band");
    path(group, companion ? "M-74 63Q1 104 76 57" : "M-92 74Q2 124 94 66", "bfr-harness-band");
    path(group, companion ? "M-63-66L50-78L65 68L-49 81Z" : "M-78-78L62-94L81 81L-60 98Z", "bfr-notebook-cover");
    path(group, companion ? "M-49-51L38-61L50 51L-38 63Z" : "M-61-60L47-73L63 60L-46 75Z", "bfr-notebook-page");
    [-28,-5,18].forEach(y => path(group, companion ? `M-39 ${y}L40 ${y-9}` : `M-49 ${y}L51 ${y-12}`, "bfr-notebook-rule"));
    label("06 SEP", companion ? -3 : 0, companion ? -23 : -31, "bfr-date-label");
    label("2012", companion ? 2 : 4, companion ? 39 : 43, "bfr-small");
    path(group, companion ? "M46-80L74 58L88 53L60-84Z" : "M59-96L94 75L111 68L76-100Z", "bfr-pencil-body");
    path(group, companion ? "M60-84L49-99L46-80Z" : "M76-100L62-119L59-96Z", "bfr-pencil-tip");
    path(group, companion ? "M-61-38L-70 57" : "M-76-47L-87 69", "bfr-notebook-binding");
    return true;
  }

  if (isDoisRios && item.family === "eg5612-jackfruit-emergence-theatre") {
    shadow(110, 105);
    const width = companion ? 172 : 222;
    path(group, `M ${-width / 2} -7 H ${width / 2} L ${width / 2 - 15} 86 H ${-width / 2 + 15} Z`, "bfr-primary");
    path(group, `M ${-width / 2 + 12} 10 H ${width / 2 - 12} V 70 H ${-width / 2 + 12} Z`, "bfr-ivory");
    path(group, companion ? "M-62 8Q-73-43-31-59Q15-75 56-42Q73-28 58 13Q37 61-4 58Q-48 58-62 8Z" : "M-82 8Q-94-47-41-66Q17-87 72-45Q93-28 76 15Q49 67-6 64Q-62 66-82 8Z", "bfr-fruit-green");
    path(group, companion ? "M-48 3Q-44-35-12-45Q22-55 49-26Q50 13 23 35Q-14 50-48 3Z" : "M-65 3Q-58-39-15-52Q31-64 63-29Q64 16 29 42Q-19 59-65 3Z", "bfr-fruit-gold");
    [[-34,-14],[-9,-27],[17,-23],[39,-6],[-25,18],[4,11],[29,22]].forEach(([x,y]) => add(group, "ellipse", { class: "bfr-fruit-pod", cx: x, cy: y, rx: companion ? 7 : 9, ry: companion ? 11 : 14 }));
    path(group, `M ${-width / 2 + 25} 88 H ${width / 2 - 25}`, "bfr-line");
    label("JACKFRUIT", 0, 97, "bfr-small");
    return true;
  }

  if (isDoisRios && item.family === "eg5612-shared-bag-provenance-bifurcator") {
    shadow(91, 107);
    const width = companion ? 122 : 154;
    path(group, `M ${-width / 2} -77 H ${width / 2} L ${width / 2 + 12} 88 H ${-width / 2 - 12} Z`, "bfr-glass");
    path(group, `M ${-width / 2} -77 H ${width / 2} V -54 H ${-width / 2} Z`, "bfr-primary");
    path(group, `M ${-width / 2 + 10} -47 H ${width / 2 - 10}`, "bfr-zip");
    path(group, "M0-45V55", "bfr-fine");
    path(group, "M-54 3Q-61-29-28-39Q5-45 22-20Q11 13-18 28Q-43 27-54 3Z", "bfr-fruit-green");
    [[-34,-8],[-15,-17],[-25,8],[-5,4]].forEach(([x,y]) => add(group, "circle", { class: "bfr-fruit-gold", cx: x, cy: y, r: 7 }));
    [-1,71,143,215,287].forEach(deg => {
      const rad = deg * Math.PI / 180;
      path(group, `M40 8Q${40 + Math.cos(rad) * 25} ${8 + Math.sin(rad) * 25} ${40 + Math.cos(rad) * 17} ${8 + Math.sin(rad) * 17}Q40 8 40 8Z`, "bfr-flower");
    });
    add(group, "circle", { class: "bfr-gold", cx: 40, cy: 8, r: 8 });
    path(group, "M-54 48H54V78H-54Z", "bfr-accent");
    label("SAME BAG", 0, 69, "bfr-small bfr-light-text");
    return true;
  }

  if (isDoisRios && item.family === "eg5612-single-larva-test-cross-gate") {
    shadow(107, 104);
    plate(companion ? -35 : -48, 4, companion ? 49 : 60, companion ? 37 : 44);
    plate(companion ? 38 : 53, 17, companion ? 49 : 60, companion ? 37 : 44, "bfr-water");
    path(group, "M-76-52H75V-23H-76Z", "bfr-primary");
    label("TEST CROSS", 0, -31, "bfr-small bfr-light-text");
    label("N2", companion ? -35 : -48, 10, "bfr-label");
    label("AF16", companion ? 38 : 53, 23, "bfr-label");
    path(group, companion ? "M-53 25L-18-9M-53-9L-18 25" : "M-68 24L-28-16M-68-16L-28 24", "bfr-negative");
    path(group, companion ? "M21 13L34 28L58-4" : "M31 13L47 31L78-8", "bfr-positive");
    path(group, "M-30 75H28V96H-30Z", "bfr-secondary");
    label("L4", -1, 90, "bfr-small");
    return true;
  }

  if (isNambucca && item.family === "qg2814-ground-flower-sample-theatre") {
    shadow(105, 106);
    const width = companion ? 162 : 210;
    path(group, `M ${-width / 2} -68 H ${width / 2} V 64 H ${-width / 2} Z`, "bfr-primary");
    path(group, `M ${-width / 2 + 13} -55 H ${width / 2 - 13} V 51 H ${-width / 2 + 13} Z`, "bfr-ivory");
    [-65,65].filter(x => Math.abs(x) < width / 2 - 15).forEach(x => {
      path(group, `M ${x} -92 V 86`, "bfr-gold-line");
      add(group, "circle", { class: "bfr-gold", cx: x, cy: -87, r: 9 });
      add(group, "circle", { class: "bfr-gold", cx: x, cy: 82, r: 9 });
    });
    const flowers = companion ? [[-34,-13,.72],[25,5,.64]] : [[-52,-14,.8],[4,2,.72],[54,-18,.64]];
    flowers.forEach(([cx,cy,size], flowerIndex) => {
      [-90,-18,54,126,198].forEach(deg => {
        const rad = deg * Math.PI / 180;
        add(group, "ellipse", { class: flowerIndex % 2 ? "bfr-flower-alt" : "bfr-flower", cx: cx + Math.cos(rad) * 21 * size, cy: cy + Math.sin(rad) * 21 * size, rx: 9 * size, ry: 18 * size, transform: `rotate(${deg + 90} ${cx + Math.cos(rad) * 21 * size} ${cy + Math.sin(rad) * 21 * size})` });
      });
      add(group, "circle", { class: "bfr-gold", cx, cy, r: 7 * size });
    });
    path(group, `M ${-width / 2 - 7} 70 H ${width / 2 + 7} V 91 H ${-width / 2 - 7} Z`, "bfr-secondary");
    label("FLOWER PRESS", 0, 85, "bfr-small");
    return true;
  }

  if (isNambucca && item.family === "qg2814-five-day-two-plate-relay") {
    shadow(108, 106);
    const offset = companion ? 43 : 55;
    path(group, companion ? "M-99-61H99V82H-99Z" : "M-124-66H124V86H-124Z", "bfr-primary");
    plate(-offset, 3, companion ? 43 : 53, companion ? 32 : 39);
    plate(offset, 10, companion ? 43 : 53, companion ? 32 : 39, "bfr-water");
    label("1", -offset, 10, "bfr-card-symbol");
    label("2", offset, 17, "bfr-card-symbol");
    path(group, "M-25-4H25M13-15L27-4L13 7", "bfr-accent-line");
    path(group, companion ? "M-74 44H74V72H-74Z" : "M-93 48H93V77H-93Z", "bfr-ivory");
    label("25 → 30 MAR", 0, companion ? 63 : 69, "bfr-small");
    path(group, "M-12-83Q0-102 12-83", "bfr-line");
    label("L4", -offset, -32, "bfr-small bfr-light-text");
    return true;
  }

  if (isNambucca && item.family === "qg2814-18s-identity-ribbon-reader") {
    shadow(88, 106);
    const width = companion ? 124 : 154;
    path(group, `M ${-width / 2} -82 H ${width / 2} L ${width / 2 + 8} 89 H ${-width / 2 - 8} Z`, "bfr-primary");
    path(group, `M ${-width / 2 + 13} -64 H ${width / 2 - 13} V 53 H ${-width / 2 + 13} Z`, "bfr-ivory");
    path(group, "M-27-47C25-30-25-10 27 7C-25 24 25 43-27 55", "bfr-dna-a");
    path(group, "M27-47C-25-30 25-10-27 7C25 24-25 43 27 55", "bfr-dna-b");
    [-39,-20,-1,18,37].forEach(y => path(group, `M${y % 2 ? -18 : -24} ${y}H${y % 2 ? 18 : 24}`, "bfr-dna-rung"));
    path(group, `M ${-width / 2 + 13} 59 H ${width / 2 - 13} V 85 H ${-width / 2 + 13} Z`, "bfr-accent");
    label("18S DNA", 0, 77, "bfr-label bfr-light-text");
    label("C. briggsae", 0, -69, "bfr-small bfr-light-text");
    path(group, "M-17-93H17V-79H-17Z", "bfr-gold");
    return true;
  }

  return false;
}

function drawNigoniFieldAccessory(group, item, companion) {
  const location = praslinRendererIds.has(item.id) ? "praslin"
      : saoTomeRendererIds.has(item.id) ? "sao-tome"
        : mahahualJU2617RendererIds.has(item.id) ? "mahahual"
          : hcmcJU4356RendererIds.has(item.id) ? "hcmc" : null;
  if (!location) return false;

  group.dataset.renderer = `${item.family}-field-redesign`;
  group.classList.add("nigoni-field-redesign", `nfr-${location}`, companion ? "nfr-companion" : "nfr-primary");
  const label = (value, x, y, className = "nfr-label") => {
    const node = add(group, "text", { class: className, x, y, "text-anchor": "middle" });
    node.textContent = value;
  };
  const shadow = (rx = 100, y = 104) => add(group, "ellipse", { class: "nfr-shadow", cx: 0, cy: y, rx: companion ? rx * .8 : rx, ry: companion ? 11 : 14 });
  const plate = (cx, cy, rx = 48, ry = 35, alternate = false) => {
    add(group, "ellipse", { class: alternate ? "nfr-glass-alt" : "nfr-glass", cx, cy, rx, ry });
    add(group, "ellipse", { class: "nfr-fine nfr-no-fill", cx, cy: cy - 4, rx: rx - 7, ry: ry - 7 });
  };
  const fruit = (parent, kind, cx, cy, scale = 1) => {
    const fruitGroup = add(parent, "g", { transform: `translate(${cx} ${cy}) scale(${scale})` });
    if (kind === "starfruit") {
      path(fruitGroup, "M0-47L13-17L45-15L20 6L29 38L0 20L-29 38L-20 6L-45-15L-13-17Z", "nfr-fruit-yellow");
      path(fruitGroup, "M0-38V16M-34-11L-16 2M34-11L16 2M-22 27L-8 10M22 27L8 10", "nfr-fruit-line");
    } else if (kind === "fig") {
      path(fruitGroup, "M0-46Q-12-32-27-15Q-43 8-29 31Q-17 48 0 49Q17 48 29 31Q43 8 27-15Q12-32 0-46Z", "nfr-fruit-berry");
      add(fruitGroup, "circle", { class: "nfr-fruit-dot", cx: 0, cy: 33, r: 5 });
      path(fruitGroup, "M0-44Q9-58 22-51", "nfr-leaf-line");
    } else if (kind === "citrus") {
      add(fruitGroup, "circle", { class: "nfr-fruit-coral", cx: 0, cy: 0, r: 39 });
      path(fruitGroup, "M-5-37Q5-57 24-45Q18-30-5-37Z", "nfr-leaf");
      path(fruitGroup, "M-30-4Q0-24 30-4M-27 13Q0-3 27 13", "nfr-fruit-line");
    } else if (kind === "nut") {
      path(fruitGroup, "M0-45Q34-34 40-2Q44 33 0 47Q-44 33-40-2Q-34-34 0-45Z", "nfr-fruit-gold");
      path(fruitGroup, "M0-39V40M-31-9Q0 3 31-9", "nfr-fruit-line");
    } else {
      path(fruitGroup, "M0-43Q-35-46-43-11Q-49 28-9 45Q31 52 43 15Q51-20 18-38Q9-43 0-43Z", "nfr-fruit-coral");
      path(fruitGroup, "M1-41Q9-59 27-48Q22-31 1-41Z", "nfr-leaf");
    }
    return fruitGroup;
  };
  const sampleTray = (kind, title, includeNut = false) => {
    shadow(108, 107);
    path(group, companion ? "M-92-8H92L79 83H-79Z" : "M-117-10H117L101 91H-101Z", "nfr-primary");
    path(group, companion ? "M-78 4H78L69 64H-69Z" : "M-99 3H99L87 70H-87Z", "nfr-ivory");
    fruit(group, kind, includeNut ? -28 : -13, companion ? 24 : 20, companion ? .66 : .82);
    if (includeNut) fruit(group, "nut", 47, 26, companion ? .45 : .56);
    path(group, companion ? "M26-66H87V-28H26Z" : "M38-79H112V-32H38Z", "nfr-card");
    label(title, companion ? 56 : 75, companion ? -42 : -49, "nfr-small");
    path(group, companion ? "M-70 72H70" : "M-90 78H90", "nfr-accent-line");
  };

  if (item.family === "ju4356-carambola-ground-contact-stage") {
    sampleTray("starfruit", "JU4356");
    return true;
  }
  if (item.family === "sao-tome-chocolate-bars") {
    shadow(companion ? 94 : 103, 112);
    const chocolate = add(group, "g", { transform: companion ? "rotate(9 -7 -5)" : "rotate(-6 0 0)" });
    if (companion) {
      path(chocolate, "M-91-98L68-98L80 77L-86 85L-103 57Z", "st-foil-back");
      path(chocolate, "M-75-91H57V18H-75Z", "st-chocolate-slab");
      [-57,-14,29].forEach(x => [-73,-34,5].forEach(y => add(chocolate, "rect", { class: "st-chocolate-segment", x, y, width: 35, height: 31, rx: 6 })));
      path(chocolate, "M-93 32Q-72 18-51 33Q-30 17-9 33Q12 18 33 34Q54 19 73 35L79 91L-91 98Z", "st-wrapper");
      path(chocolate, "M-82 50Q-37 34 0 51Q37 35 69 49M-82 80Q-35 63 0 80Q36 64 70 79", "st-wrapper-rib");
      path(chocolate, "M-28 63Q-10 40 8 63Q-9 87-28 63Z", "st-cocoa-pod");
      path(chocolate, "M-10 45V82M-22 57Q-10 64 3 57M-24 70Q-10 77 4 70", "st-cocoa-pod-rib");
      path(chocolate, "M-88-91L-67-68L-82-45M60-94L42-69L62-47M-94 4L-78 15L-96 29", "st-foil-fold");
      path(chocolate, "M75-72L108-54L91-20L56-37Z", "st-broken-square");
      path(chocolate, "M78-64L98-52L87-31L65-40Z", "st-chocolate-segment");
    } else {
      path(chocolate, "M-87-119L-72-129H72L88-118L82 103L-82 103Z", "st-foil-back");
      path(chocolate, "M-69-111H69V35H-69Z", "st-chocolate-slab");
      [-54,-12,30].forEach(x => [-94,-53,-12,29].forEach(y => add(chocolate, "rect", { class: "st-chocolate-segment", x, y, width: 36, height: 32, rx: 7 })));
      path(chocolate, "M-91 38Q-69 19-45 37Q-22 17 1 38Q25 17 48 37Q71 20 91 39V111H-91Z", "st-wrapper");
      path(chocolate, "M-83 59Q-42 40 0 59Q42 40 83 59M-83 91Q-42 73 0 91Q42 73 83 91", "st-wrapper-rib");
      path(chocolate, "M-24 72Q0 41 24 72Q0 103-24 72Z", "st-cocoa-pod");
      path(chocolate, "M0 47V97M-17 62Q0 70 17 62M-19 78Q0 87 19 78", "st-cocoa-pod-rib");
      path(chocolate, "M-80-119L-56-91L-76-68M80-119L56-91L76-68M-87-17L-71-4L-89 12M87-17L71-4L89 12", "st-foil-fold");
      path(chocolate, "M-50 72Q-33 57-17 71M50 72Q33 57 17 71", "st-wrapper-botanical");
    }
    return true;
  }
  if (item.family === "mahahual-reef-ruffle-swim-costumes") {
    group.classList.add("mahahual-beach-accessory", "mahahual-swim-costume");
    if (companion) {
      path(group, "M-65-24Q-34-35-2-27L3 18L-11 41Q-39 46-62 29Z", "mh-swim-trunks-leg");
      path(group, "M-2-27Q27-30 57-15L63 32Q42 46 17 39L3 18Z", "mh-swim-trunks-leg");
      path(group, "M46-20L57-15L63 32Q57 37 50 39L42 27Z", "mh-swim-trunks-panel");
      path(group, "M-68-39Q-11-52 58-31L57-14Q-10-35-65-23Z", "mh-swim-trunks-waistband");
      path(group, "M-53 22Q-33 33-13 29M18 29Q35 36 55 27M3-18L3 18", "mh-swim-trunks-seam");
      path(group, "M-10-31Q0-18 10-31M0-30V-11M-8-10L0-3L8-10", "mh-swim-trunks-drawstring");
      add(group, "circle", { class: "mh-swim-trunks-eyelet", cx: -10, cy: -31, r: 4 });
      add(group, "circle", { class: "mh-swim-trunks-eyelet", cx: 10, cy: -31, r: 4 });
    } else {
      path(group, "M14-69Q43-113 78-75", "mh-swim-strap");
      path(group, "M3-70Q18-97 43-80Q36-52 1-49Z", "mh-swim-top");
      path(group, "M43-80Q67-104 83-76L70-44Q53-51 43-80Z", "mh-swim-top");
      path(group, "M12-58Q23-75 37-67M51-68Q63-85 76-70", "mh-swim-seam");
      path(group, "M-79 2Q-41-25 3-10Q38 1 53 35L38 61Q4 78-35 68Q-69 61-79 2Z", "mh-swim-wrap");
      path(group, "M-71 19Q-39-4-7 15Q23-3 45 22", "mh-swim-panel");
      path(group, "M-36 67Q-27 82-16 68Q-4 84 9 68Q22 80 37 60", "mh-swim-ruffle");
      add(group, "circle", { class: "mh-swim-brooch", cx: 43, cy: -79, r: 9 });
      path(group, "M38-72L31-56M48-72L58-53", "mh-swim-brooch-tie");
      path(group, "M-73 7Q-90 17-79 35Q-68 24-57 33", "mh-swim-bow");
    }
    return true;
  }
  if (item.family === "multifemale-provenance-merger") {
    shadow(100, 105);
    const width = companion ? 142 : 182;
    [-2,-1,0,1,2].forEach((index) => {
      const x = index * (companion ? 21 : 27);
      const y = Math.abs(index) * 9 - 56;
      path(group, `M ${x - 24} ${y} H ${x + 24} V ${y + 112} H ${x - 24} Z`, index % 2 ? "nfr-card-alt" : "nfr-card");
      add(group, "circle", { class: "nfr-female", cx: x, cy: y + 31, r: companion ? 8 : 10 });
      path(group, `M ${x - 13} ${y + 56} H ${x + 13} M ${x - 13} ${y + 70} H ${x + 13}`, "nfr-fine");
    });
    path(group, `M ${-width / 2} 69 H ${width / 2} V 91 H ${-width / 2} Z`, "nfr-primary");
    label("5 FEMALES", 0, 84, "nfr-small nfr-light-text");
    return true;
  }
  if (item.family === "holttum-orchid-hybridisation-engine") {
    shadow(108, 107);
    path(group, companion ? "M-90-18H91V82H-90Z" : "M-116-22H117V91H-116Z", "nfr-primary");
    path(group, companion ? "M-79-7H79V65H-79Z" : "M-102-9H102V72H-102Z", "nfr-ivory");
    [-48,-8,32].forEach((x,index) => {
      const dx = companion ? x * .8 : x;
      path(group, `M ${dx - 7} -66 L ${dx + 17} 55`, index % 2 ? "nfr-brush-alt" : "nfr-brush");
      path(group, `M ${dx - 15} -76 Q ${dx} -94 ${dx + 15} -76 L ${dx + 8} -57 H ${dx - 8} Z`, index % 2 ? "nfr-bristle-alt" : "nfr-bristle");
    });
    path(group, companion ? "M43-33Q70-62 92-34Q76-9 54-18Q42 4 29-18Q20-42 43-33Z" : "M54-43Q89-81 116-44Q96-12 68-24Q53 5 37-24Q25-55 54-43Z", "nfr-orchid");
    label("POLLINATION", 0, companion ? 78 : 84, "nfr-small nfr-light-text");
    return true;
  }
  if (item.family === "praslin-giant-tortoise-shell-costume") {
    shadow(companion ? 108 : 133, companion ? 92 : 111);
    if (companion) {
      path(group, "M-104 35Q-88-69-9-88Q70-86 105 4Q112 45 81 68Q4 100-75 70Q-101 59-104 35Z", "praslin-shell-rim");
      path(group, "M-87 29Q-73-52-8-68Q57-65 86 6Q91 38 65 54Q1 78-62 54Q-83 47-87 29Z", "praslin-shell-base");
      path(group, "M-19-58Q7-75 33-51L39-11Q8 8-23-7Z", "praslin-shell-scute light");
      path(group, "M-72-27Q-47-55-23-52L-25-9Q-54 4-78-7Z", "praslin-shell-scute warm");
      path(group, "M35-50Q66-36 78-5L40-12Z", "praslin-shell-scute deep");
      path(group, "M-63 16Q-34-5-24-7L5 18L-3 61Q-41 62-65 47Z", "praslin-shell-scute");
      path(group, "M7 18L38-11Q62 0 70 30L63 51Q30 65-3 61Z", "praslin-shell-scute warm");
      path(group, "M-63-36Q-27-67 17-64M-64 35Q-32 58 5 61", "praslin-shell-highlight");
      path(group, "M-76 65Q0 87 78 63", "praslin-shell-harness");
      path(group, "M-56 63Q-68 86-51 96M50 64Q61 84 47 94", "praslin-shell-harness");
    } else {
      path(group, "M-132 39Q-113-87-7-108Q98-104 136 8Q144 55 105 82Q1 122-103 83Q-130 69-132 39Z", "praslin-shell-rim");
      path(group, "M-111 31Q-95-67-7-85Q80-82 113 9Q121 47 87 66Q0 98-83 68Q-108 58-111 31Z", "praslin-shell-base");
      path(group, "M-39-73Q0-104 41-72L50-19Q3 9-43-18Z", "praslin-shell-scute light");
      path(group, "M-96-35Q-70-70-40-70L-44-17Q-77 3-103-10Z", "praslin-shell-scute warm");
      path(group, "M43-70Q83-52 103-11L50-18Z", "praslin-shell-scute deep");
      path(group, "M-89 18Q-57-9-43-17L1 16L-6 78Q-57 80-91 58Z", "praslin-shell-scute");
      path(group, "M3 16L50-18Q81-6 93 33L86 65Q41 82-6 78Z", "praslin-shell-scute warm");
      path(group, "M-87-47Q-44-82 10-83M-85 46Q-43 75 2 78", "praslin-shell-highlight");
      path(group, "M-102 80Q0 108 104 77", "praslin-shell-harness");
      path(group, "M-70 80Q-83 105-62 116M67 80Q82 104 61 116", "praslin-shell-harness");
    }
    return true;
  }
  if (item.family === "praslin-black-parrot-carnival-cap") {
    shadow(companion ? 86 : 103, companion ? 66 : 76);
    path(group, companion ? "M-83 13Q-69-55 1-68Q59-64 83-9L67 21Q1 38-70 25Z" : "M-103 18Q-84-72 3-87Q77-79 104-10L82 29Q2 47-87 32Z", "praslin-cap-crown");
    path(group, companion ? "M-75 12Q-2 30 73 5L81 24Q1 50-78 31Z" : "M-94 17Q0 40 92 7L103 31Q1 62-100 39Z", "praslin-cap-band");
    path(group, companion ? "M-46-48Q-19-92 34-98Q17-71 51-55Q7-58-20-37Z" : "M-58-62Q-20-120 51-126Q26-92 70-69Q13-74-26-47Z", "praslin-cap-crest");
    path(group, companion ? "M-31-52Q-6-77 26-80" : "M-40-68Q-6-103 36-106", "praslin-cap-crest-alt");
    path(group, companion ? "M61-24Q83-23 100-9Q82 6 61 4Z" : "M78-33Q105-31 127-11Q104 9 78 7Z", "praslin-cap-brim");
    add(group, "circle", { class: "praslin-cap-eye", cx: companion ? 47 : 59, cy: companion ? -37 : -48, r: companion ? 4 : 5 });
    path(group, companion ? "M-57 27Q2 43 62 23" : "M-73 34Q2 54 78 29", "praslin-shell-highlight");
    return true;
  }
  if (item.family === "praslin-seychelles-carnival-bell-bracelet") {
    shadow(companion ? 78 : 96, companion ? 66 : 78);
    path(group, companion ? "M-70-12Q-4 15 66-7L60 17Q-2 40-65 14Z" : "M-88-15Q-3 20 86-10L78 20Q-2 50-82 18Z", "praslin-bracelet-front");
    path(group, companion ? "M-64-5Q-2 17 59 0" : "M-80-6Q-2 24 77-1", "praslin-bracelet-edge");
    const bells = companion ? [[-42,18,-7],[-3,29,1],[38,19,7]] : [[-54,23,-8],[-4,37,1],[49,22,8]];
    bells.forEach(([x,y,angle], index) => {
      const bell = add(group, "g", { transform: `translate(${x} ${y}) rotate(${angle})` });
      path(bell, index === 1 ? "M-12 2Q-13 25-23 38H23Q13 25 12 2Z" : "M-15 2Q-16 29-27 44H27Q16 29 15 2Z", index === 1 ? "praslin-bracelet-bell alt" : "praslin-bracelet-bell");
      path(bell, index === 1 ? "M-24 37Q0 46 24 37" : "M-29 43Q0 54 29 43", "praslin-bracelet-edge");
      add(bell, "circle", { class: "praslin-bracelet-clapper", cx: 0, cy: index === 1 ? 40 : 47, r: index === 1 ? 4 : 5 });
    });
    path(group, companion ? "M-62-8Q-73-30-83-39M58-4Q72-23 82-31" : "M-78-9Q-91-35-104-46M75-6Q91-31 104-39", "praslin-bracelet-tie");
    return true;
  }
  if (item.family === "sao-tome-birdsong-music-boxes") {
    shadow(companion ? 96 : 113, 111);
    if (companion) {
      path(group, "M-79-2Q-73-75 0-94Q73-75 79-2Z", "st-music-lid");
      path(group, "M-62-12Q-55-62 0-76Q55-62 62-12Z", "st-music-box-inlay");
      path(group, "M-86-3H86V83Q68 100 47 91Q0 112-47 91Q-68 100-86 83Z", "st-music-box");
      path(group, "M-68 17H68V69Q0 88-68 69Z", "st-music-panel");
      path(group, "M-48 33H49V57H-48Z", "st-music-cylinder");
      [-35,-13,9,31].forEach(x => path(group, `M${x} 35V55`, "st-cylinder-pin"));
      path(group, "M0-4V-45M-39-45H40", "st-perch");
      add(group, "ellipse", { class: "st-songbird", cx: -8, cy: -58, rx: 30, ry: 19 });
      add(group, "circle", { class: "st-songbird", cx: 23, cy: -70, r: 15 });
      path(group, "M-33-58L-57-73L-48-48L-62-36L-27-41Z", "st-bird-tail");
      path(group, "M-11-62Q6-74 15-58Q2-42-17-48Z", "st-bird-wing");
      path(group, "M37-70L57-62L38-55", "st-bird-beak");
      add(group, "circle", { class: "st-bird-eye", cx: 27, cy: -73, r: 3.5 });
      path(group, "M86 46H120M120 46V15M106 15H134", "st-winding-key");
      add(group, "circle", { class: "st-key-knob", cx: 106, cy: 15, r: 6 });
      add(group, "circle", { class: "st-key-knob", cx: 134, cy: 15, r: 6 });
      path(group, "M-55 73Q-34 52-13 72Q8 50 29 72Q48 55 63 71", "st-box-filigree");
      path(group, "M-64 84V99M64 84V99", "st-music-foot");
      path(group, "M-73-21Q-102-41-89-67M-89-67Q-73-82-62-61", "st-music-note");
    } else {
      path(group, "M-107-7Q-99-80-50-101Q0-128 50-101Q99-80 107-7Z", "st-music-lid");
      path(group, "M-88-16Q-77-68-40-84Q0-105 40-84Q77-68 88-16Z", "st-music-box-inlay");
      path(group, "M-116-7H116V91Q89 115 58 99Q0 124-58 99Q-89 115-116 91Z", "st-music-box");
      path(group, "M-94 17H94V78Q0 102-94 78Z", "st-music-panel");
      path(group, "M-70 39H63V69H-70Z", "st-music-cylinder");
      [-53,-27,-1,25,51].forEach(x => path(group, `M${x} 42V66`, "st-cylinder-pin"));
      path(group, "M0-8V-53M-55-53H55", "st-perch");
      add(group, "ellipse", { class: "st-songbird", cx: -10, cy: -69, rx: 39, ry: 24 });
      add(group, "circle", { class: "st-songbird", cx: 31, cy: -84, r: 19 });
      path(group, "M-43-69L-75-88L-63-57L-80-43L-34-49Z", "st-bird-tail");
      path(group, "M-14-74Q8-90 21-70Q5-50-20-56Z", "st-bird-wing");
      path(group, "M49-84L78-73L50-63", "st-bird-beak");
      add(group, "circle", { class: "st-bird-eye", cx: 36, cy: -88, r: 4.5 });
      path(group, "M116 49H161M161 49V10M144 10H179", "st-winding-key");
      add(group, "circle", { class: "st-key-knob", cx: 144, cy: 10, r: 7 });
      add(group, "circle", { class: "st-key-knob", cx: 179, cy: 10, r: 7 });
      path(group, "M-76 84Q-52 57-27 82Q0 54 27 82Q52 57 76 84", "st-box-filigree");
      path(group, "M-88 95V112M88 95V112", "st-music-foot");
      path(group, "M-79-86Q-97-111-68-124M-68-124Q-47-126-55-105", "st-music-note");
      path(group, "M66-93Q52-121 82-131M82-131Q103-127 93-108", "st-music-note alternate");
    }
    return true;
  }
  if (item.family === "sao-tome-begonia-glass-parasols") {
    shadow(companion ? 86 : 105, 112);
    if (companion) {
      path(group, "M0-113Q28-122 43-96Q70-107 83-81Q103-69 91-43Q75-19 49-30Q28-11 0-26Q-28-11-49-30Q-75-19-91-43Q-103-69-83-81Q-70-107-43-96Q-28-122 0-113Z", "st-parasol-canopy");
      path(group, "M0-111L0-26M0-107Q-31-80-78-54M0-107Q31-80 78-54M0-101Q-20-62-47-32M0-101Q20-62 47-32", "st-glass-leading");
      path(group, "M-72-58Q-43-83-13-54Q-38-28-60-34ZM72-58Q43-83 13-54Q38-28 60-34Z", "st-glass-pane-rose");
      path(group, "M-21-75Q0-101 21-75Q0-47-21-75Z", "st-glass-pane-gold");
      path(group, "M0-26V73Q0 107-30 108Q-51 108-54 87Q-55 76-45 69", "st-parasol-shaft");
      [-70,-36,0,36,70].forEach((x,index) => add(group, "circle", { class: index % 2 ? "st-parasol-drop rose" : "st-parasol-drop", cx: x, cy: index === 2 ? -20 : -31, r: 6 }));
      add(group, "circle", { class: "st-parasol-jewel", cx: 0, cy: -112, r: 9 });
    } else {
      path(group, "M0-120Q-36-143-72-113Q-112-117-120-79Q-143-54-126-22Q-81-3 0-16Q81-3 126-22Q143-54 120-79Q112-117 72-113Q36-143 0-120Z", "st-leaf-parasol");
      path(group, "M0-118V-16M0-113Q-45-79-114-34M0-113Q45-79 114-34M0-108Q-63-108-99-78M0-108Q63-108 99-78", "st-glass-leading");
      path(group, "M-111-76Q-70-104-17-71Q-50-38-101-32Z", "st-glass-pane-aqua");
      path(group, "M111-76Q70-104 17-71Q50-38 101-32Z", "st-glass-pane-rose");
      path(group, "M-25-75Q0-108 25-75Q0-39-25-75Z", "st-glass-pane-gold");
      path(group, "M0-16V78Q0 115-35 114Q-61 112-61 87Q-61 74-49 66", "st-parasol-shaft");
      path(group, "M-126-22Q-92-4-61-16Q-30 0 0-16Q30 0 61-16Q92-4 126-22", "st-parasol-edge");
      [-101,-62,-22,22,62,101].forEach((x,index) => add(group, "circle", { class: index % 2 ? "st-parasol-drop rose" : "st-parasol-drop", cx: x, cy: index < 3 ? -12 : -11, r: 7 }));
      add(group, "circle", { class: "st-parasol-jewel", cx: 0, cy: -119, r: 10 });
    }
    return true;
  }
  if (item.family === "mahahual-caribbean-sun-spectacles") {
    group.classList.add("mahahual-beach-accessory", "mahahual-sun-spectacles");
    if (companion) {
      add(group, "ellipse", { class: "mh-glasses-lens companion", cx: -32, cy: 0, rx: 27, ry: 23 });
      add(group, "ellipse", { class: "mh-glasses-lens companion", cx: 32, cy: 0, rx: 27, ry: 23 });
      add(group, "ellipse", { class: "mh-glasses-frame companion", cx: -32, cy: 0, rx: 31, ry: 27 });
      add(group, "ellipse", { class: "mh-glasses-frame companion", cx: 32, cy: 0, rx: 31, ry: 27 });
      path(group, "M-2-2Q0-11 2-2M-63-1L-83 7M63-1L82 9", "mh-glasses-bridge");
      path(group, "M-55-17Q-32-35-8-17M8-17Q32-35 55-17", "mh-glasses-brow companion");
      add(group, "circle", { class: "mh-glasses-jewel", cx: 0, cy: -9, r: 6 });
    } else {
      path(group, "M-87-17Q-57-40-17-20L-22 24Q-58 39-82 18Z", "mh-glasses-lens");
      path(group, "M87-17Q57-40 17-20L22 24Q58 39 82 18Z", "mh-glasses-lens");
      path(group, "M-91-20Q-57-47-13-23L-18 28Q-58 45-87 21ZM91-20Q57-47 13-23L18 28Q58 45 87 21Z", "mh-glasses-frame");
      path(group, "M-14-17Q0-30 14-17M-90-13L-116-1M90-13L116 1", "mh-glasses-bridge");
      path(group, "M-78-27L-96-44L-62-40M78-27L96-44L62-40", "mh-glasses-wing");
      path(group, "M-70 8Q-53 23-33 13M70 8Q53 23 33 13", "mh-glasses-glint");
      add(group, "circle", { class: "mh-glasses-jewel", cx: 0, cy: -22, r: 7 });
    }
    return true;
  }
  if (item.family === "mahahual-sea-grape-beach-parasols") {
    group.classList.add("mahahual-beach-accessory", "mahahual-beach-parasol");
    shadow(companion ? 37 : 104, companion ? 254 : 270);
    if (companion) {
      path(group, "M0-116Q-24-106-34-82L-49 34Q-25 54 0 42Q25 54 49 34L34-82Q24-106 0-116Z", "mh-folded-canopy");
      path(group, "M0-110L0 44M-29-82L-12 36M29-82L12 36", "mh-parasol-rib");
      path(group, "M-41-5Q-20 8 0-2Q20 8 41-5", "mh-parasol-band");
      path(group, "M0-122V226", "mh-parasol-shaft");
      add(group, "rect", { class: "mh-parasol-finial", x: -9, y: 74, width: 18, height: 24, rx: 5 });
      add(group, "circle", { class: "mh-parasol-drop coral", cx: 0, cy: 86, r: 4 });
      path(group, "M-8 226L0 255L8 226Z", "mh-parasol-finial");
      path(group, "M-12-119L0-136L12-119Z", "mh-parasol-finial");
      path(group, "M39-4Q62-17 64 5Q49 3 40 16M39-4Q59 20 43 31", "mh-parasol-bow");
      [-30,-10,10,30].forEach((x, index) => add(group, "circle", { class: index % 2 ? "mh-parasol-drop coral" : "mh-parasol-drop", cx: x, cy: index % 2 ? 42 : 45, r: 5 }));
    } else {
      path(group, "M0-112Q-42-142-88-108Q-130-80-140-24Q-100-4-52-18Q0 3 52-18Q100-4 140-24Q130-80 88-108Q42-142 0-112Z", "mh-parasol-canopy");
      path(group, "M0-110V-9M0-106Q-48-76-124-33M0-106Q48-76 124-33M0-103Q-65-108-102-78M0-103Q65-108 102-78", "mh-parasol-rib");
      path(group, "M-120-72Q-82-112-21-77Q-58-31-111-27Z", "mh-parasol-panel shell");
      path(group, "M120-72Q82-112 21-77Q58-31 111-27Z", "mh-parasol-panel indigo");
      path(group, "M-25-76Q0-108 25-76Q0-37-25-76Z", "mh-parasol-panel gold");
      path(group, "M0-9V235", "mh-parasol-shaft");
      add(group, "rect", { class: "mh-parasol-finial", x: -11, y: 72, width: 22, height: 26, rx: 6 });
      add(group, "circle", { class: "mh-parasol-drop coral", cx: 0, cy: 85, r: 5 });
      path(group, "M-10 235L0 269L10 235Z", "mh-parasol-finial");
      path(group, "M-131-24Q-98-2-62-17Q-30 2 0-9Q30 2 62-17Q98-2 131-24", "mh-parasol-edge");
      path(group, "M-12-111L0-132L12-111Z", "mh-parasol-finial");
      [-108,-68,-25,25,68,108].forEach((x, index) => add(group, "circle", { class: index % 2 ? "mh-parasol-drop coral" : "mh-parasol-drop", cx: x, cy: index === 2 || index === 3 ? -4 : -13, r: 6 }));
    }
    return true;
  }
  if (item.family === "ju4356-its2-ribbon-reader") {
    shadow(99, 104);
    const width = companion ? 140 : 180;
    path(group, `M ${-width / 2} -75 H 4 V 72 H ${-width / 2} Z`, "nfr-card");
    path(group, `M -4 -58 H ${width / 2} V 88 H -4 Z`, "nfr-card-alt");
    [-38,-12,14,40].forEach((y,index) => {
      path(group, `M ${-width / 2 + 13} ${y} H ${index % 2 ? -17 : -29}`, index % 2 ? "nfr-band-alt" : "nfr-band");
      path(group, `M 10 ${y + 9} H ${width / 2 - 13}`, index % 2 ? "nfr-band" : "nfr-band-alt");
    });
    label("ITS2", width / 4, 77, "nfr-small nfr-light-text");
    path(group, "M-13-83H13V-68H-13Z", "nfr-gold");
    return true;
  }
  if (item.family === "hcmc-urban-canopy-census-engine") {
    shadow(105, 105);
    path(group, companion ? "M-102-28H27M-102-28V-58M27-28V-58" : "M-130-35H35M-130-35V-74M35-35V-74", "nfr-caliper");
    path(group, companion ? "M-85-17V76M10-17V76" : "M-108-22V94M13-22V94", "nfr-caliper-jaw");
    path(group, companion ? "M-104 12H99V36H-104Z" : "M-133 15H128V45H-133Z", "nfr-ruler");
    [-70,-40,-10,20,50,80].forEach(x => path(group, `M ${companion ? x * .8 : x} ${companion ? 13 : 16} V ${companion ? 29 : 37}`, "nfr-tape-tick"));
    path(group, companion ? "M44-51Q73-82 101-46Q86-18 56-28Q39-4 24-29Q24-54 44-51Z" : "M56-65Q94-105 130-59Q109-23 72-35Q50-5 31-37Q31-69 56-65Z", "nfr-leaf");
    label("TREE", companion ? -42 : -53, companion ? 31 : 39, "nfr-small");
    return true;
  }
  return false;
}

function drawTropicalisFieldAccessory(group, item, companion) {
  const location = guadeloupeNIC203RendererIds.has(item.id) ? "guadeloupe"
    : oahuECA789RendererIds.has(item.id) ? "oahu"
        : kauaiQG131RendererIds.has(item.id) ? "kauai-qg131"
          : newTaipeiNIC1648RendererIds.has(item.id) ? "new-taipei"
            : pohnpeiQG4739RendererIds.has(item.id) ? "pohnpei"
              : queenslandQG2904RendererIds.has(item.id) ? "queensland"
                : reunionJU1373RendererIds.has(item.id) ? "reunion" : null;
  if (!location) return false;

  group.dataset.renderer = `${item.family}-field-redesign`;
  group.classList.add("nigoni-field-redesign", "tropicalis-field-redesign", `tfr-${location}`, companion ? "nfr-companion" : "nfr-primary");
  const label = (value, x, y, className = "nfr-label") => {
    const node = add(group, "text", { class: className, x, y, "text-anchor": "middle" });
    node.textContent = value;
  };
  const shadow = (rx = 100, y = 105) => add(group, "ellipse", { class: "nfr-shadow", cx: 0, cy: y, rx: companion ? rx * .8 : rx, ry: companion ? 11 : 14 });
  const fruit = (cx, cy, scale = 1, flower = false) => {
    const node = add(group, "g", { transform: `translate(${cx} ${cy}) scale(${scale})` });
    if (flower) {
      [-90,-18,54,126,198].forEach(deg => { const r=deg*Math.PI/180; path(node, `M0 0Q${(Math.cos(r-.42)*45).toFixed(1)} ${(Math.sin(r-.42)*45).toFixed(1)} ${(Math.cos(r)*37).toFixed(1)} ${(Math.sin(r)*37).toFixed(1)}Q${(Math.cos(r+.42)*45).toFixed(1)} ${(Math.sin(r+.42)*45).toFixed(1)} 0 0Z`, "nfr-orchid"); });
      add(node,"circle",{class:"nfr-gold",cx:0,cy:0,r:10});
    } else {
      path(node,"M0-48Q-39-45-46-8Q-50 32-10 48Q32 53 47 16Q54-22 18-42Q8-48 0-48Z","nfr-fruit-coral");
      path(node,"M1-44Q12-62 31-48Q24-30 1-44Z","nfr-leaf");
      [-18,2,22].forEach(x=>path(node,`M ${x} -26 Q ${x+8} 0 ${x-3} 26`,"nfr-fruit-line"));
    }
  };
  const sampleBox = (title, flower = false) => {
    shadow(108,108);
    const width=companion?170:220;
    path(group,`M ${-width/2} -51 H ${width/2} V 88 H ${-width/2} Z`,"nfr-primary");
    path(group,`M ${-width/2+12} -38 H ${width/2-12} V 62 H ${-width/2+12} Z`,"nfr-glass");
    path(group,`M ${-width/2+9} -57 Q 0 -101 ${width/2-9} -57`,"nfr-handle");
    fruit(companion?-23:-31,10,companion?.65:.82,flower);
    path(group,companion?"M28-29H75V43H28Z":"M39-38H98V52H39Z","nfr-card");
    label(title,companion?51:68,companion?13:17,"nfr-small");
    path(group,`M ${-width/2+17} 68 H ${width/2-17}`,"nfr-accent-line");
  };

  if (item.family === "eca789-fallen-flower-decay-chronoscope") {
    sampleBox("ECA789",true);
    return true;
  }
  if (item.family === "eca789-paired-microclimate-harmonograph") {
    shadow(104,106);
    const width=companion?164:210;
    path(group,`M ${-width/2} -65 H ${width/2} V 87 H ${-width/2} Z`,"nfr-primary");
    path(group,`M ${-width/2+12} -51 H ${width/2-12} V 64 H ${-width/2+12} Z`,"nfr-ivory");
    add(group,"circle",{class:"nfr-glass",cx:-width/4,cy:2,r:companion?35:44});
    add(group,"circle",{class:"nfr-glass-alt",cx:width/4,cy:2,r:companion?35:44});
    path(group,`M ${-width/4} 2 L ${-width/4+18} -21 M ${width/4} 2 L ${width/4-15} -25`,"nfr-needle-line");
    label("22.9°",-width/4,companion?31:38,"nfr-small");label("93.7%",width/4,companion?31:38,"nfr-small");
    label("TEMP + HUMIDITY",0,companion?81:80,"nfr-small nfr-light-text");
    return true;
  }
  if (item.family === "c0085-field-record-relay") {
    shadow(101,106);
    path(group,companion?"M-82-74H65L88-50V87H-82Z":"M-104-92H83L112-63V103H-104Z","nfr-folder");
    path(group,companion?"M-68-55H68V69H-68Z":"M-87-70H87V82H-87Z","nfr-ivory");
    path(group,companion?"M-82-74H-21L-6-51H65":"M-104-92H-27L-8-64H83","nfr-folder-tab");
    [-32,-6,20,46].forEach(y=>path(group,`M ${companion?-53:-68} ${companion?y:y*1.23} H ${companion?55:70}`,"nfr-fine"));
    path(group,companion?"M-54 48H54V71H-54Z":"M-69 59H69V87H-69Z","nfr-accent");
    label("FIELD RECORD",0,companion?65:79,"nfr-small nfr-light-text");
    return true;
  }
  if (item.family === "qg131-paired-pandanus-key-sorter") {
    shadow(106,108);
    path(group,companion?"M-88-34Q0-70 88-34L74 79Q0 104-74 79Z":"M-113-42Q0-88 113-42L95 87Q0 117-95 87Z","nfr-basket");
    [-57,-28,0,28,57].filter(x=>companion?Math.abs(x)<70:true).forEach(x=>path(group,`M ${x} -32 Q ${x*.7} 38 ${x*.7} 82`,"nfr-weave"));
    [-12,19,50].forEach(y=>path(group,`M ${companion?-78:-101} ${y} Q 0 ${y+22} ${companion?78:101} ${y}`,"nfr-weave"));
    [-1,1].forEach(side=>{const x=side*(companion?35:45);path(group,`M ${x} -57Q${x+28} -46 ${x+30} -12Q${x+24} 22 ${x} 31Q${x-24} 22 ${x-30} -12Q${x-28} -46 ${x} -57Z`,side<0?"nfr-fruit-coral":"nfr-fruit-yellow");[-34,-12,10].forEach(y=>path(group,`M ${x-22} ${y} H ${x+22}`,"nfr-fruit-line"))});
    path(group,companion?"M-65-43Q0-110 65-43":"M-83-51Q0-137 83-51","nfr-handle");
    label("PANDANUS",0,companion?76:83,"nfr-small nfr-light-text");
    return true;
  }
  if (item.family === "qg131-four-date-culture-relay") {
    shadow(107,105);
    const width=companion?184:236;
    path(group,`M ${-width/2} -70 H ${width/2} V 91 H ${-width/2} Z`,"nfr-ivory");
    path(group,`M ${-width/2} -70 H ${width/2} V -39 H ${-width/2} Z`,"nfr-primary");
    const dates=["03","08","14","23"];
    dates.forEach((date,index)=>{const x=(index-1.5)*(companion?41:53);path(group,`M ${x-(companion?17:22)} -23 H ${x+(companion?17:22)} V 52 H ${x-(companion?17:22)} Z`,index%2?"nfr-card-alt":"nfr-card");label(date,x,15,"nfr-label");label("AUG",x,39,"nfr-small")});
    label("CULTURE DATES",0,82,"nfr-small");
    return true;
  }
  if (item.family === "qg131-mating-id-motion-theatre") {
    shadow(108,105);
    const offset=companion?42:54;
    path(group,companion?"M-103-65H103V88H-103Z":"M-130-72H130V95H-130Z","nfr-frame");
    [-1,1].forEach((side,index)=>{const x=side*offset;add(group,"ellipse",{class:index?"nfr-glass-alt":"nfr-glass",cx:x,cy:5,rx:companion?44:54,ry:companion?33:40});add(group,"ellipse",{class:"nfr-fine nfr-no-fill",cx:x,cy:1,rx:companion?36:45,ry:companion?25:32})});
    path(group,"M-22-7H22M10-19L24-7L10 5M22 34H-22M-10 22L-24 34L-10 46","nfr-arrow");
    label("MATING TEST",0,companion?76:82,"nfr-small nfr-light-text");
    return true;
  }
  if (item.family === "nic1648-taiwan-blue-magpie-kites") {
    group.classList.add("nic1648-magpie-kite");
    shadow(companion ? 96 : 124, companion ? 136 : 154);
    const kite = add(group, "g", { class: "nic1648-magpie-kite-body" });
    if (companion) {
      path(kite, "M0-108L91-37L73 59L0 105L-79 57L-95-35Z", "nic1648-magpie-body companion");
      path(kite, "M0-101L85-35L4-2Z", "nic1648-kite-panel");
      path(kite, "M4-2L70 55L0 98Z", "nic1648-kite-panel-alt");
      path(kite, "M-88-34L0-101L4-2Z", "nic1648-kite-panel-deep");
      path(kite, "M-72 53L4-2L0 98Z", "nic1648-kite-panel-soft");
      path(kite, "M0-103V100M-88-34Q0-4 86-36M-75 54Q0 27 70 56", "nic1648-kite-spar");
      path(kite, "M-7-14Q10-38 37-25Q53-14 43 8Q21 14 1 4Z", "nic1648-magpie-emblem-body companion");
      add(kite, "circle", { class: "nic1648-magpie-emblem-head", cx: 38, cy: -22, r: 14 });
      path(kite, "M50-24L67-18L51-13Z", "nic1648-magpie-emblem-beak");
      path(kite, "M-1 2Q-24 24-36 51Q-15 40 1 19Z", "nic1648-magpie-emblem-tail");
      path(kite, "M-1 8Q-9 34-12 57Q6 43 15 20Z", "nic1648-magpie-emblem-tail alternate");
      path(kite, "M0 105Q-34 132-7 158Q16 177-17 207", "nic1648-kite-tail");
      path(kite, "M-17 130L-39 143L-14 153L7 139ZM2 166L-19 179L5 190L25 176", "nic1648-kite-bow");
      path(kite, "M4-2Q47 39 42 101Q39 138 57 164", "nic1648-kite-string");
      add(kite, "circle", { class: "nic1648-kite-reel", cx: 61, cy: 176, r: 16 });
      path(kite, "M52 176H70M61 167V185", "nic1648-kite-reel-spoke");
    } else {
      path(kite, "M0-145L126-10L0 137L-126-10Z", "nic1648-magpie-body");
      path(kite, "M0-137L117-10L4-3Z", "nic1648-kite-panel");
      path(kite, "M4-3L0 128L117-10Z", "nic1648-kite-panel-alt");
      path(kite, "M-117-10L0-137L4-3Z", "nic1648-kite-panel-deep");
      path(kite, "M-117-10L0 128L4-3Z", "nic1648-kite-panel-soft");
      path(kite, "M0-139V131M-119-10H119", "nic1648-kite-spar");
      path(kite, "M-4-17Q19-58 62-35Q84-20 69 13Q31 26-3 11Z", "nic1648-magpie-emblem-body");
      path(kite, "M-1-8Q-46-51-76-10Q-50 22-5 17Z", "nic1648-magpie-emblem-wing");
      add(kite, "circle", { class: "nic1648-magpie-emblem-head", cx: 65, cy: -35, r: 20 });
      path(kite, "M82-38L109-28L83-20Z", "nic1648-magpie-emblem-beak");
      add(kite, "circle", { class: "nic1648-magpie-emblem-eye", cx: 70, cy: -40, r: 4 });
      path(kite, "M-6 9Q-52 50-70 91Q-41 79-14 50L6 19Z", "nic1648-magpie-emblem-tail");
      path(kite, "M2 14Q-18 62-20 100Q7 79 24 50L18 18Z", "nic1648-magpie-emblem-tail alternate");
      path(kite, "M0 137Q-45 166-13 195Q15 222-27 258", "nic1648-kite-tail");
      path(kite, "M-20 162L-49 178L-17 191L11 174ZM3 205L-24 222L8 235L34 217", "nic1648-kite-bow");
      path(kite, "M4-3Q66 57 52 132Q45 174 70 211", "nic1648-kite-string");
      add(kite, "circle", { class: "nic1648-kite-reel", cx: 76, cy: 225, r: 20 });
      path(kite, "M64 225H88M76 213V237", "nic1648-kite-reel-spoke");
    }
    return true;
  }
  if (item.family === "nic1648-single-tail-rain-boots") {
    group.classList.add("nic1648-rain-boot");
    if (companion) {
      const maleCurve = "M50 169C46 196 25 203 6 181C-2 172-9 163-21 157";
      path(group, maleCurve, "nic1648-flex-boot-outline companion");
      path(group, maleCurve, "nic1648-flex-boot-shell companion");
      path(group, "M-28 151Q-17 147-5 156Q-7 168-17 173Q-28 169-32 160Z", "nic1648-flex-toe companion");
      path(group, "M-31 169Q-17 178-3 168Q3 165 8 168", "nic1648-flex-sole-outline companion");
      path(group, "M-31 169Q-17 178-3 168Q3 165 8 168", "nic1648-flex-sole companion");
      path(group, "M39 164Q50 157 61 165L60 173Q50 166 39 174Z", "nic1648-flex-cuff companion");
      path(group, "M43 165Q50 161 57 165L57 169Q50 166 43 170Z", "nic1648-flex-opening companion");
      path(group, "M38 180Q29 190 19 189", "nic1648-flex-rib companion");
      [[-25,171,-19,174],[-12,172,-6,170]].forEach(([x1,y1,x2,y2])=>path(group,`M${x1} ${y1}L${x2} ${y2}`,"nic1648-flex-tread companion"));
    } else {
      const primaryCurve = "M182 203C175 255 122 280 78 228C65 213 52 211 40 219C28 227 18 234 6 233";
      path(group, primaryCurve, "nic1648-flex-boot-outline");
      path(group, primaryCurve, "nic1648-flex-boot-shell");
      path(group, "M-7 225Q9 216 27 223Q29 239 16 247Q0 247-9 238Z", "nic1648-flex-toe");
      path(group, "M-9 244Q10 254 30 244Q43 235 55 239", "nic1648-flex-sole-outline");
      path(group, "M-9 244Q10 254 30 244Q43 235 55 239", "nic1648-flex-sole");
      path(group, "M163 198Q182 188 201 200L200 212Q182 202 164 214Z", "nic1648-flex-cuff");
      path(group, "M168 200Q182 194 196 201L195 207Q182 201 169 208Z", "nic1648-flex-opening");
      path(group, "M151 230Q137 244 121 247M109 240Q96 246 84 239", "nic1648-flex-rib");
      [[-2,247,9,250],[18,248,29,244],[39,239,49,239]].forEach(([x1,y1,x2,y2])=>path(group,`M${x1} ${y1}L${x2} ${y2}`,"nic1648-flex-tread"));
      path(group, "M1 229Q12 222 23 226", "nic1648-flex-highlight");
    }
    return true;
  }
  if (item.family === "nic1648-bubble-tea-jetpacks") {
    group.classList.add("nic1648-boba-jetpack");
    shadow(companion ? 76 : 100, companion ? 112 : 121);
    const pack = add(group, "g", { class: "nic1648-boba-pack" });
    if (companion) {
      path(pack, "M-62-72Q-88-40-79 11Q-73 48-53 71M59-67Q86-39 78 13Q72 49 52 70", "nic1648-boba-harness");
      path(pack, "M-55-69H58L48 68Q45 88 1 93Q-43 88-47 68Z", "nic1648-boba-cup companion");
      path(pack, "M-45-13H49L43 67Q18 80-38 68Z", "nic1648-boba-tea companion");
      path(pack, "M-63-79Q1-96 66-77L61-58Q2-70-58-59Z", "nic1648-boba-lid companion");
      path(pack, "M17-73L50-135L66-126L35-68Z", "nic1648-boba-straw companion");
      [[-28,48],[-4,59],[21,45],[36,66],[-20,72],[11,75]].forEach(([cx,cy],index)=>add(pack,"circle",{class:index%3?"nic1648-boba-pearl":"nic1648-boba-pearl accent",cx,cy,r:index%2?8:9}));
      path(pack, "M-66 3L-94 19L-76 47L-54 34ZM57-2L84 14L75 43L51 31Z", "nic1648-boba-fin companion");
      path(pack, "M-69 66H-39L-32 101H-78ZM38 67H66L76 100H31Z", "nic1648-boba-thruster companion");
      path(pack, "M-72 101L-57 127L-42 101ZM40 100L55 127L70 100Z", "nic1648-boba-flame companion");
      path(pack, "M-35-46Q-8-61 18-50", "nic1648-boba-highlight");
    } else {
      path(pack, "M-76-82Q-112-43-101 21Q-94 65-66 87M72-78Q108-41 99 24Q92 65 65 87", "nic1648-boba-harness");
      path(pack, "M-76-75Q0-96 79-73L67 82Q61 108 0 113Q-62 108-68 82Z", "nic1648-boba-cup");
      path(pack, "M-65-15H68L60 81Q24 99-57 82Z", "nic1648-boba-tea");
      path(pack, "M-84-86Q0-110 87-83L81-58Q0-76-78-61Z", "nic1648-boba-lid");
      path(pack, "M12-77L48-161L69-151L34-69Z", "nic1648-boba-straw");
      [[-45,49],[-17,61],[12,48],[39,59],[-34,82],[-3,88],[27,82],[48,77]].forEach(([cx,cy],index)=>add(pack,"circle",{class:index%3?"nic1648-boba-pearl":"nic1648-boba-pearl accent",cx,cy,r:index%2?10:11}));
      path(pack, "M-85-3L-124 18L-101 56L-72 38ZM78-7L117 14L105 52L70 36Z", "nic1648-boba-fin");
      path(pack, "M-89 78H-50L-41 124H-102ZM48 79H87L101 123H37Z", "nic1648-boba-thruster");
      path(pack, "M-96 124L-76 161L-55 124ZM43 123L65 161L88 123Z", "nic1648-boba-flame");
      path(pack, "M-49-50Q-12-74 28-57", "nic1648-boba-highlight");
      path(pack, "M-74-30Q0-48 73-27", "nic1648-boba-liquid-line");
    }
    return true;
  }
  if (item.family === "qg4739-kotop-name-concordance") {
    sampleBox("QG4739");
    return true;
  }
  if (item.family === "qg4739-paired-temperature-differential") {
    shadow(100,108);
    [-1,1].forEach((side,index)=>{const x=side*(companion?45:58);path(group,`M ${x-(companion?21:27)} -77 H ${x+(companion?21:27)} V 35Q${x+(companion?39:50)} 52 ${x+(companion?31:40)} 76Q${x+(companion?24:31)} 101 ${x} 101Q${x-(companion?24:31)} 101 ${x-(companion?31:40)} 76Q${x-(companion?39:50)} 52 ${x-(companion?21:27)} 35Z`,index?"nfr-glass-alt":"nfr-glass");path(group,`M ${x-8} -60 H ${x+8} V 55Q${x+20} 66 ${x+14} 80Q${x+9} 91 ${x} 91Q${x-9} 91 ${x-14} 80Q${x-20} 66 ${x-8} 55Z`,index?"nfr-secondary":"nfr-accent");label(index?"26.0°":"23.7°",x,19,"nfr-small")});
    return true;
  }
  if (item.family === "c0230-seven-isotype-registry") {
    shadow(110,106);
    const xs=companion?[-75,-50,-25,0,25,50,75]:[-96,-64,-32,0,32,64,96];
    xs.forEach((x,index)=>{path(group,`M ${x-(companion?11:14)} -59 H ${x+(companion?11:14)} V 65Q${x} 76 ${x-(companion?11:14)} 65Z`,index===5?"nfr-glass-alt":"nfr-glass");path(group,`M ${x-(companion?13:17)} -64 H ${x+(companion?13:17)} V -45 H ${x-(companion?13:17)} Z`,index===5?"nfr-accent":"nfr-primary");label(String.fromCharCode(65+index),x,48,"nfr-small")});
    path(group,companion?"M-94 76H94V98H-94Z":"M-119 79H119V105H-119Z","nfr-secondary");
    label("7 ISOTYPES",0,companion?92:99,"nfr-small nfr-light-text");
    return true;
  }
  if (item.family === "qg2904-uncracked-pod-seam-scanner") {
    shadow(111,107);
    path(group,companion?"M-104-62H104V85H-104Z":"M-133-77H133V101H-133Z","nfr-primary");
    path(group,companion?"M-89-47H89V61H-89Z":"M-114-60H114V74H-114Z","nfr-glass");
    path(group,companion?"M-71 15Q-37-45 8-32Q59-17 73 24Q43 54-3 49Q-48 48-71 15Z":"M-91 19Q-47-58 10-41Q76-22 94 31Q55 69-4 63Q-62 61-91 19Z","nfr-pod");
    path(group,companion?"M-63 12Q-21 4 64 23":"M-81 15Q-27 5 82 29","nfr-pod-seam");
    label("BLACKBEAN POD",0,companion?78:93,"nfr-small nfr-light-text");
    return true;
  }
  if (item.family === "qg2904-collection-to-funnel-relay") {
    shadow(91,105);
    const width=companion?130:166;
    path(group,`M ${-width/2} -76 H ${width/2} V 91 H ${-width/2} Z`,"nfr-ivory");
    path(group,`M ${-width/2} -76 H ${width/2} V -43 H ${-width/2} Z`,"nfr-primary");
    label("10 JUL",0,-10,"nfr-label");label("24 JUL",0,39,"nfr-label");
    path(group,"M-38 54H38V78H-38Z","nfr-accent");label("RECOVERY",0,71,"nfr-small nfr-light-text");
    return true;
  }
  if (item.family === "dro-canopy-crane-strata-mapper") {
    shadow(108,107);
    path(group,companion?"M-76 85V-79H-49V85M-76-56H66M-41-79H83":"M-98 99V-101H-63V99M-98-72H85M-52-101H108","nfr-crane");
    path(group,companion?"M66-56V10H39V-56M83-79L66-56":"M85-72V14H50V-72M108-101L85-72","nfr-crane-cable");
    path(group,companion?"M22 10H56V40H22Z":"M28 14H72V52H28Z","nfr-accent");
    path(group,companion?"M-96 86H-28M-54-79L-76-56L-49-31L-76-7L-49 18L-76 43L-49 68":"M-123 100H-36M-69-101L-98-72L-63-40L-98-9L-63 23L-98 55L-63 87","nfr-crane-brace");
    label("DRO",companion?-61:-79,companion?98:116,"nfr-small");
    return true;
  }
  if (item.family === "ju1373-torch-ginger-bract-collar") {
    sampleBox("JU1373",true);
    return true;
  }
  if (item.family === "ju1373-type-isolate-signet-engine") {
    shadow(87,106);
    path(group,companion?"M-61-53H61V56Q0 100-61 56Z":"M-78-67H78V71Q0 127-78 71Z","nfr-badge");
    path(group,companion?"M-50-42H50V48Q0 81-50 48Z":"M-64-54H64V61Q0 103-64 61Z","nfr-ivory");
    add(group,"circle",{class:"nfr-accent",cx:0,cy:companion?-3:-4,r:companion?28:36});
    label("TYPE",0,companion?5:7,"nfr-small nfr-light-text");
    path(group,companion?"M-43-53L-25-94L0-69L25-94L43-53":"M-55-67L-32-120L0-88L32-120L55-67","nfr-ribbon");
    label("JU1373",0,companion?58:73,"nfr-small");
    return true;
  }
  if (item.family === "saint-benoit-windward-slope-mobile") {
    shadow(82,107);
    path(group,companion?"M-53-83H53L66-59V78Q66 98 44 103H-44Q-66 98-66 78V-59Z":"M-68-93H68L84-63V82Q84 106 56 112H-56Q-84 106-84 82V-63Z","nfr-glass");
    path(group,companion?"M-59-83H59V-60H-59Z":"M-76-94H76V-62H-76Z","nfr-primary");
    path(group,companion?"M-50 31H50V78Q0 94-50 78Z":"M-64 35H64V83Q0 103-64 83Z","nfr-water");
    [ -40,-15,10,35,60 ].forEach(y=>path(group,`M ${companion?43:56} ${y} H ${companion?60:77}`,"nfr-tape-tick"));
    path(group,companion?"M-42 20L-10-21L13 6L40-31L53 20Z":"M-54 24L-13-27L17 8L51-40L68 24Z","nfr-mountain");
    label("RAIN",0,companion?73:78,"nfr-small nfr-light-text");
    return true;
  }
  return false;
}

function drawElegansFieldAccessory(group, item, companion) {
  const location = santeuilRendererFamilies.has(item.family) ? "santeuil"
    : edinburghRendererFamilies.has(item.family) ? "edinburgh"
      : tenerifeRendererFamilies.has(item.family) ? "tenerife"
        : kauaiRendererFamilies.has(item.family) ? "kauai"
          : actRendererFamilies.has(item.family) ? "act"
            : claremontRendererIds.has(item.id) ? "claremont"
              : araucaniaRendererIds.has(item.id) ? "araucania" : null;
  if (!location) return false;

  group.dataset.renderer = `${item.family}-field-redesign`;
  group.classList.add("elegans-field-redesign", `efr-${location}`, companion ? "efr-companion" : "efr-primary");
  const label = (value, x, y, className = "efr-label") => {
    const node = add(group, "text", { class: className, x, y, "text-anchor": "middle" });
    node.textContent = value;
  };
  const shadow = (rx = 102, y = 104) => add(group, "ellipse", { class: "efr-shadow", cx: 0, cy: y, rx: companion ? rx * .8 : rx, ry: companion ? 11 : 14 });
  const plate = (cx, cy, rx, ry, alternate = false) => {
    add(group, "ellipse", { class: alternate ? "efr-glass-alt" : "efr-glass", cx, cy, rx, ry });
    add(group, "ellipse", { class: "efr-fine efr-no-fill", cx, cy: cy - 4, rx: rx - 7, ry: ry - 7 });
  };
  const bottle = (cx, cy, scale = 1, alternate = false) => {
    const bottleGroup = add(group, "g", { transform: `translate(${cx} ${cy}) scale(${scale})` });
    path(bottleGroup, "M-21-53H21V-35L31-21V55Q31 69 17 73H-17Q-31 69-31 55V-21L-21-35Z", alternate ? "efr-glass-alt" : "efr-glass");
    path(bottleGroup, "M-24-57H24V-39H-24Z", alternate ? "efr-accent" : "efr-primary");
    path(bottleGroup, "M-24 19H24V60H-24Z", alternate ? "efr-water-alt" : "efr-water");
    return bottleGroup;
  };
  const seed = (parent, cx, cy, scale = 1) => path(parent, `M ${cx} ${cy - 12 * scale} Q ${cx + 15 * scale} ${cy - 3 * scale} ${cx} ${cy + 12 * scale} Q ${cx - 15 * scale} ${cy - 3 * scale} ${cx} ${cy - 12 * scale} Z`, "efr-seed");

  if (location === "santeuil" && item.family === "santeuil-railway-driver-uniform") {
    const uniform = add(group, "g", { class: "santeuil-driver-uniform", transform: companion ? "rotate(12)" : "rotate(10)" });
    const jacket = add(uniform, "g", { class: "santeuil-driver-jacket-fit", transform: companion ? "translate(18 8) rotate(15) scale(.78)" : "translate(34 54) rotate(13)" });
    if (companion) {
      path(jacket, "M-71-37Q-43-67-7-61Q30-59 61-31L53 43Q18 58-17 53Q-48 50-66 31Z", "santeuil-driver-jacket companion");
      path(jacket, "M-28-57L-2-23L23-56L40-42L18-4L-3-15L-26-2L-47-39Z", "santeuil-driver-lapels");
      path(jacket, "M-53-40Q-69-13-66 21M50-35Q66-9 54 24", "santeuil-driver-piping");
      [-8,17].forEach(y => add(jacket, "circle", { class: "santeuil-driver-button", cx: 5, cy: y, r: 5 }));
      path(jacket, "M-52 15Q-34 6-21 17L-24 35Q-40 39-55 29Z", "santeuil-driver-pocket");
      add(uniform, "path", { class: "santeuil-driver-cap companion", d: "M-27-72Q0-92 31-71L22-57Q0-64-22-57ZM-34-73Q0-101 42-70Q5-62-34-73Z", transform: "translate(58 -27)" });
    } else {
      path(jacket, "M-88-42Q-54-83-5-76Q48-74 86-35L75 55Q32 72-11 66Q-55 64-82 37Z", "santeuil-driver-jacket");
      path(jacket, "M-39-68L-5-25L30-67L53-47L25 0L-4-14L-35 2L-61-45Z", "santeuil-driver-lapels");
      path(jacket, "M-69-47Q-91-14-82 35M67-40Q88-8 74 37", "santeuil-driver-piping");
      [-15,8,31].forEach(y => [-10,13].forEach(x => add(jacket, "circle", { class: "santeuil-driver-button", cx: x, cy: y, r: 4.5 })));
      path(jacket, "M35 14Q52 4 67 17L64 40Q47 44 33 33Z", "santeuil-driver-pocket");
      add(uniform, "path", { class: "santeuil-driver-cap", d: "M-34-87Q2-112 43-83L32-64Q2-73-27-65ZM-47-87Q1-124 55-81Q5-72-47-87Z", transform: "translate(83 -35)" });
    }
    path(jacket, companion ? "M-31-51Q0-34 31-52L20-25L0-33L-20-25Z" : "M-43-63Q0-39 43-62L27-27L0-41L-27-27Z", "santeuil-driver-neckerchief");
    path(jacket, companion ? "M-20 47Q0 57 23 46" : "M-29 59Q0 72 32 57", "santeuil-driver-hem");
    return true;
  }

  if (location === "santeuil" && item.family === "santeuil-cylinder-organ-instrument") {
    shadow(companion ? 86 : 106, 108);
    const organ = add(group, "g", { class: "santeuil-organ-instrument", transform: companion ? "rotate(7)" : "rotate(-7)" });
    if (companion) {
      path(organ, "M-66-45Q0-70 65-44L59 61Q0 76-61 59Z", "santeuil-organ-cabinet companion");
      path(organ, "M-55-35Q0-53 54-34L52-2Q0 12-54-1Z", "santeuil-organ-window");
      add(organ, "ellipse", { class: "santeuil-organ-cylinder", cx: 0, cy: -18, rx: 43, ry: 13 });
      [-31,-18,-4,11,27].forEach((x, i) => add(organ, "circle", { class: "santeuil-organ-pin", cx: x, cy: -21 + i % 2 * 5, r: 2.5 }));
      path(organ, "M-52 5L48 4L54 31L-50 35Z", "santeuil-organ-bellows companion");
      [-37,-17,3,23,42].forEach(x => path(organ, `M${x} 5L${x + 5} 33`, "santeuil-bellows-fold"));
      path(organ, "M-49 39Q0 32 51 38L48 58Q0 69-49 59Z", "santeuil-organ-keybed");
      for (let i = 0; i < 9; i += 1) path(organ, `M${-41 + i * 10} 40L${-40 + i * 10} 59`, "santeuil-organ-key");
      [-34,-17,0,17,34].forEach((x,i) => path(organ, `M${x}-46V${-72 + Math.abs(2-i)*7}H${x+10}V-46Z`, "santeuil-organ-pipe"));
      path(organ, "M59-21H78V8L91 17", "santeuil-organ-crank");
      add(organ, "circle", { class: "santeuil-crank-knob", cx: 95, cy: 20, r: 6 });
    } else {
      path(organ, "M-76-62Q0-92 76-60L69 72Q0 91-70 70Z", "santeuil-organ-cabinet");
      path(organ, "M-64-50Q0-73 64-48L60-8Q0 9-62-6Z", "santeuil-organ-window");
      add(organ, "ellipse", { class: "santeuil-organ-cylinder", cx: 0, cy: -29, rx: 52, ry: 16 });
      [-41,-28,-15,-2,11,24,37].forEach((x,i) => add(organ, "circle", { class: "santeuil-organ-pin", cx: x, cy: -33 + i % 3 * 5, r: 2.7 }));
      path(organ, "M-62 1L52 0L63 35L-59 42Z", "santeuil-organ-bellows");
      [-47,-25,-3,19,41,56].forEach(x => path(organ, `M${x} 2L${x + 7} 38`, "santeuil-bellows-fold"));
      path(organ, "M-58 47Q0 37 59 45L55 69Q0 83-57 71Z", "santeuil-organ-keybed");
      for (let i = 0; i < 11; i += 1) path(organ, `M${-49 + i * 9.5} 47L${-48 + i * 9.5} 71`, "santeuil-organ-key");
      [-38,-21,-4,13,30].forEach((x,i) => path(organ, `M${x}-61V${-99 + i*7}H${x+11}V-61Z`, i%2 ? "santeuil-organ-pipe alt" : "santeuil-organ-pipe"));
      path(organ, "M72-31H96V7L112 18", "santeuil-organ-crank");
      add(organ, "circle", { class: "santeuil-crank-knob", cx: 117, cy: 21, r: 7 });
      path(organ, "M-51-58Q0-78 52-56M-49 57Q0 70 50 55", "santeuil-organ-inlay");
    }
    return true;
  }

  if (location === "santeuil" && item.family === "santeuil-hogweed-locomotive") {
    shadow(companion ? 103 : 125, 96);
    const train = add(group, "g", { class: "santeuil-hogweed-train", transform: companion ? "rotate(-4)" : "rotate(2)" });
    if (companion) {
      path(train, "M-86-3H40Q67-1 78 19L70 53H-86Z", "santeuil-train-frame companion");
      path(train, "M-61-48H25Q53-46 57-18V20H-66Z", "santeuil-train-boiler companion");
      add(train, "ellipse", { class: "santeuil-train-boiler-rim", cx: -63, cy: -14, rx: 17, ry: 34 });
      add(train, "ellipse", { class: "santeuil-train-hollow", cx: -65, cy: -14, rx: 10, ry: 23 });
      path(train, "M28-54H70V23H31ZM37-43H61V-18H37Z", "santeuil-train-cab companion");
      path(train, "M-24-70H1L-4-47H-20ZM-30-76H8", "santeuil-train-chimney");
      path(train, "M44-62H73L80-53H37Z", "santeuil-train-roof");
      [-45,18,57].forEach((x,i) => add(train, "circle", { class: i===1 ? "santeuil-train-wheel small" : "santeuil-train-wheel", cx:x, cy:55, r:i===1?18:23 }));
      path(train, "M-45 55L57 55M-42 55Q4 25 57 55", "santeuil-train-rods");
    } else {
      path(train, "M-112-4H52Q88-2 101 25L91 62H-112Z", "santeuil-train-frame");
      path(train, "M-83-59H37Q67-57 72-22V29H-89Z", "santeuil-train-boiler");
      add(train, "ellipse", { class: "santeuil-train-boiler-rim", cx: -87, cy: -15, rx: 22, ry: 43 });
      add(train, "ellipse", { class: "santeuil-train-hollow", cx: -89, cy: -15, rx: 13, ry: 29 });
      [-48,-7,33].forEach((x,i) => path(train, `M${x}-57Q${x+10}-13 ${x+2} 27`, "santeuil-train-stem-node"));
      path(train, "M44-74H94V33H47ZM56-60H82V-23H56Z", "santeuil-train-cab");
      path(train, "M-28-92H3L-3-59H-22ZM-37-99H14", "santeuil-train-chimney");
      path(train, "M52-84H100L111-73H40Z", "santeuil-train-roof");
      [-67,-5,62].forEach((x,i) => add(train, "circle", { class: i===1 ? "santeuil-train-wheel small" : "santeuil-train-wheel", cx:x, cy:65, r:i===1?23:30 }));
      path(train, "M-67 65L62 65M-63 65Q-2 24 62 65", "santeuil-train-rods");
      path(train, "M-103 34L-125 53H-104M92 35L119 50H94", "santeuil-train-couplers");
    }
    add(train, "circle", { class: "santeuil-train-lamp", cx: companion ? -79 : -104, cy: companion ? 16 : 20, r: companion ? 8 : 10 });
    return true;
  }

  if (location === "edinburgh" && item.family === "midmar-compost-tumbler") {
    group.classList.add("edinburgh-observing-scope");
    if (companion) {
      const scope = add(group, "g", { class: "efr-scope-assembly companion", transform: "translate(0 -57) rotate(-100)" });
      add(scope, "rect", { class: "efr-scope-tube", x: -83, y: -17, width: 151, height: 34, rx: 10 });
      add(scope, "rect", { class: "efr-scope-dew-shield", x: 50, y: -22, width: 42, height: 44, rx: 5 });
      add(scope, "ellipse", { class: "efr-scope-objective-rim", cx: 92, cy: 0, rx: 8, ry: 23 });
      add(scope, "ellipse", { class: "efr-scope-objective", cx: 94, cy: 0, rx: 5, ry: 17 });
      add(scope, "rect", { class: "efr-scope-focuser", x: -101, y: -13, width: 22, height: 26, rx: 5 });
      add(scope, "rect", { class: "efr-scope-eyepiece", x: -116, y: -8, width: 18, height: 16, rx: 4 });
      add(scope, "rect", { class: "efr-scope-ring", x: -33, y: -21, width: 9, height: 42, rx: 3 });
      add(scope, "rect", { class: "efr-scope-ring", x: 19, y: -21, width: 9, height: 42, rx: 3 });
      add(scope, "rect", { class: "efr-finder-tube", x: -26, y: -33, width: 61, height: 9, rx: 4 });
      path(scope, "M-16-23V-16M25-23V-16", "efr-finder-bracket");
      path(scope, "M-64-8H41", "efr-scope-highlight");
      path(group, "M-37-31Q0-43 37-31L31-17H-31Z", "efr-mount-saddle");
      add(group, "circle", { class: "efr-mount-axis", cx: 0, cy: -18, r: 14 });
      path(group, "M-7-9L-31 20", "efr-counterweight-shaft");
      add(group, "circle", { class: "efr-counterweight", cx: -35, cy: 25, r: 9 });
      path(group, "M-23-4H23L18 13H-18Z", "efr-tripod-hub");
      path(group, "M-14 10L-50 130M14 10L51 130M0 11V128", "efr-tripod");
      path(group, "M-29 49H30M-29 49L0 64M30 49L0 64", "efr-tripod-spreader");
      path(group, "M-62 131H-38M39 131H63M-11 130H12", "efr-tripod-foot");
      path(group, "M-39 57H39V76H-39Z", "efr-scope-plate");
      label("BLACKFORD", 0, 70, "efr-telescope-label");
    } else {
      const scope = add(group, "g", { class: "efr-scope-assembly primary", transform: "translate(0 -66) rotate(18) scale(-1 1)" });
      add(scope, "rect", { class: "efr-scope-tube", x: -113, y: -22, width: 204, height: 44, rx: 12 });
      add(scope, "rect", { class: "efr-scope-dew-shield", x: 67, y: -28, width: 55, height: 56, rx: 6 });
      add(scope, "ellipse", { class: "efr-scope-objective-rim", cx: 122, cy: 0, rx: 10, ry: 29 });
      add(scope, "ellipse", { class: "efr-scope-objective", cx: 125, cy: 0, rx: 7, ry: 22 });
      add(scope, "path", { class: "efr-scope-lens-glint", d: "M124-15Q129-8 127 1" });
      add(scope, "rect", { class: "efr-scope-focuser", x: -137, y: -17, width: 29, height: 34, rx: 6 });
      add(scope, "rect", { class: "efr-scope-eyepiece", x: -158, y: -10, width: 24, height: 20, rx: 5 });
      add(scope, "rect", { class: "efr-scope-ring", x: -48, y: -27, width: 12, height: 54, rx: 4 });
      add(scope, "rect", { class: "efr-scope-ring", x: 23, y: -27, width: 12, height: 54, rx: 4 });
      add(scope, "rect", { class: "efr-finder-tube", x: -38, y: -43, width: 83, height: 12, rx: 5 });
      add(scope, "ellipse", { class: "efr-finder-lens", cx: 46, cy: -37, rx: 4, ry: 7 });
      path(scope, "M-25-30V-20M32-30V-20", "efr-finder-bracket");
      path(scope, "M-88-11H55", "efr-scope-highlight");
      path(group, "M-49-37Q0-54 49-37L41-18H-40Z", "efr-mount-saddle");
      add(group, "circle", { class: "efr-mount-axis", cx: 0, cy: -18, r: 18 });
      path(group, "M-9-7L-43 32", "efr-counterweight-shaft primary");
      add(group, "circle", { class: "efr-counterweight", cx: -48, cy: 38, r: 12 });
      path(group, "M-30-2H30L23 18H-23Z", "efr-tripod-hub");
      path(group, "M-18 15L-66 130M18 15L69 130M0 17V128", "efr-tripod");
      path(group, "M-40 58H41M-40 58L0 78M41 58L0 78", "efr-tripod-spreader");
      path(group, "M-82 131H-51M52 131H84M-15 130H16", "efr-tripod-foot");
      path(group, "M-51 65H51V89H-51Z", "efr-scope-plate");
      label("BLACKFORD", 0, 82, "efr-telescope-label primary");
    }
    const optics = group.querySelector(".efr-scope-assembly");
    const focuser = add(optics, "g", { transform: companion ? "translate(-91 20)" : "translate(-124 26)" });
    const rotor = add(focuser, "g", { class:"edinburgh-focus-wheel" });
    add(rotor, "circle", { r: companion ? 12 : 15, fill:"#d5b978", stroke:"#283b49", "stroke-width":3 });
    add(rotor, "path", { d: companion ? "M-8 0H8M0-8V8" : "M-11 0H11M0-11V11", fill:"none", stroke:"#6d5843", "stroke-width":2.5 });
    add(rotor, "circle", { r:3, fill:"#f1e1b5" });
    return true;
  }

  if (location === "edinburgh" && item.family === "edinburgh-tartan-kilt") {
    group.classList.add("edinburgh-tailored-kilt");
    const outline = companion
      ? "M-32 0Q0 10 32 0Q31 42 45 90Q11 108-34 94Q-39 46-32 0Z"
      : "M-45 0Q0 13 45 0Q47 59 67 112Q14 138-48 117Q-55 63-45 0Z";
    const clipId = `edinburgh-cloth-${companion ? "companion" : "primary"}`;
    const defs = add(group, "defs");
    add(add(defs, "clipPath", { id: clipId }), "path", { d: outline });
    const cloth = add(group, "g", { "clip-path": `url(#${clipId})` });
    add(cloth, "path", { d: outline, fill: "#28564f" });
    const line = (d, stroke, width, opacity = 1) => add(cloth, "path", { d, fill: "none", stroke, "stroke-width": width, opacity });
    // The sett bends with the wool. Narrow gold threads sit within broad woven bands.
    (companion ? [-27,-6,17,37] : [-39,-14,13,40,62]).forEach(x => {
      line(`M${x} -6Q${x-7} 55 ${x+7} 138`, "#152f42", companion ? 9 : 12);
      line(`M${x+3} -6Q${x-4} 55 ${x+10} 138`, "#c5ab6a", 1.8, .85);
    });
    (companion ? [22,47,73,96] : [24,54,84,115]).forEach(y => {
      line(`M-65 ${y}Q0 ${y+16} 80 ${y-4}`, "#993e52", companion ? 6 : 8, .88);
      line(`M-65 ${y+6}Q0 ${y+22} 80 ${y+2}`, "#d5bb78", 1.4, .9);
    });
    (companion ? [-30,-20,29] : [-42,-29,38,51]).forEach(x => {
      add(cloth, "path", { d: `M${x} 12Q${x-5} 59 ${x+5} 130L${x+12} 130Q${x+1} 58 ${x+5} 12Z`, fill: "#102d35", opacity: .56 });
      line(`M${x+5} 17Q${x} 60 ${x+12} 127`, "#659083", 1.5, .65);
    });
    line(companion ? "M21 10Q17 53 30 99" : "M26 13Q24 69 43 127", "#102a35", 3);
    line(companion ? "M24 12Q20 53 33 98" : "M29 14Q27 68 46 125", "#88a092", 1.3);
    add(group, "path", { d: outline, fill: "none", stroke: "#213844", "stroke-width": 3, "stroke-linejoin": "round" });
    add(group, "path", { d: companion ? "M-33-3Q0 5 33-3L32 8Q0 17-33 8Z" : "M-46-4Q0 7 46-4L46 9Q0 22-46 9Z", fill: "#753d48", stroke: "#27313a", "stroke-width": 2.5 });
    add(group, "rect", { x: companion ? 19 : 29, y: 1, width: companion ? 11 : 14, height: 9, rx: 2, fill: "#cfaf69", stroke: "#293b43", "stroke-width": 1.6 });
    add(group, "path", { d: companion ? "M-18 12L-5 29L15 13" : "M-27 15L-3 39L24 16", fill: "none", stroke: "#d0b274", "stroke-width": 2.4 });
    add(group, "path", { d: companion ? "M-17 29Q-4 22 10 30L9 48Q-5 60-18 47Z" : "M-23 37Q-4 25 17 38L15 64Q-4 80-24 64Z", fill: companion ? "#39413e" : "#b18a60", stroke: "#25343c", "stroke-width": 2.7 });
    add(group, "path", { d: companion ? "M-17 30Q-4 38 10 30" : "M-22 38Q-4 49 16 38", fill: "none", stroke: "#e5cc94", "stroke-width": 3 });
    (companion ? [-10,3] : [-15,-4,8]).forEach(x => add(group, "path", { d: `M${x} ${companion ? 47 : 64}v${companion ? 9 : 12}`, fill: "none", stroke: "#273b40", "stroke-width": 3.5, "stroke-linecap": "round" }));
    return true;
  }

  if (location === "edinburgh" && item.family === "great-highland-bagpipes") {
    shadow(106, 109);
    const drawDrone = (x, y, height, angle, alternate = false) => {
      const drone = add(group, "g", { class: "efr-bagpipe-drone", transform: `translate(${x} ${y}) rotate(${angle})` });
      add(drone, "ellipse", { class: "efr-bagpipe-stock", cx: 0, cy: 20, rx: 11, ry: 8 });
      path(drone, `M-7 20L-6 ${-height + 20}Q0 ${-height + 12} 6 ${-height + 20}L7 20Z`, alternate ? "efr-drone-body efr-drone-body-alt" : "efr-drone-body");
      add(drone, "path", { d: `M-2 12V${-height+30}`, fill:"none", stroke:"#73818a", "stroke-width":1.8 });
      [-height * .32, -height * .67].forEach(offset => path(drone, `M-10 ${offset + 20}H10V${offset + 31}H-10Z`, "efr-drone-ferrule"));
      path(drone, `M-11 ${-height + 23}Q0 ${-height + 7} 11 ${-height + 23}V${-height + 34}H-11Z`, alternate ? "efr-drone-cap efr-drone-cap-alt" : "efr-drone-cap");
    };
    const drones = companion
      ? [[-35,-40,108,-12,false],[-8,-47,78,0,true],[18,-42,78,10,false]]
      : [[-43,-44,139,-10,false],[-11,-53,101,-2,true],[22,-46,101,8,false]];
    drones.forEach(parts => drawDrone(...parts));
    path(group, companion
      ? "M-65-4Q-80-48-42-70Q-3-87 37-55Q65-32 57 14Q47 62 5 75Q-41 75-65-4Z"
      : "M-82-2Q-101-57-51-81Q-1-105 51-62Q84-30 72 23Q59 80 4 92Q-54 90-82-2Z", "efr-bag");
    add(group, "path", { d: companion ? "M-60-13Q-62-56-32-62Q-8-67 10-50Q-33-48-42-7Q-42 31-12 58Q-50 43-60-13Z" : "M-75-15Q-77-65-39-74Q-9-80 15-59Q-39-56-52-6Q-50 39-14 73Q-63 51-75-15Z", fill:"#648f7b", opacity:.65 });
    add(group, "path", { d: companion ? "M-53 23Q-37 68 7 65Q37 57 46 27" : "M-66 29Q-45 84 8 79Q46 69 59 31", fill:"none", stroke:"#b8c2a0", "stroke-width":2, "stroke-dasharray":"3 4" });
    path(group, companion
      ? "M-58-17Q-7-62 49-31M-61 7Q-5-31 55 0M-49 42Q1 14 49 35"
      : "M-73-22Q-8-78 61-37M-78 8Q-7-43 68 1M-63 51Q0 13 61 44", "efr-bag-braid");
    path(group, companion
      ? "M-31-77Q-14-57 1-83Q19-55 33-76M-26-69Q-3-46 25-67"
      : "M-47-98Q-24-68-5-105Q18-69 39-96M-40-87Q-6-54 34-84", "efr-drone-cord");
    [-1,1].forEach(direction => path(group, companion
      ? `M${direction * 26}-68Q${direction * 31}-56 ${direction * 25}-43M${direction * 21}-43L${direction * 27}-31M${direction * 27}-43L${direction * 34}-33`
      : `M${direction * 39}-86Q${direction * 46}-70 ${direction * 37}-54M${direction * 31}-54L${direction * 40}-38M${direction * 40}-54L${direction * 49}-42`, "efr-cord-tassel"));
    const blowpipe = add(group, "g", { transform: companion ? "translate(43 -31) rotate(51)" : "translate(56 -38) rotate(49)" });
    path(blowpipe, companion ? "M0 0H76" : "M0 0H96", "efr-blowpipe");
    path(blowpipe, companion ? "M63-8H82V8H63Z" : "M79-9H102V9H79Z", "efr-blowpipe-mouthpiece");
    add(blowpipe, "ellipse", { class: "efr-bagpipe-stock", cx: 0, cy: 0, rx: 10, ry: 8 });
    const chanter = add(group, "g", { transform: companion ? "translate(36 30) rotate(-24)" : "translate(48 37) rotate(-24)" });
    path(chanter, companion ? "M-8 0H8L13 78Q0 88-13 78Z" : "M-10 0H10L16 101Q0 114-16 101Z", "efr-chanter-body");
    path(chanter, companion ? "M-18 75Q0 89 18 75L14 91Q0 101-14 91Z" : "M-23 98Q0 116 23 98L18 119Q0 132-18 119Z", "efr-chanter-sole");
    (companion ? [25,40,55,69] : [29,47,65,83,98]).forEach(y => add(chanter, "circle", { class: "efr-hole efr-chanter-hole", cx: 0, cy: y, r: companion ? 3.2 : 3.8 }));
    return true;
  }

  if (location === "tenerife" && item.family === "avocado-microhabitat-viewer") {
    shadow(105, 104);
    path(group, companion ? "M-84 28H84L72 88H-72Z" : "M-108 25H108L94 92H-94Z", "efr-primary");
    path(group, companion ? "M-62-12Q-66-69-20-87Q33-101 63-50Q86-6 50 47Q17 82-25 62Q-62 48-62-12Z" : "M-79-13Q-84-83-25-104Q42-119 80-58Q108-4 64 58Q20 99-32 75Q-79 59-79-13Z", "efr-avocado");
    path(group, companion ? "M-48-6Q-51-51-16-65Q24-75 47-38Q64-3 37 34Q6 61-25 43Q-48 31-48-6Z" : "M-61-8Q-66-63-20-80Q31-92 60-46Q83-3 47 44Q9 77-31 55Q-61 39-61-8Z", "efr-avocado-flesh");
    add(group, "circle", { class: "efr-pit", cx: companion ? 10 : 12, cy: companion ? 5 : 7, r: companion ? 23 : 30 });
    path(group, "M-70 58H71", "efr-fine");
    label("AVOCADO", 0, companion ? 80 : 83, "efr-small efr-light-text");
    return true;
  }

  if (location === "tenerife" && item.family === "aerial-root-harp") {
    shadow(102, 103);
    add(group, "circle", { class: "efr-primary", cx: companion ? -42 : -55, cy: 24, r: companion ? 47 : 57 });
    path(group, companion ? "M-42 24L22-66H75V-43H37L-22 39Z" : "M-55 24L24-82H91V-56H42L-31 43Z", "efr-tape-blade");
    [0,1,2,3,4,5].forEach(index => {
      const x = (companion ? 2 : 1) + index * (companion ? 11 : 14);
      path(group, `M ${x} ${companion ? -54 + index * 2 : -69 + index * 2} L ${x + 5} ${companion ? -45 + index * 2 : -59 + index * 2}`, "efr-tape-tick");
    });
    path(group, companion ? "M-69 31Q-43-14-17 30Q-35 68-69 31Z" : "M-88 33Q-55-24-21 31Q-46 82-88 33Z", "efr-root");
    label("ROOT", companion ? -42 : -55, 36, "efr-small efr-light-text");
    return true;
  }

  if (location === "tenerife" && item.family === "linnaean-seed-exchange-engine") {
    shadow(112, 107);
    const width = companion ? 174 : 226;
    path(group, `M ${-width / 2} -45 H ${width / 2} V 87 H ${-width / 2} Z`, "efr-primary");
    path(group, `M ${-width / 2 + 10} -35 H ${width / 2 - 10} V 72 H ${-width / 2 + 10} Z`, "efr-ivory");
    const packets = companion ? [[-50,-23],[2,-15],[50,-23]] : [[-72,-22],[-23,-13],[27,-24],[74,-13]];
    packets.forEach(([x,y],index) => {
      path(group, `M ${x - 20} ${y} H ${x + 20} V ${y + 66} H ${x - 20} Z`, index % 2 ? "efr-packet-alt" : "efr-packet");
      seed(group, x, y + 33, .7);
    });
    path(group, `M ${-width / 2 + 7} -51 Q 0 -99 ${width / 2 - 7} -51`, "efr-lid");
    label("SEED BOX", 0, 82, "efr-small efr-light-text");
    return true;
  }

  if (location === "kauai" && item.family === "xz1516-forest-bird-headphones") {
    if (companion) {
      path(group, "M-60 23Q-61-64 0-79Q53-68 60 4", "xz-headphone-band companion");
      path(group, "M-74-1Q-52-28-31-7L-29 36Q-53 54-73 31Z", "xz-earcup companion");
      path(group, "M34-15Q62-37 73-8L64 31Q42 42 29 17Z", "xz-earcup alt");
      path(group, "M-56 5Q-44-14-35-3M45-7Q57-20 65-4", "xz-earcup-pad");
      path(group, "M59-22Q84-31 93-12Q79-3 63 2", "xz-bird-sound-scoop companion");
    } else {
      path(group, "M-82 34Q-87-86 3-106Q81-88 84 10", "xz-headphone-band");
      path(group, "M-101-3Q-70-42-40-11L-39 50Q-72 75-101 43Z", "xz-earcup");
      path(group, "M45-26Q82-55 101-15L89 42Q57 61 37 25Z", "xz-earcup alt");
      path(group, "M-78 6Q-61-20-47-5M60-15Q77-35 90-10", "xz-earcup-pad");
      path(group, "M84-37Q124-54 139-22Q116-5 92 4", "xz-bird-sound-scoop");
      path(group, "M-40-79Q2-101 43-76M-31-63Q5-79 33-59", "xz-band-highlight");
      [[-115,-30],[-126,-11],[-119,11]].forEach(([cx,cy], index)=>path(group, `M${cx} ${cy}q${-12-index*3} ${-8+index*4} ${-21-index*3} 2`, "xz-sound-wave"));
    }
    return true;
  }

  if (location === "kauai" && item.family === "xz1516-ohia-blossom-microphone") {
    shadow(companion ? 63 : 82, 111);
    if (companion) {
      path(group, "M-7-37Q-31 7-25 71M2-36Q20 1 17 67", "xz-mic-stem companion");
      path(group, "M-29 65Q-2 50 25 67L35 82H-39Z", "xz-mic-base companion");
      add(group, "ellipse", { class: "xz-mic-core companion", cx: -3, cy: -42, rx: 25, ry: 31, transform: "rotate(-15 -3 -42)" });
      [[-35,-58],[-24,-78],[0,-84],[23,-72],[31,-48],[-27,-32],[23,-28]].forEach(([x,y], index)=>path(group, `M-2-43Q${x*.45} ${y*.72} ${x} ${y}`, index%2?"xz-ohia-stamen alt":"xz-ohia-stamen"));
      [[-35,-58],[-24,-78],[0,-84],[23,-72],[31,-48],[-27,-32],[23,-28]].forEach(([cx,cy], index)=>add(group,"circle",{class:index%2?"xz-ohia-tip alt":"xz-ohia-tip",cx,cy,r:4.5}));
      add(group, "ellipse", { class: "xz-mic-core companion", cx: -3, cy: -42, rx: 19, ry: 25, transform: "rotate(-15 -3 -42)" });
      path(group, "M-15-51Q-3-60 9-50M-16-41Q-3-49 10-40M-14-31Q-3-37 8-30", "xz-mic-grille companion");
    } else {
      path(group, "M-12-43Q-42 22-30 96M3-42Q31 11 25 91", "xz-mic-stem");
      path(group, "M-43 87Q-5 66 37 91L50 111H-54Z", "xz-mic-base");
      add(group, "ellipse", { class: "xz-mic-core", cx: -5, cy: -53, rx: 35, ry: 43, transform: "rotate(-14 -5 -53)" });
      [[-53,-74],[-42,-105],[-13,-119],[20,-108],[46,-78],[44,-43],[20,-22],[-18,-18],[-49,-37]].forEach(([x,y], index)=>path(group, `M-4-54Q${x*.43} ${y*.74} ${x} ${y}`, index%3?"xz-ohia-stamen":"xz-ohia-stamen alt"));
      [[-53,-74],[-42,-105],[-13,-119],[20,-108],[46,-78],[44,-43],[20,-22],[-18,-18],[-49,-37]].forEach(([cx,cy], index)=>add(group,"circle",{class:index%3?"xz-ohia-tip":"xz-ohia-tip alt",cx,cy,r:6}));
      add(group, "ellipse", { class: "xz-mic-core", cx: -5, cy: -53, rx: 27, ry: 35, transform: "rotate(-14 -5 -53)" });
      path(group, "M-23-67Q-4-82 18-66M-19-51Q-2-62 16-50M-14-36Q0-44 13-36", "xz-mic-grille");
    }
    return true;
  }

  if (location === "kauai" && item.family === "xz1516-genome-tuning-wheel") {
    shadow(companion ? 72 : 92, 114);
    if (companion) {
      add(group, "circle", { class: "xz-tuning-wheel companion", cx: -4, cy: -21, r: 54 });
      add(group, "circle", { class: "xz-tuning-hub companion", cx: -4, cy: -21, r: 15 });
      [-85,-28,30,88].forEach((angle,index)=>path(group, `M-4-21L${-4+46*Math.cos(angle*Math.PI/180)} ${-21+46*Math.sin(angle*Math.PI/180)}`, index%2?"xz-tuning-spoke alt":"xz-tuning-spoke"));
      path(group, "M-40-30Q-18-58 4-29Q26 0 45-29", "xz-genome-strand");
      path(group, "M-40-12Q-18 16 4-12Q26-40 45-12", "xz-genome-strand alt");
      [-31,-12,7,26].forEach(x=>path(group,`M${x} ${x%2?-28:-18}L${x+8} ${x%2?-17:-29}`,"xz-genome-rung"));
      path(group, "M-25 37L-38 80M18 35L36 77M-38 80H-58M36 77H57", "xz-tuning-stand companion");
      path(group, "M49-9Q77-5 72 20L61 33", "xz-tuning-crank companion");
    } else {
      add(group, "circle", { class: "xz-tuning-wheel", cx: -5, cy: -25, r: 79 });
      add(group, "circle", { class: "xz-tuning-hub", cx: -5, cy: -25, r: 22 });
      [-102,-51,0,51,102,153].forEach((angle,index)=>path(group, `M-5-25L${-5+68*Math.cos(angle*Math.PI/180)} ${-25+68*Math.sin(angle*Math.PI/180)}`, index%2?"xz-tuning-spoke alt":"xz-tuning-spoke"));
      path(group, "M-57-37Q-28-78 2-38Q33 1 60-39", "xz-genome-strand");
      path(group, "M-57-12Q-28 29 2-11Q33-50 60-13", "xz-genome-strand alt");
      [-45,-25,-5,15,35].forEach((x,index)=>path(group,`M${x} ${index%2?-35:-19}L${x+12} ${index%2?-20:-36}`,"xz-genome-rung"));
      path(group, "M-38 42L-58 106M27 39L54 102M-58 106H-91M54 102H88", "xz-tuning-stand");
      path(group, "M70-6Q111-2 105 35L88 52", "xz-tuning-crank");
      add(group, "circle", { class: "xz-tuning-knob", cx: 84, cy: 58, r: 10 });
      path(group, "M-65-78Q-30-112 6-88Q39-70 67-91", "xz-branching-signal");
    }
    return true;
  }

  if (location === "kauai" && item.family === "decay-substrate-theatre") {
    shadow(companion ? 76 : 92, 103);
    path(group, companion ? "M-61-55Q-82-23-73 29Q-68 63-47 77M61-55Q82-23 73 29Q68 63 47 77" : "M-76-61Q-103-25-91 37Q-85 76-58 91M76-61Q103-25 91 37Q85 76 58 91", "kauai-case-straps");
    path(group, companion
      ? "M-69-45Q-49-77 0-81Q49-77 69-45L61 62Q0 91-61 62Z"
      : "M-86-50Q-61-92 0-97Q61-92 86-50L76 77Q0 112-76 77Z", "kauai-case-shell");
    path(group, companion
      ? "M-55-35Q-37-58 0-61Q37-58 55-35L50 35Q0 57-50 35Z"
      : "M-69-39Q-46-70 0-73Q46-70 69-39L62 45Q0 72-62 45Z", "kauai-case-window");
    path(group, companion ? "M-48-28Q-22-52 1-20Q-15 17-48 2Z" : "M-59-31Q-28-61 2-23Q-18 25-59 5Z", "kauai-case-leaf");
    path(group, companion ? "M6 19Q30-43 52-3Q42 36 6 19Z" : "M8 23Q39-54 65-4Q53 45 8 23Z", "kauai-case-fragment");
    path(group, companion ? "M-56 44Q0 67 56 43" : "M-69 56Q0 84 69 54", "kauai-case-seam");
    path(group, companion ? "M-17 50H17V72H-17Z" : "M-21 63H21V89H-21Z", "kauai-case-buckle");
    path(group, companion ? "M-35-73Q0-99 35-73" : "M-44-88Q0-121 44-88", "kauai-case-handle");
    return true;
  }

  if (location === "kauai" && item.family === "kokee-cloud-water-collector") {
    shadow(companion ? 76 : 91, 108);
    path(group, companion ? "M-72-46Q0-101 72-46" : "M-91-54Q0-125 91-54", "kauai-mist-yoke");
    const collectors = companion
      ? [[-39,-27,.72,false],[38,-19,.63,true]]
      : [[-50,-34,.88,false],[49,-25,.77,true]];
    collectors.forEach(([cx,cy,scale,alternate]) => {
      const collector = add(group, "g", { transform: `translate(${cx} ${cy}) scale(${scale})` });
      path(collector, alternate ? "M-7-23Q16-78 48-62Q35-18-7-23Z" : "M7-23Q-16-78-48-62Q-35-18 7-23Z", alternate ? "kauai-mist-leaf-alt" : "kauai-mist-leaf");
      path(collector, alternate ? "M-2-28Q17-49 39-57M5-24Q23-31 38-31" : "M2-28Q-17-49-39-57M-5-24Q-23-31-38-31", "kauai-mist-vein");
      path(collector, "M-8-22H8V-7Q28 13 28 44Q28 72 0 84Q-28 72-28 44Q-28 13-8-7Z", alternate ? "kauai-mist-flask-alt" : "kauai-mist-flask");
      path(collector, "M-20 48Q0 61 20 48V62Q0 77-20 62Z", alternate ? "kauai-mist-water-alt" : "kauai-mist-water");
      path(collector, "M-10 15Q-18 31-14 42", "kauai-mist-glint");
      add(collector, "circle", { class: "kauai-mist-drop", cx: 0, cy: -15, r: 5 });
    });
    path(group, companion ? "M-71-45Q-82-9-68 21M71-45Q82-9 68 21" : "M-90-53Q-103-9-86 29M90-53Q103-9 86 29", "kauai-mist-ties");
    return true;
  }

  if (location === "kauai" && item.family === "xz1516-haplotype-viewer") {
    shadow(companion ? 73 : 89, 105);
    const cards = companion ? 5 : 6;
    for (let index = 0; index < cards; index += 1) {
      const angle = -72 + index * (companion ? 36 : 29);
      const card = add(group, "g", { transform: `rotate(${angle}) translate(0 ${companion ? -43 : -53})` });
      path(card, companion ? "M-18-50Q0-63 18-50L16 35Q0 47-16 35Z" : "M-22-62Q0-78 22-62L20 43Q0 57-20 43Z", index % 2 ? "kauai-haplotype-card-alt" : "kauai-haplotype-card");
      path(card, companion ? "M-12-31H12M-12-13H12M-12 5H12" : "M-15-39H15M-15-17H15M-15 6H15", index % 2 ? "kauai-haplotype-band-alt" : "kauai-haplotype-band");
    }
    add(group, "circle", { class: "kauai-haplotype-clip", cx: 0, cy: 0, r: companion ? 23 : 29 });
    path(group, companion ? "M-10-5Q0-18 10-5Q0 9-10 23M10-5Q0 9 10 23Q0 36-10 23" : "M-13-7Q0-24 13-7Q0 12-13 30M13-7Q0 12 13 30Q0 47-13 30", "kauai-haplotype-dna");
    path(group, companion ? "M-53 55Q0 79 53 55L45 88Q0 106-45 88Z" : "M-66 67Q0 97 66 67L57 108Q0 132-57 108Z", "kauai-haplotype-ribbon");
    label("XZ1516", 0, companion ? 86 : 104, "efr-small efr-light-text");
    return true;
  }

  if (location === "auckland" && item.family === "eca36-grass-litter-profiler") {
    shadow(93, 108);
    const width = companion ? 126 : 158;
    path(group, `M ${-width / 2} -77 H ${width / 2} L ${width / 2 + 11} 87 H ${-width / 2 - 11} Z`, "efr-glass");
    path(group, `M ${-width / 2} -77 H ${width / 2} V -54 H ${-width / 2} Z`, "efr-primary");
    path(group, `M ${-width / 2 + 11} -47 H ${width / 2 - 11}`, "efr-zip");
    const blades = companion ? [-45,-23,0,23,45] : [-59,-35,-12,12,35,59];
    blades.forEach((x,index)=>path(group,`M ${x} 47 Q ${x + (index%2?11:-9)} ${index%2?-18:-33} ${x + (index%2?7:-6)} ${index%2?-43:-57}`,index%2?"efr-grass-alt":"efr-grass"));
    path(group, `M ${-width / 2 + 12} 51 H ${width / 2 - 12} V 80 H ${-width / 2 + 12} Z`, "efr-secondary");
    label("ECA36 GRASS", 0, 72, "efr-small");
    return true;
  }

  if (location === "auckland" && item.family === "auckland-volcanic-field-monitor") {
    shadow(110, 105);
    path(group, companion ? "M-91-47H91V71H-91Z" : "M-117-56H117V80H-117Z", "efr-primary");
    add(group,"ellipse",{class:"efr-drum",cx:companion?-48:-62,cy:4,rx:companion?31:39,ry:companion?45:55});
    path(group, companion ? "M-70 4H78" : "M-89 4H101", "efr-trace-base");
    path(group, companion ? "M-70 5L-47-10L-23 18L2-25L27 29L52-8L78 5" : "M-89 5L-61-15L-32 23L0-34L31 36L63-12L101 5", "efr-trace");
    path(group, companion ? "M60-47V-81L75-98L88-81V-47" : "M77-56V-99L96-119L113-99V-56", "efr-pendulum");
    add(group,"circle",{class:"efr-gold",cx:companion?75:96,cy:companion?-75:-91,r:8});
    path(group, companion ? "M-83 74H83V94H-83Z" : "M-108 83H108V105H-108Z", "efr-secondary");
    label("SEISMOGRAPH", 0, companion ? 89 : 99, "efr-small");
    return true;
  }

  if (location === "auckland" && item.family === "eca36-reproductive-timing-clock") {
    shadow(84, 106);
    path(group, companion ? "M-44-70Q-68-35-67 12Q-66 57-43 79" : "M-52-78Q-80-38-78 14Q-76 64-50 89", "efr-strap");
    path(group, companion ? "M44-70Q68-35 67 12Q66 57 43 79" : "M52-78Q80-38 78 14Q76 64 50 89", "efr-strap");
    const radius=companion?64:78;
    add(group,"circle",{class:"efr-primary",cx:0,cy:0,r:radius});
    add(group,"circle",{class:"efr-ivory",cx:0,cy:0,r:radius-12});
    [0,30,60,90,120,150,180,210,240,270,300,330].forEach(deg=>{const rad=deg*Math.PI/180;path(group,`M ${(Math.cos(rad)*(radius-24)).toFixed(1)} ${(Math.sin(rad)*(radius-24)).toFixed(1)} L ${(Math.cos(rad)*(radius-15)).toFixed(1)} ${(Math.sin(rad)*(radius-15)).toFixed(1)}`,"efr-fine")});
    path(group,"M0 4L-22-31M0 4L35 17","efr-hands");
    add(group,"circle",{class:"efr-gold",cx:0,cy:4,r:7});
    path(group,"M-33 35H33V58H-33Z","efr-accent");
    label("ECA36",0,52,"efr-small efr-light-text");
    return true;
  }

  if (location === "araucania" && item.family === "compost-labyrinth") {
    shadow(102, 107);
    path(group, companion ? "M-72-48H72L62 78Q0 99-62 78Z" : "M-91-55H91L78 82Q0 108-78 82Z", "efr-bucket");
    path(group, companion ? "M-76-49H76V-28H-76Z" : "M-96-56H96V-31H-96Z", "efr-primary");
    path(group, companion ? "M-62-27Q0-53 62-27V13Q0 40-62 13Z" : "M-79-29Q0-62 79-29V18Q0 52-79 18Z", "efr-compost");
    [[-42,-17],[-13,-28],[18,-16],[44,-25],[-27,4],[7,8],[34,4]].filter(([x])=>companion?Math.abs(x)<48:true).forEach(([x,y],index)=>path(group,index%2?`M ${x-7} ${y} Q ${x} ${y-13} ${x+7} ${y} Q ${x} ${y+9} ${x-7} ${y} Z`:`M ${x-8} ${y-5} L ${x+7} ${y+6}`,index%2?"efr-leaf":"efr-twig"));
    path(group, companion ? "M-56-50Q-72-103 0-105Q72-103 56-50" : "M-69-57Q-89-122 0-125Q89-122 69-57", "efr-handle");
    path(group, companion ? "M48-46L81 48L63 60L30-37Z" : "M61-54L104 55L80 70L38-45Z", "efr-trowel");
    label("COMPOST",0,70,"efr-small efr-light-text");
    return true;
  }

  if (location === "araucania" && item.family === "ashfall-recorder") {
    shadow(86, 107);
    path(group, companion ? "M-52-84H52L63-61V76Q63 95 43 100H-43Q-63 95-63 76V-61Z" : "M-67-91H67L80-64V80Q80 102 54 108H-54Q-80 102-80 80V-64Z", "efr-glass");
    path(group, companion ? "M-58-84H58V-61H-58Z" : "M-74-92H74V-63H-74Z", "efr-primary");
    path(group, companion ? "M-51 28H51V77Q0 94-51 77Z" : "M-65 31H65V82Q0 104-65 82Z", "efr-ash");
    [-40,-15,10,35,60].forEach(y=>path(group,`M ${companion?40:53} ${y} H ${companion?58:74}`,"efr-tick"));
    path(group, companion ? "M-40 17L-9-19L11 5L32-28L50 17Z" : "M-52 20L-12-27L15 5L43-37L65 20Z", "efr-mountain");
    label("ASH",0,companion?69:74,"efr-small efr-light-text");
    return true;
  }

  if (location === "araucania" && item.family === "test-cross-mechanism") {
    shadow(108, 105);
    const offset=companion?41:53;
    path(group, companion ? "M-101-66H101V88H-101Z" : "M-128-72H128V94H-128Z", "efr-primary");
    plate(-offset,4,companion?43:53,companion?32:39);
    plate(offset,10,companion?43:53,companion?32:39,true);
    path(group,"M-24 2H24M12-10L26 2L12 14","efr-forward-arrow");
    path(group,"M24 32H-24M-12 20L-26 32L-12 44","efr-return-arrow");
    label("A",-offset,12,"efr-card-symbol");
    label("B",offset,18,"efr-card-symbol");
    path(group, companion ? "M-76 51H76V77H-76Z" : "M-96 55H96V83H-96Z", "efr-ivory");
    label("RECIPROCAL CROSS",0,companion?69:75,"efr-small");
    return true;
  }

  return false;
}

function drawNamedAccessory(group, item, companion) {
  if (drawRefinedAccessory(group, item, companion)) return true;
  if (drawBriggsaeFieldAccessory(group, item, companion)) return true;
  if (drawElegansFieldAccessory(group, item, companion)) return true;
  if (drawNigoniFieldAccessory(group, item, companion)) return true;
  if (drawGuadeloupeNIC203Accessory(group, item, companion)) return true;
  if (drawTropicalisFieldAccessory(group, item, companion)) return true;
  if (drawNambuccaQG2814Accessory(group, item, companion)) return true;
  if (drawDoisRiosEG5612Accessory(group, item, companion)) return true;
  if (drawOrsayJU2518Accessory(group, item, companion)) return true;
  if (drawKauaiQG130Accessory(group, item, companion)) return true;
  if (drawSaltLakeEG4181Accessory(group, item, companion)) return true;
  if (drawLombokHPT26Accessory(group, item, companion)) return true;
  if (drawHCMCJU4356Accessory(group, item, companion)) return true;
  if (drawMauritiusJU2909Accessory(group, item, companion)) return true;
  if (drawMahahualJU2617Accessory(group, item, companion)) return true;
  if (drawKauaiQG131Accessory(group, item, companion)) return true;
  if (drawOahuECA789Accessory(group, item, companion)) return true;
  if (drawSandaJU1873Accessory(group, item, companion)) return true;
  if (drawBarroColoradoQG2726Accessory(group, item, companion)) return true;
  if (drawAhmedabadAF16Accessory(group, item, companion)) return true;
  if (drawReunionJU1373Accessory(group, item, companion)) return true;
  if (drawSanteuilAccessory(group, item, companion)) return true;
  if (drawEdinburghAccessory(group, item, companion)) return true;
  if (drawTenerifeAccessory(group, item, companion)) return true;
  if (drawKauaiAccessory(group, item, companion)) return true;
  if (drawAustralianCapitalTerritoryAccessory(group, item, companion)) return true;
  if (drawClaremontECA250Accessory(group, item, companion)) return true;
  if (drawAraucaniaAccessory(group, item, companion)) return true;
  if (drawTrivandrumAccessory(group, item, companion)) return true;
  if (drawPraslinAccessory(group, item, companion)) return true;
  if (drawSaoTomeAccessory(group, item, companion)) return true;
  if (drawPohnpeiQG4739Accessory(group, item, companion)) return true;
  if (drawQueenslandQG2904Accessory(group, item, companion)) return true;
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
  },
  extra: {
    head: { primary: [331, 53, 1], companion: [111, 104, .58] },
    garment: { primary: [286, 114, .67], companion: [101, 127, .4] },
    prop: { primary: [306, 105, .66], companion: [105, 125, .4] }
  }
};

function renderPiece(target, item, wormPart) {
  const companion = wormPart === "companion";
  let [x, y, scale] = layouts[item.slot][item.artKind][wormPart];
  let angleOverride = null;
  const customLayouts = {
    "ngm-agar-plate": { primary: [366, 260, .82, -6], companion: [35, 288, .65, 2] },
    "n2-lab-coat": { primary: [180, 214, 1, 0], companion: [52, 168, .92, -1] },
    "cryo-vial-jetpack": { primary: [258, 118, .84, 208], companion: [43, 132, .65, 212] },
    "n2-lab-goggles": { primary: [331, 53, 1, 14], companion: [111, 104, .58, 14] },
    "fig-fascinator": { primary: [331.5, 47, .50, 25], companion: [114.5, 102, .32, 25] },
    "sample-pannier": { primary: [170, 176, .66, -4], companion: [51, 164, .39, 4] },
    "wings": { primary: [247, 150, .46, 68], companion: [88, 147, .35, 70] },
    "lattice-fan": { primary: [295, 126, .5, -8], companion: [101, 100, .42, -6] },
    "kite-rig": { primary: [168, 190, .46, -4], companion: [61, 185, .36, 4] },
    "soil-kit": { primary: [315, 226, .48, -2], companion: [47, 225, .39, 4] },
    "santeuil-railway-driver-uniform": { primary: [296, 132, .72, 0], companion: [91, 126, .58, 0] },
    "santeuil-cylinder-organ-instrument": { primary: [360, 244, .58, -4], companion: [41, 202, .48, 5] },
    "santeuil-hogweed-locomotive": { primary: [220, 275, .57, -2], companion: [55, 275, .45, -3] },
    "midmar-compost-tumbler": { primary: [270.4, 55, .35, 0], companion: [106.5, 90.5, .22, 0] },
    "galaxy-plate-scanner": { primary: [184, 204, .54, -1], companion: [68, 202, .43, 2] },
    "agassiz-ice-flow-model": { primary: [322, 260, .52, -2], companion: [52, 290, .42, 2] },
    "tenerife-atlantic-canary-costume": { primary: [271, 166, .5, 30], companion: [97, 166, .39, 28] },
    "tenerife-timple-guitar": { primary: [344, 222, .46, -7], companion: [43, 230, .37, 10] },
    "tenerife-teide-star-lantern": { primary: [365, 280, .42, -2], companion: [62, 285, .33, 4] },
    "xz1516-forest-bird-headphones": { primary: [397, 79, .32, -5], companion: [122, 121, .25, 5] },
    "xz1516-ohia-blossom-microphone": { primary: [235, 220, .46, -7], companion: [68, 251, .36, 7] },
    "xz1516-genome-tuning-wheel": { primary: [388, 278, .41, -2], companion: [182, 296, .33, 3] },
    "canberra-flat-white-cafe": { primary: [386, 97, .41, -7], companion: [80, 330, .34, 4] },
    "canberra-dawn-balloon-carriage": { primary: [252, 94, .35, -2], companion: [88, 91, .26, 4] },
    "oconnor-cockatoo-cafe-raid": { primary: [402, 281, .42, -3], companion: [222, 299, .35, 3] },
    "eca36-grass-litter-profiler": { primary: [370, 125, .46, -2], companion: [-5, 95, .3, 2] },
    "auckland-volcanic-field-monitor": { primary: [225, 185, .43, -1], companion: [85, 195, .3, 2] },
    "eca36-reproductive-timing-clock": { primary: [380, 254, .41, -1], companion: [-15, 284, .28, 2] },
    "compost-labyrinth": { primary: [352, 110, .4, -2], companion: [18, 125, .29, 2] },
    "ashfall-recorder": { primary: [222, 190, .37, -1], companion: [85, 218, .28, 2] },
    "test-cross-mechanism": { primary: [360, 268, .35, -1], companion: [0, 292, .29, 2] },
    "trivandrum-field-loupe": { primary: [366, 139, .41, -7], companion: [-3, 118, .33, -7] },
    "trivandrum-garden-watering-can": { primary: [226, 188, .39, 1], companion: [62, 218, .31, 1] },
    "trivandrum-sample-tube": { primary: [365, 269, .39, -2], companion: [3, 291, .3, -2] },
    "praslin-giant-tortoise-shell-costume": { primary: [226, 190, .58, -15], companion: [119, 188, .37, -22] },
    "praslin-black-parrot-carnival-cap": { primary: [370, 60, .29, 8], companion: [98, 99, .23, 7] },
    "praslin-seychelles-carnival-bell-bracelet": { primary: [145, 215, .34, -9], companion: [24, 206, .27, 8] },
    "sao-tome-chocolate-bars": { primary: [369, 122, .34, -5], companion: [-3, 108, .3, 4] },
    "sao-tome-birdsong-music-boxes": { primary: [231, 194, .32, -3], companion: [111, 202, .27, 3] },
    "sao-tome-begonia-glass-parasols": { primary: [368, 273, .31, -4], companion: [17, 286, .26, 4] },
    "qg4739-kotop-fruit-parasol": { primary: [397, 95, .46, -4], companion: [20, 88, .4, 6] },
    "qg4739-peppercorn-rollerboard": { primary: [238, 252, .44, 3], companion: [76, 257, .36, -5] },
    "qg4739-rain-leaf-sled": { primary: [390, 260, .28, -4], companion: [-25, 310, .33, 5] },
    "qg2904-sealed-pod-drum": { primary: [228, 239, .43, 1], companion: [80, 228, .36, 3] },
    "qg2904-funnel-megaphone": { primary: [358, 113, .36, -2], companion: [1, 112, .32, 5] },
    "qg2904-canopy-kaleidoscope": { primary: [340, 278, .4, -4], companion: [-5, 290, .34, 4] },
    "edinburgh-tartan-kilt": { primary: [225, 125, .56, 42], companion: [66, 138, .31, 34] },
    "great-highland-bagpipes": { primary: [306, 177, .40, -8], companion: [110, 163, .26, 5] }
    ,"ju1373-torch-ginger-bract-collar": { primary: [366, 118, .33, -4], companion: [8, 112, .28, 5] }
    ,"ju1373-type-isolate-signet-engine": { primary: [224, 194, .31, -1], companion: [105, 207, .27, 2] }
    ,"saint-benoit-windward-slope-mobile": { primary: [365, 270, .31, 1], companion: [6, 286, .26, -2] }
    ,"qg2726-gustavia-flower-headpiece": { primary: [438, 119, .38, -11], companion: [127, 133, .33, -8] }
    ,"qg2726-golden-fleece-cape": { primary: [300, 124, .42, -9], companion: [136, 121, .36, -11] }
    ,"qg2726-bci-forest-census-map-fans": { primary: [364, 258, .45, -5], companion: [45, 271, .37, 5] }
    ,"ju1873-cacao-specimen-lantern": { primary: [385, 132, .37, -2], companion: [-8, 118, .28, 3] }
    ,"ju1873-balinese-endek-wrap": { primary: [254, 190, .43, 13], companion: [113, 199, .34, 20] }
    ,"ju1873-balinese-gamelan-gong": { primary: [390, 257, .38, -2], companion: [24, 283, .31, 3] }
    ,"guadeloupe-hummingbird-costume": { primary: [264, 184, .43, 28], companion: [92, 173, .35, 26] }
    ,"guadeloupe-madras-carnival-crown": { primary: [355, 55, .42, -3], companion: [111, 104, .34, 4] }
    ,"guadeloupe-gwoka-drum": { primary: [365, 258, .4, -3], companion: [31, 279, .33, 4] }
    ,"eca789-petal-rain-trumpet": { primary: [455, 89, .43, 7], companion: [24, 92, .34, -7] }
    ,"eca789-raindrop-harp": { primary: [233, 200, .39, -3], companion: [106, 221, .31, 4] }
    ,"eca789-cacao-key-xylophone": { primary: [382, 279, .43, -3], companion: [176, 297, .34, 4] }
    ,"qg131-paired-pandanus-key-sorter": { primary: [374, 126, .34, -2], companion: [-8, 116, .27, 2] }
    ,"qg131-four-date-culture-relay": { primary: [220, 187, .32, -1], companion: [108, 213, .26, 2] }
    ,"qg131-mating-id-motion-theatre": { primary: [370, 266, .33, -1], companion: [0, 292, .27, 2] }
    ,"nic1648-taiwan-blue-magpie-kites": { primary: [380, 112, .33, -4], companion: [-10, 80, .3, -6] }
    ,"nic1648-single-tail-rain-boots": { primary: [0, 0, 1, 0], companion: [0, 0, 1, 0] }
    ,"nic1648-bubble-tea-jetpacks": { primary: [231, 178, .29, 8], companion: [92, 142, .25, 8] }
    ,"mahahual-reef-ruffle-swim-costumes": { primary: [220, 155, .5, 20], companion: [67, 149, .37, 34] }
    ,"mahahual-caribbean-sun-spectacles": { primary: [332, 56, .34, -3], companion: [112, 105, .23, 3] }
    ,"mahahual-sea-grape-beach-parasols": { primary: [357, 268, .32, -5], companion: [27, 264, .34, 5] }
    ,"mauritius-ravanne-crawler-drum": { primary: [265, 172, .48, 17], companion: [90, 177, .38, 20] }
    ,"mauritius-vacoas-tail-scoop": { primary: [151, 248, .5, -14], companion: [37, 230, .4, -7] }
    ,"mauritius-dodo-beak-fruit-grabber": { primary: [421, 116, .42, -8], companion: [132, 138, .34, 5] }
    ,"ju4356-carambola-ground-contact-stage": { primary: [374, 126, .34, -2], companion: [-8, 116, .27, 2] }
    ,"ju4356-its2-ribbon-reader": { primary: [220, 187, .32, -1], companion: [108, 213, .26, 2] }
    ,"hcmc-urban-canopy-census-engine": { primary: [370, 266, .33, -1], companion: [0, 292, .27, 2] }
    ,"lingsar-spring-collar": { primary: [330, 100, 1, 25], companion: [110, 125, 1, 27] }
    ,"lingsar-ficus-fruit-transformation": { primary: [186, 201, .66, 13], companion: [49, 172, .32, 21] }
    ,"lingsar-springwater-current": { primary: [105, 289, .84, 0], companion: [12, 213, .63, -6] }
    ,"eg4181-apricot-blossom-hat": { primary: [333, 37, .43, 22], companion: [114, 91, .36, 24] }
    ,"eg4181-beehive-saddle-pack": { primary: [245, 166, .46, 21], companion: [92, 154, .36, 30] }
    ,"eg4181-single-tail-mountain-ski": { primary: [151, 239, .49, -10], companion: [55, 211, .40, -7] }
    ,"eca250-bookworm-book": { primary: [274, 257, .57, -4], companion: [68, 283, .50, 6] }
    ,"eca250-california-lemonade": { primary: [386, 222, .39, -5], companion: [26, 231, .31, 7] }
    ,"eca250-sunny-reading-glasses": { primary: [362, 45, .24, -5], companion: [117, 107, .17, 7] }
    ,"qg130-kukui-glow-cart": { primary: [388, 137, .47, -5], companion: [7, 128, .37, 5] }
    ,"qg130-root-carousel": { primary: [236, 228, .43, -2], companion: [126, 245, .35, 3] }
    ,"qg130-three-ribbon-hoops": { primary: [386, 277, .38, -3], companion: [178, 300, .3, 4] }
    ,"ju1375-vanilla-vine-wrap": { primary: [271, 183, .52, 18], companion: [93, 172, .42, 19] }
    ,"ju1375-sugarcane-juice": { primary: [388, 251, .38, -5], companion: [19, 257, .3, 7] }
    ,"ju1375-bourbon-green-gecko-companion": { primary: [393, 115, .36, -7], companion: [16, 113, .29, 8] }
    ,"ju2518-rotten-apple-decay-rotoscope": { primary: [327, 54, .40, 14], companion: [114, 104, .25, 25] }
    ,"ju2518-virus-association-spectroscope": { primary: [232, 186, .34, 1], companion: [115, 213, .27, -2] }
    ,"ju2518-six-september-garden-ledger": { primary: [225, 268, .34, -10], companion: [70, 227, .27, -7] }
    ,"eg5612-jackfruit-emergence-theatre": { primary: [380, 137, .37, -2], companion: [-7, 119, .29, 3] }
    ,"eg5612-shared-bag-provenance-bifurcator": { primary: [232, 186, .34, 1], companion: [115, 213, .27, -2] }
    ,"eg5612-single-larva-test-cross-gate": { primary: [381, 258, .34, -1], companion: [194, 294, .27, 2] }
    ,"qg2814-ground-flower-sample-theatre": { primary: [380, 137, .37, -2], companion: [-7, 119, .29, 3] }
    ,"qg2814-five-day-two-plate-relay": { primary: [232, 186, .34, 1], companion: [115, 213, .27, -2] }
    ,"qg2814-18s-identity-ribbon-reader": { primary: [381, 258, .34, -1], companion: [194, 294, .27, 2] }
  };
  const customLayout = refinedLayouts[item.family]?.[companion ? 1 : 0] ?? customLayouts[item.family]?.[wormPart];
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
  const isLombokWorn = lombokHPT26RendererIds.has(item.id) && item.family !== "lingsar-springwater-current";
  const isFittedHeadwear = item.family === "eg4181-apricot-blossom-hat" || item.family === "ju2518-rotten-apple-decay-rotoscope";
  const isFittedKilt = item.family === "edinburgh-tartan-kilt";
  const isObservingScope = item.family === "midmar-compost-tumbler";
  const artParent = isLombokWorn ? add(piece, "g", { class: `lingsar-worn-motion ${wormPart}` })
    : isFittedHeadwear || isFittedKilt || isObservingScope ? add(piece, "g", { class: `${isObservingScope ? "fitted-scope-motion" : isFittedKilt ? "fitted-kilt-motion" : "fitted-headwear-motion"} ${wormPart}` }) : piece;
  const artwork = add(artParent, "g", { class: "location-accessory-art", transform: `translate(${x} ${y}) rotate(${angle}) scale(${artworkScaleX.toFixed(3)} ${artworkScaleY.toFixed(3)})` });
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
    designItems(design).forEach(item => {
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
    valid: pairCount === accessoryCatalogue.flatMap(designItems).length && !identicalNormalizedPairs.length
  });
}

export function renderLocationAccessories(targets, speciesId, placeName) {
  const design = getAccessoryDesign(speciesId, placeName);
  if (!design) return null;
  const assignments = [
    [targets.headwear, design.headwear],
    [targets.wrap, design.wrap],
    [targets.charm, design.charm],
    [targets.extra, design.extra]
  ];
  assignments.forEach(([target, item]) => {
    if (!target) return;
    target.replaceChildren();
    if (!item) {
      delete target.dataset.accessoryFamily;
      target.hidden = true;
      return;
    }
    target.dataset.accessoryFamily = item.family;
    renderPiece(target, item, "primary");
    renderPiece(target, item, "companion");
  });
  return design;
}
