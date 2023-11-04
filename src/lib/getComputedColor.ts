import { srgbToHex } from '$lib/color-utils';

type ColorMix = {
  value: string;
  mix?: number | null;
};

export function getComputedColorMix(colorMix: ColorMix[]) {
  const el = document.getElementById('color-sample-element');

  if (el) {
    const colorMixStr = colorMix
      .map(({ value, mix = null }) =>
        `${value} ${mix !== null ? mix + '%' : ''}`.trim()
      )
      .join(', ');

    el.style.color = `color-mix(in srgb, ${colorMixStr}`;

    const srgbColor = getComputedStyle(el).getPropertyValue('color');
    const hexColor = srgbToHex(srgbColor);

    return hexColor;
  }

  return null;
}
