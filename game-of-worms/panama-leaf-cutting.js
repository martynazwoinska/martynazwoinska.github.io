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

function tip(g,border=true){
  p(g,'M32-25Q58-15 78 0Q58 16 32 25Z','#679e63',border?green:'none',1.5);
  p(g,'M32 0H74M43 0L44-16M52 0L58 10','none',pale,1.3);
}

export function drawLeafCutting(g,male){
  if(male){
    const leaf=add(g,'g',{'data-panama-leaf':''});
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

export function drawLeafAnt(g){
  const ant=add(g,'g',{'data-leaf-ant':''});
  const legs=[];
  // Three far legs, then the body, then three near legs. Every leg has two joints.
  const drawLegs=far=>{for(let i=0;i<3;i++)legs.push({node:p(ant,'','none',far?'#6e4435':'#a46a46',far?1.35:1.7),i,far});};
  drawLegs(true);
  e(ant,-17,-9,9,6,'#704435','#432e28',1.2);
  p(ant,'M-24-11Q-20-16-15-13','none','#b68057',1.1);
  e(ant,-6,-10,2.6,2.8,'#a66a46','#59372c',1);
  e(ant,-1,-11,2.6,2.8,'#a66a46','#59372c',1);
  p(ant,'M1-9Q0-16 4-18L7-22L8-17L13-19L14-24L16-18Q22-14 18-9Z','#ae7048','#59372c',1.2);
  p(ant,'M18-13C15-20 19-27 26-26Q36-25 36-17Q37-9 29-7Q20-7 18-13Z','#b9784b','#59372c',1.3);
  p(ant,'M21-22Q25-26 31-22','none','#dfaa70',1.1);
  e(ant,30,-20,1.6,2.2,'#302b26','none');
  p(ant,'M34-15L42-12L36-9L32-11M34-10L40-7L34-6','none','#674131',1.5);
  p(ant,'M28-24L33-33L42-34M23-24L23-34L32-40','none','#a36d47',1.4);
  drawLegs(false);
  return {ant,legs};
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
  habitat.querySelector('[data-leaf-tip]')?.setAttribute('opacity',1);
  habitat.querySelector('[data-leaf-outline]')?.setAttribute('d',whole);
}

export function createLeafCutRun({habitat,root,effects,remember,pin,reduced,snip}){
  const pieces=[...habitat.querySelectorAll(`[data-accessory-family="${LEAF_FAMILY}"]`)];
  const large=pieces.find(n=>n.dataset.wormPart==='primary'),small=pieces.find(n=>n.dataset.wormPart==='companion');
  const scissors=large?.querySelector('[data-panama-scissors]'),leaf=small?.querySelector('[data-panama-leaf]');
  if(!scissors||!leaf)return null;
  for(const piece of pieces){pin(piece);pin(piece.querySelector('.location-accessory-art'));}
  const halves=[...scissors.querySelectorAll('[data-scissor-half]')];
  const end=leaf.querySelector('[data-leaf-tip]'),outline=leaf.querySelector('[data-leaf-outline]');
  resetLeafCut(habitat);
  remember(scissors);remember(leaf);halves.forEach(n=>remember(n,['transform','opacity']));remember(end,['opacity']);remember(outline,['d']);
  const inRoot=n=>{const m=root.getScreenCTM().inverse().multiply(n.getScreenCTM());return new DOMMatrix([m.a,m.b,m.c,m.d,m.e,m.f]);};
  const point=(node,x,y)=>new DOMPoint(x,y).matrixTransform(inRoot(node));
  const originalScissors=inRoot(scissors),originalLeaf=inRoot(leaf);
  const scissorParent=inRoot(scissors.parentNode).inverse();
  const leafParent=inRoot(leaf.parentNode).inverse();
  const ownScale=Math.hypot(originalScissors.a,originalScissors.b);
  const angle=Math.atan2(originalLeaf.b,originalLeaf.a)+Math.PI/2;
  const contact=new DOMPoint(32,0).matrixTransform(originalLeaf);
  const target=new DOMMatrix().translate(contact.x-Math.cos(angle)*53*ownScale,contact.y-Math.sin(angle)*53*ownScale).rotate(angle*180/Math.PI).scale(ownScale);
  const originalAngle=Math.atan2(originalScissors.b,originalScissors.a);
  const deltaAngle=Math.atan2(Math.sin(angle-originalAngle),Math.cos(angle-originalAngle));
  const front=halves[1].cloneNode(true);front.removeAttribute('data-scissor-half');effects.appendChild(front);halves[1].setAttribute('opacity',0);
  const cutout=add(effects,'g',{'data-leaf-cutout':'',opacity:0});tip(cutout);
  const {ant,legs}=drawLeafAnt(effects);ant.setAttribute('opacity',0);
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
      end.setAttribute('opacity',s.cut?0:1);outline.setAttribute('d',s.cut?remainder:whole);
      leaf.setAttribute('transform',leafParent.multiply(originalLeaf).toString());
      const opacity=reduced?0:1-s.returning;
      const antScale=.7;
      const antX=dropped.x+95*(1-s.approach)-145*s.carry;
      const antY=dropped.y+16+22*s.carry;
      ant.setAttribute('transform',`translate(${antX} ${antY+(s.approach>0?Math.sin(ms*.026)*.45:0)}) scale(${-antScale} ${antScale})`);
      ant.setAttribute('opacity',ms>=1900?opacity*ease((ms-1900)/180):0);
      for(const {node,i,far} of legs){const wave=Math.sin(ms*.026+i*Math.PI*.67+(far?Math.PI:0))*(s.approach<1||s.carry>0?5:0),x=4+i*5;node.setAttribute('d',`M${x} -10L${x-11+i*8+wave} -3L${x-16+i*12-wave} ${far?-1:4}`);}
      if(s.cut){
        cutout.setAttribute('opacity',reduced?0:opacity);
        const catchPoint={x:antX-39*antScale,y:antY-11*antScale};
        const pickup=ease((ms-3050)/230);
        const dropX=contact.x+(dropped.x-contact.x)*s.fall,dropY=contact.y+(dropped.y-contact.y)*s.fall;
        const x=dropX+(catchPoint.x-dropX)*pickup,y=dropY+(catchPoint.y-dropY)*pickup;
        const leafAngle=Math.atan2(originalLeaf.b,originalLeaf.a)*180/Math.PI;
        const scale=Math.hypot(originalLeaf.a,originalLeaf.b);
        cutout.setAttribute('transform',`translate(${x} ${y}) rotate(${leafAngle+(38+Math.sin(ms*.009)*7)*s.fall-102*pickup}) scale(${scale}) translate(-32 0)`);
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
    finish(){end.setAttribute('opacity',0);outline.setAttribute('d',remainder);}
  };
}
