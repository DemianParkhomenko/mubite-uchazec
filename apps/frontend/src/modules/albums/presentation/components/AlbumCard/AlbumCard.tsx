"use client";

import { memo } from "react";
import { Album } from "@mubite/shared-types";
import { useCardAnimation } from "../../hooks";

const USER_GRADIENTS = [
  "from-rose-500 to-orange-400",
  "from-amber-500 to-yellow-400",
  "from-emerald-500 to-teal-400",
  "from-cyan-500 to-blue-400",
  "from-blue-500 to-indigo-400",
  "from-violet-500 to-purple-400",
  "from-fuchsia-500 to-pink-400",
  "from-pink-500 to-rose-400",
  "from-teal-500 to-cyan-400",
  "from-indigo-500 to-violet-400",
];

const USER_ACCENT_COLORS = [
  "text-rose-400",
  "text-amber-400",
  "text-emerald-400",
  "text-cyan-400",
  "text-blue-400",
  "text-violet-400",
  "text-fuchsia-400",
  "text-pink-400",
  "text-teal-400",
  "text-indigo-400",
];

function getUserGradient(userId: number): string {
  return USER_GRADIENTS[(userId - 1) % USER_GRADIENTS.length];
}

function getUserAccent(userId: number): string {
  return USER_ACCENT_COLORS[(userId - 1) % USER_ACCENT_COLORS.length];
}

function HighlightedText({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const parts: { text: string; match: boolean }[] = [];
  let lastIndex = 0;

  let index = lowerText.indexOf(lowerQuery, lastIndex);
  while (index !== -1) {
    if (index > lastIndex) {
      parts.push({ text: text.slice(lastIndex, index), match: false });
    }
    parts.push({ text: text.slice(index, index + query.length), match: true });
    lastIndex = index + query.length;
    index = lowerText.indexOf(lowerQuery, lastIndex);
  }

  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), match: false });
  }

  if (parts.length === 0) return <>{text}</>;

  return (
    <>
      {parts.map((part, i) =>
        part.match ? (
          <span
            key={i}
            className="bg-primary-500/25 text-foreground rounded-sm px-0.5 underline decoration-primary-500/50"
          >
            {part.text}
          </span>
        ) : (
          <span key={i}>{part.text}</span>
        ),
      )}
    </>
  );
}

interface AlbumCardProps {
  album: Album;
  searchQuery?: string;
}

export const AlbumCard = memo(function AlbumCard({
  album,
  searchQuery = "",
}: AlbumCardProps) {
  const cardRef = useCardAnimation();
  const gradient = getUserGradient(album.userId);
  const accent = getUserAccent(album.userId);

  return (
    <div
      ref={cardRef}
      className="group relative bg-album-card border border-album-border rounded-xl overflow-hidden opacity-0 translate-y-4 hover:shadow-2xl hover:shadow-black/15 hover:-translate-y-1.5 hover:border-album-border/50 transition-all duration-300 cursor-default"
    >
      {/* Gradient accent strip */}
      <div className={`h-1.5 bg-linear-to-r ${gradient}`} />

      {/* Card content */}
      <div className="p-4 pb-3">
        {/* Header: avatar + album badge */}
        <div className="flex items-center gap-2.5 mb-3">
          <div
            className={`w-8 h-8 rounded-lg bg-linear-to-br ${gradient} flex items-center justify-center text-white text-[10px] font-bold shadow-sm`}
          >
            U{album.userId}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-xs font-semibold ${accent}`}>
              User {album.userId}
            </p>
            <p className="text-[10px] text-foreground/30 font-mono">
              Album #{album.id}
            </p>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm font-medium text-foreground/85 leading-relaxed line-clamp-2 group-hover:text-foreground transition-colors">
          <HighlightedText text={album.title} query={searchQuery} />
        </h3>
      </div>

      {/* Hover glow at bottom */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />
    </div>
  );
});
