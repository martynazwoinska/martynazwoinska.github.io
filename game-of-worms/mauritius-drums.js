// Original ravanne drawings, guided by Abaim's photographs of its handmade drums.
// The worm hands are playful additions, not traditional fittings.
const NS='http://www.w3.org/2000/svg';
const add=(g,t,a={})=>{const n=document.createElementNS(NS,t);for(const [k,v] of Object.entries(a))n.setAttribute(k,v);g.appendChild(n);return n;};
const path=(g,d,fill='none',stroke='#68462f',width=2.6)=>add(g,'path',{d,fill,stroke,'stroke-width':width,'stroke-linecap':'round','stroke-linejoin':'round'});
const ellipse=(g,cx,cy,rx,ry,fill,stroke='#68462f',width=2.6)=>add(g,'ellipse',{cx,cy,rx,ry,fill,stroke,'stroke-width':width});

export function drawMauritiusDrum(group,male) {
  const id=male?'ju2909-small-skin':'ju2909-large-skin';
  const defs=add(group,'defs'),clip=add(defs,'clipPath',{id});
  const rx=male?62:87,ry=male?58:75;
  ellipse(clip,0,0,rx-5,ry-5,'white','none');
  // The hide folds over a shallow hoop. Only the lower wooden edge is exposed.
  path(group,male?'M-48-37Q-78-8-59 30Q-34 74 16 61Q59 49 65 8L59-3Q53 42 13 51Q-29 61-51 22Q-63-6-43-32Z':'M-73-42Q-104-5-80 40Q-41 94 27 80Q78 69 92 20L86 4Q78 57 22 67Q-36 81-70 34Q-90 0-64-36Z','#9b663f','#5d3e2e',3.5);
  path(group,male?'M-54 28Q-24 65 16 56Q46 49 58 25':'M-75 36Q-36 83 28 73Q67 65 82 37','none','#cf9861',2);
  // Short grain follows the exposed wooden hoop, clear of the drum skin.
  path(group,male?'M-23 61Q-7 66 7 62M28 56L40 49':'M-35 79Q-14 86 6 82M42 75Q57 70 67 61','none','#714b32',1.6);
  ellipse(group,0,0,rx,ry,'#dfc092','#725036',3.4);
  ellipse(group,0,-1,rx-5,ry-5,'#f1dfbd','#b7986f',1.5);
  const skin=add(group,'g',{'clip-path':`url(#${id})`});
  // Broad, low-contrast hide variation; the centre stays uncluttered.
  path(skin,male?'M-60-26Q-25-51 2-30Q25-6 57-17L66-64H-67Z':'M-94-45Q-53-78-17-49Q9-32 35-54Q66-70 91-34L99-84H-98Z','#ddc49b','none').setAttribute('opacity','.38');
  path(skin,male?'M-46 25Q-21 6 9 26Q30 41 60 20L59 70H-55Z':'M-79 34Q-42 16-14 41Q25 59 58 25Q73 16 88 28V86H-95Z','#c9aa7d','none').setAttribute('opacity','.16');
  path(group,male?'M-48-30Q-40-44-24-48M33 39Q45 29 49 16':'M-67-40Q-51-59-28-62M50 48Q67 34 73 13','none','#fff3d6',2.5);
  // Small hide folds stay at the rim, rather than crossing the playing surface.
  path(group,male?'M-60-5L-54-4M-39 44L-35 40M17-54L16-49M55 16L50 14':'M-83-13L-77-12M-64 48L-60 44M-9-71L-9-65M78 23L72 21M30 68L28 62','none','#ad8b61',1.5);
  // Different gripping hands and striking sides distinguish the two objects.
  if(male) {
    path(group,'M45 41Q68 47 70 29L65 14Q60 8 56 13L57 26Q50 21 47 25Q44 29 51 33Q43 32 45 41Z','#f0b995','#865942',2.5);
    path(group,'M56 32L62 35M57 25L64 28','none','#ad7456',1.3);
  } else {
    path(group,'M-83 43Q-105 47-107 24L-100 10Q-95 5-91 10L-92 24Q-81 18-77 24Q-75 29-86 32Q-76 33-83 43Z','#f0b995','#865942',2.6);
    path(group,'M-100 27L-93 30M-100 35L-94 36','none','#ad7456',1.3);
  }
  const hand=add(group,'g',{'data-mauritius-drum-hand':'',transform:male?'translate(-33 -58) rotate(-18)':'translate(49 -77) rotate(18)'});
  // One rounded palm, four unequal fingers and a side thumb; contained creases.
  path(hand,male?'M-8 15L-10 0L-11-12Q-10-17-7-13L-3-4L-5-20Q-3-25 0-20L3-6L4-23Q7-27 9-21L10-5L13-16Q17-19 18-13L16 6L22 0Q28-1 25 6L15 18Q6 23-8 15Z':'M-12 17L-15 0L-16-14Q-14-20-10-15L-6-3L-7-24Q-4-29-1-23L2-5L3-27Q7-32 10-25L10-5L14-20Q18-23 20-17L18 7L26 0Q32-1 29 7L17 21Q2 27-12 17Z','#f4c4a0','#865942',2.6);
  path(hand,male?'M-2 6Q3 3 9 6M2 11L9 12':'M-5 6Q3 2 12 7M0 13Q6 11 12 14','none','#bd8966',1.3);
}

export function drumHandOffset(ms,male,reduced=false) {
  if(reduced)return {x:0,y:0};
  const score=male?[220,700,940,1420,1900]:[220,700,1180,1420,1900];
  const at=score.reduce((best,t)=>Math.abs(ms-t)<Math.abs(ms-best)?t:best,score[0]);
  const t=ms-at;
  const contact=t<0?Math.max(0,1+t/160)**2:Math.max(0,1-t/220)**2;
  return {x:(male?12:-16)*contact,y:(male?25:33)*contact};
}
