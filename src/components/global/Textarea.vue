<template>
  <div class="flex flex-col gap-1">
    <FloatLabel variant="on">
      <textareaTag autoResize rows="5" :name="field" :id="uniqueId" v-model="model" :type fluid />
      <label :for="uniqueId">{{ t(label) }}</label>
    </FloatLabel>

    <Message v-if="form[field]?.invalid" severity="error" size="small" variant="simple">{{
      t(form[field].error?.message, {
        field: t(label),
        minimum: form[field].error?.minimum,
        maximum: form[field].error?.maximum,
      })
    }}</Message>
  </div>
</template>

<script setup lang="ts">
import { type ModelRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { v4 } from 'uuid'
const uniqueId = v4()

const model = defineModel() as ModelRef<string>
const props = withDefaults(
  defineProps<{
    type?: string
    field: string
    form: any
    label: string
  }>(),
  {
    type: 'text',
  },
)
const { t } = useI18n()
</script>
