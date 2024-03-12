<script lang="ts">
  import '@fontsource/jetbrains-mono/400.css';
  import '@fontsource/jetbrains-mono/700.css';

  import Header from '$components/Header.svelte';
  import Main from '$components/Main.svelte';
  import Footer from '$components/Footer.svelte';
  import ExportModal from '$components/ExportModal.svelte';
  import { darkMode, favicon } from '$stores/state';
  import { showExportModal } from '$stores/state';
  import { colors } from '$stores/colors';
  import { updateLocationHash } from '$lib/updateLocationHash';
  import { setRootCSSVariable } from '$lib/setRootCSSVariable';
  import { makeFaviconData } from '$lib/makeFaviconData';
  import { colorMode } from '$stores/colorMode';

  // Update location hash to reflect current state
  updateLocationHash();

  colors.subscribe((colors) => {
    updateLocationHash();
  });

  let colorModeAnimationTimeout: NodeJS.Timeout;

  // Desc
  darkMode.subscribe((isDarkMode) => {
    clearTimeout(colorModeAnimationTimeout);

    sessionStorage.setItem('darkMode', String(isDarkMode));

    document.querySelector('html')?.classList.add('color-mode-transition');

    colorModeAnimationTimeout = setTimeout(() => {
      document.querySelector('html')?.classList.remove('color-mode-transition');
    }, 500);
  });

  // Desc
  colorMode.subscribe(({ bg, fg }) => {
    favicon.set(makeFaviconData({ bg, fg }));

    setRootCSSVariable('--fg', fg);
    setRootCSSVariable('--bg', bg);
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
