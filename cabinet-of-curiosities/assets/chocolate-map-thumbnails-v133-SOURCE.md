# Chocolate map thumbnails

Both SVG files are exact production-preview assets, shown at 64 × 64 CSS pixels.
They remain vector images at every device pixel ratio. Existing cabinet art,
object/alpha layers and drawer paper are unchanged.

## Uppsala

`uppsala-map-thumbnail-v133.svg` reuses the street and river paths from
`uppsala-map-corner-v109.svg`, without modifying that approved source.
The square derivative removes the decorative paper fold and adjusts line
contrast for thumbnail size. No geographic lines were invented.

Data © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright),
[ODbL 1.0](https://opendatacommons.org/licenses/odbl/1-0/).
Overpass snapshot: 2026-09-07T20:14:19Z.
Original geographic bounds: south 59.852, west 17.623, north 59.866, east 17.655.
The adjacent visible credit links to the data licence.

## Sweden

`sweden-map-thumbnail-v133.svg` projects the Sweden feature from
[Natural Earth 1:50m admin-0 countries](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_50m_admin_0_countries.geojson)
using Mercator, fitted without distortion into a square thumbnail.
Retrieved 2026-09-13. This is a small-scale geographic outline, not a
factory-location map. The interactive map contains the maker locations.

[Natural Earth data is public domain](https://www.naturalearthdata.com/about/terms-of-use/).
The pale background and emerald land treatment follow the Cabinet palette.
No external image-generation service or additional visitor map-tile request
is used for either thumbnail.
