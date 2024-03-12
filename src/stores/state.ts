import { writable } from 'svelte/store';
import { makeFaviconData } from '$lib/makeFaviconData';

const initDarkMode =
  sessionStorage.getItem('darkMode') === 'false' ? false : true;

export const darkMode = writable(initDarkMode);
export const showExportModal = writable(false);
export const favicon = writable(makeFaviconData());
