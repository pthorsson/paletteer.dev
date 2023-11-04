import { getComputedColorMix } from '$lib/getComputedColor';

export function getKeyColorRange(white: string, black: string) {
  const keyShades = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  const keyColorRange = keyShades.map((shade) => {
    const color = getComputedColorMix([
      { value: white },
      { value: black, mix: shade },
    ]);

    return [shade.toString(), color] as const;
  });

  return keyColorRange;
}
