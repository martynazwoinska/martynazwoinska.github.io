// JU1375 only. Existing accessory families and saved transforms remain stable.
export const VINE='ju1375-vanilla-vine-wrap', JUICE='ju1375-sugarcane-juice', GECKO='ju1375-bourbon-green-gecko-companion';
export const add=(g,tag,attrs={})=>{const n=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const [k,v] of Object.entries(attrs))n.setAttribute(k,v);g.appendChild(n);return n;};
const ink='#355749';
const path=(g,d,fill='none',stroke=ink,w=2,attrs={})=>add(g,'path',{d,fill,stroke,'stroke-width':w,'stroke-linecap':'round','stroke-linejoin':'round',...attrs});
const oval=(g,x,y,rx,ry,fill,attrs={})=>add(g,'ellipse',{cx:x,cy:y,rx,ry,fill,...attrs});
function leaf(g,x,y,angle,size=1){
  const n=add(g,'g',{transform:`translate(${x} ${y}) rotate(${angle}) scale(${size})`,'data-vanilla-leaf':''});
  path(n,'M0 0C-19-9-20-31-5-47C12-37 21-12 0 0Z','#508a5b','#315e43',1.7);
  path(n,'M0-3Q-6-22-5-41','none','#b1c987',1.2);path(n,'M-3-15L7-25M-5-26L-13-30','none','#8faf6e',.7);
}
function flower(g,x,y,size=1,angle=0){
  const n=add(g,'g',{transform:`translate(${x} ${y}) rotate(${angle}) scale(${size})`});
  const petals=add(n,'g',{'data-vanilla-petals':''});
  for(const a of [-8,68,143,215,289])path(add(petals,'g',{transform:`rotate(${a})`}), 'M-3 0C-14-16-10-35-3-42C8-33 14-13 3 0Z','#e0e7ad','#6c8757',1.3);
  path(n,'M-8-7Q0-16 9-6C15 4 14 16 2 24C-12 20-16 8-8-7Z','#fff1c6','#7d8755',1.5);
  path(n,'M-5-4Q0-9 6-3L8 12Q0 20-6 11Z','#d4c76b','#a99d4e',.9);
  path(n,'M-2 0L-2 11M2-1L3 11M6 2L6 9','none','#fff3ba',.9);
  oval(n,0,-4,3,4,'#f6ebac');
}
function vine(g,male){
  // Undo only the default art transform: user drag/size remains on the parent.
  const fit=add(g,'g',{transform:male?'scale(2.38095238) rotate(-19) translate(-93 -172)':'scale(1.92307692) rotate(-18) translate(-271 -183)'});
  const n=add(fit,'g',{transform:male?'translate(-28 82) scale(.43)':''});
  if(male){
    path(n,'M284 104Q264 119 244 118','none','#476f45',4);
    leaf(n,274,111,65,.66);
    path(n,'M256 136Q274 159 254 179Q251 184 249 179Q264 158 251 136Z','#63533c','#3f4c34',1.4);
    path(n,'M256 142Q265 158 253 176','none','#bc9f68',1);
    flower(n,253,125,.75,-25);return;
  }
  const d=male?'M299 101C282 124 247 101 244 126C240 148 213 130 209 154C207 174 180 164 181 192':'M302 102C277 132 251 101 243 130C235 156 210 130 204 161C198 184 176 170 179 206';
  path(n,d,'none','#244e3a',6);path(n,d,'none','#79a360',3);
  for(const [x,y,a,s] of male?[[271,115,55,.61],[223,145,-65,.54],[186,181,-42,.51]]:[[273,115,58,.63],[228,143,-62,.64],[185,188,-35,.62]])leaf(n,x,y,a,s);
  const pods=add(n,'g',{'data-vanilla-pods':''});
  for(const [x,y,b] of male?[[257,137,-8]]:[[252,143,8],[264,140,14]]){
    path(pods,`M${x} ${y}C${x+b} ${y+15} ${x+b-3} ${y+30} ${x-7} ${y+40}Q${x-11} ${y+42} ${x-10} ${y+37}C${x+b-8} ${y+20} ${x+b-5} ${y+8} ${x-3} ${y}Z`,'#63533c','#3f4c34',1.1);
    path(pods,`M${x-2} ${y+4}Q${x+b-2} ${y+23} ${x-7} ${y+36}`,'none','#bc9f68',.9);
  }
  flower(n,male?255:261,male?123:124,male?.64:.63,male?-28:8);
  path(n,male?'M208 155Q194 139 189 151Q185 157 192 161':'M200 168Q184 151 180 163Q180 171 187 168','none','#779658',1.8);
}
export function juiceLevel(g,male,fraction){
  const bottom=male?60:72,top=male?-22:-45,y=bottom-(bottom-top)*fraction;
  const fill=g.querySelector('[data-juice-fill]');fill.setAttribute('y',y);fill.setAttribute('height',bottom-y+10);
  g.querySelector('[data-juice-surface]').setAttribute('cy',y);
}
function juice(g,male){
  const w=male?54:65,top=male?-46:-76,bottom=male?65:78;
  const outline=`M${-w} ${top}Q0 ${top-15} ${w} ${top}L${w-9} ${bottom}Q0 ${bottom+18} ${-w+9} ${bottom}Z`;
  oval(g,0,bottom+14,w+9,8,'#233e39',{opacity:.15,'data-juice-shadow':''});
  const cup=add(g,'g',{'data-juice-cup':''});
  if(male){path(cup,'M51-25C100-40 98 36 54 35L56 22C79 20 83-13 54-12Z','#cce1d2','#668b7a',3);path(cup,'M64-18Q85-19 80 8','none','#f1f6dd',2);}
  path(cup,outline,'#d8e6d6','#486c60',3,{'fill-opacity':.3});
  const clipId='ju1375-glass-'+(male?'male':'primary');
  add(add(add(cup,'defs'),'clipPath',{id:clipId}),'path',{d:outline});
  const content=add(cup,'g',{'clip-path':`url(#${clipId})`});
  add(content,'rect',{x:-w,y:0,width:w*2,height:1,fill:'#d8c875','fill-opacity':.92,'data-juice-fill':''});
  oval(content,0,0,w,9,'#edf0ac',{'data-juice-surface':'',stroke:'#b0ad62','stroke-width':1.8});
  path(content,`M${-w+10} ${top+12}L${-w+18} ${bottom-3}`,'none','#fffdec',6,{opacity:.5});
  path(content,`M${w-10} ${top+6}L${w-17} ${bottom-4}`,'none','#719c91',2,{opacity:.5});
  const stir=add(cup,'g',{'data-juice-stirrer':''});
  const caneTop=male?-100:-126;
  path(stir,`M25 ${caneTop}L40 ${bottom-9}`,'none','#476748',13);
  path(stir,`M22 ${caneTop}L37 ${bottom-9}`,'none','#9fb065',7);
  for(let y=caneTop+18;y<bottom-10;y+=32){const x=25+(y-caneTop)/(bottom-9-caneTop)*15;path(stir,`M${x-5} ${y}L${x+5} ${y-1}`,'none','#d6d68a',3);}
  oval(stir,25,caneTop,6,3,'#e3dda3',{stroke:'#617849','stroke-width':1.5});
  const strawTop=male?-115:-144;
  path(cup,`M-7 ${bottom-12}L-19 ${strawTop+18}Q-20 ${strawTop+6}-8 ${strawTop+3}L21 ${strawTop}`,'none','#537d78',7);
  path(cup,`M-9 ${bottom-12}L-21 ${strawTop+18}Q-22 ${strawTop+4}-8 ${strawTop+1}L20 ${strawTop-2}`,'none','#d0e3c5',2);
  path(cup,`M${-w} ${top}Q0 ${top+17} ${w} ${top}`,'none','#eef6dc',3.5);
  path(cup,`M${-w+9} ${bottom}Q0 ${bottom+18} ${w-9} ${bottom}`,'none','#d7e4c6',5);
  for(const [x,y] of male?[[-35,0],[-23,29],[33,47]]:[[-47,-18],[-39,17],[40,34],[-18,53]]){oval(cup,x,y,2.6,4.5,'#edf6d7',{opacity:.8});}
  juiceLevel(g,male,0);
}
function press(g){
  oval(g,0,84,127,13,'#193d37',{opacity:.16});
  // Feet and cast frame, shallow collecting tray, guarded twin rollers.
  path(g,'M-67 24L-74 73L-89 78L-89 84L-51 84L-48 40M49 21L69 73L89 77L89 84L54 84L32 38','#416c5e',ink,3);
  path(g,'M-91 72L88 72L103 83L-98 83Z','#b28b5a','#5d634d',2.5);
  path(g,'M-74 3L54 3L39 43L-50 43Z','#b8c9ba','#466a60',2.5);
  path(g,'M-50 34L-43 52L-70 65L-78 56L-58 45Z','#d9e2d1','#466a60',2.5);
  path(g,'M-76 4Q-5 20 52 4','none','#eef0da',3);
  path(g,'M-61 18L-61-70Q-61-80-50-80L45-80Q57-80 57-67L57 22L42 22L42-61L-46-61L-46 18Z','#4b7862','#2b5041',3);
  for(const x of [-51,47]){path(g,`M${x} -76L${x} -93`,'none','#617f6a',7);path(g,`M${x-11} -93L${x+11} -93`,'none','#c6ccaa',5);}
  const feed=add(g,'g');const cane=add(feed,'g',{'data-press-cane':''});
  path(cane,'M-161-29L4-29','none','#536f44',15);path(cane,'M-161-32L4-32','none','#bdd18a',5);
  for(const x of [-142,-107,-72,-37])path(cane,`M${x} -37L${x} -22`,'none','#e0d794',3);
  oval(cane,-161,-29,3,7,'#e6d59f',{stroke:'#71865b','stroke-width':1.5});
  // The feed cane disappears inside the housing, not through the metal frame.
  const clip=add(add(add(g,'defs'),'clipPath',{id:'ju1375-feed-clip'}),'rect',{x:-185,y:-46,width:190,height:34});
  feed.setAttribute('clip-path','url(#ju1375-feed-clip)');
  for(const y of [-48,-12]){
    path(g,`M-40 ${y-13}L29 ${y-13}Q44 ${y} 29 ${y+13}L-40 ${y+13}Z`,'#c7d6c6','#425f53',2);
    path(g,`M-35 ${y-7}L30 ${y-7}`,'none','#f2efda',3);
    const roller=add(g,'g',{'data-press-roller':y,transform:`translate(32 ${y})`});
    oval(roller,0,0,15,14,'#729789',{stroke:'#35584c','stroke-width':2});
    for(const a of [0,60,120])path(roller,'M-10 0L10 0','none','#c8dac2',2,{transform:`rotate(${a})`});
    oval(roller,0,0,4,4,'#c4b97b');
  }
  path(g,'M-48-67L-48 20M44-68L44 21','none','#304e41',7);
  const crank=add(g,'g',{'data-press-crank':'',transform:'translate(66 -13)'});
  oval(crank,0,0,29,29,'none',{stroke:'#c6ac6d','stroke-width':6});
  for(const a of [0,120,240])path(crank,'M0 0L26 0','none','#d4c393',4,{transform:`rotate(${a})`});
  oval(crank,0,0,6,6,'#ddc99b',{stroke:'#426153','stroke-width':2});
  path(crank,'M0 0L29 25L43 25','none','#557b68',7);
  path(crank,'M43 17L43 35','none','#bd9360',10);path(crank,'M41 19L41 31','none','#e0bd82',2);
  for(const [x,y] of [[-53,-69],[49,-69],[-55,15],[48,15]])oval(g,x,y,3,3,'#dbc998');
}
function foot(g,x,y,angle,far){
  const n=add(g,'g',{transform:`translate(${x} ${y}) rotate(${angle})`,'data-gecko-foot':far?'far':'near'});
  path(n,'M0 0Q12 1 16 13L10 23','none',far?'#367c51':'#4b9a59',9);
  path(n,'M1-1Q12 1 14 12L9 21','none',far?'#62a263':'#93be6a',3);
  for(let i=0;i<5;i++){const tx=-4+i*6,ty=29+Math.sin(i*.8)*5;path(n,`M10 21Q${tx} 22 ${tx} ${ty}`,'none',far?'#3a8051':'#5a9955',2.3);oval(n,tx,ty,2.5,3.3,far?'#7ab674':'#b0ce81',{stroke:'#3f7c4a','stroke-width':.8});}
}
function gecko(g,male){
  const n=add(g,'g',{'data-gecko-motion':''});
  const body=add(n,'g',{transform:male?'rotate(-12)':''});
  const tail=add(body,'g',{'data-gecko-tail':''});
  path(tail,male?'M-35 3C-78 17-83 63-111 57C-133 48-116 23-108 31C-118 37-119 48-108 49C-86 48-86 1-35-8Z':'M-37 8C-66 12-86 47-113 48C-145 48-151 15-131-1C-140 20-129 36-112 34C-90 32-74-2-37-10Z','#65a660','#355d43',2.4);
  path(tail,male?'M-43 2Q-80 16-90 43':'M-46 4Q-80 13-100 36','none','#bed27e',2);
  foot(body,-25,-15,165,true);foot(body,36,-16,210,true);
  path(body,male?'M-45-14C-28-33 10-28 38-17L50-3C26 17-17 20-42 10Z':'M-52-17C-33-39 17-34 45-19L58-5C31 24-14 26-49 12Z','#4f9f55','#234e3c',3.1);
  path(body,male?'M-35 9Q3 20 37-5':'M-41 11Q4 28 45-5','none','#c4d485',6);
  for(const [x,y,a] of male?[[-23,-16,10],[-4,-12,-20],[17,-10,20]]:[[-29,-21,0],[-8,-22,15],[15,-17,-10],[1,-3,20]])path(add(body,'g',{transform:`translate(${x} ${y}) rotate(${a})`}), 'M-5-2Q0-7 7-1L3 4Q-2 2-5 3Z','#b94a40','none');
  path(body,male?'M-28 3Q0 9 30-4':'M-38 4Q0 15 37-2','none','#7ebdb2',3);
  const head=add(body,'g',{'data-gecko-head':''});
  path(head,male?'M28-19Q43-34 64-27L86-12Q91-6 84 0L62 10Q42 11 32-2Z':'M37-21Q57-43 80-28L106-10Q112-2 99 5L75 12Q52 15 39-1Z','#76b85e','#234e3c',2.8);
  path(head,male?'M58-14L83-10':'M70-13L102-8','none','#b75b4b',3.5);
  path(head,male?'M60 3Q74 5 85-3':'M73 5Q91 8 104-2','none','#355d43',1.5);
  const ex=male?58:72,ey=male?-18:-21;
  oval(head,ex,ey,male?8:10,male?8:10,'#dcbd62',{stroke:'#396246','stroke-width':2});
  oval(head,ex+1,ey,4.4,4.7,'#183d36');oval(head,ex-1,ey-2,1.6,1.8,'#f6f4cd');
  oval(head,male?83:103,-7,1.7,1.5,'#385b3c');
  path(head,male?'M49-27Q60-32 70-25':'M60-32Q72-39 86-27','none','#b2d587',2);
  foot(body,male?-24:-31,7,18,false);foot(body,male?28:37,5,-55,false);
  path(body,male?'M-35-18Q-5-29 23-19':'M-39-24Q-4-38 31-24','none','#bdd48a',2);
}
export function drawReunionJU1375(g,family,male){
  if(![VINE,JUICE,GECKO].includes(family))return false;
  g.setAttribute('style','transform-box:view-box;transform-origin:0 0');
  if(family===VINE)vine(g,male);else if(family===JUICE){if(male)juice(g,true);else press(g);}else gecko(g,male);
  return true;
}
