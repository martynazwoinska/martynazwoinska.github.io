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
  uplandForest: ["#d4e1dc", "#789184", "#456e57", "#664938", "#83aaa4", "#c9a45a", "#314c43"],
  dryGarden: ["#e6dfcf", "#a69b74", "#73805b", "#79654a", "#91aaa0", "#c39a52", "#4b5143"],
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
    "kauai-kokee-upland-forest", "Kōkeʻe upland forest floor",
    "XZ1516 was collected at 983 m from rotting nut, pod, seed or fruit. The misty Kōkeʻe upland forest is wider regional context, not a recorded collection viewpoint or identified host plant.",
    "CaeNDR XZ1516 isotype record", "https://caendr.org/isotype/XZ1516/",
    palettes.uplandForest, [[0, 272], [80, 244], [160, 257], [242, 219], [320, 238], [404, 208], [486, 246], [600, 224]],
    { weather: "mist", cues: [] }
  ),
  "tropicalis::Kauaʻi, Hawaiʻi": profile(
    "kauai-hanalei-valley", "Hanalei valley wetlands",
    "This C. tropicalis marker lies near Hanalei, where waterfall-draped north-shore mountains frame river wetlands and long-established kalo agriculture.",
    "USFWS Hanalei National Wildlife Refuge", "https://www.fws.gov/refuge/hanalei",
    palettes.island, [[0, 296], [64, 254], [118, 266], [176, 198], [236, 246], [306, 166], [372, 238], [438, 190], [506, 256], [552, 228], [600, 282]],
    { water: "river", weather: "rain", cues: [["taro", 92, 342, .82], ["waterfall", 308, 192, .74], ["paddy", 476, 346, .78]] }
  ),
  "Australian Capital Territory": profile(
    "canberra-oconnor-fig-garden", "O'Connor backyard figs and dry ridge",
    "This marker represents QG2811. Its figs were collected in an anonymised O'Connor backyard on 22 March 2017; a hermaphrodite was recovered through a Baermann funnel on 2 April. O'Connor Ridge, a Yellow Box-like crown and the tiny Black Mountain cue are wider neighbourhood context.",
    "CaeNDR QG2811 isotype record", "https://caendr.org/isotype/QG2811/",
    palettes.dryGarden, [[0, 259], [78, 249], [155, 253], [232, 236], [310, 247], [390, 229], [468, 244], [540, 232], [600, 241]],
    { weather: "sun", cues: [] }
  ),
  "Auckland, New Zealand": profile(
    "auckland-eca36-garden-grass", "Auckland garden grass and volcanic field",
    "ECA36 came from garden grass in an anonymised Auckland urban garden. The two low volcanic-field shoulders and tiny Sky Tower cue are wider regional context, not a recorded collection view or evidence of local adaptation.",
    "CaeNDR ECA36 isotype record", "https://caendr.org/isotype/ECA36/",
    palettes.temperate, [[0, 256], [77, 229], [154, 246], [239, 257], [329, 235], [421, 247], [505, 226], [600, 246]],
    { weather: "cloud", cues: [] }
  ),
  "Araucanía, Chile": profile(
    "cunco-ju4400-compost-garden", "Compost in a rural garden near Cunco",
    "JU4400, formerly Ch41.7, was collected from compost in a rural garden in Cunco. The anonymised beds, path and fence are restrained garden context; the tiny cloud-softened Llaima double summit is wider regional orientation, not a recorded collection-site view.",
    "CaeNDR JU4400 isotype record", "https://caendr.org/isotype/JU4400/",
    palettes.temperate, [[0, 252], [82, 239], [165, 248], [247, 232], [330, 241], [415, 224], [500, 238], [600, 222]],
    { weather: "cloud", cues: [] }
  ),
  "Trivandrum, Kerala · JU1325": profile(
    "trivandrum-zoo-botanical-garden", "JU1325 flower-and-leaf garden slope",
    "JU1325, the C. nigoni type isolate, was collected from rotting flowers and leaves in Trivandrum's Zoo/Botanical Garden. The wooded lake edge, rising paths, golden bamboo and partly screened museum roof are wider campus context, not the recorded sampling point.",
    "CGC JU1325 strain record", "https://cgc.umn.edu/strain/JU1325",
    palettes.rainforest, [[0, 270], [80, 249], [155, 260], [235, 232], [315, 243], [398, 214], [482, 230], [600, 205]],
    { weather: "cloud", cues: [] }
  ),
  "Singapore · ZF1220": profile(
    "singapore-zf1220-starfruit-garden", "ZF1220 rotten starfruit and planted tropical garden",
    "ZF1220, also known as SF0, was collected from rotten starfruit in Singapore. The record gives no exact address or landscape, so the planted tropical path and narrow city gap are wider regional context, not a claimed collection site.",
    "Félix Lab ZF1220 record", "https://www.justbio.com/tools/worms/details.php?strain_id=333574",
    palettes.rainforest, [[0, 265], [82, 246], [161, 257], [242, 231], [325, 242], [408, 218], [493, 235], [600, 209]],
    { weather: "cloud", cues: [] }
  ),
  "Praslin, Seychelles · YR106": profile(
    "praslin-yr106-granitic-palm-forest", "YR106 in regional Praslin palm-forest context",
    "YR106, also known as PR3, is recorded only at island level on Praslin; its exact point, date, elevation, substrate and microhabitat are unreported. The enclosed granitic palm forest is wider regional context, not a claimed collection site.",
    "Félix Lab YR106 record", "https://www.justbio.com/tools/worms/details.php?strain_id=333579",
    palettes.rainforest, [[0, 217], [76, 201], [151, 214], [231, 186], [311, 205], [392, 181], [474, 199], [545, 181], [600, 194]],
    { weather: "mist", cues: [] }
  ),
  "São Tomé · JU2484": profile(
    "sao-tome-ju2484-forest-floor", "JU2484 forest-floor fruit microhabitat",
    "JU2484, formerly Goy1, was sampled by Rémy Froissart on 28 February 2013 from rotten unidentified fruit on the ground in forest on São Tomé; Lise Frézal isolated it as an isofemale line. The exact site, elevation and fruit identity are unreported.",
    "Worldwide Worms/Félix JU2484 record", "https://www.justbio.com/tools/worldwideworms/search.php?selector=strain&select=JU2484",
    palettes.rainforest, [[0, 212], [74, 194], [149, 208], [225, 177], [304, 199], [382, 174], [461, 196], [535, 171], [600, 188]],
    { weather: "cloud", cues: [] }
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
  "Pohnpei, Micronesia · QG4739": profile(
    "pohnpei-qg4739-paies-kotop-cloudforest", "QG4739 Paies kotop-fruit cloudforest",
    "QG4739, previously C-0230F, is one of seven isotype-reference strains collected at the same Paies, Kitti coordinate. It was sampled from rotting fruit recorded by CaeNDR as Clinostigma ponapensis, locally called kotop, in cloudforest on 7 December 2023. Kew accepts the palm name as C. ponapense. CaeNDR reports 540 m in the isotype summary and 542 m in the sampling comment. Fruit appearance, exact placement and collection-patch geometry are illustrative.",
    "CaeNDR QG4739 isotype record", "https://caendr.org/isotype/QG4739/",
    palettes.rainforest, [[0, 351], [74, 339], [148, 325], [224, 307], [300, 285], [376, 260], [452, 235], [526, 210], [600, 188]],
    { water: "none", weather: "mist", cues: [] }
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
  "kauai-kokee-upland-forest": composition(
    "M0 304Q91 280 184 300Q280 322 377 294Q482 264 600 292V430H0Z",
    "M0 238Q98 203 190 228Q293 258 392 220Q493 184 600 216V332H0Z",
    [["fern", 41, 386, .86], ["forest", 560, 365, .72]],
    "M320 211C246 247 371 278 301 323C253 354 347 382 391 430", [],
    "a left-leaning canopy and forked right trunk framing one S-shaped path that disappears into fog"
  ),
  "kauai-hanalei-valley": composition(
    "M0 367 H98 L121 348 H229 L250 375 H374 L397 348 H510 L531 369 H600 V430 H0Z",
    "M0 302 Q87 257 169 303 Q254 346 337 299 Q427 249 514 301 L600 322 V430 H0Z",
    [["taro", 45, 394, .78], ["paddy", 528, 388, .72]],
    "M0 408 Q116 369 230 397 Q344 425 454 377 Q529 345 600 361", [1, 0, 2],
    "a broad wet amphitheatre with kalo plots and several waterfall curtains"
  ),
  "canberra-oconnor-fig-garden": composition(
    "M0 285Q96 267 190 282Q288 301 385 276Q482 250 600 269V430H0Z",
    "M0 249Q90 235 177 247Q270 260 357 240Q459 216 600 235V306H0Z",
    [],
    "M76 322Q192 304 302 319Q425 335 552 303", [],
    "an asymmetric pair of collapsed figs below a broken garden edge, one broad open eucalypt crown and a low ridge with a tiny offset tower"
  ),
  "auckland-eca36-garden-grass": composition(
    "M0 302Q78 282 158 299Q244 319 326 296Q422 269 513 292Q556 304 600 294V430H0Z",
    "M0 258Q84 240 168 254Q253 267 338 246Q428 225 514 244Q558 254 600 248V324H0Z",
    [],
    "M84 328Q197 306 305 324Q422 343 548 311", [],
    "two unequal grass-litter folds below a broken fence and roofline, two low separated volcanic shoulders and one hairline city needle"
  ),
  "cunco-ju4400-compost-garden": composition(
    "M0 319Q92 297 181 314Q279 334 371 305Q470 276 600 300V430H0Z",
    "M0 250Q91 232 179 245Q273 260 363 238Q461 215 600 231V326H0Z",
    [],
    "M83 286Q203 293 313 310Q432 326 548 347", [],
    "an irregular layered compost crescent below one diagonal fence, unequal garden beds, low foothills and a tiny far-right double summit softened by cloud"
  ),
  "trivandrum-zoo-botanical-garden": composition(
    "M0 338Q98 318 190 334Q286 353 376 321Q475 286 600 307V430H0Z",
    "M0 264Q83 239 166 253Q253 267 337 235Q426 201 512 218Q560 226 600 211V328H0Z",
    [],
    "M274 430Q247 385 273 348Q300 312 285 277Q270 249 305 224", [],
    "a collapsed flower-and-leaf bundle below a curved lake, with tiered paths climbing between a bamboo fan and partly hidden museum roof"
  ),
  "singapore-zf1220-starfruit-garden": composition(
    "M0 333Q92 311 184 326Q282 344 377 314Q478 282 600 304V430H0Z",
    "M0 254Q79 226 155 244Q237 262 316 233Q403 201 479 219Q544 233 600 207V326H0Z",
    [],
    "M286 430Q252 390 278 350Q305 311 292 273Q280 239 320 211", [],
    "one softened five-ridged starfruit and detached star section below a drooping pinnate bough, with an S-curving planted path ending in one narrow urban opening"
  ),
  "praslin-yr106-granitic-palm-forest": composition(
    "M0 321Q84 299 166 316Q255 336 343 306Q442 272 518 293Q562 306 600 292V430H0Z",
    "M0 230Q73 202 145 219Q222 238 292 207Q370 173 449 193Q526 211 600 180V326H0Z",
    [],
    "M527 430Q489 390 454 349Q422 311 374 278", [],
    "an off-centre cleft granite boulder and diagonal boulder-choked drainage thread beneath two unequal giant fan rosettes forming a closed palm vault"
  ),
  "sao-tome-ju2484-forest-floor": composition(
    "M0 327Q87 303 171 326Q258 350 347 320Q451 285 530 309Q568 319 600 311V430H0Z",
    "M0 221Q67 187 137 208Q207 230 271 192Q341 152 409 179Q487 208 548 171Q575 154 600 163V329H0Z",
    [],
    "M67 430Q96 332 127 252Q158 171 193 111L257 57", [],
    "an anonymous collapsed fruit below one left-offset diagonal forked trunk, opposed by unequal fern and liana layers and a single asymmetric begonia cue beneath a fully closed canopy"
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
  "pohnpei-qg4739-paies-kotop-cloudforest": composition(
    "M0 355Q95 347 181 331Q284 311 381 277Q485 238 600 191V430H0Z",
    "M0 300Q97 287 188 272Q289 252 387 220Q492 184 600 145V328H0Z",
    [],
    "M39 370Q151 344 272 305Q398 264 557 196", [],
    "a pale ringed palm column opening into an asymmetric lower-left root lattice beside one low softened fruit sample, with a steep forest-floor diagonal closing into layered trunks, oblique mist and one narrow upper-right light slit"
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
  if (["palm", "coconut", "pandanus", "fanpalm"].includes(kind)) {
    drawPalm(group, kind === "fanpalm");
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
  append(target, "path", { class: "bristol-gorge-rim", d: "M0 124Q48 103 98 131Q141 149 176 188Q205 222 231 273M600 132Q553 111 512 145Q469 176 445 226Q435 247 426 267" });
  append(target, "path", { class: "bristol-cliff-face left", d: "M130 154L167 181L181 223L210 248L232 317L257 430H207L179 350L151 313L146 248L111 211Z" });
  append(target, "path", { class: "bristol-cliff-face right", d: "M487 164L454 205L446 255L418 287L386 374L369 430H430L455 353L482 321L487 263L520 211Z" });
  append(target, "path", { class: "bristol-cliff-outline", d: "M130 154L167 181L181 223L210 248M111 211L146 248L151 313M487 164L454 205L446 255L430 275M520 211L487 263L482 321" });
  append(target, "path", { class: "bristol-cliff-strata", d: "M142 184L171 203L183 245M119 274L132 291L126 315M482 190L466 215L471 235M463 242L458 257M536 278L522 294L527 307M548 324L531 344L536 360" });

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
  append(wall, "path", { d: "M478 370Q536 342 600 352V430H445Z" });
  [390, 414].forEach((y, row) => append(wall, "path", { class: "bristol-brick-line", d: `M${470 - row * 3} ${y}Q536 ${y - 12} 600 ${y - 6}` }));
  [526, 574].forEach((x, index) => append(wall, "path", { class: "bristol-brick-line", d: `M${x} ${354 + index * 3}L${x - 6} 430` }));

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

function drawKauaiFern(parent, x, y, scale, direction = 1) {
  const fern = append(parent, "g", {
    class: "kauai-kokee-fern",
    transform: `translate(${x} ${y}) scale(${(scale * direction).toFixed(2)} ${scale.toFixed(2)})`
  });
  append(fern, "path", { class: "kauai-kokee-fern-stem", d: "M0 34Q9 2 4-36Q1-62 13-88" });
  [[2,20,28,2], [5,7,34,-7], [6,-7,31,-18], [7,-21,27,-30], [8,-35,22,-43], [10,-49,17,-58], [12,-62,12,-70]].forEach(([cx, cy, length, tipY], index) => {
    append(fern, "path", {
      class: index % 2 ? "kauai-kokee-fern-frond deep" : "kauai-kokee-fern-frond",
      d: `M${cx} ${cy}Q${cx - length * .55} ${cy - 11} ${cx - length} ${tipY}Q${cx - length * .45} ${cy + 5} ${cx} ${cy}ZM${cx + 1} ${cy - 2}Q${cx + length * .55} ${cy - 15} ${cx + length} ${tipY - 5}Q${cx + length * .5} ${cy + 3} ${cx + 1} ${cy - 2}Z`
    });
  });
}

function drawKauaiKokeeScene(target, palette) {
  append(target, "rect", { class: "environment-sky kauai-kokee-sky", width: 600, height: 430, fill: palette[0] });

  const ridge = append(target, "g", { class: "kauai-kokee-mist-lock", "aria-hidden": "true" });
  append(ridge, "path", { class: "kauai-kokee-broken-ridge", d: "M0 192Q71 174 138 190Q211 208 278 181Q347 157 414 180Q493 204 600 164V251H0Z" });
  append(ridge, "path", { class: "kauai-kokee-fog back", d: "M0 107Q94 89 188 105Q282 121 374 99Q472 76 600 101V172Q500 151 400 169Q297 188 196 164Q98 142 0 162Z" });
  append(ridge, "path", { class: "kauai-kokee-fog front", d: "M0 151Q105 130 205 153Q305 176 406 149Q503 122 600 142V209Q503 190 410 211Q304 235 200 207Q97 179 0 200Z" });

  const distantForest = append(target, "g", { class: "kauai-kokee-distant-forest", "aria-hidden": "true" });
  [32, 87, 146, 211, 395, 452, 518, 574].forEach((x, index) => {
    const height = 63 + (index % 3) * 16;
    append(distantForest, "path", { class: "kauai-kokee-distant-trunk", d: `M${x - 4} 253Q${x - 8} ${222 - height * .25} ${x + (index % 2 ? 7 : -5)} ${253 - height}L${x + 9} ${253 - height + 2}Q${x + 3} ${224 - height * .2} ${x + 5} 255Z` });
    append(distantForest, "path", { class: "kauai-kokee-distant-crown", d: `M${x - 38} ${205 - height * .62}Q${x - 29} ${178 - height * .58} ${x - 8} ${190 - height * .64}Q${x + 7} ${165 - height * .55} ${x + 25} ${190 - height * .59}Q${x + 46} ${183 - height * .47} ${x + 42} ${211 - height * .51}Q${x + 9} ${226 - height * .45} ${x - 38} ${205 - height * .62}Z` });
  });

  append(target, "path", { class: "kauai-kokee-ground", d: "M0 230Q98 205 194 230Q294 258 393 226Q493 195 600 218V430H0Z" });
  append(target, "path", { class: "kauai-kokee-path", d: "M311 205C282 226 259 244 282 261C318 285 337 299 305 319C268 343 272 378 300 430H423C388 379 348 358 355 333C364 306 386 286 350 267C322 251 327 226 325 205Z" });
  append(target, "path", { class: "kauai-kokee-path-edge", d: "M311 205C282 226 259 244 282 261C318 285 337 299 305 319C268 343 272 378 300 430M325 205C327 226 322 251 350 267C386 286 364 306 355 333C348 358 388 379 423 430" });

  const leftTree = append(target, "g", { class: "kauai-kokee-left-tree", "aria-hidden": "true" });
  append(leftTree, "path", { class: "kauai-kokee-tree-trunk", d: "M19 344Q49 270 37 203Q24 140 34 64L66 66Q61 132 80 190Q104 264 83 351Z" });
  append(leftTree, "path", { class: "kauai-kokee-tree-branch", d: "M43 178Q76 118 132 92Q172 72 209 82L205 108Q165 105 132 127Q94 151 72 214Z" });
  append(leftTree, "path", { class: "kauai-kokee-left-canopy", d: "M0 0H225Q238 29 214 48Q229 78 198 91Q174 115 143 99Q115 120 88 101Q58 115 38 91Q7 93 0 66Z" });
  [[43,55,33,17,-17],[96,38,42,20,8],[151,43,40,19,-8],[197,55,34,17,15],[71,88,35,17,12],[137,81,39,18,-12]].forEach(([cx, cy, rx, ry, angle], index) => {
    append(leftTree, "ellipse", { class: index % 2 ? "kauai-kokee-canopy-leaf deep" : "kauai-kokee-canopy-leaf", cx, cy, rx, ry, transform: `rotate(${angle} ${cx} ${cy})` });
  });

  const rightTree = append(target, "g", { class: "kauai-kokee-right-tree", "aria-hidden": "true" });
  append(rightTree, "path", { class: "kauai-kokee-tree-trunk forked", d: "M486 430Q507 337 501 263Q498 213 468 174L489 148Q519 179 532 219Q546 169 568 112L592 125Q568 188 557 246Q562 336 586 430Z" });
  append(rightTree, "path", { class: "kauai-kokee-tree-branch fork-left", d: "M509 231Q472 165 425 130L438 109Q491 142 531 198Z" });
  append(rightTree, "path", { class: "kauai-kokee-tree-branch fork-right", d: "M542 196Q555 122 600 74V115Q574 151 558 224Z" });
  append(rightTree, "path", { class: "kauai-kokee-right-canopy", d: "M392 70Q421 39 454 58Q478 28 510 52Q539 21 571 50Q600 30 600 30V134Q570 148 546 128Q516 151 488 126Q458 145 436 119Q404 125 386 101Z" });
  [[421,90,27,14,-15],[464,71,34,16,9],[515,69,35,17,-8],[562,83,32,16,14],[489,112,31,15,-13],[548,119,30,14,8]].forEach(([cx, cy, rx, ry, angle], index) => {
    append(rightTree, "ellipse", { class: index % 2 ? "kauai-kokee-canopy-leaf deep" : "kauai-kokee-canopy-leaf", cx, cy, rx, ry, transform: `rotate(${angle} ${cx} ${cy})` });
  });

  const fernBank = append(target, "g", { class: "kauai-kokee-fern-bank", "aria-hidden": "true" });
  drawKauaiFern(fernBank, 48, 336, .82, 1);
  drawKauaiFern(fernBank, 112, 350, .68, -1);
  drawKauaiFern(fernBank, 162, 344, .57, 1);
  drawKauaiFern(fernBank, 449, 335, .59, -1);
  drawKauaiFern(fernBank, 589, 354, .72, -1);

  const litter = append(target, "g", { class: "kauai-kokee-leaf-litter", "aria-hidden": "true" });
  [[14,406,47,389],[61,426,94,403],[190,414,224,393],[236,428,271,405],[401,416,434,393],[454,429,489,404],[531,411,565,389]].forEach(([x1,y1,x2,y2], index) => {
    append(litter, "path", { class: index % 3 === 0 ? "kauai-kokee-litter-leaf damp" : "kauai-kokee-litter-leaf", d: `M${x1} ${y1}Q${(x1+x2)/2} ${Math.min(y1,y2)-11-index%2*2} ${x2} ${y2}Q${(x1+x2)/2} ${Math.max(y1,y2)+8} ${x1} ${y1}Z` });
    append(litter, "path", { class: "kauai-kokee-litter-vein", d: `M${x1+4} ${y1-1}L${x2-4} ${y2+1}` });
  });

  const substrate = append(target, "g", { class: "kauai-kokee-decay-substrate", transform: "translate(122 374) rotate(-5)", "aria-hidden": "true" });
  append(substrate, "ellipse", { class: "kauai-kokee-substrate-shadow", cx: -1, cy: 34, rx: 102, ry: 20 });
  append(substrate, "path", { class: "kauai-kokee-substrate-shell", d: "M-96 14L-77-27L-40-39L-14-19L21-35L61-18L91 12L71 43L28 36L-9 50L-50 37L-82 46Z" });
  append(substrate, "path", { class: "kauai-kokee-substrate-soft", d: "M-77 10L-61-16L-36-23L-12-7L20-21L49-10L70 12L55 29L25 24L-7 36L-39 25L-65 31Z" });
  append(substrate, "path", { class: "kauai-kokee-substrate-split", d: "M-39-22Q-22-5-29 23M-14-8Q7 4-2 34M23-20Q39-2 30 25" });
  [[-68,3,5],[-49,21,4],[-19,8,3],[9,26,5],[39,-4,4],[55,18,3]].forEach(([cx, cy, r], index) => append(substrate, "circle", { class: index % 2 ? "kauai-kokee-decay-pore deep" : "kauai-kokee-decay-pore", cx, cy, r }));
  append(substrate, "path", { class: "kauai-kokee-moisture-glint", d: "M-55-11Q-40-20-25-12M31-8Q43-14 54-6M-6 25Q5 18 17 23" });
}

function drawCanberraOConnorScene(target, palette) {
  append(target, "rect", { class: "environment-sky canberra-oconnor-sky", width: 600, height: 430, fill: palette[0] });
  append(target, "circle", { class: "canberra-oconnor-sun", cx: 82, cy: 65, r: 25 });

  const ridge = append(target, "g", { class: "canberra-oconnor-ridge-lock", "aria-hidden": "true" });
  append(ridge, "path", { class: "canberra-oconnor-ridge", d: "M0 226Q72 205 145 219Q218 233 288 212Q365 189 438 207Q514 225 600 196V273H0Z" });
  append(ridge, "path", { class: "canberra-oconnor-ridge-detail", d: "M0 232Q74 214 144 227M177 225Q231 234 290 219M333 207Q386 196 438 214M477 215Q538 211 600 204" });
  const ridgeTrees = append(ridge, "g", { class: "canberra-oconnor-ridge-trees" });
  [[24,221,13],[66,212,10],[112,217,14],[170,222,9],[214,217,12],[277,211,9],[325,205,13],[372,201,10],[438,208,13],[485,211,9],[536,202,12],[580,195,10]].forEach(([x, y, r], index) => {
    append(ridgeTrees, "path", { class: index % 2 ? "canberra-ridge-tree deep" : "canberra-ridge-tree", d: `M${x} ${y + 20}V${y - 2}M${x - r} ${y + 2}Q${x} ${y - r} ${x + r} ${y + 2}Q${x + 5} ${y + 10} ${x} ${y + 8}Q${x - 6} ${y + 11} ${x - r} ${y + 2}Z` });
  });

  const tower = append(target, "g", { class: "canberra-oconnor-black-mountain-cue", transform: "translate(518 170)", "aria-hidden": "true" });
  append(tower, "path", { class: "canberra-tower-mast", d: "M0 38L2-12L5 38M1-4L-7 7M3 5L11 15" });
  append(tower, "path", { class: "canberra-tower-platform", d: "M-8 17H12M-5 27H9" });
  append(tower, "circle", { class: "canberra-tower-tip", cx: 2, cy: -14, r: 2.4 });

  append(target, "path", { class: "canberra-garden-ground", d: "M0 243Q102 227 201 244Q303 264 403 238Q500 213 600 234V430H0Z" });

  const fragments = append(target, "g", { class: "canberra-backyard-fragments", "aria-hidden": "true" });
  append(fragments, "path", { class: "canberra-roof-fragment", d: "M0 225L42 205L96 220L112 238H0Z" });
  append(fragments, "path", { class: "canberra-roof-seam", d: "M13 224L43 211L80 220M46 211L58 232" });
  append(fragments, "path", { class: "canberra-fence-rail", d: "M12 266L176 258M18 291L166 279M472 260L600 246M478 286L600 272" });
  [[21,250,302],[72,247,296],[126,247,288],[171,246,284],[480,242,295],[532,238,288],[585,229,280]].forEach(([x, top, bottom]) => {
    append(fragments, "path", { class: "canberra-fence-post", d: `M${x} ${top}L${x + (x % 2 ? 3 : -2)} ${bottom}` });
  });

  const tree = append(target, "g", { class: "canberra-yellow-box", "aria-hidden": "true" });
  append(tree, "path", { class: "canberra-yellow-box-trunk", d: "M401 340Q421 286 414 235Q407 190 421 132L446 137Q438 190 452 225Q470 272 462 342Z" });
  append(tree, "path", { class: "canberra-yellow-box-branch", d: "M425 222Q383 172 331 159L337 140Q395 146 438 190ZM440 194Q472 148 528 132L535 151Q489 167 451 226ZM430 174Q423 132 391 105L407 93Q443 123 449 167Z" });
  const crown = append(tree, "g", { class: "canberra-yellow-box-crown" });
  [[337,137,44,22,-13],[386,106,48,24,10],[449,104,52,25,-8],[510,130,46,23,14],[371,167,38,19,8],[465,159,42,21,-12],[546,165,34,17,9]].forEach(([cx, cy, rx, ry, angle], index) => {
    append(crown, "ellipse", { class: index % 2 ? "canberra-yellow-box-leaves deep" : "canberra-yellow-box-leaves", cx, cy, rx, ry, transform: `rotate(${angle} ${cx} ${cy})` });
  });

  const stones = append(target, "g", { class: "canberra-stepping-stones", "aria-hidden": "true" });
  [[344,252,37,12,-8],[327,286,43,14,6],[303,327,51,16,-5],[282,373,61,18,7]].forEach(([cx, cy, rx, ry, angle], index) => {
    append(stones, "ellipse", { class: index % 2 ? "canberra-step-stone deep" : "canberra-step-stone", cx, cy, rx, ry, transform: `rotate(${angle} ${cx} ${cy})` });
  });

  const edge = append(target, "g", { class: "canberra-broken-garden-edge", "aria-hidden": "true" });
  append(edge, "path", { class: "canberra-edge-earth", d: "M0 330Q61 311 119 325L173 309L232 323L281 311L307 332L255 346L192 335L137 350L74 338L0 352Z" });
  [[12,326,67,337],[80,322,132,334],[145,316,194,329],[207,318,258,331]].forEach(([x1,y1,x2,y2], index) => {
    append(edge, "path", { class: index % 2 ? "canberra-edge-stone deep" : "canberra-edge-stone", d: `M${x1} ${y1}Q${(x1+x2)/2} ${y1-9-index*2} ${x2} ${y2}L${x2-7} ${y2+11}Q${(x1+x2)/2} ${y2+5} ${x1+4} ${y1+10}Z` });
  });

  const litter = append(target, "g", { class: "canberra-fig-litter", "aria-hidden": "true" });
  append(litter, "path", { class: "canberra-decay-patch", d: "M35 372Q92 337 157 354Q211 333 272 357Q323 376 295 413Q239 432 176 416Q111 433 49 411Q20 397 35 372Z" });
  [[44,403,76,386],[91,421,125,399],[188,423,222,402],[253,414,285,391],[298,425,334,406]].forEach(([x1,y1,x2,y2], index) => {
    append(litter, "path", { class: index % 2 ? "canberra-litter-leaf deep" : "canberra-litter-leaf", d: `M${x1} ${y1}Q${(x1+x2)/2} ${Math.min(y1,y2)-9} ${x2} ${y2}Q${(x1+x2)/2} ${Math.max(y1,y2)+7} ${x1} ${y1}Z` });
    append(litter, "path", { class: "canberra-litter-vein", d: `M${x1+4} ${y1-1}L${x2-4} ${y2+1}` });
  });

  const splitFig = append(target, "g", { class: "canberra-rotten-fig split", transform: "translate(125 380) rotate(-8)", "aria-hidden": "true" });
  append(splitFig, "ellipse", { class: "canberra-fig-shadow", cx: 2, cy: 28, rx: 69, ry: 16 });
  append(splitFig, "path", { class: "canberra-fig-rind", d: "M-67 8Q-62-24-30-35Q-5-42 10-20Q25-40 53-28Q73-17 68 9Q60 34 31 40Q7 44-7 29Q-29 46-52 31Q-69 24-67 8Z" });
  append(splitFig, "path", { class: "canberra-fig-flesh", d: "M-54 7Q-48-16-26-24Q-8-30 3-14Q16-29 39-20Q55-12 52 7Q45 24 25 28Q7 31-4 20Q-22 33-39 23Q-54 19-54 7Z" });
  append(splitFig, "path", { class: "canberra-fig-cleft", d: "M6-18Q-3-3 2 22M13-20Q21-2 12 25" });
  [[-37,3],[-26,14],[-15,-7],[-4,9],[19,-7],[28,10],[40,1]].forEach(([cx, cy], index) => append(splitFig, "ellipse", { class: index % 2 ? "canberra-fig-seed deep" : "canberra-fig-seed", cx, cy, rx: 2.4, ry: 4, transform: `rotate(${index % 2 ? 28 : -24} ${cx} ${cy})` }));

  const saggedFig = append(target, "g", { class: "canberra-rotten-fig sagged", transform: "translate(239 390) rotate(7)", "aria-hidden": "true" });
  append(saggedFig, "ellipse", { class: "canberra-fig-shadow", cx: 0, cy: 23, rx: 58, ry: 14 });
  append(saggedFig, "path", { class: "canberra-fig-rind sagged", d: "M-57 7Q-50-18-25-28Q-5-36 6-20Q20-31 43-19Q60-8 55 12Q46 34 18 35Q-2 37-15 27Q-34 37-50 25Q-60 18-57 7Z" });
  append(saggedFig, "path", { class: "canberra-fig-collapse", d: "M-43 8Q-22-5-4 12Q14-3 42 9Q29 27 7 24Q-16 31-43 8Z" });
  append(saggedFig, "path", { class: "canberra-fig-crease", d: "M-32-8Q-13 1-18 22M7-15Q22-2 17 22M34-7Q44 3 35 17" });
  [[-39,9],[-24,-10],[-7,16],[13,-8],[30,8],[43,0]].forEach(([cx, cy], index) => append(saggedFig, "circle", { class: index % 2 ? "canberra-fig-mottle deep" : "canberra-fig-mottle", cx, cy, r: index % 3 === 0 ? 3.5 : 2.5 }));
}

function drawAucklandGardenGrassScene(target, palette) {
  append(target, "rect", { class: "environment-sky auckland-garden-sky", width: 600, height: 430, fill: palette[0] });

  const clouds = append(target, "g", { class: "auckland-garden-clouds", "aria-hidden": "true" });
  append(clouds, "path", { d: "M24 80Q52 49 87 69Q111 40 151 67Q181 62 199 88H24Z" });
  append(clouds, "path", { d: "M355 71Q382 48 411 65Q438 36 474 63Q505 58 526 82H355Z" });

  const shoulders = append(target, "g", { class: "auckland-volcanic-field-lock", "aria-hidden": "true" });
  append(shoulders, "path", { class: "auckland-volcanic-shoulder left", d: "M0 240Q58 210 123 214Q176 216 225 244V286H0Z" });
  append(shoulders, "path", { class: "auckland-volcanic-shoulder right", d: "M319 251Q376 224 435 229Q505 230 600 204V287H319Z" });
  append(shoulders, "path", { class: "auckland-volcanic-contour", d: "M0 246Q61 220 124 223Q178 224 221 250M328 256Q379 234 437 237Q508 238 600 213" });

  const tower = append(target, "g", { class: "auckland-sky-tower-cue", transform: "translate(483 177)", "aria-hidden": "true" });
  append(tower, "path", { class: "auckland-sky-tower-mast", d: "M0 50L2-21L5 50M2-18L-2-7M4-9L9 2" });
  append(tower, "ellipse", { class: "auckland-sky-tower-deck", cx: 3, cy: 8, rx: 8, ry: 3.2 });
  append(tower, "path", { class: "auckland-sky-tower-spire", d: "M3-20V-33" });

  const garden = append(target, "g", { class: "auckland-anonymised-garden", "aria-hidden": "true" });
  append(garden, "path", { class: "auckland-garden-ground", d: "M0 260Q92 245 181 259Q279 275 369 253Q466 230 600 249V430H0Z" });
  append(garden, "path", { class: "auckland-roof-fragment left", d: "M0 239L38 217L83 229L111 255H0Z" });
  append(garden, "path", { class: "auckland-roof-fragment right", d: "M518 244L551 223L600 236V260H511Z" });
  append(garden, "path", { class: "auckland-roof-seam", d: "M9 237L39 222L72 230M542 230L568 241" });
  append(garden, "path", { class: "auckland-hedge", d: "M0 262Q21 240 45 256Q65 231 94 253Q119 239 142 265L144 300H0ZM451 260Q477 238 499 257Q522 232 550 255Q575 238 600 260V298H450Z" });
  append(garden, "path", { class: "auckland-hedge-detail", d: "M14 267Q42 248 68 267M76 267Q106 247 133 272M465 269Q492 249 518 270M526 268Q556 246 588 269" });

  const fence = append(garden, "g", { class: "auckland-broken-fence" });
  append(fence, "path", { class: "auckland-fence-rail", d: "M101 270L231 260M107 292L173 280M185 279L239 276M374 265L463 252M382 292L423 281M437 274L476 267" });
  [[108,252,308],[154,258,300],[215,249,296],[383,253,304],[425,247,292],[468,240,288]].forEach(([x, top, bottom], index) => {
    append(fence, "path", { class: index % 2 ? "auckland-fence-post deep" : "auckland-fence-post", d: `M${x} ${top}L${x + (index % 2 ? 4 : -3)} ${bottom}` });
  });

  const edge = append(target, "g", { class: "auckland-garden-edge", "aria-hidden": "true" });
  append(edge, "path", { class: "auckland-edge-earth", d: "M0 323Q72 304 144 321L216 306L286 323L357 304L427 318L500 301L600 318V348Q519 331 449 348L373 334L301 350L225 334L152 347L75 334L0 351Z" });
  [[15,319,72,330],[84,315,140,326],[154,316,211,327],[296,316,350,327],[364,311,418,323],[443,310,499,320],[514,309,575,322]].forEach(([x1,y1,x2,y2], index) => {
    append(edge, "path", { class: index % 2 ? "auckland-edge-stone deep" : "auckland-edge-stone", d: `M${x1} ${y1}Q${(x1+x2)/2} ${y1-8-index%3} ${x2} ${y2}L${x2-7} ${y2+10}Q${(x1+x2)/2} ${y2+5} ${x1+4} ${y1+10}Z` });
  });

  const pavers = append(target, "g", { class: "auckland-offset-pavers", "aria-hidden": "true" });
  [[302,270,34,10,-6],[282,298,38,11,7],[309,329,43,12,-5],[276,364,49,14,8],[317,404,57,16,-7]].forEach(([cx, cy, rx, ry, angle], index) => {
    append(pavers, "ellipse", { class: index % 2 ? "auckland-paver deep" : "auckland-paver", cx, cy, rx, ry, transform: `rotate(${angle} ${cx} ${cy})` });
  });

  const tangled = append(target, "g", { class: "auckland-grass-litter-patch tangled", transform: "translate(119 375) rotate(-4)", "aria-hidden": "true" });
  append(tangled, "ellipse", { class: "auckland-grass-shadow", cx: 0, cy: 28, rx: 108, ry: 24 });
  append(tangled, "path", { class: "auckland-grass-underside", d: "M-101 20Q-77-13-45 2Q-24-30 8-8Q32-31 58-7Q89-14 105 15Q77 39 43 31Q11 48-19 33Q-52 46-82 32Z" });
  append(tangled, "path", { class: "auckland-grass-fold", d: "M-92 8Q-61-20-30-4Q-6-28 19-9Q44-27 73-5Q91 6 99 19Q67 12 45 27Q15 8-8 27Q-36 10-62 28Q-84 23-92 8Z" });
  [[-81,17,-95,-37],[-66,20,-59,-42],[-49,18,-29,-33],[-31,20,-39,-49],[-12,18,4,-41],[8,19,23,-31],[25,19,17,-52],[43,20,61,-37],[61,19,78,-26],[76,21,87,-41]].forEach(([x1,y1,x2,y2], index) => {
    append(tangled, "path", { class: index % 3 === 0 ? "auckland-grass-blade dry" : (index % 2 ? "auckland-grass-blade deep" : "auckland-grass-blade"), d: `M${x1} ${y1}Q${(x1+x2)/2 + (index%2 ? 7 : -6)} ${(y1+y2)/2} ${x2} ${y2}` });
  });
  [[-68,11,-47,-3],[-44,25,-20,8],[-9,12,12,-2],[23,26,49,8],[55,12,77,-1]].forEach(([x1,y1,x2,y2], index) => {
    append(tangled, "path", { class: index % 2 ? "auckland-litter-leaf deep" : "auckland-litter-leaf", d: `M${x1} ${y1}Q${(x1+x2)/2} ${Math.min(y1,y2)-9} ${x2} ${y2}Q${(x1+x2)/2} ${Math.max(y1,y2)+7} ${x1} ${y1}Z` });
    append(tangled, "path", { class: "auckland-litter-vein", d: `M${x1+3} ${y1-1}L${x2-3} ${y2+1}` });
  });

  const flattened = append(target, "g", { class: "auckland-grass-litter-patch flattened", transform: "translate(469 386) rotate(5)", "aria-hidden": "true" });
  append(flattened, "ellipse", { class: "auckland-grass-shadow", cx: 0, cy: 19, rx: 85, ry: 19 });
  append(flattened, "path", { class: "auckland-grass-mat", d: "M-82 7Q-55-12-30 0Q-5-16 18-2Q43-14 75 3Q90 13 75 24Q45 30 17 21Q-10 34-35 22Q-63 32-82 18Z" });
  [[-72,10,-44,-15],[-56,13,-24,-8],[-37,14,-9,-20],[-18,15,14,-5],[1,13,33,-17],[19,14,51,-6],[38,13,68,-15],[55,14,81,-2]].forEach(([x1,y1,x2,y2], index) => {
    append(flattened, "path", { class: index % 3 === 1 ? "auckland-grass-blade dry" : (index % 2 ? "auckland-grass-blade deep" : "auckland-grass-blade"), d: `M${x1} ${y1}Q${(x1+x2)/2} ${Math.min(y1,y2)-4} ${x2} ${y2}` });
  });
  [[-57,6,-35,-5],[-23,18,-1,4],[19,9,40,-3],[48,20,69,7]].forEach(([x1,y1,x2,y2], index) => {
    append(flattened, "path", { class: index % 2 ? "auckland-litter-leaf deep" : "auckland-litter-leaf", d: `M${x1} ${y1}Q${(x1+x2)/2} ${Math.min(y1,y2)-7} ${x2} ${y2}Q${(x1+x2)/2} ${Math.max(y1,y2)+6} ${x1} ${y1}Z` });
    append(flattened, "path", { class: "auckland-litter-vein", d: `M${x1+3} ${y1-1}L${x2-3} ${y2+1}` });
  });
}

function drawAraucaniaCuncoScene(target, palette) {
  append(target, "rect", { class: "environment-sky cunco-garden-sky", width: 600, height: 430, fill: palette[0] });

  const quietClouds = append(target, "g", { class: "cunco-quiet-clouds", "aria-hidden": "true" });
  append(quietClouds, "path", { class: "cunco-cloud back", d: "M21 76Q48 49 81 67Q105 39 141 64Q170 58 188 82H21Z" });
  append(quietClouds, "path", { class: "cunco-cloud back", d: "M245 54Q269 33 299 49Q322 27 354 50Q381 45 396 66H245Z" });
  append(quietClouds, "path", { class: "cunco-cloud middle", d: "M403 89Q429 61 461 80Q487 51 522 78Q554 71 575 99H403Z" });

  const terrain = append(target, "g", { class: "cunco-low-terrain", "aria-hidden": "true" });
  append(terrain, "path", { class: "cunco-western-terrain", d: "M0 221Q77 204 151 216Q231 231 303 212Q381 190 452 205Q526 220 600 197V274H0Z" });
  append(terrain, "path", { class: "cunco-low-foothills", d: "M0 252Q81 229 159 245Q246 264 324 240Q411 212 488 232Q545 247 600 224V286H0Z" });
  append(terrain, "path", { class: "cunco-terrain-contour", d: "M0 229Q78 213 152 225M188 225Q245 236 304 220M340 211Q395 199 449 213M482 221Q539 216 600 205" });

  const llaima = append(target, "g", { class: "cunco-llaima-context", "aria-hidden": "true" });
  append(llaima, "path", { class: "cunco-llaima-double-summit", d: "M474 221L494 207L512 182L528 209L546 197L558 168L574 206L600 220V249H474Z" });
  append(llaima, "path", { class: "cunco-llaima-contour", d: "M490 214L512 188L528 210M539 203L558 174L576 211" });
  append(llaima, "path", { class: "cunco-summit-cloud", d: "M474 189Q489 174 508 184Q525 165 545 183Q562 171 580 188Q594 184 600 193V209H474Z" });

  const shelterbelt = append(target, "g", { class: "cunco-shelterbelt", "aria-hidden": "true" });
  append(shelterbelt, "path", { class: "cunco-shelterbelt-mass left", d: "M0 234Q19 208 43 230Q64 197 91 227Q118 205 141 236Q160 224 178 243V286H0Z" });
  append(shelterbelt, "path", { class: "cunco-shelterbelt-mass right", d: "M438 239Q458 214 481 235Q505 207 532 232Q556 212 579 240Q590 232 600 239V281H438Z" });
  append(shelterbelt, "path", { class: "cunco-shelterbelt-highlight", d: "M13 240Q39 220 63 239M71 235Q97 216 122 239M452 244Q478 224 501 242M511 237Q539 219 566 244" });

  append(target, "path", { class: "cunco-garden-ground", d: "M0 256Q94 240 185 255Q283 274 376 249Q475 222 600 244V430H0Z" });

  const beds = append(target, "g", { class: "cunco-anonymous-beds", "aria-hidden": "true" });
  append(beds, "path", { class: "cunco-bed-soil left", d: "M18 292L197 269L238 316L39 343Z" });
  append(beds, "path", { class: "cunco-bed-edge left", d: "M15 287L197 263L243 313L239 323L38 350L14 335Z" });
  append(beds, "path", { class: "cunco-bed-soil right", d: "M356 278L542 266L585 309L382 330Z" });
  append(beds, "path", { class: "cunco-bed-edge right", d: "M352 273L544 260L590 307L586 318L380 337L351 321Z" });
  append(beds, "path", { class: "cunco-bed-furrow", d: "M45 301L203 280M59 319L221 297M382 287L548 276M398 307L567 293" });
  [[73,294,-8],[112,289,7],[162,284,-5],[409,281,8],[461,277,-6],[519,278,5]].forEach(([x, y, angle], index) => {
    const plant = append(beds, "g", { class: `cunco-bed-sprout tone-${index % 3}`, transform: `translate(${x} ${y}) rotate(${angle})` });
    append(plant, "path", { class: "cunco-sprout-stem", d: "M0 17Q-2 2 1-15" });
    append(plant, "path", { class: "cunco-sprout-leaf", d: "M0 3Q-18-11-24 4Q-10 15 0 3ZM0-2Q16-17 23-3Q12 10 0-2Z" });
  });

  const pathGroup = append(target, "g", { class: "cunco-worn-path", "aria-hidden": "true" });
  append(pathGroup, "path", { class: "cunco-path-surface", d: "M286 242Q323 277 300 307Q277 337 303 365Q326 392 339 430H225Q242 391 228 361Q211 329 246 302Q277 278 263 243Z" });
  append(pathGroup, "path", { class: "cunco-path-edge", d: "M263 243Q277 278 246 302Q211 329 228 361Q242 391 225 430M286 242Q323 277 300 307Q277 337 303 365Q326 392 339 430" });
  [[271,270,18,5,-8],[268,315,25,6,6],[265,365,31,7,-5],[285,407,39,8,7]].forEach(([cx, cy, rx, ry, angle], index) => {
    append(pathGroup, "ellipse", { class: index % 2 ? "cunco-path-wear deep" : "cunco-path-wear", cx, cy, rx, ry, transform: `rotate(${angle} ${cx} ${cy})` });
  });

  const fence = append(target, "g", { class: "cunco-diagonal-fence", "aria-hidden": "true" });
  append(fence, "path", { class: "cunco-fence-rail", d: "M62 275L550 333M59 291L546 351" });
  [[72,257,314],[151,268,323],[238,276,335],[332,287,346],[432,299,360],[536,312,372]].forEach(([x, top, bottom], index) => {
    append(fence, "path", { class: index % 2 ? "cunco-fence-post deep" : "cunco-fence-post", d: `M${x} ${top}L${x + (index % 2 ? 4 : -3)} ${bottom}` });
  });

  append(target, "path", { class: "cunco-foreground-soil", d: "M0 342Q91 317 181 339Q273 365 362 337Q465 304 600 331V430H0Z" });

  const soilLitter = append(target, "g", { class: "cunco-soil-litter", "aria-hidden": "true" });
  [[16,405,47,388],[70,426,103,405],[152,414,184,394],[208,425,239,405],[487,412,519,390],[545,426,580,404]].forEach(([x1, y1, x2, y2], index) => {
    append(soilLitter, "path", { class: index % 2 ? "cunco-litter-clast deep" : "cunco-litter-clast", d: `M${x1} ${y1}Q${(x1+x2)/2} ${Math.min(y1,y2)-9} ${x2} ${y2}Q${(x1+x2)/2} ${Math.max(y1,y2)+7} ${x1} ${y1}Z` });
    append(soilLitter, "path", { class: "cunco-litter-vein", d: `M${x1+4} ${y1-1}L${x2-4} ${y2+1}` });
  });

  const compost = append(target, "g", { class: "cunco-compost-crescent", transform: "translate(402 374) rotate(-5)", "aria-hidden": "true" });
  append(compost, "ellipse", { class: "cunco-compost-shadow", cx: -4, cy: 40, rx: 124, ry: 22 });
  append(compost, "path", { class: "cunco-compost-base", d: "M-122 8Q-105-34-63-48Q-20-65 22-40Q67-49 108-15L84 7Q52-18 20-8Q-17-29-53-7Q-79 8-89 36Q-50 55-8 47Q33 58 76 34L106 53Q62 87 9 72Q-45 84-93 58Q-126 41-122 8Z" });
  append(compost, "path", { class: "cunco-compost-green-layer", d: "M-107 2Q-86-26-53-35Q-19-47 12-27Q46-35 78-16L58 2Q31-13 7-3Q-22-21-49-4Q-65 6-74 25Q-43 39-9 34Q25 43 57 25L76 39Q42 61 5 52Q-37 61-74 44Q-105 29-107 2Z" });
  append(compost, "path", { class: "cunco-compost-brown-layer", d: "M-91 34Q-50 18-13 38Q24 20 75 35L95 52Q54 76 6 65Q-37 76-79 56Z" });
  append(compost, "path", { class: "cunco-compost-layer-line", d: "M-100 18Q-66 5-34 20Q-2 8 27 20M-75 45Q-43 35-12 49Q20 35 57 45" });
  [[-82,-7,-60,-21],[-62,22,-38,7],[-36,-18,-12,-30],[-16,21,8,7],[18,-13,42,-27],[35,18,60,4],[57,40,84,25]].forEach(([x1, y1, x2, y2], index) => {
    append(compost, "path", { class: index % 3 === 0 ? "cunco-compost-clast green" : (index % 2 ? "cunco-compost-clast deep" : "cunco-compost-clast"), d: `M${x1} ${y1}Q${(x1+x2)/2} ${Math.min(y1,y2)-8} ${x2} ${y2}Q${(x1+x2)/2} ${Math.max(y1,y2)+6} ${x1} ${y1}Z` });
    append(compost, "path", { class: "cunco-compost-clast-vein", d: `M${x1+3} ${y1-1}L${x2-3} ${y2+1}` });
  });
  [[-98,19,3],[-70,38,4],[-45,2,3],[-10,49,4],[25,4,3],[48,36,4],[78,48,3]].forEach(([cx, cy, r], index) => {
    append(compost, "circle", { class: index % 2 ? "cunco-compost-fragment deep" : "cunco-compost-fragment", cx, cy, r });
  });
}

function drawTrivandrumBotanicalGardenScene(target, palette) {
  append(target, "rect", { class: "environment-sky trivandrum-garden-sky", width: 600, height: 430, fill: palette[0] });

  const cloudVeil = append(target, "g", { class: "trivandrum-cloud-veil", "aria-hidden": "true" });
  append(cloudVeil, "path", { d: "M20 69Q48 43 82 60Q108 35 145 61Q177 56 198 82H20Z" });
  append(cloudVeil, "path", { d: "M324 55Q350 33 381 48Q405 26 438 49Q466 44 484 68H324Z" });

  const hillAndDale = append(target, "g", { class: "trivandrum-hill-and-dale", "aria-hidden": "true" });
  append(hillAndDale, "path", { class: "trivandrum-far-garden-rise", d: "M0 233Q77 211 151 226Q231 244 304 220Q381 194 451 207Q526 221 600 191V282H0Z" });
  append(hillAndDale, "path", { class: "trivandrum-top-garden-rise", d: "M0 267Q82 239 163 255Q248 272 329 242Q417 208 496 225Q549 235 600 213V300H0Z" });
  append(hillAndDale, "path", { class: "trivandrum-rise-contour", d: "M5 245Q79 222 151 237M183 239Q250 254 315 231M351 222Q417 202 479 220M514 221Q558 216 600 201" });

  const museum = append(target, "g", { class: "trivandrum-museum-lock", transform: "translate(446 173) scale(.78)", "aria-hidden": "true" });
  append(museum, "path", { class: "trivandrum-museum-wall", d: "M-126 81V5L-96-18H-54L-31-52H31L54-18H98L127 6V81Z" });
  append(museum, "path", { class: "trivandrum-museum-roof", d: "M-140 9L-99-31H-60L-31-69L0-88L32-68L60-31H101L141 9L113 1L91-17H62L31-51L0-68L-31-51L-62-17H-92L-113 2Z" });
  append(museum, "path", { class: "trivandrum-museum-roof-seam", d: "M-99-30L-78 2M-31-68L-16 2M31-68L16 2M101-30L78 2M0-84V7" });
  append(museum, "path", { class: "trivandrum-museum-minaret left", d: "M-104 3V-73L-96-89L-88-73V5ZM-111-73H-81M-96-89V-101" });
  append(museum, "path", { class: "trivandrum-museum-minaret right", d: "M83 4V-92L92-111L101-92V5ZM76-92H108M92-111V-126" });
  append(museum, "path", { class: "trivandrum-museum-arcades", d: "M-73 79V32Q-58 11-43 32V79M-22 79V25Q0-4 22 25V79M43 79V32Q58 11 73 32V79" });

  const highCanopy = append(target, "g", { class: "trivandrum-high-canopy", "aria-hidden": "true" });
  append(highCanopy, "path", { class: "trivandrum-canopy-mass left", d: "M0 197Q20 165 49 190Q74 146 109 183Q142 155 170 196Q193 182 217 206V276H0Z" });
  append(highCanopy, "path", { class: "trivandrum-canopy-mass right", d: "M372 198Q393 166 420 190Q445 153 477 184Q509 151 541 190Q570 163 600 196V267H372Z" });
  append(highCanopy, "path", { class: "trivandrum-canopy-highlight", d: "M17 204Q48 176 77 201M86 195Q119 169 151 201M390 205Q420 177 450 202M462 196Q498 169 528 200M538 195Q567 177 593 202" });

  append(target, "path", { class: "trivandrum-garden-ground", d: "M0 260Q93 238 181 258Q278 281 367 247Q468 208 600 240V430H0Z" });

  const bamboo = append(target, "g", { class: "trivandrum-golden-bamboo", transform: "translate(87 248)", "aria-hidden": "true" });
  [-52,-34,-15,5,25,45].forEach((x, index) => {
    const lean = (index - 2.5) * 5;
    append(bamboo, "path", { class: index % 2 ? "trivandrum-bamboo-cane deep" : "trivandrum-bamboo-cane", d: `M${x} 51Q${x+lean*.25} -20 ${x+lean} -112` });
    [-77,-45,-13,18].forEach(y => append(bamboo, "path", { class: "trivandrum-bamboo-node", d: `M${x-5+lean*(51-y)/163} ${y}L${x+6+lean*(51-y)/163} ${y-1}` }));
  });
  [[-61,-72,-87,-89],[-44,-51,-18,-72],[-28,-93,-50,-111],[-7,-69,18,-88],[12,-103,37,-121],[27,-55,53,-76],[47,-82,71,-98],[18,-25,-6,-42]].forEach(([x1,y1,x2,y2], index) => {
    append(bamboo, "path", { class: index % 2 ? "trivandrum-bamboo-leaf deep" : "trivandrum-bamboo-leaf", d: `M${x1} ${y1}Q${(x1+x2)/2} ${Math.min(y1,y2)-8} ${x2} ${y2}Q${(x1+x2)/2+4} ${Math.max(y1,y2)+5} ${x1} ${y1}Z` });
  });

  const lake = append(target, "g", { class: "trivandrum-wooded-lake", "aria-hidden": "true" });
  append(lake, "path", { class: "trivandrum-lake-bank", d: "M0 291Q70 261 142 275Q209 288 262 267L285 303Q220 329 154 316Q77 300 0 334Z" });
  append(lake, "path", { class: "trivandrum-lake-water", d: "M0 304Q70 277 139 289Q207 303 264 282L282 305Q218 326 157 315Q79 301 0 334Z" });
  append(lake, "path", { class: "trivandrum-lake-ripple", d: "M22 306Q67 293 106 300M128 297Q176 309 222 293M65 320Q112 307 153 316M181 311Q226 318 258 305" });
  const lakeTrees = append(lake, "g", { class: "trivandrum-lake-edge-trees" });
  [[7,284,25],[49,273,31],[97,278,24],[145,272,28],[198,270,23]].forEach(([cx,cy,r], index) => {
    append(lakeTrees, "path", { class: "trivandrum-lake-tree-trunk", d: `M${cx-3} ${cy+18}L${cx+2} ${cy-30}` });
    append(lakeTrees, "circle", { class: index % 2 ? "trivandrum-lake-tree-crown deep" : "trivandrum-lake-tree-crown", cx, cy: cy-33, r });
  });

  const terraces = append(target, "g", { class: "trivandrum-garden-terraces", "aria-hidden": "true" });
  append(terraces, "path", { class: "trivandrum-terrace-wall upper", d: "M291 274Q368 246 447 257Q522 266 600 239V266Q522 290 445 279Q369 269 296 296Z" });
  append(terraces, "path", { class: "trivandrum-terrace-wall lower", d: "M314 319Q392 289 473 303Q536 314 600 291V321Q531 341 469 328Q393 313 320 342Z" });
  append(terraces, "path", { class: "trivandrum-terrace-cap", d: "M292 273Q368 243 447 254Q522 263 600 236M315 318Q392 286 473 300Q536 311 600 288" });
  const flowerBeds = [
    [360,270,60,14,-4], [500,277,54,13,5], [393,318,54,14,-5], [525,330,48,12,4]
  ];
  flowerBeds.forEach(([cx,cy,rx,ry,angle], index) => {
    append(terraces, "ellipse", { class: index % 2 ? "trivandrum-flowerbed deep" : "trivandrum-flowerbed", cx, cy, rx, ry, transform: `rotate(${angle} ${cx} ${cy})` });
    [-.55,0,.55].forEach((offset, dotIndex) => append(terraces, "circle", { class: (index+dotIndex)%2 ? "trivandrum-bed-bloom deep" : "trivandrum-bed-bloom", cx: cx + offset * rx, cy: cy - (dotIndex%2 ? 5 : 1), r: 3.6 }));
  });

  const risingPath = append(target, "g", { class: "trivandrum-rising-path", "aria-hidden": "true" });
  append(risingPath, "path", { class: "trivandrum-path-surface", d: "M236 430Q255 388 236 359Q216 327 252 302Q282 281 267 254Q254 234 288 219L322 222Q288 245 303 270Q320 300 286 324Q256 345 276 373Q296 401 303 430Z" });
  append(risingPath, "path", { class: "trivandrum-path-edge", d: "M236 430Q255 388 236 359Q216 327 252 302Q282 281 267 254Q254 234 288 219M303 430Q296 401 276 373Q256 345 286 324Q320 300 303 270Q288 245 322 222" });
  [[282,242,14,4,-6],[278,277,20,5,6],[269,320,27,6,-7],[260,368,35,7,6],[270,416,44,8,-5]].forEach(([cx,cy,rx,ry,angle], index) => append(risingPath, "ellipse", { class: index % 2 ? "trivandrum-path-step deep" : "trivandrum-path-step", cx, cy, rx, ry, transform: `rotate(${angle} ${cx} ${cy})` }));

  append(target, "path", { class: "trivandrum-foreground-earth", d: "M0 351Q91 326 180 346Q271 370 362 344Q465 313 600 338V430H0Z" });

  const decay = append(target, "g", { class: "trivandrum-decay-substrate", transform: "translate(461 380) rotate(-4)", "aria-hidden": "true" });
  append(decay, "ellipse", { class: "trivandrum-decay-shadow", cx: 0, cy: 32, rx: 119, ry: 23 });
  append(decay, "path", { class: "trivandrum-damp-decay-base", d: "M-116 13Q-91-24-57-15Q-30-43 4-22Q36-43 65-15Q98-27 116 8Q98 39 66 33Q36 54 5 38Q-28 56-59 37Q-94 47-116 13Z" });
  append(decay, "path", { class: "trivandrum-decay-inner", d: "M-93 7Q-74-16-46-8Q-25-28 0-13Q25-31 48-9Q76-20 94 5Q72 26 47 20Q22 39-3 25Q-28 42-50 25Q-76 33-93 7Z" });
  [[-86,2,-59,-15],[-66,22,-37,5],[-39,-3,-13,-22],[-14,21,14,3],[15,-8,43,-25],[38,18,66,1],[62,-2,91,-17]].forEach(([x1,y1,x2,y2], index) => {
    append(decay, "path", { class: index % 3 === 0 ? "trivandrum-decay-leaf green" : (index % 2 ? "trivandrum-decay-leaf deep" : "trivandrum-decay-leaf"), d: `M${x1} ${y1}Q${(x1+x2)/2} ${Math.min(y1,y2)-9} ${x2} ${y2}Q${(x1+x2)/2+4} ${Math.max(y1,y2)+7} ${x1} ${y1}Z` });
    append(decay, "path", { class: "trivandrum-decay-vein", d: `M${x1+4} ${y1-1}L${x2-4} ${y2+1}` });
  });
  [[-72,-18,-48,-36],[-44,10,-19,-9],[-8,-17,16,-35],[21,11,47,-8],[53,-14,80,-30]].forEach(([x1,y1,x2,y2], index) => {
    append(decay, "path", { class: index % 2 ? "trivandrum-wilted-petal deep" : "trivandrum-wilted-petal", d: `M${x1} ${y1}Q${(x1+x2)/2-4} ${Math.min(y1,y2)-11} ${x2} ${y2}Q${(x1+x2)/2+7} ${Math.max(y1,y2)+7} ${x1} ${y1}Z` });
  });
  [[-99,20,3],[-62,34,4],[-25,30,3],[8,35,4],[45,29,3],[82,20,4]].forEach(([cx,cy,r], index) => append(decay, "circle", { class: index % 2 ? "trivandrum-decay-fragment deep" : "trivandrum-decay-fragment", cx, cy, r }));
}

function drawSingaporeStarfruitGardenScene(target, palette) {
  append(target, "rect", { class: "environment-sky singapore-garden-sky", width: 600, height: 430, fill: palette[0] });

  const humidHaze = append(target, "g", { class: "singapore-humid-haze", "aria-hidden": "true" });
  append(humidHaze, "path", { class: "singapore-haze-cloud back", d: "M25 72Q48 47 79 63Q104 36 139 62Q168 55 188 80H25Z" });
  append(humidHaze, "path", { class: "singapore-haze-cloud", d: "M386 57Q410 35 439 51Q463 28 496 51Q526 46 545 70H386Z" });

  const urbanGap = append(target, "g", { class: "singapore-narrow-urban-gap", transform: "translate(319 170)", "aria-hidden": "true" });
  append(urbanGap, "path", { class: "singapore-city-haze", d: "M-42 70V9H-26V-8H-9V25H6V-31H24V5H39V70Z" });
  append(urbanGap, "path", { class: "singapore-city-edge", d: "M-42 70V9H-26V-8H-9V25H6V-31H24V5H39V70M-20 9H-13M12-15H18M12-2H18M12 11H18M12 24H18" });

  const farGarden = append(target, "g", { class: "singapore-planted-canopy", "aria-hidden": "true" });
  append(farGarden, "path", { class: "singapore-canopy-mass left", d: "M0 194Q18 158 49 182Q73 137 110 175Q141 145 169 183Q198 153 226 190Q248 172 276 198V273H0Z" });
  append(farGarden, "path", { class: "singapore-canopy-mass right", d: "M355 194Q378 159 407 184Q434 145 466 178Q499 143 529 182Q558 154 600 189V268H355Z" });
  append(farGarden, "path", { class: "singapore-canopy-highlight", d: "M17 198Q45 171 73 195M85 187Q113 158 143 190M157 188Q186 163 214 194M373 197Q403 169 432 195M445 186Q474 156 506 190M520 186Q552 163 587 194" });
  [[34,195,51,260],[102,185,111,263],[190,190,181,271],[407,187,397,264],[493,181,505,262],[567,189,576,270]].forEach(([x1,y1,x2,y2], index) => {
    append(farGarden, "path", { class: index % 2 ? "singapore-canopy-trunk deep" : "singapore-canopy-trunk", d: `M${x1} ${y1}Q${(x1+x2)/2-5} ${(y1+y2)/2} ${x2} ${y2}` });
  });

  append(target, "path", { class: "singapore-garden-ground", d: "M0 252Q82 226 164 245Q251 267 335 238Q430 204 507 224Q559 235 600 215V430H0Z" });

  const beds = append(target, "g", { class: "singapore-planted-beds", "aria-hidden": "true" });
  append(beds, "path", { class: "singapore-bed upper", d: "M0 276Q82 250 164 266Q226 278 270 264L279 294Q218 310 155 295Q76 278 0 310Z" });
  append(beds, "path", { class: "singapore-bed lower", d: "M362 286Q443 253 520 268Q565 277 600 262V304Q560 315 516 305Q439 288 369 318Z" });
  [[25,278,-9],[62,268,8],[102,276,-6],[146,271,10],[404,288,-8],[451,276,7],[501,286,-10],[552,281,8]].forEach(([x,y,angle], index) => {
    const plant = append(beds, "g", { class: `singapore-bed-plant tone-${index%3}`, transform: `translate(${x} ${y}) rotate(${angle})` });
    append(plant, "path", { class: "singapore-bed-stem", d: "M0 12Q2-5 0-25" });
    append(plant, "path", { class: "singapore-bed-leaf", d: "M0-3Q-17-18-23-3Q-10 9 0-3ZM0-10Q16-24 23-10Q11 3 0-10Z" });
  });

  const path = append(target, "g", { class: "singapore-s-path", "aria-hidden": "true" });
  append(path, "path", { class: "singapore-path-surface", d: "M230 430Q267 390 247 356Q226 321 267 296Q304 273 289 246Q278 226 311 207H345Q315 231 330 257Q348 288 305 314Q268 337 290 368Q312 400 319 430Z" });
  append(path, "path", { class: "singapore-path-edge", d: "M230 430Q267 390 247 356Q226 321 267 296Q304 273 289 246Q278 226 311 207M319 430Q312 400 290 368Q268 337 305 314Q348 288 330 257Q315 231 345 207" });
  [[313,226,13,3,-4],[310,260,19,4,6],[292,304,26,5,-7],[271,351,35,6,6],[274,405,43,7,-5]].forEach(([cx,cy,rx,ry,angle], index) => append(path, "ellipse", { class: index % 2 ? "singapore-path-step deep" : "singapore-path-step", cx, cy, rx, ry, transform: `rotate(${angle} ${cx} ${cy})` }));

  const carambola = append(target, "g", { class: "singapore-carambola-bough", "aria-hidden": "true" });
  append(carambola, "path", { class: "singapore-bough-main", d: "M0 109Q79 93 148 119Q220 146 288 127Q343 112 386 129" });
  append(carambola, "path", { class: "singapore-bough-secondary", d: "M89 103Q121 65 164 52M166 122Q204 83 249 76M257 133Q302 91 352 88" });
  const leafSprays = [
    [122,72,-37,-17],[147,61,-7,-31],[182,100,-36,-12],[214,88,3,-34],[278,106,-33,-18],[319,94,8,-32],[344,109,-25,-10]
  ];
  leafSprays.forEach(([x,y,x2,y2], index) => {
    append(carambola, "path", { class: "singapore-pinnate-rachis", d: `M${x} ${y}L${x+x2} ${y+y2}` });
    [0.24,0.47,0.7].forEach((ratio, leafIndex) => {
      const cx = x + x2 * ratio;
      const cy = y + y2 * ratio;
      const angle = Math.atan2(y2, x2) * 180 / Math.PI;
      append(carambola, "ellipse", { class: (index+leafIndex)%3 === 0 ? "singapore-pinnate-leaf deep" : "singapore-pinnate-leaf", cx: cx-5, cy: cy-5, rx: 11, ry: 5, transform: `rotate(${angle-34} ${cx-5} ${cy-5})` });
      append(carambola, "ellipse", { class: (index+leafIndex)%3 === 1 ? "singapore-pinnate-leaf deep" : "singapore-pinnate-leaf", cx: cx+5, cy: cy+5, rx: 11, ry: 5, transform: `rotate(${angle+34} ${cx+5} ${cy+5})` });
    });
  });
  [[178,113],[196,120],[218,114],[305,121],[329,116]].forEach(([cx,cy], clusterIndex) => {
    [-7,0,7].forEach((offset, petalIndex) => append(carambola, "ellipse", { class: (clusterIndex+petalIndex)%2 ? "singapore-starfruit-flower deep" : "singapore-starfruit-flower", cx: cx+offset, cy: cy+(petalIndex%2?5:-2), rx: 4, ry: 7, transform: `rotate(${offset*4} ${cx+offset} ${cy})` }));
  });

  append(target, "path", { class: "singapore-foreground-litter-bed", d: "M0 345Q91 319 181 342Q273 369 368 341Q473 309 600 337V430H0Z" });
  const litter = append(target, "g", { class: "singapore-foreground-litter", "aria-hidden": "true" });
  [[15,402,49,382],[62,426,98,405],[126,399,160,380],[184,423,224,402],[255,404,291,383],[323,424,359,402],[516,418,557,396],[560,390,594,372]].forEach(([x1,y1,x2,y2], index) => {
    append(litter, "path", { class: index%3 === 0 ? "singapore-litter-leaf green" : (index%2 ? "singapore-litter-leaf deep" : "singapore-litter-leaf"), d: `M${x1} ${y1}Q${(x1+x2)/2} ${Math.min(y1,y2)-9} ${x2} ${y2}Q${(x1+x2)/2+4} ${Math.max(y1,y2)+7} ${x1} ${y1}Z` });
    append(litter, "path", { class: "singapore-litter-vein", d: `M${x1+4} ${y1-1}L${x2-4} ${y2+1}` });
  });

  const fruit = append(target, "g", { class: "singapore-rotten-starfruit", transform: "translate(477 376) rotate(-8)", "aria-hidden": "true" });
  append(fruit, "ellipse", { class: "singapore-starfruit-shadow", cx: 0, cy: 32, rx: 111, ry: 22 });
  append(fruit, "path", { class: "singapore-starfruit-body", d: "M-106-8Q-82-38-48-28Q-18-48 12-29Q44-43 72-20Q100-23 112 7Q95 34 66 28Q39 48 9 34Q-21 51-51 35Q-84 45-108 16Q-114 3-106-8Z" });
  append(fruit, "path", { class: "singapore-starfruit-soft-flesh", d: "M-88-3Q-69-27-43-18Q-18-34 7-18Q34-31 56-12Q80-16 93 7Q77 25 55 19Q32 35 8 24Q-16 39-40 25Q-67 34-89 13Z" });
  append(fruit, "path", { class: "singapore-starfruit-rib", d: "M-93-7Q-51-2-9 7Q37 18 91 7M-76-23Q-37-10 2 4Q42 18 76 21M-75 30Q-38 19 0 9Q42-2 78-12M-37-24Q-17-10 1 5Q21-8 45-25M-42 31Q-19 19 1 7Q25 18 51 28" });
  append(fruit, "path", { class: "singapore-starfruit-collapse", d: "M-81 8Q-51-5-23 13Q7-3 35 14Q59 3 87 13Q62 34 34 26Q7 43-22 29Q-52 42-81 8Z" });
  [[-71,-9,4],[-50,16,3],[-23,-15,3],[4,24,4],[29,-11,3],[53,18,4],[76,1,3]].forEach(([cx,cy,r], index) => append(fruit, "circle", { class: index%2 ? "singapore-starfruit-mottle deep" : "singapore-starfruit-mottle", cx, cy, r }));

  const section = append(target, "g", { class: "singapore-starfruit-section", transform: "translate(366 391) rotate(13)", "aria-hidden": "true" });
  append(section, "ellipse", { class: "singapore-starfruit-shadow", cx: 1, cy: 22, rx: 48, ry: 12 });
  append(section, "path", { class: "singapore-star-section-rind", d: "M0-50L14-20L47-16L23 7L29 40L0 24L-29 40L-23 7L-47-16L-14-20Z" });
  append(section, "path", { class: "singapore-star-section-flesh", d: "M0-37L10-14L34-11L17 5L21 29L0 17L-21 29L-17 5L-34-11L-10-14Z" });
  append(section, "ellipse", { class: "singapore-star-section-core", cx: 0, cy: 1, rx: 11, ry: 9 });
  [[0,-23],[22,-6],[14,18],[-14,18],[-22,-6]].forEach(([cx,cy], index) => append(section, "ellipse", { class: index%2 ? "singapore-star-section-seed deep" : "singapore-star-section-seed", cx, cy, rx: 3.5, ry: 6, transform: `rotate(${index*72} ${cx} ${cy})` }));
}

function drawPraslinGraniticPalmForestScene(target, palette) {
  append(target, "rect", { class: "environment-sky praslin-forest-sky", width: 600, height: 430, fill: palette[0] });

  const humidDistance = append(target, "g", { class: "praslin-humid-distance", "aria-hidden": "true" });
  append(humidDistance, "path", { class: "praslin-mist-veil back", d: "M0 54Q64 31 128 51Q195 72 258 48Q327 22 391 46Q465 72 531 42Q570 25 600 38V127H0Z" });
  append(humidDistance, "path", { class: "praslin-closed-ridge", d: "M0 190Q55 162 109 178Q170 197 226 169Q287 139 346 158Q407 177 466 150Q536 118 600 137V243H0Z" });
  append(humidDistance, "path", { class: "praslin-ridge-contour", d: "M0 188Q56 166 109 182M145 184Q191 187 229 169M266 157Q307 144 346 162M383 169Q426 168 465 151M507 140Q555 126 600 141" });
  append(humidDistance, "path", { class: "praslin-light-slit", d: "M329 0Q345 53 338 108Q331 148 349 183L381 174Q365 132 372 88Q379 40 363 0Z" });

  const canopy = append(target, "g", { class: "praslin-layered-canopy", "aria-hidden": "true" });
  append(canopy, "path", { class: "praslin-canopy-mass upper", d: "M0 0H600V76Q573 58 550 75Q520 48 491 74Q459 50 431 78Q399 55 370 80Q341 56 311 80Q279 52 248 77Q214 49 185 73Q152 45 123 70Q90 43 61 67Q31 46 0 61Z" });
  append(canopy, "path", { class: "praslin-canopy-mass lower", d: "M0 111Q24 82 54 104Q81 72 112 101Q144 76 172 108Q206 80 235 107Q264 82 294 111L304 185Q247 184 197 207Q139 231 79 210Q38 196 0 211ZM386 102Q413 75 441 100Q470 70 500 99Q531 73 557 104Q580 86 600 99V205Q554 190 510 205Q462 222 415 203L380 171Z" });
  append(canopy, "path", { class: "praslin-canopy-highlight", d: "M20 108Q55 81 91 105M113 102Q147 78 178 108M410 103Q444 77 478 101M504 99Q540 78 575 108" });

  append(target, "path", { class: "praslin-forest-floor", d: "M0 244Q84 218 166 239Q256 263 342 231Q436 196 520 218Q565 231 600 216V430H0Z" });
  append(target, "path", { class: "praslin-floor-contour", d: "M0 275Q86 246 170 268Q256 291 343 259Q434 225 520 247Q564 258 600 246" });

  const addFanPalm = (x, crownY, groundY, scale, lean, tone = "") => {
    const palm = append(target, "g", { class: `praslin-fan-palm ${tone}`.trim(), transform: `translate(${x} ${crownY}) rotate(${lean}) scale(${scale})`, "aria-hidden": "true" });
    const localGround = (groundY - crownY) / scale;
    append(palm, "path", { class: "praslin-palm-trunk", d: `M-10 ${localGround}Q-18 ${localGround * .55}-4 0Q2-8 9 0Q18 ${localGround * .54} 12 ${localGround}Z` });
    [-.76,-.49,-.22,.05,.32,.59,.83].forEach((ratio, index) => {
      const angle = -87 + index * 29;
      const length = index === 3 ? 111 : 92 + (index % 3) * 9;
      const radians = angle * Math.PI / 180;
      const endX = Math.cos(radians) * length;
      const endY = Math.sin(radians) * length;
      append(palm, "path", { class: index % 3 === 1 ? "praslin-fan-blade deep" : "praslin-fan-blade", d: `M-6-2Q${endX * .45 - 12} ${endY * .43 + ratio * 7} ${endX} ${endY}Q${endX * .58 + 15} ${endY * .56 - ratio * 8} 6 4Z` });
      append(palm, "path", { class: "praslin-fan-rib", d: `M0 1Q${endX * .46} ${endY * .5} ${endX * .91} ${endY * .91}` });
    });
    append(palm, "circle", { class: "praslin-fan-hub", cx: 0, cy: 0, r: 10 });
    [-.55,-.26,.04,.34,.63].forEach((ratio, index) => append(palm, "path", { class: "praslin-trunk-band", d: `M${-9 - ratio * 2} ${localGround * (index + 1) / 6}Q0 ${localGround * (index + 1) / 6 + 5} ${10 + ratio * 2} ${localGround * (index + 1) / 6}` }));
  };

  addFanPalm(151, 145, 326, 1.08, -5, "great-left");
  addFanPalm(451, 130, 306, .83, 7, "high-right");

  const stiltPalm = append(target, "g", { class: "praslin-stilt-palm", "aria-hidden": "true" });
  append(stiltPalm, "path", { class: "praslin-stilt-trunk", d: "M511 294Q506 241 519 190Q526 163 523 137" });
  append(stiltPalm, "path", { class: "praslin-stilt-roots", d: "M511 292L482 329M511 292L501 337M511 292L527 333M511 292L550 321" });
  [-82,-58,-34,-10,16,42,68].forEach((angle, index) => {
    const radians = angle * Math.PI / 180;
    const ex = 523 + Math.cos(radians) * (index % 2 ? 75 : 86);
    const ey = 137 + Math.sin(radians) * (index % 2 ? 75 : 86);
    append(stiltPalm, "path", { class: index % 2 ? "praslin-stilt-leaf deep" : "praslin-stilt-leaf", d: `M520 140Q${(520+ex)/2 + (index-3)*2} ${(140+ey)/2 - 8} ${ex} ${ey}Q${(520+ex)/2 - (index-3)*2} ${(140+ey)/2 + 8} 526 143Z` });
    append(stiltPalm, "path", { class: "praslin-stilt-rib", d: `M523 141L${ex} ${ey}` });
  });

  const pandanus = append(target, "g", { class: "praslin-pandanus", "aria-hidden": "true" });
  append(pandanus, "path", { class: "praslin-pandanus-trunk", d: "M64 307Q73 258 69 213" });
  append(pandanus, "path", { class: "praslin-pandanus-roots", d: "M67 279L39 321M69 279L58 327M69 279L89 323M69 279L110 313" });
  [[-61,-38],[-48,-62],[-27,-72],[-4,-80],[20,-76],[43,-61],[61,-41],[-70,-12],[69,-9]].forEach(([dx,dy], index) => {
    append(pandanus, "path", { class: index % 3 ? "praslin-pandanus-leaf" : "praslin-pandanus-leaf deep", d: `M65 216Q${65 + dx * .48} ${216 + dy * .4 - 7} ${65 + dx} ${216 + dy}Q${65 + dx * .5} ${216 + dy * .55 + 6} 72 219Z` });
  });

  const drainage = append(target, "g", { class: "praslin-drainage-thread", "aria-hidden": "true" });
  append(drainage, "path", { class: "praslin-drainage-bed", d: "M600 251Q555 265 527 294Q500 323 483 346Q462 376 426 430H548Q545 392 561 357Q575 326 600 312Z" });
  append(drainage, "path", { class: "praslin-drainage-water", d: "M600 274Q558 284 539 307Q516 334 506 357Q492 389 460 430H503Q501 396 522 365Q538 340 551 319Q568 295 600 291Z" });
  append(drainage, "path", { class: "praslin-water-glint", d: "M583 290Q559 299 549 315M535 335Q522 351 516 368M501 391Q487 408 478 425" });
  [[570,307,20,12,-8],[535,326,16,11,12],[554,353,24,14,-7],[503,368,17,12,9],[530,397,27,16,-9],[471,409,22,14,8]].forEach(([cx,cy,rx,ry,angle], index) => append(drainage, "ellipse", { class: index % 2 ? "praslin-drainage-stone deep" : "praslin-drainage-stone", cx, cy, rx, ry, transform: `rotate(${angle} ${cx} ${cy})` }));

  const cleft = append(target, "g", { class: "praslin-cleft-boulder", transform: "translate(142 351) rotate(-4)", "aria-hidden": "true" });
  append(cleft, "ellipse", { class: "praslin-granite-shadow", cx: 3, cy: 54, rx: 105, ry: 25 });
  append(cleft, "path", { class: "praslin-granite-boulder left", d: "M-101 42Q-112 3-79-28Q-46-59-8-37Q9-20 4 9L-6 51Z" });
  append(cleft, "path", { class: "praslin-granite-boulder right", d: "M2 50Q-5 11 13-18Q36-53 75-34Q110-17 105 23Q101 48 76 58Z" });
  append(cleft, "path", { class: "praslin-granite-cleft", d: "M-8-34Q11-11 1 13Q-6 30 4 52" });
  append(cleft, "path", { class: "praslin-granite-vein", d: "M-83 10Q-55-8-27 2M34-20Q55-4 79-11M39 26Q65 15 91 26" });
  [[-70,-16,5],[-43,28,4],[35,-2,5],[68,34,4]].forEach(([cx,cy,r], index) => append(cleft, "circle", { class: index % 2 ? "praslin-granite-mottle deep" : "praslin-granite-mottle", cx, cy, r }));

  append(target, "path", { class: "praslin-foreground-litter-bed", d: "M0 353Q85 331 171 352Q256 373 343 345Q440 313 600 342V430H0Z" });
  const litter = append(target, "g", { class: "praslin-palm-litter", "aria-hidden": "true" });
  [[8,413,54,387],[68,429,115,399],[212,418,255,390],[272,430,319,399],[338,414,379,388],[573,418,600,397]].forEach(([x1,y1,x2,y2], index) => {
    append(litter, "path", { class: index % 3 === 0 ? "praslin-litter-blade green" : (index % 2 ? "praslin-litter-blade deep" : "praslin-litter-blade"), d: `M${x1} ${y1}Q${(x1+x2)/2} ${Math.min(y1,y2)-8} ${x2} ${y2}Q${(x1+x2)/2+4} ${Math.max(y1,y2)+7} ${x1} ${y1}Z` });
    append(litter, "path", { class: "praslin-litter-rib", d: `M${x1+4} ${y1-1}L${x2-4} ${y2+1}` });
  });
  [[30,371,2],[188,402,3],[250,374,2],[322,397,3],[393,375,2],[582,369,3]].forEach(([cx,cy,r], index) => append(litter, "circle", { class: index % 2 ? "praslin-litter-fragment deep" : "praslin-litter-fragment", cx, cy, r }));
}

function drawSaoTomeForestFloorScene(target, palette) {
  append(target, "rect", { class: "environment-sky sao-tome-forest-sky", width: 600, height: 430, fill: palette[0] });

  const depth = append(target, "g", { class: "sao-tome-forest-depth", "aria-hidden": "true" });
  append(depth, "path", { class: "sao-tome-distant-green", d: "M0 78Q64 48 126 72Q190 97 250 66Q314 32 379 59Q449 88 512 56Q560 32 600 47V274H0Z" });
  append(depth, "path", { class: "sao-tome-light-shaft", d: "M342 0Q363 61 349 118Q335 178 366 236Q390 282 374 329L425 338Q432 278 407 229Q379 174 395 114Q411 55 384 0Z" });
  append(depth, "path", { class: "sao-tome-back-thicket", d: "M0 185Q43 151 86 181Q126 139 169 177Q210 146 250 188L278 272Q217 254 158 277Q94 301 0 270ZM402 179Q443 140 486 179Q529 145 566 183Q585 168 600 178V282Q546 258 493 279Q449 293 399 273Z" });
  append(depth, "path", { class: "sao-tome-back-branch", d: "M18 215Q87 179 149 209M438 211Q508 166 585 201M254 177Q310 139 364 170" });

  const canopy = append(target, "g", { class: "sao-tome-closed-canopy", "aria-hidden": "true" });
  append(canopy, "path", { class: "sao-tome-canopy-mass upper", d: "M0 0H600V74Q574 51 548 75Q520 43 490 70Q459 42 430 72Q399 45 369 76Q337 48 306 75Q273 43 241 72Q208 42 177 69Q143 39 113 67Q78 39 49 65Q23 44 0 60Z" });
  append(canopy, "path", { class: "sao-tome-canopy-mass left", d: "M0 44Q28 26 53 50Q78 24 106 53Q135 28 160 60Q190 39 214 66L202 172Q160 151 123 177Q78 207 32 185Q15 178 0 185Z" });
  append(canopy, "path", { class: "sao-tome-canopy-mass right", d: "M385 61Q414 32 444 61Q474 31 503 61Q535 34 563 66Q584 47 600 62V191Q558 171 518 191Q472 214 428 190Q406 180 388 187Z" });
  append(canopy, "path", { class: "sao-tome-canopy-highlight", d: "M19 69Q53 42 86 67M106 63Q139 40 171 69M414 70Q448 41 482 68M507 68Q541 45 575 74" });

  append(target, "path", { class: "sao-tome-forest-floor", d: "M0 249Q77 224 154 245Q238 269 319 236Q409 200 491 225Q550 242 600 224V430H0Z" });
  append(target, "path", { class: "sao-tome-floor-contour", d: "M0 287Q77 260 157 282Q241 305 321 273Q407 239 490 263Q548 279 600 263" });

  const rearTrunks = append(target, "g", { class: "sao-tome-rear-trunks", "aria-hidden": "true" });
  append(rearTrunks, "path", { class: "sao-tome-rear-trunk", d: "M326 278Q321 213 336 153Q347 112 342 73" });
  append(rearTrunks, "path", { class: "sao-tome-rear-trunk deep", d: "M566 284Q558 226 568 171Q574 132 567 98" });
  append(rearTrunks, "path", { class: "sao-tome-root-line", d: "M322 275L294 301M326 275L345 303M562 279L539 301M567 279L591 299" });

  const forkedTrunk = append(target, "g", { class: "sao-tome-forked-trunk", "aria-hidden": "true" });
  append(forkedTrunk, "path", { class: "sao-tome-main-trunk", d: "M22 430Q63 335 96 255Q129 175 173 102L212 122Q176 190 151 261Q120 345 98 430Z" });
  append(forkedTrunk, "path", { class: "sao-tome-fork-branch", d: "M164 126Q139 78 111 17L142 0Q176 68 194 108Z" });
  append(forkedTrunk, "path", { class: "sao-tome-fork-branch deep", d: "M178 112Q226 70 280 39L295 70Q242 105 199 145Z" });
  append(forkedTrunk, "path", { class: "sao-tome-bark-seam", d: "M72 384Q98 303 125 234Q150 171 184 116M111 361Q126 294 153 221M173 111Q147 69 130 25M193 124Q232 88 278 58" });
  [[70,360,18,5,-62],[104,275,16,4,-65],[143,186,15,4,-59],[182,117,12,4,-48]].forEach(([cx,cy,rx,ry,angle], index) => append(forkedTrunk, "ellipse", { class: index % 2 ? "sao-tome-bark-knot deep" : "sao-tome-bark-knot", cx, cy, rx, ry, transform: `rotate(${angle} ${cx} ${cy})` }));

  const lianas = append(target, "g", { class: "sao-tome-lianas", "aria-hidden": "true" });
  append(lianas, "path", { class: "sao-tome-liana", d: "M258 0C238 56 273 105 245 162C225 202 221 242 248 276" });
  append(lianas, "path", { class: "sao-tome-liana deep", d: "M471 0C488 50 454 96 476 145C494 184 490 224 463 260" });
  append(lianas, "path", { class: "sao-tome-liana fine", d: "M521 0Q497 51 519 101Q536 141 516 183" });
  [[245,162,-24,4],[248,276,21,-3],[476,145,23,2],[463,260,-21,3],[519,101,20,-2]].forEach(([cx,cy,dx,dy], index) => append(lianas, "path", { class: index % 2 ? "sao-tome-liana-leaf deep" : "sao-tome-liana-leaf", d: `M${cx} ${cy}Q${cx+dx*.55} ${cy+dy-12} ${cx+dx} ${cy+dy}Q${cx+dx*.48} ${cy+dy+11} ${cx} ${cy}Z` }));

  const addFern = (x, groundY, scale, lean, frondCount, tone = "") => {
    const fern = append(target, "g", { class: `sao-tome-fern ${tone}`.trim(), transform: `translate(${x} ${groundY}) rotate(${lean}) scale(${scale})`, "aria-hidden": "true" });
    const spread = frondCount === 5 ? [-67,-33,0,34,68] : [-77,-52,-26,0,28,55,81];
    spread.forEach((angle, index) => {
      const length = 64 + (index % 3) * 15;
      const radians = (-90 + angle * .54) * Math.PI / 180;
      const ex = Math.cos(radians) * length;
      const ey = Math.sin(radians) * length;
      append(fern, "path", { class: "sao-tome-fern-stem", d: `M0 0Q${ex*.37 + angle*.06} ${ey*.46} ${ex} ${ey}` });
      const leaflets = 5;
      for (let leaflet = 1; leaflet <= leaflets; leaflet += 1) {
        const ratio = leaflet / (leaflets + 1);
        const px = ex * ratio;
        const py = ey * ratio;
        const width = 15 - leaflet * 1.2;
        [-1,1].forEach(side => append(fern, "path", { class: index % 3 === 1 ? "sao-tome-fern-leaflet deep" : "sao-tome-fern-leaflet", d: `M${px} ${py}Q${px + side*width} ${py-8} ${px + side*(width+5)} ${py-1}Q${px + side*(width*.55)} ${py+5} ${px} ${py}Z` }));
      }
    });
    append(fern, "path", { class: "sao-tome-fern-root", d: "M-17 3Q0-13 19 3L13 13H-14Z" });
  };
  addFern(25, 349, .78, -7, 5, "small-left");
  addFern(574, 347, 1.12, 6, 7, "large-right");
  addFern(284, 304, .48, -3, 5, "rear");

  const begonia = append(target, "g", { class: "sao-tome-begonia-cue", "aria-hidden": "true" });
  append(begonia, "path", { class: "sao-tome-begonia-petiole", d: "M520 359Q508 307 500 258M519 337Q552 302 563 264M515 320Q473 291 460 255" });
  const leaves = [
    [498,250,"M0 0Q-45-60-7-86Q36-75 51-26Q28 13 0 0Z",-7],
    [561,258,"M0 0Q-9-62 33-69Q70-36 61 10Q22 29 0 0Z",13],
    [459,254,"M0 0Q-50-25-38-62Q-2-86 35-55Q41-10 0 0Z",-18]
  ];
  leaves.forEach(([x,y,d,angle], index) => {
    const leaf = append(begonia, "g", { transform: `translate(${x} ${y}) rotate(${angle})` });
    append(leaf, "path", { class: index === 1 ? "sao-tome-begonia-leaf deep" : "sao-tome-begonia-leaf", d });
    append(leaf, "path", { class: "sao-tome-begonia-vein", d: "M0 0Q8-35 1-72M2-27L-26-47M4-39L28-50" });
  });

  append(target, "path", { class: "sao-tome-foreground-litter-bed", d: "M0 349Q84 325 169 348Q256 374 344 344Q440 312 600 341V430H0Z" });
  const litter = append(target, "g", { class: "sao-tome-forest-litter", "aria-hidden": "true" });
  [[4,413,50,386],[61,429,109,398],[139,407,180,381],[211,426,258,397],[291,410,337,381],[355,430,402,398],[531,421,574,392],[568,390,600,370]].forEach(([x1,y1,x2,y2], index) => {
    append(litter, "path", { class: index % 3 === 0 ? "sao-tome-litter-leaf green" : (index % 2 ? "sao-tome-litter-leaf deep" : "sao-tome-litter-leaf"), d: `M${x1} ${y1}Q${(x1+x2)/2} ${Math.min(y1,y2)-10} ${x2} ${y2}Q${(x1+x2)/2+5} ${Math.max(y1,y2)+7} ${x1} ${y1}Z` });
    append(litter, "path", { class: "sao-tome-litter-vein", d: `M${x1+4} ${y1-1}L${x2-4} ${y2+1}` });
  });
  [[25,374,3],[121,396,2],[197,378,3],[275,402,2],[338,377,3],[523,390,2],[587,360,3]].forEach(([cx,cy,r], index) => append(litter, "circle", { class: index % 2 ? "sao-tome-litter-fragment deep" : "sao-tome-litter-fragment", cx, cy, r }));

  const fruit = append(target, "g", { class: "sao-tome-collapsed-fruit", transform: "translate(465 363) rotate(-6)", "aria-hidden": "true" });
  append(fruit, "ellipse", { class: "sao-tome-fruit-shadow", cx: 0, cy: 31, rx: 92, ry: 19 });
  append(fruit, "path", { class: "sao-tome-fruit-rind", d: "M-88 4Q-77-28-41-34Q-9-49 15-30Q48-39 75-17Q96 2 82 24Q61 45 28 38Q-5 54-37 39Q-69 44-89 24Q-96 14-88 4Z" });
  append(fruit, "path", { class: "sao-tome-fruit-pulp", d: "M-70 3Q-59-18-34-21Q-10-33 8-19Q34-27 55-11Q70 1 61 15Q44 29 21 24Q-4 38-27 27Q-51 31-68 18Q-75 11-70 3Z" });
  append(fruit, "path", { class: "sao-tome-fruit-collapse", d: "M-61 13Q-44 0-25 10Q-10 3 7 15Q0 29-20 25Q-39 35-55 24Q-62 21-61 13Z" });
  append(fruit, "path", { class: "sao-tome-fruit-torn-rind", d: "M-72 15Q-101 31-82 54Q-48 58-21 39Q-54 43-72 15ZM60 18Q83 25 77 41Q59 50 35 36Q51 39 60 18Z" });
  append(fruit, "path", { class: "sao-tome-fruit-tear-edge", d: "M-72 15Q-49 28-21 39M60 18Q49 29 35 36" });
  [[-59,-11,4],[-35,18,2.5],[-11,-19,2],[13,23,3],[37,-6,2],[54,14,3],[71,3,2]].forEach(([cx,cy,r], index) => append(fruit, "circle", { class: index % 2 ? "sao-tome-fruit-mottle deep" : "sao-tome-fruit-mottle", cx, cy, r }));
}

function drawPohnpeiQG4739Scene(target, palette) {
  append(target, "rect", { class: "environment-sky pohnpei-cloudforest-sky", width: 600, height: 430, fill: palette[0] });

  const depth = append(target, "g", { class: "pohnpei-cloudforest-depth", "aria-hidden": "true" });
  append(depth, "path", { class: "pohnpei-high-haze", d: "M0 0H600V132Q546 112 492 128Q431 146 373 119Q308 89 248 116Q179 148 119 119Q57 89 0 111Z" });
  append(depth, "path", { class: "pohnpei-light-slit", d: "M522 0H582L553 86L521 161L491 213L507 222L544 174L572 100L600 37V0Z" });
  append(depth, "path", { class: "pohnpei-rear-slope", d: "M0 269Q91 251 177 250Q269 248 354 219Q452 185 600 126V318H0Z" });

  const rearTrunks = append(depth, "g", { class: "pohnpei-rear-trunks" });
  [
    [183, 286, 194, 198, 186, 86, "deep"],
    [255, 267, 246, 182, 259, 58, ""],
    [337, 244, 346, 155, 339, 28, "deep"],
    [420, 218, 412, 136, 430, 14, ""],
    [495, 193, 510, 112, 505, -8, "deep"],
    [569, 164, 558, 93, 574, -12, ""]
  ].forEach(([x1,y1,cx,cy,x2,y2,tone]) => append(rearTrunks, "path", { class: `pohnpei-rear-trunk ${tone}`.trim(), d: `M${x1} ${y1}Q${cx} ${cy} ${x2} ${y2}` }));

  append(depth, "path", { class: "pohnpei-mist-band upper", d: "M142 117Q244 91 350 103Q455 116 594 65L600 79Q462 130 348 118Q246 108 151 131Z" });
  append(depth, "path", { class: "pohnpei-mist-band middle", d: "M191 174Q302 145 406 156Q500 166 600 126V141Q501 181 403 171Q301 160 197 189Z" });
  append(depth, "path", { class: "pohnpei-mist-band lower", d: "M302 221Q390 192 471 198Q537 203 600 178V190Q537 216 469 211Q391 206 308 234Z" });

  append(target, "path", { class: "pohnpei-middle-slope", d: "M0 315Q95 302 184 289Q283 273 380 242Q490 207 600 163V344H0Z" });
  append(target, "path", { class: "pohnpei-forest-floor", d: "M0 359Q92 349 180 333Q281 315 380 282Q490 245 600 197V430H0Z" });
  append(target, "path", { class: "pohnpei-floor-contour", d: "M2 381Q101 366 190 350Q291 330 390 298Q495 264 598 221M213 385Q324 359 431 321Q506 294 578 263" });

  const understory = append(target, "g", { class: "pohnpei-understory", "aria-hidden": "true" });
  append(understory, "path", { class: "pohnpei-understory-stem", d: "M550 307Q538 271 547 235M551 286Q574 258 590 247M543 268Q519 248 508 230" });
  [
    [547,234,"M0 0Q-28-31-4-48Q23-42 29-13Q15 7 0 0Z",-5],
    [589,246,"M0 0Q-3-34 23-39Q47-19 40 7Q16 18 0 0Z",12],
    [508,230,"M0 0Q-35-13-29-39Q-5-55 24-35Q28-8 0 0Z",-17]
  ].forEach(([x,y,d,angle], index) => {
    const leaf = append(understory, "g", { transform: `translate(${x} ${y}) rotate(${angle})` });
    append(leaf, "path", { class: index === 1 ? "pohnpei-understory-leaf deep" : "pohnpei-understory-leaf", d });
    append(leaf, "path", { class: "pohnpei-understory-vein", d: "M0 0Q4-20 2-39" });
  });

  const palm = append(target, "g", { class: "pohnpei-ringed-palm", "aria-hidden": "true" });
  append(palm, "path", { class: "pohnpei-palm-column", d: "M20-12Q31 77 42 158Q51 233 73 309Q83 336 105 346L143 333Q114 299 106 236Q96 156 99 76Q102 29 101-12Z" });
  [38,78,121,166,211,253,290].forEach((y, index) => append(palm, "path", { class: index % 2 ? "pohnpei-trunk-ring deep" : "pohnpei-trunk-ring", d: `M${31 + index * 4} ${y}Q${64 + index * 2} ${y + 11} ${98 + index} ${y + 2}` }));
  append(palm, "path", { class: "pohnpei-root-lattice main", d: "M91 302Q58 330 12 356Q-4 365-12 384Q37 378 79 359Q112 344 133 327Z" });
  append(palm, "path", { class: "pohnpei-root-lattice arch", d: "M99 310Q126 325 157 344Q178 357 211 365L190 388Q157 377 130 352Q109 333 87 329Z" });
  append(palm, "path", { class: "pohnpei-root-lattice fork", d: "M77 313Q61 346 48 394L75 404Q82 365 107 329Z" });
  append(palm, "path", { class: "pohnpei-root-lattice rear", d: "M113 316Q139 321 175 317Q197 314 218 326L204 346Q171 338 136 344Z" });
  append(palm, "path", { class: "pohnpei-root-opening", d: "M86 333Q117 336 139 359Q115 377 76 375Q71 352 86 333Z" });

  const frond = append(target, "g", { class: "pohnpei-drooping-frond", "aria-hidden": "true" });
  append(frond, "path", { class: "pohnpei-frond-rachis", d: "M82 43Q179 13 275 29Q365 44 451 92" });
  [
    [116,35,-24,-45],[144,29,-18,-53],[175,25,-11,-58],[207,25,-3,-60],[239,28,7,-58],[271,34,17,-52],[303,43,27,-45],[335,54,36,-35],[366,67,44,-24],[397,81,48,-13],
    [126,37,-17,34],[158,31,-12,40],[191,29,-5,44],[224,30,4,46],[257,34,13,45],[290,41,23,42],[322,51,31,36],[353,63,38,29],[383,77,43,20],[414,91,46,12]
  ].forEach(([x,y,dx,dy], index) => append(frond, "path", { class: index % 4 === 1 ? "pohnpei-frond-leaflet deep" : "pohnpei-frond-leaflet", d: `M${x} ${y}Q${x + dx * .55} ${y + dy * .45 - 3} ${x + dx} ${y + dy}Q${x + dx * .47} ${y + dy * .6 + 4} ${x} ${y}Z` }));
  append(frond, "path", { class: "pohnpei-frond-tip", d: "M449 90Q478 103 499 130Q466 118 442 98Z" });

  append(target, "path", { class: "pohnpei-foreground-litter-bed", d: "M0 382Q91 365 181 379Q279 394 377 363Q480 331 600 349V430H0Z" });
  const litter = append(target, "g", { class: "pohnpei-leaf-litter", "aria-hidden": "true" });
  [[1,418,47,391],[58,430,109,399],[212,420,257,394],[278,430,326,399],[357,413,402,384],[520,422,565,393],[563,389,600,366]].forEach(([x1,y1,x2,y2], index) => {
    append(litter, "path", { class: index % 3 === 0 ? "pohnpei-litter-leaf green" : (index % 2 ? "pohnpei-litter-leaf deep" : "pohnpei-litter-leaf"), d: `M${x1} ${y1}Q${(x1+x2)/2} ${Math.min(y1,y2)-8} ${x2} ${y2}Q${(x1+x2)/2+5} ${Math.max(y1,y2)+6} ${x1} ${y1}Z` });
    append(litter, "path", { class: "pohnpei-litter-vein", d: `M${x1+4} ${y1-1}L${x2-4} ${y2+1}` });
  });
  [[25,378,3],[201,397,2],[267,376,3],[334,401,2],[495,380,3],[583,363,2]].forEach(([cx,cy,r], index) => append(litter, "circle", { class: index % 2 ? "pohnpei-litter-fragment deep" : "pohnpei-litter-fragment", cx, cy, r }));

  const fruit = append(target, "g", { class: "pohnpei-kotop-sample", transform: "translate(255 300) rotate(-7) scale(.82)", "aria-hidden": "true" });
  append(fruit, "ellipse", { class: "pohnpei-fruit-shadow", cx: 0, cy: 20, rx: 57, ry: 11 });
  append(fruit, "path", { class: "pohnpei-fruit-rind", d: "M-61 3Q-51-23-24-26Q3-34 30-22Q54-16 61 2Q63 21 43 31Q18 39-9 33Q-37 38-55 23Q-66 14-61 3Z" });
  append(fruit, "path", { class: "pohnpei-fruit-collapse", d: "M-44 5Q-30-11-12-4Q5-15 22-5Q39-7 47 7Q35 22 17 19Q-1 29-20 20Q-37 24-48 13Z" });
  append(fruit, "path", { class: "pohnpei-fruit-rind-fold", d: "M-48 4Q-31-8-15-3M10-13Q29-9 43 3M-33 24Q-12 15 8 22M22 18Q35 15 45 9" });
  [
    "M-45-7Q-37-13-29-8Q-34-1-43-2Z",
    "M-22 11Q-13 5-5 11Q-10 18-20 17Z",
    "M5-17Q14-20 20-13Q14-7 5-10Z",
    "M27 5Q39 2 43 10Q35 17 25 13Z"
  ].forEach((d, index) => append(fruit, "path", { class: index % 2 ? "pohnpei-fruit-mottle deep" : "pohnpei-fruit-mottle", d }));
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
  if (profile.id === "kauai-kokee-upland-forest") {
    drawKauaiKokeeScene(target, palette);
    return;
  }
  if (profile.id === "canberra-oconnor-fig-garden") {
    drawCanberraOConnorScene(target, palette);
    return;
  }
  if (profile.id === "auckland-eca36-garden-grass") {
    drawAucklandGardenGrassScene(target, palette);
    return;
  }
  if (profile.id === "cunco-ju4400-compost-garden") {
    drawAraucaniaCuncoScene(target, palette);
    return;
  }
  if (profile.id === "trivandrum-zoo-botanical-garden") {
    drawTrivandrumBotanicalGardenScene(target, palette);
    return;
  }
  if (profile.id === "singapore-zf1220-starfruit-garden") {
    drawSingaporeStarfruitGardenScene(target, palette);
    return;
  }
  if (profile.id === "praslin-yr106-granitic-palm-forest") {
    drawPraslinGraniticPalmForestScene(target, palette);
    return;
  }
  if (profile.id === "sao-tome-ju2484-forest-floor") {
    drawSaoTomeForestFloorScene(target, palette);
    return;
  }
  if (profile.id === "pohnpei-qg4739-paies-kotop-cloudforest") {
    drawPohnpeiQG4739Scene(target, palette);
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
