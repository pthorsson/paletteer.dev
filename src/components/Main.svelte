<script lang="ts">
  import capitalize from 'lodash/capitalize';
  import KeyColorRange from '$components/KeyColorRange.svelte';
  import FunctionColorRange from '$components/FunctionColorRange.svelte';
  import { colors } from '$stores/colors';

  const colorIds = Object.keys($colors).filter((id) => id.at(0) !== '_');
</script>

<main>
  <div class="intro">
    <h2>Paletteer color mixer</h2>
    <p>
      This tools lets you create a color palette by selecting two key colors (a
      white and a black), and then a basic spectrum of colors. Each color has
      shades that are derived from the key colors.
    </p>
  </div>
  <div class="colors">
    <div class="color-range-name">Key</div>
    <KeyColorRange />
    {#each colorIds as id}
      <div class="color-range-name">{capitalize(id)}</div>
      <FunctionColorRange {id} />
    {/each}
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    align-items: center;
    padding: var(--base-4) var(--base-2);
    gap: var(--base-4);
    max-width: var(--max-width);
    width: 100%;
  }

  .intro {
    padding-bottom: var(--base-2);
    border-bottom: 1px solid var(--component-2);
  }

  .colors {
    display: grid;
    gap: var(--base-2);
    grid-template-columns: 80px 1fr;
    width: 100%;
  }

  .color-range-name {
    padding-top: var(--sub-base-1);
  }

  @media (max-width: 1000px) {
    main {
      padding: var(--base-2) var(--base-2);
    }

    .colors {
      grid-template-columns: 1fr;
      gap: var(--sub-base-1);
    }
  }
</style>
