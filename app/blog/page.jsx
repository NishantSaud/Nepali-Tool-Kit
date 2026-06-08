// app/blog/page.jsx
// ─────────────────────────────────────────────────────────────
// Blog listing page — Server component with metadata
// ─────────────────────────────────────────────────────────────

import BlogClient from '../../components/BlogClient';

export const metadata = {
  title: 'Blog — Guides & Tips for Nepal',
  description:
    'Finance guides, investment tips, tax tutorials, and tool walkthroughs for Nepali users. Updated regularly.',
  alternates: { canonical: 'https://www.nepaltoolkit.com/blog' },
  openGraph: {
    title: 'NepalToolkit Blog',
    description: 'Finance guides, investment tips, and tool walkthroughs for Nepal.',
    url: 'https://www.nepaltoolkit.com/blog',
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
