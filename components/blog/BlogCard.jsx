'use client';

import Link from 'next/link';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const READING_SPEED_WPM = 200;

export default function BlogCard({ post }) {
  const readingTime = Math.ceil(post.content.split(' ').length / READING_SPEED_WPM);

  return (
    <Card href={`/blog/${post.slug}`} variant="interactive" className="blog-card">
      <div className="blog-card-image" style={{ background: post.gradient }}>
        <span className="blog-card-emoji">{post.emoji}</span>
      </div>
      <div className="blog-card-body">
        <div className="blog-card-meta">
          <Badge variant={post.badgeVariant || 'primary'}>{post.category}</Badge>
          <span className="blog-card-reading-time">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {readingTime} min read
          </span>
        </div>
        <h3 className="blog-card-title">{post.title}</h3>
        <p className="blog-card-excerpt">{post.excerpt}</p>
        <div className="blog-card-footer">
          <span className="blog-card-date">{post.date}</span>
          <span className="blog-card-arrow">
            Read more
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </div>
      </div>

      <style jsx>{`
        .blog-card :global(.ui-card) {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .blog-card :global(.ui-card) > div:first-child {
          border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
        }

        .blog-card :global(.ui-card--interactive) {
          padding: 0;
        }

        .blog-card-image {
          height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .blog-card-emoji {
          font-size: 3.5rem;
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
        }

        .blog-card-body {
          padding: var(--space-6);
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .blog-card-meta {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          margin-bottom: var(--space-3);
        }

        .blog-card-reading-time {
          display: inline-flex;
          align-items: center;
          gap: var(--space-1);
          font-size: var(--text-xs);
          color: var(--text-muted);
        }

        .blog-card-title {
          font-size: var(--text-lg);
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: var(--space-2);
          line-height: 1.3;
          letter-spacing: -0.01em;
        }

        .blog-card-excerpt {
          font-size: var(--text-sm);
          color: var(--text-tertiary);
          line-height: 1.6;
          margin: 0 0 var(--space-4);
          flex: 1;
        }

        .blog-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: var(--space-4);
          border-top: 1px solid var(--border);
        }

        .blog-card-date {
          font-size: var(--text-xs);
          color: var(--text-muted);
        }

        .blog-card-arrow {
          display: inline-flex;
          align-items: center;
          gap: var(--space-1);
          font-size: var(--text-xs);
          font-weight: 500;
          color: var(--color-primary);
          transition: gap var(--transition-base);
        }

        .blog-card:hover .blog-card-arrow {
          gap: var(--space-2);
        }
      `}</style>
    </Card>
  );
}
