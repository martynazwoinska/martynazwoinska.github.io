const NS='http://www.w3.org/2000/svg';
export const GIANT='eg4181-giant-bubble-loop',SMALL='eg4181-little-bubble-kit',BLANKET='eg4181-picnic-blanket',PICNIC='eg4181-apricot-picnic';
export const add=(p,tag,a={})=>{const n=document.createElementNS(NS,tag);for(const [k,v]of Object.entries(a))n.setAttribute(k,v);p.appendChild(n);return n;};
const ink='#315a60',cream='#fff5d7',teal='#438d89',berry='#b95e79';
const path=(p,d,fill='none',stroke=ink,w=2)=>add(p,'path',{d,fill,stroke,'stroke-width':w,'stroke-linejoin':'round','stroke-linecap':'round'});
export function drawLoop(p,small=false){
 const g=add(p,'g',{'data-bubble-wand':''});
 if(small){
  path(g,'M0 17V67','none',ink,7);path(g,'M0 17V65','none',berry,4);
  add(g,'ellipse',{cx:0,cy:0,rx:12,ry:18,fill:'#e2f8eb','fill-opacity':.12,stroke:ink,'stroke-width':6});
  add(g,'ellipse',{cx:0,cy:0,rx:12,ry:18,fill:'none',stroke:'#e8a7b7','stroke-width':3});
  path(g,'M-7 -11Q-11 0-7 10','none',cream,1.7);
 }else{
  path(g,'M-4 45L-7 101Q0 108 7 101L4 45Z',teal,ink,2.3);
  path(g,'M-3 64L3 64M-4 71H4M-4 78H4M-4 85H4','none','#b9d6bd',1.8);
  add(g,'ellipse',{cx:0,cy:0,rx:47,ry:44,fill:'#d4f0de','fill-opacity':.08,stroke:ink,'stroke-width':7});
  add(g,'ellipse',{cx:0,cy:0,rx:47,ry:44,fill:'none',stroke:'#a9d3ca','stroke-width':3.8});
  path(g,'M-36 -23Q-18-45 8-41','none','#fff8df',2.3);
  path(g,'M23 37Q40 26 43 9','none','#e8b5cf',2.3);
  for(let i=0;i<28;i++){const a=i*Math.PI/14;path(g,`M${Math.cos(a)*44} ${Math.sin(a)*41}L${Math.cos(a)*49} ${Math.sin(a)*46}`,'none','#648f8c',1.1);}
  path(g,'M-6 48H6M-5 53H5','none',cream,2);
 }
 return g;
}
export function drawApricotSlice(parent){
 const g=add(parent,'g');
 path(g,'M-16-5Q-5 11 16-6Q13 13-1 14Q-14 13-16-5Z','#e28c36','#9c642f',1.3);
 path(g,'M-14-5Q-2 2 14-6Q5 8-3 8Q-11 5-14-5Z','#ffd08b','#b67b39',.8);
 path(g,'M-10-3Q-1 2 8-2','none','#fff0b9',1.3);
 return g;
}
function drawPicnic(g){
 const willow='#b88b53',dark='#735439',light='#e0bf87';
 add(g,'ellipse',{cx:2,cy:48,rx:61,ry:10,fill:'#28483b',opacity:.18});
 // A hinged lid rests open behind the basket; the near wall hides fruit bases.
 path(g,'M-56-5L-67-53Q-12-81 47-59L56-12Z',willow,dark,2);
 path(g,'M-51-13L-58-50Q-12-71 40-54L48-18Z',light,dark,1.3);
 for(let i=0;i<7;i++){const y=-49+i*5;path(g,`M${-54+i*.6} ${y}Q-9 ${y-16} ${42+i*.8} ${y-3}`,'none',willow,2);}
 for(let x=-39;x<39;x+=13)path(g,`M${x} -57L${x+7} -21`,'none','#a67d47',1.3);
 path(g,'M-51 11Q-68-63-13-65Q42-65 54 10','none',dark,7);
 path(g,'M-51 11Q-68-63-13-65Q42-65 54 10','none',light,3.4);
 add(g,'ellipse',{cx:0,cy:1,rx:59,ry:22,fill:'#6f6244',stroke:dark,'stroke-width':2});
 path(g,'M-55-1Q-31-18-9-6Q13-18 52-1L45 32Q18 23-8 34Q-31 20-47 33Z','#efe2c3','#c6b392',1.3);
 for(const [x,y,angle]of [[-29,-3,-20],[0,-9,14],[28,-1,30]]){
  const fruit=add(g,'g',{transform:`translate(${x} ${y}) rotate(${angle})`});
  path(fruit,'M0-17C21-24 24 6 10 15C-6 26-22 9-18-5Q-14-20 0-17Z','#f5a14a','#b36629',1.4);
  path(fruit,'M-1-14Q-5-5 2 1Q9 9 4 15','none','#cc8b42',1.3);
  add(fruit,'ellipse',{cx:0,cy:0,rx:7,ry:10,fill:'#b87738',stroke:'#ffd087','stroke-width':2});
  path(fruit,'M-10-11Q-15-7-14-1','none','#ffe0a6',2);
 }
 const slices=add(g,'g',{'data-picnic-servings':''});
 drawApricotSlice(add(slices,'g',{transform:'translate(-19 -13) rotate(-18)'}));
 drawApricotSlice(add(slices,'g',{transform:'translate(15 -8) rotate(17) scale(.8)'}));
 const front='M-59 3Q0 30 59 3L50 40Q0 64-50 40Z';
 path(g,front,willow,dark,2);
 for(let y=12;y<=38;y+=7){const w=57-(y-12)*.22;path(g,`M${-w} ${y}Q0 ${y+25} ${w} ${y}`,'none',light,2.4);}
 for(let x=-44;x<=44;x+=11)path(g,`M${x} ${15-Math.abs(x)*.16}Q${x*.92} 34 ${x*.85} ${50-Math.abs(x)*.16}`,'none','#926937',1.6);
 path(g,'M-59 3Q0 30 59 3','none',dark,7);
 path(g,'M-59 2Q0 29 59 2','none',light,3);
 // Folded linen hangs over one side, distinct from the woven wall.
 path(g,'M-39 12Q-24 17-13 17L-17 39L-25 34L-33 37Z','#f3e6c9','#c6b391',1.2);
 path(g,'M-31 17L-28 32M-22 19L-21 30','none','#7ca89c',2);
 path(g,'M4 25H15V43Q9 48 4 43Z','#946a44',dark,1.1);
 add(g,'rect',{x:6,y:33,width:7,height:7,rx:1,fill:'none',stroke:'#e3bc70','stroke-width':1.5});
}
export function drawSaltLakeBubbles(g,item,companion=false){
 if(![GIANT,SMALL,BLANKET,PICNIC].includes(item.family))return false;
 g.dataset.renderer=item.family;
 if(item.family===PICNIC){drawPicnic(g);return true;}
 const small=item.family===SMALL||(item.family===GIANT&&companion);
 if(item.family===GIANT&&!small){
  add(g,'ellipse',{cx:0,cy:127,rx:74,ry:13,fill:'#173b35',opacity:.12});
  add(g,'ellipse',{cx:1,cy:127,rx:61,ry:7,fill:'#173b35',opacity:.16});
  path(g,'M-72 103Q0 126 72 103L66 123Q0 147-66 123Z',teal);
  path(g,'M-66 118Q0 139 66 118','none','#a5cbc1',2.5);
  add(g,'ellipse',{cx:0,cy:103,rx:72,ry:24,fill:'#d9eadc',stroke:ink,'stroke-width':2});
  add(g,'ellipse',{cx:0,cy:104,rx:63,ry:17,fill:'#619e99',stroke:'#477f7c','stroke-width':2});
  add(g,'ellipse',{cx:0,cy:107,rx:59,ry:12,fill:'#a9d4c0'});
  path(g,'M-50 104Q-15 93 35 101','none','#f0f5d7',2);
  for(const [x,y,r]of [[-48,108,3],[-37,102,2],[40,108,4],[47,104,2]])add(g,'circle',{cx:x,cy:y,r,fill:'none',stroke:cream,'stroke-width':1.3});
  const wand=drawLoop(g);wand.setAttribute('transform','translate(-5 101) rotate(-12) scale(1 .34)');
  // A raised near rim covers the dipped hoop, giving the liquid a real recess.
  const rim=add(g,'g',{'data-bubble-near-rim':''});
  path(rim,'M-71 106Q-45 131 20 126Q60 123 71 106L67 119Q27 142-40 131Q-63 126-71 106Z','#77ada3',ink,1.4);
  path(rim,'M-68 108Q-42 132 21 124Q57 121 68 108','none',cream,2.3);
  path(g,'M-71 105Q-81 102-80 112Q-79 119-69 119M71 104Q80 102 81 110Q82 117 71 120','none',ink,3);
 }else if(small){
  add(g,'ellipse',{cx:0,cy:92,rx:32,ry:7,fill:'#173b35',opacity:.16});
  path(g,'M-13 27L-13 38Q-25 43-24 53L-22 84Q0 97 22 84L24 53Q25 43 13 38L13 27Z','#dceadd');
  path(g,'M-21 57Q0 64 21 57L20 82Q0 92-20 82Z','#8abcb0','none');
  add(g,'ellipse',{cx:0,cy:58,rx:20,ry:5,fill:'#b7ded0',stroke:'#679f97','stroke-width':1});
  path(g,'M-15 44Q-20 48-17 77','none','#fff8e8',3);
  path(g,'M18 47L18 79Q11 87-2 86','none','#558981',1.4);
  add(g,'ellipse',{cx:0,cy:27,rx:14,ry:5,fill:'#315a60',stroke:'#9fc5b4','stroke-width':2.5});
  path(g,'M-15 31Q0 38 15 31M-15 35Q0 42 15 35','none',teal,2);
  path(g,'M-22 64Q0 73 22 64L21 76Q0 85-21 76Z',cream,ink,1);
  for(const [x,y,r]of [[-8,74,3],[2,75,4],[10,72,2]])add(g,'circle',{cx:x,cy:y,r,fill:'none',stroke:teal,'stroke-width':1.2});
  const wand=drawLoop(g,true);wand.setAttribute('transform','translate(31 18) rotate(18) scale(.7)');
  path(g,'M-45 81L-43 88Q-32 94-22 87L-20 80Z',berry,ink,1.4);
  add(g,'ellipse',{cx:-32.5,cy:80,rx:12.5,ry:5,fill:'#eab1ba',stroke:ink,'stroke-width':1.4});
  add(g,'ellipse',{cx:-32.5,cy:80,rx:8,ry:2.7,fill:'#b66b80'});
  path(g,'M-41 84L-40 87M-36 86V89M-30 86V90M-25 84V88','none','#efbdc6',1);
 }else{
  // Map every check, stitch and hem onto the same gently rumpled cloth surface.
  const point=(u,v)=>({x:-170+u+.68*v,y:-18-.16*u+.44*v+4*Math.sin(u/42)+3*Math.sin(v/20)-11*Math.exp(-(((u-164)/34)**2)-((v-113)/35)**2)-12*Math.exp(-(((u-235)/23)**2)-((v-145)/23)**2)-9*Math.exp(-(((u-10)/30)**2)-((v-150)/23)**2)});
  const strip=(u0,v0,u1,v1)=>{const out=[];for(let i=0;i<=12;i++)out.push(point(u0+(u1-u0)*i/12,v0));for(let i=1;i<=12;i++)out.push(point(u1,v0+(v1-v0)*i/12));for(let i=1;i<=12;i++)out.push(point(u1-(u1-u0)*i/12,v1));for(let i=1;i<=12;i++)out.push(point(u0,v1-(v1-v0)*i/12));return out.map((p,i)=>`${i?'L':'M'}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join('')+'Z';};
  const outline=strip(0,0,240,155);
  const shadow=path(g,outline,'#203f35','none');shadow.setAttribute('transform','translate(2 7)');shadow.setAttribute('opacity','.12');
  const backing=path(g,outline,'#6e8170','#526d62',1.5);backing.setAttribute('transform','translate(0 3)');
  path(g,outline,'#eee2c7','#b4a88e',1.3);
  for(let u=14;u<232;u+=35)path(g,strip(u,0,u+12,155),'#76a29a','none').setAttribute('opacity','.63');
  for(let v=12;v<149;v+=31)path(g,strip(0,v,240,v+11),'#76a29a','none').setAttribute('opacity','.53');
  for(let u=10;u<237;u+=35)path(g,strip(u,0,u+1.2,155),'#c4a260','none');
  for(let v=8;v<153;v+=31)path(g,strip(0,v,240,v+1.2),'#c4a260','none');
  const hem=path(g,strip(5,5,235,150),'none','#b66d7b',2.6);hem.setAttribute('stroke-dasharray','1 3');
  // Creases have a narrow light crest and a soft darker underside, not rigid edges.
  for(const [u,v]of [[129,107],[192,130]]){const a=point(u-36,v-12),b=point(u,v),c=point(u+31,v+9);
   path(g,`M${a.x} ${a.y}Q${b.x} ${b.y-7} ${c.x} ${c.y}`,'none','#647e70',4).setAttribute('opacity','.2');
   path(g,`M${a.x} ${a.y-2}Q${b.x} ${b.y-9} ${c.x} ${c.y-2}`,'none','#fff5db',2).setAttribute('opacity','.7');}
  for(let u=8;u<237;u+=11){const a=point(u,155);path(g,`M${a.x} ${a.y}q-1 4 3 7m-1-5q2 3 1 6`,'none','#d9cbb0',1.3);}
  const a=point(198,155),b=point(240,109),c=point(240,155);
  path(g,`M${a.x} ${a.y}Q${c.x-9} ${c.y+6} ${c.x+1} ${c.y+2}L${b.x} ${b.y}Q${b.x-15} ${b.y+13} ${a.x} ${a.y}Z`,'#b7c9b4','#6d8c7f',1.1);
  path(g,`M${a.x} ${a.y}Q${b.x-15} ${b.y+13} ${b.x} ${b.y}`,'none','#fff0d0',2.3);
 }
 return true;
}
