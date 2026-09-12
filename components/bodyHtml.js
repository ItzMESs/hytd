// Auto-generated from the original HSK Path single-file app's body markup.
// Kept as plain HTML (not JSX) so nothing needs re-typing/re-verifying by hand.
export const BODY_HTML = `<header class="top">
  <div class="top-inner">
    <div class="brand">
      <span class="mark">汉</span>
      <span class="name">HSK Path<small>Хичээл · Давталт · Тест · Тоглоом · Ахиц</small></span>
    </div>
    <div class="nav-wrap">
      <button id="nav-toggle" class="nav-toggle-btn" aria-expanded="false" aria-controls="main-nav" aria-label="Цэс">
        <span class="hamburger-ic">☰</span>
      </button>
      <div class="view-toggle" id="main-nav">
        <button id="tab-lessons" class="active"><span class="tab-ic">📖</span>Хичээл</button>
        <button id="tab-review"><span class="tab-ic">🗂️</span>Давталт</button>
        <button id="tab-quiz"><span class="tab-ic">✏️</span>Тест</button>
        <button id="tab-games"><span class="tab-ic">🎮</span>Тоглоом</button>
        <button id="tab-progress"><span class="tab-ic">📊</span>Ахиц</button>
        <button id="tab-leaderboard"><span class="tab-ic">🏆</span>Тэргүүлэгчид</button>
      </div>
    </div>
    <div class="stats">
      <div class="pill due"><b id="stat-due">0</b>&nbsp;давтах</div>
      <div class="pill"><b id="stat-learned">0</b>/<span id="stat-total">0</span>&nbsp;сурсан</div>
      <div class="pill streak">🔥<b id="stat-streak">0</b></div>
      <div class="pill goal" title="Өдрийн зорилго">🎯<b id="stat-goal-count">0</b>/<input type="number" id="goal-input" min="1" max="500" value="20">&nbsp;карт</div>
      <div class="profile-block" id="profile-block">
        <button type="button" class="profile-trigger" id="profile-trigger" aria-expanded="false" aria-haspopup="true">
          <span class="profile-greet">Тавтай морил, <b id="profile-name">Хэрэглэгч</b></span>
          <span class="profile-avatar" id="profile-avatar">?</span>
          <span class="profile-caret">⌄</span>
        </button>
        <div class="profile-menu" id="profile-menu" hidden>
          <div class="pm-head">
            <span class="pm-avatar" id="pm-avatar-big">?</span>
            <span class="pm-name" id="pm-name-big">Хэрэглэгч</span>
          </div>
          <button type="button" class="pm-item" id="pm-goto-profile">
            <span class="pm-item-ic">👤</span> Профайл
          </button>
          <div class="pm-section">
            <div class="pm-section-label">Хэл</div>
            <div class="pm-seg">
              <button type="button" class="pm-seg-btn active" data-lang="mn">MN</button>
              <button type="button" class="pm-seg-btn" data-lang="en" disabled title="Тун удахгүй">EN</button>
              <button type="button" class="pm-seg-btn" data-lang="zh" disabled title="Тун удахгүй">中文</button>
            </div>
          </div>
          <div class="pm-section">
            <div class="pm-section-label">Өнгөний горим</div>
            <div class="pm-theme-toggle">
              <span class="pm-theme-side pm-theme-side-light">
                <span class="pm-theme-ic">☀️</span>Цайвар
              </span>
              <label class="pm-switch pm-switch-lg">
                <input type="checkbox" id="pm-theme-toggle">
                <span class="pm-switch-track"><span class="pm-switch-thumb"></span></span>
              </label>
              <span class="pm-theme-side pm-theme-side-dark">
                Бараан<span class="pm-theme-ic">🌙</span>
              </span>
            </div>
          </div>
          <div class="pm-section pm-offline">
            <div class="pm-offline-row">
              <span class="pm-item-ic">📶</span>
              <span class="pm-offline-label">Оффлайнд ашиглах</span>
              <label class="pm-switch">
                <input type="checkbox" id="pm-offline-toggle">
                <span class="pm-switch-track"><span class="pm-switch-thumb"></span></span>
              </label>
            </div>
            <p class="pm-offline-desc">Апп-ыг урьдчилан кэшлээд интернэтгүй үед ч онгойлгож, хичээл/флаш карт үзэх боломжтой. Ахиц дэвшил зөвхөн онлайн үед серверт хадгалагдана.</p>
          </div>
          <div class="pm-menu-email" id="profile-menu-email"></div>
          <button type="button" id="logout-btn" class="pm-item pm-logout">
            <span class="pm-item-ic">⏻</span> Гарах
          </button>
        </div>
      </div>
    </div>
    <div class="top-quote" id="top-quote"></div>
  </div>
</header>

<div class="wrap">

  <section id="lessons-view">
    <p class="intro">HSK 1-ээс 5 хүртэлх түвшний дүрмийн хичээлүүд, тэдгээрийг тайлбарлах жишээ үгсийн сан. Мөн тухайн түвшний <strong>албан ёсны (хуучин стандарт) бүрэн үгийн сан ойролцоогоор 2500 үгийг</strong> доор жагсаасан болно — эдгээр бүх үг <strong>Давталт</strong> болон <strong>Тест</strong> хэсэгт ашиглагдана. Дүрмийн хичээлээ үзсэний дараа Давталт хэсэгт очиж Anki маягийн давталтаар бататгаад, Тест хэсэгт мэдлэгээ шалгаарай.</p>
    <div id="wotd-card" class="wotd-card"></div>
    <div class="levels" id="level-tabs"></div>
    <div id="lesson-list"></div>
    <div class="vocab-browser">
      <div class="vb-head">
        <h3 id="vb-title">Бүх үгийн сан</h3>
        <div class="vb-view-toggle">
          <button type="button" id="vb-view-grid" class="vb-view-btn active">📋 Жагсаалт</button>
          <button type="button" id="vb-view-flash" class="vb-view-btn">🃏 Флаш карт</button>
        </div>
        <select id="vb-topic"></select>
        <input type="text" id="vb-search" placeholder="Хайх: ханз, пиньин, монгол утга...">
      </div>
      <div class="vb-count" id="vb-count"></div>
      <div class="vb-scroll" id="vb-scroll">
        <div class="vb-grid" id="vb-grid"></div>
        <div class="vb-flash" id="vb-flash" hidden></div>
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
    <div class="scope-filters" id="games-listen-filters"></div>
    <div class="scope-filters" id="games-dialogue-filters"></div>
    <div class="scope-filters" id="games-speaking-filters"></div>
    <div id="games-body"></div>
  </section>

  <section id="progress-view">
    <div id="progress-body"></div>
  </section>

  <section id="leaderboard-view">
    <div id="leaderboard-page-body"></div>
  </section>

  <section id="profile-view">
    <div id="profile-body"></div>
  </section>

  <p class="save-note" id="save-note">Ахиц дэвшил автоматаар хадгалагдана.</p>
</div>

<footer class="site-footer">
  <div class="site-footer-inner">
    <div class="site-footer-brand">
      <span class="mark">汉</span>
      <div>
        <b>HSK Path</b>
        <span class="site-footer-tagline">Монгол хэлээр Хятад хэл сурах платформ</span>
      </div>
    </div>
    <nav class="site-footer-links">
      <button type="button" data-goto-tab="tab-lessons">Хичээл</button>
      <button type="button" data-goto-tab="tab-review">Давталт</button>
      <button type="button" data-goto-tab="tab-quiz">Тест</button>
      <button type="button" data-goto-tab="tab-games">Тоглоом</button>
      <button type="button" data-goto-tab="tab-progress">Ахиц</button>
    </nav>
  </div>
  <div class="site-footer-copy">© <span id="footer-year"></span> HSK Path — хувийн, арилжааны бус төсөл.</div>
</footer>
`;
