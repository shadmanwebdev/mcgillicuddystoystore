const {test}=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
function fixture(){
 let init, focused=false;
 const listeners=new Map();
 const node=name=>({addEventListener:(e,f)=>listeners.set(name+e,f),removeEventListener:e=>listeners.delete(name+e)});
 const panels=[0,1].map(i=>({...node('p'+i),open:false,contains:x=>x===i,querySelector:()=>({focus(){focused=true;}})}));
 const root={...node('root'),dataset:{hoverMenu:'true'},querySelectorAll:s=>s==='details[open]'?panels.filter(p=>p.open):panels,contains:x=>x==='inside'};
 const doc={...node('doc'),activeElement:null};
 vm.runInNewContext(fs.readFileSync('assets/arcadia-navigation.js','utf8'),{window:{Arcadia:{modules:{register:(name,fn)=>init=fn}},matchMedia:()=>({matches:true})},document:doc,setTimeout,clearTimeout});
 const cleanup=init(root);
 return {panels,listeners,cleanup,focused:()=>focused};
}
 test('opening one desktop menu closes the other',()=>{const f=fixture();f.panels[0].open=true;f.panels[1].open=true;f.listeners.get('p1toggle')();assert.equal(f.panels[0].open,false);f.cleanup();});
 test('Escape closes panels and returns focus to their summary',()=>{const f=fixture();f.panels[0].open=true;f.listeners.get('rootkeydown')({key:'Escape',target:{closest:()=>f.panels[0]}});assert.equal(f.panels[0].open,false);assert.equal(f.focused(),true);f.cleanup();});
 test('outside click closes panels and editor cleanup removes listeners',()=>{const f=fixture();f.panels[0].open=true;f.listeners.get('docclick')({target:'outside'});assert.equal(f.panels[0].open,false);f.cleanup();assert.equal(f.listeners.size,0);});
 test('mouse hover opens the menu but touch hover does not',()=>{const f=fixture();f.listeners.get('p0pointerenter')({pointerType:'touch'});assert.equal(f.panels[0].open,false);f.listeners.get('p0pointerenter')({pointerType:'mouse'});assert.equal(f.panels[0].open,true);f.cleanup();});