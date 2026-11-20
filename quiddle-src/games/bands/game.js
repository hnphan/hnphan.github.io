/* ---------- Price Bands: Connections, but the groups are price bands ---------- */
// bands have gaps between them so nothing sits on a boundary
const BANDS=[[0,99,'Under £1'],[115,215,'£1.15 to £2.15'],[220,330,'£2.20 to £3.30'],[380,600,'£3.80 to £6'],[790,1600,'£7.90 to £16'],[2000,4000,'£20 to £40'],[5500,12000,'£55 to £120'],[15000,50000,'Over £150']];
const LIVES=4;
function buildGrid(){
  for(let t=0;t<3000;t++){
    const bands=shuffle(BANDS.map((_,i)=>i)).slice(0,4).sort((a,b)=>a-b),fams=new Set(),groups=[];let ok=true;
    for(const b of bands){const [lo,hi]=BANDS[b],g=[];
      for(const i of shuffle(ITEMS.map((_,i)=>i))){if(g.length===4)break;const it=ITEMS[i];if(it.p>=lo&&it.p<=hi&&!fams.has(it.g)){g.push(i);fams.add(it.g)}}
      if(g.length<4){ok=false;break}groups.push({b,items:g})}
    if(ok)return {groups,order:shuffle(groups.flatMap(g=>g.items))}}
  throw new Error('no grid')}
const GAMEDEF={start(){const G=buildGrid();S.groups=G.groups;S.order=G.order;S.solved=[];S.sel=[];S.lives=LIVES;S.guesses=[];draw()}};
// long words get a soft hyphen in the middle so narrow tiles break them cleanly
const soft=s=>s.replace(/[A-Za-z\u00C0-\u017F]{10,}/g,w=>w.slice(0,Math.ceil(w.length/2))+'\u00AD'+w.slice(Math.ceil(w.length/2)));
const groupOf=i=>S.groups.findIndex(g=>g.items.includes(i));
function draw(){hud(`${S.solved.length}/4 found`);
  const left=S.order.filter(i=>!S.solved.some(s=>S.groups[s].items.includes(i)));
  const rows=S.solved.map(s=>{const G=S.groups[s];return `<div class="solved b${s}"><b>${BANDS[G.b][2]}</b><span>${G.items.map(i=>`${ITEMS[i].n} ${money(ITEMS[i].p)}`).join(' · ')}</span></div>`}).join('');
  M.innerHTML=`<div class="q"><b>Four groups of four that cost about the same</b></div>
    <div class="grid" id="grid" lang="en-GB">${rows}${left.map(i=>`<button class="tile${S.sel.includes(i)?' sel':''}" data-i="${i}"><b>${soft(ITEMS[i].n)}</b><i>${ITEMS[i].w}</i></button>`).join('')}</div>
    <div class="ctrl"><div class="lives">${Array.from({length:LIVES},(_,k)=>`<i class="${k<S.lives?'':'lost'}"></i>`).join('')}</div>
      <div style="display:flex;gap:6px"><button class="btn ghost" id="mix">Shuffle</button><button class="btn" id="sub">Submit</button></div></div>`;
  document.querySelectorAll('.tile').forEach(b=>b.onclick=()=>{const i=+b.dataset.i,k=S.sel.indexOf(i);if(k>=0)S.sel.splice(k,1);else if(S.sel.length<4)S.sel.push(i);play('slap');draw()});
  $('mix').onclick=()=>{S.order=shuffle(S.order);draw()};
  const sb=$('sub');sb.disabled=S.sel.length!==4;sb.style.opacity=S.sel.length===4?1:.35;sb.onclick=submit}
function submit(){if(S.sel.length!==4)return;const gs=S.sel.map(groupOf),counts={};gs.forEach(g=>counts[g]=(counts[g]||0)+1);const best=Math.max(...Object.values(counts));
  S.guesses.push(gs);
  if(best===4){S.solved.push(gs[0]);S.sel=[];play('till');draw();if(S.solved.length===4)setTimeout(end,900);return}
  S.lives--;play('bad');toast(best===3?'One away…':'Not a band');
  document.querySelectorAll('.tile.sel').forEach(t=>t.classList.add('shake'));
  if(S.lives<=0){S.solved=[...S.solved,...[0,1,2,3].filter(k=>!S.solved.includes(k))];S.sel=[];setTimeout(()=>{draw();setTimeout(end,1600)},500);return}
  setTimeout(draw,350)}
function end(){const won=S.lives>0,mis=LIVES-S.lives;const sq=['\u{1F7E6}','\u{1F7EA}','⬛','\u{1F7E5}'];
  const r=!won?'Skint':mis===0?'Price oracle':mis===1?'Sharp':mis===2?'Savvy':'Scraped it';
  finish({label:won?`Solved with ${mis} mistake${mis===1?'':'s'}`:'Out of lives',stamp:r,bad:!won,line:`${won?mis+' mistakes':'Not solved'} · ${r}`,
    body:`<div class="rcpt">${S.groups.map(G=>`<div><span>${BANDS[G.b][2]}</span><span>${G.items.length} things</span></div>`).join('')}</div>`,
    share0:`\u{1F4B7} ${GAME.title}${tag()}\n${S.guesses.map(g=>g.map(x=>sq[x]).join('')).join('\n')}\n${r}`})}
window.__quiddle={ITEMS,BANDS,grid:s=>{RAND=mulberry(s);return buildGrid()}};
