<script lang="ts">
  import { IconEdit } from '@tabler/icons-svelte';
  import ColorPicker from '$components/ColorPicker.svelte';

  export let tone: number;
  export let hex: string;
  export let editable = false;

  let editing = false;
</script>

<div class="wrapper">
  {#if editable}
    <button class="color" on:click={() => (editing = !editing)}>
      <IconEdit size={24} stroke={1} />
      <span class="edit-label">edit</span>
    </button>
  {:else}
    <div class="color" />
  {/if}
  <div class="info">
    <span class="tone">{tone}</span>
    <span class="hex">{hex}</span>
  </div>
  {#if editable && editing}
    <div class="color-picker">
      <ColorPicker bind:value={hex} />
    </div>
  {/if}
</div>

<style>
  .wrapper {
    position: relative;
    flex: 1;
    gap: var(--sub-base-1);
  }

  .color {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: var(--sub-base-1);
    width: 100%;
    aspect-ratio: 1;
    background-color: var(--color);
    border: 1px solid color-mix(in srgb, var(--color), var(--fg) 10%);
    border-radius: var(--base-1);
    box-shadow: none;
    transition: box-shadow 150ms;
    color: var(--color-fg);
  }

  button.color:hover {
    cursor: pointer;
    box-shadow: 0px 0px 0px 2px var(--bg), 0px 0px 0px 4px var(--fg);
  }

  .edit-label {
    line-height: 24px;
    opacity: 0;
    transition: opacity 150ms;
  }

  button.color:hover * {
    opacity: 1;
  }

  .info {
    display: flex;
    gap: var(--sub-base-1);
    font-weight: bold;
    flex-direction: column;
    justify-content: space-between;
    font-size: 14px;
    color: var(--fg);
    line-height: 1;
    margin-top: var(--base-1);
  }

  .hex {
    opacity: 0.5;
    font-size: 0.9em;
  }

  .color-picker {
    position: absolute;
    top: calc(100% + 15px);
    width: 400px;
    padding: var(--base-3) var(--base-3) var(--sub-base-3) var(--base-3);
    border-radius: var(--base-2);
    background-color: var(--component-1);
  }

  .color-picker::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 20px;
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 15px solid var(--component-1);
  }
</style>
