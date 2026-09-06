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
