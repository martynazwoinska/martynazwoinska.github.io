import {createLombokFlights} from './lombok-flight.js?v=20260921-forest-4';
import {createLombokSound} from './lombok-sound.js?v=20260921-forest-4';
export const FAN='hpt26-leaf-fans',BUTTERFLY='hpt26-butterflies';
export const FIG='lingsar-ficus-fruit-transformation';
const clamp=x=>Math.max(0,Math.min(1,x));
const ease=x=>{x=clamp(x);return x*x*(3-2*x);};
const mix=(a,b,q)=>a+(b-a)*q;
const add=(p,t,a={})=>{const n=document.createElementNS('http://www.w3.org/2000/svg',t);for(const[k,v]of Object.entries(a))n.setAttribute(k,v);p.appendChild(n);return n;};
const path=(p,d,fill,stroke='none',width=1)=>add(p,'path',{d,fill,stroke,'stroke-width':width,'stroke-linecap':'round','stroke-linejoin':'round'});
export function interpolatePath(template,to,q){let i=0;return template.replace(/-?\d*\.?\d+/g,n=>` ${mix(Number(n),to[i++],q)} `);}
const COIL=[125,190,100,170,135,110,176,115,235,122,230,197,190,215,150,236,149,179,185,163];

const pulse=(t,a,b,c,d)=>ease((t-a)/(b-a))*(1-ease((t-c)/(d-c)));
export function figFrame(ms,opening=false,male=false,reduced=false){
  if(reduced)return{curl:opening?0:1,close:opening?0:1,peek:0,approach:0,tap:0,recoil:0,done:true};
  if(!opening)return{curl:ease(ms/1400),close:ease((ms-750)/1100),peek:0,
    approach:ease((ms-2050)/1200),tap:pulse(ms,3380,3570,3640,3830)+pulse(ms,3950,4140,4210,4400),
    recoil:0,done:ms>=4750};
  const peek=ease(ms/500)*(1-ease((ms-1100)/650));
  return{curl:1-ease((ms-1250)/1500),close:1-.28*peek-ease((ms-1200)/800),peek,
    approach:1-ease((ms-1500)/1250),tap:0,recoil:pulse(ms,360,700,900,1400),done:ms>=2800};
}
export function seekerPath(d,dx,dy,arch=false,q=1){
  if(arch){
    const headX=326+dx,headY=54+dy;
    const base=[78,228,122,280,173,255,181,203,188,151,225,105,278,113,330,121,355,82,326,54];
    const target=[78,228,122,280,200,240,204,188,208,140,headX+188,headY-105,headX+170,headY-125,headX+125,Math.max(8,headY-170),headX+45,headY-70,headX,headY];
    const original=d.match(/-?\d*\.?\d+/g).map(Number);
    return interpolatePath(d,target.map((v,i)=>v+original[i]-base[i]),q);
  }
  dx*=q;dy*=q;
  let i=0,weight=0;const values=d.match(/-?\d*\.?\d+/g).map(Number);
  return d.replace(/-?\d*\.?\d+/g,n=>{
    if(i%2===0)weight=clamp((228-values[i+1])/174);
    return ' '+(Number(n)+(i++%2?dy:dx)*weight)+' ';
  });
}
// Closed contours use the same cubic segments as the approved open fruit.
// The fleshy cut faces turn out of sight as the opaque outer skins meet.
const CLOSED={
  primary:[
    [0,-92,-21,-91,-17,-60,-46,-46,-105,-16,-83,66,0,75,0,46,0,21,0,-12,0,-39,0,-66,0,-92],
    [0,-92,22,-89,19,-59,47,-42,99,-8,81,66,0,75,0,44,0,14,0,-12,0,-36,0,-66,0,-92]
  ],
  companion:[
    [0,-74,-17,-76,-15,-48,-35,-37,-81,-11,-69,57,0,64,0,43,0,18,0,-9,0,-27,0,-55,0,-74],
    [0,-74,20,-72,22,-46,43,-27,85,10,58,58,0,64,0,40,0,-49,0,-74]
  ]
};

export function createLombokPlay(habitat,refresh=()=>{}){
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)'),sound=createLombokSound();
  const flights=createLombokFlights(habitat,reduced,refresh);
  let run=null,raf=0,epoch=0;
  const handles=n=>[FIG,FAN,BUTTERFLY].includes(n?.dataset.accessoryFamily);
  const visible=n=>n?.isConnected&&!n.closest('[hidden]');
  const body=male=>habitat.querySelector(male?'.companion-body':'.worm-body');
  function cancel(){flights.clear();cancelAction();}
  function cancelAction(){
    epoch++;cancelAnimationFrame(raf);raf=0;sound.stop();if(!run)return;
    const r=run;run=null;r.forestRestore?.();
    for(const[n,v]of r.styles)v===null?n.removeAttribute('style'):n.setAttribute('style',v);
    r.effects.remove();delete habitat.dataset.lombokAction;delete habitat.dataset.lombokPhase;refresh();
  }
  function setup(target){
    const root=habitat.querySelector('#worm-species');
    const effects=add(root,'g',{'data-lombok-effects':'','aria-hidden':'true','pointer-events':'none'});
    const r={target,root,effects,styles:new Map(),cues:new Set(),opening:false,waiting:false};run=r;
    r.style=n=>{if(n&&!r.styles.has(n))r.styles.set(n,n.getAttribute('style'));return n;};
    // Pause before measuring, keeping the visitor's transforms on their original nodes.
    for(const n of habitat.querySelectorAll('.worm-body,.companion-body,.lingsar-worn-motion'))r.style(n).style.animationPlayState='paused';
    r.matrix=n=>{const m=root.getScreenCTM().inverse().multiply(n.getScreenCTM());return new DOMMatrix([m.a,m.b,m.c,m.d,m.e,m.f]);};
    r.clone=(n,parent)=>{
      const clone=n.cloneNode(true);clone.removeAttribute('id');clone.removeAttribute('transform');clone.setAttribute('style','animation:none;transform:none');
      clone.querySelectorAll('[id]').forEach(n=>n.removeAttribute('id'));parent.appendChild(clone);return clone;
    };
    return r;
  }
  function player(r,male){
    const original=body(male),from=r.matrix(original);
    const holder=add(r.effects,'g',{'data-lombok-player':male?'male':'female',transform:from.toString()});
    const clone=r.clone(original,holder);clone.removeAttribute('class');
    r.style(original).style.visibility='hidden';
    const paths=[...clone.querySelectorAll(male?'.companion-line,.companion-shadow,.companion-highlight':'.worm-line,.worm-shadow,.worm-highlight')].map(n=>({n,d:n.getAttribute('d')}));
    const face=add(clone,'g',{'data-lombok-face':''});
    [...clone.children].filter(n=>n!==face&&!paths.some(p=>p.n===n)&&!n.matches('.male-tail')).forEach(n=>face.appendChild(n));
    return{male,holder,from,clone,paths,face,tail:clone.querySelector('.male-tail')};
  }
  function poseFig(r,s){
    const {worker:w,artMatrix,skin,details,stem,closedRibs}=r;
    const q=clamp(s.curl),close=clamp(s.close);
    const to=artMatrix.translate(-122,-114).scale(.66);
    const v=['a','b','c','d','e','f'].map(k=>mix(w.from[k],to[k],q));
    w.holder.setAttribute('transform',`matrix(${v.join(' ')})`);
    w.paths.forEach(({n,d})=>{
      const highlight=n.matches('.worm-highlight,.companion-highlight'),shadow=n.matches('.worm-shadow,.companion-shadow');
      const target=COIL.map((x,i)=>x+(highlight?(i%2?-5:-3):shadow&&i%2?10:0));
      target[17]-=90*s.peek;target[19]-=140*s.peek;
      n.setAttribute('d',interpolatePath(d,target,q));
    });
    // Neck and face stay together when the head folds down into the fruit.
    w.face.setAttribute('transform',`translate(${-141*q} ${109*q-140*s.peek})`);
    if(w.tail)w.tail.setAttribute('d',interpolatePath('M79 228L49 210L64 242Z',[125,190,103,175,113,199],q));
    skin.forEach(({n,d},i)=>n.setAttribute('d',interpolatePath(d,CLOSED[w.male?'companion':'primary'][i],close)));
    details.forEach(n=>n.setAttribute('opacity',1-ease(close/.76)));
    stem?.setAttribute('transform',`translate(${(w.male?27:33)*close} ${-12*close})`);
    closedRibs.setAttribute('opacity',ease((close-.32)/.58));
    if(r.other){
      const o=r.other,amount=s.approach*(1-.2*s.recoil);
      const dx=r.seekDelta.x*amount,dy=r.seekDelta.y*amount-12*s.recoil+4*s.tap;
      o.paths.forEach(({n,d})=>n.setAttribute('d',seekerPath(d,r.seekDelta.x,amount?dy/amount:0,!o.male,amount)));
      o.face.setAttribute('transform',`translate(${dx} ${dy}) rotate(${r.seekTurn*amount-8*s.recoil} 326 54)`);
      const centreline=o.paths.find(p=>p.n.matches('.worm-line,.companion-line')).n;
      const shoulderPoint=centreline.getPointAtLength(centreline.getTotalLength()*.8);
      const shoulder=new DOMPoint(shoulderPoint.x,shoulderPoint.y).matrixTransform(o.from);
      const rest={x:shoulder.x+8*r.side,y:shoulder.y+14};
      const reach=clamp(s.approach*1.2),contact=r.touch;
      const gap=8*(1-s.tap),hand={x:mix(rest.x,contact.x+gap*r.side,reach),y:mix(rest.y,contact.y,reach)};
      r.arm.setAttribute('d',`M${shoulder.x} ${shoulder.y}Q${mix(shoulder.x,hand.x,.5)} ${Math.max(shoulder.y,hand.y)+9} ${hand.x} ${hand.y}`);
      r.hand.setAttribute('cx',hand.x);r.hand.setAttribute('cy',hand.y);
      r.gesture.setAttribute('opacity',reduced.matches?0:ease(s.approach/.45)*(1-.7*s.recoil));
    }
  }

  function beginFig(r,male){
    const art=r.target.querySelector('.location-accessory-art');r.artMatrix=r.matrix(art);
    // The effects layer is already on top. Reparenting the original accessory
    // would restart accessory-pop and the fitted fruit's idle animation.
    r.worker=player(r,male);
    r.other=player(r,!male);
    const fruit=add(r.effects,'g',{transform:r.artMatrix.toString(),'data-lombok-fig':''});
    r.fruit=r.clone(art,fruit);r.style(art).style.visibility='hidden';
    // Do not let the original opening CSS override the action's frame geometry.
    r.fruit.querySelectorAll('.lingsar-fig-opening').forEach(n=>n.style.animation='none');
    r.skin=[...r.fruit.querySelectorAll('.lingsar-fig-skin')].map(n=>({n,d:n.getAttribute('d')}));
    r.details=[...r.fruit.querySelectorAll('.lingsar-fig-pith,.lingsar-fig-flesh,.lingsar-fig-seed,.lingsar-fig-bloom,.lingsar-fig-cut-detail')];
    r.stem=r.fruit.querySelector('.left .lingsar-fig-stem');
    r.closedRibs=add(r.fruit,'g',{opacity:0});
    const short=male?.8:1;
    const ribs=add(r.closedRibs,'g',{transform:`scale(${short})`});
    path(ribs,'M-12-82C-15-56-49-39-57-9Q-71 28-35 52','none','#c0a6b8',2.2).setAttribute('opacity','.42');
    path(ribs,'M12-77Q13-49 32-34Q61-8 50 27','none','#b092a6',1.3).setAttribute('opacity','.34');
    path(ribs,'M-5-82Q-7-49-21-32M5-82Q9-51 24-29','none','#a9a379',1.1);
    [[-43,-25],[-52,-4],[-42,33],[23,-36],[51,0],[30,43],[-17,53],[-26,-8],[39,20],[-34,45]].forEach(([x,y])=>add(ribs,'ellipse',{cx:x,cy:y,rx:1,ry:.7,fill:'#ccb6b7',opacity:.5}));
    add(ribs,'ellipse',{cx:0,cy:67,rx:6,ry:2,fill:'#432f3a',opacity:.55});
    // The seeker follows the actual fruit, including the visitor's placement and size.
    const head=new DOMPoint(326,54).matrixTransform(r.other.from),centre=new DOMPoint(0,0).matrixTransform(r.artMatrix);
    r.side=head.x<centre.x?-1:1;
    r.touch=new DOMPoint(r.side*(male?58:68),-12).matrixTransform(r.artMatrix);
    const headTarget=new DOMPoint(r.side*(male?91:103),-32).matrixTransform(r.artMatrix).matrixTransform(r.other.from.inverse());
    r.seekDelta={x:Math.max(-235,Math.min(130,headTarget.x-326)),y:Math.max(-70,Math.min(180,headTarget.y-54))};
    r.seekTurn=r.side<0?30:-36;
    r.gesture=add(r.effects,'g',{'data-lombok-tapping':'',opacity:0});
    r.arm=path(r.gesture,'','none','var(--worm-color)',male?5:2.8);
    r.hand=add(r.gesture,'ellipse',{rx:male?3.6:2.3,ry:male?3:1.8,fill:'var(--worm-highlight)',stroke:'var(--worm-deep)','stroke-width':.7});
    animateFig(r);
  }
  function cue(r,key,at,kind,ms,level){
    if(reduced.matches||r.cues.has(key)||ms<at)return;r.cues.add(key);
    if(ms-at<100)sound.play(kind,level,ms-at);
  }
  function animateFig(r){
    const start=performance.now();r.waiting=false;habitat.dataset.lombokAction=r.opening?'opening':'hiding';
    function tick(now){
      if(run!==r)return;if(!visible(r.target)||document.hidden){cancel();return;}
      const ms=now-start,s=figFrame(ms,r.opening,r.worker.male,reduced.matches);poseFig(r,s);
      habitat.dataset.lombokPhase=r.opening?(ms<400?'opening':ms<1200?'peeking':'emerging'):(ms<1900?'hiding':ms<3350?'approaching':ms<4400?'tapping':'waiting');
      cue(r,r.opening?'open':'shut',r.opening?110:750,'fig',ms,.32);
      if(!r.opening){cue(r,'tap-one',3570,'tap',ms,.1);cue(r,'tap-two',4140,'tap',ms,.08);}
      if(s.done){
        if(r.opening){cancelAction();return;}
        r.waiting=true;habitat.dataset.lombokAction='hidden';raf=0;return;
      }
      raf=requestAnimationFrame(tick);
    }
    tick(start);
  }
  function beginFan(r){
    const male=r.target.dataset.wormPart==='companion';
    const art=r.target.querySelector('.location-accessory-art'),motion=art.querySelector('[data-lombok-fan]');
    const original=motion.getAttribute('transform');
    r.forestRestore=()=>{original===null?motion.removeAttribute('transform'):motion.setAttribute('transform',original);};
    let arm,hand,shoulder,grip;
    {
      const worm=body(male),line=worm.querySelector('.worm-line,.companion-line'),p=line.getPointAtLength(line.getTotalLength()*.80);
      shoulder=new DOMPoint(p.x,p.y).matrixTransform(r.matrix(worm));grip=new DOMPoint(0,44).matrixTransform(r.matrix(art));
      arm=path(r.effects,'','none','var(--worm-color)',male?2.8:5);hand=add(r.effects,'ellipse',{rx:male?2.5:4,ry:male?2:3,fill:'var(--worm-highlight)'});
    }
    const start=performance.now(),duration=3300;habitat.dataset.lombokAction='fanning';
    function tick(now){
      if(run!==r)return;if(!visible(r.target)||document.hidden){cancel();return;}
      const t=now-start,q=clamp(t/duration),envelope=ease(q/.16)*ease((1-q)/.18);
      habitat.dataset.lombokPhase=q<.18?'settling':q>.82?'returning':'active';
      if(reduced.matches||q>=1){cancelAction();return;}
      {
        const angle=Math.sin(t/155)*19*envelope;
        motion.setAttribute('transform','rotate('+angle+' 0 44)');
        arm.setAttribute('d','M'+shoulder.x+' '+shoulder.y+'Q'+(grip.x-15)+' '+(grip.y+13)+' '+grip.x+' '+grip.y);hand.setAttribute('cx',grip.x);hand.setAttribute('cy',grip.y);
        r.effects.setAttribute('opacity',envelope);cue(r,'rustle',250,'leaf',t,.16);
      }
      raf=requestAnimationFrame(tick);
    }
    tick(start);
  }
  function start(target){
    if(!handles(target)||!visible(target))return false;
    if(target.dataset.accessoryFamily===BUTTERFLY){flights.start(target);return true;}
    if(run?.target===target){
      if(run.waiting){run.opening=true;sound.unlock('fig');animateFig(run);}
      return true;
    }
    cancelAction();
    const r=setup(target),token=epoch;
    if(target.dataset.accessoryFamily!==FIG){
      const ready=target.dataset.accessoryFamily===FAN&&!reduced.matches?sound.unlock('leaf'):Promise.resolve();
      ready.then(()=>{if(run===r&&token===epoch)beginFan(r);});return true;
    }
    const ready=reduced.matches?Promise.resolve():Promise.all([sound.unlock('fig'),sound.unlock('tap')]);
    // Loading is gesture-only and bounded. A late decode cannot revive a cancelled action.
    ready.then(()=>{if(run!==r||token!==epoch)return;beginFig(r,target.dataset.wormPart==='companion');});
    return true;
  }
  for(const event of['pagehide','resize'])window.addEventListener(event,cancel);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});reduced.addEventListener('change',cancel);
  if(typeof IntersectionObserver==='function')new IntersectionObserver(entries=>{
    if((flights.active||(run&&!run.waiting))&&entries.some(e=>!e.isIntersecting))cancel();
  },{threshold:0}).observe(habitat);
  return{handles,start,cancel,clear:cancel,reset:cancel,get active(){return!!run||flights.active;}};
}
