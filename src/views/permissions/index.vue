<template>
  <PageContent :loading="loadings.get">
    <PageTitle title="permissions" />
    <CommonTable :items="permissions">
      <Column field="title" :header="t('title')"></Column>

      <Column field="title" :header="t('permissionItems')">
        <template #body="{ data }">
          {{ data.permissionItems?.length }}
        </template>
      </Column>
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
const permissions = ref<User[]>([])
const visible = ref(false)
const userStatus = computed(() => (data: User) => commonStatuses[data.status])
const userType = computed(() => (data: User) => userStatuses[data.type])
const created = (user: User) => {
  visible.value = false
  permissions.value.unshift(user)
}

const openDialog = () => {
  visible.value = true
}
const getUsers = async () => {
  if (loadings.get) {
    return
  }
  loadings.get = true
  const res = await metaStore.safeRequest('get', '/permissions', {}, false)
  if (res) {
    permissions.value = res
  }
  loadings.get = false
}

onMounted(() => {
  getUsers()
})
</script>

<route lang="yaml">
meta:
  permissions: ['permissions.list']
</route>
