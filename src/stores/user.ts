import { defineStore } from 'pinia'
import { ref } from 'vue'
import { LocalItems } from '@/data/enums'

export const useUserStore = defineStore('user', () => {
  const user = ref({})
  const logined = ref(false)

  // const getUserInfo = async (store: string) => {
  //   const s = store || 'my'
  //   try {
  //     // const infoRes = await services.userSetting({ store: s })

  //     // this.user = new UserModel({ ...infoRes.data.data, tags: tagsRes })

  //     return true
  //   } catch (error) {
  //     console.log(error)
  //   }

  //   const logout = async (withoutNavigation: boolean) => {
  //     if (logined.value) {
  //       try {
  //         // await services.userLogout({})
  //       } catch (error) {}
  //     }
  //     // if (local.getItem(localItems.tkn)) {
  //     //   box.addSuccess(i18n.t('toast.success'), i18n.t('api.logout'))
  //     // }

  //     // setTimeout(() => closeAllDialog(), 200)
  //     logined.value = false
  //     // if (!withoutNavigation || typeof withoutNavigation !== 'boolean') {
  //     //   this.router.replace('/login')
  //     // }
  //   }

  //   const addLoginData = (token: string) => {
  //     logined.value = true
  //     localStorage.setItem(LocalItems.ACCESS_TOKEN, token)
  //   }
  // }

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
  }
})
