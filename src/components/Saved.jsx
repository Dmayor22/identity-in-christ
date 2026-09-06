import React from "react";
import { scriptures } from "../data";
import { Heart, Share2, Bookmark } from "lucide-react";

const Saved = ({ saved, toggleSaved, share, nav }) => {
  const list = scriptures.filter((s) => saved.includes(s.id));
  return (
    <section className="container page-section">
      <div className="page-title">
        <span className="eyebrow purple">YOUR COLLECTION</span>
        <h1>Saved Scriptures</h1>
        <p>Keep the truths you want to return to close at hand.</p>
      </div>
      {!list.length ? (
        <div className="empty">
          <Heart size={34} />
          <h3>Your collection is empty</h3>
          <p>Save an identity scripture and it will appear here.</p>
          <button className="primary-btn" onClick={() => nav("library")}>
            Explore Scripture Library
          </button>
        </div>
      ) : (
        <div className="library-grid">
          {list.map((s) => (
            <ScriptureCard
              key={s.id}
              s={s}
              saved={saved}
              toggleSaved={toggleSaved}
              share={share}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Saved;
