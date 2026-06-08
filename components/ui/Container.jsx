'use client';

export default function Container({ children, className = '', as: Tag = 'div', ...props }) {
  return (
    <Tag className={`ui-container ${className}`} {...props}>
      {children}
      <style jsx>{`
        .ui-container {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 var(--container-padding);
          width: 100%;
        }
      `}</style>
    </Tag>
  );
}
