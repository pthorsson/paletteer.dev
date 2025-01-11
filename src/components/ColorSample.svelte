<script lang="ts">
  import { afterUpdate } from 'svelte';
  import { fly } from 'svelte/transition';
  import IconEdit from '@tabler/icons-svelte/icons/edit';
  import IconX from '@tabler/icons-svelte/icons/x';
  import { v4 as uuid } from 'uuid';
  import ColorPicker from '$components/ColorPicker.svelte';
  import { ICON_STROKE } from '$lib/constants';

  const id = uuid();

  export let toneLabel: string;
  export let value: string;
  export let editable = false;
  export let colorPickerPosition: 'left' | 'right' | 'center' = 'center';

  let editing = false;
  let showOnTop = false;
  let wrapperElement: HTMLDivElement;

  $: if (editable && editing) {
    const { height, y } = wrapperElement.getBoundingClientRect();
    const windowsHeight = window.innerHeight;

    showOnTop = y + height + 280 > windowsHeight;
  }

  afterUpdate(() => {
    if (editable) {
      function outsideHandler(e: MouseEvent | TouchEvent) {
        if (!(e.target instanceof HTMLElement)) return;
        if (e.target.closest(`#color-picker-${id}`)) return;
        if (e.target.closest(`#color-sample-${id}`)) return;

        editing = false;
      }

      document.addEventListener('mousedown', outsideHandler);
      document.addEventListener('touchstart', outsideHandler);

      return () => {
        document.removeEventListener('mousedown', outsideHandler);
        document.removeEventListener('touchstart', outsideHandler);
      };
    }
  });
</script>

<div class="wrapper" bind:this={wrapperElement}>
  {#if editable}
    <button
      id="color-sample-{id}"
      data-name={toneLabel}
      data-hex={toneLabel}
      class="color-sample"
      class:editing
      on:click={() => (editing = !editing)}
    >
      {#if !editing}
        <IconEdit size={24} stroke={ICON_STROKE} />
        <span class="edit-label">edit</span>
      {:else}
        <IconX size={24} stroke={ICON_STROKE} />
      {/if}
    </button>
  {:else}
    <div class="color-sample"></div>
  {/if}
  <div class="info">
    <span class="tone">{toneLabel}</span>
    <span class="hex">{value}</span>
  </div>
  {#if editable && editing}
    <div
      transition:fly={{ duration: 300, y: showOnTop ? 10 : -10 }}
      id="color-picker-{id}"
      class="color-picker"
      class:top={showOnTop}
      class:bottom={!showOnTop}
      class:left={colorPickerPosition === 'left'}
      class:right={colorPickerPosition === 'right'}
      class:center={colorPickerPosition === 'center'}
    >
      <ColorPicker bind:value />
    </div>
  {/if}
</div>

<style>
  .wrapper {
    position: relative;
    flex: 1;
    gap: var(--sub-base-1);
  }

  .color-sample {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: var(--sub-base-1);
    width: 100%;
    background-color: var(--color);
    border: 1px solid color-mix(in srgb, var(--color), var(--fg) 20%);
    border-radius: var(--base-1);
    transition: box-shadow 150ms;
    color: var(--color-fg);
    min-height: 70px;
  }

  button.color-sample:hover {
    cursor: pointer;
    box-shadow:
      0px 0px 0px 2px var(--bg),
      0px 0px 0px 4px var(--fg);
  }

  button.color-sample.editing {
    box-shadow:
      0px 0px 0px 2px var(--bg),
      0px 0px 0px 4px var(--fg);
  }

  .edit-label {
    line-height: 24px;
    opacity: 0;
    transition: opacity 150ms;
    font-weight: 700;
  }

  button.color-sample:hover .edit-label {
    opacity: 1;
  }

  .info {
    display: flex;
    font-weight: bold;
    flex-direction: column;
    justify-content: space-between;
    font-size: 14px;
    color: var(--fg);
    line-height: 1;
    height: var(--base-4);
    margin-top: var(--base-1);
  }

  .hex {
    opacity: 0.5;
    font-size: 0.9em;
  }

  .color-picker {
    --bg: var(--component-2);
    position: absolute;
    z-index: 100;
    width: 400px;
    max-width: calc(100vw - var(--base-4));
    padding: var(--base-3) var(--base-3) var(--sub-base-3) var(--base-3);
    border-radius: var(--base-2);
    background-color: var(--bg);
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
  }

  .color-picker::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
  }

  .color-picker.bottom {
    top: calc(100% + 20px);
  }

  .color-picker.top {
    bottom: calc(100% + 20px);
  }

  .color-picker.bottom::before {
    top: -10px;
    border-bottom: 15px solid var(--bg);
  }

  .color-picker.top::before {
    bottom: -10px;
    border-top: 15px solid var(--bg);
  }

  .color-picker.center {
    left: 50%;
    margin-left: max(-200px, calc(-50vw + var(--base-2)));
  }

  .color-picker.center::before {
    left: 50%;
    margin-left: -15px;
  }

  .color-picker.left {
    left: 0px;
  }

  .color-picker.left::before {
    left: 27px;
  }

  .color-picker.right {
    right: 0px;
  }

  .color-picker.right::before {
    right: 27px;
  }
</style>
