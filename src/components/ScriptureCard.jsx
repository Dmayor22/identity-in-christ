import React from "react";
import { Heart, Share2, Bookmark } from "lucide-react";

const ScriptureCard = ({ s, saved, toggleSaved, share }) => {
  const isSaved = saved.includes(s.id);
  return (
    <article className="verse-card">
      <div className="verse-card-top">
        <span className="category-pill">
          {s.icon} {s.category}
        </span>
        <button
          className="heart-btn"
          onClick={() => toggleSaved(s.id)}
          aria-label="Save scripture"
        >
          <Heart size={19} fill={isSaved ? "currentColor" : "none"} />
        </button>
      </div>
      <h3>{s.title}</h3>
      <div className="reference">{s.ref}</div>
      <p>“{s.text}”</p>
      <div className="verse-card-actions">
        <button onClick={() => share(s)}>
          <Share2 size={16} /> Share
        </button>
        <button onClick={() => toggleSaved(s.id)}>
          {isSaved ? (
            <Bookmark size={16} fill="currentColor" />
          ) : (
            <Bookmark size={16} />
          )}{" "}
          {isSaved ? "Saved" : "Save"}
        </button>
      </div>
    </article>
  );
};

export default ScriptureCard;
