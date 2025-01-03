<template>
  <Dialog v-model:visible="visible" modal :style="{ width: '35rem' }">
    <Form
      v-slot="$form"
      :resolver
      @submit="({ valid }) => emits('onFormSubmit', valid)"
      :initialValues="formData"
      class="flex flex-col gap-4 mt-3"
    >
      <Loader v-if="loader" />
      <slot :$form="$form" />
      <div class="flex justify-end gap-2 mt-5">
        <Button
          type="button"
          :label="t(cancelBtn)"
          severity="secondary"
          @click="visible = false"
          :disabled="loading"
        ></Button>
        <Button type="submit" :label="t(successBtn)" :loading></Button>
      </div>
    </Form>
  </Dialog>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { type ModelRef } from 'vue'
withDefaults(
  defineProps<{
    successBtn?: string
    cancelBtn?: string
    loading: boolean
    resolver: any
    formData: any
    loader?: boolean
  }>(),
  {
    successBtn: 'buttons.save',
    cancelBtn: 'buttons.cancel',
  },
)
const visible = defineModel() as ModelRef<boolean>
const { t } = useI18n()
const emits = defineEmits<{
  onFormSubmit: [valid: boolean]
}>()
</script>

<style scoped></style>
