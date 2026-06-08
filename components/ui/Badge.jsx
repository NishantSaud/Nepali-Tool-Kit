'use client';

export default function Badge({
  children,
  variant = 'default',
  className = '',
  dot = false,
  ...props
}) {
  return (
    <span className={`ui-badge ui-badge--${variant} ${className}`} {...props}>
      {dot && <span className={`ui-badge-dot ui-badge-dot--${variant}`} />}
      {children}
      <style jsx>{`
        .ui-badge {
          display: inline-flex;
          align-items: center;
          gap: var(--space-1);
          font-size: var(--text-xs);
          font-weight: 500;
          letter-spacing: 0.04em;
          padding: 4px 12px;
          border-radius: var(--radius-full);
          line-height: 1.4;
        }

        .ui-badge--default {
          background: var(--bg-tertiary);
          color: var(--text-secondary);
        }

        .ui-badge--primary {
          background: var(--color-primary-light);
          color: var(--color-primary);
        }

        .ui-badge--success {
          background: var(--color-success-light);
          color: var(--color-success);
        }

        .ui-badge--warning {
          background: var(--color-warning-light);
          color: var(--color-warning);
        }

        .ui-badge--error {
          background: var(--color-error-light);
          color: var(--color-error);
        }

        .ui-badge--accent {
          background: var(--color-accent-light);
          color: var(--color-accent);
        }

        .ui-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .ui-badge-dot--default { background: var(--text-muted); }
        .ui-badge-dot--primary { background: var(--color-primary); }
        .ui-badge-dot--success { background: var(--color-success); }
        .ui-badge-dot--warning { background: var(--color-warning); }
        .ui-badge-dot--error { background: var(--color-error); }
        .ui-badge-dot--accent { background: var(--color-accent); }
      `}</style>
    </span>
  );
}
