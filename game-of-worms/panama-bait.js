// Original fantasy props. Construction informed by a sealed glass blender jug,
// locking collar and motor housing. No brand marks or copied product artwork.
const ink='#34484b', berry='#984d6c', pale='#fff0db', metal='#b8cacc';
const add=(g,t,a={})=>{const n=document.createElementNS('http://www.w3.org/2000/svg',t);Object.entries(a).forEach(([k,v])=>n.setAttribute(k,v));g.appendChild(n);return n;};
const p=(g,d,fill,stroke=ink,w=2,a={})=>add(g,'path',{d,fill,stroke,'stroke-width':w,'stroke-linejoin':'round','stroke-linecap':'round',...a});
const e=(g,x,y,rx,ry,fill,stroke=ink,w=2,a={})=>add(g,'ellipse',{cx:x,cy:y,rx,ry,fill,stroke,'stroke-width':w,...a});

function dish(g,x,y,rx,ry,filled=false){
  p(g,`M${x-rx} ${y}Q${x-rx+3} ${y+23} ${x} ${y+25}Q${x+rx-3} ${y+23} ${x+rx} ${y}`, '#e0e3da');
  e(g,x,y,rx,ry,pale);
  e(g,x,y,rx-6,ry-4,filled?'#dc9eac':'#e7e9de','#8b9d9b',1.2);
  p(g,`M${x-rx+8} ${y+13}Q${x} ${y+31} ${x+rx-8} ${y+13}`,'none','#fff9ea',2);
  if(filled){
    p(g,`M${x-25} ${y-1}Q${x-8} ${y-13} ${x+17} ${y-3}Q${x+26} ${y+5} ${x+9} ${y+7}`,'none','#f7c8cc',2);
    e(g,x-14,y+3,3,2,berry,'none');e(g,x+19,y-3,2,2,'#a58759','none');
  }
}

export function drawFlowerBait(g,male){
  if(male){
    // Wide mixing bowl behind a separate shallow receiving dish.
    dish(g,-40,-6,47,16,true);dish(g,54,35,44,16);
    const serving=add(g,'g',{'data-panama-serving':'',opacity:0});
    e(serving,54,35,24,8,'#dc9eac',berry,1);
    p(serving,'M39 34Q53 27 67 35','none','#f7d2d6',2);
    const spoon=add(g,'g',{'data-panama-spoon':'',transform:'translate(-40 -8) rotate(-27)'});
    // Bowl and handle are one silver utensil, with the hand gripping the dry end.
    p(spoon,'M-4-6L-2-89Q-2-97 3-97Q8-95 7-87L5-6Z',metal,ink,1.8);
    p(spoon,'M1-78L2-16','none','#f5f7ea',2);
    e(spoon,0,0,16,10,metal,ink,1.8);
    e(spoon,0,0,11,6,'#dc9eac',berry,1,{'data-panama-spoonful':''});
    p(spoon,'M-10-2Q-2-7 8-3','none','#ffe1df',1.7);
    e(g,-67,-7,2,1.3,'#f9dce0','none');e(g,-27,-11,2,1.3,'#f9dce0','none');
    return;
  }
  e(g,0,81,66,10,'#20313d','none',0,{opacity:.18});
  // Rear handle has a genuine opening and a light inner edge.
  p(g,'M42-137C100-151 103-63 47-59L47-73C81-79 85-128 44-124Z',metal,ink,3);
  p(g,'M55-129C83-126 82-89 59-82','none','#f5f5e7',3);
  const jug='M-56-155Q-3-168 49-154L35-29Q-3-17-40-31Z';
  const clip=add(add(g,'defs'),'clipPath',{id:'panama-blender-glass'});p(clip,jug,'white','none');
  p(g,jug,'#c9e5df',ink,3,{'fill-opacity':.24});
  const contents=add(g,'g',{'clip-path':'url(#panama-blender-glass)'});
  p(contents,'M-56-96Q-22-104 2-96T49-96L36-25H-44Z','#d6a9b0','none',0,{'fill-opacity':.88});
  e(contents,-4,-96,48,9,'#efd1d1',berry,1);
  const petals=add(contents,'g',{'data-panama-petals':''});
  for(const [x,y,a] of [[-28,-87,-35],[17,-113,28],[-19,-121,-12],[14,-64,70],[-21,-46,20],[23,-85,-20]]){
    p(petals,`M${x-10} ${y}Q${x-18} ${y-16} ${x} ${y-17}Q${x+17} ${y-10} ${x+9} ${y+4}Q${x} ${y+9} ${x-10} ${y}Z`,'#f6d7d6',berry,1.2,{transform:`rotate(${a} ${x} ${y})`});
    p(petals,`M${x-5} ${y+2}Q${x+1} ${y-5} ${x+3} ${y-10}`,'none','#cf8ba2',1);
  }
  const swirl=add(contents,'g',{'data-panama-swirl':'',opacity:0});
  for(const [y,r] of [[-104,39],[-85,30],[-66,19]])p(swirl,`M${-r} ${y}C${-r} ${y-12} ${r} ${y-12} ${r} ${y}C${r} ${y+10} ${-r} ${y+10} ${-r} ${y}`,'none','#fff0df',2.5);
  // Thick glass facets, separated collar, gasket and closed lid.
  p(g,'M-45-143L-33-41M-28-146L-21-39','none','#fffbed',3.5,{opacity:.72});
  p(g,'M31-142L23-40','none','#73a6a6',2,{opacity:.8});
  for(let y=-127;y<-65;y+=17)p(g,`M15 ${y}H25`,'none','#527d7d',1.6);
  p(g,'M-43-34Q-4-20 37-33L36-17Q-3-7-42-20Z',metal,ink,2);
  p(g,'M-41-21Q-3-11 36-19L34-10H-39Z','#475d62',ink,1.5);
  p(g,'M-60-162Q-10-176 48-163L53-153Q-3-142-58-153Z',berry,ink,2.5);
  p(g,'M-49-162Q-2-170 38-160','none','#e7acc0',2.2);
  p(g,'M-17-169V-179Q-4-185 11-180L13-169Z',metal,ink,2);
  e(g,-3,-180,14,4,'#ecf5e9',ink,1.2);
  // Stable enamel motor housing and rubber feet.
  p(g,'M-38-10Q-45-6-49 13L-63 60Q-69 77-51 80H50Q65 76 59 61L45 10Q41-9 31-10Z',berry,ink,3);
  p(g,'M31-8Q42-4 45 12L59 65Q61 73 51 77H31Q41 62 34 38Z','#71394f','none');
  p(g,'M-34-1Q-42 16-49 46','none','#d18da5',4);
  p(g,'M-57 67H51','none','#d8bbb5',2);
  p(g,'M-51 80H-29V87H-49ZM29 80H48V87H30Z','#34484b','none');
  e(g,-2,37,20,20,metal,ink,2.2);e(g,-2,37,14,14,'#f9edda',ink,1.5);
  p(g,'M-2 36L3 25','none',berry,3,{'data-panama-dial':''});
  e(g,27,39,4,4,'#e9c56b',ink,1);
  p(g,'M-16 10Q-2 5 11 10','none','#e2b7c3',1.3);
}
