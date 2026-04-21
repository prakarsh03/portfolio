import { useEffect } from "react";
import { blogPosts } from "./data/content";
import "./page.css";

export default function Page({ slug, onBack }) {
  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (!post) {
    return (
      <div className="pg-notfound">
        <button className="pg-back" onClick={onBack}>← Back</button>
        <p>Post not found.</p>
      </div>
    );
  }

  if (!post.content) {
    return (
      <div className="pg-notfound">
        <button className="pg-back" onClick={onBack}>← Back</button>
        <p>This post is coming soon.</p>
      </div>
    );
  }

  const { content } = post;

  return (
    <div className="pg">
      {/* Nav bar */}
      <nav className="pg-nav">
        <button className="pg-back" onClick={onBack}>← Writing</button>
        <span className="pg-read">{post.readTime} read</span>
      </nav>

      <article className="pg-article">
        {/* Header */}
        <header className="pg-header">
          <time className="pg-date">{post.date}</time>
          <h1 className="pg-title">{post.title}</h1>
        </header>

        {/* Preface */}
        {content.preface && (
          <div className="pg-preface">
            <span className="pg-preface-label">Preface</span>
            <p>{content.preface}</p>
          </div>
        )}

        {/* Sections */}
        {content.sections?.map((s, i) => (
          <section key={i} className="pg-section">
            <h2 className="pg-heading">{s.heading}</h2>
            {s.body.split("\n\n").map((para, j) => (
              <p key={j} className="pg-para">{para}</p>
            ))}
          </section>
        ))}
      </article>
    </div>
  );
}