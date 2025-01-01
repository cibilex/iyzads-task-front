<template>
  <Page>
    <template #navbar>
      <div>
        <Avatar /> <Divider class="mt-19px" />

        <div v-if="userStore.logined" class="flex gap-6 flex-col pt-14">
          <Link
            v-for="link in links"
            :key="link.icon"
            :text="link.text"
            :icon="link.icon"
            :to="link.link"
          />
        </div></div
    ></template>

    <template #title>
      <PageTitle title="goHome" />
    </template>

    <router-view />
  </Page>
</template>

<script setup lang="ts">
import { type RouteLocationRaw } from 'vue-router'
import Avatar from '@/components/global/Avatar.vue'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

const links: { icon: string; text: string; link: RouteLocationRaw }[] = [
  {
    icon: 'i-tabler:checkup-list',
    text: 'todos',
    link: { name: 'users-id-todos' },
  },
  {
    icon: 'i-tabler:notebook',
    text: 'posts',
    link: { name: 'users-id-posts' },
  },
  {
    icon: 'i-tabler:photo-heart',
    text: 'albums',
    link: { name: 'users-id-albums' },
  },
]
</script>
