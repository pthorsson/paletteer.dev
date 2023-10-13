<script lang="ts">
  import { white, black } from '$stores/colors';
  import ColorSample from '$components/ColorSample.svelte';

  const shades = new Array(9).fill(0).map((_, i) => i / 10);
</script>

<div class="list">
  <ColorSample
    tone={0}
    bind:hex={$white}
    editable
    --color="var(--fg)"
    --color-fg="var(--bg)"
  />
  {#each shades as _, i}
    <div class="shade">
      <ColorSample
        tone={(i + 1) * 100}
        hex="#000000"
        --color="color-mix(in srgb, var(--fg), var(--bg) {(i + 1) * 10}%)"
      />
    </div>
  {/each}
  <ColorSample
    tone={100}
    bind:hex={$black}
    editable
    --color="var(--bg)"
    --color-fg="var(--fg)"
  />
</div>

<style>
  .list {
    display: grid;
    gap: var(--base-1);
    grid-template-columns: repeat(11, 1fr);
  }

  @media (max-width: 1000px) {
    .list {
      grid-template-columns: 80px repeat(9, 1fr) 80px;
    }

    .shade {
      margin: 0px calc(var(--sub-base-1) * -1 - 0.5px);
    }

    .shade:nth-child(2) {
      margin-left: 0;
    }

    .shade:nth-last-child(2) {
      margin-right: 0;
    }

    :global(.shade .color.color) {
      border-radius: 0px;
    }

    :global(.shade:nth-child(2) .color.color) {
      border-top-left-radius: var(--base-1);
      border-bottom-left-radius: var(--base-1);
    }

    :global(.shade:nth-last-child(2) .color.color) {
      border-top-right-radius: var(--base-1);
      border-bottom-right-radius: var(--base-1);
    }

    :global(.shade .info.info) {
      display: none;
    }
  }
</style>
