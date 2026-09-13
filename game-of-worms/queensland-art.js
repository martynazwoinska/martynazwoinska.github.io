// Original unbranded drawings. Construction references are in the QG2904 dossier.
const NS = 'http://www.w3.org/2000/svg';
export const LIFT = 'qg2904-canopy-lift';
export const CAMERA = 'qg2904-forest-photography';
export const HARNESS = 'qg2904-safety-harness';
export const canopyLayouts = {
  [LIFT]: {primary: [312, 310, .80, -9]},
  [CAMERA]: {primary: [354, 119, .70, -9], companion: [128, 140, .54, 8]},
  [HARNESS]: {primary: [0, 0, 1, 0], companion: [-28, 82, .43, 0]}
};
export const add = (p,t,a={}) => {
  const n=document.createElementNS(NS,t);
  for(const [k,v] of Object.entries(a)) n.setAttribute(k,v);
  p.appendChild(n); return n;
};
export const path=(p,d,fill='none',stroke='#293d4a',width=1.5)=>add(p,'path',{
  d,fill,stroke,'stroke-width':width,'stroke-linejoin':'round','stroke-linecap':'round'
});
const rect=(p,x,y,w,h,fill,rx=3,stroke='#293d4a',sw=1.4)=>add(p,'rect',{x,y,width:w,height:h,rx,fill,stroke,'stroke-width':sw});
const ellipse=(p,x,y,rx,ry,fill,stroke='#293d4a',sw=1.3)=>add(p,'ellipse',{cx:x,cy:y,rx,ry,fill,stroke,'stroke-width':sw});

export function drawPhoto(p,male){
  rect(p,-30,-41,60,80,'#fffaf0',1,'#8c9691',1);
  const picture=add(p,'svg',{x:-25,y:-36,width:50,height:55,viewBox:'0 0 50 55',overflow:'hidden','data-photo-image':''});
  rect(picture,0,0,50,55,'#91b6a6',0,'none');
  path(picture,'M5 55Q15 27 9-5M37 55Q27 20 41-4','none','#435e54',9);
  path(picture,'M0 10Q18-6 28 9Q43-3 55 9V0H0Z','#496e59','none');
  for(const [x,y,angle] of [[7,31,-25],[16,43,12],[43,32,20]]){
    const leaf=add(picture,'g',{transform:`translate(${x} ${y}) rotate(${angle})`});
    path(leaf,'M0 0Q-13-14-6-23Q7-14 0 0Z','#d0be68','#466958',.7);
    path(leaf,'M0 0L-5-18','none','#f1df9a',.7);
  }
  if(male){
    path(picture,'M54 61C25 51 35 26 19 22','none','var(--worm-color)',18);
    path(picture,'M49 58C27 45 35 27 20 23','none','rgba(255,255,255,.35)',3);
    ellipse(picture,14,20,1.7,2,'#263e47','none');ellipse(picture,22,23,1.7,2,'#263e47','none');
    path(picture,'M13 28Q17 35 24 30','none','#263e47',1.5);
  }
  path(p,'M-24 32H-8','none','#c8c8b8',1);
  return p;
}

function drawCamera(g,male){
  if(male){
    // Squat instant body, projecting lens and a top ejection slot.
    path(g,'M-28-27L-19-34H30L39-23V30L29 38H-28Z','#866177');
    rect(g,-33,-27,62,65,'#e9d5cb',7);
    path(g,'M-30-21Q-24-25-18-23V32H-28Q-33 31-33 24V-17Z','#ae7e91');
    rect(g,-23,-23,45,4,'#293a42',1,'#f4e7d3',.8);
    rect(g,7,-14,15,10,'#dce8e7',2);
    for(let x=10;x<21;x+=3)path(g,`M${x}-12V-6`,'none','#9bb1b5',.65);
    rect(g,-20,-13,11,8,'#314a58',2);
    rect(g,-17,-11,5,4,'#a5d6d8',1,'none');
    ellipse(g,0,14,20,20,'#62465a');ellipse(g,1,12,17,17,'#f2e0cc');
    ellipse(g,2,12,12,12,'#526f7b');ellipse(g,3,12,8.7,9,'#1c364c');
    path(g,'M-3 9Q1 3 7 7','none','#bfdadc',2);
    ellipse(g,17,29,3,3,'#b65874');
    path(g,'M33-14V23M32 27V30','none','#bf96aa',1.3);
    path(g,'M-34-7Q-48 5-38 27','none','#694b64',2);
  }else{
    // Three-quarter camera body. A recessed glass ellipse sits in the long barrel.
    path(g,'M-43-23L-29-32H15L26-23H39L48-12V27L37 35H-43Z','#667986');
    path(g,'M-43-23H-27L-21-31H5L13-23H36V34H-43Z','#3b4c61');
    path(g,'M-41-15H-25V30H-41Z','#8b526e');
    for(let y=-11;y<29;y+=4)path(g,`M-38 ${y}H-28`,'none','#bd8293',.55);
    path(g,'M-42-21H-27L-20-29H4L11-21H35','none','#d0d8d5',2);
    rect(g,-17,-26,17,10,'#293d4e',2,'#b8c7c5',1);
    rect(g,-38,-32,14,6,'#b7c3c4',2);ellipse(g,28,-27,9,3,'#b7c3c4');
    path(g,'M27-26V-20','none','#24384a',3);
    ellipse(g,14,8,24,25,'#1f3444');
    path(g,'M12-16L50-10Q70 9 49 33L12 32Z','#647e8c');
    for(const x of [22,29,37,45])path(g,`M${x}-13Q${x+15} 9 ${x} 32`,'none','#263c50',2);
    path(g,'M18-12L45-7','none','#c4d4d2',2);
    ellipse(g,51,11,20,23,'#aebfbd');ellipse(g,53,11,16.5,20,'#263b51');
    ellipse(g,55,11,12,16,'#497c8e');ellipse(g,57,12,8,12,'#1b364b');
    path(g,'M49 4Q54-3 60 1','none','#c4e8e5',2.3);
    path(g,'M63 14Q63 22 58 24','none','#719ba7',1.2);
    path(g,'M-45-5Q-60 15-43 34','none','#8c526d',3);
    ellipse(g,-13,23,2,2,'#ddd1a5','none');
  }
}

function drawHarness(g,male){
  // Wide padded bands follow the worm's neck and curved middle, not a human torso.
  const straps=male?[
    'M251 89Q262 114 255 138', 'M172 171Q194 188 207 184',
    'M250 95Q203 101 174 174', 'M259 132Q227 140 201 177'
  ]:[
    'M268 86Q279 112 271 139', 'M167 188Q190 211 208 197',
    'M265 93Q206 90 170 191', 'M275 131Q230 144 200 196'
  ];
  straps.forEach((d,i)=>{
    path(g,d,'none','#303e4b',i<2?14:10);
    path(g,d,'none','#99516c',i<2?10:6.8);
    path(g,d,'none','#dbb3b0',1.1).setAttribute('stroke-dasharray','2 3');
  });
  const chest=male?'M207 143Q228 129 257 134':'M197 145Q230 126 273 131';
  path(g,chest,'none','#303e4b',8);
  path(g,chest,'none','#99516c',5);
  const buckle=(x,y,a)=>{
    const b=add(g,'g',{transform:`translate(${x} ${y}) rotate(${a})`});
    rect(b,-7,-6,14,12,'#d4dcda',2,'#314754',1.2);
    rect(b,-4,-3,8,6,'#574553',1,'#314754',.7);
    path(b,'M0-4V4','none','#d4dcda',1.6);
  };
  buckle(male?254:272,119,12);buckle(male?185:186,male?182:200,38);
  const x=male?225:233,y=male?130:133;
  path(g,`M${x-6} ${y-3}Q${x-11} ${y-15} ${x} ${y-15}Q${x+11} ${y-14} ${x+6} ${y-3}Z`,'none','#303f4c',4);
  path(g,`M${x-6} ${y-3}Q${x-11} ${y-15} ${x} ${y-15}Q${x+11} ${y-14} ${x+6} ${y-3}Z`,'none','#d1d9d8',2);
  if(male)path(g,'M203 158Q216 170 224 155','none','#d4dad7',2.4);
  else path(g,'M199 132Q184 120 179 139Q182 149 190 144','none','#d4dad7',2.4);
}

export function drawBasket(g){
  const rear=add(g,'g',{'data-canopy-rear':''});
  path(rear,'M-146 17L-122-5H139L152 21L124 43H-128Z','#6f8491');
  path(rear,'M-133 16L-116 1H132L141 19L121 34H-119Z','#bac8c7');
  for(let x=-114;x<130;x+=17)path(rear,`M${x} 6L${x+8} 27`,'none','#819ca5',1);
  path(rear,'M-132 13V-61H132V12','none','#324b59',7);
  path(rear,'M-132 13V-61H132V12','none','#bdd3d2',3.7);
  path(rear,'M-130-24H132M0-60V11','none','#a8c3c4',3);
  const rig=add(rear,'g',{'data-canopy-rig':''});
  path(rig,'M-144-28L-12-169L143-28','none','#304754',4);
  path(rig,'M-144-28L-12-169L143-28','none','#c2cdcd',1.6);
  ellipse(rig,-12,-174,6,9,'none','#a4bdc2',3);
  const front=add(g,'g',{'data-canopy-front':''});
  path(front,'M-148 16L-129 43H125L152 20L151 32L128 54H-132L-150 28Z','#334c60');
  path(front,'M-147 18H151M-129 44H125','none','#d3dbcf',2);
  path(front,'M-146 19V-34H146V20','none','#304859',7);
  path(front,'M-146 19V-34H146V20','none','#d0dcd6',4);
  for(const x of[-97,-48,48,98])path(front,`M${x}-32V22`,'none','#aabfc4',3);
  path(front,'M-145-7H146','none','#b5cad0',3.5);
  path(front,'M-143 23H145V35L126 49H-128Z','#7a526c');
  path(front,'M-128 27H127','none','#c99bac',1.4);
  rect(front,-24,-34,48,17,'#3d566c',3,'#aabfc7');
  for(const x of[-12,0,12])ellipse(front,x,-26,2,2,x===0?'#cdae6b':'#d1dbd6','none');
  return g;
}

export function drawCanopyAccessory(g,item,male){
  if(!canopyLayouts[item.family])return false;
  g.dataset.renderer=item.family;
  g.setAttribute('style','transform-box:view-box;transform-origin:0 0');
  if(item.family===CAMERA)drawCamera(g,male);
  else if(item.family===HARNESS)drawHarness(g,male);
  else drawBasket(g);
  return true;
}
