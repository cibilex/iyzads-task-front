<template>
  <div class="flex flex-col gap-1">
    <FloatLabel variant="on">
      <Select
        :name="field"
        v-model="model"
        :options
        filter
        :optionValue
        :optionLabel
        :placeholder="t(label)"
        :invalid="form[field]?.invalid"
        class="w-full"
      >
        <template #option="{ option }">
          <slot name="option" :option />
        </template>
      </Select>

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

const model = defineModel() as ModelRef<number>
withDefaults(
  defineProps<{
    field: string
    form: any
    label: string
    optionLabel?: string
    options: { name: string; code: string }[]
    optionValue?: string
  }>(),
  {
    optionLabel: 'name',
  },
)
const { t } = useI18n()
</script>
