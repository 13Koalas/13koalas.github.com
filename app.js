const TYPES = ['İsim-fiil', 'Sıfat-fiil', 'Zarf-fiil', 'Kalıcı isim', 'Çekimli fiil'];
const SAVE_KEY = 'fiilimsi-dedektifi-v1';
const DIFFICULTY_KEY = `${SAVE_KEY}:difficulty`;
const app = document.getElementById('app');
const modal = document.getElementById('dialog');

function blankState() {
  return { solved: [], wrong: [], hints: {}, finished: false, finalWrong: false };
}

function sceneWords(scene, mode = difficulty) {
  return mode === 'hard'
    ? scene.words.filter(([, type]) => type < 3).concat(scene.extraWords ?? [])
    : scene.words;
}

function storageKey(index, mode = difficulty) {
  if (mode === 'hard') return `${SAVE_KEY}:hard:${INVESTIGATIONS[index].id}`;
  return index === 0 ? SAVE_KEY : `${SAVE_KEY}:${INVESTIGATIONS[index].id}`;
}

function readState(investigation, index, mode) {
  const empty = blankState();
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey(index, mode)));
    if (!saved || !Array.isArray(saved.solved) || !Array.isArray(saved.wrong)) return empty;
    const ids = new Set(investigation.scenes.flatMap((scene, i) => sceneWords(scene, mode).map((_, j) => `${i}-${j}`)));
    const solved = [...new Set(saved.solved.filter(id => ids.has(id)))];
    const wrong = [...new Set(saved.wrong.filter(id => ids.has(id)))];
    const hints = mode === 'hard' ? Object.fromEntries(
      Object.entries(saved.hints ?? {}).filter(([i, j]) => Number.isInteger(j) && ids.has(`${i}-${j}`))
    ) : {};
    const readyForVerdict = solved.length === ids.size;
    return {
      solved, wrong, hints,
      finished: readyForVerdict && saved.finished === true,
      finalWrong: readyForVerdict && saved.finalWrong === true
    };
  } catch {
    return empty;
  }
}

let difficulty = 'normal';
try {
  if (localStorage.getItem(DIFFICULTY_KEY) === 'hard') difficulty = 'hard';
} catch {
  // Use the standard difficulty when storage is disabled.
}
const recordsByDifficulty = Object.fromEntries(['normal', 'hard'].map(mode => [
  mode, INVESTIGATIONS.map((investigation, index) => readState(investigation, index, mode))
]));
const records = () => recordsByDifficulty[difficulty];
let active = 0;
let view = 'games';
let chapter = 0;
let selected = null;
let feedback = false;
let wrongWord = null;

const current = () => INVESTIGATIONS[active];
const record = () => records()[active];
const number = n => String(n).padStart(2, '0');
const dossier = index => String(index + 1).padStart(3, '0');
const wordId = (i, j) => `${i}-${j}`;
const solved = (i, j) => record().solved.includes(wordId(i, j));
const sceneDone = i => sceneWords(current().scenes[i]).every((_, j) => solved(i, j));
const evidenceCount = () => current().scenes.filter((_, i) => sceneDone(i)).length;
const nextScene = () => current().scenes.findIndex((_, i) => !sceneDone(i));
const totalWords = investigation => investigation.scenes.reduce((total, scene) => total + sceneWords(scene).length, 0);
const points = state => state.solved.reduce((total, id) => total + (state.wrong.includes(id) ? 5 : 10), 0);

function save() {
  try {
    localStorage.setItem(storageKey(active), JSON.stringify(record()));
  } catch {
    // The current session remains playable when storage is disabled.
  }
}

function nav(nextView) {
  const changesGame = ['games', 'hunter'].includes(view) || ['games', 'hunter'].includes(nextView);
  view = nextView;
  selected = null;
  feedback = false;
  wrongWord = null;
  render();
  window.scrollTo({ top: 0, behavior: 'instant' });
  if (changesGame) app.querySelector('main h1')?.focus({ preventScroll: true });
}

function openChapter(index) {
  if (!current().scenes[index] || (index > 0 && !sceneDone(index - 1))) return;
  chapter = index;
  nav('case');
}

function shell(content) {
  const onDesk = view === 'desk';
  const choosingGame = view === 'games';
  const inHunter = view === 'hunter';
  const inDetective = !choosingGame && !inHunter;
  const finishedCount = records().filter(state => state.finished).length;
  return `<div class="shell${inDetective ? ' detective' : ''}">
    <aside class="sidebar">
      <div class="brand"><div class="brand-icon" aria-hidden="true">⌕</div><div>Fiilimsi Oyunları</div></div>
      <div class="section-label">OYUN MENÜSÜ</div>
      <nav class="nav" aria-label="Ana menü">
        <button data-nav="games" class="${choosingGame ? 'active' : ''}"><span aria-hidden="true">▦</span>Oyun seçimi</button>
        ${inDetective ? `<button data-nav="desk" class="${onDesk ? 'active' : ''}"><span aria-hidden="true">▦</span>Olay dosyaları</button>
        ${onDesk ? '' : `<button data-nav="notebook" class="${view === 'notebook' ? 'active' : ''}"><span aria-hidden="true">▤</span>Kanıt defteri</button>`}
        <button data-guide><span aria-hidden="true">⌘</span>Dedektif rehberi</button>` : ''}
      </nav>
      <div class="sidebar-bottom">
        ${inDetective ? `<div class="rank">
          <span class="badge">✧</span><strong>${finishedCount === INVESTIGATIONS.length ? 'Usta dedektif' : 'Genç dedektif'}</strong>
          <p>${finishedCount} / ${INVESTIGATIONS.length} olay çözüldü</p>
        </div>` : ''}
        ${inDetective && location.protocol !== 'file:' ? '<a class="download" href="fiilimsi-dedektifi.zip" download>↓ Oyunu bilgisayara indir</a>' : ''}
        ${inDetective && !onDesk ? '<button class="quiet" data-reset>↻ Bu olayı sıfırla</button>' : ''}
      </div>
    </aside>
    <main class="main">
      <header class="topbar">
        <div class="crumb">${inDetective ? `Dedektif masası ${onDesk ? '' : `/ <b>Dosya ${dossier(active)}</b>`}` : inHunter ? 'Fiilimsi Avcısı' : 'Oyun seçimi'}</div>
        <div class="pill">${!inDetective || onDesk ? '8. sınıf · Türkçe' : difficulty === 'hard' ? 'Zor · Fiilimsiyi bul' : 'Normal'}</div>
        ${inDetective ? `<div class="player"><div class="avatar">D</div><div>Dedektif<small>${finishedCount} olay çözüldü</small></div></div>` : ''}
      </header>
      ${content}
      ${inDetective ? '<footer class="footer"><span>Fiilimsi Dedektifi</span><span>İlerleme bu tarayıcıda saklanır.</span></footer>' : ''}
    </main>
  </div>`;
}

// Illustration sheets are arranged in four quadrants in reading order.
function atlasPanel(atlas, panel) {
  const x = panel % 2 * 768;
  const y = Math.floor(panel / 2) * 512;
  return `<svg class="atlas-panel" viewBox="${x} ${y} 768 512"
    preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
    <image href="${atlas}" width="1536" height="1024" preserveAspectRatio="none"/>
  </svg>`;
}

function caseCover(investigation) {
  if (investigation.atlas) return atlasPanel(investigation.atlas, 0);
  return '<img src="assets/koridor.png" alt="">';
}

function sceneIllustration(investigation, scene, index) {
  const label = `role="img" aria-label="${scene.place} · ${scene.title}"`;
  if (investigation.atlas) {
    const isExtraScene = scene.extraPanel !== undefined;
    const atlas = isExtraScene ? investigation.extraAtlas : investigation.atlas;
    const panel = isExtraScene ? scene.extraPanel : index + 1;
    return `<div class="scene-art scene-illustrated" ${label}>${atlasPanel(atlas, panel)}</div>`;
  }
  return `<div class="scene-art scene-${scene.art}" ${label}></div>`;
}

function games() {
  const locationCount = INVESTIGATIONS.reduce((total, investigation) => total + investigation.scenes.length, 0);
  return `<section class="hero desk-hero games-hero">
    <img src="assets/koridor.png" alt="">
    <div class="hero-content">
      <h1 tabindex="-1">Hangi oyunu oynamak istersin?</h1>
      <p>Bir olayın izini sür veya kısa sorularla fiilimsi pratiği yap.</p>
    </div>
  </section>
  <section class="game-grid" aria-label="Oyunlar">
    <article class="game-card" aria-labelledby="detective-title">
      <div class="game-icon" aria-hidden="true">⌕</div>
      <h2 id="detective-title">Fiilimsi Dedektifi</h2>
      <p>Tanık ifadelerini incele, kanıtları topla ve olayın nasıl gerçekleştiğini çöz.</p>
      <ul>
        <li><strong>${INVESTIGATIONS.length} olay, ${locationCount} mekân.</strong> Her ifadeyi çözdükçe yeni bir kanıt ve sonraki mekân açılır.</li>
        <li><strong>Normal.</strong> İşaretli kelimelerin türünü seç. Çekimli fiil ve kalıcı isim tuzaklarını ayırt et.</li>
        <li><strong>Zor.</strong> Fiilimsileri işaretsiz metinde kendin bul ve türlerini seç. Her mekânda bir fiilimsi için ipucu alabilirsin.</li>
      </ul>
      <button class="primary" data-nav="desk">Dedektifi oyna</button>
    </article>
    <article class="game-card" aria-labelledby="hunter-title">
      <div class="game-icon" aria-hidden="true">◎</div>
      <h2 id="hunter-title">Fiilimsi Avcısı</h2>
      <p>Her soruda işaretli bir kelimeyi sınıflandır. Doğru cevaplarla puan kazan ve serini sürdür.</p>
      <ul>
        <li><strong>Kolay, orta ve zor.</strong> Oynamak istediğin seviyeleri seç. Sorular seçim sırana göre gelir. Üç seviyede toplam 30 soru var.</li>
        <li><strong>Dört cevap.</strong> İsim-fiil, sıfat-fiil, zarf-fiil veya fiilimsi değil. Çekimli fiil ve kalıcı isim tuzaklarına dikkat et.</li>
        <li><strong>Üç can.</strong> Kalan canlarını, puanını ve doğru cevap serini oyun sırasında takip et.</li>
      </ul>
      <button class="primary" data-nav="hunter">Avcıyı oyna</button>
    </article>
  </section>`;
}

function desk() {
  const finishedCount = records().filter(state => state.finished).length;
  const locationCount = INVESTIGATIONS.reduce((total, investigation) => total + investigation.scenes.length, 0);
  return `<section class="hero desk-hero">
    <img src="assets/koridor.png" alt="">
    <div class="hero-content">
      <div class="case-tag">⌕ DEDEKTİF MASASI</div>
      <h1 tabindex="-1">Olay dosyaları</h1>
      <p>Bir dosya seç. Tanık ifadelerindeki fiilimsileri ve kelime tuzaklarını inceleyerek kanıtları ortaya çıkar.</p>
      <span class="desk-tally">${finishedCount} / ${INVESTIGATIONS.length} olay çözüldü</span>
    </div>
  </section>
  <fieldset class="difficulty-picker">
    <legend>Zorluk</legend>
    <button class="option" data-difficulty="normal" aria-pressed="${difficulty === 'normal'}">Normal · İşaretli kelimeleri incele</button>
    <button class="option" data-difficulty="hard" aria-pressed="${difficulty === 'hard'}">Zor · Fiilimsileri kendin bul</button>
  </fieldset>
  <section class="dossier-section" aria-labelledby="dossier-title">
    <div class="section-head"><h2 id="dossier-title">Soruşturma arşivi</h2><span>${INVESTIGATIONS.length} olay · ${locationCount} mekân</span></div>
    <div class="dossier-grid">
      ${INVESTIGATIONS.map((investigation, index) => {
        const state = records()[index];
        const status = state.finished ? '✓ Çözüldü' : state.solved.length ? 'Sürüyor' : 'İncelemeye hazır';
        return `<button class="dossier-card" data-investigation="${index}">
          <span class="dossier-art" aria-hidden="true">${caseCover(investigation)}</span>
          <span class="dossier-top"><span>DOSYA ${dossier(index)}</span><span class="dossier-icon" aria-hidden="true">${investigation.icon}</span></span>
          <strong>${investigation.title}</strong>
          <span class="dossier-description">${investigation.summary}</span>
          <span class="dossier-meta"><span>${state.solved.length} / ${totalWords(investigation)} kelime</span><span>${status} <span aria-hidden="true">↗</span></span></span>
        </button>`;
      }).join('')}
    </div>
  </section>`;
}

function home() {
  const investigation = current();
  const state = record();
  const next = nextScene();
  let startLabel = 'Soruşturmayı başlat';
  if (state.finished) startLabel = 'Çözümü görüntüle';
  else if (next === -1) startLabel = 'Olayı çöz';
  else if (state.solved.length) startLabel = 'Soruşturmaya devam et';
  return `<button class="back" data-nav="desk">← Tüm olay dosyaları</button>
  <section class="hero">
    ${caseCover(investigation)}
    <div class="hero-content">
      <div class="case-tag">${investigation.icon} DOSYA ${dossier(active)}</div>
      <h1>${investigation.title}</h1><p>${investigation.summary}</p>
      <button class="primary" id="start">${startLabel} <span aria-hidden="true">↗</span></button>
    </div>
  </section>
  <section class="stats" aria-label="İlerleme">
    <div class="stat"><div class="stat-icon">▤</div><div><small>Toplanan kanıt</small><strong>${evidenceCount()} <span>/ ${investigation.scenes.length} kanıt</span></strong></div></div>
    <div class="stat"><div class="stat-icon">⌕</div><div><small>İncelenen kelime</small><strong>${state.solved.length} <span>/ ${totalWords(investigation)} kelime</span></strong></div></div>
    <div class="stat"><div class="stat-icon">✧</div><div><small>Dedektif puanı</small><strong>${points(state)} <span>/ ${totalWords(investigation) * 10} puan</span></strong></div></div>
  </section>
  <div class="columns">
    <section>
      <div class="section-head"><h2>Soruşturma rotası</h2><span>${investigation.scenes.length} mekân</span></div>
      <div class="locations">${investigation.scenes.map((scene, index) => `
        <button class="location ${index === next ? 'current' : ''}" data-chapter="${index}" ${index > 0 && !sceneDone(index - 1) ? 'disabled' : ''}>
          <div class="location-top"><span class="num">${number(index + 1)}</span><span>${sceneDone(index) ? '✓ İNCELENDİ' : index === next ? 'İNCELEMEYE HAZIR' : '♧ KİLİTLİ'}</span></div>
          <strong>${scene.place} <span style="float:right" aria-hidden="true">${scene.icon}</span></strong><p>${scene.title}</p>
        </button>`).join('')}
      </div>
    </section>
    <aside class="note">
      <div class="eyebrow">DEDEKTİFİN NOTU</div><h3>Göründüğü gibi olmayabilir.</h3>
      <p>Bir kelimeyi sınıflandırırken ekine ve cümledeki görevine birlikte bak.</p>
      <div class="tip">⌕ “Dondurma yedim.” cümlesindeki dondurma bir yiyeceğin adıdır.</div>
    </aside>
  </div>`;
}

function sceneSentence(scene, words, hard, hint) {
  const tokens = hard ? /\{([^}]+)\}|[\p{L}\p{N}]+(?:[’'][\p{L}\p{N}]+)*/gu : /\{([^}]+)\}/g;
  return scene.text.replace(tokens, (token, markedWord, position) => {
    const word = markedWord ?? token;
    if (!/\p{L}/u.test(word)) return word;
    const index = markedWord || scene.extraWords?.some(([extra]) => extra === word)
      ? words.findIndex(entry => entry[0] === word)
      : -1;
    const isSolved = solved(chapter, index);
    const isHint = hard && index === hint && !isSolved;
    const isWrong = wrongWord === position;
    const style = hard ? 'word word-search' : 'word';
    return `<button type="button" class="${style}${isSolved ? ' solved' : ''}${selected === index ? ' selected' : ''}${isHint ? ' hinted' : ''}${isWrong ? ' wrong-word' : ''}"
      data-word="${index}" data-position="${position}" aria-label="${word} kelimesini incele${isHint ? ', ipucu' : ''}">${word}${isSolved ? '<sup> ✓</sup>' : ''}</button>`;
  });
}

function casePage() {
  const scene = current().scenes[chapter];
  const last = chapter === current().scenes.length - 1;
  const hard = difficulty === 'hard';
  const words = sceneWords(scene);
  const hint = record().hints[chapter];
  const done = sceneDone(chapter);
  return `<button class="back" data-nav="home">← Olay dosyasına dön</button>
    <section class="investigation">
      <div class="scene-head">
        ${sceneIllustration(current(), scene, chapter)}
        <div class="scene-info">
          <div class="eyebrow" style="color:#becbb0">MEKÂN ${number(chapter + 1)} / ${number(current().scenes.length)} · ${scene.place.toLocaleUpperCase('tr')}</div>
          <h2>${scene.title}</h2><p>${scene.person}</p>
        </div>
      </div>
      <div class="paper">
        <div class="paper-label">İNCELENECEK BELGE · ${words.filter((_, j) => solved(chapter, j)).length} / ${words.length} ${hard ? 'FİİLİMSİ' : 'KELİME'}</div>
        <p class="sentence">“${sceneSentence(scene, words, hard, hint)}”</p>
        <p class="instruction">${hard
          ? 'Metindeki fiilimsilere dokun ve türlerini seç.'
          : 'Altı çizili kelimeleri incele. Fiilimsi türünü seç veya kelimenin hangi tuzak olduğunu belirle.'}<br>
          İlk denemede doğru cevap <b>10 puan</b> · Açıklamadan sonra doğru cevap <b>5 puan</b></p>
        ${hard && !done ? `<button class="option" data-hint ${hint === undefined ? '' : 'disabled'}>${hint === undefined ? 'İpucu al' : 'İpucu kullanıldı'}</button>` : ''}
        ${wrongWord === null ? '' : '<div class="feedback" role="status">Bu sözcük fiilimsi değil. Metinde başka bir sözcük dene.</div>'}
        ${selected === null ? '' : answerBox(words, hard)}
        ${done ? `<div class="evidence">
          <div class="eyebrow">✓ KANIT AÇILDI</div><h3>${scene.clue}</h3><p>${scene.evidence}</p>
          <button class="primary" id="next">${last ? 'Kanıtları birleştir' : 'Sonraki mekâna geç'} →</button>
        </div>` : ''}
      </div>
    </section>`;
}

function answerBox(words, hard) {
  const [word, correct, explanation] = words[selected];
  const answered = solved(chapter, selected);
  return `<div class="answer-box">
    <h3>“${word}” bu cümlede hangi görevde?</h3>
    <div class="options">${(hard ? TYPES.slice(0, 3) : TYPES).map((type, i) => {
      const chosen = answered && i === correct;
      return `<button class="option ${chosen ? 'chosen' : ''}" data-answer="${i}" ${answered ? 'disabled' : ''}>
        ${String.fromCharCode(65 + i)} <span style="margin-left:10px">${type}</span>${chosen ? ' ✓' : ''}</button>`;
    }).join('')}</div>
    <div aria-live="polite">${answered
      ? `<div class="feedback good"><b>✓ Doğru iz!</b> ${explanation}</div>`
      : feedback ? `<div class="feedback"><b>Bir daha incele.</b> ${explanation}</div>` : ''}</div>
  </div>`;
}

function notebook() {
  const count = evidenceCount();
  return `<button class="back" data-nav="home">← Olay dosyasına dön</button>
    <div class="heading"><div><div class="eyebrow">DOSYA ${dossier(active)}</div><h1>Kanıt defteri</h1><p>${current().title}</p></div>
    <span class="pill">${count} / ${current().scenes.length} kanıt</span></div>
    ${count === 0 ? '<div class="empty">Henüz kanıt toplanmadı.<br><br><button class="primary" data-chapter="0">İlk ifadeyi incele →</button></div>' :
      `<div class="notebook-grid">${current().scenes.map((scene, i) => sceneDone(i) ? `<article class="evidence-card">
        <div class="eyebrow">KANIT ${number(i + 1)} · ${scene.place}</div><h3>${scene.clue}</h3><p>${scene.evidence}</p>
        <button class="quiet" data-chapter="${i}">İfadeyi yeniden incele →</button>
      </article>` : '').join('')}</div>`}
    ${nextScene() === -1 ? '<p><button class="primary" data-nav="final">Olayı çöz →</button></p>' : ''}`;
}

function finalPage() {
  const investigation = current();
  const state = record();
  if (state.finished) {
    const review = state.wrong.map(id => {
      const [scene, word] = id.split('-').map(Number);
      return sceneWords(investigation.scenes[scene])[word][0];
    });
    const total = totalWords(investigation);
    return `<div class="completion">
      <div class="eyebrow">DOSYA ${dossier(active)} · TAMAMLANDI</div><div class="seal">✧</div>
      <h2>${investigation.title} çözüldü!</h2><p>${investigation.resolution}</p>
      <div class="pill">${points(state)} / ${total * 10} puan · ${total - review.length} kelimede ilk denemede doğru</div>
      ${review.length ? `<p>Tekrar bakabileceğin kelimeler: ${review.join(', ')}.</p>` : ''}
      <div class="completion-actions">
        <button class="primary" data-nav="desk">Tüm olay dosyaları →</button>
        <button class="option" data-nav="notebook">Kanıt defterini aç</button>
        <button class="quiet" data-reset>↻ Bu olayı yeniden oyna</button>
      </div>
    </div>`;
  }
  return `<button class="back" data-nav="notebook">← Kanıtları yeniden oku</button>
    <div class="final-card"><div class="eyebrow">SON GÖREV · KANITLARI BİRLEŞTİR</div>
    <h2>${investigation.question}</h2><p>Belgelerle desteklenen açıklamayı seç.</p>
    ${investigation.verdicts.map((verdict, index) => `<button class="option" data-verdict="${index}">${verdict}</button>`).join('')}
    ${state.finalWrong ? `<div class="feedback" role="status">Bu açıklama bütün kanıtlarla uyuşmuyor. ${investigation.hint}</div>` : ''}
    </div>`;
}

const pages = { games, hunter: hunterPage, desk, home, case: casePage, notebook, final: finalPage };

function render() {
  app.innerHTML = shell(pages[view]());
  if (view === 'hunter') mountHunter(app.querySelector('.hunter'));
}

function answer(choice) {
  if (selected === null || solved(chapter, selected)) return;
  const id = wordId(chapter, selected);
  const state = record();
  feedback = choice !== sceneWords(current().scenes[chapter])[selected][1];
  if (!feedback) state.solved.push(id);
  else if (!state.wrong.includes(id)) state.wrong.push(id);
  save();
  render();
  app.querySelector('.answer-box')?.scrollIntoView({ block: 'nearest' });
}

app.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button || button.disabled) return;
  const { difficulty: mode, investigation, nav: destination, chapter: scene, word, position, answer: choice, verdict } = button.dataset;
  if (mode !== undefined) {
    difficulty = mode;
    try {
      localStorage.setItem(DIFFICULTY_KEY, mode);
    } catch {
      // Keep the selected difficulty for the current session.
    }
    render();
    app.querySelector(`[data-difficulty="${mode}"]`)?.focus();
  } else if (investigation !== undefined) {
    active = Number(investigation);
    nav('home');
  } else if (destination) {
    nav(destination);
  } else if (scene !== undefined) {
    openChapter(Number(scene));
  } else if (word !== undefined) {
    const index = Number(word);
    selected = index < 0 ? null : index;
    wrongWord = index < 0 ? Number(position) : null;
    feedback = false;
    render();
    if (wrongWord !== null) app.querySelector(`[data-position="${wrongWord}"]`)?.focus({ preventScroll: true });
    const box = app.querySelector('.answer-box');
    box?.querySelector('button:not(:disabled)')?.focus({ preventScroll: true });
    box?.scrollIntoView({ block: 'nearest' });
  } else if (choice !== undefined) {
    answer(Number(choice));
  } else if (button.hasAttribute('data-hint')) {
    const state = record();
    if (state.hints[chapter] !== undefined) return;
    const index = sceneWords(current().scenes[chapter]).findIndex((_, j) => j !== selected && !solved(chapter, j));
    const hint = index === -1 ? selected : index;
    if (hint === null || solved(chapter, hint)) return;
    state.hints[chapter] = hint;
    wrongWord = null;
    save();
    render();
    app.querySelector('.hinted')?.focus();
  } else if (verdict !== undefined) {
    if (nextScene() !== -1) return;
    const state = record();
    state.finished = Number(verdict) === current().correct;
    state.finalWrong = !state.finished;
    save();
    render();
  } else if (button.id === 'start') {
    const index = nextScene();
    if (index === -1) nav('final');
    else openChapter(index);
  } else if (button.id === 'next') {
    if (chapter === current().scenes.length - 1) nav('final');
    else openChapter(chapter + 1);
  } else if (button.hasAttribute('data-guide')) {
    guide();
  } else if (button.hasAttribute('data-reset')) {
    reset();
  }
});

function dialog(html) {
  modal.innerHTML = '<button class="close" aria-label="Kapat">×</button>' + html;
  modal.querySelector('.close').onclick = () => modal.close();
  modal.showModal();
}

function guide(){dialog(`<div class="eyebrow">CEBİNDEKİ REHBER</div><h2>Bir kelimeyi nasıl incelersin?</h2><p>Önce cümledeki anlamına ve görevine bak. Yalnızca eke bakarak karar verme.</p><table><tr><th>Tür</th><th>İpucu ve örnek</th></tr><tr><td>İsim-fiil</td><td>Eylemin adını bildirir: -ma, -ış, -mak.<br>“Yüzmek güzeldir.”</td></tr><tr><td>Sıfat-fiil</td><td>Bir varlığı niteler: -an, -ası, -mez, -ar, -dik, -ecek, -miş.<br>“Gelen öğrenci”</td></tr><tr><td>Zarf-fiil</td><td>Eylemin zamanını veya nasıl yapıldığını belirtir.<br>“Gülerek konuştu.” · “Gelince aradı.”</td></tr><tr><td>Kalıcı isim</td><td>Bir varlığın veya kavramın adı olmuştur.<br>“Dondurma eridi.” · “Çakmak bozuldu.”</td></tr><tr><td>Çekimli fiil</td><td>Kip ve kişi bildirir. Emirler de bu gruptadır.<br>“Geldi.” · “Sakın koşma!”</td></tr></table><p><b>Normal modda</b> işaretli kelimeleri inceleyip türlerini seç. <b>Zor modda</b> metindeki fiilimsileri bulup türlerini seç. Her mekânda bir kez ipucu alabilirsin. Tüm kelimeleri doğru sınıflandırınca kanıt açılır. Yanlış cevapta açıklamayı okuyup tekrar dene. Süre sınırı yok.</p><p class="mini">İlerleme yalnızca bu tarayıcıda saklanır; başka cihazlara aktarılmaz.</p>`);}

function reset() {
  dialog(`<h2>Bu olay baştan başlatılsın mı?</h2>
    <p>“${current().title}” dosyasının ${difficulty === 'hard' ? 'zor' : 'normal'} modundaki kanıtları ve puanı sıfırlanacak.</p>
    <button class="primary" id="confirm-reset">Evet, baştan başla</button>
    <button class="quiet" id="cancel-reset">Vazgeç</button>`);
  modal.querySelector('#cancel-reset').onclick = () => modal.close();
  modal.querySelector('#confirm-reset').onclick = () => {
    records()[active] = blankState();
    save();
    modal.close();
    nav('home');
  };
}

render();
