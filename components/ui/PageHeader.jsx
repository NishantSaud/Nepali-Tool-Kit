'use client';

export default function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  breadcrumbs,
  className = '',
  ...props
}) {
  return (
    <div className={`ui-page-header ${className}`} {...props}>
      {breadcrumbs && (
        <nav className="ui-page-header-breadcrumbs" aria-label="Breadcrumb">
          {breadcrumbs}
        </nav>
      )}
      {eyebrow && <div className="ui-page-header-eyebrow">{eyebrow}</div>}
      <div className="ui-page-header-content">
        <div className="ui-page-header-text">
          <h2 className="ui-page-header-title">{title}</h2>
          {description && (
            <p className="ui-page-header-description">{description}</p>
          )}
        </div>
        {actions && (
          <div className="ui-page-header-actions">{actions}</div>
        )}
      </div>
      <style jsx>{`
        .ui-page-header {
          padding: var(--space-10) 0;
          border-bottom: 1px solid var(--border);
          margin-bottom: var(--space-10);
        }

        .ui-page-header-breadcrumbs {
          margin-bottom: var(--space-4);
        }

        .ui-page-header-eyebrow {
          font-size: var(--text-xs);
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-primary);
          margin-bottom: var(--space-3);
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
        }

        .ui-page-header-content {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: var(--space-6);
        }

        .ui-page-header-text {
          flex: 1;
          min-width: 0;
        }

        .ui-page-header-title {
          margin-bottom: var(--space-3);
          letter-spacing: -0.025em;
        }

        .ui-page-header-description {
          font-size: var(--text-base);
          color: var(--text-tertiary);
          max-width: 600px;
          line-height: 1.6;
          margin: 0;
        }

        .ui-page-header-actions {
          display: flex;
          gap: var(--space-3);
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .ui-page-header {
            padding: var(--space-8) 0 var(--space-6);
            margin-bottom: var(--space-6);
          }

          .ui-page-header-content {
            flex-direction: column;
          }

          .ui-page-header-actions {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
