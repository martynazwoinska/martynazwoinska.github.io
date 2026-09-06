// Original QG2726 artwork. The painting and collection metadata are unchanged.
const ink='#34484b', wool='#d9ad59', gold='#99733c', cream='#fff0bd';
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
  const f=add(worn,'g',{transform:male?'translate(307 15) rotate(-25) scale(.93 .78)':'translate(316 12) rotate(-14) scale(.69)'});
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
      const petal=add(f,'g',{transform:`rotate(${a}) scale(${s})`});
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

function cape(g,male) {
  const c=male?add(g,'g',{transform:'translate(-28 82) scale(.43)'}):g;
  const silhouette=male
    ?'M315 91Q302 79 278 85Q239 83 220 103Q201 119 197 139Q195 149 208 143Q211 159 225 145Q234 158 246 139Q257 149 273 133Q286 138 295 129Q316 125 329 105Z'
    :'M315 91Q297 80 276 86Q234 81 207 106Q182 130 177 161Q173 170 174 180Q170 191 184 186Q182 203 198 188Q209 200 218 176Q230 185 242 162Q255 170 268 147Q282 152 296 131Q316 125 330 105Z';
  p(c,silhouette,gold,ink,1.8);
  const id=`panama-fleece-${male?'male':'primary'}`;
  const clip=add(add(c,'defs'),'clipPath',{id});p(clip,silhouette,'white','none');
  const fur=add(c,'g',{'clip-path':`url(#${id})`});
  p(fur,male?'M318 91Q257 77 221 116L206 144Q248 128 292 131L322 109Z':'M318 91Q251 73 212 114Q185 144 179 182Q206 159 240 151Q279 146 324 110Z',wool,'none');
  p(fur,male?'M304 89Q258 77 229 103Q251 113 286 109Z':'M304 89Q252 78 219 109Q242 116 279 107Z',cream,'none',0,{opacity:.6});
  // Overlapping locks follow the drape. Dark roots, pale turned tips.
  const locks=male?[[231,107],[253,98],[278,97],[302,104],[218,127],[242,119],[265,119],[284,120]]
    :[[215,115],[237,99],[260,96],[284,99],[303,107],[202,135],[224,126],[248,120],[273,121],[191,159],[216,150],[239,144],[260,138],[198,178]];
  for(const [x,y] of locks) {
    p(fur,`M${x-9} ${y-4}Q${x-13} ${y+1} ${x-7} ${y+4}Q${x-9} ${y+10} ${x-2} ${y+8}Q${x+3} ${y+13} ${x+8} ${y+6}Q${x+13} ${y+5} ${x+10} ${y-1}`,wool,gold,1);
    l(fur,`M${x-7} ${y-4}C${x-9} ${y-10} ${x+1} ${y-11} ${x+2} ${y-5}Q${x+1} ${y} ${x-3} ${y-2}M${x+1} ${y+3}Q${x+6} ${y+7} ${x+8} ${y+1}`,cream,1.7);
  }
  // Soft rolled collar wraps below the face, with a small metal fastening.
  p(c,'M311 87Q319 89 329 101L326 108Q316 100 306 98Z',cream,gold,1.4);
  l(c,'M309 91L321 101',wool,2.5);
  e(c,male?320:321,110,6,5,berry,ink,1.1);
  l(c,'M318 109Q321 106 324 110Q323 114 320 113',cream,1.1);
  l(c,male?'M321 115Q335 129 323 138':'M321 115Q328 138 310 147',berry,2);
}

function fan(g,male) {
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
  const draw={'qg2726-gustavia-flower-headpiece':flower,'qg2726-golden-fleece-cape':cape,'qg2726-bci-forest-census-map-fans':fan}[item.family];
  if(!draw)return false;
  g.dataset.renderer=item.family;g.dataset.refinement='panama-20260906';draw(g,male);return true;
}
