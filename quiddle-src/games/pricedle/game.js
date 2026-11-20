/* ---------- Pricedle: guess one price digit by digit ---------- */
const TRIES=6;
const RANKS=['','Psychic','Genius','Sharp','Solid','Close call','Phew'];
// the price as a fixed set of digits, e.g. £13.45 -> "1345" shown as £ _ _ . _ _
const digitsOf=p=>String(p).padStart(3,'0');
function pickItem(){const c=ITEMS.map((_,i)=>i).filter(i=>ITEMS[i].p>=100&&ITEMS[i].p<100000);return c[Math.floor(RAND()*c.length)]}
const GAMEDEF={start(){S.i=pickItem();S.ans=digitsOf(ITEMS[S.i].p);S.rows=[];S.cur='';S.over=false;S.live=false;board()}};
function rowHTML(d,marks,typing){const n=S.ans.length;let h='<div class="row"><span class="cur">£</span>';
  for(let k=0;k<n;k++){if(k===n-2)h+='<span class="pt">.</span>';const ch=d[k]||'',m=marks?marks[k]:'';h+=`<div class="cell ${m}${typing&&ch?' typed':''}">${ch}</div>`}
  return h+'</div>'}
function board(){const it=ITEMS[S.i];hud(`Guess ${Math.min(S.rows.length+1,TRIES)}/${TRIES}`);
  let rows='';for(let r=0;r<TRIES;r++){const R=S.rows[r];rows+=R?rowHTML(R.d,R.m):r===S.rows.length&&!S.over?rowHTML(S.cur,null,true):rowHTML('',null)}
  M.innerHTML=`<div class="card"><span class="lbl">What does this cost?</span><b>${it.n}</b><i>${it.w}</i></div>
    <div class="board" id="board">${rows}</div>
    <div class="legend">Dark = right · ▲ go higher · ▼ go lower</div>
    <div class="keys">${[1,2,3,4,5,6,7,8,9,0].map(n=>`<button class="key" data-k="${n}">${n}</button>`).join('')}<button class="key wide" data-k="del">Delete</button><button class="key wide go" data-k="go" style="grid-column:span 6">Check</button></div>`;
  document.querySelectorAll('.key').forEach(b=>b.onclick=()=>key(b.dataset.k))}
function key(k){if(S.over)return;const n=S.ans.length;
  if(k==='del')S.cur=S.cur.slice(0,-1);else if(k==='go')return guess();else if(S.cur.length<n)S.cur+=k;
  play('slap');board()}
function guess(){const n=S.ans.length;if(S.cur.length<n){const rs=document.querySelectorAll('.row')[S.rows.length];rs&&rs.classList.add('shake');toast(`Needs ${n} digits`);return}
  const m=[...S.cur].map((c,k)=>c===S.ans[k]?'g':+S.ans[k]>+c?'u':'d');S.rows.push({d:S.cur,m});S.cur='';
  const win=m.every(x=>x==='g');if(win||S.rows.length>=TRIES){S.over=true;play(win?'till':'bad');board();setTimeout(end,900);return}
  play('ping');board()}
function end(){const it=ITEMS[S.i],win=S.rows[S.rows.length-1].m.every(x=>x==='g'),n=S.rows.length;
  const grid=S.rows.map(R=>R.m.map(x=>x==='g'?'\u{1F7E9}':x==='u'?'⬆️':'⬇️').join('')).join('\n');
  const score=win?`${n}/${TRIES}`:`X/${TRIES}`,r=win?RANKS[n]:'Skint';
  finish({label:win?`Got it in ${n}`:'Out of guesses',stamp:r,bad:!win,line:`${score} · ${r}`,
    body:`<p class="note"><b>${it.n}</b> (${it.w}) costs <b>${money(it.p)}</b>.<br>That's ${freddos(it.p).replace('≈ ','about ').replace('= ','')}.</p><div class="src">Checked: ${it.src}, ${it.when}</div>`,
    share0:`\u{1F522} ${GAME.title}${tag()} · ${score}\n${grid}`})}
window.__quiddle={ITEMS,pick:s=>{RAND=mulberry(s);return pickItem()}};
