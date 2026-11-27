// Handwritten notes wait until the reader starts scrolling (nothing is written while the page
// just sits there), then play one after another, never two at once: each note that comes
// into view joins a queue and starts a beat after the one before it.

const GAP = 700; // ms between the starts of two notes
let scrolled = false;
let waiting: (() => void)[] = [];
let next = 0; // when the next note may start

function release() {
  scrolled = true;
  window.removeEventListener("scroll", release);
  const w = waiting;
  waiting = [];
  w.forEach(schedule);
}

function schedule(play: () => void) {
  const now = performance.now();
  const at = Math.max(now, next);
  next = at + GAP;
  window.setTimeout(play, at - now);
}

// Call when a note is in view; `play` runs once it is that note's turn.
export function queueNote(play: () => void) {
  if (typeof window === "undefined") return;
  if (!scrolled && window.scrollY > 0) scrolled = true; // page opened part-way down
  if (scrolled) return schedule(play);
  if (waiting.length === 0) window.addEventListener("scroll", release, { passive: true });
  waiting.push(play);
}
