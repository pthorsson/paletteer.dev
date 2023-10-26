<script lang="ts">
  import '@fontsource/jetbrains-mono/400.css';
  import '@fontsource/jetbrains-mono/700.css';

  import Header from '$components/Header.svelte';
  import Main from '$components/Main.svelte';
  import Footer from '$components/Footer.svelte';
  import ExportModal from '$components/ExportModal.svelte';
  import { favicon } from '$stores/state';
  import { showExportModal } from '$stores/state';
</script>

<svelte:head>
  <link rel="icon" href={$favicon} />
</svelte:head>

{#if $showExportModal}
  <ExportModal />
{/if}

<Header />
<Main />
<Footer />
