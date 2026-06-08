'use client';

// components/BlogPostContent.jsx
// ─────────────────────────────────────────────────────────────
// Client component for blog post content rendering
// ─────────────────────────────────────────────────────────────

import Link from 'next/link';
import Container from './ui/Container';
import Badge from './ui/Badge';
import { posts } from './blog/blogData';

export default function BlogPostContent({ post }) {
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <Container>
      {/* Back link */}
      <nav style={{ paddingTop: 'var(--space-8)', marginBottom: 'var(--space-6)' }}>
        <Link
          href="/blog"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)',
            transition: 'color var(--transition-base)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to blog
        </Link>
      </nav>

      {/* Article Header */}
      <article className="blog-post">
        <header className="blog-post-header">
          <div className="blog-post-meta">
            <Badge variant={post.badgeVariant || 'primary'}>{post.category}</Badge>
            <span className="blog-post-date">{post.date}</span>
            <span className="blog-post-separator">·</span>
            <span className="blog-post-reading-time">{readingTime} min read</span>
          </div>
          <h1 className="blog-post-title">{post.title}</h1>
          <p className="blog-post-excerpt">{post.excerpt}</p>
          <div className="blog-post-author">
            <div className="blog-post-author-avatar">
              <span style={{ fontSize: '1.2rem' }}>{post.emoji}</span>
            </div>
            <div>
              <div className="blog-post-author-name">{post.author}</div>
              <div className="blog-post-author-role">NepalToolkit Team</div>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <div className="blog-post-hero" style={{ background: post.gradient }}>
          <span style={{ fontSize: '5rem', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.1))' }}>{post.emoji}</span>
        </div>

        {/* Article Content */}
        <div className="blog-post-content">
          {post.content.split('\n\n').map((block, i) => {
            if (block.startsWith('## ')) {
              return <h2 key={i} className="blog-post-h2">{block.replace('## ', '')}</h2>;
            }
            if (block.startsWith('### ')) {
              return <h3 key={i} className="blog-post-h3">{block.replace('### ', '')}</h3>;
            }
            if (block.startsWith('**Q:')) {
              const text = block.replace(/\*\*Q:\*\*/g, '<strong>Q:</strong>').replace(/\*\*A:\*\*/g, '<strong>A:</strong>');
              return <div key={i} className="blog-post-faq" dangerouslySetInnerHTML={{ __html: text }} />;
            }
            if (block.includes('|') && block.includes('---')) {
              const rows = block.split('\n').filter(r => r.trim());
              const headerRow = rows[0]?.split('|').filter(r => r.trim());
              const bodyRows = rows.slice(2).map(r => r.split('|').filter(r => r.trim()));
              return (
                <div key={i} className="blog-post-table-wrap">
                  <table className="blog-post-table">
                    <thead>
                      <tr>
                        {headerRow?.map((h, j) => <th key={j}>{h.trim()}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {bodyRows.map((row, j) => (
                        <tr key={j}>
                          {row.map((cell, k) => <td key={k}>{cell.trim()}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            }
            if (block.startsWith('- ')) {
              const items = block.split('\n').filter(l => l.startsWith('- '));
              return (
                <ul key={i} className="blog-post-list">
                  {items.map((item, j) => {
                    const text = item.replace(/^- \*\*(.+?)\*\*:?\s*/, '<strong>$1:</strong> ').replace(/^- /, '');
                    return <li key={j} dangerouslySetInnerHTML={{ __html: text }} />;
                  })}
                </ul>
              );
            }
            if (block.match(/^\d\. /)) {
              const items = block.split('\n').filter(l => l.match(/^\d+\. /));
              return (
                <ol key={i} className="blog-post-list blog-post-list--ordered">
                  {items.map((item, j) => {
                    const text = item.replace(/^\d+\. \*\*(.+?)\*\*:?\s*/, '<strong>$1:</strong> ').replace(/^\d+\. /, '');
                    return <li key={j} dangerouslySetInnerHTML={{ __html: text }} />;
                  })}
                </ol>
              );
            }
            const html = block
              .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
              .replace(/`(.+?)`/g, '<code>$1</code>')
              .replace(/\n/g, '<br />');
            return <p key={i} className="blog-post-p" dangerouslySetInnerHTML={{ __html: html }} />;
          })}
        </div>
      </article>

      {/* Related Posts */}
      <section className="blog-post-related">
        <h3>More from our blog</h3>
        <div className="blog-post-related-grid">
          {posts.filter(p => p.slug !== post.slug).slice(0, 3).map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="blog-post-related-card">
              <span className="blog-post-related-emoji">{p.emoji}</span>
              <span className="blog-post-related-title">{p.title}</span>
              <span className="blog-post-related-read">Read →</span>
            </Link>
          ))}
        </div>
      </section>

      <style jsx>{`
        .blog-post {
          max-width: 720px;
          margin: 0 auto;
          padding-bottom: var(--space-16);
        }

        .blog-post-header {
          padding: var(--space-8) 0 var(--space-10);
        }

        .blog-post-meta {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          margin-bottom: var(--space-5);
          flex-wrap: wrap;
        }

        .blog-post-date,
        .blog-post-reading-time,
        .blog-post-separator {
          font-size: var(--text-sm);
          color: var(--text-muted);
        }

        .blog-post-title {
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.15;
          margin-bottom: var(--space-4);
        }

        .blog-post-excerpt {
          font-size: var(--text-lg);
          color: var(--text-tertiary);
          line-height: 1.6;
          margin-bottom: var(--space-6);
        }

        .blog-post-author {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding-top: var(--space-4);
          border-top: 1px solid var(--border);
        }

        .blog-post-author-avatar {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-full);
          background: var(--color-primary-light);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .blog-post-author-name {
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--text-primary);
        }

        .blog-post-author-role {
          font-size: var(--text-xs);
          color: var(--text-muted);
        }

        .blog-post-hero {
          height: 240px;
          border-radius: var(--radius-2xl);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: var(--space-10);
        }

        .blog-post-content {
          font-size: var(--text-base);
          line-height: 1.8;
          color: var(--text-secondary);
        }

        :global(.blog-post-h2) {
          font-size: var(--text-2xl);
          font-weight: 700;
          color: var(--text-primary);
          margin-top: var(--space-12);
          margin-bottom: var(--space-4);
          letter-spacing: -0.02em;
        }

        :global(.blog-post-h3) {
          font-size: var(--text-lg);
          font-weight: 600;
          color: var(--text-primary);
          margin-top: var(--space-8);
          margin-bottom: var(--space-3);
        }

        :global(.blog-post-p) {
          margin-bottom: var(--space-4);
          color: var(--text-secondary);
        }

        :global(.blog-post-p strong) {
          color: var(--text-primary);
          font-weight: 600;
        }

        :global(.blog-post-list) {
          margin-bottom: var(--space-6);
          padding-left: var(--space-6);
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        :global(.blog-post-list li) {
          color: var(--text-secondary);
          line-height: 1.7;
        }

        :global(.blog-post-list li strong) {
          color: var(--text-primary);
          font-weight: 600;
        }

        :global(.blog-post-faq) {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: var(--space-4) var(--space-5);
          margin-bottom: var(--space-3);
          font-size: var(--text-sm);
          line-height: 1.7;
          color: var(--text-secondary);
        }

        :global(.blog-post-faq strong) {
          color: var(--text-primary);
        }

        :global(.blog-post-table-wrap) {
          overflow-x: auto;
          margin-bottom: var(--space-6);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
        }

        :global(.blog-post-table) {
          width: 100%;
          border-collapse: collapse;
          font-size: var(--text-sm);
        }

        :global(.blog-post-table th) {
          text-align: left;
          padding: 10px 14px;
          background: var(--bg-secondary);
          font-weight: 600;
          color: var(--text-primary);
          border-bottom: 1px solid var(--border);
        }

        :global(.blog-post-table td) {
          padding: 10px 14px;
          border-bottom: 1px solid var(--border-light);
          color: var(--text-secondary);
        }

        :global(.blog-post-table tr:last-child td) {
          border-bottom: none;
        }

        .blog-post-related {
          max-width: 720px;
          margin: 0 auto;
          padding: var(--space-12) 0;
          border-top: 1px solid var(--border);
        }

        .blog-post-related h3 {
          font-size: var(--text-xl);
          margin-bottom: var(--space-6);
        }

        .blog-post-related-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-4);
        }

        .blog-post-related-card {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          padding: var(--space-5);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          transition: all var(--transition-base);
          text-decoration: none;
        }

        .blog-post-related-card:hover {
          border-color: rgba(225,29,72,0.15);
          box-shadow: var(--shadow-sm);
        }

        .blog-post-related-emoji {
          font-size: 1.5rem;
        }

        .blog-post-related-title {
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.4;
        }

        .blog-post-related-read {
          font-size: var(--text-xs);
          color: var(--color-primary);
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .blog-post-related-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </Container>
  );
}
