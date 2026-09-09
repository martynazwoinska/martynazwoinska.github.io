// Original gift constructions. References and material palette: Oʻahu dossier.
import {add,path,C} from './oahu-bike-art.js?v=20260909-bike-1';
export const GIFTS='eca789-chocolate-gifts';
export const giftLayouts={[GIFTS]:{primary:[435,234,.92,6]}};
const P={ink:C.ink,berry:'#944761',edge:'#64364b',rose:'#cc8fa3',gold:'#dbc181',foil:'#d2e0e4',silver:'#8199a5',white:'#fbfaf2',cocoa:'#633d30',dark:'#382b2b'};
const g=(p,part,attrs={})=>add(p,'g',{'data-gift-part':part,...attrs});
const line=(p,d,c=P.ink,w=1)=>path(p,d,'none',c,w);
function leafSprig(p,x,y,angle=0){
  const a=add(p,'g',{transform:`translate(${x} ${y}) rotate(${angle})`});
  line(a,'M-18 7Q-4-8 19-9',P.gold,.8);
  path(a,'M-11 2Q-18-10-5-7Q-4-1-11 2ZM1-5Q-3-16 7-13Q9-8 1-5ZM9-8Q18-18 22-12Q17-6 9-8Z',P.gold,'none');
}
function nut(p,x,y,cut=false){
  const a=add(p,'g',{transform:`translate(${x} ${y})`});
  path(a,'M-11 2Q-13-7-5-10Q5-15 12-5Q17 4 8 9Q-4 13-11 2Z',P.cocoa,P.dark,1);
  path(a,'M-8-4Q-3-10 4-8Q0-5-8-4Z','#c28c60','none');
  if(cut){path(a,'M-7-7Q2-13 9-5Q13 3 5 7Q-4 10-9 1Z','#edcf99',P.dark,.9);path(a,'M-5-5Q1-9 6-3Q10 3 3 5Q-3 6-5-5Z','#fff1d3','none');}
}
function boxParcel(p){
  // A shallow rigid box, inset liner and lifted slip lid, distinct from the bar.
  path(p,'M-40 20L39 20L47 31L-34 39Z','#35434b2b','none');
  path(p,'M-43-18L27-27L44-10L-25 1Z',P.white,P.ink,1.3);
  path(p,'M-38-16L25-23L38-10L-24-2Z',P.silver,P.edge,1);
  const inside=g(p,'inside');
  path(inside,'M-36-13L-22-16L-12-12L2-18L12-14L25-20L35-10L23-5L17-7L2-1L-8-5L-22 0Z',P.foil,P.silver,.7);
  line(inside,'M-30-12L-22-8L-12-12M1-15L10-10L23-16M-7-4L1-6L12-3',P.white,.8);
  nut(inside,-23,-13);nut(inside,0,-16);nut(inside,23,-11);nut(inside,-11,1);nut(inside,15,0,true);
  // Near-side walls occlude the contents below the rim.
  path(p,'M-43-18L-25 1V33L-43 13Z','#cabfc1',P.ink,1.3);
  path(p,'M-25 1L44-10V22L-25 33Z','#e3d7d7',P.ink,1.3);
  line(p,'M-23 4L40-6M-22 29L40 19','#aa7c85',.9);
  const lid=g(p,'lid',{transform:'translate(-8 -40) rotate(-12)'});
  path(lid,'M-46-20L28-30L47-10L-27 2Z',P.berry,P.ink,1.4);
  path(lid,'M-46-20L-27 2V10L-46-11Z',P.edge,P.ink,1);
  path(lid,'M-27 2L47-10V-2L-27 10Z','#b36980',P.ink,1);
  line(lid,'M-39-19L26-27L40-11L-25-1Z',P.gold,.8);
  const print=add(lid,'g',{transform:'matrix(.78 -.10 .42 .44 -1 -13)'});leafSprig(print,0,0,-10);
  const ribbons=g(p,'ribbons');
  const loose=g(ribbons,'loose');
  path(loose,'M-14-14Q-36 5-54 18L-52 25Q-24 14-8-7Z',P.gold,P.edge,.8);
  path(loose,'M7-16Q30 3 54 10L52 17Q22 12 1-8Z',P.gold,P.edge,.8);
  const band=g(ribbons,'band',{opacity:0});
  path(band,'M-20-23L-12-24L6-3V29L-1 30V-1Z',P.gold,P.edge,.8);
  path(band,'M-34-8L37-19L42-13L-29-2V8L-35 2Z',P.gold,P.edge,.8);
  const bow=g(ribbons,'bow',{opacity:0});
  path(bow,'M-1-15Q-22-39-29-25Q-30-13-4-11Q-15-29-24-25M2-16Q24-36 30-23Q31-10 4-11Q17-26 25-24',P.gold,P.edge,1.1);
  path(bow,'M-3-10L-19 5L-16 12L-8 8L2-9L13 3L24 1L10-13Z',P.gold,P.edge,.9);
  path(bow,'M-6-18Q0-21 7-17L6-9Q0-6-5-10Z','#f1dca1',P.edge,1);
  line(bow,'M-23-24Q-13-25-5-15M24-24Q15-24 6-16','#fff0c4',1.2);
}
export function drawOahuGift(parent,item,small){
  if(item.family!==GIFTS)return false;
  if(small)return true;
  const a=g(parent,'art',{'data-gift-art':'shared'});
  boxParcel(a);return true;
}
export function setGiftArt(a,wrap=0,open=0){
  const part=n=>a.querySelector(`[data-gift-part="${n}"]`),clamp=x=>Math.max(0,Math.min(1,x));
  const close=clamp((wrap-.1)*2.2)*(1-open);
  part('lid').setAttribute('transform',`translate(${-8*(1-close)} ${-40*(1-close)}) rotate(${-12*(1-close)})`);
  part('lid').setAttribute('opacity',1-clamp(open*1.6));
  part('loose').setAttribute('opacity',1-clamp((wrap-.35)*4));
  part('band').setAttribute('opacity',clamp((wrap-.35)*4)*(1-open));
  const tied=clamp((wrap-.68)*4);
  part('bow').setAttribute('opacity',tied*(1-open));
  part('bow').setAttribute('transform',`translate(0 ${-5*(1-tied)}) scale(${.65+.35*tied})`);
}
