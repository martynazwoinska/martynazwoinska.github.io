// Original SVG construction, informed by the references in the Dois Rios dossier.
const NS='http://www.w3.org/2000/svg';
export const FRUIT='eg5612-sticky-jackfruit', MUSIC='eg5612-brazilian-music', CLOTH='eg5612-chita-neckerchiefs';
export const doisRiosLayouts={
  [FRUIT]:{primary:[384,157,.70,-10],companion:[27,180,.53,9]},
  [MUSIC]:{primary:[280,220,.69,-24],companion:[151,187,.57,-16]},
  [CLOTH]:{primary:[317,101,1,0],companion:[106,126,.49,-6]}
};
const ink='#30434c',ivory='#fff4d9',silver='#cbdade',berry='#9e4262';
const el=(tag,a={})=>{const n=document.createElementNS(NS,tag);for(const[k,v]of Object.entries(a))n.setAttribute(k,v);return n;};
const add=(g,tag,a={})=>{const n=el(tag,a);g.appendChild(n);return n;};
const p=(g,d,fill='none',stroke=ink,w=2)=>add(g,'path',{d,fill,stroke,'stroke-width':w,'stroke-linejoin':'round','stroke-linecap':'round'});
const e=(g,cx,cy,rx,ry,fill,stroke=ink,w=2)=>add(g,'ellipse',{cx,cy,rx,ry,fill,stroke,'stroke-width':w});
const part=(g,name,a={})=>add(g,'g',{['data-dr-'+name]:'',...a});
function bulb(g,x,y,angle=0,s=1){
  const b=add(g,'g',{transform:`translate(${x} ${y}) rotate(${angle}) scale(${s})`});
  p(b,'M-8 13C-13 5-14-1-10-10C-9-17-2-25 5-25C14-25 18-15 14-4C13 3 8 6 10 13Q0 23-8 13Z','#efbd51','#a37435',1.4);
  p(b,'M-5 12C-9 3-9-3-5-12Q2-22 7-19C13-14 8-6 6 0L4 13Q0 18-5 12Z','#ffda74','none');
  p(b,'M-4-5Q0-17 6-18M-3 13Q2 4 3-3','none','#ffeaa2',1.7);
  return b;
}
function jackfruit(g,male){
  // A lengthwise half and a smaller crosswise wedge have different cavities.
  const fruit=part(g,'fruit');
  if(!male){
    p(fruit,'M-73 5C-87 39-54 67 10 62C60 59 81 27 71 5Z','#748443','#45583a',2.5);
    p(fruit,'M-73 5C-65-21-31-35 15-29C52-26 77-12 71 5C67 27 26 43-17 37C-50 33-72 22-73 5Z','#e8d692','#506241',2.5);
    p(fruit,'M-61 4C-47-17-15-25 17-21C52-17 65-8 60 6C47 26 9 35-20 28C-46 22-58 13-61 4Z','#f8e6b8','#c5a65c',1.3);
    p(fruit,'M-58 10Q-5-9 60 1L46 12Q-3-2-46 20Z','#cdbb81','none');
    p(fruit,'M-52 9Q-9-8 53 3','none','#fff7d8',4);
    p(fruit,'M-31 14L-27 25M-8 6L-1 28M13 4L24 22M32 5L43 15','none','#e0c688',1.5);
    for(const[x,y,a,s]of [[-43,1,-55,.72],[-19,-8,-27,.75],[10,-10,15,.67],[36,-2,42,.74],[-27,19,-57,.6],[27,17,50,.65]])bulb(fruit,x,y,a,s);
    p(fruit,'M-1-27Q-4-36 3-41L10-39L7-27Z','#68743e','#45583a',1.4);
    for(const[x,y]of [[-61,31],[-45,44],[-24,51],[0,54],[24,49],[46,40],[61,25],[-43,32],[-16,39],[13,41],[38,31]])p(fruit,`M${x-3} ${y+2}l3-5 3 4`,'none','#b8bd68',1.5);
    p(fruit,'M-55 39Q-4 69 52 36','none','#4d633e',1.4);
  }else{
    p(fruit,'M-53 3L53-11Q53 43 0 56Q-43 50-53 3Z','#738541','#465b3e',2.5);
    p(fruit,'M-53 3Q-6-29 53-11Q47 26-1 42Q-38 36-53 3Z','#f3dfab','#52613d',2);
    p(fruit,'M-41 6Q-3-16 41-5Q33 20-1 31Q-26 27-41 6Z','#fff0c7','#d0b876',1.2);
    p(fruit,'M-32 9L25-3','none','#cbb989',5);
    for(const[x,y,a]of [[-26,9,-45],[-5,2,-4],[22,1,31],[1,23,65]])bulb(fruit,x,y,a,.67);
    for(const[x,y]of [[-34,36],[-19,44],[0,48],[19,40],[34,28]])p(fruit,`M${x-3} ${y+2}l3-5 3 3`,'none','#bcc478',1.5);
  }
  const latex=part(g,'latex');p(latex,'M0 0L0 0','none','#fff4d1',1.7);latex.setAttribute('opacity','0');
  const fork=part(g,'fork');
  // Four tines emerge from a narrow shoulder, with a metal shaft and inset grip.
  p(fork,'M0-6L5-68','none',ink,7);p(fork,'M0-6L5-68','none',silver,4);
  p(fork,'M1-55L3-86Q5-95 10-90L8-54Z',male?'#744f8f':berry,ink,1.6);
  p(fork,'M5-59L7-84','none',male?'#c0a2d5':'#db96a7',1.5);
  p(fork,'M-9 8L-8-5Q0-10 10-4L12 8M-3-6L-2 8M3-6L5 8','none',ink,3.4);
  p(fork,'M-9 8L-8-5Q0-10 10-4L12 8M-3-6L-2 8M3-6L5 8','none',silver,1.8);
  const morsel=part(fork,'morsel');bulb(morsel,1,12,-12,.7);
}
function cavaquinho(g){
  const instrument=part(g,'instrument');
  const outline='M-13-52C-39-70-58-40-37-20C-25-5-58 2-55 31C-52 64 48 67 54 31C58 4 25-4 35-21C56-47 33-68 13-52Z';
  const side=add(instrument,'g',{transform:'translate(4 7)'});p(side,outline,'#75482f',ink,2.8);
  p(instrument,outline,'#d9a560',ink,2.8);
  const inset=add(instrument,'g',{transform:'scale(.935 .94)'});p(inset,outline,'#edc17b','#fbe3aa',2);
  p(instrument,'M-41 22Q-37 42-12 48M-30-45Q-38-30-25-22','none','#ffe1a1',2);
  p(instrument,'M24 44Q44 35 39 19M25-18Q34-30 29-40','none','#b7854d',1.2);
  e(instrument,0,-15,17,18,'#906a48','#694a38',1.5);e(instrument,0,-15,14,15,ivory,'#d4ac66',1.5);e(instrument,0,-15,11.5,12.5,'#25373a','#6d5140',1.3);
  p(instrument,'M-10-134L-12-32H12L10-134Z','#66503d',ink,2);
  for(let i=0;i<10;i++)p(instrument,`M-10 ${-127+i*9.8}H10`,'none','#c5bda5',.9);
  for(const y of [-112,-91,-72])e(instrument,0,y,1.4,1.4,ivory,'none');
  p(instrument,'M-9-132L-16-166Q0-174 16-166L9-132Z','#956440',ink,2);
  p(instrument,'M-8-160Q0-165 8-160L6-142H-6Z','#c59861','none');
  for(const[x,y]of [[-15,-160],[15,-160],[-12,-144],[12,-144]]){
    p(instrument,`M${x} ${y}h${x<0?-6:6}`,'none',silver,2);e(instrument,x+(x<0?-7:7),y,3.8,3.2,silver,ink,1);
  }
  p(instrument,'M-20 27H20L22 36H-22Z','#654833',ink,1.4);p(instrument,'M-11 27H11','none',ivory,2.5);
  p(instrument,'M-10-132H10','none',ivory,2);
  const strings=part(instrument,'strings');
  for(const x of [-6,-2,2,6])p(strings,`M${x} 31V-152`,'none','#f7eed6',.8);
  // Strap attaches at the heel and lower bout, behind the player's forearms.
  p(instrument,'M-11-49Q-69-71-63-6Q-56 25-46 39','none',berry,6);
  p(instrument,'M-11-49Q-66-68-60-7','none','#e8a5b0',1.5);
}
function pandeiro(g){
  const drum=part(g,'instrument');
  e(drum,0,9,54,42,'#945933',ink,2.8);
  p(drum,'M-54 0V13C-51 60 52 60 54 13V0Z','#b37644',ink,2.2);
  // Jingles sit inside openings in the shell, not on top of the membrane.
  for(const[x,y,w]of [[-39,22,13],[-15,38,15],[16,37,15],[40,20,12]]){
    p(drum,`M${x-w/2} ${y-6}q${w/2}-3 ${w} 0v11q${-w/2} 3 ${-w} 0Z`,'#493e38',ink,1.2);
    e(drum,x,y-1,w/2+1,2.7,silver,'#78929a',.8);e(drum,x,y+3,w/2+1,2.7,'#99afb7','#dce8e3',.8);
  }
  e(drum,0,-5,55,34,silver,ink,2.4);e(drum,0,-6,49,28,'#ebd9b4','#71665c',1.5);
  e(drum,-3,-8,44,24,'#f8e9c9','none');
  p(drum,'M-40-12Q-23-31 10-27','none','#fff7e2',2);
  for(const[x,y]of [[-51,-10],[-42,15],[0,28],[42,15],[51,-10]]){
    p(drum,`M${x-3} ${y-2}l1 11 6-1-1-11Z`,silver,ink,1.1);
    p(drum,`M${x-1} ${y+7}v8`,'none','#82989f',2.2);
  }
  e(drum,9,6,18,13,'#e1cea92b','none');
}
function flower(g,x,y,s,color,rotation=0){
  const f=add(g,'g',{transform:`translate(${x} ${y}) rotate(${rotation}) scale(${s})`});
  p(f,'M-9 8Q-9 2-1 3Q-2 10-9 8ZM4 9Q6 1 12 3Q12 11 4 9Z','#65816a','none');
  for(const a of [0,72,144,216,288]){const petal=p(f,'M-2-1C-8-3-8-10-3-11C3-12 4-5 1-1Z',color,'none');petal.setAttribute('transform',`rotate(${a})`);}
  e(f,0,0,3,3,'#e9bf62','none');
}
function neckerchief(g,male){
  const id=`dr-chita-${male?'male':'large'}`;
  const outline=male?'M-22-13Q-1-4 26-17L30-8Q19 14-4 21L-28 0Z':'M-23-14Q7-2 33-27L40-17Q31 7 3 17L-28 2Z';
  const defs=add(g,'defs'),clip=add(defs,'clipPath',{id});p(clip,outline,'white','none');
  p(g,outline,male?'#ab4965':ivory,ink,1.7);
  const print=add(g,'g',{'clip-path':`url(#${id})`});
  for(const[x,y,s,a]of male?[[-15,-4,.54,20],[3,3,.66,-25],[20,-9,.48,12]]:[[-16,-1,.62,-16],[2,5,.60,27],[23,-9,.65,-8]])flower(print,x,y,s,male?'#ffe2b0':'#b34d69',a);
  p(g,male?'M-25-7Q-1 11 24-13':'M-25-8Q1 9 33-21','none',male?'#e69baf':'#d2bd91',1.7);
  // Hanging ends are separate folded panels, shaped around each body's tangent.
  if(male){
    p(g,'M-24-2Q-36 4-40 24L-27 20L-18 25L-14 1Z','#b9516d',ink,1.5);
    p(g,'M-17 3L-8 27L2 22L-5 0Z','#dc8999',ink,1.5);
    flower(g,-29,13,.45,'#fff0c6',-25);p(g,'M-24 2L-28 18','none','#e9a8b3',1.4);
    p(g,'M-27-6Q-17-11-12 0L-18 8Q-27 7-29 0Z','#ca708b',ink,1.6);
  }else{
    p(g,'M-25-1Q-39 11-43 42L-27 34L-15 40L-10 3Z',ivory,ink,1.7);
    p(g,'M-18 2Q-17 28-2 40L10 27Q-2 13-7-2Z','#e8d4af',ink,1.6);
    flower(g,-28,22,.75,'#b34d69',-20);flower(g,-1,25,.48,'#b34d69',30);
    p(g,'M-25 7Q-31 16-33 30M-9 7Q-10 19 0 29','none','#c5b28f',1.3);
    p(g,'M-29-7Q-18-16-10-5L-12 6Q-24 12-31 1Z',ivory,ink,1.7);
    p(g,'M-24-5Q-20-7-15-2M-25 2Q-20 0-15 2','none','#c8b890',1.2);
  }
}
export function drawDoisRios(g,item,male){
  if(![FRUIT,MUSIC,CLOTH].includes(item.family))return false;
  g.setAttribute('data-dois-rios-art',male?'companion':'primary');
  if(item.family===FRUIT)jackfruit(g,male);
  if(item.family===MUSIC)(male?pandeiro:cavaquinho)(g);
  if(item.family===CLOTH)neckerchief(g,male);
  return true;
}
