<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { LocalItems, Themes } from '@/data/enums'
import { useMetaStore } from '@/stores/meta'

const metaStore = useMetaStore()

const { availableLocales } = useI18n()

if (
  localStorage.getItem(LocalItems.THEME) === Themes.DARK ||
  (!(LocalItems.THEME in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  metaStore.changeTheme(Themes.DARK)
} else {
  metaStore.changeTheme(Themes.LIGHT)
}

const currLocale = localStorage.getItem(LocalItems.LANG) || navigator.language
if (currLocale && availableLocales.includes(currLocale)) {
  metaStore.setLocale(currLocale)
} else {
  metaStore.setLocale('en')
}
</script>

<template>
  <RouterView />
</template>
