const {test} = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const source = fs.readFileSync('assets/arcadia-events.js','utf8');
function fixture(entries) {
  let init;
  const listeners = new Map(), subscriptions = new Map(), order = [];
  const cards = entries.map(([start,status='upcoming'])=>({dataset:{arcadiaStart:start,arcadiaStatus:status},hidden:false,parentElement:{append(card){const i=order.indexOf(card);if(i>=0)order.splice(i,1);order.push(card);}}}));
  order.push(...cards);
  const empty={hidden:true};
  const root={dataset:{layout:'strip'},querySelectorAll:()=>cards,querySelector:s=>s==='[data-arcadia-event-empty]'?empty:null,contains:c=>cards.includes(c),addEventListener:(e,f)=>listeners.set(e,f),removeEventListener:e=>listeners.delete(e)};
  const A={modules:{register:(name,fn)=>init=fn},utils:{date:s=>{const d=new Date(s);return Number.isNaN(d.getTime())?null:d;}},events:{on:(e,f)=>{subscriptions.set(e,f);return ()=>subscriptions.delete(e);},emit:()=>{}}};
  vm.runInNewContext(source,{window:{Arcadia:A},Date});
  const cleanup=init(root);
  return {root,cards,order,empty,listeners,subscriptions,cleanup};
}
test('upcoming strip orders dates, hides past/cancelled/completed, retains undated manual events',()=>{
 const f=fixture([['2099-06-01'],['2000-01-01'],['2099-02-01'],['','upcoming'],['2099-04-01','cancelled'],['2099-05-01','completed']]);
 assert.deepEqual(f.cards.map(c=>c.hidden),[false,true,false,false,true,true]);
 assert.deepEqual(f.order.filter(c=>!c.hidden).map(c=>c.dataset.arcadiaStart),['2099-02-01','2099-06-01','']);
 assert.equal(f.empty.hidden,true);
});
test('empty state reacts to countdown completion; instances and cleanup stay independent',()=>{
 const first=fixture([['2099-01-01']]), second=fixture([['2099-01-01']]);
 first.cards[0].dataset.arcadiaStatus='completed';
 first.listeners.get('arcadia:countdown:complete')();
 assert.equal(first.empty.hidden,false);assert.equal(second.empty.hidden,true);
 first.cleanup();assert.equal(first.listeners.size,0);assert.equal(first.subscriptions.size,0);
 assert.equal(first.cards[0].hidden,false);assert.equal(second.listeners.size,3);
});
test('empty source and expired-only source expose the empty state',()=>{
 assert.equal(fixture([]).empty.hidden,false);
 assert.equal(fixture([['2000-01-01']]).empty.hidden,false);
});
