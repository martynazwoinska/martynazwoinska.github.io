// Original SVG constructions. Botanical/material references: the JU1373 dossier.
export const LYCHEE='ju1373-lychees',COAT='ju1373-raincoats',FLOWERS='ju1373-flower-arranging';
export const reunionLayouts={
  [LYCHEE]:{primary:[408,97,.72,-6],companion:[25,105,.56,6]},
  [COAT]:{primary:[0,0,1,0],companion:[-28,82,.43,0]},
  [FLOWERS]:{primary:[291,191,.79,-19],companion:[62,159,.62,-9]}
};
const NS='http://www.w3.org/2000/svg';
export const C={ink:'#344751',berry:'#ba4969',red:'#d76278',pink:'#f6b5b8',cream:'#fff4d7',
  leaf:'#577b53',lightLeaf:'#a7bb73',gold:'#e5bb60',goldDark:'#bb893f',violet:'#8178aa',lightViolet:'#bbb2d5',water:'#b9e2e8'};
export function add(g,t,a={}){const n=document.createElementNS(NS,t);for(const[k,v]of Object.entries(a))n.setAttribute(k,v);g.appendChild(n);return n;}
export const p=(g,d,fill='none',stroke=C.ink,w=1.5)=>add(g,'path',{d,fill,stroke,'stroke-width':w,'stroke-linejoin':'round','stroke-linecap':'round'});
export const e=(g,x,y,rx,ry,fill,stroke=C.ink,w=1.2)=>add(g,'ellipse',{cx:x,cy:y,rx,ry,fill,stroke,'stroke-width':w});
export const part=(g,name,a={})=>add(g,'g',{['data-re-'+name]:'',...a});
function gradient(g,id,stops){const n=add(add(g,'defs'),'linearGradient',{id,x1:0,y1:0,x2:1,y2:.35});stops.forEach(([offset,color])=>add(n,'stop',{offset,'stop-color':color}));return `url(#${id})`;}
function shell(g,id,d){
  const fill=gradient(g,id+'-red',[[0,'#ed9291'],[.4,C.red],[.78,C.berry],[1,'#873e59']]);
  p(g,d,fill,'#873e59',1.4);
  const clip=add(add(g,'defs'),'clipPath',{id:id+'-clip'});p(clip,d,'white','none');
  const texture=add(g,'g',{'clip-path':`url(#${id}-clip)`});
  // Tessellated raised skin, confined to the curved fruit surface.
  for(let row=0;row<10;row++)for(let col=0;col<10;col++){
    const seed=Math.sin(row*8.9+col*5.7),x=-29+col*6.4+(row%2)*3+seed,y=-30+row*6.5+Math.cos(col*7+row)*1.4;
    p(texture,`M${x-1} ${y+2}q-1-3 2-4l3 1 1 3-3 1Z`,'none','#a94e64',.45);
    p(texture,`M${x} ${y}l2-2 2 1`,'none','#ef9b9a',.7);
  }
}
export function lychee(g,id,small=false){
  const fruit=part(g,'fruit');
  const flesh=part(fruit,'flesh');
  const white=gradient(flesh,id+'-flesh',[[0,'#d8e3d6'],[.27,'#ffffee'],[.65,'#eef1d9'],[1,'#bacfc5']]);
  p(flesh,'M-20 5C-30-12-20-27-3-28C16-31 28-14 23 5C20 27-11 34-20 5Z',white,'#78928a',1.1);
  p(flesh,'M-13-17Q-4-24 6-20M-18-7L-18-3','none','#fffef6',3);
  p(flesh,'M9 16Q18 10 19-2','none','#c9d9ca',1.1);
  const peel=part(fruit,'peel');
  for(const side of [-1,1]){
    const half=part(peel,side<0?'shell-left':'shell-right');
    shell(half,id+(side<0?'-l':'-r'),side<0?'M0-29C-20-33-31-15-26 6Q-23 29 0 29L-3 12L1 4L-2-7L2-16Z':'M0-29C22-31 33-13 27 9Q24 30 0 29L-3 12L1 4L-2-7L2-16Z');
  }
  const stem=part(fruit,'fruit-stem');p(stem,'M0-28L2-35','none','#715c3d',2.5);
  if(!small){p(stem,'M1-34Q12-46 23-40Q18-29 1-34Z',C.leaf,'#405e49',1);p(stem,'M4-35L18-39','none',C.lightLeaf,1);}
  return fruit;
}
function fruitSet(g,male){
  const id=male?'re-lychee-m':'re-lychee-h';
  e(g,0,43,male?41:48,5,'#253d4429','none');
  // A small saucer and a deeper porcelain dish have deliberately different profiles.
  p(g,male?'M-35 29Q0 45 36 29L28 38Q0 49-29 38Z':'M-44 25Q0 38 44 25L34 43Q0 54-34 43Z',male?'#8c80ad':'#a9c4c9',C.ink,1.5);
  e(g,0,male?28:25,male?36:44,male?10:14,C.cream,C.ink,1.5);
  e(g,0,male?28:25,male?28:35,male?6:9,'#ece3c9',male?'#a298ba':'#92aeb6',1);
  const f=part(g,'held-fruit',{transform:male?'translate(2 -1) rotate(13)':'translate(0 -3) rotate(-8)'});lychee(f,id,male);
  if(!male){
    const resting=add(g,'g',{transform:'translate(-26 24) scale(.48) rotate(-35)'});const spare=lychee(resting,id+'-spare',true);
    spare.querySelector('[data-re-shell-left]').setAttribute('transform','rotate(-62 -12 20)');
    spare.querySelector('[data-re-shell-right]').setAttribute('transform','rotate(62 12 20)');
    spare.querySelector('[data-re-fruit-stem]').setAttribute('opacity',0);
  }
  const seed=part(g,'seed',{opacity:0,transform:'translate(18 28) rotate(30)'});
  e(seed,0,0,5,8,'#66412f','#493b30',1);p(seed,'M-2-4L-2-1','none','#bc9064',1.4);
}
// A torch ginger has a compact central cone, cupped overlapping bracts and a stout stalk.
export function flower(g,id,{bud=false,scale=1}={}){
  const bloom=part(g,'stem',{transform:`scale(${scale})`});
  p(bloom,'M0 14Q-2 51 0 94','none','#355846',4);p(bloom,'M-1 17Q-3 52-1 90','none','#9bb578',1.5);
  if(bud){
    p(bloom,'M0 16C-21-1-12-28 1-40C18-25 21-3 0 16Z',C.berry,'#853a59',1.2);
    p(bloom,'M0 12Q-8-8 1-34Q10-12 0 12Z','#df849b','#eeafba',1);
    p(bloom,'M-3 8Q-11-7-10-15M4 8Q12-6 12-13','none',C.pink,1);
  }else{
    p(bloom,'M-23 4Q-31-7-26-19Q-7-19 0 0Q13-21 28-17Q32-3 22 8Z','#9f3f66','#7d3d58',1.1);
    p(bloom,'M-12-1Q-18-27 0-34Q19-25 12-1Z','#d46687','#9a3e64',1);
    for(const[x,y,a]of[[-8,-9,-22],[0,-18,0],[8,-10,23],[-5,0,-12],[5,0,12]]){
      const b=add(bloom,'g',{transform:`translate(${x} ${y}) rotate(${a})`});
      p(b,'M-5 3Q-8-5 0-12Q8-5 5 3Z','#e884a0','#a3486a',.8);p(b,'M-4-2Q-2-7 0-9','none','#ffd6cd',1);
    }
    p(bloom,'M0 9Q-20-9-32-8Q-31 12-11 19Z','#e687a1','#9c4b6b',1.1);
    p(bloom,'M0 9Q18-12 32-9Q32 12 13 19Z','#f3a7b5','#9c4b6b',1.1);
    p(bloom,'M-12 13Q-7 3 0-2Q9 4 14 13Q2 29-12 13Z','#df7795','#9c4b6b',1.2);
    p(bloom,'M-27-5Q-21 2-10 9M28-6Q22 3 13 10M-8 13Q0 5 9 13','none','#ffe0d0',1.7);
  }
  return bloom;
}
function flowers(g,male){
  if(male){
    // The male carries a single long stem, with a loose wrapping sheet underneath.
    const paper=part(g,'paper-wrap');
    p(paper,'M-38 26L-18 16L24 36L14 57L-7 50Z','#ead9b6','#b39269',1.3);
    p(paper,'M-33 29L-14 25L17 39L12 50','none','#fff4d7',1.5);
    const offered=part(g,'offered',{transform:'translate(-28 -18) rotate(-32)'});flower(offered,'re-offer',{scale:.83});
    p(g,'M-15 40Q0 32 11 44L-5 49Z',C.violet,C.ink,1);
    p(g,'M-5 41Q-19 27-20 38Q-19 43-5 41Q9 26 13 37Q12 43-5 41L-1 55','none','#b0a3c9',2);
    return;
  }
  // A hand-tied sheaf: exposed stems cross at the grip instead of entering a vase.
  const planted=part(g,'bouquet',{'data-re-grip':'0 12'});
  p(planted,'M-7 16L-13 48M0 15L1 53M7 14L12 46','none','#355846',4);
  p(planted,'M-7 17L-13 47M0 16L1 51M7 15L12 45','none','#a4bb83',1.3);
  p(planted,'M-8 9Q-46-13-45-48Q-12-34-8 9Z',C.leaf,'#355846',1.2);
  p(planted,'M-9 6Q-25-12-39-39','none',C.lightLeaf,1.2);
  flower(add(planted,'g',{transform:'translate(-13 -59) rotate(-17) scale(.68)'}),'re-bud',{bud:true});
  flower(part(planted,'arrange-stem',{transform:'translate(16 -68) rotate(18) scale(.72)'}),'re-arrange');
  p(planted,'M-8-7Q-31-19-38-47Q-12-42-8-7Z',C.leaf,'#355846',1.2);
  p(planted,'M-9-11L-31-39','none',C.lightLeaf,1.2);
  const received=part(planted,'received',{opacity:0});flower(add(received,'g',{transform:'translate(0 -78) scale(.85)'}),'re-received');
  const tie=part(planted,'bouquet-tie');
  p(tie,'M-13 6Q0 10 13 5L12 15Q-1 20-12 16Z',C.violet,C.ink,1);
  p(tie,'M-1 10Q-26-6-25 7Q-24 20-1 13Q21-9 25 4Q26 17 1 13L13 37L6 35L3 42L-3 15L-17 33L-18 24L-25 26Z','#afa0c9',C.ink,1.1);
  p(tie,'M-22 5Q-14 7-3 12M5 11Q15 3 21 3','none','#e8dfee',1.5);
  e(tie,0,12,4.6,4,C.violet,C.ink,.9);
}
function coat(g,male){
  const base=male?C.violet:C.gold,light=male?C.lightViolet:'#f6d998',dark=male?'#5e5b83':C.goldDark;
  const id='re-coat-'+(male?'m':'h');
  const fill=gradient(g,id,[[0,dark],[.28,base],[.56,light],[.78,base],[1,dark]]);
  // Fitted curved body panels end before the tail bend. The smaller poncho flares.
  const outline=male?'M299 87Q309 106 300 124Q276 138 254 139Q221 151 209 181L216 193Q186 202 160 182C173 145 187 119 211 106Q249 78 299 87Z':'M299 87Q309 105 300 127Q276 139 255 137C225 139 212 167 205 203L201 215Q176 216 153 199C163 158 174 131 204 109Q244 79 299 87Z';
  p(g,outline,fill,C.ink,1.7);
  const clip=add(add(g,'defs'),'clipPath',{id:id+'-clip'});p(clip,outline,'white','none');
  const clipped=add(g,'g',{'clip-path':`url(#${id}-clip)`});
  const detail=add(clipped,'g',{transform:'matrix(1 0 -.16 1 4 -8)'});
  p(detail,male?'M282 115Q246 120 224 151L225 208':'M282 110Q245 128 224 160L214 216','none',dark,male?5:8);
  p(detail,male?'M277 117Q242 129 224 151':'M278 111Q244 129 220 163L209 212','none',light,2.2);
  p(detail,male?'M193 191Q219 205 240 190':'M184 199Q211 215 235 202','none',light,2.8);
  if(male){
    p(detail,'M224 148Q213 169 211 184M239 150Q229 174 241 195M197 172L200 190','none','#5d5a82',1.5);
    p(detail,'M214 134Q231 137 247 126L253 134Q234 149 210 143Z','#ddd9e9',C.ink,1);
  }else{
    p(detail,'M207 165L233 156L231 173L203 183Z','#d8a64f',C.ink,1.2);
    p(detail,'M206 165L232 156L232 162L206 172Z',light,C.ink,1);
    p(detail,'M199 192Q205 184 206 178M236 144Q246 139 254 140','none',dark,1.4);
  }
  for(const[x,y]of male?[[273,119],[258,128],[242,140]]:[[271,120],[253,131],[235,148],[224,172],[218,194]]){
    e(detail,x,y,1.9,2,'#e8eee5',dark,.8);e(detail,x-.5,y-.6,.6,.6,'white','none');
  }
  // Open hood follows the head without covering either eye or the smile.
  const hood=part(g,'hood');
  p(hood,male?'M304 91C291 78 292 43 309 29Q328 17 344 29Q362 44 360 73Q359 94 342 108L314 123L296 119L292 105Q326 116 346 88Q354 73 347 50Q337 32 321 39Q303 47 308 71L316 82Z':'M303 92C288 78 291 42 307 28Q328 14 347 28Q365 44 363 73Q362 98 343 112L314 130L294 126L289 108Q326 120 349 88Q358 72 350 49Q339 29 320 37Q300 46 306 72L315 82Z',fill,C.ink,1.6);
  p(hood,'M301 80Q294 57 308 39Q321 25 337 31Q352 37 355 55','none',light,2.4);
  p(hood,'M301 101Q315 107 334 95M311 109L307 126M337 96L340 114','none',dark,1.6);
  e(hood,307,127,1.7,2.5,dark,'none');e(hood,340,115,1.7,2.5,dark,'none');
  const droplets=part(g,'coat-drops',{opacity:0,'pointer-events':'none'});
  for(const[x,y]of [[307,36],[298,63],[262,99],[218,136],[177,178]]){
    const drop=part(droplets,'bead',{transform:`translate(${x} ${y})`});p(drop,'M0-3Q-4 2 0 4Q4 2 0-3Z','#d8f6eea6','#7ba9ae',.45);p(drop,'M-1 1L-1 2','none','white',.6);
  }
}
export function drawReunion(g,item,male){
  if(![LYCHEE,COAT,FLOWERS].includes(item.family))return false;
  g.setAttribute('data-reunion-art',male?'companion':'primary');
  g.setAttribute('style','transform-box:view-box;transform-origin:0 0');
  if(item.family===LYCHEE)fruitSet(g,male);
  if(item.family===COAT)coat(g,male);
  if(item.family===FLOWERS)flowers(g,male);
  return true;
}
