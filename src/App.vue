<template>
  <Page>
    <template #navbar>
      <div>
        <Avatar /> <Divider class="mt-19px" />

        <div v-if="userStore.logined" class="flex gap-6 flex-col pt-14">
          <template v-for="link in links" :key="link.icon">
            <Link
              v-if="userStore.controlPermission(link.permission)"
              :text="link.text"
              :icon="link.icon"
              :to="link.link"
            />
          </template>
        </div></div
    ></template>

    <router-view />
  </Page>
  <Toast />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { LocalItems, Themes } from '@/data/enums'
import { useMetaStore } from '@/stores/meta'
import { type RouteLocationRaw } from 'vue-router'
import Avatar from '@/components/global/Avatar.vue'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const links: { icon: string; text: string; link: RouteLocationRaw; permission: string }[] = [
  {
    icon: 'i-tabler:photo-heart',
    text: 'inventories',
    link: { name: 'inventories' },
    permission: 'inventory.list',
  },
  {
    icon: 'i-tabler:checkup-list',
    text: 'bookstores',
    link: { name: 'bookstores' },
    permission: 'bookstore.list',
  },
  {
    icon: 'i-tabler:notebook',
    text: 'users',
    link: { name: 'users' },
    permission: 'user.list',
  },
  {
    icon: 'i-tabler:photo-heart',
    text: 'books',
    link: { name: 'books' },
    permission: 'book.list',
  },
  {
    icon: 'i-tabler:photo-heart',
    text: 'permissions',
    link: { name: 'permissions' },
    permission: 'permission.list',
  },
]

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
