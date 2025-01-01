<template>
  <div class="grid grid-cols-[260px_auto] grid-rows-1 h-screen w-screen overflow-hidden">
    <nav
      class="bg-[#F5F5F5] dark:bg-dark-bg py-8 border-r border-border dark:border-dark-border flex flex-col justify-between"
    >
      <slot name="navbar" />

      <Logo />
    </nav>
    <slot />
  </div>
</template>

<script setup lang="ts">
import Logo from '@/components/icons/Logo.vue'
</script>
