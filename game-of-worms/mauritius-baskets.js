const NS='http://www.w3.org/2000/svg';
const add=(g,t,a={})=>{const n=document.createElementNS(NS,t);for(const [k,v] of Object.entries(a))n.setAttribute(k,v);g.appendChild(n);return n;};
const path=(g,d,fill='none',stroke='#705033',w=3)=>add(g,'path',{d,fill,stroke,'stroke-width':w,'stroke-linecap':'round','stroke-linejoin':'round'});
export function drawFruit(g,index,radius=22) {
  const colors=['#ab5360','#d7a843','#78964b'];
  add(g,'ellipse',{cx:0,cy:0,rx:radius,ry:radius*.84,fill:colors[index%3],stroke:'#644634','stroke-width':Math.max(1,radius*.08)});
  path(g,`M0 ${-radius*.7}q-2 -5 2 -8`,'none','#665034',Math.max(1,radius*.08));
  path(g,`M${-radius*.5} ${-radius*.3}q3 -4 7 -3`,'none','#f7deb0',Math.max(1,radius*.07));
}
export function basketSlot(male,index) {
  const slots=male?[[-29,-19,32],[7,-22,18],[34,-18,18],[-12,-43,17],[22,-43,16],[0,-13,16]]:[[-48,-21,23],[0,-24,24],[48,-19,22],[-25,-48,21],[25,-49,22],[0,-12,20]];
  const [x,y,r]=slots[index%6];return {x,y,r};
}
export function putBasketFruit(art,male,index,variant=index) {
  const contents=art.querySelector('[data-basket-fruits]');
  contents.querySelector(`[data-fruit-slot="${index}"]`)?.remove();
  const {x,y,r}=basketSlot(male,index);
  const fruit=add(contents,'g',{'data-fruit-slot':index,transform:`translate(${x} ${y})`});
  drawFruit(fruit,variant,r);
}
export function drawMauritiusBasket(group,male) {
  // Counter the existing tail-mounted angle without changing the user's transform.
  const g=add(group,'g',{'data-basket-vessel':'',transform:`rotate(${male?7:14})`});
  const rim=male?62:94;
  const body=male?'M-62-18Q0 14 62-18L46 61Q5 87-46 60Z':'M-94-18Q0 18 94-18L73 61Q0 87-73 61Z';
  // Tail strap behind the basket and distinct practical handles.
  path(g,male?'M-46 18Q-85-4-77-32':'M-66 24Q-123 5-112-37','none','#78604a',10);
  if(male) {
    path(g,'M-55-10Q-88-54-54-64Q-37-66-37-34M55-10Q85-47 57-58Q42-62 40-33','none','#87603b',9);
    path(g,'M-55-10Q-88-54-54-64Q-37-66-37-34M55-10Q85-47 57-58Q42-62 40-33','none','#dcc08a',4);
  } else {
    path(g,'M-77-9Q-83-103-6-111Q79-114 78-9','none','#765335',12);
    path(g,'M-77-9Q-83-103-6-111Q79-114 78-9','none','#d5b17b',6);
  }
  add(g,'ellipse',{cx:0,cy:-18,rx:rim,ry:male?22:26,fill:'#61452d',stroke:'#a67a49','stroke-width':7});
  add(g,'g',{'data-basket-fruits':''});
  // Front wall deliberately occludes the lower fruit halves.
  path(g,body,'#bb8a52','#705033',3.5);
  const id=male?'ju2909-small-weave':'ju2909-large-weave';
  const defs=add(g,'defs'),clip=add(defs,'clipPath',{id});path(clip,body,'white','none');
  const weave=add(g,'g',{'clip-path':`url(#${id})`});
  for(let y=11;y<76;y+=13)path(weave,`M-${rim} ${y}Q0 ${y+20} ${rim} ${y}`,'none','#e0bb80',5);
  for(let x=-rim+12;x<rim;x+=male?17:21)path(weave,`M${x} -14Q${x*.85} 34 ${x*.72} 78`,'none','#86613c',3);
  // Alternating crossings make the broad bands read as interwoven strips.
  for(let row=0;row<5;row++)for(let x=-rim+12+(row%2)*(male?17:21);x<rim;x+=male?34:42) {
    const y=15+row*13,xx=x*(1-y*.003);
    path(weave,`M${xx-4} ${y}h8`,'none','#e6c794',2);
  }
  path(g,`M-${rim} -18Q0 ${male?21:25} ${rim} -18`,'none','#765335',10);
  path(g,`M-${rim} -18Q0 ${male?21:25} ${rim} -18`,'none','#e1bd85',5);
  path(g,male?'M-42 62Q0 81 43 62':'M-68 64Q0 84 68 64','none','#785535',4);
  putBasketFruit(group,male,5,1);
}
