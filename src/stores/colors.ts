import { writable } from 'svelte/store';
import { parseLocationHash } from '$lib/parseLocationHash';
import { getKeyColorRange } from '$lib/getKeyColorRange';
import { getFunctionalColorRange } from '$lib/getFunctionalColorRange';
import { makePalette } from '$lib/makePalette';

export type Colors = { [name: string]: string };
export type Palette = {
  [name: string]: (readonly [string, string | null])[];
};

const hashColors = parseLocationHash(location.hash);

const initialColors: Colors = {
  _white: hashColors.white || '#ececff',
  _black: hashColors.black || '#0b0921',
  red: hashColors.red || '#d73951',
  orange: hashColors.orange || '#d67738',
  yellow: hashColors.yellow || '#e6b44a',
  green: hashColors.green || '#47a972',
  cyan: hashColors.cyan || '#29bedb',
  blue: hashColors.blue || '#2971dc',
  purple: hashColors.purple || '#8e29db',
};

const initialPalette = makePalette(initialColors);

export const colors = writable<Colors>(initialColors);
export const palette = writable<Palette>(initialPalette);

// Update palette whenever colors updates.
colors.subscribe((colors) => {
  const { _white, _black, ...functionalColors } = colors;

  const updatedPalette: Palette = {
    key: getKeyColorRange(_white, _black),
  };

  for (const [name, value] of Object.entries(functionalColors)) {
    const colorRange = getFunctionalColorRange(value, _white, _black);

    updatedPalette[name] = colorRange;
  }

  palette.set(updatedPalette);
});
