const NS='http://www.w3.org/2000/svg';
export const FAN_FAMILY='lattice-fan';
export function fanFrame(ms,male=false,reduced=false) {
  const duration=reduced?1100:male?2600:3100;
  const q=Math.max(0,Math.min(1,ms/duration)),envelope=Math.sin(Math.PI*q)**2;
  return {angle:reduced?0:(male?-24:20)*Math.sin(q*Math.PI*(male?8:6))*envelope,
    breeze:reduced?.22:envelope*(.3+.4*Math.abs(Math.sin(q*Math.PI*(male?8:6)))),
    phase:reduced?0:q,done:ms>=duration};
}
export function createAhmedabadFans(habitat) {
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let active=null,frame=0;
  function cancel() {
    cancelAnimationFrame(frame);frame=0;
    if(!active)return;
    const {motion,original,piece,breeze}=active;
    if(original===null)motion.removeAttribute('transform');
    else motion.setAttribute('transform',original);
    breeze.remove();delete piece.dataset.fanning;active=null;
  }
  function start(piece) {
    if(piece?.dataset.accessoryFamily!==FAN_FAMILY || piece.closest('[hidden]') || !piece.isConnected)return false;
    const motion=piece.querySelector('[data-fan-motion]');
    const root=habitat.querySelector('#worm-species');
    const male=piece.dataset.wormPart==='companion';
    const cheek=habitat.querySelector(male?'#companion-worm .worm-cheek':'#primary-worm .worm-cheek');
    if(!motion || !root || !cheek)return false;
    cancel();
    const breeze=document.createElementNS(NS,'g');
    for(const [key,value] of Object.entries({'data-fan-breeze':'','aria-hidden':'true','pointer-events':'none',opacity:0}))breeze.setAttribute(key,value);
    root.append(breeze);
    const lines=[-1,0,1].map(()=>{
      const line=document.createElementNS(NS,'path');
      for(const [key,value] of Object.entries({fill:'none',stroke:'#fff1d4','stroke-width':male?1.2:1.7,'stroke-linecap':'round',pathLength:100,'stroke-dasharray':'24 76'}))line.setAttribute(key,value);
      breeze.append(line);return line;
    });
    const run={motion,original:motion.getAttribute('transform'),piece,breeze};
    active=run;piece.dataset.fanning='true';
    const began=performance.now();
    function tick(now) {
      if(active!==run)return;
      if(!piece.isConnected || piece.closest('[hidden]')){cancel();return;}
      const state=fanFrame(now-began,male,reduced.matches);
      if(state.done){cancel();return;}
      // Pivot at the grip. Never overwrite the user's outer position or size.
      motion.setAttribute('transform',`rotate(${state.angle} ${male?9:0} ${male?73:75})`);
      const inverse=root.getScreenCTM()?.inverse(),source=motion.getScreenCTM(),target=cheek.getScreenCTM();
      if(inverse && source && target) {
        const from=new DOMPoint(male?9:0,-35).matrixTransform(source).matrixTransform(inverse);
        const to=new DOMPoint(Number(cheek.getAttribute('cx')),Number(cheek.getAttribute('cy'))).matrixTransform(target).matrixTransform(inverse);
        const dx=to.x-from.x,dy=to.y-from.y,length=Math.hypot(dx,dy);
        const nx=length?-dy/length:0,ny=length?dx/length:0;
        lines.forEach((line,i)=>{
          const offset=(i-1)*(male?3:6),x=from.x+nx*offset,y=from.y+ny*offset;
          // Three soft streams travel towards the worm, stopping short of its cheek.
          line.setAttribute('d',`M${x} ${y}Q${x+dx*.4+nx*7} ${y+dy*.4+ny*7} ${x+dx*.84} ${y+dy*.84}`);
          line.setAttribute('stroke-dashoffset',reduced.matches?0:-((state.phase*(male?4:3)*100+i*18)%100));
        });
        breeze.setAttribute('opacity',length>6?state.breeze:0);
      }
      frame=requestAnimationFrame(tick);
    }
    frame=requestAnimationFrame(tick);return true;
  }
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});
  window.addEventListener('pagehide',cancel);
  reduced.addEventListener('change',cancel);
  return {start,cancel};
}
