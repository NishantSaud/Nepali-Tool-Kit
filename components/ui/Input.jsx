'use client';

export default function Input({
  label,
  error,
  icon,
  className = '',
  ...props
}) {
  return (
    <div className={`ui-input-wrapper ${className}`}>
      {label && <label className="ui-input-label">{label}</label>}
      <div className={`ui-input-container ${error ? 'ui-input-container--error' : ''}`}>
        {icon && <span className="ui-input-icon">{icon}</span>}
        <input
          className={`ui-input ${icon ? 'ui-input--with-icon' : ''}`}
          {...props}
        />
      </div>
      {error && <span className="ui-input-error">{error}</span>}
      <style jsx>{`
        .ui-input-wrapper {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        .ui-input-label {
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--text-secondary);
        }

        .ui-input-container {
          position: relative;
          display: flex;
          align-items: center;
        }

        .ui-input-icon {
          position: absolute;
          left: 14px;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          pointer-events: none;
          z-index: 1;
        }

        .ui-input {
          font-family: var(--font-sans);
          font-size: var(--text-base);
          color: var(--text-primary);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 12px 16px;
          width: 100%;
          height: 52px;
          outline: none;
          transition: border-color var(--transition-base), box-shadow var(--transition-base);
        }

        .ui-input--with-icon {
          padding-left: 42px;
        }

        .ui-input:focus {
          border-color: var(--border-focus);
          box-shadow: 0 0 0 3px rgba(225,29,72,0.1);
        }

        .ui-input::placeholder {
          color: var(--text-muted);
        }

        .ui-input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .ui-input-container--error .ui-input {
          border-color: var(--color-error);
        }

        .ui-input-container--error .ui-input:focus {
          box-shadow: 0 0 0 3px rgba(239,68,68,0.15);
        }

        .ui-input-error {
          font-size: var(--text-xs);
          color: var(--color-error);
        }
      `}</style>
    </div>
  );
}
