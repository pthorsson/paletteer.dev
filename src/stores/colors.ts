import { writable } from 'svelte/store';
import { setRootCSSVariable } from '$lib/setRootCSSVariable';
import { favicon } from './state';
import { makeFaviconData } from '$lib/makeFaviconData';

type KeyColors = {
  white: string;
  black: string;
};

type FunctionalColor = {
  name: string;
  value: string;
};

// All colors in one state?

export const keyColors = writable<KeyColors>({
  white: '#fffef5',
  black: '#0f0b17',
});

export const functionalColors = writable<FunctionalColor[]>([
  {
    name: 'Info',
    value: '#2971dc',
  },
  {
    name: 'Success',
    value: '#47a972',
  },
  {
    name: 'Error',
    value: '#d73951',
  },
  {
    name: 'Warning',
    value: '#e6b44a',
  },
]);

export const colorPalette = writable<{
  [name: string]: [string, string][];
}>({});

colorPalette.subscribe((palette) => {
  console.clear();
  console.log(JSON.stringify(palette, null, 2));
});

keyColors.subscribe(({ white, black }) => {
  favicon.set(makeFaviconData({ white, black }));
  setRootCSSVariable('--fg', white);
  setRootCSSVariable('--bg', black);
});
