'use client';

import Link from 'next/link';

export default function Card({
  children,
  variant = 'default',
  href,
  className = '',
  ...props
}) {
  const classes = `ui-card ui-card--${variant} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
        <style jsx>{cardStyles}</style>
      </Link>
    );
  }

  return (
    <div className={classes} {...props}>
      {children}
      <style jsx>{cardStyles}</style>
    </div>
  );
}

const cardStyles = `
  .ui-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-2xl);
    box-shadow: var(--shadow-card);
    transition: all var(--transition-slow);
    position: relative;
    overflow: hidden;
  }

  .ui-card--default:hover {
    box-shadow: var(--shadow-card-hover);
    border-color: rgba(225,29,72,0.15);
  }

  .ui-card--interactive {
    cursor: pointer;
  }

  .ui-card--interactive::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--gradient-card-hover);
    opacity: 0;
    transition: opacity var(--transition-slow);
    pointer-events: none;
  }

  .ui-card--interactive:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-card-hover);
    border-color: rgba(225,29,72,0.2);
  }

  .ui-card--interactive:hover::before {
    opacity: 1;
  }

  .ui-card--featured {
    border-color: var(--color-primary);
    background: linear-gradient(135deg, var(--surface) 0%, var(--color-primary-light) 100%);
  }

  .ui-card--tool {
    padding: var(--space-6);
    cursor: pointer;
  }

  .ui-card--tool::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--gradient-card-hover);
    opacity: 0;
    transition: opacity var(--transition-slow);
    pointer-events: none;
  }

  .ui-card--tool:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-card-hover);
    border-color: rgba(225,29,72,0.2);
  }

  .ui-card--tool:hover::before {
    opacity: 1;
  }

  .ui-card:focus-visible {
    outline: 2px solid var(--border-focus);
    outline-offset: 2px;
  }
`;
