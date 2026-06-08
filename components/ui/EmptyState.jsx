'use client';

export default function EmptyState({
  icon,
  title,
  description,
  action,
  className = '',
  ...props
}) {
  return (
    <div className={`ui-empty-state ${className}`} {...props}>
      {icon && <div className="ui-empty-state-icon">{icon}</div>}
      <h3 className="ui-empty-state-title">{title}</h3>
      {description && (
        <p className="ui-empty-state-description">{description}</p>
      )}
      {action && <div className="ui-empty-state-action">{action}</div>}
      <style jsx>{`
        .ui-empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: var(--space-12) var(--space-6);
          text-align: center;
        }

        .ui-empty-state-icon {
          width: 64px;
          height: 64px;
          border-radius: var(--radius-xl);
          background: var(--bg-tertiary);
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: var(--space-5);
        }

        .ui-empty-state-title {
          font-size: var(--text-lg);
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: var(--space-2);
        }

        .ui-empty-state-description {
          font-size: var(--text-sm);
          color: var(--text-tertiary);
          max-width: 400px;
          margin: 0 auto var(--space-6);
          line-height: 1.6;
        }

        .ui-empty-state-action {
          display: flex;
          gap: var(--space-3);
        }
      `}</style>
    </div>
  );
}
