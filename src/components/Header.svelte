<script lang="ts">
  import Slider from './Slider.svelte';
  import {
    shades,
    MIN_SHADES,
    MAX_SHADES,
    SHADES_STEP,
  } from '../stores/settings';
</script>

<header>
  <Slider
    bind:value={$shades}
    min={MIN_SHADES}
    max={MAX_SHADES}
    step={SHADES_STEP}
    --bar-color="var(--component-bg)"
  />
</header>

<style>
  header {
    display: flex;
    color: var(--fg);
    justify-content: center;
    align-items: center;
    background-color: var(--bg);
    border-bottom: 1px solid var(--fg);
  }
</style>
