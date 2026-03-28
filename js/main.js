/**
 * YMデザイン企画 / YM Design&Co.
 * main.js — ヘッダー・ハンバーガー・FAQ・スライダー・スクロールアニメーション・Heroキャンバス
 */

(function () {
  'use strict';

  /* ============================================================
     1. Header — スクロールで影付き
     ============================================================ */
  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ============================================================
     2. Hamburger Menu
     ============================================================ */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  if (hamburger && mobileNav) {
    const toggleMenu = (open) => {
      hamburger.classList.toggle('open', open);
      mobileNav.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    };

    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.contains('open');
      toggleMenu(!isOpen);
    });

    // モバイルナビのリンクをクリックで閉じる
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    // 背景クリックで閉じる
    mobileNav.addEventListener('click', (e) => {
      if (e.target === mobileNav) toggleMenu(false);
    });

    // Escape キーで閉じる
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && hamburger.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  }

  /* ============================================================
     3. FAQ Accordion
     ============================================================ */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // 他を閉じる（同一コンテナ内のみ）
      const siblings = item.parentElement.querySelectorAll('.faq-item.open');
      siblings.forEach(sib => {
        if (sib !== item) {
          sib.classList.remove('open');
          sib.querySelector('.faq-answer').classList.remove('open');
          sib.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });

      item.classList.toggle('open', !isOpen);
      answer.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  /* ============================================================
     4. Works Slider（TOPページ）
     ============================================================ */
  const slider = document.getElementById('worksSlider');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  const dotsContainer = document.getElementById('sliderDots');

  if (slider && prevBtn && nextBtn && dotsContainer) {
    const cards = slider.querySelectorAll('.work-card');
    const totalCards = cards.length;
    let currentIndex = 0;

    // ドット生成
    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.classList.add('slider-dot');
      dot.setAttribute('aria-label', `スライド ${i + 1} へ`);
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.slider-dot');

    const getCardWidth = () => {
      if (!cards[0]) return 0;
      return cards[0].offsetWidth + parseInt(getComputedStyle(slider).gap || '24');
    };

    const updateDots = (idx) => {
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    };

    const goTo = (idx) => {
      currentIndex = Math.max(0, Math.min(idx, totalCards - 1));
      slider.scrollTo({ left: getCardWidth() * currentIndex, behavior: 'smooth' });
      updateDots(currentIndex);
    };

    prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
    nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

    // スクロールで現在位置を同期
    let scrollTimer;
    slider.addEventListener('scroll', () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        const w = getCardWidth();
        if (w > 0) {
          const idx = Math.round(slider.scrollLeft / w);
          currentIndex = Math.max(0, Math.min(idx, totalCards - 1));
          updateDots(currentIndex);
        }
      }, 80);
    }, { passive: true });
  }

  /* ============================================================
     5. Scroll Animation (Intersection Observer)
     ============================================================ */
  const animateEls = document.querySelectorAll('.fade-up, .fade-in');
  if (animateEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });
    animateEls.forEach(el => observer.observe(el));
  }

  /* ============================================================
     6. Hero Video — 背景動画の制御
     ============================================================ */
  const heroVideo = document.getElementById('heroVideo');
  if (heroVideo) {

    // prefers-reduced-motion が有効な場合のみ停止、それ以外は必ず再生
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReduced) {
      // muted + playsinline があれば autoplay ポリシーは通常通過する
      // DOM 構築後に明示的に play() を呼ぶことで確実に再生開始
      const playPromise = heroVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // 自動再生が拒否された場合（ユーザー操作なし環境など）
          // → CSS の background-color #0f2340 がそのまま表示される
        });
      }
    }

    // ページが非表示になったら停止 → 再表示で再開
    document.addEventListener('visibilitychange', () => {
      if (!prefersReduced) {
        if (document.hidden) {
          heroVideo.pause();
        } else {
          heroVideo.play().catch(() => {});
        }
      }
    });
  }


  /* ============================================================
     7. Ambient copy position — セクション位置に合わせて英字テキストを配置
     ============================================================ */
  (function positionAmbientCopy() {
    const body = document.querySelector('.home-main__body');
    const upper = document.querySelector('.home-main__ambient-copy--upper');
    const lower = document.querySelector('.home-main__ambient-copy--lower');
    const servicesSec = document.getElementById('services');
    const aboutSec = document.getElementById('about-teaser');

    if (!body || !upper || !lower || !servicesSec || !aboutSec) return;

    function update() {
      const bodyTop = body.getBoundingClientRect().top + window.scrollY;
      const totalH = body.offsetHeight;
      if (totalH === 0) return;

      // upper: #services セクション上部
      const servicesTop = servicesSec.getBoundingClientRect().top + window.scrollY - bodyTop;
      const upperPct = (servicesTop / totalH) * 100;
      upper.style.top = upperPct.toFixed(2) + '%';

      // lower: #about-teaser セクション上部
      const aboutTop = aboutSec.getBoundingClientRect().top + window.scrollY - bodyTop;
      const lowerPct = (aboutTop / totalH) * 100;
      lower.style.top = lowerPct.toFixed(2) + '%';
    }

    // 初期計算（フォント・画像読み込み後に実行）
    if (document.readyState === 'complete') {
      update();
    } else {
      window.addEventListener('load', update, { once: true });
    }

    // リサイズ時に再計算
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(update, 150);
    }, { passive: true });
  })();

  /* ============================================================
     8. Service nav anchor highlight（service.html）
     ============================================================ */
  const serviceAnchors = document.querySelectorAll('[href^="#web"],[href^="#design"],[href^="#instagram"],[href^="#marketing"]');
  if (serviceAnchors.length) {
    const sectionIds = ['web', 'design', 'instagram', 'marketing'];
    const ioService = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          serviceAnchors.forEach(a => {
            const aId = a.getAttribute('href').replace('#', '');
            a.style.borderBottomColor = aId === id ? 'var(--color-primary)' : 'transparent';
            a.style.color = aId === id ? 'var(--color-primary)' : '';
            a.style.fontWeight = aId === id ? '600' : '';
          });
        }
      });
    }, { threshold: 0.35 });

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) ioService.observe(el);
    });
  }

})();
