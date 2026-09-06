// A reversible, tap-triggered fantasy vignette. Original drawings stay intact.
const NS = 'http://www.w3.org/2000/svg';
const clamp = x => Math.max(0, Math.min(1, x));
const ease = x => { x = clamp(x); return x * x * (3 - 2 * x); };
export function cryoFrame(ms, companion = false, reduced = false) {
  const t = Math.max(0, ms - (companion && !reduced ? 280 : 0));
  const frost = ease(t / 1150) * (1 - ease((t - (reduced ? 1500 : 6250)) / 1150));
  if (reduced) return {x:0, y:0, angle:0, frost, thrust:0, frozen:t < 2400, done:ms >= 2800};
  let x = 0, y = 0, angle = 0;
  if (t >= 1550 && t < 3300) {
    const q = clamp((t - 1550) / 1750), launch = q*q;
    x = 1150*launch; y = -730*launch; angle = -12*Math.sin(q*Math.PI);
  } else if (t >= 3300 && t < 4100) { x=1150; y=-730; }
  else if (t >= 4100 && t < 6100) {
    const q=ease((t-4100)/2000);
    // Reposition only while fully off-screen, then enter lower-left head-first.
    x=-1150*(1-q); y=730*(1-q); angle=-8*Math.sin(q*Math.PI);
    if (companion) { x-=18*Math.sin(q*Math.PI); y+=10*Math.sin(q*Math.PI); }
  } else if (companion && t >= 6100 && t < 6550) {
    const q=(t-6100)/450;
    x=-9*Math.sin(q*Math.PI); angle=3*Math.sin(q*Math.PI*2);
  }
  const thrust=t>1250 && t<6300 ? Math.min(ease((t-1250)/400),1-ease((t-5800)/500)) : 0;
  return {x,y,angle,frost,thrust,frozen:t<7050,done:ms>=8200};
}

export function createN2CryoFlight(habitat) {
  let restore = null, frame = 0;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const add = (parent, tag, attrs) => {
    const node=document.createElementNS(NS,tag);
    for(const [k,v] of Object.entries(attrs))node.setAttribute(k,String(v));
    parent.append(node); return node;
  };
  const cancel = () => {
    cancelAnimationFrame(frame); frame=0;
    if (restore) { const run=restore; restore=null; run(); }
    delete habitat.dataset.cryoFlight;
  };
  function start(piece) {
    if (restore || piece?.dataset.accessoryFamily !== 'cryo-vial-jetpack' || piece.closest('[hidden]')) return false;
    const root=habitat.querySelector('#worm-species');
    if (!root) return false;
    const wrappers=[], effects=[], paused=new Map(), shadows=[];
    const motionSelector='.worm-body,.companion-body,.fitted-headwear-motion';
    const resume=node=>{if(paused.has(node)){node.style.animationPlayState=paused.get(node);paused.delete(node);}};
    const wrap = node => {
      const wrapper=document.createElementNS(NS,'g');
      wrapper.setAttribute('data-cryo-traveller','');
      node.before(wrapper); wrapper.append(node); wrappers.push(wrapper);
      return wrapper;
    };
    const actors=['primary','companion'].map(part=>{
      const male=part==='companion';
      const body=habitat.querySelector(male?'#companion-worm':'#primary-worm > .worm-body');
      const nodes=[body,...habitat.querySelectorAll(`.accessory:not([hidden]) .accessory-piece[data-worm-part="${part}"]`)]
        .filter(n=>n && (!n.dataset.accessoryFamily || ['cryo-vial-jetpack','n2-lab-coat','n2-lab-goggles'].includes(n.dataset.accessoryFamily)));
      for (const node of nodes) for (const motion of [node,...node.querySelectorAll(motionSelector)]) {
        if(motion.matches(motionSelector)) { paused.set(motion,motion.style.animationPlayState); motion.style.animationPlayState='paused'; }
      }
      const moving=nodes.map(wrap);
      const shell=add(root,'g',{'aria-hidden':'true','pointer-events':'none','data-cryo-ice':part});
      effects.push(shell);
      const ice=add(shell,'g',male?{transform:'translate(-28 82) scale(.43)'}:{});
      const d=body.querySelector(male?'.companion-line':'.worm-line').getAttribute('d');
      // Curved ice follows the body, with a transparent core and a frosted rim.
      add(ice,'path',{d,fill:'none',stroke:'#b8e4ed','stroke-opacity':.46,'stroke-width':76,'stroke-linecap':'round'});
      add(ice,'path',{d,fill:'none',stroke:'#edfaff','stroke-opacity':.34,'stroke-width':66,'stroke-linecap':'round'});
      add(ice,'path',{d:'M70 209Q111 251 139 222M207 115Q239 88 279 91M343 80Q356 57 336 36',fill:'none',stroke:'#f5fdff','stroke-width':4,'stroke-linecap':'round'});
      // Narrow edge facets leave the face readable through the frozen shell.
      add(ice,'path',{d:'M59 237L79 264L110 273M172 231L194 183L190 169M293 145L328 133L349 108',fill:'none',stroke:'#8fc9dd','stroke-opacity':.7,'stroke-width':2.5,'stroke-linejoin':'round'});
      for(const [x,y,a] of [[91,244,-25],[183,170,28],[284,121,-15]]) {
        add(ice,'path',{d:'M-10 0H10M0-10V10M-7-7L7 7M-7 7L7-7',transform:`translate(${x} ${y}) rotate(${a})`,fill:'none',stroke:'#f4fdff','stroke-width':2,'stroke-linecap':'round'});
      }
      const plumes=[];
      for(const outlet of nodes.flatMap(n=>[...n.querySelectorAll('.cryo-outlet-opening')])) {
        const x=Number(outlet.getAttribute('cx')),y=Number(outlet.getAttribute('cy'));
        const plume=add(outlet.parentNode,'g',{'aria-hidden':'true','pointer-events':'none','data-cryo-plume':''});
        // Both streams emerge from the existing rear-facing metal openings.
        add(plume,'path',{d:`M${x-6} ${y+3}Q${x-22} ${y+39} ${x-8} ${y+76}Q${x+18} ${y+41} ${x+6} ${y+3}Z`,fill:'#b6e8f2','fill-opacity':.55});
        add(plume,'path',{d:`M${x} ${y+5}Q${x+7} ${y+24} ${x-5} ${y+54}`,fill:'none',stroke:'#f2fcff','stroke-width':4,'stroke-linecap':'round'});
        plumes.push(plume); effects.push(plume);
      }
      return {male,moving,shell,plumes};
    });
    for(const shadow of habitat.querySelectorAll('.worm-ground-shadow')) {
      shadows.push([shadow,shadow.style.opacity]); shadow.style.opacity='0';
    }
    habitat.dataset.cryoFlight='freezing';
    restore=()=>{
      for(const effect of effects)effect.remove();
      for(const wrapper of wrappers) { wrapper.replaceWith(...wrapper.childNodes); }
      for(const [shadow,opacity] of shadows)shadow.style.opacity=opacity;
      for(const node of [...paused.keys()])resume(node);
    };
    const began=performance.now();
    const tick=now=>{
      if (!piece.isConnected || piece.closest('[hidden]')) { cancel(); return; }
      const elapsed=now-began;
      habitat.dataset.cryoFlight=elapsed<1500?'freezing':elapsed<6100?'flying':'thawing';
      for(const actor of actors) {
        const state=cryoFrame(elapsed,actor.male,reduced.matches);
        const cx=actor.male?65:210,cy=actor.male?155:170;
        const transform=`translate(${state.x} ${state.y}) rotate(${state.angle} ${cx} ${cy})`;
        for(const moving of actor.moving)moving.setAttribute('transform',transform);
        actor.shell.setAttribute('transform',transform);
        actor.shell.setAttribute('opacity',state.frost);
        for(const plume of actor.plumes)plume.setAttribute('opacity',state.thrust*(.8+.2*Math.sin(elapsed/60)));
        if (!state.frozen) for(const moving of actor.moving) for(const motion of moving.querySelectorAll(motionSelector))resume(motion);
        if(state.done) { cancel(); return; }
      }
      frame=requestAnimationFrame(tick);
    };
    frame=requestAnimationFrame(tick); return true;
  }
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});
  reduced.addEventListener('change',cancel);
  window.addEventListener('pagehide',cancel);
  return {start,cancel,get active(){return !!restore;}};
}
