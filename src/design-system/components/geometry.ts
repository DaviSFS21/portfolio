// Vector geometry taken from the original Illustrator files (Logos.ai and Logo-Horizontal.ai).

export type LogoKind = 'monogram' | 'signature';

export interface Piece { id: string; d: string; fillRule?: 'evenodd' }
export type GuideLine = [number, number, number, number]; // any two points on the line

export interface LogoGeometry {
  viewBox: string;
  center: [number, number];
  aspectRatio: string;
  pieces: Piece[];
  guides: GuideLine[];
  timing: { guideStagger: number; outlineStagger: number; fillDuration: number };
}

export const GEOMETRY: Record<LogoKind, LogoGeometry> = {
  monogram: {
    viewBox: '100 100 800 800',
    center: [500, 500],
    aspectRatio: '1 / 1',
    pieces: [
      { id: 'bar-left', d: 'M235.785 752.070L125.785 862.066V125.449H235.785Z' },
      { id: 'bar-right', d: 'M764.891 247.930L874.891 137.934V874.551H764.891Z' },
      { id: 'diagonal', d: 'M138.270 874.551H293.828L642.410 525.973V874.551H752.406V260.414Z' },
      { id: 'wing', d: 'M706.844 125.449L576.461 255.836L627.234 306.313C638.164 317.180 643.012 331.844 641.773 346.078L862.402 125.449Z' },
      { id: 'd', d: 'M610.191 306.828L442.355 139.973C432.996 130.672 420.340 125.449 407.145 125.449H248.270V235.445H362.441C375.688 235.445 388.391 240.707 397.754 250.074L454.676 306.992C474.176 326.496 474.176 358.117 454.676 377.621L235.785 596.512V752.070L610.297 377.555C629.840 358.012 629.793 326.313 610.191 306.828Z' },
      { id: 'glow', d: 'M124.891 707.406L125.785 862.066L518.078 469.773L440.301 391.992Z' }
    ],
    guides: [
      [125.8, 0, 125.8, 1], [235.8, 0, 235.8, 1], [752.4, 0, 752.4, 1], [874.9, 0, 874.9, 1],
      [0, 125.4, 1, 125.4], [0, 874.6, 1, 874.6],
      [0, 1012.9, 1012.9, 0], // main diagonal
      [0, 832.3, 832.3, 0]    // inner diagonal of the D, collinear with the wing's edge
    ],
    timing: { guideStagger: 60, outlineStagger: 110, fillDuration: 1000 }
  },
  signature: {
    viewBox: '180 100 1640 800',
    center: [1000, 500],
    aspectRatio: '1640 / 800',
    pieces: [
      { id: 'D', fillRule: 'evenodd', d: 'M204.56 123.45H492.36C505.86 123.45 518.81 128.79 528.38 138.30L700.06 308.98C720.11 328.91 720.16 361.34 700.17 381.33L317.08 764.42L204.56 876.94L203.64 718.73L204.56 717.82ZM317.08 235.96H446.64C460.18 235.96 473.18 241.35 482.76 250.93L540.98 309.15C560.93 329.10 560.93 361.45 540.98 381.39L317.08 605.30Z' },
      { id: 'A', d: 'M236.37 876.94H427.23L854.91 449.26V876.94H989.86V123.45Z' },
      { id: 'V', d: 'M1008.38 126.00H1120.64V606.76L1601.40 126.00H1760.16L1008.38 877.79Z' },
      { id: 'I', d: 'M1684.09 234.87L1796.36 122.61V874.39H1684.09Z' }
    ],
    guides: [
      [0, 123.45, 1, 123.45], [0, 235.96, 1, 235.96], [0, 605.30, 1, 605.30], [0, 876.94, 1, 876.94],
      [204.56, 0, 204.56, 1], [317.08, 0, 317.08, 1], [989.86, 0, 989.86, 1], [1120.64, 0, 1120.64, 1], [1684.09, 0, 1684.09, 1], [1796.36, 0, 1796.36, 1],
      [0, 922.4, 922.4, 0], [0, 1113.3, 1113.3, 0], [0, 1727.4, 1727.4, 0], [0, 1886.2, 1886.2, 0],
      [0, -390.1, 390.1, 0]   // 45° chamfer of the D
    ],
    timing: { guideStagger: 45, outlineStagger: 140, fillDuration: 1200 }
  }
};
