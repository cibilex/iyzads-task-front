<template>
  <div class="px-4 pt-10 h-full flex flex-col bg-white dark:bg-dark-bg">
    <Loader v-if="loading" />

    <slot v-else />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  loading: boolean
}>()
</script>
