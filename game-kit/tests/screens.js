// Smoke test for a game built from the kit: plays the flow at several phone sizes,
// fails on page errors or any scrolling. Usage: node game-kit/tests/screens.js path/to/index.html
// (Playwright must be installed; screenshots land next to this script in ./shots)
const {chromium}=require('playwright'),path=require('path'),fs=require('fs');
const file='file://'+path.resolve(process.argv[2]);const out=path.join(__dirname,'shots');fs.mkdirSync(out,{recursive:true});
(async()=>{const b=await chromium.launch();let bad=0;
for(const [w,h] of [[320,568],[375,667],[390,844],[1280,720]]){const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:1});const errs=[];p.on('pageerror',e=>errs.push(e.message));
  const over=async n=>{const d=await p.evaluate(()=>{const m=document.getElementById('main');return [document.documentElement.scrollHeight-innerHeight,m.scrollHeight-m.clientHeight]});if(d[0]>1||d[1]>1){bad++;console.log(`${w}x${h} ${n}: scrolls`,d)}await p.screenshot({path:`${out}/${w}x${h}-${n}.png`})};
  await p.goto(file);await p.evaluate(()=>localStorage.clear());await p.goto(file);await p.waitForTimeout(300);await over('title');
  await p.click('#go');for(let r=0;r<10;r++){await p.waitForTimeout(400);if(await p.$('#mready')){await over('intro'+r);await p.click('#mready');await p.waitForTimeout(800);
      for(let k=0;k<60&&!(await p.$('#mnext'));k++){const c=await p.$('#mc');if(c){const bb=await c.boundingBox();await p.mouse.click(bb.x+Math.random()*bb.width,bb.y+Math.random()*bb.height)}await p.waitForTimeout(150)}
      await p.waitForTimeout(1300);await over('result'+r);await p.click('#mnext')}else if(await p.$('#again')){await p.waitForTimeout(1300);await over('rank');break}}
  if(errs.length){bad++;console.log(`${w}x${h} errors:`,errs)}await p.close()}
console.log(bad?`FAIL (${bad} problems)`:'PASS: no errors, no scrolling');await b.close();process.exit(bad?1:0)})();
