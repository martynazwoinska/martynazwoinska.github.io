import { FRUIT,MUSIC } from './dois-rios-art.js?v=20260908-dois-rios-1';
import { createDoisRiosSound,DUET_BEATS } from './dois-rios-audio.js?v=20260908-dois-rios-1';
const NS='http://www.w3.org/2000/svg',clamp=x=>Math.max(0,Math.min(1,x));
const ease=x=>{x=clamp(x);return x*x*(3-2*x);};
const add=(g,t,a={})=>{const n=document.createElementNS(NS,t);for(const[k,v]of Object.entries(a))n.setAttribute(k,v);g.appendChild(n);return n;};
const path=(g,d,fill,stroke,width)=>add(g,'path',{d,fill,stroke,'stroke-width':width,'stroke-linecap':'round','stroke-linejoin':'round'});
export function fruitFrame(ms,male,reduced=false){
  if(reduced)return{done:ms>=700,lift:0,lean:0,stretch:0,release:false};
  const releaseAt=male?1250:850,back=1-ease((ms-2250)/600);
  const load=ease(ms/600),release=ease((ms-releaseAt)/240);
  const lift=(load*15+release*(male?63:50))*back;
  return {done:ms>=2900,lift,lean:male?-5*load*(1-release):0,stretch:ms<releaseAt?load:0,release:ms>=releaseAt};
}
export function duetFrame(ms,male,reduced=false){
  if(reduced)return{done:ms>=700,hit:0};
  let hit=0;
  DUET_BEATS.forEach((beat,i)=>{const guitar=i<4||i===8||i===9||i===11;if(male?!guitar||i===11:guitar){const t=ms-beat*1000;if(t>=0&&t<180)hit=Math.max(hit,Math.sin(t/180*Math.PI));}});
  return {done:ms>=4100,hit};
}
export function createDoisRiosPlay(habitat){
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)'),sound=createDoisRiosSound();
  let active=null,raf=0;
  const handles=p=>[FRUIT,MUSIC].includes(p?.dataset.accessoryFamily);
  function cancel(){
    cancelAnimationFrame(raf);raf=0;sound.stop();if(!active)return;
    for(const[n,attrs]of active.saved)for(const[k,v]of Object.entries(attrs))v===null?n.removeAttribute(k):n.setAttribute(k,v);
    for(const[n,style]of active.styles)style===null?n.removeAttribute('style'):n.setAttribute('style',style);
    active.effects.remove();delete habitat.dataset.doisRiosAction;active=null;
  }
  function start(piece){
    if(!handles(piece)||!piece.isConnected||piece.closest('[hidden]'))return false;
    cancel();
    const kind=piece.dataset.accessoryFamily===MUSIC?'music':'fruit',root=habitat.querySelector('#worm-species');if(!root)return false;
    const pieces=kind==='music'?[...habitat.querySelectorAll(`[data-accessory-family="${MUSIC}"]`)].filter(n=>!n.closest('[hidden]')):[piece];
    const effects=add(root,'g',{'data-dois-rios-effects':'','aria-hidden':'true','pointer-events':'none'});
    const run={saved:new Map(),styles:new Map(),effects,pieces,kind};active=run;habitat.dataset.doisRiosAction=kind;
    const remember=(n,keys=['transform'])=>{if(n&&!run.saved.has(n))run.saved.set(n,Object.fromEntries(keys.map(k=>[k,n.getAttribute(k)])));return n;};
    const pin=n=>{if(!n||run.styles.has(n))return;const b=n.getBBox();run.styles.set(n,n.getAttribute('style'));n.style.transformBox='view-box';n.style.transformOrigin=`${b.x+b.width/2}px ${b.y+b.height/2}px`;};
    const point=(n,x,y)=>new DOMPoint(x,y).matrixTransform(root.getScreenCTM().inverse().multiply(n.getScreenCTM()));
    const players=pieces.map(p=>{
      const male=p.dataset.wormPart==='companion',art=p.querySelector('.location-accessory-art'),body=habitat.querySelector(male?'.companion-body':'.worm-body');
      pin(p);pin(art);
      // Pausing the normal bob is local to this short interaction and is restored.
      for(const n of [body,...habitat.querySelectorAll(`.fitted-headwear-motion.${male?'companion':'primary'}`)]){
        if(!run.styles.has(n))run.styles.set(n,n.getAttribute('style'));
        n.style.animationPlayState='paused';
      }
      const node=remember(art.querySelector(kind==='music'?'[data-dr-instrument]':'[data-dr-fork]'));
      const latex=remember(art.querySelector('[data-dr-latex]'),['opacity']);const thread=remember(latex?.querySelector('path'),['d']);
      const leanBody=male&&kind==='fruit'?remember(habitat.querySelector('#companion-worm')):null;
      const leanCloth=male&&kind==='fruit'?remember(habitat.querySelector('[data-accessory-family="eg5612-chita-neckerchiefs"][data-worm-part="companion"] .location-accessory-art')):null;
      const arms=Array.from({length:kind==='music'?2:1},()=>{
        const arm=add(effects,'g'),line=path(arm,'','none','#397567',male?3.4:6),light=path(arm,'','none','#a2d6ad',male?1.8:3.6),hand=add(arm,'g');
        path(hand,'M-5 3Q-8-3-3-5L1-5Q4-7 6-3L6 4Q0 8-5 3Z','#fff0d6','#56605a',1);
        path(hand,'M-4 0Q-10-4-7-6L-1-1M0-4V0M3-3V1','none','#a49278',.8);
        return {arm,line,light,hand};
      });
      return {piece:p,male,art,body,node,latex,thread,arms,leanBody,leanCloth};
    });
    if(!reduced.matches)sound.unlock();
    let sounded=false,snapped=false;const began=performance.now();
    function tick(now){
      if(active!==run)return;
      if(document.hidden||players.some(p=>!p.piece.isConnected||p.piece.closest('[hidden]'))){cancel();return;}
      const ms=now-began;if(!sounded&&ms>35){if(kind==='music'&&!reduced.matches)sound.duet(players.some(p=>!p.male),players.some(p=>p.male));sounded=true;}
      for(const p of players){
        const s=kind==='music'?duetFrame(ms,p.male,reduced.matches):fruitFrame(ms,p.male,reduced.matches);if(s.done){cancel();return;}
        let targets;
        if(kind==='fruit'){
          if(p.leanBody){
            p.leanBody.setAttribute('transform',`${run.saved.get(p.leanBody).transform||''} translate(${s.lean*2} 0)`);
            if(p.leanCloth)p.leanCloth.setAttribute('transform',`translate(${s.lean*.86} 0) ${run.saved.get(p.leanCloth).transform||''}`);
          }
          p.node.setAttribute('transform',`translate(${-s.lift*.12} ${-s.lift}) rotate(${s.lean} 5 -60)`);
          p.latex.setAttribute('opacity',s.stretch?1:0);
          p.thread.setAttribute('d',`M0 14Q${-s.lift*.08} ${14-s.lift*.45} ${-s.lift*.12} ${14-s.lift}`);
          if(s.release&&!snapped&&!reduced.matches){sound.snap();snapped=true;}
          targets=[point(p.node,5,-62)];
        }else{
          p.node.setAttribute('transform',`rotate(${p.male?s.hit*7:Math.sin(ms/330)*1.4} 0 0)`);
          targets=p.male?[point(p.node,-47,5),point(p.node,6-s.hit*10,-15+s.hit*19)]:[point(p.node,-1,-85),point(p.node,-14+s.hit*30,-14+s.hit*17)];
        }
        p.arms.forEach((a,i)=>{
          const from=point(p.body,p.male?i?267:245:i?240:299,p.male?128:i?138:113),to=targets[i],dx=to.x-from.x,dy=to.y-from.y;
          const d=`M${from.x} ${from.y}Q${from.x+dx*.35-8} ${from.y+dy*.45+18} ${to.x} ${to.y}`;
          a.line.setAttribute('d',d);a.light.setAttribute('d',d);
          a.hand.setAttribute('transform',`translate(${to.x} ${to.y}) rotate(${kind==='music'&&!p.male?-35:0}) scale(${p.male?.65:1})`);
          a.arm.setAttribute('opacity',reduced.matches?1:ease(ms/150));
        });
      }
      raf=requestAnimationFrame(tick);
    }
    raf=requestAnimationFrame(tick);return true;
  }
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});
  window.addEventListener('pagehide',cancel);window.addEventListener('resize',cancel);reduced.addEventListener('change',cancel);
  return {handles,start,cancel,reset:cancel,get active(){return !!active;}};
}
