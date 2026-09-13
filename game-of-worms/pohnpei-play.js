import {OPTICS,SLED,CAPE,add,path,drawLeafSled,drawLorikeet} from './pohnpei-art.js?v=20260913-pohnpei-1';
import {createPohnpeiSound} from './pohnpei-sound.js?v=20260913-pohnpei-1';
const clamp=x=>Math.max(0,Math.min(1,x));
const ease=x=>{x=clamp(x);return x*x*(3-2*x);};
const mix=(a,b,q)=>a+(b-a)*q;
const blend=(a,b,q)=>new DOMMatrix(['a','b','c','d','e','f'].map(k=>mix(a[k],b[k],q)));
const COIL=[125,190,99,209,115,239,154,230,195,222,184,167,228,173,259,180,288,174,285,145];
export function sledFrame(ms,reduced=false){
  if(reduced)return{board:ms<1700?1:0,travel:0,turn:0,skid:0,done:ms>=1900};
  const board=ease(ms/1350)*(1-ease((ms-5800)/1300));
  const descent=ease((ms-1600)/2650),returning=ease((ms-5100)/1100);
  return{board,travel:descent*(1-returning),
    turn:Math.sin(clamp((ms-1600)/2650)*Math.PI*2)*4,
    skid:ease((ms-3650)/200)*(1-ease((ms-4400)/500)),done:ms>=7200};
}
export function curlPath(d,q){
  let i=0;
  return d.replace(/-?\d*\.?\d+/g,n=>{
    const offset=Number(n)-[78,228,122,280,173,255,181,203,188,151,225,105,278,113,330,121,355,82,326,54][i];
    return ' '+mix(Number(n),COIL[i++]+offset,q)+' ';
  });
}
export function createPohnpeiPlay(habitat,refresh=()=>{}){
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)'),sound=createPohnpeiSound();
  let run=null,raf=0,epoch=0;
  const visible=n=>n?.isConnected&&!n.closest('[hidden]');
  const handles=n=>[OPTICS,SLED].includes(n?.dataset.accessoryFamily);
  const piece=(family,male)=>habitat.querySelector('.accessory-piece[data-accessory-family="'+family+'"][data-worm-part="'+(male?'companion':'primary')+'"]');
  function cancel(){
    epoch++;cancelAnimationFrame(raf);raf=0;sound.stop();
    if(!run)return;
    const r=run;run=null;
    for(const[n,v]of r.styles)v===null?n.removeAttribute('style'):n.setAttribute('style',v);
    for(const n of r.assigned)n.removeAttribute('id');
    for(const svg of r.windows)svg.replaceChildren();
    if(r.stack){const{node,next}=r.stack;node.parentNode.insertBefore(node,next?.parentNode===node.parentNode?next:null);}
    r.effects.remove();
    if(r.bird)r.bird.remove();
    if(r.focused&&document.activeElement===document.body&&visible(r.target))r.target.focus({preventScroll:true});
    for(const attr of['pohnpeiAction','pohnpeiFound','pohnpeiPhase'])delete habitat.dataset[attr];
    refresh();
  }
  function adjust(target){
    // Searching follows the visitor's real optic. Other edits finish the activity.
    if(run?.kind==='watch'&&target?.dataset.accessoryFamily===OPTICS)return;
    cancel();
  }
  function setup(target,kind){
    const root=habitat.querySelector('#worm-species');
    const r={root,target,kind,effects:add(root,'g',{'data-pohnpei-effects':'','pointer-events':'none','aria-hidden':'true'}),
      styles:new Map(),assigned:[],windows:[],cues:new Set(),cloneCount:0,
      focused:document.activeElement===target,start:performance.now()};
    r.save=n=>{if(n&&!r.styles.has(n))r.styles.set(n,n.getAttribute('style'));return n;};
    r.matrix=n=>root.getScreenCTM().inverse().multiply(n.getScreenCTM());
    r.clone=(n,parent)=>{
      const c=n.cloneNode(true);
      const nodes=[c,...c.querySelectorAll('*')],ids=new Map(),prefix='pohnpei-copy-'+epoch+'-'+(++r.cloneCount)+'-';
      for(const node of nodes)if(node.id){ids.set(node.id,prefix+ids.size);node.id=ids.get(node.id);}
      for(const node of nodes){
        for(const key of['tabindex','role','aria-label'])node.removeAttribute(key);
        for(const attr of [...node.attributes]){
          let value=attr.value;
          for(const[before,after]of ids)value=value.replaceAll('url(#'+before+')','url(#'+after+')');
          if(value!==attr.value)node.setAttribute(attr.name,value);
        }
      }
      c.removeAttribute('transform');c.setAttribute('style','animation:none;transform:none');
      c.querySelectorAll('foreignObject').forEach(n=>n.remove());
      parent.appendChild(c);return c;
    };
    run=r;habitat.dataset.pohnpeiAction=kind;return r;
  }
  function beginWatch(r){
    const headwear=habitat.querySelector('#local-headwear');
    r.stack={node:headwear,next:headwear.nextSibling};
    headwear.parentNode.appendChild(headwear);
    const scene=habitat.querySelector('#location-scene');
    r.bird=add(scene,'g',{id:'pohnpei-perched-lorikeet','data-pohnpei-bird':'','pointer-events':'none','aria-hidden':'true'});
    // A separate removable layer, leaving the approved forest image untouched.
    path(r.bird,'M46 162Q89 146 149 131','none','#484d3a',5);
    path(r.bird,'M48 159Q93 145 147 129','none','#9a9e77',1.5);
    const perch=add(r.bird,'g',{transform:'translate(102 121) rotate(-9) scale(.43)'});
    drawLorikeet(perch);r.perch=perch;
    const sources=[scene,habitat.querySelector('.companion-body'),habitat.querySelector('.worm-body'),habitat.querySelector('#local-charm')].filter(Boolean);
    sources.forEach((n,i)=>{if(!n.id){n.id='pohnpei-optical-source-'+i;r.assigned.push(n);}});
    r.lenses=[];
    for(const n of habitat.querySelectorAll('[data-pohnpei-lens]')){
      if(!visible(n))continue;
      const svg=n.querySelector('svg');r.windows.push(svg);
      const layers=sources.map(source=>{
        const layer=add(svg,'g');add(layer,'use',{href:'#'+source.id,'pointer-events':'none'});
        return{source,layer};
      });
      r.lenses.push({n,svg,layers,piece:n.closest('.accessory-piece')});
    }
    sound.unlock('bird').then(ready=>{
      if(run!==r||!ready)return;
      r.soundReady=true;
      if(r.foundAt&&!r.heard)r.heard=sound.play('bird',.3,2.8,.095);
    });
  }
  function watchTick(r,now){
    let found=false;
    for(const {n,svg,layers,piece:optic}of r.lenses){
      if(!visible(optic))continue;
      const outer=n.getScreenCTM();if(!outer)continue;
      const x=+n.dataset.lensX,y=+n.dataset.lensY,radius=+n.dataset.lensR;
      // A foreignObject bounds the optical sample, so sampled scene geometry
      // cannot inflate the draggable object's bounds. Its nested SVG's screen
      // matrix is inconsistent across engines, so derive it from the outer frame.
      const matrix=outer.translate(x-radius,y-radius);
      const zoom=new DOMMatrix().translate(radius,radius).scale(3).translate(-radius,-radius);
      for(const{source,layer}of layers){
        layer.style.display=visible(source)?'':'none';
        const m=source.parentNode.getScreenCTM();
        if(m)layer.setAttribute('transform',zoom.multiply(matrix.inverse()).multiply(m).toString());
      }
      const lens=new DOMPoint(+n.dataset.lensX,+n.dataset.lensY).matrixTransform(n.getScreenCTM());
      const bird=new DOMPoint(0,-10).matrixTransform(r.perch.getScreenCTM());
      const screenRadius=radius*Math.hypot(outer.a,outer.b);
      if(Math.hypot(lens.x-bird.x,lens.y-bird.y)<screenRadius*.8)found=true;
    }
    if(found&&!r.foundAt){
      r.foundAt=now;habitat.dataset.pohnpeiFound='true';
      if(r.soundReady)r.heard=sound.play('bird',.3,2.8,.095);
    }
    // A single small head/body turn acknowledges discovery. No continuous flapping.
    if(r.foundAt&&!reduced.matches){
      const q=Math.sin(clamp((now-r.foundAt)/800)*Math.PI);
      r.perch.setAttribute('transform','translate(102 121) rotate('+(-9+4*q)+') scale(.43)');
    }
    // Search remains available until another action or Escape. No idle sound loop.
  }
  function ridingCape(p,male){
    const cape=add(p,'g',{'data-riding-cape':''});
    path(cape,male?'M242 161Q206 143 184 177L199 202Q214 178 257 184Z':'M247 157Q207 138 180 169Q161 191 173 216L194 226Q191 184 246 194L260 179Z',male?'#aeb895':'#91a68a','#314f48',1.8);
    path(cape,male?'M187 175L199 197Q229 176 256 182':'M180 213L192 221Q193 182 247 190','none','#d6d8b2',2.3);
    for(const[x,y]of(male?[[212,163]]:[[201,164],[180,194],[228,178]])){
      path(cape,'M'+x+' '+y+'q-8-13-14-5q-2 12 14 15q-4-7 0-10Z','#5a7661','none');
    }
    return cape;
  }
  function beginSled(r){
    for(const n of habitat.querySelectorAll('.worm-body,.companion-body,.fitted-headwear-motion'))r.save(n).style.animationPlayState='paused';
    const art=r.target.querySelector('.location-accessory-art');
    r.from=r.matrix(art);r.train=add(r.effects,'g',{'data-pohnpei-sled':''});
    // Reverse the whole assembled vehicle so the pointed bow and both heads lead downhill.
    r.vehicle=add(r.train,'g',{transform:'scale(-1 1)'});
    drawLeafSled(r.vehicle,'back');
    r.people=[];
    for(const male of[false,true]){
      const original=habitat.querySelector(male?'.companion-body':'.worm-body');
      const from=r.matrix(original),holder=add(r.effects,'g',{'data-pohnpei-rider':male?'male':'hermaphrodite'});
      const clone=r.clone(original,holder);clone.removeAttribute('class');r.save(original).style.visibility='hidden';
      const paths=[...clone.querySelectorAll(male?'.companion-line,.companion-shadow,.companion-highlight':'.worm-line,.worm-shadow,.worm-highlight')].map(n=>({n,d:n.getAttribute('d')}));
      const face=add(clone,'g');
      [...clone.children].filter(n=>n!==face&&!paths.some(p=>p.n===n)&&!n.matches('.male-tail')).forEach(n=>face.appendChild(n));
      const cloak=piece(CAPE,male);
      let cape;
      if(visible(cloak)){
        const a=cloak.querySelector('.location-accessory-art'),g=add(holder,'g',{transform:from.inverse().multiply(r.matrix(a)).toString()});
        const normal=r.clone(a,g),riding=ridingCape(holder,male);cape={normal,riding};r.save(cloak).style.visibility='hidden';
      }
      r.people.push({male,holder,from,paths,face,cape,tail:clone.querySelector('.male-tail')});
      const optic=piece(OPTICS,male);if(visible(optic))r.save(optic).style.visibility='hidden';
    }
    r.rim=add(r.effects,'g');drawLeafSled(r.rim,'front');
    r.grips=add(r.effects,'g',{'data-pohnpei-grips':''});
    r.traces=add(r.effects,'g');
    for(let i=0;i<5;i++)path(r.traces,'M'+(10+i*11)+' '+(12+i%2*5)+'l'+(14+i*3)+' -5','none','#b7c99f',1.3);
    r.save(r.target).style.visibility='hidden';sound.unlock('leaf');
  }
  function sledTick(r,now){
    const ms=now-r.start,f=sledFrame(ms,reduced.matches);
    habitat.dataset.pohnpeiPhase=ms<1400?'boarding':ms<4300?'sliding':ms<5100?'skid':'returning';
    // The descent remains inside the scene, then quietly resets before dismounting.
    const pose=new DOMMatrix().translate(-90*f.travel,30*f.travel).multiply(r.from).rotate(f.turn);
    r.train.setAttribute('transform',pose.toString());
    const reversed=pose.scale(-1,1);
    r.rim.setAttribute('transform',reversed.toString());
    r.traces.setAttribute('transform',pose.translate(110,5).toString());r.traces.setAttribute('opacity',f.skid*.75);
    r.grips.replaceChildren();
    for(const w of r.people){
      const at=reversed.translate(w.male?22:-138,w.male?-107:-165).scale(w.male?.38:.76);
      const to=w.male?at.translate(225,180).rotate(f.turn*.9).translate(-225,-180):at;
      w.holder.setAttribute('transform',blend(w.from,to,f.board).toString());
      w.paths.forEach(({n,d})=>n.setAttribute('d',curlPath(d,f.board)));
      w.face.setAttribute('transform','translate('+(-41*f.board)+' '+(91*f.board)+')');
      if(w.tail)w.tail.setAttribute('opacity',1-f.board);
      if(w.cape){w.cape.normal.setAttribute('opacity',1-f.board);w.cape.riding.setAttribute('opacity',f.board);}
      if(!w.male&&f.board>.2){
        const bodyPose=blend(w.from,to,f.board);
        for(const[a,b]of[[[240,176],[-79,-30]],[[219,181],[72,-34]]]){
          const shoulder=new DOMPoint(...a).matrixTransform(bodyPose),grip=new DOMPoint(...b).matrixTransform(reversed);
          const arm=path(r.grips,'M'+shoulder.x+' '+shoulder.y+'Q'+(grip.x+12)+' '+(shoulder.y+12)+' '+grip.x+' '+grip.y,'none','var(--worm-color)',4);
          arm.setAttribute('opacity',f.board);
          add(r.grips,'ellipse',{cx:grip.x,cy:grip.y,rx:3,ry:2,fill:'var(--worm-highlight)',opacity:f.board});
        }
      }
    }
    for(const[name,at,duration]of[['settle',700,.55],['slide',1750,1.05],['skid',3730,.7]]){
      if(ms>=at&&!r.cues.has(name)){r.cues.add(name);if(!reduced.matches)sound.play('leaf',0,duration,name==='skid'?.09:.065);}
    }
    if(f.done)cancel();
  }
  function tick(now){
    raf=0;const r=run;if(!r)return;
    const bounds=habitat.getBoundingClientRect();
    if(!visible(r.target)||document.hidden||bounds.bottom<=0||bounds.top>=innerHeight){cancel();return;}
    if(r.kind==='watch')watchTick(r,now);else sledTick(r,now);
    if(run)raf=requestAnimationFrame(tick);
  }
  function start(target){
    if(!handles(target)||!visible(target))return false;
    if(run?.kind==='watch'&&target.dataset.accessoryFamily===OPTICS){cancel();return true;}
    cancel();const r=setup(target,target.dataset.accessoryFamily===OPTICS?'watch':'sled');
    if(r.kind==='watch')beginWatch(r);else beginSled(r);
    tick(performance.now());return true;
  }
  for(const e of['resize','pagehide'])window.addEventListener(e,cancel);
  window.addEventListener('keydown',event=>{if(event.key==='Escape'&&run)cancel();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});
  reduced.addEventListener('change',cancel);
  if(typeof IntersectionObserver==='function')new IntersectionObserver(entries=>{
    if(run&&entries.some(e=>!e.isIntersecting))cancel();
  },{threshold:0}).observe(habitat);
  return{handles,start,adjust,cancel,clear:cancel,get active(){return!!run;}};
}
