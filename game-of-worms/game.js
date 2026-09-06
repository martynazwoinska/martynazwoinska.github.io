import { geoGraticule10, geoNaturalEarth1, geoPath } from "https://cdn.jsdelivr.net/npm/d3-geo@3/+esm";
import { feature } from "https://cdn.jsdelivr.net/npm/topojson-client@3/+esm";
import world from "https://esm.sh/@d3-maps/atlas@1.0.0/world/countries/countries-110m";
import { createGameTranslator } from "./game-i18n.js?v=20260802-6";
import { auditEnvironmentCompositions, getEnvironmentProfile, renderEnvironmentScene } from "./environment-scenes.js?v=20260830-43";
import { auditAccessoryCatalogue, auditAccessoryPairGeometry, renderLocationAccessories } from "./accessory-designs.js?v=20260906-kauai-even-cups-2";
import { speciesGalleries } from "./species-gallery.js?v=20260822-11";
import { focusCaenorhabditisTreeLabels, renderCaenorhabditisTree } from "./phylogeny.js?v=20260824-3";

const t = createGameTranslator(document.documentElement.lang);

const species = [
  {
    id: "inopinata",
    short: "C. inopinata",
    name: "Caenorhabditis inopinata",
    nickname: "The fig giant",
    region: "Okinawa, Japan",
    reproduction: "outcrossing",
    reproductionLabel: "♀ female + ♂ male",
    cast: ["female", "male"],
    scale: 1.08,
    pose: "hero",
    localStyle: "okinawa",
    habitat: "Fresh figs",
    habitatKey: "fig",
    intro: "A surprisingly large close relative of C. elegans that lives in fresh figs and travels with fig wasps.",
    fact: "It was discovered on Ishigaki Island and was so unexpected that its name means “surprising.”",
    worm: "#f2b0a8",
    wormDeep: "#c85d68",
    habitatOne: "#f8c98b",
    habitatTwo: "#e98f7a",
    locations: [
      { name: "Ishigaki, Japan", sceneLabel: "Fresh fig · Ishigaki · Japan", coordinates: [124.185225, 24.410572], style: "okinawa", history: "C. inopinata lives in fresh, pollinated figs rather than rotting fruit. Dauer larvae leave mature figs with emerging pollinating wasps, which can carry them to another fig. Its discovery was so unexpected that its name means “surprising”." }
    ]
  },
  {
    id: "briggsae",
    short: "C. briggsae",
    name: "Caenorhabditis briggsae",
    nickname: "The tropical selfer",
    region: "Warm regions worldwide",
    reproduction: "selfing",
    reproductionLabel: "⚥ hermaphrodite + ♂ rare male",
    cast: ["hermaphrodite", "rare male"],
    scale: .73,
    pose: "island",
    localStyle: "rainforest",
    habitat: "Rotting fruit, flowers & compost",
    habitatKey: "tropical",
    intro: "A globally distributed warm-climate selfer often collected from rotting fruit, flowers, compost, and other bacteria-rich plant material.",
    fact: "Self-fertile C. briggsae hermaphrodites can found a population alone. Its sister species C. nigoni instead needs females and males.",
    worm: "#8bc9a7",
    wormDeep: "#387d68",
    habitatOne: "#8ed0ad",
    habitatTwo: "#59a6a0",
    locations: [
      { name: "Ahmedabad, India · AF16", sceneLabel: "Soil · Ahmedabad · India", coordinates: [72.56, 23.03], source: "CaeNDR", style: "field", history: "AF16 came from soil in Ahmedabad—but the entire surviving habitat description is simply “soil”. Its precise city microhabitat remains unknown." },
      { name: "Salt Lake City, Utah · EG4181", sceneLabel: "Rotting apricot · Salt Lake City · United States", coordinates: [-111.867575, 40.707267], source: "CGC EG4181 strain record. CaeNDR EG4360 isotype record", style: "field", strain: "EG4181", history: "EG4181 came from a rotting apricot beneath a garden tree in Salt Lake City in August 2006. The collected worms were noted for moving very quickly." },
      { name: "Kauaʻi, Hawaiʻi · QG130", sceneLabel: "Rotting plants · Kauaʻi · United States", coordinates: [-159.5829, 22.2202], source: "CaeNDR QG130 isotype record", style: "kauai", strain: "QG130", history: "Three closely related C. briggsae strains were recovered from rotting plant material in low-elevation Kauaʻi forest." },
      { name: "Réunion Island · JU1375", sceneLabel: "Farmland mollusc · Réunion · France", coordinates: [55.6885, -21.0469], source: "CaeNDR JU1375 isotype record", style: "ocean", strain: "JU1375", history: "C. briggsae is usually associated with decaying plant material, but this isolate was collected from a mollusc on agricultural land in Réunion." },
      { name: "Orsay, France · JU2518", sceneLabel: "Rotten apple · Orsay · France", coordinates: [2.1725, 48.7015], source: "CaeNDR JU2518 isotype record", style: "field", strain: "JU2518", history: "This worm came from a rotten apple in a rural garden in Orsay, where Santeuil virus was also recorded in the sample." },
      { name: "Dois Rios, Ilha Grande, Brazil · EG5612", sceneLabel: "Rotten jackfruit · Ilha Grande · Brazil", coordinates: [-44.19, -23.18], source: "CaeNDR EG5612 isotype record", style: "rainforest", strain: "EG5612", history: "A rotten jackfruit in Ilha Grande forest produced worms at many stages of life. One young worm founded the laboratory line. The sample bag and culture plates reflect how the samples were transported and how the species was identified." },
      { name: "Nambucca Heads, New South Wales · QG2814", sceneLabel: "Rotting flowers · Nambucca Heads · Australia", coordinates: [153.0090333, -30.6445167], source: "CaeNDR QG2814 isotype record", style: "rainforest", strain: "QG2814", history: "One sample of rotting flowers from a Nambucca Heads rainforest garden produced two laboratory strains. The flower press, paired culture plates and DNA cards follow the sample from collection to identification." }
    ]
  },
  {
    id: "elegans",
    short: "C. elegans",
    name: "Caenorhabditis elegans",
    nickname: "The world traveller",
    region: "Many regions worldwide",
    reproduction: "selfing",
    reproductionLabel: "⚥ hermaphrodite + ♂ rare male",
    cast: ["hermaphrodite", "rare male"],
    scale: .72,
    pose: "forager",
    localStyle: "field",
    habitat: "Rotting plants & compost",
    habitatKey: "compost",
    intro: "The famous laboratory worm is also a wild explorer of short-lived, bacteria-rich places such as rotting fruit and compost.",
    fact: "Most wild individuals are self-fertile hermaphrodites. Rare males make occasional outcrossing possible.",
    worm: "#f0c78e",
    wormDeep: "#bd7c45",
    habitatOne: "#d7b96d",
    habitatTwo: "#8ba56f",
    locations: [
      { name: "Bristol N2, England", sceneLabel: "Mushroom compost · Bristol · England", coordinates: [-2.59, 51.45], source: "CaeNDR", style: "field", strain: "N2", history: "N2 came from mushroom compost near Bristol. C. elegans can be frozen alive in a protective solution and revived after thawing. This is the reason for its cryo-vial jetpack. An early N2 tube frozen around 1968 was later thawed to establish an ancestral laboratory stock." },
      { name: "Santeuil, France", sceneLabel: "Rotting stems · Santeuil · France", coordinates: [1.951, 49.121], source: "CaeNDR", style: "field", strain: "JU1925", history: "Across three October surveys, C. elegans was found on about half of 88 rotting stems in Santeuil wood—but only occasionally in the surrounding soil." },
      { name: "Edinburgh, Scotland", sceneLabel: "Allotment compost · Edinburgh · Scotland", coordinates: [-3.19, 55.92], source: "CaeNDR", style: "field", strain: "ED3010", history: "Edinburgh’s marker brings together twelve C. elegans strains from four genetic groups found in compost samples around the city. The scene follows ED3010, collected from a compost bin at Midmar Allotments. The telescope refers to the Royal Observatory on nearby Blackford Hill." },
      { name: "Tenerife, Spain", sceneLabel: "Botanical garden · Tenerife · Spain", coordinates: [-16.535468, 28.411121], source: "CaeNDR", style: "field", strain: "NIC1787", history: "A single day’s sampling in Puerto de la Cruz botanical garden produced 23 C. elegans records from rotting avocado, other fruits, flowers, stems and plant litter." },
      { name: "Kauaʻi, Hawaiʻi", sceneLabel: "Rotting plants · Kauaʻi · United States", coordinates: [-159.668, 22.149], source: "CaeNDR", style: "kauai", strain: "XZ1516", history: "This high-elevation Kauaʻi isolate came from rotting plant material and belongs to one of the island’s exceptionally divergent C. elegans lineages." },
      { name: "Australian Capital Territory", sceneLabel: "Rotten fig · O’Connor · Australia", coordinates: [149.1151, -35.2542], source: "CaeNDR", style: "field", strain: "QG2811", history: "This O’Connor backyard reflects the real collection site, where this worm was found in rotten figs. The flat white represents Canberra’s café culture. Balloons refer to the city’s annual festival; sulphur-crested cockatoos are familiar visitors to local gardens and outdoor cafés." },
      { name: "Claremont, California · ECA250", sceneLabel: "Decaying mushroom · Claremont · United States", coordinates: [-117.7198, 34.0967], source: "CGC CB4857 collection record. CaeNDR ECA250 isotype record", style: "field", strain: "ECA250", history: "This lineage began with a worm found in a decaying mushroom during rain in Claremont in 1972. The worm is reading about bacteria, its food, with lemonade and sunglasses for the Southern California sunshine." },
      { name: "Araucanía, Chile", sceneLabel: "Compost heap · Araucanía · Chile", coordinates: [-72.1509, -38.9379], source: "CaeNDR", style: "field", strain: "JU4400", history: "A compost heap in a rural garden in Cunco yielded this C. elegans isolate in March 2023—one of the game’s most recently collected worms." }
    ]
  },
  {
    id: "nigoni",
    short: "C. nigoni",
    name: "Caenorhabditis nigoni",
    nickname: "The fruit-market mixer",
    region: "Tropical regions worldwide",
    reproduction: "outcrossing",
    reproductionLabel: "♀ female + ♂ male",
    cast: ["female", "male"],
    scale: .75,
    pose: "rainforest",
    localStyle: "rainforest",
    habitat: "Tropical rotting fruit & flowers",
    habitatKey: "tropical",
    intro: "The outcrossing sister species of C. briggsae, collected from rotting flowers, starfruit, guava, coconut, figs, and other tropical plant material.",
    fact: "C. nigoni and C. briggsae are close enough to produce hybrids, making this pair especially useful for studying how species and mating systems diverge.",
    worm: "#f5a66f",
    wormDeep: "#cc5c45",
    habitatOne: "#f5be68",
    habitatTwo: "#de7055",
    locations: [
      { name: "Trivandrum, Kerala · JU1325", sceneLabel: "Botanical garden · Trivandrum · India", coordinates: [76.955, 8.512], source: "CGC", style: "rainforest", strain: "JU1325", history: "The strain used to describe C. nigoni came from rotting flowers and leaves in Trivandrum’s botanical garden. The sample remained in a plastic tube for two weeks before the worms were placed on agar plates with bacteria. The 14 DAYS tag on the tube marks this unusually long wait." },
      { name: "Praslin, Seychelles · YR106", sceneLabel: "Unknown substrate · Praslin · Seychelles", coordinates: [55.7, -4.3], source: "Félix Lab", style: "rainforest", strain: "YR106", history: "The collection record places this worm on Praslin. The palm forest, tortoise shells and black-parrot caps reflect the island’s landscape and wildlife. The bell bracelets add a Seychelles carnival reference." },
      { name: "São Tomé · JU2484", sceneLabel: "Forest fruit · São Tomé · São Tomé and Príncipe", coordinates: [6.6, 0.2], source: "Félix Lab", style: "rainforest", strain: "JU2484", history: "This female-founded C. nigoni line came from an unidentified rotten fruit lying on the forest floor on São Tomé." },
      { name: "Mahahual, Mexico · JU2617", sceneLabel: "Rotting fruit · Mahahual · Mexico", coordinates: [-87.71, 18.72], source: "Worldwide Worms/Félix JU2617 record", style: "farm", strain: "JU2617", history: "A heap of rotting fruit—mostly oranges—in a rural garden in Mahahual yielded this C. nigoni line." },
      { name: "Mauritius · JU2909", sceneLabel: "Rotten fruit · Mauritius", coordinates: [57.4061, -20.2914], source: "Worldwide Worms/Félix JU2909 record", style: "rainforest", strain: "JU2909", history: "An oval fruit with a large woody nut yielded both C. nigoni and C. briggsae in the same sample. The C. nigoni line began with one female larva and one male." },
      { name: "Ho Chi Minh City · JU4356", sceneLabel: "Rotten carambola · Ho Chi Minh City · Vietnam", coordinates: [106.6939439, 10.7742239], source: "Félix Lab Worldwide Worms: JU4356", style: "rainforest", strain: "JU4356", history: "This worm came from one rotten carambola collected from the ground in a Ho Chi Minh City garden in 2022. A DNA marker and successful mating tests supported its identification as C. nigoni. The carambola trays, DNA cards and tree calipers connect the worm to the fruit, the identification process and the city’s managed urban canopy." },
      { name: "Lombok, Indonesia · HPT26", sceneLabel: "Rotten fig · Lombok · Indonesia", coordinates: [116.239667, -8.527466], source: "Devi et al. 2025", style: "rainforest", strain: "HPT26", history: "This C. nigoni line came from rotting Ficus fruit in Lombok in May 2024, making it the newest collection represented in the game." }
    ]
  },
  {
    id: "wallacei",
    short: "C. wallacei",
    name: "Caenorhabditis wallacei",
    nickname: "The cacao cousin",
    region: "Bali, Indonesia",
    reproduction: "outcrossing",
    reproductionLabel: "♀ female + ♂ male",
    cast: ["female", "male"],
    scale: .74,
    pose: "woodland",
    localStyle: "rainforest",
    habitat: "Rotten cacao fruit",
    habitatKey: "tropical",
    intro: "The outcrossing sister species of C. tropicalis, known from a rotten cacao fruit collected in a plantation near Sanda, Bali.",
    fact: "Its reference isolate JU1873 came from one cacao fruit in 2009. Comparing it with selfing C. tropicalis helps reveal changes that accompanied self-fertilization.",
    worm: "#a9a0df",
    wormDeep: "#5f55a5",
    habitatOne: "#a9c796",
    habitatTwo: "#8d79bd",
    locations: [
      { name: "Sanda, Bali · JU1873", sceneLabel: "Cacao plantation · Sanda, Bali · Indonesia", coordinates: [115.02965, -8.36130], source: "Félix Lab JU1873 record", style: "rainforest", strain: "JU1873", history: "A single rotting cacao fruit collected near Sanda in 2009 yielded the type isolate of a species that would later be named C. wallacei." }
    ]
  },
  {
    id: "tropicalis",
    short: "C. tropicalis",
    name: "Caenorhabditis tropicalis",
    nickname: "The gene-drive dodger",
    region: "Pantropical records",
    reproduction: "selfing",
    reproductionLabel: "⚥ hermaphrodite + ♂ rare male",
    cast: ["hermaphrodite", "rare male"],
    scale: .72,
    pose: "coast",
    localStyle: "ocean",
    habitat: "Tropical fruit & flowers",
    habitatKey: "flowers",
    intro: "Some C. tropicalis strains carry a genetic trick called Medea. The mother makes a toxin, and only baby worms that inherit the matching antidote survive.",
    fact: "Its populations are strongly connected to geography, with especially rich diversity reported from Hawaiʻi and Taiwan.",
    worm: "#7dc9c2",
    wormDeep: "#287c82",
    habitatOne: "#7ad6c0",
    habitatTwo: "#f08a85",
    locations: [
      { name: "Barro Colorado Island, Panama", sceneLabel: "Forest bait · Barro Colorado Island · Panama", coordinates: [-79.8399, 9.1598], source: "CaeNDR QG2726 isotype record", style: "rainforest", strain: "QG2726", history: "This C. tropicalis line came from an experimental forest bait made by blending Gustavia superba flowers with water into a paste. The bait was placed in the forest to attract nematodes." },
      { name: "Guadeloupe · NIC203", sceneLabel: "Torch-ginger flower · Guadeloupe · France", coordinates: [-61.6262, 16.0459], source: "CaeNDR NIC203 isotype record", style: "rainforest", strain: "NIC203", history: "This line came from a rotting torch-ginger flower at the Third Carbet Falls locality. Later crosses helped reveal three maternal-effect toxin–antidote systems in its genome." },
      { name: "Oʻahu, Hawaiʻi · ECA789", sceneLabel: "Rotting flower · Oʻahu · United States", coordinates: [-157.799786, 21.336056], source: "CaeNDR ECA789 isotype record", style: "rainforest", strain: "ECA789", history: "This C. tropicalis line came from a rotting flower along Mānoa Falls Trail, where the recorded humidity was 93.7%." },
      { name: "New Taipei City, Taiwan · NIC1648", sceneLabel: "Fallen figs · New Taipei City · Taiwan", coordinates: [121.82753, 25.06574], source: "CaeNDR NIC1648 isotype record", style: "rainforest", strain: "NIC1648", history: "Tiny figs scattered on concrete steps towards Menghuan Falls yielded this C. tropicalis line. The culture note records many males, although no count or explanation was provided." },
      { name: "Pohnpei, Micronesia · QG4739", sceneLabel: "Kotop fruit · Pohnpei · Micronesia", coordinates: [158.1818, 6.9066], source: "CaeNDR", style: "rainforest", strain: "QG4739", history: "Rotting kotop fruit in Pohnpei cloudforest yielded seven closely related reference strains. The collection site lay about 540 metres above sea level." },
      { name: "Queensland, Australia · QG2904", sceneLabel: "Blackbean pod · Queensland · Australia", coordinates: [145.447317, -16.10365], source: "CaeNDR", style: "rainforest", strain: "QG2904", history: "An intact blackbean pod from the Daintree Rainforest Observatory produced a plate containing thousands of worms. Most were Caenorhabditis hermaphrodites. No males were seen in that first observation." },
      { name: "Saint-Benoît, Réunion · JU1373", sceneLabel: "Torch-ginger flowers · Saint-Benoît · Réunion, France", coordinates: [55.6885, -21.0473], source: "CaeNDR JU1373 isotype record", style: "farm", strain: "JU1373", history: "A worm collected from rotting torch-ginger flowers in Saint-Benoît became the type isolate used to describe C. tropicalis. The torch-ginger trays reflect the collection material, the type-isolate badge marks its scientific importance, and the rain gauge refers to Réunion’s humid eastern side." }
    ]
  }
];

const sisterPairs = [
  { members: ["elegans", "inopinata"], label: t("sisterSpeciesLabel") },
  { members: ["briggsae", "nigoni"], label: t("sisterSpeciesLabel") },
  { members: ["tropicalis", "wallacei"], label: t("sisterSpeciesLabel") }
];

const byId = new Map(species.map(item => [item.id, item]));
const expectedAccessoryKeys = species.flatMap(item => item.locations.map(location => `${item.id}::${location.name}`));
const accessoryCatalogueAudit = auditAccessoryCatalogue(expectedAccessoryKeys);
if (!accessoryCatalogueAudit.valid) {
  throw new Error(`Invalid location accessory catalogue: ${JSON.stringify(accessoryCatalogueAudit)}`);
}
const accessoryPairGeometryAudit = auditAccessoryPairGeometry();
if (!accessoryPairGeometryAudit.valid) {
  throw new Error(`Invalid paired accessory geometry: ${JSON.stringify(accessoryPairGeometryAudit)}`);
}
const environmentCompositionAudit = auditEnvironmentCompositions();
if (!environmentCompositionAudit.valid) {
  throw new Error(`Invalid environment composition catalogue: ${JSON.stringify(environmentCompositionAudit)}`);
}
const visited = new Set();
const accessoryIds = ["local-headwear", "local-wrap", "local-charm", "local-extra"];
const accessoryWormParts = ["primary", "companion"];
const accessoryScaleMin = .6;
const accessoryScaleMax = 2;
const accessoryBottomMargin = 2;
const wardrobes = new Map();
const accessoryPositions = new Map();
const drawings = new Map();
const drawingModes = new Map();
const wiredAccessoryPieces = new WeakSet();
let selectedId = "elegans";
let selectedRecordName = null;
let drawingEnabled = false;
let drawingColor = "#f36f62";
let activeDoodle = null;
let activeAccessoryDrag = null;
let selectedAccessorySizeTarget = null;
let accessoryResizeFrame = null;
let accessoryConstraintFrame = null;
let accessoryConstraintTimer = null;
let projection;
let projectedLocations = [];

const els = {
  mapWrap: document.querySelector(".map-wrap"),
  mapMarkers: document.getElementById("map-markers"),
  mapTooltip: document.getElementById("map-tooltip"),
  mapTooltipPlace: document.getElementById("map-tooltip-place"),
  mapTooltipSpecies: document.getElementById("map-tooltip-species"),
  mapTooltipDetail: document.getElementById("map-tooltip-detail"),
  mapLoading: document.getElementById("map-loading"),
  countries: document.getElementById("map-countries"),
  mapLeaders: document.getElementById("map-leaders"),
  sphere: document.getElementById("map-sphere"),
  graticule: document.getElementById("map-graticule"),
  selectionPlace: document.getElementById("map-selection-place"),
  selectionSpecies: document.getElementById("map-selection-species"),
  tabs: document.getElementById("species-tabs"),
  habitat: document.getElementById("habitat"),
  locationScene: document.getElementById("location-scene"),
  sceneName: document.getElementById("scene-name"),
  wormNameTag: document.getElementById("worm-name-tag"),
  wormAvatar: document.getElementById("worm-avatar"),
  doodleCanvas: document.getElementById("doodle-canvas"),
  doodleLayer: document.getElementById("doodle-layer"),
  localHeadwear: document.getElementById("local-headwear"),
  localWrap: document.getElementById("local-wrap"),
  localCharm: document.getElementById("local-charm"),
  localExtra: document.getElementById("local-extra"),
  localHeadwearIcon: document.querySelector('[data-accessory="local-headwear"] .button-icon'),
  localHeadwearLabel: document.querySelector('[data-accessory="local-headwear"] .button-label'),
  localWrapIcon: document.querySelector('[data-accessory="local-wrap"] .button-icon'),
  localWrapLabel: document.querySelector('[data-accessory="local-wrap"] .button-label'),
  localCharmIcon: document.querySelector('[data-accessory="local-charm"] .button-icon'),
  localCharmLabel: document.querySelector('[data-accessory="local-charm"] .button-label'),
  localExtraButton: document.getElementById("local-extra-button"),
  localExtraLabel: document.querySelector('[data-accessory="local-extra"] .button-label'),
  speciesName: document.getElementById("species-name"),
  speciesNickname: document.getElementById("species-nickname"),
  speciesIntro: document.getElementById("species-intro"),
  speciesReproduction: document.getElementById("species-reproduction"),
  speciesHabitat: document.getElementById("species-habitat"),
  speciesFact: document.getElementById("species-fact"),
  narrationToggle: document.getElementById("narration-toggle"),
  narrationLabel: document.querySelector("#narration-toggle span"),
  narrationStatus: document.getElementById("narration-status"),
  galleryToggle: document.getElementById("species-gallery-toggle"),
  galleryDialog: document.getElementById("species-gallery-dialog"),
  galleryClose: document.getElementById("species-gallery-close"),
  galleryTitle: document.getElementById("species-gallery-title"),
  galleryDescription: document.getElementById("species-gallery-description"),
  galleryImages: document.getElementById("species-gallery-images"),
  galleryCredit: document.getElementById("species-gallery-credit"),
  familyInfoToggle: document.getElementById("family-info-toggle"),
  familyInfoDialog: document.getElementById("family-info-dialog"),
  familyInfoClose: document.getElementById("family-info-close"),
  familyTree: document.getElementById("caenorhabditis-tree"),
  atlasCompletionReward: document.getElementById("atlas-completion-reward"),
  exploredStatus: document.getElementById("explored-status"),
  exploredCount: document.getElementById("explored-count"),
  exploredAnnouncement: document.getElementById("explored-announcement"),
  freestyle: document.getElementById("freestyle-draw"),
  drawTools: document.getElementById("draw-tools"),
  clearDrawing: document.getElementById("clear-drawing"),
  accessoryStatus: document.getElementById("accessory-status"),
  accessorySizeControls: document.getElementById("accessory-size-controls"),
  accessorySizeTarget: document.getElementById("accessory-size-target"),
  accessorySizeSlider: document.getElementById("accessory-size-slider"),
  accessorySizeValue: document.getElementById("accessory-size-value")
};

function italicText(element, value) {
  element.replaceChildren();
  const italic = document.createElement("i");
  italic.textContent = value;
  element.appendChild(italic);
}

const scientificNamePattern = /\b(?:Caenorhabditis(?:\s+(?:inopinata|elegans|briggsae|nigoni|tropicalis|wallacei|apta))?|C\.\s+(?:inopinata|elegans|briggsae|nigoni|tropicalis|wallacei|apta)|Gustavia\s+superba)\b/g;

function scientificText(element, value) {
  element.replaceChildren();
  scientificNamePattern.lastIndex = 0;
  let cursor = 0;
  for (const match of value.matchAll(scientificNamePattern)) {
    if (match.index > cursor) element.append(document.createTextNode(value.slice(cursor, match.index)));
    const italic = document.createElement("i");
    italic.textContent = match[0];
    element.append(italic);
    cursor = match.index + match[0].length;
  }
  if (cursor < value.length) element.append(document.createTextNode(value.slice(cursor)));
}

let galleryRestoreFocus = null;

function renderSpeciesGallery(item) {
  const gallery = speciesGalleries[item.id];
  if (!gallery) return;

  italicText(els.galleryTitle, gallery.scientificName);
  scientificText(els.galleryDescription, gallery.description);
  els.galleryImages.replaceChildren();
  els.galleryImages.dataset.species = item.id;
  gallery.images.forEach(image => {
    const figure = document.createElement("figure");
    const imageFrame = document.createElement("div");
    figure.classList.add("species-gallery-card");
    if (image.layout === "wide") figure.classList.add("species-gallery-card--wide");
    figure.style.setProperty("--gallery-card-width", `${image.maxWidth}px`);

    if (image.kind === "video") {
      const video = document.createElement("video");
      const source = document.createElement("source");
      const fallbackLink = document.createElement("a");
      imageFrame.className = "whole-worm-video-frame";
      video.className = "whole-worm-video";
      video.controls = true;
      video.preload = "metadata";
      video.playsInline = true;
      video.setAttribute("aria-label", image.alt);
      video.setAttribute("width", String(image.width));
      video.setAttribute("height", String(image.height));
      source.src = image.src;
      source.type = "video/mp4";
      fallbackLink.href = image.src;
      fallbackLink.target = "_blank";
      fallbackLink.rel = "noopener";
      fallbackLink.textContent = "Open the video from the publisher";
      video.append(source, fallbackLink);
      imageFrame.append(video);
    } else {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      const sourceImage = document.createElementNS("http://www.w3.org/2000/svg", "image");
      const [x, y, width, height] = image.viewBox;
      imageFrame.className = "whole-worm-view-frame";
      imageFrame.setAttribute("role", "img");
      imageFrame.setAttribute("aria-label", image.alt);
      svg.classList.add("whole-worm-view");
      if (image.palePadding) svg.classList.add("whole-worm-view--pale-padding");
      svg.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
      svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
      svg.setAttribute("aria-hidden", "true");
      svg.setAttribute("focusable", "false");
      sourceImage.setAttribute("href", image.src);
      sourceImage.setAttribute("width", String(image.sourceWidth));
      sourceImage.setAttribute("height", String(image.sourceHeight));
      sourceImage.setAttribute("preserveAspectRatio", "none");
      svg.append(sourceImage);
      imageFrame.append(svg);
    }
    figure.append(imageFrame);
    if (gallery.showCaptions && image.caption) {
      const caption = document.createElement("figcaption");
      scientificText(caption, image.caption);
      figure.append(caption);
    }
    els.galleryImages.appendChild(figure);
  });

  const gallerySources = [gallery.source, ...gallery.images.map(image => image.source).filter(Boolean)];
  const uniqueSources = gallerySources.filter((source, index) => gallerySources.findIndex(candidate => candidate.url === source.url) === index);
  els.galleryCredit.replaceChildren();
  uniqueSources.forEach((source, index) => {
    if (index > 0) els.galleryCredit.append(document.createElement("br"));
    const sourceLink = document.createElement("a");
    const licenceLink = document.createElement("a");
    sourceLink.href = source.url;
    sourceLink.target = "_blank";
    sourceLink.rel = "noopener";
    scientificText(sourceLink, source.label);
    licenceLink.href = source.licence.url;
    licenceLink.target = "_blank";
    licenceLink.rel = "noopener";
    licenceLink.textContent = source.licence.label;
    els.galleryCredit.append("Source: ", sourceLink, ". Licence: ", licenceLink, ".");
    if (source.note) els.galleryCredit.append(` ${source.note}`);
  });
}

function openSpeciesGallery() {
  const item = byId.get(selectedId);
  if (!item || !els.galleryDialog) return;
  renderSpeciesGallery(item);
  galleryRestoreFocus = document.activeElement;
  els.galleryDialog.showModal();
  els.galleryClose.focus();
}

els.galleryToggle.addEventListener("click", openSpeciesGallery);
els.galleryClose.addEventListener("click", () => els.galleryDialog.close());
els.galleryDialog.addEventListener("keydown", event => {
  if (event.key !== "Escape") return;
  event.preventDefault();
  els.galleryDialog.close();
});
els.galleryDialog.addEventListener("click", event => {
  if (event.target === els.galleryDialog) els.galleryDialog.close();
});
els.galleryDialog.addEventListener("close", () => {
  if (galleryRestoreFocus instanceof HTMLElement && galleryRestoreFocus.isConnected) {
    galleryRestoreFocus.focus();
  }
  galleryRestoreFocus = null;
});

let familyInfoRestoreFocus = null;

function openFamilyInfo() {
  if (!els.familyInfoDialog) return;
  renderCaenorhabditisTree(els.familyTree);
  familyInfoRestoreFocus = document.activeElement;
  els.familyInfoDialog.showModal();
  focusCaenorhabditisTreeLabels(els.familyTree);
  els.familyInfoClose.focus();
}

els.familyInfoToggle.addEventListener("click", openFamilyInfo);
els.exploredStatus.addEventListener("click", openFamilyInfo);
els.familyInfoClose.addEventListener("click", () => els.familyInfoDialog.close());
els.familyInfoDialog.addEventListener("keydown", event => {
  if (event.key !== "Escape") return;
  event.preventDefault();
  els.familyInfoDialog.close();
});
els.familyInfoDialog.addEventListener("click", event => {
  if (event.target === els.familyInfoDialog) els.familyInfoDialog.close();
});
els.familyInfoDialog.addEventListener("close", () => {
  if (familyInfoRestoreFocus instanceof HTMLElement && familyInfoRestoreFocus.isConnected) {
    familyInfoRestoreFocus.focus();
  }
  familyInfoRestoreFocus = null;
});

const speechSupported = "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
const narrationLabels = {
  idle: { visible: "Listen", accessible: "Listen to this worm's story" },
  speaking: { visible: "Pause", accessible: "Pause narration" },
  paused: { visible: "Resume", accessible: "Resume narration" }
};
let narrationState = "idle";
let currentNarration = null;
let englishVoices = [];
const preferredFemaleNarrationVoices = [
  /\bsonia\b/i,
  /\blibby\b/i,
  /google uk english female/i,
  /\bserena\b/i,
  /\bhazel\b/i,
  /\bsusan\b/i,
  /\bkate\b/i,
  /\bmoira\b/i,
  /\bkaren\b/i,
  /\bsamantha\b/i,
  /\baria\b/i,
  /\bjenny\b/i,
  /\bava\b/i,
  /\bemma\b/i,
  /\bmichelle\b/i,
  /\bvictoria\b/i,
  /\bzira\b/i,
  /\btessa\b/i,
  /\bfiona\b/i
];
const naturalNarrationVoice = /\b(?:natural|neural|enhanced|premium|online)\b/i;
const likelyMaleNarrationVoice = /\b(?:david|george|ryan|mark|daniel|james|thomas|arthur|oliver|brian|aaron|liam)\b/i;

function refreshNarrationVoices() {
  if (!speechSupported) return;
  englishVoices = window.speechSynthesis.getVoices().filter(voice => /^en(?:-|_)/i.test(voice.lang));
}

function narrationVoiceScore(voice) {
  const name = voice.name || "";
  const preferredIndex = preferredFemaleNarrationVoices.findIndex(pattern => pattern.test(name));
  let score = preferredIndex >= 0 ? 1000 - preferredIndex * 20 : 0;
  if (naturalNarrationVoice.test(name)) score += 220;
  if (/^en-GB$/i.test(voice.lang)) score += 120;
  if (likelyMaleNarrationVoice.test(name)) score -= 500;
  if (voice.default) score += 10;
  return score;
}

function preferredNarrationVoice() {
  return [...englishVoices].sort((first, second) => {
    return narrationVoiceScore(second) - narrationVoiceScore(first)
      || String(first.name).localeCompare(String(second.name));
  })[0]
    || englishVoices[0]
    || null;
}

function updateNarrationControl(state = narrationState) {
  narrationState = state;
  const labels = narrationLabels[state];
  els.narrationLabel.textContent = labels.visible;
  els.narrationToggle.setAttribute("aria-label", labels.accessible);
  els.narrationToggle.setAttribute("aria-pressed", String(state !== "idle"));
}

function announceNarration(message) {
  els.narrationStatus.textContent = "";
  requestAnimationFrame(() => {
    els.narrationStatus.textContent = message;
  });
}

function stopNarration() {
  if (!speechSupported) return;
  currentNarration = null;
  window.speechSynthesis.cancel();
  updateNarrationControl("idle");
}

function pronounceScientificNames(value) {
  const expanded = value.replace(
    /\bC\.\s+(inopinata|elegans|briggsae|nigoni|tropicalis|wallacei)\b/gi,
    "Caenorhabditis $1"
  );
  return expanded.replace(/\bCaenorhabditis\b/gi, "see no rabdye tiss");
}

function pronounceStrainCodes(value) {
  return value.replace(/\b([A-Z]{1,4})(\d+(?:\.\d+)?)\b/g, (match, letters, number) => {
    return `${[...letters].join(" ")} ${number}`;
  });
}

function pronounceAmbiguousWords(value) {
  return value.replace(/\banother fig\.(?=\s|$)/gi, "another fig fruit.");
}

function narrationSegments(item, place) {
  const fact = typeof place === "object" && place?.history ? place.history : item.fact;
  const reproduction = item.reproduction === "selfing"
    ? "This species is predominantly self-fertilising: populations consist mainly of self-fertilising hermaphrodites, with rare males."
    : "This species is outcrossing, meaning that populations consist of females and males and reproduction requires mating between them.";
  return [
    item.name,
    item.nickname,
    item.intro,
    reproduction,
    `Habitat: ${item.habitat}.`,
    fact
  ].map(segment => pronounceAmbiguousWords(pronounceStrainCodes(pronounceScientificNames(segment))));
}

function narrationPassage(item, place) {
  return narrationSegments(item, place).map(segment => {
    const text = segment.trim();
    return /[.!?]$/.test(text) ? text : `${text}.`;
  }).join(" ");
}

function startNarration() {
  if (!speechSupported) return;
  const item = byId.get(selectedId);
  if (!item) return;
  const place = item.locations.find(candidate => candidate.name === selectedRecordName) || item.locations[0];
  stopNarration();
  refreshNarrationVoices();
  const voice = preferredNarrationVoice();
  const utterance = new SpeechSynthesisUtterance(narrationPassage(item, place));
  const session = { utterance };
  utterance.lang = voice?.lang || "en-GB";
  utterance.rate = .98;
  utterance.pitch = 1;
  if (voice) utterance.voice = voice;
  utterance.addEventListener("start", () => {
    if (currentNarration !== session) return;
    updateNarrationControl("speaking");
    announceNarration("Narration started.");
  });
  utterance.addEventListener("end", () => {
    if (currentNarration !== session) return;
    currentNarration = null;
    updateNarrationControl("idle");
    announceNarration("Narration finished.");
  });
  utterance.addEventListener("error", event => {
    if (currentNarration !== session) return;
    currentNarration = null;
    window.speechSynthesis.cancel();
    updateNarrationControl("idle");
    if (!["canceled", "interrupted"].includes(event.error)) {
      announceNarration("Narration is unavailable in this browser.");
    }
  });
  currentNarration = session;
  window.speechSynthesis.speak(utterance);
}

if (speechSupported) {
  refreshNarrationVoices();
  window.speechSynthesis.addEventListener("voiceschanged", refreshNarrationVoices);
  els.narrationToggle.addEventListener("click", () => {
    if (narrationState === "speaking") {
      window.speechSynthesis.pause();
      updateNarrationControl("paused");
      announceNarration("Narration paused.");
    } else if (narrationState === "paused") {
      window.speechSynthesis.resume();
      updateNarrationControl("speaking");
      announceNarration("Narration resumed.");
    } else {
      startNarration();
    }
  });
} else {
  els.narrationToggle.hidden = true;
}

function renderTabs() {
  els.tabs.replaceChildren();
  sisterPairs.forEach(pair => {
    const pairGroup = document.createElement("div");
    pairGroup.className = "sister-pair";
    pairGroup.setAttribute("role", "group");
    const pairNames = pair.members.map(id => byId.get(id).short).join(" and ");
    pairGroup.setAttribute("aria-label", t("sisterSpeciesAria", { names: pairNames }));

    const pairLabel = document.createElement("span");
    pairLabel.className = "sister-label";
    pairLabel.textContent = pair.label;

    const pairButtons = document.createElement("div");
    pairButtons.className = "sister-buttons";
    pair.members.forEach(id => {
      const item = byId.get(id);
      const button = document.createElement("button");
      button.type = "button";
      button.className = "species-tab";
      button.dataset.species = item.id;
      button.setAttribute("aria-pressed", String(item.id === selectedId));
      button.setAttribute("aria-label", t("meetSpeciesAria", {
        name: item.name,
        nickname: item.nickname
      }));

      const name = document.createElement("i");
      name.textContent = item.short;
      const mode = document.createElement("small");
      mode.className = item.reproduction;
      mode.textContent = item.reproduction === "selfing"
        ? t("reproductionMostlySelfing")
        : t("reproductionOutcrossing");
      button.append(name, mode);
      button.addEventListener("click", () => selectSpecies(item.id));
      pairButtons.appendChild(button);
    });
    pairGroup.append(pairLabel, pairButtons);
    els.tabs.appendChild(pairGroup);
  });
}

function renderSpecies(item, place) {
  const placeName = typeof place === "string" ? place : place?.name;
  const placeSource = typeof place === "object" ? place?.source : null;
  const styleKey = typeof place === "object" && place?.style ? place.style : item.localStyle;
  const environment = getEnvironmentProfile(placeName, item.id);
  const accessoryDesign = renderLocationAccessories({
    headwear: els.localHeadwear,
    wrap: els.localWrap,
    charm: els.localCharm,
    extra: els.localExtra
  }, item.id, placeName);
  if (!accessoryDesign) throw new Error(`Missing accessory design for ${item.id}::${placeName}`);
  wireAccessoryPieces();
  italicText(els.speciesName, item.name);
  els.galleryToggle.setAttribute("aria-label", `See whole-animal photographs of ${item.name}`);
  els.speciesNickname.textContent = item.nickname;
  scientificText(els.speciesIntro, item.intro);
  els.speciesReproduction.textContent = item.reproductionLabel;
  els.speciesReproduction.className = `fact-pill ${item.reproduction}`;
  els.speciesHabitat.textContent = item.habitat;
  scientificText(els.speciesFact, typeof place === "object" && place?.history ? place.history : item.fact);
  italicText(els.wormNameTag, item.short);
  els.wormAvatar.setAttribute("aria-label", t("illustratedPairAria", {
    name: item.name,
    first: item.cast[0],
    second: item.cast[1]
  }));
  els.localHeadwearIcon.textContent = "⌒";
  els.localHeadwearLabel.textContent = accessoryDesign.headwear.label;
  els.localWrapIcon.textContent = "≈";
  els.localWrapLabel.textContent = accessoryDesign.wrap.label;
  els.localCharmIcon.textContent = "✦";
  els.localCharmLabel.textContent = accessoryDesign.charm.label;
  els.localExtraButton.hidden = !accessoryDesign.extra;
  if (accessoryDesign.extra) els.localExtraLabel.textContent = accessoryDesign.extra.label;
  els.sceneName.textContent = place?.sceneLabel || environment?.title || placeName;

  els.habitat.dataset.habitat = item.habitatKey;
  els.habitat.dataset.localStyle = styleKey;
  els.habitat.dataset.placeScene = environment ? "dynamic" : "";
  els.habitat.dataset.environment = environment?.id || "fallback";
  els.habitat.dataset.accessoryVisual = accessoryDesign.key;
  els.habitat.dataset.hasCustomVisual = "true";
  els.habitat.dataset.species = item.id;
  els.habitat.dataset.pose = item.pose;
  els.habitat.style.setProperty("--worm-color", item.worm);
  els.habitat.style.setProperty("--worm-deep", item.wormDeep);
  els.habitat.style.setProperty("--habitat-one", item.habitatOne);
  els.habitat.style.setProperty("--habitat-two", item.habitatTwo);
  els.habitat.style.setProperty("--worm-scale", item.scale);
  if (environment) {
    renderEnvironmentScene(els.locationScene, environment, els.habitat);
  } else {
    els.locationScene.replaceChildren();
  }
  syncAccessories();
  renderDoodles();

  els.selectionPlace.textContent = placeSource ? `${placeName} · ${placeSource}` : (placeName || item.region);
  els.selectionSpecies.replaceChildren();
  const italic = document.createElement("i");
  italic.textContent = item.short;
  els.selectionSpecies.append(italic, document.createTextNode(`: ${item.nickname.replace(/^The /, "the ")}`));
}

function updateSelectedControls() {
  document.querySelectorAll(".species-tab").forEach(button => {
    const selected = button.dataset.species === selectedId;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  document.querySelectorAll(".map-marker").forEach(button => {
    const sameSpecies = button.dataset.species === selectedId;
    const selected = sameSpecies && button.dataset.place === selectedRecordName;
    button.classList.toggle("is-species-selected", sameSpecies);
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
}

const wormConfettiColours = ["#bd7c45", "#c95670", "#347d68", "#d75c3d", "#167d7a", "#6254aa"];
const wormConfettiPaths = [
  "M3 12C8 2 18 3 21 11S29 21 33 10",
  "M3 10C9 18 18 17 22 9S29 2 33 10",
  "M3 14C8 3 15 3 20 12S28 18 33 10",
  "M3 9C7 17 14 18 19 10S28 3 33 12",
  "M3 13C9 7 13 5 18 11S27 17 33 7"
];

function launchWormConfetti() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  document.querySelector(".worm-confetti-layer")?.remove();
  const layer = document.createElement("div");
  layer.className = "worm-confetti-layer";
  layer.setAttribute("aria-hidden", "true");
  const svgNamespace = "http://www.w3.org/2000/svg";
  const centreX = window.innerWidth / 2;
  const centreY = Math.min(window.innerHeight * .42, 380);
  const pieceCount = window.innerWidth <= 560 ? 24 : 32;

  const crest = document.createElement("div");
  const crestSvg = document.createElementNS(svgNamespace, "svg");
  const crestUse = document.createElementNS(svgNamespace, "use");
  const crestCount = document.createElement("span");
  crest.className = "worm-completion-flash";
  crestSvg.classList.add("worm-completion-flash-emblem");
  crestSvg.setAttribute("viewBox", "0 0 240 190");
  crestUse.setAttribute("href", "#atlas-explorer-seal");
  crestCount.className = "worm-completion-flash-count";
  crestCount.textContent = "6 / 6";
  crestSvg.append(crestUse);
  crest.append(crestSvg, crestCount);
  layer.append(crest);

  for (let index = 0; index < pieceCount; index += 1) {
    const piece = document.createElementNS(svgNamespace, "svg");
    const wriggle = document.createElementNS(svgNamespace, "g");
    const pathData = wormConfettiPaths[index % wormConfettiPaths.length];
    const outline = document.createElementNS(svgNamespace, "path");
    const body = document.createElementNS(svgNamespace, "path");
    const highlight = document.createElementNS(svgNamespace, "path");
    const eye = document.createElementNS(svgNamespace, "circle");
    const pupil = document.createElementNS(svgNamespace, "circle");
    const angle = -Math.PI / 2 + index / pieceCount * Math.PI * 2 + ((index % 3) - 1) * .05;
    const radiusX = Math.min(window.innerWidth * .47, 620) * (.72 + (index % 4) * .075);
    const radiusY = Math.min(window.innerHeight * .42, 400) * (.7 + (index % 5) * .06);
    const endX = Math.cos(angle) * radiusX;
    const endY = Math.sin(angle) * radiusY + 105 + (index % 4) * 12;

    piece.setAttribute("viewBox", "0 0 36 22");
    piece.classList.add("worm-confetti-piece");
    piece.style.setProperty("--worm-confetti-colour", wormConfettiColours[index % wormConfettiColours.length]);
    piece.style.setProperty("--worm-confetti-origin-x", `${centreX}px`);
    piece.style.setProperty("--worm-confetti-origin-y", `${centreY}px`);
    piece.style.setProperty("--worm-confetti-mid-x", `${endX * .62}px`);
    piece.style.setProperty("--worm-confetti-mid-y", `${endY * .5 - 72}px`);
    piece.style.setProperty("--worm-confetti-late-x", `${endX * .86}px`);
    piece.style.setProperty("--worm-confetti-late-y", `${endY * .78 - 26}px`);
    piece.style.setProperty("--worm-confetti-end-x", `${endX}px`);
    piece.style.setProperty("--worm-confetti-end-y", `${endY}px`);
    piece.style.setProperty("--worm-confetti-start-rotation", `${-35 + (index % 7) * 12}deg`);
    piece.style.setProperty("--worm-confetti-mid-rotation", `${60 + (index % 6) * 38}deg`);
    piece.style.setProperty("--worm-confetti-end-rotation", `${210 + (index % 8) * 47}deg`);
    piece.style.setProperty("--worm-confetti-size", `${29 + (index % 6) * 2.8}px`);
    piece.style.setProperty("--worm-confetti-delay", `${(index % 9) * .022}s`);
    piece.style.setProperty("--worm-confetti-duration", `${1.9 + (index % 6) * .085}s`);
    piece.style.setProperty("--worm-wriggle-duration", `${.19 + (index % 4) * .035}s`);
    piece.style.setProperty("--worm-wriggle-angle", `${index % 2 === 0 ? 6 : -6}deg`);

    outline.setAttribute("d", pathData);
    outline.classList.add("worm-confetti-outline");
    body.setAttribute("d", pathData);
    body.classList.add("worm-confetti-body");
    highlight.setAttribute("d", "M7 9C12 5 17 6 20 10");
    highlight.classList.add("worm-confetti-highlight");
    eye.setAttribute("cx", "32");
    eye.setAttribute("cy", "8.3");
    eye.setAttribute("r", "1.4");
    eye.classList.add("worm-confetti-eye");
    pupil.setAttribute("cx", "32.4");
    pupil.setAttribute("cy", "8.1");
    pupil.setAttribute("r", ".55");
    pupil.classList.add("worm-confetti-pupil");
    wriggle.classList.add("worm-confetti-wriggle");
    wriggle.append(outline, body, highlight, eye, pupil);
    piece.append(wriggle);
    layer.append(piece);
  }

  for (let index = 0; index < 6; index += 1) {
    const shell = document.createElement("div");
    const crawler = document.createElementNS(svgNamespace, "svg");
    const wriggle = document.createElementNS(svgNamespace, "g");
    const pathData = wormConfettiPaths[(index + 2) % wormConfettiPaths.length];
    const outline = document.createElementNS(svgNamespace, "path");
    const body = document.createElementNS(svgNamespace, "path");
    const highlight = document.createElementNS(svgNamespace, "path");
    const eye = document.createElementNS(svgNamespace, "circle");
    const pupil = document.createElementNS(svgNamespace, "circle");

    shell.className = `worm-confetti-crawler-shell${index % 2 ? " is-reversed" : ""}`;
    shell.style.setProperty("--crawler-lane", `${12 + (index % 3) * 27}px`);
    shell.style.setProperty("--crawler-size", `${45 + (index % 3) * 5}px`);
    shell.style.setProperty("--crawler-delay", `${.62 + index * .11}s`);
    shell.style.setProperty("--crawler-duration", `${2.72 + (index % 3) * .2}s`);
    crawler.setAttribute("viewBox", "0 0 36 22");
    crawler.style.setProperty("--worm-confetti-colour", wormConfettiColours[index]);
    crawler.style.setProperty("--worm-wriggle-duration", `${.2 + (index % 3) * .035}s`);
    crawler.style.setProperty("--worm-wriggle-angle", `${index % 2 === 0 ? 5 : -5}deg`);

    outline.setAttribute("d", pathData);
    outline.classList.add("worm-confetti-outline");
    body.setAttribute("d", pathData);
    body.classList.add("worm-confetti-body");
    highlight.setAttribute("d", "M7 9C12 5 17 6 20 10");
    highlight.classList.add("worm-confetti-highlight");
    eye.setAttribute("cx", "32");
    eye.setAttribute("cy", "8.3");
    eye.setAttribute("r", "1.4");
    eye.classList.add("worm-confetti-eye");
    pupil.setAttribute("cx", "32.4");
    pupil.setAttribute("cy", "8.1");
    pupil.setAttribute("r", ".55");
    pupil.classList.add("worm-confetti-pupil");
    wriggle.classList.add("worm-confetti-wriggle");
    wriggle.append(outline, body, highlight, eye, pupil);
    crawler.append(wriggle);
    shell.append(crawler);
    layer.append(shell);
  }

  document.body.append(layer);
  window.setTimeout(() => layer.remove(), 4700);
}

function updateExploredStatus() {
  const count = visited.size;
  const isComplete = count === species.length;
  const becameComplete = isComplete && !els.exploredStatus.classList.contains("is-complete");
  const status = isComplete
    ? "All six species met. Open the wider worm family."
    : `${count} of ${species.length} species met`;

  els.exploredCount.textContent = String(count);
  els.exploredStatus.disabled = !isComplete;
  els.exploredStatus.classList.toggle("is-complete", isComplete);
  els.exploredStatus.setAttribute("aria-label", status);
  els.exploredAnnouncement.textContent = status;
  els.atlasCompletionReward.hidden = !isComplete;
  if (becameComplete) launchWormConfetti();
}

function selectSpecies(id, place) {
  const item = byId.get(id);
  if (!item) return;
  stopNarration();
  const activePlace = typeof place === "object" ? place : item.locations[0];
  selectedId = id;
  selectedRecordName = activePlace?.name || null;
  drawingEnabled = drawingModes.get(wardrobeKey()) || false;
  visited.add(id);
  updateExploredStatus();
  renderSpecies(item, activePlace);
  syncDrawingMode();
  updateSelectedControls();
  positionMarkers();
  playSelectionEffect();
}

function wardrobeKey() {
  return `${selectedId}::${selectedRecordName || "default"}`;
}

function activeWardrobe() {
  const key = wardrobeKey();
  if (!wardrobes.has(key)) wardrobes.set(key, new Set());
  return wardrobes.get(key);
}

function activeAccessoryPositions() {
  const key = wardrobeKey();
  if (!accessoryPositions.has(key)) accessoryPositions.set(key, new Map());
  return accessoryPositions.get(key);
}

function accessoryPositionKey(id, wormPart) {
  return `${id}::${wormPart}`;
}

function clampAccessoryScale(scale) {
  return Math.min(accessoryScaleMax, Math.max(accessoryScaleMin, Number.isFinite(scale) ? scale : 1));
}

function accessoryPosition(id, wormPart) {
  const position = activeAccessoryPositions().get(accessoryPositionKey(id, wormPart));
  return {
    x: position?.x ?? 0,
    y: position?.y ?? 0,
    scale: clampAccessoryScale(position?.scale ?? 1)
  };
}

function accessoryPieces(id, wormPart) {
  const accessory = document.getElementById(id);
  if (!accessory) return [];
  return [...accessory.querySelectorAll(`.accessory-piece[data-worm-part="${wormPart}"]`)];
}

function applyAccessoryPosition(id, wormPart, position = accessoryPosition(id, wormPart)) {
  accessoryPieces(id, wormPart).forEach(piece => {
    piece.style.setProperty("--accessory-user-x", `${position.x.toFixed(1)}px`);
    piece.style.setProperty("--accessory-user-y", `${position.y.toFixed(1)}px`);
    piece.style.setProperty("--accessory-user-scale", String(clampAccessoryScale(position.scale)));
  });
}

function visibleAccessoryPieces(id, wormPart) {
  return accessoryPieces(id, wormPart).filter(piece => {
    const bounds = accessoryArtworkBounds(piece);
    return bounds.width > 0 && bounds.height > 0;
  });
}

function accessoryArtworkBounds(piece) {
  if (piece.dataset.accessoryFamily === "fig-fascinator") {
    // A rotated group's empty corner can extend beyond the scene even when
    // its fitted visor is inside. Constrain the drawn parts, not that corner.
    const parts = [...piece.querySelectorAll(".location-accessory-art path, .location-accessory-art circle")]
      .map(part => part.getBoundingClientRect());
    if (parts.length) {
      const left = Math.min(...parts.map(part => part.left));
      const top = Math.min(...parts.map(part => part.top));
      const right = Math.max(...parts.map(part => part.right));
      const bottom = Math.max(...parts.map(part => part.bottom));
      return { left, top, right, bottom, width: right - left, height: bottom - top };
    }
  }
  return piece.querySelector(":scope > .location-accessory-art")?.getBoundingClientRect()
    || piece.getBoundingClientRect();
}

function accessoryPieceBounds(id, wormPart) {
  const bounds = visibleAccessoryPieces(id, wormPart).map(accessoryArtworkBounds);
  if (!bounds.length) return null;
  return {
    left: Math.min(...bounds.map(box => box.left)),
    top: Math.min(...bounds.map(box => box.top)),
    right: Math.max(...bounds.map(box => box.right)),
    bottom: Math.max(...bounds.map(box => box.bottom)),
    width: Math.max(...bounds.map(box => box.right)) - Math.min(...bounds.map(box => box.left)),
    height: Math.max(...bounds.map(box => box.bottom)) - Math.min(...bounds.map(box => box.top))
  };
}

function screenDeltaToAccessorySpace(piece, x, y) {
  const matrix = piece.parentElement?.getScreenCTM();
  if (!matrix) return { x, y };
  const inverse = matrix.inverse();
  const origin = els.wormAvatar.createSVGPoint();
  const target = els.wormAvatar.createSVGPoint();
  target.x = x;
  target.y = y;
  const localOrigin = origin.matrixTransform(inverse);
  const localTarget = target.matrixTransform(inverse);
  return { x: localTarget.x - localOrigin.x, y: localTarget.y - localOrigin.y };
}

function moveAccessory(id, wormPart, desiredPosition, referencePiece = visibleAccessoryPieces(id, wormPart)[0]) {
  if (!referencePiece) return desiredPosition;
  const positionKey = accessoryPositionKey(id, wormPart);
  const currentPosition = accessoryPosition(id, wormPart);
  let position = {
    x: desiredPosition.x,
    y: desiredPosition.y,
    scale: clampAccessoryScale(desiredPosition.scale ?? currentPosition.scale)
  };
  activeAccessoryPositions().set(positionKey, position);
  applyAccessoryPosition(id, wormPart, position);

  const movementBounds = els.habitat.getBoundingClientRect();
  const margin = referencePiece.dataset.accessoryFamily === "fig-fascinator"
    ? 4
    : Math.max(12, Math.min(18, movementBounds.width * .025));
  if (movementBounds.width && movementBounds.height) {
    const accessoryBounds = accessoryPieceBounds(id, wormPart);
    if (!accessoryBounds?.width || !accessoryBounds.height) return position;

    const topBoundary = movementBounds.top + margin;

    let screenX = 0;
    let screenY = 0;
    if (accessoryBounds.left < movementBounds.left + margin) screenX = movementBounds.left + margin - accessoryBounds.left;
    else if (accessoryBounds.right > movementBounds.right - margin) screenX = movementBounds.right - margin - accessoryBounds.right;
    if (accessoryBounds.top < topBoundary) screenY = topBoundary - accessoryBounds.top;
    else if (accessoryBounds.bottom > movementBounds.bottom - accessoryBottomMargin) screenY = movementBounds.bottom - accessoryBottomMargin - accessoryBounds.bottom;

    if (Math.abs(screenX) >= .5 || Math.abs(screenY) >= .5) {
      const correction = screenDeltaToAccessorySpace(referencePiece, screenX, screenY);
      position = { ...position, x: position.x + correction.x, y: position.y + correction.y };
      activeAccessoryPositions().set(positionKey, position);
      applyAccessoryPosition(id, wormPart, position);
    }
  }
  updateAccessoryLabelVisibility();
  if (
    selectedAccessorySizeTarget?.id === id
    && selectedAccessorySizeTarget.wormPart === wormPart
  ) updateAccessorySizeControls();
  return position;
}

function updateAccessoryLabelVisibility() {
  const labels = [els.wormNameTag, els.sceneName].filter(Boolean);
  if (!window.matchMedia("(max-width: 680px)").matches) {
    labels.forEach(label => label.classList.remove("is-covered"));
    return;
  }
  const accessoryBounds = [...document.querySelectorAll(".accessory:not([hidden]) .accessory-piece[data-worm-part]")]
    .map(accessoryArtworkBounds)
    .filter(bounds => bounds.width && bounds.height);
  labels.forEach(label => {
    const labelBounds = label.getBoundingClientRect();
    const covered = accessoryBounds.some(bounds => (
      bounds.left < labelBounds.right
      && bounds.right > labelBounds.left
      && bounds.top < labelBounds.bottom
      && bounds.bottom > labelBounds.top
    ));
    label.classList.toggle("is-covered", covered);
  });
}

function constrainVisibleAccessories() {
  if (els.habitat.classList.contains("is-changing")) return;
  accessoryIds.forEach(id => {
    if (!activeWardrobe().has(id)) return;
    accessoryWormParts.forEach(wormPart => {
      const piece = visibleAccessoryPieces(id, wormPart)[0];
      if (piece) moveAccessory(id, wormPart, accessoryPosition(id, wormPart), piece);
    });
  });
}

function queueAccessoryConstraints(includeAnimationEnd = false) {
  if (accessoryConstraintFrame) cancelAnimationFrame(accessoryConstraintFrame);
  accessoryConstraintFrame = requestAnimationFrame(() => {
    accessoryConstraintFrame = null;
    constrainVisibleAccessories();
    requestAnimationFrame(updateAccessoryLabelVisibility);
  });
  if (!includeAnimationEnd) return;
  if (accessoryConstraintTimer) clearTimeout(accessoryConstraintTimer);
  accessoryConstraintTimer = setTimeout(() => {
    accessoryConstraintTimer = null;
    constrainVisibleAccessories();
  }, 280);
}

function accessoryWormName(wormPart) {
  const item = byId.get(selectedId);
  const index = wormPart === "companion" ? 1 : 0;
  return item?.cast[index] || (wormPart === "companion" ? "male" : "worm");
}

function accessoryName(id, wormPart) {
  const accessory = document.querySelector(`[data-accessory="${id}"] .button-label`)?.textContent || "Accessory";
  if (!wormPart) return accessory;
  if (visibleAccessoryPieces(id, wormPart)[0]?.dataset.sharedAccessory === "true") return accessory;
  const pieceLabel = visibleAccessoryPieces(id, wormPart)[0]?.dataset.pieceLabel || accessory;
  return t("accessoryForWorm", { accessory: pieceLabel, worm: accessoryWormName(wormPart) });
}

function updateAccessorySizeControls() {
  const target = selectedAccessorySizeTarget;
  if (
    drawingEnabled
    || !target
    || !activeWardrobe().has(target.id)
    || !visibleAccessoryPieces(target.id, target.wormPart)[0]
  ) {
    els.accessorySizeControls.hidden = true;
    return;
  }
  const position = accessoryPosition(target.id, target.wormPart);
  const percentage = Math.round(position.scale * 100);
  els.accessorySizeControls.hidden = false;
  els.accessorySizeTarget.textContent = accessoryName(target.id, target.wormPart);
  els.accessorySizeSlider.value = String(percentage);
  els.accessorySizeSlider.setAttribute("aria-valuetext", `${percentage}%`);
  const sliderRange = accessoryScaleMax - accessoryScaleMin;
  const sliderProgress = sliderRange ? (position.scale - accessoryScaleMin) / sliderRange * 100 : 0;
  els.accessorySizeSlider.style.setProperty("--accessory-size-progress", `${sliderProgress.toFixed(2)}%`);
  els.accessorySizeValue.value = `${percentage}%`;
}

function selectAccessoryForSizing(id, wormPart) {
  if (!activeWardrobe().has(id) || !accessoryWormParts.includes(wormPart)) return;
  selectedAccessorySizeTarget = { id, wormPart };
  updateAccessorySizeControls();
}

function selectAvailableAccessoryForSizing(preferredId) {
  if (preferredId && activeWardrobe().has(preferredId)) {
    selectAccessoryForSizing(preferredId, "primary");
    return;
  }
  if (selectedAccessorySizeTarget && activeWardrobe().has(selectedAccessorySizeTarget.id)) {
    updateAccessorySizeControls();
    return;
  }
  const availableId = accessoryIds.find(id => activeWardrobe().has(id));
  if (availableId) selectAccessoryForSizing(availableId, "primary");
  else {
    selectedAccessorySizeTarget = null;
    updateAccessorySizeControls();
  }
}

function setSelectedAccessoryScale(scale) {
  const target = selectedAccessorySizeTarget;
  if (!target) return;
  const piece = visibleAccessoryPieces(target.id, target.wormPart)[0];
  if (!piece) return;
  const current = accessoryPosition(target.id, target.wormPart);
  moveAccessory(target.id, target.wormPart, {
    ...current,
    scale
  }, piece);
  queueAccessoryConstraints(true);
}

function announceSelectedAccessorySize() {
  const target = selectedAccessorySizeTarget;
  if (!target) return;
  const position = accessoryPosition(target.id, target.wormPart);
  announceAccessory(t("accessorySizeChanged", {
    accessory: accessoryName(target.id, target.wormPart),
    size: Math.round(position.scale * 100)
  }));
}

els.accessorySizeSlider.addEventListener("input", event => {
  setSelectedAccessoryScale(Number(event.currentTarget.value) / 100);
});
els.accessorySizeSlider.addEventListener("change", announceSelectedAccessorySize);

function announceAccessory(message) {
  els.accessoryStatus.textContent = "";
  requestAnimationFrame(() => { els.accessoryStatus.textContent = message; });
}

function resetAccessoryPosition(id, wormPart) {
  const position = { x: 0, y: 0, scale: 1 };
  activeAccessoryPositions().set(accessoryPositionKey(id, wormPart), position);
  applyAccessoryPosition(id, wormPart, position);
  queueAccessoryConstraints(true);
  updateAccessorySizeControls();
  announceAccessory(t("accessoryReset", { accessory: accessoryName(id, wormPart) }));
}

function activeDrawing() {
  const key = wardrobeKey();
  if (!drawings.has(key)) drawings.set(key, []);
  return drawings.get(key);
}

function renderDoodles() {
  els.doodleLayer.replaceChildren();
  activeDrawing().forEach(stroke => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("class", "doodle-stroke");
    path.setAttribute("d", stroke.d);
    path.setAttribute("stroke", stroke.color);
    els.doodleLayer.appendChild(path);
  });
}

function doodlePoint(event) {
  const bounds = els.doodleCanvas.getBoundingClientRect();
  return {
    x: ((event.clientX - bounds.left) / bounds.width) * 600,
    y: ((event.clientY - bounds.top) / bounds.height) * 430
  };
}

function pathFromPoints(points) {
  if (points.length < 2) {
    const point = points[0];
    return `M ${point.x.toFixed(1)} ${point.y.toFixed(1)} L ${(point.x + 0.1).toFixed(1)} ${point.y.toFixed(1)}`;
  }
  return points.reduce((path, point, index) => `${path}${index ? " L" : "M"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`, "");
}

function beginDoodle(input, inputType, inputId) {
  if (activeDoodle) return;
  const point = doodlePoint(input);
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("class", "doodle-stroke");
  path.setAttribute("stroke", drawingColor);
  path.setAttribute("d", pathFromPoints([point]));
  els.doodleLayer.appendChild(path);
  activeDoodle = { path, points: [point], color: drawingColor, inputType, inputId };
}

function extendActiveDoodle(input) {
  const point = doodlePoint(input);
  const previous = activeDoodle.points.at(-1);
  if (Math.hypot(point.x - previous.x, point.y - previous.y) < 1.8) return;
  activeDoodle.points.push(point);
  activeDoodle.path.setAttribute("d", pathFromPoints(activeDoodle.points));
}

function saveActiveDoodle() {
  const d = activeDoodle.path.getAttribute("d");
  activeDrawing().push({ d, color: activeDoodle.color });
  activeDoodle = null;
}

function syncDrawingMode() {
  els.freestyle.setAttribute("aria-pressed", String(drawingEnabled));
  els.drawTools.toggleAttribute("hidden", !drawingEnabled);
  els.habitat.classList.toggle("is-drawing", drawingEnabled);
  refreshAccessoryPieceControls();
  updateAccessorySizeControls();
}

els.freestyle.addEventListener("click", () => {
  drawingEnabled = !drawingEnabled;
  drawingModes.set(wardrobeKey(), drawingEnabled);
  syncDrawingMode();
});

document.querySelectorAll("[data-draw-color]").forEach(button => {
  button.addEventListener("click", () => {
    drawingColor = button.dataset.drawColor;
    document.querySelectorAll("[data-draw-color]").forEach(candidate => {
      const selected = candidate === button;
      candidate.classList.toggle("is-selected", selected);
      candidate.setAttribute("aria-pressed", String(selected));
    });
  });
});

els.clearDrawing.addEventListener("click", () => {
  drawings.set(wardrobeKey(), []);
  renderDoodles();
});

els.doodleCanvas.addEventListener("pointerdown", event => {
  if (!drawingEnabled || activeDoodle || event.button !== 0) return;
  event.preventDefault();
  try {
    els.habitat.setPointerCapture(event.pointerId);
  } catch {
    // Window-level pointer listeners keep the stroke alive as a fallback.
  }
  beginDoodle(event, "pointer", event.pointerId);
});

function moveActiveDoodlePointer(event) {
  if (!activeDoodle || activeDoodle.inputType !== "pointer" || activeDoodle.inputId !== event.pointerId) return;
  event.preventDefault();
  extendActiveDoodle(event);
}

function finishDoodlePointer(event) {
  if (!activeDoodle || activeDoodle.inputType !== "pointer" || activeDoodle.inputId !== event.pointerId) return;
  if (els.habitat.hasPointerCapture?.(event.pointerId)) els.habitat.releasePointerCapture(event.pointerId);
  saveActiveDoodle();
}

els.habitat.addEventListener("pointermove", event => {
  if (!activeDoodle) return;
  event.stopPropagation();
  moveActiveDoodlePointer(event);
});
window.addEventListener("pointermove", moveActiveDoodlePointer, { passive: false });
window.addEventListener("pointerup", finishDoodlePointer, true);
window.addEventListener("pointercancel", finishDoodlePointer, true);

function matchingTouch(touchList, identifier) {
  return Array.from(touchList).find(touch => touch.identifier === identifier);
}

function moveActiveDoodleTouch(event) {
  if (!activeDoodle || activeDoodle.inputType !== "touch") return;
  const touch = matchingTouch(event.touches, activeDoodle.inputId);
  if (!touch) return;
  event.preventDefault();
  extendActiveDoodle(touch);
}

function finishDoodleTouch(event) {
  if (!activeDoodle || activeDoodle.inputType !== "touch") return;
  const touch = matchingTouch(event.changedTouches, activeDoodle.inputId);
  if (!touch) return;
  event.preventDefault();
  saveActiveDoodle();
}

if (!("PointerEvent" in window)) {
  els.doodleCanvas.addEventListener("touchstart", event => {
    if (!drawingEnabled || activeDoodle) return;
    const touch = event.changedTouches[0];
    if (!touch) return;
    event.preventDefault();
    beginDoodle(touch, "touch", touch.identifier);
  }, { passive: false });
  els.doodleCanvas.addEventListener("touchmove", moveActiveDoodleTouch, { passive: false });
  els.doodleCanvas.addEventListener("touchend", finishDoodleTouch, { passive: false });
  els.doodleCanvas.addEventListener("touchcancel", finishDoodleTouch, { passive: false });
}

function syncFittedHeadwearMotion(accessory) {
  if (!accessory?.querySelector(".fitted-headwear-motion, .fitted-kilt-motion, .fitted-scope-motion")) return;
  requestAnimationFrame(() => {
    if (!accessory.isConnected || accessory.hasAttribute("hidden")) return;
    accessory.querySelectorAll(".fitted-headwear-motion, .fitted-kilt-motion, .fitted-scope-motion").forEach(motion => {
      const body = document.querySelector(motion.classList.contains("companion") ? ".companion-body" : ".worm-body");
      const bodyAnimation = body?.getAnimations()[0];
      const hatAnimation = motion.getAnimations()[0];
      if (bodyAnimation && hatAnimation) hatAnimation.currentTime = bodyAnimation.currentTime;
    });
  });
}

function toggleAccessory(id, force) {
  const activeAccessories = activeWardrobe();
  const shouldShow = typeof force === "boolean" ? force : !activeAccessories.has(id);
  const accessory = document.getElementById(id);
  const button = document.querySelector(`[data-accessory="${id}"]`);
  if (!accessory || !button) return;
  accessoryWormParts.forEach(wormPart => applyAccessoryPosition(id, wormPart));
  accessory.toggleAttribute("hidden", !shouldShow);
  if (shouldShow) syncFittedHeadwearMotion(accessory);
  button.setAttribute("aria-pressed", String(shouldShow));
  if (shouldShow) activeAccessories.add(id);
  else activeAccessories.delete(id);
  refreshAccessoryPieceControls();
  updateAccessoryLabelVisibility();
  if (shouldShow) queueAccessoryConstraints(true);
  selectAvailableAccessoryForSizing(shouldShow ? id : null);
}

function syncAccessories() {
  const activeAccessories = activeWardrobe();
  accessoryIds.forEach(id => {
    const accessory = document.getElementById(id);
    const button = document.querySelector(`[data-accessory="${id}"]`);
    const shouldShow = activeAccessories.has(id);
    accessoryWormParts.forEach(wormPart => applyAccessoryPosition(id, wormPart));
    accessory?.toggleAttribute("hidden", !shouldShow);
    if (shouldShow) syncFittedHeadwearMotion(accessory);
    button?.setAttribute("aria-pressed", String(shouldShow));
  });
  refreshAccessoryPieceControls();
  updateAccessoryLabelVisibility();
  queueAccessoryConstraints(true);
  selectAvailableAccessoryForSizing();
}

function refreshAccessoryPieceControls() {
  document.querySelectorAll(".accessory-piece[data-worm-part]").forEach(piece => {
    piece.querySelector(":scope > .accessory-hit-target")?.remove();
    piece.setAttribute("tabindex", "-1");
    piece.setAttribute("focusable", "false");
    piece.removeAttribute("role");
    piece.removeAttribute("aria-label");
    piece.removeAttribute("aria-roledescription");
    piece.removeAttribute("aria-describedby");
    piece.removeAttribute("aria-keyshortcuts");
  });

  if (drawingEnabled) return;
  accessoryIds.forEach(id => {
    if (!activeWardrobe().has(id)) return;
    accessoryWormParts.forEach(wormPart => {
      const piece = visibleAccessoryPieces(id, wormPart)[0];
      if (!piece) return;
      piece.setAttribute("tabindex", "0");
      piece.setAttribute("focusable", "true");
      piece.setAttribute("role", "button");
      piece.setAttribute("aria-roledescription", "movable accessory");
      piece.setAttribute("aria-label", accessoryName(id, wormPart));
      piece.setAttribute("aria-keyshortcuts", `ArrowUp ArrowDown ArrowLeft ArrowRight + - Home${piece.querySelector(".edinburgh-focus-wheel") ? " Enter Space" : ""}`);
      addAccessoryHitTarget(piece);
    });
  });
}

function addAccessoryHitTarget(piece) {
  const bounds = piece.getBBox();
  const matrix = piece.getScreenCTM();
  if (!matrix || !Number.isFinite(bounds.width) || !Number.isFinite(bounds.height)) return;
  const scaleX = Math.hypot(matrix.a, matrix.b) || 1;
  const scaleY = Math.hypot(matrix.c, matrix.d) || 1;
  const isN2CompanionCoat = piece.dataset.accessoryFamily === "n2-lab-coat" && piece.dataset.wormPart === "companion";
  const isN2Accessory = ["ngm-agar-plate", "n2-lab-coat", "cryo-vial-jetpack", "n2-lab-goggles"].includes(piece.dataset.accessoryFamily);
  const minimumTarget = piece.dataset.accessoryFamily === "ngm-agar-plate" ? 46 : isN2Accessory ? 52 : 44;
  const width = isN2CompanionCoat ? minimumTarget / scaleX : Math.max(bounds.width, minimumTarget / scaleX);
  const height = isN2CompanionCoat ? minimumTarget / scaleY : Math.max(bounds.height, minimumTarget / scaleY);
  const targetX = isN2CompanionCoat
    ? bounds.x + bounds.width - width / 2 + 3 / scaleX
    : bounds.x + (bounds.width - width) / 2;
  const targetY = bounds.y + (bounds.height - height) / 2;
  const hitTarget = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  hitTarget.setAttribute("class", "accessory-hit-target");
  hitTarget.setAttribute("x", String(targetX));
  hitTarget.setAttribute("y", String(targetY));
  hitTarget.setAttribute("width", String(width));
  hitTarget.setAttribute("height", String(height));
  hitTarget.setAttribute("rx", String(Math.min(width, height) * .22));
  hitTarget.setAttribute("aria-hidden", "true");
  piece.prepend(hitTarget);
}

const accessoryResizeObserver = new ResizeObserver(() => {
  if (accessoryResizeFrame) cancelAnimationFrame(accessoryResizeFrame);
  accessoryResizeFrame = requestAnimationFrame(() => {
    accessoryResizeFrame = null;
    refreshAccessoryPieceControls();
    constrainVisibleAccessories();
  });
});
accessoryResizeObserver.observe(els.wormAvatar);

function playSelectionEffect() {
  els.habitat.classList.remove("is-changing");
  void els.habitat.offsetWidth;
  els.habitat.classList.add("is-changing");
  els.habitat.querySelectorAll(".selection-spark").forEach(spark => spark.remove());
  for (let index = 0; index < 8; index += 1) {
    const spark = document.createElement("span");
    spark.className = "selection-spark";
    spark.style.setProperty("--spark-angle", `${index * 45}deg`);
    spark.style.setProperty("--spark-distance", `${72 + (index % 3) * 18}px`);
    spark.textContent = index % 2 ? "✦" : "•";
    els.habitat.appendChild(spark);
    setTimeout(() => spark.remove(), 720);
  }
  setTimeout(() => {
    els.habitat.classList.remove("is-changing");
    queueAccessoryConstraints(true);
  }, 720);
}

document.querySelectorAll("[data-accessory]").forEach(button => {
  button.addEventListener("click", () => toggleAccessory(button.dataset.accessory));
});

function captureAccessoryPointer(pointerId) {
  try {
    els.habitat.setPointerCapture(pointerId);
  } catch {
    // Window-level pointer listeners keep the gesture alive as a fallback.
  }
}

function finishAccessoryDrag(event) {
  if (!activeAccessoryDrag || !activeAccessoryDrag.pointers.has(event.pointerId)) return;
  const { id, wormPart, piece, moved, pointers } = activeAccessoryDrag;
  pointers.forEach((value, pointerId) => {
    if (els.habitat.hasPointerCapture?.(pointerId)) els.habitat.releasePointerCapture(pointerId);
  });
  piece.classList.remove("is-dragging");
  document.documentElement.classList.remove("accessory-drag-active");
  moveAccessory(id, wormPart, accessoryPosition(id, wormPart), piece);
  if (moved) announceAccessory(t("accessoryMoved", { accessory: accessoryName(id, wormPart) }));
  else if (event.type === "pointerup") turnTelescopeFocus(piece);
  activeAccessoryDrag = null;
  queueAccessoryConstraints();
}

function moveActiveAccessoryPointer(event) {
  if (!activeAccessoryDrag || !activeAccessoryDrag.pointers.has(event.pointerId)) return;
  const { id, wormPart, piece } = activeAccessoryDrag;
  event.preventDefault();
  activeAccessoryDrag.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
  if (activeAccessoryDrag.pinch && activeAccessoryDrag.pointers.size === 2) {
    const [first, second] = [...activeAccessoryDrag.pointers.values()];
    const distance = Math.hypot(second.x - first.x, second.y - first.y);
    if (Math.abs(distance - activeAccessoryDrag.pinch.startDistance) > 1) activeAccessoryDrag.moved = true;
    const current = accessoryPosition(id, wormPart);
    moveAccessory(id, wormPart, {
      ...current,
      scale: activeAccessoryDrag.pinch.startScale * distance / activeAccessoryDrag.pinch.startDistance
    }, piece);
    return;
  }
  if (activeAccessoryDrag.primaryPointerId !== event.pointerId) return;
  const movementBounds = els.habitat.getBoundingClientRect();
  const margin = Math.max(12, Math.min(18, movementBounds.width * .025));
  const startBounds = activeAccessoryDrag.startBounds;
  let screenDeltaX = event.clientX - activeAccessoryDrag.startClientPoint.x;
  let screenDeltaY = event.clientY - activeAccessoryDrag.startClientPoint.y;
  if (startBounds?.width && startBounds.height) {
    screenDeltaX = Math.max(
      movementBounds.left + margin - startBounds.left,
      Math.min(movementBounds.right - margin - startBounds.right, screenDeltaX)
    );
    screenDeltaY = Math.max(
      movementBounds.top + margin - startBounds.top,
      Math.min(movementBounds.bottom - accessoryBottomMargin - startBounds.bottom, screenDeltaY)
    );
  }
  if (Math.hypot(screenDeltaX, screenDeltaY) > 1) activeAccessoryDrag.moved = true;
  const delta = screenDeltaToAccessorySpace(piece, screenDeltaX, screenDeltaY);
  moveAccessory(id, wormPart, {
    x: activeAccessoryDrag.startPosition.x + delta.x,
    y: activeAccessoryDrag.startPosition.y + delta.y,
    scale: activeAccessoryDrag.startPosition.scale
  }, piece);
}

function turnTelescopeFocus(piece) {
  const wheel = piece.querySelector(".edinburgh-focus-wheel");
  if (!wheel) return;
  const start = Number(wheel.dataset.angle || 0);
  const end = start + 60;
  wheel.dataset.angle = String(end);
  wheel.getAnimations().forEach(animation => animation.cancel());
  wheel.style.transform = `rotate(${end}deg)`;
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    wheel.animate([{ transform:`rotate(${start}deg)` }, { transform:`rotate(${end}deg)` }], { duration:420, easing:"ease-out" });
  }
}

function wireAccessoryPieces() {
  document.querySelectorAll(".accessory-piece[data-worm-part]").forEach(piece => {
    if (wiredAccessoryPieces.has(piece)) return;
    const accessory = piece.closest(".accessory");
    const id = accessory?.id;
    const wormPart = piece.dataset.wormPart;
    if (!accessory || !id || !accessoryWormParts.includes(wormPart)) return;
    wiredAccessoryPieces.add(piece);
    piece.addEventListener("focus", () => selectAccessoryForSizing(id, wormPart));

    piece.addEventListener("pointerdown", event => {
      if (drawingEnabled || event.button !== 0 || !activeWardrobe().has(id)) return;
      if (activeAccessoryDrag) {
        if (activeAccessoryDrag.piece !== piece || activeAccessoryDrag.pointers.size >= 2) return;
        event.preventDefault();
        event.stopPropagation();
        captureAccessoryPointer(event.pointerId);
        activeAccessoryDrag.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
        const [first, second] = [...activeAccessoryDrag.pointers.values()];
        activeAccessoryDrag.pinch = {
          startDistance: Math.max(1, Math.hypot(second.x - first.x, second.y - first.y)),
          startScale: accessoryPosition(id, wormPart).scale
        };
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      piece.focus({ preventScroll: true });
      captureAccessoryPointer(event.pointerId);
      piece.classList.add("is-dragging");
      document.documentElement.classList.add("accessory-drag-active");
      activeAccessoryDrag = {
        id,
        wormPart,
        piece,
        primaryPointerId: event.pointerId,
        pointers: new Map([[event.pointerId, { x: event.clientX, y: event.clientY }]]),
        pinch: null,
        startClientPoint: { x: event.clientX, y: event.clientY },
        startBounds: accessoryPieceBounds(id, wormPart),
        startPosition: accessoryPosition(id, wormPart),
        moved: false
      };
    });

    piece.addEventListener("keydown", event => {
      if (piece.getAttribute("tabindex") !== "0" || drawingEnabled || !activeWardrobe().has(id)) return;
      if ((event.key === "Enter" || event.key === " ") && piece.querySelector(".edinburgh-focus-wheel")) {
        event.preventDefault();
        if (!event.repeat) turnTelescopeFocus(piece);
        return;
      }
      if (event.key === "Home") {
        event.preventDefault();
        resetAccessoryPosition(id, wormPart);
        return;
      }

      const scaleDirection = ["+", "="].includes(event.key)
        ? 1
        : ["-", "_"].includes(event.key) ? -1 : 0;
      if (scaleDirection) {
        event.preventDefault();
        const current = accessoryPosition(id, wormPart);
        moveAccessory(id, wormPart, {
          ...current,
          scale: current.scale + scaleDirection * (event.shiftKey ? .2 : .1)
        }, piece);
        queueAccessoryConstraints(true);
        return;
      }

      const direction = {
        ArrowLeft: [-1, 0],
        ArrowRight: [1, 0],
        ArrowUp: [0, -1],
        ArrowDown: [0, 1]
      }[event.key];
      if (!direction) return;
      event.preventDefault();
      const current = accessoryPosition(id, wormPart);
      const step = event.shiftKey ? 12 : 4;
      const position = moveAccessory(id, wormPart, {
        x: current.x + direction[0] * step,
        y: current.y + direction[1] * step,
        scale: current.scale
      }, piece);
      queueAccessoryConstraints(true);
      announceAccessory(t("accessoryPosition", {
        accessory: accessoryName(id, wormPart),
        x: Math.round(position.x),
        y: Math.round(position.y)
      }));
    });
  });
}

els.habitat.addEventListener("pointermove", event => {
  if (!activeAccessoryDrag) return;
  event.stopPropagation();
  moveActiveAccessoryPointer(event);
});
window.addEventListener("pointermove", moveActiveAccessoryPointer, { passive: false });
window.addEventListener("pointerup", finishAccessoryDrag, true);
window.addEventListener("pointercancel", finishAccessoryDrag, true);
window.addEventListener("touchmove", event => {
  if (activeAccessoryDrag) event.preventDefault();
}, { capture: true, passive: false });

function createMarker(record) {
  const item = byId.get(record.speciesId);
  const svgNamespace = "http://www.w3.org/2000/svg";
  const leader = document.createElementNS(svgNamespace, "g");
  const leaderLine = document.createElementNS(svgNamespace, "line");
  leader.setAttribute("class", `map-leader ${item.reproduction}`);
  leader.append(leaderLine);
  leader.style.display = "none";
  els.mapLeaders.appendChild(leader);

  const button = document.createElement("button");
  const reproductionMode = item.reproduction === "selfing"
    ? t("reproductionMostlySelfing")
    : t("reproductionOutcrossing");
  button.type = "button";
  button.className = `map-marker ${item.reproduction}`;
  button.dataset.species = item.id;
  button.dataset.place = record.name;
  const sourceSuffix = record.source
    ? t("markerSourceSuffix", { source: record.source })
    : "";
  button.setAttribute("aria-label", t("markerAria", {
    name: item.name,
    reproduction: reproductionMode,
    place: record.name,
    source: sourceSuffix
  }));
  button.setAttribute("aria-pressed", "false");
  button.tabIndex = -1;
  button.addEventListener("mouseenter", () => showMarkerTooltip(record, item, button));
  button.addEventListener("mouseleave", hideMarkerTooltip);
  button.addEventListener("focus", () => showMarkerTooltip(record, item, button));
  button.addEventListener("blur", hideMarkerTooltip);
  button.addEventListener("click", () => {
    hideMarkerTooltip();
    selectSpecies(item.id, record);
  });
  button.addEventListener("keydown", event => {
    const markers = [...els.mapMarkers.querySelectorAll(".map-marker")];
    const index = markers.indexOf(button);
    let nextIndex = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % markers.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + markers.length) % markers.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = markers.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    markers.forEach(marker => { marker.tabIndex = -1; });
    markers[nextIndex].tabIndex = 0;
    markers[nextIndex].focus();
  });
  els.mapMarkers.appendChild(button);
  record.button = button;
  record.leader = { group: leader, line: leaderLine };
}

function showMarkerTooltip(record, item, button) {
  els.mapTooltipPlace.textContent = record.name;
  els.mapTooltipSpecies.textContent = item.short;
  els.mapTooltipDetail.textContent = `${record.strain ? `${record.strain} · ` : ""}${item.reproductionLabel}${record.source ? ` · ${record.source}` : ""}`;
  const markerX = Number.parseFloat(button.style.left);
  const markerY = Number.parseFloat(button.style.top);
  const tooltipX = Math.max(118, Math.min(els.mapWrap.clientWidth - 118, markerX));
  els.mapTooltip.style.left = `${tooltipX}px`;
  els.mapTooltip.hidden = false;
  const tooltipHeight = els.mapTooltip.offsetHeight;
  const mapHeight = els.mapWrap.clientHeight;
  const crossesTop = markerY - tooltipHeight - 16 < 0;
  els.mapTooltip.classList.toggle("below", crossesTop);
  if (crossesTop) {
    // Keep a top-edge tooltip inside the map when the marker is also near
    // the bottom edge (for example after a narrow viewport reflow).
    const maxTop = Math.max(0, mapHeight - tooltipHeight - 20);
    els.mapTooltip.style.top = `${Math.min(Math.max(markerY, 0), maxTop)}px`;
  } else {
    els.mapTooltip.style.top = `${markerY}px`;
  }
}

function hideMarkerTooltip() {
  els.mapTooltip.hidden = true;
}

function positionMarkers() {
  if (!projection || !projectedLocations.length) return;
  const svg = document.getElementById("world-map");
  const box = svg.getBoundingClientRect();
  const scale = Math.min(box.width / 960, box.height / 470);
  const offsetX = (box.width - 960 * scale) / 2;
  const offsetY = (box.height - 470 * scale) / 2;
  // Fan out genuinely nearby records, not every marker that becomes close
  // only because the complete world map has narrowed on a phone.
  const clusterDistance = 20;
  const projectedPoints = new Map(projectedLocations.map(record => [
    record,
    projection(record.coordinates)
  ]));
  const remaining = new Set(projectedLocations);
  const clusters = [];
  while (remaining.size) {
    const seed = remaining.values().next().value;
    const cluster = [];
    const queue = [seed];
    remaining.delete(seed);
    while (queue.length) {
      const current = queue.shift();
      const currentPoint = projectedPoints.get(current);
      cluster.push(current);
      [...remaining].forEach(candidate => {
        const candidatePoint = projectedPoints.get(candidate);
        if (Math.hypot(candidatePoint[0] - currentPoint[0], candidatePoint[1] - currentPoint[1]) < clusterDistance) {
          remaining.delete(candidate);
          queue.push(candidate);
        }
      });
    }
    clusters.push(cluster);
  }
  const clusterTargets = new Map();
  clusters.filter(cluster => cluster.length > 1).forEach(cluster => {
    const centre = cluster.reduce((sum, record) => {
      const point = projectedPoints.get(record);
      return [sum[0] + point[0], sum[1] + point[1]];
    }, [0, 0]).map(total => total / cluster.length);
    const radius = Math.min(32, 17 + cluster.length * 2.5);
    const angleStep = (Math.PI * 2) / cluster.length;
    const orderedCluster = cluster.map(record => {
      const point = projectedPoints.get(record);
      const angle = (Math.atan2(point[1] - centre[1], point[0] - centre[0]) + Math.PI * 2) % (Math.PI * 2);
      return { record, angle };
    }).sort((a, b) => a.angle - b.angle);
    const phaseVector = orderedCluster.reduce((sum, item, index) => {
      const phaseCandidate = item.angle - angleStep * index;
      return [sum[0] + Math.cos(phaseCandidate), sum[1] + Math.sin(phaseCandidate)];
    }, [0, 0]);
    const phase = Math.atan2(phaseVector[1], phaseVector[0]);
    orderedCluster.forEach((item, index) => {
      const angle = phase + angleStep * index;
      const { record } = item;
      clusterTargets.set(record, {
        x: offsetX + centre[0] * scale + Math.cos(angle) * radius,
        y: offsetY + centre[1] * scale + Math.sin(angle) * radius
      });
    });
  });
  projectedLocations.forEach(record => {
    const point = projectedPoints.get(record);
    const baseX = offsetX + point[0] * scale;
    const baseY = offsetY + point[1] * scale;
    const target = clusterTargets.get(record);
    const x = Math.max(13, Math.min(box.width - 13, target ? target.x : baseX));
    const y = Math.max(13, Math.min(box.height - 13, target ? target.y : baseY));
    const displaced = Math.hypot(x - baseX, y - baseY) > 1;
    record.leader.group.style.display = displaced ? "" : "none";
    if (displaced) {
      const markerPoint = [(x - offsetX) / scale, (y - offsetY) / scale];
      record.leader.line.setAttribute("x1", point[0]);
      record.leader.line.setAttribute("y1", point[1]);
      record.leader.line.setAttribute("x2", markerPoint[0]);
      record.leader.line.setAttribute("y2", markerPoint[1]);
    }
    record.button.style.left = `${x}px`;
    record.button.style.top = `${y}px`;
  });
}

function drawMap() {
  const topology = world && world.objects ? world : world.default;
  if (!topology || !topology.objects || !topology.objects.features) {
    throw new Error(t("worldGeometryUnavailable"));
  }

  const countries = feature(topology, topology.objects.features).features;
  projection = geoNaturalEarth1().fitExtent([[18, 18], [942, 452]], { type: "Sphere" });
  const path = geoPath(projection);
  els.sphere.setAttribute("d", path({ type: "Sphere" }));
  els.graticule.setAttribute("d", path(geoGraticule10()));

  const svgNamespace = "http://www.w3.org/2000/svg";
  countries.forEach(country => {
    const countryPath = document.createElementNS(svgNamespace, "path");
    countryPath.setAttribute("d", path(country));
    els.countries.appendChild(countryPath);
  });

  projectedLocations = species.flatMap(item => item.locations.map(location => ({
    ...location,
    speciesId: item.id
  })));
  projectedLocations.forEach(createMarker);
  positionMarkers();
  updateSelectedControls();
  els.mapWrap.classList.add("map-ready");
}

renderTabs();
const initialSpecies = byId.get(selectedId);
const initialPlace = initialSpecies.locations[0];
selectedRecordName = initialPlace.name;
visited.add(initialSpecies.id);
updateExploredStatus();
renderSpecies(initialSpecies, initialPlace);
updateSelectedControls();
document.addEventListener("visibilitychange", () => {
  if (document.hidden) stopNarration();
});
window.addEventListener("pagehide", () => stopNarration());

try {
  drawMap();
  const resizeObserver = new ResizeObserver(positionMarkers);
  resizeObserver.observe(document.getElementById("world-map"));
} catch (error) {
  console.error(error);
  els.mapLoading.textContent = t("mapUnavailable");
}
