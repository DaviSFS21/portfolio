import { useRef } from 'react';
import { AnimatedLogo } from '../../design-system/components/AnimatedLogo';

interface LogoReplayProps {
  caption?: string;
}

/** The monogram building itself on a dark stage; mouse over or tap replays it. Hydrated when it scrolls into view. */
export function LogoReplay({ caption }: LogoReplayProps) {
  const stage = useRef<HTMLDivElement>(null);
  return (
    <figure className="ds-figure ds-figure--text">
      <div ref={stage} className="ds-stage" style={{ aspectRatio: '21 / 9' }}>
        <div style={{ width: '34%' }}>
          <AnimatedLogo logo="monogram" variant="color" boundsRef={stage} />
        </div>
      </div>
      {caption && <figcaption className="ds-caption-text">{caption}</figcaption>}
    </figure>
  );
}
