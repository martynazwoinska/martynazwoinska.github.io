// Side-on cryovial racks: closed caps face the head, outlets face the tail.
const NS = "http://www.w3.org/2000/svg";
const add = (g,tag,attrs) => {
  const el=document.createElementNS(NS,tag);
  for(const [key,value] of Object.entries(attrs)) el.setAttribute(key,value);
  g.appendChild(el);
  return el;
};
const path=(g,d,fill,stroke="#354c59",width=1.8,extra={}) =>
  add(g,"path",{d,fill,stroke,"stroke-width":width,"stroke-linejoin":"round","stroke-linecap":"round",...extra});
const line=(g,d,color="#dcecf0",width=1.5) => path(g,d,"none",color,width);
function vial(g,x,y,width,height,far=false) {
  const r=width/2;
  const glass=add(g,"g",{class:far?"cryo-side-vial far":"cryo-side-vial near"});
  path(glass,`M${x-r} ${y+5}Q${x} ${y-1} ${x+r} ${y+5}V${y+height-7}Q${x+r} ${y+height+3} ${x} ${y+height+3}Q${x-r} ${y+height+3} ${x-r} ${y+height-7}Z`,far?"#9fb9c5":"#d4eef0");
  path(glass,`M${x+3} ${y+8}L${x+r-2} ${y+7}V${y+height-7}Q${x+r-2} ${y+height} ${x+2} ${y+height}Z`,far?"#73949f":"#8ebac5","none",0);
  path(glass,`M${x-r+3} ${y+height-22}Q${x} ${y+height-27} ${x+r-3} ${y+height-21}V${y+height-6}Q${x} ${y+height+1} ${x-r+3} ${y+height-6}Z`,"#6bbecb","none",0);
  path(glass,`M${x-r-1} ${y-8}Q${x} ${y-13} ${x+r+1} ${y-8}V${y+5}Q${x} ${y+10} ${x-r-1} ${y+5}Z`,far?"#794158":"#8b3d5c");
  add(glass,"ellipse",{class:"cryo-cap-top",cx:x,cy:y-8,rx:r+1,ry:3.4,fill:"#c888a4",stroke:"#533748","stroke-width":1.5});
  for(const dx of [-r+3,0,r-3]) line(glass,`M${x+dx} ${y-4}v7`,"#d8a5b8",1);
  path(glass,`M${x-r+2} ${y+22}Q${x} ${y+25} ${x+r-2} ${y+22}V${y+37}Q${x} ${y+40} ${x-r+2} ${y+37}Z`,"#f4f7ee","#6b8b94",1);
  line(glass,`M${x-r+4} ${y+14}V${y+20}M${x-r+4} ${y+43}V${y+height-10}`,"#ffffff",2);
}
function outlet(g,x,y,wide,far=false) {
  const half=wide/2;
  // A narrow neck expands into a long flared metal exhaust tube.
  path(g,`M${x-half+3} ${y}H${x+half-3}L${x+half-1} ${y+17}L${x+half+3} ${y+31}H${x-half-3}L${x-half+1} ${y+17}Z`,far?"#7b929e":"#aabdc7");
  path(g,`M${x+2} ${y+2}L${x+half-3} ${y+2}L${x+half+1} ${y+29}H${x+2}Z`,"#5b7483","none",0);
  line(g,`M${x-half+5} ${y+4}L${x-half+3} ${y+25}`,"#edf5f7",2);
  add(g,"ellipse",{class:"cryo-outlet-opening",cx:x,cy:y+31,rx:half+3,ry:4.5,fill:"#20313d",stroke:"#d5e1e7","stroke-width":2.2});
  path(g,`M${x-4} ${y+34}Q${x+5} ${y+55} ${x-9} ${y+89}Q${x-3} ${y+57} ${x-6} ${y+34}Z`,"#b8edf0","#74b8c5",1,{class:"cryo-rear-exhaust","fill-opacity":.65});
  line(g,`M${x-1} ${y+36}Q${x+3} ${y+54} ${x-6} ${y+75}`,"#f1fbff",2);
}
export function drawN2Cryopack(g,male) {
  g.classList.add("n2-side-cryopack",male?"male":"primary");
  if(male) {
    path(g,"M8-28Q30-32 39-12L36-5M10 18Q31 15 38 35L33 42","none","#456172",6);
    line(g,"M9-29Q29-31 37-13M12 17Q29 16 36 34");
    // Short side rail and a small far-side stabiliser distinguish the male rack.
    path(g,"M11-41L23-36L23 28L11 35L4 25V-30Z","#667f8e");
    path(g,"M-2 9L-19 18L-24 38L-14 34L3 22Z","#7c98a4");
    vial(g,-5,-63,24,77);
    path(g,"M-19-28Q-5-22 11-29L12-21Q-5-14-19-20Z","#496676");
    path(g,"M-18 2Q-5 8 12 1L12 9Q-4 16-17 9Z","#496676");
    line(g,"M-17-26Q-4-20 9-26M-16 4Q-4 10 10 4");
    outlet(g,-4,19,17);
  } else {
    path(g,"M15-34Q42-39 51-16L47-6M19 12Q43 8 49 33L44 42","none","#456172",6);
    line(g,"M17-34Q41-37 49-17M21 11Q41 10 47 31");
    path(g,"M14-53L28-45L28 27L14 36L5 25V-41Z","#647f8f");
    line(g,"M25-41V24L16 30","#b5c7cf",1.8);
    // Fasteners sit on the exposed side rail, clear of the glass cylinders.
    for(const y of [-34,20]) add(g,"circle",{cx:24,cy:y,r:2.1,fill:"#d7e3e8",stroke:"#354c59","stroke-width":1});
    // The far vial and exhaust are partly occluded by the nearer assembly.
    vial(g,8,-77,21,82,true);
    outlet(g,11,14,14,true);
    vial(g,-8,-67,29,87);
    path(g,"M-24-31Q-7-24 9-31L13-28L13-21Q-7-14-24-23Z","#436373");
    path(g,"M-23 3Q-6 10 11 2L14 5V13Q-5 20-22 12Z","#436373");
    line(g,"M-22-29Q-7-22 9-29M-21 5Q-5 12 11 5","#c9d9df",1.7);
    path(g,"M-18 23Q-4 27 13 19L14 29Q-4 36-18 29Z","#5e7c8b");
    outlet(g,-8,28,23);
    // Curved lower bracket joins the near vial to the body-side rail.
    path(g,"M10 12Q26 13 25 25L21 32","none","#b7cbd3",3);
  }
}
