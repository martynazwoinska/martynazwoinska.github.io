// Original AF16 drawings. Paper/bamboo construction references: Ahmedabad dossier.
const NS = "http://www.w3.org/2000/svg";
const ink = "#293c4d", ivory = "#fff1d4", berry = "#ae4d70", violet = "#64558a";
const wood = "#be9159", edge = "#795334", silver = "#c4d5dd";
const add = (g, tag, attrs) => {
  const n = document.createElementNS(NS, tag);
  Object.entries(attrs).forEach(([k,v]) => n.setAttribute(k,v));
  g.appendChild(n);
  return n;
};
const path = (g,d,fill,stroke=ink,width=2,extra={}) => add(g,"path",{
  d,fill,stroke,"stroke-width":width,"stroke-linecap":"round","stroke-linejoin":"round",...extra
});
const line = (g,d,stroke=ink,width=1.5) => path(g,d,"none",stroke,width);
const oval = (g,cx,cy,rx,ry,fill,stroke=ink,width=1.5) => add(g,"ellipse",{cx,cy,rx,ry,fill,stroke,"stroke-width":width});

function fan(g, male) {
  // Two different opening angles and rib counts, with pierced guards and paper pleats.
  const tips = male ? [[-41,-22],[-21,-52],[6,-65],[32,-60],[55,-40]]
    : [[-80,-9],[-65,-44],[-37,-69],[0,-79],[37,-69],[65,-44],[80,-9]];
  const pivot = male ? [9,48] : [0,50];
  const [px,py] = pivot;
  const colours = male ? [violet,ivory,berry,ivory] : [berry,ivory,berry,ivory,berry,ivory];
  for (let i=0;i<tips.length-1;i++) {
    const [x,y]=tips[i], [xx,yy]=tips[i+1];
    const mx=(x+xx)/2, my=(y+yy)/2-5;
    path(g,`M${px+3} ${py+4}L${x+3} ${y+4}Q${mx+3} ${my+4} ${xx+3} ${yy+4}Z`,edge,edge,1);
    path(g,`M${px} ${py}L${x} ${y}Q${mx} ${my} ${xx} ${yy}Z`,colours[i],wood,1.5);
    // Shaded valley follows the fold, ending before the bound outer edge.
    path(g,`M${px} ${py}L${mx} ${my+3}L${xx} ${yy}Z`,ink,"none",0,{opacity:.10});
    line(g,`M${x} ${y}Q${mx} ${my} ${xx} ${yy}`,ivory,2.5);
    // A bounded two-diamond lattice follows each pleat, never crossing a rib.
    for (const fraction of [.62,.81]) {
      const cx=px+(mx-px)*fraction, cy=py+(my-py)*fraction;
      path(g,`M${cx} ${cy-7}L${cx+4.5} ${cy}L${cx} ${cy+7}L${cx-4.5} ${cy}Z`,
        "none",colours[i]===ivory?berry:ivory,1.4);
    }
  }
  tips.forEach(([x,y]) => {
    line(g,`M${px} ${py+8}L${x} ${y}`,edge,3.5);
    line(g,`M${px-1} ${py+5}L${x-1} ${y+2}`,wood,1.5);
  });
  path(g,`M${px-5} ${py-4}L${px-5} ${py+29}Q${px} ${py+36} ${px+5} ${py+29}L${px+5} ${py-4}Z`,wood);
  oval(g,px,py,4.5,4.5,ivory,edge,1.5);
  oval(g,px,py+25,2,2,edge,"none");
  line(g,`M${px} ${py+30}Q${px+15} ${py+39} ${px+9} ${py+46}`,berry,2);
  for (let i=0;i<3;i++) line(g,`M${px+9+i*2} ${py+44}L${px+5+i*3} ${py+56}`,berry,1.8);
}

function reel(g,male) {
  // Wooden axial reel, near flange overlaps wound thread. Male uses a narrower bobbin.
  const r=male?18:23, half=male?24:31;
  line(g,`M${-half-19} 0H${half+22}`,edge,7);
  line(g,`M${-half-18}-1H${half+20}`,wood,3);
  oval(g,half,0,7,r+7,wood);
  path(g,`M${-half} ${-r}Q0 ${-r-4} ${half} ${-r}V${r}Q0 ${r+4} ${-half} ${r}Z`,male?violet:berry);
  for(let x=-half+3;x<half;x+=4) line(g,`M${x} ${-r+2}Q${x+5} 0 ${x} ${r-2}`,ivory,.9);
  path(g,`M${-half} 5Q0 14 ${half} 5V${r}Q0 ${r+4} ${-half} ${r}Z`,ink,"none",0,{opacity:.13});
  oval(g,-half,0,9,r+8,wood);
  oval(g,-half-2,0,5,r+3,"#dbb97b",edge,1);
  oval(g,-half-3,0,2,3,edge,"none");
  line(g,`M${half+11} 0V15H${half+20}`,ink,3);
  oval(g,half+20,16,4,7,male?berry:violet);
}

function kiteRig(g,male) {
  // Kite and curved line sway together around the fixed reel exit (0, 0).
  // Compute the line endpoint from the actual bridle knot, avoiding a visual gap.
  const flight = add(g,"g",{class:male?"af16-kite-flight male":"af16-kite-flight primary"});
  const [x,y,angle] = male?[-26,-196,-16]:[20,-218,13];
  const knot = male?12:15, knotY=male?12:14, radians=angle*Math.PI/180;
  const endX=x+knot*Math.cos(radians)-knotY*Math.sin(radians);
  const endY=y+knot*Math.sin(radians)+knotY*Math.cos(radians);
  const cord=`M0 0C${male?48:-48} -58 ${male?-58:68} -136 ${endX.toFixed(3)} ${endY.toFixed(3)}`;
  path(flight,cord,"none",ivory,2.8,{class:"af16-flight-cord"});
  path(flight,cord,"none",ink,1,{class:"af16-flight-cord"});
  const position=add(flight,"g",{transform:`translate(${x} ${y}) rotate(${angle})`});
  const motion=add(position,"g",{class:"af16-kite-paper-motion",style:`transform-origin: ${knot}px ${knotY}px;`});
  // Enlarge only the canopy about its tether. Reel, line and knot stay in place.
  const k=add(motion,"g",{class:"af16-kite-canopy",transform:`translate(${knot} ${knotY}) scale(${male?1.65:1.5}) translate(${-knot} ${-knotY})`});
  const outline=male?"M0-50L42-2L0 44L-42-2Z":"M0-63L54-1L0 54L-54-1Z";
  path(k,outline,male?violet:berry,ink,2.3);
  if(male) {
    path(k,"M-29-17L-18-29L29 13L17 26Z",ivory,"none");
    path(k,"M-11-38L-4-45L36-9L30-3Z",berry,"none");
  } else {
    path(k,"M0-63L54-1L0 54Z",ivory,"none");
    path(k,"M0-31L27-1L0 26L-27-1Z",violet,ivory,1.5);
  }
  line(k,male?"M-40-2Q0-46 40-2M0-48V43":"M-52-1Q0-58 52-1M0-61V53",wood,2);
  line(k,male?"M0-45V40":"M0-57V50",ivory,.7);
  path(k,male?"M0 44L-11 52L0 50L11 52Z":"M0 54L-15 65L0 61L15 65Z",berry,ink,1);
  // Bridle joins the spar and lower spine at an offset knot, then the flying line.
  line(k,male?"M0-23L12 12L0 32":"M0-30L15 14L0 39",ivory,1.3);
  oval(k,male?12:15,male?12:14,2,2,ivory,edge,1);
  reel(g,male);
}

function soil(g,male) {
  if(male) {
    // Open shallow tray with a raised front lip and separate resting hand trowel.
    path(g,"M-66 30L35 19L68 42L-37 60Z",silver);
    path(g,"M-58 32L32 24L55 40L-36 52Z","#765647",edge,1);
    [[-38,36],[-17,39],[7,32],[28,38]].forEach(([x,y])=>oval(g,x,y,7,3,"#a87c58",edge,1));
    path(g,"M-66 30L-37 60L68 42L66 51L-37 69L-66 39Z","#718899");
    line(g,"M-64 30L-37 60L67 42",ivory,2);
    const t=add(g,"g",{transform:"translate(-12 -7) rotate(29)"});
    path(t,"M-6-14Q-29 4 0 44Q29 4 6-14Z",silver);
    path(t,"M0-12L0 42Q25 4 6-14Z","#7d94a6","none");
    line(t,"M0-12V37",ivory,2);
    path(t,"M-5-35H5V-10H-5Z",silver);
    path(t,"M-10-70Q0-76 10-70L8-33Q0-28-8-33Z",berry);
    line(t,"M-5-66L-4-40","#e79aae",2);
    oval(t,0,-63,2.5,3,ink,"none");
    path(g,"M43-19L54-22L62 10L52 13Z",ivory,edge,1.5);
    line(g,"M48-14L54 5",wood,1.5);
  } else {
    // Ribbed painted-metal pail with a rolled rim and a clearly separate soil probe.
    line(g,"M-48-12Q-52-73 0-78Q51-73 48-12",ink,5);
    line(g,"M-48-12Q-52-73 0-78Q51-73 48-12",silver,2.5);
    path(g,"M-54-10L-43 57Q0 77 43 57L54-10Z",violet);
    path(g,"M19-8L15 65Q33 63 43 57L54-10Z","#47476c","none");
    for(const x of [-33,-17,0,17,33]) line(g,`M${x} 9L${x*.8} 55`,"#a5a3c8",2);
    oval(g,0,-10,55,18,silver);
    oval(g,0,-10,47,12,"#684b3d",edge,1);
    [[-28,-12],[-8,-6],[13,-13],[29,-6]].forEach(([x,y])=>oval(g,x,y,6,3,"#b5855f",edge,1));
    line(g,"M-42 57Q0 76 42 57",silver,3);
    line(g,"M-38 17L-32 49","#d3cdea",2);
    oval(g,-48,-4,4,5,silver);
    oval(g,48,-4,4,5,silver);
    const p=add(g,"g",{transform:"translate(67 -13) rotate(9)"});
    path(p,"M-6-66H6V51L0 66L-6 51Z",silver);
    path(p,"M-3 6H3V49H-3Z","#684b3d",ink,1);
    line(p,"M-2-62V-1",ivory,2);
    path(p,"M-24-72Q0-78 24-72V-64H-24Z",berry);
    line(p,"M-18-70H18","#e79aae",1.5);
    [-42,-28,-14].forEach(y=>line(p,`M1 ${y}H5`,ink,1));
  }
}

export function drawAhmedabadRefinement(g,item,male) {
  if (!item.id.startsWith("briggsae::Ahmedabad, India · AF16::")) return false;
  const draw={"lattice-fan":fan,"kite-rig":kiteRig,"soil-kit":soil}[item.family];
  if(!draw) return false;
  g.dataset.renderer=item.family;
  g.classList.add("ahmedabad-af16-accessory",male?"af16-companion":"af16-primary");
  draw(g,male);
  return true;
}
