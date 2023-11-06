<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import IconClipboardCopy from '@tabler/icons-svelte/dist/svelte/icons/IconClipboardCopy.svelte';
  import IconX from '@tabler/icons-svelte/dist/svelte/icons/IconX.svelte';
  import { ICON_STROKE } from '$lib/constants';
  import { palette } from '$stores/colors';
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
  let highlighted = '';

  let contentRef: HTMLDivElement;
  let highlightedRef: HTMLPreElement;

  let codeWidth = 0;
  let codeHeight = 0;

  function setLanguage(landId: LangId) {
    selectedLanguage = landId;
    contentRef.scrollTo(0, 0);

    let formatted: { code: string; highlighted: string };

    switch (landId) {
      case 'css':
        formatted = formatCss($palette);
        break;
      case 'scss':
        formatted = formatScss($palette);
        break;
      case 'js':
        formatted = formatJs($palette);
        break;
      case 'tw':
        formatted = formatTw($palette);
        break;
    }

    code = formatted.code;
    highlighted = formatted.highlighted;
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(code);
  }

  onMount(() => {
    setTimeout(() => {
      setLanguage('css');
    });
  });

  onMount(() => {
    const resizeObserver = new ResizeObserver(() => {
      codeWidth = highlightedRef.scrollWidth + 16;
      codeHeight = highlightedRef.scrollHeight;
    });

    resizeObserver.observe(highlightedRef);

    return () => {
      resizeObserver.disconnect();
    };
  });
</script>

<div class="wrapper" transition:fade={{ duration: 150 }}>
  <div
    class="backdrop"
    role="none"
    on:click={() => void ($showExportModal = false)}
  />
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
    <div
      class="content"
      bind:this={contentRef}
      style="
        --w: {codeWidth}px;
        --h: {codeHeight}px;
      "
    >
      <pre bind:this={highlightedRef}>{@html highlighted}</pre>
      <textarea value={code} readonly />
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
    position: relative;
    background-color: var(--bg);
    flex: 1 1 auto;
    border-radius: var(--sub-base-1);
    border-top: 1px solid var(--component-2);
    overflow-y: auto;
    overflow-x: hidden;
    font-size: 14px;
    line-height: 1.5;
  }

  .content pre,
  .content textarea {
    padding: var(--base-2);
    margin: 0;
    white-space: pre-wrap;
    border: 0;
    font-size: inherit;
    line-height: inherit;
  }

  .content textarea {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    outline: 0;
    height: var(--h);
    width: var(--w);
    overflow: hidden;
    background-color: transparent;
    color: transparent;
    resize: none;
  }

  .content textarea::selection {
    background-color: var(--fg);
    color: var(--bg);
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
