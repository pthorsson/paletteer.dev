<script lang="ts">
  import '@fontsource/jetbrains-mono/400.css';
  import '@fontsource/jetbrains-mono/700.css';

  import Header from '$components/Header.svelte';
  import Main from '$components/Main.svelte';
  import Footer from '$components/Footer.svelte';
  import ExportModal from '$components/ExportModal.svelte';
  import { favicon } from '$stores/state';
  import { showExportModal } from '$stores/state';
  import { colors } from '$stores/colors';
  import { updateLocationHash } from '$lib/updateLocationHash';
  import { setRootCSSVariable } from '$lib/setRootCSSVariable';
  import { makeFaviconData } from '$lib/makeFaviconData';

  // Update location hash to reflect current state
  updateLocationHash();

  colors.subscribe((colors) => {
    const faviconData = makeFaviconData({
      white: colors._white,
      black: colors._black,
    });

    favicon.set(faviconData);

    setRootCSSVariable('--fg', colors._white);
    setRootCSSVariable('--bg', colors._black);

    updateLocationHash();
  });
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
