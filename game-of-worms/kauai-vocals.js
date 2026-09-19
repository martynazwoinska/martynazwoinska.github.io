// Short human scat phrases; provenance and processing: assets/audio/SOURCES.md.
export const vocalPhrases = {
  "primary": {
    "file": "kauai-vocal-primary.wav",
    "duration": 4500,
    "step": 40,
    "level": 0.11,
    "envelope": [0.43,0.75,0.43,0.82,1.0,1.0,0.97,0.42,0.16,0.17,0.22,0.97,1.0,1.0,1.0,0.57,0.44,0.37,0.38,0.9,1.0,0.99,0.77,0.4,0.7,0.81,0.82,0.65,0.42,0.23,0.2,0.68,0.73,0.47,0.34,0.21,0.16,0.26,0.99,1.0,0.79,0.68,0.69,0.57,0.49,0.44,0.39,0.34,0.32,0.37,0.34,0.36,0.35,0.4,0.42,0.39,0.34,0.31,0.32,0.39,0.41,0.42,0.41,0.37,0.42,0.66,0.72,0.55,0.81,1.0,1.0,0.94,0.47,0.26,0.26,0.54,1.0,1.0,0.94,0.73,0.35,0.38,0.44,0.47,0.83,0.91,0.82,0.36,0.66,0.7,0.67,0.78,0.77,0.43,0.25,0.54,0.78,0.71,0.86,1.0,0.82,0.5,0.4,0.38,0.36,0.43,0.37,0.35,0.4,0.36,0.33,0.3,0.16]
  },
  "companion": {
    "file": "kauai-vocal-companion.wav",
    "duration": 3836,
    "step": 40,
    "level": 0.095,
    "envelope": [0.09,0.18,0.44,0.65,0.91,0.59,0.3,0.16,0.21,0.6,0.97,0.99,0.66,0.24,0.22,0.24,0.49,0.89,0.78,0.65,0.63,0.79,0.74,0.63,0.51,0.5,0.46,0.36,0.45,0.52,1.0,1.0,1.0,0.52,0.59,0.57,0.51,0.72,0.68,0.5,0.83,0.91,0.68,0.53,0.57,0.36,0.42,1.0,1.0,0.7,0.57,0.55,0.5,0.39,0.28,0.47,0.58,0.68,0.71,0.45,0.63,0.57,0.86,0.81,0.75,0.42,0.21,0.22,0.58,0.72,0.66,0.27,0.51,0.59,0.56,0.51,0.28,0.14,0.37,0.44,0.41,0.39,0.38,0.37,0.37,0.36,0.35,1.0,1.0,1.0,0.49,0.65,1.0,1.0,0.94,0.15]
  }
};

export function vocalLevel(part, ms) {
 const p = vocalPhrases[part];
 if (!p || ms < 0 || ms >= p.duration) return 0;
 const i = ms / p.step, a = Math.floor(i), f = i - a;
 const energy = (p.envelope[a] || 0) * (1-f) + (p.envelope[a+1] || 0) * f;
 return Math.max(0, (energy - .2) / .8);
}

export function vocalSequence(parts) {
 let at = 900;
 return parts.map(part => {
  const cue = {part, at, duration: vocalPhrases[part].duration};
  at += cue.duration + 350;
  return cue;
 });
}

// A closed consonant becomes a rounded sung vowel. Coordinates are relative
// to the original smile centre; the face group supplies each worm's movement.
export function vocalMouth(level) {
 const open = Math.max(0, Math.min(1, level));
 const height = 15 * Math.pow(open, .55);
 const width = 11.5 - 1.5 * open;
 return `M${-width} 0 C${-width} ${-height*.75} ${width} ${-height*.75} ${width} 0 C${width} ${height} ${-width} ${height} ${-width} 0Z`;
}

// Pick the stronger syllable accents in each recording, leaving enough time
// for a body bend to settle. No independent metronome runs under the voices.
export function vocalBeats(part) {
 const p = vocalPhrases[part];
 if (!p) return [];
 const e = p.envelope;
 const candidates = e.map((level, i) => ({at:i*p.step, level, i}))
  .filter(({level,i}) => level >= .65 && level >= (e[i-1] || 0) && level > (e[i+1] || 0));
 const chosen = [];
 for (const beat of candidates.sort((a,b) => b.level-a.level || a.at-b.at))
  if (chosen.every(b => Math.abs(b.at-beat.at) >= 280)) chosen.push(beat);
 return chosen.sort((a,b) => a.at-b.at).map(({at,level}) => ({at,level}));
}
const accents = Object.fromEntries(Object.keys(vocalPhrases).map(part => [part,vocalBeats(part)]));
const settle = n => {n=Math.max(0,Math.min(1,n));return n*n*n*(10+n*(-15+6*n));};
export function vocalMotion(part, ms) {
 let bend=0,nod=0;
 for (const [i,beat] of (accents[part] || []).entries()) {
  const age=ms-beat.at;
  if (age < -100 || age > 340) continue;
  const pulse=settle((age+100)/100)*(1-settle(age/340))*beat.level;
  bend+=(i%2 ? -1 : 1)*pulse;
  nod+=pulse;
 }
 return {bend,nod:Math.min(1,nod)};
}
