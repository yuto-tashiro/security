import {mkdir,writeFile} from 'node:fs/promises';
const C={ink:'#183e39',green:'#39714d',light:'#e8f0dd',paper:'#f8faf3',line:'#a8bfa0',orange:'#b77343',pale:'#fff1e3',red:'#a64c42',blue:'#e4eef2'};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rect=(x,y,w,h,fill=C.paper,stroke=C.line,r=18)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
const text=(x,y,s,size=30,weight=600,anchor='middle',fill=C.ink)=>`<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}" fill="${fill}">${esc(s)}</text>`;
const path=(d,color=C.green,width=3,fill='none')=>`<path d="${d}" fill="${fill}" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`;
const arrow=(x1,y1,x2,y2,color=C.green)=>`<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${color}" stroke-width="3" fill="none" marker-end="url(#arrow)"/>`;
const line=(x1,y1,x2,y2)=>path(`M${x1} ${y1} L${x2} ${y2}`,C.line,3);
const symbols={
 cloud:rect(0,0,65,58,'white',C.green,5)+line(10,19,55,19)+line(10,39,55,39)+[10,30,49].map(y=>`<circle cx="48" cy="${y}" r="3" fill="${C.green}"/>`).join(''),
 tablet:rect(2,1,38,56,'white',C.green,5)+line(16,51,27,51)+rect(8,9,26,33,C.light,C.light,2),
 keyboard:rect(0,5,54,34,'white',C.green,5)+[7,17,27,37,47].map(x=>[13,23].map(y=>rect(x,y,4,4,C.green,C.green,0)).join('')).join('')+line(12,33,42,33),
 cpu:rect(10,10,38,38,'white',C.green,3)+rect(20,20,18,18,C.light,C.green,2)+[17,29,41].map(v=>line(v,1,v,10)+line(v,48,v,57)+line(1,v,10,v)+line(48,v,57,v)).join(''),
 ram:rect(0,12,70,30,'white',C.green,3)+[8,28,48].map(x=>rect(x,18,13,16,C.light,C.green,1)).join('')+[7,18,29,40,51,62].map(x=>line(x,42,x,49)).join(''),
 disk:rect(3,0,54,64,'white',C.green,5)+rect(12,10,36,25,C.light,C.line,3)+[16,28,40].map(x=>line(x,58,x,65)).join(''),
 screen:rect(0,0,66,43,'white',C.green,4)+line(33,43,33,56)+line(17,56,49,56),
 doc:rect(5,0,46,60,'white',C.green,4)+line(14,15,42,15)+line(14,27,42,27)+line(14,39,34,39),
 printer:rect(9,0,42,24,'white',C.green,3)+rect(0,18,60,32,C.light,C.green,5)+rect(9,37,42,25,'white',C.green,2)+line(17,46,43,46)+line(17,54,43,54),
 lock:rect(5,24,46,35,C.light,C.green,5)+path('M15 24V14a13 13 0 0126 0v10')+path('M28 36v12'),
 person:path('M18 12a12 12 0 1024 0 12 12 0 10-24 0')+path('M5 57v-5a25 25 0 0150 0v5'),
 wifi:path('M4 17a40 40 0 0152 0M12 29a27 27 0 0136 0M22 41a12 12 0 0116 0')+`<circle cx="30" cy="51" r="4" fill="${C.green}"/>`,
 router:rect(0,22,65,28,'white',C.green,5)+line(10,22,5,0)+line(55,22,60,0)+[13,26,39].map(x=>`<circle cx="${x}" cy="36" r="3" fill="${C.green}"/>`).join(''),
 mail:rect(0,6,66,45,'white',C.green,5)+path('M2 8l31 25L64 8'),
 shield:path('M30 0L55 10v20c0 18-14 29-25 34C19 59 5 48 5 30V10z',C.green,3,C.light)+path('M17 31l9 9 18-22'),
 check:path('M5 30l16 16L55 9'),
 eye:path('M1 29Q30-6 59 29Q30 64 1 29z')+`<circle cx="30" cy="29" r="11" fill="${C.light}" stroke="${C.green}" stroke-width="3"/>`,
 recover:path('M9 14a23 23 0 111 33M9 1v16h16')+path('M32 15v17l11 7')
};
const icon=(key,x,y,scale=1)=>`<g transform="translate(${x} ${y}) scale(${scale})">${symbols[key]||symbols.doc}</g>`;
const cloud=(x,y,w=320,h=155)=>`<path d="M${x+w*.23} ${y+h}C${x-w*.08} ${y+h} ${x-w*.03} ${y+h*.28} ${x+w*.23} ${y+h*.3}C${x+w*.25} ${y-h*.12} ${x+w*.72} ${y-h*.12} ${x+w*.76} ${y+h*.3}C${x+w*1.06} ${y+h*.24} ${x+w*1.1} ${y+h} ${x+w*.78} ${y+h}Z" fill="${C.light}" stroke="${C.green}" stroke-width="3"/>`;
const flowRow=(y,name,detail,key)=>rect(35,y,490,112)+icon(key,60,y+25,.95)+text(163,y+43,name,32,700,'start')+text(163,y+83,detail,27,400,'start');
const defs=`<defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10Z" fill="${C.green}"/></marker></defs>`;
const diagrams=[];
function add(id,slug,title,description,height,body){diagrams.push({id,slug,title,description,width:560,height,svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 ${height}" role="img" aria-labelledby="diagram-title diagram-desc"><title id="diagram-title">${esc(title)}</title><desc id="diagram-desc">${esc(description)}</desc>${defs}<g font-family="'Noto Sans JP','Hiragino Kaku Gothic ProN','Yu Gothic',sans-serif">${body}</g></svg>`});}
add(1,'input-process-output','入力・処理・出力・記憶','架空の歩行時間8.0秒を入力し、計算し、画面に表示し、記録を保存する四段階。',620,
 flowRow(16,'入力','歩行時間 8.0秒','keyboard')+arrow(280,130,280,162)+flowRow(173,'処理','計算・確認する','cpu')+arrow(280,286,280,319)+flowRow(330,'出力','画面で結果を見る','screen')+arrow(280,443,280,476)+flowRow(487,'記憶','保存した記録を残す','disk'));
add(2,'cpu-ram-ssd','CPU・RAM・SSDの役割','パソコン内のCPUは計算、RAMは作業中の情報、SSDは保存した情報を担当する。',630,
 rect(22,12,516,600,'#f0f4eb',C.line,26)+text(280,60,'パソコンの中の役割',30)+rect(48,90,464,143,'white')+icon('cpu',80,125,1.15)+text(230,145,'CPU',36,700,'start')+text(230,193,'計算・制御',30,400,'start')+rect(48,258,464,143,'white')+icon('ram',70,299,1.05)+text(230,313,'RAM',36,700,'start')+text(230,361,'作業中の情報',30,400,'start')+rect(48,426,464,143,'white')+icon('disk',85,462,1)+text(230,481,'SSD',36,700,'start')+text(230,529,'保存した情報',30,400,'start'));
add(3,'app-os-hardware','アプリ・OS・ドライバー・機器','アプリの印刷依頼をOSが受け、OS内のドライバーが機器の利用を仲介し、プリンターへ出力する例。',650,
 rect(45,20,470,120)+icon('app',70,44,1)+text(178,69,'記録アプリ',32,700,'start')+text(178,109,'印刷を依頼',28,400,'start')+arrow(280,145,280,184)+rect(45,198,470,240,C.light)+text(280,245,'OS：機器や資源を管理',30)+rect(75,278,410,125,'white')+text(280,326,'ドライバー',32)+text(280,369,'機器との仲介',28,400)+arrow(280,442,280,482)+rect(45,495,470,130)+icon('printer',75,525,1)+text(180,548,'プリンター',32,700,'start')+text(180,590,'用紙へ出力',28,400,'start'));
add(4,'network-topology','施設内LANから外部サービスへ','業務端末がWi-FiのAPにつながり、施設内LAN、ルーター等を通じて外部サービスに接続する一例。',730,
 icon('tablet',115,18,1.1)+icon('screen',355,22,1.05)+text(143,115,'端末',29)+text(390,115,'PC',29)+line(143,132,248,182)+line(390,132,312,182)+rect(175,180,210,88)+icon('wifi',192,191,.8)+text(287,237,'AP',34,700,'start')+arrow(280,273,280,307)+rect(75,320,410,82)+text(280,372,'施設内LAN',32)+arrow(280,406,280,440)+rect(75,453,410,92)+icon('router',105,466,.9)+text(216,509,'ルーター等',32,700,'start')+arrow(280,550,280,591)+cloud(130,604,300,102)+text(280,677,'外部サービス',30));
add(5,'browser-dns-server','URL・DNS・HTTPS・ページ表示','ブラウザーはDNSへ宛先を問い合わせ、HTTPSでWebサーバーと要求・応答を行い、HTML等を表示する。DNSはWeb通信の中継点ではない。',610,
 rect(25,30,285,177,'white')+rect(25,30,285,43,C.light,C.line,12)+text(167,62,'公式URL',27)+text(167,122,'ブラウザー',30)+text(167,167,'画面を表示',28,400)+rect(360,62,175,120,C.blue)+text(447,113,'DNS',32)+text(447,156,'宛先を返す',25,400)+arrow(315,95,352,95)+arrow(355,152,317,152)+text(334,57,'照会',24)+arrow(110,215,110,400)+arrow(267,397,267,220)+text(180,294,'HTTPS',33)+text(66,352,'要求',26)+text(318,352,'応答',26)+rect(25,420,510,158,C.light)+icon('cloud',70,458,.9)+text(280,467,'Webサーバー',32)+text(280,516,'HTML・CSS',28,400)+text(280,556,'JavaScript など',28,400));
add(6,'api-backend-database','画面・API・サーバー・DB','記録画面からAPIへ保存を依頼し、サーバーで権限と入力を確認し、データベースへ保存する。',650,
 flowRow(15,'記録画面','値を入力','tablet')+arrow(280,131,280,163)+flowRow(176,'API','依頼の窓口','doc')+arrow(280,292,280,324)+flowRow(337,'サーバー','権限・形式を確認','lock')+arrow(280,453,280,485)+rect(35,498,490,126)+`<ellipse cx="100" cy="534" rx="35" ry="12" fill="${C.light}" stroke="${C.green}" stroke-width="3"/>`+path('M65 534v48c0 16 70 16 70 0v-48')+path('M65 559c0 16 70 16 70 0')+text(163,546,'DB（保存先）',32,700,'start')+text(163,589,'記録を整理して保管',27,400,'start'));
add(7,'permissions-consent','端末の権限・本人の同意・業務の権限','スマートフォンのOSのカメラ許可、本人の撮影同意、記録の閲覧・共有権限は三つの別の確認。',650,
 rect(28,99,170,382,'white',C.green,20)+rect(46,145,134,260,C.light,C.line,8)+icon('app',73,190,1.7)+text(113,328,'カメラ',27)+text(113,367,'機能',27)+line(91,447,134,447)+rect(230,40,306,154)+icon('app',247,78,.9)+text(410,94,'OSの許可',31)+text(410,142,'機能を使う',27,400)+rect(230,235,306,154)+icon('person',247,270,.9)+text(410,289,'本人の同意',31)+text(410,337,'撮影の目的',27,400)+rect(230,430,306,154)+icon('lock',247,469,.9)+text(410,484,'業務の権限',31)+text(410,532,'閲覧・共有',27,400)+text(280,629,'三つは別々に確認',30,700));
add(8,'cloud-sync-backup','クラウド・同期・バックアップ','職員が認証・認可を受けてクラウドを利用する。端末とPCへの同期とは別に、復旧用のバックアップを保持する。',740,
 cloud(120,30,320,174)+text(280,109,'クラウド',34)+text(280,154,'認証・認可',29)+icon('lock',257,172,.7)+arrow(110,302,184,229)+arrow(223,235,147,308)+text(88,274,'同期',29)+arrow(449,302,375,229)+arrow(337,235,413,308)+text(473,274,'同期',29)+icon('tablet',73,345,1.7)+text(110,487,'端末',30)+icon('screen',372,361,1.5)+text(421,487,'PC',30)+arrow(280,234,280,571)+rect(197,500,166,43,'white','white',0)+text(280,531,'別に保持',28)+rect(65,591,430,118,C.pale)+icon('disk',91,616,.95)+text(311,641,'バックアップ',32)+text(311,684,'復旧用コピー',28,400));
add(9,'cia-triad','機密性・完全性・可用性','CIAの三つの観点を三角形で結び、宛先、内容、必要な時の利用を同時に考える。順番を示す矢印ではない。',620,
 line(280,161,126,425)+line(126,425,434,425)+line(434,425,280,161)+`<circle cx="280" cy="140" r="98" fill="${C.light}" stroke="${C.line}" stroke-width="3"/>`+icon('lock',254,65,.85)+text(280,171,'機密性',34)+text(280,211,'宛先・閲覧',27,400)+`<circle cx="126" cy="435" r="98" fill="${C.blue}" stroke="${C.line}" stroke-width="3"/>`+icon('check',101,362,.85)+text(126,464,'完全性',34)+text(126,506,'正しい内容',27,400)+`<circle cx="434" cy="435" r="98" fill="${C.pale}" stroke="${C.line}" stroke-width="3"/>`+icon('screen',408,365,.85)+text(434,464,'可用性',34)+text(434,506,'必要な時に',27,400)+text(280,317,'記録を守る',30)+text(280,590,'三つを同時に考える',30));
add(10,'phishing-path','偽メールから偽サイトへの誘導','管理者を装うメールが偽のログイン画面へ誘導し、入力すると認証情報が渡る場合がある。公式の別経路で確認し、気付いたら報告する。',680,
 rect(45,20,470,115,C.pale)+icon('mail',75,45,.95)+text(305,69,'管理者を装うメール',29)+text(305,110,'「今日中に」',27,400)+arrow(280,142,280,181)+rect(70,198,420,183,'white',C.red)+rect(70,198,420,44,C.pale,C.red,12)+text(280,230,'偽の画面（例）',28)+text(280,295,'再ログインの誘導',32)+rect(140,321,280,39,C.pale,C.red,5)+arrow(280,390,280,430)+text(280,478,'認証情報が渡る場合も',31,700,'middle',C.red)+rect(35,531,490,119,C.light)+icon('shield',59,554,.95)+text(323,579,'公式の別経路で確認',29)+text(323,622,'気付いたら報告',29));
add(11,'layered-defence','認証・更新・監視・復旧の多層防御','認証と権限、更新と端末保護、監視と報告、バックアップ、代替手順と復旧を組み合わせる。順番ではなく、異なる役割の守り。',650,
 [
 ['lock','認証・権限','必要な人だけ使う',C.light],
 ['app','更新・端末','弱点や紛失に備える',C.blue],
 ['eye','監視・報告','異常に早く気付く',C.light],
 ['disk','バックアップ','保護したコピー',C.blue],
 ['recover','代替手順・復旧','業務と記録を戻す',C.pale]
 ].map(([i,a,b,c],n)=>rect(30,15+n*126,500,111,c)+icon(i,56,43+n*126,.9)+text(171,59+n*126,a,31,700,'start')+text(171,101+n*126,b,26,400,'start')).join(''));
add(12,'troubleshooting-map','記録が開かない時の切り分け','中央の記録が開かないという症状に、端末、通信、アカウント、サービスの四つの観点を結び付ける。原因を決めつけず事実を報告する。',650,
 line(145,173,223,267)+line(415,173,337,267)+line(145,430,223,343)+line(415,430,337,343)+rect(25,15,240,164,C.light)+icon('tablet',52,35,.85)+text(157,78,'端末',32)+text(145,142,'一台だけ？',28,400)+rect(295,15,240,164,C.blue)+icon('wifi',316,37,.85)+text(426,78,'通信',32)+text(415,142,'接続・回線は？',26,400)+rect(70,265,420,88,'white',C.green)+text(280,322,'記録が開かない',34)+rect(25,430,240,164,C.blue)+icon('person',40,449,.7)+text(175,489,'アカウント',27)+text(145,553,'本人確認・権限',26,400)+rect(295,430,240,164,C.light)+icon('screen',311,452,.8)+text(439,489,'サービス',29)+text(415,553,'他の人も同じ？',26,400)+text(280,636,'原因を決めつけず、報告',28));
export async function generateLessonDiagrams(){await mkdir('public/images',{recursive:true});for(const d of diagrams)await writeFile(`public/images/lesson-${String(d.id).padStart(2,'0')}-${d.slug}.svg`,d.svg+'\n');return diagrams.map(({svg,...metadata})=>metadata);}
if(import.meta.url===`file://${process.argv[1]}`){const d=await generateLessonDiagrams();console.log(JSON.stringify(d,null,2));}
