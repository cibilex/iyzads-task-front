<template>
  <CommonDialog
    @onFormSubmit="onFormSubmit"
    :resolver
    :formData
    successBtn="buttons.createBook"
    :loading="loadings.create"
    :header="t('buttons.createBook')"
  >
    <template #default="{ $form }">
      <Input field="title" label="title" :form="$form" v-model="formData.title" />
      <NumberInput
        :minFractionDigits="2"
        :maxFractionDigits="2"
        field="price"
        label="price"
        :form="$form"
        v-model="formData.price"
      />

      <Textarea
        field="description"
        label="description"
        :form="$form"
        v-model="formData.description"
      />
    </template>
  </CommonDialog>
</template>
<script setup lang="ts">
import { titleResolver, descriptionResolver, priceResolver } from '@/data/resolvers'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { useMetaStore } from '@/stores/meta'
import { ref, onMounted } from 'vue'
import { z } from 'zod'
import type { Book as BookT } from '@/types/book.interface'
import { useI18n } from 'vue-i18n'

class FormData {
  title: string
  description: string
  price: number
  constructor() {
    this.title = ''
    this.description = ''
    this.price = 0
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
  created: [book: BookT]
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
    const { price, title, description } = formData.value

    const res = await metaStore.safeRequest<BookT>('post', '/book', {
      price,
      title,
      description,
    })

    if (res) {
      emits('created', res)
    }
  }
  props.loadings.create = false
}
</script>
