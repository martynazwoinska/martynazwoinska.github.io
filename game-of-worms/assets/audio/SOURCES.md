# Game sound recordings

## Nambucca flower presses and rock painting

Source and CC0 licences checked on 2026-09-08:

- [Brush on concrete, Joseph SARDIN, BigSoundBank 1107](https://bigsoundbank.com/brush-on-concrete-s1107.html).
  Recorded bristles on a mineral surface provide texture for rock painting.
  The original is a dry brush on concrete, not a recording of wet paint.
  Download: `https://bigsoundbank.com/UPLOAD/mp3/1107.mp3`.
  Source SHA-256: `58bde79fa9435e56af47686f7ea96f7e70c9f25dda0750f71bf6acbab76440f2`.
- [Turned Page, DavidGreck, BigSoundBank 0164](https://bigsoundbank.com/turned-page-s0164.html).
  One short paper movement accompanies the male sliding his flower sheet.
  Download: `https://bigsoundbank.com/UPLOAD/mp3/0164.mp3`.
  Source SHA-256: `bbfe308e17db4bcd402d07c69447c31ec351dc9d4143f8d93c4e567d4c1ac8d5`.
- [Closed book #1, Joseph SARDIN, BigSoundBank 1410](https://bigsoundbank.com/closed-book-1-s1410.html).
  A softened cover-and-paper contact supplies the press-closing thud.
  This is a foley substitute for the paper-buffered press, not a recording of
  a flower press or a wooden lid.
  Download: `https://bigsoundbank.com/UPLOAD/mp3/1410.mp3`.
  Source SHA-256: `aecc1873464c8d43b58d6035c2b2f21387d97f361b34d0940093fde9a53923f6`.

[BigSoundBank's CC0 licence](https://bigsoundbank.com/licenses.html) permits
editing and redistribution. Author credit is retained here.

| File | Start in decoded source | Duration | Low-pass cutoff | Peak |
| --- | ---: | ---: | ---: | ---: |
| nambucca-brush-1.wav | 1.100 s | 0.480 s | 3800 Hz | 0.18 |
| nambucca-brush-2.wav | 2.090 s | 0.480 s | 3800 Hz | 0.18 |
| nambucca-brush-3.wav | 4.170 s | 0.480 s | 3800 Hz | 0.18 |
| nambucca-paper-slide.wav | 0.060 s | 0.480 s | 6500 Hz | 0.22 |
| nambucca-press-close.wav | 0.410 s | 0.300 s | 2400 Hz | 0.25 |

Mono 44100 Hz PCM16, 196024 bytes total. Processing removes DC offset, applies
a one-pole low-pass filter and short linear fades, then normalizes each excerpt
to the listed peak. Brush fades: 12/45 ms. Paper: 8/40 ms. Press: 4/60 ms.
Playback gain 0.7, with quieter male detail strokes and paper return. No added
oscillators, noise layers, reverb, pitch shift or loops. Three genuine brush
takes alternate. Brush audio begins at contact after the 120 ms brush lift.
The press transient is 18 ms into its clip, with the cue at 970 ms.
Screw turning is quiet. Paper movement has separate outward and return cues.

Recordings load only after an activity gesture and are cached. A missed cue
remains silent. Cancellation and page hiding stop playback. Reduced motion is
silent. Untouched downloads, decoded sources and the reproducible processing
script are retained under ignored `tmp/nambucca-audio/`.

Production SHA-256:

- Brush 1: `819ef551c049749215a88f9f5a8d4d5bbd8f9f6665554afb03e4b3e4880d5478`
- Brush 2: `a9fdb49c94bad896513c6efb80a8c295f72ac7f9518654e55527d6a1c7928b46`
- Brush 3: `2c025ee59decc1dbc94b1773b1478263f5147bf7fde6da46bd5c6c527029f177`
- Paper: `4dcacba69d36ec70a7201077ebc6963d36c2ad16f263b7521abd427717d874de`
- Press: `f58b4643192f13c2970b1858c42cf5f91e7a0ee48d4496c9fd7b2d67842a82c5`

## Panama scissors

Source: [Scissors by Joseph SARDIN, BigSoundBank sound 0008](https://bigsoundbank.com/scissors-s0008.html).
The creator describes three closures, three opening/closing actions and one
short closure. This excerpt uses the final short closure, without layering in
synthetic noise. The recording is of scissors, not cutting a leaf.

The source page and [licence](https://bigsoundbank.com/licenses.html) were checked
on 2026-09-08. They permit editing and redistribution under CC0 1.0.
Public source: `https://bigsoundbank.com/UPLOAD/mp3/0008.mp3`.
Source SHA-256: `d87757bca6d6a832a2c43f34fcddfda89d3ec85da5dfac33e8c4ce62060503b2`.

Production: `panama-scissor-snip.wav`, 35324 bytes, mono 44100 Hz PCM16.
Decoded-source excerpt: 11.565 s for 0.400 s. Linear 4 ms attack and 35 ms
release fades, with gain 1.82 (peak approximately -8 dBFS). No pitch shift,
reverb, repeated cuts or synthetic layers. Production SHA-256:
`77c32b252fcac15bd1bd2888518261704dea6a3f89628a5c76324ed5b669a868`.
Playback gain is 0.8. The cue begins at 1285 ms so its strongest transient,
90 ms into the excerpt, coincides with the visual cut at 1380 ms.

The 35 KB clip loads and decodes on the first cutting gesture, then is reused.
A missed loading deadline is silent, with no late playback or noise substitute.
Escape, other activities and page hiding stop it. Reduced motion stays silent.
The untouched download and decoded source are in ignored `tmp/panama-audio/`.

## Araucanía eating and drinking recordings

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
