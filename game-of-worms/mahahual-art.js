// Mahahual only: individually constructed swimwear and fabric beach parasols.
const NS='http://www.w3.org/2000/svg',C={ink:'#304a50',teal:'#217e7d',deep:'#185c62',aqua:'#79c5bd',cream:'#fff0cf',coral:'#cf7778',berry:'#a65372',wood:'#b8804c',gold:'#d9b96d'};
let serial=0;
const add=(p,t,a={})=>{const n=document.createElementNS(NS,t);for(const[k,v]of Object.entries(a))n.setAttribute(k,v);p.appendChild(n);return n;};
const path=(p,d,fill='none',stroke=C.ink,width=3)=>add(p,'path',{d,fill,stroke,'stroke-width':width,'stroke-linejoin':'round','stroke-linecap':'round'});
function fabric(p,d,color){path(p,d,color);const id=`mh-fabric-${++serial}`,defs=add(p,'defs'),clip=add(defs,'clipPath',{id});add(clip,'path',{d});return add(p,'g',{'clip-path':`url(#${id})`});}
function leaf(p,x,y,s,angle=0,color=C.aqua){const g=add(p,'g',{transform:`translate(${x} ${y}) rotate(${angle}) scale(${s})`});path(g,'M0 10C-17 3-17-13-4-14C8-23 21-9 13 3Q9 10 0 10Z',color,'none');path(g,'M0 12L5-10M3 0L-7-5M4-3L12-6','none',C.cream,1.7);}
function swim(p,male,segment){
 if(male){
  path(p,'M-63-25Q-37-35-3-27L4 18L-10 43Q-36 47-64 29Z',C.deep);
  const panel=fabric(p,'M-3-27Q26-30 58-15L63 32Q40 47 17 39L4 18Z',C.teal);
  path(panel,'M42-29L38 39L53 45L65-16Z',C.coral,'none');
  leaf(panel,19,10,.86,-24);
  path(p,'M-64 24Q-37 38-13 32M19 33Q39 40 58 28','none',C.cream,3.3);
  path(p,'M-61 20Q-39 31-17 26M23 28Q38 33 55 25','none',C.aqua,1.6);
  path(p,'M-3-19L4 18M38-15L35 28','none',C.ink,2);
  path(p,'M-55-9L-30-10L-29 12Q-42 20-55 11Z',C.teal,C.aqua,2);
  path(p,'M-53-5L-31-6','none',C.cream,2);
  path(p,'M-68-39Q-10-52 58-31L57-15Q-10-35-65-23Z',C.cream);
  path(p,'M-60-33Q-12-44 51-26','none',C.coral,3);
  for(const x of [-51,-38,-25,24,38,49])path(p,`M${x} ${-29+Math.abs(x)*.08}l-1-6`,'none','#c5ac84',1.8);
  for(const x of [-8,8])add(p,'circle',{cx:x,cy:-29,r:3,fill:C.deep});
  path(p,'M-8-28Q-24-38-22-22Q-15-16 0-26Q15-38 20-27Q24-16 8-21L0-26M0-25L-6-3M0-25L9-6','none',C.cream,3.5);
  path(p,'M-7-4L-5 0M8-6L10-2','none',C.coral,3.5);
 }else{
  const origin=p;
  if(segment==='top'){
  p=add(origin,'g',{transform:'translate(-43 70)'});
  // Fitted two-cup top: back strap, soft cups, underband and gathered front.
  path(p,'M15-68Q42-116 80-75','none',C.deep,7);
  path(p,'M15-68Q42-112 80-75','none',C.aqua,3);
  path(p,'M3-64Q33-38 71-49L69-41Q30-33 0-55Z',C.deep);
  const left=fabric(p,'M3-70Q19-97 43-80Q37-52 1-49Z',C.teal);
  path(left,'M8-66Q22-83 38-75M7-59Q22-73 33-69','none',C.aqua,2.5);
  const right=fabric(p,'M43-80Q68-104 83-76L70-44Q53-51 43-80Z',C.teal);
  leaf(right,66,-71,.52,26);
  path(p,'M5-70Q21-94 42-79M45-80Q67-99 81-76','none',C.cream,3.5);
  path(p,'M3-52Q21-58 36-66M49-72Q58-54 70-47','none',C.deep,2.2);
  path(p,'M38-75Q32-89 25-82Q25-70 40-72Q54-91 61-84Q64-76 45-72L51-57M40-72L32-55',C.coral,C.ink,2);
  }else{
  p=add(origin,'g',{transform:'translate(12 -29)'});
  // Overlapping skirt, fitted waist and individually folded ruffle.
  const skirt=fabric(p,'M-79 2Q-41-25 3-10Q38 1 53 35L38 61Q4 78-35 68Q-69 61-79 2Z',C.teal);
  path(skirt,'M-82 13Q-22-13 35 34L-13 74L-75 65Z',C.deep,'none');
  for(const [x,y,s,a]of [[-48,28,1.05,-30],[-14,44,.95,18],[22,29,.88,40]])leaf(skirt,x,y,s,a,C.coral);
  path(p,'M-75 5Q-26-15 15 12Q37 26 46 40','none',C.cream,4);
  path(p,'M-70 11Q-25-8 11 17Q30 28 39 42','none',C.aqua,1.8);
  path(p,'M44 38Q18 39-17 68','none',C.coral,7);
  path(p,'M-58 55Q-39 67-17 67Q12 69 38 56L36 66Q26 79 19 69Q9 84 0 74Q-12 84-20 74Q-34 80-42 69Q-56 73-58 55Z',C.cream,C.ink,2.3);
  for(const[x,y]of [[-43,65],[-25,70],[-7,73],[12,71],[28,65]])path(p,`M${x} ${y-5}l3 8`,'none','#cead88',1.7);
  path(p,'M-70 12Q-91-3-91 13Q-91 29-72 20Q-56 1-50 15Q-50 29-70 21L-83 39M-69 20L-60 40',C.coral,C.ink,2.5);
  }
 }
}
function beachPole(p,male){
 // Explicit coordinate separators are essential for the long pole segments.
 path(p,`M-5 ${male?-105:-78}H5V211L0 240L-5 211Z`,'#e8c79a',C.ink,3);
 path(p,`M-2 ${male?-83:-65}V208`,'none','#fff1cf',2.4);
 path(p,'M-7 59H7V77H-7Z',C.deep,C.ink,2);
 add(p,'circle',{cx:2,cy:68,r:2.3,fill:C.cream});
 path(p,'M-5 211L0 240L5 211Z',C.deep,C.ink,2);
}
function parasol(p,male){
 p=add(p,'g',{'data-umbrella-pivot':''});
 beachPole(p,male);
 add(p,'circle',{'data-umbrella-foot':'',cx:0,cy:240,r:2.2,fill:C.deep});
 // Keep the smaller canopy centred on the shaft; visitor tilt moves the whole umbrella.
 const canopy=p;
 if(male){
  path(canopy,'M-131 -25Q-68 -7 0 -19Q69 -8 130 -28L91 -6Q43 13 0 7Q-62 14-131-25Z',C.deep);
  for(const x of [-110,-53,57,114])path(canopy,`M0 27L${x} -20`,'none','#d1b583',3);
  const cloth=fabric(canopy,'M-132 -26Q-95 -106 0 -115Q91 -111 133 -29Q108 -11 87 -18Q57 3 27 -9Q-9 8-39-7Q-91 2-132-26Z',C.cream);
  path(cloth,'M0-116Q-68-95-89-3L-136-24Q-94-106 0-116Z',C.coral,'none');
  path(cloth,'M0-116Q-29-60-40 2L26 3Q25-65 0-116Z',C.coral,'none');
  path(cloth,'M0-116Q78-80 89-5L138-28Q93-112 0-116Z',C.coral,'none');
  for(const x of [-127,-88,-39,27,87,129])path(cloth,`M0 -113Q${x*.67} -78 ${x} -16`,'none','#a66065',1.8);
  path(canopy,'M-132-26Q-91 2-39-7Q-9 8 27-9Q57 3 87-18Q108-11 133-29L131-12Q110 8 87-1Q56 20 28 9Q-6 26-39 11Q-94 20-132-8Z',C.cream,C.ink,2.5);
  path(canopy,'M-129-9Q-91 15-39 6Q-7 20 28 4Q58 14 87-6Q112 2 129-15','none',C.coral,3);
  path(canopy,'M-6-114Q0-130 6-114Z',C.wood,C.ink,2.5);
 }else{
  p=add(p,'g',{transform:'scale(1 .64)'});
  // Wide eight-rib beach canopy with a shallow underside and hanging valance.
  path(p,'M-151-22Q-79 15 0 6Q76 15 151-22L106 6Q40 31 0 22Q-70 31-151-22Z',C.deep);
  for(const x of [-137,-77,73,137])path(p,`M0 40L${x} -10`,'none','#d7be91',3.5);
  const cloth=fabric(p,'M-152-23Q-112-100-47-111Q-20-125 0-121Q22-124 50-111Q117-96 152-23Q117-4 77-7Q38 15 0 3Q-37 16-77-7Q-118-4-152-23Z',C.cream);
  path(cloth,'M0-121Q-91-107-111 1L-155-21Q-113-108 0-121Z',C.teal,'none');
  path(cloth,'M0-121Q-40-74-48 15L1 14Q7-74 0-121Z',C.teal,'none');
  path(cloth,'M0-121Q64-77 77 5L117-2Q98-92 0-121Z',C.teal,'none');
  for(const x of [-147,-110,-77,-48,0,40,77,113,147])path(cloth,`M0 -119Q${x*.6} -86 ${x} -6`,'none',x<0?'#7cb2a7':'#b6bfa8',1.7);
  path(p,'M-152-23Q-118-4-77-7Q-37 16 0 3Q38 15 77-7Q117-4 152-23L151-4Q132 9 116 5Q98 21 77 12Q58 31 39 22Q19 35 0 23Q-20 35-39 23Q-58 31-77 12Q-99 22-116 6Q-134 10-151-4Z',C.cream,C.ink,2.5);
  path(p,'M-149-5Q-133 7-116 2Q-99 17-77 8Q-59 26-39 19Q-20 30 0 19Q20 30 39 18Q59 26 77 8Q99 17 116 1Q133 6 149-5','none',C.teal,3);
  path(p,'M-19-116Q0-135 19-116L13-108Q0-114-13-108Z',C.cream,C.ink,2.5);
  path(p,'M-6-124V-132Q0-140 6-132V-124',C.wood,C.ink,2.5);
 }
 path(p,'M-8 29H8L5 44H-5Z',C.deep,C.ink,2.4);
}
export function drawSunscreenTube(parent,open=false){
 const g=add(parent,'g',{'data-sunscreen-tube':''});
 path(g,'M-15-27H15L12 14Q10 21 6 22H-6Q-10 21-12 14Z',C.cream,C.ink,1.9);
 path(g,'M-14-25H14M-13-22H13','none','#bd9b65',1.3);
 path(g,'M-12-15Q0-20 12-15L10 9Q0 13-10 9Z','#edb459','none');
 add(g,'circle',{cx:0,cy:-4,r:5,fill:'#fff8dd',stroke:'#b37a34','stroke-width':1.2});
 for(let i=0;i<8;i++){const a=i*Math.PI/4;path(g,`M${Math.cos(a)*7} ${-4+Math.sin(a)*7}l${Math.cos(a)*2} ${Math.sin(a)*2}`,'none','#fff8dd',1.5);}
 path(g,'M-6 21H6V28H-6Z',C.teal,C.ink,1.3);
 if(open)path(g,'M5 26Q19 22 21 29L19 34Q11 36 7 29',C.aqua,C.ink,1.3);
 else path(g,'M-8 24H8V31H-8Z',C.teal,C.ink,1.4);
 path(g,'M-10-16L-8 13','none','#ffffff',2);
 return g;
}
export function drawMahahualBeach(group,item,companion){
 const family=item.family;if(family!=='mahahual-reef-ruffle-swim-costumes'&&family!=='mahahual-sea-grape-beach-parasols')return false;
 group.classList.add('mahahual-beach-refined');
 if(item.segment==='sunscreen'){add(group,'rect',{x:-30,y:-33,width:60,height:70,fill:'transparent',stroke:'none'});add(group,'ellipse',{cx:1,cy:32,rx:20,ry:4,fill:C.ink,opacity:.17});drawSunscreenTube(group);}else if(family==='mahahual-reef-ruffle-swim-costumes')swim(group,companion,item.segment);else parasol(group,companion);
 return true;
}
