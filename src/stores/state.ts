import { writable } from 'svelte/store';
import { makeFaviconData } from '$lib/makeFaviconData';
import { black, white } from './colors';

export const menuItem = writable<string | null>(null);

export const favicon = writable(makeFaviconData());

black.subscribe((value) => void favicon.set(makeFaviconData({ black: value })));
white.subscribe((value) => void favicon.set(makeFaviconData({ white: value })));
