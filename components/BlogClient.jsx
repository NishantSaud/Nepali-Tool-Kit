'use client';

// components/BlogClient.jsx
// ─────────────────────────────────────────────────────────────
// Client component for blog list with search and filter
// ─────────────────────────────────────────────────────────────

import { useState, useMemo } from 'react';
import Container from './ui/Container';
import PageHeader from './ui/PageHeader';
import Badge from './ui/Badge';
import SearchInput from './ui/SearchInput';
import BlogCard from './blog/BlogCard';
import { posts } from './blog/blogData';

const CATEGORIES = ['All', 'Finance', 'Investing', 'Banking'];

export default function BlogClient() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      const matchesSearch =
        !search.trim() ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <Container>
      <PageHeader
        eyebrow={<Badge variant="primary" dot>Blog</Badge>}
        title="NepalToolkit Blog"
        description="Guides, tutorials, and insights about finance, investing, and daily tools for Nepal."
      />

      {/* Search + Filters */}
      <div className="blog-toolbar">
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search articles..."
        />
        <div className="blog-filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`blog-filter-btn ${activeCategory === cat ? 'blog-filter-btn--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      {filtered.length === 0 ? (
        <div className="blog-empty">
          <p>No articles found matching your search.</p>
        </div>
      ) : (
        <div className="blog-grid">
          {filtered.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      <style jsx>{`
        .blog-toolbar {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
          margin-bottom: var(--space-10);
        }

        .blog-filters {
          display: flex;
          gap: var(--space-2);
          flex-wrap: wrap;
        }

        .blog-filter-btn {
          padding: 6px 16px;
          border: 1px solid var(--border);
          border-radius: var(--radius-full);
          font-family: var(--font-sans);
          font-size: var(--text-sm);
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-base);
          color: var(--text-secondary);
          background: transparent;
        }

        .blog-filter-btn:hover {
          background: var(--bg-tertiary);
          border-color: var(--text-muted);
        }

        .blog-filter-btn--active {
          background: var(--color-primary);
          color: var(--text-inverse);
          border-color: var(--color-primary);
        }

        .blog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-6);
        }

        .blog-empty {
          text-align: center;
          padding: var(--space-16) 0;
          color: var(--text-muted);
          font-size: var(--text-lg);
        }

        @media (max-width: 1024px) {
          .blog-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .blog-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </Container>
  );
}
