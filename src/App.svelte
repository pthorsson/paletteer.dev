<script lang="ts">
  import Header from './components/Header.svelte';
  import Footer from './components/Footer.svelte';
  import ColorPicker from './components/ColorPicker.svelte';
  import ColorItem from './components/ColorItem.svelte';
  import { white, black } from './stores/colors';
  import { segments } from './stores/settings';
  import Slider from './components/Slider.svelte';
  import { hslFullGradient, hslSaturationGradient } from './lib/color-utils';

  let cp1 = '#005500';
  let cp2 = '#005500';

  $: {
    console.log('cpValue', cp1);
  }

  $: segs = new Array($segments)
    .fill(0)
    .map((_, i) => i / ($segments - 1))
    .reverse();
</script>

<Header />

<main style="--segments: {$segments}">
  <section>
    <h2 style="color: #{cp1};">White and Black</h2>
    <div class="list">
      {#each segs as seg}
        <ColorItem left={$white} right={$black} mix={seg} />
      {/each}
    </div>
    <div class="cps">
      <ColorPicker bind:value={$white} />
      <ColorPicker bind:value={$black} />
    </div>
  </section>
</main>

<Footer />

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }

  section {
    max-width: 1000px;
    width: 100%;
  }

  .list {
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(var(--segments), 1fr);
  }

  .cps {
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: stretch;
  }

  .cps > * {
    flex: 1 1 auto;
  }
</style>
