const NS='http://www.w3.org/2000/svg';
const add=(g,tag,attrs)=>{const n=document.createElementNS(NS,tag);for(const [k,v] of Object.entries(attrs))n.setAttribute(k,v);g.append(n);return n;};
const ink='#19464a';
function shape(g,d,fill,flex=false,width=1.35){return add(g,'path',{d,fill,stroke:ink,'stroke-width':width,'stroke-linejoin':'round',...(flex?{'data-gua-flex':''}:{})});}
function vein(g,d,stroke='#85d2b6',width=1.05,flex=false){return add(g,'path',{d,fill:'none',stroke,'stroke-width':width,'stroke-linecap':'round',...(flex?{'data-gua-flex':''}:{})});}

// Keep feather geometry in body coordinates so every layer bends with the vest.
function plume(g,x,y,dx,dy,width,color,flex=false,highlight='#91d0b5'){
  const length=Math.hypot(dx,dy),nx=-dy/length,ny=dx/length;
  const p=(t,w=0)=>`${(x+dx*t+nx*w).toFixed(2)} ${(y+dy*t+ny*w).toFixed(2)}`;
  shape(g,`M${p(0)}C${p(.05,-width)} ${p(.55,-width)} ${p(1)}C${p(.66,width*.65)} ${p(.1,width)} ${p(0)}Z`,color,flex,1);
  vein(g,`M${p(.15)}Q${p(.5,-width*.14)} ${p(.87)}`,highlight,.75,flex);
}
function mantle(g,male){
  const rows=male?[
    [[228,107,-14,18],[242,104,-13,20]],
    [[208,125,-11,21],[222,123,-10,22]],
    [[189,148,-5,23],[204,145,-6,23]],
    [[178,176,0,22],[191,173,0,25]]
  ]:[
    [[229,101,-13,18],[242,99,-13,21],[253,101,-10,22]],
    [[211,118,-12,22],[224,119,-13,23],[239,118,-13,24]],
    [[193,141,-7,24],[206,140,-8,25],[219,139,-9,26]],
    [[179,167,-1,25],[192,163,-3,28],[205,160,-4,27]],
    [[171,191,5,21],[184,188,5,23],[197,186,2,23]]
  ];
  // Lay the lower course first, then overlap it with the course above.
  for(let r=rows.length-1;r>=0;r--)rows[r].forEach(([x,y,dx,dy],i)=>plume(g,x,y,dx,dy,male?8:7.5,['#318b73','#459e80','#247363'][(r+i)%3],true));
}
function gorget(g,male){
  const rows=male?[[[267,116],[282,118]],[[263,106],[278,108],[292,109]],[[269,97],[285,98]]]
    :[[[268,120],[281,123],[294,121]],[[260,109],[273,111],[287,112],[300,110]],[[268,98],[281,99],[294,98]]];
  rows.forEach((row,r)=>row.forEach(([x,y],i)=>plume(g,x,y,3,14,male?8.5:8,['#ac508b','#ca78ad','#964079'][(r+i)%3],true,'#e4a4c6')));
}

// Original feather-work costumes informed by hummingbird anatomy; no source art copied.
// Keep the existing movable artwork wrapper. Its inverse lets the clothes be
// tailored in the same coordinates as the worm, including the smaller companion.
export function drawGuadeloupeCostume(group,male){
  group.setAttribute('style','transform-box:view-box;transform-origin:0 0');
  const rig=add(group,'g',{'data-gua-costume-rig':'',transform:male
    ?'scale(2.857142857) rotate(-26) translate(-92 -173) translate(-28 82) scale(.43)'
    :'scale(2.325581395) rotate(-28) translate(-264 -184)'});
  const wing=(x,y,side)=>add(rig,'g',{'data-gua-wing':side,'data-hinge-x':x,'data-hinge-y':y,transform:`translate(${x} ${y})`});
  if(male){
    const far=wing(237,126,-1);
    shape(far,'M0 0C-18-14-32-42-39-69C-16-58 7-27 10-5Z','#245f64');
    shape(far,'M0-4C-14-19-25-37-32-55C-16-43-2-22 5-5Z','#369b87');
    vein(far,'M1-6L-28-51M-1-9L-16-44');
    vein(far,'M-7-18L-20-23M-11-27L-25-34M-15-36L-29-43','#68bba1',1);
    shape(rig,'M159 195C166 150 197 112 237 96C260 87 280 89 301 96L303 131C275 143 258 131 239 139C214 149 207 173 205 200Q191 223 170 211Z','#206a61',true);
    mantle(rig,true);
    shape(rig,'M257 93Q279 88 301 96L303 126Q296 135 290 129Q282 137 276 130Q264 133 256 125L245 111Z','#762f66',true);
    gorget(rig,true);
    shape(rig,'M167 196Q155 211 144 218L118 239Q148 239 170 224L155 244Q185 231 194 207Z','#245b71',true);
    vein(rig,'M179 208L145 230M172 202L135 229','#6db9ba',1.25,true);
    plume(rig,172,207,-43,27,6,'#3b8792',true);
    plume(rig,183,208,-27,32,6,'#24697f',true);
    const near=wing(218,152,1);
    shape(near,'M-2-6C26-10 55 1 86 37C53 33 23 24-6 11Z','#1e7970');
    [
      ['M8 4Q46 5 84 36Q55 39 9 12Z','#247f85'],
      ['M7 6Q42 16 71 47Q39 39 2 14Z','#245f79'],
      ['M2 8Q32 22 54 52Q24 38-3 16Z','#328c94'],
      ['M-3 7Q17 22 34 50Q11 38-8 17Z','#3eaa98']
    ].forEach(([d,c])=>shape(near,d,c));
    shape(near,'M-8-8Q14-14 39 8L23 17Q9 8-4 18Q-15 7-8-8Z','#49ac8c');
    [[3,4,42,25,6],[0,1,32,24,6],[-3,-2,23,22,6],[0,-7,18,13,5]].forEach(([x,y,dx,dy,w],i)=>plume(near,x,y,dx,dy,w,i%2?'#53b591':'#2d927e'));
    vein(near,'M30 16L73 33M21 22L61 40M11 24L46 44','#83c6bd',1);
    vein(rig,'M171 187Q182 149 220 121M170 192Q184 201 200 198','#d8c48a',1.5,true);
    shape(rig,'M332 82Q344 77 354 80L389 87Q369 90 349 87L335 90Z','#2c4149');
    vein(rig,'M349 82L383 87','#d4b980',1.3);
    vein(rig,'M334 83Q328 85 327 92','#cdb988',2);
  }else{
    const far=wing(232,126,-1);
    shape(far,'M5 6C-13-15-29-55-65-91C-62-54-42-16-9 13Z','#245b65');
    [
      ['M-5 3Q-37-23-64-89Q-33-65 5-1Z','#1c7467'],
      ['M-6 7Q-46-13-62-67Q-30-46 6 3Z','#269881'],
      ['M-9 13Q-45-1-56-44Q-25-30 8 6Z','#42ac91']
    ].forEach(([d,c])=>shape(far,d,c));
    vein(far,'M-7 3Q-33-26-53-65M-11 8L-45-34');
    vein(far,'M-18-14L-32-18M-26-27L-41-32M-34-40L-48-48M-39-20L-43-29','#73baa5',1);
    shape(rig,'M157 197C162 150 196 107 238 93C260 85 281 89 305 95L307 132C280 144 260 130 240 138C214 147 207 176 205 205L191 222L181 213L171 220Z','#226e64',true);
    mantle(rig,false);
    shape(rig,'M261 92Q282 88 305 95L307 124Q302 134 296 130Q292 138 285 134Q279 140 273 134Q266 139 261 131Q253 130 247 111Z','#74325f',true);
    gorget(rig,false);
    shape(rig,'M168 193Q152 215 116 245Q143 247 165 228L142 256Q173 245 185 220L175 246Q202 224 197 202Z','#27566d',true);
    vein(rig,'M175 205L136 240M184 209L158 244M188 214L185 229','#6dbbbc',1.2,true);
    plume(rig,170,207,-47,34,6,'#367f8c',true);
    plume(rig,182,207,-35,43,6,'#286f86',true);
    plume(rig,193,208,-14,32,5,'#40949a',true);
    const near=wing(218,151,1);
    shape(near,'M-7-7Q20-17 49 18Q72 47 90 97Q55 87 27 56Q4 32-9 9Z','#156c66');
    [
      ['M14 9Q50 36 88 96Q59 84 22 30Z','#235b75'],
      ['M12 16Q42 42 75 103Q46 84 15 32Z','#257789'],
      ['M7 20Q33 44 60 101Q35 83 10 36Z','#2b8e93'],
      ['M0 18Q22 44 44 94Q22 80 3 35Z','#329d98'],
      ['M-5 12Q10 34 25 76Q9 65-4 34Z','#43b198']
    ].forEach(([d,c])=>shape(near,d,c));
    shape(near,'M-9-9Q11-18 36 6L39 22Q24 13 16 23L9 16Q0 26-10 11Z','#51b692');
    // Layered coverts hide the bases of the longer flight feathers.
    [[14,14,35,41,7],[6,14,26,42,7],[-2,10,18,38,7],[11,0,22,28,7],[1,-3,17,26,7],[-6,-6,10,21,6]].forEach(([x,y,dx,dy,w],i)=>plume(near,x,y,dx,dy,w,['#389987','#4dad94','#62bd9a'][i%3]));
    vein(near,'M44 49L79 88M32 54L64 94M22 56L51 91M12 53L34 82','#88c6c3',1.1);
    vein(near,'M52 59L54 51M59 68L62 61M64 73L73 75M40 66L43 58M45 73L54 78M29 69L28 63M35 77L44 83','#6aadae',.8);
    vein(rig,'M170 189Q181 146 222 118M169 197Q185 207 200 201','#deca90',1.5,true);
    shape(rig,'M331 84Q343 79 353 84Q381 89 397 107Q372 97 351 92L335 93Z','#29414a');
    vein(rig,'M350 87Q375 91 390 102','#d4b980',1.4);
    vein(rig,'M334 84Q327 87 327 94','#d6c18c',2);
  }
  return rig;
}
