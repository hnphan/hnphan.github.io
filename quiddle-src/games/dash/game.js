/* ---------- Budget Dash: grab things off the belt, get close to £20 without going over ---------- */
const BUDGET=2000,BELT=18,SHOW=1.9;
function buildBelt(){
  // everyday-ish things up to £8, families mixed, a couple of repeats of cheap staples allowed later on
  const pool=ITEMS.map((_,i)=>i).filter(i=>ITEMS[i].p>=39&&ITEMS[i].p<=800);
  const out=[];let last=[];
  while(out.length<BELT){const i=pool[Math.floor(RAND()*pool.length)];if(last.includes(ITEMS[i].g)||out.includes(i))continue;out.push(i);last.push(ITEMS[i].g);if(last.length>4)last.shift()}
  return out}
const GAMEDEF={start(){S.belt=buildBelt();S.k=-1;S.got=[];S.live=true;S.t=0;screen();nextItem();S.last=performance.now();cancelAnimationFrame(S.raf);S.raf=requestAnimationFrame(loop)},
  resume(){S.last=performance.now()}};
function screen(){M.innerHTML=`<div class="pocket"><small>In your pocket<b>Don't go over</b></small><strong>£20.00</strong></div>
    <div class="belt" id="belt"></div>
    <div class="basket" id="basket"><em>Your basket is empty</em></div>
    <div class="dashfoot"><p class="note" id="left"></p><button class="btn" id="out">Check out</button></div>`;
  $('out').onclick=checkout}
function nextItem(){S.k++;if(S.k>=BELT)return checkout();S.t=SHOW;const it=ITEMS[S.belt[S.k]];hud(`${S.k+1}/${BELT}`);
  const b=$('belt');const old=b.querySelector('.item:not(.got)');if(old){old.classList.add('gone');setTimeout(()=>old.remove(),220)}
  b.insertAdjacentHTML('beforeend',`<button class="item" id="it${S.k}"><b>${it.n}</b><i>${it.w}</i><span class="hint">Tap to grab</span><span class="clock" id="clk${S.k}"></span></button>`);
  const el=$('it'+S.k);el.onpointerdown=e=>{e.preventDefault();grab(el)};
  $('left').textContent=`${BELT-S.k-1} more on the belt`}
function grab(el){if(!S.live||S.paused||el.classList.contains('got'))return;S.got.push(S.belt[S.k]);el.classList.add('got');setTimeout(()=>el.remove(),300);play('slap');
  const it=ITEMS[S.belt[S.k]];$('basket').innerHTML=S.got.map(i=>`<span>${ITEMS[i].n}</span>`).join('');
  S.t=Math.min(S.t,.35)}  // move on quickly after a grab
function loop(now){if(!S.live)return;S.raf=requestAnimationFrame(loop);const dt=Math.min(.1,(now-S.last)/1000);S.last=now;if(S.paused)return;
  S.t-=dt;const c=$('clk'+S.k);if(c)c.style.width=Math.max(0,S.t/SHOW*100)+'%';if(S.t<=0)nextItem()}
function checkout(){if(!S.live)return;S.live=false;cancelAnimationFrame(S.raf);play('till');
  let run=0;const lines=S.got.map(i=>{run+=ITEMS[i].p;return `<div class="${run>BUDGET?'bust':''}"><span>${ITEMS[i].n}</span><span>${money(ITEMS[i].p)}</span></div>`});
  const total=run,bust=total>BUDGET,change=BUDGET-total;
  const r=bust?'Bust!':change===0?'Exact change':change<=50?'Penny perfect':change<=150?'Sharp shopper':change<=400?'Savvy':change<=800?'Careful':'Tight';
  const verdict=bust?`${money(total-BUDGET)} over`:change===0?'Not a penny left':`${money(change)} change`;
  finish({label:`${S.got.length} things · ${money(total)}`,stamp:r,bad:bust||change>800,line:`${verdict} · ${r}`,
    body:`<div class="rcpt">${lines.join('')||'<div><span>Nothing. Very sensible.</span><span>£0.00</span></div>'}<div class="tot ${bust?'bust':''}"><span>Total</span><span>${money(total)}</span></div><div><span>${bust?'Over by':'Change'}</span><span>${money(Math.abs(change))}</span></div></div>`,
    share0:`\u{1F6D2} ${GAME.title}${tag()} · ${verdict}\n${S.got.map(()=>'\u{1F7E6}').join('')}${bust?'\u{1F4A5}':'✅'}\n${r}`})}
window.__quiddle={ITEMS,belt:s=>{RAND=mulberry(s);return buildBelt()}};
