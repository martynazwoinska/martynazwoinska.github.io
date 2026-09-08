# Swedish maker additions

Preview v117 approved for publication by Martyna on 8 September 2026, including her Tobago wording and the removal of Lustigbacken's postal-order sentence.
The Cabinet map is intentionally English-only; it has no Swedish or Polish translation layer. No other language strings change.

## Exact new public wording

Credit: With thanks to [Chokladakademien](https://www.chokladakademien.org/hantverkschoklad2/) for the maker directory.

| Name | Classification | Description |
| --- | --- | --- |
| Labys Choklad | Bean-to-bar | Bean-to-bar chocolate made in Hedemora, Dalarna. The range includes dark and milk chocolate. |
| Göteborgs Hantverkschoklad | Bean-to-bar | Small-batch chocolate made in Göteborg from cocoa beans roasted and stone-ground in its own factory. |
| I am Coffee & Chocolate | Bean-to-bar | A coffee roastery and bean-to-bar chocolate maker in Halmstad. Its chocolate range includes Togo single-origin dark chocolate. |
| Jonsereds Choklad | Bean-to-bar | A bean-to-bar maker included in Chokladakademien’s Swedish directory. |
| Johannas Choklad | Bean-to-bar | Chocolate made in Kalmar from cocoa beans grown in Tanzania. |
| Kakstugan i Tällberg | Bean-to-bar range | A bean-to-bar chocolate range made in Tällberg, alongside its bakery and coffee roastery. |
| Ljungbergs choklad | Bean-to-bar range | A maker in Bollebygd with a partly bean-to-bar range. |
| Lustigbacken 3 | Bean-to-bar | Chocolate made from cocoa beans in Gammelstad, with a small café and shop. |
| Sthlm Bean to Bar | Bean-to-bar | Its website offers a 72% dark chocolate made with cocoa from Tumaco, Colombia. |
| Tobago Cocoa Estate | Estate chocolate | Cocoa grown on Tobago, with chocolate made in partnership with the French François Pralus and the Danish Friis-Holm. |

The existing twelve maker entries are unchanged. All twenty-two maker names are sorted alphabetically using Swedish collation. No list counts are added to the public interface.

## Sources checked on 8 September 2026

- [Chokladakademien](https://www.chokladakademien.org/hantverkschoklad2/): the Sweden section contains all twenty-two supplied names. Read successfully in a browser after the text-fetch tool failed. The directory explicitly marks Kakstugan, Ljungbergs and Malmö as partly bean-to-bar, and qualifies Gånsviks' praline range. Those distinctions are retained.
- [Labys products](https://labys.se/produkter) and [message chocolate](https://labys.se/kategori/budskapschoklad): own production from cocoa beans, Hedemora, dark and milk chocolate.
- [Göteborgs Hantverkschoklad production](https://goteborgshantverkschoklad.se/choklad): bean roasting and stone grinding in Göteborg.
- [I am Coffee chocolate category](https://imcoffee.se/product-category/choklad/): describes its bean-to-bar factory and lists Togo 72% dark chocolate; the site gives Halmstad as its location.
- [Johannas](https://johannaschoklad.se/): cocoa sourced from Tanzania and made into chocolate in Kalmar.
- [Kakstugan](https://kakstugan.se/): describes its own bean-to-bar chocolate, bakery and coffee roastery in Tällberg.
- Jonsereds and Ljungbergs: classification and location rely on the Academy directory supplied by Martyna and independently read in the browser. Their supplied Facebook URLs are retained without claims about shipping or current stock.
- [Lustigbacken 3](https://www.lb3.se/): describes bean-to-bar production in Gammelstad, its café and shop, and ordering by message with postal delivery.
- [Sthlm Bean to Bar](http://www.sthlmbeantobar.com/): the supplied HTTP site loads in the browser and offers 72% Tumaco, Colombia. HTTPS could not be verified, so the working supplied HTTP address is retained.
- [Tobago Cocoa Estate](https://www.tobagococoa.com/): estate in Tobago; the previously checked page explicitly states that products are made with François Pralus. Martyna supplied and approved the replacement sentence naming both François Pralus and Friis-Holm on 8 September 2026. The Friis-Holm addition is user-confirmed rather than independently verified in this edit.

No blanket Swedish-delivery guarantee is made. Existing Uppsala pins, online shops, collection photos and alpha/object assets are unchanged.

## Validation and changed files

- Passed eight browser cases: light and dark at 360, 768, 1024 and 1440 px. Uncropped full-page captures, both before opening the map and showing Labys, measured 360 × 4415, 768 × 2775, 1024 × 800 and 1440 × 1000 pixels. Visually reviewed the maker panel at every size and theme.
- Verified twenty-two unique, alphabetically sorted maker options; all ten additions select and display correctly; mixed-range classifications; visible source credit only in the makers section; keyboard focus and Escape restoration; unchanged eleven Uppsala places and nineteen online shop options across the three regions.
- No browser page errors or horizontal overflow; reduced-motion mode respected. Physical phones and Safari were not tested.
- `git diff --check` passed. Changed `cabinet-map-data.js`, `cabinet-map.js` and `index.html`; created this review/source record and a scratch browser-check script outside the repository. No deletions, no asset edits and no changes under `game-of-worms/`.
- Approved for publication. Branch: `codex/cabinet-v75-deploy`. The exact new English wording above is included in this release.
