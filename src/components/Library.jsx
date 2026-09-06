import React from "react";
import { Search} from "lucide-react";
import { categories } from "../utils/actionsUpdate";
import ScriptureCard from "./ScriptureCard";

const Library = ({
  filtered,
  query,
  setQuery,
  category,
  setCategory,
  saved,
  toggleSaved,
  share,
}) => {
  return (
    <section className="container page-section">
      <div className="page-title">
        <span className="eyebrow purple">SCRIPTURE LIBRARY</span>
        <h1>Who God says you are</h1>
        <p>
          Explore passages that speak to your identity, position and life in
          Christ.
        </p>
      </div>
      <div className="library-tools">
        <div className="search-box">
          <Search size={18} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search scriptures, identity, references..."
          />
        </div>
        <div className="chips">
          {categories.map((c) => (
            <button
              key={c}
              className={category === c ? "chip active" : "chip"}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <div className="library-grid">
        {filtered.map((s) => (
          <ScriptureCard
            key={s.id}
            s={s}
            saved={saved}
            toggleSaved={toggleSaved}
            share={share}
          />
        ))}
      </div>
      {!filtered.length && (
        <div className="empty">
          <Search size={28} />
          <h3>No scriptures found</h3>
          <p>Try another search or category.</p>
        </div>
      )}
    </section>
  );
};

export default Library;
