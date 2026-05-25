import React from "react";

interface MoodDisplayProps {
  mood: string | null;
}

const moodEmojis: Record<string, string> = {
  happy:      "😊",
  sad:        "😢",
  energetic:  "⚡",
  calm:       "😌",
  angry:      "😠",
  anxious:    "😰",
  excited:    "🤩",
  relaxed:    "🧘",
  nostalgic:  "🕰️",
  romantic:   "❤️",
  confident:  "💪",
  focused:    "🧠",
};

const moodDescriptions: Record<string, string> = {
  happy:      "Here's a playlist to keep that energy going.",
  sad:        "Music that sits with you, not against you.",
  energetic:  "Full-send — high-octane tracks incoming.",
  calm:       "Slow down. These sounds get it.",
  angry:      "Let it out. The playlist can take it.",
  anxious:    "Something to quiet the noise.",
  excited:    "Match that excitement, then some.",
  relaxed:    "Ease into it. You've got the time.",
  nostalgic:  "A playlist that takes you somewhere.",
  romantic:   "Set the scene.",
  confident:  "Walk like you own the room.",
  focused:    "Clear the clutter. Stay in it.",
};

const MoodDisplay: React.FC<MoodDisplayProps> = ({ mood }) => {
  if (!mood) return null;

  const key = mood.toLowerCase();
  const emoji = moodEmojis[key] || "🎵";
  const description = moodDescriptions[key] || "Here's a playlist that matches your vibe.";

  return (
    <div className="mood-reveal">
      <div className="mood-reveal__emoji">{emoji}</div>
      <div className="mood-reveal__body">
        <p className="mood-reveal__label">Detected mood</p>
        <p className="mood-reveal__mood">{mood.charAt(0).toUpperCase() + mood.slice(1)}</p>
        <p className="mood-reveal__caption">{description}</p>
      </div>
    </div>
  );
};

export default MoodDisplay;
