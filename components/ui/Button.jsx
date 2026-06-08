'use client';

import Link from 'next/link';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  ...props
}) {
  const classes = `ui-btn ui-btn--${variant} ui-btn--${size} ${className}`.trim();

  if (href && !disabled) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
        <style jsx>{`
          .ui-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: var(--space-2);
            font-family: var(--font-sans);
            font-weight: 600;
            cursor: pointer;
            border: none;
            transition: all var(--transition-base);
            white-space: nowrap;
            text-decoration: none;
            line-height: 1;
          }
          .ui-btn:focus-visible {
            outline: 2px solid var(--border-focus);
            outline-offset: 2px;
          }
          .ui-btn--sm { height: 36px; padding: 0 var(--space-4); font-size: var(--text-xs); border-radius: var(--radius-md); }
          .ui-btn--md { height: 44px; padding: 0 var(--space-5); font-size: var(--text-sm); border-radius: 12px; }
          .ui-btn--lg { height: 48px; padding: 0 var(--space-6); font-size: var(--text-sm); border-radius: 14px; }
          .ui-btn--xl { height: 52px; padding: 0 var(--space-8); font-size: var(--text-base); border-radius: 16px; }
          .ui-btn--primary { background: var(--gradient-primary); color: var(--text-inverse); box-shadow: 0 2px 8px rgba(225,29,72,0.3); }
          .ui-btn--primary:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(225,29,72,0.4); }
          .ui-btn--primary:active { transform: translateY(0); }
          .ui-btn--secondary { background: var(--surface); color: var(--text-primary); border: 1px solid var(--border); backdrop-filter: blur(8px); }
          .ui-btn--secondary:hover { background: var(--surface-hover); border-color: var(--border-focus); box-shadow: var(--shadow-sm); }
          .ui-btn--outline { background: transparent; color: var(--text-primary); border: 1px solid var(--border); }
          .ui-btn--outline:hover { background: var(--bg-tertiary); border-color: var(--text-muted); }
          .ui-btn--ghost { background: transparent; color: var(--text-secondary); border: 1px solid transparent; }
          .ui-btn--ghost:hover { background: var(--bg-tertiary); color: var(--text-primary); }
          .ui-btn--destructive { background: var(--color-error); color: #fff; box-shadow: 0 2px 8px rgba(239,68,68,0.3); }
          .ui-btn--destructive:hover { background: #DC2626; box-shadow: 0 4px 16px rgba(239,68,68,0.4); transform: translateY(-1px); }
          .ui-btn--link { background: transparent; color: var(--color-primary); padding: 0; height: auto; border-radius: 0; }
          .ui-btn--link:hover { text-decoration: underline; }
        `}</style>
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
      <style jsx>{`
        .ui-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-2);
          font-family: var(--font-sans);
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: all var(--transition-base);
          white-space: nowrap;
          text-decoration: none;
          line-height: 1;
        }
        .ui-btn:disabled { opacity: 0.5; cursor: not-allowed; pointer-events: none; }
        .ui-btn:focus-visible { outline: 2px solid var(--border-focus); outline-offset: 2px; }
        .ui-btn--sm { height: 36px; padding: 0 var(--space-4); font-size: var(--text-xs); border-radius: var(--radius-md); }
        .ui-btn--md { height: 44px; padding: 0 var(--space-5); font-size: var(--text-sm); border-radius: 12px; }
        .ui-btn--lg { height: 48px; padding: 0 var(--space-6); font-size: var(--text-sm); border-radius: 14px; }
        .ui-btn--xl { height: 52px; padding: 0 var(--space-8); font-size: var(--text-base); border-radius: 16px; }
        .ui-btn--primary { background: var(--gradient-primary); color: var(--text-inverse); box-shadow: 0 2px 8px rgba(225,29,72,0.3); }
        .ui-btn--primary:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(225,29,72,0.4); }
        .ui-btn--primary:active { transform: translateY(0); }
        .ui-btn--secondary { background: var(--surface); color: var(--text-primary); border: 1px solid var(--border); backdrop-filter: blur(8px); }
        .ui-btn--secondary:hover { background: var(--surface-hover); border-color: var(--border-focus); box-shadow: var(--shadow-sm); }
        .ui-btn--outline { background: transparent; color: var(--text-primary); border: 1px solid var(--border); }
        .ui-btn--outline:hover { background: var(--bg-tertiary); border-color: var(--text-muted); }
        .ui-btn--ghost { background: transparent; color: var(--text-secondary); border: 1px solid transparent; }
        .ui-btn--ghost:hover { background: var(--bg-tertiary); color: var(--text-primary); }
        .ui-btn--destructive { background: var(--color-error); color: #fff; box-shadow: 0 2px 8px rgba(239,68,68,0.3); }
        .ui-btn--destructive:hover { background: #DC2626; box-shadow: 0 4px 16px rgba(239,68,68,0.4); transform: translateY(-1px); }
        .ui-btn--link { background: transparent; color: var(--color-primary); padding: 0; height: auto; border-radius: 0; }
        .ui-btn--link:hover { text-decoration: underline; }
      `}</style>
    </button>
  );
}
