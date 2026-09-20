import {svg,drawGem} from './treasure-pieces.js?v=20260920-discovery-2';

export const canopySearchReady=(height,returning,reduced,reached)=>!returning&&(reduced?reached:height>=.98);
export function towelGemFrame(ms,reduced=false){
 const q=Math.max(0,Math.min(1,(ms-1120)/640));
 return {peek:reduced?0:q*q*(3-2*q),release:ms>=(reduced?650:1900)};
}

// A branch entering from the scene edge, with a crystal caught behind overlapping leaves.
export function drawCanopyCache(parent){
 const art=svg(parent,'svg',{viewBox:'0 0 180 108','aria-hidden':'true'});
 svg(art,'path',{d:'M185 27Q143 46 100 49Q68 53 39 71',fill:'none',stroke:'#4a4932','stroke-width':8,'stroke-linecap':'round'});
 svg(art,'path',{d:'M179 26Q132 48 100 47Q65 54 42 70',fill:'none',stroke:'#a29561','stroke-width':2,'stroke-linecap':'round'});
 const gem=svg(art,'g',{'data-canopy-hidden-gem':'',transform:'translate(53 68) rotate(-18)'});drawGem(gem,6,.20);
 const leaf=(d,vein,fill)=>{svg(art,'path',{d,fill,stroke:'#294f3a','stroke-width':1.2});svg(art,'path',{d:vein,fill:'none',stroke:'#aec57c','stroke-width':.9,'stroke-linecap':'round'});};
 leaf('M129 40Q122 11 153 5Q159 25 129 40Z','M130 37Q145 20 151 10','#547b43');
 leaf('M109 47Q114 71 149 69Q143 48 109 47Z','M115 51L142 65','#446b3d');
 const cover=svg(art,'g',{'data-canopy-leaf-cover':''});
 svg(cover,'path',{d:'M95 50Q47 30 29 67Q54 91 95 50Z',fill:'#386940',stroke:'#244b35','stroke-width':1.4});
 svg(cover,'path',{d:'M91 51Q59 61 35 67M62 61L56 45M62 61L55 78M77 56L71 43M77 56L72 69',fill:'none',stroke:'#92b46e','stroke-width':1.1,'stroke-linecap':'round'});
 svg(art,'path',{d:'m37 82 3-5 3 5-3 5Z',fill:'#e5ffff',opacity:.9});
 return {art,cover,gem};
}
