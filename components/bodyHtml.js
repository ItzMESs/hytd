// Auto-generated from the original HSK Path single-file app's body markup.
// Kept as plain HTML (not JSX) so nothing needs re-typing/re-verifying by hand.
export const BODY_HTML = `<header class="top">
  <div class="top-inner">
    <div class="brand">
      <span class="mark" id="brand-mark">汉</span>
      <span class="name" id="brand-name">HSK Path<small id="brand-tagline">Хичээл · Давталт · Тест · Тоглоом · Ахиц</small></span>
    </div>
    <div class="track-switch" id="track-switch" role="group" aria-label="Хэл сэлгэх">
      <button type="button" id="track-btn-hsk" class="track-switch-btn active">🇨🇳 HSK</button>
      <button type="button" id="track-btn-ielts" class="track-switch-btn">🇬🇧 IELTS</button>
    </div>
    <div class="nav-wrap">
      <button id="nav-toggle" class="nav-toggle-btn" aria-expanded="false" aria-controls="main-nav" aria-label="Цэс">
        <span class="hamburger-ic">☰</span>
      </button>
      <div class="view-toggle" id="main-nav">
        <button id="tab-lessons" class="active track-hsk"><span class="tab-ic">📖</span>Хичээл</button>
        <button id="tab-grammar" class="track-hsk"><span class="tab-ic">📐</span>Дүрэм</button>
        <button id="tab-review" class="track-hsk"><span class="tab-ic">🗂️</span>Давталт</button>
        <button id="tab-quiz" class="track-hsk"><span class="tab-ic">✏️</span>Тест</button>
        <button id="tab-games" class="track-hsk"><span class="tab-ic">🎮</span>Тоглоом</button>
        <button id="tab-ielts-vocab" class="track-ielts" hidden><span class="tab-ic">📚</span>Үгийн сан</button>
        <button id="tab-ielts-review" class="track-ielts" hidden><span class="tab-ic">🗂️</span>Давталт</button>
        <button id="tab-ielts-game" class="track-ielts" hidden><span class="tab-ic">🎮</span>Тоглоом</button>
        <button id="tab-ielts-reading" class="track-ielts" hidden><span class="tab-ic">📖</span>Reading</button>
        <button id="tab-ielts-listening" class="track-ielts" hidden><span class="tab-ic">🎧</span>Listening</button>
        <button id="tab-ielts-writing" class="track-ielts" hidden><span class="tab-ic">✍️</span>Writing</button>
        <button id="tab-ielts-speaking" class="track-ielts" hidden><span class="tab-ic">🗣️</span>Speaking</button>
        <button id="tab-ielts-mock" class="track-ielts" hidden><span class="tab-ic">🎯</span>Бүтэн сорил</button>
        <button id="tab-progress" class="track-hsk"><span class="tab-ic">📊</span>Ахиц</button>
        <button id="tab-leaderboard" class="track-hsk"><span class="tab-ic">🏆</span>Тэргүүлэгчид<span class="tab-badge" id="tab-leaderboard-badge" hidden>0</span></button>
      </div>
    </div>
    <div class="stats">
      <div class="pill due"><b id="stat-due">0</b>&nbsp;давтах</div>
      <div class="stats-more-wrap" id="stats-more-wrap">
        <button type="button" class="stats-more-btn" id="stats-more-trigger" aria-expanded="false" aria-haspopup="true" aria-label="Бусад статистик" title="Бусад статистик">
          <span class="stats-more-dots">⋮</span>
        </button>
        <div class="stats-more-menu" id="stats-more-menu" hidden>
          <div class="pill"><b id="stat-learned">0</b>/<span id="stat-total">0</span>&nbsp;сурсан</div>
          <div class="pill streak">🔥<b id="stat-streak">0</b></div>
          <div class="pill goal" title="Өдрийн зорилго">🎯<b id="stat-goal-count">0</b>/<input type="number" id="goal-input" min="1" max="500" value="20">&nbsp;карт</div>
        </div>
      </div>
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
          <div class="pm-section pm-voice" id="pm-voice-section" hidden>
            <div class="pm-section-label">Дуудлагын дуу хоолой</div>
            <div class="pm-voice-row">
              <select id="pm-voice-select"></select>
              <button type="button" class="pm-voice-test" id="pm-voice-test" title="Турших">🔊</button>
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

  <section id="lessons-view" class="track-hsk">
    <p class="intro">HSK 1-ээс 5 хүртэлх түвшний дүрмийн хичээлүүд, тэдгээрийг тайлбарлах жишээ үгсийн сан. Мөн тухайн түвшний <strong>албан ёсны (хуучин стандарт) бүрэн үгийн сан ойролцоогоор 2500 үгийг</strong> доор жагсаасан болно — эдгээр бүх үг <strong>Давталт</strong> болон <strong>Тест</strong> хэсэгт ашиглагдана. Дүрмийн хичээлээ үзсэний дараа Давталт хэсэгт очиж Anki маягийн давталтаар бататгаад, Тест хэсэгт мэдлэгээ шалгаарай.</p>
    <div id="wotd-card" class="wotd-card"></div>
    <div id="lesson-list"></div>

    <div class="vb-shell" id="vb-shell">
      <aside class="vb-sidebar" id="vb-sidebar">
        <div class="standard-toggle" id="level-standard-toggle"></div>
        <div class="vb-sidebar-levels" id="level-tabs"></div>
        <div class="vb-sidebar-decks">
          <div class="vb-sidebar-label">Миний багцууд</div>
          <button type="button" class="vb-sidebar-newdeck" id="vb-sidebar-newdeck">
            <span class="vb-sidebar-plus">+</span> Шинэ багц
          </button>
          <div class="vb-sidebar-decklist" id="vb-sidebar-decklist"></div>
        </div>
      </aside>
      <div class="vocab-browser">
        <div class="vb-head">
          <h3 id="vb-title">Бүх үгийн сан</h3>
          <div class="vb-view-toggle">
            <button type="button" id="vb-view-grid" class="vb-view-btn active">📋 Жагсаалт</button>
            <button type="button" id="vb-view-flash" class="vb-view-btn">🃏 Флаш карт</button>
          </div>
          <select id="vb-topic"></select>
          <input type="text" id="vb-search" placeholder="Хайх: ханз, пиньин, монгол утга...">
          <button type="button" class="btn-ghost" id="vb-print-btn" title="Одоогийн жагсаалтыг PDF шпаргалка болгож татах">🖨️ PDF</button>
        </div>
        <div class="vb-count" id="vb-count"></div>
        <div class="vb-scroll" id="vb-scroll">
          <div class="vb-grid" id="vb-grid"></div>
          <div class="vb-flash" id="vb-flash" hidden></div>
        </div>
      </div>
    </div>
  </section>

  <section id="grammar-view" class="track-hsk">
    <div class="scope-filters" id="grammar-subtab-filters"></div>
    <div id="grammar-main">
      <p class="intro">HSK 1-ээс 5 хүртэлх түвшний бүх дүрмийн цэгүүд нэг дор — хайж олоод, шууд холбогдох хичээл рүү очиж болно.</p>
      <div class="grammar-head">
        <input type="text" id="grammar-search" placeholder="Дүрэм хайх: жишээ нь 了, 把, 比...">
        <span class="grammar-count" id="grammar-count"></span>
      </div>
      <div class="scope-filters" id="grammar-level-filters"></div>
      <div id="grammar-body"></div>
    </div>
    <div id="chengyu-main" hidden>
      <p class="intro">Түгээмэл хэрэглэгддэг хятад хэлц үг (成语) — ахисан түвшний сурагчдад зориулав.</p>
      <div class="grammar-head">
        <input type="text" id="chengyu-search" placeholder="Хэлц үг хайх...">
        <span class="grammar-count" id="chengyu-count"></span>
      </div>
      <div id="chengyu-body"></div>
    </div>
  </section>

  <section id="review-view" class="track-hsk">
    <div class="standard-toggle" id="review-standard-toggle"></div>
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

  <section id="quiz-view" class="track-hsk">
    <div class="standard-toggle" id="quiz-standard-toggle"></div>
    <div class="scope-filters" id="quiz-filters"></div>
    <div id="quiz-body"></div>
  </section>

  <section id="games-view" class="track-hsk">
    <div class="scope-filters" id="games-mode-filters"></div>
    <div class="scope-filters" id="games-scramble-filters"></div>
    <div class="scope-filters" id="games-listen-filters"></div>
    <div class="scope-filters" id="games-dictation-filters"></div>
    <div class="scope-filters" id="games-dialogue-filters"></div>
    <div class="scope-filters" id="games-reading-filters"></div>
    <div class="scope-filters" id="games-numbers-filters"></div>
    <div class="scope-filters" id="games-speaking-filters"></div>
    <div id="games-body"></div>
  </section>

  <section id="progress-view" class="track-hsk">
    <div id="progress-body"></div>
  </section>

  <section id="leaderboard-view" class="track-hsk">
    <div id="leaderboard-page-body"></div>
  </section>

  <section id="profile-view">
    <div id="profile-body"></div>
  </section>

  <section id="ielts-vocab-view" class="track-ielts" hidden>
    <div class="scope-filters" id="ielts-vocab-filters"></div>
    <div id="ielts-vocab-body"></div>
  </section>

  <section id="ielts-review-view" class="track-ielts" hidden>
    <div class="scope-filters" id="ielts-review-filters"></div>
    <div class="deck-stage">
      <div class="session-progress"><i id="ielts-session-bar" style="width:0%"></i></div>
      <div class="session-count" id="ielts-session-count">0 / 0</div>
      <div id="ielts-flash-slot"></div>
      <div class="rate-row" id="ielts-rate-row">
        <button class="rate-btn rate-again" data-r="again">Дахин<small>&lt; 10 мин</small></button>
        <button class="rate-btn rate-hard" data-r="hard">Хэцүү<small>маргааш орчим</small></button>
        <button class="rate-btn rate-good" data-r="good">Сайн<small>хэдэн өдөр</small></button>
        <button class="rate-btn rate-easy" data-r="easy">Амархан<small>дараа 7 хоног+</small></button>
      </div>
    </div>
  </section>

  <section id="ielts-game-view" class="track-ielts" hidden>
    <p class="intro" style="max-width:100%;">Үгийн сангаа тоглоомоор бататгаарай — тохируулах болон сонголтот тестээс сонгож болно.</p>
    <div class="scope-filters" id="ielts-game-mode-filters"></div>
    <div class="scope-filters" id="ielts-game-level-filters"></div>
    <div id="ielts-game-body"></div>
  </section>

  <section id="ielts-reading-view" class="track-ielts" hidden>
    <div id="ielts-reading-body"></div>
  </section>

  <section id="ielts-listening-view" class="track-ielts" hidden>
    <div id="ielts-listening-body"></div>
  </section>

  <section id="ielts-writing-view" class="track-ielts" hidden>
    <div class="scope-filters" id="ielts-writing-filters"></div>
    <div id="ielts-writing-body"></div>
  </section>

  <section id="ielts-speaking-view" class="track-ielts" hidden>
    <div class="scope-filters" id="ielts-speaking-filters"></div>
    <div id="ielts-speaking-body"></div>
  </section>

  <section id="ielts-mock-view" class="track-ielts" hidden>
    <div id="ielts-mock-body"></div>
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

<div class="stroke-modal" id="stroke-modal" hidden>
  <div class="stroke-modal-backdrop" id="stroke-modal-backdrop"></div>
  <div class="stroke-modal-box" role="dialog" aria-modal="true" aria-label="Бичих дараалал">
    <button type="button" class="stroke-modal-close" id="stroke-modal-close" aria-label="Хаах">✕</button>
    <div class="stroke-modal-head">
      <div class="stroke-modal-word" id="stroke-modal-word"></div>
      <div class="stroke-modal-py" id="stroke-modal-py"></div>
    </div>
    <div class="stroke-modal-chars" id="stroke-modal-chars"></div>
    <div class="stroke-modal-actions">
      <button type="button" class="btn-ghost" id="stroke-modal-replay">↺ Дахин үзүүлэх</button>
    </div>
    <p class="stroke-modal-note">Зурааны дараалал эхний удаад ачаалахад интернэт холболт шаардлагатай.</p>
  </div>
</div>

<div class="stroke-modal" id="message-modal" hidden>
  <div class="stroke-modal-backdrop" id="message-modal-backdrop"></div>
  <div class="stroke-modal-box" role="dialog" aria-modal="true" aria-label="Зурвас илгээх">
    <button type="button" class="stroke-modal-close" id="message-modal-close" aria-label="Хаах">✕</button>
    <div class="stroke-modal-head">
      <div class="stroke-modal-word" id="message-modal-to">Зурвас илгээх</div>
    </div>
    <textarea id="message-modal-text" maxlength="300" rows="4" placeholder="Богино зурвасаа бичнэ үү (300 тэмдэгт хүртэл)..." style="width:100%;font:inherit;font-size:.88rem;padding:10px 12px;border-radius:10px;border:1px solid var(--border);background:var(--paper-raised);color:var(--ink);resize:vertical;"></textarea>
    <div class="stroke-modal-actions">
      <button type="button" class="btn-primary" id="message-modal-send">Илгээх</button>
    </div>
    <div id="message-modal-msg" class="pp-msg"></div>
  </div>
</div>
`;
