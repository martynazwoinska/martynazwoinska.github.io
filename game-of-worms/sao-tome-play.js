import {RIDE, LEAF, add, path, drawSnail} from './sao-tome-art.js?v=20260913-snail-ride-1';
import {createPohnpeiSound} from './pohnpei-sound.js?v=20260913-pohnpei-1';
const clamp = x => Math.max(0, Math.min(1, x));
const ease = x => { x = clamp(x); return x*x*(3-2*x); };
const mix = (a,b,q) => a+(b-a)*q;
const blend = (a,b,q) => new DOMMatrix(['a','b','c','d','e','f'].map(k=>mix(a[k],b[k],q)));
const BASE = [78,228,122,280,173,255,181,203,188,151,225,105,278,113,330,121,355,82,326,54];
const LOW = [65,89,108,112,154,68,203,82,249,96,260,54,294,68,321,82,342,74,326,54];
const COILS = [
  [48,166,10,110,140,18,200,40,260,64,144,136,260,144,306,146,353,85,326,54],
  [120,260,55,280,140,190,214,172,271,160,220,95,266,93,300,95,327,78,326,54]
];
export function lowWormPath(d, q) {
  let i=0;
  return d.replace(/-?\d*\.?\d+/g,n => ' '+mix(+n,LOW[i]+(+n-BASE[i++]),q)+' ');
}
export function crawlingPath(d, ms, strength) {
  let i=0;
  return d.replace(/-?\d*\.?\d+/g,n=>{
    const j=i++,amp=j%2&&j>2&&j<18?Math.sin(ms/145-j*.66)*6*strength:0;
    return ' '+(+n+amp)+' ';
  });
}
export function rideWormPath(d,male,board,disembark,returning) {
  let i=0;const coil=COILS[+male];
  return d.replace(/-?\d*\.?\d+/g,n=>{
    const j=i++,offset=(coil[j]-BASE[j])*board*(1-disembark)+(LOW[j]-BASE[j])*disembark;
    return ' '+(+n+offset*(1-returning))+' ';
  });
}
export function riderBoard(ms,male) {return ease((ms-(male?450:800))/(male?1300:1500));}
export function snailFrame(ms,kind,reduced=false) {
  if(reduced) return {pose:0,lift:kind==='leaf'?ease(ms/400)*(1-ease((ms-2100)/400)):0,
    travel:0,disembark:0,returning:0,done:ms>=2700};
  if(kind==='leaf') return {pose:ease(ms/1000)*(1-ease((ms-5300)/1200)),
    lift:ease((ms-400)/1400)*(1-ease((ms-4400)/1100)),travel:0,disembark:0,returning:0,done:ms>=6700};
  return {pose:ease(ms/900),lift:0,travel:ease((ms-2800)/3600),
    disembark:ease((ms-6650)/1300),returning:ease((ms-8500)/1300),done:ms>=9900};
}

export function createSaoTomePlay(habitat,refresh=()=>{}) {
  // Reuse only the licensed, microphone-recorded leaf foley. No invented snail call.
  const sound=createPohnpeiSound(),reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let run=null,raf=0,serial=0;
  const visible=n=>n?.isConnected&&!n.closest('[hidden]');
  const handles=n=>[RIDE,LEAF].includes(n?.dataset.accessoryFamily);
  function cancel() {
    cancelAnimationFrame(raf);raf=0;sound.stop();
    const r=run;run=null;if(!r)return;
    for(const[n,v]of r.styles)v===null?n.removeAttribute('style'):n.setAttribute('style',v);
    r.effects.remove();
    delete habitat.dataset.saoTomeAction;delete habitat.dataset.saoTomePhase;
    if(r.focused&&document.activeElement===document.body&&visible(r.target))r.target.focus({preventScroll:true});
    refresh();
  }
  function setup(target,kind) {
    const root=habitat.querySelector('#worm-species');
    const r={target,kind,root,start:performance.now(),styles:new Map(),cues:new Set(),count:0,
      focused:document.activeElement===target,
      effects:add(root,'g',{'data-sao-tome-effects':'','pointer-events':'none','aria-hidden':'true'})};
    r.save=n=>{if(n&&!r.styles.has(n))r.styles.set(n,n.getAttribute('style'));return n;};
    r.matrix=n=>{
      const m=root.getScreenCTM().inverse().multiply(n.getScreenCTM());
      return new DOMMatrix([m.a,m.b,m.c,m.d,m.e,m.f]);
    };
    r.clone=(n,p)=>{
      const copy=n.cloneNode(true),ids=new Map(),nodes=[copy,...copy.querySelectorAll('*')],prefix='obo-copy-'+serial+'-'+(++r.count)+'-';
      for(const el of nodes)if(el.id){ids.set(el.id,prefix+ids.size);el.id=ids.get(el.id);}
      for(const el of nodes){
        for(const k of['tabindex','role','aria-label'])el.removeAttribute(k);
        for(const a of [...el.attributes]){
          let v=a.value;for(const[old,id]of ids)v=v.replaceAll('url(#'+old+')','url(#'+id+')');
          if(v!==a.value)el.setAttribute(a.name,v);
        }
      }
      copy.removeAttribute('transform');copy.removeAttribute('class');
      copy.setAttribute('style','animation:none;transform:none');p.appendChild(copy);return copy;
    };
    run=r;serial++;habitat.dataset.saoTomeAction=kind;
    for(const n of habitat.querySelectorAll('.worm-body,.companion-body'))r.save(n).style.animationPlayState='paused';
    r.people=[];
    for(const male of[false,true]){
      const original=habitat.querySelector(male?'.companion-body':'.worm-body'),from=r.matrix(original);
      const holder=add(r.effects,'g',{'data-obo-worm':male?'male':'female'}),copy=r.clone(original,holder);
      r.save(original).style.visibility='hidden';
      const paths=[...copy.querySelectorAll(male?'.companion-line,.companion-shadow,.companion-highlight':'.worm-line,.worm-shadow,.worm-highlight')].map(n=>({n,d:n.getAttribute('d')}));
      r.people.push({male,holder,copy,from,paths,tail:copy.querySelector('.male-tail')});
    }
    for(const n of habitat.querySelectorAll('.worm-ground-shadow'))r.save(n).style.visibility='hidden';
    r.arms=add(r.effects,'g',{'data-obo-arms':''});
    if(kind==='leaf'){
      r.art=target.querySelector('.location-accessory-art');r.artMatrix=r.matrix(r.art);
      r.leafGroup=add(r.effects,'g',{transform:r.artMatrix.toString()});
      r.snailHead=drawSnail(r.leafGroup).head;
      const copy=r.clone(r.art,r.leafGroup);r.leaf=copy.querySelector('[data-obo-leaf]');
      r.save(target).style.visibility='hidden';
      // One snail is visible even when both accessory buttons are enabled.
      for(const n of habitat.querySelectorAll('[data-accessory-family="'+RIDE+'"]'))r.save(n).style.visibility='hidden';
      r.effects.insertBefore(r.leafGroup,r.people[0].holder);
    }else{
      for(const n of habitat.querySelectorAll('.accessory-piece'))if(visible(n))r.save(n).style.visibility='hidden';
      r.snailFrom=r.matrix(target.querySelector('.location-accessory-art'));
      r.snail=add(r.effects,'g',{'data-obo-transport':''});r.snailParts=drawSnail(r.snail);
      // Far-side male, shell, then near-side female. The shell provides occlusion.
      r.effects.insertBefore(r.people[1].holder,r.snail);
      r.effects.appendChild(r.people[0].holder);
    }
    // Decode may finish after cancellation. A completed old load cannot start a new sound.
    sound.unlock('leaf').then(ready=>{if(run===r)r.soundReady=ready;});
    return r;
  }
  function gesture(r,at,name,duration=.5,level=.07) {
    if(at&&!r.cues.has(name)){r.cues.add(name);if(r.soundReady&&!reduced.matches)sound.play('leaf',0,duration,level);}
  }
  function arms(r,w,pose,f,ms) {
    if(reduced.matches||f.pose<.2)return;
    const shoulder=new DOMPoint(284,91).matrixTransform(pose);
    let hand;
    if(r.kind==='leaf'&&!w.male)hand=new DOMPoint(112,-20).matrixTransform(r.artMatrix);
    else return;
    const d=`M${shoulder.x} ${shoulder.y}Q${hand.x+9} ${shoulder.y-7} ${hand.x} ${hand.y}`;
    path(r.arms,d,'none','var(--worm-deep)',w.male?3:4.5).setAttribute('opacity',f.pose);
    path(r.arms,d,'none','var(--worm-color)',w.male?2:3).setAttribute('opacity',f.pose);
    add(r.arms,'ellipse',{cx:hand.x,cy:hand.y,rx:w.male?2:3,ry:2,fill:'var(--worm-highlight)',opacity:f.pose});
  }
  function tick(now) {
    raf=0;const r=run;if(!r)return;
    const b=habitat.getBoundingClientRect();
    if(!visible(r.target)||document.hidden||b.bottom<=0||b.top>=innerHeight){cancel();return;}
    const ms=now-r.start,f=snailFrame(ms,r.kind,reduced.matches);
    habitat.dataset.saoTomePhase=r.kind==='leaf'?(ms<1800?'lifting':ms<4400?'meeting':'lowering')
      :(ms<2800?'boarding':ms<6400?'riding':ms<6650?'stopping':ms<8000?'climbing-off':ms<8500?'landed':'returning');
    r.arms.replaceChildren();
    let snailPose;
    if(r.kind==='ride'){
      const stage=new DOMMatrix().translate(140+145*f.travel,285).scale(1.2);
      snailPose=reduced.matches?r.snailFrom:blend(blend(r.snailFrom,stage,f.pose),r.snailFrom,f.returning);
      r.snail.setAttribute('transform',snailPose.toString());
      if(f.disembark>.4&&!r.maleInFront){
        r.effects.insertBefore(r.people[1].holder,r.people[0].holder);r.maleInFront=true;
      }
    }
    for(const w of r.people){
      if(r.kind==='leaf'){
        const to=new DOMMatrix().translate(w.male?5:185,w.male?177:178).scale(w.male?.34:.52);
        const pose=blend(w.from,to,f.pose);w.holder.setAttribute('transform',pose.toString());
        w.paths.forEach(({n,d})=>n.setAttribute('d',lowWormPath(d,f.pose)));
        if(w.tail)w.tail.setAttribute('transform',`translate(${-13*f.pose} ${-139*f.pose})`);
        arms(r,w,pose,f,ms);
      }else if(reduced.matches){
        w.holder.setAttribute('transform',w.from.toString());
      }else{
        const board=riderBoard(ms,w.male);
        const seat=new DOMMatrix().translate(w.male?-97:-70,w.male?-112:-95).scale(w.male?.21:.3);
        const onShell=snailPose.multiply(seat);
        const ground=new DOMMatrix().translate(w.male?190:265,w.male?286:273).scale(w.male?.25:.4);
        const pose=blend(blend(blend(w.from,onShell,board),ground,f.disembark),w.from,f.returning);
        w.holder.setAttribute('transform',pose.toString());
        const wriggle=4*board*(1-board)*(1-f.disembark)*(1-f.returning);
        w.paths.forEach(({n,d})=>n.setAttribute('d',crawlingPath(rideWormPath(d,w.male,board,f.disembark,f.returning),ms,wriggle)));
        if(w.tail){
          const coil=COILS[1],q=board*(1-f.disembark);
          w.tail.setAttribute('transform',`translate(${((coil[0]-BASE[0])*q-13*f.disembark)*(1-f.returning)} ${((coil[1]-BASE[1])*q-139*f.disembark)*(1-f.returning)})`);
        }
      }
    }
    if(r.kind==='leaf'){
      r.leaf.setAttribute('transform',`rotate(${reduced.matches?0:48*f.lift} 112 -20)`);
      r.leaf.setAttribute('opacity',reduced.matches?1-f.lift:1);
      r.snailHead.setAttribute('transform',`translate(${reduced.matches?0:f.lift*6} ${reduced.matches?0:-f.lift*2})`);
      gesture(r,ms>=550,'lift',.7);gesture(r,ms>=4550,'lower',.5,.055);
    }else{
      const moving=!reduced.matches&&ms>=2800&&ms<=6400;
      r.snailParts.head.setAttribute('transform',`rotate(${moving?Math.sin(ms/570)*2.5:0} 47 0)`);
      r.snailParts.foot.setAttribute('transform',`translate(${moving?Math.sin(ms/330)*.5:0} 0)`);
      gesture(r,ms>=1100,'boarding',.55,.06);gesture(r,ms>=6950,'climbing-off',.5,.055);
    }
    if(f.done){cancel();return;}
    raf=requestAnimationFrame(tick);
  }
  function start(target) {
    if(!handles(target)||!visible(target))return false;
    if(run?.target===target){cancel();return true;}
    cancel();setup(target,target.dataset.accessoryFamily===LEAF?'leaf':'ride');tick(performance.now());return true;
  }
  for(const e of['resize','pagehide'])window.addEventListener(e,cancel);
  window.addEventListener('keydown',e=>{if(e.key==='Escape')cancel();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});
  reduced.addEventListener('change',cancel);
  if(typeof IntersectionObserver==='function')new IntersectionObserver(entries=>{
    if(run&&entries.some(e=>!e.isIntersecting))cancel();
  },{threshold:0}).observe(habitat);
  return {handles,start,cancel,clear:cancel,adjust:cancel,get active(){return !!run;}};
}
