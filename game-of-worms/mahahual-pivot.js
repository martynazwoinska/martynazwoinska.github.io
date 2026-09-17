const FAMILY='mahahual-sea-grape-beach-parasols';
export const umbrellaHeadroom=height=>Math.min(40,height*.12);
export const angleDelta=(a,b)=>((a-b+540)%360)-180;
export function createUmbrellaPivot(habitat,bounds){
 const states=new Map();let shadowFrame=0;
 const NS="http://www.w3.org/2000/svg";
 const handles=p=>p?.dataset.accessoryFamily===FAMILY;
 const state=p=>{const key=p.dataset.wormPart;if(!states.has(key))states.set(key,{angle:0,planted:false});return states.get(key);};
 const rig=p=>p.querySelector('[data-umbrella-pivot]');
 function paint(p,angle){rig(p)?.setAttribute('transform',`rotate(${angle} 0 240)`);p.dataset.umbrellaTilt=String(angle);refreshShadows();}
 function sync(p){if(handles(p))paint(p,state(p).angle);}
 function fits(p){const b=bounds(p),h=habitat.getBoundingClientRect();return b.left>=h.left+2&&b.right<=h.right-2&&b.top>=h.top-umbrellaHeadroom(h.height)&&b.bottom<=h.bottom-12;}
 function plant(p){if(handles(p))state(p).planted=true;}
 function planted(p){return handles(p)&&state(p).planted;}
 function turn(p,requested){const s=state(p),old=s.angle,target=Math.max(-55,Math.min(55,requested));plant(p);paint(p,target);
  if(fits(p))s.angle=target;
  else {let good=old,bad=target;for(let i=0;i<12;i++){const mid=(good+bad)/2;paint(p,mid);if(fits(p))good=mid;else bad=mid;}s.angle=good;paint(p,good);}
 }
 function begin(p,x,y){if(!handles(p))return null;plant(p);const m=p.querySelector('.location-accessory-art').getScreenCTM().inverse(),point=new DOMPoint(x,y).matrixTransform(m);return {inverse:m,start:Math.atan2(point.y-240,point.x)*180/Math.PI,angle:state(p).angle};}
 function drag(p,start,x,y){const point=new DOMPoint(x,y).matrixTransform(start.inverse);if(Math.hypot(point.x,point.y-240)<15)return;turn(p,start.angle+angleDelta(Math.atan2(point.y-240,point.x)*180/Math.PI,start.start));}
 function key(p,key,shift){if(!handles(p))return false;const direction={ArrowLeft:-1,ArrowRight:1}[key];if(key==='Home'){state(p).angle=0;paint(p,0);return true;}if(!direction)return false;turn(p,state(p).angle+direction*(shift?10:3));return true;}
 function fitScale(p,old,target){if(!planted(p)||fits(p))return target;let good=old,bad=target;for(let i=0;i<12;i++){const mid=(good+bad)/2;p.style.setProperty('--accessory-user-scale',String(mid));if(fits(p))good=mid;else bad=mid;}p.style.setProperty('--accessory-user-scale',String(good));refreshShadows();return good;}
 function refreshShadows(){
  if(shadowFrame)return;
  shadowFrame=requestAnimationFrame(()=>{
   shadowFrame=0;const root=habitat.querySelector('#worm-species');if(!root)return;
   let layer=root.querySelector('[data-umbrella-shadows]');
   const pieces=[...root.querySelectorAll(`.accessory-piece[data-accessory-family="${FAMILY}"]`)];
   if(!pieces.length){layer?.remove();return;}
   if(!layer){layer=document.createElementNS(NS,'g');layer.dataset.umbrellaShadows='';layer.setAttribute('pointer-events','none');layer.setAttribute('aria-hidden','true');root.prepend(layer);}
   layer.replaceChildren();
   const matrix=m=>new DOMMatrix([m.a,m.b,m.c,m.d,m.e,m.f]);
   const parent=root.getScreenCTM();if(!parent)return;
   // Ground shadows remain inside the photograph, even when canopies protrude.
   const frame=habitat.getBoundingClientRect(),inverse=matrix(parent).inverse();
   const defs=document.createElementNS(NS,'defs'),clip=document.createElementNS(NS,'clipPath'),polygon=document.createElementNS(NS,'polygon');
   clip.id='mahahual-ground-shadow-clip';clip.setAttribute('clipPathUnits','userSpaceOnUse');
   polygon.setAttribute('points',[[frame.left,frame.top],[frame.right,frame.top],[frame.right,frame.bottom],[frame.left,frame.bottom]].map(([x,y])=>{const p=new DOMPoint(x,y).matrixTransform(inverse);return `${p.x},${p.y}`;}).join(' '));
   clip.append(polygon);defs.append(clip);layer.append(defs);layer.setAttribute('clip-path','url(#mahahual-ground-shadow-clip)');
   for(const p of pieces){
    if(p.closest('[hidden]'))continue;
    const art=p.querySelector('.location-accessory-art'),m=art?.getScreenCTM();if(!m)continue;
    const relative=matrix(parent).inverse().multiply(matrix(m)),a=state(p).angle*Math.PI/180;
    const foot=new DOMPoint(0,240).matrixTransform(relative);
    const canopy=new DOMPoint(290*Math.sin(a),240-290*Math.cos(a)).matrixTransform(relative);
    const scale=Math.hypot(relative.a,relative.b),height=Math.max(20,foot.y-canopy.y);
    const x=foot.x+(canopy.x-foot.x)*.75+height*.24,y=foot.y+10;
    const rx=(p.dataset.wormPart==='companion'?126:148)*scale*(.65+.35*Math.abs(Math.cos(a)));
    const ellipse=document.createElementNS(NS,'ellipse');
    for(const [key,value]of Object.entries({'data-shadow-part':p.dataset.wormPart,cx:x,cy:y,rx,ry:rx*(.16+.07*Math.abs(Math.sin(a))),fill:'#152f31',opacity:.18,transform:`rotate(-7 ${x} ${y})`}))ellipse.setAttribute(key,value);
    ellipse.style.filter=`blur(${Math.max(2,scale*5)}px)`;layer.append(ellipse);
   }
  });
 }
 return {handles,sync,plant,planted,begin,drag,key,fitScale,refreshShadows};
}
