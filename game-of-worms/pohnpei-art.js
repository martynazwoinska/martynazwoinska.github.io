// Original drawings. Construction and species references: the QG4739 dossier.
const NS='http://www.w3.org/2000/svg';
export const OPTICS='qg4739-birdwatching', BIRD='qg4739-lorikeet-perch', CAPE='qg4739-camouflage-cape';
export const pohnpeiLayouts={
  [OPTICS]:{primary:[355,112,.68,-12],companion:[150,113,.52,-10]},
  [BIRD]:{primary:[-10,42,.63,0]},
  [CAPE]:{primary:[0,0,1,0],companion:[-28,82,.43,0]}
};
export const add=(p,t,a={})=>{const n=document.createElementNS(NS,t);for(const[k,v]of Object.entries(a))n.setAttribute(k,v);p.appendChild(n);return n;};
export const path=(p,d,fill='none',stroke='#293d41',width=1.5)=>add(p,'path',{d,fill,stroke,'stroke-width':width,'stroke-linecap':'round','stroke-linejoin':'round'});
const ellipse=(p,x,y,rx,ry,fill,stroke='#293d41',width=1.5)=>add(p,'ellipse',{cx:x,cy:y,rx,ry,fill,stroke,'stroke-width':width});
const rect=(p,x,y,w,h,fill,rx=3,stroke='#293d41',width=1.5)=>add(p,'rect',{x,y,width:w,height:h,rx,fill,stroke,'stroke-width':width});
let serial=0;
function glass(p,x,y,r){
  ellipse(p,x,y,r+4,r+4,'#cad4cf');
  ellipse(p,x,y,r,r,'#284a51','#1d3038',2);
  const id='pohnpei-lens-'+(++serial),defs=add(p,'defs'),clip=add(defs,'clipPath',{id});
  add(clip,'circle',{cx:x,cy:y,r:r-1});
  const frame=add(p,'g',{'clip-path':'url(#'+id+')','data-pohnpei-lens':'','data-lens-x':x,'data-lens-y':y,'data-lens-r':r,'pointer-events':'none'});
  const f=add(frame,'foreignObject',{'aria-hidden':'true',x:x-r,y:y-r,width:2*r,height:2*r,'pointer-events':'none'});
  add(f,'svg',{xmlns:NS,width:2*r,height:2*r,viewBox:'0 0 '+2*r+' '+2*r,
    style:'display:block;width:'+2*r+'px;height:'+2*r+'px;overflow:hidden'});
  path(p,'M'+(x-r*.64)+' '+(y-r*.26)+'Q'+(x-r*.42)+' '+(y-r*.70)+' '+(x+r*.18)+' '+(y-r*.65),'none','#e5f7e8',2.5).setAttribute('opacity','.52');
  path(p,'M'+(x+r*.6)+' '+(y+r*.22)+'L'+(x+r*.35)+' '+(y+r*.52),'none','#79bab7',1.2);
}
function binoculars(p){
  // Two parallel roof-prism barrels, narrower eyecups, central hinge and focus wheel.
  path(p,'M-40-32C-69-39-77 38-53 74Q-13 108 28 74C53 42 60 10 46-28','none','#253739',6);
  path(p,'M-40-32C-68-36-73 37-50 70Q-13 101 25 71','none','#9caa96',2);
  for(const x of[-32,32]){
    path(p,'M'+(x-15)+' -34L'+(x-25)+' 12Q'+x+' 36 '+(x+25)+' 12L'+(x+15)+' -34Z','#405757');
    rect(p,x-14,-43,28,18,'#273b42',5);
    path(p,'M'+(x-10)+'-39H'+(x+10),'none','#bdc9bd',1.6);
    path(p,'M'+(x-18)+' -13L'+(x-21)+' 7','none','#788d83',3);
    path(p,'M'+(x+12)+' -19L'+(x+17)+' 1','none','#172d35',4);
    glass(p,x,17,25);
    for(let j=0;j<4;j++)path(p,'M'+(x-12+j*7)+' -26l-1 9','none','#97a693',.8);
  }
  path(p,'M-18-21Q0-29 18-21L19-6Q0-13-19-6Z','#7f9085');
  rect(p,-8,-28,16,26,'#223840',4);
  for(let y=-24;y<-5;y+=4)path(p,'M-6 '+y+'H6','none','#a2b4ac',1);
  ellipse(p,0,4,6,6,'#bbc5b6');
  ellipse(p,0,4,2,2,'#6d817b','none');
}
function scope(p){
  // A side-view angled eyepiece and a large forward objective, on a compact folding tripod.
  path(p,'M-5 24L-24 71M-5 24L20 69M-5 24L-1 77','none','#253942',4);
  path(p,'M-5 24L-24 71M-5 24L20 69','none','#b9c5bd',1.5);
  path(p,'M-27 72h8M17 70h8M-5 78h8','none','#213840',3);
  rect(p,-13,17,17,11,'#536865',3);
  path(p,'M-40-16L30-28Q51-25 54-8L34 20L-35 5Z','#4d6868');
  path(p,'M-35-12L30-22Q43-21 47-11','none','#a6bbb0',3);
  path(p,'M-34 3L30 15','none','#263e45',4);
  path(p,'M-39-14L-54-34L-69-29L-51-5Z','#344c56');
  path(p,'M-66-34L-53-39L-48-28L-64-21Z','#233840');
  path(p,'M-62-31L-54-34','none','#d2d9cc',2);
  rect(p,-6,-31,17,13,'#263b43',3);
  for(let x=-3;x<9;x+=3)path(p,'M'+x+'-29v8','none','#aabdb0',1);
  // Three-quarter objective ring keeps the usable window generous on a phone.
  glass(p,38,-1,27);
  path(p,'M15 21l8 4','none','#b8c7b7',2);
}
export function drawBirdPerch(p){
  // A forked branch with two footholds. The bird starts on the left fork.
  path(p,'M-180 84Q-39 52 26 42Q76 39 133 11','none','#3b4434',7);
  path(p,'M-180 82Q-32 50 27 40Q86 33 132 9','none','#9c9970',2);
  path(p,'M-54 55Q-51 21-72 3M63 34Q81 8 73-11','none','#526044',3);
  for(const [x,y,s]of[[-70,5,-1],[75,-7,1],[106,23,1]]){
    const leaf=add(p,'g',{transform:'translate('+x+' '+y+') scale('+s+' 1)'});
    path(leaf,'M0 0Q-15-22-35-16Q-25 8 0 0Z','#57734e','#364f3d',1);
    path(leaf,'M0 0Q-18-9-31-14','none','#a4b482',1);
  }
  const bird=add(p,'g',{'data-pohnpei-performer':''});drawLorikeet(bird);
}
function cape(p,male){
  const id='pohnpei-cape-'+(++serial),defs=add(p,'defs');
  const d=male?'M282 94Q245 85 217 102Q193 115 181 140L207 158Q232 132 274 140L291 111Z'
    :'M285 88Q238 76 202 111Q174 143 163 184L194 211Q211 158 248 143Q271 140 287 127L299 106Z';
  const clip=add(defs,'clipPath',{id});path(clip,d,'white','none');
  path(p,d,male?'#aeb895':'#91a68a','#314f48',1.8).dataset.pohnpeiCapeCloth='';
  const pattern=add(p,'g',{'clip-path':'url(#'+id+')'});
  for(const[x,y,angle]of(male?[[221,103,-24],[257,123,30],[195,135,-12]]:[[235,105,17],[198,135,-25],[180,174,14],[236,153,30],[277,99,-18]])){
    const leaf=add(pattern,'g',{transform:'translate('+x+' '+y+') rotate('+angle+')'});
    path(leaf,'M0 14Q-22 0-11-17Q8-11 0 14Z',male?'#728c77':'#536f5e','none');
    path(leaf,'M0 14Q-9 0-11-14','none',male?'#b8c4a0':'#9fb28d',1);
  }
  if(male){
    path(p,'M184 138Q198 150 208 153Q235 128 275 136','none','#d9d9b9',2.2);
    path(p,'M217 111Q205 126 204 137M242 109Q227 127 229 134','none','#778b74',1.5);
    path(p,'M270 100Q280 107 292 102L286 119Q278 119 270 110Z','#dbdbc0');
    path(p,'M273 112L279 124','none','#51494f',2);
    ellipse(p,279,122,3,2,'#b7916b');
  }else{
    path(p,'M165 181L176 198Q185 200 193 207Q214 157 247 143','none','#d6d8b2',3);
    path(p,'M214 108Q191 138 183 177M242 99Q215 125 208 150M267 100Q249 115 242 130','none','#5b7963',1.7);
    path(p,'M282 89Q293 88 301 103L286 121L273 111Z','#d2d7b6','#425e50',1.2);
    path(p,'M278 109Q283 120 292 118','none','#5b5555',2.3);
    ellipse(p,289,117,3,2,'#b69064');
    path(p,'M177 198L185 204L180 207Z','#785c6b','#47594d',.8);
  }
}
export function drawLorikeet(p){
  // Maroon head/body, olive remiges, yellow tail tip, hooked bill and grasping toes.
  path(p,'M-11 26L-23 83Q-15 81-10 68L3 34Z','#8b8650','#3b4537',1.2);
  path(p,'M-18 68L-23 83Q-15 81-10 68Z','#d8c876','#716b44',.7);
  path(p,'M-8 31C-37 4-30-24-16-39C-9-60 19-61 27-41Q39-26 23-13Q27 9 11 34Z','#783d4a','#352e37',1.5);
  path(p,'M-16-39Q-1-59 19-48Q25-45 27-36Q13-27 4-29Q-5-29-9-22Z','#542f3b','none');
  const folded=add(p,'g',{'data-bird-folded-wing':''});
  path(folded,'M-16-21Q-35-11-17 27L-5 50Q10 18 5-7Q-3-24-16-21Z','#776f47','#453e37',1.2);
  path(folded,'M-20-13Q-12-22-4-12Q4 2-7 35Q-20 22-24 4Z','#854a50','none');
  for(const[x,y]of[[-15,-8],[-11,0],[-7,9]])path(folded,'M'+x+' '+y+'Q'+(x+4)+' '+(y+10)+' '+(x+1)+' '+(y+27),'none','#b8b278',1);
  for(const[x,y]of[[8,-13],[11,-2],[9,10],[6,22]])path(p,'M'+x+' '+y+'q7 3 11-1','none','#a36160',1);
  path(p,'M21-40Q39-45 37-28L30-17Q32-31 23-28Z','#e3b35e','#453c36',1);
  path(p,'M31-31L34-26L29-21Z','#33323a','none').setAttribute('data-bird-bill','');
  ellipse(p,14,-40,3.8,4,'#c8b36e','#49383c',.8);
  ellipse(p,14.5,-40,2,2.7,'#202e31','none');
  ellipse(p,13.6,-41.3,.8,.8,'#f9ecd4','none');
  const feet=add(p,'g',{'data-bird-feet':''});
  path(feet,'M1 29L8 40M11 30L17 39','none','#b2ae9a',3);
  path(feet,'M8 40q-7-3-8 3m8-3q3 7 7 1m2-2q-5-2-6 3m6-3q5 5 8 1','none','#4b514b',2.2);
  const wing=add(p,'g',{'data-bird-flight-wing':'',opacity:0});
  path(wing,'M-17-16Q-50-47-95-56L-89-35L-76-28L-76-15L-61-10L-58 1L-43 4Q-20 17-4 21Z','#7c784c','#403d34',1.5);
  path(wing,'M-17-16Q-50-36-84-46Q-55-5-14 12Z','#854a50','none');
  for(let i=0;i<5;i++)path(wing,'M'+(-32-i*10)+' '+(-15-i*6)+'l'+(-7+i)+' '+(20-i),'none','#b4af77',1.2);
}
export function drawPohnpeiAccessory(p,item,male){
  if(![OPTICS,BIRD,CAPE].includes(item.family))return false;
  p.dataset.renderer=item.family;
  p.setAttribute('style','transform-box:view-box;transform-origin:0 0');
  if(item.family===OPTICS)(male?scope:binoculars)(p);
  if(item.family===BIRD)drawBirdPerch(p);
  if(item.family===CAPE)cape(p,male);
  return true;
}
