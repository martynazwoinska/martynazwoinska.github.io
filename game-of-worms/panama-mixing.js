import {add,at,bodyPoint,ease,matrix,relative,visible,performance as makePerformance,recordedSound} from './scene-performance.js?v=20260919-uniform-1';
export const MIX_FAMILY='qg2726-flower-bait',MIX_DURATION=13000;
const FLOWER='qg2726-gustavia-flower-headpiece';
const windowAt=(ms,start,inTime,end,outTime)=>ease((ms-start)/inTime)*(1-ease((ms-end)/outTime));
export function mixingFrame(ms){
 const grip=windowAt(ms,0,650,12100,900);
 return {grip,
  lid:windowAt(ms,650,550,2000,500),drop:ease((ms-1350)/650),
  blend:windowAt(ms,2750,180,5550,200),blended:ease((ms-2900)/2500),
  bowl:windowAt(ms,5000,1000,8400,850),
  park:windowAt(ms,650,700,8800,450),
  jug:windowAt(ms,6200,800,8600,700),tilt:windowAt(ms,6900,500,8200,450),
  pour:windowAt(ms,7400,180,8020,180),filled:ease((ms-7400)/800),
  scoop:windowAt(ms,9450,450,11400,750),transfer:windowAt(ms,10000,900,11200,950),
  served:ease((ms-10900)/300),
  primaryBend:grip*(.3-1.1*windowAt(ms,5800,1000,8900,650)),
  primaryLook:grip*(.24+.26*windowAt(ms,650,500,2400,400)+.85*windowAt(ms,5800,1000,8900,650)),
  maleBend:grip*(-.35-.7*windowAt(ms,4800,950,8500,800)),
  maleLook:grip*(.15+.55*windowAt(ms,4800,950,8500,800)+.65*windowAt(ms,9300,500,11500,600)),
  phase:ms<2500?'flowers':ms<5850?'blend':ms<9300?'pour':ms<12100?'serve':'rest',
  done:ms>=MIX_DURATION};
}
export const MIX_SOUNDS=[
 {id:'motor',at:2750,key:'motor',offset:.25,duration:3,level:.10},
 {id:'pour',at:7400,key:'pour',offset:.3,duration:.8,level:.065},
 {id:'scoop',at:9570,key:'spoon',offset:.24,duration:.28,level:.048},
 {id:'dish',at:10900,key:'spoon',offset:1.1,duration:.22,level:.04}
];
export function mixingSounds(ms,cues,play){
 for(const c of MIX_SOUNDS)if(ms>=c.at&&!cues.has(c.id)){
  cues.add(c.id);if(ms-c.at<160)play(c.key,c.offset,c.duration,c.level);
 }
}

export function prepareMix(stage){
 const blender=stage.prop(MIX_FAMILY,'primary'),dishes=stage.prop(MIX_FAMILY,'companion');
 const hands={primary:[stage.hand('primary'),stage.hand('primary')],companion:[stage.hand('companion'),stage.hand('companion')]};
 const lid=blender?.copy.querySelector('[data-panama-lid]'),jug=blender?.copy.querySelector('[data-panama-jug]');
 const petals=blender?.copy.querySelector('[data-panama-petals]'),swirl=blender?.copy.querySelector('[data-panama-swirl]'),dial=blender?.copy.querySelector('[data-panama-dial]');
 const bowl=dishes?.copy.querySelector('[data-panama-mixing-bowl]'),surface=bowl?.querySelector('[data-panama-mixture-surface]'),details=bowl?.querySelector('[data-panama-mixture-details]');
 if(bowl)for(const n of [...dishes.copy.children])if(n.getAttribute('cx')==='-67'||n.getAttribute('cx')==='-27')bowl.appendChild(n);
 const spoon=dishes?.copy.querySelector('[data-panama-spoon]'),spoonBase=spoon?relative(stage.root,spoon):null;
 const spoonful=spoon?.querySelector('[data-panama-spoonful]'),serving=dishes?.copy.querySelector('[data-panama-serving]');
 const headpieces={};for(const part of ['primary','companion'])headpieces[part]=stage.prop(FLOWER,part);
 const loose=blender?add(stage.layer,'g',{'data-panama-loose-flowers':'',opacity:0}):null;
 if(loose&&petals)for(const node of [...petals.children].slice(0,6))loose.appendChild(node.cloneNode(true));
 const stream=add(stage.layer,'path',{'data-panama-pour':'',fill:'none',stroke:'#dba5b0','stroke-width':4,'stroke-linecap':'round',opacity:0});
 const setPose=(part,bend,look)=>{
  stage.pose(part,bend,look);const p=headpieces[part];if(!p)return;
  const a=stage.actors[part],q=bodyPoint(329,65,bend,look);
  p.g.setAttribute('transform',matrix(a.base.translate(q.x-329,q.y-65).multiply(a.base.inverse()).multiply(p.base)));
 };
 return {paint(ms,still=false){
  const f=mixingFrame(ms);stage.layer.dataset.panamaMixPhase=f.phase;
  if(still){serving?.setAttribute('opacity',1);spoonful?.setAttribute('opacity',0);return;}
  setPose('primary',f.primaryBend,f.primaryLook);setPose('companion',f.maleBend,f.maleLook);
  let bowlCenter;
  if(dishes&&bowl){
   const move=new DOMMatrix().translate(-14*f.bowl,30*f.bowl);
   bowl.setAttribute('transform',matrix(dishes.base.inverse().multiply(move).multiply(dishes.base)));
   bowlCenter=at(move.multiply(dishes.base),-40,-6);
   surface?.setAttribute('fill',f.filled>0?'#dc9eac':'#e7e9de');
   surface?.setAttribute('fill-opacity',.35+.65*f.filled);details?.setAttribute('opacity',f.filled);
   const support=at(move.multiply(dishes.base),-10,14);
   stage.reach(hands.companion[1],support,f.grip,[228,160]);
  }
  if(blender&&jug&&lid){
   const lidMove=new DOMMatrix().translate(48*f.lid,-58*f.lid).translate(-3,-180).rotate(10*f.lid).translate(3,180);
   lid.setAttribute('transform',matrix(lidMove));
   const jiggle=f.blend*.5*Math.sin(ms/38);
   // The jar leaves the motor only after it has stopped, and tips over the bowl.
   const rotated=blender.base.translate(0,-20).rotate(-48).translate(0,20);
   const spout=at(rotated,-55,-154),destination=dishes?at(dishes.base,-40,-6):at(blender.base,-135,-35);
   const dx=destination.x-14-spout.x,dy=destination.y+30-23-spout.y;
   const moved=new DOMMatrix().translate(dx*f.jug,dy*f.jug-18*Math.sin(Math.PI*f.jug)).multiply(blender.base).translate(0,-20).rotate(-48*f.tilt).translate(0,20);
   jug.setAttribute('transform',matrix(blender.base.inverse().multiply(moved)));
   const contents=jug.querySelector('[data-panama-contents]');
   // Keep the glass clip fixed while the liquid level drops inside it.
   for(const n of [...(contents?.children||[])].slice(0,2))n.setAttribute('transform',`translate(0 ${f.filled*20})`);
   petals?.setAttribute('opacity',(1-f.blended*.93)*ease((ms-1750)/300));
   petals?.setAttribute('transform',`translate(${jiggle*2} ${f.blend*4}) rotate(${jiggle*5} -3 -85)`);
   swirl?.setAttribute('opacity',f.blend*.8);
   swirl?.setAttribute('transform',`translate(${jiggle} 0)`);
   dial?.setAttribute('transform',`rotate(${f.blend*65} -2 37)`);
   const supply=1-f.drop;
   loose.setAttribute('transform',matrix(blender.base.translate(-72*supply,-120*supply)));
   loose.setAttribute('opacity',ease(ms/650)*(1-ease((ms-1830)/170)));
   const lidGrip=at(blender.base.multiply(lidMove),-3,-180),handle=at(moved,75,-102),bottom=at(moved,-12,-23);
   const loading=windowAt(ms,0,600,2100,500),handOver=windowAt(ms,5750,550,9000,650);
   const flowers=at(blender.base,-77*supply-4,-207+115*f.drop),knob=at(blender.base,-2,37);
   const first={x:lidGrip.x+(handle.x-lidGrip.x)*handOver,y:lidGrip.y+(handle.y-lidGrip.y)*handOver};
   const second={x:knob.x+(flowers.x-knob.x)*loading,y:knob.y+(flowers.y-knob.y)*loading};
   second.x+=(bottom.x-second.x)*handOver;second.y+=(bottom.y-second.y)*handOver;
   stage.reach(hands.primary[0],first,f.grip,[289,115]);
   stage.reach(hands.primary[1],second,f.grip,[228,160]);
   const out=at(moved,-55,-154),into=bowlCenter||destination;
   stream.setAttribute('d',`M${out.x} ${out.y}Q${out.x-2} ${into.y-12} ${into.x} ${into.y}`);
   stream.setAttribute('opacity',dishes?f.pour:0);
  }
  if(dishes&&spoon){
   const source=at(dishes.base,-40,-6),destination=at(dishes.base,54,35);
   const x=(destination.x-source.x)*f.transfer,y=(destination.y-source.y)*f.transfer-12*f.scoop*(1-f.served)-22*Math.sin(Math.PI*f.transfer);
   const base=new DOMMatrix().translate(x+8*f.park,y+33*f.park).multiply(spoonBase).rotate(105*f.park+25*f.served*f.transfer);
   spoon.setAttribute('transform',matrix(dishes.base.inverse().multiply(base)));
   spoonful?.setAttribute('opacity',f.scoop*(1-f.served));serving?.setAttribute('opacity',f.served);
   const grip=at(base,3,-77),reach=windowAt(ms,0,650,12000,800);
   stage.reach(hands.companion[0],grip,reach,[290,113]);
  }
 },finish(){
  dishes?.piece.querySelector('[data-panama-serving]')?.setAttribute('opacity',1);
  dishes?.piece.querySelector('[data-panama-spoonful]')?.setAttribute('opacity',0);
 }};
}

export function createPanamaMixing(habitat){
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 const sound=recordedSound({motor:'panama-blender.mp3',spoon:'hcmc-stir.wav',pour:'kauai-bath-pour-v2.wav'});
 let active=null,raf=0;
 function cancel(){cancelAnimationFrame(raf);raf=0;sound.stop();if(!active)return;
  active.stage?.restore();delete active.piece.dataset.panamaAction;active=null;
 }
 function start(piece){cancel();if(!visible(piece))return false;
  const run=active={piece,cues:new Set()};piece.dataset.panamaAction='mixing';
  const begin=()=>{if(active!==run||!visible(piece)||document.hidden)return;
   const stage=run.stage=makePerformance(habitat,MIX_FAMILY),mix=prepareMix(stage),started=performance.now();
   const tick=now=>{if(active!==run)return;if(!visible(piece)||document.hidden){cancel();return;}
    const ms=now-started;mix.paint(reduced.matches?MIX_DURATION:ms,reduced.matches);
    if(!reduced.matches)mixingSounds(ms,run.cues,sound.play);
    if(ms>=(reduced.matches?250:MIX_DURATION)){mix.finish();cancel();return;}raf=requestAnimationFrame(tick);
   };raf=requestAnimationFrame(tick);
  };
  if(reduced.matches)begin();else sound.prepare(['motor','spoon','pour']).then(begin);
  return true;
 }
 return {start,cancel,get active(){return !!active;}};
}
