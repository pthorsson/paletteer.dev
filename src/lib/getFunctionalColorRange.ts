import { getComputedColorMix } from '$lib/getComputedColor';

export function getFunctionalColorRange(
  value: string,
  white: string,
  black: string
) {
  const shades = [
    { name: 'w100', value: white, mix: 90 },
    { name: 'w80', value: white, mix: 70 },
    { name: 'w60', value: white, mix: 50 },
    { name: 'w40', value: white, mix: 30 },
    { name: 'w20', value: white, mix: 10 },
    { name: '0', value: white, mix: 0 },
    { name: 'b20', value: black, mix: 10 },
    { name: 'b40', value: black, mix: 30 },
    { name: 'b60', value: black, mix: 50 },
    { name: 'b80', value: black, mix: 70 },
    { name: 'b100', value: black, mix: 90 },
  ];

  const keyColorRange = shades.map((shade) => {
    const color = getComputedColorMix([
      { value },
      { value: shade.value, mix: shade.mix },
    ]);

    return [shade.name, color] as const;
  });

  return keyColorRange;
}
