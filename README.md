# Portfolio — Dark Theme

A sharp, developer-aesthetic React portfolio. Dark background, green accent, monospace details.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Stack
- **React 18** + **Vite 5**
- Pure CSS (no UI framework)
- **Syne** (display headings) + **IBM Plex Mono** (labels/code) + **Inter** (body)

## Structure

```
src/
├── main.jsx           # Entry point
├── App.jsx            # All components (Nav, Hero, Writing, Projects, Talks, Contact, Footer)
├── index.css          # All styles — CSS variables at top of :root
└── data/
    └── content.js     # ← YOUR DATA LIVES HERE
```

## Customizing

**Everything personal is in `src/data/content.js`:**

```js
export const profile = {
  name: "Your Name",          // → appears in nav, hero, footer
  tagline: "...",             // → blinking cursor line
  bio: `...`,                 // → supports HTML tags for links
  bio2: `...`,
  email: "you@domain.com",
  socials: [
    { label: "GitHub", url: "https://github.com/you", followers: "2k" },
    // ...
  ],
};
```

### Adding your photo

Place a photo in `public/avatar.jpg`, then in `App.jsx` find:

```jsx
// Hero section — replace the initials placeholder with:
<img src="/avatar.jpg" alt={profile.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
```

### Changing accent color

In `src/index.css`, update the `:root` block:

```css
--green: #3dd68c;       /* main accent */
--green-dim: rgba(61,214,140,0.1);
```

Replace both with your preferred color (e.g. `#60a5fa` for blue).

## Adding a Backend

The `content.js` file is your data layer. When ready for a real backend:

```jsx
// In App.jsx — replace static imports with fetch:
const [blogPosts, setBlogPosts] = useState([]);
useEffect(() => {
  fetch('/api/posts').then(r => r.json()).then(setBlogPosts);
}, []);
```

Data shape stays the same, so no component changes needed.

## Deploy

```bash
npm run build   # outputs to dist/
```

Works on Vercel, Netlify, GitHub Pages, Cloudflare Pages.
