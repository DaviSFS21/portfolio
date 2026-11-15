import React, { useEffect, useRef } from './react';
import { animateLogo } from './animateLogo';
import type { AnimateLogoOptions, LogoController } from './animateLogo';

export interface AnimatedLogoProps extends Omit<AnimateLogoOptions, 'bounds'> {
  /** Ref to the element whose edges the guides run to (needs overflow: hidden). Default: the logo's own box. */
  boundsRef?: { current: Element | null };
  /** Receives the controller (build, unbuild, replay, show) once mounted. */
  onReady?: (controller: LogoController) => void;
  className?: string;
  style?: Record<string, string | number>;
}

/** Monogram or signature building itself in the "Projeto" style. Fills the width of its container. */
export function AnimatedLogo({ boundsRef, onReady, className, style, ...options }: AnimatedLogoProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!hostRef.current) return;
    const controller = animateLogo(hostRef.current, { ...options, bounds: boundsRef ? boundsRef.current : null });
    if (onReady) onReady(controller);
    return () => controller.destroy();
    // Rebuild only when the mark itself changes; callbacks and refs are read once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.logo, options.variant, options.loop, options.guideColor, options.guideOpacity, options.strokeColor]);
  return <div ref={hostRef} className={'ds-animated-logo' + (className ? ' ' + className : '')} style={style} />;
}
