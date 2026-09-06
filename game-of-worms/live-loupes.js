// Two local 2x optical windows. SVG references remain live, with no screenshots,
// network calls or recursive copies of the magnifiers themselves.
const ns='http://www.w3.org/2000/svg';
const add=(g,tag,attrs={})=>{
  const n=document.createElementNS(ns,tag);
  Object.entries(attrs).forEach(([k,v])=>n.setAttribute(k,v));
  g.appendChild(n); return n;
};

export function mountLiveLoupes(habitat) {
  const frames=[...habitat.querySelectorAll('[data-live-loupe]')];
  if(!frames.length) return ()=>{};
  // Keep the optical windows above the objects they inspect, then restore
  // the usual wardrobe order when changing location.
  const headwear=habitat.querySelector('#local-headwear');
  const next=headwear.nextSibling;
  headwear.parentNode.appendChild(headwear);
  // Exclude headwear entirely: the lenses must never sample themselves.
  const sources=[
    habitat.querySelector('#location-scene'),
    habitat.querySelector('.companion-body'),
    habitat.querySelector('.worm-body'),
    habitat.querySelector('#local-wrap'),
    habitat.querySelector('#local-charm'),
    habitat.querySelector('#local-extra')
  ].filter(Boolean);
  const assigned=[];
  sources.forEach((source,i)=>{
    if(!source.id) { source.id=`live-loupe-source-${i}`; assigned.push(source); }
  });
  const lenses=frames.map(frame=>{
    const svg=frame.querySelector('svg');
    const layers=sources.map(source=>{
      const layer=add(svg,'g');
      add(layer,'use',{href:`#${source.id}`,'pointer-events':'none'});
      return {source,layer};
    });
    return {frame,svg,layers};
  });
  let raf=0, disposed=false;
  const tick=()=>{
    if(disposed) return;
    if(!document.hidden) {
      const bounds=habitat.getBoundingClientRect();
      if(bounds.bottom>0&&bounds.top<innerHeight) for(const {frame,svg,layers} of lenses) {
        if(frame.closest('[hidden]')) continue;
        const screen=svg.getScreenCTM();
        if(!screen||Math.abs(screen.a*screen.d-screen.b*screen.c)<1e-8) continue;
        const inverse=screen.inverse(), box=svg.viewBox.baseVal;
        const zoom=new DOMMatrix().translate(box.width/2,box.height/2).scale(2).translate(-box.width/2,-box.height/2);
        for(const {source,layer} of layers) {
          const visible=!source.closest('[hidden]');
          layer.style.display=visible?'':'none';
          if(!visible) continue;
          // A use includes the source's own transform. Map its parent space.
          const parent=source.parentNode.getScreenCTM();
          if(!parent) continue;
          const m=zoom.multiply(inverse).multiply(parent);
          layer.setAttribute('transform',`matrix(${m.a} ${m.b} ${m.c} ${m.d} ${m.e} ${m.f})`);
        }
      }
    }
    raf=requestAnimationFrame(tick);
  };
  raf=requestAnimationFrame(tick);
  return ()=>{
    disposed=true; cancelAnimationFrame(raf);
    assigned.forEach(source=>source.removeAttribute('id'));
    headwear.parentNode.insertBefore(headwear,next);
  };
}
