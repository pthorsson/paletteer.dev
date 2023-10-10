import { writable } from 'svelte/store';

export const menuItem = writable<string | null>(null);
