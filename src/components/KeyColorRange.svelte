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
    <ColorSample
      tone={(i + 1) * 100}
      hex="#000000"
      --color="color-mix(in srgb, var(--fg), var(--bg) {(i + 1) * 10}%)"
    />
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
    display: flex;
    gap: var(--base-1);
  }
</style>
