import { writable } from 'svelte/store';

export const white = writable('#fdfdfd');
export const black = writable('#070707');

white.subscribe((value) => {
  setRootCSSVariable('--fg', value);
});

black.subscribe((value) => {
  setRootCSSVariable('--bg', value);
});

function setRootCSSVariable(key: string, value: string) {
  const root = document.querySelector<HTMLElement>(':root');
  root?.style.setProperty(key, value);
}
