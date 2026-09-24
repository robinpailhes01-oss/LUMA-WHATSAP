# Builds assets/_footage-crf16-master.mp4 (1920x1080, 30 fps, 11 trimmed rushes concatenated, HLG decoded directly, no tone-mapping),
# assets/voice-source-cut.wav (+ gain -> assets/voice.m4a), qa/keeps.json, assets/transcript.json, assets/edit-decisions.json.
import json, subprocess, os
R='../../raw-media/site/'
FPS=30
# rush, keep start, keep end (seconds in the rush) — amorces/fins from SITE.ANALYSE.md, no word removed
KEEPS=[('IMG_0338',0.15,9.85),('IMG_0340',0.0,5.05),('IMG_0341',0.25,7.10),('IMG_0342',0.30,5.70),('IMG_0348',0.30,15.60),
       ('IMG_0351',0.15,19.80),('IMG_0352',0.0,16.05),('IMG_0356',0.0,10.50),('IMG_0357',0.0,8.90),('IMG_0358',1.15,8.85),('IMG_0361',0.25,21.60)]
FIX={'IMG_0338':{'as':'es'},'IMG_0342':{'auront':'iront','le':'la','client':'clients'},'IMG_0351':{'connectés':'connecté'},
     'IMG_0352':{'alia':"à l'IA"},'IMG_0340':{'client':'clients'}}
keeps=[]; t=0.0; words=[]; inputs=[]; vf=[]; af=[]
for i,(r,s,e) in enumerate(KEEPS):
    sf=round(s*FPS); ef=round(e*FPS); s=sf/FPS; e=ef/FPS; d=(ef-sf)/FPS
    keeps.append({'rush':r,'index':i,'sourceStart':round(s,4),'sourceEnd':round(e,4),'start':round(t,4),'end':round(t+d,4)})
    inputs+=['-i',R+r+'.MOV']
    vf.append(f'[{i}:v]trim=start_frame={sf}:end_frame={ef},setpts=PTS-STARTPTS[v{i}]')
    af.append(f'[{i}:a]atrim=start={s}:end={e},asetpts=PTS-STARTPTS,afade=t=in:d=0.02,afade=t=out:st={d-0.03}:d=0.03[a{i}]')
    tw=json.load(open(R+r+'.transcript.json'))['words']
    fx=FIX.get(r,{})
    for w in tw:
        ws=max(w['start'],s); we=min(w['end'],e)
        if we<=ws: we=ws+0.04
        txt=w['text']; core=txt.strip('.,?!;:')
        if core in fx: txt=txt.replace(core,fx[core],1)
        if r=='IMG_0351' and core=='les' and tw[tw.index(w)+1]['text']=='connectés': txt='il est'
        words.append({'text':txt,'start':round(ws-s+t,3),'end':round(we-s+t,3),'sourceStart':round(i*1000+ws,3),'sourceEnd':round(i*1000+we,3),'rush':r})
    t+=d
total=round(t,4)
# de-duplicate a same-rush overlapping tail (words never overlap after retiming)
for a,b in zip(words,words[1:]):
    if b['start']<a['end']: b['sourceStart']=round(b['sourceStart']+a['end']-b['start'],3); b['start']=a['end']
    if b['end']<=b['start']: b['end']=round(b['start']+0.04,3)
json.dump(keeps,open('qa/keeps.json','w'),indent=1,ensure_ascii=False)
json.dump({'source':'11 rushes IMG_0338…0361 concaténés (assets/footage.mp4), temps du montage','model':'faster-whisper small par rush, recalé ; corrections : es/iront/la concurrence/il est connecté/à l\'IA','words':words},open('assets/transcript.json','w'),indent=1,ensure_ascii=False)
json.dump({'duration':total,'fps':FPS,'source':'11 rushes paysage 1920×1080 HLG (raw-media/site/)','footage':f'assets/footage.mp4 ({total} s, 11 segments)',
           'keeps':[{'sourceStart':round(k['index']*1000+k['sourceStart'],4),'sourceEnd':round(k['index']*1000+k['sourceEnd'],4),'start':k['start'],'end':k['end'],'rush':k['rush']} for k in keeps],
           'removals':[{'reason':'amorce/fin de rush (aucun mot retiré)','rush':k['rush']} for k in keeps]},open('assets/edit-decisions.json','w'),indent=1,ensure_ascii=False)
print('footage total',total,'s', 'words',len(words))
fc=';'.join(vf+af)+';'+''.join(f'[v{i}]' for i in range(len(KEEPS)))+f'concat=n={len(KEEPS)}:v=1:a=0,fps=30,format=yuv420p[vout];'+''.join(f'[a{i}]' for i in range(len(KEEPS)))+f'concat=n={len(KEEPS)}:v=0:a=1[aout]'
if os.environ.get('RUN'):
    subprocess.run(['ffmpeg','-v','error','-y']+inputs+['-filter_complex',fc,'-map','[vout]','-r','30','-vsync','cfr','-c:v','libx264','-preset','slow','-crf','16','-color_primaries','bt709','-color_trc','bt709','-colorspace','bt709','-an','-movflags','+faststart','assets/_footage-crf16-master.mp4',
                    '-map','[aout]','-ac','1','-ar','48000','-c:a','pcm_s16le','assets/voice-source-cut.wav'],check=True)
    print('encoded')
