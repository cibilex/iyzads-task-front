<template>
  <CommonDialog
    @onFormSubmit="onFormSubmit"
    :resolver
    :formData
    successBtn="buttons.createBookstore"
    :loading="loadings.create"
    :header="t('buttons.createBookstore')"
  >
    <template #default="{ $form }">
      <div class="grid grid-cols-2 gap-4">
        <Input field="country" label="country" :form="$form" v-model="formData.country" />
        <Input field="city" label="city" :form="$form" v-model="formData.city" />
      </div>
      <Input field="title" label="title" :form="$form" v-model="formData.title" />
    </template>
  </CommonDialog>
</template>
<script setup lang="ts">
import { titleResolver, descriptionResolver, priceResolver } from '@/data/resolvers'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { useMetaStore } from '@/stores/meta'
import { ref } from 'vue'
import { z } from 'zod'
import type { BookStore } from '@/types/bookstore.interface'
import { useI18n } from 'vue-i18n'

class FormData {
  title: string
  country: string
  city: string
  constructor() {
    this.title = ''
    this.country = ''
    this.city = ''
  }
}
const metaStore = useMetaStore()
const { t } = useI18n()
const props = defineProps<{
  loadings: {
    get: boolean
    create: boolean
  }
}>()

const formData = ref(new FormData())

const emits = defineEmits<{
  created: [book: BookStore]
}>()
const resolver = ref(
  zodResolver(
    z.object({
      title: titleResolver,
      description: descriptionResolver,
      price: priceResolver,
    }),
  ),
)

const onFormSubmit = async (valid: boolean) => {
  if (props.loadings.create) {
    return
  }
  if (valid) {
    props.loadings.create = true
    const { city, title, country } = formData.value

    const res = await metaStore.safeRequest<BookStore>('post', '/bookstore', {
      country,
      title,
      city,
    })

    if (res) {
      emits('created', res)
    }
  }
  props.loadings.create = false
}
</script>
