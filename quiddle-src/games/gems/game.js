/* ---------- Kathryn Turner's Hidden Gem? Real M&S launches vs our inventions ---------- */
// Real: each one is an M&S launch reported in the press. f=1 means reports say it was in her videos or her picks.
// [name, tagline, pack shape, source, featured]
const REAL=[
 ['Chocolate & cornflake cookies','The November one people queued for','cookie','The Week, Nov 2026',1],
 ['Chunked ’n loaded malt & caramel cookie','Milk chocolate, malt and caramel, in one cookie','cookie','Newswav, Nov 2026',1],
 ['Candyfloss-flavoured grapes','Grapes. That taste of candyfloss.','grapes','City AM, 2026',1],
 ['Chocolate & pistachio sandwich','A sandwich. With chocolate and pistachio.','sandwich','City AM, 2026',1],
 ['Avocado oil crisps','Crisps, cooked in avocado oil','bag','Her Campus, Nov 2026',1],
 ['Apple & custard crumble pot','A whole crumble, in a pot','pot','Newswav, Nov 2026',1],
 ['Pistachio, matcha & raspberry chia pudding','Three trends, one pot','pot','Newswav, Nov 2026',1],
 ['Tiramisu iced cream cake','Tiramisu, but frozen, but a cake','cake','Newswav, Nov 2026',1],
 ['The Everything Pasta Sauce','One sauce for everything','jar','Newswav, Oct 2026',1],
 ['Pistachio & Parmigiano Reggiano pesto','Pesto, made with pistachio','jar','Newswav, Oct 2026',1],
 ['Prepared sofrito mix','The chopping, done for you','tray','Newswav, Oct 2026',1],
 ['Cold-pressed immunity shot','A tiny bottle of ginger and good intentions','bottle','Newswav, Nov 2026',1],
 ['Strawberries & cream sandwich','Limited edition, then a bestseller','sandwich','Yahoo News, 2026',0],
 ['Chicken Caesar dip','The salad, but as a dip','pot','The Week, Nov 2026',0],
 ['Blond chocolate & pistachio bar','Caramelised white chocolate and pistachio','bar','Zarina Ivanova, Nov 2026',0],
 ['Chocolate custard cream biscuity Easter egg','An Easter egg that is also a custard cream','egg','Yahoo News, 2026',0],
 ['Brain Food protein pot','From a range built around omega 3 and B12','pot','Zarina Ivanova, Nov 2026',0],
 ['Tubby Toast','Teletubbies toast, launched in 1998','toast','City AM, 2026',2]
];
// Made up: we invented these. Not real products, as far as we know.
const FAKE=[
 ['Sticky toffee pudding hummus','Chickpeas meet dessert','pot'],
 ['Earl Grey & lemon curd scotch egg','Afternoon tea, but portable','scotch'],
 ['Jaffa cake lasagne','Layers of sponge, orange and chocolate','tray'],
 ['Pumpkin spice baked beans','Autumn, in a tin','tin'],
 ['Smoked salmon & marmalade sandwich','Breakfast, rearranged','sandwich'],
 ['Chocolate orange chicken kiev','Garlic butter swapped for chocolate orange','tray'],
 ['Toffee apple guacamole','Bonfire night, but avocado','pot'],
 ['Turkey & stuffing ice cream','Christmas dinner, frozen','tub'],
 ['Matcha Yorkshire puddings','Green, and very confused','tray'],
 ['Gin & tonic scotch egg','A pub garden in an egg','scotch'],
 ['Black pudding & pistachio pesto','Full English meets Italy','jar'],
 ['Tikka masala croissant','Curry night, laminated','croissant'],
 ['Sprout & stilton ice lolly','For the bravest Christmas','lolly'],
 ['Espresso martini porridge pot','Brunch, after a big night','pot'],
 ['Iced cucumber & elderflower soup','A summer soup with a garden party twist','pot'],
 ['Salted caramel gravy','For the Sunday roast with a sweet tooth','jar'],
 ['Lemon drizzle crisps','Crisps that taste of cake sale','bag'],
 ['Marmite & dark chocolate brownie bites','You’ll love them or hate them','box']
];

/* ---------- pack illustrations: one riso-print style for every product, real or made up ----------
   Shape comes from the pack type, colours from the flavours in the name, so the picture never gives the answer away. */
const FLAV=[[/chocolate orange|jaffa|orange|marmalade/i,'#e8862a'],[/dark chocolate|brownie|chocolate|cocoa/i,'#6b3e26'],[/pistachio|sprout/i,'#93b85f'],[/matcha|cucumber|elderflower|avocado|guacamole/i,'#86b25c'],
 [/raspberry|strawberr/i,'#d8475b'],[/candyfloss/i,'#f0a3c4'],[/caramel|toffee|cornflake|malt|blond|honey/i,'#d9a441'],[/custard|lemon|immunity|ginger/i,'#f0cf4f'],
 [/tiramisu|espresso|coffee|gravy|turkey|stuffing/i,'#9c6b45'],[/salmon/i,'#f08a6b'],[/tikka|pumpkin|beans|sofrito|pasta|tomato/i,'#d6512f'],[/black pudding|marmite/i,'#3b2a2a'],
 [/earl grey|brain/i,'#a99bcb'],[/gin/i,'#a9d8d2'],[/apple/i,'#a6c45a'],[/chicken|caesar|cream|parmigiano|stilton|hummus|porridge|yorkshire|toast|cheese/i,'#ecd9a6'],[/grape/i,'#8fbf5a']];
function colours(name){const out=[];let s=name;for(const [re,c] of FLAV){if(re.test(s)&&!out.includes(c)){out.push(c);s=s.replace(re,'')}if(out.length===2)break}
  while(out.length<2)out.push(out[0]||'#d9a441');return out}
const INK='#22336b',PAPER='#e9ecdf';
function art(name,kind){const [a,b]=colours(name);
  // each shape: fill layer nudged down-right (misregistration), then ink outline on top
  const o=`fill="none" stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;
  const sh=(d,fill)=>`<g transform="translate(4 4)"><path d="${d}" fill="${fill}"/></g><path d="${d}" ${o}/>`;
  const circ=(x,y,r,fill)=>`<circle cx="${x+3}" cy="${y+3}" r="${r}" fill="${fill}"/><circle cx="${x}" cy="${y}" r="${r}" ${o}/>`;
  let g='';
  switch(kind){
    case 'cookie':g=circ(80,82,42,a)+circ(120,72,42,b)+[[105,55],[130,62],[118,88],[138,85],[100,78]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="4.5" fill="${INK}"/>`).join('');break;
    case 'grapes':g=`<path d="M100 22 q4 -10 14 -12" ${o}/>`+sh('M104 18 q26 -10 34 8 q-22 6 -34 -8z',b)+[[86,40],[112,40],[74,62],[100,62],[126,62],[86,84],[112,84],[100,106]].map(([x,y])=>circ(x,y,14,a)).join('');break;
    case 'sandwich':g=sh('M40 118 L100 28 L160 118 Z',PAPER)+sh('M58 108 L100 44 L142 108 Z',a)+`<path d="M62 100 L138 100" stroke="${b}" stroke-width="8"/><path d="M58 108 L100 44 L142 108 Z" ${o}/>`;break;
    case 'bag':g=sh('M58 22 L142 22 L150 34 L146 120 L154 130 L46 130 L54 120 L50 34 Z',a)+sh('M70 58 h60 v40 h-60z',PAPER)+circ(100,78,12,b);break;
    case 'pot':g=sh('M52 52 h96 l-10 70 h-76z',a)+sh('M46 40 h108 v14 h-108z',b)+sh('M70 72 h60 v26 h-60z',PAPER);break;
    case 'jar':g=sh('M62 40 h76 v12 q14 4 14 20 v46 q0 10 -10 10 h-84 q-10 0 -10 -10 v-46 q0 -16 14 -20z',a)+sh('M66 22 h68 v18 h-68z',b)+sh('M66 76 h68 v32 h-68z',PAPER);break;
    case 'tray':g=sh('M30 64 L170 64 L158 122 L42 122 Z',b)+sh('M40 50 h120 v40 h-120z',a)+sh('M70 58 h60 v22 h-60z',PAPER);break;
    case 'bottle':g=sh('M88 18 h24 v14 q16 8 16 26 v62 q0 8 -8 8 h-40 q-8 0 -8 -8 v-62 q0 -18 16 -26z',a)+sh('M86 10 h28 v10 h-28z',b)+sh('M80 70 h40 v30 h-40z',PAPER);break;
    case 'cake':g=sh('M40 70 q60 -22 120 0 v40 q-60 22 -120 0z',a)+sh('M40 70 q60 -22 120 0 q-60 22 -120 0z',b)+[60,80,100,120,140].map(x=>`<circle cx="${x}" cy="${70}" r="4" fill="${INK}"/>`).join('');break;
    case 'bar':g=`<g transform="rotate(-12 100 75)">${sh('M30 52 h140 v46 h-140z',a)+sh('M30 52 h48 v46 h-48z',b)+sh('M96 62 h56 v26 h-56z',PAPER)}</g>`;break;
    case 'egg':g=sh('M100 16 q42 0 46 62 q0 50 -46 50 q-46 0 -46 -50 q4 -62 46 -62z',a)+sh('M58 74 q42 -16 84 0 l0 14 q-42 -16 -84 0z',b);break;
    case 'scotch':g=circ(100,76,52,a)+circ(100,76,30,PAPER)+circ(100,76,16,b);break;
    case 'toast':g=sh('M52 128 v-70 q-14 -2 -14 -18 q0 -24 30 -24 q14 0 32 6 q18 -6 32 -6 q30 0 30 24 q0 16 -14 18 v70z',a)+sh('M66 116 v-60 h68 v60z',b);break;
    case 'tin':g=sh('M56 30 h88 v94 h-88z',a)+`<ellipse cx="104" cy="34" rx="44" ry="10" fill="${b}"/><ellipse cx="100" cy="30" rx="44" ry="10" ${o}/>`+sh('M56 62 h88 v36 h-88z',PAPER);break;
    case 'tub':g=sh('M44 48 h112 l-8 74 h-96z',a)+sh('M38 36 h124 v14 h-124z',b)+circ(100,84,16,PAPER);break;
    case 'lolly':g=`<path d="M100 112 v28" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`+sh('M70 30 q0 -18 30 -18 q30 0 30 18 v78 h-60z',a)+sh('M70 30 q0 -18 30 -18 q30 0 30 18 v18 h-60z',b);break;
    case 'croissant':g=sh('M30 96 q20 -66 70 -66 q50 0 70 66 q-20 -16 -36 -10 q-14 -28 -34 -28 q-20 0 -34 28 q-16 -6 -36 10z',a)+`<path d="M66 58 l12 30 M100 44 v40 M134 58 l-12 30" stroke="${b}" stroke-width="6" stroke-linecap="round"/>`;break;
    case 'box':default:g=sh('M40 44 h120 v78 h-120z',a)+sh('M40 44 h120 v20 h-120z',b)+sh('M68 76 h64 v32 h-64z',PAPER);
  }
  // a halftone wash behind, so every pack sits on the same printed ground
  return `<svg viewBox="0 0 200 150" class="pack" aria-hidden="true"><defs><pattern id="ht" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.3" fill="${INK}" opacity=".18"/></pattern></defs><ellipse cx="100" cy="132" rx="78" ry="12" fill="url(#ht)"/>${g}</svg>`}

const N=12,SECS=5;
function buildDeck(){const nReal=5+Math.floor(RAND()*3);   // 5 to 7 real ones a day, so you can't just count
  const r=shuffle(REAL).slice(0,nReal).map(x=>({n:x[0],why:x[1],kind:x[2],src:x[3],f:x[4],real:true})),f=shuffle(FAKE).slice(0,N-nReal).map(x=>({n:x[0],why:x[1],kind:x[2],real:false}));
  return shuffle([...r,...f])}
const GAMEDEF={start(){S.deck=buildDeck();S.k=0;S.log=[];S.streak=0;S.best=0;S.score=0;screen();card()},resume(){S.last=performance.now()}};
function screen(){M.innerHTML=`<div class="hud"><div><span id="sc">0</span><small>right</small></div><div><span id="st">0</span><small>streak</small></div><div><span id="nn">1</span><small>of ${N}</small></div></div>
  <div class="launch" id="launch"></div>
  <div class="trace" id="trace">${Array.from({length:N},()=>'<i></i>').join('')}</div>
  <div class="choose" id="choose"><button class="btn" id="yes">Real gem</button><button class="btn ghost" id="no">Made up</button></div>`;
  $('yes').onclick=()=>answer(true);$('no').onclick=()=>answer(false)}
function card(){const c=S.deck[S.k];hud(`${S.k+1}/${N}`);$('nn').textContent=S.k+1;S.t=SECS;S.locked=false;
  const L=$('launch');L.className='launch';L.innerHTML=`${art(c.n,c.kind)}<span class="new">New at M&amp;S?</span><b>${c.n}</b><span class="why">${c.why}</span><span class="clock" id="clk"></span>`;
  $('choose').style.visibility='visible';play('slap');
  S.live=true;S.last=performance.now();cancelAnimationFrame(S.raf);S.raf=requestAnimationFrame(loop)}
function loop(now){if(!S.live)return;S.raf=requestAnimationFrame(loop);const dt=Math.min(.1,(now-S.last)/1000);S.last=now;if(S.paused)return;
  const before=Math.ceil(S.t);S.t-=dt;const c=$('clk');if(c)c.style.width=Math.max(0,S.t/SECS*100)+'%';if(Math.ceil(S.t)<before&&S.t<2.5&&S.t>0)play('tick');
  if(S.t<=0)answer(null)}
const verdictLine=c=>!c.real?'Not an M&S product. We invented it.':c.f===2?`Real, from 1998. City AM credits it to her.`:c.f?`Real, and one she showed off. ${c.src}.`:`A real M&S launch. ${c.src}.`;
function answer(said){if(S.locked)return;S.locked=true;S.live=false;cancelAnimationFrame(S.raf);const c=S.deck[S.k],ok=said===c.real;
  S.log.push(ok);if(ok){S.score++;S.streak++;S.best=Math.max(S.best,S.streak)}else S.streak=0;
  play(ok?(S.streak%4===0?'till':'ping'):'bad');
  $('sc').textContent=S.score;$('st').textContent=S.streak;$('trace').children[S.k].className=ok?'g':'r';
  const L=$('launch');L.className='launch '+(c.real?'real':'fake');
  L.querySelector('.new').textContent=c.real?(c.f===2?'Her own creation':c.f?'As seen in her videos':'Real M&S launch'):'Made up by us';
  L.querySelector('.why').textContent=verdictLine(c);
  L.insertAdjacentHTML('beforeend',`<span class="stamp">${c.real?'REAL GEM':'MADE UP'}</span>`);
  if(said===null)toast('Too slow!');
  $('choose').style.visibility='hidden';
  setTimeout(()=>{S.k++;S.k>=N?end():card()},ok?1000:1600)}
function end(){const r=S.score>=12?'Director material':S.score>=10?'Hidden gem hunter':S.score>=8?'Taste tester':S.score>=6?'Foodhall regular':'Fell for it';
  finish({label:`${S.score} of ${N} right · best streak ${S.best}`,stamp:r,bad:S.score<6,line:`${S.score}/${N} · ${r}`,
    body:`<div class="rcpt">${S.deck.map((c,k)=>`<div><span>${S.log[k]?'✓':'✗'} ${c.n}</span><span>${c.real?'Real':'Made up'}</span></div>`).join('')}</div>`,
    note:'<span class="fine">Unofficial fan game, not made by M&amp;S. Real ones are M&amp;S launches reported in the press. Made-up ones are ours.</span>',
    share0:`\u{1F48E} ${GAME.title}${tag()}\n${S.score}/${N} spotted\n${S.log.map(x=>x?'\u{1F7E9}':'\u{1F7E5}').join('')}\n${r}`})}
// title screen: a little shelf of packs (two real, one made up, but you can't tell which)
const baseTitle=title;title=function(){baseTitle();const c=M.querySelector('.center');if(c&&!M.querySelector('.rankstamp'))c.insertAdjacentHTML('afterbegin',`<div class="shelfrow">${[['Chocolate & cornflake cookies','cookie'],['Gin & tonic scotch egg','scotch'],['Candyfloss-flavoured grapes','grapes']].map(([n,k])=>art(n,k)).join('')}</div>`)};
window.__quiddle={REAL,FAKE,deck:s=>{RAND=mulberry(s);return buildDeck()},art};
