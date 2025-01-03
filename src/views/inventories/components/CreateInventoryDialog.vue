<template>
  <CommonDialog
    @onFormSubmit="onFormSubmit"
    :resolver
    :formData
    successBtn="buttons.createInventory"
    :loading="loadings.create || loadings.getDetail"
    :loader="loadings.getDetail"
    :header="t('buttons.createInventory')"
  >
    <template #default="{ $form }">
      <div class="grid grid-cols-2 gap-4">
        <SelectInput
          field="bookstoreId"
          label="bookstore"
          :form="$form"
          v-model="formData.bookstoreId"
          :options="bookstores"
          optionLabel="title"
          optionValue="id"
        >
        </SelectInput>
        <SelectInput
          field="bookId"
          label="book"
          :form="$form"
          v-model="formData.bookId"
          :options="books"
          optionValue="id"
          optionLabel="title"
        >
        </SelectInput>
      </div>
      <NumberInput field="quantity" label="quantity" :form="$form" v-model="formData.quantity" />
    </template>
  </CommonDialog>
</template>
<script setup lang="ts">
import { intResolver, quantityResolver } from '@/data/resolvers'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { useMetaStore } from '@/stores/meta'
import { ref, onMounted } from 'vue'
import { z } from 'zod'
import type { Book } from '@/types/book.interface'
import { useI18n } from 'vue-i18n'
import type { BookStore } from '@/types/bookstore.interface'
import type { Inventory } from '@/types/inventory.interface'

class FormData {
  quantity: number
  bookstoreId: number
  bookId: number
  constructor() {
    this.quantity = 0
    this.bookstoreId = 0
    this.bookId = 0
  }
}
const metaStore = useMetaStore()
const books = ref<Book[]>([])
const bookstores = ref<BookStore[]>([])

const { t } = useI18n()
const props = defineProps<{
  loadings: {
    get: boolean
    create: boolean
    getDetail: boolean
  }
}>()

const formData = ref(new FormData())

const emits = defineEmits<{
  created: [book: Inventory]
}>()
const resolver = ref(
  zodResolver(
    z.object({
      quantity: quantityResolver,
      bookstoreId: intResolver,
      bookId: intResolver,
    }),
  ),
)

const getDetail = async () => {
  if (props.loadings.create || props.loadings.getDetail) {
    return
  }
  props.loadings.getDetail = true
  const [bookRes, bookstoreRes] = await Promise.all([
    metaStore.safeRequest<Book[]>('get', '/book?dense=true', {}, false),
    metaStore.safeRequest<BookStore[]>('get', '/bookstore?dense=true', {}, false),
  ])
  if (!bookRes || !bookstoreRes) {
    // to do
  } else {
    books.value = bookRes
    bookstores.value = bookstoreRes
  }
  props.loadings.getDetail = false
}
const onFormSubmit = async (valid: boolean) => {
  if (props.loadings.create) {
    return
  }
  if (valid) {
    props.loadings.create = true
    const { quantity, bookId, bookstoreId } = formData.value
    const res = await metaStore.safeRequest<Inventory>(
      'post',
      `/inventory/${bookstoreId}/${bookId}`,
      {
        quantity,
      },
    )

    if (res) {
      emits('created', res)
    }
  }
  props.loadings.create = false
}
onMounted(() => {
  getDetail()
})
</script>
