const icon: any;

// Temporary fix as Vite loads and optimizes all Tabler icons, which
// significantly slows down the build time.

declare module '@tabler/icons-svelte/dist/svelte/icons/IconClipboardCopy.svelte' {
  export default icon;
}

declare module '@tabler/icons-svelte/dist/svelte/icons/IconX.svelte' {
  export default icon;
}

declare module '@tabler/icons-svelte/dist/svelte/icons/IconEdit.svelte' {
  export default icon;
}

declare module '@tabler/icons-svelte/dist/svelte/icons/IconRefresh.svelte' {
  export default icon;
}

declare module '@tabler/icons-svelte/dist/svelte/icons/IconUpload.svelte' {
  export default icon;
}
