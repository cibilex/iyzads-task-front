<template>
  <div class="relative">
    <div
      class="hover:(scale-105) active:scale-95 duration-200 cursor-pointer bg-[#F5F5F5] dark:(bg-dark-border ) p-1 rounded-full roundeded"
    >
      <div :class="icon" class="dark:text-dark-subtitle"></div>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string
}>()
</script>
