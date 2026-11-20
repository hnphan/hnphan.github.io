/* ---------- Beat Grandma: slide to guess, closer than Grandma wins the round ---------- */
const ROUNDS=5,LO=10,HI=50000;  // slider runs 10p to £500 on a log scale
const toP=t=>{const p=LO*Math.pow(HI/LO,t/1000);return p<100?Math.round(p):p<2000?Math.round(p/5)*5:p<10000?Math.round(p/10)*10:Math.round(p/100)*100};
const toT=p=>Math.round(Math.log(p/LO)/Math.log(HI/LO)*1000);
const err=(g,p)=>Math.abs(Math.log(g/p));  // how far off, as a ratio, so £1 off a Freddo hurts more than £1 off a passport
const OLD=["In my day that was {g}!","{g}, surely. I'm not made of money.","Ooh, {g} at most. Daylight robbery otherwise.","When I was a girl, {g}. And we were grateful.","{g}. Same as it was at the Co-op."];
const NEAR=["I was in Tesco on Tuesday. {g}.","{g}. I read the Daily Mail, dear.","Your grandad checked. {g}."];
const POSH=["Sounds posh. {g}?","{g}, I should think. They saw you coming.","Fancy. Must be {g}."];
function buildRounds(){let ids;
  for(let t=0;t<200;t++){ids=pickDistinct(ROUNDS,it=>it.p>=30&&it.p<=45000);if(ids.filter(i=>ITEMS[i].k==='niche').length>=1)break}
  return ids.map(i=>{const p=ITEMS[i].p,x=RAND(),kind=x<.5?'near':x<.85?'old':'posh',f=kind==='near'?.72+RAND()*.5:kind==='old'?.35+RAND()*.3:1.3+RAND()*.5;
    const g=toP(toT(p*f)),lines=kind==='near'?NEAR:kind==='posh'?POSH:OLD;return {i,g,quip:lines[Math.floor(RAND()*lines.length)].replace('{g}',money(g))}})}
const GAMEDEF={start(){S.rounds=buildRounds();S.n=0;S.log=[];round()}};
function round(){const R=S.rounds[S.n],it=ITEMS[R.i];hud(`${S.n+1}/${ROUNDS}`);S.t=500;
  M.innerHTML=`<div class="card"><span class="lbl">Round ${S.n+1} · you ${S.log.filter(x=>x.win).length} – ${S.log.filter(x=>!x.win).length} Grandma</span><b>${it.n}</b><i>${it.w}</i></div>
    <div class="guess"><div class="val" id="val"></div>
      <div><input type="range" class="slider" id="sl" min="0" max="1000" value="${S.t}" aria-label="Your guess"><div class="scale">${[10,100,1000,10000,50000].map(p=>`<span style="left:${toT(p)/10}%">${money(p).replace('.00','')}</span>`).join('')}</div></div>
      <div class="nudge"><button id="dn" aria-label="A bit less">−</button><button id="up" aria-label="A bit more">+</button></div></div>
    <div class="scoreline"><p class="note">Slide to guess</p><button class="btn" id="lock">Lock in</button></div>`;
  const show=()=>{$('val').textContent=money(toP(S.t))};show();
  $('sl').oninput=e=>{S.t=+e.target.value;show()};
  const step=d=>{const p=toP(S.t);let t=S.t;while(toP(t)===p&&t>=0&&t<=1000)t+=d;S.t=Math.max(0,Math.min(1000,t));$('sl').value=S.t;show();play('slap')};
  $('dn').onclick=()=>step(-1);$('up').onclick=()=>step(1);
  $('lock').onclick=reveal;play('slap')}
function reveal(){const R=S.rounds[S.n],it=ITEMS[R.i],p=it.p,me=toP(S.t),eMe=err(me,p),eG=err(R.g,p),win=eMe<=eG;
  S.log.push({win,me});play(win?'till':'bad');
  const pct=g=>{const d=Math.round((g-p)/p*100);return d===0?'spot on':`${Math.abs(d)}% ${d>0?'over':'under'}`};
  M.querySelector('.guess').outerHTML=`<div class="versus">
      <div class="vs real"><span class="who">Real price</span><span class="amt">${money(p)}</span><span class="off">${freddos(p)}</span></div>
      <div class="vs ${win?'win':''}"><span class="who">You${win?' · win':''}</span><span class="amt">${money(me)}</span><span class="off">${pct(me)}</span></div>
      <div class="vs ${win?'':'win'}"><span class="who">Grandma${win?'':' · wins'}</span><span class="amt">${money(R.g)}</span><span class="off">${pct(R.g)}</span></div>
      <p class="quip">“${R.quip}”</p></div>`;
  M.querySelector('.scoreline').innerHTML=`<div><div class="verdict" style="color:${win?'var(--ink)':'var(--bad)'}">${win?'You win this one':'Grandma takes it'}</div><div class="src">Checked: ${it.src}, ${it.when}</div></div><button class="btn" id="next">${S.n+1>=ROUNDS?'Results':'Next'}</button>`;
  arm($('next'),900);$('next').onclick=()=>{S.n++;S.n>=ROUNDS?end():round()}}
function end(){const w=S.log.filter(x=>x.win).length,l=ROUNDS-w,beat=w>l;
  const r=w===5?'Whitewash':w===4?'Grandma fuming':w===3?'Beat Grandma':w===2?'Grandma wins':w===1?'Grandma gloats':'Grandma’s pet';
  finish({label:`You ${w} – ${l} Grandma`,stamp:r,bad:!beat,line:`${w}–${l} · ${r}`,
    body:`<div class="rcpt">${S.rounds.map((R,k)=>`<div><span>${S.log[k].win?'✓':'✗'} ${ITEMS[R.i].n}</span><span>${money(ITEMS[R.i].p)}</span></div>`).join('')}</div>`,
    note:beat?'She says you must have looked it up.':'She’s putting the kettle on to celebrate.',
    share0:`\u{1F475} ${GAME.title}${tag()} · me ${w}–${l} Grandma\n${S.log.map(x=>x.win?'\u{1F7E9}':'\u{1F475}').join('')}\n${r}`})}
window.__quiddle={ITEMS,build:s=>{RAND=mulberry(s);return buildRounds()},toP,toT,err};
