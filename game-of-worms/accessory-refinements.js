/* Six location-specific production refinements. Public labels and evidence stay
 * in accessory-designs.js. Materials are shared, not the paired silhouettes. */
const NS = 'http://www.w3.org/2000/svg';
const C = { ink:'#29454c', teal:'#327d76', tealDark:'#194f51', aqua:'#8dcac1',
  cream:'#fff4d9', paper:'#ece2c5', gold:'#d3ad60', goldDark:'#8c663b',
  berry:'#a3516c', rose:'#d58b9c', violet:'#675d8d', wood:'#a7754c',
  woodLight:'#d7b580', woodDark:'#654c3a', steel:'#b6cdce', white:'#f7fffa',
  soil:'#695043', leaf:'#719568', yellow:'#edc56b' };
export const refinedLayouts = {
  'qg2814-ground-flower-sample-theatre': [[357,139,.47,-9],[7,116,.38,8]],
  'qg2814-five-day-two-plate-relay': [[218,220,.44,5],[80,210,.32,-8]],
  'qg2814-18s-identity-ribbon-reader': [[356,280,.43,7],[24,282,.34,-7]],
  'ju4356-carambola-ground-contact-stage': [[371,134,.45,-8],[0,114,.34,8]],
  'ju4356-its2-ribbon-reader': [[241,201,.45,5],[80,202,.34,-6]],
  'hcmc-urban-canopy-census-engine': [[380,280,.5,4],[4,286,.38,-8]],
  'ju1373-torch-ginger-bract-collar': [[378,127,.43,-5],[7,113,.34,6]],
  'ju1373-type-isolate-signet-engine': [[232,149,.40,20],[92,145,.31,30]],
  'saint-benoit-windward-slope-mobile': [[373,282,.48,0],[30,289,.37,0]],
  'compost-labyrinth': [[286,210,.45,7],[46,203,.33,-10]],
  'ashfall-recorder': [[390,268,.47,0],[25,282,.35,3]],
  'test-cross-mechanism': [[196,292,.43,5],[138,268,.32,-7]],
  'eg5612-jackfruit-emergence-theatre': [[377,143,.46,-5],[0,122,.34,7]],
  'eg5612-shared-bag-provenance-bifurcator': [[231,203,.43,7],[92,198,.34,-5]],
  'eg5612-single-larva-test-cross-gate': [[362,290,.44,-6],[137,289,.33,5]],
  'qg130-kukui-glow-cart': [[373,135,.50,-8],[15,126,.39,5]],
  'qg130-root-carousel': [[260,235,.50,0],[77,230,.37,0]],
  'qg130-three-ribbon-hoops': [[415,286,.45,3],[180,312,.33,-4]]
};

function kit(group, family, small) {
  const add=(tag,attrs={},parent=group)=>{
    const n=document.createElementNS(NS,tag);
    Object.entries(attrs).forEach(([k,v])=>n.setAttribute(k,v));parent.appendChild(n);return n;
  };
  const defs=add('defs');
  const prefix='polish-'+family+'-'+(small?'male':'primary');
  const gradient=(name,stops,radial=false)=>{
    const id=prefix+'-'+name;
    const n=add(radial?'radialGradient':'linearGradient',radial?{id,cx:'.3',cy:'.24',r:'.8'}:{id,x1:'0',y1:'0',x2:'1',y2:'.45'},defs);
    stops.forEach(([offset,color])=>add('stop',{offset,'stop-color':color},n));return `url(#${id})`;
  };
  const paint={
    wood:gradient('wood',[[0,C.woodLight],[.48,C.wood],[1,C.woodDark]]),
    metal:gradient('metal',[[0,C.tealDark],[.24,C.aqua],[.5,C.teal],[1,C.tealDark]]),
    glass:gradient('glass',[[0,'#7eaeae'],[.18,'#e4f6e9'],[.4,'#a4d5cf'],[.83,'#d8e7d9'],[1,'#75a2a2']]),
    gold:gradient('gold',[[0,C.cream],[.3,C.gold],[.67,'#edcf83'],[1,C.goldDark]]),
    fruit:gradient('fruit',[[0,'#f8dd7d'],[.5,'#d3ad48'],[1,'#8a9149']],true),
    shell:gradient('shell',[[0,'#c99a65'],[.4,'#886047'],[1,'#463b34']],true)
  };
  const p=(d,fill='none',stroke=C.ink,w=3,parent=group)=>add('path',{d,fill,stroke,'stroke-width':w,'stroke-linejoin':'round','stroke-linecap':'round'},parent);
  const e=(x,y,rx,ry,fill,stroke=C.ink,w=3,parent=group)=>add('ellipse',{cx:x,cy:y,rx,ry,fill,stroke,'stroke-width':w},parent);
  const r=(x,y,width,height,fill,rx=3,stroke=C.ink,w=3,parent=group)=>add('rect',{x,y,width,height,rx,fill,stroke,'stroke-width':w},parent);
  const g=(transform)=>add('g',{transform});
  const text=(value,x,y,size=16,parent=group)=>{
    const n=add('text',{x,y,fill:C.ink,'font-family':'Georgia, serif','font-size':size,'font-weight':'bold','text-anchor':'middle'},parent);n.textContent=value;return n;
  };
  const shadow=(x,y,rx,ry)=>e(x,y,rx,ry,'#20383a','none',0).setAttribute('opacity','.16');
  const vein=(d,parent=group)=>p(d,'none',C.cream,1.4,parent);
  return {add,p,e,r,g,text,shadow,vein,paint};
}

function flower(k,x,y,s,angle=0) {
  const q=k.g(`translate(${x} ${y}) rotate(${angle}) scale(${s})`);
  k.p('M0 8Q-6 32 7 50','none',C.leaf,3,q);
  k.p('M0 28Q-23 13-23 29Q-9 38 0 28M3 40Q25 19 25 35Q14 45 3 40',C.leaf,C.tealDark,1.5,q);
  for(const a of [-15,55,125,195,265]) {
    const petal=k.e(0,-11,8,15,C.rose,C.berry,1.6,q);petal.setAttribute('transform',`rotate(${a})`);
  }
  k.e(0,0,7,6,C.gold,C.goldDark,1.5,q);return q;
}

// Petri dishes use separate base walls, contents, near rims and raised lids.
function dish(k,x,y,rx,ry,variant,lid=false) {
  const q=k.g(`translate(${x} ${y})`);
  k.p(`M${-rx} 0V13C${-rx} ${ry+16} ${rx} ${ry+16} ${rx} 13V0Z`,k.paint.glass,C.tealDark,2.8,q);
  k.e(0,0,rx,ry,'#d9eee6',C.tealDark,2.6,q);
  k.e(0,1,rx-7,ry-5,'#dfd79a',C.goldDark,1.3,q);
  const tracks=variant%2?['M-23-3Q-14-13-4-4T17-3','M-9 7Q4 0 18 8']:['M-27 1Q-17-10-6-1T19 0','M-14 9Q-4 1 6 8'];
  tracks.forEach(d=>k.p(d,'none',C.teal,2.4,q));
  k.p(`M${-rx+2} 3C${-rx+3} ${ry+12} ${rx-3} ${ry+12} ${rx-2} 3`,'none',C.white,2.3,q);
  k.p(`M${-rx+13} -5Q${-rx/2} ${-ry+3} -3 ${-ry+4}`,'none',C.white,3,q);
  if(lid){
    const cover=k.e(12,-ry-20,rx+3,ry+1,'#d5ede5',C.teal,2.3,q);cover.setAttribute('fill-opacity','.22');cover.setAttribute('transform','rotate(-12)');
    k.p(`M${-rx+20} ${-ry-23}Q0 ${-ry*2-20} ${rx+7} ${-ry-27}`,'none',C.white,2,q);
  }
}

function cardHelix(k,parent,cx,top,height,width) {
  for(let i=0;i<8;i++){
    const y=top+i*height/7;
    const a=Math.sin(i*Math.PI/3.5)*width;
    k.p(`M${cx-a} ${y}L${cx+a} ${y}`,'none',i%2?C.gold:C.aqua,3,parent);
  }
  k.p(`M${cx} ${top}C${cx-width*1.6} ${top+height*.18} ${cx-width*1.6} ${top+height*.32} ${cx} ${top+height*.5}S${cx+width*1.6} ${top+height*.82} ${cx} ${top+height}`,'none',C.berry,4,parent);
  k.p(`M${cx} ${top}C${cx+width*1.6} ${top+height*.18} ${cx+width*1.6} ${top+height*.32} ${cx} ${top+height*.5}S${cx-width*1.6} ${top+height*.82} ${cx} ${top+height}`,'none',C.teal,4,parent);
}

function drawNambucca(k,f,small) {
  if(f==='qg2814-ground-flower-sample-theatre') {
    k.shadow(2,73,94,15);
    if(small){
      // Compact closed strap press with a slipped-out specimen sheet.
      k.p('M-77-28L42-52L80-5L-37 27Z',C.paper,C.goldDark,2);
      k.p('M-72 22L53 1L84 43L-39 66Z',k.paint.wood);
      for(const y of [13,21,29])k.p(`M-70 ${y}L51 ${y-21}L81 ${y+20}L-38 ${y+43}Z`,y%2?C.cream:C.paper,C.goldDark,1.5);
      k.p('M-76-2L50-24L82 19L-43 43Z',k.paint.wood);
      [-35,27].forEach(x=>{k.p(`M${x} -14L${x+23} -18L${x+51} 25L${x+29} 29L${x+27} 52L${x+9} 55Z`,C.teal,C.tealDark,2);k.r(x+12,28,17,13,k.paint.gold,2,C.goldDark,1.5);});
      flower(k,-35,-42,.64,-30);
      k.p('M-66 3L-43 31M-7-8L17 19M44-17L70 12','none',C.woodLight,2);
    } else {
      // Open screw press. The back board and clamping posts precede the flower.
      k.p('M-89 30L37 8L88 47L-40 73Z',k.paint.wood);
      for(const y of [18,25,32])k.p(`M-83 ${y}L35 ${y-21}L81 ${y+15}L-39 ${y+39}Z`,y===25?C.cream:C.paper,C.goldDark,1.4);
      k.p('M-80 12L35-9L79 25L-38 48Z',C.cream,C.goldDark,2);
      const board=k.g('rotate(-13 -59 0)');
      k.p('M-70 8L-73-61L41-67L51-2Z',k.paint.wood,C.woodDark,3,board);
      for(const x of [-51,-19,14])k.p(`M${x} -56L${x+6} -5`,'none',C.woodLight,2,board);
      flower(k,-14,-8,.82,-32);flower(k,23,2,.51,23);
      [[-69,33],[59,27]].forEach(([x,y])=>{
        k.p(`M${x} ${y+18}V${y-44}`,'none',C.steel,5);
        for(let z=y-38;z<y+10;z+=8)k.p(`M${x-4} ${z}L${x+4} ${z+2}`,'none',C.tealDark,1);
        k.e(x,y-45,5,4,C.gold,C.goldDark,1.5);
        k.p(`M${x-13} ${y-39}Q${x-18} ${y-52} ${x-5} ${y-45}L${x} ${y-39}L${x+6} ${y-48}Q${x+22} ${y-54} ${x+13} ${y-38}Z`,k.paint.gold,C.goldDark,1.5);
      });
    }
  } else if(f==='qg2814-five-day-two-plate-relay') {
    k.shadow(0,56,105,16);
    if(small){dish(k,22,-14,57,25,1,true);dish(k,-33,36,51,23,0);}
    else {dish(k,-47,15,60,27,0,true);dish(k,49,32,56,25,1);}
  } else {
    k.shadow(0,83,69,13);
    if(small){
      // Landscape fold-out card with a side tab, not a reduced large card stack.
      k.p('M-76-47L58-38L74 51L-61 43Z',C.paper,C.goldDark,2);
      k.p('M-78-54L56-45L72 44L-63 36Z',C.cream,C.goldDark,2.5);
      k.p('M-78-54L-53-52L-38 38L-63 36Z',C.teal,C.tealDark,1.5);
      const face=k.g('translate(4 -2) rotate(94)');
      cardHelix(k,face,0,-39,77,15);
      k.text('18S',10,31,15);
      k.p('M49-45L63-49L68-20L60-18Z',C.berry,C.goldDark,1.5);
    }else{
      // Fanned physical study cards, with visible stock and a brass binding ring.
      const back=k.g('rotate(19 0 -44)');k.r(-45,-62,88,140,C.paper,10,C.goldDark,2,back);
      k.p('M-27-25H25M-27-8H20M-27 9H25','none',C.teal,3,back);
      const face=k.g('rotate(-9)');k.r(-52,-68,91,144,'#cdbb94',9,C.goldDark,2,face);k.r(-55,-72,91,144,C.cream,9,C.goldDark,2.5,face);
      k.p('M-49-66H30V-42H-49Z',C.teal,'none',0,face);
      cardHelix(k,face,-9,-34,84,19);k.text('18S',-9,65,16,face);
      k.e(-36,-60,10,12,'none',C.goldDark,4);k.p('M-43-66Q-35-74-29-63','none',C.cream,1.8);
    }
  }
}

function fruitTray(k,kind,small) {
  k.shadow(0,63,103,15);
  const rx=small?83:101, ry=small?35:40;
  if(small){
    k.p('M-92-3L31-27L90 15L82 45L-36 72L-91 31Z',k.paint.wood,C.woodDark,3);
    k.p('M-92-3L31-27L90 15L-34 46Z',C.woodLight,C.woodDark,3);
    k.p('M-75-1L28-19L72 13L-31 37Z',C.cream,C.goldDark,2);
    k.p('M-80 30L-35 61L75 36','none',C.gold,2);
  }else{
    k.p(`M${-rx} 15C${-rx} ${ry+36} ${rx} ${ry+36} ${rx} 15L${rx-7} 44Q0 87 ${-rx+7} 44Z`,k.paint.wood,C.woodDark,3);
    k.e(0,14,rx,ry,C.woodLight,C.woodDark,3);
    k.e(0,14,rx-10,ry-8,C.cream,C.goldDark,2);
  }
  // Rear handle is behind the contents.
  k.p(`M${-rx+17} 1Q${-rx-4} -33 ${-rx+27} -24M${rx-17} 1Q${rx+4} -33 ${rx-27} -24`,'none',C.woodDark,5);
  if(kind==='jackfruit'){
    const q=k.g(small?'translate(-13 -9) rotate(19)':'translate(-18 -9) rotate(-16)');
    k.p(small?'M-54 11Q-58-26-11-38Q32-37 55 0Q29 32-16 31Z':'M-62 7Q-70-37-15-47Q42-47 63-4Q42 38-16 34Z',C.leaf,C.tealDark,3,q);
    k.p(small?'M-46 8Q-44-21-9-29Q24-28 44-1Q24 22-14 21Z':'M-54 4Q-55-28-13-38Q34-39 52-5Q33 28-14 25Z',C.yellow,C.goldDark,2,q);
    k.p('M-38 5Q-9-10 35-8','none',C.cream,9,q);
    const bulbs=small?[[-28,-7],[-10,-18],[13,-18],[31,-3],[-11,10],[14,9]]:[[-38,-6],[-24,-21],[-2,-27],[23,-22],[39,-7],[-29,13],[-7,10],[19,12]];
    bulbs.forEach(([x,y])=>{k.e(x,y,8,11,k.paint.gold,C.goldDark,1.6,q);k.e(x+1,y,3,5,C.paper,C.goldDark,1,q);});
    k.p('M-58 0L-62-8M-47-31L-51-38M-15-44V-50M30-37L33-44M56-17L63-20','none',C.tealDark,2,q);
  } else if(kind==='carambola') {
    // A longitudinal five-ridged fruit plus a cut slice, not a star on a card.
    const q=k.g(small?'translate(-19 -12) rotate(-24)':'translate(-16 -14) rotate(17)');
    k.p('M-61 2Q-28-43 27-28L62-9L65 6Q30 45-22 33Z',k.paint.fruit,C.goldDark,3,q);
    k.p('M-60 2Q-7-14 62-9M-52 9Q-4 34 65 6M-40-15Q-4-29 42-23','none',C.cream,3,q);
    k.p('M-54 10Q-6 1 56-5M-34 22Q5 35 48 14','none',C.goldDark,1.4,q);
    const slice=k.g(small?'translate(48 19) rotate(18)':'translate(48 23) rotate(-10)');
    const star='M0-31L10-11L32-9L16 7L21 29L0 18L-22 29L-16 7L-33-9L-10-11Z';
    const edge=k.p(star,C.goldDark,C.goldDark,2,slice);edge.setAttribute('transform','translate(0 6)');
    k.p(star,'#f5d780',C.leaf,2.2,slice);
    [[0,-8],[8,3],[-7,4]].forEach(([x,y])=>k.e(x,y,2.4,4.5,C.woodDark,'none',0,slice));
  } else {
    const q=k.g(small?'translate(6 -8) rotate(47)':'translate(-9 -8) rotate(-38)');
    k.p('M0 16V58','none',C.leaf,6,q);
    const rows=small?[[0,-27],[-12,-11],[13,-8],[0,10]]:[[0,-47],[-13,-29],[14,-26],[-24,-7],[0,-5],[23,-2],[-13,17],[14,18]];
    rows.forEach(([x,y],i)=>{
      k.p(`M${x} ${y+20}Q${x-21} ${y+1} ${x-8} ${y-13}Q${x} ${y-23} ${x+10} ${y-11}Q${x+23} ${y+6} ${x} ${y+20}Z`,i%2?C.berry:C.rose,C.berry,2,q);
      k.p(`M${x-7} ${y-8}Q${x-6} ${y+5} ${x} ${y+13}`,'none','#edb9ae',1.6,q);
    });
    k.p('M2 49Q35 4 52 20Q31 44 2 49',C.leaf,C.tealDark,2,q);
  }
  if(small){
    k.p('M-89 4L-35 45L86 16','none',C.woodDark,6);
    k.p('M-88 2L-34 41L85 13','none',C.gold,2.5);
  }else{
    k.p(`M${-rx+3} 24C${-rx+10} ${ry+32} ${rx-10} ${ry+32} ${rx-3} 24`,'none',C.woodDark,7);
    k.p(`M${-rx+5} 22C${-rx+10} ${ry+28} ${rx-10} ${ry+28} ${rx-5} 22`,'none',C.gold,3);
    [-58,-30,0,30,58].forEach(x=>k.p(`M${x} 53L${x*.9} 62`,'none',C.woodLight,1.7));
  }
}

function drawHCMC(k,f,small) {
  if(f==='ju4356-carambola-ground-contact-stage')return fruitTray(k,'carambola',small);
  if(f==='ju4356-its2-ribbon-reader') {
    k.shadow(0,80,90,14);
    // Folded sequencing cards stand open in a shallow V, with visible edge stock.
    if(small){
      k.p('M-61-52L4-71L67-34L54 72L-5 47L-70 67Z',C.paper,C.goldDark,2.5);
      k.p('M-58-57L2-76L64-39L51 67L-7 42L-67 62Z',C.cream,C.goldDark,2.5);
      k.p('M2-76L-7 42','none',C.goldDark,3);
      cardHelix(k,k.g('rotate(6)'),-34,-35,72,12);
      for(let i=0;i<6;i++)k.p(`M17 ${-29+i*13}L${39+(i%3)*4} ${-18+i*13}`,'none',i%2?C.berry:C.teal,4);
    }else{
      k.p('M-86-68L-3-44L78-73L85 64L-2 85L-91 63Z',C.paper,C.goldDark,3);
      k.p('M-83-74L-2-50L74-79L81 58L-3 78L-87 57Z',C.cream,C.goldDark,3);
      k.p('M-2-50L-3 78','none',C.goldDark,3);
      const left=k.g('skewY(13)');cardHelix(k,left,-44,-42,82,18);
      const right=k.g('skewY(-12)');
      for(let i=0;i<7;i++){
        k.p(`M13 ${-43+i*14}H${40+(i%3)*8}`,'none',i%2?C.berry:C.teal,4,right);
        k.e(62,-43+i*14,2,2,C.gold,'none',0,right);
      }
      k.text('ITS2',-41,54,16);k.p('M9 61L65 46','none',C.gold,3);
    }
  } else {
    k.shadow(0,67,108,13);
    const q=k.g(small?'rotate(9)':'rotate(-4)');
    k.p(small?'M-82-39H68V-23H-82Z':'M-104-43H99V-25H-104Z',k.paint.glass,C.tealDark,3,q);
    const left=small?-71:-90,right=small?28:45;
    // A fixed and a sliding jaw face one another on the same graduated beam.
    k.p(`M${left-10}-47H${left+10}V49L${left-3} 58L${left-10} 47Z`,C.teal,C.tealDark,3,q);
    k.p(`M${right-12}-51H${right+17}V-18H${right+9}V49L${right-4} 58V-18H${right-12}Z`,C.teal,C.tealDark,3,q);
    k.r(right-5,-64,17,18,C.berry,4,C.ink,2,q);
    for(let x=left+18,i=0;x<(small?62:92);x+=10,i++)k.p(`M${x}-40V${i%5===0?-29:-34}`,'none',C.tealDark,1.7,q);
    k.p(`M${left+10} 43L${left+10}-18M${right-4} 43V-18`,'none',C.white,2,q);
    k.e(right+2,-37,4,4,C.gold,C.goldDark,1.5,q);
  }
}

function drawReunion(k,f,small) {
  if(f==='ju1373-torch-ginger-bract-collar')return fruitTray(k,'ginger',small);
  if(f==='ju1373-type-isolate-signet-engine') {
    // Enamel badge with a pin clasp and a cast metal edge, not a diagram panel.
    const q=k.g(small?'rotate(-8)':'rotate(5)');
    k.p(small?'M-44-13Q0-36 44-11L41 12Q0-9-41 13Z':'M-60-17Q0-42 60-14L57 14Q0-15-57 17Z',C.teal,C.tealDark,2.5,q);
    k.p('M-22-33H22','none',C.steel,6,q);k.e(22,-33,5,6,C.gold,C.goldDark,2,q);
    if(small){
      k.p('M0-27L31-12L34 27L0 57L-34 27L-31-12Z',C.goldDark,C.goldDark,3,q);
      k.p('M0-32L31-17L34 22L0 52L-34 22L-31-17Z',k.paint.gold,C.goldDark,2.5,q);
      k.p('M0-22L22-11L24 19L0 39L-24 19L-22-11Z',C.berry,C.goldDark,2,q);
      k.text('TYPE',0,15,13,q);
    }else{
      k.e(0,14,44,49,C.goldDark,C.goldDark,3,q);k.e(0,8,44,49,k.paint.gold,C.goldDark,3,q);
      k.e(0,8,33,37,C.berry,C.goldDark,2,q);
      k.p('M-28-20Q-8-36 15-26','none',C.rose,3,q);k.text('TYPE',0,14,17,q);
      [-30,-15,0,15,30].forEach(x=>k.e(x,43-Math.abs(x)*.25,2,2,C.cream,'none',0,q));
    }
  } else {
    k.shadow(0,99,62,12);
    if(small){
      k.p('M28-30V98M16 5H41M16 53H41','none',C.woodDark,8);
      k.p('M-22-58H23V69Q0 86-22 69Z',k.paint.glass,C.tealDark,3);
      k.p('M-17 30H18V66Q0 78-17 66Z',C.aqua,C.teal,1.5);
      k.e(0,30,17,5,C.aqua,C.teal,1.5);
      k.e(0,-58,23,8,C.cream,C.tealDark,3);
      k.p('M-24-62L-9-36H10L24-62',k.paint.gold,C.goldDark,2);
      k.e(0,-62,25,8,C.cream,C.goldDark,2.5);
      k.p('M-13-25V61','none',C.white,3);
      [-22,-7,8,23,38,53].forEach((y,i)=>k.p(`M${i%2?9:4} ${y}H19`,'none',C.tealDark,2));
    }else{
      k.p('M-35 82L-48 99M35 82L48 99M0 81V104','none',C.woodDark,7);
      k.p('M-36-43H36V77Q0 102-36 77Z',k.paint.glass,C.tealDark,3);
      k.p('M-19-42H19V72Q0 84-19 72Z','#d9eee4',C.teal,2);
      k.p('M-15 24H15V71Q0 78-15 71Z',C.aqua,C.teal,1.5);k.e(0,24,15,5,C.aqua,C.teal,1.5);
      k.p('M-50-64Q0-40 50-64L12-28H-12Z',k.paint.gold,C.goldDark,3);
      k.e(0,-64,51,17,C.cream,C.goldDark,3);k.e(0,-64,40,11,C.gold,C.goldDark,1.5);
      k.e(0,-61,6,3,C.woodDark,'none',0);
      k.p('M-28-33V67','none',C.white,4);
      [-25,-8,9,26,43,60].forEach((y,i)=>k.p(`M${i%2?7:1} ${y}H16`,'none',C.tealDark,2));
      k.p('M-39 4Q0 19 39 4M-37 71Q0 88 37 71','none',C.teal,5);
    }
  }
}

function drawAraucania(k,f,small) {
  if(f==='compost-labyrinth') {
    k.shadow(0,78,75,13);
    const rx=small?56:70;
    k.p(`M${-rx+10}-14Q${-rx-10}-97 0-104Q${rx+10}-97 ${rx-10}-14`,'none',C.steel,6);
    k.p(small?'M-56-13L-45 60Q0 82 45 60L56-13Z':'M-70-17L-58 63Q0 91 58 63L70-17Z',k.paint.metal,C.tealDark,3);
    k.e(0,small?-13:-17,rx,22,C.steel,C.tealDark,3);k.e(0,small?-13:-17,rx-8,15,C.soil,C.woodDark,2);
    [[-29,-16],[-8,-20],[15,-11],[33,-17],[-17,-4]].forEach(([x,y],i)=>{
      k.p(`M${x-8} ${y}Q${x} ${y-12} ${x+9} ${y+1}Q${x} ${y+7} ${x-8} ${y}Z`,i%2?C.leaf:C.woodLight,C.woodDark,1.5);
    });
    k.p(`M${-rx+14} 5L${-rx+24} 55M${rx-15} 6L${rx-23} 56`,'none',C.aqua,3);
    k.p(`M${-rx+2} -7Q0 18 ${rx-2} -7`,'none',C.white,2);
    const tool=k.g(small?'translate(48 -4) rotate(25)':'translate(54 -8) rotate(19)');
    k.p('M-7-52H7V-5H-7Z',C.wood,C.woodDark,2,tool);k.r(-11,-75,22,32,C.berry,7,C.ink,2,tool);
    k.p('M-7-6Q-28 1-20 20L0 43L20 20Q28 1 7-6Z',k.paint.glass,C.tealDark,2.5,tool);k.p('M0-1V31','none',C.white,2,tool);
    k.e(-rx+7,-14,4,5,C.gold,C.goldDark,1.5);k.e(rx-7,-14,4,5,C.gold,C.goldDark,1.5);
  }else if(f==='ashfall-recorder') {
    k.shadow(0,84,77,13);
    const rx=small?49:68;
    // Open collector, settled ash and a visible depth ruler. No mountain icon.
    k.p(`M${-rx}-17V60Q0 88 ${rx} 60V-17Z`,k.paint.glass,C.tealDark,3);
    k.e(0,-17,rx,22,C.cream,C.tealDark,3);
    k.p(`M${-rx+7} 36Q0 18 ${rx-7} 36V57Q0 78 ${-rx+7} 57Z`,'#9e9693',C.woodDark,1.5);
    k.e(0,36,rx-7,17,'#b4aca5',C.woodDark,1.5);
    for(let i=0;i<13;i++){const x=Math.sin(i*2.4)*(rx-17),y=33+Math.cos(i*1.7)*10;k.e(x,y,1.7,1.4,C.woodDark,'none',0);}
    const ruler=k.g(small?'translate(17 0) rotate(7)':'translate(29 0) rotate(-4)');
    k.r(-8,-77,16,135,C.cream,2,C.goldDark,2,ruler);
    for(let y=-66,i=0;y<50;y+=12,i++)k.p(`M-6 ${y}H${i%2?0:6}`,'none',C.ink,1.6,ruler);
    k.p(`M${-rx+10} -3V46`,'none',C.white,4);
    k.p(`M${-rx} -12Q0 15 ${rx} -12`,'none',C.steel,4);
    if(small)k.p('M-40 70H40','none',C.tealDark,5);else k.p('M-50 68L-59 82M50 68L59 82','none',C.tealDark,5);
  } else {
    k.shadow(0,62,109,15);
    if(small){dish(k,30,-9,57,25,1);dish(k,-35,37,52,25,0,true);}
    else {dish(k,-47,10,64,28,0);dish(k,46,38,62,28,1,true);}
    // Two direction arrows remain clear of the dishes and their rims.
    k.p('M-18-36Q10-44 33-28M23-39L35-28L21-25','none',C.berry,3);
    k.p('M23 79Q-1 89-25 74M-17 87L-28 74L-13 72','none',C.teal,3);
  }
}

function drawDoisRios(k,f,small) {
  if(f==='eg5612-jackfruit-emergence-theatre')return fruitTray(k,'jackfruit',small);
  if(f==='eg5612-shared-bag-provenance-bifurcator') {
    k.shadow(0,85,77,12);
    if(small){
      // A gathered translucent sample pouch, distinct from the larger gusset bag.
      k.p('M-29-52Q-48-80-36-85L-7-69L25-86Q40-78 25-51Q46-2 54 58Q15 91-42 68Q-60 30-29-52Z','#dce9d5',C.tealDark,3);
      k.p('M-38 27Q0 5 40 31L47 55Q11 78-34 62Z',C.leaf,C.tealDark,2);
      k.p('M-29-51Q-9-44 27-52','none',C.berry,7);k.p('M-3-48Q22-32 30-11','none',C.berry,3);
      k.p('M-30-23Q-42 17-29 49M26-24Q38 18 36 43','none',C.white,3);
      k.e(0,40,17,12,C.yellow,C.goldDark,2);k.e(0,40,7,6,C.paper,C.goldDark,1.5);
      k.p('M-6-47Q-4-29 9-18','none',C.goldDark,2);k.p('M4-24L31-17L26 6L0-1Z',C.cream,C.goldDark,1.5);
    }else{
      k.p('M-53-69H50L62 63L43 85H-44L-63 65Z','#dce9d5',C.tealDark,3);
      k.p('M-52-49L-41 65L-58 70M50-48L43 66L58 69',C.aqua,C.teal,2);
      k.p('M-49 27Q-14 6 48 25L51 60Q0 82-51 60Z',C.leaf,C.tealDark,2);
      [[-26,38],[2,47],[25,31]].forEach(([x,y])=>{k.e(x,y,14,17,C.yellow,C.goldDark,1.5);k.e(x+1,y,5,8,C.paper,C.goldDark,1);});
      k.p('M-54-70H51V-54H-54Z',C.aqua,C.tealDark,2.5);k.p('M-46-62H44','none',C.teal,3);
      k.p('M-38-36Q-34 17-37 50M34-32L39 34','none',C.white,4);
      k.r(-32,-33,65,29,C.cream,3,C.goldDark,1.5);k.p('M-23-22H23M-23-13H13','none',C.teal,2);
      k.p('M-45 76Q0 89 44 76','none',C.teal,2);
    }
  } else {
    k.shadow(0,67,105,13);
    if(small){dish(k,-28,1,54,26,0,true);dish(k,35,44,51,23,1);}
    else{
      dish(k,32,2,65,29,0,true);dish(k,-38,47,57,25,1);
      const pick=k.g('translate(-68 -35) rotate(-29)');
      k.p('M0-46V27','none',C.wood,5,pick);k.p('M0 26Q4 41 15 42','none',C.steel,2,pick);
      k.e(15,42,4,3,'none',C.steel,1.6,pick);
    }
  }
}

function drawKauai(k,f,small) {
  if(f==='qg130-kukui-glow-cart') {
    k.shadow(2,83,91,14);
    const wheel=(x,y,r)=>{k.e(x,y,r,r,C.tealDark,C.ink,3);k.e(x,y,r-5,r-5,k.paint.wood,C.goldDark,2);for(const a of [0,60,120]){const d=a*Math.PI/180;k.p(`M${x-Math.cos(d)*(r-6)} ${y-Math.sin(d)*(r-6)}L${x+Math.cos(d)*(r-6)} ${y+Math.sin(d)*(r-6)}`,'none',C.cream,2);}k.e(x,y,4,4,C.gold,C.ink,1.5);};
    if(small){
      wheel(39,49,17);
      k.p('M-63-12Q-44-67 16-61Q63-44 62 5Q46 54-4 51Q-47 39-63-12Z',k.paint.shell,C.woodDark,3);
      k.p('M-52-10Q-33-49 13-45Q48-31 49 4Q23 25-15 20Z',k.paint.gold,C.goldDark,3);
      k.p('M-58 2Q-39 26-6 35M14 34Q43 27 54 10','none',C.woodLight,2);
      k.p('M-52 16Q-87-1-96 17L-90 34','none',C.woodDark,6);wheel(-26,62,21);
      k.p('M-92 14L-87 27','none',C.gold,3);
    }else{
      wheel(46,58,22);
      k.p('M-77-10Q-75-67-14-78Q52-84 77-32Q95 19 54 57Q-19 86-66 33Z',k.paint.shell,C.woodDark,4);
      k.p('M-66-11Q-57-54-13-62Q39-66 64-29L70-5Q18 21-36 13Z',k.paint.gold,C.goldDark,3);
      k.p('M-58-14Q-28-47 22-40','none',C.cream,4);
      k.p('M-62 20Q-36 61 11 59M-42 19Q-18 41 23 42M31 30Q59 17 69 7','none',C.woodLight,2.5);
      k.p('M-64 21Q-96-3-109 9L-110 31','none',C.woodDark,7);k.p('M-111 18V31','none',C.gold,4);
      wheel(-40,66,26);k.p('M-10 66L23 61','none',C.woodDark,6);
    }
  } else if(f==='qg130-root-carousel') {
    k.shadow(0,102,103,15);
    const seat=(x,y,width,colour)=>{
      const anchor=small?-33:-38;
      k.p(`M${x-width/2} ${anchor}L${x-width/2+2} ${y}M${x+width/2} ${anchor}L${x+width/2-2} ${y}`,'none',C.goldDark,2.4);
      k.p(`M${x-width/2-5} ${y-9}Q${x} ${y-26} ${x+width/2+5} ${y-9}L${x+width/2} ${y+7}Q${x} ${y+19} ${x-width/2} ${y+7}Z`,colour,C.tealDark,2.5);
      k.e(x,y-7,width/2+3,7,C.tealDark,C.tealDark,2);k.p(`M${x-width/2+1} ${y+6}Q${x} ${y+16} ${x+width/2-1} ${y+6}`,'none',C.aqua,2);
    };
    // Unequal seats and deliberate rear/front ordering around a crooked root mast.
    if(small){
      seat(-40,19,27,C.aqua);
      k.p('M-5-59Q-22-28-10 5Q7 41-6 77L-40 90L-14 97L7 82L34 96L52 89L13 74Q23 39 9 2Q-3-25 10-56Z',k.paint.wood,C.woodDark,3);
      k.p('M-74-45Q-17-77 55-44L64-28Q7-7-76-28Z',C.berry,C.ink,3);
      k.p('M-74-45Q-17-91 55-44Q5-22-74-45Z',C.rose,C.berry,2.5);
      k.p('M-19-67L-20-87','none',C.woodDark,4);k.e(-20,-87,5,5,C.gold,C.goldDark,2);
      seat(29,48,34,C.yellow);k.p('M24-25L14-12','none',C.gold,2);
    }else{
      seat(-58,11,30,C.aqua);seat(42,3,28,C.violet);
      k.p('M-8-78Q-26-38-10-1Q8 28-3 72L-48 91L-65 87L-50 104L-4 87L21 103L51 98L62 81L34 89L12 72Q28 28 10-6Q-4-38 11-77Z',k.paint.wood,C.woodDark,4);
      k.p('M-11-36Q-15-5 2 24L4 67','none',C.woodLight,3);
      k.p('M-98-54Q-4-86 94-51L91-28Q9-7-94-31Z',C.berry,C.ink,3);
      k.p('M-98-54Q-59-82-4-91Q61-80 94-51Q0-25-98-54Z',C.rose,C.berry,3);
      k.p('M-4-90Q-17-67-11-38M-4-90Q34-66 48-41M-4-90Q-51-66-63-44','none',C.gold,2);
      k.p('M-4-90V-109','none',C.woodDark,4);k.e(-4,-110,6,6,C.gold,C.goldDark,2);
      seat(-43,54,34,C.yellow);seat(53,50,35,C.aqua);
    }
  } else {
    k.shadow(0,89,105,14);
    const ring=(cx,cy,rx,ry,angle,colour)=>{
      const q=k.g(`translate(${cx} ${cy}) rotate(${angle})`);
      k.e(0,0,rx,ry,'none',C.tealDark,8,q);k.e(0,0,rx,ry,'none',colour,5,q);
      k.p(`M${-rx*.75} ${-ry*.55}Q${-rx*.6} ${-ry*.93} 0 ${-ry}`,'none',C.cream,1.8,q);
      k.p(`M-7 ${ry-4}L-16 ${ry+17}L-2 ${ry+10}L8 ${ry+21}L12 ${ry-3}Z`,C.berry,C.ink,1.5,q);
    };
    if(small){
      ring(15,-8,47,57,20,C.aqua);ring(-22,7,48,55,-18,C.gold);
      k.p('M-53 63Q-22 45-9 64Q13 82 52 69L45 88Q-3 97-50 83Z',k.paint.wood,C.woodDark,3);
      ring(0,24,56,26,-6,C.rose);
    }else{
      ring(31,-9,56,70,24,C.aqua);ring(-34,1,58,69,-26,C.gold);
      k.p('M-79 69Q-42 45-20 63Q10 91 76 70L69 91Q9 111-75 91Z',k.paint.wood,C.woodDark,3);
      k.p('M-58 77Q-20 65 12 86L53 83','none',C.woodLight,2);
      ring(0,30,76,35,-7,C.rose);
    }
  }
}

export function drawRefinedAccessory(group,item,companion) {
  const f=item.family;
  if(!refinedLayouts[f])return false;
  group.classList.add('six-location-polish');group.dataset.renderer=f;
  const k=kit(group,f,companion);
  if(f.startsWith('qg2814-'))drawNambucca(k,f,companion);
  else if(f.startsWith('ju4356-')||f==='hcmc-urban-canopy-census-engine')drawHCMC(k,f,companion);
  else if(f.startsWith('ju1373-')||f==='saint-benoit-windward-slope-mobile')drawReunion(k,f,companion);
  else if(f.startsWith('eg5612-'))drawDoisRios(k,f,companion);
  else if(f.startsWith('qg130-'))drawKauai(k,f,companion);
  else drawAraucania(k,f,companion);
  return true;
}
