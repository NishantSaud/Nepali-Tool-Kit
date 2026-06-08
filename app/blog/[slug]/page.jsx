// app/blog/[slug]/page.jsx
// ─────────────────────────────────────────────────────────────
// Dynamic blog post page — Server component with metadata
// ─────────────────────────────────────────────────────────────

import BlogPostContent from '../../../components/BlogPostContent';
import { getPostBySlug, getAllSlugs } from '../../../components/blog/blogData';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `https://www.nepaltoolkit.com/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://www.nepaltoolkit.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default function BlogPostPage({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return (
      <div style={{ padding: '120px 24px', textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
        <h2>Post not found</h2>
        <a href="/blog" style={{ color: 'var(--color-primary)', marginTop: 16, display: 'inline-block' }}>
          ← Back to blog
        </a>
      </div>
    );
  }

  return <BlogPostContent post={post} />;
}
