const NS='http://www.w3.org/2000/svg';
const add=(g,tag,attrs)=>{const n=document.createElementNS(NS,tag);for(const [k,v] of Object.entries(attrs))n.setAttribute(k,v);g.append(n);return n;};
let serial=0;
const ink='#684637';
const shape=(g,d,fill,width=1.1)=>add(g,'path',{d,fill,stroke:ink,'stroke-width':width,'stroke-linejoin':'round'});
const seam=(g,d,color='#fbe1a0',width=.8)=>add(g,'path',{d,fill:'none',stroke:color,'stroke-width':width,'stroke-linecap':'round'});

// Original dress-up headpieces: cotton wraps and folded madras, not a replica
// of a particular ceremonial coiffe or its coded arrangement of points.
export function drawGuadeloupeCrown(group,male){
  group.setAttribute('style','transform-box:view-box;transform-origin:0 0');
  const rig=add(group,'g',{'data-gua-crown-rig':'',transform:male
    ?'scale(2.941176471) rotate(-4) translate(-111 -104) translate(-28 82) scale(.43)'
    :'scale(2.380952381) rotate(3) translate(-355 -55)'});
  const defs=add(rig,'defs',{}),prefix=`gua-cloth-${++serial}`;
  const cloth=(angle,dark=false)=>{
    const id=`${prefix}-${angle}-${dark?'shade':'light'}`;
    const p=add(defs,'pattern',{id,width:16,height:16,patternUnits:'userSpaceOnUse',patternTransform:`rotate(${angle})`});
    add(p,'rect',{width:16,height:16,fill:dark?'#cb8d34':'#edbb4b'});
    add(p,'rect',{x:3,width:5,height:16,fill:'#bc4552',opacity:dark?.78:.68});
    add(p,'rect',{y:5,width:16,height:5,fill:'#bd4846',opacity:.68});
    for(const x of [11,13])add(p,'rect',{x,width:.75,height:16,fill:'#32695b'});
    for(const y of [12,14])add(p,'rect',{y,width:16,height:.75,fill:'#32695b'});
    add(p,'rect',{x:1,width:.6,height:16,fill:'#ffedb6'});
    add(p,'rect',{y:2,width:16,height:.6,fill:'#ffedb6'});
    return `url(#${id})`;
  };
  const front=cloth(-14),cross=cloth(24),shade=cloth(7,true);
  if(male){
    // Low wrapped cap, with two soft ends tied at the back of the head.
    shape(rig,'M309 31Q301 15 310 6Q323 0 337 12Q345 21 343 36Z',cross);
    shape(rig,'M306 24Q293 5 279 15Q285 30 305 31Z',front);
    shape(rig,'M304 28Q286 25 287 42Q301 39 308 31Z',shade);
    seam(rig,'M288 20Q296 20 303 27');
    seam(rig,'M291 37Q295 31 303 30','#754431',1.2);
    shape(rig,'M308 24Q319 15 340 27L346 35Q326 27 308 38Z',shade);
    shape(rig,'M303 31Q322 23 343 33L348 43Q325 35 306 47Q301 42 303 31Z',front);
    seam(rig,'M306 34Q323 27 341 35M309 43Q326 34 343 40');
    shape(rig,'M301 25Q308 22 313 30L309 37Q300 37 298 32Z',cross);
    seam(rig,'M303 27L308 33');
  }else{
    // An asymmetric fan: separate overlapping pleats converge into the wrap.
    shape(rig,'M310 33Q293 24 282 8Q288 0 296 0L316 30Z',shade);
    shape(rig,'M311 31L292 0Q298-6 307-5L319 30Z',front);
    shape(rig,'M316 31L305-6Q313-10 320-7L323 30Z',cross);
    shape(rig,'M321 31L319-8Q328-9 334-4L329 31Z',front);
    shape(rig,'M326 33L333-4Q343-1 347 7L333 35Z',cross);
    shape(rig,'M329 35L347 7Q353 13 354 22L339 38Z',shade);
    shape(rig,'M295 1L313 29L310 28Z','#965330',.4);
    shape(rig,'M308-4L320 28L316 28Z','#995835',.4);
    shape(rig,'M322-6L325 29L322 28Z','#965330',.4);
    shape(rig,'M335-1L329 31L327 30Z','#965330',.4);
    shape(rig,'M348 10L336 33L333 33Z','#875334',.4);
    seam(rig,'M288 8L310 29M298 1L315 27M309-3L320 27M323-4L324 27M336 1L329 29M348 15L336 32');
    shape(rig,'M301 31Q316 20 337 28L343 35Q321 29 306 43Z',shade);
    shape(rig,'M303 35Q323 26 343 36L347 45Q328 37 310 47L305 46Z',front);
    seam(rig,'M307 37Q323 30 340 37M312 44Q329 36 344 42');
    // Folded knot on the rear side, with a tucked fabric end.
    shape(rig,'M305 35Q290 29 287 38Q295 44 305 42Z',cross);
    shape(rig,'M300 32Q306 29 312 36L310 43Q302 46 297 39Z',front);
    seam(rig,'M301 34L307 40');
  }
}
