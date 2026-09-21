// Original vector artwork. Botanical reference and fantasy boundary in the Lombok dossier.
const add=(p,t,a={})=>{const n=document.createElementNS('http://www.w3.org/2000/svg',t);for(const[k,v]of Object.entries(a))n.setAttribute(k,v);p.appendChild(n);return n;};
const path=(p,d,fill,stroke='none',w=1)=>add(p,'path',{d,fill,stroke,'stroke-width':w,'stroke-linecap':'round','stroke-linejoin':'round'});
export const forestLayouts={
  'hpt26-leaf-fans':{primary:[369,151,.72,-14],companion:[149,150,.60,8]},
  'hpt26-butterflies':{primary:[402,74,.7,-24],companion:[-5,124,.56,20]}
};
export function refineLombokFig(group,male){
  const prefix=`hpt26-fig-${male?'male':'female'}`,defs=add(group,'defs');
  const skin=add(defs,'linearGradient',{id:prefix+'-skin',x1:'0%',y1:'5%',x2:'100%',y2:'85%'});
  [['0%','#b19aaf'],['25%','#856580'],['57%','#604461'],['100%','#392d44']].forEach(([offset,color])=>add(skin,'stop',{offset,'stop-color':color}));
  const flesh=add(defs,'radialGradient',{id:prefix+'-flesh',cx:'48%',cy:'42%',r:'70%'});
  [['0%','#c65869'],['65%','#a53955'],['100%','#74273e']].forEach(([offset,color])=>add(flesh,'stop',{offset,'stop-color':color}));
  group.querySelectorAll('.lingsar-fig-skin').forEach(n=>{n.style.fill=`url(#${prefix}-skin)`;n.style.stroke='#483448';n.style.strokeWidth='1.6';});
  group.querySelectorAll('.lingsar-fig-pith').forEach(n=>{n.style.fill='#f4dfb9';n.style.stroke='#dbb891';n.style.strokeWidth='.8';});
  group.querySelectorAll('.lingsar-fig-flesh').forEach((n,side)=>{
    n.style.fill=`url(#${prefix}-flesh)`;n.style.stroke='#d88487';n.style.strokeWidth='.7';
    // Confine the fine radial florets and seeds to the cut flesh.
    const clip=add(defs,'clipPath',{id:prefix+'-cut-'+side});add(clip,'path',{d:n.getAttribute('d')});
    const detail=add(n.parentNode,'g',{class:'lingsar-fig-cut-detail','clip-path':`url(#${prefix}-cut-${side})`});
    const cx=side?35:-33,cy=male?8:5;
    for(let i=0;i<30;i++){
      const a=i*2.399,rr=14+(i%5)*11,x=cx+Math.cos(a)*rr,y=cy+Math.sin(a)*rr;
      path(detail,`M${cx} ${cy}Q${(cx+x)/2} ${y*.7} ${x} ${y}`,'none',i%2?'#ecaa9a':'#e5898a',.95);
      add(detail,'ellipse',{cx:x,cy:y,rx:1.6,ry:2.5,fill:'#ffe1a4',transform:`rotate(${a*180/Math.PI} ${x} ${y})`});
    }
  });
  group.querySelectorAll('.lingsar-fig-seed').forEach(n=>{n.style.fill='#ffe3aa';n.setAttribute('rx','1.7');n.setAttribute('ry','2.3');});
  group.querySelectorAll('.lingsar-fig-stem').forEach(n=>{n.style.fill='#8a7950';n.style.stroke='#5d503d';n.style.strokeWidth='1.4';});
}
export function drawLombokForest(group,item,male){
  if(!forestLayouts[item.family])return false;
  group.dataset.renderer=item.family;
  if(item.family==='hpt26-leaf-fans'){
    const fan=add(group,'g',{'data-lombok-fan':''});
    // The broad leaf cups inward; the narrow companion has a turned tip.
    const id='hpt26-leaf-'+(male?'male':'female'),defs=add(fan,'defs');
    const d=male?'M0 30C-12 23-30 4-35-17C-40-36-33-52-20-69Q-12-59-4-58C12-46 20-23 16-7Q12 14 0 30Z':'M0 31C-14 23-37 19-48-3C-57-20-51-43-36-57Q-25-67-25-77C-13-66 8-71 26-59C43-48 48-25 39-6C32 12 14 17 0 31Z';
    const shade=add(defs,'linearGradient',{id:id+'-shade',x1:'0%',y1:'0%',x2:'100%',y2:'80%'});
    [['0%','#b4cd7c'],['32%','#739f55'],['62%','#43804e'],['100%','#205641']].forEach(([offset,color])=>add(shade,'stop',{offset,'stop-color':color}));
    const clip=add(defs,'clipPath',{id:id+'-edge'});add(clip,'path',{d});
    path(fan,d,'url(#'+id+'-shade)','#254d38',1.5);
    const detail=add(fan,'g',{'clip-path':'url(#'+id+'-edge)'});
    path(detail,male?'M0 30Q-13-16-20-69C-3-44 15-16 0 30Z':'M0 31Q-14-15-25-77C-11-41 9-17 0 31Z','#c3d38b').setAttribute('opacity','.32');
    const veins=male?[
      'M-2 20Q-17 11-28 1','M-5 7Q-25-4-33-17','M-8-8Q-28-21-33-34','M-12-25Q-28-36-27-48','M-16-43Q-24-50-23-60',
      'M-2 20Q10 10 14-5','M-5 7Q12-6 15-22','M-8-8Q8-20 8-37','M-12-25Q0-36-3-48','M-16-43Q-9-49-11-58'
    ]:[
      'M-2 20Q-23 17-38 1','M-5 6Q-32 0-47-18','M-9-10Q-36-20-43-36','M-13-27Q-33-35-34-50','M-19-47Q-27-49-28-62',
      'M-2 20Q23 12 32-3','M-5 6Q28-4 39-20','M-9-10Q22-20 36-36','M-13-27Q15-40 23-51','M-19-47Q-2-56 7-60'
    ];
    veins.forEach(d=>path(detail,d,'none','#c3d49a',1.1).setAttribute('opacity','.75'));
    // A folded lip catches light along one edge, with shadow beneath it.
    path(detail,male?'M-20-69Q-20-53-4-58L-11-50Q-24-53-20-69Z':'M-25-77Q-25-64-13-65L-21-57Q-30-62-25-77Z','#c7d993','#416848',.65);
    path(fan,male?'M0 42Q-5-8-20-67':'M0 42Q-8-14-25-75','none','#d1d9a0',2.1);
    path(fan,'M0 36Q1 45 1 54','none','#76533a',4.5);
    path(fan,'M-1 37L0 52','none','#bc9162',1.2);
    for(let y=37;y<49;y+=3)path(fan,`M-3 ${y}L3 ${y+1}`,'none','#dbc397',1.5);
    return true;
  }
  const flight=add(group,'g',{'data-lombok-butterfly':''});
  const wingId='hpt26-wing-'+(male?'male':'female'),wingDefs=add(flight,'defs');
  const colour=add(wingDefs,'linearGradient',{id:wingId,x1:'0%',y1:'100%',x2:'75%',y2:'0%'});
  [['0%','#236b93'],['48%','#43b8c9'],['100%','#b1e9df']].forEach(([offset,color])=>add(colour,'stop',{offset,'stop-color':color}));
  for(const side of[-1,1]){
    const wing=add(flight,'g',{'data-butterfly-wing':side,transform:`scale(${side} 1)`});
    const fore=male?'M1-6C9-29 25-40 31-32C34-15 26-3 2 6Z':'M1-6C11-32 41-41 44-28C46-11 27 2 2 7Z';
    const hind=male?'M2 4C21-1 30 12 21 22C14 30 5 20 1 12Z':'M2 4C31-1 37 15 24 25L18 33L16 23C7 26 1 19 1 12Z';
    path(wing,hind,'#263f5b','#192f49',1.1);path(wing,fore,'#263f5b','#192f49',1.2);
    path(wing,male?'M4-5Q15-28 27-30Q28-16 19-8Z':'M5-4Q18-28 38-29Q38-17 24-8Z','url(#'+wingId+')');
    path(wing,male?'M5 7Q21 3 23 15Q15 23 6 16Z':'M5 7Q27 2 29 14Q22 23 8 18Z','#449eb5');
    for(let i=0;i<3;i++)path(wing,`M3 3L${male?16+i*4:19+i*8} ${-14-i*6}`,'none','#2d6d92',.8);
    for(let i=0;i<4;i++)add(wing,'ellipse',{cx:male?29-i*2:40-i*3,cy:-24+i*7,rx:1.5,ry:1.9,fill:'#daeee2'});
    add(wing,'circle',{cx:male?16:21,cy:15,r:3.7,fill:'#c5e7df'});add(wing,'circle',{cx:male?16:21,cy:15,r:2,fill:'#203b60'});
  }
  add(flight,'ellipse',{cx:0,cy:8,rx:2.3,ry:12,fill:'#493b37'});
  add(flight,'ellipse',{cx:0,cy:-3,rx:3.3,ry:5.5,fill:'#66534a'});
  add(flight,'circle',{cx:0,cy:-10,r:3,fill:'#3d3433'});
  path(flight,'M-1-11Q-5-20-8-19M1-11Q5-20 8-19','none','#453837',1);
  for(const x of[-8,8])add(flight,'ellipse',{cx:x,cy:-19,rx:1.4,ry:1.9,fill:'#453837'});
  path(flight,'M-2 0L-7 7M2 0L7 7M-2 3L-7 12M2 3L7 12M-2 6L-6 16M2 6L6 16','none','#493b37',.7);
  return true;
}
