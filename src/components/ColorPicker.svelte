<script lang="ts">
  import { onMount } from 'svelte';
  import { v4 as uuid } from 'uuid';
  import { hwbFullHue } from '../lib/color-utils';
  import convert from 'color-convert';
  import Slider from './Slider.svelte';

  export let minWhiteness = 0;
  export let maxWhiteness = 100;
  export let minBlackness = 0;
  export let maxBlackness = 100;

  /**
   * HEX value.
   */
  export let value: string;

  const [initHue = 0, initWhiteness = 50, initBlackness = 50] =
    convert.hex.hwb(value);

  console.log(initHue, initWhiteness, initBlackness);

  const id = uuid();

  let hueBoard: HTMLDivElement;
  let dragging = false;

  const boardBoundary = { x1: 0, x2: 0, y1: 0, y2: 0 };

  let x = 100 - initWhiteness / (1 - initBlackness / 100);
  let y = initBlackness;

  let hue = initHue;
  $: whiteness = (100 - x) * (1 - y / 100);
  $: blackness = y;

  $: {
    value = '#' + convert.hwb.hex([hue, whiteness, blackness]).toLowerCase();
  }

  function hwbPosUpdate(clientX: number, clientY: number) {
    if (dragging) {
      const { x1, x2, y1, y2 } = boardBoundary;

      x = Math.max(0, Math.min(1, (clientX - x1) / (x2 - x1))) * 100;
      y = Math.max(0, Math.min(1, (clientY - y1) / (y2 - y1))) * 100;
    }
  }

  function hwbChangeStart() {
    dragging = true;

    const { x, y, width, height } = hueBoard.getBoundingClientRect();
    boardBoundary.x1 = x;
    boardBoundary.x2 = x + width;
    boardBoundary.y1 = y;
    boardBoundary.y2 = y + height;
  }

  function hwbChangeEnd() {
    if (dragging) {
      dragging = false;
    }
  }

  onMount(() => {
    function handleMouseDown(e: MouseEvent) {
      if (e.target instanceof Element && e.target.id === id) {
        hwbChangeStart();
        hwbPosUpdate(e.clientX, e.clientY);
      }
    }

    function handleMouseMove(e: MouseEvent) {
      hwbPosUpdate(e.clientX, e.clientY);
    }

    function handleMouseUp() {
      hwbChangeEnd();
    }

    function handleTouchStart(e: TouchEvent) {
      if (e.target instanceof Element && e.target.id === id) {
        hwbChangeStart();
        hwbPosUpdate(e.touches[0].clientX, e.touches[0].clientY);
      }
    }

    function handleTouchMove(e: TouchEvent) {
      hwbPosUpdate(e.touches[0].clientX, e.touches[0].clientY);
    }

    function handleTouchEnd() {
      hwbChangeEnd();
    }

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  });
</script>

<div
  class="wrapper"
  style="
    --pos-x: {x.toFixed(3)}%;
    --pos-y: {y.toFixed(3)}%;

    --hue: {hue}deg;
    --whiteness: {whiteness.toFixed(3)}%;
    --blackness: {blackness.toFixed(3)}%;

    --color: hwb(var(--hue) var(--whiteness) var(--blackness));
  "
>
  <div class="result">
    H: {hue}°
    <br />
    W: {whiteness.toFixed(0)}%
    <br />
    B: {blackness.toFixed(0)}%
    <br />
    {value}
  </div>
  <div class="hue" {id} bind:this={hueBoard}>
    <div class="saturation" />
    <div class="lightness" />
  </div>
  <div class="slider">
    <Slider
      min={0}
      max={360}
      step={1}
      bind:value={hue}
      noPadding
      --fill-color="transparent"
      --bar-color={hwbFullHue(0, 0)}
      --thumb-color="hwb({hue} 0% 0%)"
      --thumb-border="white"
    />
  </div>
</div>

<style>
  .wrapper {
    -webkit-user-callout: none;
    min-width: 400px;
    max-width: 100%;
    display: grid;
    background-color: rgba(255, 255, 255, 0.1);
    grid-template-columns: 1fr 70%;
    padding: 24px 24px 16px 24px;
    border-radius: 16px;
    row-gap: 16px;
    margin-top: 32px;
  }

  .result {
    color: white;
    font-family: 'Courier New', Courier, monospace;
    font-size: 14px;
    text-shadow: 1px 1px 0px black;
    font-weight: bolder;
    padding: 4px;
    line-height: 1;

    /* user-select: none; */
    aspect-ratio: 1;
    background-color: var(--color);
    flex: 0 0 auto;
  }

  .hue {
    -webkit-touch-callout: none; /* Safari */
    -webkit-user-select: none; /* Chrome */
    position: relative;
    flex: 0 0 auto;
    background: hwb(var(--hue) 0% 0%);
    touch-action: pan-x;
  }

  .hue * {
    pointer-events: none;
  }

  .saturation {
    pointer-events: none;
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, white, transparent);
  }

  .lightness {
    pointer-events: none;
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent, black);
  }

  .hue::after {
    position: absolute;
    pointer-events: none;
    left: calc(var(--pos-x) - 13px);
    top: calc(var(--pos-y) - 13px);
    content: '';
    display: block;
    border: 2px solid white;
    background-color: var(--color);
    border-radius: 26px;
    height: 26px;
    width: 26px;
    box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.1);
  }

  .slider {
    grid-column: 1 / span 2;
  }
</style>
