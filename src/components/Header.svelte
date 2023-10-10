<script lang="ts">
</script>

<header>
  <a href="/" class="action logo">paletteer.dev</a>
  <div class="actions">
    <button class="action">action 1</button>
    <button class="action">action 2</button>
  </div>
</header>

<style>
  header {
    position: sticky;
    top: var(--base-2);
    flex: 0 0 auto;
    display: flex;
    backdrop-filter: blur(10px);
    color: var(--fg);
    justify-content: space-between;
    align-items: center;
    height: 50px;
    background-color: var(--bg);
    border-radius: var(--base-1);
    padding: var(--sub-base-1);
    max-width: var(--max-width);
    width: 100%;
    background-color: color-mix(in srgb, var(--component-1), transparent 10%);
  }

  .actions {
    display: flex;
    height: 100%;
  }

  .action {
    display: flex;
    cursor: pointer;
    align-items: center;
    font-weight: 500;
    padding: 0;
    margin: 0;
    border: 0;
    height: 100%;
    color: var(--fg);
    padding: 0px var(--sub-base-3);
    text-decoration: none;
    font-size: 16px;
    border-radius: var(--sub-base-1);
    background-color: transparent;
  }

  .action:hover {
    background-color: var(--component-2);
  }
</style>
