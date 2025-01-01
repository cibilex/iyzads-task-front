import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from) => {
  console.log('hi world', to)
})

export default router
