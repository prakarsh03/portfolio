import { useState, useEffect, useRef } from "react";
import { profile, blogPosts, projects, talks } from "./data/content";
import Page from "./page";
import DailyLogs from "./DailyLogs"; // ← 1. ADDED IMPORT

/* ─── Intersection hook ────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ─── Nav ──────────────────────────────────────────────── */
function Nav({ onLogsClick }) { // ← 2. ACCEPTS onLogsClick PROP
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Writing", "Projects", "Talks", "Contact"];
  return (
    <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <a href="#" className="nav__logo">
        <span className="nav__logo-bracket">&lt;</span>
        {profile.name.split(" ")[0]}
        <span className="nav__logo-bracket">/&gt;</span>
      </a>
      <ul className={`nav__links ${menuOpen ? "nav__links--open" : ""}`}>
        {links.map(l => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
              <span className="nav__link-num">{String(links.indexOf(l) + 1).padStart(2, "0")}.</span>
              {l}
            </a>
          </li>
        ))}
        <li>
          {/* ← 3. REPLACED "Hire me" anchor with Daily Logs button */}
          <button
            onClick={() => { setMenuOpen(false); onLogsClick(); }}
            className="nav__cta"
            style={{ background: "none", cursor: "pointer", fontFamily: "inherit", border: "1px solid rgba(255,255,255,0.14)", borderRadius: "6px", color: "#e2e8f0" }}
          >
            Daily Logs
          </button>
        </li>
      </ul>
      <button
        className={`nav__burger ${menuOpen ? "nav__burger--open" : ""}`}
        onClick={() => setMenuOpen(o => !o)}
        aria-label="Menu"
      >
        <span /><span /><span />
      </button>
    </nav>
  );
}

/* ─── Hero ─────────────────────────────────────────────── */
function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const RING_GAP = 38;
    const BASE_ALPHA = 0.07;
    const GLOW_RADIUS = 20;
    const GLOW_STRENGTH = 0.55;
    const FADE_SPEED = 0.06;

    let W, H, cx, cy, rings = [];
    let mouse = { x: -9999, y: -9999 };

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W * devicePixelRatio;
      canvas.height = H * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
      cx = W * 0.28;
      cy = H / 2;
      const maxR = Math.sqrt(Math.max(cx, W - cx) ** 2 + Math.max(cy, H - cy) ** 2) + RING_GAP;
      rings = [];
      for (let r = RING_GAP; r < maxR; r += RING_GAP) {
        rings.push({ r, glow: 0 });
      }
    };

    const onMove = e => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < 16; i++) {
        const angle = (Math.PI * 2 / 16) * i;
        ctx.strokeStyle = "rgba(61,214,140,0.025)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * W, cy + Math.sin(angle) * W);
        ctx.stroke();
      }

      const mouseDist = Math.sqrt((mouse.x - cx) ** 2 + (mouse.y - cy) ** 2);

      rings.forEach(ring => {
        const distToRing = Math.abs(mouseDist - ring.r);
        const target = distToRing < GLOW_RADIUS
          ? Math.max(0, 1 - distToRing / GLOW_RADIUS)
          : 0;
        ring.glow += (target - ring.glow) * FADE_SPEED;

        if (ring.glow > 0.01) {
          ctx.strokeStyle = `rgba(61,214,140,${ring.glow * 0.18})`;
          ctx.lineWidth = 0.5 + ring.glow * 1.8 + 6;
          ctx.beginPath();
          ctx.arc(cx, cy, ring.r, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.strokeStyle = `rgba(61,214,140,${BASE_ALPHA + ring.glow * GLOW_STRENGTH})`;
        ctx.lineWidth = 0.5 + ring.glow * 1.8;
        ctx.beginPath();
        ctx.arc(cx, cy, ring.r, 0, Math.PI * 2);
        ctx.stroke();
      });

      ctx.fillStyle = "rgba(61,214,140,0.15)";
      ctx.beginPath();
      ctx.arc(cx, cy, 2, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section className="hero" id="hero">
      <canvas ref={canvasRef} className="hero__mesh" aria-hidden="true" />
      <div className="hero__glow hero__glow--1" aria-hidden="true" />
      <div className="hero__glow hero__glow--2" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="hero__badge">
          <span className="hero__badge-dot" />
          Available for interesting conversations
        </div>
        <h1 className="hero__name">
          Hey, I'm{" "}
          <em style={{ paddingBottom: "0.15em", display: "inline-block" }}>
            {profile.name}
          </em>
        </h1>
        <p className="hero__tagline">
          <span className="hero__tagline-cursor">▎</span>
          {profile.tagline}
        </p>
        <div className="hero__bios">
          <p className="hero__bio" dangerouslySetInnerHTML={{ __html: profile.bio }} />
          <p className="hero__bio" dangerouslySetInnerHTML={{ __html: profile.bio2 }} />
        </div>
        <div className="hero__actions">
          <a href="#writing" className="btn-primary">Read my writing ↓</a>
          <a href={`mailto:${profile.email}`} className="btn-ghost">Get in touch</a>
        </div>
        <div className="hero__socials">
          {profile.socials.map(s => (
            <a key={s.label} href={s.url} className="hero__social" target="_blank" rel="noreferrer">
              <span className="hero__social-label">{s.label}</span>
              <span className="hero__social-count">{s.followers}</span>
            </a>
          ))}
        </div>
        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-num">{blogPosts.length}+</span>
            <span className="hero__stat-label">Articles</span>
          </div>
          <div className="hero__stat-div" />
          <div className="hero__stat">
            <span className="hero__stat-num">{projects.length}</span>
            <span className="hero__stat-label">Projects</span>
          </div>
          <div className="hero__stat-div" />
          <div className="hero__stat">
            <span className="hero__stat-num">{talks.length}+</span>
            <span className="hero__stat-label">Talks</span>
          </div>
        </div>
      </div>

      <a href="#writing" className="hero__scroll" aria-label="Scroll down">
        <span className="hero__scroll-line" />
      </a>
    </section>
  );
}

/* ─── Section wrapper ──────────────────────────────────── */
function Section({ id, num, title, children, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <section
      id={id}
      ref={ref}
      className={`section ${visible ? "section--visible" : ""} ${className}`}
    >
      <div className="container">
        <header className="section__head">
          <span className="section__num">{num}</span>
          <h2 className="section__title">{title}</h2>
          <div className="section__line" />
        </header>
        {children}
      </div>
    </section>
  );
}

/* ─── Writing ──────────────────────────────────────────── */
function Writing({ onNavigate }) {
  const [showAll, setShowAll] = useState(false);
  const shown = showAll ? blogPosts : blogPosts.slice(0, 5);

  return (
    <Section id="writing" num="01" title="Writing">
      <p className="section__sub">Things I've written — deep dives, mental models, and lessons from the field.</p>
      <ul className="post-list">
        {shown.map((p, i) => (
          <li key={i} className="post-item" style={{ transitionDelay: `${i * 55}ms` }}>
            <a
              className="post-item__link"
              onClick={(e) => {
                e.preventDefault();
                if (p.content) onNavigate(p.slug);
              }}
              href="#"
              style={{ cursor: "pointer" }}
            >
              <div className="post-item__left">
                <span className="post-item__idx">{String(i + 1).padStart(2, "0")}</span>
                <span className="post-item__title">{p.title}</span>
              </div>
              <div className="post-item__right">
                <span className="post-item__read">{p.readTime}</span>
                <time className="post-item__date">{p.date}</time>
                <span className="post-item__arrow">↗</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
      <button className="btn-text" onClick={() => setShowAll(o => !o)}>
        {showAll ? "← Show less" : `Show all ${blogPosts.length} posts →`}
      </button>
    </Section>
  );
}

/* ─── Projects ─────────────────────────────────────────── */
function Projects() {
  return (
    <Section id="projects" num="02" title="Projects" className="section--alt">
      <p className="section__sub">Open-source tools and side projects I've shipped.</p>
      <div className="projects-grid">
        {projects.map((p, i) => (
          <a
            key={i}
            href={p.url}
            className="project-card"
            style={{ transitionDelay: `${i * 70}ms` }}
          >
            <div className="project-card__head">
              <span className="project-card__folder">⬡</span>
              <div className="project-card__meta">
                {p.status === "active" && <span className="badge badge--green">Active</span>}
                {p.status === "archived" && <span className="badge badge--gray">Archived</span>}
                <span className="project-card__stars">★ {p.stars}</span>
              </div>
            </div>
            <h3 className="project-card__name">{p.name}</h3>
            <p className="project-card__desc">{p.description}</p>
            <div className="project-card__tech">
              {p.tech.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
            <span className="project-card__cta">View project ↗</span>
          </a>
        ))}
      </div>
    </Section>
  );
}

/* ─── Talks ────────────────────────────────────────────── */
function Talks() {
  return (
    <Section id="talks" num="03" title="Talks & Appearances">
      <p className="section__sub">Conferences, meetups, and podcasts where I've shared ideas.</p>
      <div className="talks-list">
        {talks.map((t, i) => (
          <a
            key={i}
            href={t.url}
            className="talk-card"
            style={{ transitionDelay: `${i * 70}ms` }}
          >
            <div className="talk-card__left">
              <span className={`talk-type talk-type--${t.type.toLowerCase()}`}>{t.type}</span>
              <h3 className="talk-card__title">{t.title}</h3>
              <span className="talk-card__event">{t.event} · {t.year}</span>
            </div>
            <span className="talk-card__arrow">↗</span>
          </a>
        ))}
      </div>
    </Section>
  );
}

/* ─── Contact ──────────────────────────────────────────── */
function Contact() {
  return (
    <Section id="contact" num="04" title="Contact" className="section--alt">
      <div className="contact-wrap">
        <div className="contact-text">
          <h3 className="contact-headline">Let's build something together.</h3>
          <p className="contact-body">
            Open to interesting conversations — collaborations, speaking invites,
            consulting, or just geeking out about systems and databases.
          </p>
          <a href={`mailto:${profile.email}`} className="contact-email">
            {profile.email}
            <span className="contact-email-arrow">↗</span>
          </a>
        </div>
        <div className="contact-links">
          {profile.socials.map(s => (
            <a key={s.label} href={s.url} className="contact-link" target="_blank" rel="noreferrer">
              <span>{s.label}</span>
              <span className="contact-link-count">{s.followers} followers</span>
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── Footer ───────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="footer__name">{profile.name}</span>
        <span className="footer__copy">
          Built using Claude and React Framework · © {new Date().getFullYear()}
        </span>
        <div className="footer__socials">
          {profile.socials.map(s => (
            <a key={s.label} href={s.url} target="_blank" rel="noreferrer">{s.label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ─── App ──────────────────────────────────────────────── */
export default function App() {
  const [currentSlug, setCurrentSlug] = useState(null);
  const [showLogs, setShowLogs] = useState(false); // ← 4. ADDED STATE

  // Daily Logs page
  if (showLogs) {
    return <DailyLogs onBack={() => setShowLogs(false)} />;
  }

  // Blog post page
  if (currentSlug) {
    return <Page slug={currentSlug} onBack={() => setCurrentSlug(null)} />;
  }

  // Main portfolio
  return (
    <>
      <Nav onLogsClick={() => setShowLogs(true)} />
      <main>
        <Hero />
        <Writing onNavigate={setCurrentSlug} />
        <Projects />
        <Talks />
        <Contact />
      </main>
      <Footer />
    </>
  );
}