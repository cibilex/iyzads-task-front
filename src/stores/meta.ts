import { ref } from 'vue'
import { defineStore } from 'pinia'
import { LocalItems, Themes } from '@/data/enums'
import { useI18n } from 'vue-i18n'
import { useDropdownStore } from '@/stores/dropdown'

export const useMetaStore = defineStore('meta', () => {
  const theme = ref(Themes.DARK)
  const { locale } = useI18n()
  const dropdownStore = useDropdownStore()

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

  return { theme, changeTheme, setLocale }
})
