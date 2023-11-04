import type { Colors } from '$stores/colors';

export function parseLocationHash(hash: string) {
  const colors: Colors = {};
  const parts = hash.substring(1).split(/\s*,\s*/);

  for (const part of parts) {
    if (/^[a-z]+:[a-f0-9]{6}$/.test(part)) {
      const [name, color] = part.split(':');
      colors[name] = `#${color}`;
    }
  }

  return colors;
}
