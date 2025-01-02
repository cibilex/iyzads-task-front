import { ref } from 'vue'
import { defineStore } from 'pinia'
import { LocalItems, Themes } from '@/data/enums'
import { useI18n } from 'vue-i18n'
import { useDropdownStore } from '@/stores/dropdown'
import { useToast } from 'primevue/usetoast'
import type { Axios, AxiosError, Method } from 'axios'
import axios from '@/lib/axios'

export const useMetaStore = defineStore('meta', () => {
  const theme = ref(Themes.DARK)
  const dialog = ref(false)
  const { locale, t } = useI18n()
  const dropdownStore = useDropdownStore()
  const toast = useToast()

  function changeTheme(target: Themes) {
    const elem = document.documentElement
    if (target != Themes.DARK) {
      elem.classList.remove('dark')
    } else {
      elem.classList.add('dark')
    }

    theme.value = target
    localStorage.setItem(LocalItems.THEME, target)
  }

  const setLocale = (target: string) => {
    locale.value = target
    localStorage.setItem(LocalItems.LANG, target)
    dropdownStore.closeDropdown()
  }

  const safeRequest = async <T>(
    method: 'get' | 'post' | 'delete',
    url: string,
    payload?: Record<string, any>,
    info = true,
  ) => {
    try {
      const res = await axios[method](url, payload)
      const message = res.data?.message

      if (message && info) {
        toast.add({ severity: 'success', summary: t('completed'), detail: message, life: 3000 })
      }

      return res.data?.data || (res.data as T)
    } catch (error: any) {
      const message = error?.response?.data?.message

      if (message) {
        toast.add({ severity: 'error', summary: t('error'), detail: message, life: 3000 })
      }
      return false
    }
  }

  return { theme, changeTheme, setLocale, dialog, safeRequest }
})
