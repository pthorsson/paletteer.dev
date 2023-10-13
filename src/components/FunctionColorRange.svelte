<script lang="ts">
  import { black } from '$stores/colors';
  import ColorSample from '$components/ColorSample.svelte';

  export let value: string;

  const tints = new Array(5).fill(0).map((_, i) => i / 10);
  const shades = new Array(5).fill(0).map((_, i) => i / 10);
</script>

<div class="function-colors">
  {#each tints as _, i}
    <div class="shade">
      <ColorSample
        tone={i * 10}
        hex="#000000"
        --color="color-mix(in srgb, {value}, var(--fg) {(5 - i) * 15}%)"
      />
    </div>
  {/each}
  <ColorSample
    tone={50}
    bind:hex={value}
    editable
    colorPickerPosition="center"
    --color={value}
    --color-fg="var(--fg)"
  />
  {#each shades as _, i}
    <div class="shade">
      <ColorSample
        tone={(i + 6) * 10}
        hex="#000000"
        --color="color-mix(in srgb, {value}, var(--bg) {(i + 2) * 15}%)"
      />
    </div>
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

    .shade {
      margin: 0px calc(var(--sub-base-1) * -1 - 0.5px);
    }

    .shade:nth-child(5) {
      margin-right: 0;
    }

    .shade:nth-last-child(5) {
      margin-left: 0;
    }

    .shade:nth-child(1) {
      border-top-left-radius: var(--base-1);
      border-bottom-left-radius: var(--base-1);
    }

    .shade:nth-last-child(1) {
      border-top-right-radius: var(--base-1);
      border-bottom-right-radius: var(--base-1);
    }

    :global(.function-colors .shade .color-sample) {
      border-radius: 0px;
    }

    :global(.function-colors .shade:nth-child(1) .color-sample) {
      border-top-left-radius: var(--base-1);
      border-bottom-left-radius: var(--base-1);
    }

    :global(.function-colors .shade:nth-last-child(1) .color-sample) {
      border-top-right-radius: var(--base-1);
      border-bottom-right-radius: var(--base-1);
    }

    :global(.function-colors .shade:nth-child(5) .color-sample) {
      border-top-right-radius: var(--base-1);
      border-bottom-right-radius: var(--base-1);
    }

    :global(.function-colors .shade:nth-last-child(5) .color-sample) {
      border-top-left-radius: var(--base-1);
      border-bottom-left-radius: var(--base-1);
    }

    :global(.function-colors .shade .info.info) {
      display: none;
    }
  }
</style>
