<template>
  <div>
    <div class="px-4 pt-10 h-full bg-white dark:bg-dark-bg">
      <div class="overflow-scroll h-full">
        <Loader v-if="loading" />

        <slot v-else />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  loading: boolean
}>()
</script>
