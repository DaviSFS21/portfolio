import React from './react';

export interface ButtonProps {
  /** Renders a link when set (like "Mais informações" → #contatos). */
  href?: string;
  onClick?: (event: unknown) => void;
  type?: 'button' | 'submit' | 'reset';
  target?: string;
  children?: unknown;
  className?: string;
}

/** The site's only button: gray fill, white semibold label, turns primary on hover. */
export function Button({ href, onClick, type = 'button', target, children, className }: ButtonProps) {
  const cls = 'ds-button' + (className ? ' ' + className : '');
  if (href) {
    return (
      <a className={cls} href={href} target={target} rel={target === '_blank' ? 'noopener' : undefined} onClick={onClick as any}>
        {children as any}
      </a>
    );
  }
  return (
    <button className={cls} type={type} onClick={onClick as any}>
      {children as any}
    </button>
  );
}
