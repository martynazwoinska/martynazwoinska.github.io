import { geoGraticule10, geoNaturalEarth1, geoPath } from "https://cdn.jsdelivr.net/npm/d3-geo@3/+esm";
import { feature } from "https://cdn.jsdelivr.net/npm/topojson-client@3/+esm";
import world from "https://esm.sh/@d3-maps/atlas@1.0.0/world/countries/countries-110m";
import { createGameTranslator } from "./game-i18n.js?v=20260713-3";
import { auditEnvironmentCompositions, getEnvironmentProfile, renderEnvironmentScene } from "./environment-scenes.js?v=20260714-10";
import { auditAccessoryCatalogue, auditAccessoryPairGeometry, renderLocationAccessories } from "./accessory-designs.js?v=20260714-13";

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
      { name: "Ishigaki, Japan", coordinates: [124.16, 24.34], style: "okinawa" }
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
    fact: "Self-fertile C. briggsae hermaphrodites can found a population alone; its sister species C. nigoni instead needs females and males.",
    worm: "#8bc9a7",
    wormDeep: "#387d68",
    habitatOne: "#8ed0ad",
    habitatTwo: "#59a6a0",
    locations: [
      { name: "Ahmedabad, India · AF16", coordinates: [72.56, 23.03], source: "CaeNDR", style: "field" },
      { name: "Taipei, Taiwan · BRC20390", coordinates: [121.576542, 25.027105], source: "CaeNDR", style: "rainforest" },
      { name: "Kerala, India · JU1337", coordinates: [77.075, 8.32], source: "CaeNDR", style: "rainforest" },
      { name: "Kauaʻi, Hawaiʻi · QG130", coordinates: [-159.5829, 22.2202], source: "CaeNDR", style: "kauai" },
      { name: "Réunion Island · JU1375", coordinates: [55.6885, -21.0469], source: "CaeNDR", style: "ocean" },
      { name: "Orsay, France · JU2518", coordinates: [2.1725, 48.7015], source: "CaeNDR", style: "field" },
      { name: "Angra dos Reis, Rio de Janeiro · EG5612", coordinates: [-44.19, -23.18], source: "CaeNDR", style: "rainforest" },
      { name: "Nambucca Heads, New South Wales · QG2814", coordinates: [153.0090333, -30.6445167], source: "CaeNDR", style: "rainforest" }
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
      { name: "Bristol N2, England", coordinates: [-2.59, 51.45], source: "CaeNDR", style: "field", strain: "N2", history: "N2 came from mushroom compost near Bristol. C. elegans can be frozen alive in a protective solution and revived after thawing. This is the reason for its cryo-vial jetpack. An early N2 tube frozen around 1968 was later thawed to establish an ancestral laboratory stock." },
      { name: "Santeuil, France", coordinates: [1.951, 49.121], source: "CaeNDR", style: "field", strain: "JU1925", history: "Across three October surveys of Santeuil wood, C. elegans was found on about half of 88 rotting stems; soil yielded it only occasionally." },
      { name: "Edinburgh, Scotland", coordinates: [-3.19, 55.92], source: "CaeNDR", style: "field", strain: "ED3010", history: "ED3010 represents an urban-garden compost sample from Midmar Allotment, field 1, plot 39. The Edinburgh marker currently brings together 12 strains in 4 isotype groups, all isolated from urban-garden compost." },
      { name: "Tenerife, Spain", coordinates: [-16.535468, 28.411121], source: "CaeNDR", style: "field", strain: "NIC1787", history: "This Tenerife marker combines 23 C. elegans records collected in the Puerto de la Cruz botanical garden on 14 March 2019. NIC1787, formerly 9.1, is the representative; it was isolated at 114 m from ‘Avocado fruit, old, very rotten.’ The wider record set also includes other rotting fruits, flowers, stems and plant litter." },
      { name: "Kauaʻi, Hawaiʻi", coordinates: [-159.668, 22.149], source: "CaeNDR", style: "kauai", strain: "XZ1516", history: "XZ1516 was collected by M. Ailion on 15 October 2014 at 983 m from rotting nut, pod, seed or fruit. Population-genomic research identifies it among Kauaʻi’s exceptionally divergent C. elegans isotypes." },
      { name: "Australian Capital Territory", coordinates: [149.115, -35.254], source: "CaeNDR", style: "field", strain: "QG2811", history: "This marker represents QG2811, recorded at 590 m. M. Rockman collected rotting figs from an O'Connor backyard on 22 March 2017; a hermaphrodite was recovered through a Baermann funnel on 2 April. The public garden illustration is anonymised." },
      { name: "Auckland, New Zealand", coordinates: [174.746, -36.893], source: "CaeNDR", style: "field", strain: "ECA36", history: "ECA36, formerly GD6, was collected from garden grass in an Auckland urban garden at 46 m on 27 July 2013. In a controlled laboratory comparison it was an outlier for brood size and male-production rate; those are lab phenotypes, not evidence of field adaptation." },
      { name: "Araucanía, Chile", coordinates: [-72.1509, -38.9379], source: "CaeNDR", style: "field", strain: "JU4400", history: "JU4400, formerly Ch41.7, was collected and isolated by M.-A. Félix on 3 March 2023 from compost in a rural garden in Cunco at 300 m. Its species identification was recorded as a test cross." }
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
      { name: "Trivandrum, Kerala · JU1325", coordinates: [76.94, 8.52], source: "Félix Lab", style: "rainforest" },
      { name: "Singapore · ZF1220", coordinates: [103.82, 1.32], source: "Félix Lab", style: "rainforest" },
      { name: "Praslin, Seychelles · YR106", coordinates: [55.7467, -4.3193], source: "Félix Lab", style: "ocean" },
      { name: "São Tomé · JU2484", coordinates: [6.73, 0.34], source: "Félix Lab", style: "rainforest" },
      { name: "Mahahual, Mexico · JU2617", coordinates: [-87.71, 18.72], source: "Félix Lab", style: "rainforest" },
      { name: "Mauritius · JU2909", coordinates: [57.4061, -20.2914], source: "Félix Lab", style: "ocean" },
      { name: "Ho Chi Minh City · JU4356", coordinates: [106.6939439, 10.7742239], source: "Félix Lab", style: "rainforest" },
      { name: "Lombok, Indonesia · HPT26", coordinates: [116.23966, -8.527466], source: "Félix Lab", style: "rainforest" }
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
    fact: "Its reference isolate JU1873 came from one cacao fruit in 2009; comparing it with selfing C. tropicalis helps reveal changes that accompanied self-fertilization.",
    worm: "#a9a0df",
    wormDeep: "#5f55a5",
    habitatOne: "#a9c796",
    habitatTwo: "#8d79bd",
    locations: [
      { name: "Sanda, Bali · JU1873", coordinates: [115.0, -8.3], source: "Félix Lab", style: "rainforest", history: "JU1873 was isolated from a rotten cacao fruit collected in a plantation near Sanda, Bali, in November 2009." }
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
      { name: "Barro Colorado Island, Panama", coordinates: [-79.840, 9.160], source: "CaeNDR", style: "rainforest" },
      { name: "La Selva, Costa Rica", coordinates: [-84.009, 10.426], source: "CaeNDR", style: "rainforest" },
      { name: "Guadeloupe", coordinates: [-61.643, 16.044], source: "CaeNDR", style: "ocean" },
      { name: "Nouragues, French Guiana", coordinates: [-52.683, 4.090], source: "CaeNDR", style: "rainforest" },
      { name: "Manaus region, Brazil", coordinates: [-59.840, -2.960], source: "CaeNDR", style: "rainforest" },
      { name: "Oʻahu, Hawaiʻi", coordinates: [-157.765, 21.356], source: "CaeNDR", style: "kauai" },
      { name: "Kauaʻi, Hawaiʻi", coordinates: [-159.478, 22.194], source: "CaeNDR", style: "kauai" },
      { name: "New Taipei City, Taiwan", coordinates: [121.773, 25.053], source: "CaeNDR", style: "rainforest" },
      { name: "Pohnpei, Micronesia", coordinates: [158.182, 6.907], source: "CaeNDR", style: "ocean" },
      { name: "Queensland, Australia", coordinates: [145.446, -16.103], source: "CaeNDR", style: "rainforest" },
      { name: "Réunion Island", coordinates: [55.688, -21.047], source: "CaeNDR", style: "ocean" }
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
const accessoryIds = ["local-headwear", "local-wrap", "local-charm"];
const accessoryWormParts = ["primary", "companion"];
const wardrobes = new Map();
const accessoryPositions = new Map();
const drawings = new Map();
const wiredAccessoryPieces = new WeakSet();
let selectedId = "elegans";
let selectedRecordName = null;
let drawingEnabled = false;
let drawingColor = "#f36f62";
let activeDoodle = null;
let activeAccessoryDrag = null;
let accessoryResizeFrame = null;
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
  doodleLayer: document.getElementById("doodle-layer"),
  localHeadwear: document.getElementById("local-headwear"),
  localWrap: document.getElementById("local-wrap"),
  localCharm: document.getElementById("local-charm"),
  localHeadwearIcon: document.querySelector('[data-accessory="local-headwear"] .button-icon'),
  localHeadwearLabel: document.querySelector('[data-accessory="local-headwear"] .button-label'),
  localWrapIcon: document.querySelector('[data-accessory="local-wrap"] .button-icon'),
  localWrapLabel: document.querySelector('[data-accessory="local-wrap"] .button-label'),
  localCharmIcon: document.querySelector('[data-accessory="local-charm"] .button-icon'),
  localCharmLabel: document.querySelector('[data-accessory="local-charm"] .button-label'),
  speciesRegion: document.getElementById("species-region"),
  speciesName: document.getElementById("species-name"),
  speciesNickname: document.getElementById("species-nickname"),
  speciesIntro: document.getElementById("species-intro"),
  speciesReproduction: document.getElementById("species-reproduction"),
  speciesHabitat: document.getElementById("species-habitat"),
  speciesFact: document.getElementById("species-fact"),
  environmentNote: document.getElementById("environment-note"),
  environmentSource: document.getElementById("environment-source"),
  exploredCount: document.getElementById("explored-count"),
  freestyle: document.getElementById("freestyle-draw"),
  drawTools: document.getElementById("draw-tools"),
  clearDrawing: document.getElementById("clear-drawing"),
  accessoryStatus: document.getElementById("accessory-status")
};

function italicText(element, value) {
  element.replaceChildren();
  const italic = document.createElement("i");
  italic.textContent = value;
  element.appendChild(italic);
}

const scientificNamePattern = /\b(?:Caenorhabditis(?:\s+(?:inopinata|elegans|briggsae|nigoni|tropicalis|wallacei))?|C\.\s+(?:inopinata|elegans|briggsae|nigoni|tropicalis|wallacei))\b/g;

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
      button.style.setProperty("--tab-color", item.wormDeep);
      button.setAttribute("aria-pressed", String(item.id === selectedId));
      button.setAttribute("aria-label", t("meetSpeciesAria", {
        name: item.name,
        nickname: item.nickname
      }));

      const worm = document.createElement("span");
      worm.className = "mini-worm";
      worm.setAttribute("aria-hidden", "true");
      const name = document.createElement("i");
      name.textContent = item.short;
      const mode = document.createElement("small");
      mode.className = item.reproduction;
      mode.textContent = item.reproduction === "selfing"
        ? t("reproductionMostlySelfing")
        : t("reproductionOutcrossing");
      button.append(worm, name, mode);
      if (item.id === "elegans") {
        const featured = document.createElement("span");
        featured.className = "featured-place";
        featured.textContent = t("opensBristolN2");
        button.appendChild(featured);
      }
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
    charm: els.localCharm
  }, item.id, placeName);
  if (!accessoryDesign) throw new Error(`Missing accessory design for ${item.id}::${placeName}`);
  wireAccessoryPieces();
  els.speciesRegion.textContent = placeName || item.region;
  italicText(els.speciesName, item.name);
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
  els.sceneName.textContent = environment?.title || placeName;

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
    els.environmentNote.textContent = environment.note;
    els.environmentSource.href = environment.source.url;
    els.environmentSource.textContent = environment.source.label;
    els.environmentSource.setAttribute("aria-label", `${environment.source.label} (opens in a new tab)`);
  } else {
    els.locationScene.replaceChildren();
    els.environmentNote.textContent = "This record is waiting for a checked regional landscape profile.";
    els.environmentSource.removeAttribute("href");
    els.environmentSource.removeAttribute("aria-label");
    els.environmentSource.textContent = "Landscape source unavailable";
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

function selectSpecies(id, place) {
  const item = byId.get(id);
  if (!item) return;
  const activePlace = typeof place === "object" ? place : item.locations[0];
  selectedId = id;
  selectedRecordName = activePlace?.name || null;
  visited.add(id);
  els.exploredCount.textContent = String(visited.size);
  renderSpecies(item, activePlace);
  updateSelectedControls();
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

function accessoryPosition(id, wormPart) {
  return activeAccessoryPositions().get(accessoryPositionKey(id, wormPart)) || { x: 0, y: 0 };
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
  });
}

function visibleAccessoryPieces(id, wormPart) {
  return accessoryPieces(id, wormPart).filter(piece => {
    const bounds = piece.getBoundingClientRect();
    return bounds.width > 0 && bounds.height > 0;
  });
}

function accessoryPieceBounds(id, wormPart) {
  const bounds = visibleAccessoryPieces(id, wormPart).map(piece => piece.getBoundingClientRect());
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

function accessoryPoint(event, piece) {
  const matrix = piece.parentElement?.getScreenCTM();
  if (!matrix) return doodlePoint(event);
  const point = els.wormAvatar.createSVGPoint();
  point.x = event.clientX;
  point.y = event.clientY;
  return point.matrixTransform(matrix.inverse());
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
  let position = desiredPosition;
  const positionKey = accessoryPositionKey(id, wormPart);
  activeAccessoryPositions().set(positionKey, position);
  applyAccessoryPosition(id, wormPart, position);

  const avatarBounds = els.wormAvatar.getBoundingClientRect();
  const margin = 6;
  if (avatarBounds.width && avatarBounds.height) {
    for (let attempt = 0; attempt < 8; attempt += 1) {
      const accessoryBounds = accessoryPieceBounds(id, wormPart);
      if (!accessoryBounds?.width || !accessoryBounds.height) break;

      let screenX = 0;
      let screenY = 0;
      if (accessoryBounds.left < avatarBounds.left + margin) screenX = avatarBounds.left + margin - accessoryBounds.left;
      else if (accessoryBounds.right > avatarBounds.right - margin) screenX = avatarBounds.right - margin - accessoryBounds.right;
      if (accessoryBounds.top < avatarBounds.top + margin) screenY = avatarBounds.top + margin - accessoryBounds.top;
      else if (accessoryBounds.bottom > avatarBounds.bottom - margin) screenY = avatarBounds.bottom - margin - accessoryBounds.bottom;

      if (Math.abs(screenX) < .5 && Math.abs(screenY) < .5) break;
      const correction = screenDeltaToAccessorySpace(referencePiece, screenX, screenY);
      position = { x: position.x + correction.x, y: position.y + correction.y };
      activeAccessoryPositions().set(positionKey, position);
      applyAccessoryPosition(id, wormPart, position);
    }
  }
  return position;
}

function accessoryWormName(wormPart) {
  const item = byId.get(selectedId);
  const index = wormPart === "companion" ? 1 : 0;
  return item?.cast[index] || (wormPart === "companion" ? "male" : "worm");
}

function accessoryName(id, wormPart) {
  const accessory = document.querySelector(`[data-accessory="${id}"] .button-label`)?.textContent || "Accessory";
  if (!wormPart) return accessory;
  return t("accessoryForWorm", { accessory, worm: accessoryWormName(wormPart) });
}

function announceAccessory(message) {
  els.accessoryStatus.textContent = "";
  requestAnimationFrame(() => { els.accessoryStatus.textContent = message; });
}

function resetAccessoryPosition(id, wormPart) {
  const position = { x: 0, y: 0 };
  activeAccessoryPositions().set(accessoryPositionKey(id, wormPart), position);
  applyAccessoryPosition(id, wormPart, position);
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
  const bounds = els.wormAvatar.getBoundingClientRect();
  return {
    x: ((event.clientX - bounds.left) / bounds.width) * 420,
    y: ((event.clientY - bounds.top) / bounds.height) * 320
  };
}

function pathFromPoints(points) {
  if (points.length < 2) return `M ${points[0].x} ${points[0].y}`;
  return points.reduce((path, point, index) => `${path}${index ? " L" : "M"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`, "");
}

els.freestyle.addEventListener("click", () => {
  drawingEnabled = !drawingEnabled;
  els.freestyle.setAttribute("aria-pressed", String(drawingEnabled));
  els.drawTools.toggleAttribute("hidden", !drawingEnabled);
  els.wormAvatar.classList.toggle("is-drawing", drawingEnabled);
  refreshAccessoryPieceControls();
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

els.wormAvatar.addEventListener("pointerdown", event => {
  if (!drawingEnabled || event.button !== 0) return;
  event.preventDefault();
  els.wormAvatar.setPointerCapture(event.pointerId);
  const point = doodlePoint(event);
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("class", "doodle-stroke");
  path.setAttribute("stroke", drawingColor);
  path.setAttribute("d", pathFromPoints([point]));
  els.doodleLayer.appendChild(path);
  activeDoodle = { path, points: [point], color: drawingColor };
});

els.wormAvatar.addEventListener("pointermove", event => {
  if (!activeDoodle) return;
  event.preventDefault();
  const point = doodlePoint(event);
  const previous = activeDoodle.points.at(-1);
  if (Math.hypot(point.x - previous.x, point.y - previous.y) < 1.8) return;
  activeDoodle.points.push(point);
  activeDoodle.path.setAttribute("d", pathFromPoints(activeDoodle.points));
});

function finishDoodle(event) {
  if (!activeDoodle) return;
  if (els.wormAvatar.hasPointerCapture(event.pointerId)) els.wormAvatar.releasePointerCapture(event.pointerId);
  const d = activeDoodle.path.getAttribute("d");
  if (activeDoodle.points.length > 1) activeDrawing().push({ d, color: activeDoodle.color });
  else activeDoodle.path.remove();
  activeDoodle = null;
}

els.wormAvatar.addEventListener("pointerup", finishDoodle);
els.wormAvatar.addEventListener("pointercancel", finishDoodle);

function toggleAccessory(id, force) {
  const activeAccessories = activeWardrobe();
  const shouldShow = typeof force === "boolean" ? force : !activeAccessories.has(id);
  const accessory = document.getElementById(id);
  const button = document.querySelector(`[data-accessory="${id}"]`);
  if (!accessory || !button) return;
  accessoryWormParts.forEach(wormPart => applyAccessoryPosition(id, wormPart));
  accessory.toggleAttribute("hidden", !shouldShow);
  button.setAttribute("aria-pressed", String(shouldShow));
  if (shouldShow) activeAccessories.add(id);
  else activeAccessories.delete(id);
  refreshAccessoryPieceControls();
}

function syncAccessories() {
  const activeAccessories = activeWardrobe();
  accessoryIds.forEach(id => {
    const accessory = document.getElementById(id);
    const button = document.querySelector(`[data-accessory="${id}"]`);
    const shouldShow = activeAccessories.has(id);
    accessoryWormParts.forEach(wormPart => applyAccessoryPosition(id, wormPart));
    accessory?.toggleAttribute("hidden", !shouldShow);
    button?.setAttribute("aria-pressed", String(shouldShow));
  });
  refreshAccessoryPieceControls();
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
      piece.setAttribute("aria-describedby", "accessory-move-hint");
      piece.setAttribute("aria-keyshortcuts", "ArrowUp ArrowDown ArrowLeft ArrowRight Home");
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
  const width = Math.max(bounds.width, 44 / scaleX);
  const height = Math.max(bounds.height, 44 / scaleY);
  const hitTarget = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  hitTarget.setAttribute("class", "accessory-hit-target");
  hitTarget.setAttribute("x", String(bounds.x - (width - bounds.width) / 2));
  hitTarget.setAttribute("y", String(bounds.y - (height - bounds.height) / 2));
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
  setTimeout(() => els.habitat.classList.remove("is-changing"), 720);
}

document.querySelectorAll("[data-accessory]").forEach(button => {
  button.addEventListener("click", () => toggleAccessory(button.dataset.accessory));
});

function finishAccessoryDrag(event) {
  if (!activeAccessoryDrag || activeAccessoryDrag.pointerId !== event.pointerId) return;
  const { id, wormPart, piece, moved } = activeAccessoryDrag;
  if (piece.hasPointerCapture(event.pointerId)) piece.releasePointerCapture(event.pointerId);
  piece.classList.remove("is-dragging");
  if (moved) announceAccessory(t("accessoryMoved", { accessory: accessoryName(id, wormPart) }));
  activeAccessoryDrag = null;
}

function wireAccessoryPieces() {
  document.querySelectorAll(".accessory-piece[data-worm-part]").forEach(piece => {
    if (wiredAccessoryPieces.has(piece)) return;
    const accessory = piece.closest(".accessory");
    const id = accessory?.id;
    const wormPart = piece.dataset.wormPart;
    if (!accessory || !id || !accessoryWormParts.includes(wormPart)) return;
    wiredAccessoryPieces.add(piece);

    piece.addEventListener("pointerdown", event => {
      if (activeAccessoryDrag || drawingEnabled || event.button !== 0 || !activeWardrobe().has(id)) return;
      event.preventDefault();
      event.stopPropagation();
      piece.focus({ preventScroll: true });
      piece.setPointerCapture(event.pointerId);
      piece.classList.add("is-dragging");
      activeAccessoryDrag = {
        id,
        wormPart,
        piece,
        pointerId: event.pointerId,
        startPoint: accessoryPoint(event, piece),
        startPosition: accessoryPosition(id, wormPart),
        moved: false
      };
    });

    piece.addEventListener("pointermove", event => {
      if (!activeAccessoryDrag || activeAccessoryDrag.pointerId !== event.pointerId || activeAccessoryDrag.piece !== piece) return;
      event.preventDefault();
      event.stopPropagation();
      const point = accessoryPoint(event, piece);
      const deltaX = point.x - activeAccessoryDrag.startPoint.x;
      const deltaY = point.y - activeAccessoryDrag.startPoint.y;
      if (Math.hypot(deltaX, deltaY) > 1) activeAccessoryDrag.moved = true;
      moveAccessory(id, wormPart, {
        x: activeAccessoryDrag.startPosition.x + deltaX,
        y: activeAccessoryDrag.startPosition.y + deltaY
      }, piece);
    });

    piece.addEventListener("keydown", event => {
      if (piece.getAttribute("tabindex") !== "0" || drawingEnabled || !activeWardrobe().has(id)) return;
      if (event.key === "Home") {
        event.preventDefault();
        resetAccessoryPosition(id, wormPart);
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
        y: current.y + direction[1] * step
      }, piece);
      announceAccessory(t("accessoryPosition", {
        accessory: accessoryName(id, wormPart),
        x: Math.round(position.x),
        y: Math.round(position.y)
      }));
    });
  });
}

window.addEventListener("pointerup", finishAccessoryDrag, true);
window.addEventListener("pointercancel", finishAccessoryDrag, true);

function createMarker(record) {
  const item = byId.get(record.speciesId);
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
}

function showMarkerTooltip(record, item, button) {
  els.mapTooltipPlace.textContent = record.name;
  els.mapTooltipSpecies.textContent = item.short;
  els.mapTooltipDetail.textContent = `${record.strain ? `${record.strain} · ` : ""}${item.reproductionLabel}${record.source ? ` · ${record.source}` : ""}`;
  const markerX = Number.parseFloat(button.style.left);
  const markerY = Number.parseFloat(button.style.top);
  const tooltipX = Math.max(118, Math.min(els.mapWrap.clientWidth - 118, markerX));
  els.mapTooltip.style.left = `${tooltipX}px`;
  els.mapTooltip.style.top = `${markerY}px`;
  els.mapTooltip.classList.toggle("below", markerY < 92);
  els.mapTooltip.hidden = false;
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
  const placed = [];
  const offsets = [[0, 0]];
  [30, 44, 58, 72, 86].forEach(radius => {
    for (let step = 0; step < 8; step += 1) {
      const angle = (Math.PI * 2 * step) / 8;
      offsets.push([Math.round(Math.cos(angle) * radius), Math.round(Math.sin(angle) * radius)]);
    }
  });
  projectedLocations.forEach(record => {
    const point = projection(record.coordinates);
    const baseX = offsetX + point[0] * scale;
    const baseY = offsetY + point[1] * scale;
    let chosen = offsets[0];
    for (const candidate of offsets) {
      const x = baseX + candidate[0];
      const y = baseY + candidate[1];
      const collides = placed.some(mark => Math.abs(mark.x - x) < 28 && Math.abs(mark.y - y) < 28);
      if (!collides) {
        chosen = candidate;
        break;
      }
    }
    const x = Math.max(15, Math.min(box.width - 15, baseX + chosen[0]));
    const y = Math.max(15, Math.min(box.height - 15, baseY + chosen[1]));
    placed.push({ x, y });
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
visited.add(selectedId);
els.exploredCount.textContent = String(visited.size);
renderSpecies(initialSpecies, initialPlace);
updateSelectedControls();

try {
  drawMap();
  const resizeObserver = new ResizeObserver(positionMarkers);
  resizeObserver.observe(document.getElementById("world-map"));
} catch (error) {
  console.error(error);
  els.mapLoading.textContent = t("mapUnavailable");
}
