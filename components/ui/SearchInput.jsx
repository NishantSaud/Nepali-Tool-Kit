'use client';

import { useRef } from 'react';

export default function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
  ...props
}) {
  const inputRef = useRef(null);

  const handleClear = () => {
    onChange({ target: { value: '' } });
    inputRef.current?.focus();
  };

  return (
    <div className={`ui-search-wrapper ${className}`}>
      <div className="ui-search-container">
        <span className="ui-search-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          ref={inputRef}
          type="text"
          className="ui-search-input"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-label={placeholder}
          {...props}
        />
        {value && (
          <button
            type="button"
            className="ui-search-clear"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      <style jsx>{`
        .ui-search-wrapper {
          width: 100%;
          max-width: 480px;
        }

        .ui-search-container {
          position: relative;
          display: flex;
          align-items: center;
        }

        .ui-search-icon {
          position: absolute;
          left: 14px;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          pointer-events: none;
          z-index: 1;
          transition: color var(--transition-base);
        }

        .ui-search-input {
          font-family: var(--font-sans);
          font-size: var(--text-base);
          color: var(--text-primary);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 12px 44px 12px 44px;
          width: 100%;
          height: 52px;
          outline: none;
          transition: all var(--transition-base);
        }

        .ui-search-input:focus {
          border-color: var(--border-focus);
          box-shadow: 0 0 0 3px rgba(225,29,72,0.1);
        }

        .ui-search-input:focus + .ui-search-icon,
        .ui-search-container:focus-within .ui-search-icon {
          color: var(--color-primary);
        }

        .ui-search-input::placeholder {
          color: var(--text-muted);
        }

        .ui-search-clear {
          position: absolute;
          right: 8px;
          width: 32px;
          height: 32px;
          border-radius: var(--radius-md);
          border: none;
          background: var(--bg-tertiary);
          color: var(--text-tertiary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-base);
        }

        .ui-search-clear:hover {
          background: var(--border);
          color: var(--text-primary);
        }

        .ui-search-clear:focus-visible {
          outline: 2px solid var(--border-focus);
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}
