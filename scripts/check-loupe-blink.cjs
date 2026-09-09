const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
class Matrix {
  constructor(a=1,b=0,c=0,d=1,e=0,f=0){Object.assign(this,{a,b,c,d,e,f});}
  inverse(){const m=this,t=m.a*m.d-m.b*m.c;return new Matrix(m.d/t,-m.b/t,-m.c/t,m.a/t,(m.c*m.f-m.d*m.e)/t,(m.b*m.e-m.a*m.f)/t);}
}
class Mark {
  constructor(x,y){this.attrs={cx:String(x),cy:String(y)};}
  getAttribute(k){return this.attrs[k]??null;}
  setAttribute(k,v){this.attrs[k]=String(v);}
  removeAttribute(k){delete this.attrs[k];}
}
function body(matrix=new Matrix()){
  const eyes=[new Mark(323,49),new Mark(340,58)],shine=[new Mark(321.5,47.5),new Mark(338.5,56.5)];
  return {eyes,shine,matrix,hidden:false,closest(){return this.hidden?this:null;},
    getScreenCTM(){return this.matrix;},querySelectorAll(s){return s==='.worm-eye'?eyes:s==='.worm-eye-shine'?shine:[];}};
}
function lens(matrix){
  return {frame:{hidden:false,closest(){return this.hidden?this:null;}},
    svg:{matrix,viewBox:{baseVal:{x:0,y:0,width:140,height:144}},getScreenCTM(){return this.matrix;}}};
}
(async()=>{
  const {eyeOpenness,eyesUnderGlass,mountLoupeBlinks}=await import(pathToFileURL(path.join(__dirname,'../game-of-worms/loupe-blink.js')));
  for(let ms=-10;ms<500;ms+=5){const q=eyeOpenness(ms);assert(Number.isFinite(q)&&q>=.1-1e-10&&q<=1);}
  assert.equal(eyeOpenness(0),1);assert.equal(eyeOpenness(120),.1);assert.equal(eyeOpenness(310),1);
  const box={x:0,y:0,width:140,height:144};
  assert(eyesUnderGlass([{x:70,y:72}],new Matrix(),new Matrix(),box));
  assert(!eyesUnderGlass([{x:1,y:1}],new Matrix(),new Matrix(),box),'The transparent bounding-box corner is not glass');
  assert(!eyesUnderGlass([{x:70,y:72}],new Matrix(),new Matrix(0,0,0,0),box));
  assert(!eyesUnderGlass([{x:70,y:72}],null,new Matrix(),box));
  const rotated=new Matrix(0,2,-2,0,400,100);
  assert(eyesUnderGlass([{x:70,y:72}],rotated,rotated,box),'Rotated and scaled glass maps back to native coordinates');
  const shifted={x:20,y:30,width:140,height:144};
  assert(eyesUnderGlass([{x:90,y:102}],new Matrix(),new Matrix(),shifted),'Nonzero viewBox origin is supported');

  const female=body(),male=body(new Matrix(.43,0,0,.43,-28,82));
  const glasses=[lens(new Matrix(1,0,0,1,260,-18)),lens(new Matrix(1,0,0,1,1000,1000))];
  const habitat={querySelector(s){return s==='.worm-body'?female:male;}};
  const preference={matches:false};global.matchMedia=()=>preference;
  const saved=female.shine[0];saved.setAttribute('visibility','visible');
  const controller=mountLoupeBlinks(habitat,glasses);
  controller.update(0);controller.update(120);
  assert(female.eyes.every(n=>n.getAttribute('transform').includes('scale(1 0.1)')));
  assert(female.eyes[0].getAttribute('transform').includes('rotate(27.897'),'The closed eye follows the tilted face');
  assert.equal(saved.getAttribute('visibility'),'hidden');
  assert(male.eyes.every(n=>n.getAttribute('transform')===null),'The uncovered male does not blink');
  controller.update(310);
  assert(female.eyes.every(n=>n.getAttribute('transform')===null));
  assert.equal(saved.getAttribute('visibility'),'visible');
  controller.update(700);
  assert.equal(female.eyes[0].getAttribute('transform'),null,'Lingering glass does not cause rapid blinking');
  glasses[1].svg.matrix=new Matrix(.5,0,0,.5,79,69);
  controller.update(2800);controller.update(2920);
  assert([...female.eyes,...male.eyes].every(n=>n.getAttribute('transform')?.includes('scale(1 0.1)')),'Either lens can trigger either face independently');
  preference.matches=true;controller.update(2921);
  assert([...female.eyes,...male.eyes].every(n=>n.getAttribute('transform')===null),'Reduced motion restores open eyes');
  preference.matches=false;controller.update(3000);controller.update(3120);
  controller.update(3121,false);
  assert([...female.eyes,...male.eyes].every(n=>n.getAttribute('transform')===null),'Hidden/offscreen scenes reset');
  controller.update(3200);controller.update(3320);
  glasses.forEach(l=>l.frame.hidden=true);controller.update(3321);
  assert([...female.eyes,...male.eyes].every(n=>n.getAttribute('transform')===null),'Hiding the accessory resets');
  glasses.forEach(l=>l.frame.hidden=false);controller.update(3400);controller.update(3520);
  controller.dispose();
  assert([...female.eyes,...male.eyes].every(n=>n.getAttribute('transform')===null));
  assert.equal(saved.getAttribute('visibility'),'visible','Cleanup restores the original attributes exactly');
  assert.equal(female.eyes[0].getAttribute('cx'),'323','No geometry or accessory-size changes');
  const noop=mountLoupeBlinks({querySelector(){return null;}},[]);
  noop.update(0);noop.dispose();
  delete global.matchMedia;
  console.log('Loupe blink: tilted eyes, ellipse hit testing, transformed/scaled lenses, independent faces, cadence, reduced motion, hidden/offscreen and cleanup passed.');
})().catch(e=>{console.error(e);process.exitCode=1;});
