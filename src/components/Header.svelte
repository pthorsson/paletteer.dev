<script lang="ts">
  import { ICON_SIZE, ICON_STROKE } from '$lib/constants';
  import IconUpload from '@tabler/icons-svelte/IconUpload.svelte';
  import IconArrowBackUp from '@tabler/icons-svelte/IconArrowBackUp.svelte';
  import IconSun from '@tabler/icons-svelte/IconSun.svelte';
  import IconMoon from '@tabler/icons-svelte/IconMoon.svelte';
  import { darkMode, showExportModal } from '$stores/state';
  import Logo from './Logo.svelte';
</script>

<header>
  <a href="/" class="action logo">
    <Logo />
    <span>paletteer.dev</span>
  </a>
  <div class="actions">
    <button class="action" on:click={() => void location.replace('/')}>
      <IconArrowBackUp stroke={ICON_STROKE} size={ICON_SIZE} />
      <span class="label">Reset</span>
    </button>
    <button class="action" on:click={() => void ($showExportModal = true)}>
      <IconUpload stroke={ICON_STROKE} size={ICON_SIZE} />
      <span class="label">Export</span>
    </button>
    <div class="separator" />
    <button class="action" on:click={() => void ($darkMode = !$darkMode)}>
      <div class="theme-icon" class:active={!$darkMode}>
        <IconSun stroke={ICON_STROKE} size={ICON_SIZE} />
      </div>
      <div class="theme-icon" class:active={$darkMode}>
        <IconMoon stroke={ICON_STROKE} size={ICON_SIZE} />
      </div>
    </button>
  </div>
</header>

<style>
  .theme-icon {
    position: absolute;
    height: 20px;
    opacity: 0;
    transform: translateY(10px);
    transition: all calc(var(--color-mode-transition-duration) / 2) ease-in-out;
  }

  .theme-icon.active {
    transform: translateY(0px);
    transition: all calc(var(--color-mode-transition-duration) / 2)
      calc(var(--color-mode-transition-duration) / 2) ease-in-out;
    opacity: 1;
  }

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
    align-items: center;
    height: 100%;
  }

  .action {
    position: relative;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    gap: var(--base-1);
    font-weight: 400;
    padding: 0;
    margin: 0;
    border: 0;
    height: 100%;
    color: var(--fg);
    text-decoration: none;
    font-size: 16px;
    border-radius: var(--sub-base-1);
    background-color: transparent;
  }

  .actions .action {
    aspect-ratio: 1;
  }

  .action:hover {
    background-color: var(--component-2);
  }

  .action .label {
    opacity: 0;
    position: absolute;
    pointer-events: none;
    top: calc(100% + 10px);
    left: 50%;
    transform: translate(-50%, -5px);
    transition: all 150ms ease-in-out;
    text-shadow: 0px 0px 2px black;
  }

  .action:hover > .label {
    transform: translate(-50%, 0px);
    opacity: 1;
  }

  .logo {
    font-weight: 700;
    padding: var(--sub-base-2) var(--sub-base-3);
  }

  .separator {
    width: 1px;
    height: 30px;
    background-color: var(--component-3);
    margin: 0 var(--sub-base-1);
  }

  @media (max-width: 1000px) {
    header {
      border-radius: 0px;
      top: 0px;
    }
  }
</style>
