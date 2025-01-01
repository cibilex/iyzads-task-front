<template>
  <PageContent :loading>
    <div class="flex flex-col capitalize word-spacing-[0.02em]">hi world</div>
  </PageContent>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const loading = ref(false)
</script>
