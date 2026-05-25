// pages/AppPage.tsx
import React, { useState, useEffect, useRef } from "react";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:5000";
import TextInput from "../components/TextInput";
import MoodDisplay from "../components/MoodDisplay";
import PlaylistDisplay from "../components/PlaylistDisplay";
import { useNavigate } from "react-router-dom";

type Phase = "idle" | "loading" | "results";

const AppPage: React.FC = () => {
  const [phase, setPhase] = useState<Phase>("idle");
  const [mood, setMood] = useState<string | null>(null);
  const [playlistUrl, setPlaylistUrl] = useState<string | null>(null);
  const [playlistName, setPlaylistName] = useState<string | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const shell = document.querySelector(".full-screen");
    if (!shell) return;
    shell.className = shell.className.replace(/\bmood-\w+/g, "").trim();
    if (mood) shell.classList.add("mood-" + mood.toLowerCase());
    return () => {
      const s = document.querySelector(".full-screen");
      if (s) s.className = s.className.replace(/\bmood-\w+/g, "").trim();
    };
  }, [mood]);

  useEffect(() => {
    if (phase === "results" && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 80);
    }
  }, [phase]);

  const analyzeMood = async (text: string) => {
    if (!text.trim()) return;
    setPhase("loading");
    setSaveSuccess(false);
    setMood(null);
    setPlaylistUrl(null);
    try {
      const moodRes = await fetch(`${API}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const moodData = await moodRes.json();
      setMood(moodData.mood);
      const playlistRes = await fetch(`${API}/playlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood: moodData.mood }),
      });
      if (!playlistRes.ok) throw new Error("Failed to fetch playlist");
      const playlistData = await playlistRes.json();
      setPlaylistUrl(playlistData.playlist_url);
      setPlaylistName(playlistData.playlist_name || "Spotify Playlist");
      setPhase("results");
    } catch (err) {
      console.error(err);
      setPhase("idle");
    }
  };

  const savePlaylist = async () => {
    if (!mood || !playlistUrl) return;
    setSaveLoading(true);
    try {
      const res = await fetch(`${API}/save_playlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood, playlist_url: playlistUrl, playlist_name: playlistName }),
      });
      const data = await res.json();
      if (data.status === "saved") {
        setSaveSuccess(true);
        setTimeout(() => navigate("/library"), 1400);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleReset = () => {
    setPhase("idle");
    setMood(null);
    setPlaylistUrl(null);
    setSaveSuccess(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app-page">
      <div className={"app-page__header" + (phase !== "idle" ? " app-page__header--compact" : "")}>
        <p className="app-page__eyebrow">
          <span>&#10022;</span> Mood-to-Music
        </p>
        <h1 className="app-page__title">
          {phase === "idle" ? "How are you feeling?" : "Here's your vibe."}
        </h1>
        {phase === "idle" && (
          <p className="app-page__subtitle">
            Describe your mood — we will find the exact playlist for it.
          </p>
        )}
      </div>

      <div className="app-page__input">
        <TextInput onAnalyze={analyzeMood} isLoading={phase === "loading"} />
      </div>

      {phase === "loading" && (
        <div className="app-loading">
          <span className="spinner spinner--lg" />
          <p className="app-loading__text">Reading your vibe...</p>
        </div>
      )}

      {phase === "results" && mood && playlistUrl && (
        <div className="app-results" ref={resultsRef}>
          <MoodDisplay mood={mood} />
          <PlaylistDisplay playlistUrl={playlistUrl} />
          <div className="app-results__actions">
            <button className="btn-ghost" onClick={handleReset}>
              Try again
            </button>
            {saveSuccess ? (
              <span className="btn-success">Saved to Library</span>
            ) : (
              <button className="btn-primary" onClick={savePlaylist} disabled={saveLoading}>
                {saveLoading ? "Saving..." : "Save to Library"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AppPage;
