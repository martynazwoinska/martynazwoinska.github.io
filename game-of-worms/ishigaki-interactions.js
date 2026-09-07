import { createIshigakiAudio } from './ishigaki-audio.js?v=20260907-ishigaki-sound-1';
const NS = 'http://www.w3.org/2000/svg';
const clamp = x => Math.max(0, Math.min(1, x));
const ease = x => { x=clamp(x); return x*x*(3-2*x); };
const add = (parent, tag, attrs) => {
  const node=document.createElementNS(NS,tag);
  for(const [key,value] of Object.entries(attrs))node.setAttribute(key,String(value));
  parent.append(node); return node;
};

export function wingFlightFrame(ms, male=false, reduced=false) {
  const duration=reduced?900:male?3100:3600, t=clamp(ms/duration);
  const envelope=Math.sin(Math.PI*t)**2;
  return {x:reduced?0:(male?-32:42)*Math.sin(t*Math.PI*2)*envelope,
    y:reduced?0:-(male?53:42)*envelope,
    angle:reduced?0:(male?9:-7)*Math.sin(t*Math.PI*2)*envelope,
    beat:reduced?0:Math.sin(ms/(male?20:24))*envelope, done:t===1};
}

// Fresh F. septica: a lined internal cavity, with enlarged nematodes for visibility.
function openFig(parent, male) {
  const root=add(parent,'g',{'data-fig-reveal':'','aria-hidden':'true','pointer-events':'visiblePainted'});
  const halves=[];
  for(const side of [-1,1]) {
    const half=add(root,'g',{}); halves.push(half);
    add(half,'ellipse',{cx:1,cy:3,rx:23,ry:28,fill:'#395943',opacity:.22});
    add(half,'ellipse',{cx:0,cy:0,rx:22,ry:27,fill:side<0?'#789b59':'#547e49',stroke:'#334e42','stroke-width':1.5});
    add(half,'ellipse',{cx:0,cy:-1,rx:19,ry:24,fill:'#eee0ac',stroke:'#b6bd7e','stroke-width':1});
    add(half,'ellipse',{cx:0,cy:0,rx:16,ry:21,fill:'#c98288'});
    add(half,'ellipse',{cx:0,cy:0,rx:9,ry:13,fill:'#693c55'});
    for(let i=0;i<18;i++) {
      const a=i*Math.PI*2/18, x=Math.cos(a)*12.6,y=Math.sin(a)*17.7;
      add(half,'path',{d:`M${Math.cos(a)*9} ${Math.sin(a)*13}Q${x+2} ${y+2} ${x} ${y}`,fill:'none',stroke:i%3?'#f3c0ab':'#e8a798','stroke-width':2.2,'stroke-linecap':'round'});
      add(half,'ellipse',{cx:x,cy:y,rx:1.1,ry:1.6,fill:'#f7dfbd',transform:`rotate(${i*20} ${x} ${y})`});
    }
    add(half,'path',{d:'M-12-18Q-19-9-16 4',fill:'none',stroke:'#fff3cf','stroke-width':1.2,opacity:.65});
    add(half,'path',{d:'M-2-25L-1-30L3-30L3-25',fill:'#638158',stroke:'#3e6045','stroke-width':1});
    for(let i=0;i<(male?2:3);i++) {
      const worm=add(half,'g',{'data-fig-worm':i,transform:`translate(${(i-1)*4} ${(i-1)*6}) rotate(${side*24+i*31})`});
      add(worm,'path',{d:'M-4 3C-5-2 1-5 3-1S1 4 5 2',fill:'none',stroke:'#f7edc9','stroke-width':1.35,'stroke-linecap':'round'});
    }
  }
  return {root,halves};
}

export function createIshigakiInteractions(habitat) {
  const sound=createIshigakiAudio();
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let flight=null, raf=0;
  const figs=new Map();
  const handles=piece=>!!piece && ['wings','sample-pannier'].includes(piece.dataset.accessoryFamily)
    && !!piece.querySelector('.fig-wing-thorax,[data-ishigaki-fig]');
  function cancel() {
    sound.cancel();
    cancelAnimationFrame(raf); raf=0;
    if(flight) { flight(); flight=null; }
    delete habitat.dataset.ishigakiFlight;
  }
  function closeFig(piece) {
    const entry=figs.get(piece); if(!entry)return;
    cancelAnimationFrame(entry.frame); entry.root.remove(); entry.source.style.visibility=entry.visibility;
    piece.setAttribute('aria-expanded','false');
    delete piece.dataset.figOpen; figs.delete(piece);
  }
  function clear() { cancel(); for(const piece of [...figs.keys()])closeFig(piece); }
  function start(piece) {
    if(!handles(piece)||piece.closest('[hidden]'))return false;
    if(piece.dataset.accessoryFamily==='sample-pannier') {
      cancel();
      if(figs.has(piece)){
        const entry=figs.get(piece);
        if(reduced.matches)closeFig(piece);
        else if(!entry.closing) {entry.closing=performance.now(); entry.closeFrom=entry.progress;}
        return true;
      }
      const source=piece.querySelector('[data-ishigaki-fig]');
      const male=piece.dataset.wormPart==='companion';
      const reveal=openFig(source.parentNode,male);
      const entry={...reveal,source,visibility:source.style.visibility,frame:0}; figs.set(piece,entry);
      source.style.visibility='hidden'; piece.dataset.figOpen='true'; piece.setAttribute('aria-expanded','true');
      const x=Number(source.dataset.figX),y=Number(source.dataset.figY),startTime=performance.now();
      const tick=now=>{
        if(!piece.isConnected||piece.closest('[hidden]')){closeFig(piece);return;}
        const t=entry.closing?entry.closeFrom*(1-ease((now-entry.closing)/450)):reduced.matches?1:ease((now-startTime)/650);
        entry.progress=t;
        if(entry.closing && now-entry.closing>=450){closeFig(piece);return;}
        // Lift clear of the basket rim before spreading the cut faces.
        reveal.root.setAttribute('transform',`translate(${x} ${y-50*t}) scale(${.55+.65*t})`);
        reveal.halves.forEach((half,i)=>half.setAttribute('transform',`translate(${(i?1:-1)*23*t} 0) rotate(${(i?1:-1)*(male?17:12)*t}) scale(1 ${male?.83:.91})`));
        for(const worm of reveal.root.querySelectorAll('[data-fig-worm] path')) {
          const bend=reduced.matches?0:Math.sin(now/360+Number(worm.parentNode.dataset.figWorm)*2);
          worm.setAttribute('d',`M-4 3C${-5+bend}-2 ${1+bend}-5 3-1S${1-bend} 4 5 2`);
        }
        if(!reduced.matches)entry.frame=requestAnimationFrame(tick);
      };
      tick(startTime); return true;
    }
    if(flight)return false;
    const male=piece.dataset.wormPart==='companion',part=male?'companion':'primary';
    const body=habitat.querySelector(male?'#companion-worm':'#primary-worm > .worm-body');
    if(!body)return false;
    const nodes=[body,...habitat.querySelectorAll(`.accessory:not([hidden]) .accessory-piece[data-worm-part="${part}"]`)];
    const paused=[],wrappers=[],wingTransforms=[];
    const hadFocus=document.activeElement===piece;
    for(const node of nodes) {
      for(const motion of [node,...node.querySelectorAll('.worm-body,.companion-body,.fitted-headwear-motion')]) {
        paused.push([motion,motion.style.animationPlayState]); motion.style.animationPlayState='paused';
      }
      const wrapper=document.createElementNS(NS,'g'); wrapper.dataset.ishigakiTraveller=part;
      node.before(wrapper);wrapper.append(node);wrappers.push(wrapper);
    }
    for(const wing of piece.querySelectorAll('.fig-wing-far-side,.fig-wing-near-side'))wingTransforms.push([wing,wing.getAttribute('transform')]);
    flight=()=>{
      const keepFocus=document.activeElement===piece;
      for(const [wing,transform] of wingTransforms) {if(transform===null)wing.removeAttribute('transform');else wing.setAttribute('transform',transform);}
      for(const wrapper of wrappers)wrapper.replaceWith(...wrapper.childNodes);
      for(const [motion,state] of paused)motion.style.animationPlayState=state;
      if(keepFocus && piece.isConnected)piece.focus({preventScroll:true});
    };
    if(hadFocus)piece.focus({preventScroll:true});
    habitat.dataset.ishigakiFlight=part;
    const began=performance.now();
    sound.start(male,reduced.matches);
    const tick=now=>{
      if(!piece.isConnected||piece.closest('[hidden]')){cancel();return;}
      const s=wingFlightFrame(now-began,male,reduced.matches);
      for(const wrapper of wrappers)wrapper.setAttribute('transform',`translate(${s.x} ${s.y}) rotate(${s.angle} ${male?65:210} ${male?155:170})`);
      wingTransforms.forEach(([wing],i)=>{
        const x=(male?18:24)*(i?1:-1),y=male?4:5;
        wing.setAttribute('transform',`translate(${x} ${y}) rotate(${s.beat*(i?28:-22)}) scale(1 ${1-Math.abs(s.beat)*.38}) translate(${-x} ${-y})`);
      });
      if(s.done){cancel();return;} raf=requestAnimationFrame(tick);
    };
    raf=requestAnimationFrame(tick); return true;
  }
  reduced.addEventListener('change',clear);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)clear();});
  window.addEventListener('pagehide',clear);
  return {start,handles,cancel,clear,reset:closeFig,get active(){return !!flight;}};
}
