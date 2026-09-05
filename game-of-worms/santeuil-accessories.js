// Original drawings. Construction references and fantasy boundaries: Santeuil dossier.
const NS = "http://www.w3.org/2000/svg";
function el(parent, tag, attrs) {
  const node = document.createElementNS(NS, tag);
  Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
  parent.appendChild(node);
  return node;
}
function path(parent, d, fill, stroke = "#34434b", width = 2, extra = {}) {
  return el(parent, "path", {d, fill, stroke, "stroke-width": width, "stroke-linecap": "round", "stroke-linejoin": "round", ...extra});
}
function line(parent, d, stroke, width = 1.5) { return path(parent, d, "none", stroke, width); }
function ellipse(parent, cx, cy, rx, ry, fill, stroke = "#34434b", width = 2) {
  return el(parent, "ellipse", {cx, cy, rx, ry, fill, stroke, "stroke-width": width});
}

function uniform(g, small) {
  // Both uniforms use the native worm coordinates and its motion phase.
  // Different seam, lapel and button constructions fit each animal separately.
  const uniformRoot = g;
  g = el(uniformRoot, "g", {
    class: "santeuil-jacket-fit",
    // Keep the collar near the neck while the lower hem follows the leftward bend.
    transform: small ? "matrix(1 0 -0.18 1 25 2)" : "matrix(1 0 -0.25 1 34 3)"
  });
  const coat = small ? "M204 136Q221 101 258 92Q278 91 298 91L304 119Q276 141 251 137Q230 139 221 156Z"
    : "M190 160Q207 117 244 94Q263 86 295 91L302 120Q277 141 252 139Q229 144 211 179Z";
  path(g, coat, small ? "#426174" : "#344c65", "#253c50", 2.7);
  path(g, small ? "M205 136Q220 117 236 114Q220 137 221 156Z" : "M191 160Q206 132 226 126Q212 151 211 178Z", "#263e55", "none", 0);
  line(g, small ? "M210 133Q227 108 249 101M211 143L223 151" : "M196 157Q215 119 243 102M199 166L210 172", "#c7aa63", 2.5);
  // Ivory facing folds beneath the dark lapel, not over the face.
  path(g, small ? "M272 94L288 94L295 114L277 126L263 111Z" : "M265 91L286 94L295 119L274 132L254 110Z", "#efdfa9", "#243b4c", 1.6);
  path(g, small ? "M268 94L266 110L279 119L270 106Z" : "M259 94L256 111L273 126L269 111Z", "#506d80", "#243b4c", 1.5);
  path(g, small ? "M284 94L296 91L303 108L287 119L293 108Z" : "M281 94L295 91L302 112L283 126L291 111Z", "#49677d", "#243b4c", 1.5);
  path(g, small ? "M285 95Q297 100 305 95L301 105L293 104L284 111L280 106Z" : "M281 96Q294 104 307 97L302 108L294 107L285 116L279 109Z", "#a75060", "#703d50", 1.4);
  line(g, small ? "M285 97L294 102" : "M283 99L294 105", "#d28083", 1.3);
  line(g, small ? "M260 119Q244 127 233 143" : "M270 130Q244 134 222 164", "#20394e", 1.3);
  const buttons = small ? [[256,123],[244,133],[235,145]] : [[256,124],[266,132],[244,135],[254,144],[232,149],[242,158]];
  buttons.forEach(([x,y])=>{
    ellipse(g,x,y,2.8,2.4,"#d5b76b","#233a4d",.8);
    line(g,`M${x-1} ${y-.8}l1.5-.3`,"#fff0bb",.8);
  });
  path(g, small ? "M229 124L243 117L249 124L238 133L230 132Z" : "M212 144Q218 133 230 129L239 139L225 153L215 153Z", "#3d5c73", "#c5aa67", 1.6);
  line(g, small ? "M231 125L243 120" : "M216 143L230 134", "#253d53", 1.2);
  // Cap brim follows the eye-line tilt. Its lower edge remains above both eyes.
  const cap = el(uniformRoot,"g",{class:"santeuil-cap-fit",transform:small?"translate(330 34) rotate(27)":"translate(331 33) rotate(27)"});
  path(cap,small?"M-24-7Q-23-24 0-26Q21-24 26-8L21 0L-22 0Z":"M-28-7Q-27-27-3-30Q23-29 30-8L24 1L-25 0Z",small?"#426174":"#344c65","#253c50",2.2);
  path(cap,small?"M-25-7Q0-12 26-7L24 1Q0-3-23 2Z":"M-29-7Q-2-13 30-7L27 2Q0-4-26 2Z","#263d52","#253c50",1.5);
  path(cap,small?"M-23 1Q1-4 24 1Q16 9 2 8Q-12 7-23 1Z":"M-26 2Q0-3 27 2Q18 11 2 10Q-16 9-26 2Z","#23394c","#1c3141",1.5);
  line(cap,small?"M-19-15Q0-28 19-15":"M-22-16Q0-32 23-16","#627d8e",1.8);
  line(cap,small?"M-21-4Q0-8 22-4":"M-24-4Q0-9 26-4","#c9ac67",1.3);
  ellipse(cap,0,-6,3.4,2.8,"#d4b86e","#253c50",.8);
}

function wheel(g, x, y, r) {
  ellipse(g,x+3,y-2,r,r,"#283e49","#263944",2);
  ellipse(g,x,y,r,r,"#405d68","#243a48",2);
  ellipse(g,x,y,r-3,r-3,"#253e4d","#d0b576",1.3);
  for (let i=0;i<8;i++) {
    const a=i*Math.PI/4;
    line(g,`M${x+Math.cos(a)*3} ${y+Math.sin(a)*3}L${x+Math.cos(a)*(r-4)} ${y+Math.sin(a)*(r-4)}`,"#8ba2a1",1.7);
  }
  ellipse(g,x,y,3.5,3.5,"#d4b873","#243a48",1);
}

function locomotive(g, small) {
  // Boiler is a hollow, ridged plant stem. Cut end, upper light and underside
  // shadow describe the tube. The smaller tank engine has its own wheelbase.
  const deck=small?"M-67 25L59 25L72 17L-54 17Z":"M-96 26L87 26L101 16L-80 16Z";
  path(g,deck,"#b89960");
  path(g,small?"M-67 25L59 25L59 32L-67 32Z":"M-96 26L87 26L87 34L-96 34Z","#324b5b");
  if (small) {
    path(g,"M-55 17L-55-31L-18-31L-18 17Z","#426478");
    path(g,"M-18-31L-6-38L-6 10L-18 17Z","#293f54");
    path(g,"M-65-31Q-40-42-15-34L-3-41Q-38-49-63-39Z","#6c8190");
    path(g,"M-65-31L-65-36Q-38-44-15-38L-15-33Z","#2c4356");
    path(g,"M-47-24L-26-24L-26-7L-47-7Z","#b5d5cf","#d0b174",2);
    line(g,"M-37-23V-8","#486774",2);
    path(g,"M-17-7Q-18-25-3-27L48-27L48 14L-4 14Q-17 12-17-7Z","#789365","#40554c",2);
    path(g,"M-4 3L47 3L47 14L-4 14Q-14 10-16 1Z","#526d53","none",0);
    ellipse(g,48,-6,13,21,"#ccba82","#40554c",2.2);
    ellipse(g,49,-6,8.5,15,"#586450","#e7d59f",2);
    path(g,"M24-26L25-47L38-47L39-26Z","#3e5963");
    ellipse(g,31.5,-47,10,4,"#243c48","#a99c67",2);
    line(g,"M-5-20L38-20M-7-14L37-14","#b6c291",1.7);
    line(g,"M11-25Q6-6 11 13","#d3c791",3);
    line(g,"M15-25Q10-6 15 13","#4c624a",1.5);
    wheel(g,-42,34,17); wheel(g,14,34,17); wheel(g,49,35,10);
    line(g,"M-42 38L14 38L30 25","#263c48",5);
    line(g,"M-42 38L14 38L30 25","#d2bb86",2.5);
    ellipse(g,-42,38,2.7,2.7,"#f0d89f"); ellipse(g,14,38,2.7,2.7,"#f0d89f");
    path(g,"M57 16L68 16L68 24L57 24Z","#9b645b");
    line(g,"M-51-2L-26-2M-51 10L-27 10","#c5a96e",1.3);
  } else {
    path(g,"M-82 16L-82-43L-37-43L-37 16Z","#344f66");
    path(g,"M-37-43L-22-52L-22 8L-37 16Z","#263d51");
    path(g,"M-93-44Q-67-59-32-48L-16-55Q-48-70-88-54Z","#677f8f");
    path(g,"M-93-44L-92-50Q-60-63-32-54L-32-48Z","#2b4258");
    path(g,"M-73-34L-46-34L-46-13L-73-13Z","#c4ded5","#cbb272",2.2);
    line(g,"M-59-33V-14","#3d5c6b",2.3);
    path(g,"M-32-9Q-33-32-14-34L70-34L70 18L-13 18Q-31 16-32-9Z","#879d6c","#40564b",2.5);
    path(g,"M-15 2L71 2L71 18L-13 18Q-28 15-31 1Z","#566e51","none",0);
    path(g,"M-15-27L64-27L64-19L-15-19Z","#b5bf86","none",0);
    ellipse(g,70,-8,17,26,"#cdb983","#40564b",2.5);
    ellipse(g,71,-8,11.5,19,"#5c6650","#eee0ad",2.5);
    ellipse(g,73,-6,7,14,"#3d5146","none",0);
    line(g,"M-12-13L61-13M-13-7L58-7M-10 9L61 9","#a3b582",1.5);
    for(const x of [2,45]) {
      line(g,`M${x}-33Q${x-7}-9 ${x} 17`,"#d1c28b",4);
      line(g,`M${x+4}-33Q${x-3}-9 ${x+4} 17`,"#53664d",1.5);
    }
    path(g,"M42-34L44-63L60-63L63-34Z","#38525e");
    ellipse(g,52,-63,12,5,"#283e49","#bdaa72",2.4);
    line(g,"M48-57L47-39","#819698",2);
    path(g,"M-6-33L-6-45Q3-56 12-45L12-33Z","#bca363");
    path(g,"M-87 10L-39 10L-39 15L-87 15Z","#c0a775","#34434b",1);
    wheel(g,-63,36,19); wheel(g,-9,36,19); wheel(g,45,36,19);
    line(g,"M-63 41L45 41L66 21","#283d49",6);
    line(g,"M-63 41L45 41L66 21","#d1ba83",3);
    [-63,-9,45].forEach(x=>ellipse(g,x,41,3.3,3.3,"#e9d099","#314754",1));
    path(g,"M80 18L95 18L95 27L80 27Z","#a16760");
    line(g,"M-77-7L-44-7","#c6ab70",1.5);
  }
}

function organ(g, small) {
  // An open mechanical music cabinet: pinned barrel, key levers, wedge bellows
  // and crank. This is a fantasy miniature, not a replica of the heritage object.
  const body = small ? "M-51-26L34-26L34 47L-51 47Z" : "M-54-38L43-38L43 61L-54 61Z";
  path(g,small?"M34-26L51-39L51 34L34 47Z":"M43-38L65-52L65 46L43 61Z","#76503c","#513f35",2.5);
  path(g,body,"#b78052","#513f35",2.5);
  path(g,small?"M-51-26L-34-39L51-39L34-26Z":"M-54-38L-32-52L65-52L43-38Z","#d0a36c","#513f35",2);
  // Raised hinged lid with visible board thickness and a recessed walnut panel.
  path(g,small?"M-34-39L-40-74L45-74L51-39Z":"M-32-52L-43-98L54-98L65-52Z","#a67149","#513f35",2.5);
  path(g,small?"M-29-46L-32-66L39-66L43-46Z":"M-24-60L-31-88L47-88L54-60Z","#c79661","#e2bc80",1.5);
  line(g,small?"M-22-59Q2-65 31-57":"M-18-77Q12-86 41-72","#a37148",1.3);
  // Exposed wooden pipe rank rises behind the barrel, with square mouth slots.
  // Its dark side planes distinguish pipes from stripes on the raised lid.
  const pipes = small ? [[-27,-57,7],[-15,-62,7],[-3,-57,7],[9,-52,7]]
    : [[-23,-82,9],[-8,-76,9],[7,-70,9],[22,-64,9]];
  for (const [x,top,w] of pipes) {
    const bottom=small?-26:-38;
    path(g,`M${x} ${top}h${w}V${bottom}h-${w}Z`,"#d3b07a","#71573c",1.1);
    path(g,`M${x+w} ${top}l3-2V${bottom-2}l-3 2Z`,"#8e6a46","#71573c",.8);
    path(g,`M${x} ${top}l3-2h${w}l-3 2Z`,"#eed2a0","#71573c",.8);
    path(g,`M${x+2} ${bottom-10}h${w-3}v3h-${w-3}Z`,"#4e4537","none",0);
    line(g,`M${x+2} ${top+3}v${bottom-top-17}`,"#eed2a0",.8);
  }
  // Dark cavity makes the cylinder round, with a distinct light face and end grain.
  path(g,small?"M-44-23L28-23L28 5L-44 5Z":"M-46-35L35-35L35 1L-46 1Z","#493d32","#e0b47a",1.4);
  const x1=small?-33:-32, x2=small?21:26, y=small?-11:-18, r=small?9:12;
  path(g,`M${x1} ${y-r}L${x2} ${y-r}Q${x2+5} ${y} ${x2} ${y+r}L${x1} ${y+r}Z`,"#d0a46c","#684b35",1.5);
  path(g,`M${x1} ${y+2}L${x2+1} ${y+2}L${x2} ${y+r}L${x1} ${y+r}Z`,"#a47548","none",0);
  ellipse(g,x1,y,5,r,"#e3bc83","#755439",1.4);
  ellipse(g,x1,y,2,r-4,"none","#ad8051",1);
  for(let i=0;i<(small?7:9);i++) {
    const x=x1+9+i*5, yy=y+(i%3-1)*4;
    line(g,`M${x} ${yy}v-3`,"#604e37",1.5);
    ellipse(g,x,yy-3,1,1,"#f0d49a","none",0);
  }
  line(g,`M${x1+7} ${y-r+3}H${x2-3}`,"#f4d9a4",1.5);
  // Narrow mechanical fingers, not an ornamental piano keyboard.
  const n=small?9:11, left=small?-39:-42, top=small?8:5;
  path(g,`M${left-3} ${top-3}h${n*6+6}v12h-${n*6+6}Z`,"#654632","#513f35",1.2);
  for(let i=0;i<n;i++) path(g,`M${left+i*6} ${top-3}h4v8h-4Z`,"#e6cda1","#81603c",.7);
  // Bellows folds form a wedge in the open lower compartment.
  path(g,small?"M-42 24L24 24L24 39L-42 39Z":"M-44 25L33 25L33 51L-44 51Z","#493d34","#e0b47a",1.4);
  path(g,small?"M-39 27L21 33L21 37L-39 37Z":"M-40 29L29 43L29 48L-40 48Z",small?"#47777a":"#8e5260","#413d3b",1);
  for(let i=0;i<3;i++) line(g,small?`M-38 ${29+i*3}L20 ${34+i}`:`M-39 ${33+i*5}L28 ${44+i}`,small?"#8ab1aa":"#c18388",1.2);
  // Case corner joints, foot blocks and right-hand crank share the perspective.
  line(g,small?"M-48-20V42M31-20V42M-46 18H27M39-25V31":"M-50-30V56M39-30V56M-47 20H35M50-34V42","#dfb47a",1.4);
  path(g,small?"M-49 47L-49 53L-39 53L-38 47M23 47L23 53L33 53L33 47":"M-51 61L-51 69L-40 69L-39 61M30 61L30 69L41 69L41 61","#6e4c38","#513f35",1.8);
  ellipse(g,small?45:57,small?5:8,3.5,5,"#d0ad6a","#624d37",1.2);
  line(g,small?"M45 5L61-2L61 14L69 11":"M57 8L78-3L78 17L89 11","#4b4436",4);
  line(g,small?"M45 5L61-2L61 14L69 11":"M57 8L78-3L78 17L89 11","#d5bb7b",2);
  ellipse(g,small?70:91,small?10:10,small?5:6,3.7,"#744e37","#443d32",1.5);
}

function concertina(g) {
  // A side-on, partly opened hexagonal concertina. The far end is narrower
  // in perspective. Two leather loops cradle it against the worm's lower curve.
  path(g,"M-43-14Q-63-54-24-57Q-6-54-9-30L-16-23Q-13-47-28-48Q-48-46-36-19Z","#805444","#4e3b35",2);
  path(g,"M29-21Q49-51 66-34L69-20L62-17Q62-33 53-31Q46-31 39-17Z","#805444","#4e3b35",2);
  path(g,"M-45-29L29-34L47-16L43 29L-29 39L-48 16Z","#4a3848","#443442",2.5);
  for(let i=0;i<7;i++) {
    const x=-42+i*11;
    path(g,`M${x}-28l7-2 16 18-3 43-9 2 3-43Z`,"#a65a68","#583848",1.1);
    path(g,`M${x+7}-30l4 1 16 17-3 42-4 1 3-43Z`,"#733f56","none",0);
    line(g,`M${x+1}-27l6-1 13 16-2 41`,"#d59a9c",1.2);
  }
  // Far-side wooden end with a small visible return and strap fixing.
  path(g,"M-59-27L-45-34L-27-17L-28 21L-43 39L-58 23Z","#bf8c5b","#523e35",2.2);
  path(g,"M-59-27L-64-22L-62 25L-48 41L-43 39L-58 23Z","#805338","#523e35",1.6);
  line(g,"M-54-22L-45-25L-33-13L-34 18L-44 31L-52 21Z","#e9c78d",1.5);
  [-8,2,12].forEach(y=>ellipse(g,-48,y,2,2.8,"#eadbb9","#563f36",.8));
  // Near end: hexagonal rim, inset fretboard and two staggered button rows.
  path(g,"M33-35L58-29L77-10L72 22L50 40L28 28L23-7Z","#7a503b","#4b3a32",2.3);
  path(g,"M38-32L63-26L81-7L76 25L54 42L32 30L27-4Z","#c19461","#4b3a32",2.1);
  path(g,"M42-24L59-20L72-5L68 20L53 32L40 24L35-3Z","#8f6248","#e0bb80",1.5);
  line(g,"M42-14Q49-20 56-13M41 20Q48 26 54 24M67-1L65 10","#563e35",2.3);
  [[46,-6],[44,4],[44,14],[54,-3],[53,8],[52,18]].forEach(([x,y])=>{
    ellipse(g,x+1,y+1,2.8,3,"#533e35","none",0);
    ellipse(g,x,y,2.7,2.5,"#f1e3c2","#6c5139",.8);
  });
  path(g,"M65-19Q81 2 65 30L59 26Q72 4 60-16Z","#5c4740","#403731",1.3);
  ellipse(g,63,-16,1.4,1.4,"#d0b17b","none",0);
  ellipse(g,62,26,1.4,1.4,"#d0b17b","none",0);
}

function trolley(g) {
  // Low, open pump trolley. The rear wheels and axle sit behind the planked
  // platform, while the front chassis and pump linkage remain exposed.
  wheel(g,-38,12,12); wheel(g,47,12,12);
  line(g,"M-38 12L-58 29M47 12L27 29","#34454e",4);
  path(g,"M-78-1L53-1L73-15L-57-15Z","#d0ae73","#4c453a",2.2);
  for(const x of [-55,-30,-5,20,45]) line(g,`M${x}-1l20-14`,"#947148",1.3);
  line(g,"M-65-6L-13-6M3-11L49-11","#edcb91",1.3);
  path(g,"M-78-1L53-1L53 9L-78 9Z","#365566","#283e49",2.4);
  path(g,"M53-1L73-15L73-5L53 9Z","#243f51","#283e49",2);
  line(g,"M-72 3H47","#aab9b1",1.4);
  // The pump occupies the open end of the platform, clear of the concertina.
  const pump = el(g,"g",{transform:"translate(-60 0)"});
  path(pump,"M20-5L26-51L36-51L45-5Z","#3e6270","#273f4d",2.3);
  path(pump,"M25-5L30-43L34-43L40-5Z","#769598","none",0);
  ellipse(pump,31,-49,6,6,"#c5a96c","#304955",1.8);
  line(pump,"M31-49L10-12L17 16","#334951",4);
  line(pump,"M31-49L10-12L17 16","#c8bb91",1.7);
  path(pump,"M-2-65L68-42L66-35L-4-57Z","#b88854","#594434",2.2);
  line(pump,"M3-61L61-42","#e0bd82",1.7);
  path(pump,"M-10-67L4-64L2-55L-12-59Z","#684a3c","#433a32",1.5);
  path(pump,"M63-44L79-40L77-31L61-35Z","#684a3c","#433a32",1.5);
  wheel(g,-58,25,16); wheel(g,27,25,16);
  line(g,"M-58 29L27 29M-58 29L-43 16","#2d4350",4.5);
  line(g,"M-58 29L27 29M-58 29L-43 16","#bcbba2",2);
  [-58,27].forEach(x=>ellipse(g,x,29,2.5,2.5,"#dec58c","#34454e",1));
  // Open side brackets keep the riding platform visible.
  line(g,"M-71-2V-13M46-2V-13","#3e5962",3);
}

export function drawSanteuilRefinement(group, item, companion) {
  const render = {
    "santeuil-railway-driver-uniform": uniform,
    "santeuil-cylinder-organ-instrument": companion ? concertina : organ,
    "santeuil-hogweed-locomotive": companion ? trolley : locomotive
  }[item.family];
  if (!render) return false;
  group.classList.add("santeuil-refined");
  render(group, companion);
  return true;
}
