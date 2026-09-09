const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {pathToFileURL}=require('node:url');
const root=path.resolve(__dirname,'../game-of-worms'),load=n=>import(pathToFileURL(path.join(root,n)));
class Element{
  constructor(tag){this.tag=tag;this.children=[];this.attributes={};this.dataset={};}
  setAttribute(k,v){this.attributes[k]=String(v);if(k.startsWith('data-'))this.dataset[k.slice(5).replace(/-([a-z])/g,(_,s)=>s.toUpperCase())]=String(v);}
  appendChild(n){this.children.push(n);return n;}
  querySelector(s){const key=s.match(/data-gift-part="([^"]+)"/);return walk(this).find(n=>key?n.attributes['data-gift-part']===key[1]:s==='[data-gift-art]'&&n.attributes['data-gift-art'])||null;}
}
const walk=n=>[n,...n.children.flatMap(walk)];
global.document={createElementNS:(_,t)=>new Element(t)};
(async()=>{
  const {GIFTS,drawOahuGift,setGiftArt,giftLayouts}=await load('oahu-gift-art.js');
  for(const small of[false]){
    const g=new Element('g');assert(drawOahuGift(g,{family:GIFTS},small));const a=g.querySelector('[data-gift-art]');
    assert(walk(g).length>35);assert(giftLayouts[GIFTS].primary.every(Number.isFinite));
    assert(a.querySelector('[data-gift-part="bow"]'));
    const insideIndex=a.children.findIndex(n=>n.attributes['data-gift-part']==='inside');
    const frontIndex=a.children.findIndex(n=>n.attributes.d==='M-25 1L44-10V22L-25 33Z');
    assert(frontIndex>insideIndex,'Near-side box wall contains the chocolates');
    for(let i=0;i<=20;i++)for(let j=0;j<=20;j++){
      setGiftArt(a,i/20,j/20);
      for(const n of walk(g)){
        for(const v of Object.values(n.attributes))assert(!/NaN|Infinity|undefined/.test(v));
        if(n.tag==='path')assert(n.attributes.fill&&n.attributes.stroke);
      }
    }
    setGiftArt(a,1,0);
    assert.equal(a.querySelector('[data-gift-part="bow"]').attributes.opacity,'1');
    setGiftArt(a,1,1);
    assert.equal(a.querySelector('[data-gift-part="bow"]').attributes.opacity,'0');
  }
  const companion=new Element('g');assert(drawOahuGift(companion,{family:GIFTS},true));assert.equal(companion.children.length,0,'Exactly one shared gift');
  assert(!drawOahuGift(new Element('g'),{family:'other'},false));
  const {giftFrame,fitGiftPoint,giftOfferLayout,giftCue,giftClips}=await load('oahu-gift-play.js');
  for(const opening of[false,true])for(let ms=0;ms<=5000;ms+=10){
    const f=giftFrame(ms,opening);assert(Object.values(f).every(v=>typeof v==='boolean'||Number.isFinite(v)));
    for(const k of['wrap','open','offer','reach'])assert(f[k]>=0&&f[k]<=1);
  }
  assert(giftFrame(4000).ready);assert(!giftFrame(100000).done,'A gift waits for the user');
  assert.equal(giftFrame(4000).open,0);assert.equal(giftFrame(0,true).open,0);assert(giftFrame(3000,true).done);
  assert.equal(giftFrame(0,false,true).reach,0);assert(giftFrame(0,false,true).ready);assert(giftFrame(0,true,true).done);
  assert.deepEqual(fitGiftPoint({x:500,y:-10},{x:20,y:30},{left:0,top:0,right:300,bottom:240}),{x:280,y:30});
  for(const width of[315,640,1000]){
    const bounds={left:0,top:0,right:width,bottom:420},o=giftOfferLayout(bounds,[{x:100,y:100},{x:300,y:70}],.92);
    assert(o.scale>.92*1.6,'Gift approaches much closer than the paired preview');
    assert(o.x-54*o.scale>=bounds.left&&o.x+54*o.scale<=bounds.right);
    assert(o.y+39*o.scale<=bounds.bottom);assert(o.y-34*o.scale>48,'Offered lid stays beneath the lifted faces');
    const staticOffer=giftOfferLayout(bounds,[{x:100,y:100},{x:300,y:70}],.92,0);
    assert(staticOffer.y-34*staticOffer.scale>100,'Reduced motion leaves the unmoved faces clear');
  }
  const recording=fs.readFileSync(path.join(root,'assets/audio/oahu-gift-foil.mp3'));
  assert.equal(recording.length,182112);assert.equal(crypto.createHash('sha256').update(recording).digest('hex'),'7679bb0a7ba4a6bc745509236373b95b8a3ba45dbf975dd9097f675c6900a73e');
  for(const small of[false,true])for(const kind of['foil','paper']){const c=giftCue(kind,small);assert(c.duration<=.5&&c.peak<=.065&&c.offset+c.duration<6.318);}
  let sources=0,requests=[];const played=[];
  global.window={AudioContext:function(){return{
    state:'running',currentTime:0,destination:{},resume:async()=>{},
    decodeAudioData:async()=>({duration:7,sampleRate:10,numberOfChannels:1,getChannelData:()=>new Float32Array(70).fill(.5)}),
    createGain:()=>({gain:{setValueAtTime(){},linearRampToValueAtTime(){}},connect(){},disconnect(){}}),
    createBufferSource(){sources++;return{connect(){},disconnect(){},start(...a){played.push(a);},stop(){this.onended?.();}};}
  };}};
  global.fetch=async url=>{requests.push(url);return{ok:true,arrayBuffer:async()=>new ArrayBuffer(2)};};
  const {createChocolateSound}=await load('oahu-chocolate-audio.js');
  const sound=createChocolateSound({clips:giftClips,cueFor:giftCue,keysFor:()=>Object.values(giftClips)});
  assert.equal(sources,0);await sound.unlock();assert.equal(requests.length,2);
  assert(sound.play('foil'));assert.equal(played[0][1],.6);sound.stop();
  assert(sound.play('paper',true));assert.equal(played[1][2],.44);sound.stop();
  assert(!requests.some(u=>u.includes('eating')),'Gift wrapping never loads eating sounds');
  const code=fs.readFileSync(path.join(root,'oahu-gift-play.js'),'utf8');
  for(const hook of['pagehide','visibilitychange','resize','reduced.addEventListener','sound.stop()'])assert(code.includes(hook));
  assert(code.includes("run.phase==='offered'"));assert(code.includes("'Unwrap chocolate gift'"));
  assert(code.includes("n.style.pointerEvents='none'"));assert(code.includes('parentInverse.multiply(placed)'));
  assert(code.includes('bodies.forEach(p=>p.arms='));
  const catalogue=fs.readFileSync(path.join(root,'accessory-designs.js'),'utf8');
  assert(catalogue.split('\n').find(l=>l.includes('const sharedAccessoryFamilies')).includes(GIFTS));
  console.log('Oahu gifts: one shared drawing, both workers, foreground enlargement, bounded folds, user-triggered opening, reduced motion, CC0 foil hash, isolated sound loading and cancellation passed.');
})().catch(e=>{console.error(e);process.exitCode=1;});
