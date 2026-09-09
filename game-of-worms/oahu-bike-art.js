// Original side-view construction, inspired by the early Mānoa bicycle winnower.
export const BIKE='eca789-chocolate-bike';
export const bikeLayouts={[BIKE]:{primary:[22,188,1,-8]}};
const NS='http://www.w3.org/2000/svg';
export const C={ink:'#34434e',berry:'#a64467',rose:'#da839a',silver:'#ccdce0',steel:'#829ba7',light:'#f5faf5',cream:'#fff0cb',cocoa:'#75462e'};
export function add(g,t,a={}){const n=document.createElementNS(NS,t);for(const[k,v]of Object.entries(a))n.setAttribute(k,v);g.appendChild(n);return n;}
export const path=(g,d,fill='none',stroke=C.ink,w=1.5)=>add(g,'path',{d,fill,stroke,'stroke-width':w,'stroke-linejoin':'round','stroke-linecap':'round'});
export const part=(g,n,a={})=>add(g,'g',{['data-bike-'+n]:'',...a});
const ellipse=(g,x,y,rx,ry,fill,stroke=C.ink,w=1.3)=>add(g,'ellipse',{cx:x,cy:y,rx,ry,fill,stroke,'stroke-width':w});
const line=(g,d,s,w)=>path(g,d,'none',s,w);
function finish(g,id,stops){const grad=add(g,'linearGradient',{id,x1:'0%',y1:'0%',x2:'100%',y2:'20%'});stops.forEach(([o,c])=>add(grad,'stop',{offset:o,'stop-color':c}));return`url(#${id})`;}
export function bean(g,x,y,a=0,s=1){const b=add(g,'g',{transform:`translate(${x} ${y}) rotate(${a}) scale(${s})`});path(b,'M-5-3Q-1-7 5-3Q9 3 2 5Q-6 6-5-3Z',C.cocoa,'#4f3329',.75);line(b,'M-2-3Q2-1 1 3','#c38e60',.85);return b;}
function wheel(g,x,back=false){
  const w=add(g,'g',{transform:`translate(${x} 98)`});
  ellipse(w,0,0,32.3,32.3,'none','#303d48',6.6);ellipse(w,0,0,29.2,29.2,'none','#d9e5df',1.7);
  ellipse(w,0,0,27.8,27.8,'none','#8d9da3',.8);
  const spokes=part(w,back?'wheel':'front-wheel');
  for(let a=0;a<360;a+=30){const r=a*Math.PI/180;line(spokes,`M${Math.cos(r+.38)*5} ${Math.sin(r+.38)*5}L${Math.cos(r)*29} ${Math.sin(r)*29}`,'#8b9ba3',.7);}
  ellipse(w,0,0,5,5,C.silver,C.ink,1);ellipse(w,0,0,1.8,1.8,C.steel,'none');
  line(w,'M-26-18A32 32 0 0 1 19-26','#76828a',1.6);
}
function pipe(g,d){line(g,d,C.ink,9);line(g,d,C.berry,6.1);line(g,d,'#e3a3b2',1.1);}
export function drawOahuBike(g,item){
  if(item.family!==BIKE)return false;
  const a=part(g,'art',{'data-oahu-bike-art':''}),defs=add(a,'defs');
  const metal=finish(defs,'ob-metal',[[0,C.steel],[.28,C.light],[.48,C.silver],[1,'#718c99']]);
  const enamel=finish(defs,'ob-enamel',[[0,'#8c3d5d'],[.22,'#ce788f'],[.64,C.berry],[1,'#783b56']]);
  ellipse(a,167,136,166,8,'#263b382c','none');
  // The rear wheel is lifted by a trainer. The front tyre remains on the ground.
  path(a,'M14 134L45 88L67 134M17 134H71','none',C.ink,4);
  line(a,'M18 131L45 90L65 131',C.silver,1.8);
  // Tangent belt runs behind the bicycle and drives the cracker shaft.
  path(a,'M42 83L245 36Q258 40 250 56L50 113','none','#35464d',3);
  path(a,'M42 83L245 36M50 113L250 56','none','#ba9c74',.8);
  wheel(a,46,true);wheel(a,160);
  pipe(a,'M46 98L87 40L111 93Z');pipe(a,'M87 40L143 34L111 93');pipe(a,'M143 34L160 98');
  line(a,'M87 40L83 22',C.ink,6);line(a,'M87 40L83 22',metal,3);
  path(a,'M68 20Q77 14 85 17L104 22Q110 30 98 31L76 27Q65 26 68 20Z','#77523f',C.ink,1.5);
  line(a,'M74 20L98 24','#c59b73',1.3);
  line(a,'M143 34L138 10Q146 1 161 6',C.ink,6);line(a,'M143 34L138 10Q146 1 161 6',metal,3.5);
  line(a,'M156 5L169 8','#61414f',6);line(a,'M158 3L168 6','#a47684',1.2);
  path(a,'M160 10Q191 39 159 68','none','#53616a',1);
  // Two visible sprockets and a closed chain connect crank to rear axle.
  ellipse(a,46,98,8,8,C.steel,C.ink,1);
  const gear=part(a,'gear',{transform:'translate(111 93)'}),rotor=part(gear,'crank');
  for(let t=0;t<360;t+=20){const r=t*Math.PI/180;line(rotor,`M${Math.cos(r)*14} ${Math.sin(r)*14}L${Math.cos(r)*16} ${Math.sin(r)*16}`,C.ink,1.9);}
  ellipse(rotor,0,0,13.5,13.5,C.silver,C.ink,1.3);
  for(let t=0;t<360;t+=72){const n=add(rotor,'g',{transform:`rotate(${t})`});path(n,'M3-3L9-5Q12 0 8 3L3 2Z','#667f8a','none');}
  path(a,'M46 90L110 77A16 16 0 0 1 114 109L47 106A8 8 0 0 1 46 90Z','none','#283842',3.1);
  const chain=path(a,'M46 90L110 77A16 16 0 0 1 114 109L47 106A8 8 0 0 1 46 90Z','none','#d1dcda',1.2);chain.dataset.bikeChain='';chain.setAttribute('stroke-dasharray','1.4 2.4');
  const pedals=part(a,'pedals',{transform:'translate(111 93)'});
  line(pedals,'M-16-13L16 13',C.ink,5);line(pedals,'M-16-13L16 13',metal,2.5);
  for(const[x,y]of[[-16,-13],[16,13]]){const pedal=add(pedals,'g',{transform:`translate(${x} ${y})`,'data-bike-pedal':`${x},${y}`});path(pedal,'M-8-3H8V3H-8Z','#485863',C.ink,1);line(pedal,'M-5-1H5',C.silver,1);}
  ellipse(a,111,93,3.5,3.5,C.silver,C.ink,1);
  // Four-legged work stand and its far side come before the machine body.
  path(a,'M233 56L220 132M300 57L311 132M215 132H229M305 132H318','none',C.ink,5);
  path(a,'M230 76L303 76M225 108L307 108','none',C.steel,3);
  path(a,'M222 131L234 58M309 131L299 60','none',C.silver,1.4);
  path(a,'M224 3L284-7L305 5V66L287 82L224 71Z',enamel,C.ink,1.8);
  path(a,'M284-7L305 5V66L287 82L285 12Z','#763c56',C.ink,1.3);
  path(a,'M224 3L285 12L305 5L284-7Z','#d49aab',C.ink,1.3);
  path(a,'M230 18L274 22V58L230 53Z','#e3ebdf',C.ink,1.2);
  path(a,'M234 22L270 26V52L234 48Z','#718b93','none');
  const roller=part(a,'roller');
  for(let y=26;y<50;y+=5)line(roller,`M237 ${y}L266 ${y+3}`,'#cfddda',1.5);
  ellipse(a,247,46,10,10,C.silver,C.ink,1.4);
  const fly=part(a,'flywheel',{transform:'translate(247 46)'});
  for(let a=0;a<360;a+=120){const n=add(fly,'g',{transform:`rotate(${a})`});path(n,'M-2-2L0-8L4-7L3-1Z',C.steel,'none');}
  ellipse(a,247,46,2.4,2.4,C.ink,'none');
  // Broad open hopper, not a closed box. Roasted beans pass through its throat.
  path(a,'M228-36L284-31L276 3L243 0Z',metal,C.ink,1.7);
  path(a,'M228-36L245-44L300-39L284-31Z',C.silver,C.ink,1.5);
  path(a,'M235-36L246-40L291-36L282-34Z','#47585c',C.ink,.7);
  path(a,'M284-31L300-39L290-5L276 3Z','#809aa3',C.ink,1.2);
  line(a,'M233-28L245-3M239-30L248-11','#f6f9ed',1.1);
  // Winnowing tube: transparent inspection section with a lighter shell outlet.
  path(a,'M267 63L263 87L270 99L287 98L280 86L283 65Z',metal,C.ink,1.6);
  path(a,'M266 81L283 81L280 87L290 105L277 109L267 93Z','#bbdee5aa',C.ink,1.2);
  line(a,'M271 84L273 94L280 104',C.light,1.4);
  path(a,'M283 84Q304 76 315 86L315 110','none',C.ink,11);
  path(a,'M283 84Q304 76 315 86L315 110','none',C.silver,7);
  for(let x=289;x<309;x+=5)line(a,`M${x} 79L${x-1} 85`,C.steel,1);
  // A small blower is a playful mechanical adaptation, not a replica claim.
  ellipse(a,301,50,15,15,C.steel,C.ink,1.5);
  ellipse(a,301,50,11.5,11.5,'#425e68',C.silver,1.2);
  const fan=part(a,'fan',{transform:'translate(301 50)'});
  for(let a=0;a<360;a+=120){const n=add(fan,'g',{transform:`rotate(${a})`});path(n,'M-2-2Q-9-10-2-10Q5-9 3-2Z','#acc3ca','none');}
  ellipse(a,301,50,3,3,C.silver,C.ink,.7);
  // Separate ceramic nib bowl and transparent shell collector.
  path(a,'M251 119Q253 139 280 138Q299 136 299 118Z','#6794a4',C.ink,1.5);
  ellipse(a,275,119,24,7,C.cream,C.ink,1.3);
  const nibs=part(a,'nibs',{opacity:0});
  for(let i=0;i<18;i++){const x=258+(i*17%34),y=116+(i*11%7);path(nibs,`M${x} ${y}l3-2 2 3-4 2Z`,i%3?'#784b32':'#a3754b','#53372c',.4);}
  path(a,'M256 127Q262 132 284 131','none','#b7d4d7',1.4);
  path(a,'M304 108L307 134Q318 139 330 132L332 104Z','#e5edf080',C.ink,1.4);
  ellipse(a,318,106,14,4,C.silver,C.ink,1.2);
  path(a,'M308 113L310 129M325 113L324 126','none',C.light,1.2);
  const shells=part(a,'shells',{opacity:0});
  for(let i=0;i<11;i++){const x=309+i*7%16,y=123+i*5%9;path(shells,`M${x} ${y}q4-4 5 1l-3 2Z`,'#c79b6c','#956e4c',.5);}
  // Rim-mounted feed scoop, lifted by the larger worm during each batch.
  const scoop=part(a,'scoop',{transform:'translate(215 -57) rotate(-12)'});
  path(scoop,'M-23-7Q-23 16 7 12L27 4L26-8Z',metal,C.ink,1.4);
  ellipse(scoop,1,-7,25,7,'#526973',C.ink,1.1);
  const contents=part(scoop,'beans');
  [[-13,-7,-20],[0,-9,10],[12,-6,35],[-4,-3,-12],[9,-1,12]].forEach(([x,y,a])=>bean(contents,x,y,a,.73));
  path(scoop,'M-22-5Q-31-11-42-9L-43-3Q-31-4-22 1Z','#a07450',C.ink,1.3);
  line(scoop,'M-39-7L-29-6','#e1bf8c',1);
  line(scoop,'M-18 5Q-5 12 10 6',C.light,1.3);
  const grains=part(a,'grains',{opacity:0});
  for(let i=0;i<16;i++){
    if(i<6)bean(grains,0,0,i*29,.43);
    else {const grain=add(grains,'g');path(grain,i<12?'M-4-3L1-5L5-1L2 4L-4 2Z':'M-6-2Q0-7 6-2L2 4Q-3 2-6-2Z',i<12?'#805133':'#cda578','#65432f',.6);}
  }
  for(const[x,y]of[[228,9],[279,17],[230,64],[282,72],[297,12]])ellipse(a,x,y,1.6,1.6,C.silver,C.ink,.5);
  return true;
}
