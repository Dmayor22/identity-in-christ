import React from "react";
import { Info, Sparkles, Share2 } from "lucide-react";

const About = () => {
  return (
    <section className="container page-section narrow">
      <div className="page-title">
        <span className="eyebrow purple">ABOUT</span>
        <h1>Why Identity in Christ?</h1>
        <p>
          This app is designed to turn biblical identity from something you
          occasionally read into something you regularly remember.
        </p>
      </div>
      <div className="about-card">
        <Info size={25} />
        <h2>Scripture first</h2>
        <p>
          The collection focuses on passages that directly describe who
          believers are, what they have received, and how they are positioned in
          Christ—such as being a new creation, God's workmanship, chosen,
          adopted, free from condemnation, and God's people.
        </p>
        <p>
          For example, 2 Corinthians 5:17 describes the person who is “in
          Christ” as a new creation, while 1 Peter 2:9 describes believers as a
          chosen people and God's special possession.
        </p>
      </div>
      <div className="about-card">
        <Sparkles size={25} />
        <h2>Daily rhythm</h2>
        <p>
          The featured Scripture is selected from the calendar date, so the same
          day always shows the same verse and the verse changes automatically
          when a new day begins.
        </p>
      </div>
      <div className="about-card">
        <Share2 size={25} />
        <h2>Made to be shared</h2>
        <p>
          Use the Share button on supported browsers, or copy the Scripture and
          send it to someone who needs the reminder today.
        </p>
      </div>
    </section>
  );
};

export default About;
