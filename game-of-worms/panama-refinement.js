// Original QG2726 artwork. The painting and collection metadata are unchanged.
import { drawFlowerBait } from './panama-bait.js?v=20260907-bait-1';
import { drawLeafCutting } from './panama-leaf-cutting.js?v=20260908-leaf-1';
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
    p(f,'M-30 4Q-44-22-27-32Q-16-36-5-12Q-3-46 15-43Q34-37 21-8Q40-30 47-13Q50 2 27 19Z',blush,berry,1.6,{'data-panama-closed-petal':'M-14 4Q-25-18-14-30Q-7-37 0-27Q1-44 8-43Q22-35 13-23Q25-28 22-12Q23 8 13 19Z'});
    p(f,'M-31 0Q-13-11 6 0Q21-19 35-5Q31 25 4 28Q-23 27-31 0Z',ivory,berry,1.6,{'data-panama-closed-petal':'M-14-22Q-6-42 6-34Q13-43 19-25Q25 22 4 28Q-17 25-14-22Z'});
    p(f,'M-31 0Q-21 6-18 19Q-12 27 4 28Q-23 27-31 0Z',blush,'none',1.5,{'data-panama-closed-petal':'M-14-22Q-17-1-10 17Q-5 26 4 28Q-17 25-14-22Z'});
    const stamens=add(f,'g',{'data-panama-stamens':''});
    for(let i=0;i<15;i++) {
      const x=-24+i*4, y=-14-Math.sin(i/14*Math.PI)*15;
      l(stamens,`M4 12Q${x*.6} -3 ${x} ${y}`,berry,1.25);
      e(stamens,x,y,1.8,1.3,cream,gold,.6);
    }
    p(f,'M-20 6Q-12 17-3 20','none','#e6c9c1',1.5,{'data-panama-closed-petal':'M-8-20Q-14 6-3 20'});
    p(f,'M6-33Q-2-17 3 10','none',berry,1.3,{'data-panama-bud-seam':'',opacity:0});
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



export function drawPanamaRefinement(g,item,male) {
  if(!item.id.startsWith('tropicalis::Barro Colorado Island, Panama::')) return false;
  const draw={'qg2726-gustavia-flower-headpiece':flower,'qg2726-flower-bait':drawFlowerBait,'qg2726-leaf-cutting':drawLeafCutting}[item.family];
  if(!draw)return false;
  g.dataset.renderer=item.family;g.dataset.refinement='panama-20260906';draw(g,male);return true;
}
