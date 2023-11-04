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
