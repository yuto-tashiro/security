const esc = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const paths = {
 input:'M5 5h22v20H5zM9 10h14M9 15h10M18 21l8-8 3 3-8 8-4 1z',
 compute:'M9 9h14v14H9zM13 13h6v6h-6zM12 3v6M20 3v6M12 23v6M20 23v6M3 12h6M3 20h6M23 12h6M23 20h6',
 memory:'M4 9h24v14H4zM9 13h4v5H9zM18 13h4v5h-4zM8 23v4M14 23v4M20 23v4M26 23v4',
 save:'M5 6h22v21H5zM10 6v8h12V6M10 27v-8h12v8',
 screen:'M3 5h26v18H3zM11 28h10M16 23v5',
 app:'M7 3h18v26H7zM11 7h10M14 25h4M11 12h4v4h-4zM18 12h4v4h-4z',
 lock:'M7 14h18v14H7zM11 14V9a5 5 0 0110 0v5M16 19v4',
 person:'M11 9a5 5 0 1010 0 5 5 0 10-10 0M5 28v-3a11 11 0 0122 0v3',
 network:'M11 4h10v7H11zM2 22h10v7H2zM20 22h10v7H20zM16 11v6M7 22v-5h18v5',
 cloud:'M9 24a7 7 0 010-14 8 8 0 0115-1 7 7 0 010 15z',
 mail:'M3 7h26v19H3zM3 7l13 11L29 7',
 alert:'M16 3L30 28H2zM16 12v7M16 23v1',
 recover:'M6 9a11 11 0 111 16M6 3v8h8M16 10v7l5 3',
 check:'M5 17l7 7L28 7'
};
function icon(name){return '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'+(paths[name]||paths.app)+'"/></svg>';}
export function renderScene(l){const s=l.opening;return '<section class="lesson-opening topic-opening" aria-label="この回の内容を表す図解"><figure class="scene-picture"><img src="'+esc(s.image)+'" alt="'+esc(s.alt)+'" width="'+s.imageWidth+'" height="'+s.imageHeight+'" loading="lazy" decoding="async"><figcaption>概念図：'+esc(s.diagramTitle)+'</figcaption><a class="diagram-expand" href="'+esc(s.image)+'" target="_blank" rel="noopener" aria-label="'+esc(s.diagramTitle)+'の図を別の画面で拡大">図を拡大する ↗</a></figure><div class="scene-story"><span class="scene-tag">'+esc(s.setting)+'</span><h2>'+esc(s.title)+'</h2><p>'+esc(s.story)+'</p><div class="look-for"><b>この図で確かめる</b><ul>'+s.lookFor.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></div></div></section>';}
export function renderAnalogy(l){const a=l.analogy;return '<section class="analogy"><h3>'+esc(a.title)+'</h3><div class="analogy-grid">'+a.items.map(x=>'<div class="analogy-card"><span class="analogy-eyebrow">いつもの仕事</span><b>'+esc(x.everyday)+'</b><span class="analogy-bridge" aria-hidden="true">↓</span><span class="analogy-technical">ITでいうと：'+esc(x.technical)+'</span><p>'+esc(x.meaning)+'</p></div>').join('')+'</div><p class="analogy-limit">たとえの注意：'+esc(a.limit)+'</p></section>';}
function detailMarkup(m,i){const s=m.steps[i];return '<span class="map-detail-label">'+esc(s.label)+'を現場で考える</span><h4>'+esc(s.everyday)+'</h4><p>'+esc(s.detail)+'</p>';}
export function renderInteractiveMap(l){const m=l.learningMap;return '<figure class="learning-map map-'+esc(m.kind)+'" aria-label="'+esc(m.title)+'"><h3>'+esc(m.title)+'</h3><p class="map-instruction">カードを押すと、その役割と現場の例を読めます。</p><div class="map-nodes" role="group" aria-label="図の役割を選ぶ">'+m.steps.map((s,i)=>'<button type="button" class="map-node" data-map-step="'+i+'" aria-pressed="'+(i===0)+'" aria-controls="map-detail"><span class="map-icon">'+icon(s.icon)+'</span><span class="map-node-copy"><b>'+esc(s.label)+'</b><span>'+esc(s.everyday)+'</span></span>'+(m.kind==='flow'?'<span class="map-step-number">'+(i+1)+'</span>':'')+'</button>').join('')+'</div><div class="map-detail" id="map-detail" aria-live="polite" aria-atomic="true">'+detailMarkup(m,0)+'</div><figcaption>'+esc(m.note)+'</figcaption></figure>';}
export function bindInteractiveMap(l){const buttons=[...document.querySelectorAll('[data-map-step]')];buttons.forEach((b,i)=>b.onclick=()=>{buttons.forEach((x,j)=>x.setAttribute('aria-pressed',String(i===j)));document.querySelector('#map-detail').innerHTML=detailMarkup(l.learningMap,i);});}
export function renderFieldCases(l){return '<div class="field-cases"><h3>違う現場でも、同じ考え方を使えます</h3>'+l.fieldCases.map(c=>'<details class="field-case"><summary><span class="scene-tag">'+esc(c.setting)+'</span><b>'+esc(c.title)+'</b></summary><p>'+esc(c.situation)+'</p><div class="case-point"><b>ここがポイント</b><p>'+esc(c.point)+'</p></div></details>').join('')+'</div>';}
