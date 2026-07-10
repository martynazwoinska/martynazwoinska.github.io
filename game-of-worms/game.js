import { geoGraticule10, geoNaturalEarth1, geoPath } from "https://cdn.jsdelivr.net/npm/d3-geo@3/+esm";
import { feature } from "https://cdn.jsdelivr.net/npm/topojson-client@3/+esm";
import world from "https://esm.sh/@d3-maps/atlas@1.0.0/world/countries/countries-110m";

const regionalPacks = {
  okinawa: { sceneName: "Ishigaki fig grove", looks: ["Fig-leaf explorer hat", "Yaeyama minsā field sash", "Fig-wasp flight rig"], icons: ["🍃", "🧵", "🪽"], note: "Ishigaki’s Yaeyama minsā textile inspires the sash; fig leaves and the fig-wasp vector complete the field kit." },
  kauai: { sceneName: "Kauaʻi cloud forest", looks: ["Mokihana lei crown", "Lauhala sample satchel", "Fern trail glider"], icons: ["🌿", "🧺", "🪶"], note: "Kauaʻi’s mokihana lei material and Hawaiʻi’s lauhala weaving inspire a crown and a practical sample bag." },
  field: { sceneName: "Rot-fruit field site", looks: ["Mushroom-forager cap", "Rot-fruit field satchel", "Specimen-vial backpack"], icons: ["🍄", "🎒", "🧪"], note: "Mushroom compost, rotting fruit, and specimen vials turn real collection substrates into a tiny field-research kit." },
  rainforest: { sceneName: "Tropical fruit forest", looks: ["Drip-leaf rain hat", "Canopy climbing harness", "Tropical fruit sample belt"], icons: ["🌿", "🧗", "🍌"], note: "Broad rain-shedding leaves, a climbing harness, and fruit-sampling gear fit humid tropical collection sites." },
  woodland: { sceneName: "Temperate leaf litter", looks: ["Acorn trail cap", "Leaf-litter field satchel", "Beetle-wing explorer pack"], icons: ["🌰", "🎒", "🪲"], note: "Acorns, leaf litter, and beetles echo the temperate decomposing-plant and invertebrate communities where worms are found." },
  ocean: { sceneName: "Tropical island garden", looks: ["Palm-leaf sun visor", "Woven island sample bag", "Island flower lei"], icons: ["🌴", "🧺", "🌸"], note: "Palm shade, a woven collecting bag, and island flowers evoke tropical island records without suggesting the worms live in seawater." }
};

const locationKits = {
  "Ishigaki, Japan": ["Ishigaki fig grove", "Fig-leaf explorer hat", "Yaeyama minsā field sash", "Fig-wasp flight rig", "🍃", "🧵", "🪽", "🌿"],
  "Ahmedabad, India · AF16": ["Ahmedabad banyan garden", "Banyan-shade field cap", "Gujarat soil satchel", "AF16 archive pack", "🌳", "🎒", "🧬", "🌳"],
  "Taipei, Taiwan · BRC20390": ["Taipei mountain compost", "Elephant Mountain leaf cap", "Taipei compost climbing harness", "BRC20390 vial pack", "🍃", "🧗", "🧪", "⛰️"],
  "Kerala, India · JU1337": ["Kerala coconut grove", "Coconut-leaf sun visor", "Kerala coconut-grove harness", "JU1337 fruit sampler", "🌴", "🧗", "🧪", "🥥"],
  "Kauaʻi, Hawaiʻi · QG130": ["Kauaʻi cloud forest", "Mokihana lei crown", "Lauhala sample satchel", "Fern trail glider", "🌿", "🧺", "🪶", "🌿"],
  "Réunion Island · JU1375": ["Réunion volcanic garden", "Volcanic-island sun cap", "Snail-safe field satchel", "JU1375 trail pack", "🌋", "🐌", "🧪", "🌋"],
  "Orsay, France · JU2518": ["Orsay apple orchard", "Apple-orchard field cap", "Orsay apple basket", "JU2518 sample pack", "🍎", "🧺", "🧪", "🍎"],
  "São Paulo region, Brazil · EG5612": ["Brazilian jackfruit garden", "Jackfruit-leaf rain hat", "Jackfruit-grove climbing harness", "EG5612 field pack", "🌿", "🧗", "🔬", "🍈"],
  "New South Wales, Australia · QG2814": ["New South Wales rainforest", "Rainforest-flower field hat", "NSW canopy harness", "QG2814 sampler", "🌺", "🧗", "🧪", "🌺"],
  "Bristol N2, England": ["Bristol mushroom compost, 1951", "Mushroom-compost cap", "Bristol 1951 sample bag", "N2 freezer archive", "🍄", "🧺", "❄️", "🍄"],
  "Santeuil, France": ["Santeuil orchard floor", "French orchard cap", "Santeuil fruit satchel", "Orchard sample vials", "🍏", "🎒", "🧪", "🍏"],
  "Scotland, Great Britain": ["Scottish wet leaf litter", "Heather rain cap", "Scottish leaf-litter satchel", "Beetle-wing field pack", "🌧️", "🎒", "🪲", "🌿"],
  "Tenerife, Spain": ["Tenerife volcanic garden", "Canary-pine sun visor", "Tenerife fruit basket", "Volcanic trail pack", "🌲", "🧺", "🌋", "🌋"],
  "Kauaʻi, Hawaiʻi": ["Kauaʻi cloud forest", "Mokihana lei crown", "Lauhala sample satchel", "Fern trail glider", "🌿", "🧺", "🪶", "🌿"],
  "elegans::Kauaʻi, Hawaiʻi": ["Kauaʻi C. elegans fruit site", "Mokihana field crown", "Lauhala elegans satchel", "Rare-male fern glider", "🌿", "🧺", "🪶", "🍈"],
  "tropicalis::Kauaʻi, Hawaiʻi": ["Kauaʻi C. tropicalis garden", "Mokihana sampler crown", "Kauaʻi tropical fruit bag", "Tropicalis fern glider", "🌿", "🧺", "🪶", "🌺"],
  "Australian Capital Territory": ["Canberra eucalyptus compost", "Eucalyptus field hat", "Canberra compost satchel", "Gum-leaf sample pack", "🌿", "🎒", "🧪", "🦘"],
  "Auckland, New Zealand": ["Auckland fern garden", "Silver-fern trail cap", "Wet-leaf field satchel", "Fern trail glider", "🌿", "🎒", "🪶", "🌿"],
  "Araucanía, Chile": ["Araucanía forest floor", "Araucaria-cone cap", "Araucanía litter satchel", "Chilean beetle-wing pack", "🌲", "🎒", "🪲", "🌲"],
  "Trivandrum, Kerala · JU1325": ["Trivandrum botanical garden", "Botanical-flower rain hat", "Botanical-garden climbing harness", "JU1325 garden kit", "🌺", "🧗", "🧪", "🌺"],
  "Singapore · ZF1220": ["Singapore starfruit garden", "Starfruit field cap", "Starfruit-grove climbing harness", "ZF1220 vial pack", "⭐", "🧗", "🧪", "⭐"],
  "Praslin, Seychelles · YR106": ["Praslin island forest", "Coco-de-mer sun visor", "Seychelles fruit bag", "YR106 island kit", "🌴", "🧺", "🧪", "🥥"],
  "São Tomé · JU2484": ["São Tomé guava grove", "Guava-leaf rain hat", "Guava-grove climbing harness", "JU2484 sample pack", "🍃", "🧗", "🧪", "🍈"],
  "Mahahual, Mexico · JU2617": ["Mahahual citrus heap", "Orange-peel field cap", "Yucatán citrus harness", "JU2617 fruit vials", "🍊", "🧗", "🧪", "🍊"],
  "Mauritius · JU2909": ["Mauritius fruit forest", "Mauritius fruit-forager cap", "Island canopy harness", "JU2909 trail kit", "🌿", "🧗", "🧪", "🏝️"],
  "Ho Chi Minh City · JU4356": ["Ho Chi Minh carambola park", "Carambola field cap", "City-park climbing harness", "JU4356 sample pack", "⭐", "🧗", "🧪", "⭐"],
  "Lombok, Indonesia · HPT26": ["Lombok fig forest", "Lombok fig-leaf cap", "Fig-forest climbing harness", "HPT26 fig pack", "🍃", "🧗", "🧪", "🌳"],
  "Sanda, Bali · JU1873": ["Bali cacao grove", "Cacao-leaf rain hat", "Cacao-grove climbing harness", "JU1873 cacao-pod belt", "🍃", "🧗", "🍫", "🍫"],
  "Barro Colorado Island, Panama": ["Barro Colorado canopy", "Canopy-leaf rain hat", "BCI canopy harness", "Island research pack", "🌿", "🧗", "🔬", "🌴"],
  "La Selva, Costa Rica": ["La Selva rainforest station", "Heliconia rain hat", "La Selva canopy harness", "Fruit-sampling trail belt", "🌺", "🧗", "🍌", "🌺"],
  "Guadeloupe": ["Guadeloupe flower garden", "Clusia flower crown", "Guadeloupe flower basket", "Island sample pack", "🌸", "🧺", "🧪", "🌸"],
  "Nouragues, French Guiana": ["Nouragues rainforest", "Nouragues drip-leaf hat", "Nouragues canopy harness", "Forest-stem sample belt", "🌿", "🧗", "🧪", "🌧️"],
  "Manaus region, Brazil": ["Manaus forest floor", "Amazon rain-leaf cap", "Manaus canopy harness", "Rainforest sample pack", "🌿", "🧗", "🧪", "🌳"],
  "Oʻahu, Hawaiʻi": ["Oʻahu island garden", "ʻIlima lei crown", "Lauhala sample bag", "Island fern glider", "🌼", "🧺", "🪶", "🌼"],
  "New Taipei City, Taiwan": ["New Taipei mountain garden", "Mountain-leaf field cap", "Taipei mountain harness", "Taiwan flower sampler", "🍃", "🧗", "🌸", "⛰️"],
  "Pohnpei, Micronesia": ["Pohnpei rain garden", "Breadfruit-leaf visor", "Pohnpei fruit bag", "Island rain kit", "🍃", "🧺", "🌧️", "🌴"],
  "Queensland, Australia": ["Queensland rainforest", "Fan-palm rain hat", "Queensland canopy harness", "Rainforest flower sampler", "🌴", "🧗", "🧪", "🌺"],
  "Réunion Island": ["Réunion volcanic garden", "Volcanic-island sun visor", "Réunion fruit basket", "Island flower kit", "🌋", "🧺", "🌸", "🌋"]
};

function locationKit(placeName, fallback, speciesId) {
  const kit = locationKits[`${speciesId}::${placeName}`] || locationKits[placeName];
  if (!kit) return fallback;
  const [sceneName, ...parts] = kit;
  const looks = parts.slice(0, 3);
  const icons = parts.slice(3, 6);
  const motif = parts[6];
  return {
    sceneName,
    looks,
    icons,
    motif,
    note: `${sceneName} gets its own field kit: ${looks.join(", ")}.`
  };
}

const speciesGear = {
  inopinata: { looks: ["fig-leaf visor", "Yaeyama minsā sash", "fig-wasp wings"], icons: ["🍃", "🧵", "🪽"] },
  elegans: { looks: ["lab goggles", "sample utility belt", "cryo-vial jetpack"], icons: ["🥽", "🧰", "❄️"] },
  briggsae: { looks: ["heart sunglasses", "sun-cream stripes", "butterfly wings"], icons: ["😎", "🧴", "🦋"] },
  nigoni: { looks: ["fruit-slice crown", "market-tote belt", "dragonfly wings"], icons: ["🍊", "🧺", "🪽"] },
  tropicalis: { looks: ["star sunglasses", "tropical bikini", "SPF 50 sun-cream pack"], icons: ["⭐", "👙", "🧴"] },
  wallacei: { looks: ["cacao-pod helmet", "cacao climbing harness", "leaf-glider wings"], icons: ["🍫", "🧗", "🪽"] }
};

function funLocationKit(baseKit, item, placeName) {
  const gear = speciesGear[item.id];
  const placeTag = (placeName || item.region).split(" ·")[0].split(",")[0];
  const looks = gear.looks.map(look => `${placeTag} ${look}`);
  return {
    ...baseKit,
    looks,
    icons: gear.icons,
    note: `${baseKit.sceneName}: ${looks.join(", ")}. Every observation keeps its own outfit and drawings.`
  };
}

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
    sceneName: "Ishigaki fig grove",
    localLooks: ["Fig-leaf explorer hat", "Yaeyama minsā field sash", "Fig-wasp flight rig"],
    localIcons: ["🍃", "🧵", "🪽"],
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
    sceneName: "Tropical fruit forest",
    localLooks: ["Drip-leaf rain hat", "Canopy climbing harness", "Tropical fruit sample belt"],
    localIcons: ["🌿", "🧗", "🍌"],
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
      { name: "São Paulo region, Brazil · EG5612", coordinates: [-44.19, -23.18], source: "CaeNDR", style: "rainforest" },
      { name: "New South Wales, Australia · QG2814", coordinates: [153.0090333, -30.6445167], source: "CaeNDR", style: "rainforest" }
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
    sceneName: "Rot-fruit field site",
    localLooks: ["Mushroom-forager cap", "Rot-fruit field satchel", "Specimen-vial backpack"],
    localIcons: ["🍄", "🎒", "🧪"],
    habitat: "Rotting plants & compost",
    habitatKey: "compost",
    intro: "The famous laboratory worm is also a wild explorer of short-lived, bacteria-rich places such as rotting fruit and compost.",
    fact: "Most wild individuals are self-fertile hermaphrodites. Rare males make occasional outcrossing possible.",
    worm: "#f0c78e",
    wormDeep: "#bd7c45",
    habitatOne: "#d7b96d",
    habitatTwo: "#8ba56f",
    locations: [
      { name: "Bristol N2, England", coordinates: [-2.59, 51.45], source: "CaeNDR", style: "field", strain: "N2", history: "N2 was collected from mushroom compost near Bristol in 1951. After years in culture, it reached Sydney Brenner in 1964 and was frozen in 1969—becoming the canonical laboratory reference strain." },
      { name: "Santeuil, France", coordinates: [1.951, 49.121], source: "CaeNDR", style: "field" },
      { name: "Scotland, Great Britain", coordinates: [-3.19, 55.92], source: "CaeNDR", style: "woodland" },
      { name: "Tenerife, Spain", coordinates: [-16.535, 28.411], source: "CaeNDR", style: "ocean" },
      { name: "Kauaʻi, Hawaiʻi", coordinates: [-159.663, 22.147], source: "CaeNDR", style: "kauai" },
      { name: "Australian Capital Territory", coordinates: [149.115, -35.254], source: "CaeNDR", style: "field" },
      { name: "Auckland, New Zealand", coordinates: [174.746, -36.893], source: "CaeNDR", style: "woodland" },
      { name: "Araucanía, Chile", coordinates: [-72.151, -38.938], source: "CaeNDR", style: "woodland" }
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
    sceneName: "Tropical fruit forest",
    localLooks: ["Drip-leaf rain hat", "Canopy climbing harness", "Tropical fruit sample belt"],
    localIcons: ["🌿", "🧗", "🍌"],
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
    sceneName: "Bali cacao grove",
    localLooks: ["Drip-leaf rain hat", "Canopy climbing harness", "Tropical fruit sample belt"],
    localIcons: ["🌿", "🧗", "🍫"],
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
    nickname: "The warm-weather selfer",
    region: "Pantropical records",
    reproduction: "selfing",
    reproductionLabel: "⚥ hermaphrodite + ♂ rare male",
    cast: ["hermaphrodite", "rare male"],
    scale: .72,
    pose: "coast",
    localStyle: "ocean",
    sceneName: "Tropical island garden",
    localLooks: ["Palm-leaf sun visor", "Woven island sample bag", "Island flower lei"],
    localIcons: ["🌴", "🧺", "🌸"],
    habitat: "Tropical fruit & flowers",
    habitatKey: "flowers",
    intro: "A tropical species in which self-fertile hermaphrodites can start a new population even when they arrive alone.",
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
  { members: ["elegans", "inopinata"], label: "sister species" },
  { members: ["briggsae", "nigoni"], label: "sister species" },
  { members: ["tropicalis", "wallacei"], label: "sister species" }
];

const byId = new Map(species.map(item => [item.id, item]));
const visited = new Set();
const accessoryIds = ["local-headwear", "local-wrap", "local-charm"];
const wardrobes = new Map();
const drawings = new Map();
let selectedId = "inopinata";
let selectedRecordName = null;
let drawingEnabled = false;
let drawingColor = "#f36f62";
let activeDoodle = null;
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
  wormAvatar: document.getElementById("worm-avatar"),
  doodleLayer: document.getElementById("doodle-layer"),
  placeMotif: document.getElementById("place-motif"),
  headwearSymbol: document.getElementById("headwear-symbol"),
  headwearSymbolMale: document.getElementById("headwear-symbol-male"),
  wrapSymbol: document.getElementById("wrap-symbol"),
  wrapSymbolMale: document.getElementById("wrap-symbol-male"),
  charmSymbol: document.getElementById("charm-symbol"),
  charmSymbolMale: document.getElementById("charm-symbol-male"),
  localHeadwearIcon: document.querySelector('[data-accessory="local-headwear"] .button-icon'),
  localHeadwearLabel: document.querySelector('[data-accessory="local-headwear"] .button-label'),
  localWrapIcon: document.querySelector('[data-accessory="local-wrap"] .button-icon'),
  localWrapLabel: document.querySelector('[data-accessory="local-wrap"] .button-label'),
  localCharmIcon: document.querySelector('[data-accessory="local-charm"] .button-icon'),
  localCharmLabel: document.querySelector('[data-accessory="local-charm"] .button-label'),
  wardrobeNote: document.getElementById("wardrobe-note"),
  speciesRegion: document.getElementById("species-region"),
  speciesNumber: document.getElementById("species-number"),
  speciesName: document.getElementById("species-name"),
  speciesNickname: document.getElementById("species-nickname"),
  speciesIntro: document.getElementById("species-intro"),
  speciesReproduction: document.getElementById("species-reproduction"),
  speciesHabitat: document.getElementById("species-habitat"),
  speciesFact: document.getElementById("species-fact"),
  exploredCount: document.getElementById("explored-count"),
  surprise: document.getElementById("surprise-me"),
  freestyle: document.getElementById("freestyle-draw"),
  drawTools: document.getElementById("draw-tools"),
  clearDrawing: document.getElementById("clear-drawing")
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
    pairGroup.setAttribute("aria-label", `Sister species: ${pairNames}`);

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
      button.setAttribute("aria-label", `Meet ${item.name}, ${item.nickname}`);

      const worm = document.createElement("span");
      worm.className = "mini-worm";
      worm.setAttribute("aria-hidden", "true");
      const name = document.createElement("i");
      name.textContent = item.short;
      const mode = document.createElement("small");
      mode.className = item.reproduction;
      mode.textContent = item.reproduction === "selfing" ? "mostly selfing" : "outcrossing";
      button.append(worm, name, mode);
      if (item.id === "elegans") {
        const featured = document.createElement("span");
        featured.className = "featured-place";
        featured.textContent = "opens Bristol N2";
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
  const regionalPack = funLocationKit(locationKit(placeName, regionalPacks[styleKey], item.id), item, placeName);
  els.speciesRegion.textContent = placeName || item.region;
  els.speciesNumber.textContent = "sister pair";
  italicText(els.speciesName, item.name);
  els.speciesNickname.textContent = item.nickname;
  scientificText(els.speciesIntro, item.intro);
  els.speciesReproduction.textContent = item.reproductionLabel;
  els.speciesReproduction.className = `fact-pill ${item.reproduction}`;
  els.speciesHabitat.textContent = item.habitat;
  scientificText(els.speciesFact, typeof place === "object" && place?.history ? place.history : item.fact);
  italicText(els.wormNameTag, item.short);
  els.wormAvatar.setAttribute("aria-label", `Illustrated ${item.name} ${item.cast[0]} and ${item.cast[1]}`);
  els.localHeadwearIcon.textContent = regionalPack.icons[0];
  els.localHeadwearLabel.textContent = regionalPack.looks[0];
  els.localWrapIcon.textContent = regionalPack.icons[1];
  els.localWrapLabel.textContent = regionalPack.looks[1];
  els.localCharmIcon.textContent = regionalPack.icons[2];
  els.localCharmLabel.textContent = regionalPack.looks[2];
  els.wardrobeNote.textContent = regionalPack.note;
  els.sceneName.textContent = regionalPack.sceneName;
  const placeSymbols = regionalPack.icons || ["🍃", "🎒", "✨"];
  els.placeMotif.textContent = regionalPack.motif || placeSymbols[0];
  els.headwearSymbol.textContent = placeSymbols[0];
  els.headwearSymbolMale.textContent = placeSymbols[0];
  els.wrapSymbol.textContent = placeSymbols[1];
  els.wrapSymbolMale.textContent = placeSymbols[1];
  els.charmSymbol.textContent = placeSymbols[2];
  els.charmSymbolMale.textContent = placeSymbols[2];

  els.habitat.dataset.habitat = item.habitatKey;
  els.habitat.dataset.localStyle = styleKey;
  els.habitat.dataset.species = item.id;
  els.habitat.dataset.pose = item.pose;
  els.habitat.style.setProperty("--worm-color", item.worm);
  els.habitat.style.setProperty("--worm-deep", item.wormDeep);
  els.habitat.style.setProperty("--habitat-one", item.habitatOne);
  els.habitat.style.setProperty("--habitat-two", item.habitatTwo);
  els.habitat.style.setProperty("--worm-scale", item.scale);
  const placeSeed = [...(placeName || item.id)].reduce((sum, character) => sum + character.codePointAt(0), 0);
  els.habitat.style.setProperty("--place-hue", `${(placeSeed % 19) - 9}deg`);
  syncAccessories();
  renderDoodles();

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
});

document.querySelectorAll("[data-draw-color]").forEach(button => {
  button.addEventListener("click", () => {
    drawingColor = button.dataset.drawColor;
    document.querySelectorAll("[data-draw-color]").forEach(candidate => candidate.classList.toggle("is-selected", candidate === button));
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
  accessory.toggleAttribute("hidden", !shouldShow);
  button.setAttribute("aria-pressed", String(shouldShow));
  if (shouldShow) activeAccessories.add(id);
  else activeAccessories.delete(id);
}

function syncAccessories() {
  const activeAccessories = activeWardrobe();
  accessoryIds.forEach(id => {
    const accessory = document.getElementById(id);
    const button = document.querySelector(`[data-accessory="${id}"]`);
    const shouldShow = activeAccessories.has(id);
    accessory?.toggleAttribute("hidden", !shouldShow);
    button?.setAttribute("aria-pressed", String(shouldShow));
  });
}

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

els.surprise.addEventListener("click", () => {
  accessoryIds.forEach(id => toggleAccessory(id, false));
  const shuffled = accessoryIds.slice().sort(() => Math.random() - .5);
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
  button.addEventListener("mouseenter", () => showMarkerTooltip(record, item, button));
  button.addEventListener("mouseleave", hideMarkerTooltip);
  button.addEventListener("focus", () => showMarkerTooltip(record, item, button));
  button.addEventListener("blur", hideMarkerTooltip);
  button.addEventListener("click", () => {
    hideMarkerTooltip();
    selectSpecies(item.id, record);
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

const atlas = document.getElementById("atlas");
const discoverySection = document.querySelector(".discovery");
const mapSection = document.querySelector(".map-section");
atlas.insertBefore(discoverySection, mapSection);

renderTabs();
els.recordCount.textContent = String(species.reduce((count, item) => count + item.locations.length, 0));
const initialSpecies = byId.get(selectedId);
const initialPlace = initialSpecies.locations[0];
selectedRecordName = initialPlace.name;
renderSpecies(initialSpecies, initialPlace);
updateSelectedControls();

try {
  drawMap();
  const resizeObserver = new ResizeObserver(positionMarkers);
  resizeObserver.observe(document.getElementById("world-map"));
} catch (error) {
  console.error(error);
  els.mapLoading.textContent = "The map is taking a nap. Pick a worm below.";
}
