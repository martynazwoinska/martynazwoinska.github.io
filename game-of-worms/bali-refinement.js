// Original JU1873 drawings. Regional props, not collection apparatus.
const ink = '#303d44', berry = '#833c54', wine = '#512d43';
const gold = '#b49154', paleGold = '#e0c790', ivory = '#f4ead3';
const bronze = '#a8915d', darkBronze = '#655741', silver = '#b8cace';
const add = (g, tag, attrs = {}) => {
  const n = document.createElementNS('http://www.w3.org/2000/svg', tag);
  Object.entries(attrs).forEach(([k, v]) => n.setAttribute(k, v));
  g.appendChild(n); return n;
};
const p = (g, d, fill, stroke = ink, w = 1.5, attrs = {}) => add(g, 'path', {
  d, fill, stroke, 'stroke-width': w, 'stroke-linejoin': 'round', 'stroke-linecap': 'round', ...attrs
});
const l = (g, d, stroke, w = 1.5, attrs = {}) => p(g, d, 'none', stroke, w, attrs);
const e = (g, x, y, rx, ry, fill, stroke = ink, w = 1) => add(g, 'ellipse', {
  cx:x, cy:y, rx, ry, fill, stroke, 'stroke-width':w
});

function wrap(g, male) {
  const c = male ? add(g, 'g', {transform:'translate(-28 82) scale(.43)'}) : g;
  const shape = male
    ? 'M211 118Q239 96 271 94L287 134Q252 141 227 163L200 143Z'
    : 'M204 124Q230 102 260 95L282 140Q259 160 226 191Q200 187 177 170Q185 147 204 124Z';
  p(c, shape, berry, ink, 1.7);
  const id = `bali-cloth-${male ? 'male' : 'female'}`;
  const clip = add(add(c, 'defs'), 'clipPath', {id});
  p(clip, shape, 'white', 'none');
  const weave = add(c, 'g', {'clip-path':`url(#${id})`});
  // Original stepped weft-like marks, not a named or copied textile motif.
  for (let y = 106; y < 195; y += 3) l(weave, `M165 ${y}Q219 ${y+7} 299 ${y-17}`, ivory, .45, {opacity:.18});
  for (let x = 174; x < 300; x += 5) l(weave, `M${x} 87Q${x-9} 135 ${x-12} 201`, wine, .6, {opacity:.38});
  const motifs = male ? [[229,124],[255,113],[252,144]] : [[211,139],[236,123],[257,141],[232,162],[204,165]];
  for (const [x,y] of motifs) {
    const m = add(weave, 'g', {transform:`translate(${x} ${y}) rotate(-28)`});
    for (let row=-8;row<=8;row+=2) {
      const half=9-Math.abs(row);
      l(m, `M${-half} ${row}H${half}`, ivory, 1.4);
    }
    p(m, 'M0-4L4 0L0 4L-4 0Z', gold, wine, .6);
  }
  p(weave, male ? 'M211 118Q242 95 271 94L274 102Q241 106 215 126Z'
    : 'M204 124Q230 102 260 95L264 104Q229 116 204 137Z', wine, 'none');
  l(weave, male ? 'M215 119Q243 103 273 100' : 'M203 130Q233 109 262 101', paleGold, 1.8);
  p(weave, male ? 'M201 136Q235 152 285 126L288 135Q250 144 227 164L200 143Z'
    : 'M178 160Q201 181 223 182Q252 153 279 131L284 141Q255 166 226 192Q198 187 176 170Z', wine, 'none');
  l(weave, male ? 'M203 140Q225 152 240 144L284 130' : 'M179 165Q202 185 224 186Q251 158 281 138', paleGold, 1.9);
  if (male) {
    // Compact tied wrap with a loose end, not the female's skirt at half size.
    p(c,'M267 108Q289 108 301 130L290 137Q278 124 269 120Z',berry,ink,1.2);
    p(c,'M273 114Q288 136 293 158L283 165Q277 140 268 121Z',wine,ink,1.2);
    l(c,'M276 122Q285 143 288 159',paleGold,1.5);
    p(c,'M264 109Q270 106 276 113L272 122Q263 123 260 116Z',gold,ink,1.1);
  } else {
    // Front overlap hangs under the waist, exposing a darker return fold.
    p(c,'M254 103Q254 141 224 181L227 190Q270 156 278 135Z',wine,'none');
    l(c,'M256 107Q260 139 229 179',paleGold,1.5);
    l(c,'M200 138Q191 150 190 163M235 128Q227 146 222 155','#a55c72',2.2);
    for(let x=183;x<=221;x+=5) {
      const y=170+(x-183)*.38;
      l(c,`M${x} ${y}l-2 6`,ivory,1.3);
    }
  }
}

function pod(g, x, y, scale, angle, pale = false) {
  const c=add(g,'g',{transform:`translate(${x} ${y}) rotate(${angle}) scale(${scale})`});
  p(c,'M-48 0Q-25-39 23-29Q44-20 54-2Q35 40-13 34Q-38 25-48 0Z',pale?'#b89444':'#9f5145',ink,2);
  p(c,'M-48 0Q-23 16 13 16Q40 12 54-2Q35 40-13 34Q-38 25-48 0Z',pale?'#846e39':'#763d36','none');
  for(const d of ['M-42 4Q-19 27 12 27Q35 22 46 6','M-35 15Q-3 37 26 25'])l(c,d,pale?gold:'#bd7961',2.4);
  p(c,'M-42-2Q-17-31 23-23Q39-16 46-2Q23 23-13 19Q-34 14-42-2Z','#d5c4a0',ink,1.3);
  p(c,'M-35-2Q-14-23 19-17Q33-12 39-2Q17 16-11 13Q-28 11-35-2Z',ivory,'#9b8664',1);
  for (const [sx,sy,a] of [[-20,-3,-35],[-4,-9,-14],[12,-7,14],[25,-1,35],[-5,7,-40],[10,5,24]]) {
    const seed=add(c,'g',{transform:`rotate(${a} ${sx} ${sy})`});
    e(seed,sx,sy,7,9,'#fff7e3','#baae8c',1);
    l(seed,`M${sx-2} ${sy-5}Q${sx-6} ${sy} ${sx-2} ${sy+5}`,'#e1d8bd',1.3);
  }
  l(c,'M-32-9Q-9-27 19-20',ivory,2);
}

function cacao(g,male) {
  if (male) {
    // A split fruit rests on its rind with a compact tool laid beside it.
    pod(g,-8,34,1.03,-13,true);
    // One-piece wooden club: rounded striking end, tapered neck and palm swell.
    const club=add(g,'g',{'data-tool':'wooden-club',transform:'rotate(-10 -30 -30)'});
    p(club,'M-111-34Q-103-40-94-35L-66-30Q-40-28-24-43Q-2-62 38-56Q59-53 64-35Q68-13 47-6Q12 3-17-10Q-40-23-66-19L-96-14Q-110-11-116-20Q-121-28-111-34Z','#b17c48',ink,2.1);
    p(club,'M-115-23Q-109-15-96-19L-66-24Q-37-28-14-16Q16-3 47-12Q61-18 64-35Q68-13 47-6Q12 3-17-10Q-40-23-66-19L-96-14Q-110-11-116-20Z','#765133','none');
    p(club,'M-99-33L-66-27Q-38-25-21-39Q3-56 35-51Q47-49 51-45Q12-49-16-32Q-35-20-64-25L-98-28Z','#d4a468','none');
    // End grain and long fibres follow the carved wood, contained by its edge.
    e(club,52,-32,9,19,'#c69860','#805936',1.3);
    l(club,'M51-46Q41-31 52-17M55-42Q48-32 55-23','#997044',1.1);
    l(club,'M-17-37Q10-50 36-43M-22-30Q7-42 35-36M-12-18Q13-11 37-17','#805936',1.3);
    l(club,'M-106-25Q-86-24-70-27','#e0b47c',1.5);
    l(club,'M-8-26Q10-33 32-29M-2-23Q14-26 29-23','#91613c',1.1);
    p(club,'M-114-35Q-121-32-119-23L-116-16Q-112-12-106-17L-108-31Q-109-36-114-35Z','#bd8b54',ink,1.4);
    l(club,'M-115-30L-112-20','#e0b47c',1.3);
  } else {
    // Broad working blade with a thick spine, cutting bevel and fitted grip.
    p(g,'M-48-6L92-31Q113-32 124-13Q109 9 78 17L-49 21Z',silver,ink,2);
    p(g,'M-45 11L78 7Q103 0 116-13L124-13Q109 9 78 17L-49 21Z',ivory,'none');
    l(g,'M-43-2L89-26Q105-28 113-19','#eff8f6',2.1);
    l(g,'M-40 7L69-8','#93aaaf',1.1);
    p(g,'M-55-7L-53 22L-114 27Q-128 17-119 0Z',wine,ink,2);
    p(g,'M-116 2L-60-3L-60 4L-116 11Z',berry,'none');
    for(const x of [-106,-80])e(g,x,12,3,3,paleGold,ink,.8);
    p(g,'M-58-11L-49-12L-44 24L-53 27Z',gold,ink,1.4);
    pod(g,48,78,1.32,12);
    l(g,'M-121 17Q-143 27-129 40Q-115 46-109 27',berry,2.5);
  }
}

function mallet(g,x,y,a,small=false) {
  const motion=add(g,'g',{'data-gong-mallet':''});
  const c=add(motion,'g',{transform:`translate(${x} ${y}) rotate(${a})`});
  p(c,small?'M-3 0H3L4 61Q0 66-4 61Z':'M-3 0H3L5 75Q0 81-5 75Z',gold,ink,1.2);
  p(c,small?'M-7-15Q0-19 7-15L8 4Q0 9-8 4Z':'M-13-20Q0-27 13-20L15 5Q0 15-15 5Z',wine,ink,1.5);
  l(c,small?'M-5-11L5-11M-5-6L5-6':'M-10-17Q0-12 10-17M-11-10Q0-5 11-10M-11-2Q0 3 11-2',berry,2);
}

function gong(g,male) {
  if(male) {
    // Low cord-supported kettle gongs give the companion a different role.
    p(g,'M-73 33L64 22L83 37L-56 52Z',berry,ink,2);
    p(g,'M-56 52L83 37V58L-56 72Z',wine,ink,2);
    p(g,'M-73 33L-56 52V72L-73 53Z','#5e3447',ink,2);
    p(g,'M-69 50L-58 60L-59 81L-76 81ZM66 54L79 53L88 73L72 74Z',wine,ink,1.6);
    l(g,'M-49 61L73 49',paleGold,2);
    for(const x of [-36,35]) {
      const c=add(g,'g',{transform:`translate(${x} ${x<0?23:16})`});
      l(c,'M-38 12L34 20M-32 26L38 6',ivory,2);
      const metal=add(c,'g',{'data-gong-metal':''});
      p(metal,'M-30-5Q0-21 30-5L27 18Q0 34-27 18Z',darkBronze,ink,1.7);
      e(metal,0,-4,30,15,bronze,ink,1.7);
      e(metal,0,-5,21,10,'#bda976',darkBronze,1);
      p(metal,'M-10-5V-15Q0-26 10-15V-5Q0 3-10-5Z',bronze,ink,1.3);
      e(metal,0,-16,9,5,paleGold,darkBronze,.8);
      l(metal,'M-24-2Q-19-12-8-13',ivory,1.6);
      l(metal,'M-22 16Q0 26 21 16',gold,1.2);
    }
    mallet(g,-61,-28,-40,true);mallet(g,46,-38,43,true);
  } else {
    // Stable timber frame with two real suspension cords and an inset bronze face.
    p(g,'M-93 107L-78 87H-51L-55 107ZM51 87H78L94 107H54Z',wine,ink,2);
    p(g,'M-69 88V-112L-56-120V88ZM57 88V-120L70-111V88Z',berry,ink,2);
    p(g,'M-80-109Q0-138 80-109L78-92Q0-115-78-92Z',wine,ink,2);
    l(g,'M-72-103Q0-126 73-103',paleGold,2.2);
    l(g,'M-64-95V80M63-94V80','#b66b77',1.7);
    p(g,'M-62 86H62V98H-62Z',wine,ink,2);
    l(g,'M-48-107L-31-53M48-107L31-53',ivory,2.8);
    const frame=g;
    g=add(frame,'g',{'data-gong-metal':''});
    e(g,0,14,61,67,darkBronze,ink,2.2);
    e(g,-2,10,58,63,bronze,ink,1.3);
    p(g,'M15-50Q61-26 60 17Q59 62 18 78Q48 47 44 12Q45-20 15-50Z','#514c3d','none');
    e(g,-2,10,46,49,'#b6a17a',darkBronze,1.2);
    p(g,'M-35-17Q-15-41 14-29Q36-14 37 14Q13-5-4-1Q-23-1-35-17Z','#d6c69c','none');
    p(g,'M-35 29Q-5 51 34 30Q13 65-18 49Z','#847457','none');
    p(g,'M-49-14Q-28-54 5-49Q34-45 46-19Q6-49-31-12Z',paleGold,'none',0,{opacity:.64});
    l(g,'M-46 36Q-19 69 22 57',darkBronze,3);
    for(let i=0;i<16;i++) {
      const a=i*Math.PI/8, x=Math.cos(a)*51-2,y=Math.sin(a)*56+10;
      l(g,`M${x-2} ${y}l3 -1`,i%2?gold:darkBronze,1.5);
    }
    e(g,0,15,17,19,'#4f493b',ink,1.2);
    e(g,-5,7,15,16,bronze,darkBronze,1);
    p(g,'M-17 5Q-15-8-6-8Q2-8 5-2Q-6-5-9 8Z',paleGold,'none');
    l(g,'M-50 0Q-49-28-23-40',ivory,1.6);
    g=frame;
    mallet(g,76,17,-25);
    for(const x of [-63,63]) { e(g,x,-82,2.5,2.5,gold,ink,.8);e(g,x,73,2.5,2.5,gold,ink,.8); }
  }
}

export function drawBaliRefinement(g,item,male) {
  if(!item.id.startsWith('wallacei::Sanda, Bali'))return false;
  const draw={
    'ju1873-cacao-specimen-lantern':cacao,
    'ju1873-balinese-endek-wrap':wrap,
    'ju1873-balinese-gamelan-gong':gong
  }[item.family];
  if(!draw)return false;
  g.dataset.renderer=item.family;g.dataset.refinement='bali-20260906';draw(g,male);return true;
}
