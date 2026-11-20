/* ---------- Kathryn Turner's Hidden Gem? Real M&S launches vs our inventions ---------- */
/* ---------- pack illustrations: one riso-print style for every product, real or made up ----------
   Shape comes from the pack type, colours from the flavours in the name, so the picture never gives the answer away. */
const FLAV=[[/red kiwi|cherry|jam|birthday/i,'#c8414f'],[/rhubarb|candyfloss|marshmallow/i,'#ef9fbd'],[/mango|peanut|honey|yuzu/i,'#f0b13a'],[/chilli|pepp|hawwwt|bacon|ham/i,'#cf4a32'],[/basil|spinach|spanakopita|leek|sage|kiwi/i,'#86b25c'],[/campfire|smoky|long dogs|haddock|brown butter/i,'#a7774c'],[/mayo|milk bun|scone|feta|deli|custard cream/i,'#efdcae'],[/chocolate orange|jaffa|orange|marmalade/i,'#e8862a'],[/dark chocolate|brownie|chocolate|cocoa/i,'#6b3e26'],[/pistachio|sprout/i,'#93b85f'],[/matcha|cucumber|elderflower|avocado|guacamole/i,'#86b25c'],
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
    case 'ring':g=circ(100,76,50,a)+circ(100,76,18,PAPER)+[[78,48],[124,46],[142,78],[70,96],[118,108],[90,62]].map(([x,y],k)=>`<path d="M${x} ${y} l7 ${k%2?4:-4}" stroke="${k%2?b:INK}" stroke-width="5" stroke-linecap="round"/>`).join('');break;
    case 'dome':g=sh('M36 112 q0 -74 64 -74 q64 0 64 74z',a)+sh('M30 112 h140 v12 h-140z',b)+`<path d="M62 70 q38 -22 76 0" ${o}/>`;break;
    case 'fruit':g=circ(76,84,36,a)+circ(126,80,36,a)+circ(126,80,22,b)+[[118,74],[134,74],[126,90],[116,86],[136,86]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2.6" fill="${INK}"/>`).join('');break;
    case 'phone':g=sh('M66 10 h68 q10 0 10 10 v112 q0 10 -10 10 h-68 q-10 0 -10 -10 v-112 q0 -10 10 -10z',a)+sh('M64 24 h72 v92 h-72z',PAPER)+`<path d="M92 56 v28 l24 -14z" fill="${INK}"/>`+[[150,40],[160,58],[146,76]].map(([x,y],k)=>`<path d="M${x} ${y} q8 -6 4 -12" stroke="${k%2?b:INK}" stroke-width="4" fill="none" stroke-linecap="round"/>`).join('');break;
    case 'bubble':g=sh('M30 28 h140 q10 0 10 10 v58 q0 10 -10 10 h-86 l-26 22 l4 -22 h-32 q-10 0 -10 -10 v-58 q0 -10 10 -10z',a)+[70,100,130].map(x=>`<circle cx="${x}" cy="67" r="7" fill="${INK}"/>`).join('');break;
    case 'box':default:g=sh('M40 44 h120 v78 h-120z',a)+sh('M40 44 h120 v20 h-120z',b)+sh('M68 76 h64 v32 h-64z',PAPER);
  }
  // a halftone wash behind, so every pack sits on the same printed ground
  return `<svg viewBox="0 0 200 150" class="pack" aria-hidden="true"><defs><pattern id="ht" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.3" fill="${INK}" opacity=".18"/></pattern></defs><ellipse cx="100" cy="132" rx="78" ry="12" fill="url(#ht)"/>${g}</svg>`}

/* ---------- the deck: five kinds of question, three acts ---------- */
const N=12;
const ACTS=[{name:'Warm-up',real:'easy',fake:'silly'},{name:'Getting tricky',real:'any',fake:'mid'},{name:'Director’s cut',real:'odd',fake:'sly'}];
const actOf=k=>ACTS[Math.min(2,Math.floor(k/4))];
const SECS={rf:[6,5,4],line:[8,8,8],tf:[7,7,6],price:[8,7,7],quote:[11,11,10]};
// which kinds go in each act (shuffled within the act)
const PLAN=[['line','rf','rf','rf'],['tf','price','rf','rf'],['quote','quote','tf','rf']];
const LABEL={rf:'Real or made up?',line:'Finish the line',tf:'True or false?',price:'Price check',quote:'What did Kathryn say?'};
const style=p=>p>=1000&&p%100===0?'pound':p%10===9?'nine':p%5===0?'five':'penny';
const fit=(x,st)=>{x=Math.max(10,x);return st==='pound'?Math.round(x/100)*100:st==='nine'?Math.max(9,Math.round((x+1)/10)*10-1):st==='five'?Math.round(x/5)*5:Math.round(x)};
const apartP=(a,b)=>Math.abs(a-b)>=Math.max(15,.15*Math.min(a,b));
function priceOpts(p){const st=style(p),pat=Math.floor(RAND()*3),L=[.5,.62,.75],H=[1.3,1.5,1.8];
  const from=pat===0?[H,H]:pat===1?[L,H]:[L,L];
  for(let t=0;t<100;t++){const v=from.map(s=>fit(p*s[Math.floor(RAND()*s.length)],st));if(apartP(v[0],v[1])&&apartP(v[0],p)&&apartP(v[1],p))return [p,...v].sort((a,b)=>a-b)}
  return [fit(p*.6,st),p,fit(p*1.5,st)]}
function buildDeck(){
  const reals=shuffle(REAL),fakes=shuffle(FAKE),used=new Set(),pool={quote:shuffle(QUOTES),line:shuffle(LINES),tf:shuffle(FACTS),price:shuffle(PRICES)};
  const take=(list,ok)=>{const x=list.find(x=>!used.has(x[0])&&ok(x))||list.find(x=>!used.has(x[0]));used.add(x[0]);return x};
  const plan=PLAN.map(a=>shuffle(a)).flat();
  const nRF=plan.filter(t=>t==='rf').length,realRF=shuffle(Array.from({length:nRF},(_,k)=>k<3+Math.floor(RAND()*2)));let rfi=0;
  // the price question must not repeat a product used elsewhere in the deck
  return plan.map((type,k)=>{const A=actOf(k),secs=SECS[type][Math.min(2,Math.floor(k/4))];
    if(type==='rf'){if(realRF[rfi++]){const x=take(reals,x=>A.real==='any'||x[5]===A.real);return {type,secs,n:x[0],why:x[1],kind:x[2],src:x[3],f:x[4],tier:x[5],real:true}}
      const x=take(fakes,x=>x[3]===A.fake);return {type,secs,n:x[0],why:x[1],kind:x[2],tier:x[3],real:false}}
    if(type==='quote'){const x=take(pool.quote,()=>true);const opts=shuffle([x[2],...shuffle(x[3]).slice(0,2)]);return {type,secs,n:x[0],kind:x[1],q:'What did Kathryn say about it?',opts,ans:x[2],src:x[4],note:'Her real words. The other two are ours.'}}
    if(type==='line'){const x=take(pool.line,()=>true);const opts=shuffle([x[1],...shuffle(x[2]).slice(0,2)]);return {type,secs,n:x[0],kind:x[4],q:'Fill in the blank',opts,ans:x[1],src:x[3],note:''}}
    if(type==='tf'){const x=take(pool.tf,()=>true);return {type,secs,n:x[0],kind:'phone',q:'True or false?',opts:['True','False'],ans:x[1]?'True':'False',src:x[3],note:x[2]}}
    const x=take(pool.price,x=>!used.has(x[0]+'#'));const ps=priceOpts(x[2]);return {type,secs,n:x[0],kind:x[1],q:'What did it cost at launch?',opts:ps.map(money),ans:money(x[2]),src:x[3],note:''}})}

const NOTIFS=[['\u{1F4AC}','Group chat','has anyone actually got the cookies??'],['\u{1F475}','Mum','is this the M&S lady you keep sending me?'],['\u{1F3E6}','Bank','Foodhall spending up 340% this month'],['\u{1F4C5}','Calendar','Cookie restock queue · 7:45am'],['\u{1F383}','Party invite','Fancy dress. You know who you’re going as.']];
const STREAK={3:'Hi, I’m Kath… SOLD.',5:'You’d get barrier at the restock',7:'Fans would take a bullet for you',9:'Petition for your damehood started'};
const GAMEDEF={start(){S.deck=buildDeck();S.notif={k:3+Math.floor(RAND()*6),i:Math.floor(RAND()*NOTIFS.length)};S.k=0;S.log=[];S.streak=0;S.best=0;S.score=0;screen();card()},resume(){S.last=performance.now()}};
function screen(){M.innerHTML=`<div class="hud"><div><span id="sc">0</span><small>right</small></div><div><span id="st">0</span><small>streak</small></div><div><span id="nn">1</span><small>of ${N}</small></div></div>
  <div class="launch" id="launch"></div>
  <div class="trace" id="trace">${Array.from({length:N},()=>'<i></i>').join('')}</div>
  <div class="choose" id="choose"></div>`}
function card(){const c=S.deck[S.k],A=actOf(S.k);hud(`${S.k+1}/${N}`);$('nn').textContent=S.k+1;S.secs=c.secs;S.t=c.secs;S.locked=false;
  if(S.k===S.notif.k){const [ic,who,msg]=NOTIFS[S.notif.i];setTimeout(()=>{if(S.k===S.notif.k&&!S.locked)toast(`<i>${ic}</i><span><b>${who} · now</b>${msg}</span>`,'notif')},1500)}
  const L=$('launch'),ch=$('choose');L.className='launch t-'+c.type;ch.className='choose t-'+c.type;ch.style.visibility='visible';
  if(c.type==='rf'){L.innerHTML=`${art(c.n,c.kind)}<span class="new">${LABEL.rf}</span><b>${c.n}</b><span class="why">${c.why}</span><span class="clock" id="clk"></span>`;
    ch.innerHTML='<button class="btn" id="yes">Signed off</button><button class="btn ghost" id="no">Made up</button>';$('yes').onclick=()=>answer(true);$('no').onclick=()=>answer(false)}
  else{const big=c.type==='tf'||c.type==='line';
    L.innerHTML=`${c.type==='quote'?art('speech','bubble'):art(c.n,c.kind)}<span class="new">${LABEL[c.type]}</span><b class="${big?'stmt':''}">${c.n}</b>${big?'':`<span class="why">${c.q}</span>`}<span class="clock" id="clk"></span>`;
    ch.innerHTML=c.opts.map((o,i)=>`<button class="btn ghost ans" data-o="${i}">${c.type==='quote'?'“'+o+'”':o}</button>`).join('');
    ch.querySelectorAll('.ans').forEach(b=>b.onclick=()=>answer(c.opts[+b.dataset.o]))}
  play('slap');S.live=true;S.last=performance.now();cancelAnimationFrame(S.raf);S.raf=requestAnimationFrame(loop)}
function loop(now){if(!S.live)return;S.raf=requestAnimationFrame(loop);const dt=Math.min(.1,(now-S.last)/1000);S.last=now;if(S.paused)return;
  const before=Math.ceil(S.t);S.t-=dt;const c=$('clk');if(c)c.style.width=Math.max(0,S.t/S.secs*100)+'%';if(Math.ceil(S.t)<before&&S.t<2.5&&S.t>0)play('tick');
  if(S.t<=0)answer(null)}
const verdictLine=c=>!c.real?(c.tier==='silly'?'Nobody signed this off. We made it up.':c.tier==='sly'?'Believable, right? We made it up.':'Not an M&S product. We invented it.'):c.f===2?'Real, from 1998. City AM credits it to her.':c.f?`Real, and she showed it off. ${c.src}.`:c.tier==='odd'?`Sounds made up. It isn’t. ${c.src}.`:`A real M&S launch. ${c.src}.`;
function answer(said){if(S.locked)return;S.locked=true;S.live=false;cancelAnimationFrame(S.raf);const c=S.deck[S.k],ok=c.type==='rf'?said===c.real:said===c.ans;
  S.log.push(ok);if(ok){S.score++;S.streak++;S.best=Math.max(S.best,S.streak)}else S.streak=0;
  play(ok?(S.streak%4===0?'till':'ping'):'bad');
  $('sc').textContent=S.score;$('st').textContent=S.streak;$('trace').children[S.k].className=ok?'g':'r';
  const L=$('launch'),ch=$('choose');
  if(c.type==='rf'){L.className='launch real'.replace('real',c.real?'real':'fake');
    L.querySelector('.new').textContent=c.real?(c.f===2?'Her own creation':c.f?'#KathrynSignedItOff':'Real M&S launch'):'Made up by us';
    L.querySelector('.why').textContent=verdictLine(c);
    L.insertAdjacentHTML('beforeend',`<span class="stamp">${c.real?'REAL':'MADE UP'}</span>`);ch.style.visibility='hidden'}
  else{L.className='launch t-'+c.type+(ok?' real':' fake');
    ch.querySelectorAll('.ans').forEach(b=>{const o=c.opts[+b.dataset.o];b.disabled=true;b.classList.toggle('right',o===c.ans);b.classList.toggle('wrong',o===said&&!ok);if(o!==c.ans&&o!==said)b.classList.add('dim')});
    const w=L.querySelector('.why')||L.querySelector('b');
    const msg=c.type==='quote'?`${c.note} ${c.src}.`:c.type==='tf'?`${c.note} ${c.src}.`:c.type==='price'?`${c.ans}, according to ${c.src}.`:`${c.src}.`;
    if(L.querySelector('.why'))L.querySelector('.why').textContent=msg;else L.insertAdjacentHTML('beforeend',`<span class="why">${msg}</span>`);
    L.insertAdjacentHTML('beforeend',`<span class="stamp">${ok?'SPOT ON':'NOPE'}</span>`)}
  if(said===null)toast('Too slow! Sold out.');else if(ok&&STREAK[S.streak])toast(STREAK[S.streak]);
  const wait=c.type==='rf'?(ok?1100:1700):(c.type==='quote'||c.type==='tf'?2600:1900);
  setTimeout(()=>{S.k++;S.k>=N?end():card()},wait)}
function end(){const R=[[0,'Got the ick'],[4,'Queued for nothing'],[6,'Picky bits fan'],[8,'Would follow her into war'],[10,'Corporate baddie'],[12,'Damehood pending']];const r=R.filter(x=>S.score>=x[0]).pop()[1];
  const ICON={rf:'\u{1F36A}',line:'✍️',tf:'❓',price:'\u{1F4B7}',quote:'\u{1F5E3}️'};
  finish({label:`${S.score} of ${N} right · best streak ${S.best}`,stamp:r,bad:S.score<6,line:`${S.score}/${N} · ${r}`,
    body:`<div class="acts">${ACTS.map((A,i)=>`<span>${A.name} <b>${S.log.slice(i*4,i*4+4).filter(Boolean).length}/4</b></span>`).join('')}</div><div class="rcpt">${S.deck.map((c,k)=>`<div><span>${S.log[k]?'✓':'✗'} ${c.type==='rf'?c.n:LABEL[c.type]+': '+(c.type==='tf'||c.type==='line'?c.n.replace(/[“”]/g,''):c.n)}</span><span>${c.type==='rf'?(c.real?'Real':'Made up'):c.type==='tf'?c.ans:''}</span></div>`).join('')}</div>`,
    note:'<span class="fine">Unofficial fan game, not made by M&amp;S. Her quotes are only ones the press reported. Made-up products and lines are ours.</span>',
    share0:`\u{1F48E} ${GAME.title}${tag()}\nHi, I’m ${r}. ${S.score}/${N} spotted.\n${[0,1,2].map(i=>S.deck.slice(i*4,i*4+4).map((c,j)=>S.log[i*4+j]?'\u{1F7E9}':'\u{1F7E5}').join('')).join(' ')}\n#TeamTurner`})}
// title screen: a little shelf of packs (two real, one made up, but you can't tell which)
const baseTitle=title;title=function(){baseTitle();const c=M.querySelector('.center');if(c&&!M.querySelector('.rankstamp'))c.insertAdjacentHTML('afterbegin',`<div class="shelfrow">${[['Chocolate & cornflake cookies','cookie'],['Gin & tonic scotch egg','scotch'],['Candyfloss-flavoured grapes','grapes']].map(([n,k])=>art(n,k)).join('')}</div>`)};
window.__quiddle={REAL,FAKE,QUOTES,FACTS,PRICES,LINES,deck:s=>{RAND=mulberry(s);return buildDeck()},art};
