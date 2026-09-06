// JU1325 garden props. Explicit paint keeps these independent of legacy CSS.
const ink = '#293d48', silver = '#c6d6d8', light = '#f5f2e5';
const berry = '#984c66', edge = '#623d54', teal = '#417a7e';
const add = (g, tag, attrs) => {
  const n = document.createElementNS('http://www.w3.org/2000/svg', tag);
  Object.entries(attrs).forEach(([k,v]) => n.setAttribute(k,v));
  g.appendChild(n); return n;
};
const p = (g,d,fill,stroke=ink,w=3,attrs={}) => add(g,'path',{d,fill,stroke,'stroke-width':w,'stroke-linejoin':'round','stroke-linecap':'round',...attrs});
const l = (g,d,c=light,w=2) => p(g,d,'none',c,w);
const e = (g,x,y,rx,ry,fill,stroke=ink,w=2,attrs={}) => add(g,'ellipse',{cx:x,cy:y,rx,ry,fill,stroke,'stroke-width':w,...attrs});

function loupe(g,male) {
  if (male) {
    // Straight compact grip, aligned with the lens centre and metal neck.
    p(g,'M4 16L-33 77Q-40 87-29 93L-22 97Q-12 101-6 90L24 28Z',edge);
    p(g,'M5 29L-27 81Q-29 86-23 89Q-17 92-14 85L15 35Z',berry,'none');
    l(g,'M-21 79L3 39','#c67e91',3);
    p(g,'M2 21L12 4L31 15L22 33Z',silver);
    e(g,36,-22,50,53,'none',ink,7);
    e(g,34,-26,49,52,'none',silver,7);
    e(g,34,-26,44,47,'#b8d5d9',teal,2,{'fill-opacity':.3});
    l(g,'M-10-32Q-8-72 32-75',light,3);
    l(g,'M54 15Q71 5 73-14','#819b9e',3);
    liveLens(g,34,-26,44,47,male);
    l(g,'M7-48L22-59',light,4);
  } else {
    p(g,'M-44 27L-93 91Q-102 104-90 112L-78 118Q-67 121-59 109L-17 45Z',edge);
    p(g,'M-43 37L-88 96Q-93 103-83 107Q-75 112-69 103L-29 47Z',berry,'none');
    l(g,'M-75 92L-42 49','#ce8799',4);
    p(g,'M-41 30L-25 9L-4 25L-21 47Z',silver);
    l(g,'M-32 27L-14 39',light,3);
    e(g,39,-38,78,81,'none',ink,8);
    e(g,36,-44,77,79,'none',silver,8);
    e(g,36,-44,70,72,'#b8d5d9',teal,2,{'fill-opacity':.3});
    l(g,'M-35-49Q-31-112 30-118',light,4);
    l(g,'M54 23Q98 8 104-39','#7a939a',4);
    liveLens(g,36,-44,70,72,male);
    l(g,'M-15-81L5-94M-20-66L17-91',light,4);
  }
}

function liveLens(g,cx,cy,rx,ry,male) {
  // The fixed foreignObject box prevents the magnified scene from changing
  // the loupe's drag bounds or its CSS transform-origin.
  const frame=add(g,'foreignObject',{x:cx-rx,y:cy-ry,width:rx*2,height:ry*2,
    'data-live-loupe':male?'male':'female','pointer-events':'none','aria-hidden':'true'});
  const holder=document.createElementNS('http://www.w3.org/1999/xhtml','div');
  holder.setAttribute('style','width:100%;height:100%;overflow:hidden;border-radius:50%;pointer-events:none;');
  frame.appendChild(holder);
  add(holder,'svg',{viewBox:`0 0 ${rx*2} ${ry*2}`,width:rx*2,height:ry*2,
    style:'display:block;overflow:hidden;pointer-events:none;', 'aria-hidden':'true'});
}

function can(g,male) {
  if (male) {
    // Compact upright can, with a tall bail and a narrow neck.
    l(g,'M-45-10C-114-73-116 47-48 55',ink,13);
    l(g,'M-45-10C-114-73-116 47-48 55',silver,7);
    p(g,'M25 35Q67 10 88-41L99-38Q92 15 39 57Z',silver);
    l(g,'M41 35Q75 4 91-29',light,3);
    p(g,'M86-47L105-56L122-41L97-28Z',teal);
    e(g,111,-49,19,11,silver,ink,2,{transform:'rotate(36 111 -49)'});
    for(const [x,y] of [[101,-53],[110,-50],[119,-46],[111,-57],[117,-52]]) e(g,x,y,1.8,1.8,ink,'none');
    p(g,'M-54-24Q-3-42 43-24L48 61Q-4 89-57 60Z',berry);
    p(g,'M24-23L43-24L48 61Q33 69 21 71Z',edge,'none');
    e(g,-6,-24,48,13,silver);
    e(g,-8,-26,23,7,ink);
    l(g,'M-40-30Q-15-38 11-32',light,2);
    l(g,'M-54 51Q-6 72 47 53',silver,4);
    l(g,'M-52 61Q-3 82 44 64',ink,3);
    l(g,'M-36-6L-35 35','#d29aab',4);
    l(g,'M-26-6L-25 29','#b9748a',2);
    l(g,'M-30-28C-36-93 28-91 25-28',ink,10);
    l(g,'M-30-28C-36-93 28-91 25-28',silver,5);
    p(g,'M-23-66Q-2-84 17-65L14-58Q-2-72-20-59Z',edge);
  } else {
    // Broad oval enamel body and separately soldered rising spout.
    l(g,'M-106-26C-197-94-203 51-127 68',ink,17);
    l(g,'M-106-26C-197-94-203 51-127 68',silver,10);
    l(g,'M-134-36C-184-57-191 14-162 41',light,3);
    p(g,'M-6 31Q53 14 105-69L124-57Q81 25 12 61Z',silver);
    p(g,'M-6 45Q58 26 116-58L124-57Q81 25 12 61Z','#899fa6','none');
    l(g,'M13 31Q66 8 107-53',light,4);
    p(g,'M101-74L127-90L152-69L122-48Z',teal);
    e(g,138,-80,29,18,silver,ink,3,{transform:'rotate(36 138 -80)'});
    e(g,138,-80,23,13,'#e2e7df',teal,1.5,{transform:'rotate(36 138 -80)'});
    for(const [x,y] of [[124,-86],[135,-85],[146,-79],[156,-75],[129,-78],[140,-73],[140,-92],[150,-86]]) e(g,x,y,2,2,ink,'none');
    p(g,'M-137-31Q-66-62 5-32L14 74Q-56 111-140 71Z',berry);
    p(g,'M-16-38Q-4-36 5-32L14 74Q-4 82-22 85Z',edge,'none');
    e(g,-66,-33,71,20,silver);
    e(g,-66,-35,62,14,'#a6b9bd',ink,1);
    e(g,-70,-38,31,10,ink);
    l(g,'M-113-43Q-87-54-49-49',light,3);
    l(g,'M-138 58Q-62 92 12 60',silver,5);
    l(g,'M-134 73Q-63 102 8 76',ink,4);
    l(g,'M-115-6L-114 43','#d59bad',6);
    l(g,'M-101-6L-100 39','#b9768c',3);
    l(g,'M-105-37C-101-107-18-105-23-35',ink,12);
    l(g,'M-105-37C-101-107-18-105-23-35',silver,6);
    p(g,'M-88-79Q-62-99-36-79L-39-71Q-62-85-83-70Z',edge);
    e(g,-125,49,3,3,silver,'none'); e(g,-3,51,3,3,silver,'none');
  }
}

function tube(g,male) {
  const body = add(g,'g',{transform:male?'rotate(14)':'rotate(17)'});
  const x=male?-92:-128, end=male?99:146, h=male?27:34;
  const outline=`M${x} ${-h}H${end-24}Q${end+9} ${-h} ${end+9} 0Q${end+9} ${h} ${end-24} ${h}H${x}Z`;
  p(body,outline,'#bfdee0',teal,3,{'fill-opacity':.24});
  // A scoped clip guarantees that folded leaves and petals stay inside the vessel.
  const id=`tri-tube-contents-${male?'male':'female'}`;
  const defs=add(body,'defs',{}), clip=add(defs,'clipPath',{id});
  p(clip,outline,'white','none');
  const contents=add(body,'g',{'clip-path':`url(#${id})`});
  const leaves=male? [[-44,4,30],[22,9,-12]]:[[-72,7,15],[-6,13,-18],[74,7,28]];
  for(const [xx,yy,a] of leaves) {
    const leaf=add(contents,'g',{transform:`translate(${xx} ${yy}) rotate(${a})`});
    p(leaf,'M-25 6Q-14-22 10-13Q27-4 30 12Q11 3-4 12Q-17 19-25 6Z','#8c8255','#555d4b',1.8);
    p(leaf,'M-25 6Q-11 4-4 12Q-17 19-25 6Z','#d0b583','#555d4b',1.3);
    l(leaf,'M-20 7Q1-4 22 9','#555d4b',1.5);
  }
  const petal=add(contents,'g',{transform:male?'translate(-3 -4)':'translate(40 -7)'});
  p(petal,'M-18 4C-38-21-11-29-4-12C4-34 25-16 12-2C36-10 28 17 9 11Q-7 24-18 4Z','#bc8091','#81576b',1.5);
  l(petal,'M-19-11Q-11-9-6 5M12-16L0 6','#e3b7ba',2);
  l(body,`M${x+16} ${-h+7}H${end-28}Q${end-7} ${-h+7} ${end-4} -9`,light,4);
  l(body,`M${x+12} ${h-6}H${end-23}Q${end-3} ${h-6} ${end+1} 8`,'#82a9ad',2);
  for(let i=0;i<4;i++) l(body,`M${x+36+i*23} ${-h+14}v${i%2?5:9}`,'#6b9199',1.5);
  p(body,`M${x-18} ${-h-4}Q${x-25} 0 ${x-18} ${h+4}H${x+6}V${-h-4}Z`,berry);
  p(body,`M${x-18} ${h-6}H${x+6}V${h+4}H${x-18}Z`,edge,'none');
  for(let i=0;i<4;i++) l(body,`M${x-15+i*5} ${-h+3}v${h*2-9}`,'#cf94a7',2);
  l(body,`M${x+8} ${-h+2}V${h-2}`,silver,3);
  l(body,`M${x+3} ${-h}Q${x+18} ${-h-32} ${x+48} ${-h-26}`,light,2);
  p(body,`M${x+32} ${-h-42}H${x+109}V${-h-15}H${x+32}L${x+23} ${-h-28}Z`,light,'#a89c7c',1.5);
  e(body,x+32,-h-28,2,2,ink,'none');
  const text=add(body,'text',{x:x+69,y:-h-23,fill:ink,'font-size':12,'font-family':'sans-serif','font-weight':700,'text-anchor':'middle'});
  text.textContent='14 DAYS';
}

export function drawTrivandrumRefinement(g,item,male) {
  if(!item.id.startsWith('nigoni::Trivandrum, Kerala · JU1325::')) return false;
  const draw={'trivandrum-field-loupe':loupe,'trivandrum-garden-watering-can':can,'trivandrum-sample-tube':tube}[item.family];
  if(!draw) return false;
  g.dataset.renderer=item.family;
  g.dataset.refinement='trivandrum-20260906';
  draw(g,male); return true;
}
