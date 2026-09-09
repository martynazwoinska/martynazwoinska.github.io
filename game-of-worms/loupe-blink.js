// A short reaction to the Trivandrum optical windows, using the original eyes.
// The live <use> scene references also show the blink under magnification.
const duration=310, interval=2800;
const smooth=x=>x*x*(3-2*x);
export function eyeOpenness(ms) {
  if(ms<0||ms>=duration)return 1;
  if(ms<90)return 1-.90*smooth(ms/90);
  if(ms<160)return .10;
  return .10+.90*smooth((ms-160)/150);
}

const mapPoint=(m,p)=>({x:m.a*p.x+m.c*p.y+m.e,y:m.b*p.x+m.d*p.y+m.f});
const invertible=m=>m&&Number.isFinite(m.a*m.d-m.b*m.c)&&Math.abs(m.a*m.d-m.b*m.c)>1e-8;
export function eyesUnderGlass(eyes,bodyMatrix,lensMatrix,box) {
  if(!invertible(bodyMatrix)||!invertible(lensMatrix)||box.width<=0||box.height<=0)return false;
  const inverse=lensMatrix.inverse();
  return eyes.some(eye=>{
    const p=mapPoint(inverse,mapPoint(bodyMatrix,eye));
    const x=(p.x-(box.x||0)-box.width/2)/(box.width/2);
    const y=(p.y-(box.y||0)-box.height/2)/(box.height/2);
    return x*x+y*y<=1;
  });
}

export function mountLoupeBlinks(habitat,lenses) {
  const faces=['.worm-body','.companion-body'].map(selector=>{
    const body=habitat.querySelector(selector);
    const eyes=[...(body?.querySelectorAll('.worm-eye')||[])];
    if(eyes.length!==2)return null;
    const centres=eyes.map(n=>({x:+n.getAttribute('cx'),y:+n.getAttribute('cy')}));
    const angle=Math.atan2(centres[1].y-centres[0].y,centres[1].x-centres[0].x)*180/Math.PI;
    const marks=[...eyes,...body.querySelectorAll('.worm-eye-shine')].map(n=>{
      const x=+n.getAttribute('cx'),y=+n.getAttribute('cy');
      const centre=centres.reduce((a,b)=>Math.hypot(x-a.x,y-a.y)<Math.hypot(x-b.x,y-b.y)?a:b);
      return {n,centre,transform:n.getAttribute('transform'),visibility:n.getAttribute('visibility'),shine:!eyes.includes(n)};
    });
    return {body,centres,marks,angle,started:null,next:0,openness:1};
  }).filter(Boolean);
  if(!faces.length)return {update(){},dispose(){}};
  const reduced=globalThis.matchMedia?.('(prefers-reduced-motion: reduce)');
  const restore=(n,key,value)=>value===null?n.removeAttribute(key):n.setAttribute(key,value);
  function paint(face,open) {
    if(open===face.openness)return;
    face.openness=open;
    for(const {n,centre,transform,visibility,shine} of face.marks) {
      if(open===1) {
        restore(n,'transform',transform);restore(n,'visibility',visibility);
      } else {
        const {x,y}=centre;
        n.setAttribute('transform',`translate(${x} ${y}) rotate(${face.angle}) scale(1 ${open}) rotate(${-face.angle}) translate(${-x} ${-y}) ${transform||''}`);
        if(shine&&open<.3)n.setAttribute('visibility','hidden');
        else restore(n,'visibility',visibility);
      }
    }
  }
  function reset(face) {paint(face,1);face.started=null;face.next=0;}
  function update(now,visible=true) {
    const glasses=visible&&!reduced?.matches?lenses.filter(({frame})=>!frame.closest('[hidden]')):[];
    if(!glasses.length){faces.forEach(reset);return;}
    for(const face of faces) {
      if(face.body.closest('[hidden]')){reset(face);continue;}
      const covered=glasses.some(({svg})=>eyesUnderGlass(face.centres,face.body.getScreenCTM(),svg.getScreenCTM(),svg.viewBox.baseVal));
      if(covered&&face.started===null&&now>=face.next) {
        face.started=now;face.next=now+interval;
      }
      if(face.started!==null) {
        paint(face,eyeOpenness(now-face.started));
        if(now-face.started>=duration)face.started=null;
      }
    }
  }
  return {update,dispose(){faces.forEach(reset);}};
}
