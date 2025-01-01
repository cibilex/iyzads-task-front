import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno({
      dark: 'class',
    }),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        'font-size': '24px',
        color: '#26303E',
      },
    }),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Roboto',
        inLight: 'Shadows Into Light',
        slab: {
          weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
          name: 'Roboto Slab',
        },
        vink: {
          name: 'Rubik Vinyl',
          weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        },
      },
    }),
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
  theme: {
    colors: {
      subtitle: '#5C6672',
      title: '#26303E',
      border: '#D8D9DD',
      primary: '#4F359B',
      'dark-bg': '#111827',
      'dark-border': '#1f2937',
      'dark-title': '#a1a1aa',
      'dark-subtitle': '#6b7280',
    },
  },
})
