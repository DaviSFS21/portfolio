// "Projeto" logo animation: construction guides -> outlines -> 45° color sweep, and the reverse.
// Framework-free: draws an SVG inside `target` and drives it with requestAnimationFrame.
import { GEOMETRY } from './geometry';
import type { LogoKind } from './geometry';

const SVG_NS = 'http://www.w3.org/2000/svg';
const K = Math.SQRT1_2;
let instanceCount = 0;

export type LogoVariant = 'color' | 'ink' | 'white' | 'black';

export interface AnimateLogoOptions {
  /** Which mark to draw. Default: 'monogram'. */
  logo?: LogoKind;
  /** 'color' exists only for the monogram. 'ink' follows the theme (--ink); 'white' and 'black' are fixed. */
  variant?: LogoVariant;
  /** Element whose edges the guides extend to. Needs overflow: hidden. Default: the target. */
  bounds?: Element | null;
  /** Guide color. Default: var(--color-secondary). Use '#ffffff' over gradient-*. */
  guideColor?: string;
  /** Guide opacity. Default: 0.75. Use 0.38 over gradient-*. */
  guideOpacity?: number;
  /** Outline color. Default: the pieces' ink. */
  strokeColor?: string;
  /** Build when mounted (default true). With false the logo appears assembled. */
  entrance?: boolean;
  /** Entrance delay in ms. Default: 250. */
  delay?: number;
  /** Mouse over or tap unbuilds and rebuilds. Default: true. */
  replayOnInteraction?: boolean;
  /** Continuous loop (build -> hold 1.7s -> unbuild). Only for video and presentations. Default: false. */
  loop?: boolean;
  /** Accessible name. Pass '' to hide the SVG from assistive tech when a text title sits next to it. */
  label?: string;
  /** Called when the build finishes (outside loop mode). */
  onBuilt?: () => void;
}

export interface LogoController {
  build(): void;
  unbuild(): void;
  replay(): void;
  show(): void;
  destroy(): void;
  svg: SVGSVGElement;
}

const COLOR = {
  primary: 'var(--color-primary, #3600ff)',
  secondary: 'var(--color-secondary, #7c00ff)',
  ink: 'var(--ink, #ffffff)',
  white: '#ffffff',
  black: '#1a1a1a'
};

/* ---------- easing ---------- */
function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const sx = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sy = (t: number) => ((ay * t + by) * t + cy) * t;
  const dx = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i++) {
      const e = sx(t) - x;
      if (Math.abs(e) < 1e-6) return sy(t);
      const d = dx(t);
      if (Math.abs(d) < 1e-6) break;
      t -= e / d;
    }
    let lo = 0, hi = 1;
    t = x;
    for (let i = 0; i < 40; i++) {
      const v = sx(t);
      if (Math.abs(v - x) < 1e-6) break;
      if (v < x) lo = t; else hi = t;
      t = (lo + hi) / 2;
    }
    return sy(t);
  };
}
type Ease = (t: number) => number;
const EASE: Record<'linear' | 'draw' | 'guide' | 'retract', Ease> = {
  linear: t => t,
  draw: cubicBezier(0.65, 0, 0.35, 1),     // ease-draw
  guide: cubicBezier(0.33, 1, 0.68, 1),    // ease-guide
  retract: cubicBezier(0.32, 0, 0.67, 0)   // ease-retract
};
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

class Timeline {
  private tweens: Array<[number, number, Ease, (p: number) => void]> = [];
  duration = 0;
  add(start: number, duration: number, ease: Ease, apply: (p: number) => void) {
    this.tweens.push([start, duration, ease, apply]);
    this.duration = Math.max(this.duration, start + duration);
  }
  at(t: number) {
    for (const [start, duration, ease, apply] of this.tweens) apply(ease(clamp01((t - start) / duration)));
  }
}

function el<K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string | number> = {}) {
  const node = document.createElementNS(SVG_NS, tag);
  for (const k in attrs) node.setAttribute(k, String(attrs[k]));
  return node;
}
const prefersReducedMotion = () => !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

export function animateLogo(target: Element, options: AnimateLogoOptions = {}): LogoController {
  if (!target) throw new Error('animateLogo: pass the element the logo will be drawn into.');
  const kind: LogoKind = options.logo === 'signature' ? 'signature' : 'monogram';
  const G = GEOMETRY[kind];
  let variant: LogoVariant = options.variant || (kind === 'monogram' ? 'color' : 'ink');
  if (kind === 'signature' && variant === 'color') variant = 'ink'; // the signature is never in color
  const bounds = options.bounds || target;
  const reduced = prefersReducedMotion();
  const [cx, cy] = G.center;
  const id = 'ds-logo-' + ++instanceCount;

  const pieceInk = variant === 'white' ? COLOR.white : variant === 'black' ? COLOR.black : COLOR.ink;
  const strokeColor = options.strokeColor || pieceInk;
  const guideColor = options.guideColor || COLOR.secondary;
  const guideOpacity = options.guideOpacity != null ? options.guideOpacity : 0.75;

  const label = options.label != null ? options.label : kind === 'monogram' ? 'Monograma de Davi Soares' : 'Assinatura de Davi Soares';
  const svg = el('svg', { viewBox: G.viewBox });
  if (label) { svg.setAttribute('role', 'img'); svg.setAttribute('aria-label', label); }
  else svg.setAttribute('aria-hidden', 'true');
  svg.style.cssText = 'display:block;width:100%;height:auto;overflow:visible;aspect-ratio:' + G.aspectRatio;

  const defs = el('defs');
  const gradientStop = (offset: string, color: string) => `<stop offset="${offset}" style="stop-color:${color}"/>`;
  defs.innerHTML =
    `<clipPath id="${id}-sweep"><rect transform="rotate(-45 ${cx} ${cy})" y="-6000" height="13000"/></clipPath>` +
    `<linearGradient id="${id}-a" gradientUnits="userSpaceOnUse" x1="905.9" y1="413.9" x2="291.8" y2="1028.1">${gradientStop('0', COLOR.primary)}${gradientStop('.55', COLOR.primary)}${gradientStop('.93', COLOR.secondary)}</linearGradient>` +
    `<linearGradient id="${id}-b" gradientUnits="userSpaceOnUse" x1="570.2" y1="339.8" x2="823.5" y2="86.5">${gradientStop('0', COLOR.primary)}${gradientStop('.23', COLOR.primary)}${gradientStop('.88', COLOR.secondary)}</linearGradient>` +
    `<linearGradient id="${id}-g" gradientUnits="userSpaceOnUse" x1="86.4" y1="823.7" x2="518.1" y2="392">${gradientStop('0', COLOR.primary)}${gradientStop('.47', COLOR.primary)}${gradientStop('.88', COLOR.ink)}</linearGradient>`;
  svg.appendChild(defs);
  const sweepRect = defs.querySelector('rect') as SVGRectElement;

  const fillFor = (pieceId: string) => {
    if (variant !== 'color') return pieceInk;
    const map: Record<string, string> = {
      'bar-left': COLOR.primary, 'bar-right': COLOR.ink, diagonal: `url(#${id}-a)`,
      wing: `url(#${id}-b)`, d: COLOR.ink, glow: `url(#${id}-g)`
    };
    return map[pieceId];
  };

  // 1) Guides: each construction line becomes two rays born at the point closest to the logo center.
  const guidesGroup = el('g', { fill: 'none', 'stroke-linecap': 'round' });
  guidesGroup.style.stroke = guideColor;
  const guides = G.guides.map(([x1, y1, x2, y2]) => {
    const len = Math.hypot(x2 - x1, y2 - y1);
    const dir: [number, number] = [(x2 - x1) / len, (y2 - y1) / len];
    const t = (cx - x1) * dir[0] + (cy - y1) * dir[1];
    const anchor: [number, number] = [x1 + dir[0] * t, y1 + dir[1] * t];
    const rays = [dir, [-dir[0], -dir[1]] as [number, number]].map(d => {
      const line = el('line', { x1: anchor[0], y1: anchor[1], x2: anchor[0], y2: anchor[1] });
      guidesGroup.appendChild(line);
      return { line, dir: d, length: 1 };
    });
    return { anchor, rays, offset: 1, opacity: 0 }; // offset: 1 hidden, 0 drawn, -1 retracted
  });

  // 2) Fill, revealed by a 45° sweep.
  const fillGroup = el('g', { 'clip-path': `url(#${id}-sweep)` });
  for (const piece of G.pieces) {
    const path = el('path', { d: piece.d, 'data-piece': piece.id });
    if (piece.fillRule) path.setAttribute('fill-rule', piece.fillRule);
    path.style.fill = fillFor(piece.id);
    fillGroup.appendChild(path);
  }

  // 3) Outlines.
  const outlineGroup = el('g', { fill: 'none', 'stroke-linejoin': 'round' });
  outlineGroup.style.stroke = strokeColor;
  const outlines = G.pieces.map(piece => {
    const path = el('path', { d: piece.d });
    outlineGroup.appendChild(path);
    return { path, length: 1, offset: 0, opacity: 0 };
  });

  svg.append(guidesGroup, fillGroup, outlineGroup);
  target.appendChild(svg);

  for (const o of outlines) {
    o.length = o.path.getTotalLength() + 1;
    o.path.setAttribute('stroke-dasharray', `${o.length} ${o.length}`);
  }
  // Sweep range: the logo projected onto the 45° axis (local x of the rotated clip rect).
  let lo = Infinity, hi = -Infinity;
  fillGroup.querySelectorAll('path').forEach(p => {
    const b = (p as SVGPathElement).getBBox();
    for (const [x, y] of [[b.x, b.y], [b.x + b.width, b.y], [b.x, b.y + b.height], [b.x + b.width, b.y + b.height]]) {
      const u = cx + (x - cx) * K - (y - cy) * K;
      lo = Math.min(lo, u);
      hi = Math.max(hi, u);
    }
  });
  lo -= 12;
  hi += 12;

  // Guides run to the edges of `bounds`; strokes keep a constant on-screen width.
  function layout() {
    const m = svg.getScreenCTM();
    if (!m) return;
    const inv = m.inverse();
    const r = bounds.getBoundingClientRect();
    const pts = [[r.left, r.top], [r.right, r.top], [r.left, r.bottom], [r.right, r.bottom]].map(([x, y]) => new DOMPoint(x, y).matrixTransform(inv));
    const xs = pts.map(p => p.x), ys = pts.map(p => p.y);
    const bx0 = Math.min(...xs), bx1 = Math.max(...xs), by0 = Math.min(...ys), by1 = Math.max(...ys);
    for (const g of guides) {
      for (const ray of g.rays) {
        const [dx, dy] = ray.dir, [ax, ay] = g.anchor;
        const tx = dx > 1e-9 ? (bx1 - ax) / dx : dx < -1e-9 ? (bx0 - ax) / dx : Infinity;
        const ty = dy > 1e-9 ? (by1 - ay) / dy : dy < -1e-9 ? (by0 - ay) / dy : Infinity;
        const t = Math.max(0, Math.min(tx, ty)) + 20;
        ray.line.setAttribute('x2', (ax + dx * t).toFixed(1));
        ray.line.setAttribute('y2', (ay + dy * t).toFixed(1));
        ray.length = t + 1;
        ray.line.setAttribute('stroke-dasharray', `${ray.length} ${ray.length}`);
      }
    }
    const scale = m.a || 1;
    outlineGroup.setAttribute('stroke-width', (1.5 / scale).toFixed(3));
    guidesGroup.setAttribute('stroke-width', (1 / scale).toFixed(3));
    draw();
  }

  /* ---------- timelines (duration-*, ease-* tokens) ---------- */
  const sweep = { mode: 'idle' as 'idle' | 'in' | 'out', p: 0 };
  const GS = G.timing.guideStagger, OS = G.timing.outlineStagger, FILL_START = 1500, FD = G.timing.fillDuration;
  const guidesFadeAt = FILL_START + FD * 0.65, outlinesFadeAt = FILL_START + FD * 0.75;
  const buildTl = new Timeline(), unbuildTl = new Timeline();
  guides.forEach((g, i) => {
    buildTl.add(i * GS, 700, EASE.guide, p => { g.offset = 1 - p; });
    buildTl.add(guidesFadeAt, 600, EASE.linear, p => { g.opacity = 1 - p; });
  });
  outlines.forEach((o, i) => {
    buildTl.add(350 + i * OS, 1000, EASE.draw, p => { o.offset = 1 - p; });
    buildTl.add(outlinesFadeAt, 500, EASE.linear, p => { o.opacity = 1 - p; });
  });
  buildTl.add(FILL_START, FD, EASE.draw, p => { sweep.mode = 'in'; sweep.p = p; });

  const drainEnd = 300 + FD, guidesRetractAt = drainEnd + 450, GR = Math.round(GS * 0.8);
  guides.forEach((g, i) => {
    unbuildTl.add(0, 400, EASE.linear, p => { g.opacity = p; });
    unbuildTl.add(guidesRetractAt + i * GR, 600, EASE.retract, p => { g.offset = -p; });
  });
  outlines.forEach((o, i) => {
    unbuildTl.add(0, 400, EASE.linear, p => { o.opacity = p; });
    unbuildTl.add(drainEnd + i * OS, 800, EASE.draw, p => { o.offset = -p; });
  });
  unbuildTl.add(300, FD, EASE.draw, p => { sweep.mode = 'out'; sweep.p = p; });

  function resetState() {
    for (const g of guides) { g.offset = 1; g.opacity = 0; }
    for (const o of outlines) { o.offset = 0; o.opacity = 0; }
    sweep.mode = 'idle';
    sweep.p = 0;
  }
  function paint() {
    for (const g of guides) {
      for (const ray of g.rays) {
        ray.line.setAttribute('stroke-dashoffset', (g.offset * ray.length).toFixed(2));
        ray.line.style.opacity = (g.opacity * guideOpacity).toFixed(3);
      }
    }
    for (const o of outlines) {
      o.path.setAttribute('stroke-dashoffset', (o.offset * o.length).toFixed(2));
      o.path.style.opacity = o.opacity.toFixed(3);
    }
    let a = -9000, b = 9000;
    if (sweep.mode === 'in') b = lerp(lo, hi, sweep.p);
    else if (sweep.mode === 'out') a = lerp(lo, hi, sweep.p);
    sweepRect.setAttribute('x', a.toFixed(2));
    sweepRect.setAttribute('width', Math.max(0, b - a).toFixed(2));
  }

  /* ---------- player ---------- */
  type Phase = 'hidden' | 'building' | 'holding' | 'built' | 'unbuilding' | 'pause' | 'empty';
  const HOLD = 1700, PAUSE = 300, LOOP_PAUSE = 600;
  const state = { phase: 'built' as Phase, t: 0, raf: 0, last: 0, loop: !!options.loop && !reduced, end: 'built' as 'built' | 'empty' };

  function draw() {
    resetState();
    if (state.phase === 'hidden') buildTl.at(0);
    else if (state.phase === 'building') buildTl.at(state.t);
    else if (state.phase === 'unbuilding') unbuildTl.at(state.t);
    else if (state.phase === 'pause' || state.phase === 'empty') unbuildTl.at(unbuildTl.duration);
    else buildTl.at(buildTl.duration);
    paint();
  }
  function step(now: number) {
    state.t += Math.min(64, now - state.last);
    state.last = now;
    if (state.phase === 'building' && state.t >= buildTl.duration) {
      state.phase = state.loop ? 'holding' : 'built';
      state.t = 0;
      if (!state.loop && options.onBuilt) options.onBuilt();
    } else if (state.phase === 'holding' && state.t >= HOLD) {
      state.phase = 'unbuilding'; state.t = 0;
    } else if (state.phase === 'unbuilding' && state.t >= unbuildTl.duration) {
      state.phase = 'pause'; state.t = 0;
    } else if (state.phase === 'pause' && state.t >= (state.loop ? LOOP_PAUSE : PAUSE)) {
      state.phase = state.end === 'empty' && !state.loop ? 'empty' : 'building';
      state.t = 0;
    }
    draw();
    state.raf = state.phase === 'built' || state.phase === 'empty' ? 0 : requestAnimationFrame(step); // stop the loop when idle
  }
  function play(phase: Phase, end: 'built' | 'empty' = 'built') {
    state.phase = phase; state.t = 0; state.end = end;
    draw();
    if (!state.raf) { state.last = performance.now(); state.raf = requestAnimationFrame(step); }
  }
  const busy = () => state.phase !== 'built' && state.phase !== 'empty';
  const stop = () => { if (state.raf) { cancelAnimationFrame(state.raf); state.raf = 0; } };

  const onEnter = (e: Event) => { if ((e as PointerEvent).pointerType === 'mouse' && !reduced) controller.replay(); };
  const onClick = () => controller.replay();
  let resizeObserver: ResizeObserver | null = null;
  let entranceTimer = 0;

  const controller: LogoController = {
    build() { stop(); play('building'); },
    unbuild() { if (!busy()) play('unbuilding', 'empty'); },
    replay() { if (!busy()) play('unbuilding'); },
    show() { stop(); state.phase = 'built'; draw(); },
    destroy() {
      stop();
      clearTimeout(entranceTimer);
      if (resizeObserver) resizeObserver.disconnect(); else window.removeEventListener('resize', layout);
      target.removeEventListener('pointerenter', onEnter);
      target.removeEventListener('click', onClick);
      svg.remove();
    },
    svg
  };

  if (options.replayOnInteraction !== false) {
    target.addEventListener('pointerenter', onEnter);
    target.addEventListener('click', onClick);
  }
  if (typeof ResizeObserver !== 'undefined') { resizeObserver = new ResizeObserver(layout); resizeObserver.observe(bounds); }
  else window.addEventListener('resize', layout);
  layout();

  if (reduced || options.entrance === false) { state.phase = 'built'; draw(); }
  else {
    state.phase = 'hidden';
    draw();
    entranceTimer = window.setTimeout(() => play('building'), options.delay != null ? options.delay : 250);
  }
  return controller;
}
