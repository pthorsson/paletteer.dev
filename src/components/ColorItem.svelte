<script lang="ts">
  export let left: string;
  export let right: string;
  export let mix: number;
</script>

<div style="--color: color-mix(in srgb, {left} {mix * 100}%, {right})" />

<style>
  div {
    height: 100px;
    background-color: var(--color);
    border: 1px solid var(--fg);
    border-radius: 4px;
  }
</style>
