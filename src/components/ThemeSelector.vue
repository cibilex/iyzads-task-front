<template>
  <Pill
    :icon="metaStore.theme === Themes.DARK ? 'i-tabler:moon' : 'i-tabler:moon-filled'"
    @click="metaStore.changeTheme(metaStore.theme === Themes.DARK ? Themes.LIGHT : Themes.DARK)"
  >
  </Pill>
</template>

<script setup lang="ts">
import { useMetaStore } from '@/stores/meta'
import { Themes } from '@/data/enums'

const metaStore = useMetaStore()
</script>
