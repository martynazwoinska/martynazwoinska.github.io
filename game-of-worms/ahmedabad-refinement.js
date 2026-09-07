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
  g=add(g,"g",{"data-fan-motion":""});
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

function waistcoat(g,male) {
  g=add(g,'g',{'data-af16-cloth':''});
  const cloth=male?'#494866':'#843953', shade=male?'#33364e':'#58293d', trim='#e1c894';
  // Original floral embroidery, informed by Gujarati sleeveless jackets.
  // Each sprig is sewn within one panel, with small chain loops and a clear stem.
  const sprig=(x,y,angle,size=1)=>{
    const s=add(g,'g',{transform:`translate(${x} ${y}) rotate(${angle}) scale(${size})`,'data-af16-embroidery':''});
    line(s,'M0 10Q-2 2 0-7',trim,1.05);
    path(s,'M0 3Q-8 2-7-3Q-1-4 0 3M0-1Q7-3 6-7Q0-7 0-1','none',trim,1);
    path(s,'M0-7Q-6-9-3-13Q1-14 0-7Q4-14 7-10Q7-6 0-7',trim,'none');
    oval(s,0,-8,1.6,1.6,ivory,'none');
  };
  // Body-coordinate tailoring: curved shoulders, armholes and shaped hems.
  if(male) {
    path(g,'M257 92Q236 91 218 108Q225 120 213 132Q201 138 197 135L184 165Q200 184 220 184Q226 153 248 145L263 135Q250 119 257 92Z',cloth,ink,1.8);
    path(g,'M256 94Q248 112 263 135L248 145Q225 155 220 184L208 181Q217 150 237 135Z',shade,'none');
    line(g,'M253 96Q248 111 245 122Q227 139 216 176',trim,2.3);
    // Bound round neckline, no turned-back suit lapel.
    path(g,'M240 95Q242 105 251 110L249 115Q235 109 235 98Z',shade,trim,1.1);
    line(g,'M188 164Q204 177 219 178',trim,2);
    path(g,'M200 145L214 152L209 161L195 154Z','#9d6f87',ink,1);
    line(g,'M201 146L213 152',trim,1.5);
    [[239,132],[231,142],[223,155]].forEach(([x,y])=>{oval(g,x,y,2.7,2.7,trim,shade,.8);line(g,`M${x-1} ${y}h2`,shade,.6);});
    line(g,'M194 162L198 164M201 168L205 170M209 172L213 173',ivory,1);
    sprig(221,120,28,.7);
    sprig(209,141,26,.6);
    line(g,'M216 110Q220 121 208 132',trim,1.3);
    line(g,'M190 164Q204 180 218 180',ivory,.65);
  } else {
    // Separate fronts leave the green body visible through the opening.
    path(g,'M258 90Q227 87 207 111Q217 126 198 140L177 174Q186 190 203 198L220 171Q227 146 246 130Z',cloth,ink,1.9);
    path(g,'M265 135Q257 133 251 122Q235 140 229 166L214 204Q228 206 239 196Q239 168 254 156L267 147Z',cloth,ink,1.9);
    path(g,'M258 90L246 130Q226 147 220 171L203 198L194 193Q213 168 217 149Q233 119 248 95Z',shade,'none');
    line(g,'M254 94L243 128Q221 150 216 172L201 192M253 129Q238 146 234 170L219 200',trim,2.7);
    path(g,'M242 92Q239 105 250 114L247 120Q234 110 236 96Z',shade,trim,1.2);
    line(g,'M250 123Q253 134 263 139',trim,1.3);
    line(g,'M183 173Q189 185 199 190M221 199Q230 199 235 193',trim,1.7);
    path(g,'M190 153L203 163L197 173L185 163Z','#a36781',ink,1);
    line(g,'M190 154L201 163',trim,1.5);
    line(g,'M207 111Q216 126 198 140','#d5af95',1.3);
    sprig(222,119,28,.82);
    sprig(208,145,27,.72);
    sprig(238,164,22,.57);
    line(g,'M185 174Q191 184 199 187M222 196Q229 196 233 191',ivory,.7);
    line(g,'M244 102L242 106M241 110L239 114M232 131L229 135M225 141L223 145',ivory,.9);
  }
}

function reel(g,male) {
  g=add(g,"g",{"data-af16-reel":""});
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
  const [x,y,angle] = male?[-32,-246,-12]:[-32,-296,10];
  const knot = male?12:15, knotY=male?12:14, radians=angle*Math.PI/180;
  const endX=x+knot*Math.cos(radians)-knotY*Math.sin(radians);
  const endY=y+knot*Math.sin(radians)+knotY*Math.cos(radians);
  const cord=`M0 0C${male?48:-48} -58 ${male?-58:68} -136 ${endX.toFixed(3)} ${endY.toFixed(3)}`;
  path(flight,cord,"none",ivory,1.8,{class:"af16-flight-cord"});
  path(flight,cord,"none",ink,.65,{class:"af16-flight-cord"});
  const position=add(flight,"g",{"data-af16-kite-position":"",transform:`translate(${x} ${y}) rotate(${angle})`});
  const motion=add(position,"g",{class:"af16-kite-paper-motion",style:`transform-origin: ${knot}px ${knotY}px;`});
  // Enlarge only the canopy about its tether. Reel, line and knot stay in place.
  const k=add(motion,"g",{class:"af16-kite-canopy",transform:`translate(${knot} ${knotY}) scale(${male?1.65:1.5}) translate(${-knot} ${-knotY})`});
  const outline=male?'M0-51L43-2L0 45L-43-2Z':'M0-64L55-1L0 56L-55-1Z';
  // Flat, cut tissue paper. The bow belongs to the bamboo, not a padded perimeter.
  path(k,outline,male?'#71609d':'#c44e74','#574156',.65,{'data-af16-paper':''});
  if(male) {
    path(k,'M0-25L23-1L0 24L-23-1Z','#fff0cc','none',0);
  } else {
    path(k,'M0-63L54-1L0 55Z','#fff0cc','none',0);
  }
  // One bowed cross-spar and one straight spine, with small pasted corner patches.
  line(k,male?'M-41-2Q0-63 41-2':'M-53-1Q0-81 53-1','#8a673c',1.15);
  line(k,male?'M0-49V43':'M0-62V54','#8a673c',1.1);
  path(k,male?'M-3-44L0-49L3-44L0-39Z':'M-4-56L0-62L4-56L0-50Z',ivory,'none',0,{opacity:.7});
  path(k,male?'M-4 36L0 42L4 36Z':'M-5 45L0 53L5 45Z',ivory,'none',0,{opacity:.65});
  path(k,male?'M-41-2L-35-5L-35 1Z M41-2L35-5L35 1Z':'M-53-1L-46-4L-46 2Z M53-1L46-4L46 2Z',ivory,'none',0,{opacity:.6});
  path(k,male?'M0 44L-11 55L11 55Z':'M0 55L-15 70L15 70Z',male?'#c44e74':'#71609d','#574156',.65);
  // Bridle joins the spar and lower spine at an offset knot, then the flying line.
  line(k,male?'M0-23L12 12L0 32':'M0-30L15 14L0 39','#fff4da',.8);
  oval(k,male?12:15,male?12:14,1.3,1.3,ivory,edge,.55);
  reel(g,male);
}

function soil(g,male) {
  const surface=g;
  if(male) {
    // A small hand trowel, without collection containers.
    const t=add(surface,"g",{"data-af16-tool":"",transform:"translate(-12 -7) rotate(29)"});
    path(t,"M-6-14Q-29 4 0 44Q29 4 6-14Z",silver);
    path(t,"M0-12L0 42Q25 4 6-14Z","#7d94a6","none");
    line(t,"M0-12V37",ivory,2);
    path(t,"M-5-35H5V-10H-5Z",silver);
    path(t,"M-10-70Q0-76 10-70L8-33Q0-28-8-33Z",berry);
    line(t,"M-5-66L-4-40","#e79aae",2);
    oval(t,0,-63,2.5,3,ink,"none");
  } else {
    // A digging spade with an open D grip.
    const p=add(surface,"g",{"data-af16-tool":"",transform:"translate(0 -19) rotate(9)"});
    path(p,"M-21 10H21L19 54Q12 65 0 70Q-12 65-19 54Z",silver);
    path(p,"M0 12H19L17 53Q10 62 0 67Z","#859ba9","none");
    line(p,"M-17 16L-14 50Q-8 58-3 60",ivory,2);
    path(p,"M-24 8H24V15H-24Z","#7d94a6");
    path(p,"M-5-61H5V26Q0 34-5 26Z",wood);
    line(p,"M-2-58V22","#ecd2a1",1.8);
    path(p,"M-6 2H6V25Q0 33-6 25Z",silver);
    oval(p,0,19,1.6,1.6,ink,"none");
    path(p,"M-5-58L-18-70V-88Q0-96 18-88V-70L5-58",'none',ink,9);
    path(p,"M-5-58L-18-70V-88Q0-96 18-88V-70L5-58",'none',berry,5);
    line(p,"M-14-84H14",wood,7);
    line(p,"M-12-86H12","#ecd2a1",1.5);
  }
}

export function drawAhmedabadRefinement(g,item,male) {
  if (!item.id.startsWith("briggsae::Ahmedabad, India · AF16::")) return false;
  const draw={"lattice-fan":fan,"af16-embroidered-waistcoat":waistcoat,"kite-rig":kiteRig,"soil-kit":soil}[item.family];
  if(!draw) return false;
  g.dataset.renderer=item.family;
  g.classList.add("ahmedabad-af16-accessory",male?"af16-companion":"af16-primary");
  g.setAttribute('style','transform-box: view-box; transform-origin: 0 0;');
  draw(g,male);
  return true;
}
