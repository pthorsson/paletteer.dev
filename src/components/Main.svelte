<script lang="ts">
  import KeyColorRange from '$components/KeyColorRange.svelte';
  import FunctionColorRange from './FunctionColorRange.svelte';

  const colors = [
    {
      name: 'Info',
      value: '#2971dc',
    },
    {
      name: 'Success',
      value: '#47a972',
    },
    {
      name: 'Error',
      value: '#d73951',
    },
    {
      name: 'Warning',
      value: '#e6b44a',
    },
  ];
</script>

<main>
  <section>
    <h2>Key colors</h2>
    <p>
      These colors will be representing the key colors white and black, as well
      as mix of shades in between.
    </p>
    <KeyColorRange />
  </section>
  {#each colors as { name, value }}
    <section>
      <h2>{name}</h2>
      <FunctionColorRange {value} />
    </section>
  {/each}
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
    width: 100%;
  }

  @media (max-width: 1000px) {
    main {
      padding: var(--base-2) var(--base-2);
    }
  }

  section {
    width: 100%;
  }
</style>
