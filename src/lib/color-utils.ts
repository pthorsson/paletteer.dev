export function hexToRgb(hex: string): [number, number, number] {
  const bigint = parseInt(hex.replace('#', ''), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

export function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export const hwbFullHue = (
  whiteness: number | string,
  blackness: number | string
) => `linear-gradient(
  to right,
  hwb(0 ${whiteness}% ${blackness}%),
  hwb(60 ${whiteness}% ${blackness}%),
  hwb(120 ${whiteness}% ${blackness}%),
  hwb(180 ${whiteness}% ${blackness}%),
  hwb(240 ${whiteness}% ${blackness}%),
  hwb(300 ${whiteness}% ${blackness}%),
  hwb(360 ${whiteness}% ${blackness}%)
)`;

export const hslFullGradient = `linear-gradient(
  to right,
  hsl(0, 100%, 50%),
  hsl(60, 100%, 50%),
  hsl(120, 100%, 50%),
  hsl(180, 100%, 50%),
  hsl(240, 100%, 50%),
  hsl(300, 100%, 50%),
  hsl(360, 100%, 50%)
)`;

export const hslSaturationGradient = (hslDeg: number) => `linear-gradient(
  to right,
  hsl(${hslDeg}, 0%, 50%),
  hsl(${hslDeg}, 100%, 50%)
)`;
