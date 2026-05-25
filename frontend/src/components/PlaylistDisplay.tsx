import React from "react";

interface PlaylistDisplayProps {
  playlistUrl: string | null;
}

const PlaylistDisplay: React.FC<PlaylistDisplayProps> = ({ playlistUrl }) => {
  if (!playlistUrl) return null;

  const getEmbedUrl = (url: string) => {
    if (url.includes("spotify.com/playlist/")) {
      const playlistId = url.split("playlist/")[1].split("?")[0];
      return `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`;
    }
    return url;
  };

  const embedUrl = getEmbedUrl(playlistUrl);

  return (
    <div className="playlist-wrapper">
      <iframe
        src={embedUrl}
        width="100%"
        height="380"
        frameBorder="0"
        className="playlist-embed"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify Playlist"
      />
    </div>
  );
};

export default PlaylistDisplay;
