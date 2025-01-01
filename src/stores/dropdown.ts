import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDropdownStore = defineStore('dropdown', () => {
  const dropdown = ref<string | boolean>(false)

  const openDropdown = (name: string | boolean = false) => {
    dropdown.value = dropdown.value == name ? false : name
  }
  const closeDropdown = () => {
    dropdown.value = false
  }

  window.addEventListener('click', closeDropdown)

  return { dropdown, openDropdown, closeDropdown }
})
