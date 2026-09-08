const NS='http://www.w3.org/2000/svg';
const ink='#284653',ivory='#fffaf0',edge='#c5a36b',green='#368b78',berry='#ad596e';
export const PAGE_LEFT='M-177-23Q-99-69-9-34L-9 87Q-91 54-173 86Z';
export const PAGE_RIGHT='M-9-34Q80-72 177-29L168 82Q79 52-9 87Z';
export const PAGE_SMALL='M-67-82L59-61L67 72L-57 91Z';
let serial=0;
const el=(tag,attrs={})=>{const n=document.createElementNS(NS,tag);for(const [k,v] of Object.entries(attrs))n.setAttribute(k,v);return n;};
const p=(d,fill='none',stroke=ink,width=2)=>el('path',{d,fill,stroke,'stroke-width':width,'stroke-linecap':'round','stroke-linejoin':'round'});
function pageTitle(content,defs,baseline,size,fill=ink){
  const id=`wormbook-title-${++serial}`;
  defs.append(el('path',{id,d:baseline,fill:'none'}));
  const lettering=el('text',{'text-anchor':'middle',fill,style:`font:700 ${size}px Georgia,serif;letter-spacing:.2px`});
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
export function bookPage(small,index=0,side='right'){
  const shape=small?PAGE_SMALL:side==='left'?PAGE_LEFT:PAGE_RIGHT;
  const g=el('g'),id=`wormbook-page-${++serial}`,defs=el('defs'),clip=el('clipPath',{id});clip.append(p(shape));defs.append(clip);
  g.append(defs,p(shape,ivory,'#a8997e',1.2));
  const content=el('g',{'clip-path':`url(#${id})`});g.append(content);
  const left=side==='left';
  if(index===0&&!small&&left){
    pageTitle(content,defs,'M-164 1Q-99-32-29-9',21);
    const plate=el('g',{transform:'matrix(1 -.04 0 .84 -98 31)','data-book-plate':''});
    plate.append(el('ellipse',{cx:0,cy:0,rx:47,ry:34,fill:'#f4eedb',stroke:'#d1b986','stroke-width':1}));
    const worm=wormEngraving();worm.setAttribute('transform','translate(0 -4) scale(.82)');plate.append(worm);content.append(plate);
    content.append(p('M-125 69Q-98 64-71 67','none',edge,1.2));
  }else{
    // One centred specimen plate per page, in the local paper plane.
    const plane=el('g',{transform:small?'matrix(1 .02 .065 .84 -1 1)':left?'matrix(1 -.04 0 .88 -98 13)':'matrix(1 .035 0 .88 83 12)','data-book-plate':''});
    plane.append(el('ellipse',{cx:0,cy:0,rx:small?48:59,ry:small?60:51,fill:'#f5efdf',stroke:'#d5c197','stroke-width':1.1}));
    const art=microbePlate(index===0?0:index+(left?0:1));
    art.setAttribute('transform',small?'scale(.86)':'scale(.96)');plane.append(art);content.append(plane);
    content.append(p(small?'M-34 64L33 54':left?'M-132 66Q-98 60-64 66':'M49 65Q82 59 116 63','none',edge,1.3));
  }
  // Deliberately light binding shadows, not heavy ink boxes around each page.
  if(!small)content.append(p(left?'M-15-31Q-20 24-14 86L-9 87V-34Z':'M-9-34L-4-36Q-2 21-3 85L-9 87Z','#b7a08155','none',0));
  return g;
}
export function insideCover(){
  const g=el('g');g.append(p('M-79-95L66-70L74 76L-67 98Z','#e9dcc3',ink,2.8),p('M-64-79L53-60L60 64L-54 82Z','#f6eedb','#c1ac86',1.2));return g;
}
export function drawWormbook(group,small){
  group.setAttribute('data-wormbook','');
  if(small){
    group.append(el('ellipse',{cx:-3,cy:109,rx:89,ry:10,fill:'#243d4926'}),
      p('M-83-94L72-68L82 84L-70 106Z','#57466f',ink,3),
      p(PAGE_SMALL,ivory,'#b7a281',2),
      p('M59-61L72-68L82 84L67 72Z','#d1bea0',ink,2),
      p('M-57 91L67 72L82 84L-70 106Z','#e8dac0',ink,2),
      p('M-55 95L68 76M-54 100L73 81','none','#b7a281',1));
    const cover=el('g',{'data-book-content':''});
    cover.append(p('M-79-95L66-70L74 76L-67 98Z','#935a70',ink,3),
      p('M-73-89L60-67M-73-89L-61 91','none','#bc8a97',1.7),
      p('M-67-81L55-61L63 68L-57 87Z','none','#d9b577',1.8),
      p('M-61-73L49-55L57 63L-51 80Z','none','#bb8591',.8));
    const coverDefs=el('defs');cover.append(coverDefs);
    pageTitle(cover,coverDefs,'M-63-40L54-21',18,'#fff2cf');
    const inset=el('g',{transform:'matrix(1 .025 .065 .88 -3 30)','data-book-plate':''});
    inset.append(el('ellipse',{cx:1,cy:1,rx:44,ry:41,fill:'#694453'}),el('ellipse',{cx:0,cy:0,rx:43,ry:40,fill:'#ecdbb7',stroke:'#d5b46f','stroke-width':1.8}),el('ellipse',{cx:0,cy:0,rx:38,ry:35,fill:'none',stroke:'#bba574','stroke-width':.8}));
    const emblem=wormEngraving();emblem.setAttribute('transform','translate(1 -4) scale(.76)');inset.append(emblem);cover.append(inset);
    cover.append(p('M-49-61L-35-59M26-48L41-46M-46 72L-35 70M35 58L47 56','none','#d9b577',1.5));group.append(cover);
    const spine=p('M-79-95L-67 98L-91 89L-102-86Z','#57466f',ink,3);spine.setAttribute('data-book-binding','');group.append(spine,
      p('M-96-60L-76-57M-92-15L-73-12M-89 30L-70 33M-86 71L-68 74','none','#d1ad6b',2.5));
    group.append(p('M-98-81L-87 84','none','#9582a0',1.4),p('M-77-83L-66 84','none','#3c354b',1.1));
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
