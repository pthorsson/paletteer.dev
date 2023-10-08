<script lang="ts">
  import { segments } from '../stores/settings';
</script>

<header>
  <button>asd</button>
  <input
    type="range"
    min="3"
    max="15"
    step="2"
    value="9"
    on:input={(e) => void segments.set(Number(e.currentTarget.value) || 9)}
  />
</header>

<style>
  header {
    color: var(--fg);
    background-color: var(--bg);
    border-bottom: 1px solid var(--fg);
  }
</style>
