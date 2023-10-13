<script lang="ts">
  import { ICON_STROKE } from '$lib/constants';
  import { IconDownload, IconUpload } from '@tabler/icons-svelte';
</script>

<header>
  <a href="/" class="action logo">paletteer.dev</a>
  <div class="actions">
    <button class="action">
      <span>export</span>
      <IconUpload stroke={ICON_STROKE} />
    </button>
  </div>
</header>

<style>
  header {
    position: sticky;
    top: var(--base-2);
    z-index: 200;
    flex: 0 0 auto;
    display: flex;
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
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
    gap: var(--base-1);
    font-weight: 400;
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

  .logo {
    font-weight: 700;
  }

  @media (max-width: 1000px) {
    header {
      border-radius: 0px;
      top: 0px;
    }
  }
</style>
