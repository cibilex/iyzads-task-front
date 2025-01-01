import { createI18n } from 'vue-i18n'
import messages from '@intlify/unplugin-vue-i18n/messages'

export const i18n = createI18n({
  legacy: false,
  messages,
  locale: 'en',
  fallbackLocale: 'en',
  silentTranslationWarn: true,
  silentFallbackWarn: true,
  fallbackWarn: false,
  missingWarn: false,
})
