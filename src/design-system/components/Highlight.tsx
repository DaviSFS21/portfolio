import React from './react';

export interface HighlightProps {
  /** Turns the highlight into a link (like the "aqui" of the resume callout). */
  href?: string;
  target?: string;
  children?: unknown;
  className?: string;
}

/** The marca-texto: Bebas Neue on a highlight pill. The only way to put a colored word over the dark surface. */
export function Highlight({ href, target, children, className }: HighlightProps) {
  const cls = 'ds-highlight' + (className ? ' ' + className : '');
  if (href) {
    return (
      <a className={cls} href={href} target={target} rel={target === '_blank' ? 'noopener' : undefined}>
        {children as any}
      </a>
    );
  }
  return <span className={cls}>{children as any}</span>;
}
