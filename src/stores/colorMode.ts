import { derived } from 'svelte/store';
import { darkMode } from './state';
import { colors } from './colors';

export const colorMode = derived([darkMode, colors], ([$darkMode, $colors]) =>
  $darkMode
    ? { bg: $colors._black, fg: $colors._white }
    : { bg: $colors._white, fg: $colors._black }
);
