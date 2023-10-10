<script lang="ts">
  import ColorCard from './ColorCard.svelte';
  import { white, black } from '../stores/colors';
  import { shades } from '../stores/settings';

  $: shadesArr = new Array($shades)
    .fill(0)
    .map((_, i) => i / ($shades - 1))
    .reverse();
</script>

<main style="--shades: {$shades};">
  <section>
    <h2>White and Black</h2>
    <div class="list">
      {#each shadesArr as shade}
        <ColorCard left={$white} right={$black} mix={shade} />
      {/each}
    </div>
  </section>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    align-items: center;
    padding: var(--base-4) var(--base-2);
    gap: 32px;
    max-width: var(--max-width);
  }

  section {
    width: 100%;
  }

  .list {
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(var(--shades), 1fr);
  }
</style>
