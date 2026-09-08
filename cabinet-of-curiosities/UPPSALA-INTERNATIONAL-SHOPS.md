# International online shops, v114 preview

The approved v113 drawer and map were published first on 8 September 2026 as `e5323a6`, branch `codex/cabinet-v75-deploy`. GitHub Pages run 34216055996 succeeded. Live files matched local source; live desktop and phone checks passed.

Martyna approved deployment of all changes on 8 September 2026, together with the v116 mobile refinements and brand corrections below.

## Exact English interface wording

This Cabinet interface is intentionally English-only, consistent with the existing map. No Swedish or Polish interface versions exist here.

- Region group accessible name: Online shop regions
- Region buttons: Sweden / Other Nordics / Rest of Europe
- Country under existing Swedish online shops: Sweden
- Country under Piccantino: Austria

There are 13 Swedish online shops, 2 other Nordic shops and 4 shops elsewhere in Europe. Classification uses the retailer's location, not its domain suffix. Piccantino's Austrian operator is documented at https://www.piccantino.se/info/impressum .

## New shop wording and primary sources

Catalogue listings are not a live stock guarantee. KaffeBox's 26-brand filter and Bean to Bite's 21-maker directory were checked. Chocoladeverkopers includes its category directory and two additional brands featured on its homepage. Cocoa Runners shows a curated 54-brand selection from its larger maker directory, not an exhaustive inventory; its Product details link opens that directory.

### Zotter

Austria

Brands sold: Zotter.

- Website: https://www.zotter.at/online-shop/produktuebersicht

### Cocoa Runners

United Kingdom

Brands sold: Aroko, Auro Chocolate, Baianí, Bare Bones, Chocolat Bonnat, Cacaosuyo, Casa Cacao, Chocolarder, Chocolat Madagascar, Chocolate Tree, Chocolatemakers, Dandelion Chocolate, Dick Taylor Craft Chocolate, Dormouse Chocolates, Duffy’s Chocolate, Firetree, Fjåk, Fossa, Friis-Holm, Fruition, Fu Wan Chocolate, Georgia Ramon, Heinde & Verre, Höganäs, Hogarth, Karuna, Krak Chocolade, Latitude, Luisa Abram, Manoa, Maraná, Marou, Mestico, Mirzam, Chocolate Naive, NearyNogs, Ocelot, Oialla, Omnom, Original Beans, Palette de Bine, François Pralus, Pump Street Chocolate, Qantu, Raaka, Ritual Chocolate, Rózsavölgyi Csokoládé, Sirene, Soma, Standout Chocolate, Storm & Bille, Svenska Kakao, Willie’s Cacao, Zotter.

- Website: https://cocoarunners.com/shop/
- Product details: https://cocoarunners.com/makers/

### Chocoladeverkopers

Netherlands

Brands sold: Amano, Auro, Booja Booja, Cacao Hunters, Cacaosuyo, Casa Cacao, Chocolatemakers, Chocolat Madagascar, Chocolate Tree, Chocolatoa, Dandelion, Definite Chocolate, Feitoria do Cacao, Fjåk, Fossa, Friis-Holm, Fu Wan, Fruition, Georgia Ramon, Heinde & Verre, Hogarth, Huma Chocolate, Idilio, Krak Chocolade, Krakakoa, Kuná, Latitude Craft Chocolate, London Chocolate, Manoa, Maraná, Marou, Mesjokke, Moka Origins, A. Morin, Chocolate Naive, Omnom, Original Beans, Paccari, Palette de Bine, Paradai, Potomac, François Pralus, Pump Street Chocolate, Qantu, Raaka, Ritual, Rózsavölgyi Csokoládé, Sirene, Solkiki, Soma, Standout Chocolate, Taza, To’ak, Willie’s Cacao, Zoto, Zotter, Pure Chocolate, Wild Chocolate.

- Website: https://chocoladeverkopers.nl/chocolade/
- Delivery information: https://chocoladeverkopers.nl/verzending/

### KaffeBox

Norway

Brands sold: A. Morin, Auro Chocolate, Choba Choba, Chocolat Madagascar, Definite Chocolate, Fjåk, Fjorden Sjokolade, Friis-Holm, Georgia Ramon, Höganäs Chocolate, Krakakoa, Kuná, Latitude, Maraná, Mesjokke, Chocolate Naive, Nittedal Sjokoladefabrikk, Ocelot, Original Beans, François Pralus, PURE Chocolate, Soklet, Standout Chocolate, Storm & Bille, Vigdis Rosenkilde, Zotter.

- Website: https://www.kaffebox.no/product-category/chocolate/

### Bean to Bite

Denmark

Brands sold: Aroko, Awki, Baiani, Definite Chocolate, Fjåk, Kuyay, Luisa Abram, Mestico, Oialla, Friis-Holm, Chocolate Naive, Qantu, Standout Chocolate, Beaningful, Svenska Kakao, Karuna, Manoa, NearyNogs, Chocolate Tree, Auro Chocolate, Herufek.

- Website: https://beantobite.dk/shop/
- Product details: https://beantobite.dk/makers/

Additional sources: https://chocoladeverkopers.nl/ and https://beantobite.dk/om-bean-to-bite/ .

## Verification and scope

### v116 release additions

- Tantens Gröna: Brands sold: Zotter, Chocolate Tree, WermlandsChoklad, Chocolate Organiko, Original Beans.
- Both Bönor & Blad branches: Brands sold: Marou.
- These stock corrections come directly from Martyna. Summerbird is removed from the map data.
- Portrait navigation reuses the existing English label Cabinet view in the upper-right position. When exploring, the same control uses the existing Browse collection label to return to the scrolling list. The duplicate button below the picture is removed.
- Landscape phones use the full viewport height without changing the scene's aspect ratio. Navigation and zoom controls overlay the scene; the header background is transparent so it does not shade the wrappers.
- The existing paper corner has a slow 3.8-second light pulse. Reduced motion disables the pulse. No source image, alpha layer, coordinates or background pixels were edited.
- Twelve final browser cases cover both themes at 360, 768, 1024, 1440, 844 landscape and 740 landscape. Full-page dimensions are 360 × 4415, 768 × 2775, 1024 × 800, 1440 × 1000, 844 × 390 and 740 × 360. The separate portrait exploration views are 360 × 800 and 768 × 900.
- Final checks include navigation in both directions, full-height proportional scene geometry, pinch zoom, one-finger drag, keyboard pan/zoom, reset, reduced motion, map opening, focus restoration, brand corrections, geographic shop grouping and no horizontal overflow or JavaScript errors.
- Release files: cabinet.js, cabinet.css, cabinet-map.js, cabinet-map.css, cabinet-map-data.js and index.html, plus this new report. No production files deleted. Game files and source artwork are untouched. Physical phones and Safari remain manual checks.

### Earlier v114 checks

- Ten browser cases passed, combining light/dark themes with widths 360, 768, 1024, 1440 and landscape 844 px.
- Uncropped full-page proofs: 360 × 4483, 768 × 2843, 1024 × 800, 1440 × 1000 and 844 × 390 px, in both themes.
- Verified all 19 online entries, country grouping, regional selection memory, keyboard activation, Escape/focus restoration, reduced motion, unchanged 11 physical locations, no horizontal overflow and no JavaScript errors.
- Existing drawer animation and live delivery were verified before the additions; the new code does not change their implementation.
- Physical phones and Safari remain untested.
- Four files changed: index.html, cabinet-map-data.js, cabinet-map.js, cabinet-map.css. This report is the only new production documentation file. No files deleted.
- No artwork, alpha layers or files under game-of-worms changed.
