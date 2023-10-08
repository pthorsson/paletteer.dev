<script lang="ts">
  export let min: number;
  export let max: number;
  export let value: number;
  export let step = 1;

  const thumbSize = 26;

  $: fillWidth = ((value - min) / (max - min)) * 100;
</script>

<div
  class="wrapper"
  style="
    --progress: {fillWidth}%;
    --thumb-size: {thumbSize}px;
  "
  data-value={value}
>
  <input
    type="range"
    {min}
    {max}
    {step}
    {value}
    on:input={(e) => {
      value = Number(e.currentTarget.value);
    }}
  />
  <div class="bar">
    <div class="fill" />
  </div>
  <div class="thumb" />
</div>

<style>
  input {
    position: relative;
    display: block;
    width: 100%;
    background-color: transparent;
    appearance: none;
    border: none;
    height: var(--thumb-size);
    padding: 0px;
    margin: 0px;
    cursor: pointer;
  }

  .wrapper {
    position: relative;
  }

  .bar {
    pointer-events: none;
    position: absolute;
    top: calc(var(--thumb-size) / 2 - 5px);
    left: 0px;
    height: 10px;
    width: 100%;
    border: 1px solid var(--fg);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    overflow: hidden;
    background: var(--bar-color, var(--bg));
  }

  .fill {
    position: relative;
    height: 100%;
    width: calc(100% - var(--thumb-size));
  }

  .fill::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: calc(var(--progress) + var(--thumb-size) / 2);
    height: 100%;
    background: var(--fill-color, var(--fg));
  }

  .thumb {
    position: absolute;
    width: calc(100% - var(--thumb-size));
    top: 0;
  }

  .thumb::before {
    content: '';
    position: absolute;
    left: var(--progress);
    pointer-events: none;
    border-radius: var(--thumb-size);
    background: var(--thumb-color, var(--fg));
    border: 2px solid var(--fg);
    width: var(--thumb-size);
    height: var(--thumb-size);
    box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.4);
  }
</style>
