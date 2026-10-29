import React from './react';
import { ICON_PATHS } from './iconPaths';
import type { IconName } from './iconPaths';

export interface IconProps {
  name: IconName;
  /** Accessible name. Omit for decorative icons next to text. */
  title?: string;
  className?: string;
}

/** Font Awesome 4.7 glyph drawn inline, 1em tall, in currentColor. */
export function Icon({ name, title, className }: IconProps) {
  const glyph = ICON_PATHS[name];
  return (
    <svg
      className={'ds-icon' + (className ? ' ' + className : '')}
      viewBox={`0 0 ${glyph.width} 1792`}
      style={{ width: `${glyph.width / 1792}em`, height: '1em' }}
      fill="currentColor"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path transform="translate(0 1536) scale(1 -1)" d={glyph.d} />
    </svg>
  );
}
