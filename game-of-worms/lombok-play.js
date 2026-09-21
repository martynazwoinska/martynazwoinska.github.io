import {createLombokSound} from './lombok-sound.js?v=20260912-lombok-1';
export const FIG='lingsar-ficus-fruit-transformation';
export const WATER='hpt26-splashing-pool';
const GOGGLES='hpt26-swimming-goggles';
const clamp=x=>Math.max(0,Math.min(1,x));
const ease=x=>{x=clamp(x);return x*x*(3-2*x);};
const mix=(a,b,q)=>a+(b-a)*q;
const add=(p,t,a={})=>{const n=document.createElementNS('http://www.w3.org/2000/svg',t);for(const[k,v]of Object.entries(a))n.setAttribute(k,v);p.appendChild(n);return n;};
const path=(p,d,fill,stroke='none',width=1)=>add(p,'path',{d,fill,stroke,'stroke-width':width,'stroke-linecap':'round','stroke-linejoin':'round'});
export function interpolatePath(template,to,q){let i=0;return template.replace(/-?\d*\.?\d+/g,n=>` ${mix(Number(n),to[i++],q)} `);}
const COIL=[125,190,100,170,135,110,176,115,235,122,230,197,190,215,150,236,149,179,185,163];

export function figFrame(ms,opening=false,male=false,reduced=false){
  if(reduced)return{curl:opening?0:1,close:opening?0:1,peek:0,tail:opening?0:1,recoil:0,done:true};
  if(!opening)return{curl:ease(ms/1250),close:ease((ms-690)/900),peek:0,
    tail:male?ease((ms-970)/350):0,recoil:0,done:ms>=1700};
  if(male){
    const peek=ease(ms/330)*(1-ease((ms-1000)/450));
    return{curl:1-ease((ms-1100)/1200),close:1-.18*peek-ease((ms-1080)/680),peek,
      tail:1-ease((ms-1100)/600),recoil:0,done:ms>=2380};
  }
  return{curl:1-ease((ms-120)/800),close:1-ease(ms/430),peek:0,tail:0,
    recoil:Math.sin(clamp((ms-160)/770)*Math.PI),done:ms>=1100};
}

const pulse=(t,a,b,c,d)=>ease((t-a)/(b-a))*(1-ease((t-c)/(d-c)));
export function splashFrame(ms,male=false,reduced=false,splashMs=Infinity,splasherMale=false){
  const settle=reduced?0:ease((ms-(male?240:0))/1500);
  const attack=pulse(splashMs,0,300,420,850);
  const reaction=pulse(splashMs,480,650,850,1200);
  return {settle,phase:ms/520+(male?1.8:0),
    flick:reduced?0:male===splasherMale?attack:0,
    duck:reduced?0:male!==splasherMale?reaction:0,
    blink:reduced?0:male!==splasherMale?reaction:0};
}
export function swimmingPath(d,s,male=false){
  const original=d.match(/-?\d*\.?\d+/g).map(Number);
  const base=[78,228,122,280,173,255,181,203,188,151,225,105,278,113,330,121,355,82,326,54];
  const flat=[78,186,110,212,130,168,166,188,196,213,220,167,250,184,280,201,305,166,326,178];
  const target=flat.map((n,i)=>n+original[i]-base[i]+(i%2?Math.sin(s.phase-(i-1)*.36)*11:0));
  target[1]-=32*s.flick;target[3]-=18*s.flick;
  target[17]+=10*s.duck;target[19]+=15*s.duck;
  return interpolatePath(d,target,s.settle);
}
// Closed contours use the same cubic segments as the approved open fruit.
// The fleshy cut faces turn out of sight as the opaque outer skins meet.
const CLOSED={
  primary:[
    [0,-81,-42,-84,-85,-48,-82,2,-80,50,-42,69,0,75,0,46,0,21,0,-12,0,-39,0,-61,0,-81],
    [0,-81,42,-80,85,-36,80,7,76,48,42,68,0,75,0,44,0,14,0,-12,0,-36,0,-51,0,-81]
  ],
  companion:[
    [0,-62,-38,-63,-78,-25,-72,14,-68,46,-32,62,0,64,0,43,0,18,0,-9,0,-27,0,-44,0,-62],
    [0,-62,48,-62,78,-22,72,16,68,49,32,61,0,64,0,40,0,19,0,-6]
  ]
};

export function createLombokPlay(habitat,refresh=()=>{}){
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)'),sound=createLombokSound();
  let run=null,raf=0,epoch=0;
  const handles=n=>[FIG,WATER].includes(n?.dataset.accessoryFamily);
  const visible=n=>n?.isConnected&&!n.closest('[hidden]');
  const piece=(family,male)=>habitat.querySelector(`.accessory-piece[data-accessory-family="${family}"][data-worm-part="${male?'companion':'primary'}"]`);
  const body=male=>habitat.querySelector(male?'.companion-body':'.worm-body');
  function cancel(){
    epoch++;cancelAnimationFrame(raf);raf=0;sound.stop();if(!run)return;
    const r=run;run=null;
    for(const[n,v]of r.styles)v===null?n.removeAttribute('style'):n.setAttribute('style',v);
    if(r.stack){const{node,next}=r.stack;if(node.isConnected)node.parentNode.insertBefore(node,next?.parentNode===node.parentNode?next:null);}
    r.effects.remove();delete habitat.dataset.lombokAction;refresh();
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
    const goggles=piece(GOGGLES,male);
    if(visible(goggles)){
      const art=goggles.querySelector('.location-accessory-art'),at=from.inverse().multiply(r.matrix(art));
      const g=add(face,'g',{transform:at.toString()});r.clone(art,g);r.style(goggles).style.visibility='hidden';
    }
    return{male,holder,from,clone,paths,face,tail:clone.querySelector('.male-tail')};
  }
  function poseFig(r,s){
    const {worker:w,artMatrix,skin,details,stem,closedRibs,tail}=r;
    const q=clamp(s.curl),close=clamp(s.close);
    const to=artMatrix.translate(-148,-144).scale(.8);
    const v=['a','b','c','d','e','f'].map(k=>mix(w.from[k],to[k],q));
    w.holder.setAttribute('transform',`matrix(${v.join(' ')})`);
    w.paths.forEach(({n,d})=>{
      const highlight=n.matches('.worm-highlight,.companion-highlight'),shadow=n.matches('.worm-shadow,.companion-shadow');
      const target=COIL.map((x,i)=>x+(highlight?(i%2?-5:-3):shadow&&i%2?10:0));
      target[17]-=62*s.peek;target[19]-=100*s.peek;
      n.setAttribute('d',interpolatePath(d,target,q));
    });
    // Neck and face stay together when the head folds down into the fruit.
    w.face.setAttribute('transform',`translate(${-141*q} ${109*q-100*s.peek})`);
    if(w.tail)w.tail.setAttribute('d',interpolatePath('M79 228L49 210L64 242Z',[125,190,103,175,113,199],q));
    skin.forEach(({n,d},i)=>n.setAttribute('d',interpolatePath(d,CLOSED[w.male?'companion':'primary'][i],close)));
    details.forEach(n=>n.setAttribute('opacity',1-ease(close/.76)));
    stem?.setAttribute('transform',`translate(${(w.male?27:33)*close} 0)`);
    closedRibs.setAttribute('opacity',ease((close-.32)/.58));
    if(tail)tail.setAttribute('opacity',s.tail);
    if(r.other){
      const m=new DOMMatrix().translate(-7*s.recoil,0).translate(110,150).rotate(-6*s.recoil).translate(-110,-150).multiply(r.other.from);
      r.other.holder.setAttribute('transform',m.toString());
    }
  }
  function beginFig(r,male){
    const art=r.target.querySelector('.location-accessory-art');r.artMatrix=r.matrix(art);
    const node=r.target.parentNode;r.stack={node,next:node.nextSibling};node.parentNode.appendChild(node);
    r.worker=player(r,male);
    if(!male)r.other=player(r,true);
    const fruit=add(r.effects,'g',{transform:r.artMatrix.toString(),'data-lombok-fig':''});
    r.fruit=r.clone(art,fruit);r.style(art).style.visibility='hidden';
    // Do not let the original opening CSS override the action's frame geometry.
    r.fruit.querySelectorAll('.lingsar-fig-opening').forEach(n=>n.style.animation='none');
    r.skin=[...r.fruit.querySelectorAll('.lingsar-fig-skin')].map(n=>({n,d:n.getAttribute('d')}));
    r.details=[...r.fruit.querySelectorAll('.lingsar-fig-pith,.lingsar-fig-flesh,.lingsar-fig-seed,.lingsar-fig-bloom')];
    r.stem=r.fruit.querySelector('.left .lingsar-fig-stem');
    r.closedRibs=add(r.fruit,'g',{opacity:0});
    const short=male?.8:1;
    const ribs=add(r.closedRibs,'g',{transform:`scale(${short})`});
    path(ribs,'M-10-76C-43-75-70-39-66-4Q-57-34-28-41Q-16-53-10-76Z','#aa849d');
    path(ribs,'M53-43Q86 15 30 62Q62 23 53-43Z','#543b58');
    path(ribs,'M-20-71C-55-49-63 23-30 60','none','#b493ac',2.5);
    path(ribs,'M-40-55Q-65-5-42 29','none','#c7b2bc',1.2);
    path(ribs,'M25-64Q68-9 39 52','none','#432f45',2);
    path(ribs,'M0-78Q-3-9 0 70','none','#49374b',1.3);
    [[-43,-25],[-52,-4],[-42,33],[23,-36],[51,0],[30,43],[-17,53]].forEach(([x,y])=>add(ribs,'ellipse',{cx:x,cy:y,rx:.9,ry:1.4,fill:'#ccb794',opacity:.55}));
    if(male){
      r.tail=add(fruit,'g',{opacity:0});
      path(r.tail,'M-26 48C-39 70-67 81-87 72Q-100 69-103 58Q-82 65-75 59C-57 66-41 53-36 39Z','var(--worm-color)','var(--worm-deep)',1.3);
      path(r.tail,'M-40 52Q-67 73-91 65','none','#ffffff55',3);
    }
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
      cue(r,r.opening?'open':'shut',r.opening?80:690,'fig',ms,.42);
      if(s.done){
        if(r.opening){cancel();return;}
        r.waiting=true;habitat.dataset.lombokAction='hidden';raf=0;return;
      }
      raf=requestAnimationFrame(tick);
    }
    tick(start);
  }
  function beginWater(r){
    r.kind='water';
    const art=r.target.querySelector('.location-accessory-art'),poolMatrix=r.matrix(art);
    const under=add(r.effects,'g',{transform:poolMatrix.toString()});
    const pool=r.clone(art,under),front=pool.querySelector('[data-lombok-pool-front]');
    r.style(art).style.visibility='hidden';
    const workers=[player(r,false),player(r,true)];
    const over=add(r.effects,'g',{transform:poolMatrix.toString()});over.appendChild(front);
    const surface=add(r.effects,'g',{'data-lombok-water-contact':''});
    const wakes=workers.map(()=>Array.from({length:3},()=>add(surface,'ellipse',{fill:'none',stroke:'#e5faf1','stroke-width':1.1,opacity:0})));
    const spray=add(r.effects,'g',{'data-lombok-spray':''});
    const drops=Array.from({length:14},()=>add(spray,'ellipse',{rx:1.5,ry:2.3,fill:'#c8f3f4',stroke:'#448598','stroke-width':.6,opacity:0}));
    const started=performance.now();r.splashAt=-Infinity;r.splasherMale=false;r.nextMale=false;
    r.splash=()=>{const now=performance.now();if(now-started<1750||now-r.splashAt<1300)return;r.splashAt=now;r.splasherMale=r.nextMale;r.nextMale=!r.nextMale;r.shot=null;};
    habitat.dataset.lombokAction='swimming';
    function tick(now){
      if(run!==r)return;if(!visible(r.target)||document.hidden){cancel();return;}
      const ms=now-started,splashMs=now-r.splashAt;
      if(reduced.matches&&ms>=400){cancel();return;}
      workers.forEach((w,index)=>{
        const f=splashFrame(ms,w.male,reduced.matches,splashMs,r.splasherMale);
        const centre=new DOMPoint(w.male?-65:14,w.male?-19:8).matrixTransform(poolMatrix);
        const wave=ease((ms-1700)/800),driftX=Math.sin(ms/1700+(w.male?2:0))*8*wave,driftY=Math.sin(ms/1100)*2*wave;
        // Keep each worm's size independent of the visitor's pool size.
        const linear=new DOMMatrix([w.from.a,w.from.b,w.from.c,w.from.d,0,0]);
        const anchor=new DOMPoint(202,190).matrixTransform(linear);
        const to=new DOMMatrix([w.from.a,w.from.b,w.from.c,w.from.d,centre.x-anchor.x+driftX,centre.y-anchor.y+driftY]);
        const values=['a','b','c','d','e','f'].map(k=>mix(w.from[k],to[k],f.settle));
        w.moving=new DOMMatrix(values);w.holder.setAttribute('transform',w.moving.toString());
        w.paths.forEach(({n,d})=>n.setAttribute('d',swimmingPath(d,f,w.male)));
        const coords=swimmingPath('M78 228C122 280 173 255 181 203C188 151 225 105 278 113C330 121 355 82 326 54',f,w.male).match(/-?\d*\.?\d+/g).map(Number);
        const headX=coords[18]-326,headY=coords[19]-54;
        w.face.setAttribute('transform',`translate(${headX} ${headY}) rotate(${-28*f.settle+3*Math.sin(f.phase)*f.settle} 326 54)`);
        w.face.querySelectorAll('.worm-eye').forEach(n=>{const y=+n.getAttribute('cy');n.setAttribute('transform',`translate(0 ${y}) scale(1 ${1-.8*f.blink}) translate(0 ${-y})`);});
        if(w.tail)w.tail.setAttribute('transform',`translate(${coords[0]-78} ${coords[1]-228}) rotate(${-12*f.settle} 78 228)`);
        w.tailPoint=new DOMPoint(coords[0],coords[1]).matrixTransform(w.moving);
        w.headPoint=new DOMPoint(coords[18],coords[19]).matrixTransform(w.moving);
        wakes[index].forEach((n,i)=>{
          const age=((ms+i*500)%1600)/1600,p=w.tailPoint;
          n.setAttribute('cx',p.x-8*age);n.setAttribute('cy',p.y+3);
          n.setAttribute('rx',5+age*20);n.setAttribute('ry',2+age*5);
          n.setAttribute('opacity',reduced.matches?0:Math.sin(age*Math.PI)*.42*f.settle);
        });
      });
      if(splashMs>=300&&splashMs<1000&&!r.shot){r.shot=[workers[r.splasherMale?1:0].tailPoint,workers[r.splasherMale?0:1].headPoint];if(!reduced.matches&&splashMs<400)sound.play('water',.2);}
      drops.forEach((n,i)=>{
        const age=(splashMs-300-i*12)/620,active=age>=0&&age<1&&!reduced.matches&&r.shot;
        n.setAttribute('opacity',active?Math.sin(age*Math.PI):0);if(!active)return;
        const [a,b]=r.shot,h=38+i%4*3;
        n.setAttribute('cx',mix(a.x,b.x,age)+Math.sin(i*2.1)*age*7);
        n.setAttribute('cy',mix(a.y,b.y,age)-4*h*age*(1-age));
      });
      cue(r,'entry',1200,'water',ms,.1);
      raf=requestAnimationFrame(tick);
    }
    tick(started);
  }
  function start(target){
    if(!handles(target)||!visible(target))return false;
    if(run?.target===target){
      if(run.kind==='water'){run.splash?.();return true;}
      if(run.waiting){run.opening=true;sound.unlock('fig');animateFig(run);}else cancel();
      return true;
    }
    cancel();const kind=target.dataset.accessoryFamily===FIG?'fig':'water';
    const r=setup(target),token=epoch;
    const ready=reduced.matches?Promise.resolve():sound.unlock(kind);
    // Loading is gesture-only and bounded. A late decode cannot revive a cancelled action.
    ready.then(()=>{if(run!==r||token!==epoch)return;if(kind==='fig')beginFig(r,target.dataset.wormPart==='companion');else beginWater(r);});
    return true;
  }
  for(const event of['pagehide','resize'])window.addEventListener(event,cancel);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});reduced.addEventListener('change',cancel);
  if(typeof IntersectionObserver==='function')new IntersectionObserver(entries=>{
    if(run?.kind==='water'&&entries.some(e=>!e.isIntersecting))cancel();
  },{threshold:0}).observe(habitat);
  return{handles,start,cancel,clear:cancel,reset:cancel,get active(){return!!run;}};
}
