import type { Colors, Palette } from '$stores/colors';
import { getFunctionalColorRange } from '$lib/getFunctionalColorRange';
import { getKeyColorRange } from '$lib/getKeyColorRange';

export function makePalette(colors: Colors) {
  const { _white, _black, ...functionalColors } = colors;

  const palette: Palette = {
    key: getKeyColorRange(_white, _black),
  };

  for (const [name, value] of Object.entries(functionalColors)) {
    const colorRange = getFunctionalColorRange(value, _white, _black);

    palette[name] = colorRange;
  }

  return palette;
}
