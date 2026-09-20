const NS='http://www.w3.org/2000/svg';
const ink='#284653',ivory='#fffaf0',edge='#c5a36b',green='#368b78',berry='#ad596e';
export const PAGE_LEFT='M-177-23Q-99-69-9-34L-9 87Q-91 54-173 86Z';
export const PAGE_RIGHT='M-9-34Q80-72 177-29L168 82Q79 52-9 87Z';
export const PAGE_SMALL='M-67-82L59-61L67 72L-57 91Z';
export const SMALL_REFLECTION='matrix(-1 0 .124 1 -146 0)';
export const SPREADS=[['title','giant-snack'],['balancing','tumble'],['boat','overloaded'],['picnic','sharing']];
export const SMALL_SPREADS=[['title','pillow'],['leaf-lift','leaf-fall'],['rain','shelter'],['bedtime','dream']];
let serial=0;
const el=(tag,attrs={})=>{const n=document.createElementNS(NS,tag);for(const [k,v] of Object.entries(attrs))n.setAttribute(k,v);return n;};
const p=(d,fill='none',stroke=ink,width=2)=>el('path',{d,fill,stroke,'stroke-width':width,'stroke-linecap':'round','stroke-linejoin':'round'});
function pageTitle(content,defs,baseline,size,fill=ink){
  const id=`wormbook-title-${++serial}`;
  defs.append(el('path',{id,d:baseline,fill:'none'}));
  const lettering=el('text',{'text-anchor':'middle',fill,stroke:fill,'stroke-width':.3,'paint-order':'stroke fill',style:`font:700 ${size}px Georgia,serif;letter-spacing:.2px`});
  const line=el('textPath',{href:`#${id}`,startOffset:'50%'});line.textContent='Wormbook';lettering.append(line);content.append(lettering);
}

// Original natural-history-style drawings. Cell boundaries, cytoplasm and
// sparse nucleoid/ribosome marks remain distinct at the small page scale.
export function microbePlate(kind=0){
  const g=el('g',{'stroke-linecap':'round','stroke-linejoin':'round'});
  function rod(x,y,angle,size=1){
    const r=el('g',{transform:`translate(${x} ${y}) rotate(${angle}) scale(${size})`});
    r.append(el('rect',{x:-37,y:-15,width:74,height:30,rx:15,fill:'#cfe8d9',stroke:green,'stroke-width':2}),
      el('rect',{x:-32,y:-10,width:64,height:20,rx:10,fill:'#e5f2dd',stroke:'#7aaf91','stroke-width':1}),
      p('M-14 1C-20-8-1-8 5-2S22 7 11 7S-2-5-10 1S9 9 14 2','none',berry,1.9),
      p('M-24-9Q-19-13-12-12','none','#fffef2',2.2));
    for(const [cx,cy] of [[-23,3],[-7,7],[0,-7],[23,-4],[25,5]])r.append(el('circle',{cx,cy,r:1.6,fill:green}));g.append(r);
  }
  if(kind%3===0){rod(-7,-22,-22,1.02);rod(12,24,14,.84);}
  else if(kind%3===1){
    for(const [cx,cy,r] of [[-12,-26,13],[13,-22,12],[-28,-5,12],[-3,-1,14],[25,2,12],[-19,20,12],[8,27,13]]){
      g.append(el('circle',{cx,cy,r,fill:'#e0b882',stroke:'#8d664a','stroke-width':1.8}),
        el('circle',{cx:cx-1,cy:cy-1,r:r-3.6,fill:'#f3d9a5'}),
        p(`M${cx-6} ${cy-5}Q${cx-3} ${cy-9} ${cx+2} ${cy-8}`,'none',ivory,2),
        p(`M${cx-4} ${cy+1}Q${cx} ${cy-3} ${cx+4} ${cy+2}`,'none','#ad7961',1.3));
    }
  }else{
    const curve='M-40 25C-47 5-11 14-20-7S14-16 6-34S34-24 32-43';
    const s=el('g',{transform:'translate(-3 9) rotate(18)'});
    s.append(p(curve,'none','#386e72',8),p(curve,'none','#74bdb4',5),p(curve,'none','#c3e5cf',1.5));g.append(s);
  }
  return g;
}
function wormEngraving(){
  const g=el('g');
  g.append(p('M-43 24C-26 44-4 32-9 10C-16-15-3-34 14-31C30-28 27-4 38-12C44-16 47-11 42-6C24 10 19-21 12-23C2-26-3-9 3 8C14 40-21 52-43 24Z',green,'#2a7064',1.2),
    p('M-32 32C-19 40-7 24-12 9C-19-13-2-32 12-28','none','#b6dbc0',2),
    p('M38-10L41-12','none','#e0eed0',1.5));
  return g;
}
function illustratedPlate(subject){
  if(['rods','cocci','spiral'].includes(subject))return microbePlate(['rods','cocci','spiral'].indexOf(subject));
  const g=el('g',{'data-book-subject':subject});
  if(subject==='agar'){
    g.append(p('M-53-7V12C-53 46 53 46 53 12V-7Z','#d4e0d7',ink,1.8),
      el('ellipse',{cx:0,cy:9,rx:49,ry:29,fill:'#e5ca80',stroke:'#ab8e53','stroke-width':1.3}),
      el('ellipse',{cx:0,cy:-7,rx:53,ry:30,fill:'#edf5ec88',stroke:ink,'stroke-width':1.8}),
      el('ellipse',{cx:0,cy:-5,rx:46,ry:25,fill:'#e5d497',stroke:'#afbb9d','stroke-width':1}));
    for(const [x,y] of [[-31,-12],[-17,9],[9,-20],[26,0],[12,15],[-3,-2]])g.append(el('circle',{cx:x,cy:y,r:2.5,fill:'#8d9b59'}));
    g.append(p('M-26 0C-15-15-8 15 6 2S25-9 30-2','none',green,3.2),p('M-42-17Q-29-29-11-28','none',ivory,2.5),p('M-43 24Q-14 41 32 29','none','#f7faf0',2));
  }else if(subject==='feeding'){
    g.append(p('M-51 34C-25 55-3 28-16 7C-29-13-19-33-3-28C10-24 8-5 24-10C34-14 34-5 26-2C7 7 0-17-8-18C-16-18-13-5-6 6C13 35-27 64-51 34Z','#7ab897',green,1.8),
      p('M-40 38C-21 44-8 23-19 7C-29-10-18-27-7-25','none','#d5e4b5',2.3));
    for(const [x,y,a] of [[35,-26,20],[44,-9,-22],[27,-39,-13],[49,-31,40]])g.append(el('rect',{x:x-5,y:y-2.5,width:10,height:5,rx:2.5,fill:'#ca9a61',stroke:'#956647','stroke-width':1,transform:`rotate(${a} ${x} ${y})`}));
  }else if(subject==='division'){
    const cell=(x,y,w)=>{const c=el('g');c.append(el('rect',{x:x-w/2,y:y-9,width:w,height:18,rx:9,fill:'#d6e9cb',stroke:green,'stroke-width':1.8}),p(`M${x-5} ${y}q3-7 8 0t8 0`,'none',berry,1.5));g.append(c);};
    cell(0,-36,43);
    g.append(p('M0-23V-15M-3-18L0-15L3-18','none',edge,1.2));
    cell(0,0,69);g.append(p('M0-9Q-5 0 0 9M1-9Q6 0 1 9','none',green,1.4),p('M-24 0q3-7 8 0t7 0','none',berry,1.5),p('M0 14V22M-3 19L0 22L3 19','none',edge,1.2));
    cell(-23,37,35);cell(23,37,35);
  }else if(subject==='mushroom'){
    g.append(p('M-10-9C-11 5-4 18-15 34Q-4 43 7 34C0 22 4 4 2-8Z','#e8d8af','#88654d',1.7),
      p('M-48-8Q-15-60 24-31Q42-24 49-7Q0 13-48-8Z','#bc8461','#805642',1.8),
      p('M-48-8Q-1-1 49-7Q10 24-25 4Q-43-2-48-8Z','#ebcb9b','#805642',1.5));
    for(const [x,y] of [[-38,-5],[-27,0],[-15,3],[14,3],[27,0],[38,-4]])g.append(p(`M0 9L${x} ${y}`,'none','#926544',1.5));
    g.append(p('M-35-19Q-13-45 11-33','none','#e3b88a',2),p('M23-31L17-24L23-20L15-13L32-10','none','#805642',1.5),p('M-6 12Q-3 24-8 32','none','#fff4d6',2.1),p('M-43 41Q-18 31 4 42T46 38','none','#ad9870',1.5));
    for(const [x,y] of [[-30,32],[25,32],[36,24]])g.append(el('ellipse',{cx:x,cy:y,rx:7,ry:2.5,fill:green,transform:`rotate(-20 ${x} ${y})`}));
  }
  return g;
}
// Two wordless comics. Broad silhouettes carry each setup and payoff.
function storyPlate(subject,small=false){
 const g=el('g',{'data-book-story':subject,'data-book-character':small?'sleepy':'picnic'});
 const line=(d,color=ink,w=2.2)=>p(d,'none',color,w);
 function worm(x,y,pose='curl',expression='happy',size=1,angle=0){
  const w=el('g',{transform:`translate(${x} ${y}) rotate(${angle}) scale(${size})`});
  const shapes={curl:'M-36 12C-29 33 1 34-6 10C-12-10 1-24 12-13S17 2 29-9',reach:'M-38 26C-20 35-13 13-18-3S-8-33 7-24C21-14 14 6 29-9',flat:'M-43 9C-25 24-14 4-1 14S16 4 29-9',coil:'M-33 18C-12 42 20 24 6 5C-5-10-22 4-14 16S12 20 16 4Q20-5 29-9'};
  w.append(p(shapes[pose],'none',small?'#715845':'#91603d',14),p(shapes[pose],'none',small?'#d69a61':'#e8b44d',10));
  if(expression==='sleep')w.append(line('M24-12q3 3 6 0',ink,2));
  else{w.append(el('ellipse',{cx:26,cy:-12,rx:3.6,ry:4.2,fill:ivory,stroke:ink,'stroke-width':1}),el('circle',{cx:27,cy:-12,r:1.9,fill:ink}));}
  if(expression==='surprise')w.append(el('ellipse',{cx:31,cy:-5,rx:2.4,ry:3.2,fill:ink}));
  else w.append(line('M29-5q4 3 6-1',ink,1.8));
  g.append(w);return w;
 }
 function cell(x,y,size=1,angle=0){
  const c=el('g',{transform:`translate(${x} ${y}) rotate(${angle}) scale(${size})`});
  c.append(el('rect',{x:-14,y:-7,width:28,height:14,rx:7,fill:'#78b890',stroke:'#24594c','stroke-width':2}),line('M-7 0q3-5 6 0t7 0','#eaf4d9',2));g.append(c);
 }
 function leaf(x,y,angle=0,size=1){
  const l=el('g',{transform:`translate(${x} ${y}) rotate(${angle}) scale(${size})`});
  l.append(p('M-43 0Q-10-31 43 0Q9 25-43 0Z','#63a280','#2b6351',2.2),line('M-40 0Q0 5 43 0','#dce8ae',2),line('M-20-12L-9 2M2-14L13 3M-10 13L1 3M20 10L27 2','#326d53',1.6));g.append(l);return l;
 }
 function mushroom(x=0,y=0,size=1){
  const m=el('g',{transform:`translate(${x} ${y}) scale(${size})`});
  m.append(p('M-7-5L-10 35Q0 41 9 34L6-6Z','#e9d4a3','#79513d',2),p('M-46-5Q-17-52 12-36Q35-28 46-5Q0 12-46-5Z','#b96951','#754436',2.5),p('M-46-5Q0 4 46-5Q4 21-46-5Z','#efc292','#754436',1.6),line('M-29-17Q-11-34 8-28','#f0b183',3));g.append(m);
 }
 function cloth(){g.append(p('M-43 6L25 0L46 37L-26 43Z','#f1d4b1','#a55c55',2));for(const d of ['M-26 5L-9 40','M-8 3L9 39','M10 2L27 38','M-34 19L33 13','M-27 32L41 27'])g.append(line(d,berry,2));}
 function splash(){g.append(line('M-48 35q12-7 24 0t24 0t24 0t24 0','#528d9d',2.2));}
 if(subject==='title'){
  worm(-3,4,small?'coil':'reach',small?'sleep':'happy');
 }else if(subject==='giant-snack'){
  cell(3,-22,2.35,-10);worm(-11,25,'reach','surprise',.72);
 }else if(subject==='balancing'){
  worm(-7,22,'flat','surprise',.9);cell(10,-7,1.35,4);cell(7,-24,1.25,-10);cell(14,-40,1.12,12);
 }else if(subject==='tumble'){
  worm(-7,22,'coil','surprise',.95);cell(-27,-24,1.2,-46);cell(17,-30,1.2,37);cell(37,18,1.05,64);g.append(line('M-44-38l-5-6M39-37l7-4M46-16l6 2',berry,2.5));
 }else if(subject==='boat'){
  splash();leaf(0,27,-6,1.1);g.append(p('M-24-34L-2-15L-24-7Z','#efd8a2',berry,2),line('M-24-36V26',berry,2.5));worm(-8,3,'flat','happy',.87);cell(32,9,.85);
 }else if(subject==='overloaded'){
  splash();leaf(0,30,18,1.03);worm(-23,2,'reach','surprise',.67,-16);cell(17,16,1.15,18);cell(22,-1,1.15,18);cell(27,-18,1.15,18);cell(33,-35,1.05,18);
 }else if(subject==='picnic'){
  mushroom(-16,-10,.82);cloth();worm(7,20,'curl','happy',.75);cell(-17,14,.8);
 }else if(subject==='sharing'){
  cloth();worm(-24,-12,'flat','happy',.73);worm(17,24,'coil','happy',.66,178);cell(-5,10,.9);cell(17,7,.8);
 }else if(subject==='pillow'){
  g.append(el('rect',{x:7,y:-7,width:38,height:22,rx:10,fill:'#cfbddc',stroke:'#6b537d','stroke-width':2.5}));worm(-12,-5,'coil','sleep',.94);g.append(line('M-38 35H40',edge,2));
 }else if(subject==='leaf-lift'){
  worm(-8,24,'flat','surprise',.94);leaf(1,-23,-18,.9);g.append(line('M-43-6q18-14 38-4M-47-18q11-8 22-5M26-4q11-7 19-6','#528d9d',2));
 }else if(subject==='leaf-fall'){
  worm(-3,25,'flat','surprise',.97);leaf(-4,4,13,1.15);g.append(line('M-26-40l6 13M3-45v15M29-38l-5 12',edge,2.5));
 }else if(subject==='rain'){
  g.append(line('M0-22Q9-4 21 8','#2b6351',2.8));worm(-4,21,'reach','surprise',.9);leaf(0,-24,0,1.08);g.append(line('M-37-7L-42 7M-45 18L-48 28M37-7L32 7M46 17L41 31','#528d9d',3));
 }else if(subject==='shelter'){
  mushroom(0,-6,1.02);worm(-6,30,'coil','happy',.76);g.append(line('M-47-28l-5 12M48-20l-4 11','#528d9d',2.8));
 }else if(subject==='bedtime'){
  // A book inside the book: the character nods off halfway through a page.
  g.append(p('M-41 0Q-20-8 0 2Q24-8 43 0L41 37Q19 30 0 39Q-23 31-41 38Z','#fff7e8','#68517a',3),line('M0 2V39',edge,2));
  worm(-6,6,'flat','sleep',1.02);g.append(line('M-30 15h19M-30 23h16M13 15h18M13 23h15',green,2.8));
 }else if(subject==='dream'){
  worm(-8,26,'coil','sleep',.89);g.append(el('ellipse',{cx:5,cy:-24,rx:37,ry:22,fill:'#e5ead2',stroke:'#648475','stroke-width':2}),el('circle',{cx:23,cy:4,r:4,fill:'#e5ead2',stroke:'#648475','stroke-width':1.5}));cell(-10,-25,1.08,-12);cell(20,-24,.95,18);
 }
 return g;
}
export function bookPage(small,index=0,side='right'){
  const shape=small?PAGE_SMALL:side==='left'?PAGE_LEFT:PAGE_RIGHT;
  const left=side==='left',reflection=small&&left?SMALL_REFLECTION:null;
  const g=el('g'),id=`wormbook-page-${++serial}`,defs=el('defs'),clip=el('clipPath',{id}),paper=p(shape,ivory,'#a8997e',1.2),mask=p(shape);
  if(reflection){paper.setAttribute('transform',reflection);mask.setAttribute('transform',reflection);}clip.append(mask);defs.append(clip);
  g.append(defs,paper);
  const content=el('g',{'clip-path':`url(#${id})`});g.append(content);
  const spreads=small?SMALL_SPREADS:SPREADS,subject=spreads[index%spreads.length][left?1:0];g.setAttribute('data-page-subject',subject);
  // The reader is beyond the upper edge. Page tops face the lower, outer edge;
  // turn lettering and pictures in their own paper plane, never mirror them.
  const plane=el('g',{transform:small?(left?'matrix(-1 .02 -.065 -.84 -145 1)':'matrix(-1 -.02 -.065 -.84 -1 1)'):left?'matrix(-1 .04 0 -.88 -98 20)':'matrix(-1 -.035 0 -.88 83 20)','data-book-plate':'','data-reader-facing':''});
  content.append(plane);
  if(subject==='title'){
    pageTitle(plane,defs,small?'M-59-27H59':'M-75-23H75',small?24:28);
    const art=storyPlate(subject,small);art.setAttribute('transform','translate(0 19) scale(1.12 .96)');plane.append(art);
  }else{
    const art=storyPlate(subject,small);art.setAttribute('transform',small?'scale(1.06 .98)':'scale(1.35 1.04)');plane.append(art);
  }
  if(!small)content.append(p(left?'M-15-31Q-20 24-14 86L-9 87V-34Z':'M-9-34L-4-36Q-2 21-3 85L-9 87Z','#b7a08155','none',0));
  return g;
}
export function insideCover(){
  const g=el('g');g.append(p('M-79-95L66-70L74 76L-67 98Z','#e9dcc3',ink,2.8),p('M-64-79L53-60L60 64L-54 82Z','#f6eedb','#c1ac86',1.2));return g;
}
export function drawWormbook(group,small){
  group.setAttribute('data-wormbook','');
  const plane=el('g',{'data-book-plane':'',transform:small?'matrix(1 0 -.08 .87 0 0)':'matrix(1 0 .06 .94 0 0)'});group.append(plane);group=plane;
  if(small){
    // A compact stitched field book, already open toward its reader.
    group.append(el('ellipse',{cx:-77,cy:106,rx:159,ry:9,fill:'#243d4926'}));
    const back=insideCover();back.setAttribute('transform',SMALL_REFLECTION);group.append(back,
      p('M-83-94L72-68L82 84L-70 106Z','#935a70',ink,2.5),
      p('M-57 91L67 72L82 84L-70 106Z','#e8dac0',ink,1.7),
      p('M-55 95L68 76M-54 100L73 81','none','#b7a281',1));
    const pages=el('g',{'data-book-content':''});pages.append(bookPage(true,0,'left'),bookPage(true,0,'right'));group.append(pages);
    const spine=p('M-78-82L-67 90','none','#84654c',2);spine.setAttribute('data-book-binding','');group.append(spine,
      p('M-76-52l5 1M-72-8l5 1M-69 36l5 1M-66 75l5 1','none','#c9a570',1.7),
      p('M-117 86L-120 108L-111 103L-105 111L-106 83Z',berry,ink,1.4));
  }else{
    group.append(el('ellipse',{cx:2,cy:120,rx:190,ry:12,fill:'#243d4926'}),
      p('M-190-28Q-105-88-9-44Q86-94 190-35L181 100Q82 72-9 118Q-105 75-184 111Z','#57466f',ink,3.5),
      p('M-183-24Q-103-77-9-39Q83-81 183-31','none','#d8b674',2),
      p('M-173 80Q-95 55-9 89Q78 54 168 78L164 102Q76 72-9 114Q-102 72-170 106Z','#e6d7bb',ink,2.2),
      p('M-170 92Q-94 67-9 103Q78 66 165 91M-169 100Q-96 75-9 110Q78 72 164 98','none','#b8a17c',1.3));
    const pages=el('g',{'data-book-content':''});pages.append(bookPage(false,0,'left'),bookPage(false,0,'right'));group.append(pages);
    const binding=p('M-9-34Q-13 31-9 113','none','#b69a67',2);binding.setAttribute('data-book-binding','');group.append(binding,
      p('M4 94L9 121L19 109L28 118L21 91Z',berry,ink,1.8));
  }
}
