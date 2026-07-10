import { geoGraticule10, geoNaturalEarth1, geoPath } from "https://cdn.jsdelivr.net/npm/d3-geo@3/+esm";
import { feature } from "https://cdn.jsdelivr.net/npm/topojson-client@3/+esm";
import world from "https://esm.sh/@d3-maps/atlas@1.0.0/world/countries/countries-110m";

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
    localStyle: "okinawa",
    sceneName: "Okinawa fig garden",
    localLooks: ["Fig-leaf hat", "Okinawa fig scarf", "Fig-wasp wings"],
    localIcons: ["🍃", "🧣", "🪽"],
    habitat: "Fresh figs",
    habitatKey: "fig",
    intro: "A surprisingly large close relative of C. elegans that lives in fresh figs and travels with fig wasps.",
    fact: "It was discovered on Ishigaki Island and was so unexpected that its name means “surprising.”",
    worm: "#f2b0a8",
    wormDeep: "#c85d68",
    habitatOne: "#f8c98b",
    habitatTwo: "#e98f7a",
    locations: [
      { name: "Ishigaki, Japan", coordinates: [124.16, 24.34] }
    ]
  },
  {
    id: "kamaaina",
    short: "C. kamaaina",
    name: "Caenorhabditis kamaaina",
    nickname: "The Kauaʻi local",
    region: "Kauaʻi, Hawaiʻi",
    reproduction: "outcrossing",
    reproductionLabel: "♀ female + ♂ male",
    cast: ["female", "male"],
    scale: .74,
    localStyle: "kauai",
    sceneName: "Kauaʻi island forest",
    localLooks: ["Kauaʻi flower wreath", "Island rain cape", "Fern sash"],
    localIcons: ["🌺", "🌧️", "🌿"],
    habitat: "Island wild sites",
    habitatKey: "island",
    intro: "A Hawaiian species known from Kauaʻi, where it has been found at only a small number of wild sites.",
    fact: "This species reproduces through separate males and females and is known from only a small number of Hawaiian collections.",
    worm: "#8bc9a7",
    wormDeep: "#387d68",
    habitatOne: "#8ed0ad",
    habitatTwo: "#59a6a0",
    locations: [
      { name: "Kauaʻi, Hawaiʻi", coordinates: [-159.50, 22.08] }
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
    localStyle: "field",
    sceneName: "Garden compost",
    localLooks: ["Field explorer cap", "Compost satchel", "Sample-jar pack"],
    localIcons: ["🧢", "🎒", "🧪"],
    habitat: "Rotting plants & compost",
    habitatKey: "compost",
    intro: "The famous laboratory worm is also a wild explorer of short-lived, bacteria-rich places such as rotting fruit and compost.",
    fact: "Most wild individuals are self-fertile hermaphrodites. Rare males make occasional outcrossing possible.",
    worm: "#f0c78e",
    wormDeep: "#bd7c45",
    habitatOne: "#d7b96d",
    habitatTwo: "#8ba56f",
    locations: [
      { name: "Santeuil, France", coordinates: [1.951, 49.121], source: "CaeNDR" },
      { name: "Scotland, Great Britain", coordinates: [-3.19, 55.92], source: "CaeNDR" },
      { name: "Tenerife, Spain", coordinates: [-16.535, 28.411], source: "CaeNDR" },
      { name: "Kauaʻi, Hawaiʻi", coordinates: [-159.663, 22.147], source: "CaeNDR" },
      { name: "Australian Capital Territory", coordinates: [149.115, -35.254], source: "CaeNDR" },
      { name: "Auckland, New Zealand", coordinates: [174.746, -36.893], source: "CaeNDR" },
      { name: "Araucanía, Chile", coordinates: [-72.151, -38.938], source: "CaeNDR" }
    ]
  },
  {
    id: "brenneri",
    short: "C. brenneri",
    name: "Caenorhabditis brenneri",
    nickname: "The tropical mixer",
    region: "Tropical regions",
    reproduction: "outcrossing",
    reproductionLabel: "♀ female + ♂ male",
    cast: ["female", "male"],
    scale: .78,
    localStyle: "rainforest",
    sceneName: "Tropical rainforest",
    localLooks: ["Rainforest leaf crown", "Monsoon cape", "Fruit necklace"],
    localIcons: ["🌿", "🌧️", "🍊"],
    habitat: "Tropical rotting fruit",
    habitatKey: "tropical",
    intro: "A warm-climate species found across tropical regions, usually in the busy microbial world of decaying plant material.",
    fact: "Its populations contain extraordinary genetic diversity—far more than predominantly selfing Caenorhabditis species.",
    worm: "#f5a66f",
    wormDeep: "#cc5c45",
    habitatOne: "#f5be68",
    habitatTwo: "#de7055",
    locations: [
      { name: "Costa Rica", coordinates: [-84.1, 9.9] },
      { name: "Brazil", coordinates: [-47.9, -15.8] },
      { name: "Southern India", coordinates: [77.3, 10.2] }
    ]
  },
  {
    id: "remanei",
    short: "C. remanei",
    name: "Caenorhabditis remanei",
    nickname: "The temperate mixer",
    region: "Europe & North America",
    reproduction: "outcrossing",
    reproductionLabel: "♀ female + ♂ male",
    cast: ["female", "male"],
    scale: .76,
    localStyle: "woodland",
    sceneName: "Temperate woodland",
    localLooks: ["Acorn beret", "Woodland scarf", "Oak-leaf badge"],
    localIcons: ["🌰", "🧣", "🍂"],
    habitat: "Temperate woodlands",
    habitatKey: "woodland",
    intro: "A temperate-zone species often collected from decaying plant material and invertebrate-rich woodland habitats.",
    fact: "Unlike C. elegans, every new generation normally needs mating between a female and a male.",
    worm: "#a9a0df",
    wormDeep: "#5f55a5",
    habitatOne: "#a9c796",
    habitatTwo: "#8d79bd",
    locations: [
      { name: "Germany", coordinates: [10.4, 51.1] },
      { name: "Ohio, USA", coordinates: [-82.8, 40.3] },
      { name: "Ontario, Canada", coordinates: [-79.4, 44.4] }
    ]
  },
  {
    id: "tropicalis",
    short: "C. tropicalis",
    name: "Caenorhabditis tropicalis",
    nickname: "The warm-weather selfer",
    region: "Pantropical records",
    reproduction: "selfing",
    reproductionLabel: "⚥ hermaphrodite + ♂ rare male",
    cast: ["hermaphrodite", "rare male"],
    scale: .72,
    localStyle: "ocean",
    sceneName: "Pantropical coast",
    localLooks: ["Palm-leaf sun hat", "Ocean wrap", "Tropical flower necklace"],
    localIcons: ["🌴", "🌊", "🌸"],
    habitat: "Tropical fruit & flowers",
    habitatKey: "flowers",
    intro: "A tropical species in which self-fertile hermaphrodites can start a new population even when they arrive alone.",
    fact: "Its populations are strongly connected to geography, with especially rich diversity reported from Hawaiʻi and Taiwan.",
    worm: "#7dc9c2",
    wormDeep: "#287c82",
    habitatOne: "#7ad6c0",
    habitatTwo: "#f08a85",
    locations: [
      { name: "Barro Colorado Island, Panama", coordinates: [-79.840, 9.160], source: "CaeNDR" },
      { name: "La Selva, Costa Rica", coordinates: [-84.009, 10.426], source: "CaeNDR" },
      { name: "Guadeloupe", coordinates: [-61.643, 16.044], source: "CaeNDR" },
      { name: "Nouragues, French Guiana", coordinates: [-52.683, 4.090], source: "CaeNDR" },
      { name: "Manaus region, Brazil", coordinates: [-59.840, -2.960], source: "CaeNDR" },
      { name: "Oʻahu, Hawaiʻi", coordinates: [-157.765, 21.356], source: "CaeNDR" },
      { name: "Kauaʻi, Hawaiʻi", coordinates: [-159.478, 22.194], source: "CaeNDR" },
      { name: "New Taipei City, Taiwan", coordinates: [121.773, 25.053], source: "CaeNDR" },
      { name: "Pohnpei, Micronesia", coordinates: [158.182, 6.907], source: "CaeNDR" },
      { name: "Queensland, Australia", coordinates: [145.446, -16.103], source: "CaeNDR" },
      { name: "Réunion Island", coordinates: [55.688, -21.047], source: "CaeNDR" }
    ]
  }
];

const byId = new Map(species.map(item => [item.id, item]));
const visited = new Set(["inopinata"]);
const activeAccessories = new Set();
let selectedId = "inopinata";
let selectedRecordName = null;
let projection;
let projectedLocations = [];

const els = {
  mapWrap: document.querySelector(".map-wrap"),
  mapMarkers: document.getElementById("map-markers"),
  mapLoading: document.getElementById("map-loading"),
  recordCount: document.getElementById("record-count"),
  countries: document.getElementById("map-countries"),
  sphere: document.getElementById("map-sphere"),
  graticule: document.getElementById("map-graticule"),
  selectionPlace: document.getElementById("map-selection-place"),
  selectionSpecies: document.getElementById("map-selection-species"),
  tabs: document.getElementById("species-tabs"),
  habitat: document.getElementById("habitat"),
  sceneName: document.getElementById("scene-name"),
  wormNameTag: document.getElementById("worm-name-tag"),
  wormTitle: document.getElementById("worm-avatar-title"),
  wormDesc: document.getElementById("worm-avatar-desc"),
  localHeadwearIcon: document.querySelector('[data-accessory="local-headwear"] .button-icon'),
  localHeadwearLabel: document.querySelector('[data-accessory="local-headwear"] .button-label'),
  localWrapIcon: document.querySelector('[data-accessory="local-wrap"] .button-icon'),
  localWrapLabel: document.querySelector('[data-accessory="local-wrap"] .button-label'),
  localCharmIcon: document.querySelector('[data-accessory="local-charm"] .button-icon'),
  localCharmLabel: document.querySelector('[data-accessory="local-charm"] .button-label'),
  speciesRegion: document.getElementById("species-region"),
  speciesNumber: document.getElementById("species-number"),
  speciesName: document.getElementById("species-name"),
  speciesNickname: document.getElementById("species-nickname"),
  speciesIntro: document.getElementById("species-intro"),
  speciesReproduction: document.getElementById("species-reproduction"),
  speciesHabitat: document.getElementById("species-habitat"),
  speciesFact: document.getElementById("species-fact"),
  exploredCount: document.getElementById("explored-count"),
  surprise: document.getElementById("surprise-me")
};

function italicText(element, value) {
  element.replaceChildren();
  const italic = document.createElement("i");
  italic.textContent = value;
  element.appendChild(italic);
}

const scientificNamePattern = /\b(?:Caenorhabditis(?:\s+(?:inopinata|kamaaina|elegans|brenneri|remanei|tropicalis))?|C\.\s+(?:inopinata|kamaaina|elegans|brenneri|remanei|tropicalis))\b/g;

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
  species.forEach((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "species-tab";
    button.dataset.species = item.id;
    button.style.setProperty("--tab-color", item.wormDeep);
    button.setAttribute("aria-pressed", String(item.id === selectedId));
    button.setAttribute("aria-label", `Meet ${item.name}, ${item.nickname}`);

    const worm = document.createElement("span");
    worm.className = "mini-worm";
    worm.setAttribute("aria-hidden", "true");
    const name = document.createElement("i");
    name.textContent = item.short;
    const number = document.createElement("small");
    number.textContent = String(index + 1).padStart(2, "0");
    button.append(worm, name, number);
    button.addEventListener("click", () => selectSpecies(item.id));
    els.tabs.appendChild(button);
  });
}

function renderSpecies(item, place) {
  const index = species.findIndex(candidate => candidate.id === item.id);
  const placeName = typeof place === "string" ? place : place?.name;
  const placeSource = typeof place === "object" ? place?.source : null;
  els.speciesRegion.textContent = placeName || item.region;
  els.speciesNumber.textContent = `${String(index + 1).padStart(2, "0")} / ${String(species.length).padStart(2, "0")}`;
  italicText(els.speciesName, item.name);
  els.speciesNickname.textContent = item.nickname;
  scientificText(els.speciesIntro, item.intro);
  els.speciesReproduction.textContent = item.reproductionLabel;
  els.speciesReproduction.className = `fact-pill ${item.reproduction}`;
  els.speciesHabitat.textContent = item.habitat;
  scientificText(els.speciesFact, item.fact);
  italicText(els.wormNameTag, item.short);
  els.wormTitle.textContent = `A dressed-up ${item.name} pair`;
  els.wormDesc.textContent = `A friendly illustrated ${item.cast[0]} and ${item.cast[1]}. Use the dress-up buttons to add or remove accessories.`;
  els.localHeadwearIcon.textContent = item.localIcons[0];
  els.localHeadwearLabel.textContent = item.localLooks[0];
  els.localWrapIcon.textContent = item.localIcons[1];
  els.localWrapLabel.textContent = item.localLooks[1];
  els.localCharmIcon.textContent = item.localIcons[2];
  els.localCharmLabel.textContent = item.localLooks[2];
  els.sceneName.textContent = item.sceneName;

  els.habitat.dataset.habitat = item.habitatKey;
  els.habitat.dataset.localStyle = item.localStyle;
  els.habitat.style.setProperty("--worm-color", item.worm);
  els.habitat.style.setProperty("--worm-deep", item.wormDeep);
  els.habitat.style.setProperty("--habitat-one", item.habitatOne);
  els.habitat.style.setProperty("--habitat-two", item.habitatTwo);
  els.habitat.style.setProperty("--worm-scale", item.scale);

  els.selectionPlace.textContent = placeSource ? `${placeName} · ${placeSource}` : (placeName || item.region);
  els.selectionSpecies.replaceChildren();
  const italic = document.createElement("i");
  italic.textContent = item.short;
  els.selectionSpecies.append(italic, document.createTextNode(` — ${item.nickname.replace(/^The /, "the ")}`));
}

function updateSelectedControls() {
  document.querySelectorAll(".species-tab").forEach(button => {
    const selected = button.dataset.species === selectedId;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  document.querySelectorAll(".map-marker").forEach(button => {
    const sameSpecies = button.dataset.species === selectedId;
    button.classList.toggle("is-species-selected", sameSpecies);
    button.classList.toggle("is-selected", sameSpecies && button.dataset.place === selectedRecordName);
  });
}

function selectSpecies(id, place) {
  const item = byId.get(id);
  if (!item) return;
  selectedId = id;
  selectedRecordName = typeof place === "object" ? place.name : null;
  visited.add(id);
  els.exploredCount.textContent = String(visited.size);
  renderSpecies(item, place);
  updateSelectedControls();
}

function toggleAccessory(id, force) {
  const shouldShow = typeof force === "boolean" ? force : !activeAccessories.has(id);
  const accessory = document.getElementById(id);
  const button = document.querySelector(`[data-accessory="${id}"]`);
  if (!accessory || !button) return;
  accessory.toggleAttribute("hidden", !shouldShow);
  button.setAttribute("aria-pressed", String(shouldShow));
  if (shouldShow) activeAccessories.add(id);
  else activeAccessories.delete(id);
}

document.querySelectorAll("[data-accessory]").forEach(button => {
  button.addEventListener("click", () => toggleAccessory(button.dataset.accessory));
});

els.surprise.addEventListener("click", () => {
  const options = ["local-headwear", "local-wrap", "local-charm"];
  options.forEach(id => toggleAccessory(id, false));
  const shuffled = options.slice().sort(() => Math.random() - .5);
  const count = 1 + Math.floor(Math.random() * 3);
  shuffled.slice(0, count).forEach(id => toggleAccessory(id, true));
});

function createMarker(record) {
  const item = byId.get(record.speciesId);
  const button = document.createElement("button");
  button.type = "button";
  button.className = `map-marker ${item.reproduction}`;
  button.dataset.species = item.id;
  button.dataset.place = record.name;
  button.setAttribute("aria-label", `Meet ${item.name} from ${record.name}${record.source ? `, record from ${record.source}` : ""}`);
  button.addEventListener("click", () => selectSpecies(item.id, record));
  els.mapMarkers.appendChild(button);
  record.button = button;
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
  if (!topology || !topology.objects || !topology.objects.features) throw new Error("World geometry unavailable");

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
els.recordCount.textContent = String(species.reduce((count, item) => count + item.locations.length, 0));
renderSpecies(byId.get(selectedId));
updateSelectedControls();

try {
  drawMap();
  const resizeObserver = new ResizeObserver(positionMarkers);
  resizeObserver.observe(document.getElementById("world-map"));
} catch (error) {
  console.error(error);
  els.mapLoading.textContent = "The map is taking a nap. Pick a worm below.";
}
