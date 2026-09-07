// Original unbranded café props. Folded linen hems and baked cookie edges
// supply structure without labels or copied product artwork.
const NS='http://www.w3.org/2000/svg',ink='#263f48',ivory='#fffaf0';
const add=(g,tag,a={})=>{const n=document.createElementNS(NS,tag);Object.entries(a).forEach(([k,v])=>n.setAttribute(k,v));g.appendChild(n);return n;};
const p=(g,d,fill,stroke=ink,w=2)=>add(g,'path',{d,fill,stroke,'stroke-width':w,'stroke-linejoin':'round','stroke-linecap':'round'});
const e=(g,x,y,rx,ry,fill,stroke=ink,w=2)=>add(g,'ellipse',{cx:x,cy:y,rx,ry,fill,stroke,'stroke-width':w});
export const COOKIE_WHOLE='M-34-11Q-33-28-18-31Q-1-39 16-29Q33-24 35-8Q40 7 26 20Q9 31-10 27Q-31 25-36 9Q-41 0-34-11Z';
export const COOKIE_BITTEN='M-34-11Q-33-28-18-31Q-1-39 8-32Q3-22 14-20Q10-9 23-8Q20 3 36 4Q34 15 26 20Q9 31-10 27Q-31 25-36 9Q-41 0-34-11Z';
function cookie(g,x,y,angle,index) {
  const n=add(g,'g',{'data-cafe-cookie':index,transform:`translate(${x} ${y}) rotate(${angle})`});
  p(n,'M-36 0Q-25 30-2 32Q23 32 35 13L35 4Q7 21-35-8Z','#a86e39',ink,1.8).setAttribute('data-cookie-edge','');
  p(n,COOKIE_WHOLE,'#dfb77d',ink,1.8).setAttribute('data-cookie-face','');
  p(n,'M-29-12Q-25-28-8-28Q-2-29 3-26','none','#f9dc9f',2.8);
  for(const [cx,cy,r] of [[-20,-10,4],[-9,9,4.8],[-1,-20,3.6],[16,11,4.2],[-25,8,2.6]]) {
    p(n,`M${cx-r} ${cy}l${r*.7} ${-r}l${r*1.2} ${r*.4}l${-r*.2} ${r*1.2}l${-r} ${r*.5}Z`,'#603d35','#8f5d40',.8);
  }
  for(const [cx,cy] of [[-12,-14],[-3,-4],[5,17],[-22,16],[4,5]])e(n,cx,cy,1.4,1,'#b5834d','none');
}
export function drawCafeProps(g,item,male) {
  if(item.family==='canberra-flat-white-cafe' && !male) {
    g.classList.add('act-accessory','canberra-cafe-primary');
    // A low porcelain saucer supports the foot ring. The cup lifts separately.
    e(g,-3,79,99,15,'#39404a','none').setAttribute('opacity','.16');
    p(g,'M-106 60Q-89 91-5 94Q77 92 98 62Z','#b5a0ac',ink,2.2);
    e(g,-5,60,104,28,'#f7f0e8',ink,2.4);
    e(g,-5,61,75,17,'#e7dcd4','#baaa9e',1.4);
    p(g,'M-99 61Q-76 79-25 80','none','#fffdf6',3);
    // A silver teaspoon lies across the near edge, not through the cup.
    p(g,'M-89 79Q-56 88-22 88','none','#667784',5);
    p(g,'M-88 78Q-55 85-23 87','none','#e1e8e9',2);
    e(g,-97,76,13,6,'#a5b5bd','#526775',1.4);
    p(g,'M-106 75Q-98 70-91 75','none','#edf4f4',1.4);
    const cup=add(g,'g',{'data-cafe-cup':''});
    // Closed inner/outer paths leave a genuine opening through the handle.
    p(cup,'M61-17C113-30 119-8 112 19C107 40 88 47 64 40L67 25C84 31 94 22 97 9C101-6 91-12 70-3ZM73-4C90-10 103-5 98 11C95 24 85 31 70 25Z','#98576e',ink,2.7).setAttribute('fill-rule','evenodd');
    p(cup,'M77-13C101-21 112-5 104 15','none','#d4a4b5',3);
    e(cup,0,66,36,9,'#f0e4da',ink,2);
    p(cup,'M-29 69Q0 77 29 69','none','#c5afa9',1.5);
    p(cup,'M-74-28C-72 12-64 46-43 58C-20 74 24 75 46 56C66 40 72 7 74-28Z','#a35d77',ink,2.7);
    p(cup,'M41-25C58-24 64-26 72-26C70 16 59 48 43 58C30 69 8 72-9 69C26 61 43 33 41-25Z','#78465f','none');
    p(cup,'M-60-17C-59 9-54 30-45 42C-40 48-34 47-33 42C-45 23-48 1-48-17Z','#d49aaf','none');
    p(cup,'M-54-9Q-52 16-46 25','none','#f1c7cf',2.2);
    p(cup,'M-36 57Q-1 71 28 58','none','#c98c9f',1.7);
    e(cup,0,-28,76,25,ivory,ink,2.5);
    e(cup,0,-28,65,18,'#b98553','#8d6047',1.5);
    e(cup,0,-26,59,13,'#d6b383','none');
    p(cup,'M-59-30Q-46-41-23-41','none','#e7c698',1.4);
    // Microfoam tulip in perspective, contained within the coffee surface.
    p(cup,'M-31-29C-34-35-23-38-13-34C-6-40 10-39 17-34C32-37 40-29 27-23C14-17-7-17-23-21C-32-23-36-26-31-29Z','#fff3d6','none');
    p(cup,'M-21-29Q-7-24 8-28Q19-31 26-27M-12-24Q1-21 14-24','none','#ba8554',1.5);
    p(cup,'M-3-34Q-8-23 17-20','none','#fffaf0',2.4);
    p(cup,'M-63-36Q-25-51 26-44','none','#ffffff',2.1);
    p(cup,'M-73-24Q-53-7-17-6','none','#ded4c7',1.4);
    const steam=add(cup,'g',{class:'cafe-steam-fine','pointer-events':'none'});
    p(steam,'M-22-58C-35-72-15-80-23-94M14-59C2-73 25-80 17-101','none',ivory,2.2).setAttribute('opacity','.65');
    return true;
  }
  if(item.family==='canberra-flat-white-cafe' && male) {
    g.classList.add('act-accessory','canberra-biscuits');
    e(g,0,24,99,25,'#bfaeb0','none');
    p(g,'M-100 8Q0-19 100 8L88 34Q0 57-88 34Z','#9f6178',ink,2.8);
    e(g,0,8,100,28,'#fff0de',ink,2.4);
    e(g,0,10,78,18,'#e8d4ba','#bd8e69',1.6);
    cookie(g,-42,0,-18,0);cookie(g,39,-1,13,1);cookie(g,0,-27,-6,2);
    return true;
  }
  if(item.family!=='canberra-linen-napkins')return false;
  g.classList.add('act-accessory','canberra-napkin');
  const cloth=add(g,'g',{'data-cafe-napkin':''});
  if(male) {
    p(cloth,'M-64-35Q-34-31-9-43Q16-49 43-33Q37-8 48 12Q56 29 45 52Q25 43 6 53Q-19 61-39 47Q-51 36-70 38Q-58 5-64-35Z',ivory,ink,2.3);
    p(cloth,'M14-38Q1-8 16 21Q23 39 6 53Q31 45 29 25Q9-4 28-36Z','#ddd4dc','none');
    p(cloth,'M-47-29Q-39-1-48 22Q-52 32-39 47Q-41 27-33 9Q-29-13-35-32Z','#e9e1e7','none');
    p(cloth,'M-55-23Q-28-22-8-33Q13-40 32-26M-60 29Q-42 27-33 39Q-18 52 4 44Q24 35 39 42','none','#9c5471',2.8);
    p(cloth,'M-53-13L-50 5M24-19Q19-5 24 9M-23 29L-9 34','none','#c6bdc6',1.2);
  } else {
    p(cloth,'M-86-42Q-58-33-25-43Q9-54 37-40Q61-31 82-41Q69-12 79 13Q85 35 75 57Q48 48 22 64Q0 73-26 57Q-51 44-82 56Q-72 20-82-2Q-92-22-86-42Z',ivory,ink,2.4);
    p(cloth,'M-25-43Q-42-9-25 20Q-11 45-26 57Q-8 61-6 39Q-4 22-17 2Q-31-21-10-46Z','#ded5de','none');
    p(cloth,'M37-40Q22-8 44 16Q59 33 48 53Q67 49 61 23Q35-7 51-36Z','#e6dde5','none');
    p(cloth,'M-74-28Q-52-20-24-30Q8-41 35-28Q54-21 68-27M-68 40Q-44 32-23 44Q1 60 21 51Q47 35 65 43','none','#9c5471',3.1);
    p(cloth,'M-70-15Q-75 2-67 19M-20-20Q-28-7-20 9M39-16Q37-1 47 10M6 36L20 41','none','#c9bfca',1.4);
    p(cloth,'M-86-42Q-91-24-82-16Q-76-14-73-18Q-86-24-86-42Z','#e2d5df',ink,1.2);
  }
  const stain=add(cloth,'g',{'data-cafe-stain':'',opacity:0});
  e(stain,male?-20:30,10,male?13:19,7,'#a77e5c','none');
  e(stain,male?-7:48,17,4,3,'#b58c6d','none');
  return true;
}
