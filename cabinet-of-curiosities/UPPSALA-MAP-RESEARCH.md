# Uppsala chocolate map: v113 approved release

## Release approval, 8 September 2026

Martyna explicitly requested publication of the current v113 drawer/map and shop selections, including Small Island Chocolates, before international-shop work. The normal Cabinet URL now enables the exact approved feature without requiring a prototype parameter. The entries below and existing English-only wording are unchanged. Earlier preview status notes below are historical; deployment verification is recorded separately. The international shops and geographic grouping are not part of this release.

## Small Island Chocolates, 8 September 2026

Added Small Island Chocolates & Coffee to Online shops. Read the live [webshop](https://www.smallislandchocolates.com/Webbshop) through its final load-more page in Chromium. Exact English-only public wording: “Brands sold: Tobago Estate, Amedei, Blanxart, François Pralus, Friis-Holm, Georgia Ramon, Storm & Bille, Svenska Kakao, Chocolat Bonnat, Nordic Chocolate, Original Beans, Chocolate Organiko, Zotter, Marou, WermlandsChoklad, Willie’s Cacao, Venchi.”

The shop labels Svenska Kakao as Svenska Kakaobolaget and Chocolate Organiko as Chocolate Organico; the preview uses the existing normalized brand names. Zotter is listed through its Labooko range. Includes catalogue bars marked out of stock, without an availability promise. Omnom appeared in older indexed pages but not the current loaded catalogue, so was not added. Baking-only Valrhona/Amaribe cocoa, Mathez truffles and unrelated sweets were excluded. No Uppsala location was added: this is the Stockholm shop's online entry.

Changed the map data, its cache key and this report only. No production files created or deleted; no artwork, alpha, coordinates, interaction or Game changes. Not committed or deployed.

v113 verification: syntax and diff checks pass. All ten browser cases (five viewports, both themes) pass, including exact new copy and website URL, 14 online choices, 11 physical markers, earlier corrections, keyboard/focus, drawer cancellation and reduced motion, no page errors or overflow. Full-page proofs: 360 × 4483, 768 × 2843, 1024 × 800, 1440 × 1000 and 844 × 390 pixels in each theme. Physical devices and Safari remain untested.

Checked 7 September 2026. This supersedes the earlier v108/v109 research and interaction. Not deployed. Cabinet copy intentionally remains English-only, consistent with the existing Cabinet; exact wording is available in the preview and below for Martyna's verification before publication.

## Shop corrections v112, 8 September 2026

Added Friis-Holm and Elemento to Limhamn, confirmed on its [homepage](https://www.chokladhusetlimhamn.se/). Added [Piccantino’s Zotter category](https://www.piccantino.se/zotter-choklad) to Online shops. ICA and Arrenius brands below were supplied firsthand by Martyna on 8 September, not independently verified branch inventory. Food by Nature is displayed without a domain suffix.

Removed Stella from both Chocolat entries and Majani from both Bönor & Blad entries and Delitea at Martyna’s request. These are curation decisions, not claims that the shops no longer sell those brands. Public copy remains intentionally English-only. No coordinates, artwork, alpha layers, styles or interaction code changed. Local preview only.

Verification for v112: the five-viewport, two-theme browser matrix passed again, including exact new brand strings, removal of Stella and Majani, 13 online choices, 11 physical pins, drawer opening, keyboard/focus and reduced-motion checks. No page errors or horizontal overflow. Uncropped full-page screenshots have the dimensions listed below; desktop and phone proofs were visually reviewed. Changed only the data file, its cache key in index.html, and this report. No production files created or deleted, no Game changes, no commit or deployment. Physical devices and Safari remain untested.

## Marker correction v111, 8 September 2026

The previous 44-pixel collision-avoidance layout could push a numbered label far from its geographic dot. Torgkassen was particularly misleading. Its stored latitude/longitude have not changed: 59.8623261, 17.6462107. [ICA's own store page](https://www.ica.se/butiker/supermarket/uppsala/ica-supermarket-torgkassen-1003821/) reconfirms Vaksalagatan 30.

All marker buttons are now 24 × 24 pixels, with compact 11-pixel numbers. The 44-pixel shop selector remains an alternative touch control. Isolated locations are placed first; a bounded search reconsiders crowded label positions instead of sending the final labels far away. Geographic dots remain exact, and label centres stay within 40 CSS pixels of their dots. Torgkassen remains directly above its point, with no lateral offset, in every tested default view. Reduced fitting margins permit a closer overview on desktop while retaining every shop.

The full five-viewport, two-theme matrix was rerun. All eleven markers are visible and their 24-pixel hit boxes do not overlap in the default overview. Tests check the maximum offset and Torgkassen's 13-pixel vertical placement explicitly. Full-page proof dimensions are unchanged from the table below. Keyboard, touch, focus, drawer, reduced-motion and normal-URL regression checks pass; no page errors or horizontal overflow. JavaScript syntax and diff checks pass. Physical phones and Safari remain untested.

Changed for v111: `cabinet-shop-map.js`, `cabinet-map.css`, `index.html` (cache keys), and this report. No files created or deleted for this correction. No artwork, alpha layers, coordinates, public wording or Game of Worms changes. No commit or deployment.

## Current preview

[Open v113](http://127.0.0.1:8773/cabinet-of-curiosities/index.html?prototype=uppsala&preview=v113-small-island)

- A new, separately versioned SVG gives the map corner a thin paper edge, asymmetric tip, soft folds, curl and contact shadow. Its real street/river geometry comes unchanged from the v109 OSM source. No visible lettering.
- Tap, Enter or Space starts a 900 ms drawer slide with a quiet, original synthesized friction/creak sound. The dialog opens automatically at 940 ms. Escape can cancel the opening. Closing the dialog resets the drawer and restores focus.
- Audio starts only from the activating gesture. Missing or blocked audio does not block the dialog. Reduced-motion mode skips movement and sound and opens the dialog immediately.
- The drawer front is a separate CSS presentation of the existing, unchanged furniture photograph, aligned with the original front. No source image pixels were altered.
- All 11 physical shops appear together on the map. Numbered callouts are separated to avoid overlap, with leaders ending at the exact recorded coordinates. The picker and markers select the same shop. Zoom, drag, keyboard pan and All shops are available.
- There are 14 online choices and 12 Swedish makers. Physical shops with a verified webshop also appear in Online shops.
- Removed personal note fields, save feedback, export/download controls and note-storage access. Previously stored browser data was not deleted.
- Removed old research-failure messages and obsolete selection/caution text from the runtime data. ICA and Arrenius brand selections now use Martyna’s firsthand observations.
- The normal URL remains unchanged; the feature requires the prototype query parameter.

## Confirmed brands in the requested scope

These are catalogue brands or the user-confirmed selections identified above, not a live stock guarantee. Lists focus on bean-to-bar and fine craft chocolate, not every confectionery item. A retailer carrying one bean-to-bar brand is not described as making all its own chocolate from beans. Mixed ranges remain mixed; generic confectionery and La Praline are excluded.

| Shop | Exact brands used in the preview |
| --- | --- |
| [Arrenius & Company](https://www.arreniuscompany.com/) | Chocolate Tree, WermlandsChoklad, Storm & Bille |
| [Tehörnan](https://teshop.se/produkt-kategori/godsaker-kryddor/choklad) | Malmö Chokladfabrik, Svenska Kakao, Valrhona, WermlandsChoklad |
| [Bönor & Blad Stora torget](https://bonorochblad.se/collections/choklad-tryfflar) | Marou, Summerbird |
| [Bönor & Blad Gränbystaden](https://bonorochblad.se/collections/choklad-tryfflar) | Marou, Summerbird |
| [Fair Trade Shop Globalen](https://globalen.nu/produkt-kategori/choklad/) | Chocolatemakers, Zotter, Fairafric |
| [Chocolat Svava](https://www.chocolat.se/chokladkakor) | Malmö Chokladfabrik, Valrhona, Cluizel, Amedei |
| [Chocolat Boländerna](https://www.chocolat.se/chokladkakor) | Malmö Chokladfabrik, Valrhona, Cluizel, Amedei |
| [ICA Supermarket Torgkassen](https://www.ica.se/butiker/supermarket/uppsala/ica-supermarket-torgkassen-1003821/) | Food by Nature, Blanxart, Malmö Chokladfabrik |
| [ICA Kvantum Gottsunda](https://www.ica.se/butiker/kvantum/uppsala/ica-kvantum-gottsunda-1004218/) | Malmö Chokladfabrik |
| [ICA Kvantum Uppsala Gränby](https://www.ica.se/butiker/kvantum/uppsala/ica-kvantum-uppsala-1003871/) | Malmö Chokladfabrik |
| [Tantens Gröna Skafferi & Garderob](https://tantensgrona.se/skafferiet/godis/choklad/) | Zotter, Chocolate Tree, WermlandsChoklad, Chocolate Organiko |
| [Delitea](https://www.delitea.se/malmo-chokladfabrik) | Chocolat Bonnat, Standout Chocolate, Höganäs Chocolate, Marou, Malmö Chokladfabrik, Valrhona, Willie’s Cacao, WermlandsChoklad, Chocolate Amatller, Simón Coll |
| [Zebeda Chocolate](https://www.zebeda.se/handla-online/) | Original Beans, Blanxart, Kamm, Ethiquable, Ocelot, Zebeda Chocolate |
| [Beriksson](https://beriksson.se/sv-se/choklad-konfektyr/bean-to-bar-choklad) | Marou, WermlandsChoklad |
| [Adoro](https://adoro.se/produkt-kategori/choklad/chokladkakor-huvudproduktkategori/) | Amedei, Willie’s Cacao |
| [Chokladhuset i Limhamn](https://www.chokladhusetlimhamn.se/category/varumarken) | Paradai, Cluizel, Friis-Holm, Elemento |
| [Piccantino](https://www.piccantino.se/zotter-choklad) | Zotter |
| [Lindroos](https://shop.lindrooshalsa.se/zotter-choklad/71-chokladkakor) | Zotter |
| [Gryningen](https://www.gryningen.eu/collections/topplista) | Zotter, WermlandsChoklad |

### Important corrections and sources

- Globalen: [its sailed chocolate product](https://globalen.nu/produkt/seglad-mork-choklad-70-kakaonibs-havssalt/) explicitly identifies Chocolatemakers in Amsterdam. The producer is not merely the importer El Puente. The [chocolate category](https://globalen.nu/produkt-kategori/choklad/) also confirms Zotter and Fairafric. All five category pages were inspected.
- Tehörnan: [page 1](https://teshop.se/produkt-kategori/godsaker-kryddor/choklad), [page 2](https://teshop.se/produkt-kategori/godsaker-kryddor/choklad/page/2) and [page 3](https://teshop.se/produkt-kategori/godsaker-kryddor/choklad/page/3) confirm Malmö Chokladfabrik, Svenska Kakao, Valrhona and WermlandsChoklad. The last is present as truffles; no Wermlands bar stock is implied. The spoken name “Wernerschokolat” is interpreted as WermlandsChoklad on this evidence.
- Tantens Gröna: the [full chocolate category](https://tantensgrona.se/skafferiet/godis/choklad/) was readable in the browser during this check, despite an older cached search response showing a challenge. Zotter, Chocolate Tree, WermlandsChoklad and Chocolate Organiko products were found. [Organiko's own description](https://shop.chocolateorganiko.com/gb/) establishes its small-workshop chocolate and cocoa sourcing. Other general organic confectionery was not added automatically.
- Bönor & Blad: both [catalogue pages](https://bonorochblad.se/collections/choklad-tryfflar?page=2) were inspected; extra page-two confectionery does not extend the current two-brand selection after the requested Majani removal.
- Delitea: the [current chocolate category](https://www.delitea.se/choklad-och-chokladstycksaker) and brand filter confirm the ten retained names above, including Bonnat, Standout, Höganäs and Marou. No entire brand is claimed to be in stock.
- Zebeda: [shop categories](https://www.zebeda.se/handla-online/) confirm all six names above. Ocelot belongs to the fine-craft scope, not an assertion of own-bean processing.
- Beriksson: its [bean-to-bar category](https://beriksson.se/sv-se/choklad-konfektyr/bean-to-bar-choklad) contains both Marou and WermlandsChoklad.
- Limhamn: the [brand catalogue](https://www.chokladhusetlimhamn.se/category/varumarken) confirms both Paradai and Cluizel. The link now opens the brand catalogue, not only Paradai.
- Adoro: its [bar catalogue](https://adoro.se/produkt-kategori/choklad/chokladkakor-huvudproduktkategori/) confirms Amedei and Willie's Cacao. No Paradai assignment to Adoro was made.
- Gryningen: [chocolate and bars](https://www.gryningen.eu/collections/godis-choklad-bars) confirms Zotter and WermlandsChoklad.
- Lindroos: [Zotter bar category](https://shop.lindrooshalsa.se/zotter-choklad/71-chokladkakor) remains linked.
- Chocolat: the [bar catalogue](https://www.chocolat.se/chokladkakor) confirms the four retained brands above; branch-specific availability remains untested.

No orders, accounts, checkout tests or branch inventory inquiries were made. Broad “all available brands” promises are deliberately not made: catalogues change, and the scope excludes generic sweets. Toppchoklad's own site describes production at WermlandsChoklad; it was not added to the Swedish own-bean maker list as a separate verified bean-to-bar factory.

## Public wording for review

The public preview uses these exact new/retained functional phrases:

- “Uppsala, in chocolate”
- “Bean-to-bar and fine craft chocolate in Uppsala and online.”
- “In Uppsala”, “Online shops”, “Swedish makers”, “Choose a shop”
- “Brands sold: ” followed by the applicable comma-separated brand list above and a full stop.
- “WermlandsChoklad is sold here as truffles.”
- “Select a numbered pin or choose a shop. Brands and availability can vary by branch.”
- “All shops”, “Close”, “Zoom in”, “Zoom out”
- “Website”, “Shop online”, “Product details”, “How it is made”, “Delivery information”, “Address source”, “Open location”
- “This section focuses on Swedish bean-to-bar and tree-to-bar chocolate. These makers start with cocoa beans rather than remelting ready-made chocolate. For makers with mixed ranges, look for their bean-to-bar bars.”

No draft/prototype label, decorative dot separator, en dash or em dash is shown in owned dialog text. Map attribution remains intact. Names, addresses and English-only maker descriptions remain reviewable in the actual dialog.

| Swedish maker | Type shown | Exact description |
| --- | --- | --- |
| [Malmö Chokladfabrik](https://malmochokladfabrik.se/) | Bean-to-bar range | Bean-to-bar bars from Malmö, including Alta Verapaz and Sambirano. Choose the bean-to-bar range within its wider chocolate collection. |
| [Storm & Bille](https://stormochbille.se/collections) | Bean-to-bar | Made from cocoa beans in Göteborg. The range includes single-origin bars from Uganda, Belize, India and Nicaragua. |
| [Svenska Kakao](https://svenskakakao.se/pages/shop) | Bean-to-bar | Chocolate made from cocoa beans in Skåne. The direct webshop includes their bean-to-bar bars. |
| [Standout Chocolate](https://www.standoutchocolate.com/en/shop/) | Bean-to-bar | Made from cocoa beans in Mölndal. Single-origin bars include Belize Maya Mountain, Madagascar Sambirano and Uganda Semuliki Forest. |
| [Nordic Chocolate](https://nordicchocolate.se/produktkategori/chokladkakor/smaksatta/) | Bean-to-bar | Made from cocoa beans in Umeå, with a range that includes Nordic berries and other local flavourings. |
| [Höganäs Chocolate](https://www.hoganaschocolate.eu/chocolate-bars) | Tree-to-bar | Tree-to-bar chocolate made with cocoa from the family farm, Hacienda San Jose in Ecuador. |
| [Gånsviks Choklad](https://www.gansvikschoklad.se/shop) | Bean-to-bar range | Dark and milk bean-to-bar bars made in Härnösand, alongside a separate praline collection. |
| [Skokloster Choklad](https://www.skoklosterchoklad.se/karleksfull-choklad/) | Bean-to-bar | A maker near Uppsala producing chocolate from cocoa beans. Its webshop advertises home delivery. |
| [Det lilla chokladmakeriet i Uppsala](https://thechocolatemakery.se/) | Bean-to-bar range | A local maker whose website describes making its own chocolate from cocoa beans and offers chocolate tastings. |
| [Choklad i Väst](https://www.chokladivast.se/choklad-i-v%C3%A4st-e-handel/) | Bean-to-bar | Chocolate made from cocoa beans in Lysekil. The website provides an online shop link. |
| [Chokladstallet](https://www.chokladstallet.se/bean-to-bar) | Bean-to-bar range | A maker in Burs on Gotland with a separate bean-to-bar range alongside its pralines. |
| [WermlandsChoklad](https://wermlandschoklad.se/vart-sortiment/) | Tree-to-bar | Made in Värmland with cocoa from Ecuador. The maker describes a tree-to-bar partnership with the Santa Teresa plantation, whose owner is a co-owner of the chocolate company. |

The maker list was researched through [Chokladakademien](https://www.chokladakademien.org/hantverkschoklad2/), [Chof Sweden](https://chof.nl/makers/country/sweden), and linked primary maker/process pages. Mixed-range status is preserved. Catalogue links do not imply tested delivery to an Uppsala postcode.

## Geographic evidence


Coordinates are cached from OpenStreetMap, fetched using Overpass on 7 September 2026; source database timestamp `2026-09-07T19:19:54Z`. Standard OpenStreetMap raster tiles supply the real roads and river. A local Web Mercator renderer projects the recorded coordinates. No streets were drawn or invented. Each shop has a source-node link; indoor pins are mapped shop positions, not surveyed entrances.

| Shop | OSM node | Latitude | Longitude |
| --- | --- | --- | --- |
| Arrenius | [5109382120](https://www.openstreetmap.org/node/5109382120) | 59.8573812 | 17.6365057 |
| Tehörnan | [4339483507](https://www.openstreetmap.org/node/4339483507) | 59.8607954 | 17.6345921 |
| Bönor & Blad, city | [6919683235](https://www.openstreetmap.org/node/6919683235) | 59.8582263 | 17.6390426 |
| Bönor & Blad, Gränby | [12030761651](https://www.openstreetmap.org/node/12030761651) | 59.8770760 | 17.6736690 |
| Globalen | [6612680518](https://www.openstreetmap.org/node/6612680518) | 59.8564923 | 17.6429352 |
| Chocolat, Svava | [2449594409](https://www.openstreetmap.org/node/2449594409) | 59.8580305 | 17.6432477 |
| Chocolat, Boländerna | [1716674985](https://www.openstreetmap.org/node/1716674985) | 59.8528353 | 17.6842979 |
| ICA Torgkassen | [469340148](https://www.openstreetmap.org/node/469340148) | 59.8623261 | 17.6462107 |
| ICA Gottsunda | [2008618249](https://www.openstreetmap.org/node/2008618249) | 59.8102696 | 17.6301139 |
| ICA Gränby | [838198371](https://www.openstreetmap.org/node/838198371) | 59.8772603 | 17.6734929 |
| Tantens Gröna | [598574704](https://www.openstreetmap.org/node/598574704) | 59.8380440 | 17.5766490 |

Map and coordinate data © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright), [ODbL 1.0](https://opendatacommons.org/licenses/odbl/1-0/). Attribution is also visible inside the prototype.


## Map service and artwork

The local renderer uses standard Web Mercator with native browser requests to OpenStreetMap raster tiles. It introduces no external JavaScript dependency, requests only visible tiles while the dialog map is open, uses ordinary browser HTTP caching and Referer, and keeps attribution visible. No geolocation, offline/bulk download or tile prefetch is used. [OSM tile usage policy](https://operations.osmfoundation.org/policies/tiles/) was checked.

The v110 paper source/licence is recorded in `assets/uppsala-map-corner-v110-SOURCE.md`. The v109 source SVG remains preserved.

## Files and verification

Created this turn: `cabinet-shop-map.js`, `assets/uppsala-map-corner-v110.svg`, `assets/uppsala-map-corner-v110-SOURCE.md`.

Changed this turn: `cabinet-map.js`, `cabinet-map.css`, `cabinet-map-data.js`, `index.html`, this report. The existing uncommitted v108/v109 prototype files were continued in place.

Deleted: none. No changes to `game-of-worms/`. Unrelated experimental assets were preserved. Branch `codex/cabinet-v75-deploy`, base commit `7ef0268`; no new commit or deployment.

Edge/Chromium automated checks passed for light and dark themes, each with uncropped full-page screenshots of the closed cabinet, map, online shops and makers:

| Viewport | Full-page proof dimensions |
| --- | --- |
| Phone portrait 360 × 800 | 360 × 4483 pixels |
| Tablet 768 × 900 | 768 × 2843 pixels |
| Desktop 1024 × 800 | 1024 × 800 pixels |
| Wide desktop 1440 × 1000 | 1440 × 1000 pixels |
| Phone landscape 844 × 390 | 844 × 390 pixels |

Additional complete-page wide captures show an intermediate drawer-opening frame. Visual review included the paper silhouette, fold, positioning in the drawer slit, moving front alignment, both themes, marker spacing and mobile dialog layout.

Tested: tap and keyboard activation; delayed modal opening; Escape cancellation and focus restoration; reduced motion; missing/blocked AudioContext fallback; sound context cleanup; all eleven markers visible; non-overlapping callout touch targets; picker/marker synchronization; exact coordinate projection within 0.000001 pixel; tile image loading; zoom/reset, arrow-key and pointer panning; all category copy; removal of notes and technical research messages; no horizontal page overflow; no page JavaScript errors; normal URL unchanged.

SHA-256 checks reconfirmed the unchanged approved background, foliage, both object layers and Chof icon:
- `cabinet-study-unified-v2.png`: `03d7f5829e4d5fa0627811e13b1f471362fcb90d70c42567081fe30e253e1d0c`
- `cabinet-frame-foliage-v2.png`: `4dfec42b0696ed303166b3542e6db1f915cac527ebdcc5e9b73d098fddceec3e`
- `cabinet-photo-objects-v75.svg`: `e94f76341a2f5d95d7c6888ba7c4699976de34b07ca8e8fa92b3ca6c4c1591fc`
- `cabinet-photo-objects-v76.svg`: `aafa5496ced8d57eba13f97486a66ec5e6046187cd3569625acfd9ed14c0a8f6`
- `chof-chocolate-sun-v1.png`: `9d75e800421dc7cbe79635c7a1d016bc4a5decdf8fe461a88e6f0b463d5edaf6`

Still unverified: physical phones and Safari, subjective sound quality on device speakers, branch stock and delivery checkout. Tantens Gröna's exact entrance number (site gives 188 and 190) and final public wording still need confirmation. No invented entrance number is displayed.
