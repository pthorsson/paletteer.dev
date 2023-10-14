<script lang="ts">
  import { white, black } from '$stores/colors';
  import ColorSample from '$components/ColorSample.svelte';
  import { getSampleColors, srgbToHex } from '$lib/color-utils';
  import { onMount } from 'svelte';

  let wrapperEl: HTMLDivElement;

  const shades = new Array(9).fill(0).map((_, i) => i / 10);

  let shadeColors: string[] = [];

  const updateColors = () => {
    shadeColors = getSampleColors(wrapperEl, '.shade .color-sample');
  };

  onMount(() => void updateColors());

  $: if ($white || $black) updateColors();
</script>

<div class="key-colors" bind:this={wrapperEl}>
  <ColorSample
    tone={0}
    bind:hex={$white}
    colorPickerPosition="left"
    editable
    --color="var(--fg)"
    --color-fg="var(--bg)"
  />
  {#each shades as _, i}
    <div class="shade">
      <ColorSample
        tone={(i + 1) * 10}
        hex={shadeColors[i] || '—'}
        --color="color-mix(in srgb, var(--fg), var(--bg) {(i + 1) * 10}%)"
      />
    </div>
  {/each}
  <ColorSample
    tone={100}
    bind:hex={$black}
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
