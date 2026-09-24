# Generates assets/plan.json (scenes, events, captions) from assets/transcript.json + qa/keeps.json. Run after prep-footage.py.
import json, re
W=json.load(open('assets/transcript.json'))['words']; K=json.load(open('qa/keeps.json'))
FOOT=K[-1]['end']; OUTRO=3.0; DUR=round(FOOT+OUTRO,4)
def wt(rush,text,n=0):
    c=[w for w in W if w['rush']==rush and w['text'].strip('.,?!;:').lower()==text.lower()]
    return c[n]['start']
def r(x): return round(x,4)
S=[('s01','hook','FULL','IMG_0338','Accroche : kicker, titre « demandes clients », 3 notifications qui interrompent.'),
   ('s02','probleme','FACE_LEFT','IMG_0340','Le vrai problème : manque de clients barré, temps + disponibilité, rapidité N°1, prospect → concurrence.'),
   ('s03','histoire','FACE_RIGHT','IMG_0348','3 ans, location de yachts, embaucher ✗, chatbot ✗.'),
   ('s04','solution','FACE_LEFT','IMG_0351','Agent WhatsApp : téléphone (tarifs), pilules, tuiles calendrier/CRM/météo.'),
   ('s05','objection-page','FULL','IMG_0352','Peur de déléguer, puis page plein écran (STYLE-04) : 3 conversations réelles anonymisées.'),
   ('s06','benefices','FACE_RIGHT','IMG_0356','Temps gagné, réponses rapides, plus de clients, charge mentale, expérience/satisfaction.'),
   ('s07','preuve-2-ans','PUSH','IMG_0358','2 ans sans presque toucher WhatsApp + carte Résultats réelle (217 / 1851).'),
   ('s08','cta','FACE_LEFT','IMG_0361','Épuisé de répondre ? déléguer, sans coûter une fortune, audit gratuit juste en dessous.')]
scenes=[]
kb={k['rush']:k for k in K}
starts={'s01':kb['IMG_0338'],'s02':kb['IMG_0340'],'s03':kb['IMG_0348'],'s04':kb['IMG_0351'],'s05':kb['IMG_0352'],'s06':kb['IMG_0356'],'s07':kb['IMG_0358'],'s08':kb['IMG_0361']}
ends={'s01':kb['IMG_0338']['end'],'s02':kb['IMG_0342']['end'],'s03':kb['IMG_0348']['end'],'s04':kb['IMG_0351']['end'],'s05':kb['IMG_0352']['end'],'s06':kb['IMG_0357']['end'],'s07':kb['IMG_0358']['end'],'s08':kb['IMG_0361']['end']}
for sid,kind,cam,rush,hold in S:
    st=starts[sid]['start']; fw=[w for w in W if w['rush']==rush][0]
    scenes.append({'id':sid,'start':r(st),'end':r(ends[sid]),'layout':'face' if sid!='s05' else 'face+page','kind':kind,'anchor':fw['text'],'anchorTime':r(min(fw['start'],st+0.19)),'camera':cam,'holdReason':hold})
scenes.append({'id':'s09','start':r(FOOT),'end':DUR,'layout':'card','kind':'outro','anchor':'entreprise.','anchorTime':r(FOOT-0.1),'camera':'END','holdReason':'Écran de fin : logo, audit gratuit juste en dessous.'})
E=[]
def ev(id,t,type,vis,anchor,sfx=None):
    d={'id':id,'time':r(t),'type':type,'visual':vis,'anchor':anchor}
    if sfx: d['sfx']=sfx
    E.append(d)
# s01
ev('kick',wt('IMG_0338','chef'),'kicker-in','s01','chef','tick')
ev('hook',wt('IMG_0338','beaucoup'),'hook-title-in','s01','beaucoup','whoosh')
ev('hookSub',wt('IMG_0338','tous'),'hook-sub-in','s01','tous','tick')
ev('n1',wt('IMG_0338','interrompu'),'notif-1','s01','interrompu','pop')
ev('n2',wt('IMG_0338','à'),'notif-2','s01','à','pop')
ev('n3',wt('IMG_0338','quel'),'notif-3','s01','quel','pop')
# s02
ev('cut1',starts['s02']['start'],'camera-face-left','s02','Et','whoosh')
ev('t2',wt('IMG_0340','problème'),'title-2-in','s02','problème','pop')
ev('manque',wt('IMG_0340','manque'),'row-manque-in','s02','manque','tick')
ev('strike',wt('IMG_0340','mais'),'row-manque-strike','s02','mais','tick')
ev('temps',wt('IMG_0340','temps'),'pill-temps','s02','temps','pop')
ev('dispo',wt('IMG_0340','disponibilité'),'pill-dispo','s02','disponibilité','pop')
ev('rapid',wt('IMG_0341','rapidité'),'card-rapidite-in','s02','rapidité','whoosh')
ev('rapidBar',wt('IMG_0341','répondez'),'card-rapidite-bar','s02','répondez','tick')
ev('num1',wt('IMG_0341','importantes'),'card-rapidite-n1','s02','importantes','pop')
ev('perdre',wt('IMG_0342','perdre'),'flow-prospect','s02','perdre','tick')
ev('concu',wt('IMG_0342','concurrence'),'flow-concurrence','s02','concurrence','pop')
ev('savoir',wt('IMG_0342','sans'),'hand-savoir','s02','sans','pop')
# s03
ev('cut2',starts['s03']['start'],'camera-face-right','s03','Et','whoosh')
ev('kick3',wt('IMG_0348','moi'),'kicker-3','s03','moi','tick')
ev('ans3',wt('IMG_0348','trois'),'big-3-ans','s03','trois','pop')
ev('ans3sub',wt('IMG_0348','situation'),'big-3-ans-sub','s03','situation','tick')
ev('yacht',wt('IMG_0348','société'),'pill-yacht','s03','société','pop')
ev('emb',wt('IMG_0348','embaucher'),'row-embaucher','s03','embaucher','tick')
ev('embX',wt('IMG_0348','ça'),'row-embaucher-x','s03','ça','pop')
ev('bot',wt('IMG_0348','chatbot'),'row-chatbot','s03','chatbot','tick')
ev('botX',wt('IMG_0348','qualité'),'row-chatbot-x','s03','qualité','pop')
# s04
ev('cut3',starts['s04']['start'],'camera-face-left','s04','Et','whoosh')
ev('kick4',wt('IMG_0351','deux'),'kicker-4','s04','deux','tick')
ev('t4',wt('IMG_0351','agent'),'title-4-in','s04','agent','whoosh')
ev('phone',wt('IMG_0351','qui'),'phone-in','s04','qui','whoosh')
ev('pAuto',wt('IMG_0351','autonome'),'pill-autonome','s04','autonome','pop')
ev('pMoi',wt('IMG_0351','parler'),'pill-parle-comme-moi','s04','parler','pop')
ev('pRegles',wt('IMG_0351','connaît'),'pill-regles','s04','connaît','pop')
ev('selDispo',wt('IMG_0351','règles'),'selection-dispo','s04','règles','tick')
ev('pOutils',wt('IMG_0351','connecté'),'pill-outils','s04','connecté','pop')
ev('auto2',wt('IMG_0351','autonome',1),'pill-autonome-pulse','s04','autonome','tick')
ev('tCal',wt('IMG_0351','calendrier'),'tile-calendrier','s04','calendrier','pop')
ev('tCrm',wt('IMG_0351','CRM'),'tile-crm','s04','CRM','pop')
ev('tMeteo',wt('IMG_0351','météo'),'tile-meteo','s04','météo','pop')
ev('meteoHand',wt('IMG_0351','météo')+0.25,'hand-meteo','s04','météo','tick')
# s05
ev('cut4',starts['s05']['start'],'camera-full','s05','et','whoosh')
ev('peur',wt('IMG_0352','peur'),'pill-peur','s05','peur','pop')
ev('relation',wt('IMG_0352','relation'),'pill-relation','s05','relation','pop')
ev('page',wt('IMG_0352','juste'),'page-in','s05','juste','whoosh')
ev('ph1',wt('IMG_0352','captures'),'page-phone-1','s05','captures','pop')
ev('ph2',wt('IMG_0352','captures')+0.15,'page-phone-2','s05','captures','pop')
ev('ph3',wt('IMG_0352','captures')+0.3,'page-phone-3','s05','captures','pop')
ev('dessous1',wt('IMG_0352','montrer'),'page-hand-dessous','s05','montrer','tick')
ev('selPh',wt('IMG_0352','parler'),'page-selection','s05','parler','tick')
# s06
ev('cut5',starts['s06']['start'],'camera-face-right-page-out','s06','Et','whoosh')
ev('t6',wt('IMG_0356','au-delà'),'title-6-in','s06','au-delà','pop')
ev('r1',wt('IMG_0356','temps'),'row-temps','s06','temps','pop')
ev('r2',wt('IMG_0356','rapides'),'row-rapides','s06','rapides','pop')
ev('r3',wt('IMG_0356','plus'),'row-clients','s06','plus','pop')
ev('r3sub',wt('IMG_0356','voir'),'row-clients-sub','s06','voir','tick')
ev('charge',wt('IMG_0357','charge'),'pill-charge','s06','charge','pop')
ev('exp',wt('IMG_0357',"l'expérience"),'pill-experience','s06',"l'expérience",'pop')
ev('satis',wt('IMG_0357','satisfaction'),'pill-satisfaction','s06','satisfaction','pop')
# s07
ev('cut6',starts['s07']['start'],'camera-push','s07','Et','whoosh')
ev('ans2',wt('IMG_0358','deux'),'big-2-ans','s07','deux','pop')
ev('res',wt('IMG_0358','touche'),'card-resultats-in','s07','touche','whoosh')
ev('ans2sub',wt('IMG_0358','plus'),'big-2-ans-sub','s07','plus','tick')
ev('sel1851',wt('IMG_0358','WhatsApp'),'selection-1851','s07','WhatsApp','tick')
ev('sel217',wt('IMG_0358','demandes'),'selection-217','s07','demandes','tick')
# s08
ev('cut7',starts['s08']['start'],'camera-face-left','s08','Donc','whoosh')
ev('kick8',wt('IMG_0361','toi'),'kicker-8','s08','toi','tick')
ev('t8',wt('IMG_0361','épuisé'),'title-8-in','s08','épuisé','whoosh')
ev('deleg',wt('IMG_0361','déléguer'),'pill-deleguer','s08','déléguer','pop')
ev('fortune',wt('IMG_0361','coûte'),'pill-fortune','s08','coûte','pop')
ev('audit',wt('IMG_0361','audit'),'card-audit-in','s08','audit','whoosh')
ev('dessous2',wt('IMG_0361','juste'),'hand-dessous','s08','juste','tick')
ev('gratuit',wt('IMG_0361','gratuit'),'badge-gratuit','s08','gratuit','pop')
ev('possible',wt('IMG_0361','possible'),'check-possible','s08','possible','tick')
ev('comment',wt('IMG_0361','comment'),'check-comment','s08','comment','tick')
# s09
ev('outro',FOOT,'outro-in','s09','entreprise.','whoosh')
ev('swell',FOOT+0.35,'logo-card','s09','entreprise.','swell')
ev('sign',FOOT+0.95,'sign-in','s09','entreprise.','pop')
ev('cta',FOOT+1.5,'cta-in','s09','entreprise.','pop')
E.sort(key=lambda e:e['time'])
# captions: groups <=26 chars, <=4 words, break on punctuation, gaps > 0.7 s, rush boundaries
SEL={'demandes','clients','interrompu','temps','disponibilité','rapidité','répondez','prospects','concurrence','trois','ans','situation','embaucher','chatbot','relation','deux','agent','whatsapp','autonome','règles','connecté','calendrier','crm','météo','peur','déléguer','captures',"d'écran",'rapides','charge','mentale','expérience','satisfaction','épuisé','répondre','fortune','audit','gratuit','possible','fonctionner','entreprise','yacht','location','moyens','qualité','client','touche','urgentes','spéciales','question','ailleurs','sachiez','perdre','problème','manque','moi','parler','outils','énormément','gagné','dessous','montrer','vidéo','chef',"d'entreprise",'jours','importantes','créer','propre','décidé'}
groups=[]; cur=[]
def flush():
    global cur
    if cur: groups.append({'start':cur[0]['start'],'end':cur[-1]['end'],'words':cur}); cur=[]
for i,w in enumerate(W):
    cw={'text':w['text'],'start':w['start'],'end':w['end'],'sourceStart':w['sourceStart'],'sourceEnd':w['sourceEnd']}
    if w['text'].strip('.,?!;:').lower() in SEL: cw['sel']=True
    ln=sum(len(x['text']) for x in cur)+len(cur)+len(w['text'])
    if cur and (ln>26 or len(cur)>=4 or w['start']-cur[-1]['end']>0.7 or w['rush']!=W[i-1]['rush']): flush()
    cur.append(cw)
    if re.search(r'[.,?!;:]$',w['text']): flush()
flush()
# keep each group visible until the next one starts (max 1.2 s hold)
for a,b in zip(groups,groups[1:]): a['end']=r(min(b['start'],a['end']+1.2))
groups[-1]['end']=r(groups[-1]['end']+0.6)
plan={'duration':DUR,'fps':30,'aspect':'1920x1080','composition':'luma-site','footageDuration':r(FOOT),'scenes':scenes,'events':E,'captions':groups}
json.dump(plan,open('assets/plan.json','w'),indent=1,ensure_ascii=False)
print('plan: dur',DUR,'events',len(E),'groups',len(groups),'max chars',max(sum(len(x['text']) for x in g['words'])+len(g['words'])-1 for g in groups))
