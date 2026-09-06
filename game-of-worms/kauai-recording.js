// Original forest-listening props. Construction references are in the Kauaʻi dossier.
const NS = "http://www.w3.org/2000/svg";
const add = (g, tag, attrs) => {
  const n = document.createElementNS(NS, tag);
  Object.entries(attrs).forEach(([k, v]) => n.setAttribute(k, v));
  g.appendChild(n);
  return n;
};
const path = (g, d, fill, stroke = "#293f49", width = 2, extra = {}) =>
  add(g, "path", { d, fill, stroke, "stroke-width": width, "stroke-linecap": "round", "stroke-linejoin": "round", ...extra });
const line = (g, d, stroke, width = 1.5) => path(g, d, "none", stroke, width);
const oval = (g, x, y, rx, ry, fill, stroke = "#293f49", width = 1.5) =>
  add(g, "ellipse", { cx:x, cy:y, rx, ry, fill, stroke, "stroke-width":width });
const box = (g, x, y, width, height, rx, fill, stroke = "#293f49", sw = 2) =>
  add(g, "rect", { x, y, width, height, rx, fill, stroke, "stroke-width":sw });

function headphones(g, small) {
  // Equal-sized cups follow the same headband baseline on the smaller headset.
  if (small) {
    line(g,"M-24-10Q-26-32 0-32Q26-32 24-10","#293f49",6);
    line(g,"M-24-10Q-26-32 0-32Q26-32 24-10","#fff1d0",3.5);
    for (const side of [-1,1]) {
      const ear = add(g,"g",{transform:`translate(${side*24} 3)`});
      path(ear,"M-8-9Q-8-15 0-15Q8-15 8-9V9Q8 15 0 15Q-8 15-8 9Z",
        "#b94e77","#293f49",2,{class:"kauai-companion-earcup"});
      box(ear,side<0?1:-7,-11,6,22,3,"#fff1d0","#334853",1);
      line(ear,side<0?"M3-7V7":"M-3-7V7","#d1bda1",.8);
      line(ear,side<0?"M-4-8V7":"M4-8V7","#ed9cb6",1.6);
      oval(ear,0,-13,2,2,"#dce5eb","#293f49",1);
    }
    line(g,"M-25 14Q-26 27-15 29","#334d57",2);
  } else {
    line(g,"M-25 1Q-31-34 0-34Q29-34 25 1","#2b414d",7);
    line(g,"M-25 1Q-31-34 0-34Q29-34 25 1","#fff1d0",3.5);
    path(g,"M-19-19Q0-33 18-19L17-25Q0-38-18-25Z","#8b3d5c","#293f49",1.3);
    for (const side of [-1,1]) {
      const ear = add(g,"g",{transform:`translate(${side*25} 1)`});
      box(ear,-7,-13,14,28,6,"#b94e77","#293f49",1.7);
      box(ear,side<0?1:-7,-10,6,22,3,"#fff1d0","#334853",1);
      line(ear,"M-3-8V7","#ed9cb6",1.5);
      oval(ear,0,-13,2,2,"#d4bb78");
    }
    line(g,"M27 16Q34 29 25 35","#344d57",2);
  }
}

function microphone(g, small) {
  // Full floor stand for the listener, low angled desk stand for the operator.
  const bottom = small ? 73 : 151;
  oval(g,0,bottom+5,small?29:35,5,"#29292d30","none",0);
  path(g,small?"M-27 70Q0 58 27 70L23 77H-23Z":"M-32 149Q0 137 32 149L27 157H-27Z","#55555b","#29292d");
  line(g,small?"M-20 69Q0 62 20 69":"M-25 148Q0 141 25 148","#adadb3",1.5);
  line(g,`M0 ${bottom-6}V27`,"#38383d",6);
  line(g,`M-1 ${bottom-7}V29`,"#ededf0",2);
  box(g,-4,small?49:95,8,9,2,"#717177","#ededf0",1);
  path(g,"M-16 12Q-15 28 0 28Q15 28 16 12","none","#ceced4",3);
  const head = add(g,"g",{transform:small?"rotate(-23)":"rotate(13)"});
  // Radial stamens remain outside the metal grille with a clear central capsule.
  for (const [x,y] of [[-23,-14],[-18,-27],[-7,-34],[7,-35],[19,-27],[25,-12]]) {
    line(head,`M0-8Q${x*.7} ${y*.5} ${x} ${y}`,"#bd6073",1.8);
    oval(head,x,y,2.6,2.6,"#f0bdcf","#97475b",.7);
  }
  box(head,-12,-24,24,43,10,"#8b3d5c","#dce5eb",1.8);
  path(head,"M-9-14Q-7-22-1-21V13Q-7 16-9 10Z","#b56887","none",0);
  for (let y=-15;y<=10;y+=5) line(head,`M-7 ${y}Q0 ${y-3} 8 ${y}`,"#e7eef3",1.2);
  line(head,"M0-19V13","#512b43",1);
  oval(g,-15,13,2.8,2.8,"#c4d3df");
  oval(g,15,13,2.8,2.8,"#c4d3df");
}

function reel(g, x, y, tapeRadius, delay) {
  oval(g,x+2,y+3,43,43,"#1d343e55","none",0);
  oval(g,x,y,42,42,"#aebeca","#354853",2);
  oval(g,x,y,tapeRadius,tapeRadius,"#654b40","#493e37",1);
  const spinner = add(g,"g",{class:"kauai-tape-reel",style:`transform-origin:${x}px ${y}px;animation-delay:${delay}s`});
  // Three open spokes reveal the wound tape beneath the reel flange.
  for (const angle of [0,120,240]) {
    path(spinner,`M${x-7} ${y-6}L${x-31} ${y-20}Q${x-36} ${y-24} ${x-31} ${y-29}L${x-25} ${y-34}Q${x-21} ${y-36} ${x-17} ${y-29}L${x+4} ${y-9}Z`,"#e7eef3","#7d919f",1,{transform:`rotate(${angle} ${x} ${y})`});
  }
  oval(spinner,x,y,11,11,"#324b59","#e7eef3",2);
  oval(spinner,x,y,4,4,"#c4d3df","#283f4a",1);
  line(g,`M${x-28} ${y-28}A40 40 0 0 1 ${x+24} ${y-32}`,"#f5f9fc",1.5);
}

function recorder(g) {
  oval(g,4,101,118,10,"#293f4938","none",0);
  // A shallow cabinet, with visible end grain, metal face and recessed controls.
  path(g,"M-111-76L-95-86H112L128-73L112 89H-111Z","#816567");
  path(g,"M112-76L128-73V80L112 95Z","#49383f");
  path(g,"M-111-76H112V95H-111Z","#62464e");
  line(g,"M-107-69V85M117-63V77","#aa8e91",2);
  line(g,"M-104-46Q-109-13-104 20T-104 76M120-48Q116-11 121 14T120 67","#49383f",1);
  line(g,"M-102-73Q-11-79 95-73","#b79da0",1.5);
  path(g,"M-99-67H101V83H-99Z","#365563","#223c48",2.5);
  path(g,"M-99-67H101V18H-99Z","#8b3d5c","#294653",1);
  line(g,"M-94-61H96","#d7a0b5",1.7);
  // Left-side input knob faces the smaller operator.
  path(g,"M-110-48H-123V-30H-110Z","#283e4b","#c4d3df",1.6);
  line(g,"M-120-44V-34","#e7eef3",2);
  // Tape travels from the supply pack, around guides and heads, to take-up.
  path(g,"M-69-21L-80 1Q-82 8-70 12H69Q81 10 78 1L69-21","none","#332d2b",3);
  for (const x of [-77,76]) oval(g,x,5,5,5,"#dce5eb","#304c59",1.5);
  for (const x of [-34,-7,20]) box(g,x,5,17,16,3,"#b7c8d5","#2c434b",1.4);
  oval(g,54,10,8,8,"#263a42","#c4d3df",2);
  oval(g,54,10,2.5,2.5,"#e7eef3");
  reel(g,-48,-37,31,0);
  reel(g,48,-37,21,-1.2);
  // Two quiet analogue meters, transport keys, a record lamp and a ribbed dial.
  for (const x of [-76,-28]) {
    box(g,x,33,39,24,3,"#e7eef3","#263e49",2);
    path(g,`M${x+5} 48Q${x+19} 32 ${x+34} 48`,"none","#667e8f",1);
    line(g,`M${x+19} 53L${x+11} 40`,"#814b55",1.6);
  }
  for (const [i,x] of [-74,-50,-26,-2,22].entries()) {
    box(g,x,66,18,10,2,i===4?"#b94e77":"#c4d3df","#223d4a",1.2);
  }
  oval(g,72,52,15,15,"#263d4b","#c4d3df",2);
  oval(g,72,52,10,10,"#526c79","#879c9c",1);
  line(g,"M72 40V46","#e7eef3",2);
  oval(g,35,41,3,3,"#dd8c72","#874859",1);
  for (let y=66;y<79;y+=4) line(g,`M52 ${y}H91`,"#1c3642",1.5);
  for (const [x,y] of [[-93,-58],[94,-58],[-93,77],[94,77]]) {
    oval(g,x,y,2,2,"#c4d3df","#304851",.8);
  }
  box(g,-92,95,27,6,2,"#263c45");
  box(g,73,95,27,6,2,"#263c45");
}

export function drawKauaiRecording(g, item, companion) {
  if (item.family === "xz1516-forest-bird-headphones") headphones(g,companion);
  else if (item.family === "xz1516-ohia-blossom-microphone") microphone(g,companion);
  else if (item.family === "xz1516-reel-to-reel-recorder" && !companion) recorder(g);
  else return false;
  return true;
}
