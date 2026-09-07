// Original QG2726 artwork. The painting and collection metadata are unchanged.
import { drawFlowerBait } from './panama-bait.js?v=20260907-bait-1';
const ink='#34484b', gold='#99733c', cream='#fff0bd';
const berry='#994e70', blush='#e7afbd', ivory='#faf0dc', teal='#487a71';
const add=(g,tag,attrs={})=>{
  const n=document.createElementNS('http://www.w3.org/2000/svg',tag);
  Object.entries(attrs).forEach(([k,v])=>n.setAttribute(k,v));
  g.appendChild(n);return n;
};
const p=(g,d,fill,stroke=ink,w=1.5,attrs={})=>add(g,'path',{d,fill,stroke,'stroke-width':w,'stroke-linecap':'round','stroke-linejoin':'round',...attrs});
const l=(g,d,stroke,w=1.5)=>p(g,d,'none',stroke,w);
const e=(g,x,y,rx,ry,fill,stroke=ink,w=1)=>add(g,'ellipse',{cx:x,cy:y,rx,ry,fill,stroke,'stroke-width':w});

function flower(g,male) {
  const worn=male?add(g,'g',{transform:'translate(-28 82) scale(.43)'}):g;
  // Attachment follows the crown of the head, above the eyes.
  p(worn,male?'M300 41Q323 13 346 36L342 40Q323 22 304 46Z':'M300 33Q324 12 345 35L341 40Q323 22 302 40Z',berry);
  const f=add(worn,'g',{'data-panama-flower':'',transform:male?'translate(307 15) rotate(-25) scale(.93 .78)':'translate(316 12) rotate(-14) scale(.69)'});
  p(f,'M9 16Q30 12 52 34Q28 46 9 16Z',teal);
  l(f,'M16 22L42 34','#88b398');
  if(male) {
    // A cup-shaped three-quarter bloom, not a reduced copy of the open flower.
    p(f,'M-30 4Q-44-22-27-32Q-16-36-5-12Q-3-46 15-43Q34-37 21-8Q40-30 47-13Q50 2 27 19Z',blush,berry,1.6);
    p(f,'M-31 0Q-13-11 6 0Q21-19 35-5Q31 25 4 28Q-23 27-31 0Z',ivory,berry,1.6);
    p(f,'M-31 0Q-21 6-18 19Q-12 27 4 28Q-23 27-31 0Z',blush,'none');
    for(let i=0;i<15;i++) {
      const x=-24+i*4, y=-14-Math.sin(i/14*Math.PI)*15;
      l(f,`M4 12Q${x*.6} -3 ${x} ${y}`,berry,1.25);
      e(f,x,y,1.8,1.3,cream,gold,.6);
    }
    l(f,'M-20 6Q-12 17-3 20','#e6c9c1',1.5);
  } else {
    const petals=[[-142,.88],[-93,1.02],[-43,.95],[3,.92],[49,1.03],[96,.9],[143,.94],[184,.87]];
    for(const [a,s] of petals) {
      const petal=add(f,'g',{'data-panama-petal':'',transform:`rotate(${a}) scale(${s})`});
      p(petal,'M-6 9C-22-1-37-26-26-38C-19-47-8-38-2-42C13-48 26-37 25-26C24-8 8 4-6 9Z',a%2?ivory:'#eed3ce',berry,1.1);
      p(petal,'M-6 9Q-14-5-20-24Q-10-16-4-9Q10-20 20-25Q15-5-6 9Z',blush,'none',0,{opacity:.45});
      l(petal,'M-2 0Q-7-15-9-30','#d9a4b0',1);
    }
    e(f,0,0,19,17,'#ae667e',berry,1);
    // Fine radiating filaments surround a recessed centre.
    for(let i=0;i<32;i++) {
      const a=i*Math.PI/16, r=25+(i%3)*3;
      const x=Math.cos(a)*r,y=Math.sin(a)*r*.87;
      l(f,`M${Math.cos(a)*10} ${Math.sin(a)*8}Q${x*.65} ${y*.65-2} ${x} ${y}`,i%2?ivory:blush,1.15);
      e(f,x,y,1.7,1.3,cream,gold,.45);
    }
    e(f,0,1,9,7,'#dcc497',berry,.8);
    e(f,0,1,3,2.5,teal,'none');
  }
}


function fan(g,male) {
  g=add(g,'g',{'data-panama-fan':''});
  const px=male?16:0,py=male?64:72;
  const angles=male?[-143,-123,-103,-83,-63,-43]:[-161,-143,-125,-107,-89,-71,-53,-35,-17];
  const r=male?137:151;
  const tips=angles.map(a=>[px+Math.cos(a*Math.PI/180)*r,py+Math.sin(a*Math.PI/180)*r]);
  for(let i=0;i<tips.length-1;i++) {
    const [x,y]=tips[i],[xx,yy]=tips[i+1],mx=(x+xx)/2,my=(y+yy)/2-3;
    const leaf=`M${px} ${py}L${x} ${y}Q${mx} ${my} ${xx} ${yy}Z`;
    p(g,leaf,i%2? '#dcdcca':ivory,teal,1.3);
    p(g,`M${px} ${py}L${mx} ${my}L${xx} ${yy}Z`,teal,'none',0,{opacity:.13});
    // Fine plot grid stays within each folded panel.
    const id=`panama-fan-${male?'male':'primary'}-${i}`;
    const clip=add(add(g,'defs'),'clipPath',{id});p(clip,leaf,'white','none');
    const print=add(g,'g',{'clip-path':`url(#${id})`});
    for(const f of [.40,.59,.77]) {
      const ax=px+(x-px)*f,ay=py+(y-py)*f,bx=px+(xx-px)*f,by=py+(yy-py)*f;
      l(print,`M${ax} ${ay}L${bx} ${by}`,teal,1.2);
    }
    l(print,`M${px+(mx-px)*.32} ${py+(my-py)*.32}L${mx} ${my}`,teal,1.1);
    if(i%2===0) {
      const tx=px+(mx-px)*.69,ty=py+(my-py)*.69;
      p(print,`M${tx} ${ty-8}Q${tx-9} ${ty-1} ${tx-5} ${ty+3}Q${tx} ${ty+7} ${tx+6} ${ty+2}Q${tx+9} ${ty-3} ${tx} ${ty-8}Z`,teal,'none');
      l(print,`M${tx} ${ty+3}V${ty+10}`,teal,1.6);
    }
    l(g,`M${x} ${y}Q${mx} ${my} ${xx} ${yy}`,teal,4);
  }
  for(const [x,y] of tips) {
    l(g,`M${px} ${py+4}L${x} ${y}`,gold,3);
    l(g,`M${px} ${py-6}L${px+(x-px)*.87} ${py+(y-py)*.87}`,cream,1.3);
  }
  e(g,px,py,9,9,berry,ink,2);e(g,px,py,3,3,cream,gold,1);
  l(g,`M${px-3} ${py+10}Q${px-24} ${py+28} ${px-45} ${py+27}`,berry,3);
  p(g,`M${px-78} ${py+18}H${px-28}V${py+41}H${px-78}Z`,'#d4e0de',ink,1.5);
  const t=add(g,'text',{x:px-53,y:py+34,fill:ink,'text-anchor':'middle','font-family':'sans-serif','font-size':11,'font-weight':700});t.textContent='50 HA';
}

export function drawPanamaRefinement(g,item,male) {
  if(!item.id.startsWith('tropicalis::Barro Colorado Island, Panama::')) return false;
  const draw={'qg2726-gustavia-flower-headpiece':flower,'qg2726-flower-bait':drawFlowerBait,'qg2726-bci-forest-census-map-fans':fan}[item.family];
  if(!draw)return false;
  g.dataset.renderer=item.family;g.dataset.refinement='panama-20260906';draw(g,male);return true;
}
