#!/usr/bin/env python3
"""Assemble a Quiddle prototype from the shared shell (taken from rush.html) plus a game folder.

  python3 make.py games/<name>      -> <name>.html

games/<name>/meta.json  {title, slug, sub, tagline, how, icon}
games/<name>/style.css  game-only CSS
games/<name>/game.js    must define GAMEDEF={start()} and use the shared helpers
"""
import json,sys,os
src=open(os.path.join(os.path.dirname(__file__) or '.','rush.html')).read()
L=src.split('\n')
def at(p): return next(i for i,l in enumerate(L) if l.startswith(p))
css_all=src[src.index('<style>')+7:src.index('</style>')]
base_css=css_all[:css_all.index('.hud{')]
common_css='''.btn{white-space:nowrap}
.big{display:flex;gap:18px;margin:2px 0 6px}.big>div{display:flex;flex-direction:column;align-items:center}.big span{font:700 34px/1 var(--display);font-variant-numeric:tabular-nums}.big small{font:700 10px var(--body);letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-top:4px}
.mgo{flex:1;display:grid;place-items:center;font:700 80px var(--display);color:var(--ink)}
#pause{position:fixed;inset:0;z-index:80;background:var(--bg);display:grid;place-items:center;padding:16px}
#pause .pcard{background:var(--card);padding:22px 26px;text-align:center;display:flex;flex-direction:column;gap:10px;align-items:center}
.card{flex:none;border:1.5px solid var(--ink);padding:10px 12px;display:flex;flex-direction:column;gap:3px}
.card .lbl{font:700 11px var(--body);letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
.card b{font:700 26px/1.1 var(--display);text-wrap:balance}.card i{font-style:normal;color:var(--muted);font-size:13px}
.src{font-size:11px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.rcpt{width:100%;max-width:340px;font:400 13px/1.5 var(--body);text-align:left;border-top:1.5px dashed var(--ink);border-bottom:1.5px dashed var(--ink);padding:6px 0}
.rcpt div{display:flex;justify-content:space-between;gap:10px}.rcpt div span:first-child{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.rcpt .tot{font-weight:700;border-top:1px solid var(--rule);margin-top:4px;padding-top:4px}
'''
head_html='\n'.join(L[:at('<script>')+1])
js_top='\n'.join(L[at('const GAME={'):at('/* ---------- pair builder')])
js_snd='\n'.join(L[at('/* ---------- sound'):at('/* ---------- the run')])
COMMON=r'''/* ---------- shared flow: title -> game -> results stamp, daily seed, share, pause ---------- */
const apart=(a,b)=>Math.abs(a-b)>=Math.max(15,.12*Math.min(a,b));
const freddos=p=>{const n=Math.round(p/39);return n<=1?'= 1 Freddo':`≈ ${n} Freddos`};
const pickDistinct=(n,filter=()=>true)=>{const out=[],fams=new Set();for(const i of shuffle(ITEMS.map((_,i)=>i))){if(out.length===n)break;const it=ITEMS[i];if(filter(it)&&!fams.has(it.g)){out.push(i);fams.add(it.g)}}return out};
const S={phase:'title',daily:false,seed:0,live:false,paused:false,hud:''};
function head(){if(S.phase!==head.last){clearToasts();head.last=S.phase}M.classList.toggle('mid',['title','rank'].includes(S.phase));$('roundNo').textContent=S.hud||''}
function hud(t){S.hud=t;$('roundNo').textContent=t}
function shareHTML(share){return `<div class="actions"><a class="btn wa" id="wa" href="https://wa.me/?text=${encodeURIComponent(share)}" target="_blank" rel="noopener">Send on WhatsApp</a><button class="btn ghost" id="copy">${navigator.share?'Share…':'Copy'}</button></div>`}
function bindShare(share,share0){const copy=b=>{try{navigator.clipboard.writeText(share).then(()=>b.textContent='Copied!',()=>b.textContent='Copy failed')}catch(_){b.textContent='Copy failed'}};
  $('copy').onclick=e=>{const b=e.currentTarget;if(navigator.share)navigator.share({title:GAME.title,text:share0,url:GAME.url}).catch(err=>{if(err&&err.name!=='AbortError')copy(b)});else copy(b)}}
const tag=()=>S.daily?' #'+todayNo():'';
function begin(daily){S.daily=daily;S.seed=daily?todayNo()*7919+13:Math.floor(Math.random()*1e9);RAND=mulberry(S.seed);S.paused=false;S.live=false;
  if(daily)ls.set('run',{day:todayNo()});store.set('played','1');S.phase='game';hud('');head();play('open');GAMEDEF.start()}
function title(){S.phase='title';hud('');head();const res=ls.get('res'),run=ls.get('run'),done=res&&res.day===todayNo();
  // leaving mid-game counts: today is a miss
  if(!done&&run&&run.day===todayNo()){S.daily=true;return finish({stamp:'Walked out',bad:true,line:'Walked out',label:'You left mid-game',note:'So today counts as a miss. Practice runs are unlimited.',share0:`\u{1F9FE} ${GAME.title} #${todayNo()} · walked out`},true)}
  M.innerHTML=`<div class="center"><span class="label">Ration book #${todayNo()}</span><h2 class="verdict" style="font-size:28px">${GAME.tagline}</h2>
    ${done?`<span class="label">${res.line}</span>${shareHTML(res.share)}<button class="btn more" id="go">Practice ▸</button>`:`<p class="note">${GAME.how}</p><button class="btn" id="go">Start</button>`}<button class="chip" id="sndchip"></button></div>`;
  sndUI();$('sndchip').onclick=toggleSound;if(done)bindShare(res.share,res.share0);
  $('go').onclick=()=>{audioInit();setTimeout(sndUI,150);begin(!done)}}
function finish(o,quiet){S.phase='rank';S.live=false;hud('');head();if(!quiet)play('rank');const share=o.share0+'\n'+GAME.url;
  if(S.daily)ls.set('res',{day:todayNo(),line:o.line,share,share0:o.share0});
  M.innerHTML=`<div class="center"><div class="label">${o.label||''}</div><div class="rankstamp" style="color:${o.bad?'var(--bad)':'var(--ink)'}">${o.stamp}</div>${o.body||''}${o.note?`<p class="note">${o.note}</p>`:''}${shareHTML(share)}<button class="btn more" id="again">Practice ▸</button></div>`;
  arm($('again'),1200);$('again').onclick=()=>begin(false);bindShare(share,o.share0)}
function pauseGame(){if(AU.ctx&&AU.ctx.state==='running')AU.ctx.suspend().catch(()=>{});if(S.live)S.paused=true}
document.addEventListener('visibilitychange',()=>{if(document.hidden)return pauseGame();
  if(S.paused&&!$('pause')){const o=document.createElement('div');o.id='pause';o.innerHTML='<div class="pcard"><div class="verdict">Paused</div><p class="note">The clock stopped. Ready?</p><button class="btn" id="presume">Carry on</button></div>';document.body.appendChild(o);
    $('presume').onclick=()=>{o.remove();S.paused=false;GAMEDEF.resume&&GAMEDEF.resume();audioInit();setTimeout(sndUI,150)}}
  else if(AU.ctx&&AU.on)AU.ctx.resume().catch(()=>{});setTimeout(sndUI,300)});
window.addEventListener('pagehide',pauseGame);
'''
def make(folder):
    meta=json.load(open(os.path.join(folder,'meta.json')))
    css=open(os.path.join(folder,'style.css')).read()
    game=open(os.path.join(folder,'game.js')).read()
    for extra in ('questions.js','data.js'):
        dp=os.path.join(folder,extra)
        if os.path.exists(dp): game=open(dp).read()+'\n'+game
    h=head_html.replace('<title>Quiddle Rush</title>',f"<title>{meta['title']}</title>")
    h=h.replace(css_all,base_css+common_css+css)
    h=h.replace('<small>Rush · Ministry of Prices</small>',f"<small>{meta['sub']}</small>")
    top=js_top.replace("slug:'quiddle-rush',",f"slug:'{meta['slug']}',").replace("title:'Quiddle Rush',",f"title:{json.dumps(meta['title'])},")
    top=top.replace("url:'https://hnphan.github.io/quiddle-rush/',",f"url:'https://hnphan.github.io/{meta['slug']}/',")
    top=top.replace("tagline:'Higher or lower?<br>You\\u2019ve got a minute.',",f"tagline:{json.dumps(meta['tagline'])},how:{json.dumps(meta['how'])},")
    out=h+'\n(()=>{\n'+top+'\n'+js_snd+'\n'+COMMON+'\n'+game+'\n\ntitle();\n})();\n</script>\n'
    name=os.path.basename(folder.rstrip('/'))
    open(name+'.html','w').write(out);print('made',name+'.html')
for f in sys.argv[1:]: make(f)
