# Game sound recordings

## Canberra coffee and sulphur-crested cockatoo, 2026-09-09

Both recordings are CC0, verified on their Freesound creator pages. The public
HQ previews are preserved byte-for-byte as the production MP3s.

- [coffee slurp 4 by benkenart, Freesound 568036](https://freesound.org/people/benkenart/sounds/568036/), published 2021-04-14. A real person slurping coffee from a cup.
  Public source: `https://cdn.freesound.org/previews/568/568036_12771108-hq.mp3`.
  File: `canberra-coffee-slurp.mp3`, 18261 bytes.
  SHA-256: `5c3ec26e873b4e86162576643ff9d47a1bef9ceaab8badbb8e03fdf4a193cfc0`.
  Playback excerpt: 0.150 to 0.670 s, starting 836 ms into the sip when the cup
  reaches the mouth. The male has biscuits, so his eating gesture has no slurp.
- [Parrots - Sulfur-crested Cockatoo by TheKingOfGeeks360, Freesound 844340](https://freesound.org/people/TheKingOfGeeks360/sounds/844340/), published 2026-02-06. The creator identifies an actual sulphur-crested cockatoo's screeching squawk, recorded with an LG Stylus 2022. The recording is tagged aviary.
  Public source: `https://cdn.freesound.org/previews/844/844340_15895934-hq.mp3`.
  File: `canberra-cockatoo.mp3`, 35520 bytes.
  SHA-256: `1ffb49ee61f8fc7c3ddc354a1607b6f2a4337280a0bc561411ea4c624d453a01`.
  Playback excerpt: 0.020 to 1.340 s, starting 80 ms into either bird's raid.

The species is correct for the Canberra drawing. This is not a documented
food-stealing call or a recording made in Canberra. Cockatoo contact calls
occur in flight, while different calls have other contexts. See
[Gillies and Brown, Australian Journal of Zoology, DOI 10.1071/ZO23043](https://www.publish.csiro.au/ZO/pdf/ZO23043).
The human slurp is playful drinking foley for the worm, not a nematode recording.

The browser decodes each clip only after a user gesture. Original speed and
pitch are preserved, without looping, synthesis, EQ or overlapping calls.
Excerpt peak amplitudes are capped at 0.32 for the slurp and 0.38 for the bird,
with 12 ms attack and 55 ms release fades. One foreground voice is stopped by
interruption, Escape, Home, scene change, page hiding or reduced-motion change.
Reduced-motion mode skips the sound. Failed audio loading falls back silently.
The approved drawings, text, positions and action timelines are unchanged.

## Kauaʻi fuller pours and wet squeeze, approved for deployment 2026-09-09

Two real recordings by Joseph SARDIN, published as CC0 on BigSoundBank:

- [Cold Water in a Mug #2, recording 3314](https://bigsoundbank.com/cold-water-in-a-mug-2-s3314.html). Water poured into a mug. Original WAV: `https://bigsoundbank.com/UPLOAD/bwf-en/3314.wav`.
- [Sponge and foam, recording 0778](https://bigsoundbank.com/sponge-and-foam-s0778.html). A foamy sponge compressed in a hand. Original WAV: `https://bigsoundbank.com/UPLOAD/bwf-en/0778.wav`.

| Production file | Source excerpt start | Duration | SHA-256 |
| --- | --- | --- | --- |
| `kauai-bath-pour-v2.wav` | 3314, 0.350 s | 1.900 s | `50a76447a1efaf0191cfe16e74ec25b2e85eda3e85bf623fa8b174bd92231bbf` |
| `kauai-bath-scoop.wav` | 3314, 2.250 s | 1.550 s | `e8612a61fbdee9d3d1b96313655ddb22d785a25dee9a3f7d74416af41967abaa` |
| `kauai-bath-squeeze.wav` | 0778, 0.400 s | 0.640 s | `7402a8cba56ead7ecbcbfc7d64e0521ccb7ddec5c7dfbec6a7ac09ad44cab94c` |

PCM excerpts are DC-centred, resampled to mono 44100 Hz PCM16, and faded with
12 ms attack and 70 ms release. Peaks are 0.48, 0.42 and 0.40 respectively.
No synthesis, pitch shifting or looping. The pour starts with the visible
stream, and each of two cone compressions plays one short squeeze.

These are water and sponge foley used for the fictional forest bath. They are
not recordings of water striking a worm or of shampoo ginger being squeezed.
The original water/drip files below are preserved but replaced in the runtime
by these excerpts. The existing cloth clip is unchanged. One foreground voice,
gesture-only lazy loading and cancellation remain in place. Source recordings
and the preparation script stay in ignored `tmp/kauai-bath/`. Martyna approved
deployment of this update.

## Kauaʻi QG130 forest bath, approved for deployment 2026-09-09

Real recordings by Joseph SARDIN, released under CC0 on BigSoundBank.

- [Glass of water, filling #1, recording 1242](https://bigsoundbank.com/glass-of-water-filling-1-s1242.html). A plastic bottle filling a small glass. Source WAV: `https://bigsoundbank.com/UPLOAD/bwf-en/1242.wav`.
- [Cleaning glass, recording 0689](https://bigsoundbank.com/cleaning-glass-s0689.html). Cloth friction used as quiet wiping foley. Source WAV: `https://bigsoundbank.com/UPLOAD/bwf-en/0689.wav`.

| Production file | Source excerpt | Duration | SHA-256 |
| --- | --- | --- | --- |
| `kauai-bath-pour.wav` | 1242, 0.600 s | 1.400 s | `695e17ddc2b047c60d1e6044648aac0d5d8e3534d406a980d15de94d1fd699c0` |
| `kauai-bath-drip.wav` | 1242, 3.000 s | 0.500 s | `9ec4826779b34f1d496a3aece962dde83342f74dc73f0a5c87b01b191f1503cb` |
| `kauai-bath-cloth.wav` | 0689, 4.200 s | 0.620 s | `4de33d618958a437193aba239eef781c544b56a0eab7215a3364c61c2cf12ed3` |

Original PCM recordings were excerpted, DC-centred and converted to mono 44100 Hz
PCM16 WAV. Linear 14 ms attack and 50 ms release fades. Peak amplitudes are
0.38, 0.26 and 0.30 respectively. No synthesis, looping or pitch shifting.
These are water and cloth foley, not a field recording of shampoo ginger use.
Only one foreground voice plays, following a tap or keyboard gesture. Hiding
the page, stopping an action or changing the scene stops it. Listening approval
is still required. Source files and preparation script stay in ignored `tmp/`.

## Saint-Benoît rain, coats and lychees

Approved for deployment 2026-09-09. All four new recordings are CC0, verified on the
creators' source pages. No synthesised rain, chimes or cartoon bite sounds.

- [Rain and Thunder #1, Joseph SARDIN, BigSoundBank 0124](https://bigsoundbank.com/rain-and-storm-s0124.html).
  Original WAV: `https://bigsoundbank.com/UPLOAD/bwf-en/0124.wav`.
  SHA-256 `d37affc216bd76b5f1964fbafacb19644ac057b00a099d96dff061ec2b5a2643`.
  Extract 1.000–12.000 s, excluding the thunder identified at the end of the
  43-second source. Mono downmix at 44100 Hz. Equal-power 0.5 s end/start overlap
  produces a seamless 10.5 s PCM16 loop. Peak 0.5, playback gain 0.32, ducked to
  0.12 during a foreground action. Gain rises gradually on starting the rain.
- [Synthetic Coat Rubbed, Joseph SARDIN, BigSoundBank 1104](https://bigsoundbank.com/synthetic-coat-rubbed-s1104.html).
  Original WAV: `https://bigsoundbank.com/UPLOAD/bwf-en/1104.wav`.
  SHA-256 `83083dc075bac4a17955604f096dd07db40a048cd3ea1ab0aebdd84e93d17ef6`.
  Extract 1.700–2.500 s. Actual synthetic-coat handling, used quietly as the
  raincoats are enabled. Resampled to mono 44100 Hz PCM16, peak 0.28.
- [Peeling a tangerine, MeanRaccoon, Freesound 818126](https://freesound.org/people/MeanRaccoon/sounds/818126/).
  Original public HQ preview: `https://cdn.freesound.org/previews/818/818126_10956972-hq.mp3`.
  SHA-256 `4095205a6a70c207c0cbd97da4dc2fdaef1ca8a8adeecf21eef46b5d9831f44f`.
  Extract 2.000–2.650 s after decoding with the existing local FFmpeg. This is
  fruit-skin peeling foley, not a lychee-specific recording. Mono 44100 Hz PCM16,
  peak 0.32, two quiet cues aligned to visible peel separation.

- [Banana Munching, qubodup, Freesound 181723](https://freesound.org/people/qubodup/sounds/181723/).
  CC0. Public HQ preview: `https://cdn.freesound.org/previews/181/181723_71257-hq.mp3`.
  Source SHA-256 `045c7bd1a07d4de280b1bcdbf47ec8b613b20e513b68e46fe856a01609301a91`.
  Extract 6.180–6.840 s of a real soft-fruit eating recording, used as lychee
  eating foley. This is not an actual lychee recording. Decoded to mono 44100 Hz
  PCM16, DC removed, 12 ms/65 ms endpoint fades, peak 0.28. Playback gain 0.56
  for the larger worm and 0.48 for the male. One short cue begins with the visible
  bite at 2790/2940 ms. No pitch shifting, looping, reverb or generated tones.
  Waveform and playback timing were checked. Direct listening remains manual.

Coat and peel excerpts have DC removed and short 8 ms/45 ms endpoint fades.
Flower arranging reuses `nambucca-paper-slide.wav`, documented below, only while
the male's wrapping paper lifts and settles. This is paper, not plant-stem audio.

Production SHA-256:

| File | SHA-256 |
| --- | --- |
| reunion-rain.wav | ca544b4a92dc5e9606d4689a59d024bb9880c2117d0c3eba9ed796a96e1165d6 |
| reunion-coat.wav | 9f66d048ec6d265f14934874cf05c914f61707e8b777aa66026b4677e5fd6c61 |
| reunion-peel.wav | 5a7989dd855fe30ee20d0071b85adeba6d3f2eb66f3bf1dd1f70b8eac044caee |
| reunion-eat.wav | 96d31f93476797294a721515530531703b1fbb8842223bd9522a9a484655e64d |

Audio loads only after a gesture. Late loads do not restart cancelled rain.
One foreground voice and one rain loop may coexist. Scene changes, hidden pages
and reduced-motion changes stop both. No inference of rain on the collection date.

## Ahmedabad digging

Source: [Dig With a Shovel, Joseph SARDIN, BigSoundBank 1305](https://bigsoundbank.com/dig-with-a-shovel-s1305.html).
The creator describes digging a hole with a shovel. The page's CC0 licence,
including permission to edit and redistribute, was checked on 2026-09-08.
Original WAV linked in the page metadata:
`https://bigsoundbank.com/UPLOAD/bwf-en/1305.wav`.
SHA-256: `034fc52802ec109897c75da84e246fae88d2671192fee610aafe86d8bf0a48bd`.

Three separate excerpts provide one spade stroke and two shorter trowel strokes.
All originate from a real full-size shovel recording, with no pitch shift,
synthetic layers, loops or added reverberation. The smaller-tool excerpts use
shorter takes and quieter playback.

| Production file | Source start | Duration | Peak | SHA-256 |
| --- | ---: | ---: | ---: | --- |
| `ahmedabad-dig-spade.wav` | 3.330 s | 0.650 s | 0.36 | `55c946c597247c1c510107cbbd46a78e1539dc43984d7d058f9608c668acf4e6` |
| `ahmedabad-dig-trowel-1.wav` | 0.190 s | 0.350 s | 0.29 | `74115940afb485318275102791482dca3b34a99df0fa78abf28b7eb081b3c777` |
| `ahmedabad-dig-trowel-2.wav` | 1.190 s | 0.390 s | 0.29 | `35f06523eaa30208a156e2f58eef6b732f965652b8a4c359cacecfce753e49f7` |

Original mono 48000 Hz PCM24 converted to mono PCM16 after DC removal,
6 ms entrance/35 ms exit fades and peak normalization. Total 133572 bytes.
Playback gain: spade 0.8, trowel 0.7. Cue starts account for the recorded
transients, aligning maximum sound contact with maximum blade pressure at
1675 ms, 1342.5 ms and 2892.5 ms. Frames delayed by less than 90 ms skip the
corresponding audio lead-in. Expired or unloaded cues remain silent.

Gesture-only loading, caching and cancellation remain in place. Reduced motion
is silent. Kite wind/reel sounds are unchanged. Untouched downloads and the
processing script are retained under ignored `tmp/ahmedabad-audio/`.
Direct listening on real speakers/headphones remains a manual review item.

## Ho Chi Minh City fruit delivery

Source pages and CC0 licences checked on 2026-09-08. These are short recorded
foley cues. There is no synthetic fallback or autoplay.

- [Scooter Passage, Joseph SARDIN, BigSoundBank 0533](https://bigsoundbank.com/scooter-passage-s0533.html).
  Public MP3: `https://bigsoundbank.com/UPLOAD/mp3/0533.mp3`.
  Source SHA-256: `172db6e5c67ae1628ef3824ce5fe82f403b16be1d04d1ff9c9ae0d8a183b2071`.
- [Chopping fruit_Short.wav, KaleidacousticsAudio, Freesound 627197](https://freesound.org/people/KaleidacousticsAudio/sounds/627197/).
  Apple cutting on a plastic board supplies the knife-and-fruit contact.
  This is foley for the illustrated starfruit and wooden board.
  Public HQ preview: `https://cdn.freesound.org/previews/627/627197_13875907-hq.mp3`.
  Source SHA-256: `21f9823bb9cb6e61574a4c33d788f054db26377601907c656f7fb7b74b9bb2e7`.
- [Stirring glass, ChrisGrundlingh, Freesound 765653](https://freesound.org/people/ChrisGrundlingh/sounds/765653/).
  A real spoon stirring and touching a glass accompanies the iced coffee.
  Public HQ preview: `https://cdn.freesound.org/previews/765/765653_15688696-hq.mp3`.
  Source SHA-256: `73627cc58dbcbc2501434d871c501ef6dc7666968ee9b60a313cd96615ec2a4c`.

Each preview is decoded to mono 44100 Hz, trimmed, DC-centred and peak-normalized,
with short linear entrance/exit fades. No pitch shift or generated tones.

| Production file | Source start | Length | Peak | Fades in/out | SHA-256 |
| --- | ---: | ---: | ---: | --- | --- |
| `hcmc-engine.wav` | 1.55 s | 2.30 s | 0.30 | 75/180 ms | `1bfaedb6835f468a5e099fb4468a5b136ffb18802c8c80cc92bee6c4e743a3d9` |
| `hcmc-cut.wav` | 3.55 s | 0.48 s | 0.34 | 8/60 ms | `4017849bf4738b54416ff4e10625ac37df678541523daf1cdd96706efbaed149` |
| `hcmc-stir.wav` | 0.55 s | 2.10 s | 0.26 | 25/140 ms | `039205a92d7b6a11154657128ee5824978ebb763204963ee767c7eff19a6ef78` |

Three production WAVs total 430548 bytes. Runtime gain reduces these levels
further. Cues stop when an action is interrupted or the page is hidden.
Late downloads never start a delayed sound. Reduced motion remains silent.
Listening on actual speakers/headphones remains a manual review item.

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

## Oʻahu chocolate-bike preview, 2026-09-09

The following CC0 recordings are preserved as downloaded MP3 previews. They are
gesture-triggered foley, not recordings of Mānoa Chocolate's historic machine.

| Local file | Recording and source | Creator | Licence | SHA-256 |
| --- | --- | --- | --- | --- |
| `oahu-bike-chain.mp3` | [bicycle-pedal.wav, 185633](https://freesound.org/people/gerfaut83/sounds/185633/) | gerfaut83 | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) | `1890c9b51ba9606e175797c14cce6d2cd7e7770d2723474118ac4d7ef8f8d415` |
| `oahu-bean-rattle.mp3` | [Pouring Coffee Beans.wav, 539319](https://freesound.org/people/RobinMetzler/sounds/539319/) | RobinMetzler | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) | `9f8d7679745b1ad897793107b4c6f75846eab4f7bf867d2e913dbedcb455f38b` |

Downloaded from Freesound's source-linked HQ previews:
`https://cdn.freesound.org/previews/185/185633_3444085-hq.mp3` and
`https://cdn.freesound.org/previews/539/539319_8929618-hq.mp3`.
Licence pages checked on 2026-09-09. Combined download size: 566104 bytes.

Playback uses 0.8–6.75 seconds of the bicycle recording, and two short excerpts
from the bean recording, at 1.2–2.35 and 4.2–5.4 seconds. Bicycle peak gain is
capped at 0.13, bean peaks at 0.10 and 0.085. A 60 ms attack avoids clicks and
the bicycle fades over its final 1.15 seconds. Gentle low-pass filtering reduces
sharp mechanical edges. Pitch is unchanged. The bean cues do not overlap each
other. Escape, dragging, resizing, scene changes and page hiding stop the sources.
Failed loading is silent and retryable. Manual listening approval is pending.

The chocolate-workshop follow-up reuses the CC0 `nambucca-paper-slide.wav`
recorded paper movement above for the bar sleeve at 430 ms, at 55% of the
existing playback gain. No new audio file is added. Pouring, scraping and
chewing remain quiet. The existing bicycle and bean recordings are unchanged.
