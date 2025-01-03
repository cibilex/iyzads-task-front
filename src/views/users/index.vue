<template>
  <PageContent :loading="loadings.get">
    <PageTitle title="users" />
    <CommonTable
      permission="user.create"
      @clicked="openDialog"
      btnText="buttons.createUser"
      :items="users"
    >
      <Column field="username" :header="t('username')"></Column>
      <Column :header="t('status')">
        <template #body="{ data }">
          <Tag
            v-if="userStatus(data)"
            :value="t(userStatus(data).title)"
            :severity="userStatus(data).severity"
          />
        </template>
      </Column>

      <Column :header="t('userType')">
        <template #body="{ data }">
          <Tag
            v-if="userType(data)"
            :value="t(userType(data).title)"
            :severity="userType(data).severity"
          />
        </template>
      </Column>
      <Column field="createdAt" :header="t('createdAt')">
        <template #body="{ data, field }"> {{ formatDate(data[field]) }}</template></Column
      >
      <Column field="updatedAt" :header="t('updatedAt')">
        <template #body="{ data, field }"> {{ formatDate(data[field]) }}</template></Column
      >
      <Column header=""> </Column>
    </CommonTable>
    <CreateUserDialog @created="created" :loadings v-model="visible" v-if="visible" />
  </PageContent>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMetaStore } from '@/stores/meta'
import CreateUserDialog from '@/views/users/components/CreateUserDialog.vue'
import type { User } from '@/types/user.interface'
import { formatDate } from '@/lib/utils'
import { commonStatuses, userStatuses } from '@/data/enums'

const { t } = useI18n()
const metaStore = useMetaStore()
const loadings = reactive({
  get: false,
  create: false,
})
const users = ref<User[]>([])
const visible = ref(false)
const userStatus = computed(() => (data: User) => commonStatuses[data.status])
const userType = computed(() => (data: User) => userStatuses[data.type])
const created = (user: User) => {
  visible.value = false
  users.value.unshift(user)
}

const openDialog = () => {
  visible.value = true
}
const getUsers = async () => {
  if (loadings.get) {
    return
  }
  loadings.get = true
  const res = await metaStore.safeRequest('get', '/user', {}, false)
  if (res) {
    users.value = res
  }
  loadings.get = false
}

onMounted(() => {
  getUsers()
})
</script>

<route lang="yaml">
meta:
  permissions: ['user.list']
</route>
