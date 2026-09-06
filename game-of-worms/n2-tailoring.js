// Separate tube-shaped lab coats fitted to the native nematode curves.
// The male has a short wrap-front coat; the primary has a longer button front.
const NS = "http://www.w3.org/2000/svg";
const add = (g, tag, attrs) => {
  const el = document.createElementNS(NS, tag);
  for (const [key,value] of Object.entries(attrs)) el.setAttribute(key,value);
  g.appendChild(el);
  return el;
};
const p = (g,d,fill,stroke="#53616b",width=1.8,extra={}) =>
  add(g,"path",{d,fill,stroke,"stroke-width":width,"stroke-linejoin":"round","stroke-linecap":"round",...extra});
const seam = (g,d,color="#adb9c1",width=1.2) => p(g,d,"none",color,width);
const dot = (g,x,y,r,fill) => add(g,"circle",{cx:x,cy:y,r,fill,stroke:"#53616b","stroke-width":.8});

export function drawN2Coat(g, male) {
  g.classList.add("n2-tailored-coat",male?"male":"primary");
  if (male) {
    p(g,"M66-61C20-73-26-41-45 1L-57 38Q-34 54-9 43C-3 21 5 1 24-8Q46-11 70-17Z","#fffdf5");
    p(g,"M55-54Q8-50-16-12L-33 40L-14 44Q-6 5 24-8Q46-11 70-17Z","#e2e8ea","none",0);
    p(g,"M48-60Q57-65 66-61L69-43Q65-34 56-26L44-40Q36-29 27-26L22-35Z","#c9d3d8","none",0);
    p(g,"M48-60Q56-63 64-60L65-45Q61-37 55-32L44-46Q36-34 28-31L25-36Z","#f8faf9");
    seam(g,"M49-57L54-46L61-43","#ffffff",1.8);
    seam(g,"M48-35Q14-21-1 21","#697d88",2);
    p(g,"M-36 7L-15 15L-21 34Q-32 36-43 24Z","#f7faf8");
    seam(g,"M-36 11L-18 18");
    p(g,"M-43 24Q-30 35-21 30L-21 34Q-32 36-43 24Z","#c6d1d7","none",0);
    seam(g,"M-37 15L-39 23Q-32 30-26 30","#c2cdd1",.9);
    p(g,"M-49 31Q-30 45-12 35L-9 43Q-33 53-57 38Z","#eef2f1");
    dot(g,14,-12,2.3,"#8b3d5c");
    dot(g,4,7,2.3,"#8b3d5c");
    p(g,"M30-23L42-20L39-9L27-12Z","#d9e8e7");
    seam(g,"M32-19L38-17","#667f86",1);
    seam(g,"M-42-1Q-35-21-15-33","#ffffff",2);
    seam(g,"M-46 32Q-32 41-18 38","#ffffff",1.5);
    const tie = add(g,"g",{transform:"translate(8 -25)",class:"n2-waist-tie"});
    p(tie,"M-51 26Q-33 40-13 34L-11 40Q-33 47-54 32Z","#dae1e3","#87959c",1.1);
    p(tie,"M-29 36Q-41 31-43 37Q-38 42-29 39L-22 49L-16 44L-25 38Q-14 36-17 32Q-22 30-29 36Z","#f7f8f5","#87959c",1.1);
  } else {
    p(g,"M66-68C19-82-36-41-53 9L-73 61Q-58 91-22 77C-12 50-16 12 11-4Q43-9 70-20Z","#fffdf5");
    p(g,"M52-60C14-54-10-31-25 8L-46 70Q-34 74-22 68C-12 33-14 12 11-4Q43-9 70-20Z","#e3e9eb","none",0);
    p(g,"M45-65Q54-72 64-67L68-46Q64-33 54-27L41-43Q32-30 23-29L14-40Z","#c5cfd5","none",0);
    p(g,"M45-65Q54-69 62-66L63-48Q59-39 54-34L41-49Q32-35 24-34L19-41Z","#fafbf9");
    seam(g,"M47-62L53-49L60-47","#ffffff",2);
    seam(g,"M23-40Q29-36 38-49","#ffffff",1.6);
    seam(g,"M41-41C6-22-10 10-24 62","#6c7c86",2);
    p(g,"M-43 17L-19 26L-25 47Q-39 51-49 36Z","#f9faf6");
    seam(g,"M-42 22L-23 29");
    p(g,"M-49 36Q-38 47-25 43L-25 47Q-39 51-49 36Z","#c2cdd3","none",0);
    seam(g,"M-43 26L-44 34Q-37 43-29 42","#c0cbd0",1);
    p(g,"M15-26L32-25L29-8Q21-4 12-11Z","#f9faf6");
    seam(g,"M18-32L17-19","#8b3d5c",2.4);
    seam(g,"M24-31L23-19","#53616b",2.1);
    p(g,"M-67 55Q-47 76-25 65L-22 77Q-58 91-73 61Z","#eef2f1");
    seam(g,"M-64 60Q-47 77-28 71","#ffffff",2);
    seam(g,"M-61 54Q-50 61-42 61","#b7c4cc",1.3);
    seam(g,"M-39-5Q-29-34-2-49","#ffffff",2.5);
    p(g,"M-24 55L-20 69L-24 77L-31 78Z","#c5d0d6","none",0);
    for (const [x,y] of [[28,-25],[9,-7],[-4,14],[-14,38]]) dot(g,x,y,2.2,"#8b3d5c");
    p(g,"M-27-7L-8 0L-13 13L-32 6Z","#d9e8e7");
    seam(g,"M-24-2L-13 2","#667f86",1);
    seam(g,"M-25 3L-18 5","#667f86",1);
    const tie = add(g,"g",{transform:"translate(15 -44)",class:"n2-waist-tie"});
    p(tie,"M-65 49Q-47 64-25 57L-23 64Q-47 72-68 56Z","#dbe3e6","#87959c",1.2);
    seam(tie,"M-63 51Q-45 65-27 60","#ffffff",1.4);
    p(tie,"M-39 62Q-52 51-55 58Q-54 66-40 65L-41 76L-34 74L-35 65Q-22 64-25 58Q-30 55-39 62Z","#f7f8f5","#87959c",1.2);
  }
}
