<script lang="ts">
  import { colors, palette } from '$stores/colors';
  import ColorSample from '$components/ColorSample.svelte';
</script>

<div class="key-colors">
  {#each $palette.key as [tone, value]}
    {#if tone === '0'}
      <ColorSample
        toneLabel="0"
        bind:value={$colors._white}
        editable
        colorPickerPosition="left"
        --color={value || ''}
        --color-fg="var(--bg)"
      />
    {:else if tone === '100'}
      <ColorSample
        toneLabel="100"
        bind:value={$colors._black}
        editable
        colorPickerPosition="right"
        --color={value || ''}
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
  .key-colors {
    display: grid;
    gap: var(--base-1);
    grid-template-columns: repeat(11, 1fr);
  }

  @media (max-width: 1000px) {
    .key-colors {
      grid-template-columns: 80px repeat(9, 1fr) 80px;
    }

    .color {
      margin: 0px calc(var(--sub-base-1) * -1 - 0.5px);
    }

    .color:nth-child(2) {
      margin-left: 0;
    }

    .color:nth-last-child(2) {
      margin-right: 0;
    }

    :global(.key-colors .color .color-sample) {
      border-radius: 0px;
    }

    :global(.key-colors .color:nth-child(2) .color-sample) {
      border-top-left-radius: var(--base-1);
      border-bottom-left-radius: var(--base-1);
    }

    :global(.key-colors .color:nth-last-child(2) .color-sample) {
      border-top-right-radius: var(--base-1);
      border-bottom-right-radius: var(--base-1);
    }

    :global(.key-colors .color .info.info) {
      display: none;
    }
  }
</style>
