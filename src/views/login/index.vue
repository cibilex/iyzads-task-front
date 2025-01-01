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
              :initialValues="initialValues"
              @submit="onFormSubmit"
              class="flex flex-col gap-4 w-96"
            >
              <Input
                field="username"
                label="username"
                :form="$form"
                v-model="initialValues.username"
              />
              <Input field="email" label="email" :form="$form" />

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
// import { useToast } from 'primevue/usetoast'
import { z } from 'zod'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// const toast = useToast()
const initialValues = ref({
  username: '',
  email: '',
  loading: false,
})

const resolver = ref(
  zodResolver(
    z.object({
      username: z.string().min(1, { message: 'Username is required.' }),
      email: z
        .string()
        .min(1, { message: 'Email is required.' })
        .email({ message: 'Invalid email address.' }),
    }),
  ),
)

const onFormSubmit = ({ valid }: { valid: boolean }) => {
  if (valid) {
    console.log('Form is submitted.', initialValues.value)

    // toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 })
  }
}
</script>

<style scoped></style>
