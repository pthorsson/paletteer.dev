import { get } from 'svelte/store';
import debounce from 'lodash/debounce';
import { colors } from '$stores/colors';

export const updateLocationHash = debounce(() => {
  const __colors = get(colors);

  const hash = Object.entries(__colors)
    .map(
      ([key, value]) => `${key.replace(/^_/, '')}:${value.replace(/^#/, '')}`
    )
    .join(',');

  history.replaceState(null, '', `#${hash}`);
}, 500);
