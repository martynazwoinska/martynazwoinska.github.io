// Original drawings. Construction references are recorded in the Oʻahu dossier.
import {add,path,C} from './oahu-bike-art.js?v=20260909-bike-1';
export const TASTING='eca789-chocolate-tasting';
export const chocolateLayouts={
  [TASTING]:{primary:[435,70,.88,9],companion:[32,75,.80,-7]}
};
const group=(g,k,a={})=>add(g,'g',{'data-choc-part':k,...a});
const line=(g,d,s,w=1)=>path(g,d,'none',s,w);
const ellipse=(g,x,y,rx,ry,f,s=C.ink,w=1)=>add(g,'ellipse',{cx:x,cy:y,rx,ry,fill:f,stroke:s,'stroke-width':w});
const cocoa='#633b2e',edge='#3e2b27',shine='#b67b53',ivory='#fff3da';
function tile(g,x,y,w,h){
  const t=add(g,'g',{transform:`translate(${x} ${y})`});
  path(t,`M0 0H${w}V${h}H0Z`,edge,edge,.6);
  path(t,`M2 1H${w-2}L${w-4} 4H4Z`,shine,'none');
  path(t,`M2 1L4 4V${h-4}L2 ${h-1}Z`,'#a06a48','none');
  path(t,`M4 4H${w-4}V${h-4}H4Z`,cocoa,'none');
  line(t,`M5 5H${w-5}`,'#bf8a5b',.65);
}
function macadamia(g,x,y,s=1,cut=false){
  const n=add(g,'g',{transform:`translate(${x} ${y}) scale(${s})`});
  path(n,'M-14 4Q-16-9-5-14Q7-20 14-8Q19-1 14 7Q0 14-14 4Z',cocoa,edge,1.2);
  path(n,'M-11-4Q-6-13 4-12Q-2-7-11-4Z','#bc8051','none');
  if(cut){
    path(n,'M-10-7Q-2-17 9-10Q18-4 10 7Q0 12-10 3Z','#f4dca7',edge,1.5);
    path(n,'M-6-5Q2-12 8-5Q12 1 6 5Q1 7-5 1Z','#fff2cf','#d4b778',.7);
    line(n,'M-1-7Q4-4 2 4','#d9bc82',.8);
  }else line(n,'M-8-6Q-3-11 3-10','#c0885c',1.2);
  return n;
}
function bar(g){
  const a=group(g,'bar',{transform:'rotate(-8)'});
  path(a,'M-31-57H-1V-33H29L34-28V53H-31Z',edge,edge,1.7);
  path(a,'M29-33L34-28V53L29 49Z','#382725',edge,.7);
  for(let row=0;row<4;row++)for(let col=0;col<2;col++)if(row||!col)tile(a,-28+col*28,-54+row*23,26,21);
  // The detached corner travels to the mouth. It is part of the original top row.
  const bite=group(a,'bite',{transform:'translate(0 -54)'});
  tile(bite,0,0,26,21);bite.dataset.chocBiteOrigin='0,-54';
  const cut=group(a,'cut',{opacity:0});line(cut,'M0-33L5-35L9-32L13-35L19-33L23-35L28-33',shine,1);
  // Folded silver foil has a torn top edge and a separate paper sleeve.
  path(a,'M-34 2L-27-1L-19 4L-11 0L-3 6L7 1L16 5L26 0L33 3V54H-34Z','#d8e1df',C.ink,1.1);
  path(a,'M-34 2L-24 13L-29 29L-18 37L-31 52M33 3L22 18L29 27L20 45L30 53','none','#92a6aa',1.2);
  path(a,'M-25 6L-17 11L-12 6L-4 12L6 6L14 12L22 7','none','#fffefa',2.2);
  const wrapper=group(a,'wrapper');
  path(wrapper,'M-35 23L32 23L34 60L-32 63Z','#2d7277',C.ink,1.4);
  path(wrapper,'M-35 23L-29 29L-27 59L-32 63Z','#225b64','none');
  path(wrapper,'M-24 30H23V54H-24Z','none','#cbb173',.8);
  // One restrained cacao-pod embossing, no invented producer branding.
  path(wrapper,'M-3 35Q8 35 12 44Q8 54-3 53Q-14 50-14 42Q-12 36-3 35Z','#d8bf7d','#214951',.8);
  line(wrapper,'M-11 42Q-1 37 8 44M-11 44Q0 48 9 45','#927549',.7);
  return a;
}
function tasting(g,small){
  if(!small){bar(g);return;}
  ellipse(g,0,20,42,8,'#203d3530','none');
  path(g,'M-43 1Q0-14 44 0L39 20Q0 38-38 22Z','#97b5b7',C.ink,1.4);
  ellipse(g,0,1,44,19,ivory,C.ink,1.4);
  ellipse(g,0,1,36,13,'#f6dfb8','#bc9b64',.9);
  macadamia(g,-20,-5,.8);
  macadamia(g,-3,7,.82,true);
  const bite=group(g,'bite',{transform:'translate(18 -2)','data-choc-bite-origin':'18,-2'});macadamia(bite,0,0,.8);
  group(g,'cut',{opacity:0});
}
export function drawOahuChocolate(g,item,small){
  if(item.family!==TASTING)return false;
  const a=group(g,'art',{'data-chocolate-art':small?'male':'hermaphrodite'});
  tasting(a,small);
  return true;
}
