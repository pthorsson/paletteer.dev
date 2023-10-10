import { writable } from 'svelte/store';
import { setRootCSSVariable } from '../lib/setRootCSSVariable';

export const MIN_SHADES = 9;
export const MAX_SHADES = 15;
export const SHADES_STEP = 2;

export const shades = writable(MIN_SHADES);

shades.subscribe((value) => void setRootCSSVariable('--shades', String(value)));
