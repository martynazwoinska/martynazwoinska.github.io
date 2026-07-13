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
    "santeuil-viosne-vexin", "Viosne valley below the Vexin plateau",
    "Santeuil lies where the Viosne valley cuts into the open Vexin plateau, creating wetter valley-floor habitats below a compact rural settlement.",
    "Vexin Centre authority", "https://ccvexincentre.fr/santeuil/",
    palettes.temperate, [[0, 248], [145, 245], [245, 262], [325, 304], [405, 275], [495, 246], [600, 244]],
    { water: "stream", weather: "sun", cues: [["village", 490, 255, .75], ["reeds", 300, 355, .8], ["fields", 105, 315, .9]] }
  ),
  "Edinburgh, Scotland": profile(
    "edinburgh-holyrood", "Arthur’s Seat and Salisbury Crags",
    "The supplied coordinates point to Edinburgh, where an ancient volcanic landscape of crags, grasslands, and lochs rises from the city.",
    "Historic Environment Scotland", "https://www.historicenvironment.scot/visit/all/holyrood-park/",
    palettes.volcanic, [[0, 306], [90, 290], [150, 252], [215, 184], [280, 218], [346, 267], [410, 244], [492, 284], [600, 292]],
    { water: "pond", weather: "cloud", cues: [["crags", 300, 284, .9], ["stonecity", 505, 280, .75], ["reeds", 95, 355, .7]] }
  ),
  "Tenerife, Spain": profile(
    "tenerife-teide", "Teide above the sea of clouds",
    "Tenerife’s high landscape is structured by Teide, Las Cañadas, lava formations, and strong elevation zones—not a generic tropical seascape.",
    "UNESCO Teide National Park", "https://whc.unesco.org/en/list/1258",
    palettes.volcanic, [[0, 300], [78, 286], [145, 268], [225, 220], [298, 98], [365, 226], [445, 260], [525, 282], [600, 294]],
    { weather: "cloudbank", cues: [["lava", 95, 352, .9], ["broom", 500, 330, .8], ["caldera", 295, 290, .8]] }
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

const aliases = {
  "São Paulo region, Brazil · EG5612": "Angra dos Reis, Rio de Janeiro · EG5612",
  "New South Wales, Australia · QG2814": "Nambucca Heads, New South Wales · QG2814",
  "Scotland, Great Britain": "Edinburgh, Scotland"
};

export const environmentProfileEntries = Object.freeze(Object.entries(canonicalProfiles));

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

export function renderEnvironmentScene(target, profile, habitatElement) {
  if (!target || !profile) return;
  const palette = profile.palette;
  target.replaceChildren();
  target.dataset.profile = profile.id;
  habitatElement?.style.setProperty("--environment-accent", palette[5]);
  habitatElement?.style.setProperty("--environment-land", palette[2]);
  habitatElement?.style.setProperty("--environment-ground", palette[3]);
  habitatElement?.style.setProperty("--environment-water", palette[4]);
  habitatElement?.style.setProperty("--environment-detail", palette[6]);

  append(target, "rect", { class: "environment-sky", width: 600, height: 430, fill: palette[0] });
  drawWeather(target, profile.weather, palette);
  append(target, "path", { class: "environment-far", d: ridgePath(profile.ridge), fill: palette[1] });
  if (profile.near) append(target, "path", { class: "environment-near", d: ridgePath(profile.near), fill: palette[2] });
  drawWater(target, profile.water, palette);
  append(target, "path", { class: "environment-ground", d: "M0 354 Q138 324 285 354 T600 342 V430 H0Z", fill: palette[3] });
  profile.cues.forEach(cue => drawFeature(target, cue));
}
