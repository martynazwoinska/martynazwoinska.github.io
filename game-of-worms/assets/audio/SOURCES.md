# Araucanía eating and drinking recordings

Source licences checked on 2026-09-08. Both recordings use
[CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/), which permits
editing and redistribution. These are recorded human actions for the playful
café interaction, not recordings of nematode feeding.

## Bread bites

Source: [bite in crunchy bread.wav by hoelme](https://freesound.org/people/hoelme/sounds/453389/),
published 2018-12-17. The creator describes three bites into crunchy bread,
recorded with a DPA omnidirectional microphone, without post-processing.

Public HQ preview used:
`https://cdn.freesound.org/previews/453/453389_8820958-hq.mp3`

Source SHA-256:
`a503d14b5be28bde960351f6fb0ac627461270c1fb9d896ccf350d0fdbfc70b0`

| Production file | Start in source | Length |
| --- | ---: | ---: |
| `araucania-bread-bite-1.wav` | 0.510 s | 0.460 s |
| `araucania-bread-bite-2.wav` | 3.400 s | 0.420 s |
| `araucania-bread-bite-3.wav` | 6.000 s | 0.380 s |

Each bite uses a different take. Only the short initial bite is retained,
without a prolonged chewing recording.

## Mate sip

Source: [Slurping with a straw by bassboybg](https://freesound.org/people/bassboybg/sounds/367058/),
published 2016-11-03. The recording is classified as a human drinking action
with a straw.

Public HQ preview used:
`https://cdn.freesound.org/previews/367/367058_2019774-hq.mp3`

Source SHA-256:
`f6b81f26e1c87e313001800984906bf82ba27a31a4c5751daa2c24a1f8afebcf`

`araucania-straw-sip.wav`: start 16.320 s, length 0.580 s.

## Processing and playback

Decoded to mono 44100 Hz PCM16, then excerpted at the positions above.
DC offset removed, with linear 6 ms attack and 35 ms release fades, followed
by peak normalization to -8 dBFS. Exported as mono PCM16 WAV, without pitch
shifting, looping, synthesized layers or added filtering. Playback gain is 0.8.
The four deployed clips total 162464 bytes. Unedited downloaded previews and
local processing material are retained in the ignored task folder
`tmp/araucania-audio/` and are not published with the site.

Bread clips play at the three existing visible bites. The sip plays while
the straw reaches the mouth, for either worm. Sound remains gesture-triggered,
with a single source and cancellation on activity changes, Escape and page hiding.
