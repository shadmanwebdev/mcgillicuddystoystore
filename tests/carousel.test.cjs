const {test} = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const source = fs.readFileSync('assets/arcadia-carousel.js', 'utf8');
function fixture({rtl=false,reduced=false}={}) {
  let init, observer;
  const listeners = new Map();
  const node = (name) => ({addEventListener:(e,f)=>listeners.set(name+e,f),removeEventListener:e=>listeners.delete(name+e)});
  const buttons = [-1,1].map(n=>({dataset:{carouselDirection:String(n)}}));
  const controls = {...node('controls'),querySelectorAll:()=>buttons,contains:b=>buttons.includes(b)};
  const track = {...node('track'),clientWidth:300,scrollWidth:900,scrollLeft:0,contains:i=>i.valid,scrollBy(value){this.last=value;}};
  const root = {...node('root'),querySelector:s=>s==='[data-carousel-track]'?track:controls};
  vm.runInNewContext(source,{window:{Arcadia:{modules:{register:(name,fn)=>init=fn}}},getComputedStyle:()=>({direction:rtl?'rtl':'ltr'}),matchMedia:()=>({matches:reduced}),ResizeObserver:class {constructor(fn){observer=this;this.update=fn;}observe(){}disconnect(){this.disconnected=true;}}});
  const cleanup=init(root);
  return {root,track,controls,buttons,listeners,observer,cleanup,click:n=>listeners.get('controlsclick')({target:{closest:()=>buttons[n]}})};
}
test('navigation updates boundaries and hides when resize removes overflow',()=>{
 const f=fixture(); assert.equal(f.buttons[0].disabled,true); assert.equal(f.buttons[1].disabled,false);
 f.click(1); assert.equal(f.track.last.left,300); assert.equal(f.track.last.behavior,'smooth');
 f.track.scrollLeft=600; f.listeners.get('trackscroll')(); assert.equal(f.buttons[1].disabled,true);
 f.track.clientWidth=900; f.observer.update(); assert.equal(f.controls.hidden,true);
});
test('RTL and reduced motion use the correct direction and immediate scroll',()=>{
 const f=fixture({rtl:true,reduced:true}); f.click(1); assert.equal(f.track.last.left,-300); assert.equal(f.track.last.behavior,'auto');
 f.track.scrollLeft=-600; f.listeners.get('trackscroll')(); assert.equal(f.buttons[1].disabled,true);
});
test('instances remain independent and unloading removes listeners and observers',()=>{
 const first=fixture(), second=fixture(); first.click(1); assert.equal(second.track.last,undefined);
 first.cleanup(); assert.equal(first.listeners.size,0); assert.equal(first.observer.disconnected,true); assert.equal(second.listeners.size,3);
});
test('editor block selection reveals only cards in its own track',()=>{
 const f=fixture(); let shown=false; const item={valid:true,scrollIntoView:()=>shown=true};
 f.listeners.get('rootshopify:block:select')({target:{closest:()=>item}}); assert.equal(shown,true);
});
test('editor can reveal a direct event article and ignores unrelated blocks',()=>{
 const f=fixture(); let shown=0;
 const item={valid:true,scrollIntoView:()=>shown++};
 const select=f.listeners.get('rootshopify:block:select');
 select({target:{closest:selector=>selector.includes('[data-arcadia-event]')?item:null}});
 assert.equal(shown,1);
 item.valid=false;select({target:{closest:()=>item}});assert.equal(shown,1);
});
