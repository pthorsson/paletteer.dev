import hljs from 'highlight.js/lib/core';
import cssLang from 'highlight.js/lib/languages/css';
import scssLang from 'highlight.js/lib/languages/scss';
import jsLang from 'highlight.js/lib/languages/javascript';
import tsLang from 'highlight.js/lib/languages/typescript';

hljs.registerLanguage('css', cssLang);
hljs.registerLanguage('scss', scssLang);
hljs.registerLanguage('js', jsLang);
hljs.registerLanguage('ts', tsLang);

type PaletteData = { [name: string]: [string, string][] };

/**
 * CSS
 */
export function formatCss(data: PaletteData) {
  const code = `:root {
${Object.entries(data)
  .map(([name, colors]) =>
    colors
      .map(([key, value]) => `  --color-${name}-${key}: ${value};`)
      .join('\n')
  )
  .join('\n')}
}`.trim();

  return {
    code,
    highlighted: hljs.highlight(code, { language: 'css' }).value,
  };
}

/**
 * SCSS
 */
export function formatScss(data: PaletteData) {
  const code = `
    ${Object.entries(data)
      .map(([name, colors]) =>
        colors
          .map(([key, value]) => `$color-${name}-${key}: ${value};`)
          .join('\n')
      )
      .join('\n')}
  `.trim();

  return {
    code,
    highlighted: hljs.highlight(code, { language: 'scss' }).value,
  };
}

/**
 * JavaScript
 */
export function formatJs(data: PaletteData) {
  const code = `const colors = {
${Object.entries(data)
  .map(
    ([name, colors]) =>
      `  ${name}: {
${colors.map(([key, value]) => `    '${key}': '${value}',`).join('\n')}
  },`
  )
  .join('\n')}
};`.trim();

  return {
    code,
    highlighted: hljs.highlight(code, { language: 'js' }).value,
  };
}

/**
 * Tailwind
 */
export function formatTw(data: PaletteData) {
  const code = `const tailwindConfig = {
  theme: {
    colors: {
${Object.entries(data)
  .map(
    ([name, colors]) =>
      `      ${name}: {
${colors
  .map(
    ([key, value]) =>
      `        ${name !== 'key' && key === '0' ? 'DEFAULT' : key}: '${value}',`
  )
  .join('\n')}
      },`
  )
  .join('\n')}
    },
  },
};`.trim();

  return {
    code,
    highlighted: hljs.highlight(code, { language: 'js' }).value,
  };
}
