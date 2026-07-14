const SVG_NS = "http://www.w3.org/2000/svg";

const palettes = {
  subtropical: ["#cce9e5", "#77a98b", "#3f7d61", "#315e4e", "#65bfc6", "#f1c76c", "#294c48"],
  dryCity: ["#f1d5ae", "#c48a61", "#9a674c", "#79503f", "#78aeb2", "#efad5e", "#603e38"],
  wetCity: ["#c9e0dc", "#7ca390", "#4e8068", "#355f52", "#6cb2b9", "#efc86c", "#304f4b"],
  farm: ["#d8e8d8", "#9fbc83", "#6f965f", "#58764d", "#74b5b1", "#e8bd59", "#4f563f"],
  island: ["#c7e8e8", "#75aa85", "#4d805e", "#3b674e", "#54b6c4", "#f1cc72", "#31575a"],
  temperate: ["#dce4db", "#a6b38d", "#7d8e68", "#626d55", "#7fa9a4", "#dfb960", "#525846"],
  volcanic: ["#d4dde0", "#8b9687", "#5d6f60", "#4b554c", "#659fa8", "#e7ad58", "#414548"],
  rainforest: ["#beddd3", "#6f9f79", "#397456", "#2d5d49", "#61aaa4", "#edbf5c", "#26483d"],
  coral: ["#c9ebea", "#87b58e", "#5f9270", "#426c59", "#43b5c4", "#f3cf78", "#315d65"],
  canyon: ["#d9e3dc", "#bf8658", "#985d43", "#704d3e", "#6ba8b2", "#e7bf5a", "#4b4f42"],
  blackwater: ["#c2ddd5", "#6b9872", "#3e7055", "#315a47", "#4c7770", "#e8bd5d", "#263e3b"]
};

function profile(id, title, note, sourceLabel, sourceUrl, palette, ridge, options = {}) {
  return Object.freeze({
    id,
    title,
    note,
    source: Object.freeze({ label: sourceLabel, url: sourceUrl }),
    palette,
    ridge,
    near: options.near || null,
    water: options.water || "none",
    weather: options.weather || "sun",
    cues: Object.freeze(options.cues || [])
  });
}

const canonicalProfiles = {
  "Ishigaki, Japan": profile(
    "ishigaki-reef-estuary", "Ishigaki reef and mangroves",
    "Ishigaki links subtropical evergreen forest and mangrove estuaries directly to coral-reef seas.",
    "Japan Ministry of the Environment", "https://www.env.go.jp/en/nature/nps/park/iriomote/index.html",
    palettes.subtropical, [[0, 284], [72, 247], [145, 263], [220, 229], [305, 274], [390, 238], [472, 267], [540, 245], [600, 280]],
    { water: "coast", weather: "sun", cues: [["fig", 72, 170, 1], ["mangrove", 500, 270, .9], ["coral", 535, 362, .8]] }
  ),
  "Ahmedabad, India · AF16": profile(
    "ahmedabad-pol-sabarmati", "Sabarmati and shaded pol lanes",
    "Ahmedabad is a hot, seasonally dry Sabarmati city whose compact traditional streets and courtyards create shade; AF16 was collected from soil.",
    "CaeNDR AF16 record", "https://caendr.org/isotype/AF16/",
    palettes.dryCity, [[0, 300], [88, 288], [160, 302], [250, 286], [340, 300], [430, 282], [520, 296], [600, 286]],
    { water: "river", weather: "sun", cues: [["pol", 465, 218, .9], ["chabutro", 110, 230, .8], ["drytree", 210, 262, .8]] }
  ),
  "Taipei, Taiwan · BRC20390": profile(
    "taipei-xiangshan", "Xiangshan forest beside Taipei",
    "This 174-metre forest record lies on Taipei’s Xiangshan foothills, where humid subtropical woodland rises immediately beside the city.",
    "CaeNDR BRC20390 record", "https://caendr.org/isotype/BRC20390/",
    palettes.wetCity, [[0, 314], [75, 240], [132, 274], [210, 176], [285, 258], [360, 204], [430, 272], [514, 222], [600, 303]],
    { weather: "mist", cues: [["tower", 505, 217, .8], ["boulder", 105, 316, .9], ["fern", 60, 300, .75]] }
  ),
  "Kerala, India · JU1337": profile(
    "kerala-lowland-farm", "Kerala’s cultivated humid lowland",
    "JU1337 came from rotting fruit in low-elevation agricultural land near Neyyattinkara, so this is a cultivated humid lowland rather than generic rainforest.",
    "CaeNDR JU1337 record", "https://caendr.org/isotype/JU1337/",
    palettes.farm, [[0, 278], [90, 263], [180, 275], [268, 252], [365, 276], [460, 258], [535, 270], [600, 260]],
    { water: "irrigation", weather: "rain", cues: [["coconut", 75, 214, .9], ["paddy", 430, 340, 1], ["fruit", 160, 356, .8]] }
  ),
  "Kauaʻi, Hawaiʻi · QG130": profile(
    "kauai-north-shore", "Kauaʻi north-shore coastal valley",
    "QG130 was sampled from rotting fruit in forest at only 11 metres elevation, fitting a north-shore coastal valley rather than an upland cloud forest.",
    "CaeNDR QG130 record", "https://caendr.org/isotype/QG130/",
    palettes.island, [[0, 304], [60, 238], [104, 262], [160, 172], [215, 250], [275, 192], [340, 274], [410, 214], [482, 278], [550, 234], [600, 292]],
    { water: "coast", weather: "mist", cues: [["taro", 105, 337, .9], ["waterfall", 276, 195, .8], ["pandanus", 500, 287, .8]] }
  ),
  "Réunion Island · JU1375": profile(
    "reunion-saint-benoit-farm", "Saint-Benoît cane below wet ridges",
    "JU1375 was found on a mollusk in low agricultural land near Saint-Benoît, where cane fields rise toward Réunion’s wet volcanic interior.",
    "CaeNDR JU1375 record", "https://caendr.org/isotype/JU1375/",
    palettes.farm, [[0, 300], [75, 268], [140, 214], [208, 252], [285, 180], [356, 242], [442, 204], [520, 260], [600, 224]],
    { weather: "cloud", cues: [["cane", 105, 325, .9], ["basalt", 475, 346, .8], ["pandanus", 535, 274, .7]] }
  ),
  "Orsay, France · JU2518": profile(
    "orsay-yvette-garden", "Yvette valley garden mosaic",
    "JU2518 came from rotting fruit in a rural garden within the Yvette valley’s river, pond, woodland, and garden mosaic.",
    "CaeNDR JU2518 record", "https://caendr.org/isotype/JU2518/",
    palettes.temperate, [[0, 292], [100, 250], [198, 280], [295, 242], [390, 274], [495, 246], [600, 285]],
    { water: "pond", weather: "cloud", cues: [["deciduous", 75, 263, .9], ["reeds", 450, 353, .9], ["fruit", 160, 360, .75]] }
  ),
  "Angra dos Reis, Rio de Janeiro · EG5612": profile(
    "angra-serra-cove", "Atlantic forest meeting Angra’s coves",
    "EG5612 came from rotting fruit in forest at three metres elevation, where Atlantic rainforest meets Angra dos Reis’ island-studded coast.",
    "CaeNDR EG5612 record", "https://caendr.org/isotype/EG5612/",
    palettes.rainforest, [[0, 320], [65, 244], [125, 176], [190, 238], [255, 148], [330, 225], [405, 178], [485, 250], [545, 214], [600, 286]],
    { water: "cove", weather: "mist", cues: [["islet", 470, 313, .9], ["mangrove", 535, 300, .75], ["fruit", 90, 365, .7]] }
  ),
  "Nambucca Heads, New South Wales · QG2814": profile(
    "nambucca-estuary-garden", "Nambucca estuary garden",
    "QG2814 was collected from a rotting flower in a low urban garden at Nambucca Heads, an estuarine coastal town rather than inland rainforest.",
    "CaeNDR QG2814 record", "https://caendr.org/isotype/QG2814/",
    palettes.subtropical, [[0, 292], [100, 268], [190, 282], [280, 250], [375, 276], [470, 244], [535, 266], [600, 252]],
    { water: "estuary", weather: "sun", cues: [["eucalyptus", 80, 245, .9], ["banksia", 510, 297, .8], ["flower", 155, 363, .75]] }
  ),
  "Bristol N2, England": profile(
    "bristol-garden-gorge", "Bristol garden and Avon Gorge",
    "N2’s recorded habitat was compost in a Bristol urban garden; the wooded Avon Gorge locates the city without replacing that real microhabitat.",
    "CaeNDR N2 record", "https://caendr.org/isotype/N2/",
    palettes.temperate, [[0, 300], [88, 274], [155, 288], [230, 206], [280, 196], [330, 270], [410, 284], [500, 254], [600, 282]],
    { water: "river", weather: "cloud", cues: [["compost", 85, 354, .95], ["city", 475, 274, .75], ["cliff", 285, 255, .8]] }
  ),
  "Santeuil, France": profile(
    "santeuil-viosne-vexin", "Santeuil stream bank and Vexin plateau",
    "Representative JU1925 microhabitat at 49.121, 1.951: forest in Santeuil’s narrow valley, where the isolate came from rotting common-hogweed (Heracleum sphondylium) stem S73.",
    "Official CaeNDR strain-data CSV", "https://caendr.org/request-strains/download/c_elegans/latest/strain-data/csv",
    palettes.temperate, [[0, 248], [145, 245], [245, 262], [325, 304], [405, 275], [495, 246], [600, 244]],
    { water: "stream", weather: "sun", cues: [["forest", 108, 258, .9], ["stream", 314, 338, .7], ["village", 474, 188, .72]] }
  ),
  "Edinburgh, Scotland": profile(
    "edinburgh-midmar-blackford", "Midmar allotment and Blackford Hill",
    "Representative ED3010 microhabitat at 55.92, −3.19: an urban-garden compost bin in Midmar Allotment, field 1, plot 39; Blackford Hill and the Royal Observatory locate the wider setting.",
    "CGC Edinburgh strain entries", "https://cgc.umn.edu/species/caenorhabditis%20elegans?f=1&offset=4550",
    palettes.temperate, [[0, 278], [80, 268], [145, 232], [205, 155], [255, 143], [360, 175], [470, 218], [600, 248]],
    { weather: "cloud", cues: [["compost", 76, 376, .92], ["grass", 510, 354, .72], ["boulder", 208, 255, .62]] }
  ),
  "Tenerife, Spain": profile(
    "tenerife-puerto-cruz-botanic", "Puerto de la Cruz botanical garden",
    "This marker combines 23 records from the Puerto de la Cruz botanical garden; NIC1787 is the representative. Its exact recorded substrate was an old, very rotten avocado, while the paths, pond and Ficus roots show wider garden context.",
    "CaeNDR NIC1787 isotype record", "https://caendr.org/isotype/NIC1787/",
    palettes.subtropical, [[0, 238], [76, 228], [151, 221], [227, 207], [301, 213], [375, 197], [448, 204], [524, 190], [600, 202]],
    { weather: "sun", cues: [] }
  ),
  "Kauaʻi, Hawaiʻi": profile(
    "kauai-waimea-canyon", "Waimea Canyon and Kōkeʻe rim",
    "Western Kauaʻi layers red and ochre canyon walls beneath a wet, deeply cut high rim, clearly different from QG130’s north-shore lowland.",
    "Hawaiʻi DLNR Waimea Canyon", "https://dlnr.hawaii.gov/dsp/parks/kauai/waimea-canyon-state-park/",
    palettes.canyon, [[0, 286], [70, 238], [125, 252], [188, 180], [248, 224], [315, 146], [385, 238], [452, 182], [520, 250], [600, 214]],
    { weather: "mist", cues: [["canyon", 110, 325, .9], ["waterfall", 317, 180, .8], ["fern", 520, 318, .75]] }
  ),
  "tropicalis::Kauaʻi, Hawaiʻi": profile(
    "kauai-hanalei-valley", "Hanalei valley wetlands",
    "This C. tropicalis marker lies near Hanalei, where waterfall-draped north-shore mountains frame river wetlands and long-established kalo agriculture.",
    "USFWS Hanalei National Wildlife Refuge", "https://www.fws.gov/refuge/hanalei",
    palettes.island, [[0, 296], [64, 254], [118, 266], [176, 198], [236, 246], [306, 166], [372, 238], [438, 190], [506, 256], [552, 228], [600, 282]],
    { water: "river", weather: "rain", cues: [["taro", 92, 342, .82], ["waterfall", 308, 192, .74], ["paddy", 476, 346, .78]] }
  ),
  "Australian Capital Territory": profile(
    "canberra-black-mountain", "Black Mountain bushland by the lake",
    "Central Canberra is a bush capital, with dry native eucalypt forest surviving on Black Mountain beside Lake Burley Griffin and the city.",
    "ACT Parks and Conservation", "https://www.parks.act.gov.au/find-a-nature-park/canberra-nature-park/black-mountain-nature-reserve",
    palettes.farm, [[0, 300], [95, 282], [185, 270], [285, 218], [365, 272], [470, 286], [600, 275]],
    { water: "lake", weather: "sun", cues: [["eucalyptus", 95, 260, .9], ["tower", 310, 225, .55], ["grass", 515, 350, .9]] }
  ),
  "Auckland, New Zealand": profile(
    "auckland-volcanic-harbour", "Auckland maunga and harbour",
    "Auckland’s volcanic field is marked by grass-covered scoria cones and culturally important maunga beside a wide island-dotted harbour.",
    "Auckland Council Maungawhau", "https://www.aucklandcouncil.govt.nz/en/parks-recreation/get-outdoors/aklpaths/path-detail/393.html",
    palettes.subtropical, [[0, 292], [110, 270], [210, 286], [300, 176], [390, 285], [500, 268], [600, 278]],
    { water: "harbour", weather: "sun", cues: [["crater", 300, 220, .85], ["pohutukawa", 90, 285, .8], ["islet", 500, 320, .65]] }
  ),
  "Araucanía, Chile": profile(
    "araucania-volcano-lake", "Araucaria forest beneath a volcano",
    "Araucanía is a volcano–lake–ancient-araucaria mosaic whose landscape and ecology are inseparable from Mapuche territory and knowledge.",
    "UNESCO Kütralkura Geopark", "https://www.unesco.org/en/iggp/kutralkura-unesco-global-geopark",
    palettes.volcanic, [[0, 305], [90, 276], [170, 258], [258, 112], [338, 256], [420, 232], [510, 270], [600, 248]],
    { water: "lake", weather: "cloud", cues: [["araucaria", 80, 280, .9], ["araucaria", 515, 300, .7], ["snow", 258, 130, .8]] }
  ),
  "Trivandrum, Kerala · JU1325": profile(
    "trivandrum-backwater", "Backwaters between sea and Ghats",
    "Thiruvananthapuram stretches from the Arabian Sea and backwaters to the Western Ghats; nearby estuaries are lined with coconut and mangrove.",
    "Kerala Tourism", "https://www.keralatourism.org/districts/thiruvananthapuram/",
    palettes.island, [[0, 284], [90, 248], [170, 220], [252, 188], [340, 238], [430, 210], [520, 252], [600, 232]],
    { water: "backwater", weather: "rain", cues: [["coconut", 75, 250, .9], ["mangrove", 500, 300, .8], ["sandbar", 310, 352, .8]] }
  ),
  "Singapore · ZF1220": profile(
    "singapore-mangrove-city", "Mangrove edge of an equatorial city",
    "A dense equatorial city still contains rainforest, freshwater habitats, mangroves, mudflats, and reefs.",
    "Singapore NParks", "https://www.nparks.gov.sg/nature/ecosystems/terrestrial-freshwater",
    palettes.wetCity, [[0, 302], [100, 278], [210, 286], [300, 260], [400, 282], [500, 270], [600, 292]],
    { water: "mudflat", weather: "rain", cues: [["city", 455, 245, .8], ["mangrove", 95, 286, .95], ["boardwalk", 310, 347, .8]] }
  ),
  "Praslin, Seychelles · YR106": profile(
    "praslin-vallee-de-mai", "Coco-de-mer forest and granite shore",
    "Granitic Praslin protects the Vallée de Mai’s ancient palm forest, where all six endemic Seychelles palms grow together.",
    "UNESCO Vallée de Mai", "https://whc.unesco.org/en/list/261",
    palettes.island, [[0, 292], [86, 266], [170, 276], [250, 238], [335, 270], [430, 230], [520, 268], [600, 250]],
    { water: "coast", weather: "sun", cues: [["cocodemer", 95, 250, .95], ["boulder", 500, 324, 1], ["palm", 420, 274, .7]] }
  ),
  "São Tomé · JU2484": profile(
    "sao-tome-volcanic-cacao", "São Tomé volcanic cacao landscape",
    "São Tomé combines volcanic peaks, Congo Basin rainforest, coast, and long-established cacao and coffee landscapes.",
    "UNESCO Ilha de São Tomé Biosphere Reserve", "https://www.unesco.org/en/mab/ilha-de-sao-tome",
    palettes.rainforest, [[0, 315], [75, 270], [140, 226], [205, 88], [260, 232], [330, 174], [405, 258], [482, 216], [545, 270], [600, 242]],
    { water: "coast", weather: "mist", cues: [["waterfall", 208, 140, .8], ["cacao", 85, 292, .9], ["islet", 505, 320, .7]] }
  ),
  "Mahahual, Mexico · JU2617": profile(
    "mahahual-reef-lagoon", "Mahahual’s shallow reef lagoon",
    "Mahahual faces a shallow lagoon in the Mesoamerican Reef System, with sandy floor, seagrass, reef crest, and mangrove shore.",
    "Mexico protected-area management summary", "https://sidofqa.segob.gob.mx/notas/docFuente/5545533",
    palettes.coral, [[0, 278], [100, 270], [205, 280], [310, 268], [410, 276], [505, 264], [600, 274]],
    { water: "lagoon", weather: "sun", cues: [["reef", 330, 345, 1], ["mangrove", 70, 292, .7], ["seagrass", 500, 370, .9]] }
  ),
  "Mauritius · JU2909": profile(
    "mauritius-le-morne", "Le Morne above a coral lagoon",
    "Volcanic Mauritius is nearly encircled by reefs and lagoons; Le Morne’s wooded cliffs also carry the history of maroon resistance.",
    "UNESCO Le Morne Cultural Landscape", "https://whc.unesco.org/en/list/1259/",
    palettes.island, [[0, 295], [105, 274], [190, 286], [270, 152], [340, 150], [382, 250], [475, 270], [600, 280]],
    { water: "lagoon", weather: "sun", cues: [["cane", 90, 325, .8], ["reef", 490, 356, .85], ["sandbar", 340, 340, .7]] }
  ),
  "Ho Chi Minh City · JU4356": profile(
    "hcmc-can-gio", "Can Gio tidal mangrove",
    "Can Gio’s brackish wetland was built by Saigon and Dong Nai river sediments and forms a mangrove green belt within Ho Chi Minh City.",
    "UNESCO Can Gio Mangrove", "https://www.unesco.org/en/mab/can-gio-mangrove",
    palettes.wetCity, [[0, 292], [110, 278], [210, 286], [315, 270], [420, 284], [520, 274], [600, 288]],
    { water: "tidal", weather: "rain", cues: [["mangrove", 82, 280, 1], ["saltpan", 445, 340, .8], ["city", 515, 248, .55]] }
  ),
  "Lombok, Indonesia · HPT26": profile(
    "lombok-rinjani", "Rinjani caldera and Segara Anak",
    "Lombok rises to the Rinjani volcanic complex, with a vast crater lake, a young cone, and vegetation changing strongly with elevation.",
    "UNESCO Rinjani-Lombok Global Geopark", "https://www.unesco.org/en/iggp/rinjani-lombok-unesco-global-geopark",
    palettes.volcanic, [[0, 306], [85, 266], [150, 210], [215, 162], [285, 210], [352, 118], [420, 206], [500, 264], [600, 294]],
    { water: "craterlake", weather: "cloud", cues: [["cone", 345, 244, .65], ["grass", 80, 350, .8], ["forest", 520, 298, .7]] }
  ),
  "Sanda, Bali · JU1873": profile(
    "sanda-cacao-highland", "Sanda cacao highland agroforest",
    "JU1873 came from rotten cacao near Sanda, in Pupuan’s cultivated highlands of coffee, cacao, fruit trees, and layered ridges.",
    "Caenorhabditis Genetics Center JU1873", "https://cgc.umn.edu/strain/JU1873",
    palettes.rainforest, [[0, 302], [80, 258], [155, 220], [235, 252], [315, 186], [400, 236], [485, 194], [545, 250], [600, 230]],
    { weather: "rain", cues: [["cacao", 85, 280, 1], ["cacao", 500, 292, .8], ["terrace", 335, 324, .8]] }
  ),
  "Barro Colorado Island, Panama": profile(
    "barro-gatun", "Barro Colorado in Gatún Lake",
    "Barro Colorado became an island when the Chagres River was dammed for the Panama Canal and is now a long-studied tropical forest.",
    "Smithsonian Tropical Research Institute", "https://stri.si.edu/facility/barro-colorado",
    palettes.rainforest, [[0, 286], [85, 268], [165, 244], [250, 230], [340, 248], [430, 226], [515, 260], [600, 278]],
    { water: "lake", weather: "cloud", cues: [["ship", 500, 315, .7], ["dock", 105, 337, .8], ["forest", 330, 267, .8]] }
  ),
  "La Selva, Costa Rica": profile(
    "la-selva-river-corridor", "La Selva river-to-volcano corridor",
    "La Selva protects wet lowland forest between two rivers and connects upward toward Barva Volcano through a major elevational forest corridor.",
    "Organization for Tropical Studies", "https://tropicalstudies.org/portfolio/la-selva-research-station",
    palettes.rainforest, [[0, 310], [80, 274], [155, 250], [230, 214], [300, 160], [375, 218], [455, 252], [530, 272], [600, 294]],
    { water: "river", weather: "rain", cues: [["bridge", 115, 328, .8], ["station", 490, 290, .7], ["broadleaf", 65, 290, .85]] }
  ),
  "Guadeloupe": profile(
    "guadeloupe-soufriere", "La Soufrière and wet forest",
    "Basse-Terre’s active volcano, heavy rainfall, rivers, and waterfalls support dense montane rainforest, with mangroves on sheltered coasts.",
    "Guadeloupe National Park", "https://www3.guadeloupe-parcnational.fr/fr/des-decouvertes/les-sites/espaces-terrestres-du-parc-national/la-soufriere",
    palettes.rainforest, [[0, 306], [90, 264], [175, 230], [260, 142], [335, 210], [420, 246], [510, 220], [600, 286]],
    { weather: "mist", cues: [["fumarole", 260, 150, .8], ["waterfall", 435, 242, .9], ["fern", 80, 315, .8]] }
  ),
  "Nouragues, French Guiana": profile(
    "nouragues-inselberg", "Nouragues forest and inselberg",
    "The remote Nouragues station joins plateau and high-relief forest around a granite inselberg with riparian forest along the Arataye River.",
    "CNRS Nouragues research station", "https://cnrs-nouragues.fr/en/home-nouragues-research-station/",
    palettes.rainforest, [[0, 290], [100, 274], [180, 260], [250, 176], [320, 150], [390, 210], [465, 260], [540, 272], [600, 282]],
    { water: "river", weather: "rain", cues: [["inselberg", 320, 230, .9], ["canoe", 480, 350, .7], ["station", 90, 300, .65]] }
  ),
  "Manaus region, Brazil": profile(
    "manaus-meeting-waters", "Meeting of the Negro and Solimões",
    "Central Amazonia around Manaus contains white-water floodplains, black-water igapó, lakes, and upland forest shaped by the Negro and Solimões.",
    "UNESCO Central Amazon Biosphere Reserve", "https://www.unesco.org/en/mab/central-amazon",
    palettes.blackwater, [[0, 276], [95, 254], [190, 270], [285, 248], [380, 266], [480, 246], [600, 270]],
    { water: "meeting", weather: "rain", cues: [["igapo", 75, 294, .9], ["canoe", 475, 350, .7], ["forest", 315, 286, .75]] }
  ),
  "Oʻahu, Hawaiʻi": profile(
    "oahu-koolau", "Koʻolau ridges and wet valleys",
    "Oʻahu’s old volcanic ranges create knife-edged wet watersheds descending through rainforest and mesic forest toward much drier lowlands.",
    "Hawaiʻi DLNR Oʻahu reserves", "https://dlnr.hawaii.gov/ecosystems/nars/oahu/",
    palettes.island, [[0, 306], [55, 252], [105, 188], [150, 230], [205, 156], [255, 222], [315, 174], [375, 242], [440, 190], [500, 256], [555, 216], [600, 286]],
    { weather: "mist", cues: [["waterfall", 315, 190, .8], ["city", 505, 280, .55], ["stream", 100, 342, .8]] }
  ),
  "New Taipei City, Taiwan": profile(
    "new-taipei-yehliu", "Yehliu sandstone cape",
    "New Taipei wraps mountains, river networks, and a long coast; at Yehliu, marine erosion and weathering sculpt a narrow sandstone cape.",
    "Taiwan Tourism Administration", "https://eng.taiwan.net.tw/m1.aspx?id=155&sno=0002091",
    palettes.coral, [[0, 286], [90, 240], [180, 214], [270, 238], [355, 204], [445, 244], [530, 218], [600, 270]],
    { water: "coast", weather: "cloud", cues: [["hoodoo", 105, 330, .9], ["hoodoo", 155, 344, .65], ["cape", 450, 330, .8]] }
  ),
  "Pohnpei, Micronesia": profile(
    "pohnpei-basalt-mangrove", "Pohnpei’s volcanic island and tidal ruins",
    "Pohnpei is a high volcanic island ringed by mangroves, lagoon, and barrier reef; Nan Madol’s basalt-and-coral islets sit in this intertidal setting.",
    "UNESCO Nan Madol", "https://whc.unesco.org/en/list/1503/",
    palettes.island, [[0, 300], [75, 250], [145, 220], [220, 134], [295, 198], [365, 168], [440, 236], [520, 212], [600, 282]],
    { water: "lagoon", weather: "rain", cues: [["waterfall", 222, 170, .75], ["mangrove", 80, 300, .75], ["basaltwall", 485, 335, .8]] }
  ),
  "Queensland, Australia": profile(
    "queensland-daintree", "Daintree forest-to-reef coast",
    "Near Cape Tribulation, Wet Tropics rainforest reaches white-sand beaches and offshore coral reefs in a direct forest-to-reef continuum.",
    "UNESCO Wet Tropics of Queensland", "https://whc.unesco.org/en/list/486/",
    palettes.coral, [[0, 302], [70, 252], [135, 200], [205, 154], [275, 214], [345, 172], [420, 226], [500, 204], [600, 270]],
    { water: "coast", weather: "sun", cues: [["fanpalm", 75, 285, .9], ["mangrove", 490, 295, .65], ["reef", 370, 360, .85]] }
  ),
  "Réunion Island": profile(
    "reunion-cirque-volcano", "Réunion’s pitons, cirques, and lava",
    "Réunion’s volcanic massifs, landslides, and heavy rainfall formed towering peaks, huge natural amphitheatres, and forested gorges.",
    "UNESCO Pitons, cirques and remparts", "https://whc.unesco.org/en/list/1317/",
    palettes.volcanic, [[0, 310], [65, 250], [120, 168], [180, 230], [245, 122], [315, 216], [385, 150], [455, 238], [525, 178], [600, 270]],
    { weather: "cloud", cues: [["cirque", 310, 270, .85], ["lava", 85, 350, .9], ["ravine", 490, 302, .8]] }
  )
};

function composition(ground, middle, foreground, route, cueOrder, silhouetteLock) {
  return Object.freeze({
    ground,
    middle,
    foreground: Object.freeze(foreground),
    route,
    cueOrder: Object.freeze(cueOrder),
    silhouetteLock,
    geometrySignature: [ground, middle, route, foreground.map(cue => cue.join(":")), cueOrder.join(":")].join("|")
  });
}

/*
 * These are 37 separate compositions, one for each canonical profile. They
 * retain the source-backed profile text above but lock a distinct viewpoint,
 * foreground frame and spatial path into the illustration. No profile falls
 * back to a regional or species scene.
 */
const sceneCompositions = Object.freeze({
  "ishigaki-reef-estuary": composition(
    "M0 379 Q92 350 181 369 Q292 395 403 365 Q505 344 600 371 V430 H0Z",
    "M0 305 Q90 286 176 299 L230 430 H0Z M450 314 Q526 291 600 303 V430 H515Z",
    [["fig", 22, 319, 1.18], ["coral", 566, 386, .9]],
    "M115 430 Q169 349 237 333 Q343 307 600 318", [0, 2, 1],
    "arched fig canopy, diagonal mangrove roots, and a flat reef horizon"
  ),
  "ahmedabad-pol-sabarmati": composition(
    "M0 344 L154 339 Q245 365 340 346 L600 337 V430 H0Z",
    "M0 276 L112 252 L220 264 L338 247 L468 260 L600 247 V333 H0Z",
    [["drytree", 24, 350, .92], ["pol", 552, 292, .72]],
    "M0 372 Q165 346 305 370 T600 359", [1, 0, 2],
    "a long shaded city mass punctured by one slender chabutro"
  ),
  "taipei-xiangshan": composition(
    "M0 382 Q119 343 236 369 Q348 392 600 342 V430 H0Z",
    "M0 337 L86 279 L154 219 L244 149 L324 218 L405 283 L470 326 V430 H0Z",
    [["boulder", 48, 372, 1.05], ["fern", 174, 360, .82]],
    "M45 430 Q91 351 147 300 Q206 244 266 155", [1, 2, 0],
    "a steep triangular forest slope opposed by a single needle tower"
  ),
  "kerala-lowland-farm": composition(
    "M0 361 H124 L142 338 H286 L305 366 H438 L456 343 H600 V430 H0Z",
    "M0 294 H600 V342 H0Z M0 317 H600 M0 336 H600",
    [["fruit", 80, 384, .85], ["coconut", 566, 300, .82]],
    "M34 430 C82 390 104 332 184 326 S324 377 392 336 S520 302 600 314", [2, 0, 1],
    "level paddy bands crossed by a strong S-shaped irrigation channel"
  ),
  "kauai-north-shore": composition(
    "M0 384 Q94 350 189 378 Q309 402 406 370 Q505 344 600 380 V430 H0Z",
    "M0 322 Q92 266 176 313 Q292 346 390 294 Q509 245 600 319 V430 H0Z",
    [["taro", 53, 380, .88], ["pandanus", 558, 341, .74]],
    "M282 201 Q271 267 291 328 Q310 370 344 430", [1, 0, 2],
    "a low horseshoe valley opening directly to a sea glimpse"
  ),
  "reunion-saint-benoit-farm": composition(
    "M0 375 L105 349 L223 378 L347 341 L474 369 L600 337 V430 H0Z",
    "M0 314 L600 286 V348 L0 376Z",
    [["cane", 30, 377, 1.05], ["basalt", 557, 384, .78]],
    "M12 424 L179 337 M94 430 L258 326 M221 430 L385 315 M365 430 L523 302", [2, 0, 1],
    "diagonal cane rows climbing toward one wet volcanic ridge tooth"
  ),
  "orsay-yvette-garden": composition(
    "M0 366 Q89 328 183 359 Q282 390 381 351 Q482 318 600 355 V430 H0Z",
    "M38 351 Q143 298 252 337 Q374 379 520 331 L600 348 V430 H0Z",
    [["deciduous", 36, 329, 1.02], ["reeds", 534, 392, .86]],
    "M173 382 Q274 337 396 367 Q459 385 528 371", [0, 2, 1],
    "a large round pond beneath an offset deciduous canopy"
  ),
  "angra-serra-cove": composition(
    "M0 393 Q83 351 169 381 Q248 410 338 373 L410 349 V430 H0Z M550 376 Q579 357 600 362 V430H550Z",
    "M0 330 L68 262 L135 296 L201 222 L268 281 L335 242 L407 318 V430 H0Z",
    [["mangrove", 26, 373, .98], ["fruit", 154, 403, .72]],
    "M404 358 Q463 329 514 344 Q559 357 600 337", [0, 2, 1],
    "serrated rainforest mountains stepping down into progressively smaller islets"
  ),
  "nambucca-estuary-garden": composition(
    "M0 350 Q121 333 238 368 Q356 399 475 354 Q542 329 600 340 V430 H0Z",
    "M0 297 Q151 282 284 307 Q418 331 600 292 V354 H0Z",
    [["banksia", 553, 363, .86], ["flower", 83, 395, .72]],
    "M0 378 C121 321 213 322 300 368 S479 411 600 341", [2, 0, 1],
    "a broad flat estuary bend framed by unlike banksia and eucalyptus masses"
  ),
  "bristol-garden-gorge": composition(
    "M0 369 L126 340 L206 363 L273 331 L335 365 L442 339 L600 361 V430 H0Z",
    "M0 300 L188 257 L250 314 L300 430 H0Z M600 292 L419 252 L352 314 L314 430 H600Z",
    [["compost", 74, 393, 1.02], ["city", 524, 342, .58]],
    "M300 430 Q293 362 311 316 Q328 277 348 248", [0, 2, 1],
    "opposing gorge faces forming a central river notch behind a compost heap"
  ),
  "santeuil-viosne-vexin": composition(
    "M0 310Q95 286 189 307Q259 320 295 303Q309 328 327 348Q320 379 300 430H0Z M329 280Q384 303 443 290Q524 271 600 304V430H384Q365 397 357 366Q365 326 329 280Z",
    "M0 146Q83 128 149 163Q212 191 257 235Q278 254 293 278L307 430H0Z M600 168Q543 151 492 181Q429 206 370 244Q341 263 323 286L310 430H600Z",
    [["forest", 72, 370, .72], ["stream", 338, 406, .48]],
    "M314 218C311 246 299 270 309 298C319 326 344 344 341 371C338 395 343 413 342 430", [2, 0, 1],
    "a broken hollow hogweed stem beside a narrow stream-bank notch, crossed by a low railway cue below the church tower and ruler-flat Vexin plateau"
  ),
  "edinburgh-midmar-blackford": composition(
    "M0 327Q103 304 205 322Q312 342 410 315Q507 288 600 310V430H0Z",
    "M0 278L80 268L145 232L205 155Q225 133 255 143Q330 162 405 193Q500 229 600 248V342H0Z",
    [["compost", 78, 397, .94], ["grass", 534, 403, .7]],
    "M18 430L213 257M579 430L389 258M180 430L273 256M438 430L331 256", [2, 1, 0],
    "an angular compost bay and converging allotment plots beneath one lopsided low hill topped by two separated green observatory drums"
  ),
  "tenerife-puerto-cruz-botanic": composition(
    "M0 352Q89 327 181 348Q278 369 375 340Q478 309 600 335V430H0Z",
    "M0 221H600V346H0Z M250 218L203 430H389L333 218Z M0 282L600 307V333L0 306Z",
    [["fruit", 92, 392, 1.04], ["forest", 34, 286, .78]],
    "M292 219L286 430M0 294L600 319", [],
    "a split pear-shaped avocado beneath asymmetric root columns, crossing garden paths around one pond and a tiny distant peak"
  ),
  "kauai-waimea-canyon": composition(
    "M0 322 L93 353 L166 326 L246 378 L318 345 L397 394 L482 352 L600 386 V430 H0Z",
    "M0 278 L83 304 L157 271 L238 329 L311 289 L389 350 L474 303 L600 337 V430 H0Z",
    [["fern", 558, 386, .8], ["canyon", 52, 363, .76]],
    "M90 283 L164 323 L237 289 L318 348 L398 306 L482 365", [2, 1, 0],
    "layered red and ochre chevrons descending into a zigzag gorge"
  ),
  "kauai-hanalei-valley": composition(
    "M0 367 H98 L121 348 H229 L250 375 H374 L397 348 H510 L531 369 H600 V430 H0Z",
    "M0 302 Q87 257 169 303 Q254 346 337 299 Q427 249 514 301 L600 322 V430 H0Z",
    [["taro", 45, 394, .78], ["paddy", 528, 388, .72]],
    "M0 408 Q116 369 230 397 Q344 425 454 377 Q529 345 600 361", [1, 0, 2],
    "a broad wet amphitheatre with kalo plots and several waterfall curtains"
  ),
  "canberra-black-mountain": composition(
    "M0 374 Q103 348 207 370 Q328 397 448 359 Q523 338 600 352 V430 H0Z",
    "M0 320 Q167 309 300 242 Q432 310 600 316 V430 H0Z",
    [["grass", 38, 397, .84], ["eucalyptus", 562, 354, .76]],
    "M40 388 H156 V430 M40 388V430 M98 388V430 M156 388V430", [2, 0, 1],
    "a low Black Mountain dome, fine tower, and horizontal lake at three scales"
  ),
  "auckland-volcanic-harbour": composition(
    "M0 388 Q119 352 233 381 Q344 407 454 371 Q524 348 600 361 V430 H0Z",
    "M0 321 Q113 306 218 327 L300 255 Q380 327 492 306 L600 320 V430 H0Z",
    [["pohutukawa", 27, 369, .9], ["islet", 544, 361, .66]],
    "M250 267 Q300 246 350 269 Q321 281 300 278 Q278 282 250 267", [0, 2, 1],
    "a notched rounded scoria cone counterbalanced by low harbour islets"
  ),
  "araucania-volcano-lake": composition(
    "M0 389 Q104 361 207 383 Q308 407 414 378 Q518 351 600 369 V430 H0Z",
    "M0 327 L110 303 L192 325 L258 170 L325 326 L443 298 L600 319 V430 H0Z",
    [["araucaria", 26, 365, .98], ["araucaria", 570, 375, .78]],
    "M0 353 Q151 336 300 358 T600 349", [2, 0, 1],
    "candelabra-like araucarias bracketing a snow-marked cone and lake"
  ),
  "trivandrum-backwater": composition(
    "M0 389 Q91 351 178 384 Q273 418 362 374 Q462 324 600 369 V430 H0Z",
    "M0 321 Q96 290 192 323 Q290 356 390 310 Q498 260 600 304 V430 H0Z",
    [["coconut", 24, 354, .88], ["mangrove", 568, 374, .82]],
    "M0 411 C88 365 163 358 238 394 S389 423 458 371 S552 329 600 340", [0, 2, 1],
    "a long S-curving backwater ending in distant stepped Western Ghats"
  ),
  "singapore-mangrove-city": composition(
    "M0 380 Q127 367 251 385 Q378 402 500 375 L600 381 V430 H0Z",
    "M0 330 H600 V373 H0Z",
    [["mangrove", 31, 368, .98], ["city", 557, 333, .62]],
    "M104 430 L476 296 M151 430 L502 304 M204 430 L526 314", [1, 0, 2],
    "a diagonal boardwalk vanishing line connecting mudflat roots and towers"
  ),
  "praslin-vallee-de-mai": composition(
    "M0 390 Q99 355 195 386 Q301 417 405 380 Q507 344 600 372 V430 H0Z",
    "M0 307 Q122 285 244 313 Q362 340 476 304 L600 316 V430 H0Z",
    [["boulder", 28, 392, 1.13], ["cocodemer", 552, 351, .92]],
    "M433 302 Q514 277 600 284", [0, 2, 1],
    "huge rounded granite boulders beneath tall coco-de-mer columns"
  ),
  "sao-tome-volcanic-cacao": composition(
    "M0 389 Q100 349 197 384 Q302 419 407 377 Q503 344 600 368 V430 H0Z",
    "M0 334 L91 299 L163 314 L219 135 L269 319 L354 278 L441 326 L513 309 L600 329 V430 H0Z",
    [["cacao", 28, 367, 1.04], ["cacao", 572, 382, .78]],
    "M219 143 Q205 226 230 286 Q244 322 235 367", [1, 0, 2],
    "a narrow offset volcanic needle, vertical waterfall, cacao trunks, and low coastal islet"
  ),
  "mahahual-reef-lagoon": composition(
    "M0 398 Q150 390 300 400 T600 394 V430 H0Z",
    "M0 323 H600 V351 H0Z M0 360 H600 V380 H0Z",
    [["seagrass", 75, 410, .82], ["seagrass", 524, 409, .72]],
    "M0 306 H600 M0 337 H600 M0 370 H600", [1, 2, 0],
    "three shallow horizontal lagoon zones under a thin mangrove fringe, with no mountains"
  ),
  "mauritius-le-morne": composition(
    "M0 387 Q113 355 222 384 Q333 413 442 374 Q521 347 600 362 V430 H0Z",
    "M0 330 L148 304 L247 318 L285 198 L355 178 L401 305 L600 321 V430 H0Z",
    [["cane", 24, 386, .85], ["sandbar", 523, 389, .72]],
    "M0 352 Q154 330 305 353 T600 344", [0, 2, 1],
    "a steep-sided Le Morne block on one side and open reef-ringed lagoon on the other"
  ),
  "hcmc-can-gio": composition(
    "M0 393 Q141 378 279 397 Q433 414 600 385 V430 H0Z",
    "M0 339 H600 V381 H0Z",
    [["mangrove", 32, 379, 1.04], ["saltpan", 532, 393, .65]],
    "M0 413 C116 376 188 407 278 375 S449 411 600 367 M0 390 C135 357 229 384 331 350 S501 378 600 352", [0, 2, 1],
    "an ultra-flat horizon dominated by branching tidal channels and roots"
  ),
  "lombok-rinjani": composition(
    "M0 353 Q91 309 181 337 Q295 371 419 326 Q512 293 600 329 V430 H0Z",
    "M0 287 Q109 211 214 267 Q300 317 390 260 Q494 195 600 282 V430 H0Z",
    [["grass", 31, 382, .8], ["cone", 410, 337, .58]],
    "M155 305 Q300 237 447 302 Q309 372 155 305Z M235 309 Q302 277 372 307", [1, 0, 2],
    "nested oval caldera rims containing crater water and a smaller young cone"
  ),
  "sanda-cacao-highland": composition(
    "M0 382 L103 355 L198 379 L292 344 L398 374 L492 341 L600 363 V430 H0Z",
    "M0 318 L600 278 V344 L0 385Z M0 337 L600 302 M0 358 L600 325",
    [["cacao", 24, 367, 1.06], ["cacao", 570, 375, .84]],
    "M40 388H205 M68 369H238 M98 350H275", [0, 2, 1],
    "a cacao trunk arch over clear stepped highland cultivation"
  ),
  "barro-gatun": composition(
    "M0 395 Q121 369 240 393 Q363 417 481 384 L600 390 V430 H0Z",
    "M0 321 Q142 286 278 319 Q414 352 600 305 V430 H0Z",
    [["dock", 28, 403, .92], ["forest", 322, 348, .75]],
    "M0 430 L178 332 M24 430 L193 342", [1, 0, 2],
    "a diagonal research dock, compact island dome, and long distant canal ship"
  ),
  "la-selva-river-corridor": composition(
    "M0 389 Q108 355 213 382 Q302 405 384 373 Q486 333 600 365 V430 H0Z",
    "M0 322 L117 300 L215 314 L301 221 L389 316 L496 296 L600 320 V430 H0Z",
    [["bridge", 24, 390, .82], ["station", 558, 359, .58]],
    "M232 430 Q245 373 300 329 Q349 292 379 249 M367 430 Q347 370 300 329 Q258 291 238 257", [0, 2, 1],
    "two rivers converging through a central forest corridor toward a distant cone"
  ),
  "guadeloupe-soufriere": composition(
    "M0 387 Q115 350 225 380 Q337 412 445 372 Q529 341 600 359 V430 H0Z",
    "M0 331 L117 301 L214 321 Q280 221 354 315 L470 295 L600 327 V430 H0Z",
    [["fern", 24, 378, 1.08], ["fumarole", 342, 236, .68]],
    "M433 287 Q419 329 441 367 Q451 391 446 430", [2, 0, 1],
    "a steaming La Soufrière dome with an offset waterfall and oversized fern foreground"
  ),
  "nouragues-inselberg": composition(
    "M0 393 Q121 366 239 391 Q358 416 478 382 L600 389 V430 H0Z",
    "M0 321 H152 Q215 207 320 204 Q426 207 488 321 H600 V430 H0Z",
    [["canoe", 33, 397, .76], ["station", 560, 365, .5]],
    "M0 410 Q141 373 281 404 Q430 437 600 381", [0, 2, 1],
    "one unbroken granite dome rising above a level canopy on the river approach"
  ),
  "manaus-meeting-waters": composition(
    "M0 403 Q151 386 300 405 T600 398 V430 H0Z",
    "M0 316 H600 V349 H0Z",
    [["igapo", 28, 382, .98], ["forest", 565, 349, .68]],
    "M0 342 Q142 318 282 350 L600 391 M600 324 Q452 308 318 347 L0 397", [1, 0, 2],
    "a bold Y-shaped dark-and-light confluence dominating flooded forest"
  ),
  "oahu-koolau": composition(
    "M0 392 Q98 355 192 384 Q292 416 387 378 Q491 337 600 368 V430 H0Z",
    "M0 340 L68 278 L122 327 L181 247 L235 321 L294 228 L352 326 L417 258 L479 333 L541 282 L600 329 V430 H0Z",
    [["stream", 28, 401, .78], ["city", 560, 359, .5]],
    "M12 430 Q72 383 135 362 Q218 333 294 232", [0, 2, 1],
    "a rhythm of narrow diagonal Koʻolau ridge fins along a wet valley axis"
  ),
  "new-taipei-yehliu": composition(
    "M0 397 Q147 381 289 400 Q446 417 600 386 V430 H0Z",
    "M0 348 Q121 332 246 347 Q360 360 460 334 L600 344 V430 H0Z",
    [["hoodoo", 38, 388, 1.05], ["hoodoo", 130, 402, .66]],
    "M81 373 Q229 332 381 351 Q474 362 600 329", [0, 1, 2],
    "a long low sandstone cape ending in differently proportioned mushroom rocks"
  ),
  "pohnpei-basalt-mangrove": composition(
    "M0 390 L95 371 L187 393 L277 365 L369 391 L462 360 L600 383 V430 H0Z",
    "M0 323 L118 296 L220 315 L301 201 L381 316 L495 292 L600 320 V430 H0Z",
    [["basaltwall", 33, 398, .98], ["mangrove", 552, 376, .76]],
    "M0 414 H210 V385 H390 V410 H600", [2, 1, 0],
    "rectilinear low basalt walls against one steep high volcanic island"
  ),
  "queensland-daintree": composition(
    "M0 386 Q104 342 211 372 Q317 403 424 367 Q518 336 600 355 V430 H0Z",
    "M0 322 Q111 260 219 301 Q322 342 425 304 Q519 270 600 292 V430 H0Z",
    [["fanpalm", 22, 364, 1], ["reef", 545, 402, .72]],
    "M0 372 Q124 349 248 370 Q376 393 600 349", [0, 1, 2],
    "an uninterrupted lateral forest-to-white-sand-to-reef transect with no generic mountain"
  ),
  "reunion-cirque-volcano": composition(
    "M0 375 L81 342 L155 371 L235 334 L315 379 L397 329 L484 366 L600 337 V430 H0Z",
    "M0 238 Q62 337 151 349 Q300 376 449 346 Q538 333 600 232 V430 H0Z",
    [["lava", 30, 395, .92], ["ravine", 556, 383, .76]],
    "M95 230 L156 171 L214 229 L302 139 L373 221 L463 162 L520 234", [0, 2, 1],
    "enclosing U-shaped cirque walls and a triple-piton skyline"
  )
});

const aliases = {
  "São Paulo region, Brazil · EG5612": "Angra dos Reis, Rio de Janeiro · EG5612",
  "New South Wales, Australia · QG2814": "Nambucca Heads, New South Wales · QG2814",
  "Scotland, Great Britain": "Edinburgh, Scotland"
};

export const environmentProfileEntries = Object.freeze(Object.entries(canonicalProfiles));
export const environmentCompositionEntries = Object.freeze(Object.entries(sceneCompositions));

export function auditEnvironmentCompositions() {
  const profileIds = environmentProfileEntries.map(([, value]) => value.id);
  const compositionIds = environmentCompositionEntries.map(([id]) => id);
  const duplicateProfileIds = profileIds.filter((id, index) => profileIds.indexOf(id) !== index);
  const missingCompositionIds = profileIds.filter(id => !sceneCompositions[id]);
  const unexpectedCompositionIds = compositionIds.filter(id => !profileIds.includes(id));
  const signatures = environmentCompositionEntries.map(([, value]) => value.geometrySignature);
  const duplicateGeometrySignatures = signatures.filter((signature, index) => signatures.indexOf(signature) !== index);
  return Object.freeze({
    profileCount: profileIds.length,
    compositionCount: compositionIds.length,
    duplicateProfileIds,
    missingCompositionIds,
    unexpectedCompositionIds,
    duplicateGeometrySignatures,
    valid: profileIds.length === 37 && compositionIds.length === 37 && !duplicateProfileIds.length && !missingCompositionIds.length && !unexpectedCompositionIds.length && !duplicateGeometrySignatures.length
  });
}

export function getEnvironmentProfile(placeName, speciesId = "") {
  const canonicalName = aliases[placeName] || placeName;
  return canonicalProfiles[`${speciesId}::${canonicalName}`] || canonicalProfiles[canonicalName] || null;
}

export function missingEnvironmentProfiles(placeNames) {
  return placeNames.filter(placeName => !getEnvironmentProfile(placeName));
}

function svgElement(name, attributes = {}) {
  const element = document.createElementNS(SVG_NS, name);
  Object.entries(attributes).forEach(([key, value]) => {
    if (value !== undefined && value !== null) element.setAttribute(key, String(value));
  });
  return element;
}

function append(parent, name, attributes = {}) {
  const child = svgElement(name, attributes);
  parent.appendChild(child);
  return child;
}

function ridgePath(points) {
  return `M 0 430 L ${points.map(point => point.join(" ")).join(" L ")} L 600 430 Z`;
}

function cueGroup(parent, cue) {
  const [kind, x, y, scale = 1] = cue;
  return append(parent, "g", { class: `environment-cue cue-${kind}`, transform: `translate(${x} ${y}) scale(${scale})` });
}

function drawTree(group, variant = "deciduous") {
  append(group, "path", { class: "env-trunk", d: "M -8 55 Q -14 18 -2 -28 Q 8 4 10 55 Z" });
  const canopy = variant === "araucaria" ? "M -45 -12 Q 0 -55 45 -12 Q 17 -7 0 7 Q -18 -7 -45 -12 Z M -35 9 Q 0 -22 35 9 Q 12 14 0 24 Q -12 14 -35 9 Z" : "M -46 -7 Q -40 -44 -8 -42 Q 8 -66 30 -40 Q 55 -36 48 -4 Q 42 24 12 19 Q -10 37 -28 18 Q -55 17 -46 -7 Z";
  append(group, "path", { class: "env-leaf", d: canopy });
}

function drawPalm(group, fan = false) {
  append(group, "path", { class: "env-trunk", d: "M -7 60 Q 3 6 0 -42 Q 17 5 9 60 Z" });
  const leaves = fan
    ? ["M0 -39 Q-48 -62 -55 -25 Q-25 -13 0 -39Z", "M0 -39 Q48 -65 55 -26 Q24 -13 0 -39Z", "M0 -39 Q-18 -78 2 -86 Q17 -67 0 -39Z"]
    : ["M0 -39 Q-52 -70 -61 -35 Q-30 -15 0 -39Z", "M0 -39 Q52 -72 62 -35 Q31 -14 0 -39Z", "M0 -39 Q-12 -76 8 -82 Q21 -61 0 -39Z", "M0 -39 Q45 -38 47 -10 Q21 -13 0 -39Z"];
  leaves.forEach(d => append(group, "path", { class: "env-leaf", d }));
}

function drawFeature(parent, cue) {
  const [kind] = cue;
  const group = cueGroup(parent, cue);
  if (["deciduous", "drytree", "eucalyptus", "pohutukawa", "banksia", "forest", "broadleaf", "igapo"].includes(kind)) {
    drawTree(group, kind);
    if (kind === "eucalyptus") group.setAttribute("transform", `${group.getAttribute("transform")} rotate(-4)`);
    if (kind === "igapo") append(group, "path", { class: "env-water-line", d: "M -40 58 Q 0 49 40 58" });
    return;
  }
  if (["palm", "coconut", "cocodemer", "pandanus", "fanpalm"].includes(kind)) {
    drawPalm(group, kind === "cocodemer" || kind === "fanpalm");
    if (kind === "cocodemer") append(group, "path", { class: "env-accent", d: "M -15 -8 Q -1 -22 1 -5 Q 3 -22 17 -8 Q 14 12 1 18 Q -13 11 -15 -8 Z" });
    return;
  }
  if (kind === "fig") {
    drawTree(group);
    append(group, "circle", { class: "env-accent", cx: -22, cy: -7, r: 8 });
    append(group, "circle", { class: "env-accent", cx: 18, cy: 2, r: 7 });
    return;
  }
  if (kind === "mangrove") {
    append(group, "path", { class: "env-trunk env-stroke", d: "M0 35 V-28 M0 9 L-29 55 M0 12 L28 55 M-2 19 L-12 58 M3 18 L14 58" });
    append(group, "path", { class: "env-leaf", d: "M-48 -17 Q-35 -55 -4 -39 Q14 -61 43 -35 Q59 -6 31 10 Q3 29 -25 11 Q-52 11 -48 -17Z" });
    return;
  }
  if (kind === "araucaria") { drawTree(group, "araucaria"); return; }
  if (kind === "cacao") {
    drawTree(group);
    [[-7, 8], [8, 24], [-5, 37]].forEach(([cx, cy]) => append(group, "ellipse", { class: "env-accent", cx, cy, rx: 7, ry: 13, transform: `rotate(18 ${cx} ${cy})` }));
    return;
  }
  if (["city", "stonecity", "village", "pol", "station"].includes(kind)) {
    const widths = kind === "village" ? [28, 34, 25] : [24, 36, 28, 22];
    let cursor = -widths.reduce((sum, width) => sum + width + 4, 0) / 2;
    widths.forEach((width, index) => {
      const height = kind === "city" ? 42 + index * 13 : 34 + (index % 2) * 13;
      append(group, "rect", { class: "env-building", x: cursor, y: -height, width, height, rx: kind === "pol" ? 4 : 1 });
      if (kind === "village" || kind === "pol") append(group, "path", { class: "env-roof", d: `M ${cursor - 3} ${-height} L ${cursor + width / 2} ${-height - 15} L ${cursor + width + 3} ${-height} Z` });
      cursor += width + 4;
    });
    return;
  }
  if (kind === "tower") {
    append(group, "path", { class: "env-building", d: "M-10 12 L-6-65 L0-92 L6-65 L10 12 Z" });
    append(group, "path", { class: "env-detail env-stroke", d: "M-18-38 H18 M-14-18 H14 M0-92 V-111" });
    return;
  }
  if (kind === "chabutro") {
    append(group, "path", { class: "env-building", d: "M-6 28 V-42 H6 V28 Z M-30-42 H30 L20-62 H-20 Z" });
    append(group, "path", { class: "env-roof", d: "M-38-62 L0-86 L38-62 Z" });
    return;
  }
  if (["boulder", "basalt", "lava", "crags", "inselberg", "cliff"].includes(kind)) {
    const d = kind === "inselberg" ? "M-70 25 Q-60-42 -5-62 Q48-60 70 25Z" : "M-58 28 L-43-20 L-12-38 L18-27 L52 10 L44 30Z";
    append(group, "path", { class: kind === "lava" || kind === "basalt" ? "env-rock dark" : "env-rock", d });
    return;
  }
  if (["waterfall", "stream", "ravine"].includes(kind)) {
    append(group, "path", { class: kind === "waterfall" ? "env-waterfall" : "env-water-line", d: kind === "ravine" ? "M-30-48 Q-8-8 -18 45 M30-48 Q8-8 18 45" : "M0-62 Q-12-8 3 52" });
    return;
  }
  if (["reef", "coral", "seagrass", "reeds", "grass", "broom", "cane"].includes(kind)) {
    const count = kind === "reef" ? 7 : 6;
    for (let index = 0; index < count; index += 1) {
      const x = (index - (count - 1) / 2) * 14;
      if (kind === "reef" || kind === "coral") append(group, "path", { class: "env-coral", d: `M${x} 35 V${5 + (index % 3) * 5} M${x} ${18 + (index % 2) * 5} l-9-10 M${x} ${14 + (index % 3) * 4} l9-9` });
      else append(group, "path", { class: "env-plant-stroke", d: `M${x} 38 Q${x - 8 + (index % 2) * 16} 10 ${x + (index % 3) * 4 - 4} -10` });
    }
    return;
  }
  if (kind === "fern") {
    append(group, "path", { class: "env-plant-stroke", d: "M-42 42 Q-16 4 38-34 M-28 24 l-26-5 M-16 10 l-25-14 M-3-2 l-18-22 M8-12 l2-28 M18-20 l22-23 M-12 7 l28 4 M2-5 l29-4 M15-18 l27-14" });
    return;
  }
  if (["paddy", "fields", "terrace", "saltpan"].includes(kind)) {
    append(group, "path", { class: "env-field", d: "M-72-20 H72 L58 42 H-58 Z" });
    append(group, "path", { class: "env-detail env-stroke", d: "M-55-4 H60 M-62 14 H65 M-68 31 H60 M-25-20 L-32 42 M22-20 L28 42" });
    return;
  }
  if (kind === "taro") {
    [-28, 0, 28].forEach((x, index) => append(group, "path", { class: "env-leaf", d: `M${x} 25 Q${x - 30} ${-15 - index * 3} ${x} -33 Q${x + 30} ${-15 - index * 3} ${x} 25Z` }));
    return;
  }
  if (["fruit", "flower", "compost"].includes(kind)) {
    if (kind === "compost") append(group, "path", { class: "env-ground", d: "M-66 35 Q-48-35 0-30 Q48-28 66 35Z" });
    const count = kind === "flower" ? 5 : 4;
    for (let index = 0; index < count; index += 1) append(group, kind === "flower" ? "ellipse" : "circle", { class: "env-accent", cx: (index - 1.5) * 18, cy: 12 + (index % 2) * 10, r: kind === "flower" ? undefined : 8, rx: kind === "flower" ? 8 : undefined, ry: kind === "flower" ? 15 : undefined, transform: kind === "flower" ? `rotate(${index * 38} ${(index - 1.5) * 18} ${12 + (index % 2) * 10})` : undefined });
    return;
  }
  if (["bridge", "boardwalk", "dock"].includes(kind)) {
    append(group, "path", { class: "env-wood env-stroke", d: "M-65 20 Q0-5 65 20 M-62 28 Q0 3 62 28 M-45 12 V42 M0 5 V34 M45 12 V42" });
    return;
  }
  if (["ship", "canoe"].includes(kind)) {
    append(group, "path", { class: "env-boat", d: kind === "ship" ? "M-65 5 H60 L43 28 H-47Z M-30 5 V-22 H28 V5 M-12-22 V-42 H12 V-22" : "M-46 8 Q0 31 46 8 Q0 20-46 8Z" });
    return;
  }
  if (["hoodoo", "cone", "snow", "fumarole", "caldera", "crater", "cirque", "canyon", "cape", "islet", "sandbar"].includes(kind)) {
    const special = {
      hoodoo: "M-18 35 Q-10 4-13-25 H13 Q10 5 18 35Z M-25-25 Q0-43 25-25Z",
      cone: "M-48 35 L0-38 L48 35Z",
      snow: "M-52 36 L0-38 L52 36 L22 7 L0 15 L-19 3Z",
      fumarole: "M-12 22 Q-32-8-8-24 Q12-38-3-58 M8 18 Q30-6 12-25",
      caldera: "M-70 26 Q-44-26 0-8 Q43-27 70 26 Q0 55-70 26Z",
      crater: "M-62 26 Q0-45 62 26 Q0 5-62 26Z",
      cirque: "M-70-34 Q-48 35 0 42 Q48 35 70-34 M-52-17 Q0 20 52-17",
      canyon: "M-68-30 L-40 35 L-12-12 L10 38 L35-18 L68 25 M-48-17 L-28 30 M27-3 L45 25",
      cape: "M-72 30 Q-15-18 72 14 L50 40 H-72Z",
      islet: "M-52 24 Q-25-17 0 6 Q28-24 55 24Z",
      sandbar: "M-68 18 Q0-8 68 18 Q0 32-68 18Z"
    };
    append(group, "path", { class: kind === "fumarole" || kind === "cirque" || kind === "canyon" ? "env-detail env-stroke" : "env-rock", d: special[kind] });
    return;
  }
  if (kind === "basaltwall") {
    [-45, -25, -5, 15, 35].forEach((x, index) => append(group, "rect", { class: "env-rock dark", x, y: -10 - (index % 3) * 12, width: 17, height: 54 + (index % 3) * 12, rx: 2 }));
  }
}

function drawWeather(parent, weather, palette) {
  if (weather === "sun") append(parent, "circle", { class: "environment-sun", cx: 505, cy: 78, r: 38, fill: palette[5] });
  if (["cloud", "mist", "rain", "cloudbank"].includes(weather)) {
    const group = append(parent, "g", { class: `environment-clouds ${weather}` });
    const clouds = weather === "cloudbank" ? [[80, 165, 80], [225, 158, 92], [390, 170, 95], [540, 158, 72]] : [[120, 82, 64], [360, 105, 76], [520, 70, 52]];
    clouds.forEach(([cx, cy, rx]) => append(group, "ellipse", { cx, cy, rx, ry: rx * .28 }));
  }
  if (weather === "rain") {
    const rain = append(parent, "g", { class: "environment-rain" });
    [85, 155, 430, 505].forEach((x, index) => append(rain, "path", { d: `M${x} ${105 + index * 5} l-15 38` }));
  }
}

function drawWater(parent, type, palette) {
  if (type === "none") return;
  const paths = {
    coast: "M0 304 Q90 286 180 307 T360 304 T600 294 V430 H0Z",
    river: "M0 348 Q120 310 235 340 Q355 370 600 318 V430 H0Z",
    irrigation: "M0 365 Q150 347 290 365 T600 352 V430 H0Z",
    pond: "M165 350 Q300 306 455 349 Q332 402 165 350Z",
    cove: "M250 302 Q415 278 600 315 V430 H250Z",
    estuary: "M0 350 Q170 292 318 338 Q460 382 600 304 V430 H0Z",
    stream: "M205 430 Q235 345 330 302 Q385 280 425 248 Q385 330 342 430Z",
    lake: "M0 337 Q150 316 300 339 T600 327 V430 H0Z",
    harbour: "M0 320 Q160 298 315 322 T600 312 V430 H0Z",
    backwater: "M0 340 Q110 296 230 339 Q350 380 470 330 Q535 302 600 316 V430 H0Z",
    mudflat: "M0 326 Q160 306 300 330 T600 315 V430 H0Z",
    lagoon: "M0 286 Q140 270 290 288 T600 276 V430 H0Z",
    tidal: "M0 330 Q130 286 270 332 Q420 380 600 306 V430 H0Z",
    craterlake: "M192 277 Q300 238 412 277 Q305 329 192 277Z",
    meeting: "M0 310 Q145 286 300 312 V430 H0Z M300 312 Q445 281 600 303 V430 H300Z"
  };
  if (type === "meeting") {
    const [first, second] = paths.meeting.split(" M");
    append(parent, "path", { class: "environment-water blackwater", d: first, fill: "#3e6d68" });
    append(parent, "path", { class: "environment-water whitewater", d: `M${second}`, fill: "#9ab6a2" });
    return;
  }
  append(parent, "path", { class: "environment-water", d: paths[type] || paths.coast, fill: palette[4] });
}

function drawBristolScene(target, palette) {
  append(target, "rect", { class: "environment-sky bristol-sky", width: 600, height: 430, fill: palette[0] });

  const clouds = append(target, "g", { class: "environment-clouds bristol-clouds" });
  append(clouds, "path", { d: "M42 78Q73 44 110 70Q139 39 178 72Q205 67 219 89H42Z" });
  append(clouds, "path", { d: "M398 61Q428 34 460 57Q487 28 524 60Q554 54 572 78H398Z" });

  const terraces = append(target, "g", { class: "bristol-terraces", "aria-hidden": "true" });
  append(terraces, "path", { class: "bristol-terrace-back", d: "M428 146V107L449 94L470 107V89L492 76L513 89V99L535 85L558 98V75L579 63L600 76V171H428Z" });
  [438, 463, 488, 514, 540, 566].forEach((x, index) => {
    append(terraces, "rect", { class: "bristol-terrace-house", x, y: 112 - (index % 3) * 9, width: 23, height: 55 + (index % 2) * 8, rx: 1 });
    append(terraces, "path", { class: "bristol-terrace-roof", d: `M${x - 2} ${112 - (index % 3) * 9}L${x + 11.5} ${99 - (index % 3) * 9}L${x + 25} ${112 - (index % 3) * 9}Z` });
    append(terraces, "rect", { class: "bristol-terrace-window", x: x + 7, y: 127 - (index % 3) * 9, width: 5, height: 9, rx: 1 });
  });

  append(target, "path", { class: "bristol-gorge bristol-gorge-wooded", d: "M0 124Q48 103 98 131Q141 149 176 188Q205 222 244 294L267 430H0Z" });
  append(target, "path", { class: "bristol-gorge bristol-gorge-limestone", d: "M600 132Q553 111 512 145Q469 176 445 226Q420 276 367 430H600Z" });
  append(target, "path", { class: "bristol-cliff-face left", d: "M130 154L167 181L181 223L210 248L232 317L257 430H207L179 350L151 313L146 248L111 211Z" });
  append(target, "path", { class: "bristol-cliff-face right", d: "M487 164L454 205L446 255L418 287L386 374L369 430H430L455 353L482 321L487 263L520 211Z" });
  append(target, "path", { class: "bristol-cliff-strata", d: "M142 184L171 203L183 245M157 267L190 282L207 324M475 191L457 224L458 256M452 291L425 322L408 367" });

  append(target, "path", { class: "environment-water bristol-avon", d: "M312 164C305 217 286 299 258 344C242 373 229 402 221 430H405C391 388 373 345 358 302C346 260 334 193 312 164Z", fill: palette[4] });
  append(target, "path", { class: "bristol-tidal-bank left", d: "M239 302Q271 278 284 240Q282 286 260 332Q238 374 221 430H182Q202 355 239 302Z" });
  append(target, "path", { class: "bristol-tidal-bank right", d: "M348 242Q351 288 373 330Q399 377 415 430H405Q387 382 365 333Q344 285 348 242Z" });
  append(target, "path", { class: "bristol-river-glint", d: "M304 251Q320 246 335 251M291 294Q322 284 352 295M269 344Q322 329 371 346M244 397Q322 373 391 400" });

  const bridge = append(target, "g", { class: "bristol-bridge", "aria-hidden": "true" });
  append(bridge, "path", { class: "bristol-bridge-chain", d: "M82 159Q139 151 181 78Q238 137 300 153Q361 137 400 78Q449 151 521 159" });
  append(bridge, "path", { class: "bristol-bridge-chain fine", d: "M83 165Q142 157 184 87Q241 144 300 159Q359 144 397 87Q446 157 520 165" });
  [[121,148],[149,126],[232,128],[264,144],[336,144],[367,128],[450,126],[484,149]].forEach(([x, y]) => append(bridge, "path", { class: "bristol-bridge-hanger", d: `M${x} ${y}V164` }));
  append(bridge, "path", { class: "bristol-bridge-tower", d: "M169 166L174 76L190 64L209 76L215 166ZM385 166L391 76L407 64L426 76L432 166Z" });
  append(bridge, "path", { class: "bristol-bridge-cap", d: "M168 78H216L209 66H175ZM384 78H433L426 66H392Z" });
  append(bridge, "path", { class: "bristol-bridge-openings", d: "M181 151V94Q181 82 192 82Q204 82 204 94V151ZM398 151V94Q398 82 410 82Q422 82 422 94V151Z" });
  append(bridge, "path", { class: "bristol-bridge-deck", d: "M76 158Q300 164 526 158L526 170Q300 176 76 170Z" });
  append(bridge, "path", { class: "bristol-bridge-rail", d: "M77 157Q300 163 525 157M78 166Q300 171 524 166" });

  const woodland = append(target, "g", { class: "bristol-woodland", "aria-hidden": "true" });
  append(woodland, "path", { d: "M0 157Q25 127 53 151Q78 119 109 151Q135 129 159 160Q179 151 194 180L222 244L0 329Z" });
  append(woodland, "path", { class: "bristol-woodland-detail", d: "M17 180Q42 154 65 181M67 164Q92 140 116 168M116 185Q142 157 165 188M34 225Q62 196 89 224M100 235Q130 206 157 240" });

  append(target, "path", { class: "bristol-garden-ground", d: "M0 337Q72 310 149 335Q211 358 253 397L264 430H0ZM600 338Q538 316 481 345Q446 365 413 430H600Z" });
  const wall = append(target, "g", { class: "bristol-garden-wall", "aria-hidden": "true" });
  append(wall, "path", { d: "M445 347Q520 323 600 337V430H425Z" });
  [365, 389, 413].forEach((y, row) => append(wall, "path", { class: "bristol-brick-line", d: `M${435 - row * 5} ${y}Q520 ${y - 17} 600 ${y - 8}` }));
  [470, 520, 570].forEach((x, index) => append(wall, "path", { class: "bristol-brick-line", d: `M${x} ${342 + index * 2}L${x - 7} 430` }));

  const compost = append(target, "g", { class: "bristol-compost", transform: "translate(89 357)", "aria-hidden": "true" });
  append(compost, "path", { class: "bristol-compost-shadow", d: "M-82 43Q0 64 92 40Q36 20-82 43Z" });
  append(compost, "path", { class: "bristol-compost-mound", d: "M-78 38Q-62-4-31-10Q-6-43 25-17Q64-17 83 37Q5 57-78 38Z" });
  append(compost, "path", { class: "bristol-compost-layer", d: "M-62 23Q-34 5-7 18Q22 1 58 19M-48 35Q-18 24 7 33Q37 21 69 33" });
  [[-50,7,-28,-3],[-23,26,-5,8],[19,10,42,-5],[37,31,62,18],[-4,-7,12,-23]].forEach(([x1,y1,x2,y2]) => append(compost, "path", { class: "bristol-compost-leaf", d: `M${x1} ${y1}Q${(x1+x2)/2} ${Math.min(y1,y2)-8} ${x2} ${y2}Q${(x1+x2)/2} ${Math.max(y1,y2)+5} ${x1} ${y1}Z` }));
  append(compost, "path", { class: "bristol-compost-stem", d: "M-36 2V-13M45 14V-2" });
  append(compost, "path", { class: "bristol-compost-fungi", d: "M-49-12Q-36-27-23-12Q-32-5-49-12ZM32-2Q45-17 58-2Q49 5 32-2Z" });

  const litter = append(target, "g", { class: "bristol-leaf-litter", "aria-hidden": "true" });
  [[18,407,42,391],[139,416,164,400],[187,391,213,377],[493,399,518,384],[548,416,579,397]].forEach(([x1,y1,x2,y2], index) => append(litter, "path", { d: `M${x1} ${y1}Q${(x1+x2)/2} ${Math.min(y1,y2)-10-index%2*3} ${x2} ${y2}Q${(x1+x2)/2} ${Math.max(y1,y2)+7} ${x1} ${y1}Z` }));
}

function drawSanteuilScene(target, palette) {
  append(target, "rect", { class: "environment-sky santeuil-sky", width: 600, height: 430, fill: palette[0] });
  append(target, "circle", { class: "santeuil-sun", cx: 91, cy: 62, r: 27 });
  const clouds = append(target, "g", { class: "santeuil-clouds", "aria-hidden": "true" });
  append(clouds, "path", { d: "M182 65Q204 40 231 59Q252 34 283 58Q306 55 319 74H182Z" });
  append(clouds, "path", { d: "M441 49Q462 31 485 47Q504 28 530 49Q552 46 563 63H441Z" });

  const plateau = append(target, "g", { class: "santeuil-plateau", "aria-hidden": "true" });
  append(plateau, "path", { class: "santeuil-plateau-field", d: "M0 101H600V177Q531 166 473 183Q401 204 351 225Q321 237 298 226Q271 214 233 188Q162 143 0 156Z" });
  append(plateau, "path", { class: "santeuil-field-seam", d: "M0 122H600M28 102L82 159M132 102L171 166M493 101L457 184M572 101L538 171" });
  append(plateau, "path", { class: "santeuil-plateau-rim", d: "M0 157Q148 140 231 188Q276 215 299 226Q326 238 355 223Q422 188 493 174Q549 163 600 178" });

  const village = append(target, "g", { class: "santeuil-village", "aria-hidden": "true" });
  [
    [374, 169, 31, 32], [406, 154, 28, 39], [438, 168, 33, 34],
    [491, 142, 35, 45], [527, 160, 29, 38], [558, 151, 33, 44]
  ].forEach(([x, y, width, height], index) => {
    append(village, "rect", { class: "santeuil-house", x, y, width, height, rx: 1 });
    append(village, "path", { class: "santeuil-roof", d: `M${x - 3} ${y}L${x + width / 2} ${y - 13 - index % 2 * 3}L${x + width + 3} ${y}Z` });
    append(village, "rect", { class: "santeuil-window", x: x + width * .28, y: y + 12, width: 5, height: 8, rx: 1 });
  });
  const church = append(village, "g", { class: "santeuil-church", transform: "translate(458 170)" });
  append(church, "path", { class: "santeuil-church-body", d: "M-22 31V-16H18V31Z" });
  append(church, "path", { class: "santeuil-church-roof", d: "M-27-16L-2-34L23-16Z" });
  append(church, "path", { class: "santeuil-church-tower", d: "M-13-13V-61H10V-13Z" });
  append(church, "path", { class: "santeuil-church-spire", d: "M-17-61L-2-104L14-61Z" });
  append(church, "path", { class: "santeuil-church-opening", d: "M-6-41Q-2-51 3-41V-29H-6ZM-7 31V12Q-2 1 4 12V31Z" });
  append(church, "path", { class: "santeuil-church-cross", d: "M-2-105V-116M-8-111H4" });

  append(target, "path", { class: "santeuil-valley santeuil-valley-left", d: "M0 146Q83 128 149 163Q212 191 257 235Q278 254 293 278L307 430H0Z" });
  append(target, "path", { class: "santeuil-valley santeuil-valley-right", d: "M600 168Q543 151 492 181Q429 206 370 244Q341 263 323 286L310 430H600Z" });

  const woodland = append(target, "g", { class: "santeuil-woodland", "aria-hidden": "true" });
  append(woodland, "path", { class: "santeuil-canopy-left", d: "M0 135Q23 106 51 129Q76 95 105 126Q137 101 165 139Q193 126 215 160Q235 162 252 197L274 254L0 330Z" });
  append(woodland, "path", { class: "santeuil-canopy-right", d: "M600 152Q574 119 547 145Q521 112 489 147Q456 130 430 169Q398 164 377 205L342 270L600 330Z" });
  [30, 81, 139, 198, 410, 468, 529, 576].forEach((x, index) => {
    const right = x > 300;
    append(woodland, "path", { class: "santeuil-tree-trunk", d: `M${x - 4} ${136 + index % 3 * 11}Q${x - 8 + (right ? -4 : 4)} 219 ${x - 3} ${315 - index % 2 * 13}H${x + 10}Q${x + 4} 216 ${x + 7} ${132 + index % 3 * 11}Z` });
    append(woodland, "path", { class: "santeuil-tree-branch", d: `M${x + 1} ${190 + index % 2 * 12}L${x + (right ? -22 : 22)} ${160 + index % 3 * 6}M${x + 2} ${218 + index % 2 * 9}L${x + (right ? 18 : -18)} ${189 + index % 3 * 4}` });
  });

  append(target, "path", { class: "environment-water santeuil-stream", d: "M307 218C300 250 285 276 295 303C305 329 330 347 325 375C322 395 311 412 300 430H384C369 400 356 379 358 352C361 322 341 302 329 280C319 259 317 239 320 218Z", fill: palette[4] });
  append(target, "path", { class: "santeuil-stream-bank left", d: "M0 310Q95 286 189 307Q259 320 295 303Q309 328 327 348Q320 379 300 430H0Z" });
  append(target, "path", { class: "santeuil-stream-bank right", d: "M329 280Q384 303 443 290Q524 271 600 304V430H384Q365 397 357 366Q365 326 329 280Z" });
  append(target, "path", { class: "santeuil-stream-glint", d: "M305 260Q315 256 324 260M301 296Q318 290 334 296M314 333Q336 323 354 334M320 374Q344 363 365 376M313 411Q344 397 375 414" });

  const railway = append(target, "g", { class: "santeuil-railway", "aria-hidden": "true" });
  append(railway, "path", { class: "santeuil-rail-embankment", d: "M153 248Q229 243 289 250Q348 257 437 244L441 257Q350 270 289 263Q225 256 151 262Z" });
  append(railway, "path", { class: "santeuil-rail-line", d: "M151 249Q225 244 289 252Q351 260 440 246M152 255Q225 250 289 258Q351 266 441 252" });
  [169, 196, 225, 255, 282, 362, 392, 420].forEach((x, index) => append(railway, "path", { class: "santeuil-sleeper", d: `M${x} ${247 + (index < 5 ? index % 2 * 2 : 8 - index % 2 * 2)}L${x + 2} ${262 + (index < 5 ? index % 2 * 2 : 8 - index % 2 * 2)}` }));
  append(railway, "path", { class: "santeuil-bridge-face", d: "M280 249Q309 230 340 253L338 269Q310 250 283 265Z" });
  append(railway, "path", { class: "santeuil-bridge-arch", d: "M289 260Q310 239 332 262" });

  const litter = append(target, "g", { class: "santeuil-leaf-litter", "aria-hidden": "true" });
  [[22,366,54,348],[62,405,100,387],[181,388,216,365],[232,419,267,399],[418,405,451,380],[474,362,504,344],[542,410,582,387]].forEach(([x1,y1,x2,y2], index) => {
    append(litter, "path", { d: `M${x1} ${y1}Q${(x1+x2)/2} ${Math.min(y1,y2)-10-index%2*4} ${x2} ${y2}Q${(x1+x2)/2} ${Math.max(y1,y2)+8} ${x1} ${y1}Z` });
    append(litter, "path", { class: "santeuil-leaf-vein", d: `M${x1 + 4} ${y1 - 1}L${x2 - 4} ${y2 + 1}` });
  });

  const stem = append(target, "g", { class: "santeuil-hogweed-stem", transform: "translate(126 357) rotate(-8)", "aria-hidden": "true" });
  append(stem, "path", { class: "santeuil-stem-shadow", d: "M-111 24Q-34 40 91 23Q103 31 116 22Q108 48 88 51Q-33 58-116 40Z" });
  append(stem, "path", { class: "santeuil-stem-body", d: "M-111-10Q-29-24 88-13Q104-12 111 5Q105 23 88 25Q-34 12-111 25Q-126 8-111-10Z" });
  [-67, -19, 31].forEach((x, index) => append(stem, "path", { class: "santeuil-stem-node", d: `M${x} ${-16 + index % 2}Q${x + 7} 5 ${x} ${19 - index % 2}` }));
  append(stem, "ellipse", { class: "santeuil-stem-rim", cx: 94, cy: 6, rx: 22, ry: 27 });
  append(stem, "ellipse", { class: "santeuil-stem-hollow", cx: 98, cy: 6, rx: 13, ry: 17 });
  append(stem, "path", { class: "santeuil-stem-fibre", d: "M83-13L91-5M78 18L89 12M103-16L107-6M105 17L111 10" });
  append(stem, "path", { class: "santeuil-broken-branch", d: "M-42-16Q-29-39-11-51L-2-40Q-21-25-27-11Z" });
  [[-86,2],[-55,8],[-5,-4],[20,9],[55,0]].forEach(([cx, cy], index) => append(stem, "circle", { class: "santeuil-decay-speck", cx, cy, r: 2 + index % 2 }));

  const comfrey = append(target, "g", { class: "santeuil-comfrey", transform: "translate(520 377)", "aria-hidden": "true" });
  [[-57,35,-22,-14,-32],[57,35,22,-20,30],[-33,39,-5,-28,-15],[31,40,7,-35,16],[-10,43,-12,-45,-3]].forEach(([x1,y1,x2,y2,angle], index) => {
    append(comfrey, "path", { class: "santeuil-comfrey-leaf", d: `M0 42Q${x1} ${y1} ${x2} ${y2}Q${x1 * .25} ${y1 - 9} 0 42Z`, transform: `rotate(${angle * .18})` });
    if (index < 4) append(comfrey, "path", { class: "santeuil-comfrey-vein", d: `M0 42L${x2} ${y2}` });
  });
  append(comfrey, "path", { class: "santeuil-comfrey-stem", d: "M2 40Q12-4 35-47M10 27Q-1-5-20-32" });
  [[35,-47,12],[45,-36,-7],[24,-35,22],[-20,-32,-15],[-29,-24,8]].forEach(([x, y, angle]) => append(comfrey, "path", { class: "santeuil-comfrey-flower", d: `M${x-6} ${y}Q${x} ${y+13} ${x+7} ${y}L${x+4} ${y-8}H${x-4}Z`, transform: `rotate(${angle} ${x} ${y})` }));
}

function drawEdinburghScene(target, palette) {
  append(target, "rect", { class: "environment-sky edinburgh-sky", width: 600, height: 430, fill: palette[0] });
  const clouds = append(target, "g", { class: "edinburgh-clouds", "aria-hidden": "true" });
  append(clouds, "path", { d: "M29 68Q55 42 87 62Q111 36 147 60Q176 54 192 77H29Z" });
  append(clouds, "path", { d: "M393 48Q417 27 446 45Q472 23 504 49Q532 44 548 65H393Z" });

  append(target, "path", { class: "edinburgh-blackford-hill", d: "M0 278L80 268L145 232L205 155Q225 133 255 143Q330 162 405 193Q500 229 600 248V335H0Z" });
  append(target, "path", { class: "edinburgh-andesite-face", d: "M83 270L145 232L205 155Q219 139 239 141L205 208L176 236L151 284Z" });
  append(target, "path", { class: "edinburgh-hill-contour", d: "M115 259L157 225L196 170M151 275L179 239L213 209M266 159Q348 178 437 211Q512 239 584 247" });

  const observatory = append(target, "g", { class: "edinburgh-observatory", "aria-hidden": "true" });
  append(observatory, "path", { class: "edinburgh-observatory-shadow", d: "M187 181Q303 191 416 179L405 191Q298 202 190 191Z" });
  append(observatory, "rect", { class: "edinburgh-observatory-body", x: 211, y: 132, width: 184, height: 46, rx: 2 });
  append(observatory, "path", { class: "edinburgh-observatory-roof", d: "M204 134L218 123H389L402 134Z" });
  append(observatory, "path", { class: "edinburgh-observatory-end left", d: "M187 176V143L197 130H219L229 143V178Z" });
  append(observatory, "path", { class: "edinburgh-observatory-end right", d: "M378 178V142L388 128H410L420 142V177Z" });
  [233, 255, 347, 369].forEach((x, index) => append(observatory, "path", { class: "edinburgh-observatory-window", d: `M${x} 160V145Q${x + 6} ${136 + index % 2 * 2} ${x + 12} 145V160Z` }));
  [272, 332].forEach((x, index) => {
    const housing = append(observatory, "g", { class: "edinburgh-observatory-housing", transform: `translate(${x} ${index ? 1 : 0})` });
    append(housing, "rect", { class: "edinburgh-copper-drum", x: -17, y: 103, width: 34, height: 32, rx: 2 });
    append(housing, "path", { class: "edinburgh-copper-dome", d: "M-20 105Q-15 83 0 80Q16 83 20 105Z" });
    append(housing, "path", { class: "edinburgh-copper-seam", d: "M-13 91Q0 85 13 91M0 82V133" });
    append(housing, "rect", { class: "edinburgh-drum-base", x: -22, y: 132, width: 44, height: 7, rx: 1 });
  });
  append(observatory, "path", { class: "edinburgh-stone-detail", d: "M211 151H395M198 152H218M389 150H410" });

  const scrub = append(target, "g", { class: "edinburgh-hill-scrub", "aria-hidden": "true" });
  append(scrub, "path", { d: "M28 286Q54 254 82 282Q105 251 132 277M431 226Q454 205 479 229Q504 207 528 237M517 250Q548 226 580 253" });
  append(scrub, "path", { class: "edinburgh-scrub-stems", d: "M51 283L43 258M70 280L78 252M454 228L447 203M474 230L485 202M546 250L539 225M566 249L578 220" });

  append(target, "path", { class: "edinburgh-allotment-ground", d: "M0 285Q105 268 203 283Q302 299 400 276Q505 252 600 275V430H0Z" });
  const hedge = append(target, "g", { class: "edinburgh-hedges", "aria-hidden": "true" });
  append(hedge, "path", { d: "M0 291Q22 268 46 286Q69 258 95 281Q120 266 143 289L168 302H0ZM404 279Q430 249 456 275Q482 243 511 270Q543 252 570 278Q588 269 600 278V315H404Z" });
  append(hedge, "path", { class: "edinburgh-hedge-highlight", d: "M12 286Q31 274 47 285M55 279Q76 265 94 280M424 274Q446 258 459 273M477 269Q499 252 514 268M536 271Q557 258 576 276" });

  const sheds = append(target, "g", { class: "edinburgh-sheds", "aria-hidden": "true" });
  append(sheds, "path", { class: "edinburgh-shed wall", d: "M43 302V249H98V302Z" });
  append(sheds, "path", { class: "edinburgh-shed roof", d: "M35 251L68 230L106 251Z" });
  append(sheds, "path", { class: "edinburgh-shed-door", d: "M59 302V264H82V302ZM64 269L77 295M78 268L63 294" });
  append(sheds, "path", { class: "edinburgh-shed wall second", d: "M481 294V253L535 243L548 294Z" });
  append(sheds, "path", { class: "edinburgh-shed roof second", d: "M473 255L522 232L554 245L545 257Z" });
  append(sheds, "rect", { class: "edinburgh-shed-window", x: 501, y: 257, width: 20, height: 15, rx: 1 });

  const plots = append(target, "g", { class: "edinburgh-plots", "aria-hidden": "true" });
  [
    ["M0 430H137L238 272L188 271Z", "left"],
    ["M154 430H272L278 270L246 270Z", "centre-left"],
    ["M289 430H410L343 269L309 270Z", "centre-right"],
    ["M430 430H600L408 268L361 269Z", "right"]
  ].forEach(([d, side]) => append(plots, "path", { class: `edinburgh-plot ${side}`, d }));
  append(plots, "path", { class: "edinburgh-plot-board", d: "M4 420L190 278M136 425L239 274M163 423L248 278M270 422L278 274M294 422L310 275M407 423L343 273M435 423L362 274M594 418L407 273" });
  append(plots, "path", { class: "edinburgh-plot-furrow", d: "M30 391L202 281M62 410L213 288M185 396L257 284M316 395L323 282M464 396L382 280M523 409L394 286" });

  const planting = append(target, "g", { class: "edinburgh-late-planting", "aria-hidden": "true" });
  [[166,334,-18],[201,309,12],[363,324,-9],[399,305,17],[496,345,-13],[534,366,10]].forEach(([x, y, angle], index) => {
    append(planting, "path", { class: "edinburgh-plant-stem", d: `M${x} ${y + 18}Q${x - 2} ${y + 3} ${x} ${y - 14}` });
    append(planting, "path", { class: "edinburgh-plant-leaf", d: `M${x} ${y + 4}Q${x - 20} ${y - 10} ${x - 25} ${y + 8}Q${x - 12} ${y + 14} ${x} ${y + 4}ZM${x} ${y - 1}Q${x + 18} ${y - 15} ${x + 24} ${y + 3}Q${x + 11} ${y + 11} ${x} ${y - 1}Z`, transform: `rotate(${angle} ${x} ${y})` });
    if (index % 2 === 0) append(planting, "circle", { class: "edinburgh-seed-head", cx: x, cy: y - 15, r: 4 });
  });

  append(target, "path", { class: "edinburgh-foreground-soil", d: "M0 347Q98 320 196 349Q296 378 400 344Q505 311 600 339V430H0Z" });
  const beds = append(target, "g", { class: "edinburgh-raised-beds", "aria-hidden": "true" });
  append(beds, "path", { class: "edinburgh-bed-soil", d: "M367 370L538 326L600 350L431 409Z" });
  append(beds, "path", { class: "edinburgh-bed-board", d: "M363 365L536 319L600 343V355L431 416L363 383ZM368 367L536 324L594 345L431 408Z" });
  append(beds, "path", { class: "edinburgh-bed-furrow", d: "M397 369L548 331M425 383L574 342M458 395L592 353" });
  append(beds, "path", { class: "edinburgh-bed-soil", d: "M6 374L93 343L142 365L52 405Z" });
  append(beds, "path", { class: "edinburgh-bed-board", d: "M4 369L93 337L146 361V373L52 411L4 390ZM10 371L93 342L138 363L52 404Z" });
  append(beds, "path", { class: "edinburgh-bed-furrow", d: "M25 378L100 351M43 388L120 359" });

  const compost = append(target, "g", { class: "edinburgh-compost-bay", transform: "translate(121 357)", "aria-hidden": "true" });
  append(compost, "path", { class: "edinburgh-compost-shadow", d: "M-116 60Q-5 82 111 55Q52 91-104 83Z" });
  append(compost, "path", { class: "edinburgh-compost-cavity", d: "M-100-37L-72-58L85-47L104-23L88 57L-91 61Z" });
  append(compost, "path", { class: "edinburgh-compost-green", d: "M-80 5Q-57-34-27-14Q-4-42 23-17Q52-31 77 1L82 18Q-3 33-80 20Z" });
  append(compost, "path", { class: "edinburgh-compost-brown", d: "M-84 20Q-48 5-11 25Q29 3 81 18L85 46Q4 63-88 49Z" });
  append(compost, "path", { class: "edinburgh-compost-damp", d: "M-75 32Q-42 22-8 39Q29 20 73 32" });
  append(compost, "path", { class: "edinburgh-compost-back", d: "M-108-56L-79-69L77-61L102-53L96-40L-77-47Z" });
  append(compost, "path", { class: "edinburgh-compost-side left", d: "M-108-56L-79-69L-72 58L-96 64Z" });
  append(compost, "path", { class: "edinburgh-compost-side right", d: "M77-61L102-53L100 55L79 59Z" });
  append(compost, "path", { class: "edinburgh-compost-front", d: "M-91 36L85 30L82 65L-88 72Z" });
  [-62,-28,7,42,71].forEach((x, index) => append(compost, "path", { class: "edinburgh-compost-slat", d: `M${x} ${34 - index % 2 * 2}L${x - 1} ${68 - index % 3}` }));
  append(compost, "path", { class: "edinburgh-compost-board-line", d: "M-89 48L84 42M-88 61L83 55" });
  append(compost, "path", { class: "edinburgh-compost-stems", d: "M-55 8L-34-22M12 5L24-27M48 7L68-17" });
  [[-48,-5,-26,-19],[-16,12,7,-2],[27,-8,50,-20],[48,21,71,8]].forEach(([x1,y1,x2,y2], index) => append(compost, "path", { class: index % 2 ? "edinburgh-compost-leaf green" : "edinburgh-compost-leaf", d: `M${x1} ${y1}Q${(x1+x2)/2} ${Math.min(y1,y2)-9} ${x2} ${y2}Q${(x1+x2)/2} ${Math.max(y1,y2)+6} ${x1} ${y1}Z` }));
  [[-101,-35],[-82,-58],[87,-46],[96,-19]].forEach(([cx, cy]) => append(compost, "circle", { class: "edinburgh-wood-knot", cx, cy, r: 3 }));

  const stake = append(target, "g", { class: "edinburgh-plot-stake", transform: "translate(239 330) rotate(3)", "aria-hidden": "true" });
  append(stake, "path", { d: "M-13-28H17L14 9L4 15L3 78H-3L-4 14L-15 8Z" });
  const stakeText = append(stake, "text", { x: 1, y: -4, "text-anchor": "middle" });
  stakeText.textContent = "1/39";

  const litter = append(target, "g", { class: "edinburgh-damp-litter", "aria-hidden": "true" });
  [[18,415,48,394],[205,409,235,386],[275,421,307,399],[457,414,490,390],[546,425,580,403]].forEach(([x1,y1,x2,y2], index) => {
    append(litter, "path", { d: `M${x1} ${y1}Q${(x1+x2)/2} ${Math.min(y1,y2)-10-index%2*3} ${x2} ${y2}Q${(x1+x2)/2} ${Math.max(y1,y2)+7} ${x1} ${y1}Z` });
    append(litter, "path", { class: "edinburgh-leaf-vein", d: `M${x1 + 4} ${y1 - 1}L${x2 - 3} ${y2 + 1}` });
  });
}

function drawTenerifeScene(target, palette) {
  append(target, "rect", { class: "environment-sky tenerife-sky", width: 600, height: 430, fill: palette[0] });
  append(target, "circle", { class: "tenerife-sun", cx: 516, cy: 58, r: 26 });
  const clouds = append(target, "g", { class: "tenerife-clouds", "aria-hidden": "true" });
  append(clouds, "path", { d: "M227 70Q246 48 270 66Q291 42 318 65Q340 61 354 79H227Z" });
  append(clouds, "path", { d: "M429 91Q445 75 465 87Q483 68 505 88Q525 85 536 101H429Z" });

  append(target, "path", { class: "tenerife-orotava-slope", d: "M0 176Q70 152 143 169Q220 187 293 161Q374 132 447 151Q528 171 600 139V226H0Z" });
  append(target, "path", { class: "tenerife-slope-detail", d: "M0 183Q68 163 135 177M166 176Q228 190 293 168M322 158Q381 140 438 156M515 165Q558 156 600 147" });
  append(target, "path", { class: "tenerife-teide-notch", d: "M431 184L454 176L470 162L480 145L491 165L507 178L532 184Z" });

  const distantCanopy = append(target, "g", { class: "tenerife-distant-canopy", "aria-hidden": "true" });
  append(distantCanopy, "path", { d: "M0 187Q22 160 49 183Q73 151 101 180Q127 154 151 187Q179 165 201 192L213 218H0ZM389 190Q416 157 445 188Q470 153 502 185Q532 154 560 190Q580 174 600 188V224H386Z" });

  const wall = append(target, "g", { class: "tenerife-garden-wall", "aria-hidden": "true" });
  append(wall, "path", { class: "tenerife-wall-face", d: "M0 196Q148 188 299 199Q451 210 600 191V235Q451 249 300 237Q150 226 0 239Z" });
  append(wall, "path", { class: "tenerife-wall-cap", d: "M0 193Q149 184 299 196Q449 207 600 188L600 199Q451 218 299 206Q150 195 0 204Z" });
  append(wall, "path", { class: "tenerife-wall-seam", d: "M67 197L65 236M142 193L143 233M220 195L222 235M302 201L303 240M385 204L384 241M470 201L468 237M549 195L548 233" });

  append(target, "path", { class: "tenerife-garden-ground", d: "M0 221Q146 208 299 219Q454 231 600 214V430H0Z" });
  const paths = append(target, "g", { class: "tenerife-garden-paths", "aria-hidden": "true" });
  append(paths, "path", { class: "tenerife-path longitudinal", d: "M255 213L329 214L353 430H263Z" });
  append(paths, "path", { class: "tenerife-path transverse", d: "M0 281L600 300V317L0 300Z" });
  append(paths, "path", { class: "tenerife-path-edge", d: "M255 214L263 430M329 214L353 430M0 281L600 300M0 300L600 317" });

  const beds = append(target, "g", { class: "tenerife-linnaean-beds", "aria-hidden": "true" });
  const bedRows = [
    [
      "M76 222L130 220L126 247L69 249Z", "M137 220L190 219L189 247L134 247Z", "M197 219L249 218L251 247L195 247Z",
      "M335 219L377 220L381 249L337 248Z", "M384 220L432 221L438 251L388 250Z", "M439 221L493 222L501 253L445 251Z"
    ],
    [
      "M61 254L126 251L120 280L53 282Z", "M133 251L190 250L188 281L129 281Z", "M197 250L252 249L255 282L195 281Z",
      "M338 250L382 251L387 284L340 282Z", "M389 251L445 253L452 287L393 284Z", "M452 253L516 255L525 290L459 287Z"
    ],
    [
      "M38 320L113 315L106 347L29 351Z", "M120 315L187 312L184 348L115 349Z", "M195 312L255 310L258 350L191 348Z",
      "M345 313L395 315L401 353L348 350Z", "M402 315L470 318L478 356L407 353Z", "M477 318L552 321L563 361L485 357Z"
    ],
    [
      "M18 359L105 352L96 398L7 404Z", "M113 352L185 348L182 398L104 400Z", "M192 348L260 346L263 401L187 399Z",
      "M354 349L415 352L423 405L358 401Z", "M422 352L497 356L508 410L430 406Z", "M504 356L588 361L600 417L516 411Z"
    ]
  ];
  bedRows.forEach((row, rowIndex) => row.forEach((d, columnIndex) => append(beds, "path", {
    class: `tenerife-class-bed row-${rowIndex} tone-${(rowIndex + columnIndex) % 3}`,
    d
  })));

  const planting = append(target, "g", { class: "tenerife-bed-planting", "aria-hidden": "true" });
  [
    [94,237,.55,-11], [159,234,.48,9], [222,234,.52,-4], [356,235,.5,7], [411,237,.46,-8], [469,240,.54,11],
    [88,269,.65,8], [160,266,.52,-7], [224,267,.58,6], [360,268,.52,-9], [419,270,.64,5], [487,273,.5,-5],
    [73,333,.72,-7], [151,329,.62,8], [226,329,.67,-9], [371,333,.6,8], [440,337,.7,-5], [520,340,.62,7]
  ].forEach(([x, y, scale, angle], index) => {
    const plant = append(planting, "g", { class: `tenerife-bed-plant plant-${index % 4}`, transform: `translate(${x} ${y}) rotate(${angle}) scale(${scale})` });
    append(plant, "path", { class: "tenerife-plant-stem", d: index % 2 ? "M0 16Q-2-2 2-25" : "M0 17Q3-4-1-27" });
    append(plant, "path", { class: "tenerife-plant-leaf", d: index % 3 === 0 ? "M0 3Q-27-18-33 3Q-15 17 0 3ZM0-5Q23-24 31-5Q15 10 0-5Z" : "M0 5Q-22-12-28 6Q-12 17 0 5ZM0-7Q19-24 27-7Q13 7 0-7Z" });
    if (index % 4 === 1) append(plant, "circle", { class: "tenerife-plant-bloom", cx: 2, cy: -26, r: 5 });
  });

  const labels = append(target, "g", { class: "tenerife-botanical-labels", "aria-hidden": "true" });
  [[121,241],[242,274],[368,245],[494,279],[179,341],[458,349]].forEach(([x, y], index) => {
    const label = append(labels, "g", { transform: `translate(${x} ${y}) rotate(${index % 2 ? -4 : 4})` });
    append(label, "path", { class: "tenerife-label-support", d: "M0 5V24" });
    append(label, "rect", { class: "tenerife-label-plaque", x: -10, y: -7, width: 20, height: 13, rx: 2 });
    append(label, "path", { class: "tenerife-label-line", d: "M-6-2H6M-6 2H3" });
  });

  const pond = append(target, "g", { class: "tenerife-irrigation-pond", transform: "translate(550 264) rotate(-3)", "aria-hidden": "true" });
  append(pond, "ellipse", { class: "tenerife-pond-shadow", cx: 1, cy: 6, rx: 48, ry: 25 });
  append(pond, "ellipse", { class: "tenerife-pond-rim", cx: 0, cy: 0, rx: 46, ry: 23 });
  append(pond, "ellipse", { class: "tenerife-pond-water", cx: 0, cy: -1, rx: 37, ry: 16 });
  append(pond, "path", { class: "tenerife-pond-glint", d: "M-25-5Q-8-12 10-6M6 6Q19 1 29 5" });
  [[-17,2,-7], [18,-5,8]].forEach(([cx, cy, angle], index) => {
    append(pond, "ellipse", { class: "tenerife-water-leaf", cx, cy, rx: index ? 8 : 10, ry: index ? 4 : 5, transform: `rotate(${angle} ${cx} ${cy})` });
  });

  const ficus = append(target, "g", { class: "tenerife-ficus", "aria-hidden": "true" });
  append(ficus, "path", { class: "tenerife-ficus-canopy", d: "M0 0H196Q207 25 188 47Q207 73 179 92Q187 121 155 132Q132 112 108 128Q82 111 61 125Q33 108 42 82Q13 71 28 45Q2 28 0 0Z" });
  append(ficus, "path", { class: "tenerife-ficus-trunk", d: "M0 76Q27 66 49 84Q68 105 62 139Q57 187 76 234Q86 259 75 307L19 310Q27 252 15 212Q3 169 7 126Q10 96 0 76Z" });
  append(ficus, "path", { class: "tenerife-ficus-branch", d: "M31 113Q83 75 143 88Q178 93 206 119L193 142Q157 121 120 122Q76 121 47 151Z" });
  append(ficus, "path", { class: "tenerife-ficus-buttress", d: "M18 279Q-3 322 0 367Q31 346 46 319Q61 353 99 366Q93 327 72 292Z" });
  append(ficus, "path", { class: "tenerife-aerial-root thick", d: "M70 104Q61 158 69 210Q78 253 64 331" });
  append(ficus, "path", { class: "tenerife-aerial-root medium", d: "M104 93Q92 151 101 202Q112 250 96 319" });
  append(ficus, "path", { class: "tenerife-aerial-root fine", d: "M135 94Q127 148 134 193Q143 236 132 302" });
  append(ficus, "path", { class: "tenerife-aerial-root medium", d: "M166 102Q153 157 162 205Q174 245 157 287" });
  append(ficus, "path", { class: "tenerife-root-arch", d: "M54 304Q103 270 163 289Q184 296 201 319" });
  [[34,36,28,15,-18],[87,45,34,17,12],[143,34,37,18,-8],[164,77,31,15,18],[55,79,30,14,-14]].forEach(([cx, cy, rx, ry, angle], index) => {
    append(ficus, "ellipse", { class: index % 2 ? "tenerife-ficus-leaf deep" : "tenerife-ficus-leaf", cx, cy, rx, ry, transform: `rotate(${angle} ${cx} ${cy})` });
  });

  const litter = append(target, "g", { class: "tenerife-leaf-litter", "aria-hidden": "true" });
  [[18,405,50,388],[63,426,97,405],[176,415,213,394],[231,425,266,405],[303,406,337,388],[383,423,418,402],[446,404,478,385],[522,427,564,404]].forEach(([x1,y1,x2,y2], index) => {
    append(litter, "path", { class: index % 3 === 0 ? "tenerife-litter-leaf damp" : "tenerife-litter-leaf", d: `M${x1} ${y1}Q${(x1+x2)/2} ${Math.min(y1,y2)-10-index%2*3} ${x2} ${y2}Q${(x1+x2)/2} ${Math.max(y1,y2)+8} ${x1} ${y1}Z` });
    append(litter, "path", { class: "tenerife-litter-vein", d: `M${x1+4} ${y1-1}L${x2-4} ${y2+1}` });
  });
  [[278,414,4],[349,397,3],[431,418,4],[575,389,3],[148,400,3]].forEach(([cx, cy, r]) => append(litter, "circle", { class: "tenerife-decay-fragment", cx, cy, r }));

  const avocado = append(target, "g", { class: "tenerife-rotten-avocado", transform: "translate(500 365) rotate(7)", "aria-hidden": "true" });
  append(avocado, "ellipse", { class: "tenerife-avocado-shadow", cx: -2, cy: 34, rx: 84, ry: 18 });
  append(avocado, "path", { class: "tenerife-avocado-rind", d: "M-79 13Q-75-23-38-39Q-8-51 11-31Q42-43 69-24Q91-9 83 18Q72 43 35 47Q4 55-24 40Q-51 48-72 34Q-84 27-79 13Z" });
  append(avocado, "path", { class: "tenerife-avocado-flesh", d: "M-63 10Q-56-17-29-27Q-6-36 8-20Q32-31 55-17Q70-7 66 12Q58 30 31 33Q6 41-16 29Q-37 35-54 25Q-65 20-63 10Z" });
  append(avocado, "path", { class: "tenerife-avocado-collapse", d: "M-58 15Q-27 2-5 22Q18 3 57 13Q42 37 10 34Q-22 39-58 15Z" });
  append(avocado, "ellipse", { class: "tenerife-avocado-pit", cx: 20, cy: 5, rx: 21, ry: 18, transform: "rotate(12 20 5)" });
  append(avocado, "path", { class: "tenerife-avocado-pit-split", d: "M12-10Q20 1 14 18M29-8Q20 3 27 18" });
  append(avocado, "path", { class: "tenerife-avocado-peel-flap", d: "M-70 16Q-86 35-72 50Q-42 58-20 40Q-48 44-70 16Z" });
  [[-45,-8,4],[-24,15,3],[2,-21,3],[48,6,4],[36,25,2.5]].forEach(([cx, cy, r], index) => append(avocado, "circle", { class: index % 2 ? "tenerife-avocado-mottle dark" : "tenerife-avocado-mottle", cx, cy, r }));
}

export function renderEnvironmentScene(target, profile, habitatElement) {
  if (!target || !profile) return;
  const palette = profile.palette;
  const sceneComposition = sceneCompositions[profile.id];
  if (!sceneComposition) throw new Error(`Missing explicit environment composition for ${profile.id}`);
  target.replaceChildren();
  target.dataset.profile = profile.id;
  target.dataset.composition = profile.id;
  habitatElement?.style.setProperty("--environment-accent", palette[5]);
  habitatElement?.style.setProperty("--environment-land", palette[2]);
  habitatElement?.style.setProperty("--environment-ground", palette[3]);
  habitatElement?.style.setProperty("--environment-water", palette[4]);
  habitatElement?.style.setProperty("--environment-detail", palette[6]);

  if (profile.id === "bristol-garden-gorge") {
    drawBristolScene(target, palette);
    return;
  }
  if (profile.id === "santeuil-viosne-vexin") {
    drawSanteuilScene(target, palette);
    return;
  }
  if (profile.id === "edinburgh-midmar-blackford") {
    drawEdinburghScene(target, palette);
    return;
  }
  if (profile.id === "tenerife-puerto-cruz-botanic") {
    drawTenerifeScene(target, palette);
    return;
  }

  append(target, "rect", { class: "environment-sky", width: 600, height: 430, fill: palette[0] });
  drawWeather(target, profile.weather, palette);
  append(target, "path", { class: "environment-far", d: ridgePath(profile.ridge), fill: palette[1] });
  append(target, "path", { class: "environment-composition-middle", d: sceneComposition.middle, fill: palette[2] });
  if (profile.near) append(target, "path", { class: "environment-near", d: ridgePath(profile.near), fill: palette[2] });
  drawWater(target, profile.water, palette);
  append(target, "path", { class: "environment-ground environment-composition-ground", d: sceneComposition.ground, fill: palette[3] });
  if (sceneComposition.route) append(target, "path", { class: "environment-composition-route", d: sceneComposition.route });
  sceneComposition.cueOrder.map(index => profile.cues[index]).filter(Boolean).forEach(cue => drawFeature(target, cue));
  const foreground = append(target, "g", { class: "environment-composition-foreground" });
  sceneComposition.foreground.forEach(cue => drawFeature(foreground, cue));
}
