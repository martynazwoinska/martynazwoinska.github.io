const smooth=x=>{x=Math.max(0,Math.min(1,x));return x*x*(3-2*x);};
// Smooth, broad paths in scene coordinates. The first and last points are home.
export function butterflyPoint(progress,male,home){
  const route=male?[home,{x:150,y:64},{x:330,y:95},{x:440,y:205},{x:220,y:245},home]:[home,{x:470,y:142},{x:310,y:220},{x:150,y:165},{x:275,y:54},home];
  const t=Math.max(0,Math.min(1,progress))*5,i=Math.min(4,Math.floor(t)),u=t-i;
  const p0=route[i===0?4:i-1],p1=route[i],p2=route[i+1],p3=route[i===4?1:i+2];
  const result={};for(const k of['x','y'])result[k]=.5*((2*p1[k])+(-p0[k]+p2[k])*u+(2*p0[k]-5*p1[k]+4*p2[k]-p3[k])*u*u+(-p0[k]+3*p1[k]-3*p2[k]+p3[k])*u*u*u);
  return result;
}
export function createLombokFlights(habitat,reduced,refresh){
  const active=new Map();
  function stop(r){
    cancelAnimationFrame(r.frame);active.delete(r.target);
    r.original===null?r.motion.removeAttribute('transform'):r.motion.setAttribute('transform',r.original);
    r.style===null?r.target.removeAttribute('style'):r.target.setAttribute('style',r.style);
    r.wings.forEach(n=>n.setAttribute('transform',`scale(${n.dataset.butterflyWing} 1)`));
    r.target.querySelector('.accessory-hit-target')?.style.removeProperty('pointer-events');
    delete r.target.dataset.lombokFlying;refresh();
  }
  function start(target){
    const current=active.get(target);
    if(current){if(!current.returning)current.returning={at:performance.now(),from:current.point,bank:current.bank};return;}
    if(reduced.matches)return;
    const motion=target.querySelector('[data-lombok-butterfly]'),root=habitat.querySelector('#worm-species');
    const style=target.getAttribute('style'),bounds=target.getBBox();
    // A flying child must not move the visitor's scale origin as its bounds change.
    target.style.transformBox='view-box';target.style.transformOrigin=`${bounds.x+bounds.width/2}px ${bounds.y+bounds.height/2}px`;
    const matrix=root.getScreenCTM().inverse().multiply(motion.parentNode.getScreenCTM()),inverse=matrix.inverse();
    const home=new DOMPoint(0,0).matrixTransform(matrix);
    const r={target,motion,style,original:motion.getAttribute('transform'),wings:[...motion.querySelectorAll('[data-butterfly-wing]')],home,point:home,bank:0,frame:0};
    active.set(target,r);target.dataset.lombokFlying='true';const began=performance.now(),male=target.dataset.wormPart==='companion';
    function tick(now){
      if(!target.isConnected||target.closest('[hidden]')||document.hidden||reduced.matches){stop(r);return;}
      const elapsed=now-began,q=(elapsed%14000)/14000;
      let p=butterflyPoint(q,male,home),wing=.30+.70*Math.abs(Math.cos(elapsed/83)),bank=Math.sin(q*Math.PI*4)*18;
      if(r.returning){
        const t=Math.min(1,(now-r.returning.at)/1400),e=smooth(t);
        p={x:r.returning.from.x+(home.x-r.returning.from.x)*e,y:r.returning.from.y+(home.y-r.returning.from.y)*e};
        bank=r.returning.bank*(1-e);wing=wing+(1-wing)*smooth((t-.6)/.4);
        if(t>=1){stop(r);return;}
      }
      const delta=new DOMPoint(p.x,p.y).matrixTransform(inverse);
      motion.setAttribute('transform',`translate(${delta.x} ${delta.y}) rotate(${bank})`);
      r.wings.forEach(n=>n.setAttribute('transform',`scale(${Number(n.dataset.butterflyWing)*wing} 1)`));
      target.querySelector('.accessory-hit-target')?.style.setProperty('pointer-events','none');
      r.point=p;r.bank=bank;r.frame=requestAnimationFrame(tick);
    }
    r.frame=requestAnimationFrame(tick);
  }
  return{start,clear(){for(const r of[...active.values()])stop(r);},get active(){return active.size>0;}};
}
