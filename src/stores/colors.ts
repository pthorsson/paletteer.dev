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
  primary: hashColors.primary || '#6fb2d5',
  info: hashColors.info || '#2971dc',
  green: hashColors.success || '#47a972',
  red: hashColors.error || '#d73951',
  yellow: hashColors.warning || '#e6b44a',
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
