<script lang="ts">
  import { colors, palette } from '$stores/colors';
  import ColorSample from '$components/ColorSample.svelte';

  export let id: string;
</script>

<div class="function-colors">
  {#each $palette[id] as [tone, value]}
    {#if tone === '0'}
      <ColorSample
        toneLabel={0}
        bind:value={$colors[id]}
        editable
        colorPickerPosition="center"
        --color={value}
        --color-fg="var(--fg)"
      />
    {:else}
      <div class="color">
        <ColorSample toneLabel={tone} value={value || '—'} --color={value} />
      </div>
    {/if}
  {/each}
</div>

<style>
  .function-colors {
    display: grid;
    gap: var(--base-1);
    grid-template-columns: repeat(11, 1fr);
  }

  @media (max-width: 1000px) {
    .function-colors {
      grid-template-columns: repeat(5, 1fr) 80px repeat(5, 1fr);
    }

    .color {
      margin: 0px calc(var(--sub-base-1) * -1 - 0.5px);
    }

    .color:nth-child(5) {
      margin-right: 0;
    }

    .color:nth-last-child(5) {
      margin-left: 0;
    }

    .color:nth-child(1) {
      border-top-left-radius: var(--base-1);
      border-bottom-left-radius: var(--base-1);
    }

    .color:nth-last-child(1) {
      border-top-right-radius: var(--base-1);
      border-bottom-right-radius: var(--base-1);
    }

    :global(.function-colors .color .color-sample) {
      border-radius: 0px;
    }

    :global(.function-colors .color:nth-child(1) .color-sample) {
      border-top-left-radius: var(--base-1);
      border-bottom-left-radius: var(--base-1);
    }

    :global(.function-colors .color:nth-last-child(1) .color-sample) {
      border-top-right-radius: var(--base-1);
      border-bottom-right-radius: var(--base-1);
    }

    :global(.function-colors .color:nth-child(5) .color-sample) {
      border-top-right-radius: var(--base-1);
      border-bottom-right-radius: var(--base-1);
    }

    :global(.function-colors .color:nth-last-child(5) .color-sample) {
      border-top-left-radius: var(--base-1);
      border-bottom-left-radius: var(--base-1);
    }

    :global(.function-colors .color .info.info) {
      display: none;
    }
  }
</style>
