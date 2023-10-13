<script lang="ts">
  import KeyColorRange from '$components/KeyColorRange.svelte';
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
