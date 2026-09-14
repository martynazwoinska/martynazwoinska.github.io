// Original drawings. Leaf-cutter ants are regional context, not QG2726 collectors.
export const LEAF_FAMILY='qg2726-leaf-cutting';
const ink='#34484b', green='#397655', pale='#e7efc6', steel='#bfd0d6';
const add=(g,t,a={})=>{const n=document.createElementNS('http://www.w3.org/2000/svg',t);Object.entries(a).forEach(([k,v])=>n.setAttribute(k,v));g.appendChild(n);return n;};
const p=(g,d,fill,stroke=ink,w=1.5,a={})=>add(g,'path',{d,fill,stroke,'stroke-width':w,'stroke-linecap':'round','stroke-linejoin':'round',...a});
const e=(g,x,y,rx,ry,fill,stroke=ink,w=1)=>add(g,'ellipse',{cx:x,cy:y,rx,ry,fill,stroke,'stroke-width':w});
const clamp=x=>Math.max(0,Math.min(1,x));
const ease=x=>{x=clamp(x);return x*x*(3-2*x);};
const whole='M-64 0C-34-40 0-46 32-25Q58-15 78 0Q58 16 32 25C0 46-35 34-64 0Z';
const remainder='M-64 0C-34-40 0-46 32-25V25C0 46-35 34-64 0Z';
let clipSerial=0,antSerial=0;
const cutEdges=[78,32,4,-24];
// Intersect the existing leaf's two curved edges, preserving its original drawing.
export function leafCutSection(count=0){
  const index=count%3,x=cutEdges[index+1];
  const edgeY=(xs,ys)=>{
    const value=(v,t)=>v[0]*(1-t)**3+3*v[1]*(1-t)**2*t+3*v[2]*(1-t)*t*t+v[3]*t**3;
    let lo=0,hi=1;
    for(let i=0;i<40;i++){const mid=(lo+hi)/2;if(value(xs,mid)<x)lo=mid;else hi=mid;}
    return value(ys,(lo+hi)/2);
  };
  return {x,right:cutEdges[index],top:edgeY([-64,-34,0,32],[0,-40,-46,-25]),bottom:edgeY([-64,-35,0,32],[0,34,46,25])};
}
function cutEdgePath(section){return `M${section.x} ${section.top}V${section.bottom}`;}
function showLeafCuts(leaf,count){
  const section=count?leafCutSection(count-1):null;
  leaf.setAttribute('data-leaf-cuts',count);
  leaf.querySelector('[data-leaf-clip]').setAttribute('width',section?section.x+90:180);
  leaf.querySelector('[data-leaf-cut-edge]').setAttribute('d',section?cutEdgePath(section):'');
}

function tip(g,border=true){
  p(g,'M32-25Q58-15 78 0Q58 16 32 25Z','#679e63',border?green:'none',1.5);
  p(g,'M32 0H74M43 0L44-16M52 0L58 10','none',pale,1.3);
}

export function drawLeafCutting(g,male){
  if(male){
    const holder=add(g,'g',{'data-panama-leaf':'','data-leaf-cuts':0});
    const clipId=`panama-leaf-${++clipSerial}`;
    const clip=add(add(holder,'defs'),'clipPath',{id:clipId,clipPathUnits:'userSpaceOnUse'});
    add(clip,'rect',{x:-90,y:-50,width:180,height:100,'data-leaf-clip':''});
    const leaf=add(holder,'g',{'data-leaf-surface':'','clip-path':`url(#${clipId})`});
    p(leaf,'M-64 0Q-77 4-83 14','none','#8f9d63',4);
    p(leaf,remainder,'#679e63','none');
    p(leaf,'M-62 0C-30 6 1 3 32 0V25C0 46-35 34-62 0Z','#46835b','none');
    const end=add(leaf,'g',{'data-leaf-tip':''});tip(end,false);
    p(leaf,whole,'none',green,1.8,{'data-leaf-outline':''});
    p(leaf,'M-65 0Q-17 4 32 0','none',pale,2);
    for(const [x,y] of [[-42,-13],[-25,-25],[-5,-31],[17,-29]]){
      p(leaf,`M${x-10} 1Q${x+2} ${y*.55} ${x} ${y}M${x-10} 2Q${x+3} ${-y*.55} ${x+6} ${-y*.82}`,'none','#b8d096',1.3);
    }
    p(leaf,'M-45-12Q-10-38 18-29','none','#a9c989',1.8);
    p(holder,'','none',green,1.8,{'data-leaf-cut-edge':''});
    return;
  }
  const scissors=add(g,'g',{'data-panama-scissors':''});
  // Each blade continues through the pivot to its own handle. Openings are holes.
  for(const [i,angle] of [[0,-15],[1,15]]){
    const half=add(scissors,'g',{'data-scissor-half':i,transform:`rotate(${angle})`});
    const sign=i?1:-1;
    p(half,`M-46 ${sign*-15}Q-21 ${sign*-6} -6 ${sign*9}L7 ${sign*11}Q65 ${sign*12} 98 0L6 0Q-17 ${sign*-16} -46 ${sign*-28}Z`,i?steel:'#96acb5',ink,1.7);
    p(half,`M7 0L96 0Q63 ${sign*5} 12 ${sign*6}Z`,i?'#f3f4e9':'#dce7e3','none');
    p(half,`M15 ${sign*9}Q54 ${sign*8} 77 ${sign*4}`,'none','#7e949f',.9);
    const y=sign*-26;
    const outline=i?`M-36 ${y-17}C-50 ${y-28}-82 ${y-27}-88 ${y-9}C-96 ${y+16}-69 ${y+25}-49 ${y+15}Q-34 ${y+8}-36 ${y-17}Z`:`M-36 ${y-15}C-50 ${y-27}-74 ${y-24}-80 ${y-6}C-85 ${y+12}-65 ${y+22}-49 ${y+14}Q-35 ${y+8}-36 ${y-15}Z`;
    const hole=i?`M-47 ${y-11}C-57 ${y-18}-75 ${y-17}-78 ${y-7}C-84 ${y+8}-66 ${y+15}-54 ${y+7}Q-45 ${y+2}-47 ${y-11}Z`:`M-47 ${y-9}C-57 ${y-17}-67 ${y-14}-70 ${y-5}C-74 ${y+5}-63 ${y+12}-55 ${y+6}Q-46 ${y+2}-47 ${y-9}Z`;
    p(half,outline+hole,i?'#994d71':'#763c5d',ink,2,{'fill-rule':'evenodd'});
    p(half,`M-75 ${y-11}Q-60 ${y-23}-43 ${y-12}`,'none','#df9fba',2);
    p(half,`M-72 ${y+15}Q-52 ${y+19}-41 ${y+5}`,'none','#5e314d',1.5);
  }
  e(scissors,0,0,9,9,'#e8eeeb',ink,1.8);e(scissors,0,0,4.8,4.8,'#8d9da5',ink,.9);
  p(scissors,'M-3 2L3-2','none','#f8f4dc',1.5);
}

// Small individual differences within one worker-ant palette, not colour-coded types.
export function leafAntVisitor(index=0){
  const fraction=n=>n-Math.floor(n),pick=(step,offset=0)=>fraction(index*step+offset);
  return {index,scale:.62+.19*pick(.618034,.2),
    headWidth:.88+.25*pick(.414214,.8),headHeight:.94+.13*pick(.732051,.2),
    gasterWidth:.86+.28*pick(.236068,.3),gasterHeight:.92+.17*pick(.645751,.7),
    legReach:.88+.23*pick(.316625,.4),stride:.023+.007*pick(.44949,.6),
    phase:index*1.73,entryY:-13+26*pick(.618034,.1),exitY:-10+33*pick(.414214,.65),
    entryX:86+25*pick(.732051,.4),exitX:139+23*pick(.236068,.8),
    arrivalDelay:-90+160*pick(.645751,.2),carryDuration:1860+280*pick(.316625,.8)};
}

export function leafAntPose(ms,visitor,dropped={x:30,y:277}){
  const grip={x:27+12*visitor.headWidth,y:-16+5*visitor.headHeight};
  // Meet the fallen piece with the mandibles, irrespective of head or body size.
  const pickup={x:dropped.x+grip.x*visitor.scale,y:dropped.y-grip.y*visitor.scale};
  const approach=ease((ms-1900-visitor.arrivalDelay)/(1150-visitor.arrivalDelay));
  const carry=ease((ms-3280)/visitor.carryDuration);
  const start={x:pickup.x+visitor.entryX,y:pickup.y+visitor.entryY};
  const end={x:pickup.x-visitor.exitX,y:pickup.y+visitor.exitY};
  const outbound=ms>=3280,q=outbound?carry:approach;
  const [a,b,c,d]=outbound
    ?[pickup,{x:pickup.x-38,y:pickup.y},{x:end.x+43,y:end.y},end]
    :[start,{x:start.x-32,y:start.y},{x:pickup.x+30,y:pickup.y},pickup];
  const value=k=>(1-q)**3*a[k]+3*(1-q)**2*q*b[k]+3*(1-q)*q*q*c[k]+q**3*d[k];
  const tangent=k=>3*(1-q)**2*(b[k]-a[k])+6*(1-q)*q*(c[k]-b[k])+3*q*q*(d[k]-c[k]);
  const walking=Math.sin(q*Math.PI);
  return {x:value('x'),y:value('y')+Math.sin(ms*visitor.stride+visitor.phase)*.35*walking,
    angle:Math.atan2(-tangent('y'),-tangent('x'))*180/Math.PI,
    walking,grip,approach,carry};
}

export function drawLeafAnt(g,visitor=leafAntVisitor()){
  const ant=add(g,'g',{'data-leaf-ant':'','data-ant-visitor':visitor.index});
  const legs=[];
  // Three far legs, then the body, then three near legs. Every leg has two joints.
  const drawLegs=far=>{for(let i=0;i<3;i++)legs.push({node:p(ant,'','none',far?'#6e4435':'#a46a46',far?1.35:1.7),i,far});};
  drawLegs(true);
  const gaster=add(ant,'g',{'data-ant-gaster':'',
    transform:`translate(-9 -9) scale(${visitor.gasterWidth} ${visitor.gasterHeight}) translate(9 9)`});
  e(gaster,-17,-9,9,6,'#704435','#432e28',1.2);
  p(gaster,'M-24-11Q-20-16-15-13','none','#b68057',1.1);
  e(ant,-6,-10,2.6,2.8,'#a66a46','#59372c',1);
  e(ant,-1,-11,2.6,2.8,'#a66a46','#59372c',1);
  p(ant,'M1-9Q0-16 4-18L7-22L8-17L13-19L14-24L16-18Q22-14 18-9Z','#ae7048','#59372c',1.2);
  const head=add(ant,'g',{'data-ant-head':'',
    transform:`translate(27 -16) scale(${visitor.headWidth} ${visitor.headHeight}) translate(-27 16)`});
  p(head,'M18-13C15-20 19-27 26-26Q36-25 36-17Q37-9 29-7Q20-7 18-13Z','#b9784b','#59372c',1.3);
  p(head,'M21-22Q25-26 31-22','none','#dfaa70',1.1);
  e(head,30,-20,1.6,2.2,'#302b26','none');
  p(head,'M34-15L42-12L36-9L32-11M34-10L40-7L34-6','none','#674131',1.5);
  const feelers=p(head,'M28-24L33-33L42-34M23-24L23-34L32-40','none','#a36d47',1.4);
  drawLegs(false);
  return {ant,legs,feelers};
}

export function leafCutFrame(ms,reduced=false){
  if(reduced)return {done:ms>=900,reach:0,close:1,cut:true,fall:1,approach:1,carry:0,returning:0};
  return {done:ms>=5700,reach:ease(ms/850)*(1-ease((ms-2450)/650)),
    close:ease((ms-1050)/330)*(1-ease((ms-1650)/300)),cut:ms>=1380,
    fall:ease((ms-1400)/620),approach:ease((ms-1900)/1150),
    carry:ease((ms-3280)/2100),returning:ease((ms-5050)/500)};
}

// The recording's strongest transient is 90 ms in, just before full closure.
export const leafSnipAt=1285;

export function resetLeafCut(habitat){
  const leaf=habitat.querySelector('[data-panama-leaf]');
  if(leaf)showLeafCuts(leaf,0);
}

export function createLeafCutRun({habitat,root,effects,remember,pin,reduced,snip}){
  const pieces=[...habitat.querySelectorAll(`[data-accessory-family="${LEAF_FAMILY}"]`)];
  const large=pieces.find(n=>n.dataset.wormPart==='primary'),small=pieces.find(n=>n.dataset.wormPart==='companion');
  const scissors=large?.querySelector('[data-panama-scissors]'),leaf=small?.querySelector('[data-panama-leaf]');
  if(!scissors||!leaf)return null;
  for(const piece of pieces){pin(piece);pin(piece.querySelector('.location-accessory-art'));}
  const halves=[...scissors.querySelectorAll('[data-scissor-half]')];
  let cutCount=Number(leaf.getAttribute('data-leaf-cuts'))||0;
  if(cutCount>=3){resetLeafCut(habitat);cutCount=0;}
  const section=leafCutSection(cutCount);
  remember(scissors);remember(leaf,['transform','data-leaf-cuts']);halves.forEach(n=>remember(n,['transform','opacity']));
  remember(leaf.querySelector('[data-leaf-clip]'),['width']);remember(leaf.querySelector('[data-leaf-cut-edge]'),['d']);
  const inRoot=n=>{const m=root.getScreenCTM().inverse().multiply(n.getScreenCTM());return new DOMMatrix([m.a,m.b,m.c,m.d,m.e,m.f]);};
  const point=(node,x,y)=>new DOMPoint(x,y).matrixTransform(inRoot(node));
  const originalScissors=inRoot(scissors),originalLeaf=inRoot(leaf);
  const scissorParent=inRoot(scissors.parentNode).inverse();
  const leafParent=inRoot(leaf.parentNode).inverse();
  const ownScale=Math.hypot(originalScissors.a,originalScissors.b);
  const angle=Math.atan2(originalLeaf.b,originalLeaf.a)+Math.PI/2;
  const contact=new DOMPoint(section.x,0).matrixTransform(originalLeaf);
  const target=new DOMMatrix().translate(contact.x-Math.cos(angle)*53*ownScale,contact.y-Math.sin(angle)*53*ownScale).rotate(angle*180/Math.PI).scale(ownScale);
  const originalAngle=Math.atan2(originalScissors.b,originalScissors.a);
  const deltaAngle=Math.atan2(Math.sin(angle-originalAngle),Math.cos(angle-originalAngle));
  const front=halves[1].cloneNode(true);front.removeAttribute('data-scissor-half');effects.appendChild(front);halves[1].setAttribute('opacity',0);
  const cutout=add(effects,'g',{'data-leaf-cutout':'',opacity:0});
  const fragmentId=`panama-fragment-${++clipSerial}`;
  const fragmentClip=add(add(cutout,'defs'),'clipPath',{id:fragmentId,clipPathUnits:'userSpaceOnUse'});
  add(fragmentClip,'rect',{x:section.x,y:-50,width:section.right-section.x,height:100});
  const fragment=leaf.querySelector('[data-leaf-surface]').cloneNode(true);
  fragment.removeAttribute('data-leaf-surface');fragment.setAttribute('clip-path',`url(#${fragmentId})`);
  for(const key of ['data-leaf-tip','data-leaf-outline'])fragment.querySelector(`[${key}]`)?.removeAttribute(key);
  cutout.appendChild(fragment);p(cutout,cutEdgePath(section),'none',green,1.5);
  if(cutCount)p(cutout,cutEdgePath(leafCutSection(cutCount-1)),'none',green,1.5);
  const visitor=leafAntVisitor(antSerial++);
  const {ant,legs,feelers}=drawLeafAnt(effects,visitor);ant.setAttribute('opacity',0);
  const bodies=[habitat.querySelector('#primary-worm .worm-body'),habitat.querySelector('#companion-worm .companion-body')];
  const arms=[0,0,1].map((body,i)=>({body,i,line:p(effects,'','#85bdb4','#427b7b',.85),light:p(effects,'','none','#b5ded5',body?1:1.6),hand:add(effects,'g')}));
  for(const arm of arms){p(arm.hand,'M-5-3Q-6-7-2-6L5-4Q8-2 6 2L3 6Q-1 7-4 3L-6 1Q-9-3-6-4Z','#fff0d8','#618d85',1);p(arm.hand,'M1-3L-1 1M4-1L2 3','none','#b3a88a',.65);}
  // The cut piece lands on the forest floor, below both bodies and the blender.
  const dropped={x:30,y:277};
  let sounded=false;
  return {
    frame(ms){
      const s=leafCutFrame(ms,reduced);
      if(s.done)return true;
      if(!sounded&&ms>=leafSnipAt){sounded=true;if(!reduced&&ms<1425)snip();}
      const moving=new DOMMatrix().translate(originalScissors.e+(target.e-originalScissors.e)*s.reach,originalScissors.f+(target.f-originalScissors.f)*s.reach).rotate((originalAngle+deltaAngle*s.reach)*180/Math.PI).scale(ownScale);
      scissors.setAttribute('transform',scissorParent.multiply(moving).toString());
      halves.forEach((n,i)=>n.setAttribute('transform',`rotate(${(i?15:-15)*(1-s.close)})`));
      front.setAttribute('transform',inRoot(halves[1]).toString());
      showLeafCuts(leaf,cutCount+(s.cut?1:0));
      leaf.setAttribute('transform',leafParent.multiply(originalLeaf).toString());
      const opacity=reduced?0:1-s.returning;
      const pose=leafAntPose(ms,visitor,dropped),antScale=visitor.scale;
      const antMatrix=new DOMMatrix().translate(pose.x,pose.y).rotate(pose.angle).scale(-antScale,antScale);
      ant.setAttribute('transform',antMatrix.toString());
      ant.setAttribute('opacity',opacity*ease((ms-1900-visitor.arrivalDelay)/180));
      for(const {node,i,far} of legs){
        const wave=Math.sin(ms*visitor.stride+visitor.phase+i*Math.PI+(far?Math.PI:0))*5*pose.walking,x=4+i*5;
        node.setAttribute('d',`M${x} -10L${x+(-11+i*8)*visitor.legReach+wave} -3L${x+(-16+i*12)*visitor.legReach-wave} ${far?-1:4}`);
      }
      const feel=Math.sin(ms*.006+visitor.phase)*2.4;
      feelers.setAttribute('d',`M28-24L${33+feel*.3}-33L${42+feel} ${-34+feel*.4}M23-24L23 ${-34-feel*.35}L${32-feel} ${-40-feel*.4}`);
      if(s.cut){
        cutout.setAttribute('opacity',reduced?0:opacity);
        const catchPoint=new DOMPoint(pose.grip.x,pose.grip.y).matrixTransform(antMatrix);
        const pickup=ease((ms-3050)/230);
        const dropX=contact.x+(dropped.x-contact.x)*s.fall,dropY=contact.y+(dropped.y-contact.y)*s.fall;
        const x=dropX+(catchPoint.x-dropX)*pickup,y=dropY+(catchPoint.y-dropY)*pickup;
        const leafAngle=Math.atan2(originalLeaf.b,originalLeaf.a)*180/Math.PI;
        const scale=Math.hypot(originalLeaf.a,originalLeaf.b);
        const leafRock=Math.sin(ms*visitor.stride*.5+visitor.phase)*4*pose.walking*pickup;
        cutout.setAttribute('transform',`translate(${x} ${y}) rotate(${leafAngle+38*s.fall+(-102+pose.angle)*pickup+leafRock}) scale(${scale}) translate(${-section.x} 0)`);
      }
      arms.forEach(arm=>{
        const from=point(bodies[arm.body],arm.i===1?280:301,arm.i===1?112:97);
        const to=arm.body?point(leaf,-75,5):point(halves[arm.i],-57,arm.i?-26:26);
        const elbow={x:(from.x+to.x)/2+(arm.body?-8:arm.i?6:22),y:Math.max(from.y,to.y)+10};
        const d=`M${from.x} ${from.y}Q${elbow.x+6} ${elbow.y+4} ${elbow.x} ${elbow.y}Q${to.x+8} ${to.y+6} ${to.x} ${to.y}`;
        const w=arm.body?1.8:3;
        arm.line.setAttribute('d',`M${from.x-w} ${from.y}Q${elbow.x} ${elbow.y+w*2} ${elbow.x+w} ${elbow.y}L${to.x+1.4} ${to.y}Q${to.x+1} ${to.y-2} ${to.x-1.4} ${to.y}L${elbow.x-w} ${elbow.y-w}Q${elbow.x-2} ${elbow.y+w} ${from.x+w} ${from.y}Z`);
        arm.light.setAttribute('d',d);arm.hand.setAttribute('transform',`translate(${to.x} ${to.y}) scale(${arm.body?.7:1.05})`);
        [arm.line,arm.light,arm.hand].forEach(n=>n.setAttribute('opacity',reduced?0:ease(ms/220)*(1-ease((ms-2950)/300))));
      });
      return false;
    },
    finish(){showLeafCuts(leaf,cutCount+1);}
  };
}
