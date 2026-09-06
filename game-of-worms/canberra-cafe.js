import { COOKIE_WHOLE, COOKIE_BITTEN } from './canberra-cafe-art.js?v=20260906-cafe-2';
const NS='http://www.w3.org/2000/svg';
export const CAFE_FAMILIES=['canberra-flat-white-cafe','canberra-linen-napkins','oconnor-cockatoo-cafe-raid'];
const clamp=n=>Math.max(0,Math.min(1,n));
const ease=n=>{n=clamp(n);return n*n*(3-2*n);};
export function cafeFrame(ms,kind,reduced=false) {
  const duration=reduced?700:kind==='raid'?4800:kind==='wipe'?1700:2200;
  const t=clamp(ms/duration);
  return {t,done:ms>=duration,contact:t>=.38&&t<=.62,
    reach:t<.38?ease(t/.38):t>.62?1-ease((t-.62)/.38):1};
}
export function createCanberraCafe(habitat) {
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let run=null,raf=0;
  const make=(tag,attrs={})=>{const n=document.createElementNS(NS,tag);Object.entries(attrs).forEach(([k,v])=>n.setAttribute(k,v));return n;};
  const visible=n=>n?.isConnected&&!n.closest('[hidden]');
  const root=()=>habitat.querySelector('#worm-species');
  const mouth=part=>habitat.querySelector(part==='companion'?'#companion-worm .worm-smile':'#primary-worm .worm-smile');
  const xy=(node,x=0,y=0)=>new DOMPoint(x,y).matrixTransform(node.getScreenCTM()).matrixTransform(root().getScreenCTM().inverse());
  const mouthPoint=part=>xy(mouth(part),331,77);
  const cookies=()=>Array.from(habitat.querySelectorAll('[data-cafe-cookie]')).filter(n=>visible(n)&&!n.dataset.consumed);
  const handles=piece=>CAFE_FAMILIES.includes(piece?.dataset.accessoryFamily);
  function cancel() {
    cancelAnimationFrame(raf);raf=0;
    if(!run)return;
    for(const lift of run.lifts) {
      lift.layer.remove();
      if(lift.source.dataset.consumed)lift.source.setAttribute('opacity','0');
      else if(lift.opacity===null)lift.source.removeAttribute('opacity');
      else lift.source.setAttribute('opacity',lift.opacity);
    }
    delete run.piece.dataset.cafeAction;run=null;
  }
  function clear() {
    cancel();habitat.querySelectorAll('[data-cafe-mouth]').forEach(n=>n.remove());
  }
  function dirty(part) {
    const smile=mouth(part);if(!smile)return;
    smile.parentNode.querySelector('[data-cafe-mouth]')?.remove();
    const mark=make('g',{'data-cafe-mouth':part,'pointer-events':'none','aria-hidden':'true'});
    if(part==='primary') {
      mark.append(make('path',{d:'M321 76Q324 71 328 75Q332 70 335 75Q339 71 342 75Q340 81 333 79Q326 82 321 76Z',fill:'#fffaf0',stroke:'#cdb899','stroke-width':.9}));
    } else {
      for(const [cx,cy,r] of [[323,80,2.3],[331,83,1.7],[341,78,2.2],[318,74,1.4]])mark.append(make('circle',{cx,cy,r,fill:'#9b603a',stroke:'#f7d49b','stroke-width':.7}));
    }
    smile.parentNode.append(mark);
  }
  function clean(part,piece) {
    const mark=habitat.querySelector(`[data-cafe-mouth="${part}"]`);
    if(!mark)return false;
    mark.remove();piece.querySelector('[data-cafe-stain]')?.setAttribute('opacity','.7');return true;
  }
  function wipe(piece) {
    if(piece?.dataset.accessoryFamily!=='canberra-linen-napkins')return false;
    const cloth=piece.querySelector('[data-cafe-napkin]');if(!visible(cloth))return false;
    const bounds=cloth.getBoundingClientRect();let cleaned=false;
    for(const part of ['primary','companion']) {
      const smile=mouth(part);if(!smile)continue;
      const pt=new DOMPoint(331,77).matrixTransform(smile.getScreenCTM());
      if(pt.x>=bounds.left && pt.x<=bounds.right && pt.y>=bounds.top && pt.y<=bounds.bottom)cleaned=clean(part,piece)||cleaned;
    }
    return cleaned;
  }
  function reset(piece) {
    cancel();if(!handles(piece))return;
    piece.querySelectorAll('[data-cafe-cookie]').forEach(n=>{
      delete n.dataset.consumed;delete n.dataset.bitten;n.removeAttribute('opacity');
      n.querySelector('[data-cookie-face]').setAttribute('d',COOKIE_WHOLE);
    });
    piece.querySelector('[data-cafe-stain]')?.setAttribute('opacity','0');
  }
  function lift(source,run) {
    const matrix=root().getScreenCTM().inverse().multiply(source.parentNode.getScreenCTM());
    const layer=make('g',{'data-cafe-overlay':'','aria-hidden':'true','pointer-events':'none'});
    const copy=source.cloneNode(true);copy.removeAttribute('opacity');layer.append(copy);root().append(layer);
    const lifted={source,copy,layer,matrix,opacity:source.getAttribute('opacity')};run.lifts.push(lifted);
    source.setAttribute('opacity','0');
    lifted.move=(x=0,y=0)=>layer.setAttribute('transform',new DOMMatrix().translate(x,y).multiply(matrix).toString());
    lifted.move();return lifted;
  }
  function start(piece) {
    if(!handles(piece)||!visible(piece))return false;
    cancel();
    const family=piece.dataset.accessoryFamily,part=piece.dataset.wormPart;
    const kind=family==='oconnor-cockatoo-cafe-raid'?'raid':family==='canberra-linen-napkins'?'wipe':part==='primary'?'sip':'bite';
    const available=cookies();
    // The second bird favours a bitten biscuit. No prop is invented at its beak.
    const biscuit=(part==='companion'?available.find(n=>n.dataset.bitten):null)||available.at(-1);
    if((kind==='raid'||kind==='bite')&&!biscuit) {
      if(kind==='bite')reset(piece);
      return true;
    }
    const source=kind==='raid'?piece.querySelector('.cockatoo-flight-bird'):kind==='wipe'?piece.querySelector('[data-cafe-napkin]'):kind==='sip'?piece.querySelector('[data-cafe-cup]'):biscuit;
    if(!source||!mouth(part))return false;
    const current={piece,lifts:[],acted:false};run=current;piece.dataset.cafeAction=kind;
    const object=lift(source,current);
    const origin=kind==='raid'?xy(object.copy.querySelector('[data-cafe-beak]')):kind==='sip'?xy(object.copy,-65,-28):xy(object.copy);
    const foodOrigin=biscuit?xy(biscuit):null;
    if(kind==='raid')object.layer.classList.add('is-raiding');
    const began=performance.now();
    function tick(now) {
      if(run!==current)return;
      if(!visible(piece)||(biscuit&&!biscuit.isConnected)){cancel();return;}
      const state=cafeFrame(now-began,kind,reduced.matches);
      if(state.done){cancel();return;}
      const target=kind==='raid'?foodOrigin:mouthPoint(part);
      let dx=(target.x-origin.x)*state.reach,dy=(target.y-origin.y)*state.reach;
      if(kind==='raid') {
        // Beak meets the exact biscuit, then leaves head-first on its own route.
        if(state.t<.38)dy-=Math.sin(state.t/.38*Math.PI)*38;
        if(state.t>.48) {
          const escape=ease((state.t-.48)/.3);
          dx=target.x-origin.x+(part==='primary'?760:-760)*escape;
          dy=target.y-origin.y-370*escape;
        }
        if(state.t>.80)object.layer.setAttribute('opacity','0');
        if(state.t>.88) {
          object.move(0,0);object.layer.setAttribute('opacity',String(ease((state.t-.88)/.12)));
        }
      } else if(kind==='wipe'&&state.contact)dx+=Math.sin((state.t-.38)/.24*Math.PI*4)*8;
      if(reduced.matches) {dx=0;dy=0;}
      if(kind==='sip')object.copy.setAttribute('transform',`rotate(${reduced.matches?0:-14*state.reach} -65 -28)`);
      if(!(kind==='raid'&&state.t>.88))object.move(dx,dy);
      if(state.contact&&!current.acted) {
        current.acted=true;
        if(kind==='sip'||kind==='bite')dirty(part);
        if(kind==='wipe') {
          clean(part,piece);
          object.copy.querySelector('[data-cafe-stain]')?.setAttribute('opacity','.7');
        }
        if(kind==='bite') {
          if(biscuit.dataset.bitten){biscuit.dataset.consumed='eaten';object.copy.setAttribute('opacity','0');}
          else {biscuit.dataset.bitten='true';for(const n of [biscuit,object.copy])n.querySelector('[data-cookie-face]').setAttribute('d',COOKIE_BITTEN);}
        }
        if(kind==='raid') {
          current.food=lift(biscuit,current);biscuit.dataset.consumed='stolen';
        }
      }
      if(current.food) {
        const beak=xy(object.copy.querySelector('[data-cafe-beak]'));
        current.food.move(beak.x-foodOrigin.x,beak.y-foodOrigin.y);
        current.food.layer.setAttribute('opacity',state.t>.80?'0':'1');
      }
      raf=requestAnimationFrame(tick);
    }
    raf=requestAnimationFrame(tick);return true;
  }
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});
  window.addEventListener('pagehide',cancel);reduced.addEventListener('change',cancel);
  return {handles,start,cancel,clear,wipe,reset};
}
