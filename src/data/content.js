export const profile = {
  name: "Ayush Raghuvanshi",
  tagline: "engineering, systems, and ideas. always building.",
  bio: `I'm a software engineer passionate about distributed systems and scalable architecture.
    Currently a Senior Engineer at <a href="#">Acme Corp</a>, working at the intersection of backend infrastructure and developer tools.
    Previously at <a href="#">Big Tech Co</a>, where I worked on high-throughput data pipelines serving millions of users.`,
  bio2: `I write about things I learn, build open-source tools, and occasionally speak at conferences.
    On the side, I'm building <a href="#">OpenTrace</a> — an open-source distributed tracing library on eBPF.`,
  location: "Hyderabad, India",
  email: "hello@yourname.dev",
  socials: [
    { label: "GitHub", url: "https://github.com", followers: "2k" },
    { label: "Twitter", url: "https://twitter.com", followers: "5k" },
    { label: "LinkedIn", url: "https://linkedin.com", followers: "8k" },
    { label: "YouTube", url: "https://youtube.com", followers: "10k" },
  ],
};

export const blogPosts = [
  { date: "Mar 20, 2026", title: "How Databases Handle MVCC Internally", slug: "#", readTime: "8 min" },
  { date: "Mar 10, 2026", title: "Building a Rate Limiter from Scratch", slug: "#", readTime: "6 min" },
  { date: "Feb 28, 2026", title: "Consistent Hashing Demystified", slug: "#", readTime: "10 min" },
  { date: "Feb 15, 2026", title: "The CAP Theorem Is Often Misunderstood", slug: "#", readTime: "7 min" },
  { date: "Feb 01, 2026", title: "How I Learned Distributed Systems", slug: "#", readTime: "5 min" },
  { date: "Jan 18, 2026", title: "Writing Clean APIs in Go", slug: "#", readTime: "9 min" },
  { date: "Jan 05, 2026", title: "Why You Should Read Database Papers", slug: "#", readTime: "4 min" },
];

export const projects = [
  {
    name: "OpenTrace",
    description: "An open-source distributed tracing library with sub-millisecond overhead. Built on eBPF.",
    tech: ["Go", "eBPF", "Rust"],
    url: "#",
    stars: "1.2k",
    status: "active",
  },
  {
    name: "QueryKit",
    description: "A zero-dependency SQL query builder for TypeScript with full type inference and composable predicates.",
    tech: ["TypeScript", "Node.js"],
    url: "#",
    stars: "890",
    status: "active",
  },
  {
    name: "CacheFlow",
    description: "A multi-tiered caching system with intelligent eviction strategies and real-time metrics dashboard.",
    tech: ["Python", "Redis", "Prometheus"],
    url: "#",
    stars: "540",
    status: "archived",
  },
  {
    name: "SchemaSync",
    description: "Database schema migration tool with rollback support and first-class CI/CD integrations.",
    tech: ["Go", "PostgreSQL", "MySQL"],
    url: "#",
    stars: "320",
    status: "active",
  },
];

export const talks = [
  {
    title: "Demystifying Distributed Transactions",
    event: "PyCon India 2025",
    year: "2025",
    url: "#",
    type: "Conference",
  },
  {
    title: "eBPF: The Future of Observability",
    event: "KubeCon EU 2025",
    year: "2025",
    url: "#",
    type: "Conference",
  },
  {
    title: "Building for Scale: Lessons from the Trenches",
    event: "DevFest Hyderabad 2024",
    year: "2024",
    url: "#",
    type: "Meetup",
  },
  {
    title: "How Postgres Handles Concurrent Writes",
    event: "Systems Podcast",
    year: "2024",
    url: "#",
    type: "Podcast",
  },
];
