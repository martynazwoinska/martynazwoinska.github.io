// Original drawings. Construction references are recorded in the Oʻahu dossier.
import {add,path,C} from './oahu-bike-art.js?v=20260909-bike-1';
export const MOULDS='eca789-chocolate-moulds',TASTING='eca789-chocolate-tasting';
export const chocolateLayouts={
  [MOULDS]:{primary:[435,240,.86,0],companion:[12,225,.82,-4]},
  [TASTING]:{primary:[435,70,.88,9],companion:[32,75,.80,-7]}
};
const group=(g,k,a={})=>add(g,'g',{'data-choc-part':k,...a});
const line=(g,d,s,w=1)=>path(g,d,'none',s,w);
const ellipse=(g,x,y,rx,ry,f,s=C.ink,w=1)=>add(g,'ellipse',{cx:x,cy:y,rx,ry,fill:f,stroke:s,'stroke-width':w});
const cocoa='#633b2e',edge='#3e2b27',shine='#b67b53',ivory='#fff3da';
function gradient(g,id,colors){
  const def=add(g,'defs'),v=add(def,'linearGradient',{id,x1:0,y1:0,x2:1,y2:.3,gradientUnits:'objectBoundingBox'});
  colors.forEach(([offset,color])=>add(v,'stop',{offset,'stop-color':color}));return 'url(#'+id+')';
}
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
function mould(g,small){
  const metal=gradient(g,small?'oc-metal-s':'oc-metal-p',[[0,'#7697a5'],[.28,'#f4f8f1'],[.57,'#adc5cc'],[1,'#607d8e']]);
  ellipse(g,0,46,small?59:72,7,'#263c3530','none');
  const tray=group(g,'tray',{transform:small?'translate(0 16)':'translate(0 19)'});
  // A clear thick-rimmed mould with a receding top plane and front wall.
  path(tray,'M-66 4L-36-24L61-10L42 25L-62 17Z','#cbe0dc',C.ink,1.4);
  path(tray,'M-66 4L-62 17L42 25L42 32L-62 24L-67 13Z','#84a9ae',C.ink,1.1);
  path(tray,'M42 25L61-10L63-1L44 32Z','#628991',C.ink,1);
  path(tray,'M-59 2L-34-18L52-7L36 18Z','#e4efdf','#faffee',1.2);
  const plane=add(tray,'g',{transform:'matrix(1 .125 -.68 .68 -33 -16)'});
  if(small){
    for(let r=0;r<2;r++)for(let c=0;c<3;c++){
      const x=3+c*26,y=2+r*23;
      path(plane,`M${x} ${y}h23v20h-23Z`,'#b1c9c5','#638b91',1);
      const fill=group(plane,'fill',{opacity:.55});tile(fill,x+2,y+2,19,16);
    }
  }else{
    path(plane,'M1 1H79V48H1Z','#afc8c7','#5b7e83',1);
    for(let r=0;r<2;r++)for(let c=0;c<3;c++){const fill=group(plane,'fill',{opacity:.17});tile(fill,3+c*25,3+r*22,23,20);}
  }
  line(tray,'M-64 4L-37-22L58-10M-59 20L37 28','#fcfff5',1.4);
  const tool=group(g,'tool',{'data-choc-tool-home':small?'translate(2 -21) rotate(-14)':'translate(-23 -45) rotate(-9)',transform:small?'translate(2 -21) rotate(-14)':'translate(-23 -45) rotate(-9)'});
  if(small){
    // Scraper: broad thin steel blade, rounded wooden handle, two flush rivets.
    path(tool,'M-32-1H32L28 25H-30Z',metal,C.ink,1.5);
    path(tool,'M-32-9Q-34-14-27-15H29Q35-14 33-8L31-1H-32Z','#b8804d',C.ink,1.2);
    line(tool,'M-26-11H26','#e4bc79',1.3);
    for(const x of[-24,23])ellipse(tool,x,-8,1.6,1.6,'#dbe5df',C.ink,.65);
    line(tool,'M-27 23H26','#eef5ee',1.1);
  }else{
    // Pouring bowl, open elliptical rim, visible wall thickness and chocolate surface.
    path(tool,'M-32-2Q-28 24 3 28Q28 25 34 4L40-4L28-9Z',metal,C.ink,1.5);
    ellipse(tool,0,-5,33,13,metal,C.ink,1.3);
    ellipse(tool,0,-5,28,9,cocoa,edge,.9);
    path(tool,'M-20-6Q-2-15 18-5Q3-9-12-4Z','#b87b51','none');
    path(tool,'M27-11L40-4L31 4','none','#f3f7e9',2);
    line(tool,'M-26 5Q-24 17-12 21','#f2f7ed',2.6);
  }
  const stream=group(g,'stream',{opacity:0});path(stream,'M0 0L0 0',cocoa,edge,.8);
}
export function drawOahuChocolate(g,item,small){
  if(![MOULDS,TASTING].includes(item.family))return false;
  const a=group(g,'art',{'data-chocolate-art':small?'male':'hermaphrodite'});
  if(item.family===MOULDS)mould(a,small);else tasting(a,small);
  return true;
}
