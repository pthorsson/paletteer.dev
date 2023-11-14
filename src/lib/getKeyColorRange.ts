import { getComputedColorMix } from '$lib/getComputedColor';

export function getKeyColorRange(white: string, black: string) {
  const keyShades = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0];

  const keyColorRange = keyShades.map((shade) => {
    const color = getComputedColorMix([
      { value: white, mix: shade },
      { value: black },
    ]);

    return [shade.toString(), color] as const;
  });

  return keyColorRange;
}
