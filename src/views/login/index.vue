<template>
  <PageContent :loading="false">
    <div class="flex flex-col">
      <PageTitle title="signIn" />

      <div class="h-full w-full grid place-content-center">
        <Card class="mt-16">
          <template #content>
            <Form
              v-slot="$form"
              :resolver="resolver"
              :initialValues="formData"
              @submit="onFormSubmit"
              class="flex flex-col gap-4 w-96"
            >
              <Input field="username" label="username" :form="$form" v-model="formData.username" />
              <Input field="password" label="password" :form="$form" v-model="formData.password" />
              <div class="flex items-center gap-2">
                <Checkbox v-model="formData.rememberMe" binary />
                <label for="rememberMe"> {{ t('rememberMe') }} </label>
              </div>
              <Button type="submit" severity="secondary" :label="t('buttons.submit')" />
            </Form>
          </template>
        </Card>
      </div>
    </div>
  </PageContent>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'
import { useI18n } from 'vue-i18n'
import { useMetaStore } from '@/stores/meta'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const metaStore = useMetaStore()
const userStore = useUserStore()
const router = useRouter()
const formData = ref({
  username: 'iyzads_admin',
  password: 'ash8los2bahKauxae3ieth3shaarahc6',
  loading: false,
  rememberMe: false,
})

const resolver = ref(
  zodResolver(
    z.object({
      username: z
        .string()
        .min(4, { message: 'validations.min' })
        .max(40, { message: 'validations.max' }),
      password: z
        .string()
        .min(6, { message: 'validations.min' })
        .max(32, { message: 'validations.max' }),
    }),
  ),
)

const onFormSubmit = async ({ valid }: { valid: boolean }) => {
  if (formData.value.loading) {
    return
  }
  if (valid) {
    const { username, password, rememberMe } = formData.value
    const res = await metaStore.safeRequest<{
      accessToken: string
    }>('post', '/user/login', {
      username,
      password,
      rememberMe,
    })

    if (res) {
      userStore.addLoginData(res.accessToken)
      router.push({ name: 'index' })
    }
  }
}
</script>

<route lang="yaml">
name: login
meta:
  public: true
</route>
