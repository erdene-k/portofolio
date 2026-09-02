// ============================================================
// Erdene K — interactions
// ============================================================

(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

    document.addEventListener('DOMContentLoaded', () => {
        initHeader();
        initMobileNav();
        initScrollSpy();
        initClock();
        initCopy();
        initCounters();
        initTimeline();
        initFigures();
        initSequence();
        initStackPit();
    });

    // Header gets a hairline once the page has scrolled
    function initHeader() {
        const header = document.getElementById('siteHeader');
        if (!header) return;
        const update = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
        update();
        window.addEventListener('scroll', update, { passive: true });
    }

    // Full-screen menu on small screens
    function initMobileNav() {
        const toggle = document.getElementById('navToggle');
        const nav = document.getElementById('siteNav');
        if (!toggle || !nav) return;

        const setOpen = (open) => {
            nav.classList.toggle('is-open', open);
            document.body.classList.toggle('nav-open', open);
            toggle.setAttribute('aria-expanded', String(open));
            toggle.textContent = open ? 'Close' : 'Menu';
        };

        toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
        nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
        window.matchMedia('(min-width: 720px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });
    }

    // Highlight the nav link for the section in view
    function initScrollSpy() {
        const links = [...document.querySelectorAll('.site-nav a[data-section]')];
        const sections = links.map((l) => document.getElementById(l.dataset.section)).filter(Boolean);
        if (!sections.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                links.forEach((l) => l.classList.toggle('is-active', l.dataset.section === entry.target.id));
            });
        }, { rootMargin: '-35% 0px -55% 0px' });

        sections.forEach((s) => observer.observe(s));
    }

    // Live Ulaanbaatar time, plus whether that is a reasonable hour
    function initClock() {
        const el = document.getElementById('localTime');
        const awake = document.getElementById('awake');
        if (!el) return;
        const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Ulaanbaatar' });
        const hourFmt = new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hourCycle: 'h23', timeZone: 'Asia/Ulaanbaatar' });
        const tick = () => {
            const now = new Date();
            el.textContent = fmt.format(now);
            if (awake) {
                const h = parseInt(hourFmt.format(now), 10);
                awake.textContent = h >= 8 && h < 23 ? 'probably awake' : 'probably asleep, but email still works';
            }
        };
        tick();
        setInterval(tick, 30_000);
    }

    // Copy the email address
    function initCopy() {
        const btn = document.getElementById('copyMail');
        if (!btn) return;
        if (!navigator.clipboard) { btn.hidden = true; return; }
        let timer = 0;
        btn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(btn.dataset.copy);
                btn.textContent = 'Copied';
                btn.classList.add('is-done');
                clearTimeout(timer);
                timer = setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('is-done'); }, 1800);
            } catch (_) {
                btn.textContent = 'Select and copy';
            }
        });
    }

    // Numbers in the profile count up once they scroll into view
    function initCounters() {
        const els = document.querySelectorAll('[data-count]');
        if (!els.length) return;
        const fmt = new Intl.NumberFormat('en-US');
        const run = (el) => {
            const target = parseInt(el.dataset.count, 10);
            if (reduceMotion.matches) { el.textContent = fmt.format(target); return; }
            const dur = 1400;
            const start = performance.now();
            const frame = (now) => {
                const p = clamp((now - start) / dur, 0, 1);
                const eased = 1 - Math.pow(1 - p, 3);
                el.textContent = fmt.format(Math.round(target * eased));
                if (p < 1) requestAnimationFrame(frame);
            };
            requestAnimationFrame(frame);
        };
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
        }, { threshold: 0.6 });
        els.forEach((el) => io.observe(el));
    }

    // Experience timeline fills as you scroll past it
    function initTimeline() {
        const lists = [...document.querySelectorAll('.roles')];
        if (!lists.length || reduceMotion.matches) {
            lists.forEach((ol) => ol.querySelectorAll('.role').forEach((r) => r.classList.add('is-reached')));
            return;
        }
        const update = () => {
            const line = window.innerHeight * 0.62;
            lists.forEach((ol) => {
                const r = ol.getBoundingClientRect();
                ol.style.setProperty('--progress', clamp((line - r.top) / r.height, 0, 1).toFixed(3));
                ol.querySelectorAll('.role').forEach((role) => {
                    role.classList.toggle('is-reached', role.getBoundingClientRect().top + 14 < line);
                });
            });
        };
        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
    }

    // Project figures play once when they come into view, and again on hover
    function initFigures() {
        const figs = document.querySelectorAll('.fig');
        if (!figs.length) return;

        const play = (fig) => {
            fig.classList.remove('is-playing');
            void fig.offsetWidth;
            fig.classList.add('is-playing');
            if (reduceMotion.matches) return;
            fig.querySelectorAll('animateMotion').forEach((a) => {
                const delay = parseFloat(a.dataset.delay || '0');
                try { a.beginElementAt(delay); } catch (_) { /* SMIL unsupported */ }
            });
        };

        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                play(entry.target);
                io.unobserve(entry.target);
            });
        }, { threshold: 0.6 });

        figs.forEach((fig) => {
            io.observe(fig);
            const item = fig.closest('.work') || fig;
            item.addEventListener('mouseenter', () => {
                if (fig.classList.contains('is-playing')) play(fig);
            });
        });
    }

    // ------------------------------------------------------------
    // Hero: a payment, drawn as a sequence diagram, in three moods
    // ------------------------------------------------------------
    function initSequence() {
        const host = document.getElementById('seq');
        if (!host) return;
        const caption = document.getElementById('seqCaption');
        const replayBtn = document.getElementById('seqReplay');
        const scnBtns = [...document.querySelectorAll('.seq-scn')];
        const NS = 'http://www.w3.org/2000/svg';

        const LANES = [
            { id: 'app', label: 'Customer app', short: 'App' },
            { id: 'gw', label: 'Payment gateway', short: 'Gateway' },
            { id: 'bank', label: 'Bank API', short: 'Bank' },
            { id: 'ledger', label: 'Ledger', short: 'Ledger' },
        ];

        // gap: ms after the previous step. kind: req | res | async | fail | final | echo | self
        const SCENARIOS = {
            quiet: {
                outro: 'Every payment takes this path. Idempotent, retried, recorded.',
                acts: [
                    { lane: 'gw', from: 0, to: 7 }, { lane: 'bank', from: 2, to: 6 },
                    { lane: 'gw', from: 8, to: 11 }, { lane: 'ledger', from: 9, to: 10 },
                ],
                steps: [
                    { gap: 0, from: 'app', to: 'gw', kind: 'req', text: 'POST /payments', short: 'POST /payments',
                      say: 'The customer taps Pay. The app asks the gateway for a payment.' },
                    { gap: 900, self: 'gw', kind: 'self', text: 'idempotency check', short: 'idem. check',
                      say: 'New key, new payment. The gateway stores the key so a retry can never charge twice.' },
                    { gap: 900, from: 'gw', to: 'bank', kind: 'req', text: 'transfer.create', short: 'transfer',
                      say: 'It asks the bank to move the money.' },
                    { gap: 800, wait: 'gw', say: 'And waits.' },
                    { gap: 1200, from: 'bank', to: 'gw', kind: 'fail', text: 'timeout after 3s', short: 'timeout',
                      say: 'Nothing. The bank does not answer in time.' },
                    { gap: 900, from: 'gw', to: 'bank', kind: 'req', text: 'retry, same key', short: 'retry',
                      say: 'Same request, same key, so it is safe to try again.' },
                    { gap: 900, from: 'bank', to: 'gw', kind: 'res', text: '202 Accepted', short: '202',
                      say: 'The bank accepts the transfer.' },
                    { gap: 800, from: 'gw', to: 'app', kind: 'res', text: '201 Created, pending', short: '201 pending',
                      say: 'The app hears back in under a second. Status: pending.' },
                    { gap: 1400, from: 'bank', to: 'gw', kind: 'async', text: 'webhook: settled', short: 'settled',
                      say: 'A moment later the bank confirms the money moved.' },
                    { gap: 800, from: 'gw', to: 'ledger', kind: 'req', text: 'post journal entry', short: 'journal',
                      say: 'Both sides of the transaction go into the ledger.' },
                    { gap: 800, from: 'ledger', to: 'gw', kind: 'res', text: 'balanced', short: 'ok',
                      say: 'Debits equal credits. The ledger balances.' },
                    { gap: 800, from: 'gw', to: 'app', kind: 'final', text: 'payment settled', short: 'settled',
                      say: 'The customer sees "Payment settled". They never knew about the retry.' },
                ],
            },
            double: {
                outro: 'Double taps happen every day. Idempotency keys make them boring.',
                acts: [
                    { lane: 'gw', from: 0, to: 7 }, { lane: 'bank', from: 2, to: 5 },
                    { lane: 'gw', from: 8, to: 11 }, { lane: 'ledger', from: 9, to: 10 },
                ],
                steps: [
                    { gap: 0, from: 'app', to: 'gw', kind: 'req', text: 'POST /payments', short: 'POST /payments',
                      say: 'The customer taps Pay.' },
                    { gap: 900, self: 'gw', kind: 'self', text: 'idempotency check', short: 'idem. check',
                      say: 'New key. The gateway stores it and gets to work.' },
                    { gap: 900, from: 'gw', to: 'bank', kind: 'req', text: 'transfer.create', short: 'transfer',
                      say: 'It asks the bank to move the money.' },
                    { gap: 1000, from: 'app', to: 'gw', kind: 'req', text: 'POST again, same key', short: 'POST again',
                      say: 'The network feels slow. The customer taps Pay again. Same key.' },
                    { gap: 900, self: 'gw', kind: 'self', text: 'seen this key', short: 'seen it',
                      say: 'The gateway has seen this key. No second transfer goes out.' },
                    { gap: 900, from: 'bank', to: 'gw', kind: 'res', text: '202 Accepted', short: '202',
                      say: 'The bank accepts the one and only transfer.' },
                    { gap: 800, from: 'gw', to: 'app', kind: 'res', text: '201 Created, pending', short: '201 pending',
                      say: 'The first tap gets its answer.' },
                    { gap: 700, from: 'gw', to: 'app', kind: 'echo', text: '201, same payment', short: 'same 201',
                      say: 'The second tap gets the same answer. One payment, one charge.' },
                    { gap: 1400, from: 'bank', to: 'gw', kind: 'async', text: 'webhook: settled', short: 'settled',
                      say: 'The bank confirms the money moved.' },
                    { gap: 800, from: 'gw', to: 'ledger', kind: 'req', text: 'post journal entry', short: 'journal',
                      say: 'Both sides recorded, once.' },
                    { gap: 800, from: 'ledger', to: 'gw', kind: 'res', text: 'balanced', short: 'ok',
                      say: 'The ledger balances.' },
                    { gap: 800, from: 'gw', to: 'app', kind: 'final', text: 'payment settled', short: 'settled',
                      say: 'Tap it five times if you like. Still one charge.' },
                ],
            },
            happy: {
                outro: 'Most payments look like this. The job is the ones that do not.',
                acts: [
                    { lane: 'gw', from: 0, to: 4 }, { lane: 'bank', from: 2, to: 3 },
                    { lane: 'gw', from: 5, to: 8 }, { lane: 'ledger', from: 6, to: 7 },
                ],
                steps: [
                    { gap: 0, from: 'app', to: 'gw', kind: 'req', text: 'POST /payments', short: 'POST /payments',
                      say: 'The customer taps Pay.' },
                    { gap: 900, self: 'gw', kind: 'self', text: 'idempotency check', short: 'idem. check',
                      say: 'New key, new payment.' },
                    { gap: 900, from: 'gw', to: 'bank', kind: 'req', text: 'transfer.create', short: 'transfer',
                      say: 'The bank is asked to move the money.' },
                    { gap: 900, from: 'bank', to: 'gw', kind: 'res', text: '202 Accepted', short: '202',
                      say: 'Accepted on the first try.' },
                    { gap: 800, from: 'gw', to: 'app', kind: 'res', text: '201 Created, pending', short: '201 pending',
                      say: 'The app hears back in under a second.' },
                    { gap: 1400, from: 'bank', to: 'gw', kind: 'async', text: 'webhook: settled', short: 'settled',
                      say: 'The bank confirms the money moved.' },
                    { gap: 800, from: 'gw', to: 'ledger', kind: 'req', text: 'post journal entry', short: 'journal',
                      say: 'Both sides go into the ledger.' },
                    { gap: 800, from: 'ledger', to: 'gw', kind: 'res', text: 'balanced', short: 'ok',
                      say: 'Debits equal credits.' },
                    { gap: 800, from: 'gw', to: 'app', kind: 'final', text: 'payment settled', short: 'settled',
                      say: 'Settled. Nobody noticed, which is the point.' },
                ],
            },
        };

        // Turn gaps into absolute times
        Object.values(SCENARIOS).forEach((sc) => {
            let t = 0;
            sc.steps.forEach((s) => { t += s.gap; s.at = t; });
        });

        const INTRO = 'A payment, from tap to ledger.';
        const STATIC = 'A payment, from tap to ledger: request, retry, settlement, journal entry.';
        const START_DELAY = 800;
        const HOLD = 3800;
        const FADE = 700;

        let scenario = SCENARIOS.quiet;
        let svg = null;
        let msgs = [];
        let acts = [];
        let rows = [];
        let heads = [];
        let width = 0;

        let t = 0;
        let last = null;
        let idx = 0;
        let phase = 'run';
        let until = 0;
        let inView = true;
        let raf = 0;
        let outroTimer = 0;

        const el = (name, attrs = {}, text) => {
            const n = document.createElementNS(NS, name);
            for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
            if (text != null) n.textContent = text;
            return n;
        };

        // Row positions for a list of steps; the diagram height is the tallest scenario
        function layout(steps, y0, rowH) {
            const out = [];
            let y = y0;
            steps.forEach((s) => {
                out.push(y);
                if (!s.wait) y += s.self ? rowH + 12 : rowH;
            });
            return { rows: out, end: y };
        }

        function build() {
            const W = Math.max(280, host.clientWidth);
            width = W;
            const narrow = W < 560;
            const rowH = narrow ? 38 : 40;
            const pad = narrow ? 30 : Math.max(40, Math.min(96, Math.round(W * 0.07)));
            const headY = 4;
            const headH = 30;
            const y0 = headY + headH + 36;

            const X = LANES.map((_, i) => Math.round(pad + (i * (W - 2 * pad)) / (LANES.length - 1)));
            const laneX = Object.fromEntries(LANES.map((l, i) => [l.id, X[i]]));

            rows = layout(scenario.steps, y0, rowH).rows;
            const H = Math.max(...Object.values(SCENARIOS).map((sc) => layout(sc.steps, y0, rowH).end)) + 2;

            host.replaceChildren();
            svg = el('svg', { class: `seq-svg${narrow ? ' is-narrow' : ''}`, width: W, height: H, viewBox: `0 0 ${W} ${H}` });
            svg.style.height = `${H}px`;
            host.append(svg);

            LANES.forEach((l) => {
                svg.append(el('line', { class: 'lifeline', x1: laneX[l.id], y1: headY + headH, x2: laneX[l.id], y2: H }));
            });

            acts = scenario.acts.map((a) => {
                const top = rows[a.from] - 8;
                const full = rows[a.to] - rows[a.from] + 16;
                const node = el('rect', { class: 'act', x: laneX[a.lane] - 4, y: top, width: 8, height: full, rx: 1.5 });
                svg.append(node);
                return { ...a, node, full };
            });

            heads = LANES.map((l) => {
                const g = el('g', { class: 'lane', 'data-lane': l.id });
                const rect = el('rect', { y: headY, height: headH, rx: 6 });
                const text = el('text', {
                    x: laneX[l.id], y: headY + headH / 2 + 0.5,
                    'text-anchor': 'middle', 'dominant-baseline': 'central',
                }, narrow ? l.short : l.label);
                g.append(rect, text);
                svg.append(g);
                g.addEventListener('mouseenter', () => focusLane(l.id));
                g.addEventListener('mouseleave', () => focusLane(null));
                return { rect, text, x: laneX[l.id] };
            });
            sizeHeads();

            msgs = scenario.steps.map((s, i) => {
                const yy = rows[i];

                if (s.wait) {
                    const x = laneX[s.wait];
                    const g = el('g', { class: 'wait' });
                    [0, 1, 2].forEach((k) => g.append(el('circle', { cx: x + 14 + k * 8, cy: yy, r: 1.8, style: `--k:${k}` })));
                    svg.append(g);
                    return g;
                }

                const g = el('g', { class: `msg ${s.kind}` });
                const shape = el('g', { class: 'msg-shape' });
                let label;

                if (s.self) {
                    const x = laneX[s.self];
                    g.dataset.lanes = s.self;
                    g.classList.add('ltr');
                    shape.append(el('path', { d: `M${x} ${yy} h26 v12 h-17` }));
                    shape.append(el('polygon', { points: `${x},${yy + 12} ${x + 8},${yy + 8} ${x + 8},${yy + 16}` }));
                    label = el('text', { class: 'msg-label', x: x + 34, y: yy + 10, 'text-anchor': 'start' }, narrow ? s.short : s.text);
                } else {
                    const x1 = laneX[s.from];
                    const x2 = laneX[s.to];
                    const dir = x2 > x1 ? 1 : -1;
                    const base = x2 - dir * 9;
                    g.dataset.lanes = `${s.from} ${s.to}`;
                    g.classList.add(dir > 0 ? 'ltr' : 'rtl');
                    shape.append(el('line', { x1, y1: yy, x2: base, y2: yy }));

                    if (s.kind === 'fail') {
                        const m = 4.5;
                        const cx = x2 - dir * 4.5;
                        shape.append(el('path', { d: `M${cx - m} ${yy - m} L${cx + m} ${yy + m} M${cx - m} ${yy + m} L${cx + m} ${yy - m}` }));
                    } else if (s.kind === 'req' || s.kind === 'final') {
                        shape.append(el('polygon', { points: `${x2},${yy} ${base},${yy - 4} ${base},${yy + 4}` }));
                    } else {
                        shape.append(el('path', { d: `M${base} ${yy - 4} L${x2} ${yy} L${base} ${yy + 4}` }));
                    }
                    label = el('text', { class: 'msg-label', x: (x1 + x2) / 2, y: yy - 9, 'text-anchor': 'middle' }, narrow ? s.short : s.text);
                }

                g.append(shape, label);
                svg.append(g);
                return g;
            });
        }

        function sizeHeads() {
            heads.forEach(({ rect, text, x }) => {
                const w = Math.ceil(text.getComputedTextLength()) + 26;
                rect.setAttribute('x', x - w / 2);
                rect.setAttribute('width', w);
            });
        }

        function focusLane(id) {
            msgs.forEach((m) => {
                if (!m.classList.contains('msg')) return;
                m.classList.toggle('is-dim', !!id && !m.dataset.lanes.split(' ').includes(id));
            });
            acts.forEach((a) => a.node.classList.toggle('is-dim', !!id && a.lane !== id));
        }

        function setCaption(text) {
            if (!caption) return;
            caption.classList.remove('is-in');
            caption.textContent = text;
            void caption.offsetWidth;
            caption.classList.add('is-in');
        }

        function updateActs(i) {
            acts.forEach((a) => {
                if (i < a.from) return;
                const upto = Math.min(i, a.to);
                const h = rows[upto] - rows[a.from] + (upto === a.to ? 16 : 8);
                a.node.style.transform = `scaleY(${h / a.full})`;
            });
        }

        function fire(i) {
            const s = scenario.steps[i];
            for (let k = 0; k < i; k++) {
                const m = msgs[k];
                if (m.classList.contains('msg')) m.classList.add('is-past');
                else m.classList.add('is-done');
            }
            msgs[i].classList.add('is-on');
            updateActs(i);
            setCaption(s.say);
        }

        function reset(startAt = -START_DELAY) {
            if (!svg) return;
            clearTimeout(outroTimer);
            svg.classList.add('no-anim');
            svg.classList.remove('is-fading');
            msgs.forEach((m) => m.classList.remove('is-on', 'is-past', 'is-done'));
            acts.forEach((a) => { a.node.style.transform = 'scaleY(0)'; });
            void svg.getBoundingClientRect();
            svg.classList.remove('no-anim');
            t = startAt;
            idx = 0;
            phase = 'run';
            setCaption(INTRO);
        }

        function renderStatic() {
            svg.classList.add('is-static');
            msgs.forEach((m) => {
                if (m.classList.contains('msg')) m.classList.add('is-on', 'is-past');
                else m.classList.add('is-done');
            });
            acts.forEach((a) => { a.node.style.transform = 'scaleY(1)'; });
            setCaption(STATIC);
            if (replayBtn) replayBtn.hidden = true;
        }

        function frame(ts) {
            raf = requestAnimationFrame(frame);
            if (last == null) { last = ts; return; }
            const dt = Math.min(ts - last, 64);
            last = ts;
            if (!inView || document.hidden) return;
            t += dt;

            const steps = scenario.steps;
            if (phase === 'run') {
                while (idx < steps.length && steps[idx].at <= t) fire(idx++);
                if (idx >= steps.length) {
                    phase = 'hold';
                    until = t + HOLD;
                    const outro = scenario.outro;
                    outroTimer = setTimeout(() => { if (phase === 'hold') setCaption(outro); }, 1600);
                }
            } else if (phase === 'hold') {
                if (t >= until) {
                    phase = 'fade';
                    until = t + FADE;
                    svg.classList.add('is-fading');
                }
            } else if (phase === 'fade') {
                if (t >= until) reset();
            }
        }

        function start(startAt) {
            build();
            if (reduceMotion.matches) {
                renderStatic();
                return;
            }
            reset(startAt);
            if (!raf) raf = requestAnimationFrame(frame);
        }

        start();

        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(sizeHeads);
        }

        if (replayBtn) replayBtn.addEventListener('click', () => reset(0));

        scnBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                if (!SCENARIOS[btn.dataset.scenario]) return;
                scnBtns.forEach((b) => b.classList.toggle('is-active', b === btn));
                scenario = SCENARIOS[btn.dataset.scenario];
                start(0);
            });
        });

        new IntersectionObserver((entries) => {
            entries.forEach((e) => { inView = e.isIntersecting; });
        }, { threshold: 0.05 }).observe(host);

        let resizeTimer = 0;
        new ResizeObserver(() => {
            if (Math.abs(host.clientWidth - width) < 2) return;
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => start(), 150);
        }).observe(host);
    }

    // ------------------------------------------------------------
    // Stack: a box of tool chips with a small capsule physics sim.
    // Each chip is a rod between two Verlet particles with a radius.
    // ------------------------------------------------------------
    function initStackPit() {
        const pit = document.getElementById('stackPit');
        if (!pit) return;
        const chips = [...pit.querySelectorAll('.chip')];
        const filters = [...document.querySelectorAll('.filter[data-filter]')];
        const shakeBtn = document.getElementById('stackShake');

        const bodies = chips.map((el) => ({
            el, cat: el.dataset.cat, w: 0, h: 0, r: 0, L: 0,
            ax: 0, ay: 0, bx: 0, by: 0, pax: 0, pay: 0, pbx: 0, pby: 0,
        }));

        const staticMode = reduceMotion.matches || !('PointerEvent' in window) || !('ResizeObserver' in window);

        filters.forEach((btn) => {
            btn.addEventListener('click', () => {
                filters.forEach((b) => b.classList.toggle('is-active', b === btn));
                pit.dataset.filter = btn.dataset.filter;
                if (!staticMode) hop((b) => btn.dataset.filter === 'all' || b.cat === btn.dataset.filter, 9);
            });
        });

        if (staticMode) {
            pit.classList.add('is-static');
            if (shakeBtn) shakeBtn.hidden = true;
            return;
        }

        let W = 0;
        let H = 0;
        let raf = 0;
        let inView = false;
        let started = false;
        let drag = null;

        const G = 2600;
        const DT = 1 / 120;
        const SUBSTEPS = 2;
        const ITER = 4;
        const VMAX = 22;

        function measure() {
            W = pit.clientWidth;
            H = pit.clientHeight;
            bodies.forEach((b) => {
                b.w = b.el.offsetWidth;
                b.h = b.el.offsetHeight;
                b.r = b.h / 2;
                b.L = Math.max(0, b.w - b.h);
            });
        }

        function place(b, cx, cy, angle) {
            const hx = Math.cos(angle) * b.L / 2;
            const hy = Math.sin(angle) * b.L / 2;
            b.ax = b.pax = cx - hx; b.ay = b.pay = cy - hy;
            b.bx = b.pbx = cx + hx; b.by = b.pby = cy + hy;
        }

        // Scatter the chips above the box so they rain in
        function drop() {
            measure();
            const order = bodies.slice().sort(() => Math.random() - 0.5);
            order.forEach((b, i) => {
                const cx = b.w / 2 + 10 + Math.random() * Math.max(1, W - b.w - 20);
                const cy = -b.h - 30 - i * 44;
                place(b, cx, cy, (Math.random() - 0.5) * 0.5);
            });
        }

        function kick(b, vx, vy) {
            b.pax = b.ax - vx; b.pay = b.ay - vy;
            b.pbx = b.bx - vx; b.pby = b.by - vy;
        }

        function hop(match, power) {
            bodies.forEach((b) => {
                if (!match(b)) return;
                kick(b, (Math.random() - 0.5) * 3, -(power * 0.6 + Math.random() * power * 0.6));
            });
            wake();
        }

        function integrate() {
            const gy = G * DT * DT;
            for (const b of bodies) {
                for (const k of ['a', 'b']) {
                    const x = k + 'x', y = k + 'y', px = 'p' + x, py = 'p' + y;
                    let vx = (b[x] - b[px]) * 0.996;
                    let vy = (b[y] - b[py]) * 0.996;
                    const sp = Math.hypot(vx, vy);
                    if (sp > VMAX) { vx *= VMAX / sp; vy *= VMAX / sp; }
                    b[px] = b[x]; b[py] = b[y];
                    b[x] += vx; b[y] += vy + gy;
                }
            }
        }

        function bound(b, k) {
            const x = k + 'x', y = k + 'y', px = 'p' + x;
            const r = b.r;
            if (b[x] < r) b[x] = r; else if (b[x] > W - r) b[x] = W - r;
            if (b[y] > H - r) {
                b[y] = H - r;
                b[px] = b[x] - (b[x] - b[px]) * 0.75; // floor friction
            } else if (b[y] < -3000) b[y] = -3000;
        }

        function collide(A, B) {
            const p1x = A.ax, p1y = A.ay, p2x = B.ax, p2y = B.ay;
            const d1x = A.bx - p1x, d1y = A.by - p1y, d2x = B.bx - p2x, d2y = B.by - p2y;
            const rx = p1x - p2x, ry = p1y - p2y;
            const a = d1x * d1x + d1y * d1y, e = d2x * d2x + d2y * d2y, f = d2x * rx + d2y * ry;
            const EPS = 1e-6;
            let s, t;
            if (a <= EPS && e <= EPS) { s = 0; t = 0; }
            else if (a <= EPS) { s = 0; t = clamp(f / e, 0, 1); }
            else {
                const c = d1x * rx + d1y * ry;
                if (e <= EPS) { t = 0; s = clamp(-c / a, 0, 1); }
                else {
                    const bb = d1x * d2x + d1y * d2y;
                    const denom = a * e - bb * bb;
                    s = denom !== 0 ? clamp((bb * f - c * e) / denom, 0, 1) : 0;
                    t = (bb * s + f) / e;
                    if (t < 0) { t = 0; s = clamp(-c / a, 0, 1); }
                    else if (t > 1) { t = 1; s = clamp((bb - c) / a, 0, 1); }
                }
            }
            const c1x = p1x + d1x * s, c1y = p1y + d1y * s;
            const c2x = p2x + d2x * t, c2y = p2y + d2y * t;
            let nx = c2x - c1x, ny = c2y - c1y;
            let dist = Math.hypot(nx, ny);
            const minD = A.r + B.r;
            if (dist >= minD) return;
            if (dist < EPS) { nx = 0; ny = -1; dist = EPS; } else { nx /= dist; ny /= dist; }
            const pen = (minD - dist) * 0.5;
            const kA = 1 / ((1 - s) * (1 - s) + s * s);
            const kB = 1 / ((1 - t) * (1 - t) + t * t);
            A.ax -= nx * pen * (1 - s) * kA; A.ay -= ny * pen * (1 - s) * kA;
            A.bx -= nx * pen * s * kA;       A.by -= ny * pen * s * kA;
            B.ax += nx * pen * (1 - t) * kB; B.ay += ny * pen * (1 - t) * kB;
            B.bx += nx * pen * t * kB;       B.by += ny * pen * t * kB;
        }

        function constrain() {
            if (drag) {
                const { b, s, x, y } = drag;
                const cx = b.ax + (b.bx - b.ax) * s, cy = b.ay + (b.by - b.ay) * s;
                const dx = x - cx, dy = y - cy;
                const k = 0.55 / ((1 - s) * (1 - s) + s * s);
                b.ax += dx * (1 - s) * k; b.ay += dy * (1 - s) * k;
                b.bx += dx * s * k;       b.by += dy * s * k;
            }
            for (const b of bodies) {
                const dx = b.bx - b.ax, dy = b.by - b.ay;
                const d = Math.hypot(dx, dy) || 1e-6;
                const diff = ((d - b.L) / d) * 0.5;
                b.ax += dx * diff; b.ay += dy * diff;
                b.bx -= dx * diff; b.by -= dy * diff;
                bound(b, 'a'); bound(b, 'b');
            }
            for (let i = 0; i < bodies.length; i++) {
                for (let j = i + 1; j < bodies.length; j++) collide(bodies[i], bodies[j]);
            }
        }

        function render() {
            for (const b of bodies) {
                let ang = b.L > 0 ? Math.atan2(b.by - b.ay, b.bx - b.ax) : 0;
                if (ang > Math.PI / 2 || ang < -Math.PI / 2) {
                    // keep the label upright: the capsule is symmetric, so swap its ends
                    [b.ax, b.bx] = [b.bx, b.ax]; [b.ay, b.by] = [b.by, b.ay];
                    [b.pax, b.pbx] = [b.pbx, b.pax]; [b.pay, b.pby] = [b.pby, b.pay];
                    if (drag && drag.b === b) drag.s = 1 - drag.s;
                    ang = Math.atan2(b.by - b.ay, b.bx - b.ax);
                }
                const cx = (b.ax + b.bx) / 2, cy = (b.ay + b.by) / 2;
                b.el.style.transform = `translate(${(cx - b.w / 2).toFixed(2)}px, ${(cy - b.h / 2).toFixed(2)}px) rotate(${ang.toFixed(4)}rad)`;
            }
        }

        function loop() {
            if (!inView || document.hidden) { raf = 0; return; }
            raf = requestAnimationFrame(loop);
            for (let s = 0; s < SUBSTEPS; s++) {
                integrate();
                for (let i = 0; i < ITER; i++) constrain();
            }
            render();
        }

        function wake() {
            if (!raf && started) raf = requestAnimationFrame(loop);
        }

        function begin() {
            started = true;
            drop();
            pit.classList.add('is-live');
            wake();
        }

        // Dragging: hold a point on the rod, the chip swings around it
        const local = (e) => {
            const r = pit.getBoundingClientRect();
            return { x: e.clientX - r.left, y: e.clientY - r.top };
        };

        pit.addEventListener('pointerdown', (e) => {
            const chipEl = e.target.closest('.chip');
            if (!chipEl) return;
            const b = bodies.find((x) => x.el === chipEl);
            const { x, y } = local(e);
            const dx = b.bx - b.ax, dy = b.by - b.ay;
            const L2 = dx * dx + dy * dy;
            const s = L2 > 0 ? clamp(((x - b.ax) * dx + (y - b.ay) * dy) / L2, 0, 1) : 0.5;
            drag = { b, s, x, y };
            chipEl.classList.add('is-held');
            pit.classList.add('is-touched');
            pit.setPointerCapture(e.pointerId);
            e.preventDefault();
            wake();
        });

        pit.addEventListener('pointermove', (e) => {
            if (!drag) return;
            const { x, y } = local(e);
            drag.x = x; drag.y = y;
        });

        const release = () => {
            if (!drag) return;
            drag.b.el.classList.remove('is-held');
            drag = null;
        };
        pit.addEventListener('pointerup', release);
        pit.addEventListener('pointercancel', release);
        pit.addEventListener('lostpointercapture', release);

        if (shakeBtn) {
            shakeBtn.addEventListener('click', () => {
                pit.classList.add('is-touched');
                hop(() => true, 16);
            });
        }

        new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                inView = e.isIntersecting;
                if (inView && !started) begin();
                else if (inView) wake();
            });
        }, { threshold: 0.2 }).observe(pit);

        document.addEventListener('visibilitychange', () => { if (!document.hidden) wake(); });

        let resizeTimer = 0;
        new ResizeObserver(() => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => { if (started) { measure(); wake(); } }, 120);
        }).observe(pit);
    }
})();
