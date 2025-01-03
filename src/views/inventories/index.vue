<template>
  <PageContent :loading="loadings.get">
    <PageTitle title="inventories" />
    <CommonTable
      permission="inventory.create"
      editMode="cell"
      @cell-edit-complete="editQuantity"
      @clicked="openDialog"
      btnText="buttons.createInventory"
      :items="inventories"
    >
      <Column field="book.title" :header="t('bookTitle')"></Column>
      <Column field="bookstore.country" :header="t('country')"></Column>
      <Column field="bookstore.title" :header="t('bookstoreTitle')"></Column>

      <Column :header="t('price')">
        <template #body="{ data }">
          {{ getPrice(data.book.price) }}
        </template>
      </Column>

      <Column field="quantity" :header="t('quantity')">
        <template
          v-if="userStore.controlPermission('inventory.updateQuantity')"
          #editor="{ data, field }"
        >
          <NumberInput
            class="max-w-24"
            field="quantity"
            label="quantity"
            :form="data"
            v-model="data[field]"
          /> </template
      ></Column>

      <Column :header="t('status')">
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
      <Column v-if="userStore.controlPermission('inventory.delete')" header="">
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
    <CreateInventoryDialog @created="created" :loadings v-model="visible" v-if="visible" />
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
import { formatDate, getPrice } from '@/lib/utils'
import { commonStatuses } from '@/data/enums'
import { useConfirm } from 'primevue/useconfirm'
import CreateInventoryDialog from '@/views/inventories/components/CreateInventoryDialog.vue'
import type { Inventory } from '@/types/inventory.interface'

import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const { t } = useI18n()
const confirm = useConfirm()
const metaStore = useMetaStore()
const loadings = reactive({
  get: false,
  create: false,
  delete: false,
  getDetail: false,
  update: false,
})
const inventories = ref<Inventory[]>([])
const visible = ref(false)
const userStatus = computed(() => (data: Inventory) => commonStatuses[data.status])
const created = (inventory: Inventory) => {
  visible.value = false
  inventories.value.unshift(inventory)
}

const editQuantity = async ({
  newValue,
  value,
  data,
}: {
  data: Inventory
  value: number
  newValue: number
}) => {
  if (loadings.update || isNaN(newValue) || isNaN(value) || value < 0 || newValue < 0) {
    return
  }
  loadings.update = true
  data.quantity = newValue
  const res = await metaStore.safeRequest(
    'put',
    `/inventory/${data.bookstore.id}/${data.book.id}/${data.id}`,
    { quantity: newValue },
  )
  if (!res) {
    data.quantity = value
  }
  loadings.update = false
}

const openDialog = () => {
  visible.value = true
}
const getUsers = async () => {
  if (loadings.get) {
    return
  }
  loadings.get = true
  const res = await metaStore.safeRequest('get', '/inventory', {}, false)
  if (res) {
    inventories.value = res
  }
  loadings.get = false
}

const deleteBook = (data: Inventory) => {
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
      const res = await metaStore.safeRequest(
        'delete',
        `/inventory/${data.bookstore.id}/${data.book.id}/${data.id}`,
        {},
      )
      if (res) {
        inventories.value = inventories.value.filter((item) => item.id !== data.id)
      }
    },
    reject: () => {},
  })
}

onMounted(() => {
  getUsers()
})
</script>

<route lang="yaml">
meta:
  permissions: ['inventory.list']
</route>
