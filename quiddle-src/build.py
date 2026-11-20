#!/usr/bin/env python3
"""Inject prices.json into each game page. Usage: python3 build.py quiddle.html basket.html"""
import json,re,sys
items=[{k:x[k] for k in ('n','w','p','g','k','src','when')} for x in json.load(open('prices.json'))]
js=json.dumps(items,ensure_ascii=False,separators=(',',':'))
for f in sys.argv[1:]:
    s=open(f).read()
    s=re.sub(r'/\*@ITEMS@\*/\[.*?\];',lambda m:'/*@ITEMS@*/'+js+';',s,count=1,flags=re.S)
    open(f,'w').write(s);print('built',f,len(items))
