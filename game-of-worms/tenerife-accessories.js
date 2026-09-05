// Original SVG constructions. References and fantasy boundaries are in the Tenerife dossier.
const NS = "http://www.w3.org/2000/svg";
function el(parent, name, attrs) {
  const node = document.createElementNS(NS, name);
  Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
  parent.appendChild(node);
  return node;
}
function path(parent, d, fill, stroke = "#39433b", width = 2.5, extra = {}) {
  return el(parent, "path", { d, fill, stroke, "stroke-width": width, "stroke-linejoin": "round", "stroke-linecap": "round", ...extra });
}
function line(parent, d, stroke, width = 2, extra = {}) { return path(parent, d, "none", stroke, width, extra); }


function canary(group, small) {
  // Raised wings attach underneath the fitted mantle. The far wing is
  // foreshortened, while the near wing opens laterally away from the face.
  const far = small ? [
    "M271 99Q256 77 259 49Q260 37 254 43Q246 53 248 69Q250 90 264 106Z",
    "M273 98Q265 73 275 45Q279 32 271 40Q261 50 258 66Q257 86 267 104Z",
    "M276 101Q280 78 283 63Q285 50 278 58Q270 69 267 83L269 106Z"
  ] : [
    "M269 99Q245 76 247 38Q248 23 241 32Q232 47 239 68Q244 92 262 107Z",
    "M273 99Q257 69 265 30Q269 15 260 24Q249 38 247 61Q246 89 266 108Z",
    "M276 101Q273 77 282 49Q287 35 277 43Q266 57 261 77Q263 95 270 108Z"
  ];
  far.forEach((d,i)=>path(group,d,i===1?"#b3ad58":"#95924e","#6c7043",1.5));
  line(group,small?"M264 92Q255 70 258 53M270 91L273 51"
    :"M262 94Q244 68 246 44M269 94Q255 65 263 35","#e5d68b",1.5);
  const near = small ? [
    "M260 102Q229 87 202 72Q192 64 199 74Q209 85 229 96L253 114Z",
    "M259 100Q226 75 191 54Q180 45 186 56Q194 72 224 89L251 112Z",
    "M259 99Q230 68 199 42Q187 30 191 44Q197 62 226 81L250 110Z",
    "M260 99Q239 68 219 37Q212 23 213 38Q215 56 232 78L252 109Z"
  ] : [
    "M259 102Q218 91 188 68Q176 58 182 70Q189 82 215 96L249 116Z",
    "M260 100Q214 77 172 50Q157 38 163 51Q174 67 211 87L248 113Z",
    "M260 99Q221 63 174 32Q159 20 165 33Q172 51 210 78L249 112Z",
    "M261 99Q231 63 192 26Q177 13 181 27Q186 46 218 72L251 111Z",
    "M262 99Q242 70 219 35Q208 19 210 34Q214 49 230 74L254 111Z"
  ];
  near.forEach((d,i)=>path(group,d,i<2?"#95924e":"#b3ad58","#6c7043",1.5));
  line(group,small?"M249 99L202 56M250 97L220 45"
    :"M248 100Q215 77 178 48M250 97L193 33M254 98L216 40","#e5d68b",1.6);
  path(group,small?"M260 97Q247 79 232 70L221 79Q236 96 253 110Z"
    :"M262 97Q247 78 229 66L216 80Q237 100 254 112Z","#edcf67","#998849",1.6);
  line(group,small?"M236 77L230 82M246 86L240 91"
    :"M231 75L225 81M242 84L235 89M251 93L244 98","#fff0b0",2);
  // Work in each nematode's own coordinates. The open mantle follows its back,
  // without adding a separate bird chest, neck or tail to the silhouette.
  const mantle = small
    ? "M292 96C265 88 241 91 218 107C204 119 193 137 187 154L202 161C213 139 227 127 247 123C264 121 280 126 298 121Z"
    : "M296 94C268 86 238 89 214 108C195 124 183 147 179 171Q184 176 190 171Q194 174 199 168C207 146 222 132 246 128C265 125 280 132 303 121Z";
  path(group,mantle,"#e3ca6b","#817747",2);
  line(group,small?"M286 98C255 92 229 100 212 121C205 130 200 140 196 150"
    :"M289 97C257 90 228 101 209 122C198 136 191 151 188 164","#f8e5a1",3);

  // Long, overlapping flight feathers sweep along the same curve as the body.
  const feathers=small?[
    "M268 108C245 103 218 119 201 152Q213 146 224 135C240 120 254 118 270 117Z",
    "M281 109C257 107 237 119 223 136Q237 132 248 127Q265 120 282 119Z"
  ]:[
    "M257 109C228 107 202 133 190 168Q208 156 218 142C232 126 246 120 265 119Z",
    "M274 108C249 105 223 121 209 147Q226 140 240 132C252 124 265 122 279 120Z",
    "M289 110C272 107 251 116 238 130Q260 127 277 127L293 122Z"
  ];
  feathers.forEach((d,i)=>path(group,d,i===0?"#95924e":"#b3ad58","#6c7043",1.5));
  line(group,small?"M263 113Q233 116 212 141M276 114L246 127"
    :"M256 115Q221 124 201 153M272 115Q245 119 224 137M286 116L259 124","#e5d68b",1.7);

  // Short coverts sit flush over the feather roots, not in a rounded shoulder cap.
  path(group,small?"M292 96Q273 91 258 96L253 108L265 110L276 108L288 112L298 108Z"
    :"M296 94Q270 88 251 95L246 107L258 108L269 105L280 109L292 108L300 112Z",
    "#edcf67","#998849",1.5);
  line(group,small?"M267 98L263 105M280 98L277 104"
    :"M259 97L254 103M272 97L267 102M285 99L280 104","#fff0b0",2.2);
  // A narrow sewn fastening follows the front cross-section of the worm.
  path(group,small?"M294 95Q303 106 298 124L291 126Q297 107 288 97Z"
    :"M298 93Q308 106 303 126L296 129Q301 108 292 95Z","#8f5960","#624c45",1.4);
  el(group,"ellipse",{cx:small?297:302,cy:112,rx:3,ry:4.5,fill:"#e3bf6c",stroke:"#6d5940","stroke-width":1.2});
}

function timple(group, small) {
  const outline = small
    ? "M-8-37C-34-47-47-21-28-1C-18 9-22 17-34 29C-59 62-37 92 2 94C43 94 61 63 38 33C25 17 21 9 32-4C48-25 32-47 9-37Z"
    : "M-10-43C-44-57-62-27-39-3C-24 11-26 18-45 36C-76 72-48 119 1 122C57 122 81 77 50 39C33 19 29 10 43-7C62-33 39-58 11-43Z";
  const body = el(group, "g", {});
  // The displaced back and the darker connecting rib communicate the domed sound box.
  path(body, outline, "#654537", "#3f3e37", 3, { transform: small ? "translate(8 6)" : "translate(11 8)" });
  path(body, outline, "#d6aa65", "#594332", 3);
  path(body, outline, "none", "#f2d592", 2, { transform: "scale(.94 .96)" });
  const clip = "tenerife-timple-face-" + (small ? "companion" : "primary");
  const defs = el(body, "defs", {});
  el(el(defs, "clipPath", { id: clip }), "path", { d: outline });
  const grain = el(body, "g", { "clip-path": "url(#" + clip + ")" });
  (small ? [-29,-17,22,35] : [-45,-30,-18,26,43,56]).forEach(x =>
    line(grain, "M" + x + "-50Q" + (x-5) + "20 " + x + "130", "#9c723f", 1, { opacity: .35 }));
  const neckTop = small ? -107 : -139;
  const headTop = small ? -146 : -184;
  path(group, "M-9-36L-7 " + neckTop + "H9L12-36Z", "#5a3c32", "#3e3c35", 2);
  path(group, "M-7 " + neckTop + "L-12 " + (headTop+5) + "Q2 " + (headTop-6) + "17 " + (headTop+6) + "L9 " + neckTop + "Z", "#825b3b", "#3e3c35", 2);
  line(group, "M-6 " + neckTop + "H9", "#eedcb4", 3);
  (small ? [-46,-57,-69,-83,-98] : [-51,-63,-77,-93,-112,-131]).forEach(y=>line(group,"M-8 "+y+"H10","#bfbba3",1.5));
  const holeY = small ? 9 : 12;
  el(group,"circle",{cx:2,cy:holeY,r:small?19:24,fill:"#b78d4c",stroke:"#7a5152","stroke-width":3});
  el(group,"circle",{cx:2,cy:holeY,r:small?15:19,fill:"#e9d196",stroke:"#6f5038","stroke-width":1.4});
  el(group,"circle",{cx:2,cy:holeY,r:small?12:16,fill:"#263b39"});
  line(group,small?"M-6 2Q3-5 11 2":"M-9 2Q2-7 14 2","#112a29",3);
  const bridgeY = small ? 58 : 77;
  path(group,"M-21 "+bridgeY+"H25V"+(bridgeY+9)+"H-21Z","#684635","#3d3b34",1.5);
  line(group,"M-14 "+(bridgeY+2)+"H18","#efdfbb",2.5);
  // Five strings terminate at five real tuning posts (three left, two right).
  [-4,-1,2,5,8].forEach((x,i)=>{
    const side=i<3?-1:1, pegY=headTop+12+(i<3?i:i-3)*11;
    line(group,"M"+x+" "+(bridgeY+3)+"L"+(x*.7)+" "+neckTop+"L"+(side<0?-5:11)+" "+pegY,"#f2e4bc",1);
    line(group,"M"+(side<0?-8:15)+" "+pegY+"h"+(side*10),"#aeb5ad",2);
    el(group,"ellipse",{cx:side<0?-20:26,cy:pegY,rx:5,ry:3,fill:"#eee2c5",stroke:"#555440","stroke-width":1.4});
    el(group,"circle",{cx:side<0?-5:11,cy:pegY,r:2,fill:"#c8c8ae"});
  });
  // A plain leather sling wraps behind the upper body and under the instrument.
  line(group,small?"M-31-24Q-68 3-38 61":"M-42-29Q-89 9-52 77","#71485a",6);
  line(group,small?"M-31-24Q-68 3-38 61":"M-42-29Q-89 9-52 77","#b2818b",1.4);
}

function avocado(group, small) {
  const rind = small ? "M-58-3C-64-33-36-48-11-40C9-35 11-16 34-11C70-5 77 30 46 46C4 65-51 40-58-3Z"
    : "M-98 7C-110-34-55-65-14-45C8-35 11-17 46-17C100-19 124 15 91 46C52 85-80 70-98 7Z";
  const flesh = small ? "M-51-5C-54-27-33-39-12-32C8-26 11-9 34-3C63 2 65 26 42 36C6 52-44 31-51-5Z"
    : "M-88 6C-97-26-54-55-17-37C7-26 11-9 47-8C90-10 107 16 82 38C46 69-72 58-88 6Z";
  path(group,rind,"#264e40","#283e37",3,{transform:small?"translate(0 12)":"translate(0 18)"});
  // Irregular short rind dimples are contained on the visible lower skin.
  (small ? [[-39,34],[-23,47],[-5,51],[17,53],[42,44]] : [[-74,42],[-52,59],[-26,67],[3,70],[31,69],[61,58],[85,44]]).forEach(([x,y])=>{
    line(group,"M"+x+" "+y+"l5 1","#57785a",2);
    el(group,"circle",{cx:x+7,cy:y+4,r:1.5,fill:"#152f2a"});
  });
  path(group,rind,"#8fa660","#334d39",2.5);
  path(group,flesh,"#e8d998","#a9b66c",2);
  // The scooped seed hollow is a bowl with a dark rear wall and a light front lip.
  el(group,"ellipse",{cx:small?8:17,cy:small?10:14,rx:small?32:52,ry:small?20:29,fill:"#8c9863",stroke:"#b6b96e","stroke-width":2});
  el(group,"ellipse",{cx:small?8:17,cy:small?14:20,rx:small?27:46,ry:small?13:20,fill:"#c6c77c"});
  const food = el(group,"g",{});
  (small ? [[-3,10,18],[22,17,-22]] : [[-8,12,-18],[30,10,25],[12,29,10]]).forEach(([x,y,angle])=>{
    const bac=el(food,"g",{transform:"translate("+x+" "+y+") rotate("+angle+")"});
    el(bac,"rect",{x:-10,y:-4,width:20,height:8,rx:4,fill:"#bd6871",stroke:"#744c55","stroke-width":1.3});
    line(bac,"M-6-1H4","#e6aaa7",1.5);
  });
  (small ? [[9,23],[30,4]] : [[-19,26],[46,26],[49,9]]).forEach(([cx,cy])=>el(food,"circle",{cx,cy,r:3.5,fill:"#5b9891",stroke:"#356c66","stroke-width":1.3}));
  line(group,small?"M-18 25Q8 37 35 24":"M-25 39Q19 57 61 38","#f3e4ab",3);
  // Separate removed pit gives the shell its immediate avocado identity.
  el(group,"ellipse",{cx:small?-35:-65,cy:small?-10:-11,rx:small?13:19,ry:small?16:23,fill:"#99643f",stroke:"#674a35","stroke-width":2});
  path(group,small?"M-40-22Q-29-25-25-12Q-36-17-40-8Z":"M-72-29Q-54-34-50-13Q-67-21-73-7Z","#bd8b58","none",0);
  line(group,small?"M-34-22Q-39-9-32 1":"M-63-29Q-70-9-59 7","#684b35",1.4);
}

export function drawTenerifeRefinement(group, item, companion) {
  const render = {
    "tenerife-atlantic-canary-costume": canary,
    "tenerife-timple-guitar": timple,
    "tenerife-avocado-snack-bowl": avocado
  }[item.family];
  if (!render) return false;
  group.classList.add("tenerife-refined");
  render(group, companion);
  return true;
}
