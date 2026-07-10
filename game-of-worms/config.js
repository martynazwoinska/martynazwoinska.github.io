/* =====================================================================
   The Game of Worms — configuration & content
   Scientifically inspired by Caenorhabditis elegans natural history.
   Kept separate from engine/render so future scenarios can be added.
   All tuning numbers are gameplay abstractions, not literal biology.
   ===================================================================== */
(function (global) {
  'use strict';

  const CONFIG = {
    version: '0.1.0',

    // How many generations one playthrough simulates.
    generations: 3,

    // Compressed biological clock. One "apple-day" of deterioration is
    // spread over this many real seconds so a scenario runs ~5-8 min.
    secondsPerAppleDay: 26,      // deterioration cadence
    appleDaysPerGeneration: 5,   // apple becomes uninhabitable after this

    worm: {
      baseSpeed: 118,            // px/sec at adult size
      startEnergy: 62,
      maxEnergy: 100,
      energyDrainPerSec: 1.9,    // passive metabolism
      arrestDrainPerSec: 0.5,    // much slower during L1 arrest
      dauerDrainPerSec: 0.28,    // dauer survives long
    },

    // Developmental stages in order. "progress" (0..1) accrues from feeding.
    stages: ['Embryo', 'L1', 'L2', 'L3', 'L4', 'Adult'],
    progressPerStage: 1.0,       // developmental units needed to advance one stage
    feedProgressPerSec: 0.42,    // how fast good food matures the worm

    reproduce: {
      minEnergy: 55,             // need reserves to make a viable brood
      selfBroods: 3,             // finite self-sperm -> limited selfing bouts
    },

    // Bacterial colonies. Each has a sensory "signature" (glyph + hue) the
    // worm can learn. Value may be hidden until experienced.
    bacteria: {
      nutritious: {
        key: 'nutritious', label: 'Rich colony',
        hue: 150, glyph: '✿', energy: +26, progress: +0.9,
        pathogenic: false, hiddenValue: false,
        smellGood: 'A generous, yeasty smell.',
      },
      moderate: {
        key: 'moderate', label: 'Thin colony',
        hue: 174, glyph: '❧', energy: +12, progress: +0.4,
        pathogenic: false, hiddenValue: false,
        smellGood: 'A faint, ordinary smell.',
      },
      pathogen: {
        key: 'pathogen', label: 'Harmful colony',
        hue: 344, glyph: '☣', energy: -22, progress: 0,
        pathogenic: true, hiddenValue: false,
        smellBad: 'A sharp, wrong smell.',
      },
      // Value is only revealed by tasting (resolved per-run to good or bad).
      ambiguous: {
        key: 'ambiguous', label: 'Unfamiliar colony',
        hue: 41, glyph: '◈', energy: 0, progress: 0,
        pathogenic: false, hiddenValue: true,
        smellUnknown: 'An unfamiliar smell. Hard to place.',
      },
    },

    // Environmental cue (fermentation odour). Internally has a reliability
    // value; the player only feels whether it tends to be trustworthy.
    cue: {
      reliability: 0.78,         // Orchard = moderately reliable
      // when the cue "warns", a crash tends to follow within this window (s)
      warnLeadSeconds: 18,
    },

    fungus: {
      captureBase: 0.55,         // base capture chance inside a triggered ring
      moveEscapeBonus: 0.35,     // moving/te touch-response improves escape
      dauerEscapeBonus: 0.2,     // dauers are tougher
    },

    carrier: { speed: 46, appearsAtDeterioration: 0.55 },

    // Short, playful in-game messages (teach through consequence).
    lines: {
      hatch: 'You hatch into the flesh of a fallen apple. 302 neurons, ready.',
      firstFood: 'A promising smell. Your 302 neurons are cautiously optimistic.',
      atePathogenFirst: 'That ended badly. Your body remembers the smell now.',
      atePathogenAgain: 'This smell again. Last time it ended badly.',
      learnedAvoid: 'You steer away — memory earns its keep.',
      arrest: 'No food, low reserves. You pause development and wait (L1 arrest).',
      arrestEnd: 'Food at last. Development resumes.',
      cueWarn: 'The air turns sour and fizzing. Something is about to change.',
      crash: 'The apple is collapsing into mush and mould.',
      l2dOffer: 'Conditions are turning. You could prepare for dauer (enter L2d).',
      l2d: 'You enter L2d — a reversible path. Improve conditions, or commit.',
      dauer: 'You commit to dauer: sealed, unfeeding, tough, and ready to travel.',
      dauerLate: 'The apple is mostly history now. Dauer might have been useful earlier.',
      nictateReady: 'A carrier passes. Stand on your tail and wave (nictate) to hitch a ride.',
      nictateWin: 'You catch the carrier and ride to a fresh apple.',
      nictateMiss: 'The carrier moves on without you.',
      maleAppears: 'A rare male appears.',
      selfed: 'You self-fertilize: a reliable brood, much like you.',
      outcrossed: 'You outcross: a genetically mixed brood, full of new combinations.',
      reproduced: 'Your brood matures and scatters into the flesh.',
      starved: 'Reserves run out. This worm’s story ends here.',
      trapped: 'A ring of golden threads closes gently. This worm goes no further.',
    },

    // Scientist's View copy. Careful, paraphrased, with clear simplifications.
    scienceIntro:
      'Gameplay time is heavily compressed and many details are simplified. ' +
      'At 20°C in the lab, C. elegans can reach adulthood in roughly 3–3.5 days, ' +
      'but development and lifespan vary with temperature, food, genotype and ' +
      'environment, and nature is not the lab.',

    simplifications: [
      'Time, distances and colony numbers are abstractions, not measured values.',
      'One worm stands in for a whole lineage; siblings are simulated in the background.',
      'Cue reliability, fitness and competitor lineages are simple model outputs, not precise predictions.',
      'Dauer, L2d and L1 arrest are represented approximately; real entry depends on pheromone, food and temperature integrated over time.',
      'We describe the late-adult response as "adult reproductive arrest"; whether a discrete adult "diapause" exists is not settled.',
    ],

    sources: [
      ['Natural biotic environment & boom-and-bust ecology', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5419493/'],
      ['Dauer developmental trajectory', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8867747/'],
      ['Dauer formation & life-history plasticity', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2735354/'],
      ['Patch-leaving, pheromone preference & learning', 'https://elifesciences.org/articles/58144'],
      ['Natural variation in nictation', 'https://www.nature.com/articles/s41467-017-00386-x'],
      ['Species-wide variation in nictation', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11252821/'],
      ['Learned pathogen avoidance', 'https://pubmed.ncbi.nlm.nih.gov/32908307/'],
      ['Nematode-trapping fungi in nature', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7104180/'],
      ['Touch-mediated escape from fungal traps', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3266163/'],
    ],
  };

  global.GOW_CONFIG = CONFIG;
})(window);
