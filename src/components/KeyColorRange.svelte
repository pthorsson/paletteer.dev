<script lang="ts">
  import { onMount } from 'svelte';
  import ColorSample from '$components/ColorSample.svelte';
  import { colorPalette, keyColors } from '$stores/colors';
  import { getSampleColors } from '$lib/color-utils';

  let wrapperEl: HTMLDivElement;

  const shades = new Array(9).fill(0).map((_, i) => i / 10);

  let shadeColors: string[] = [];

  const updateColors = () => {
    shadeColors = getSampleColors(wrapperEl, '.shade .color-sample');

    colorPalette.update((colors) => ({
      ...colors,
      key: [
        ['0', $keyColors.white],
        ...shadeColors.reduce<[string, string][]>(
          (acc, color, i) => [...acc, [`${(i + 1) * 10}`, color]],
          []
        ),
        ['100', $keyColors.black],
      ],
    }));
  };

  onMount(() => void updateColors());

  $: if ($keyColors) updateColors();
</script>

<div class="key-colors" bind:this={wrapperEl}>
  <ColorSample
    toneLabel={0}
    bind:hexLabel={$keyColors.white}
    colorPickerPosition="left"
    editable
    --color="var(--fg)"
    --color-fg="var(--bg)"
  />
  {#each shades as _, i}
    <div class="shade">
      <ColorSample
        toneLabel={(i + 1) * 10}
        hexLabel={shadeColors[i] || '—'}
        --color="color-mix(in srgb, var(--fg), var(--bg) {(i + 1) * 10}%)"
      />
    </div>
  {/each}
  <ColorSample
    toneLabel={100}
    bind:hexLabel={$keyColors.black}
    editable
    colorPickerPosition="right"
    --color="var(--bg)"
    --color-fg="var(--fg)"
  />
</div>

<style>
  .key-colors {
    display: grid;
    gap: var(--base-1);
    grid-template-columns: repeat(11, 1fr);
  }

  @media (max-width: 1000px) {
    .key-colors {
      grid-template-columns: 80px repeat(9, 1fr) 80px;
    }

    .shade {
      margin: 0px calc(var(--sub-base-1) * -1 - 0.5px);
    }

    .shade:nth-child(2) {
      margin-left: 0;
    }

    .shade:nth-last-child(2) {
      margin-right: 0;
    }

    :global(.key-colors .shade .color-sample) {
      border-radius: 0px;
    }

    :global(.key-colors .shade:nth-child(2) .color-sample) {
      border-top-left-radius: var(--base-1);
      border-bottom-left-radius: var(--base-1);
    }

    :global(.key-colors .shade:nth-last-child(2) .color-sample) {
      border-top-right-radius: var(--base-1);
      border-bottom-right-radius: var(--base-1);
    }

    :global(.key-colors .shade .info.info) {
      display: none;
    }
  }
</style>
