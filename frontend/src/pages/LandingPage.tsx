// pages/LandingPage.tsx
import React from "react";
import { Link } from "react-router-dom";

const MOODS = ["happy", "focused", "nostalgic", "calm", "energetic", "anxious", "romantic", "sad"];

const STEPS = [
  {
    num: "01",
    title: "Describe your mood",
    body: "Type a few words or a whole paragraph. How you're feeling, what's on your mind, what kind of day it's been.",
  },
  {
    num: "02",
    title: "We read the vibe",
    body: "The mood engine analyzes the emotional tone of your words and maps it to a feeling.",
  },
  {
    num: "03",
    title: "Get your playlist",
    body: "A Spotify playlist matched to your mood — ready to open immediately.",
  },
];

const FEATURES = [
  {
    icon: "⚡",
    title: "Instant analysis",
    body: "From text to playlist in under 3 seconds. No surveys, no sliders, no genre-picking.",
  },
  {
    icon: "🎨",
    title: "Mood-reactive UI",
    body: "The app shifts to match your emotional state — colors, atmosphere, everything.",
  },
  {
    icon: "📚",
    title: "Your mood library",
    body: "Save any playlist. Build a personal archive of your moods over time.",
  },
  {
    icon: "🎵",
    title: "Powered by Spotify",
    body: "Real playlists from Spotify's catalogue. Curated by humans, surfaced by mood.",
  },
];

const LandingPage: React.FC = () => {
  return (
    <div className="landing">

      {/* HERO — centered, minimal, full viewport */}
      <section className="landing-hero">
        <div className="landing-hero__bg-grid" aria-hidden="true" />

        <div className="landing-hero__content">
          <div className="landing-hero__eyebrow page-enter">
            <span className="landing-eyebrow-dot" /> Mood-to-Music
          </div>

          <h1 className="landing-hero__title page-enter page-enter--delay-1">
            Music that fits
            <br />
            <span className="landing-hero__title-accent">how you actually feel.</span>
          </h1>

          <p className="landing-hero__subtitle page-enter page-enter--delay-2">
            Describe your mood in plain words.
            Get a Spotify playlist matched to your exact emotional state.
          </p>

          <div className="landing-hero__cta page-enter page-enter--delay-3">
            <Link to="/app" className="btn-primary btn-primary--lg">
              Find my playlist
            </Link>
          </div>

          <p className="landing-hero__footnote page-enter page-enter--delay-3">
            Just type. No login, no setup.
          </p>
        </div>
      </section>

      {/* MOOD STRIP — scrolling chips, below the fold */}
      <section className="landing-moods">
        <div className="landing-moods__track">
          {[...MOODS, ...MOODS].map((m, i) => (
            <span key={i} className={"landing-tag landing-tag--" + m + " landing-tag--static"}>{m}</span>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="landing-section">
        <div className="landing-section__inner">
          <div className="landing-section__header">
            <p className="landing-section__eyebrow">How it works</p>
            <h2 className="landing-section__title">Three steps to your playlist</h2>
          </div>
          <div className="landing-steps">
            {STEPS.map((step) => (
              <div key={step.num} className="landing-step">
                <div className="landing-step__num">{step.num}</div>
                <h3 className="landing-step__title">{step.title}</h3>
                <p className="landing-step__body">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="landing-section landing-section--alt">
        <div className="landing-section__inner">
          <div className="landing-section__header">
            <p className="landing-section__eyebrow">Features</p>
            <h2 className="landing-section__title">Built around how you actually feel</h2>
          </div>
          <div className="landing-features">
            {FEATURES.map((f) => (
              <div key={f.title} className="landing-feature">
                <div className="landing-feature__icon">{f.icon}</div>
                <h3 className="landing-feature__title">{f.title}</h3>
                <p className="landing-feature__body">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="landing-section landing-cta-section">
        <div className="landing-section__inner landing-cta">
          <h2 className="landing-cta__title">What's your mood right now?</h2>
          <p className="landing-cta__body">
            Type how you're feeling. Get a playlist. That's it.
          </p>
          <Link to="/app" className="btn-primary btn-primary--lg">
            Try it now
          </Link>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
