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
export function splashFrame(ms,male=false,reduced=false){
  if(reduced)return{settle:0,dip:0,flick:0,duck:0,blink:0,done:ms>=400};
  return{
    settle:pulse(ms,0,700,4950,5800),
    dip:male?0:pulse(ms,650,1430,1750,2400),
    flick:male?pulse(ms,3670,4020,4140,4530):pulse(ms,2440,2740,2850,3230),
    duck:male?pulse(ms,2890,3130,3420,3740):pulse(ms,4300,4510,4730,5010),
    blink:male?pulse(ms,3120,3180,3300,3390):pulse(ms,4500,4570,4670,4780),
    done:ms>=5900
  };
}
export function swimmingPath(d,s,male=false){
  const n=d.match(/-?\d*\.?\d+/g).map(Number),v=[...n];
  // Deform the centreline, preserving the existing highlight and shadow offsets.
  v[0]-=(male?25:30)*s.flick;v[1]-=(male?110:70)*s.flick;
  v[2]-=10*s.flick;v[3]-=45*s.flick;
  v[10]+=11*s.dip;v[11]+=28*s.dip;
  v[13]+=33*s.dip+15*s.duck;
  v[14]-=10*s.dip;v[15]+=34*s.dip+28*s.duck;
  v[16]-=20*s.dip+14*s.duck;v[17]+=139*s.dip+60*s.duck;
  v[18]-=24*s.dip+26*s.duck;v[19]+=200*s.dip+(male?85:50)*s.duck;
  return interpolatePath(d,v,1);
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
    const art=r.target.querySelector('.location-accessory-art'),poolMatrix=r.matrix(art);
    const under=add(r.effects,'g',{transform:poolMatrix.toString()});
    const pool=r.clone(art,under),front=pool.querySelector('[data-lombok-pool-front]');
    r.style(art).style.visibility='hidden';
    const ripples=Array.from({length:3},(_,i)=>add(under,'ellipse',{cx:110-i*4,cy:-15+i*3,rx:1,ry:1,fill:'none',stroke:'#e5faf1','stroke-width':1.2,opacity:0}));
    const farSwimmer=player(r,true),workers=[player(r,false),farSwimmer];
    const over=add(r.effects,'g',{transform:poolMatrix.toString()});over.appendChild(front);
    const spray=add(r.effects,'g',{'data-lombok-spray':''});
    const shots=[2760,4060].map((at,i)=>({at,duration:i?700:580,points:null,
      ribbon:path(spray,'','none','#c3eef0',i?2.5:3.5),
      drops:Array.from({length:20},()=>add(spray,'ellipse',{rx:1.4,ry:2.8,fill:'#bceaf0',stroke:'#448598','stroke-width':.7,opacity:0}))}));
    // The original figs rest while the two swimmers act. Goggles follow faces.
    for(const male of[false,true]){const fig=piece(FIG,male);if(visible(fig))r.style(fig).style.opacity='0';}
    habitat.dataset.lombokAction='splashing';const start=performance.now();
    function tick(now){
      if(run!==r)return;if(!visible(r.target)||document.hidden){cancel();return;}
      const ms=now-start;if(splashFrame(ms,false,reduced.matches).done){cancel();return;}
      workers.forEach(w=>{
        const s=splashFrame(ms,w.male,reduced.matches);
        const centre=new DOMPoint(0,0).matrixTransform(poolMatrix);
        // Follow the movable pool, but retain each worm's own size and angle.
        const to=new DOMMatrix([w.from.a,w.from.b,w.from.c,w.from.d,
          w.from.e+centre.x-192,w.from.f+centre.y-263+(w.male?40:0)]);
        const v=['a','b','c','d','e','f'].map(k=>mix(w.from[k],to[k],s.settle));
        w.moving=new DOMMatrix(v);w.holder.setAttribute('transform',w.moving.toString());
        w.paths.forEach(({n,d})=>n.setAttribute('d',swimmingPath(d,s,w.male)));
        const headX=-24*s.dip-26*s.duck,headY=200*s.dip+(w.male?85:50)*s.duck;
        w.face.setAttribute('transform',`translate(${headX} ${headY}) rotate(${-82*s.dip-20*s.duck} 326 54)`);
        w.face.querySelectorAll('.worm-eye').forEach(n=>{const y=Number(n.getAttribute('cy'));n.setAttribute('transform',`translate(0 ${y}) scale(1 ${1-.9*s.blink}) translate(0 ${-y})`);});
        w.face.querySelectorAll('.worm-eye-shine').forEach(n=>n.setAttribute('opacity',1-s.blink));
        if(w.tail)w.tail.setAttribute('transform',`translate(${-25*s.flick} ${-110*s.flick}) rotate(${-25*s.flick} 78 228)`);
        w.tailPoint=new DOMPoint(78-(w.male?25:30)*s.flick,228-(w.male?110:70)*s.flick).matrixTransform(w.moving);
        w.headPoint=new DOMPoint(326+headX,54+headY).matrixTransform(w.moving);
      });
      ripples.forEach((n,i)=>{
        const age=clamp((ms-1370-i*160)/1150);
        n.setAttribute('rx',4+age*32);n.setAttribute('ry',2+age*9);
        n.setAttribute('opacity',reduced.matches?0:Math.sin(age*Math.PI)*.8);
      });
      shots.forEach((shot,i)=>{
        const age=(ms-shot.at)/shot.duration;
        if(age>=0&&!shot.points)shot.points=[workers[i].tailPoint,workers[1-i].headPoint];
        const active=!reduced.matches&&age>=0&&age<=1;
        shot.ribbon.setAttribute('opacity',active?Math.max(0,1-age*4):0);
        if(!shot.points)return;
        const[a,b]=shot.points,h=i?110:48;
        shot.ribbon.setAttribute('d',`M${a.x} ${a.y}Q${mix(a.x,b.x,.45)} ${Math.min(a.y,b.y)-h} ${mix(a.x,b.x,Math.min(1,age*2))} ${mix(a.y,b.y,Math.min(1,age*2))-Math.sin(clamp(age*2)*Math.PI)*h}`);
        shot.drops.forEach((n,j)=>{
          const q=clamp(age-j*.009),spread=Math.sin(j*2.4)*q*15;
          const x=mix(a.x,b.x,q)+spread,y=mix(a.y,b.y,q)-4*h*q*(1-q)+Math.cos(j*1.7)*q*12;
          n.setAttribute('cx',x);n.setAttribute('cy',y);n.setAttribute('transform',`rotate(${(i?50:-35)+j*3} ${x} ${y})`);
          n.setAttribute('opacity',active&&q>0?Math.min(1,(1-age)*6):0);
        });
      });
      cue(r,'dip',1500,'water',ms,.14);
      cue(r,'female-splash',2760,'water',ms,.22);
      cue(r,'male-splash',4060,'water',ms,.18);
      raf=requestAnimationFrame(tick);
    }
    tick(start);
  }
  function start(target){
    if(!handles(target)||!visible(target))return false;
    if(run?.target===target){
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
  return{handles,start,cancel,clear:cancel,reset:cancel,get active(){return!!run;}};
}
