import { LocalItems } from '@/data/enums'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from) => {
  const userStore = useUserStore()
  const { getUserInfo, controlPermission, logout } = userStore
  const { logined, user } = storeToRefs(userStore)

  if (!logined.value) {
    const token = localStorage.getItem(LocalItems.ACCESS_TOKEN)
    if (token) {
      logined.value = true
    }
  }

  if (!to.meta.public) {
    if (logined.value) {
      if (!user.value) {
        const res = await getUserInfo()

        if (!res) {
          return await logout()
        }
      }

      if ('permissions' in to.meta) {
        for (const permission of to.meta.permissions as string[]) {
          const res = controlPermission(permission)
          if (!res) {
            return '/'
          }
        }
      }
    } else {
      return '/login'
    }
  } else if (to.meta.public && logined.value) {
    return '/'
  }
})

export default router
