// ============================================================
// ERDENE.K — interactions
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    initTicker();
    initReveal();
    initScrollSpy();
    initMobileNav();
    initClock();
    initGlitch();
});

// Fire a short glitch burst on .glitch elements at random intervals
function initGlitch() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const targets = document.querySelectorAll('.glitch');
    if (!targets.length) return;

    const burst = () => {
        targets.forEach(el => {
            el.classList.add('glitching');
            setTimeout(() => el.classList.remove('glitching'), 340);
        });
        setTimeout(burst, 2500 + Math.random() * 4500);
    };

    setTimeout(burst, 1800);
}

// Duplicate the ticker group so the loop is seamless
function initTicker() {
    const track = document.getElementById('tickerTrack');
    if (!track) return;
    track.appendChild(track.firstElementChild.cloneNode(true));
}

// Scroll-triggered reveals
function initReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Highlight the nav link of the section in view
function initScrollSpy() {
    const links = document.querySelectorAll('.nav-link[data-section]');
    const sections = [...links].map(link =>
        document.getElementById(link.dataset.section)
    ).filter(Boolean);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            links.forEach(link => {
                link.classList.toggle('active', link.dataset.section === entry.target.id);
            });
        });
    }, { rootMargin: '-35% 0px -55% 0px' });

    sections.forEach(section => observer.observe(section));
}

// Mobile drawer
function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    const nav = document.getElementById('siteNav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
    });

    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// Live Ulaanbaatar time (UTC+8) in hero ledger and footer
function initClock() {
    const targets = [
        document.getElementById('localTime'),
        document.getElementById('footerTime'),
    ].filter(Boolean);
    if (!targets.length) return;

    const formatter = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Ulaanbaatar',
    });

    const tick = () => {
        const now = formatter.format(new Date());
        targets.forEach(el => { el.textContent = now; });
    };

    tick();
    setInterval(tick, 30_000);
}
