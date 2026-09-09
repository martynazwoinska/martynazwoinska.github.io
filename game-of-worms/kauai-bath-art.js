// Original constructions. References and regional evidence: kauai-briggsae.md.
export const GINGER='qg130-shampoo-ginger',RINSE='qg130-jug-basin',TOWEL='qg130-bath-towels';
export const bathFamilies=[GINGER,RINSE,TOWEL];
export const bathLayouts={
  [GINGER]:{primary:[225,40,.78,-17],companion:[115,177,.66,0]},
  [RINSE]:{primary:[400,161,.78,0],companion:[31,279,.80,0]},
  [TOWEL]:{primary:[0,0,1,0],companion:[-28,82,.43,0]}
};
export const C={ink:'#344751',cream:'#fff5dc',edge:'#cbc6ae',berry:'#ad4765',rose:'#d67b91',
  pale:'#edc4ce',violet:'#75628f',leaf:'#63845a',water:'#a5d9e4',shadow:'#788da0'};
export function add(g,t,a={}){const n=document.createElementNS('http://www.w3.org/2000/svg',t);for(const[k,v]of Object.entries(a))n.setAttribute(k,v);g.appendChild(n);return n;}
export const p=(g,d,fill='none',stroke=C.ink,w=1.5)=>add(g,'path',{d,fill,stroke,'stroke-width':w,'stroke-linecap':'round','stroke-linejoin':'round'});
export const e=(g,x,y,rx,ry,fill,stroke=C.ink,w=1.3)=>add(g,'ellipse',{cx:x,cy:y,rx,ry,fill,stroke,'stroke-width':w});
export const part=(g,k,a={})=>add(g,'g',{['data-bath-'+k]:'',...a});
function gradient(g,id,stops){const n=add(add(g,'defs'),'linearGradient',{id,x1:0,y1:0,x2:1,y2:.2});stops.forEach(([offset,color])=>add(n,'stop',{offset,'stop-color':color}));return `url(#${id})`;}
function clipped(g,id,d){p(add(add(g,'defs'),'clipPath',{id}),d,'white','none');return add(g,'g',{'clip-path':`url(#${id})`});}
function ginger(g){
  const stalk=part(g,'stalk');p(stalk,'M-3 19Q2 38-3 55L4 56Q9 38 5 18Z',C.leaf,C.ink,1.4);
  p(stalk,'M0 29L3 48','none','#aec58a',1.6);
  const cone=part(g,'cone');
  const d='M-3-57C-17-56-24-41-24-23L-24 4C-24 18-14 28 0 29C15 27 25 17 25 3L24-25C23-44 11-56-3-57Z';
  const fill=gradient(cone,'bath-ginger-red',[[0,'#8a334e'],[.24,C.berry],[.52,'#e87b7c'],[.8,'#c5516b'],[1,'#8a334e']]);
  p(cone,d,fill,'#813b50',1.7);
  const bracts=clipped(cone,'bath-ginger-clip',d);
  // Overlapping cupped bracts, not scales pasted outside the cone silhouette.
  for(let row=0;row<8;row++){
    const y=-49+row*10.1,wide=13+Math.sin((row+.3)/8*Math.PI)*17;
    for(let col=-1;col<=1;col++){
      const x=col*wide*.72+(row%2?5:-2),w=wide*.53;
      p(bracts,`M${x-w} ${y}Q${x} ${y+8} ${x+w} ${y-1}Q${x+w+1} ${y+11} ${x+2} ${y+14}Q${x-w} ${y+12} ${x-w} ${y}`,
        col===1?'#b94c65':col===-1?'#ba4e65':'#dc6e79','#a3405c',.75);
      p(bracts,`M${x-w+2} ${y+1}Q${x} ${y+7} ${x+w-2} ${y}`,'none','#f4a1a0',1.05);
    }
  }
  p(cone,'M-8-49Q-2-55 4-50Q9-45 3-41Q-3-40-8-49Z','#d97686','#963952',.8);
  const shine=part(cone,'gel-glint');p(shine,'M-11-31Q-15-18-13-7','none','#ffd5bd',1.5);
  e(shine,-12,-3,1.4,2.3,'#fff4d5','none');
}
function bowl(g){
  const bowl=part(g,'bowl');
  const fill=gradient(bowl,'bath-bowl',[[0,'#9384a9'],[.3,'#c1b7d5'],[.64,'#e1d7e8'],[1,C.violet]]);
  e(bowl,0,25,24,4,'#25364122','none');
  p(bowl,'M-36-3Q-30 28 0 30Q28 28 36-3Z',fill,C.ink,1.7);
  e(bowl,0,-3,36,12,C.cream,C.ink,1.7);e(bowl,0,-2,30,8,'#b4a7ba','#80728d',1);
  const water=part(bowl,'bowl-liquid',{opacity:.18});e(water,0,-1,28,6,'#d4eac6','none');p(water,'M-18-2Q-7-6 6-4','none','#fff8dd',1.8);
  p(bowl,'M-32 2Q-28 19-13 23','none','#f6ede4',2.5);p(bowl,'M-26 13Q0 28 26 13','none',C.violet,1);
  p(bowl,'M-33-6Q-11-16 15-10','none','#fffaec',2.2);
}
export function jugDrawing(g){
  const jug=part(g,'jug');
  const fill=gradient(jug,'bath-jug-enamel',[[0,'#b0bbc1'],[.2,'#f5f0df'],[.5,'#fff8e6'],[.83,'#dadfda'],[1,'#8fa2ad']]);
  // A clear handle opening, separate attachment lugs and rolled metal edges.
  p(jug,'M24-31C66-40 63 25 30 25L29 14C48 16 50-22 27-20Z',C.violet,C.ink,1.9);
  p(jug,'M35-27C51-23 51 5 37 15','none','#b5a5ce',2);
  e(jug,0,55,34,5,'#23343e26','none');
  p(jug,'M-33-44Q-10-39 17-47L29-39Q18-8 31 11Q44 33 24 48Q0 59-29 47Q-42 37-32 13Q-24-8-29-28L-43-38Z',fill,C.ink,1.9);
  p(jug,'M-43-38Q-15-49 17-47L29-39Q9-27-13-32Q-27-29-43-38Z','#788e9b',C.violet,2.4);
  p(jug,'M-35-38Q-17-43 13-42Q0-34-14-35Z',C.water,'none');
  p(jug,'M-29-26Q-21-8-29 18Q-36 38-20 45','none','#fffdf5',3.2);
  p(jug,'M-35 20Q-5 34 33 20L35 27Q8 42-36 29Z','#b6a0c7',C.violet,.8);
  p(jug,'M-28 48Q-1 57 25 47L24 52Q-2 61-27 52Z',C.violet,C.ink,1.3);
  p(jug,'M-24 51Q-1 57 21 51','none','#c5b8d2',1.2);
  p(jug,'M21-27L27-28M29 16L34 17','none',C.ink,2.3);
  return jug;
}
function basin(g){
  e(g,0,34,66,7,'#1a2c3724','none');
  const shell=part(g,'basin-shell');
  const fill=gradient(shell,'bath-basin-enamel',[[0,'#899aac'],[.25,'#eeeee4'],[.64,C.cream],[1,'#8c9aaa']]);
  p(shell,'M-68-7Q-57 29-31 34Q0 43 34 32Q59 23 69-7Z',fill,C.ink,1.8);
  e(shell,0,-7,69,22,C.cream,C.violet,2.8);e(shell,0,-7,61,16,'#879bb1',C.violet,.9);
  const water=part(g,'basin-water');e(water,0,-5,58,13,C.water,'#6cabbc',.8);
  p(water,'M-42-7Q-22-17 9-13M25-8Q40-5 46-7','none','#eaf9f5',1.8);
  p(g,'M-67-5Q-61 10-49 15Q-3 35 51 14Q64 5 69-7','none',C.violet,3);
  p(g,'M-54 17Q-12 37 35 26','none','#fffdf1',2.3);
  p(g,'M-42 32Q-4 44 38 30','none','#8c839f',1.5);
  // A short open-handled dipper rests across the back rim for the male's turn.
  const dipper=part(g,'dipper',{transform:'translate(36 -27) rotate(22)'});
  p(dipper,'M12-4L46-7Q52-5 48-1L13 5Z',C.cream,C.ink,1.4);
  p(dipper,'M-18-2Q-19 18 0 20Q18 19 19-2Z','#d2c4de',C.ink,1.5);
  e(dipper,0,-2,19,7,C.cream,C.violet,1.7);e(dipper,0,-2,14,4,C.water,'#94a3b5',.7);
  p(dipper,'M-14 7Q-7 16 4 15','none','white',1.6);
}
export function faceCloth(g,male=false){
  const d=male?'M-25-11Q-8-22 11-14L27-8Q22 3 24 17Q4 12-12 24Q-15 6-25-11Z':'M-29-16Q-9-22 18-18L30 13Q9 8-17 22Q-22 3-29-16Z';
  p(g,d,C.cream,C.ink,1.3);
  p(g,male?'M-21-7Q-11 5-8 19M14-10Q22-2 20 13':'M-24-12Q-17 5-14 15M20-12L26 10','none',C.berry,2.8);
  p(g,'M-7-10Q-1 0-4 9M7-9Q13 0 13 7','none','#d6cbb4',1.2);
}
function towel(g,male){
  const towel=part(g,'towel');
  const d=male?'M269 89Q282 113 273 137Q241 139 226 151L211 176Q187 175 171 161Q185 129 209 111Q233 96 269 89Z':'M284 88Q297 110 286 137Q250 130 227 158Q215 175 211 192Q182 191 162 178Q178 137 205 115Q239 90 284 88Z';
  const fill=gradient(towel,'bath-towel-'+(male?'m':'h'),[[0,'#ae7c8e'],[.3,'#ead1cc'],[.58,C.cream],[.8,'#e1c8c0'],[1,'#b9939c']]);
  p(towel,d,fill,C.ink,1.5);const detail=clipped(towel,'bath-towel-clip-'+(male?'m':'h'),d);
  for(let i=0;i<24;i++){
    const x=169+(i%8)*16,y=106+Math.floor(i/8)*29;
    p(detail,`M${x} ${y}q-3 0-2 3m7 3q-2-2-3 1`,'none','#bdaea355',.8);
  }
  p(detail,male?'M267 94Q230 102 205 124Q183 146 178 163':'M278 94Q239 96 209 124Q179 153 170 180','none',C.berry,6);
  p(detail,male?'M266 101Q229 110 213 126Q192 146 188 169':'M281 103Q243 106 216 132Q190 160 181 183','none','#df9fab',2.6);
  p(detail,male?'M273 136Q237 137 225 158L216 184':'M286 132Q253 128 232 157L216 198','none','#a66d82',2);
  p(detail,male?'M204 144Q200 153 205 167M224 127Q218 139 222 148':'M202 150Q200 171 203 186M243 123Q234 132 234 144','none','#aa9698',1.4);
  const flap=part(towel,'towel-flap');
  p(flap,male?'M260 98Q264 109 259 121L237 139L244 121Z':'M275 95Q283 110 275 125L250 143L256 119Z',C.cream,C.ink,1.1);
  p(flap,male?'M258 106L244 126':'M274 104L257 133','none',C.berry,3.1);
  p(detail,male?'M170 160Q195 182 215 170':'M164 178Q187 195 211 189','none',C.berry,4.6);
  p(detail,male?'M174 160Q194 176 212 169':'M167 178Q188 190 207 187','none','#fff9e7',1.4);
  p(detail,male?'M263 94Q272 112 267 129':'M280 92Q290 111 282 128','none','#fff8e5',2.4);
}
export function drawKauaiBath(g,item,male){
  if(!bathFamilies.includes(item.family))return false;
  g.setAttribute('data-bath-art',male?'companion':'primary');
  g.setAttribute('style','transform-box:view-box;transform-origin:0 0');
  if(item.family===GINGER)male?bowl(g):ginger(g);
  if(item.family===RINSE)male?basin(g):jugDrawing(g);
  if(item.family===TOWEL)towel(g,male);
  return true;
}
