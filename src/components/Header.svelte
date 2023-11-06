<script lang="ts">
  import { ICON_STROKE } from '$lib/constants';
  import { IconUpload, IconRefresh } from '@tabler/icons-svelte';
  import { showExportModal } from '$stores/state';
  import Logo from './Logo.svelte';
</script>

<header>
  <a href="/" class="action logo">
    <Logo />
    <span>paletteer.dev</span>
  </a>
  <div class="actions">
    <button class="action" on:click={() => void location.replace('/')}>
      <span>reset</span>
      <IconRefresh stroke={ICON_STROKE} />
    </button>
    <button class="action" on:click={() => void ($showExportModal = true)}>
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
    padding: var(--sub-base-2) var(--sub-base-3);
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
