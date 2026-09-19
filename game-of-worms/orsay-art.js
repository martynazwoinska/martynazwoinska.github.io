export const BOOK='ju2518-six-september-garden-ledger';
export const BAG='ju2518-virus-association-spectroscope';
export const CROWN='ju2518-rotten-apple-decay-rotoscope';
export const add=(p,tag,a={})=>{const n=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const [k,v]of Object.entries(a))n.setAttribute(k,v);p.appendChild(n);return n;};
const path=(p,d,fill='none',stroke='#624b44',width=2,a={})=>add(p,'path',{d,fill,stroke,'stroke-width':width,'stroke-linecap':'round','stroke-linejoin':'round',...a});
export function pencil(p){
 const g=add(p,'g'); // tip at the origin; the hand holds the shaft above it
 path(g,'M0 0L-3-12L-1-49L5-49L3-12Z','#ca9c52','#765b42',.9);
 path(g,'M-3-12L0 0L3-12Z','#e4c59a','#765b42',.7);
 path(g,'M-1.1-4L0 0L1.1-4Z','#49453f','#49453f',.6);
 path(g,'M1-15L2-45','none','#f1d393',1);
 path(g,'M-1-48L5-48L5-55L-1-55Z','#c38e99','#765b42',.8);
 path(g,'M-1-47L5-47','none','#bbb7a3',3);
 return g;
}
// A little graphite portrait, in a fixed 100 x 100 page coordinate system.
export function portrait(p,male){
 const g=add(p,'g',{'data-orsay-portrait':''});
 const marks=[
  'M13 78C30 90 42 70 40 58C36 41 57 32 70 37C86 43 88 22 74 16',
  'M13 78C31 95 51 82 50 62C46 49 62 46 70 48C96 53 101 22 82 10',
  'M74 16Q77 9 82 10',
  'M78 24L78.3 24.3M87 24L87.3 24.3',
  'M78 33Q83 37 89 31',
  male?'M14 77L4 68L8 84Z':'M67 13Q72 1 80 7Q87 0 93 15',
  male?'M75 43L81 58L65 49M63 46L60 60L78 53':'M75 43L85 57L83 36M63 46L67 61L85 57',
  'M25 87L29 83M32 85L37 79M43 70L47 67M46 59L50 56',
  'M9 94Q40 97 63 93'
 ];
 for(const d of marks)path(g,d,'none','#58574e',2.5,{'data-orsay-stroke':'',pathLength:1,'stroke-dasharray':1,'stroke-dashoffset':1,opacity:.9});
 return g;
}
function book(g,male){
 // Narrow straps remain behind the paper; the cover lip, page block and
 // gutter communicate a bound book rather than a floating white rectangle.
 path(g,male?'M-53-47Q-29-87 37-62M-52 52Q5 89 49 52':'M-77-48Q-26-120 75-59M-76 55Q0 102 77 53','none','#8c775e',7);
 path(g,male?'M-53-47Q-29-87 37-62':'M-77-48Q-26-120 75-59','none','#d0b99a',2);
 const pages=add(g,'g',{'data-orsay-pages':''});
 if(male){
  path(pages,'M-59-76L58-69L53 79L-64 70Z','#62776f','#3c5c51',3);
  path(pages,'M-55-70L54-64L49 74L-60 65Z','#d9d2ba','#7e8372',1.5);
  path(pages,'M-51-68L50-62L45 67L-57 61Z','#faf5df','#b6b6a0',1.3);
  path(pages,'M-55 63L49 70M-55 67L48 74','none','#b6b19b',1);
  path(pages,'M-51-68L50-62L49-42L-52-48Z','#eee8d5','#c3bea8',.8);
  for(let x=-41;x<46;x+=14){add(pages,'ellipse',{cx:x,cy:-56+x*.06,rx:2.5,ry:3,fill:'#878978'});path(pages,`M${x}-54C${x-7}-51 ${x-8}-78 ${x}-79C${x+6}-80 ${x+7}-62 ${x+3}-58`,'none','#65685b',2.3);}
  path(pages,'M33 66L45 53L45 67Z','#e0d9c1','#bbb69f',1);
  const page=add(pages,'g',{transform:'translate(-47 -38) scale(.88 .96)','data-orsay-page':''});portrait(page,false);
 }else{
  path(pages,'M-97-69Q-47-87-3-65Q38-84 93-72L97 77Q40 61 0 82Q-44 65-96 77Z','#77677f','#514656',3);
  path(pages,'M-97-66L-96 74M93-68L96 73','none','#ab97ac',1.7);
  path(pages,'M-91-66Q-48-80-2-60Q40-78 87-68L90 71Q44 60 0 76Q-43 62-90 71Z','#ded6bc','#a59e88',1.3);
  path(pages,'M-87-69Q-43-83-2-61L0 70Q-40 54-86 64Z','#f3eedb','#bcb5a0',1.3);
  path(pages,'M3-61Q46-81 84-70L87 64Q42 53 2 70Z','#fff9e7','#bcb5a0',1.3);
  path(pages,'M-2-61Q-8-7 0 70','none','#c1b59b',2.5);
  for(const y of [-39,-8,23,51])path(pages,`M-5 ${y}l5 2`,'none','#9d967f',1.3);
  path(pages,'M-89 68Q-41 59 0 73Q41 59 90 68M-89 72Q-41 63 0 77Q41 63 90 72','none','#b8ad94',1);
  path(pages,'M80 49L87 64L70 61Z','#e7dec2','#c1b59b',1);
  // Quiet botanical pencil study on the facing page, bounded by its edges.
  path(pages,'M-47 37Q-35 5-51-33M-45 20Q-69 10-69-5Q-45-7-42 13M-46-6Q-25-24-25-34Q-44-34-48-16','none','#8d967a',1.8);
  path(pages,'M-70 47L-32 49M-64 54L-38 55','none','#c0b59b',1);
  const page=add(pages,'g',{transform:'translate(9 -55) scale(.7 1.06)','data-orsay-page':''});portrait(page,true);
  path(pages,'M-5 68L-8 91L-1 86L5 92L6 67Z','#b36c72','#754f55',1);
 }
 const idle=add(g,'g',{transform:male?'translate(67 43) rotate(12)':'translate(103 48) rotate(9)','data-orsay-pencil':''});pencil(idle);
 path(g,male?'M56 18L73 20L72 33L55 31Z':'M92 20L110 22L109 35L92 33Z','#a48c6b','#705f4e',1.4);
}
function bag(g,male){
 const red=male?'#ac7159':'#a8535a',edge='#664c43';
 path(g,male?'M-52-24Q-70-121 20-99Q52-93 54-37':'M-68-29Q-89-132 21-108Q68-93 67-35','none',edge,male?9:10);
 path(g,male?'M-52-24Q-70-121 20-99Q52-93 54-37':'M-68-29Q-89-132 21-108Q68-93 67-35','none','#c6a779',4);
 if(male){
  path(g,'M-52-34Q-30-68 1-49Q37-65 56-32L60 32Q51 77 1 78Q-50 71-60 28Z','#795e49',edge,2.5);
  path(g,'M-52-34Q-30-65 0-44Q32-62 50-29L50 28Q44 63 1 68Q-43 63-51 25Z',red,edge,2.5);
  path(g,'M-47 14Q0 35 49 13L47 42Q-1 73-47 42Z','#b88c69',edge,2);
  path(g,'M-40 34Q0 52 41 33','none','#ead1a2',1.4,{'stroke-dasharray':'3 4'});
 }else{
  path(g,'M0-48C-32-81-77-54-79-7C-83 49-40 91 0 83C40 96 83 51 81-4C78-52 34-78 0-48Z','#794343',edge,2.5);
  path(g,'M-3-43C-34-70-70-46-71-4C-76 41-38 80-4 73C31 83 67 43 67-1C65-46 30-65-3-43Z',red,edge,2.5);
  path(g,'M-53-24C-64 5-49 42-24 54','none','#ca7b78',4);
  path(g,'M-60 4Q-58 60-5 66Q47 72 58 21','none','#deb096',1.5,{'stroke-dasharray':'3 4'});
  path(g,'M69-2Q82 47 34 77','none','#b77662',3);
 }
 add(g,'ellipse',{cx:0,cy:-27,rx:male?44:57,ry:male?12:15,fill:'#493d34',stroke:edge,'stroke-width':2});
 // Drawing tools stand in separate pockets, inside the apple-shaped bag.
 const supplies=add(g,'g',{'data-orsay-supplies':''});
 const first=add(supplies,'g',{transform:male?'translate(-19 0) rotate(-12)':'translate(-26 0) rotate(-14)','data-orsay-supply-pencil':''});pencil(first);
 const second=add(supplies,'g',{transform:male?'translate(-7 -4) rotate(5)':'translate(-10 -8) rotate(-3)'});pencil(second);
 path(supplies,male?'M9-43L29-40L26-16L6-19Z':'M14-47L38-43L34-14L10-18Z','#e5afa9','#876966',1.6);
 path(supplies,male?'M8-30L28-27L26-16L6-19Z':'M12-32L36-28L34-14L10-18Z','#ece1c8','#9b8c76',1.1);
 path(supplies,male?'M-40-19Q0-4 39-19L35-8Q0 5-36-8Z':'M-49-18Q0 0 48-18L44-4Q0 10-45-4Z','#b28869',edge,1.5);
 const flap=add(g,'g',{'data-orsay-flap':''});
 path(flap,male?'M-48-30Q-30-67 0-44Q30-63 47-28L39 9Q2 30-41 6Z':'M-62-31Q-34-77 0-46Q36-75 59-28L46 19Q0 45-49 17Z',male?'#c39369':'#bd6870',edge,2.3);
 path(flap,male?'M-38-27Q0-46 37-24M-34 5Q0 22 32 8':'M-48-26Q0-51 47-24M-41 12Q0 34 39 14','none','#e4bb94',1.4,{'stroke-dasharray':'3 4'});
 path(flap,'M-4-42Q-2-65 10-70','none',edge,5);
 path(flap,male?'M7-63Q31-83 41-62Q28-44 7-63Z':'M6-64Q36-88 44-59Q22-47 6-64Z','#738564','#405e4c',1.8);
 path(flap,'M9-62L31-65','none','#b6bc82',1.1);
 path(flap,male?'M-6 7H9V24H-6Z':'M-7 19H10V38H-7Z','#b49556','#6a593e',1.5);
 path(flap,male?'M1 10V21':'M1 23V34','none','#e3ce94',2);
 for(const x of male?[-49,49]:[-66,65]){
  path(g,`M${x-5}-29h10v15h-10Z`,'#927052',edge,1.1);
  add(g,'circle',{cx:x,cy:-23,r:2.2,fill:'#d6ba75',stroke:'#6c593d','stroke-width':.8});
 }
}
export function drawOrsayArt(g,item,male=false){
 if(item.family===BOOK){book(g,male);return true;}
 if(item.family===BAG){bag(g,male);return true;}
 return false;
}
