/**
 * Single source of truth for home rails and see-all pages.
 * Keys are used in see-all.html?rail=<key>
 */
var RAIL_DEFINITIONS = {
  trending: {
    title: "Trending now",
    items: [
      { symbol: "▶", title: "Deep focus", description: "Instrumentals for long sessions." },
      { symbol: "◆", title: "Weekend mix", description: "Upbeat tracks for downtime." },
      { symbol: "◎", title: "New voices", description: "Fresh creators this week." },
      { symbol: "◇", title: "Short stories", description: "Quick listens under 15 min." },
      { symbol: "✦", title: "Editor’s choice", description: "Hand-picked highlights." },
      { symbol: "☾", title: "Midnight study", description: "Low-tempo beats after dark." },
      { symbol: "♫", title: "Live sets", description: "Recorded performances this week." },
      { symbol: "◉", title: "Global charts", description: "What everyone is streaming now." },
    ],
  },
  continue: {
    title: "Continue",
    items: [
      { symbol: "📖", title: "Chapter 4", description: "Resume your last title." },
      { symbol: "🎧", title: "Episode 12", description: "Podcast — 18 min left." },
      { symbol: "🎬", title: "Documentary", description: "Paused at 42%." },
      { symbol: "🎵", title: "Playlist", description: "Summer road trip." },
      { symbol: "📝", title: "Audiobook — Part 2", description: "12 min left in chapter." },
      { symbol: "🧘", title: "Meditation — Day 3", description: "Daily calm series." },
      { symbol: "📰", title: "Morning briefing", description: "Saved for later — 6 min." },
    ],
  },
  genres: {
    title: "Because you listen",
    items: [
      { symbol: "A", title: "Ambient", description: "Soft pads and space." },
      { symbol: "J", title: "Jazz café", description: "Late-night standards." },
      { symbol: "T", title: "True crime", description: "Top episodes this month." },
      { symbol: "C", title: "Comedy", description: "Stand-up specials." },
      { symbol: "N", title: "News brief", description: "Ten minutes, every morning." },
      { symbol: "I", title: "Indie picks", description: "Under-the-radar releases." },
      { symbol: "♯", title: "Classical focus", description: "Strings and piano for work." },
      { symbol: "🏟", title: "Sports talk", description: "Post-game analysis and guests." },
    ],
  },
};

/**
 * @param {string} railId
 * @returns {boolean}
 */
function isValidRailId(railId) {
  return Object.prototype.hasOwnProperty.call(RAIL_DEFINITIONS, railId);
}
