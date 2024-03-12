const cache = {
  bg: '#000000',
  fg: '#ffffff',
};

export function makeFaviconData(params: { fg?: string; bg?: string } = {}) {
  cache.fg = params.fg ?? cache.fg;
  cache.bg = params.bg ?? cache.bg;

  return (
    'data:image/svg+xml,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" fill="none">
        <circle fill="${cache.bg}" cx="64" cy="64" r="64"/>
        <path fill="${cache.fg}" fill-rule="evenodd" d="M30.059 97.941A48 48 0 0 0 64 112a6.929 6.929 0 0 0 6.967-4.089A6.933 6.933 0 0 0 69.333 100a10.667 10.667 0 0 1 5.334-20H88c6.363 0 12.469-2.25 16.971-6.25 4.501-4 7.029-9.43 7.029-15.083C112 35.104 90.507 16 64 16a48 48 0 0 0-33.941 81.941Zm8.284-37.284a8 8 0 1 1 11.315-11.314 8 8 0 0 1-11.315 11.314ZM76 55a8 8 0 1 0 16.001 0A8 8 0 0 0 76 55Zm-17.657-9.343a8 8 0 1 1 11.315-11.314 8 8 0 0 1-11.315 11.314Z" />
      </svg>`
    )
  );
}
