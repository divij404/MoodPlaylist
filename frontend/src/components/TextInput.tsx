// components/TextInput.tsx
import React, { useState, useRef } from "react";

interface TextInputProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
}

const TextInput: React.FC<TextInputProps> = ({ onAnalyze, isLoading }) => {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(text);
  };

  // Auto-resize textarea
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = Math.min(ta.scrollHeight, 240) + "px";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="page-enter page-enter--delay-2">
      <div className="text-input-card">
        <label className="text-input-card__label">What's on your mind?</label>
        <textarea
          ref={textareaRef}
          placeholder="Describe how you're feeling — a moment, a memory, a state of mind..."
          rows={4}
          value={text}
          onChange={handleChange}
          disabled={isLoading}
          required
        />
        <div className="text-input-card__footer">
          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading || !text.trim()}
          >
            {isLoading ? (
              <>
                <span className="spinner" />
                Reading your vibe...
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 1L13 7M13 7L7 13M13 7H1" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Find My Playlist
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default TextInput;
