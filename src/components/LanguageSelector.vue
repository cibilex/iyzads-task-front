<template>
  <Pill @click.stop="openDropdown(uniqueId)" icon="i-tabler:world">
    <Transition name="dropdown">
      <div @click.stop="" v-if="dropdown == uniqueId" class="dropdown">
        <button
          :disabled="lang == locale"
          v-for="lang in availableLocales"
          :key="lang"
          @click="metaStore.setLocale(lang)"
          type="button"
          :class="lang == locale ? 'bg-gray-3 ' : 'hover:bg-gray-100 dark:hover:bg-dark-border '"
          class="inline-flex disabled:cursor-not-allowed justify-center w-full items-center font-medium uppercase gap-2 px-4 py-2 text-sm"
        >
          <country-flag v-if="lang in languageModel" :country="country(lang)" />
        </button>
      </div> </Transition
  ></Pill>
</template>

<script setup lang="ts">
import { useMetaStore } from '@/stores/meta'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { languageModel } from '@/data/enums'
import { v4 as uuid } from 'uuid'
import { useDropdownStore } from '@/stores/dropdown'
import { storeToRefs } from 'pinia'

const uniqueId = uuid()
const dropdownStore = useDropdownStore()
const { openDropdown } = dropdownStore
const { dropdown } = storeToRefs(dropdownStore)
const metaStore = useMetaStore()

const { availableLocales, locale } = useI18n()

const country = computed(
  () => (target: string) => languageModel[target as keyof typeof languageModel],
)
</script>
