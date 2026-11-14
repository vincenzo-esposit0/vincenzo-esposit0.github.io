// Animazioni con GSAP + ScrollTrigger + SplitText.
// Se GSAP non si carica, script.js usa il vecchio IntersectionObserver.
(() => {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger, SplitText);
  document.documentElement.classList.add('gsap-on');

  const mm = gsap.matchMedia();
  const ease = 'power3.out';

  // Scroll fluido con Lenis, sincronizzato con il ticker di GSAP.
  // Solo con mouse/trackpad: su touch resta lo scroll nativo del telefono.
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    if (!window.Lenis) return;
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    window.lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const raf = time => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Link interni (#sezione): scorrimento fluido rispettando l'altezza della navbar
    const onAnchor = e => {
      const a = e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
      const id = a.getAttribute('href');
      const target = id === '#top' || id === '#' ? 0 : document.querySelector(id);
      if (target === null) return;
      e.preventDefault();
      const pad = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      lenis.scrollTo(target, { offset: target === 0 ? 0 : -pad, duration: 1.2 });
      history.pushState(null, '', id);
    };
    document.addEventListener('click', onAnchor);

    return () => {
      document.removeEventListener('click', onAnchor);
      gsap.ticker.remove(raf);
      lenis.destroy();
      window.lenis = null;
    };
  });

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    // Elementi animati in modo dedicato, esclusi dal reveal generico
    const hero = document.querySelector('.hero');
    const heroTitle = hero.querySelector('.hero-title');
    const heroRest = hero.querySelectorAll('.hero-sub, .hero-cta');
    const portrait = hero.querySelector('.hero-portrait');
    const secTitles = document.querySelectorAll('.sec-title');
    const special = new Set([heroTitle, ...heroRest, portrait, ...secTitles]);

    // Toglie la classe .reveal (transizione CSS) e lascia il controllo a GSAP
    const take = el => {
      el.classList.remove('reveal');
      el.style.transition = 'none';
    };
    const release = el => gsap.set(el, { clearProps: 'transform,opacity,filter,transition' });
    special.forEach(take);

    // 1. Hero: titolo che sale riga per riga da una maschera, poi il resto
    const heroSplit = SplitText.create(heroTitle, { type: 'lines', mask: 'lines', linesClass: 'gs-line' });
    gsap.timeline({ defaults: { ease } })
      .from(heroSplit.lines, { yPercent: 110, duration: 0.75, stagger: 0.08 })
      .from(heroRest, { y: 20, opacity: 0, duration: 0.55, stagger: 0.06 }, '-=0.5')
      .from(portrait, { scale: 0.88, opacity: 0, filter: 'blur(10px)', duration: 0.8, ease: 'expo.out' }, '-=0.45')
      .add(() => { heroRest.forEach(release); heroSplit.revert(); });

    // 2. Hero: allo scroll il ritratto sale e si rimpicciolisce, il titolo sfuma
    gsap.to(portrait, {
      yPercent: -18, scale: 0.9, ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.6 },
    });
    gsap.to(heroTitle, {
      y: -60, opacity: 0.15, ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.6 },
    });

    // Comparse guidate da IntersectionObserver: reagisce subito (anche quando il browser
    // ripristina la posizione di scroll al ricaricamento) senza aspettare il load della pagina.
    // Quello che è già sullo schermo all'avvio non viene mai nascosto.
    const pending = new Map();           // elemento -> funzione che lo mostra (instant, delay)
    const vh = innerHeight;
    const status = el => { const r = el.getBoundingClientRect(); return r.top >= vh ? 'below' : r.bottom <= 0 ? 'above' : 'visible'; };
    const io = new IntersectionObserver(entries => {
      let i = 0;
      entries.forEach(e => {
        const show = pending.get(e.target);
        if (!show) return;
        if (e.isIntersecting) show(false, Math.min(i++ * 0.05, 0.25));
        else if (e.boundingClientRect.bottom <= 0) show(true, 0);   // già superato con un salto: subito visibile
        else return;
        pending.delete(e.target);
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -5% 0px' });

    // 3. Titoli di sezione: lettere che salgono in cascata
    const titleSplits = [];
    secTitles.forEach(title => {
      if (status(title) !== 'below') return;          // già visibile: resta com'è
      const split = SplitText.create(title, { type: 'chars', mask: 'chars' });
      titleSplits.push([title, split]);
      gsap.set(split.chars, { yPercent: 105 });
      // Se nel frattempo è cambiata lingua il testo è già stato sostituito
      const done = () => { if (split.chars[0]?.isConnected) split.revert(); };
      pending.set(title, (instant, delay) => instant ? done()
        : gsap.to(split.chars, { yPercent: 0, duration: 0.55, ease, stagger: 0.025, delay, onComplete: done }));
      io.observe(title);
    });
    // Cambio lingua: il testo del titolo viene sostituito, quindi l'etichetta
    // per i lettori di schermo aggiunta da SplitText (nella lingua precedente) va tolta
    const dropStaleLabels = () => titleSplits.forEach(([title, split]) => {
      if (!split.chars[0]?.isConnected) title.removeAttribute('aria-label');
    });
    const langButtons = document.querySelectorAll('.lang-switch button');
    langButtons.forEach(b => b.addEventListener('click', dropStaleLabels));

    // 4. Testo "fantasma" dietro i titoli: scorre in orizzontale con lo scroll
    document.querySelectorAll('.sec-ghost').forEach(ghost => {
      const dir = ghost.closest('.sec-left') ? 1 : -1;
      gsap.fromTo(ghost, { x: -60 * dir }, {
        x: 60 * dir, ease: 'none',
        scrollTrigger: { trigger: ghost.closest('.sec-head'), start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });

    // 5. Comparse generiche: brevi, con una piccola cascata tra elementi vicini
    const items = [...document.querySelectorAll('.reveal')].filter(el => !special.has(el));
    items.forEach(el => {
      take(el);
      if (status(el) !== 'below') { release(el); return; }   // già sullo schermo o sopra: nessuna attesa
      gsap.set(el, { opacity: 0, y: 24 });
      pending.set(el, (instant, delay) => instant ? release(el)
        : gsap.to(el, { opacity: 1, y: 0, duration: 0.55, ease, delay, overwrite: true, onComplete: () => release(el) }));
      io.observe(el);
    });

    return () => {
      io.disconnect();
      heroSplit.revert();
      langButtons.forEach(b => b.removeEventListener('click', dropStaleLabels));
    };
  });

  // Movimento ridotto: tutto visibile subito
  mm.add('(prefers-reduced-motion: reduce)', () => {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  });

  // Le sezioni con altezza calcolata (Flipper, contatti) cambiano dopo il load
  addEventListener('load', () => ScrollTrigger.refresh());
})();
