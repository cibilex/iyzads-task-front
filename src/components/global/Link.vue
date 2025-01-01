<template>
  <router-link
    :to
    class="px-38px relative py-6.5px w-full text-[#00000073] dark:text-dark-subtitle d flex items-center gap-3 font-normal text-lg leading-27px"
  >
    <span class="absolute left-0 top-0 bottom-0 w-1.5 rounded-r-6px"> </span>
    <div class="text-primary" :class="icon"></div>
    {{ t(text) }}
  </router-link>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { type RouteLocationRaw } from 'vue-router'
defineProps<{
  text: string
  icon: string
  to: RouteLocationRaw
}>()
const { t } = useI18n()
</script>

<style lang="scss" scoped>
.router-link-exact-active {
  @apply text-primary dark:text-primary bg-white dark:bg-dark-border;
  & span {
    @apply bg-primary dark:bg-primary;
  }
}
</style>
