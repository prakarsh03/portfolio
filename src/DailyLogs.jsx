import { useState } from "react";
import "./dailylogs.css";
import "./page.css";

/* ─── Log Data ──────────────────────────────────────────────
   Each day has a date and an array of entries.
   Each entry has a time, tag, and text.
   To add a new log: just push a new object into logsData.
────────────────────────────────────────────────────────────── */
const logsData = [
  {
    date: "Apr 29, 2026",
    entries: [
      {
        time: "09:15 AM",
        tag: "Systems",
        text: "Read about how Postgres handles MVCC — every row has xmin and xmax fields. Transactions only see rows where xmin <= their txid. Simple but brilliant.",
      },
      {
        time: "12:40 PM",
        tag: "Go",
        text: "Goroutines are not threads. The Go runtime multiplexes M goroutines onto N OS threads. Context switches happen in user space — orders of magnitude cheaper.",
      },
      {
        time: "06:10 PM",
        tag: "Networking",
        text: "TCP's three-way handshake: SYN → SYN-ACK → ACK. The half-open connection exploit (SYN flood) abuses the server holding state after SYN without completing the handshake.",
      },
    ],
  },
  {
    date: "Apr 28, 2026",
    entries: [
      {
        time: "10:00 AM",
        tag: "ML",
        text: "Backpropagation is just the chain rule applied repeatedly. The gradient flows backward through the network — each layer scales it by its local derivative.",
      },
      {
        time: "02:30 PM",
        tag: "Databases",
        text: "B-trees keep data sorted and balanced. Every leaf is at the same depth. That's why range queries are fast — you just scan leaf nodes sequentially.",
      },
    ],
  },
  {
    date: "Apr 27, 2026",
    entries: [
      {
        time: "09:00 AM",
        tag: "Systems",
        text: "eBPF lets you run sandboxed programs in the Linux kernel without changing kernel source or loading kernel modules. Used for tracing, networking, security.",
      },
      {
        time: "11:20 AM",
        tag: "Distributed",
        text: "Consistent hashing puts both servers and keys on a ring. When a server is added or removed, only the keys between it and its neighbor need to move. O(K/N) keys rehashed instead of O(K).",
      },
      {
        time: "04:00 PM",
        tag: "Go",
        text: "defer runs LIFO — last deferred call runs first. Useful for cleanup but watch out: defer in a loop doesn't run until the function returns, not after each iteration.",
      },
    ],
  },
  {
    date: "Apr 25, 2026",
    entries: [
      {
        time: "08:45 AM",
        tag: "ML",
        text: "The vanishing gradient problem: sigmoid squashes outputs to (0,1). Multiply many small gradients together and they shrink to zero. ReLU avoids this by having gradient = 1 for positive inputs.",
      },
      {
        time: "03:15 PM",
        tag: "Databases",
        text: "WAL (Write-Ahead Log) — changes are written to a log before being applied to the actual data. If the system crashes, replay the log. This is how Postgres guarantees durability.",
      },
    ],
  },
  {
    date: "Apr 23, 2026",
    entries: [
      {
        time: "10:30 AM",
        tag: "Networking",
        text: "HTTP/2 multiplexes multiple requests over a single TCP connection. HTTP/1.1 needed multiple connections to parallelize — head-of-line blocking was a real bottleneck.",
      },
      {
        time: "01:00 PM",
        tag: "Distributed",
        text: "The CAP theorem says you can only guarantee 2 of 3: Consistency, Availability, Partition Tolerance. In practice, partition tolerance is non-negotiable — networks fail. So you're really choosing between CP and AP.",
      },
      {
        time: "05:45 PM",
        tag: "Systems",
        text: "Learned about epoll today. poll() and select() check all file descriptors each call — O(n). epoll maintains a set in kernel space and only notifies you of ready fds — O(1) per event.",
      },
    ],
  },
];

const TAG_COLORS = {
  Systems:     { bg: "rgba(61,214,140,0.08)",  border: "rgba(61,214,140,0.2)",  text: "#3dd68c" },
  Go:          { bg: "rgba(96,165,250,0.08)",  border: "rgba(96,165,250,0.2)",  text: "#60a5fa" },
  Networking:  { bg: "rgba(251,146,60,0.08)",  border: "rgba(251,146,60,0.2)",  text: "#fb923c" },
  ML:          { bg: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.2)", text: "#a78bfa" },
  Databases:   { bg: "rgba(251,191,36,0.08)",  border: "rgba(251,191,36,0.2)",  text: "#fbbf24" },
  Distributed: { bg: "rgba(244,114,182,0.08)", border: "rgba(244,114,182,0.2)", text: "#f472b6" },
};

function TagBadge({ tag }) {
  const colors = TAG_COLORS[tag] || TAG_COLORS["Systems"];
  return (
    <span
      className="log-tag"
      style={{ background: colors.bg, border: `1px solid ${colors.border}`, color: colors.text }}
    >
      {tag}
    </span>
  );
}

export default function DailyLogs({ onBack }) {
  const [activeTag, setActiveTag] = useState("All");

  // collect all unique tags
  const allTags = ["All", ...new Set(logsData.flatMap(d => d.entries.map(e => e.tag)))];

  // filter entries by active tag
  const filtered = logsData.map(day => ({
    ...day,
    entries: activeTag === "All"
      ? day.entries
      : day.entries.filter(e => e.tag === activeTag),
  })).filter(day => day.entries.length > 0);

  const totalEntries = logsData.reduce((acc, d) => acc + d.entries.length, 0);

  return (
    <div className="dl">
      {/* Nav */}
      <nav className="dl-nav">
        <button className="dl-back" onClick={onBack}>← Back</button>
        <span className="dl-nav-title">Daily Logs</span>
        <span className="dl-nav-count">{totalEntries} entries</span>
      </nav>

      <div className="dl-inner">
        {/* Header */}
        <header className="dl-header">
          <div className="dl-header-top">
            <span className="dl-label">/ daily logs</span>
            <div className="dl-streak">
              <span className="dl-streak-dot" />
              {logsData.length} days logged
            </div>
          </div>
          <h1 className="dl-title">Learning in Public</h1>

          {/* Mission statement */}
        {/* Mission statement — styled like pg-preface */}
        <div className="pg-preface" style={{ marginBottom: "2.5rem" }}>
            <span className="pg-preface-label">Why this exists</span>
            <p>
                I learn something new almost every day — from papers, codebases, blog posts, or just
                poking at something until it makes sense. The problem is I used to forget most of it.
            </p>
            <p style={{ marginTop: "0.75rem" }}>
                So this is my fix: every time something clicks, I write it down in one or two lines.
                No fluff, no polish — just the raw insight while it's fresh.
            </p>
            <p style={{ marginTop: "0.75rem" }}>
                The goal is to build a second brain, stay accountable, and hopefully give someone else
                that "aha" moment too. If you're reading this — you're watching me learn in real time.
            </p>
        </div>
        </header>

        {/* Tag filter */}
        <div className="dl-filters">
          {allTags.map(tag => (
            <button
              key={tag}
              className={`dl-filter ${activeTag === tag ? "dl-filter--active" : ""}`}
              onClick={() => setActiveTag(tag)}
              style={activeTag === tag && tag !== "All" ? {
                background: TAG_COLORS[tag]?.bg,
                borderColor: TAG_COLORS[tag]?.border,
                color: TAG_COLORS[tag]?.text,
              } : {}}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Log entries */}
        <div className="dl-feed">
          {filtered.map((day, di) => (
            <div key={di} className="dl-day">
              {/* Day header */}
              <div className="dl-day-header">
                <span className="dl-day-date">{day.date}</span>
                <span className="dl-day-count">{day.entries.length} {day.entries.length === 1 ? "entry" : "entries"}</span>
              </div>

              {/* Entries */}
              <div className="dl-entries">
                {day.entries.map((entry, ei) => (
                  <div key={ei} className="dl-entry">
                    <div className="dl-entry-meta">
                      <time className="dl-entry-time">{entry.time}</time>
                      <TagBadge tag={entry.tag} />
                    </div>
                    <p className="dl-entry-text">{entry.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
