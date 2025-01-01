import { LocalItems } from '@/data/enums'
import { useUserStore } from '@/stores/user'
import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LocalItems.ACCESS_TOKEN)
    const language = localStorage.getItem(LocalItems.LANG) || 'en'

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    config.headers['Accept-Language'] = language

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    const errStatus = error?.response?.status
    if (errStatus == 401 || errStatus == 403) {
      const userStore = useUserStore()
      userStore.logout(true)

      // do something
    }
    return Promise.reject(error)
  },
)

export default instance
