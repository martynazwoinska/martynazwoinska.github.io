// Two local 2x optical windows. SVG references remain live, with no screenshots,
// network calls or recursive copies of the magnified windows.
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
  // A static physical copy of each loupe includes its frame, glass and handle,
  // but never its optical window. This breaks the otherwise circular reference.
  const definitions=add(headwear,'defs',{'data-loupe-proxies':''});
  const physical=frames.map((frame,i)=>{
    const source=frame.parentNode, copy=source.cloneNode(true);
    copy.querySelectorAll('foreignObject').forEach(n=>n.remove());
    for(const n of [copy,...copy.querySelectorAll('*')]) {
      for(const attribute of ['id','tabindex','role','aria-label'])n.removeAttribute(attribute);
    }
    copy.removeAttribute('transform');copy.removeAttribute('style');
    copy.id=`live-loupe-physical-${i}`;
    definitions.appendChild(copy);
    return {source,copy,frame};
  });
  const pieces=frames.map(frame=>frame.closest('.accessory-piece')).filter(Boolean);
  const order=pieces.map(piece=>({piece,parent:piece.parentNode,next:piece.nextSibling}));
  const raise=event=>{
    const piece=event.target.closest?.('.accessory-piece');
    if(pieces.includes(piece)&&piece.parentNode.lastElementChild!==piece){
      const focused=document.activeElement===piece;
      piece.parentNode.appendChild(piece);
      if(focused)piece.focus({preventScroll:true});
    }
  };
  headwear.addEventListener('pointerdown',raise,true);
  headwear.addEventListener('focusin',raise,true);
  // The regular scene is sampled directly, excluding the live optical windows.
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
    for(const other of physical.filter(other=>other.frame!==frame)) {
      const layer=add(svg,'g',{'data-magnified-loupe':''});
      add(layer,'use',{href:`#${other.copy.id}`,'pointer-events':'none'});
      layers.push({source:other.source,layer,physical:true});
    }
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
        for(const {source,layer,physical} of layers) {
          const visible=!source.closest('[hidden]');
          layer.style.display=visible?'':'none';
          if(!visible) continue;
          // A use includes the source's own transform. Map its parent space.
          const parent=physical?source.getScreenCTM():source.parentNode.getScreenCTM();
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
    lenses.forEach(({svg})=>svg.replaceChildren());
    definitions.remove();
    headwear.removeEventListener('pointerdown',raise,true);
    headwear.removeEventListener('focusin',raise,true);
    for(const {piece,parent,next} of order.reverse())parent.insertBefore(piece,next?.parentNode===parent?next:null);
    headwear.parentNode.insertBefore(headwear,next);
  };
}
