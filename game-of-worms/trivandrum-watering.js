const NS='http://www.w3.org/2000/svg';
export const WATERING_FAMILY='trivandrum-garden-watering-can';
const clamp=x=>Math.max(0,Math.min(1,x));
const ease=x=>{x=clamp(x);return x*x*(3-2*x);};
const add=(g,tag,attrs)=>{
  const n=document.createElementNS(NS,tag);
  for(const [k,v] of Object.entries(attrs))n.setAttribute(k,v);
  g.appendChild(n);return n;
};
export function wateringFrame(ms,male=false,reduced=false) {
  if(reduced)return {reach:1,angle:55,water:.35,phase:0,done:ms>=1000};
  const duration=male?3600:4200, lift=ease(ms/850)*(1-ease((ms-(duration-1050))/850));
  const water=ease((ms-900)/180)*(1-ease((ms-(duration-1300))/250));
  return {reach:lift,angle:55*lift,water:water*(male?.65+.35*Math.sin(ms/180)**2:1),phase:ms/620,done:ms>=duration};
}

export function createTrivandrumWatering(habitat) {
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let active=null,raf=0,context=null,voice=null;
  const handles=piece=>piece?.dataset.accessoryFamily===WATERING_FAMILY;
  function stopSound(){if(voice){try{voice.stop();}catch{}voice=null;}}
  function cancel(){
    cancelAnimationFrame(raf);raf=0;stopSound();
    if(!active)return;
    const {motion,original,water,piece,anchors}=active;
    if(original===null)motion.removeAttribute('transform');else motion.setAttribute('transform',original);
    for(const [node,style] of anchors){if(style===null)node.removeAttribute('style');else node.setAttribute('style',style);}
    water.remove();delete piece.dataset.watering;active=null;
  }
  function playPour(run){
    if(!context||context.state!=='running'||active!==run||reduced.matches)return;
    const duration=run.male?1.5:2.1,buffer=context.createBuffer(1,Math.ceil(context.sampleRate*duration),context.sampleRate);
    const samples=buffer.getChannelData(0);
    for(let i=0;i<samples.length;i++)samples[i]=(Math.random()*2-1)*(.3+.7*Math.sin(i/context.sampleRate*35)**2);
    const source=context.createBufferSource(),filter=context.createBiquadFilter(),gain=context.createGain();
    source.buffer=buffer;filter.type='bandpass';filter.frequency.value=1300;filter.Q.value=.55;
    const now=context.currentTime;gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(.065,now+.1);gain.gain.linearRampToValueAtTime(0,now+duration);
    source.connect(filter);filter.connect(gain);gain.connect(context.destination);voice=source;
    source.onended=()=>{source.disconnect();filter.disconnect();gain.disconnect();if(voice===source)voice=null;};
    source.start();source.stop(now+duration);
  }
  function start(piece){
    if(!handles(piece)||!piece.isConnected||piece.closest('[hidden]'))return false;
    const motion=piece.querySelector('[data-watering-motion]'),root=habitat.querySelector('#worm-species');
    const companion=habitat.querySelector('#companion-worm .companion-body');
    if(!motion||!root||!companion)return false;
    cancel();
    const male=piece.dataset.wormPart==='companion';
    const water=add(root,'g',{'data-trivandrum-water':'','pointer-events':'none','aria-hidden':'true'});
    const drops=Array.from({length:18},()=>add(water,'path',{fill:'none',stroke:'#e1f8ff','stroke-width':male?1.1:1.6,'stroke-linecap':'round'}));
    const splashes=Array.from({length:3},()=>add(water,'path',{fill:'none',stroke:'#a5e1f1','stroke-width':1.2,'stroke-linecap':'round'}));
    // Rotating the inner can changes its bounding box. Pin both CSS origins to
    // their original user-space centre so the outer scale cannot pull it away.
    const anchors=[piece,motion.parentNode].map(node=>{
      const saved=node.getAttribute('style'),box=node.getBBox();
      node.style.transformBox='view-box';
      node.style.transformOrigin=`${box.x+box.width/2}px ${box.y+box.height/2}px`;
      return [node,saved];
    });
    const run={piece,motion,original:motion.getAttribute('transform'),water,male,sounded:false,anchors};
    active=run;piece.dataset.watering='true';
    if(!reduced.matches){try{const Audio=window.AudioContext||window.webkitAudioContext;if(Audio){context??=new Audio();context.resume().catch(()=>{});}}catch{}}
    const began=performance.now();
    const point=(node,x,y)=>new DOMPoint(x,y).matrixTransform(node.getScreenCTM()).matrixTransform(root.getScreenCTM().inverse());
    function tick(now){
      if(active!==run)return;
      if(!piece.isConnected||piece.closest('[hidden]')||document.hidden){cancel();return;}
      const state=wateringFrame(now-began,male,reduced.matches);
      if(state.done){cancel();return;}
      const rotation=`rotate(${state.angle} ${male?-5:-66} ${male?-66:-75})`;
      motion.setAttribute('transform',rotation);
      const head=point(companion,326,49);
      if(!male){
        const rose=point(motion,138,-80),dx=(head.x-12-rose.x)*state.reach,dy=(head.y-64-rose.y)*state.reach;
        const inverse=motion.parentNode.getScreenCTM().inverse().multiply(root.getScreenCTM());
        const origin=new DOMPoint(0,0).matrixTransform(inverse),offset=new DOMPoint(dx,dy).matrixTransform(inverse);
        motion.setAttribute('transform',`translate(${offset.x-origin.x} ${offset.y-origin.y}) ${rotation}`);
      }
      const from=point(motion,male?111:138,male?-49:-80);
      const to=male?{x:from.x+12,y:from.y+60}:{x:head.x,y:head.y+5};
      water.setAttribute('opacity',state.water);
      drops.forEach((drop,i)=>{
        const t=reduced.matches?(i%6)/6:(state.phase+i/18)%1,spread=(i%3-1)*(male?2:3);
        const x=from.x+(to.x-from.x)*t+spread*t,y=from.y+(to.y-from.y)*t*t;
        const tail=Math.min(1,t+.045);
        drop.setAttribute('d',`M${x} ${y}L${from.x+(to.x-from.x)*tail+spread*tail} ${from.y+(to.y-from.y)*tail*tail}`);
      });
      splashes.forEach((s,i)=>{const x=to.x+(i-1)*5,r=reduced.matches?3:2+3*Math.sin(state.phase*12+i)**2;s.setAttribute('d',`M${x-r} ${to.y}Q${x-r} ${to.y-r*2} ${x} ${to.y-r}Q${x+r} ${to.y-r*2} ${x+r} ${to.y}`);});
      if(state.water>.1&&!run.sounded){run.sounded=true;playPour(run);}
      raf=requestAnimationFrame(tick);
    }
    raf=requestAnimationFrame(tick);return true;
  }
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});
  window.addEventListener('pagehide',cancel);reduced.addEventListener('change',cancel);
  return {handles,start,cancel,get active(){return !!active;}};
}
