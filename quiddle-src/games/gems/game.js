/* ---------- Did Kathryn Turner Make This? Real M&S launches vs our inventions ---------- */
// Real launches: each one was reported in the press in 2026 (or is a famous old one). src says where.
const REAL=[
 ['Chocolate & cornflake cookies','The November one people queued for','The Week, Nov 2026'],
 ['Chunked ’n loaded malt & caramel cookie','Milk chocolate, malt and caramel, in one cookie','Newswav, Nov 2026'],
 ['Candyfloss-flavoured grapes','Grapes. That taste of candyfloss.','City AM, 2026'],
 ['Chocolate & pistachio sandwich','A sandwich. With chocolate and pistachio.','City AM, 2026'],
 ['Strawberries & cream sandwich','Limited edition, then a bestseller','Yahoo News, 2026'],
 ['Chicken Caesar dip','The salad, but as a dip','The Week, Nov 2026'],
 ['Avocado oil crisps','Crisps, fried in avocado oil','Her Campus, Nov 2026'],
 ['Apple & custard crumble pot','A whole crumble, in a pot','Newswav, Nov 2026'],
 ['Pistachio, matcha & raspberry chia pudding','Three trends, one pot','Newswav, Nov 2026'],
 ['Tiramisu iced cream cake','Tiramisu, but frozen, but a cake','Newswav, Nov 2026'],
 ['The Everything Pasta Sauce','One sauce for everything','Newswav, Oct 2026'],
 ['Pistachio & Parmigiano Reggiano pesto','Pesto, made with pistachio','Newswav, Oct 2026'],
 ['Prepared sofrito mix','The chopping, done for you','Newswav, Oct 2026'],
 ['Blond chocolate & pistachio bar','Caramelised white chocolate and pistachio','Zarina Ivanova, Nov 2026'],
 ['Chocolate custard cream biscuity Easter egg','An Easter egg that is also a custard cream','Yahoo News, 2026'],
 ['Brain Food protein pot','From a range built around omega 3 and B12','Zarina Ivanova, Nov 2026'],
 ['Cold-pressed immunity shot','A tiny bottle of ginger and good intentions','Newswav, Nov 2026'],
 ['Tubby Toast','Teletubbies toast. Launched in 1998.','City AM, 2026']
];
// Made up: we invented these. They are not real products (as far as we know!).
const FAKE=[
 ['Sticky toffee pudding hummus','Chickpeas meet dessert','made up'],
 ['Earl Grey & lemon curd scotch egg','Afternoon tea, but portable','made up'],
 ['Jaffa cake lasagne','Layers of sponge, orange and chocolate','made up'],
 ['Pumpkin spice baked beans','Autumn, in a tin','made up'],
 ['Smoked salmon & marmalade sandwich','Breakfast, rearranged','made up'],
 ['Chocolate orange chicken kiev','Garlic butter swapped for chocolate orange','made up'],
 ['Toffee apple guacamole','Bonfire night, but avocado','made up'],
 ['Turkey & stuffing ice cream','Christmas dinner, frozen','made up'],
 ['Matcha Yorkshire puddings','Green, and very confused','made up'],
 ['Gin & tonic scotch egg','A pub garden in an egg','made up'],
 ['Black pudding & pistachio pesto','Full English meets Italy','made up'],
 ['Tikka masala croissant','Curry night, laminated','made up'],
 ['Sprout & stilton ice lolly','For the bravest Christmas','made up'],
 ['Espresso martini porridge pot','Brunch, after a big night','made up'],
 ['Iced cucumber & elderflower soup','A summer soup with a garden party twist','made up'],
 ['Salted caramel gravy','For the Sunday roast with a sweet tooth','made up'],
 ['Lemon drizzle crisps','Crisps that taste of cake sale','made up'],
 ['Marmite & dark chocolate brownie bites','You’ll love them or hate them','made up']
];
const N=12,SECS=5;
function buildDeck(){const nReal=5+Math.floor(RAND()*3);   // 5 to 7 real ones a day, so you can't just count
  const r=shuffle(REAL).slice(0,nReal).map(x=>({n:x[0],why:x[1],src:x[2],real:true})),f=shuffle(FAKE).slice(0,N-nReal).map(x=>({n:x[0],why:x[1],real:false}));
  return shuffle([...r,...f])}
const GAMEDEF={start(){S.deck=buildDeck();S.k=0;S.log=[];S.streak=0;S.best=0;S.score=0;screen();card()},resume(){S.last=performance.now()}};
function screen(){M.innerHTML=`<div class="hud"><div><span id="sc">0</span><small>right</small></div><div><span id="st">0</span><small>streak</small></div><div><span id="nn">1</span><small>of ${N}</small></div></div>
  <div class="launch" id="launch"></div>
  <div class="trace" id="trace">${Array.from({length:N},()=>'<i></i>').join('')}</div>
  <div class="choose" id="choose"><button class="btn" id="yes">She made it</button><button class="btn ghost" id="no">Made up</button></div>`;
  $('yes').onclick=()=>answer(true);$('no').onclick=()=>answer(false)}
function card(){const c=S.deck[S.k];hud(`${S.k+1}/${N}`);$('nn').textContent=S.k+1;S.t=SECS;S.locked=false;
  const L=$('launch');L.className='launch';L.innerHTML=`<span class="new">New at M&amp;S?</span><b>${c.n}</b><span class="why">${c.why}</span><span class="clock" id="clk"></span>`;
  $('choose').style.visibility='visible';play('slap');
  S.live=true;S.last=performance.now();cancelAnimationFrame(S.raf);S.raf=requestAnimationFrame(loop)}
function loop(now){if(!S.live)return;S.raf=requestAnimationFrame(loop);const dt=Math.min(.1,(now-S.last)/1000);S.last=now;if(S.paused)return;
  const before=Math.ceil(S.t);S.t-=dt;const c=$('clk');if(c)c.style.width=Math.max(0,S.t/SECS*100)+'%';if(Math.ceil(S.t)<before&&S.t<2.5&&S.t>0)play('tick');
  if(S.t<=0)answer(null)}
function answer(said){if(S.locked)return;S.locked=true;S.live=false;cancelAnimationFrame(S.raf);const c=S.deck[S.k],ok=said===c.real;
  S.log.push(ok);if(ok){S.score++;S.streak++;S.best=Math.max(S.best,S.streak)}else S.streak=0;
  play(ok?(S.streak%4===0?'till':'ping'):'bad');
  $('sc').textContent=S.score;$('st').textContent=S.streak;$('trace').children[S.k].className=ok?'g':'r';
  const L=$('launch');L.className='launch '+(c.real?'real':'fake');
  L.querySelector('.why').textContent=c.real?`A real M&S launch. ${c.src}.`:'Not her. We made this one up.';
  L.insertAdjacentHTML('beforeend',`<span class="stamp">${c.real?'SHE MADE IT':'MADE UP'}</span>`);
  if(said===null)toast('Too slow!');
  $('choose').style.visibility='hidden';
  setTimeout(()=>{S.k++;S.k>=N?end():card()},ok?900:1500)}
function end(){const r=S.score>=12?'Director material':S.score>=10?'Hidden gem hunter':S.score>=8?'Taste tester':S.score>=6?'Foodhall regular':'Fell for it';
  finish({label:`${S.score} of ${N} right · best streak ${S.best}`,stamp:r,bad:S.score<6,line:`${S.score}/${N} · ${r}`,
    body:`<div class="rcpt">${S.deck.map((c,k)=>`<div><span>${S.log[k]?'✓':'✗'} ${c.n}</span><span>${c.real?'She made it':'Made up'}</span></div>`).join('')}</div>`,
    note:'<span class="fine">Unofficial fan game, not made by M&amp;S. Real ones are M&amp;S launches reported in the press. Made-up ones are ours.</span>',
    share0:`\u{1F36A} ${GAME.title}${tag()}\n${S.score}/${N} spotted\n${S.log.map(x=>x?'\u{1F7E9}':'\u{1F7E5}').join('')}\n${r}`})}
window.__quiddle={REAL,FAKE,deck:s=>{RAND=mulberry(s);return buildDeck()}};
