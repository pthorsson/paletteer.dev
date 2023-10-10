export function setRootCSSVariable(key: string, value: string) {
  const root = document.querySelector<HTMLElement>(':root');
  root?.style.setProperty(key, value);
}
