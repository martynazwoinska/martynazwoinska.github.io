// Original constructions. Reference notes live in the Nambucca location dossier.
export const PRESS = 'qg2814-flower-press';
export const PAINT = 'qg2814-rock-painting';
export const APRON = 'qg2814-painting-apron';
export const nambuccaLayouts = {
  [PRESS]: { primary: [417, 94, .67, -6], companion: [13, 240, .55, 7] },
  [PAINT]: { primary: [390, 267, .68, -5], companion: [4, 30, .50, 6] },
  [APRON]: { primary: [0, 0, 1, 0], companion: [-28, 82, .43, 0] }
};
const NS = 'http://www.w3.org/2000/svg';
const C = { ink:'#30454c', wood:'#bd8752', woodLight:'#e2b982', woodDark:'#805634',
  paper:'#fff3d8', edge:'#d5be94', silver:'#d3e1e2', teal:'#317c77', berry:'#ac496a',
  violet:'#716294', gold:'#ebbf57', stone:'#81959b', stoneLight:'#bbcacb' };
export function add(g, tag, attrs = {}) {
  const n = document.createElementNS(NS, tag);
  for (const [key, value] of Object.entries(attrs)) n.setAttribute(key, value);
  g.appendChild(n); return n;
}
const p = (g,d,fill='none',stroke=C.ink,w=1.8) => add(g,'path',{d,fill,stroke,'stroke-width':w,'stroke-linecap':'round','stroke-linejoin':'round'});
const e = (g,x,y,rx,ry,fill,stroke=C.ink,w=1.5) => add(g,'ellipse',{cx:x,cy:y,rx,ry,fill,stroke,'stroke-width':w});
const part = (g,name,attrs={}) => add(g,'g',{['data-nb-'+name]:'',...attrs});
function bloom(g,x,y,small=false) {
  const f=add(g,'g',{transform:`translate(${x} ${y})`});
  p(f,small?'M0 0Q14 12 12 31':'M0 0Q-5 19 7 36','none','#62886b',2.1);
  p(f,small?'M7 15Q-8 6-8 17Q-1 23 7 15ZM12 24Q30 9 27 25Q20 31 12 24Z':'M-1 15Q-21 6-19 18Q-10 25-1 15ZM2 26Q23 10 21 28Q10 34 2 26Z','#8ea87a','#577a61',1);
  const petals=small?6:5;
  for(let i=0;i<petals;i++) {
    const leaf=p(f,small?'M-2 1C-13-4-9-16-2-14C6-13 7-4 2 1Z':'M-2 2C-14-2-15-15-7-18C3-20 9-8 2 2Z',small?'#e6bd66':'#ca7a96',small?'#bc9145':'#965673',1);
    leaf.setAttribute('transform',`rotate(${i*360/petals})`);
  }
  e(f,0,0,4.6,4.1,small?'#88623e':C.gold,'#946b3e',1);
  p(f,'M-2-2L0-3M2 0L3 1','none','#fff1b0',1.1);
  return f;
}
function board(g,outline,thickness=7) {
  const side=add(g,'g',{transform:`translate(0 ${thickness})`});
  p(side,outline,C.woodDark,C.ink,2);
  p(g,outline,C.wood,C.ink,2);
}
function screw(g,x,y) {
  p(g,`M${x} ${y+28}V${y-61}`,'none','#778b91',4.3);
  p(g,`M${x-1} ${y+26}V${y-60}`,'none',C.silver,1.8);
  for(let i=-54;i<28;i+=7)p(g,`M${x-2.8} ${y+i}l5.6-1.8`,'none','#71858c',.8);
}
function nut(g,x,y) {
  e(g,x,y,7,3.7,C.silver,'#667b80',1);
  const n=part(g,'nut',{transform:`translate(${x} ${y-2})`});
  p(n,'M-3 1C-17-1-17-13-10-11L-2-5H2L10-11C18-13 16-1 3 1Z',C.silver,C.ink,1.3);
  p(n,'M-11-8L-5-3M6-4L11-8','none','#f4ffff',1.5);
  e(n,0,-1,3.4,3,'#8da4a9',C.ink,.8);
}
function flowerPress(g,male) {
  if(male) {
    // Compact strap press. A separate blotting-paper folder slides from its edge.
    const outline='M-55-3L28-20L59 23L-25 42Z';
    board(g,outline);
    for(const dy of [-5,-10,-14]) {
      const layer=add(g,'g',{transform:`translate(0 ${dy})`});
      p(layer,outline,dy===-10?C.paper:C.edge,'#ab936e',1);
    }
    const sheet=part(g,'sheet',{transform:'translate(0 0)'});
    p(sheet,'M-34-8L35-24L65 21L-8 37Z',C.paper,'#bca67f',1.2);
    p(sheet,'M-29-5L33-19L58 19','none','#fffdf0',1.5);
    const flower=add(sheet,'g',{transform:'translate(31 -6) rotate(-24) scale(.65 .42)'});
    bloom(flower,0,0,true);
    const top=add(g,'g',{transform:'translate(-17 -24) scale(.72 .8)'});
    board(top,outline,6);
    p(top,'M-44 0L23-13M-29 28L48 12','none',C.woodLight,1.6);
    for(const x of [-28,13]) {
      p(top,`M${x}-8l11-2 31 42-11 2Z`,C.teal,C.ink,1.2);
      p(top,`M${x+21} 20l14-3 6 8-14 3Z`,C.silver,C.ink,1);
      p(top,`M${x+27} 21l4 5`,'none','#60797b',1.4);
    }
    p(g,'M-47 10L-25 36','none',C.woodLight,1.4);
    return;
  }
  const outline='M-73 4L25-19L77 12L-21 39Z';
  const base=add(g,'g',{transform:'translate(0 23)'});
  board(base,outline,8);
  for(const [dy,color] of [[15,C.edge],[10,C.paper],[6,C.edge]]) {
    const layer=add(g,'g',{transform:`translate(0 ${dy}) scale(.94 .92)`});
    p(layer,outline,color,'#b69d73',1.2);
  }
  const paper=add(g,'g',{transform:'translate(0 3) scale(.88 .83)'});
  p(paper,outline,C.paper,'#b8a17e',1.2);
  const flowers=add(paper,'g',{transform:'translate(-4 6) matrix(1 -.2 .45 .65 0 0)'});
  bloom(flowers,-19,-3);bloom(flowers,25,7,true);
  const corners=[[-64,7],[24,-11],[64,13],[-20,30]];
  for(const [x,y] of corners)screw(g,x,y);
  const lid=part(g,'lid',{transform:'translate(0 -44)'});
  board(lid,outline,7);
  p(lid,'M-63 5L24-14L66 11','none','#f2cd96',1.8);
  p(lid,'M-56 11L10-4Q22-7 40 4M-32 25L35 6M-17 32L55 12','none','#9c693e',1.1);
  // Inset leaf-shaped carving follows the top plane, with no label or logo.
  p(lid,'M-16 13Q-16-3 7-4Q16 12-16 13Z','#ca985f','#9d6d43',1);
  p(lid,'M-21 19L5-1M-8 7L-9 0M-2 3L6 6','none','#e8c08b',1.2);
  for(const [x,y] of corners)nut(lid,x,y);
}
export function paintDesign(male) {
  return male ? [
    ['M-31 10C-16 31 1 21 1 5C1-10 20-15 24-3C28 10 41 3 34-14',C.violet,10],
    ['M-29 9C-15 24-4 19-4 6C-4-10 18-19 24-8','#bba8d6',2.2],
    ['M31-14a1.3 1.3 0 1 0 .1 0',C.ink,2],
    ['M37-10a1.3 1.3 0 1 0 .1 0',C.ink,2],
    ['M29-6Q31 0 37-3',C.ink,1.8]
  ] : [
    ['M2 29C7 17 4 3-1-8',C.teal,4],
    ['M4 19C-13 7-17 18-2 23',C.teal,4.5],
    ['M5 14C23-4 24 17 5 17',C.teal,4.5],
    ['M-2-9C-21-1-23-19-11-18C-16-35 3-35 3-20C18-32 27-16 11-11C30-2 16 12 5-4C-2 16-18 8-9-6',C.berry,7],
    ['M-3-14a5 4 0 1 0 8 5a5 4 0 1 0-8-5',C.gold,4]
  ];
}
function brush(g,male) {
  const b=part(g,'brush',{transform:`translate(${male?56:65} -43) rotate(${male?27:32})`});
  p(b,'M-2-23L-3-75Q-2-86 1-85Q5-84 5-74L3-23Z',male?'#ddae6b':C.berry,C.ink,1.3);
  p(b,'M0-29L0-74','none',male?'#ffe0ac':'#e6a1b5',1.2);
  p(b,'M-4-24H5L6-12H-5Z',C.silver,C.ink,1.2);
  p(b,'M-3-21H4M-4-15H5','none','#759198',.9);
  p(b,male?'M-5-12Q-6-2 0 1Q7-4 6-12Z':'M-5-12L-6-1Q0 2 7-1L6-12Z','#a88462',C.ink,1);
  p(b,male?'M-4-5Q-2-1 0 1Q4-1 5-5Z':'M-6-5L-6-1Q0 2 7-1L6-5Z',male?C.violet:C.berry,'none').setAttribute('data-nb-paint-tip','');
  p(b,'M-2-11V-6M2-11V-7','none','#e0c7a6',.8);
}
function rockPainting(g,male) {
  const id=`nb-rock-${male?'male':'large'}`;
  const outline=male?'M-53-5Q-54-29-25-35L18-32Q44-29 53-9Q60 13 36 28L-12 35Q-44 31-53-5Z':'M-62-9Q-57-39-29-41L20-36Q49-37 66-10L62 20Q45 42 1 40L-41 27Q-67 20-62-9Z';
  const foot=add(g,'g',{transform:'translate(1 11)'});
  p(foot,outline,'#596e78',C.ink,2.2);
  p(g,outline,C.stoneLight,C.ink,2.2);
  p(g,male?'M-51-3L-42 12L-12 30L34 23L50 9Q44 27 17 31L-12 35Q-43 29-51-3Z':'M-61-2L-49 15L-14 33L22 34L58 17L62 20Q45 42 1 40L-41 27Q-64 19-61-2Z','#96aaae','none');
  p(g,male?'M-50 5L-43 13L-29 17M25-30L33-23':'M-59 1L-47 15L-35 17M46-28L51-20','none','#6f8992',1.1);
  p(g,male?'M-47-13Q-24-39 18-25L44-8':'M-52-16Q-38-36-13-33L24-29Q45-25 53-10','none','#e0e8dd',2.8);
  p(g,male?'M-47 11Q-15 43 35 20':'M-52 13Q-10 48 51 21','none','#91a6aa',3);
  // Sparse mineral flecks are confined to the peripheral facets.
  for(const [x,y] of male?[[-38,-17],[-36,17],[40,9],[15,28]]:[[-45,-22],[-39,19],[44,-19],[49,12],[-4,31]]){
    p(g,`M${x} ${y}l2-1M${x+5} ${y+2}h1`,'none','#8a9fa3',1);
  }
  const clip=add(add(g,'defs'),'clipPath',{id});p(clip,outline,'white','none');
  const paint=part(g,'painting',{'clip-path':`url(#${id})`});
  for(const [d,color,width] of paintDesign(male)) {
    const s=p(paint,d,'none',color,width);
    s.setAttribute('data-nb-stroke','');s.setAttribute('pathLength','1');
    s.setAttribute('stroke-dasharray','1 1');s.setAttribute('stroke-dashoffset','1');
    s.setAttribute('opacity','0');
  }
  if(male) {
    const pot=add(g,'g',{transform:'translate(-55 36)'});
    p(pot,'M-12-10H12L10 9Q0 15-10 9Z','#f5e4c6',C.ink,1.5);
    e(pot,0,-10,12,5,C.violet,C.ink,1.5);p(pot,'M-7-11Q0-14 6-11','none','#b9a6cf',1.3);
    p(pot,'M-8-1L-7 7','none','#fff9e5',1.4);
  } else {
    const palette=add(g,'g',{transform:'translate(-64 29) rotate(-13)'});
    p(palette,'M-21-14C-48-10-40 21-13 24C7 29 22 21 20 10C17 3 6 11 4 1C4-10-5-20-21-14Z',C.woodLight,C.ink,1.7);
    e(palette,9,14,3.4,2.6,'#647e7a','#8a603e',1);
    e(palette,-24,1,6,4,C.berry,'#864260',1);
    e(palette,-11,-5,5.6,3.8,C.teal,'#285e60',1);
    e(palette,-12,13,5.4,3.8,C.gold,'#b89648',1);
    p(palette,'M-28 0L-24-1M-14-6H-10M-15 12H-12','none','#fff4d7',1);
  }
  brush(g,male);
}
function apron(g,male) {
  const outline=male?'M253 112L278 119Q252 136 240 157L236 183Q216 194 194 184C204 159 217 137 240 126Z':'M256 106Q272 105 287 118L257 135Q235 154 230 180L224 203Q201 211 185 195C194 171 200 150 219 134Q234 123 244 117L247 107Z';
  const id=`nb-apron-${male?'male':'large'}`;
  // Neck loop and waist tie sit behind the bib and skirt.
  p(g,male?'M255 116Q256 96 278 97Q297 99 291 114L276 123':'M255 110Q269 86 294 98Q305 105 291 121','none',male?'#a193bb':'#b87889',5);
  p(g,male?'M214 154Q236 142 253 148Q262 153 255 161':'M208 155Q232 142 248 153L246 165','none',male?'#a193bb':'#b87889',4.5);
  p(g,'M245 153Q263 137 267 151Q263 160 248 157Q266 164 259 178L247 164L243 184','none',male?'#a193bb':'#b87889',3.2);
  p(g,outline,male?'#756e96':C.paper,C.ink,1.8);
  const clip=add(add(g,'defs'),'clipPath',{id});p(clip,outline,'white','none');
  const details=add(g,'g',{'clip-path':`url(#${id})`});
  p(details,male?'M248 125Q231 143 222 165L216 187':'M251 120Q224 144 216 172L209 202','none',male?'#8c85ad':'#e5d2ad',5);
  p(details,male?'M261 123Q244 144 238 181M204 182Q218 188 231 181':'M256 112Q269 111 278 118Q244 140 234 172L221 198Q201 204 191 194','none',male?'#c0b6d4':'#b99680',1.3);
  const pocket=male?'M219 147L244 135L239 161L210 173Z':'M210 159Q223 161 240 151L232 182Q214 192 201 179Z';
  p(details,pocket,male?'#e8dbc0':'#eadabb',male?'#4e506c':'#ac9173',1.4);
  p(details,male?'M220 151L240 141M215 167L235 156':'M212 164Q223 166 236 158M205 178Q215 187 230 178','none',male?'#fff2d3':'#fff9e7',1);
  if(!male)p(details,'M221 164L214 183','none','#baa084',1);
  for(const [x,y,color] of male?[[252,130,C.berry],[213,178,C.teal],[226,143,C.gold]]:[[262,122,C.berry],[230,147,C.teal],[199,185,C.violet]]){
    p(details,`M${x-2} ${y-3}q4-4 7 0l-2 6-5-1Z`,color,'none');
    e(details,x+9,y+5,1.5,1.1,color,'none');
  }
  // Brass strap rivets and hem thickness remain readable at default size.
  e(g,male?254:253,male?119:114,2.3,2.3,C.gold,C.woodDark,.9);
  e(g,male?271:279,male?122:118,2.3,2.3,C.gold,C.woodDark,.9);
}
export function drawNambucca(g,item,male) {
  if(![PRESS,PAINT,APRON].includes(item.family))return false;
  g.setAttribute('data-nambucca-art',male?'companion':'primary');
  g.setAttribute('style','transform-box:view-box;transform-origin:0 0');
  if(item.family===PRESS)flowerPress(g,male);
  if(item.family===PAINT)rockPainting(g,male);
  if(item.family===APRON)apron(g,male);
  return true;
}
