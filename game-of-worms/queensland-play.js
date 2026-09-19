import {LIFT,CAMERA,HARNESS,add,path,drawPhoto} from './queensland-art.js?v=20260913-canopy-1';
import {createCanopySound} from './queensland-sound.js?v=20260913-canopy-2';
const clamp=x=>Math.max(0,Math.min(1,x));
const ease=x=>{x=clamp(x);return x*x*(3-2*x);};
const mix=(a,b,t)=>a+(b-a)*t;
const pulse=(t,a,b,c,d)=>ease((t-a)/(b-a))*(1-ease((t-c)/(d-c)));
export function liftFrame(ms,reduced=false,returnAt=null){
  if(reduced)return{board:0,height:0,look:0,done:ms>=500};
  if(returnAt!==null){
    const from=liftFrame(returnAt),elapsed=ms-returnAt;
    return{board:from.board*(1-ease((elapsed-2400)/1200)),height:from.height*(1-ease(elapsed/2400)),
      look:from.look*(1-ease(elapsed/400)),done:elapsed>=3650};
  }
  // Wait at canopy height until another lift tap: each camera stays independent.
  return{board:ease(ms/1200),height:ease((ms-1200)/2600),
    look:pulse(ms,3850,4300,4850,5300),done:false};
}
export function cameraFrame(ms,male=false,reduced=false){
  if(reduced)return{raise:0,press:0,lean:0,print:male?1:0,reveal:1,done:ms>=1200};
  return{raise:pulse(ms,0,800,male?4800:2100,male?5700:2900),
    press:pulse(ms,820,940,1050,1200),lean:male?pulse(ms,300,880,1330,1900):0,
    print:male?ease((ms-1150)/2500):0,reveal:ease((ms-1600)/1800),done:ms>=(male?6900:3100)};
}
// Visitor translation/scale stays on the piece. Only its body-relative carrier moves.
export function carrierMatrix(parent,from,to){return parent.inverse().multiply(to).multiply(from.inverse()).multiply(parent);}
export const rideEditable=n=>[CAMERA,HARNESS].includes(n?.dataset.accessoryFamily);

export function createCanopyPlay(habitat,refresh=()=>{}){
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)'),sound=createCanopySound();
  let run=null,raf=0,idleCable=null,idleRaf=0;
  const handles=n=>[LIFT,CAMERA].includes(n?.dataset.accessoryFamily);
  const visible=n=>n?.isConnected&&!n.closest('[hidden]');
  const piece=(family,male=false)=>habitat.querySelector('.accessory-piece[data-accessory-family="'+family+'"][data-worm-part="'+(male?'companion':'primary')+'"]');
  const body=male=>habitat.querySelector(male?'.companion-body':'.worm-body');
  const matrix=(root,n)=>{const m=root.getScreenCTM().inverse().multiply(n.getScreenCTM());return new DOMMatrix([m.a,m.b,m.c,m.d,m.e,m.f]);};
  const blend=(a,b,q)=>new DOMMatrix(['a','b','c','d','e','f'].map(k=>mix(a[k],b[k],q)));
  const restore=styles=>{for(const[n,v]of styles)v===null?n.removeAttribute('style'):n.setAttribute('style',v);};
  function cablePath(root,art){
    const m=matrix(root,art),p=new DOMPoint(-12,-183).matrixTransform(m);
    const screen=p.matrixTransform(root.getScreenCTM());
    const top=new DOMPoint(screen.x,habitat.getBoundingClientRect().top-5).matrixTransform(root.getScreenCTM().inverse());
    return 'M'+top.x+' '+top.y+'L'+p.x+' '+p.y;
  }
  function syncCable(){
    idleRaf=0;const lift=piece(LIFT),root=habitat.querySelector('#worm-species');
    if(run?.ride||!visible(lift)){idleCable?.remove();idleCable=null;return;}
    if(!idleCable?.isConnected){idleCable=path(root,'','none','#c7d2cf',1.7);idleCable.dataset.canopyCable='';idleCable.setAttribute('pointer-events','none');idleCable.setAttribute('aria-hidden','true');root.insertBefore(idleCable,root.firstChild);}
    const d=cablePath(root,lift.querySelector('.location-accessory-art'));
    if(idleCable.getAttribute('d')!==d)idleCable.setAttribute('d',d);
  }
  function queueCable(){if(!idleRaf)idleRaf=requestAnimationFrame(syncCable);}
  new MutationObserver(mutations=>{
    if(mutations.some(m=>!m.target.closest?.('[data-canopy-effects],[data-canopy-cable],[data-canopy-carrier]')))queueCable();
  }).observe(habitat,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden','transform','style']});
  function setup(){
    if(run)return run;
    const root=habitat.querySelector('#worm-species'),focus=document.activeElement;
    const back=add(root,'g',{'data-canopy-effects':'back','aria-hidden':'true','pointer-events':'none'});
    root.insertBefore(back,root.firstChild);
    const effects=add(root,'g',{'data-canopy-effects':'front','aria-hidden':'true','pointer-events':'none'});
    const r={root,back,effects,styles:new Map(),photos:new Map(),carriers:[],hits:new Map(),ride:null};run=r;
    r.style=n=>{if(n&&!r.styles.has(n))r.styles.set(n,n.getAttribute('style'));return n;};
    for(const n of habitat.querySelectorAll('.worm-body,.companion-body,.fitted-headwear-motion'))r.style(n).style.animationPlayState='paused';
    r.matrix=n=>matrix(root,n);
    r.clone=(n,parent)=>{
      const c=n.cloneNode(true);c.removeAttribute('id');c.removeAttribute('transform');c.setAttribute('style','animation:none;transform:none');
      c.querySelectorAll('[id]').forEach(x=>x.removeAttribute('id'));parent.appendChild(c);return c;
    };
    r.people=[false,true].map(male=>{
      const original=body(male),from=r.matrix(original),holder=add(back,'g',{transform:from.toString()});
      const clone=r.clone(original,holder);clone.removeAttribute('class');r.style(original).style.visibility='hidden';
      const face=add(clone,'g');
      [...clone.children].filter(n=>n.matches?.('.worm-eye,.worm-eye-shine,.worm-cheek,.worm-smile')).forEach(n=>face.appendChild(n));
      return{male,from,pose:from,holder,face};
    });
    for(const family of[HARNESS,CAMERA])for(const male of[false,true]){
      const item=piece(family,male);if(!item)continue;
      const parent=item.parentElement,carrier=add(parent,'g',{'data-canopy-carrier':male?'companion':'primary'});
      parent.insertBefore(carrier,item);carrier.appendChild(item);
      r.carriers.push({item,parent,carrier,worm:r.people[Number(male)]});
    }
    if(focus?.isConnected)focus.focus?.({preventScroll:true});
    return r;
  }
  function stopPhoto(male){
    const p=run?.photos.get(male);if(!p)return;
    sound.stop(male?'instant':'shutter');restore(p.styles);p.effects.remove();run.photos.delete(male);
  }
  function stopRide(){
    const ride=run?.ride;if(!ride)return;
    sound.stop('motor');restore(ride.styles);ride.parent.insertBefore(ride.target,ride.carrier);ride.carrier.remove();ride.back.remove();ride.rim.remove();run.ride=null;queueCable();
  }
  function finishIfIdle(){
    if(!run||run.ride||run.photos.size)return;
    const r=run,focus=document.activeElement;run=null;cancelAnimationFrame(raf);raf=0;
    for(const{item,parent,carrier}of r.carriers){parent.insertBefore(item,carrier);carrier.remove();}
    for(const[hit,attrs]of r.hits)for(const[key,value]of Object.entries(attrs))hit.setAttribute(key,value);
    restore(r.styles);r.back.remove();r.effects.remove();
    delete habitat.dataset.canopyAction;delete habitat.dataset.canopyPhase;delete habitat.dataset.canopyPhotos;
    if(focus?.isConnected)focus.focus?.({preventScroll:true});
    refresh();queueCable();
  }
  function cancel(){
    if(run){for(const male of[...run.photos.keys()])stopPhoto(male);stopRide();finishIfIdle();}
    sound.stop();queueCable();
  }
  function adjust(target){
    if(!run)return;
    if(!rideEditable(target)){cancel();return;}
    if(target.dataset.accessoryFamily===CAMERA){
      if(target.dataset.wormPart)stopPhoto(target.dataset.wormPart==='companion');
      else for(const male of[...run.photos.keys()])stopPhoto(male);
    }
    finishIfIdle();
  }
  function pointerPoint(target,x,y){
    if(!rideEditable(target))return null;
    return new DOMPoint(x,y).matrixTransform(target.parentElement.getScreenCTM().inverse());
  }
  function cue(action,id,ms,at,kind,offset,duration,peak){
    if(reduced.matches||ms<at||action.cues.has(id))return;action.cues.add(id);
    if(ms-at<160)sound.play(kind,offset,duration,peak);
  }
  function beginLift(r,target){
    const art=target.querySelector('.location-accessory-art'),from=r.matrix(art);
    const back=add(r.back,'g');r.back.insertBefore(back,r.back.firstChild);
    const cable=path(back,'','none','#c7d2cf',1.7),basket=add(back,'g',{transform:from.toString()}),clone=r.clone(art,basket);
    const rim=add(r.effects,'g',{transform:from.toString()});r.effects.insertBefore(rim,r.effects.firstChild);
    rim.appendChild(clone.querySelector('[data-canopy-front]'));
    const styles=new Map([[art,art.getAttribute('style')]]);art.style.visibility='hidden';
    for(const n of habitat.querySelectorAll('.worm-ground-shadow')){styles.set(n,n.getAttribute('style'));n.style.opacity='0';}
    const parent=target.parentElement,carrier=add(parent,'g',{'data-canopy-carrier':'lift'});
    parent.insertBefore(carrier,target);carrier.appendChild(target);
    r.ride={target,parent,carrier,from,back,cable,basket,rim,styles,start:performance.now(),returnAt:null,cues:new Set()};queueCable();
  }
  function beginPhoto(r,target,male){
    const original=target.querySelector('.location-accessory-art');
    const effects=add(r.effects,'g',{'data-canopy-photo':male?'companion':'primary'});
    const arms=add(effects,'g'),hands=[path(arms,'','none','var(--worm-deep)',4),path(arms,'','none','var(--worm-color)',2.4)];
    const mount=add(effects,'g'),camera=r.clone(original,mount),styles=new Map([[original,original.getAttribute('style')]]);
    original.style.visibility='hidden';
    const flash=add(camera,'ellipse',{cx:male?14:29,cy:male?-10:-24,rx:6,ry:4,fill:'#fff7df',opacity:0});
    const paper=male?add(camera,'g',{'data-canopy-print':'',opacity:0}):null;
    if(paper){drawPhoto(paper,true);camera.insertBefore(paper,camera.firstChild);}
    r.photos.set(male,{target,original,effects,mount,hands,flash,paper,styles,start:performance.now(),cues:new Set()});
  }
  function tick(now){
    raf=0;const r=run;if(!r)return;if(document.hidden){cancel();return;}
    let ride=r.ride,s=ride?liftFrame(now-ride.start,reduced.matches,ride.returnAt):liftFrame(0,true);
    if(ride&&(!visible(ride.target)||s.done)){stopRide();ride=null;s=liftFrame(0,true);}
    const frames=new Map();
    for(const[male,p]of r.photos){const f=cameraFrame(now-p.start,male,reduced.matches);if(!visible(p.target)||f.done)stopPhoto(male);else frames.set(male,f);}
    const travelling=ride?.from.translate(0,-235*s.height);
    r.people.forEach(w=>{
      const aboard=travelling?.translate(w.male?-156:-126,w.male?-76:-122).scale(w.male?.28:.60);
      const lean=w.male?0:frames.get(true)?.lean||0;
      w.pose=(aboard?blend(w.from,aboard,s.board):w.from).translate(-mix(42,12,s.board)*lean,15*lean);
      w.holder.setAttribute('transform',w.pose.toString());
      w.face.setAttribute('transform','rotate('+((w.male?-9:9)*s.look-14*lean)+' 323 64)');
    });
    // Real controls remain in their original accessory groups, with their listeners
    // and visitor-owned size/position intact. Toggling them on mid-ride also works.
    for(const{item,parent,carrier,worm}of r.carriers)if(visible(item)){
      carrier.setAttribute('transform',carrierMatrix(r.matrix(parent),worm.from,worm.pose).toString());
      const hit=item.querySelector(':scope > .accessory-hit-target');
      if(hit){
        if(!r.hits.has(hit))r.hits.set(hit,Object.fromEntries(['x','y','width','height'].map(k=>[k,hit.getAttribute(k)])));
        const a=r.hits.get(hit),m=item.getScreenCTM();
        // Keep camera taps generous. A tighter 24 px minimum on worn webbing
        // avoids covering the male's nearby camera on compact phone layouts.
        const minimum=item.dataset.accessoryFamily===HARNESS?24:44;
        const width=Math.max(+a.width,minimum/Math.hypot(m.a,m.b)),height=Math.max(+a.height,minimum/Math.hypot(m.c,m.d));
        for(const[k,v]of Object.entries({x:+a.x+(+a.width-width)/2,y:+a.y+(+a.height-height)/2,width,height}))hit.setAttribute(k,v);
      }
    }
    if(ride){
      const ms=now-ride.start;
      habitat.dataset.canopyAction='lift';
      habitat.dataset.canopyPhase=ride.returnAt!==null?(ms-ride.returnAt<2400?'descending':'leaving'):ms<1200?'boarding':ms<3800?'ascending':'view';
      ride.basket.setAttribute('transform',travelling.toString());ride.rim.setAttribute('transform',travelling.toString());
      ride.carrier.setAttribute('transform',carrierMatrix(r.matrix(ride.parent),ride.from,travelling).toString());
      ride.cable.setAttribute('d',cablePath(r.root,ride.basket));
      if(ride.returnAt===null)cue(ride,'up',ms,1200,'motor',.4,2.6,.095);
      else cue(ride,'down',ms,ride.returnAt,'motor',.4,2.4,.08);
    }else{habitat.dataset.canopyAction='photography';delete habitat.dataset.canopyPhase;}
    habitat.dataset.canopyPhotos=String(r.photos.size);
    for(const[male,p]of r.photos){
      const ms=now-p.start,f=frames.get(male),bodyMatrix=r.people[Number(male)].pose,from=r.matrix(p.original);
      const eye=new DOMPoint(331,56).matrixTransform(bodyMatrix),v=new DOMPoint(...(male?[-15,-9]:[-9,-21])).matrixTransform(from);
      const aimed=new DOMMatrix([from.a,from.b,from.c,from.d,from.e+eye.x-v.x,from.f+eye.y-v.y]);
      const pose=blend(from,aimed,f.raise).translate(0,f.press*.8);p.mount.setAttribute('transform',pose.toString());
      const shoulder=new DOMPoint(293,108).matrixTransform(bodyMatrix),grip=new DOMPoint(male?-27:-36,20).matrixTransform(pose);
      const d='M'+shoulder.x+' '+shoulder.y+'Q'+(shoulder.x-18)+' '+(grip.y+24)+' '+grip.x+' '+grip.y;
      p.hands.forEach(n=>{n.setAttribute('d',d);n.setAttribute('opacity',f.raise);});
      p.flash.setAttribute('opacity',reduced.matches?0:pulse(ms,950,975,1000,1050)*.6);
      if(p.paper){
        const show=reduced.matches?1:ease((ms-3650)/700),fade=reduced.matches?1:1-ease((ms-6050)/650);
        p.paper.setAttribute('opacity',reduced.matches||ms>=1150?fade:0);
        p.paper.setAttribute('transform','translate('+(-65*show)+' '+(-22-68*f.print-22*show)+') rotate('+(-9*show)+') scale('+(.66+2.2*show)+')');
        p.paper.querySelector('[data-photo-image]').setAttribute('opacity',f.reveal);
      }
      cue(p,'capture',ms,950,male?'instant':'shutter',0,male?3.882:.629,male?.10:.085);
    }
    finishIfIdle();if(run)raf=requestAnimationFrame(tick);
  }
  function start(target){
    if(!handles(target)||!visible(target))return false;
    const r=setup(),male=target.dataset.wormPart==='companion',kind=target.dataset.accessoryFamily===LIFT?'motor':male?'instant':'shutter';
    if(kind==='motor'){if(r.ride){if(r.ride.returnAt===null)r.ride.returnAt=performance.now()-r.ride.start;}else beginLift(r,target);}
    else if(r.photos.has(male))stopPhoto(male);else beginPhoto(r,target,male);
    // Separate bounded recording channels let the shutters play over the motor.
    if(!reduced.matches)sound.unlock(kind);
    finishIfIdle();if(run&&!raf)tick(performance.now());return true;
  }
  for(const event of['resize','pagehide'])window.addEventListener(event,cancel);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});
  reduced.addEventListener('change',cancel);
  if(typeof IntersectionObserver==='function')new IntersectionObserver(entries=>{
    if(run&&entries.some(entry=>!entry.isIntersecting))cancel();
  },{threshold:0}).observe(habitat);
  return{handles,start,adjust,pointerPoint,cancel,clear:cancel,reset:cancel,rideEditable,get active(){return!!run;}};
}
