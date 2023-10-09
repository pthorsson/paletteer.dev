<script lang="ts">
  import Slider from './Slider.svelte';
  import { segments } from '../stores/settings';

  let segmentsValue = 9;

  $: {
    segments.set(segmentsValue);
  }
</script>

<header>
  <div class="slider-wrapper">
    <Slider min={3} max={15} step={2} bind:value={segmentsValue} />
  </div>
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

  .slider-wrapper {
    width: 400px;
    background-color: rgba(255, 255, 255, 0.2);
    padding: 4px 16px;
    border-radius: 8px;
  }
</style>
