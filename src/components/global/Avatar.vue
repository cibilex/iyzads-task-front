<template>
  <div class="px-4 gap-3 flex h-48px" v-if="userStore.user">
    <div
      class="w-12 h-12 aspect-square shrink-0 grow-0 rounded-full grid place-content-center no-repeat bg-cover bg-green-200/90"
    >
      <div
        class="text-3xl"
        :class="userStore.user.type === UserTypes.USER ? 'i-tabler-user' : 'i-tabler-user-hexagon'"
      ></div>
    </div>
    <div>
      <h4 class="font-medium text-title truncate dark:(text-dark-title) text-lg leading-27px">
        {{ userStore.user.username }}
      </h4>
      <span class="font-light text-subtitle dark:(text-dark-subtitle) text-sm leading-14px">{{
        t('userTypes.' + userStore.user.type)
      }}</span>
    </div>
    <Button severity="secondary" @click="logout" icon="pi pi-sign-out" variant="outlined" />
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user'
import { useI18n } from 'vue-i18n'
import { UserTypes } from '@/types/user.interface'
import { ref } from 'vue'
const userStore = useUserStore()
const { t } = useI18n()
const loading = ref(false)
const logout = async () => {
  if (loading.value) return
  loading.value = true
  userStore.logout(false)
  loading.value = false
}
</script>
