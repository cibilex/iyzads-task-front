import { defineStore } from 'pinia'
import { ref } from 'vue'
import { LocalItems } from '@/data/enums'
import { useMetaStore } from './meta'
import { useRouter } from 'vue-router'
import { type User } from '@/types/user.interface'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const logined = ref(false)
  const metaStore = useMetaStore()
  const router = useRouter()

  const getUserInfo = async () => {
    const res = (await metaStore.safeRequest('get', '/user/profile', {}, false)) as User
    user.value = res
    return !!res
  }

  const logout = async (withoutNavigation?: boolean) => {
    if (logined.value) {
      await metaStore.safeRequest('post', '/user/logout')
    }

    localStorage.removeItem(LocalItems.ACCESS_TOKEN)
    logined.value = false
    user.value = null
    if (!withoutNavigation || typeof withoutNavigation !== 'boolean') {
      router.replace('/login')
    }
  }

  const addLoginData = (token: string) => {
    logined.value = true
    localStorage.setItem(LocalItems.ACCESS_TOKEN, token)
  }

  // const controlPermission = (perm: string) => {
  //   try {
  //   } catch (error) {
  //     console.log(error)
  //     return false
  //   }
  // }

  return {
    logined,
    user,
    addLoginData,
    getUserInfo,
    logout,
  }
})
