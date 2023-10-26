<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import { IconClipboardCopy, IconX } from '@tabler/icons-svelte';
  import { ICON_STROKE } from '$lib/constants';
  import { colorPalette } from '$stores/colors';
  import { showExportModal } from '$stores/state';

  import { formatCss, formatScss, formatJs, formatTw } from '$lib/languages';

  const languages = [
    { id: 'css', name: 'CSS' },
    { id: 'scss', name: 'SCSS' },
    { id: 'js', name: 'JavaScript' },
    { id: 'tw', name: 'Tailwind' },
  ] as const;

  type LangId = (typeof languages)[number]['id'];

  let selectedLanguage: LangId = 'css';
  let code = '';

  let contentRef: HTMLDivElement;

  function setLanguage(landId: LangId) {
    selectedLanguage = landId;
    contentRef.scrollTo(0, 0);

    switch (landId) {
      case 'css':
        code = formatCss($colorPalette);
        break;
      case 'scss':
        code = formatScss($colorPalette);
        break;
      case 'js':
        code = formatJs($colorPalette);
        break;
      case 'tw':
        code = formatTw($colorPalette);
        break;
    }
  }

  function copyToClipboard() {
    const code = document.getElementById('code')?.innerText || '';
    navigator.clipboard.writeText(code);
  }

  onMount(() => {
    setTimeout(() => {
      setLanguage('css');
    });
  });
</script>

<div class="wrapper" transition:fade={{ duration: 150 }}>
  <div class="backdrop" on:click={() => void ($showExportModal = false)} />
  <div class="container" transition:scale={{ start: 0.95, duration: 150 }}>
    <button
      class="action close"
      on:click={() => void ($showExportModal = false)}
    >
      <IconX stroke={ICON_STROKE} />
    </button>
    <div class="header">
      <h2 class="title">Export palette</h2>
      <div class="tabs">
        {#each languages as { id, name } (id)}
          <button
            class:selected={selectedLanguage === id}
            on:click={() => void setLanguage(id)}>{name}</button
          >
        {/each}
      </div>
    </div>
    <div class="content" bind:this={contentRef}>
      <!-- Make textarea with highlight overlay? -->
      <pre id="code">{@html code}</pre>
    </div>
    <button class="action copy" on:click={() => void copyToClipboard()}>
      Copy
      <IconClipboardCopy stroke={ICON_STROKE} />
    </button>
  </div>
</div>

<style>
  .wrapper {
    display: flex;
    position: fixed;
    inset: 0px;
    z-index: 500;
    justify-content: center;
    align-items: center;
  }

  .backdrop {
    background-color: rgba(0, 0, 0, 0.8);
    position: absolute;
    inset: 0px;
    background-color: rgba(0, 0, 0, 0.8);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
  }

  .container {
    position: absolute;
    display: flex;
    flex-direction: column;
    background-color: gray;
    border-radius: var(--base-1);
    overflow: hidden;
    width: 700px;
    height: 800px;
    max-width: calc(100% - var(--base-4));
    max-height: calc(100% - var(--base-4));
    background-color: var(--component-1);
    border: 1px solid var(--component-2);
    box-shadow: 5px 0px 20px 0px rgba(0, 0, 0, 0.4);
  }

  .header {
    display: flex;
    flex-direction: column;
    gap: var(--sub-base-3);
    padding: var(--base-2);
  }

  .tabs {
    display: flex;
    flex-wrap: wrap;
    gap: var(--base-1);
  }

  .tabs button {
    padding: var(--sub-base-1) var(--base-1);
    background-color: transparent;
    border: 1px solid var(--component-3);
    border-radius: var(--sub-base-1);
    cursor: pointer;
  }

  .tabs button:hover {
    background-color: var(--component-2);
  }

  .tabs button.selected {
    background-color: var(--component-3);
  }

  .title {
    margin: 0;
  }

  .content {
    background-color: var(--bg);
    flex: 1 1 auto;
    border-radius: var(--sub-base-1);
    border-top: 1px solid var(--component-2);
    padding: var(--base-1) var(--base-2);
    overflow-y: scroll;
    line-height: 1.5;
  }

  .content pre {
    margin: var(--sub-base-1) 0px;
  }

  .action {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--base-1);
    background-color: transparent;
    border: 0;
    padding: 0 var(--sub-base-1);
    margin: 0;
    height: var(--base-4);
    min-width: var(--base-4);
    color: var(--fg);
    cursor: pointer;
  }

  .action:hover {
    background-color: var(--component-2);
  }

  .close {
    position: absolute;
    top: var(--base-1);
    right: var(--base-1);
  }

  .copy {
    display: flex;
    gap: var(--sub-base-1);
    position: absolute;
    bottom: var(--base-2);
    right: var(--base-4);
  }

  .close:hover {
    background-color: var(--component-2);
  }
</style>
