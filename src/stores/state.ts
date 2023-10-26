import { writable } from 'svelte/store';
import { makeFaviconData } from '$lib/makeFaviconData';

export const showExportModal = writable(false);
export const menuItem = writable<string | null>(null);
export const favicon = writable(makeFaviconData());
