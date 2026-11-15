import React from './react';

export interface FlagProps {
  /** Accessible name, like "Brasil". Pass '' when text next to the flag already says it. */
  label?: string;
  className?: string;
}

/**
 * Brazil flag, simplified for text sizes (no band, no stars). Marks origin, never language:
 * the LanguageSwitch stays in text. Sized in em to the caps of the text around it (1em x 0.7em),
 * sitting on the baseline, so it lines up with Bebas Neue and Quicksand alike.
 */
export function Flag({ label = 'Brasil', className }: FlagProps) {
  return (
    <svg
      className={'ds-flag' + (className ? ' ' + className : '')}
      viewBox="0 0 20 14"
      role={label ? 'img' : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <rect width="20" height="14" rx="1.6" fill="#009c3b" />
      <path d="M10 1.6 18.2 7 10 12.4 1.8 7Z" fill="#ffdf00" />
      <circle cx="10" cy="7" r="3.1" fill="#002776" />
    </svg>
  );
}
