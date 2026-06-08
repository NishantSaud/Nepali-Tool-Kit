'use client';

export default function LoadingSkeleton({
  variant = 'text',
  width,
  height,
  count = 1,
  className = '',
  ...props
}) {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  return (
    <div className={`ui-skeleton-group ${className}`} {...props}>
      {skeletons.map((i) => (
        <div
          key={i}
          className={`ui-skeleton ui-skeleton--${variant}`}
          style={{
            width: width || undefined,
            height: height || undefined,
          }}
        />
      ))}
      <style jsx>{`
        .ui-skeleton-group {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .ui-skeleton {
          background: linear-gradient(
            90deg,
            var(--bg-tertiary) 25%,
            var(--border-light) 50%,
            var(--bg-tertiary) 75%
          );
          background-size: 200% 100%;
          animation: skeleton-shimmer 1.5s ease-in-out infinite;
          border-radius: var(--radius-md);
        }

        .ui-skeleton--text {
          height: 16px;
          width: 100%;
        }

        .ui-skeleton--heading {
          height: 28px;
          width: 60%;
        }

        .ui-skeleton--avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
        }

        .ui-skeleton--card {
          height: 200px;
          width: 100%;
          border-radius: var(--radius-2xl);
        }

        .ui-skeleton--button {
          height: 48px;
          width: 140px;
          border-radius: 14px;
        }

        @keyframes skeleton-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}
