<script lang="ts">
  import { onMount } from 'svelte';
  import convert from 'color-convert';

  export let left: string;
  export let right: string;
  export let mix: number;

  let colorEl: HTMLDivElement;

  let hexColor: string = '';

  onMount(() => {
    const srgb = window
      .getComputedStyle(colorEl)
      .getPropertyValue('background-color');

    console.log(srgb);
    // color(srgb 0.909804 0.945098 0.984314)
    const [r, g, b] = srgb.replace(/color\(srgb |\)/g, '').split(' ');

    hexColor = convert.rgb
      .hex([255 * Number(r), 255 * Number(g), 255 * Number(b)])
      .toLowerCase();
  });
</script>

<div
  class="wrapper"
  style="--color: color-mix(in srgb, {left} {mix * 100}%, {right})"
>
  <div class="color" bind:this={colorEl} />
  <div class="info">
    <span>#{hexColor}</span>
  </div>
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    width: 100%;
  }

  .color {
    aspect-ratio: 1;
    background-color: var(--color);
    border: 1px solid color-mix(in srgb, var(--color), var(--fg) 10%);
    flex: 0 0 auto;
    border-radius: var(--base-1);
  }

  .info {
    display: flex;
    font-weight: bold;
    flex-direction: column;
    justify-content: space-between;
    padding: 4px 0px;
    font-size: 14px;
    color: var(--fg);
  }
</style>
