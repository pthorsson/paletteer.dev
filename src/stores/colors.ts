import { writable } from 'svelte/store';
import { setRootCSSVariable } from '$lib/setRootCSSVariable';
import { favicon } from './state';
import { makeFaviconData } from '$lib/makeFaviconData';

export const white = writable('#fffef5');
export const black = writable('#0f0b17');

white.subscribe((value) => {
  favicon.set(makeFaviconData({ white: value }));
  setRootCSSVariable('--fg', value);
});

black.subscribe((value) => {
  favicon.set(makeFaviconData({ black: value }));
  setRootCSSVariable('--bg', value);
});
