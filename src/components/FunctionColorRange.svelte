<script lang="ts">
  import { white, black } from '$stores/colors';
  import ColorSample from '$components/ColorSample.svelte';
  import { getSampleColors } from '$lib/color-utils';
  import { onMount } from 'svelte';

  let wrapperEl: HTMLDivElement;

  export let value: string;

  const tints = new Array(5).fill(0).map((_, i) => i / 10);
  const shades = new Array(5).fill(0).map((_, i) => i / 10);

  let tintColors: string[] = [];
  let shadeColors: string[] = [];

  const updateColors = () => {
    tintColors = getSampleColors(wrapperEl, '.tint .color-sample');
    shadeColors = getSampleColors(wrapperEl, '.shade .color-sample');
  };

  onMount(() => void updateColors());

  $: if (value || $white || $black) updateColors();
</script>

<div class="function-colors" bind:this={wrapperEl}>
  {#each tints as _, i}
    <div class="color tint">
      <ColorSample
        tone={'w' + (5 - i) * 20}
        hex={tintColors[i] || '—'}
        --color="color-mix(in srgb, {value}, var(--fg) {(5 - i) * 15}%)"
      />
    </div>
  {/each}
  <ColorSample
    tone={0}
    bind:hex={value}
    editable
    colorPickerPosition="center"
    --color={value}
    --color-fg="var(--fg)"
  />
  {#each shades as _, i}
    <div class="color shade">
      <ColorSample
        tone={'b' + (i + 1) * 20}
        hex={shadeColors[i] || '—'}
        --color="color-mix(in srgb, {value}, var(--bg) {(i + 2) * 15}%)"
      />
    </div>
  {/each}
</div>

<style>
  .function-colors {
    display: grid;
    gap: var(--base-1);
    grid-template-columns: repeat(11, 1fr);
  }

  @media (max-width: 1000px) {
    .function-colors {
      grid-template-columns: repeat(5, 1fr) 80px repeat(5, 1fr);
    }

    .color {
      margin: 0px calc(var(--sub-base-1) * -1 - 0.5px);
    }

    .color:nth-child(5) {
      margin-right: 0;
    }

    .color:nth-last-child(5) {
      margin-left: 0;
    }

    .color:nth-child(1) {
      border-top-left-radius: var(--base-1);
      border-bottom-left-radius: var(--base-1);
    }

    .color:nth-last-child(1) {
      border-top-right-radius: var(--base-1);
      border-bottom-right-radius: var(--base-1);
    }

    :global(.function-colors .color .color-sample) {
      border-radius: 0px;
    }

    :global(.function-colors .color:nth-child(1) .color-sample) {
      border-top-left-radius: var(--base-1);
      border-bottom-left-radius: var(--base-1);
    }

    :global(.function-colors .color:nth-last-child(1) .color-sample) {
      border-top-right-radius: var(--base-1);
      border-bottom-right-radius: var(--base-1);
    }

    :global(.function-colors .color:nth-child(5) .color-sample) {
      border-top-right-radius: var(--base-1);
      border-bottom-right-radius: var(--base-1);
    }

    :global(.function-colors .color:nth-last-child(5) .color-sample) {
      border-top-left-radius: var(--base-1);
      border-bottom-left-radius: var(--base-1);
    }

    :global(.function-colors .color .info.info) {
      display: none;
    }
  }
</style>
