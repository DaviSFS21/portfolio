import React from './react';
import { TECH_PATHS } from './techPaths';
import type { TechName } from './techPaths';

export interface TechIconProps {
  name: TechName;
  /** Show the technology name next to the icon. Default: false (the name goes to screen readers only). */
  showLabel?: boolean;
  className?: string;
}

/** Devicon "plain" glyph, 1em tall, in currentColor. Size it with font-size (the site uses 45px). */
export function TechIcon({ name, showLabel = false, className }: TechIconProps) {
  const glyph = TECH_PATHS[name];
  return (
    <span className={'ds-tech' + (className ? ' ' + className : '')}>
      <svg viewBox={`0 0 ${glyph.width} 1024`} style={{ width: `${glyph.width / 1024}em`, height: '1em' }} fill="currentColor" aria-hidden="true" focusable="false">
        <path transform="translate(0 960) scale(1 -1)" d={glyph.d} />
      </svg>
      {showLabel ? <span className="ds-tech-label">{glyph.label}</span> : <span className="ds-sr-only">{glyph.label}</span>}
    </span>
  );
}
