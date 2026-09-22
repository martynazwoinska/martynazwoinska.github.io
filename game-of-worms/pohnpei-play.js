import {OPTICS,BIRD,add,path,drawBirdPerch} from './pohnpei-art.js?v=20260922-birdwatch-1';
import {createPohnpeiSound} from './pohnpei-sound.js?v=20260913-pohnpei-1';
import {pathPoints} from './guadeloupe-dance.js?v=20260916-gwoka-11';
const clamp=x=>Math.max(0,Math.min(1,x));
const ease=x=>{x=clamp(x);return x*x*x*(10+x*(-15+6*x));};
export const WATCH_DURATION=11200;
// Each flight starts and ends at a foothold. Wings spread before takeoff and
// feet extend before landing; the return is a separate, slower curved flight.
export function birdFrame(ms,reduced=false){
  if(reduced)return{x:0,y:0,air:0,wing:0,tilt:0,call:ms>400&&ms<3000,phase:'listening'};
  const out=clamp((ms-3900)/1500),back=clamp((ms-7600)/2100);
  const outArc=Math.sin(Math.PI*out),backArc=Math.sin(Math.PI*back);
  const hop=clamp((ms-3050)/500),hopArc=Math.sin(Math.PI*hop);
  const flight=outArc+backArc;
  const spread=ease((ms-3750)/180)*(1-ease((ms-5310)/140))+ease((ms-7420)/180)*(1-ease((ms-9600)/100));
  return{x:12*ease(hop)*(1-ease(out))+97*ease(out)*(1-ease(back)),
    y:-12*hopArc-25*ease(out)*(1-ease(back))-62*outArc-83*backArc,
    air:clamp(flight*3),wing:spread,tilt:14*outArc-20*backArc,
    call:ms>400&&ms<2850||ms>5850&&ms<6900,
    phase:ms<3050?'calling':ms<3750?'hopping':ms<5400?'flying':ms<7420?'perched':ms<9700?'returning':'settling'};
}
export function watchPoint(x,y,amount,male=false){
  const upper=ease((x-170)/160),middle=Math.sin(Math.PI*clamp((y-90)/180))**2*ease((x-100)/80);
  return{x:x+amount*(middle*(male?-9:7)+upper*(male?5:-3)),y:y-amount*upper*(male?7:5)};
}
export function createPohnpeiPlay(habitat,refresh=()=>{}){
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)'),sound=createPohnpeiSound();
  let run=null,raf=0,epoch=0;
  const visible=n=>n?.isConnected&&!n.closest('[hidden]');
  const handles=n=>[OPTICS,BIRD].includes(n?.dataset.accessoryFamily);
  const piece=(family,male=false)=>habitat.querySelector('.accessory-piece[data-accessory-family="'+family+'"][data-worm-part="'+(male?'companion':'primary')+'"]');
  function cancel(){
    epoch++;cancelAnimationFrame(raf);raf=0;sound.stop();
    const r=run;run=null;if(!r)return;
    for(const [n,key,value]of r.saved)value===null?n.removeAttribute(key):n.setAttribute(key,value);
    for(const n of r.assigned)n.removeAttribute('id');
    for(const svg of r.windows)svg.replaceChildren();
    if(r.stack){const {node,next}=r.stack;node.parentNode.insertBefore(node,next?.parentNode===node.parentNode?next:null);}
    r.effects.remove();r.temporaryBird?.remove();
    for(const a of r.paused)if(a.playState==='paused')a.play();
    if(r.focused&&document.activeElement===document.body&&visible(r.target))r.target.focus({preventScroll:true});
    for(const attr of ['pohnpeiAction','pohnpeiFound','pohnpeiPhase'])delete habitat.dataset[attr];
    refresh();
  }
  function adjust(target){
    if(run?.kind==='watch'&&target?.dataset.accessoryFamily===OPTICS){
      // Restore only our temporary lift before the player's own edit is applied.
      for(const w of run.watchers)if(w.optic===target){w.manual=true;restore(w.art,'transform');}
      return;
    }
    cancel();
  }
  function save(r,n,key){if(n&&!r.saved.some(v=>v[0]===n&&v[1]===key))r.saved.push([n,key,n.getAttribute(key)]);}
  function restore(n,key){const v=run?.saved.find(v=>v[0]===n&&v[1]===key);if(v)v[2]===null?n.removeAttribute(key):n.setAttribute(key,v[2]);}
  function pause(r,n){for(const a of n.getAnimations())if(a.playState==='running'){a.pause();r.paused.push(a);}}
  function matrix(r,n){return r.root.getScreenCTM().inverse().multiply(n.getScreenCTM());}
  function watchers(r){
    r.watchers=[];
    for(const n of habitat.querySelectorAll('.fitted-headwear-motion'))pause(r,n);
    for(const male of [false,true]){
      const body=habitat.querySelector(male?'.companion-body':'.worm-body');pause(r,body);
      const w={male,body,paths:[],face:[],optic:piece(OPTICS,male)};
      for(const n of body.children){
        if(n.matches('.worm-line,.worm-shadow,.worm-highlight,.companion-line,.companion-shadow,.companion-highlight')){
          save(r,n,'d');w.paths.push({n,points:pathPoints(n.getAttribute('d'))});
        }else if(!n.matches('.male-tail')){save(r,n,'transform');w.face.push(n);}
      }
      if(visible(w.optic)){
        w.art=w.optic.querySelector('.location-accessory-art');save(r,w.art,'transform');
        const eye=new DOMPoint(331,58).matrixTransform(body.getScreenCTM());
        const localEye=eye.matrixTransform(w.art.getScreenCTM().inverse());
        // Lift binoculars to the face, while the scope remains on its tripod.
        w.lift={x:Math.max(-32,Math.min(32,localEye.x)),y:Math.max(-85,Math.min(0,localEye.y+38))};
        w.base=w.art.getAttribute('transform')||'';
        w.arms=add(r.effects,'g',{'data-pohnpei-hands':male?'male':'hermaphrodite'});
      }
      r.watchers.push(w);
    }
  }
  function setup(target,kind){
    const root=habitat.querySelector('#worm-species');
    const r={root,target,kind,saved:[],assigned:[],windows:[],paused:[],cues:new Set(),watchers:[],
      effects:add(root,'g',{'data-pohnpei-effects':'','pointer-events':'none','aria-hidden':'true'}),
      focused:document.activeElement===target,start:performance.now()};
    run=r;habitat.dataset.pohnpeiAction=kind;
    const branch=piece(BIRD);
    if(visible(branch))r.bird=branch.querySelector('[data-pohnpei-performer]');
    else{
      r.temporaryBird=add(habitat.querySelector('#location-scene'),'g',{transform:'translate(113 116) scale(.63)','aria-hidden':'true','pointer-events':'none'});
      drawBirdPerch(r.temporaryBird);r.bird=r.temporaryBird.querySelector('[data-pohnpei-performer]');
    }
    for(const n of [r.bird,...r.bird.querySelectorAll('[data-bird-flight-wing],[data-bird-folded-wing],[data-bird-feet],[data-bird-bill]')])for(const key of ['transform','opacity'])save(r,n,key);
    r.wing=r.bird.querySelector('[data-bird-flight-wing]');r.folded=r.bird.querySelector('[data-bird-folded-wing]');r.feet=r.bird.querySelector('[data-bird-feet]');r.bill=r.bird.querySelector('[data-bird-bill]');
    watchers(r);
    sound.unlock('bird').then(ready=>{if(run===r&&ready)r.soundReady=true;});
    const headwear=habitat.querySelector('#local-headwear');r.stack={node:headwear,next:headwear.nextSibling};headwear.parentNode.appendChild(headwear);
    r.lenses=[];
    const sources=[habitat.querySelector('#location-scene'),habitat.querySelector('.companion-body'),habitat.querySelector('.worm-body'),habitat.querySelector('#local-charm'),habitat.querySelector('#local-wrap')].filter(Boolean);
    sources.forEach((n,i)=>{if(!n.id){n.id='pohnpei-optical-source-'+epoch+'-'+i;r.assigned.push(n);}});
    for(const n of habitat.querySelectorAll('[data-pohnpei-lens]')){
      if(!visible(n))continue;
      const svg=n.querySelector('svg');r.windows.push(svg);
      const layers=sources.map(source=>{const layer=add(svg,'g');add(layer,'use',{href:'#'+source.id,'pointer-events':'none'});return{source,layer};});
      r.lenses.push({n,layers,piece:n.closest('.accessory-piece')});
    }
    return r;
  }
  function opticsTick(r){
    for(const {n,layers,piece:optic}of r.lenses){
      if(!visible(optic))continue;const outer=n.getScreenCTM();if(!outer)continue;
      const x=+n.dataset.lensX,y=+n.dataset.lensY,radius=+n.dataset.lensR;
      const sample=outer.translate(x-radius,y-radius);
      const watcher=r.watchers.find(w=>w.optic===optic);
      const subject=new DOMPoint(14,-33).matrixTransform(r.bird.getScreenCTM()).matrixTransform(sample.inverse());
      // Held optics follow the bird. Once dragged, the player's lens resumes
      // magnifying whatever lies underneath it, preserving the original search.
      const focus=watcher?.manual?{x:radius,y:radius}:subject;
      const zoom=new DOMMatrix().translate(radius,radius).scale(watcher?.manual?3:1.8).translate(-focus.x,-focus.y);
      for(const {source,layer}of layers){
        layer.style.display=visible(source)?'':'none';const m=source.parentNode.getScreenCTM();
        if(m)layer.setAttribute('transform',zoom.multiply(sample.inverse()).multiply(m).toString());
      }
      const lens=new DOMPoint(x,y).matrixTransform(outer),bird=new DOMPoint(0,-10).matrixTransform(r.bird.getScreenCTM());
      if(Math.hypot(lens.x-bird.x,lens.y-bird.y)<radius*Math.hypot(outer.a,outer.b)*.8)habitat.dataset.pohnpeiFound='true';
    }
  }
  function poseWatchers(r,ms){
    const envelope=reduced.matches?0:ease(ms/1100)*(1-ease((ms-9700)/1500));
    for(const w of r.watchers){
      const amount=envelope*(w.male?.85:1),head=watchPoint(331,64,amount,w.male);
      for(const {n,points}of w.paths)n.setAttribute('d',points.map(p=>{const q=watchPoint(p.x,p.y,amount,w.male);return `${p.move?'M':'L'}${q.x.toFixed(3)} ${q.y.toFixed(3)}`;}).join(' '));
      for(const n of w.face)n.setAttribute('transform',`translate(${head.x-331} ${head.y-64})`);
      if(!w.art)continue;
      if(!w.male&&!w.manual)w.art.setAttribute('transform',w.base+` translate(${w.lift.x*envelope} ${w.lift.y*envelope})`);
      w.arms.replaceChildren();if(envelope<=.001||w.manual)continue;
      const body=matrix(r,w.body),optic=matrix(r,w.art);
      for(const side of [-1,1]){
        const p=watchPoint(side<0?292:315,110,amount,w.male),a=new DOMPoint(p.x,p.y).matrixTransform(body);
        const b=new DOMPoint(w.male?(side<0?-25:-2):side*38,w.male?7:0).matrixTransform(optic);
        // Do not stretch arms to optics placed far away by the player.
        if(Math.hypot(a.x-b.x,a.y-b.y)>85)continue;
        const d=`M${a.x} ${a.y}Q${a.x+side*8} ${Math.max(a.y,b.y)+16} ${b.x} ${b.y}`;
        const g=add(w.arms,'g',{opacity:envelope});
        path(g,d,'none','var(--worm-deep)',w.male?3:5);path(g,d,'none','var(--worm-color)',w.male?1.8:3.3);
        add(g,'ellipse',{cx:b.x,cy:b.y,rx:w.male?2.2:3.6,ry:w.male?1.8:2.7,fill:'var(--worm-color)',stroke:'var(--worm-deep)','stroke-width':.7});
      }
    }
  }
  function tick(now){
    raf=0;const r=run;if(!r)return;const bounds=habitat.getBoundingClientRect();
    if(!visible(r.target)||document.hidden||bounds.bottom<=0||bounds.top>=innerHeight){cancel();return;}
    const ms=now-r.start,f=birdFrame(ms,reduced.matches);habitat.dataset.pohnpeiPhase=f.phase;
    r.bird.setAttribute('transform',`translate(${f.x} ${f.y}) rotate(${f.tilt} 0 15)`);
    r.wing.setAttribute('opacity',f.wing);r.folded.setAttribute('opacity',1-f.wing);
    r.wing.setAttribute('transform',`rotate(${f.wing*(15+45*Math.sin(ms/54))} -12 -12) scale(1 ${1-f.wing*.18})`);
    r.feet.setAttribute('transform',`translate(0 ${-8*f.air}) scale(1 ${1-.35*f.air})`);
    r.bill.setAttribute('transform',`rotate(${f.call&&!reduced.matches?12*Math.max(0,Math.sin(ms/96)):0} 26 -29)`);
    for(const [key,at,duration]of [['first',450,2.4],['answer',5850,1.25]]){
      if(ms>=at&&ms<at+2500&&!r.cues.has(key)&&r.soundReady){if(sound.play('bird',.3,duration,.085))r.cues.add(key);}
    }
    if(!r.settled)poseWatchers(r,ms);opticsTick(r);
    if(ms>=WATCH_DURATION&&r.kind==='call'){cancel();return;}
    if(ms>=WATCH_DURATION&&!r.settled){
      // Restore exact curves and face transforms once the finite performance ends.
      for(const w of r.watchers){for(const p of w.paths)restore(p.n,'d');for(const n of w.face)restore(n,'transform');if(w.art&&!w.manual)restore(w.art,'transform');}
      r.settled=true;
    }
    if(run)raf=requestAnimationFrame(tick);
  }
  function start(target){
    if(!handles(target)||!visible(target))return false;
    cancel();setup(target,target.dataset.accessoryFamily===OPTICS?'watch':'call');tick(performance.now());return true;
  }
  for(const e of ['resize','pagehide'])window.addEventListener(e,cancel);
  window.addEventListener('keydown',event=>{if(event.key==='Escape'&&run)cancel();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});reduced.addEventListener('change',cancel);
  if(typeof IntersectionObserver==='function')new IntersectionObserver(entries=>{if(run&&entries.some(e=>!e.isIntersecting))cancel();},{threshold:0}).observe(habitat);
  return{handles,start,adjust,cancel,clear:cancel,get active(){return!!run;}};
}
