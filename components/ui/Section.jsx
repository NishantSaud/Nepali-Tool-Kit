'use client';

export default function Section({
  children,
  className = '',
  variant = 'default',
  as: Tag = 'section',
  id,
  ...props
}) {
  return (
    <Tag className={`ui-section ui-section--${variant} ${className}`} id={id} {...props}>
      {children}
      <style jsx>{`
        .ui-section {
          width: 100%;
        }

        .ui-section--default {
          padding: var(--space-20) 0;
        }

        .ui-section--compact {
          padding: var(--space-12) 0;
        }

        .ui-section--hero {
          padding: var(--space-24) 0 var(--space-20);
        }

        .ui-section--feature {
          padding: var(--space-20) 0;
        }

        .ui-section--cta {
          padding: var(--space-16) 0;
        }

        @media (max-width: 768px) {
          .ui-section--default {
            padding: var(--space-12) 0;
          }

          .ui-section--hero {
            padding: var(--space-16) 0 var(--space-12);
          }

          .ui-section--feature {
            padding: var(--space-12) 0;
          }

          .ui-section--cta {
            padding: var(--space-10) 0;
          }
        }
      `}</style>
    </Tag>
  );
}
