export function hexToRgb(hex: string): [number, number, number] {
  const bigint = parseInt(hex.replace('#', ''), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

export function srgbToHex(srgb: string) {
  const [r, g, b] = srgb
    .replace('color(srgb ', '')
    .replace(')', '')
    .split(' ')
    .map((v) =>
      Math.round(255 * Number(v))
        .toString(16)
        .padStart(2, '0')
    );

  return `#${r}${g}${b}`;
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

export function getSampleColors(wrapper: HTMLDivElement, selector: string) {
  if (!wrapper) return [];

  const colors: string[] = [];

  wrapper.querySelectorAll(selector).forEach((el) => {
    const color = getComputedStyle(el).backgroundColor;
    colors.push(srgbToHex(color));
  });

  return colors;
}
