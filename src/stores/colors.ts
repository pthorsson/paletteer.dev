import { writable } from 'svelte/store';
import { setRootCSSVariable } from '../lib/setRootCSSVariable';

export const white = writable('#e8f1fb');
export const black = writable('#091726');

white.subscribe((value) => {
  setRootCSSVariable('--fg', value);
});

black.subscribe((value) => {
  setRootCSSVariable('--bg', value);
});
