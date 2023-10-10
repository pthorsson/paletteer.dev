<script lang="ts">
  export let left: string;
  export let right: string;
  export let mix: number;
</script>

<div
  class="wrapper"
  style="--color: color-mix(in srgb, {left} {mix * 100}%, {right})"
>
  <div class="color" />
  <div class="info">
    <span>{left}</span>
    <span>{right}</span>
  </div>
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    border: 2px solid var(--fg);
    border-radius: 4px;
    overflow: hidden;
  }

  .color {
    aspect-ratio: 4 / 3;
    background-color: var(--color);
    flex: 0 0 auto;
  }

  .info {
    display: flex;
    font-weight: bold;
    flex-direction: row;
    justify-content: space-between;
    background-color: white;
    padding: 4px 8px;
    font-size: 14px;
    color: var(--bg);
  }
</style>
