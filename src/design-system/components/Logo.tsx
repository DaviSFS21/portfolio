import React, { useRef } from './react';
import { GEOMETRY } from './geometry';
import type { LogoKind } from './geometry';
import type { LogoVariant } from './animateLogo';

export interface LogoProps {
  /** Default: 'monogram'. */
  logo?: LogoKind;
  /** 'color' (monogram only) and 'ink' follow the theme through --ink; 'white' and 'black' are fixed. Default: 'color' for the monogram, 'ink' for the signature. */
  variant?: LogoVariant;
  /** Accessible name. Pass '' when the logo is decorative. */
  label?: string;
  className?: string;
  style?: Record<string, string | number>;
}

const TIGHT_VIEWBOX: Record<LogoKind, string> = { monogram: '122 122 756 756', signature: '200 120 1600 760' };
let logoCount = 0;

/** Static logo drawn inline, so it follows the theme (white on dark, black on light) without swapping files. */
export function Logo({ logo = 'monogram', variant, label, className, style }: LogoProps) {
  const idRef = useRef<string>('');
  if (!idRef.current) idRef.current = 'ds-mark-' + ++logoCount;
  const id = idRef.current;
  const G = GEOMETRY[logo];
  let v: LogoVariant = variant || (logo === 'monogram' ? 'color' : 'ink');
  if (logo === 'signature' && v === 'color') v = 'ink';
  const ink = v === 'white' ? '#ffffff' : v === 'black' ? '#1a1a1a' : 'var(--ink, #ffffff)';
  const primary = 'var(--color-primary, #3600ff)', secondary = 'var(--color-secondary, #7c00ff)';
  const fills: Record<string, string> = v === 'color'
    ? { 'bar-left': primary, 'bar-right': ink, diagonal: `url(#${id}-a)`, wing: `url(#${id}-b)`, d: ink, glow: `url(#${id}-g)` }
    : {};
  const name = label != null ? label : logo === 'monogram' ? 'Monograma de Davi Soares' : 'Assinatura de Davi Soares';
  return (
    <svg
      className={'ds-logo' + (className ? ' ' + className : '')}
      viewBox={TIGHT_VIEWBOX[logo]}
      style={style}
      role={name ? 'img' : undefined}
      aria-label={name || undefined}
      aria-hidden={name ? undefined : true}
      focusable="false"
    >
      {v === 'color' && (
        <defs>
          <linearGradient id={`${id}-a`} gradientUnits="userSpaceOnUse" x1="905.9" y1="413.9" x2="291.8" y2="1028.1">
            <stop offset="0" style={{ stopColor: primary }} /><stop offset=".55" style={{ stopColor: primary }} /><stop offset=".93" style={{ stopColor: secondary }} />
          </linearGradient>
          <linearGradient id={`${id}-b`} gradientUnits="userSpaceOnUse" x1="570.2" y1="339.8" x2="823.5" y2="86.5">
            <stop offset="0" style={{ stopColor: primary }} /><stop offset=".23" style={{ stopColor: primary }} /><stop offset=".88" style={{ stopColor: secondary }} />
          </linearGradient>
          <linearGradient id={`${id}-g`} gradientUnits="userSpaceOnUse" x1="86.4" y1="823.7" x2="518.1" y2="392">
            <stop offset="0" style={{ stopColor: primary }} /><stop offset=".47" style={{ stopColor: primary }} /><stop offset=".88" style={{ stopColor: ink }} />
          </linearGradient>
        </defs>
      )}
      {G.pieces.map(p => (
        <path key={p.id} d={p.d} fillRule={p.fillRule} style={{ fill: fills[p.id] || ink }} />
      ))}
    </svg>
  );
}
