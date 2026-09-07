import { createAhmedabadAudio } from './ahmedabad-audio.js?v=20260907-hands-1';
const NS='http://www.w3.org/2000/svg';
const clamp=x=>Math.max(0,Math.min(1,x));
const ease=x=>{x=clamp(x);return x*x*(3-2*x);};
const mix=(a,b,t)=>a+(b-a)*t;
const add=(parent,tag,attrs)=>{
  const n=document.createElementNS(NS,tag);
  for(const [k,v] of Object.entries(attrs))n.setAttribute(k,String(v));
  parent.append(n);return n;
};
const path=(g,d,fill,stroke='#365f50',width=1)=>add(g,'path',{
  d,fill,stroke,'stroke-width':width,'stroke-linecap':'round','stroke-linejoin':'round'
});

export function ahmedabadFrame(ms,kind,male=false,reduced=false) {
  const duration=kind==='kite'?3300:male?4700:4300;
  if(reduced)return {pickup:1,pull:0,angle:0,down:0,scoop:1,phase:1,cycle:male?1:0,done:true};
  if(kind==='kite') {
    const q=clamp(ms/duration), env=q===1?0:Math.sin(Math.PI*q)**2;
    return {pickup:ease(ms/650),pull:env*(.65+.35*Math.sin(q*Math.PI*(male?10:4))),
      angle:0,down:0,scoop:0,cycle:0,done:ms>=duration};
  }
  const pickup=ease(ms/650), period=male?1550:2500;
  const work=clamp((ms-800)/period), cycle=male?Math.min(1,Math.max(0,Math.floor((ms-800)/period))):0;
  const q=clamp((ms-800-cycle*period)/period);
  // Lift, press the blade into soil, lever a clod, then tip it beside the hole.
  const down=q<.35?ease(q/.35):q<.7?1-ease((q-.35)/.35):0;
  const angle=q<.35?-18*(1-ease(q/.35)):q<.7?32*ease((q-.35)/.35):32*(1-ease((q-.7)/.3));
  return {pickup,pull:0,angle:work===0?0:angle,down:work===0?0:down,
    scoop:q>.34?ease((q-.34)/.28):0,phase:q,cycle,done:ms>=duration};
}

export function ahmedabadReach(pull,male=false) {
  pull=clamp(pull);
  const lift=ease(pull*2.5);
  return male?{x:-13*pull,y:8*pull,guide:.12,spread:0}
    :{x:34*pull,y:-120*lift,guide:.16+.32*lift,spread:14+15*pull};
}

function glove(g) {
  const h=add(g,'g',{});
  // Rounded palm, three curled fingers and a separate opposing thumb.
  path(h,'M-5 4Q-8 1-6-3L-5-7Q-3-9-1-6Q1-9 3-6Q6-7 7-3L7 3Q4 8-2 7Z','#fff0d3');
  path(h,'M-5 2Q-11-2-9-5Q-7-7-4-3L-1 0','#f5dbb2');
  path(h,'M-2-5L-2-1M2-5L2-1M5-3L5 0','none','#ba9670',.65);
  path(h,'M-3 6L5 5L6 9L-2 10Z','#a5dbbb');
  path(h,'M-3-4Q0-6 3-4','none','#fffaf0',.9);
  return h;
}

function makeArms(root,male) {
  const g=add(root,'g',{'data-af16-hands':male?'companion':'primary','aria-hidden':'true','pointer-events':'none'});
  const limbs=[0,1].map(()=>({arm:path(g,'M0 0Z','#91d2aa','#407e65',male?.75:1.1),
    highlight:path(g,'M0 0L0 0','none','#c8eed2',male?.7:1.1)}));
  const hands=[glove(g),glove(g)];
  return {g,limbs,hands};
}

function soilMark(root,male,point) {
  const g=add(root,'g',{'data-af16-dug-soil':male?'companion':'primary',transform:`translate(${point.x} ${point.y}) scale(${male?.64:1})`,
    'aria-hidden':'true','pointer-events':'none'});
  add(g,'ellipse',{cx:0,cy:0,rx:18,ry:5,fill:'#624639',opacity:.8});
  path(g,'M-18 0Q-8-9 6-5Q17-4 18 0','none','#bc9366',1.7);
  path(g,'M18 0Q20-6 26-6Q28-12 33-8Q40-10 43-4L48 1Q30 7 18 0Z','#9b7150','#684c3b',1);
  path(g,'M24-2L28-5L32-3M34-5L39-3','none','#d0a575',1.2);
  return g;
}

export function createAhmedabadHands(habitat) {
  const sound=createAhmedabadAudio(), reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const modes=new Map(), marks=new Map();
  let root=null, frame=0, action=null;
  const handles=piece=>!!piece?.querySelector('.ahmedabad-af16-accessory') && ['kite-rig','soil-kit'].includes(piece.dataset.accessoryFamily);
  const visible=n=>n?.isConnected&&!n.closest('[hidden]');
  const point=(node,x,y)=>new DOMPoint(x,y).matrixTransform(root.getScreenCTM().inverse().multiply(node.getScreenCTM()));
  function restore(entry) {
    for(const [node,transform] of entry.saved) {
      if(transform===null)node.removeAttribute('transform');else node.setAttribute('transform',transform);
    }
    for(const [node,style] of entry.styles)node.setAttribute('style',style);
    for(const [node,d] of entry.cords)node.setAttribute('d',d);
    entry.bodyWrap.replaceWith(...entry.bodyWrap.childNodes);
    entry.arms.g.remove();entry.clod?.remove();
  }
  function remember(entry,node) {
    if(node&&!entry.saved.has(node))entry.saved.set(node,node.getAttribute('transform'));
    return node;
  }
  function stopMotion() {
    sound.cancel();action=null;delete habitat.dataset.ahmedabadAction;
  }
  function clear() {
    stopMotion();cancelAnimationFrame(frame);frame=0;
    for(const entry of modes.values())restore(entry);
    modes.clear();for(const mark of marks.values())mark.remove();marks.clear();root=null;
  }
  function reset(piece) {
    stopMotion();const part=piece?.dataset.wormPart;
    if(modes.has(part)){restore(modes.get(part));modes.delete(part);}
    marks.get(part)?.remove();marks.delete(part);sync();
  }
  function ensure(part) {
    if(modes.has(part))return modes.get(part);
    const male=part==='companion';
    const kite=habitat.querySelector(`.accessory-piece[data-accessory-family="kite-rig"][data-worm-part="${part}"]`);
    const soil=habitat.querySelector(`.accessory-piece[data-accessory-family="soil-kit"][data-worm-part="${part}"]`);
    if(!handles(kite)||!visible(kite)&&!visible(soil))return null;
    const entry={male,part,kite,soil,kind:visible(kite)?'kite':'soil',saved:new Map(),styles:[],arms:makeArms(root,male),targets:null};
    entry.body=habitat.querySelector(male?'#companion-worm .companion-body':'#primary-worm > .worm-body');
    entry.styles.push([entry.body,entry.body.getAttribute('style')||'']);
    entry.bodyWrap=document.createElementNS(NS,'g');
    entry.bodyWrap.dataset.af16Body=part;
    entry.body.before(entry.bodyWrap);entry.bodyWrap.append(entry.body);
    entry.cloth=remember(entry,habitat.querySelector(`.accessory-piece[data-accessory-family="af16-embroidered-waistcoat"][data-worm-part="${part}"] [data-af16-cloth]`));
    entry.reel=remember(entry,kite.querySelector('[data-af16-reel]'));
    entry.tool=remember(entry,soil.querySelector('[data-af16-tool]'));
    entry.position=remember(entry,kite.querySelector('[data-af16-kite-position]'));
    entry.cords=[...kite.querySelectorAll('.af16-flight-cord')].map(n=>[n,n.getAttribute('d')]);
    // Pause the existing paper animation while our tether geometry is in control.
    for(const n of kite.querySelectorAll('.af16-kite-flight,.af16-kite-paper-motion')) {
      entry.styles.push([n,n.getAttribute('style')||'']);n.style.animation='none';
    }
    modes.set(part,entry);return entry;
  }
  function sync() {
    root=habitat.querySelector('#worm-species');
    if(!root||document.hidden)return;
    if(!habitat.querySelector('.ahmedabad-af16-accessory'))return;
    for(const part of ['primary','companion'])ensure(part);
    if(!frame&&modes.size)frame=requestAnimationFrame(tick);
  }
  function start(piece) {
    if(!handles(piece)||!visible(piece))return false;
    stopMotion();sync();
    const entry=ensure(piece.dataset.wormPart);if(!entry)return false;
    entry.kind=piece.dataset.accessoryFamily==='kite-rig'?'kite':'soil';
    action={entry,start:performance.now(),events:new Set(),from:entry.targets,fromShift:entry.shift||0,fromReel:entry.reelY||0};
    habitat.dataset.ahmedabadAction=entry.kind;
    if(!reduced.matches)sound.unlock();
    return true;
  }
  function paint(entry,state,ms) {
    const {male,part,kite,soil,arms,tool,reel,body}=entry;
    const digging=entry.kind==='soil'&&visible(soil);
    const shift=digging?(male?220:65):0;
    entry.shift=action?.entry===entry?mix(action.fromShift,shift,state.pickup):shift;
    entry.bodyWrap.setAttribute('transform',`translate(0 ${entry.shift}) rotate(${state.pull*(male?-4:-2)+state.down*3} 210 170)`);
    // Inner cloth follows the body, preserving the outer user drag and scale.
    entry.cloth?.setAttribute('transform',entry.bodyWrap.getAttribute('transform'));
    const k=visible(kite), s=visible(soil);
    if(!k&&!s){arms.g.style.display='none';return;}
    if(!digging&&!k)entry.kind='soil';
    arms.g.style.display='';
    const rest=digging?(male?250:140):0;
    const reelY=action?.entry===entry?mix(action.fromReel,rest,state.pickup):rest;
    entry.reelY=reelY;
    const reach=ahmedabadReach(state.pull,male);
    reel.setAttribute('transform',`translate(${reach.x} ${reelY+reach.y}) rotate(${state.pull*(male?15:-9)})`);
    // Moving a kite preserves the reel's original user-controlled scale and position.
    const [x,y,a,kx,ky]=male?[-32,-246,-12,12,12]:[-32,-296,10,15,14];
    const drift=state.drift||0;
    const dx=state.pull*(male?-65:82)+drift*6,dy=-state.pull*(male?54:44), angle=a+state.pull*(male?13:-9)+drift*3,r=angle*Math.PI/180;
    entry.position.setAttribute('transform',`translate(${x+dx} ${y+dy}) rotate(${angle})`);
    const ex=x+dx+kx*Math.cos(r)-ky*Math.sin(r),ey=y+dy+kx*Math.sin(r)+ky*Math.cos(r);
    const slack=1-state.pull*.94;
    const sx=reach.x,sy=reelY+reach.y,cx=(male?48:-48)*slack,cy=-58+reelY*.5+(male?0:reach.y*.75),ccx=(male?-58:68)*slack;
    for(const [cord] of entry.cords)cord.setAttribute('d',`M${sx} ${sy}C${cx} ${cy} ${ccx} -136 ${ex} ${ey}`);
    let targets;
    if(digging) {
      // The side-on handle sits between two grips. Its blade faces the soil.
      const local=soil.querySelector('.location-accessory-art');
      const desired=point(body,male?273:281+state.angle*.3,male?192:191);
      const original=entry.saved.get(tool);
      tool.setAttribute('transform',original);
      const resting=point(tool,0,male?-49:-52);
      const hold={x:mix(resting.x,desired.x,state.pickup),y:mix(resting.y,desired.y,state.pickup)+(male?8:26)*state.down};
      const inv=local.getScreenCTM().inverse().multiply(root.getScreenCTM());
      const hp=new DOMPoint(hold.x,hold.y).matrixTransform(inv);
      const tilt=mix(male?29:9,-18,state.pickup)+state.angle;
      tool.setAttribute('transform',`translate(${hp.x} ${hp.y}) rotate(${tilt}) translate(0 ${male?49:52})`);
      targets=[point(tool,0,male?-61:-84),point(tool,0,male?-36:-30)];
      if(action?.entry===entry&&state.scoop>.05) {
        if(!entry.clod)entry.clod=path(tool,male?'M-10 10Q-8 0 0 5Q9 0 11 13L5 22L-7 19Z':'M-17 35Q-19 23-8 24Q0 16 10 25Q21 24 17 38L5 47L-13 44Z','#99704d','#654a37',1.3);
        const fall=ease((state.phase-.7)/.25);
        entry.clod.setAttribute('opacity',1-fall);
        entry.clod.setAttribute('transform',`translate(${fall*24} ${fall*42}) rotate(${fall*25})`);
        if(!marks.has(part)&&!reduced.matches) {
          const tip=point(tool,0,male?42:68);marks.set(part,soilMark(root,male,tip));
        }
      } else entry.clod?.setAttribute('opacity','0');
      if(action?.entry===entry&&state.scoop>.06) {
        const key=`soil${state.cycle}`;
        if(!action.events.has(key)){action.events.add(key);if(!reduced.matches)sound.play('soil',male);}
      }
    } else {
      tool.setAttribute('transform',entry.saved.get(tool));entry.clod?.setAttribute('opacity','0');
      const t=reach.guide,u=1-t;
      const guide={x:u*u*u*sx+3*u*u*t*cx+3*u*t*t*ccx+t*t*t*ex,y:u*u*u*sy+3*u*u*t*cy-3*u*t*t*136+t*t*t*ey};
      targets=male?[point(reel,-halfGrip(male),0),point(reel,halfGrip(male),0)]
        :[point(reel,-halfGrip(male),0),point(kite.querySelector('.af16-kite-flight'),guide.x,guide.y)];
      if(action?.entry===entry&&ms>180&&!action.events.has('wind')) {
        action.events.add('wind');if(!reduced.matches)sound.play('wind',male);
      }
      if(action?.entry===entry&&state.pull>.1) {
        const key=`click${Math.floor(ms/210)}`;
        if(!action.events.has(key)){action.events.add(key);if(!reduced.matches)sound.play('click',male);}
      }
    }
    if(action?.entry===entry&&action.from)targets=targets.map((p,i)=>({x:mix(action.from[i].x,p.x,state.pickup),y:mix(action.from[i].y,p.y,state.pickup)}));
    entry.targets=targets;
    const shoulders=(male?[[205,151],[239,132]]:digging?[[195,181],[221,151]]:[[188,190],[215,152]]).map(([x,y])=>point(body,x,y));
    targets.forEach((to,i)=>{
      const spread=male?0:digging?18+8*state.down:reach.spread;
      const from=shoulders[i], elbow={x:mix(from.x,to.x,.52)+(i?10+spread:-12-spread)*(male?.6:1),y:mix(from.y,to.y,.58)+(male?2:4)};
      const normal=(a,b)=>{const l=Math.hypot(b.x-a.x,b.y-a.y)||1;return {x:-(b.y-a.y)/l,y:(b.x-a.x)/l};};
      const n=normal(from,elbow),m=normal(elbow,to),width=male?3.1:5.1;
      const offset=(p,v,w)=>`${p.x+v.x*w} ${p.y+v.y*w}`;
      // Tapered upper arm and forearm meet at a softly rounded elbow.
      const d=`M${offset(from,n,width)}Q${offset(elbow,n,width*.8)} ${offset(elbow,m,width*.72)}L${offset(to,m,width*.44)}Q${to.x} ${to.y} ${offset(to,m,-width*.44)}L${offset(elbow,m,-width*.72)}Q${offset(elbow,n,-width*.8)} ${offset(from,n,-width)}Q${from.x} ${from.y} ${offset(from,n,width)}Z`;
      arms.limbs[i].arm.setAttribute('d',d);
      arms.limbs[i].highlight.setAttribute('d',`M${offset(from,n,width*.45)}Q${offset(elbow,n,width*.45)} ${offset(elbow,m,width*.35)}L${offset(to,m,width*.2)}`);
      const rotation=digging?-18+state.angle:male?(i?-15:10):i?-20:12;
      arms.hands[i].setAttribute('transform',`translate(${to.x} ${to.y}) rotate(${rotation}) scale(${male?.64:.85})`);
    });
  }
  function tick(now) {
    frame=0;if(document.hidden||!root?.isConnected){clear();return;}
    for(const entry of modes.values()) {
      if(!visible(entry.kite)&&!visible(entry.soil))continue;
      const running=action?.entry===entry, ms=running?now-action.start:0;
      const state=running?ahmedabadFrame(ms,entry.kind,entry.male,reduced.matches):{pickup:1,pull:0,angle:0,down:0,scoop:0,cycle:0};
      if(!running&&!reduced.matches&&document.activeElement!==entry.kite)state.drift=Math.sin(now/(entry.male?1450:1800)+(entry.male?2:0));
      paint(entry,state,ms);
      if(running&&state.done) {
        if(entry.kind==='soil'&&!marks.has(entry.part))marks.set(entry.part,soilMark(root,entry.male,point(entry.tool,0,entry.male?42:68)));
        stopMotion();
      }
    }
    if(modes.size)frame=requestAnimationFrame(tick);
  }
  function cancel() { clear();sync(); }
  document.addEventListener('visibilitychange',()=>{if(document.hidden)clear();else sync();});
  window.addEventListener('pagehide',clear);
  reduced.addEventListener('change',cancel);
  return {start,handles,clear,cancel,reset,sync,get active(){return !!action;}};
}
function halfGrip(male){return male?36:44;}
