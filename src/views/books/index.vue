<template>
  <PageContent :loading="loadings.get">
    <PageTitle title="books" />
    <CommonTable @clicked="openDialog" btnText="buttons.createBook" :items="books">
      <Column field="title" :header="t('bookTitle')"></Column>

      <Column header="price">
        <template #body="{ data }">
          {{ getPrice(data.price) }}
        </template>
      </Column>

      <Column header="Status">
        <template #body="{ data }">
          <Tag
            v-if="userStatus(data)"
            :value="t(userStatus(data).title)"
            :severity="userStatus(data).severity"
          />
        </template>
      </Column>

      <Column field="createdAt" :header="t('createdAt')">
        <template #body="{ data, field }"> {{ formatDate(data[field]) }}</template></Column
      >
      <Column field="updatedAt" :header="t('updatedAt')">
        <template #body="{ data, field }"> {{ formatDate(data[field]) }}</template></Column
      >
      <Column header="">
        <template #body="{ data }">
          <Button
            icon="pi pi-times"
            severity="danger"
            rounded
            @click="deleteBook(data)"
            variant="outlined"
            aria-label="Cancel"
          /> </template
      ></Column>
    </CommonTable>
    <CreateBookDialog @created="created" :loadings v-model="visible" v-if="visible" />
  </PageContent>

  <ConfirmDialog group="headless">
    <template #container="{ message, acceptCallback, rejectCallback }">
      <div class="flex flex-col items-center p-8 bg-surface-0 dark:bg-surface-900 rounded">
        <div
          class="rounded-full bg-red-6 text-primary-contrast inline-flex justify-center items-center h-24 w-24 -mt-20"
        >
          <div class="i-tabler-exclamation-circle text-white text-5xl"></div>
        </div>
        <span class="font-bold text-2xl block mb-2 mt-6">{{ message.header }}</span>
        <p class="mb-0">{{ message.message }}</p>
        <div class="flex items-center gap-2 mt-6">
          <Button
            :label="t('buttons.cancel')"
            outlined
            @click="rejectCallback"
            severity="secondary"
            class="w-32"
          ></Button>
          <Button
            :label="t('buttons.delete')"
            @click="acceptCallback"
            severity="danger"
            class="w-32"
          ></Button>
        </div>
      </div>
    </template>
  </ConfirmDialog>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMetaStore } from '@/stores/meta'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { formatDate } from '@/lib/utils'
import { commonStatuses } from '@/data/enums'
import CreateBookDialog from '@/views/books/components/CreateBookDialog.vue'
import type { Book } from '@/types/book.interface'
import { getPrice } from '@/lib/utils'
import { useConfirm } from 'primevue/useconfirm'

const { t } = useI18n()
const confirm = useConfirm()
const metaStore = useMetaStore()
const loadings = reactive({
  get: false,
  create: false,
  delete: false,
})
const books = ref<Book[]>([])
const visible = ref(false)
const userStatus = computed(() => (data: Book) => commonStatuses[data.status])
const created = (book: Book) => {
  visible.value = false
  books.value.unshift(book)
}

const openDialog = () => {
  visible.value = true
}
const getUsers = async () => {
  if (loadings.get) {
    return
  }
  loadings.get = true
  const res = await metaStore.safeRequest('get', '/book', {}, false)
  if (res) {
    books.value = res
  }
  loadings.get = false
}

const deleteBook = (data: Book) => {
  if (loadings.delete) {
    return
  }
  confirm.require({
    group: 'headless',
    header: t('areYouSure'),
    message: t('confirmToDeleteBook'),
    accept: async () => {
      if (loadings.delete) {
        return
      }
      const res = await metaStore.safeRequest('delete', '/book/' + data.id, {})
      if (res) {
        books.value = books.value.filter((item) => item.id !== data.id)
      }
    },
    reject: () => {},
  })
}

onMounted(() => {
  getUsers()
})
</script>
