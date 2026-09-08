// Original SVG drawings. Structural references are recorded in the location dossier.
const NS='http://www.w3.org/2000/svg';
export const COMPOST='ju4400-compost-work', MATE='ju4400-mate', FOOD='ju4400-sopaipillas';
export const araucaniaLayouts={
  [COMPOST]:{primary:[305,170,.7,0],companion:[27,166,.48,8]},
  [MATE]:{primary:[382,88,.66,0],companion:[29,63,.6,0]},
  [FOOD]:{primary:[215,266,.6,0],companion:[48,269,.58,0]}
};
const ink='#29444b',cream='#fff6df',steel='#c5d6d7',darkSteel='#647d85',wood='#b57a48',berry='#93465e';
export function element(tag,attrs={}){const n=document.createElementNS(NS,tag);for(const[k,v]of Object.entries(attrs))n.setAttribute(k,v);return n;}
const path=(d,fill='none',stroke=ink,width=2)=>element('path',{d,fill,stroke,'stroke-width':width,'stroke-linejoin':'round','stroke-linecap':'round'});
const ellipse=(cx,cy,rx,ry,fill,stroke=ink,width=2)=>element('ellipse',{cx,cy,rx,ry,fill,stroke,'stroke-width':width});
const group=(parent,name)=>{const g=element('g',{['data-'+name]:''});parent.append(g);return g;};
function grain(g,d){g.append(path(d,'none','#dcb57e',1.4));}
function pastry(g,x,y,angle=0){const p=element('g',{transform:`translate(${x} ${y}) rotate(${angle})`});
  p.append(path('M-20-9Q-13-17 3-14L20-10Q25-3 21 9Q5 17-17 11Q-24 6-20-9Z','#c88c43','#996133',1.5),path('M-19-10Q-4-19 18-11L20 5Q1 12-18 6Z','#e5b765','#ad753b',1.2),path('M-13-9Q0-13 13-8','none','#ffe0a0',2));
  for(const[x,y]of [[-8,-3],[0,-4],[8,-2]])p.append(ellipse(x,y,1.4,1,'#a46e38','none'));
  g.append(p);return p;}
function board(g,small){
  g.append(path(small?'M-72-35L49-44L78 29L-59 42Z':'M-107-36L87-45L111 29L-94 43Z',wood,'#76543d',2.5),path(small?'M-59 42L78 29V36L-59 49L-72-28V-35Z':'M-94 43L111 29V37L-94 51L-107-28V-36Z','#805a40','#634c3c',2));
  grain(g,small?'M-63-27L45-35M-48 34L66 23':'M-96-27L78-36M-82 34L99 21');
}
function wheelbarrow(g){
  g.append(ellipse(9,71,116,9,'#263b3c22','none'));
  const cart=group(g,'cart');
  cart.append(path('M-120-29L-47 14L66 46M-109-42L-29 7L72 37','none',darkSteel,8),path('M-43 14L-39 63L-12 66L0 15','none',ink,6),path('M-39 18L-34 58L-15 60','none',steel,2));
  cart.append(path('M-117-33L-142-46M-109-45L-131-56','none',berry,10),path('M-119-37L-137-47','none','#d08a9e',2));
  const wheel=group(cart,'cart-wheel');wheel.append(ellipse(76,47,24,27,'#314249',ink,3),ellipse(76,47,16,19,steel,ink,2),ellipse(76,47,6,7,darkSteel,ink,1.5));
  for(const a of [0,60,120]){const spoke=path('M76 32V62','none','#7d969e',2);spoke.setAttribute('transform',`rotate(${a} 76 47)`);wheel.append(spoke);}
  cart.append(path('M-72-51Q-12-70 80-48L57 14Q-1 27-50 9Z','#467f82',ink,3),path('M-72-51Q-5-38 80-48L59-8Q-4 5-51-10Z','#214f56',ink,2));
  const load=group(cart,'compost-load');load.append(path('M-63-44Q-57-61-42-56Q-31-74-13-62Q4-80 23-63Q43-66 52-51L68-44Q0-33-63-44Z','#5b4537','#3d3b32',1.5));
  for(const[x,y,a]of [[-44,-52,20],[-21,-57,-20],[8,-60,35],[32,-51,-35],[49,-46,12]]){const leaf=path('M-9 0Q0-10 10 0Q1 8-9 0Z','#879468','#5e6647',1);leaf.setAttribute('transform',`translate(${x} ${y}) rotate(${a})`);load.append(leaf);}
  load.append(path('M-25-44L-12-52M17-43L28-53','none','#b89662',2.5));
  group(cart,'passenger-slot');
  const front=group(cart,'cart-front');front.append(path('M-72-51Q-8-35 80-48L56 15Q-5 33-50 9Z','#5a9998',ink,3),path('M-70-50Q0-32 80-48','none','#c0d4ba',5),path('M-43-25Q-1-14 52-25L43 5Q0 17-35 4Z','#3d7e80','none'),path('M-46-35Q-2-24 61-36','none','#82b6ac',2));
  for(const[x,y]of [[-52,-39],[63,-38]])front.append(ellipse(x,y,2,2,steel,ink,1));
  front.append(path('M-45-22L-37 2M61-28L48 9','none','#284f57',1.2),path('M-36 12Q8 24 52 13','none','#afcbc0',1.6));
}
function fork(g){
  g.append(ellipse(4,93,36,6,'#263b3c20','none'));
  const tool=group(g,'fork');tool.append(path('M-4-54L3 53','none','#795638',9),path('M-6-51L0 49','none','#d5ab70',4),path('M-5-54Q-25-75-20-91L13-93Q20-72-5-54Z',berry,ink,2.5),path('M-5-66Q-15-77-13-85L7-86Q8-76-5-66Z',cream,ink,1.5),path('M0 45L8 58L9 70','none',darkSteel,10));
  tool.append(path('M-21 65Q-5 71 23 63M-21 65L-23 91M-6 68L-6 96M9 67L11 94M23 63L28 88','none',ink,5),path('M-21 65Q-5 71 23 63M-21 65L-23 91M-6 68L-6 96M9 67L11 94M23 63L28 88','none',steel,2.8));
}
function mate(g){
  g.append(ellipse(0,48,38,7,'#263b3c22','none'));
  const cup=group(g,'mate-cup');cup.append(path('M-30-19C-48 9-30 44-4 47C28 51 46 16 30-19Z','#885239',ink,2.5),path('M-26-15C-34 5-23 30-10 34C10 41 26 24 29-1L24-17Z','#b77848','none'),path('M-23-9Q-31 11-16 28','none','#dab17a',3));
  cup.append(ellipse(0,-20,33,12,steel,ink,2.5),ellipse(0,-21,27,8,'#746947','#41554a',1.5));
  const leaves=group(cup,'mate-leaves');for(const[x,y]of [[-19,-24],[-10,-19],[-4,-25],[5,-20],[14,-25],[20,-19],[-16,-17]])leaves.append(path(`M${x-3} ${y}l5-2`,'none','#a4a475',2));
  cup.append(path('M13-17L23-59Q24-64 31-64H42','none',ink,7),path('M13-17L23-59Q24-64 31-64H42','none',steel,4),path('M15-24L24-57','none','#fffcef',1.2));
  cup.append(path('M-18 36Q1 47 22 32','none','#d0a371',1.6));
}
function kettle(g){
  g.append(ellipse(0,51,46,7,'#263b3c22','none'));
  const pot=group(g,'kettle');pot.append(path('M-34-7Q-46-69-2-76Q43-71 37-9','none',ink,11),path('M-33-11Q-39-62-5-67Q28-65 31-21','none',steel,3));
  pot.append(path('M-34 12Q-65 6-73-35L-87-39Q-83 8-57 31L-26 36Z',cream,ink,3),path('M-82-35L-69-31','none',darkSteel,5));
  pot.append(path('M-24-23C-41-14-47 23-33 39Q1 59 36 36C46 15 35-16 23-23Z',cream,ink,3),path('M14-21Q41 12 26 35Q15 44-8 43Q29 59 36 34Q44 8 23-23Z','#c8d5c8','none'),path('M-28-6Q-37 13-24 29','none','#fffdfa',5));
  pot.append(ellipse(0,-22,27,8,steel,ink,2),path('M-25-23Q-6-43 24-23Z',cream,ink,2),ellipse(0,-36,8,5,berry,ink,2),path('M-30 39Q3 50 33 36','none',berry,4),path('M-29 29Q-2 41 30 27','none','#bdcbbb',1.5),path('M-64-4Q-55 10-41 14','none','#c8d5c8',2.5));
}
function food(g,small){
  g.append(ellipse(0,52,small?77:110,8,'#263b3c20','none'));board(g,small);
  if(small){
    const bread=group(g,'bread-board');
    bread.append(path('M-58-23L38-31L58 23L-39 35Z',cream,'#c6b18b',1.3),path('M-39 35L-44 23L-28 32Z','#d6c5a6','#c6b18b',1),path('M-53-17L34-24','none',berry,1.5));
    for(const [index,x,y,angle] of [[1,-27,-8,-8],[2,20,-15,12]]){const p=pastry(bread,x,y,angle);p.setAttribute('data-serving',index);p.setAttribute('data-snack','');}
    const snack=group(bread,'snack');snack.setAttribute('data-serving','0');snack.setAttribute('transform','translate(9 14) scale(1.15)');pastry(snack,0,0,-5);
  }else{
    const dough=group(g,'dough');dough.append(path('M-67-22Q-15-42 53-24Q80-1 60 24Q0 39-66 21Q-82 1-67-22Z','#f1deb0','#c8ad78',1.7),path('M-57-20Q-11-32 42-23','none','#fff0d0',2));
    const pin=group(g,'rolling-pin');pin.append(path('M-79-6H79','none','#7c5039',12),path('M-78-9H78','none','#c29560',5),path('M-51-20Q0-28 51-20V3Q0 13-51 3Z','#d4a767','#79553d',2),ellipse(-51,-8,7,12,'#b87f49','#79553d',1.5),ellipse(51,-8,7,12,'#e4bf85','#79553d',1.5),path('M-38-18Q0-22 39-18','none','#f3d39c',2),path('M-34-5Q-12-9 4-4T39-5','none','#b88751',1.2));
  }
}
export function drawAraucaniaWork(g,item,small){
  if(![COMPOST,MATE,FOOD].includes(item.family))return false;
  g.setAttribute('data-araucania-art',small?'companion':'primary');
  if(item.family===COMPOST)(small?fork:wheelbarrow)(g);
  if(item.family===MATE)(small?kettle:mate)(g);
  if(item.family===FOOD)food(g,small);
  return true;
}
