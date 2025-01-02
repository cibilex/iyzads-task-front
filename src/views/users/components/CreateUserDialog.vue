<template>
  <CommonDialog
    @onFormSubmit="onFormSubmit"
    :resolver
    :formData
    successBtn="buttons.create"
    :loading="loadings.create"
    :header="t('buttons.createUser')"
  >
    <template #default="{ $form }">
      <Input field="username" label="username" :form="$form" v-model="formData.username" />
      <Input field="password" label="password" :form="$form" v-model="formData.password" />
      <Tabs v-model:value="formData.activeTab" scrollable>
        <TabList>
          <Tab v-for="tab in permissions" :key="tab" :value="tab">
            {{ tab }}
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel v-for="tab in permissions" :key="tab" :value="tab">
            <div class="flex flex-col gap-1">
              <button
                type="button"
                v-for="(perm, key) in userStore.user?.allPermissions[tab].perms"
                :key="perm.id"
                @click="formData.permissions[tab][key] = !formData.permissions[tab][key]"
                class="rounded-md px-3 py-2 gap-2 border flex items-center"
              >
                <ToggleSwitch class="grow-0 shrink-0" v-model="formData.permissions[tab][key]" />
                {{ key }}
              </button>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </template>
  </CommonDialog>
</template>
<script setup lang="ts">
import { passwordResolver, usernameResolver } from '@/data/resolvers.ts'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { useMetaStore } from '@/stores/meta'
import { ref, onMounted, computed } from 'vue'
import { z } from 'zod'
import type { User } from '@/types/user.interface'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'

const metaStore = useMetaStore()
const { t } = useI18n()
const userStore = useUserStore()
const props = defineProps<{
  loadings: {
    get: boolean
    create: boolean
  }
}>()

const permissions = computed(() => Object.keys(userStore.user?.allPermissions || []))
const formData = ref({
  username: '',
  password: '',
  activeTab: '',
  permissions: {} as Record<string, Record<string, boolean>>,
})

const emits = defineEmits<{
  created: [user: User]
}>()
const resolver = ref(
  zodResolver(
    z.object({
      username: usernameResolver,
      password: passwordResolver,
    }),
  ),
)

const onFormSubmit = async (valid: boolean) => {
  if (props.loadings.create) {
    return
  }
  if (valid) {
    props.loadings.create = true
    const { username, password } = formData.value

    const permissions = Object.keys(formData.value.permissions).reduce<Record<string, string[]>>(
      (prev, curr) => {
        for (const perm of Object.keys(userStore.user!.allPermissions[curr].perms)) {
          if (formData.value.permissions[curr][perm]) {
            if (!prev[curr]) {
              prev[curr] = [perm]
            } else {
              prev[curr].push(perm)
            }
          }
        }
        return prev
      },
      {},
    )
    const res = await metaStore.safeRequest<User>('post', '/user', {
      username,
      password,
      permissions,
    })

    if (res) {
      emits('created', res)
    }
  }
  props.loadings.create = false
}

onMounted(() => {
  formData.value.activeTab = permissions.value[0] || ''
  for (const page of Object.keys(userStore.user!.allPermissions)) {
    if (!formData.value.permissions[page]) {
      formData.value.permissions[page] = {}
    }
    for (const perm of Object.keys(userStore.user!.allPermissions[page].perms)) {
      formData.value.permissions[page][perm] = false
    }
  }
})
</script>
