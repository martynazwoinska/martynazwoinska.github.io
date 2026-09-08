# Loading derivatives, 8 September 2026

These are delivery optimizations of existing approved assets, not new artwork.
Original files are preserved. No alpha/object SVG, object position, filter, mask,
thumbnail window, white background, or animation was changed.

- `cabinet-study-unified-v2.webp` and `cabinet-frame-foliage-v2.webp`: lossless
  WebP encodings of the corresponding PNGs one directory above. Decoded RGBA
  pixels were checked for exact equality, with unchanged dimensions.
- `cabinet-note.svg`: only the visible blue note from `cabinet-clean-plate-v59.svg`.
  Its embedded original PNG region (410, 670, 112, 84) is placed at
  (410, 610, 112, 84) on the same 1672 by 941 canvas. The existing page clip
  remains unchanged. This avoids downloading the whole old cabinet for the note.
- Product WebPs: 480-pixel maximum dimension, aspect ratio retained, WebP quality
  94. Each filename is its existing `CABINET_PRODUCT_IMAGES` item ID. The `src`
  field retains the original photograph path; only list thumbnails use these
  derivatives. Copyright, permission and original source URLs remain in
  `../collection-products/SOURCES.md`, `../collection-products/SOURCES-v102.md`
  and `cabinet-product-images.js`.

Protected object SVG SHA-256 values, verified unchanged:

- v75: `e94f76341a2f5d95d7c6888ba7c4699976de34b07ca8e8fa92b3ca6c4c1591fc`
- v76: `aafa5496ced8d57eba13f97486a66ec5e6046187cd3569625acfd9ed14c0a8f6`

Full-page before/after comparisons used widths 360, 768, 1024 and 1440 pixels.
The new thumbnail dimensions are well above their 64-pixel list display size.
