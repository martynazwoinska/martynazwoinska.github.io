import {pathPoints} from './guadeloupe-dance.js?v=20260916-gwoka-11';
export const WHEEL='nic1648-pottery-wheels',APRON='nic1648-pottery-aprons',TEA='nic1648-bubble-tea-jetpacks';
export const add=(g,tag,attrs={})=>{const n=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const [k,v] of Object.entries(attrs))n.setAttribute(k,v);g.appendChild(n);return n;};
const ink='#374e4f';
const path=(g,d,fill,stroke=ink,width=1.8,extra={})=>add(g,'path',{d,fill,stroke,'stroke-width':width,'stroke-linecap':'round','stroke-linejoin':'round',...extra});
const ellipse=(g,cx,cy,rx,ry,fill,extra={})=>add(g,'ellipse',{cx,cy,rx,ry,fill,stroke:ink,'stroke-width':1.6,...extra});

export function clayProfile(t,male,variant=0,wobble=0){
  const v=variant%3,targetH=(male?[59,40,65]:[52,34,62])[v],targetRim=(male?[15,29,18]:[21,31,16])[v];
  const h=18+t*(targetH-18),rim=26+t*(targetRim-26),belly=27+t*((male?[35,32,30]:[27,30,29])[v]-27),x=wobble;
  return {h,rim,x,d:`M${x-rim} ${-h}C${x-rim-3} ${-h*.68} ${-belly} ${-h*.25} -23 0Q0 9 23 0C${belly} ${-h*.25} ${x+rim+3} ${-h*.68} ${x+rim} ${-h}Z`};
}
export function updateClay(group,t,male,variant=0,wobble=0){
  const p=clayProfile(t,male,variant,wobble);
  group.querySelector('[data-clay-wall]').setAttribute('d',p.d);
  group.querySelector('[data-clay-clip]').setAttribute('d',p.d);
  for(const n of group.querySelectorAll('[data-clay-rim]')){n.setAttribute('cx',p.x);n.setAttribute('cy',-p.h);n.setAttribute('rx',p.rim);}
  const hollow=group.querySelector('[data-clay-opening]');
  hollow.setAttribute('cx',p.x);hollow.setAttribute('cy',-p.h);hollow.setAttribute('rx',p.rim-4);hollow.setAttribute('opacity',Math.max(0,t-.15)/.85);
  group.querySelector('[data-clay-light]').setAttribute('d',`M${p.x-p.rim+6} ${-p.h+7}Q-22 ${-p.h*.4} -17 -4`);
  [...group.querySelectorAll('[data-clay-ring]')].forEach((n,i)=>{const y=-p.h*(.25+i*.2);n.setAttribute('d',`M-23 ${y}Q${p.x} ${y+6} 23 ${y}`);n.setAttribute('opacity',t*.55);});
}
function clay(g,male){
  const pot=add(g,'g',{'data-taipei-clay':''});
  path(pot,'',male?'#c99272':'#bc8668',ink,1.5,{'data-clay-wall':''});
  ellipse(pot,0,-18,26,6,'#e0b195',{'data-clay-rim':''});
  ellipse(pot,0,-18,22,3.5,'#795847',{'data-clay-opening':'',stroke:'none'});
  const clipId='taipei-clay-clip-'+(male?'male':'primary');
  const clip=add(add(pot,'defs'),'clipPath',{id:clipId});add(clip,'path',{'data-clay-clip':''});
  const detail=add(pot,'g',{'clip-path':`url(#${clipId})`});
  path(detail,'','none','#efd0b4',2.3,{'data-clay-light':''});
  for(let i=0;i<3;i++)path(detail,'','none','#865e4e',.85,{'data-clay-ring':''});
  updateClay(pot,0,male);return pot;
}
// Tailor the canvas along the same cubic as the worm's central body stroke.
// x is distance across the body, y is distance down the flat sewing pattern.
export function apronPoint(x,y,male=false){
  let cx,cy,dx,dy;
  if(y<0){
    // Continue around the curved throat, rather than extending the torso straight.
    const t=-y/132,u=1-t;
    cx=u*u*u*278+3*u*u*t*331+3*u*t*t*355+t*t*t*326;
    cy=u*u*u*113+3*u*u*t*121+3*u*t*t*82+t*t*t*54;
    dx=-(3*u*u*53+6*u*t*24-3*t*t*29);
    dy=-(3*u*u*8-6*u*t*39-3*t*t*28);
  }
  else{
    const t=y/132,u=1-t;
    cx=u*u*u*278+3*u*u*t*225+3*u*t*t*188+t*t*t*181;
    cy=u*u*u*113+3*u*u*t*105+3*u*t*t*151+t*t*t*203;
    dx=3*u*u*(225-278)+6*u*t*(188-225)+3*t*t*(181-188);
    dy=3*u*u*(105-113)+6*u*t*(151-105)+3*t*t*(203-151);
  }
  const length=Math.hypot(dx,dy),width=male?.91:1;
  return {x:cx+x*width*dy/length,y:cy-x*width*dx/length};
}
const apronPath=(d,male)=>pathPoints(d).map(p=>{if(p.close)return 'Z';const q=apronPoint(p.x,p.y,male);return `${p.move?'M':'L'}${q.x.toFixed(2)} ${q.y.toFixed(2)}`;}).join('');
function apron(g,male){
  const cloth=add(g,'g',{'data-taipei-apron':'',transform:male?'translate(-28 82) scale(.43)':''});
  const sew=(parent,d,fill,stroke='#6b6455',width=1.4,extra={})=>path(parent,apronPath(d,male),fill,stroke,width,extra);
  const outline=male?'M-12 0L13 0Q13 25 20 39L21 106Q0 120-21 108L-20 39Q-12 25-12 0Z':'M-12 0L12 0Q13 28 21 43L22 121Q3 135-22 124L-21 43Q-13 28-12 0Z';
  // A single soft ribbon returns into both bib corners; its far arc is darker.
  const neck=male?'M-12 7C-17-4-21-15-17-25Q0-37 17-25C21-15 17-4 12 7L8 7C12-4 15-15 12-22Q0-29-12-22C-15-15-12-4-8 7Z':'M-13 7C-19-5-22-18-18-29Q0-43 18-29C22-18 19-5 13 7L8 7C13-5 16-17 13-25Q0-34-13-25C-16-17-13-5-8 7Z';
  sew(cloth,neck,'#7e9278','#506859',1.05,{'data-apron-neck':''});
  sew(cloth,male?'M-16-24Q0-34 16-24':'M-17-28Q0-39 17-28','none','#5b7564',2);
  sew(cloth,male?'M-10 2Q-18-16-13-24M10 2Q18-16 13-24':'M-11 2Q-20-17-14-28M11 2Q20-17 14-28','none','#b1bea0',.85);
  // The doubled end and a small brass slider identify a fabric apron strap.
  sew(cloth,'M10-9L15-10L17-4L12-3Z','#c1a365','#6c6447',.8);
  sew(cloth,'M13-8L15-5','none','#7e9278',1.4);
  sew(cloth,'M-20 41Q-31 33-31 44Q-28 51-21 46M-21 45Q-34 53-30 63M-21 45L-23 64','none','#687c68',2.2);
  sew(cloth,outline,'#deca9e','#6b6455',1.6,{'data-apron-outline':''});
  const clipId='taipei-apron-clip-'+(male?'male':'primary');
  add(add(add(cloth,'defs'),'clipPath',{id:clipId}),'path',{d:apronPath(outline,male)});
  const detail=add(cloth,'g',{'clip-path':`url(#${clipId})`});
  sew(detail,male?'M-17 42L-17 104Q0 114 17 103':'M-17 47L-17 119Q2 129 17 117','none','#f5e5bd',1.4);
  sew(detail,male?'M14 49Q9 83 15 102':'M14 55Q9 89 16 117','none','#bea780',2);
  sew(detail,'M-22 39Q0 44 22 39L22 46Q0 51-22 46Z','#6d8271','#455f55',1);
  sew(detail,'M-8 9L8 9','none','#f7e9c7',1.5);
  if(male){
    sew(detail,'M-15 65L15 65L15 92Q0 103-15 93Z','#c6ad7f');
    sew(detail,'M1 67L1 97','none','#887451',1.2);
    sew(detail,'M-8 64L-10 51','none','#986d44',3);
    sew(detail,'M7 65L7 55Q15 44 16 52L12 65Z','#a8b7a4','#52695c',1);
    sew(detail,'M-12 23Q-7 20-5 26M6 106L11 104','none','#b7916d',2.3);
  }else{
    sew(detail,'M-16 70Q0 75 16 70L16 101Q0 113-16 102Z','#c9ae7d');
    sew(detail,'M-12 76Q0 80 12 76','none','#f3dfb3',1.5);
    sew(detail,'M-7 70L-10 55','none','#986d44',3);
    sew(detail,'M5 70L6 58Q16 47 17 55Q18 61 12 66L12 71Z','#b2c0ac','#52695c',1);
    sew(detail,'M-9 118Q-3 112 3 118M7 22Q14 24 10 29','none','#b7916d',2.4);
    sew(cloth,'M20 46L26 45L25 70L20 69Z','#e9e3cb','#828570',1);
    sew(cloth,'M23 49L22 66','none','#b4bba3',1.2);
  }
  for(const x of [-9,9]){const q=apronPoint(x,5,male);add(cloth,'circle',{cx:q.x,cy:q.y,r:1.7,fill:'#ad8649',stroke:'#71613e','stroke-width':.5});}
}
export function updateTea(g,male,fill=1){
  const y=-36+(1-fill)*105;
  const liquid=g.querySelector('[data-tea-liquid]');liquid.setAttribute('y',y);liquid.setAttribute('height',140-y);
  g.querySelector('[data-tea-surface]').setAttribute('cy',y);
}
export function teaStrawPoint(t,male){
  const top=male?-134:-158;
  // The pearl follows the submerged tube, then its sloping section above the lid.
  return t<.58?{x:12,y:65-(t/.58)*137}:{x:12+(t-.58)/.42*46,y:-72+(t-.58)/.42*(top+72)};
}
function tea(g,male){
  const clipId='taipei-tea-clip-'+(male?'male':'primary');
  const outline=male?'M-49-67L-40 77Q0 95 40 77L49-67Z':'M-66-73L-54 92Q0 115 54 92L66-73Z';
  ellipse(g,0,male?92:111,male?48:64,9,'#b2936e',{'data-tea-coaster':'',stroke:'#6f6353'});
  path(g,outline,'#e2f2e9','#375958',3.5);
  const clip=add(add(g,'defs'),'clipPath',{id:clipId});add(clip,'path',{d:outline});
  const inside=add(g,'g',{'clip-path':`url(#${clipId})`});
  add(inside,'rect',{x:-70,y:-36,width:140,height:176,fill:male?'#d6aa72':'#d9b088','data-tea-liquid':''});
  ellipse(inside,0,-36,68,7,'#f0cca2',{'data-tea-surface':'',stroke:'none'});
  path(inside,'M12 67L12-73','none','#82bbb2',11);
  path(inside,'M10 66L10-72','none','#cae6db',3);
  const pearls=male?[[-25,57],[-5,68],[18,56],[28,73],[-22,77],[4,80]]:[[-36,68],[-15,81],[9,68],[34,77],[-30,90],[-4,96],[21,92],[42,92]];
  for(const [i,[x,y]] of pearls.entries()){
    add(inside,'circle',{cx:x,cy:y,r:male?7:8.5,fill:'#483d45',stroke:'#795e53','stroke-width':1.5,'data-tea-pearl':i});
    ellipse(inside,x-2,y-2,2.1,1.4,'#b8947c',{stroke:'none'});
  }
  path(g,outline,'none','#375958',3.5);
  path(g,male?'M-54-72Q0-84 54-72L53-62Q0-52-53-62Z':'M-71-78Q0-94 71-78L70-65Q0-51-70-65Z','#96546d','#375958',3);
  ellipse(g,0,male?-72:-78,male?54:71,male?8:11,'#d291a2',{'stroke-width':2.5});
  const end=teaStrawPoint(1,male);
  path(g,`M12-72L${end.x} ${end.y}`,'none','#375958',15);
  path(g,`M12-72L${end.x} ${end.y}`,'none','#8fcbbd',10);
  path(g,`M9-75L${end.x-3} ${end.y-1}`,'none','#d7eee0',2.5);
  ellipse(g,end.x,end.y,5.5,2.6,'#47786e',{'stroke-width':1.8});
  path(g,male?'M-39-49L-31 42':'M-55-48L-45 54','none','#f9fff0',4);
  path(g,male?'M-34 80Q0 91 35 79':'M-47 96Q0 113 47 95','none','#b8d7c9',2);
  for(const [x,y] of (male?[[-29,-12],[32,16]]:[[-40,-20],[39,4],[43,-27]]))ellipse(g,x,y,2.5,4,'#edf5e6',{stroke:'none',opacity:.85});
}
export function drawTaipei(g,family,male){
  if(![WHEEL,APRON,TEA].includes(family))return false;
  g.setAttribute('style','transform-box:view-box;transform-origin:0 0');
  if(family===APRON){apron(g,male);return true;}
  if(family===TEA){tea(g,male);return true;}
  ellipse(g,0,57,male?49:61,8,'#263d36',{opacity:.22,stroke:'none'});
  if(male){
    path(g,'M-36 19L-42 53L-32 55L-24 23M29 22L37 55L47 51L39 16Z','#496962');
    path(g,'M-40 9Q0-3 41 9L38 36Q0 49-37 34Z','#54887a');
    path(g,'M-25 36Q0 45 24 36','none','#a0c4a4',2);
  }else{
    path(g,'M-49 13L-44 46Q0 62 44 46L50 13Z','#32675e');
    path(g,'M-42 45L-43 57L-29 59L-28 49M28 49L29 59L43 57L42 45Z','#344f4e');
    path(g,'M-35 28Q0 39 35 28','none','#87b89b',2);
    add(g,'circle',{cx:29,cy:37,r:5,fill:'#bd9557',stroke:ink,'stroke-width':1.5});
  }
  ellipse(g,0,10,male?47:57,17,'#9cafad');
  ellipse(g,0,8,male?42:51,13,'#516d6a');
  ellipse(g,0,5,male?35:41,10,'#bac9c5',{'data-wheel-head':''});
  const spin=add(g,'g',{'data-wheel-spin':'',transform:'translate(0 5) scale(1 .24)'});
  for(let i=0;i<4;i++){const a=i*Math.PI/2;path(spin,`M${Math.cos(a)*27} ${Math.sin(a)*27}L${Math.cos(a)*36} ${Math.sin(a)*36}`,'none','#5f827b',2);}
  clay(g,male);
  path(g,male?'M-46 11Q0 33 46 11L45 18Q0 41-45 18Z':'M-56 12Q0 36 56 12L54 21Q0 46-54 21Z','#8ba29c');
  path(g,male?'M-43 13Q0 33 43 13':'M-52 14Q0 36 52 14','none','#d1d9ca',2);
  ellipse(g,male?-43:49,2,10,5,'#789086');
  path(g,male?'M-52-4Q-42-10-34-3L-35 4Q-43 8-51 2Z':'M40-5Q50-10 58-3L57 4Q49 9 41 3Z','#dab572');
  return true;
}
