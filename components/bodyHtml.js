// Auto-generated from the original HSK Path single-file app's body markup.
// Kept as plain HTML (not JSX) so nothing needs re-typing/re-verifying by hand.
export const BODY_HTML = `<header class="top">
  <div class="top-inner">
    <div class="brand">
      <span class="mark">汉</span>
      <span class="name">HSK Path<small>Хичээл · Давталт · Тест · Тоглоом · Ахиц</small></span>
    </div>
    <div class="view-toggle">
      <button id="tab-lessons" class="active">Хичээл</button>
      <button id="tab-review">Давталт</button>
      <button id="tab-quiz">Тест</button>
      <button id="tab-games">Тоглоом</button>
      <button id="tab-progress">Ахиц</button>
    </div>
    <div class="stats">
      <div class="pill due"><b id="stat-due">0</b>&nbsp;давтах</div>
      <div class="pill"><b id="stat-learned">0</b>/<span id="stat-total">0</span>&nbsp;сурсан</div>
      <div class="pill streak">🔥<b id="stat-streak">0</b></div>
      <div class="pill goal" title="Өдрийн зорилго">🎯<b id="stat-goal-count">0</b>/<input type="number" id="goal-input" min="1" max="500" value="20">&nbsp;карт</div>
      <span id="user-email-pill" class="pill" style="color:var(--ink-soft);"></span>
      <button id="logout-btn" class="btn-ghost" style="padding:6px 12px;font-size:.78rem;">Гарах</button>
    </div>
  </div>
</header>

<div class="wrap">

  <section id="lessons-view">
    <p class="intro">HSK 1-ээс 5 хүртэлх түвшний дүрмийн хичээлүүд, тэдгээрийг тайлбарлах жишээ үгсийн сан. Мөн тухайн түвшний <strong>албан ёсны (хуучин стандарт) бүрэн үгийн сан ойролцоогоор 2500 үгийг</strong> доор жагсаасан болно — эдгээр бүх үг <strong>Давталт</strong> болон <strong>Тест</strong> хэсэгт ашиглагдана. Дүрмийн хичээлээ үзсэний дараа Давталт хэсэгт очиж Anki маягийн давталтаар бататгаад, Тест хэсэгт мэдлэгээ шалгаарай.</p>
    <div id="wotd-card"></div>
    <div class="levels" id="level-tabs"></div>
    <div id="lesson-list"></div>
    <div class="vocab-browser">
      <div class="vb-head">
        <h3 id="vb-title">Бүх үгийн сан</h3>
        <select id="vb-topic"></select>
        <input type="text" id="vb-search" placeholder="Хайх: ханз, пиньин, монгол утга...">
      </div>
      <div class="vb-count" id="vb-count"></div>
      <div class="vb-scroll">
        <table class="vocab vb-table" id="vb-table">
          <thead><tr><th>№</th><th>Ханз</th><th>Пиньин</th><th>Утга</th></tr></thead>
          <tbody id="vb-tbody"></tbody>
        </table>
      </div>
    </div>
  </section>

  <section id="review-view">
    <div class="scope-filters" id="review-filters"></div>
    <div class="deck-stage">
      <div class="session-progress"><i id="session-bar" style="width:0%"></i></div>
      <div class="session-count" id="session-count">0 / 0</div>
      <div id="flash-slot"></div>
      <div class="rate-row" id="rate-row">
        <button class="rate-btn rate-again" data-r="again">Дахин<small>&lt; 10 мин</small></button>
        <button class="rate-btn rate-hard" data-r="hard">Хэцүү<small>маргааш орчим</small></button>
        <button class="rate-btn rate-good" data-r="good">Сайн<small>хэдэн өдөр</small></button>
        <button class="rate-btn rate-easy" data-r="easy">Амархан<small>дараа 7 хоног+</small></button>
      </div>
    </div>
  </section>

  <section id="quiz-view">
    <div class="scope-filters" id="quiz-filters"></div>
    <div id="quiz-body"></div>
  </section>

  <section id="games-view">
    <div class="scope-filters" id="games-mode-filters"></div>
    <div class="scope-filters" id="games-scramble-filters"></div>
    <div class="scope-filters" id="games-dialogue-filters"></div>
    <div class="scope-filters" id="games-speaking-filters"></div>
    <div id="games-body"></div>
  </section>

  <section id="progress-view">
    <div id="progress-body"></div>
  </section>

  <p class="save-note" id="save-note">Ахиц дэвшил автоматаар хадгалагдана.</p>
</div>
`;
