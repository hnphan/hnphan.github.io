#!/usr/bin/env python3
"""Staging -> production deploys for single-file games on GitHub Pages.

  python3 game-kit/deploy.py staging <slug> <source.html>   build source into /<slug>-staging/ (noindex, STAGING ribbon)
  python3 game-kit/deploy.py ship <slug>                    copy the exact staging build to /<slug>/
  python3 game-kit/deploy.py rollback <slug>                restore /<slug>/ from the previous shipped commit

The source file is an artifact-style fragment (no <html>/<head>); this wraps it in a full page.
Run from the repo root, then commit and push. Production only ever receives what staging had."""
import sys,os,subprocess
HEAD='<!doctype html>\n<html lang="en-GB">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
NOINDEX='<meta name="robots" content="noindex,nofollow">\n'
def build(src):
    s=open(src).read();i=s.index('</style>')+len('</style>')
    out=HEAD+s[:i]+'\n</head>\n<body>\n'+s[i:]+'\n</body>\n</html>\n'
    return '\n'.join(l for l in out.split('\n') if 'claude:viewport-fit-sides' not in l)
cmd,slug=sys.argv[1],sys.argv[2]
if cmd=='staging':
    os.makedirs(f'{slug}-staging',exist_ok=True)
    open(f'{slug}-staging/index.html','w').write(build(sys.argv[3]).replace(HEAD,HEAD+NOINDEX,1))
elif cmd=='ship':
    os.makedirs(slug,exist_ok=True)
    open(f'{slug}/index.html','w').write(open(f'{slug}-staging/index.html').read().replace(NOINDEX,'',1))
elif cmd=='rollback':
    log=subprocess.run(['git','log','--format=%h','-n','2','--',f'{slug}/index.html'],capture_output=True,text=True).stdout.split()
    if len(log)<2: sys.exit('no earlier production version in history (fetch more history first)')
    subprocess.run(['git','checkout',log[1],'--',f'{slug}/index.html'],check=True)
else: sys.exit(__doc__)
print('ok',cmd,slug)
