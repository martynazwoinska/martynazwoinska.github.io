import {add,at,ease,matrix,relative} from './scene-performance.js?v=20260919-uniform-1';
import {fitCostumes} from './tenerife-duet.js?v=20260920-snack-2';

export const SNACK_DURATION=3600, SWALLOW_AT=2150;
// Two short, natural soft-food sounds: contact/bite, then a quieter chew.
// Both use the existing CC0 banana recording at its original speed and pitch.
export const SNACK_SOUNDS=[
 {at:1900,offset:.04,duration:.23,level:.065},
 {at:2340,offset:.32,duration:.26,level:.044}
];
export function playSnackSounds(ms,cues,play){
 for(const [i,sound]of SNACK_SOUNDS.entries()){
  const key=`snack-${i}`;
  if(ms<sound.at||cues.has(key))continue;
  cues.add(key);
  if(ms-sound.at<160)play('eat',sound.offset,sound.duration,sound.level);
 }
}
export function snackFrame(ms){
 const reach=ease(ms/500),lift=ease((ms-650)/1050),bite=ease((ms-1750)/400);
 const settle=1-ease((ms-2850)/750),back=ease((ms-2250)/700);
 const chew=ease((ms-2100)/120)*(1-ease((ms-2700)/180));
 return {reach:reach*settle,lift,bite,back,grasp:ms>=650,
  bend:.6*ease(ms/650)*(1-.55*lift)*settle,
  look:(.8*ease(ms/650)*(1-lift)+.14*lift)*settle,
  mouth:ease((ms-1350)/350)*(1-ease((ms-2080)/140))*.8+chew*(.12+.16*(.5+.5*Math.cos((ms-2150)/95))),
  chew,settle,phase:ms<650?'reach':ms<1750?'lift':ms<2150?'bite':ms<2850?'chew':'rest'};
}

// Only completed bites alter the originals. Cancelling a reach leaves its food.
export function snackServings(){
 const bowls=new Map();
 function entry(piece){
  if(!bowls.has(piece)){
   const food=piece.querySelector('[data-avocado-food]');
   const rods=food?[...food.children].filter(n=>n.tagName.toLowerCase()==='g'):[];
   const dots=food?[...food.children].filter(n=>n.tagName.toLowerCase()==='circle'):[];
   bowls.set(piece,{count:0,rods,dots,saved:[...rods,...dots].map(n=>[n,n.getAttribute('visibility')])});
  }
  return bowls.get(piece);
 }
 function reset(piece){const e=bowls.get(piece);if(!e)return;
  for(const[n,v]of e.saved){if(v===null)n.removeAttribute('visibility');else n.setAttribute('visibility',v);}
  e.count=0;delete piece.dataset.avocadoEaten;
 }
 return {
  next(piece){const e=entry(piece);if(e.count===e.rods.length)reset(piece);return e.rods.length?e.count:-1;},
  consume(piece,index){const e=entry(piece);if(index!==e.count||index>=e.rods.length)return;
   e.rods[index].setAttribute('visibility','hidden');e.dots[index]?.setAttribute('visibility','hidden');piece.dataset.avocadoEaten=String(++e.count);
  },reset,clear(){for(const piece of bowls.keys())reset(piece);bowls.clear();}
 };
}

export function prepareSnack(stage,piece,index,bowlFamily,costumeFamily,hands,consume){
 const part=piece.dataset.wormPart,p=stage.prop(bowlFamily,part),food=p?.copy.querySelector('[data-avocado-food]');
 const rod=food?[...food.children].filter(n=>n.tagName.toLowerCase()==='g')[index]:null;
 if(!rod)return {paint(){}};
 const dot=[...food.children].filter(n=>n.tagName.toLowerCase()==='circle')[index];
 const base=relative(stage.root,rod),from=at(base,0,0),tip=at(base,10,0),tipOffset={x:tip.x-from.x,y:tip.y-from.y};
 const carried=add(stage.layer,'g',{'data-snack-morsel':'',visibility:'hidden'}),morsel=rod.cloneNode(true);
 morsel.removeAttribute('transform');morsel.removeAttribute('visibility');carried.appendChild(morsel);
 const clip=add(carried,'clipPath',{id:'tenerife-snack-bite',clipPathUnits:'userSpaceOnUse'}),cut=add(clip,'rect',{x:-12,y:-6,width:24,height:12});
 morsel.setAttribute('clip-path','url(#tenerife-snack-bite)');
 const smile=stage.actors[part].face.querySelector('.worm-smile'),rest=smile?.getAttribute('d');
 const fit=fitCostumes(stage,costumeFamily);let eaten=false;
 return {paint(ms){
  const f=snackFrame(ms);stage.layer.dataset.snackPhase=f.phase;
  stage.pose(part,f.bend,f.look);fit(part,{...f,wing:0});
  const mouth=stage.point(part,331.5,77),target={x:mouth.x-tipOffset.x,y:mouth.y-tipOffset.y};
  // A gentle elbow-led arc, then the tip enters the mouth before disappearing.
  const x=from.x+(target.x-from.x)*f.lift+tipOffset.x*2*f.bite;
  const y=from.y+(target.y-from.y)*f.lift-10*Math.sin(Math.PI*f.lift)+tipOffset.y*2*f.bite;
  carried.setAttribute('transform',matrix(new DOMMatrix().translate(x-from.x,y-from.y).multiply(base)));
  carried.setAttribute('visibility',f.grasp&&f.bite<1?'visible':'hidden');
  if(f.grasp){rod.setAttribute('visibility','hidden');dot?.setAttribute('visibility','hidden');}
  cut.setAttribute('width',24*(1-f.bite));
  // Keep fingertips outside the lips while the morsel slides in.
  const wristX=x-tipOffset.x*2*f.bite,wristY=y-tipOffset.y*2*f.bite;
  const palm={x:wristX+(from.x-wristX)*f.back,y:wristY+5+(from.y-wristY)*f.back};
  stage.reach(hands[0],palm,f.reach,[285,116]);
  stage.reach(hands[1],at(p.base,-49,32),f.reach,[228,160]);
  if(smile){
   if(f.mouth>.01){const h=2+7*f.mouth;smile.setAttribute('d',`M325 75Q331.5 ${74-h*.3} 338 74Q339 ${78+h} 331 ${79+h}Q324 ${78+h} 325 75Z`);smile.style.fill='var(--worm-deep)';smile.style.strokeWidth='1.2';}
   else{smile.setAttribute('d',rest);smile.style.removeProperty('fill');smile.style.removeProperty('stroke-width');}
  }
  if(ms>=SWALLOW_AT&&!eaten){eaten=true;consume(piece,index);}
 }};
}
