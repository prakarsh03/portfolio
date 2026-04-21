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
  {
    date: "Mar 20, 2026",
    title: "Introduction to Machine Learning",
    slug: "intro-to-ml",
    readTime: "12 min",
    content: {
      preface: `Most of what follows is inspired by, and adapted from, notes I originally wrote back in high school (2019), now refreshed and digitized. These notes were first put together while following the Machine Learning specialization by Andrew Ng on Coursera, albeit a very old version. I would also highly recommend going over 3Blue1Brown's lecture series on Neural Networks — they're a delight to visual learners trying to understand back propagation better.`,
      sections: [
        {
          heading: "History",
          body: `When learning a new topic, I always like to start with some history to understand the premise and "purpose" which lead to the creation of the given topic or field. In this case, "Artificial Intelligence" & "Machine Learning" have been fields of research since the 1950s.`,
        },
        {
          heading: "The Turing Test",
          body: `The world's first computer was built in 1946, the ENIAC. But theoreticians like Turing had already been theorizing about — in his 1936 paper, On Computable Numbers, with an Application to the Entscheidungsproblem — a general purpose "universal machine" that could solve "computable" problems.\n\nIt was also Turing who might have "kicked off" this field when he published his most cited paper, COMPUTING MACHINERY AND INTELLIGENCE in 1950, proposing the question "Can machines think?"\n\nIn this paper, he introduced the "Imitation Game" (now known as the Turing Test) as a practical way to assess if a machine could "think." It remains a benchmark even today, while we continue to debate between "AI", "AGI", "ASI", etc.`,
        },
        {
          heading: "The Dartmouth Conference",
          body: `This is publicly recognized as the most well-known birthplace of AI. In 1956, John McCarthy, Marvin Minsky, Nathaniel Rochester, and Claude Shannon organized a large workshop to bring together leading researchers and formally established the field of AI as a dedicated area of study.\n\nThis meeting marked the "official" birth of AI as a research field. John McCarthy is credited with coining the term "artificial intelligence."`,
        },
        {
          heading: "The Perceptron",
          body: `Following this conference, in 1957, Frank Rosenblatt built the world's first perceptron. It was a (in today's terms) single-layer neural network, which performed binary classification based on weighted inputs and a threshold.\n\nYou can think of the first perceptron as something as simple as a function that takes weighted inputs, sums them, and returns 1 if the sum exceeds a threshold, 0 otherwise.`,
        },
      ],
    },
  },
  { date: "Mar 10, 2026", title: "Building a Rate Limiter from Scratch", slug: "rate-limiter", readTime: "6 min", content: null },
  { date: "Feb 28, 2026", title: "Consistent Hashing Demystified", slug: "consistent-hashing", readTime: "10 min", content: null },
  { date: "Feb 15, 2026", title: "The CAP Theorem Is Often Misunderstood", slug: "cap-theorem", readTime: "7 min", content: null },
  { date: "Feb 01, 2026", title: "How I Learned Distributed Systems", slug: "distributed-systems", readTime: "5 min", content: null },
  { date: "Jan 18, 2026", title: "Writing Clean APIs in Go", slug: "clean-apis-go", readTime: "9 min", content: null },
  { date: "Jan 05, 2026", title: "Why You Should Read Database Papers", slug: "database-papers", readTime: "4 min", content: null },
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
