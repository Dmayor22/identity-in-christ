import React, { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  Check,
  ChevronRight,
  Clock3,
  Copy,
  Heart,
  Home,
  Menu,
  Moon,
  Share2,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import "./app.css";
import { scriptures } from "./data";

import Library from "./components/Library";
import Saved from "./components/Saved";
import About from "./components/About";
import {
  categories,
  getTimeUntilMidnight,
  dailyIndex,
} from "./utils/actionsUpdate";

const App = () => {
  const [view, setView] = useState("today");
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState(() =>
    JSON.parse(localStorage.getItem("identity-saved") || "[]"),
  );
  const [dark, setDark] = useState(
    () => localStorage.getItem("identity-dark") === "true",
  );
  const [toast, setToast] = useState("");
  const [remaining, setRemaining] = useState(getTimeUntilMidnight());
  const [menu, setMenu] = useState(false);

  const today = scriptures[dailyIndex()];

  useEffect(
    () => localStorage.setItem("identity-saved", JSON.stringify(saved)),
    [saved],
  );
  useEffect(() => {
    localStorage.setItem("identity-dark", String(dark));
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const timer = setInterval(() => setRemaining(getTimeUntilMidnight()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const toggleSaved = (id) =>
    setSaved((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const filtered = useMemo(
    () =>
      scriptures.filter((s) => {
        const catOk = category === "All" || s.category === category;
        const text =
          `${s.title} ${s.ref} ${s.category} ${s.text}`.toLowerCase();
        return catOk && text.includes(query.toLowerCase());
      }),
    [category, query],
  );

  async function shareScripture(s = today) {
    const text = `✨ ${s.title}\n\n${s.ref}\n“${s.text}”\n\nWho I Am in Christ`;
    if (navigator.share) {
      try {
        await navigator.share({ title: s.title, text });
        return;
      } catch {}
    }
    await navigator.clipboard?.writeText(text);
    setToast("Scripture copied for sharing");
  }

  async function copyScripture(s = today) {
    await navigator.clipboard?.writeText(
      `✨ ${s.title}\n\n${s.ref}\n“${s.text}”`,
    );
    setToast("Copied to clipboard");
  }

  const nav = (v) => {
    setView(v);
    setMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <div className="app-shell">
        <header className="topbar">
          <div className="container nav-inner">
            <button
              className="brand"
              onClick={() => nav("today")}
              aria-label="Identity in Christ home"
            >
              <span className="brand-mark">✝</span>
              <span>
                <strong>Identity</strong> in Christ
              </span>
            </button>
            <nav className={`desktop-nav ${menu ? "open" : ""}`}>
              <button
                className={view === "today" ? "active" : ""}
                onClick={() => nav("today")}
              >
                Today
              </button>
              <button
                className={view === "library" ? "active" : ""}
                onClick={() => nav("library")}
              >
                Scripture Library
              </button>
              <button
                className={view === "saved" ? "active" : ""}
                onClick={() => nav("saved")}
              >
                Saved <span className="nav-count">{saved.length}</span>
              </button>
              <button
                className={view === "about" ? "active" : ""}
                onClick={() => nav("about")}
              >
                About
              </button>
            </nav>
            <div className="nav-actions">
              <button
                className="icon-btn"
                onClick={() => setDark(!dark)}
                aria-label="Toggle theme"
              >
                {dark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                className="menu-btn icon-btn"
                onClick={() => setMenu(!menu)}
                aria-label="Menu"
              >
                {menu ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </header>

        <main>
          {view === "today" && (
            <>
              <section className="hero">
                <div className="hero-glow one" />
                <div className="hero-glow two" />
                <div className="container hero-content">
                  <div className="eyebrow">
                    <span className="pulse-dot" /> DAILY IDENTITY • SCRIPTURE
                  </div>
                  <h1>
                    Know who you are.
                    <br />
                    <em>Live from who He says you are.</em>
                  </h1>
                  <p className="hero-copy">
                    A daily reminder of what God's Word says about you in Christ
                    Jesus.
                  </p>
                  <div className="date-pill">
                    <Clock3 size={15} /> Changes every 24 hours
                  </div>
                </div>
              </section>

              <section className="container daily-wrap">
                <article className="daily-card">
                  <div className="card-top">
                    <span className="label">TODAY'S IDENTITY</span>
                    <span className="category-pill">
                      {today.icon} {today.category}
                    </span>
                  </div>
                  <div className="daily-main">
                    <div className="scripture-number">0{dailyIndex() + 1}</div>
                    <div>
                      <h2>{today.title}</h2>
                      <div className="reference">{today.ref}</div>
                      <blockquote>“{today.text}”</blockquote>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="countdown">
                      <Clock3 size={16} /> New identity in{" "}
                      <strong>{remaining}</strong>
                    </div>
                    <div className="card-actions">
                      <button
                        onClick={() => toggleSaved(today.id)}
                        className={
                          saved.includes(today.id)
                            ? "action-btn saved"
                            : "action-btn"
                        }
                      >
                        <Heart
                          size={17}
                          fill={
                            saved.includes(today.id) ? "currentColor" : "none"
                          }
                        />
                        {saved.includes(today.id) ? "Saved" : "Save"}
                      </button>
                      <button
                        onClick={() => copyScripture(today)}
                        className="action-btn"
                      >
                        <Copy size={17} /> Copy
                      </button>
                      <button
                        onClick={() => shareScripture(today)}
                        className="share-btn"
                      >
                        <Share2 size={17} /> Share
                      </button>
                    </div>
                  </div>
                </article>

                <div className="below-grid">
                  <div className="mini-card">
                    <span className="mini-icon">
                      <BookOpen size={20} />
                    </span>
                    <div>
                      <strong>{scriptures.length}</strong>
                      <span>Identity Scriptures</span>
                    </div>
                  </div>
                  <div className="mini-card">
                    <span className="mini-icon">
                      <Heart size={20} />
                    </span>
                    <div>
                      <strong>{saved.length}</strong>
                      <span>Saved Scriptures</span>
                    </div>
                  </div>
                  <div className="mini-card">
                    <span className="mini-icon">
                      <Sparkles size={20} />
                    </span>
                    <div>
                      <strong>24h</strong>
                      <span>Daily Rotation</span>
                    </div>
                  </div>
                </div>
              </section>

              <section className="container section">
                <div className="section-heading">
                  <div>
                    <span className="eyebrow purple">EXPLORE</span>
                    <h2>Build your identity on Scripture</h2>
                  </div>
                  <button className="text-link" onClick={() => nav("library")}>
                    View all <ChevronRight size={16} />
                  </button>
                </div>
                <div className="category-grid">
                  {categories.slice(1, 7).map((cat) => {
                    const item = scriptures.find((s) => s.category === cat);
                    return (
                      <button
                        key={cat}
                        className="category-card"
                        onClick={() => {
                          setCategory(cat);
                          nav("library");
                        }}
                      >
                        <span>{item?.icon}</span>
                        <strong className="cat_title">{cat}</strong>
                        <small>
                          {scriptures.filter((s) => s.category === cat).length}{" "}
                          scriptures
                        </small>
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="container share-banner">
                <div>
                  <span className="eyebrow">SHARE THE TRUTH</span>
                  <h2>Someone in your circle needs this reminder.</h2>
                  <p>
                    Share today's identity scripture with a friend and help them
                    remember who they are in Christ.
                  </p>
                </div>
                <button
                  className="light-share"
                  onClick={() => shareScripture(today)}
                >
                  <Share2 size={18} /> Share today's Scripture
                </button>
              </section>
            </>
          )}

          {view === "library" && (
            <Library
              filtered={filtered}
              query={query}
              setQuery={setQuery}
              category={category}
              setCategory={setCategory}
              saved={saved}
              toggleSaved={toggleSaved}
              share={shareScripture}
            />
          )}
          {view === "saved" && (
            <Saved
              saved={saved}
              toggleSaved={toggleSaved}
              share={shareScripture}
              nav={nav}
            />
          )}
          {view === "about" && <About />}
        </main>

        <footer>
          <div className="container footer-inner">
            <b>
              <span>© 2026 DEMAYORTECH</span>
            </b>
            <b>
              <span>Scripture • Identity • Grace</span>
            </b>
          </div>
        </footer>
        {toast && (
          <div className="toast">
            <Check size={17} />
            {toast}
          </div>
        )}
      </div>
    </>
  );
};

export default App;