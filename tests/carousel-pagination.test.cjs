const {test}=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
function setup(rtl=false) {
 let init,observer; const events=new Map();
 const track={id:'track-a',clientWidth:300,scrollWidth:950,scrollLeft:0,addEventListener:(n,f)=>events.set('track'+n,f),removeEventListener:n=>events.delete('track'+n),scrollTo:v=>track.last=v};
 const pager={children:[],replaceChildren(){this.children=[]},append(b){this.children.push(b)},contains(b){return this.children.includes(b)},addEventListener:(n,f)=>events.set('pager'+n,f),removeEventListener:n=>events.delete('pager'+n)};
 vm.runInNewContext(fs.readFileSync('assets/arcadia-carousel-pagination.js','utf8'),{window:{Arcadia:{modules:{register:(_,f)=>init=f}}},document:{createElement:()=>({dataset:{},attrs:{},setAttribute(n,v){this.attrs[n]=v}})},getComputedStyle:()=>({direction:rtl?'rtl':'ltr'}),matchMedia:()=>({matches:true}),ResizeObserver:class {constructor(f){observer=this;this.update=f}observe(){}disconnect(){this.stopped=true}}});
 const cleanup=init({querySelector:s=>s==='[data-carousel-track]'?track:pager});
 return {track,pager,events,observer,cleanup};
}
test('pagination covers overflow, clamps last page, and reflects scroll',()=>{
 const f=setup(); assert.equal(f.pager.children.length,4);
 const last=f.pager.children[3]; f.events.get('pagerclick')({target:{closest:()=>last}});
 assert.equal(f.track.last.left,650); assert.equal(f.track.last.behavior,'auto');
 f.track.scrollLeft=650; f.events.get('trackscroll')(); assert.equal(last.attrs['aria-current'],'true');
});
test('resize removes dots for a non-scrolling grid, unload removes listeners',()=>{
 const f=setup(); f.track.clientWidth=950; f.observer.update(); assert.equal(f.pager.hidden,true); assert.equal(f.pager.children.length,0);
 f.cleanup(); assert.equal(f.events.size,0); assert.equal(f.observer.stopped,true);
});
test('RTL pagination scrolls in negative direction and instances are isolated',()=>{
 const f=setup(true), other=setup(); const target=f.pager.children[1]; f.events.get('pagerclick')({target:{closest:()=>target}});
 assert.equal(f.track.last.left,-300); assert.equal(other.track.last,undefined);
});
