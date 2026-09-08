// Original SVG constructions. References and evidence: the JU4356 dossier.
export const SCOOTER='ju4356-shared-scooter',FRUIT='ju4356-starfruit-preparation',COFFEE='ju4356-phin-coffee';
export const hcmcLayouts={
  [SCOOTER]:{primary:[316,265,1,0]},
  [FRUIT]:{primary:[411,107,.72,-5],companion:[30,219,.66,6]},
  [COFFEE]:{primary:[240,38,.68,-4],companion:[51,92,.54,5]}
};
const NS='http://www.w3.org/2000/svg';
export const C={ink:'#344751',silver:'#cddade',shine:'#f4fbf8',steel:'#7c969f',berry:'#a34b68',berryLight:'#ce7e91',
  cream:'#fff0cf',wood:'#c69463',woodSide:'#8e6040',gold:'#edc658',fruit:'#efcf64',fruitLight:'#fff0a5',leaf:'#76894d',coffee:'#5b3528',milk:'#f8e4b6'};
export function add(g,t,a={}){const n=document.createElementNS(NS,t);for(const[k,v]of Object.entries(a))n.setAttribute(k,v);g.appendChild(n);return n;}
export const path=(g,d,fill='none',stroke=C.ink,w=1.6)=>add(g,'path',{d,fill,stroke,'stroke-width':w,'stroke-linecap':'round','stroke-linejoin':'round'});
const ellipse=(g,x,y,rx,ry,fill,stroke=C.ink,w=1.5)=>add(g,'ellipse',{cx:x,cy:y,rx,ry,fill,stroke,'stroke-width':w});
export const part=(g,n,a={})=>add(g,'g',{['data-hc-'+n]:'',...a});
function paint(g,id,stops){const grad=add(add(g,'defs'),'linearGradient',{id,x1:'0%',y1:'0%',x2:'100%',y2:'12%'});for(const[offset,color]of stops)add(grad,'stop',{offset,'stop-color':color});return `url(#${id})`;}
export function starSlice(g,x=0,y=0,scale=1){
  const s=add(g,'g',{transform:`translate(${x} ${y}) scale(${scale})`});
  const outline='M0-20Q2-21 4-8L19-7Q23-7 12 2L14 18Q14 22 2 11L-13 19Q-17 22-12 4L-23-7Q-25-10-8-8Z';
  const side=add(s,'g',{transform:'translate(0 3.5)'});path(side,outline,'#c79f40','#958044',1.1);
  path(s,outline,C.fruitLight,'#c3a645',1.3);
  path(s,'M0-16L2-5L15-6L8 2L11 13L1 7L-10 14L-7 3L-17-5L-6-5Z','#f4db7e','none');
  for(const a of [0,72,144,216,288]){
    const l=add(s,'g',{transform:`rotate(${a})`});path(l,'M0 0L0-12','none','#fff5bd',1.1);
  }
  ellipse(s,0,1,3.8,3.1,'#f8e6a2','#d6bb64',.7);
  path(s,'M-3-2Q-7-5-7-1Q-5 2-3-2ZM4 1Q8-2 8 2Q6 5 4 1Z','#9c6e42','none');
  return s;
}
function wholeFruit(g){
  // Lengthwise ribs wrap from the tapered stem to the visible cut end.
  path(g,'M-54 0C-47-15-28-29-10-25L23-17Q35-4 27 14C11 26-13 28-33 14Z',C.fruit,'#a78d44',1.6);
  path(g,'M-52-1Q-25-27 23-17L25-6Q-20-14-52-1Z','#fff0a0','none');
  path(g,'M-52 1Q-19-6 23-5L30 5Q-12 2-52 1Z','#d9b144','none');
  path(g,'M-48 4Q-21 20 24 16L15 23Q-20 25-48 4Z','#d2a742','none');
  path(g,'M-49-2Q-25-26 22-18M-48 1Q-14-2 23-5M-46 5Q-18 21 22 17','none','#91a157',1.3);
  path(g,'M-42-8Q-15-20 11-17M-40 7Q-18 15 8 16','none','#fff4b5',1.5);
  path(g,'M-52 0L-60-5','none',C.leaf,2.8);
  const end=starSlice(g,25,1,.77);end.setAttribute('transform','translate(25 1) rotate(3) scale(.64 .95)');
}
export function fruitBox(g,small=false){
  const b=add(g,'g');
  path(b,'M-45-4L18-15L46-1L-19 13Z','#775844',C.ink,1.6);
  path(b,'M-45-4L-40 34L-17 46L-19 13Z','#b28255',C.ink,1.6);
  path(b,'M-19 13L46-1L41 34L-17 46Z',C.wood,C.ink,1.7);
  path(b,'M-16 21L41 8M-16 35L39 23','none','#eac590',2);
  path(b,'M-38 4L-35 28M-22 15L-21 38M38 6L34 32','none','#856241',3);
  path(b,'M-1 23L21 18L21 24L-1 29Z','#704f38','none');
  for(const[x,y,a]of small?[[-19,-4,-8],[3,-8,7],[24,-9,-14]]:[[-23,-6,-18],[-1,-11,14],[22,-12,-10]]){
    const f=starSlice(b,x,y,.63);f.setAttribute('transform',`translate(${x} ${y}) rotate(${a}) scale(.62 .43)`);
  }
  path(b,'M-45-4L-19 13L46-1','none','#f1cd93',2.4);
  for(const[x,y]of[[-37,8],[-34,29],[-12,22],[-10,38],[36,10],[33,29]])ellipse(b,x,y,.8,.8,C.ink,'none');
  return b;
}
function wheel(g,x){
  const w=part(g,'wheel',{transform:`translate(${x} 43)`});
  ellipse(w,0,0,30,30,'#36434a',C.ink,2.5);ellipse(w,0,0,24,24,C.steel,'#bccdd1',2);
  const spokes=part(w,'spokes');
  for(let a=0;a<180;a+=30){const r=a*Math.PI/180;path(spokes,`M${23*Math.cos(r)} ${23*Math.sin(r)}L${-23*Math.cos(r)} ${-23*Math.sin(r)}`,'none','#dce7e6',1.2);}
  ellipse(w,0,0,6,6,C.silver,C.ink,1.3);ellipse(w,0,0,2,2,C.steel,'none');
  path(w,'M-21-13A25 25 0 0 1 18-17','none','#667b82',1.2);
}
function scooter(g){
  const metal=paint(g,'hc-scooter-metal',[[0,C.steel],[.25,C.shine],[.48,C.silver],[.72,'#a9bec5'],[1,C.steel]]);
  const body=paint(g,'hc-scooter-enamel',[[0,'#8f3e5b'],[.32,C.berryLight],[.7,C.berry],[1,'#73384f']]);
  const s=part(g,'vehicle');
  ellipse(s,4,76,125,6,'#3d514e22','none');
  wheel(s,-83);wheel(s,97);
  // Rear swing arm, suspension, and the far-side step, behind the bodywork.
  path(s,'M-85 43L-36 8L-25 33Z',C.steel,C.ink,2);
  path(s,'M-85 30L-67-16','none',C.silver,5);
  for(let i=0;i<6;i++)path(s,`M${-77+i*1.7} ${13-i*4}l11 4`,'none',C.ink,1.4);
  path(s,'M-120 36Q-119-14-74-17Q-46-13-39 22L-21 27L36 27Q51 16 57-25L63-76L79-78Q65-1 71 28L92 32L85 43H-13Q-34 43-49 33L-57 16Q-93-2-110 39Z',body,C.ink,2.3);
  path(s,'M-112 11Q-96-12-69-7L-56 0','none','#e4a3ae',2.6);
  path(s,'M-113 24Q-91 9-65 18L-59 28Q-81 18-103 30Z','#873b57','none');
  path(s,'M-106 29L-68 33M-103 22L-73 26','none','#d07b91',1.4);
  // Open step-through and front leg shield. Warm porcelain enamel contrasts with foliage.
  path(s,'M62-77Q46-52 46-28Q42 13 20 23L-18 26L-13 34H55Q65 27 62 8Q59-29 78-75Z',C.cream,C.ink,2);
  path(s,'M62-62Q53-29 55 3Q60 24 39 29H-3','none','#d6bd8c',2);
  path(s,'M-19 37H68L62 43H-16Z',metal,C.ink,1.5);
  for(let x=-8;x<52;x+=10)path(s,`M${x} 37l-2 5`,'none','#687d85',1.2);
  path(s,'M72-65L99 43','none',C.ink,8);path(s,'M74-62L100 39','none',metal,5);
  path(s,'M62 32Q70 7 101 8Q124 10 130 30L122 33Q109 14 90 21Q76 23 70 37Z',body,C.ink,1.8);
  path(s,'M71 24Q97 5 119 25','none','#e9a9b3',2);
  // Near-side engine casing and rear-facing exhaust, not decorative bottles.
  path(s,'M-48 20Q-24 12-16 25L-18 42L-40 45Q-56 41-48 20Z',metal,C.ink,1.8);
  ellipse(s,-35,32,10,9,'#aebfc3',C.ink,1.1);
  path(s,'M-25 39L-52 51H-112Q-120 50-120 44Q-119 39-112 39H-61L-45 31',metal,C.ink,2);
  ellipse(s,-116,45,3,5,'#526b74',C.ink,1);
  path(s,'M-107 44H-59','none',C.shine,1.7);
  const stand=part(s,'stand');path(stand,'M-12 38L-23 71H-33M-12 38L3 70H13','none',C.ink,3);
  // Long stitched tandem seat, with a separate support and hand rail.
  path(s,'M-113-31L-93-11H-22L-3-29Z','#664254',C.ink,1.6);
  path(s,'M-123-41Q-77-50-4-44Q8-43 8-36L3-28H-115Q-128-31-123-41Z','#4e4c5c',C.ink,2);
  path(s,'M-116-40Q-64-46-2-39','none','#a69aaf',2);
  path(s,'M-103-32H-14','none','#c7b7bf',.9).setAttribute('stroke-dasharray','3 3');
  path(s,'M-126-32L-135-42H-110','none',metal,4);
  path(s,'M-124-14H-135L-137-23H-125Z','#df785f',C.ink,1.5);
  // Handlebar, brake lever, round headlamp and mirror on a single steering stem.
  path(s,'M70-68L76-98L96-98','none',metal,5);
  path(s,'M76-98L56-100','none',C.ink,6);
  path(s,'M89-98L106-95','none',C.ink,6);
  path(s,'M90-102L104-103L108-100','none',C.silver,2);
  path(s,'M69-99L62-125L53-131','none',metal,2.8);
  ellipse(s,50,-132,10,6,metal,C.ink,1.6);
  path(s,'M73-91Q87-96 100-85L98-70L80-68L70-77Z',body,C.ink,1.8);
  ellipse(s,99,-80,6,10,C.cream,C.ink,2);
  path(s,'M101-86L103-80L101-75','none','#fffefa',1.8);
  ellipse(s,85,-63,4,3,C.gold,C.ink,1);
}
function prep(g,male){
  if(male){
    fruitBox(g,true);
    const tray=add(g,'g',{transform:'translate(-62 17)'});
    ellipse(tray,0,3,26,12,'#b5c5c7',C.ink,1.3);
    ellipse(tray,0,0,26,11,C.cream,C.ink,1.3);
    for(let i=0;i<3;i++)starSlice(part(tray,'pack-source',{'data-index':i}),-13+i*12,-1,.39);
    const fork=part(g,'fork',{transform:'translate(27 -41) rotate(19)'});
    path(fork,'M0 18V-17M-7-27V-17Q0-10 7-17V-27M0-28V-17','none',C.ink,3.5);
    path(fork,'M0 18V-17M-7-27V-17Q0-10 7-17V-27M0-28V-17','none',C.silver,2);
    starSlice(part(fork,'snack'),0,-26,.61);
    return;
  }
  const top='M-67 3L13-18L70 13L-13 38Z';
  path(g,'M-67 3V13L-13 49L70 23V13L-13 38Z',C.woodSide,C.ink,1.8);
  path(g,top,C.wood,C.ink,1.9);
  path(g,'M-57 4L12-13L58 13','none','#edc48a',1.7);
  path(g,'M-42 17L-7 9M-27 31L27 14M-5 34L41 22','none','#ac7b4e',1.1);
  const fruit=part(g,'whole-fruit',{transform:'translate(-10 -4) rotate(12)'});wholeFruit(fruit);
  for(let i=0;i<3;i++){
    const slice=part(g,'cut-slice',{'data-index':i,opacity:0,transform:`translate(${26+i*13} ${14+i*3}) scale(.60 .42)`});starSlice(slice);
  }
  const knife=part(g,'knife',{transform:'translate(23 -24) rotate(20)'});
  path(knife,'M-2-11L2 24Q21 28 24 10L20-14Z',C.silver,C.ink,1.5);
  path(knife,'M5-9L8 21Q18 23 21 11','none',C.shine,2);
  path(knife,'M-2-11L-4-43Q4-48 12-45L20-14Z',C.berry,C.ink,1.8);
  path(knife,'M1-40L7-21','none',C.berryLight,2);ellipse(knife,4,-36,1.7,1.7,C.silver,'none');ellipse(knife,9,-22,1.7,1.7,C.silver,'none');
}
function coffee(g,male){
  const metal=paint(g,`hc-phin-metal-${male?'m':'f'}`,[[0,C.steel],[.20,C.shine],[.38,'#a8bcc2'],[.66,'#e6efed'],[1,'#81979e']]);
  const glass=part(g,'glass');
  ellipse(glass,0,45,34,7,'#293c4125','none');
  const outline=male?'M-27-35Q0-43 27-35L21 39Q0 47-21 39Z':'M-29-27Q0-36 29-27L22 40Q0 49-22 40Z';
  path(glass,outline,'#dcf2e81c','#62828d',1.8);
  const clipId=`hc-glass-${male?'m':'f'}`,clip=add(add(glass,'defs'),'clipPath',{id:clipId});path(clip,outline,'white','none');
  const inside=add(glass,'g',{'clip-path':`url(#${clipId})`});
  path(inside,'M-26 22Q0 28 26 22V44H-26Z',C.milk,'none');
  const coffeeFill=path(inside,male?'M-28-18Q0-25 28-18V22Q0 28-28 22Z':'M-28 14Q0 8 28 14V22Q0 28-28 22Z',C.coffee,'none');
  if(!male)coffeeFill.setAttribute('data-hc-brew-coffee','');
  const blend=part(inside,'blend',{opacity:0});path(blend,'M-29-23H29V43H-29Z','#ab7753','none');
  const swirl=part(inside,'swirl',{opacity:male?.38:0});
  path(swirl,'M-29 20C-10 32 13 7 30 17M-28 5C-8 21 11-3 28 2','none','#e4bd86',4);
  if(male){
    const ice=part(inside,'ice');
    for(const[x,y,a]of[[-13,-24,12],[6,-28,-10],[13,-8,17]]){
      const cube=add(ice,'g',{transform:`translate(${x} ${y}) rotate(${a})`});
      path(cube,'M-8-7L6-9L10 4L-4 8L-10 2Z','#d8e9ddbb','#a0bebd',.9);path(cube,'M-6-4L3-5M-5-4L-4 4','none','#fafff1',1.4);
    }
  }
  path(glass,'M-22-18L-17 33M20-12L16 33M-15 39Q0 43 15 39','none','#f5fff0',2.2);
  ellipse(glass,0,male?-35:-27,male?27:29,5,'#d4e7dc22','#63808a',1.4);
  if(male){
    const spoon=part(g,'spoon',{transform:'translate(8 -2) rotate(13)'});
    path(spoon,'M0 3L3-74','none',C.ink,3.7);path(spoon,'M0 3L3-74','none',metal,2.5);ellipse(spoon,0,7,4,8,metal,C.ink,1);
  }else{
    // A perforated saucer supports the chamber. The lid is separate from its rim.
    const phin=part(g,'phin');
    path(phin,'M-36-42V-37Q0-25 36-37V-42Z',metal,C.ink,1.5);
    ellipse(phin,0,-42,36,8,metal,C.ink,1.7);
    path(phin,'M-26-84L-24-46Q0-36 24-46L26-84Z',metal,C.ink,1.8);
    path(phin,'M-20-78L-18-50M16-78L15-48','none',C.shine,1.6);
    ellipse(phin,0,-84,26,6,'#899ea4',C.ink,1.6);
    const lid=part(phin,'lid');ellipse(lid,0,-89,29,7,metal,C.ink,1.6);ellipse(lid,0,-95,5,3.4,C.steel,C.ink,1.1);
    path(phin,'M25-76Q40-80 37-64L25-59','none',C.ink,4);path(phin,'M25-76Q40-80 37-64L25-59','none',C.silver,2.4);
    for(const x of [-29,-21,21,29])ellipse(phin,x,-39,1,.65,'#566d77','none');
    const drops=part(g,'drops',{opacity:0});
    for(let i=0;i<3;i++)path(drops,'M0-3Q-4 1 0 3Q4 1 0-3Z',C.coffee,'none').setAttribute('data-drop',i);
  }
}
export function drawHcmc(g,item,male){
  if(![SCOOTER,FRUIT,COFFEE].includes(item.family))return false;
  g.setAttribute('data-hcmc-art',male?'companion':'primary');
  g.setAttribute('style','transform-box:view-box;transform-origin:0 0');
  if(item.family===SCOOTER)scooter(g);
  else if(item.family===FRUIT)prep(g,male);
  else coffee(g,male);
  return true;
}
