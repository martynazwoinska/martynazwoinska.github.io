// Original flight poses, informed by Australian Museum / Museums Victoria
// cockatoo references. No source photograph or artwork is traced.
const ink='#263f48',white='#fffaf0',shade='#dedfd7',cream='#f0ebd7',yellow='#e9cd66';
const add=(g,tag,attrs={})=>{
  const n=document.createElementNS('http://www.w3.org/2000/svg',tag);
  Object.entries(attrs).forEach(([k,v])=>n.setAttribute(k,v));g.appendChild(n);return n;
};
const p=(g,d,fill,stroke=ink,w=2)=>add(g,'path',{d,fill,stroke,'stroke-width':w,'stroke-linejoin':'round','stroke-linecap':'round'});
const l=(g,d,stroke='#b1b6ad',w=1.3)=>p(g,d,'none',stroke,w);
const e=(g,x,y,rx,ry,fill,stroke=ink,w=1.5)=>add(g,'ellipse',{cx:x,cy:y,rx,ry,fill,stroke,'stroke-width':w});

function primary(g) {
  // The far wing is foreshortened and sits behind the torso.
  const far=add(g,'g',{class:'cockatoo-flight-wing far'});
  p(far,'M-6 2Q9-51 55-88Q70-99 86-102Q82-88 66-71L79-80Q79-68 62-54L72-60Q70-47 53-36L62-39Q57-24 39-18L43-17Q30 0 9 11Z',shade);
  p(far,'M8-5Q28-51 65-78Q41-44 35-20L17 5Z',cream,'none');
  for(const d of ['M20-14L62-70','M28-11L62-51','M34-10L52-33'])l(far,d);
  // A narrow trailing tail follows the line of flight.
  p(g,'M-31 14Q-64 25-102 53L-91 62L-77 59L-69 65L-51 51L-46 54L-18 30Z',white);
  p(g,'M-37 27L-91 56L-80 58L-27 34Z',yellow,'none');
  l(g,'M-30 26L-91 58M-24 31L-68 59');
  p(g,'M-43 0Q-27-27 9-25Q35-27 50-10Q56 7 38 23Q8 47-23 33Q-43 24-43 0Z',white);
  p(g,'M-35 20Q-3 38 35 17Q17 41-10 37Q-28 33-35 20Z',shade,'none');
  const near=add(g,'g',{class:'cockatoo-flight-wing near'});
  p(near,'M6-4Q-19-57-66-82Q-94-96-125-92Q-123-80-100-65L-119-73Q-117-61-94-48L-109-53Q-103-38-79-31L-94-31Q-86-18-64-16L-77-13Q-63 0-40 1L-45 7Q-19 13 6-4Z',white);
  p(near,'M-3-5Q-26-51-76-72Q-54-37-23-16L-11-3Z',cream,'none');
  p(near,'M-9-12Q-33-40-63-47Q-39-16-18-7Z',yellow,'none');
  for(const d of ['M-25-18L-102-81','M-31-12L-98-59','M-33-7L-84-39','M-33-2L-69-23'])l(near,d);
  // Neck and face overlap the near shoulder, with a proper hooked bill.
  p(g,'M21-19Q23-45 44-50Q65-52 70-33Q75-12 57 0Q37 9 23-5Z',white);
  p(g,'M31-45Q15-60 14-72Q28-70 39-49Q28-75 38-80Q51-65 48-49Q51-74 61-71Q64-57 57-44Z',yellow);
  e(g,57,-30,6.2,6.2,'#e2e3d8','none');
  e(g,58,-30,3.5,4,ink,'none');e(g,59,-31,1,1,white,'none');
  p(g,'M67-30Q87-33 91-20Q91-6 78 0Q83-14 69-14Z','#536066',ink,1.8);
  p(g,'M70-13Q81-14 82-6Q74-4 67-9Z','#3c484e',ink,1.4);
  l(g,'M29-3Q36 3 42 0','#b6bdb5');
  // Bent legs and curled toes in free flight.
  l(g,'M8 31L-1 38L8 42M-3 38L-8 42M10 42L15 39M26 26L19 34L28 37M20 34L15 38M28 37L33 34','#626967',2.2);
  add(g,'g',{'data-cafe-beak':'',transform:'translate(83 -7)'});
}

function companion(g) {
  // A different bank: one raised far wing, one broad near wing swept down.
  const far=add(g,'g',{class:'cockatoo-flight-wing far'});
  p(far,'M-5-8Q15-56 60-88Q78-102 102-98Q91-79 76-68L92-75Q88-57 68-48L80-50Q75-35 56-29L64-27Q48-10 16 5Z',shade);
  p(far,'M8-6Q33-51 77-82Q54-51 45-26L19-3Z',cream,'none');
  l(far,'M26-18L76-74M35-15L72-52M42-12L59-34');
  p(g,'M30 19Q68 28 103 57L94 64L78 58L83 68L66 65L46 47L46 53L22 33Z',white);
  p(g,'M38 29L94 60L83 61L31 34Z',yellow,'none');
  l(g,'M42 31L93 61M36 34L73 62');
  p(g,'M-37-14Q-9-37 19-19Q48-6 43 17Q38 44 9 43Q-22 40-42 16Q-51-1-37-14Z',white);
  p(g,'M-33 20Q-6 37 34 22Q25 48 0 40Q-19 36-33 20Z',shade,'none');
  const near=add(g,'g',{class:'cockatoo-flight-wing near'});
  p(near,'M-5-3Q26-2 60 14Q88 28 107 54L94 59L79 47L88 65L72 67L56 49L65 71L49 70L33 47L38 65Q19 54 12 37Q0 24-5-3Z',white);
  p(near,'M5 7Q37 11 76 45Q41 32 22 32Z',cream,'none');
  p(near,'M12 16Q34 20 52 38L28 31Z',yellow,'none');
  l(near,'M27 23L94 54M22 29L74 61M17 32L53 64');
  p(g,'M-26-8Q-50 5-61-10Q-74-27-59-43Q-41-61-25-45Q-11-31-26-8Z',white);
  p(g,'M-51-46Q-27-64-8-61Q-16-49-35-42Q-8-55 2-46Q-11-36-27-36Q-1-41 1-30Q-17-25-28-29Z',yellow);
  e(g,-54,-26,6,6,'#e2e3d8','none');e(g,-55,-26,3.4,3.9,ink,'none');e(g,-56,-27,1,1,white,'none');
  p(g,'M-63-26Q-85-30-89-17Q-90-3-77 3Q-82-10-67-10Z','#536066',ink,1.8);
  p(g,'M-67-10Q-79-10-80-3Q-72 1-64-6Z','#3c484e',ink,1.4);
  l(g,'M-19 31L-10 39L-20 42M-10 39L-4 42M-20 42L-24 39M2 39L11 44L3 48M11 44L17 46','#626967',2.1);
  add(g,'g',{'data-cafe-beak':'',transform:'translate(-82 -6)'});
}

export function drawFlyingCockatoos(group,item,male) {
  if(item.family!=='oconnor-cockatoo-cafe-raid')return false;
  group.classList.add('act-accessory','cockatoo-airborne',male?'cockatoo-airborne-companion':'cockatoo-airborne-primary');
  const bird=add(group,'g',{class:'cockatoo-flight-bird'});
  const pose=add(bird,'g',{transform:male?'translate(-6 -40) rotate(9)':'translate(8 -16) rotate(-12)'});
  (male?companion:primary)(pose);return true;
}
