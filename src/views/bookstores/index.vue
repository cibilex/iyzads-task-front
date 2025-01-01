<template>
  <PageContent :loading="false">
    <div class="flex flex-col">
      <PageTitle title="bookstores" />
      hiworld
    </div>
  </PageContent>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const loading = ref(false)
</script>
