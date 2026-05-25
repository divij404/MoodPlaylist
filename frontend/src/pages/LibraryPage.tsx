// pages/LibraryPage.tsx
import React, { useState, useEffect } from "react";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:5000";
import { Link } from "react-router-dom";

interface SavedPlaylist {
  id: number;
  mood: string;
  url: string;
  name?: string;
  timestamp: string;
}

const moodEmojis: Record<string, string> = {
  happy: "😊", sad: "😢", energetic: "⚡", calm: "😌",
  angry: "😠", anxious: "😰", excited: "🤩", relaxed: "🧘",
  nostalgic: "🕰️", romantic: "❤️", confident: "💪", focused: "🧠",
};

const LibraryPage: React.FC = () => {
  const [playlists, setPlaylists] = useState<SavedPlaylist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => { fetchPlaylists(); }, []);

  const fetchPlaylists = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API}/saved_playlists`);
      const data = await res.json();
      setPlaylists(data.playlists || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    // Optimistic removal
    setPlaylists(prev => prev.filter(p => p.id !== id));
    setDeletingId(id);
    try {
      await fetch(`${API}/delete_playlist/${id}`, { method: "DELETE" });
    } catch (err) {
      console.error(err);
      // Re-fetch to restore state if deletion failed
      fetchPlaylists();
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (ts: string) =>
    new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const getMoodBadgeClass = (mood: string) => {
    const key = mood.toLowerCase();
    const known = ["happy","sad","energetic","calm","angry","anxious","excited",
                   "relaxed","nostalgic","romantic","confident","focused"];
    return "mood-badge" + (known.includes(key) ? " mood-badge--" + key : " mood-badge--default");
  };

  return (
    <div className="container--wide page-enter">
      <div className="library-header">
        <div className="library-header__left">
          <p className="library-header__eyebrow label">Your collection</p>
          <h1>Mood Library</h1>
        </div>
        <Link to="/app" className="btn-ghost">New Playlist</Link>
      </div>

      {isLoading ? (
        <div className="state-center">
          <span className="spinner spinner--lg" />
          <p className="state-center__title">Loading your playlists...</p>
        </div>
      ) : playlists.length === 0 ? (
        <div className="state-center">
          <div className="state-center__icon">🎵</div>
          <p className="state-center__title">No saved playlists yet</p>
          <p className="state-center__body">Analyze your mood and save playlists that resonate.</p>
          <Link to="/app" className="btn-primary" style={{ marginTop: "var(--sp-2)" }}>Go Discover</Link>
        </div>
      ) : (
        <div className="library-grid">
          {playlists.map((item, index) => (
            <div
              key={item.id}
              className="playlist-card"
              style={{ animationDelay: index * 0.04 + "s" }}
            >
              <div className="playlist-card__header">
                <span className={getMoodBadgeClass(item.mood)}>
                  {moodEmojis[item.mood.toLowerCase()] || "🎵"}
                  &nbsp;
                  {item.mood.charAt(0).toUpperCase() + item.mood.slice(1)}
                </span>
                <span className="playlist-card__date">{formatDate(item.timestamp)}</span>
              </div>

              <p className="playlist-card__name">{item.name || "Spotify Playlist"}</p>

              <div className="playlist-card__footer">
                <a
                  href={item.url}
                  className="playlist-card__open"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Spotify
                </a>
                <button
                  className="playlist-card__delete"
                  onClick={() => handleDelete(item.id)}
                  disabled={deletingId === item.id}
                  aria-label="Remove playlist"
                  title="Remove from library"
                >
                  {deletingId === item.id ? (
                    <span className="spinner" style={{ width: "12px", height: "12px" }} />
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 3.5H12M5 3.5V2.5C5 2.22386 5.22386 2 5.5 2H8.5C8.77614 2 9 2.22386 9 2.5V3.5M5.5 6V10.5M8.5 6V10.5M3 3.5L3.5 11.5C3.5 11.7761 3.72386 12 4 12H10C10.2761 12 10.5 11.7761 10.5 11.5L11 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LibraryPage;
