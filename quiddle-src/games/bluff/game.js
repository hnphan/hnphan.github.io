/* ---------- Real or Rip-off: one real price, two believable fakes ---------- */
const ROUNDS=6;
const RANKS=[[0,'Mugged off'],[2,'Easy mark'],[3,'Half wise'],[4,'Sharp'],[5,'Fraud squad'],[6,'Human barcode']];
// fakes copy the real price's style (.99 endings, round 5p, whole pounds) so the shape gives nothing away
const style=p=>p>=1000&&p%100===0?'pound':p%10===9?'nine':p%5===0?'five':'penny';
const fit=(x,st)=>{x=Math.max(10,x);return st==='pound'?Math.round(x/100)*100:st==='nine'?Math.max(9,Math.round((x+1)/10)*10-1):st==='five'?Math.round(x/5)*5:Math.round(x)};
const LOW=[.5,.6,.7,.78],HIGH=[1.28,1.4,1.6,1.85];
function fakes(p){const st=style(p);
  // pattern decides where the real price sits once sorted: bottom, middle or top, a third each
  const pat=Math.floor(RAND()*3),from=pat===0?[HIGH,HIGH]:pat===1?[LOW,HIGH]:[LOW,LOW];
  for(let t=0;t<200;t++){const f=from.map(set=>set[Math.floor(RAND()*set.length)]),v=f.map(x=>fit(p*x,st));
    if(apart(v[0],v[1])&&apart(v[0],p)&&apart(v[1],p)&&v[0]!==v[1])return v}
  return [fit(p*.6,st),fit(p*1.5,st)]}
function buildRounds(){let ids;
  // at least two oddballs a day
  for(let t=0;t<200;t++){ids=pickDistinct(ROUNDS,it=>it.p>=50);if(ids.filter(i=>ITEMS[i].k==='niche').length>=2)break}
  return ids.map(i=>{const ps=[ITEMS[i].p,...fakes(ITEMS[i].p)].sort((a,b)=>a-b);return {i,ps}})}
const GAMEDEF={start(){S.rounds=buildRounds();S.n=0;S.log=[];round()}};
function round(){const R=S.rounds[S.n],it=ITEMS[R.i];hud(`${S.n+1}/${ROUNDS}`);S.picked=false;
  M.innerHTML=`<div class="card"><span class="lbl">Which is the real price?</span><b>${it.n}</b><i>${it.w}</i></div>
    <div class="tags" id="tags">${R.ps.map(p=>`<button class="tagb" data-p="${p}"><span>${money(p)}</span></button>`).join('')}</div>
    <div class="foot"><div><div class="verdict" id="vd"><span class="dots">${Array.from({length:ROUNDS},(_,k)=>`<i class="${S.log[k]===true?'g':S.log[k]===false?'r':''}"></i>`).join('')}</span></div><div class="src" id="src"></div></div><button class="btn" id="next" hidden>Next</button></div>`;
  play('slap');document.querySelectorAll('.tagb').forEach(b=>b.onclick=()=>pick(+b.dataset.p,b))}
function pick(p,btn){if(S.picked)return;S.picked=true;const R=S.rounds[S.n],it=ITEMS[R.i],ok=p===it.p;S.log.push(ok);
  btn.classList.add('mine');document.querySelectorAll('.tagb').forEach(b=>{b.disabled=true;if(+b.dataset.p===it.p){b.classList.add('real');b.insertAdjacentHTML('beforeend',`<small>${freddos(it.p)}</small>`)}});
  $('tags').classList.add('shown');play(ok?'till':'bad');
  $('vd').textContent=ok?['Spotted it.','Not fooled.','Real deal.'][S.n%3]:['Had you there.','Rip-off!','Fooled ya.'][S.n%3];$('vd').style.color=ok?'var(--ink)':'var(--bad)';
  $('src').textContent=`Checked: ${it.src}, ${it.when}`;
  const nb=$('next');nb.hidden=false;nb.textContent=S.n+1>=ROUNDS?'Results':'Next';arm(nb,900);nb.onclick=()=>{S.n++;S.n>=ROUNDS?end():round()}}
function end(){const got=S.log.filter(Boolean).length,r=RANKS.filter(x=>got>=x[0]).pop()[1];
  finish({label:`${got} of ${ROUNDS} spotted`,stamp:r,bad:got<3,line:`${got}/${ROUNDS} · ${r}`,
    body:`<div class="rcpt">${S.rounds.map((R,k)=>`<div><span>${S.log[k]?'✓':'✗'} ${ITEMS[R.i].n}</span><span>${money(ITEMS[R.i].p)}</span></div>`).join('')}</div>`,
    share0:`\u{1F3F7}️ ${GAME.title}${tag()} · ${got}/${ROUNDS}\n${S.log.map(x=>x?'\u{1F7E9}':'\u{1F7E5}').join('')}\n${r}`})}
window.__quiddle={ITEMS,build:s=>{RAND=mulberry(s);return buildRounds()}};
