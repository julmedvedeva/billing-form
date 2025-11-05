<template>
  <div class="flex flex-col gap-[15px] max-w-[280px] w-full">
    <p>Expiration date</p>

    <div class="flex flex-row justify-between">
      <InputCardExpirationMonth
        :model-value="props.modelValue.month"
        @update:model-value="val => onInput(val, 'month')"
      />
      <span>/</span>
      <InputCardExpirationYear
        :model-value="props.modelValue.year"
        @update:model-value="val => onInput(val, 'year')"
      />
    </div>

    <div v-if="errors.length > 0">
      <p v-for="error in errors" :key="error.field">{{ error.message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputCardExpirationMonth from '@/components/InputCardExpirationMonth.vue'
import InputCardExpirationYear from '@/components/InputCardExpirationYear.vue'
import type { ErrorViolation, ExpirationDate } from '@/types'
import { defineProps, withDefaults, defineEmits } from 'vue'

type Props = {
  modelValue: ExpirationDate
  errors?: ErrorViolation[]
}

type Emits = {
  (e: 'update:modelValue', value: ExpirationDate): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: { month: 0, year: 0 },
  errors: () => [],
})

const emit = defineEmits<Emits>()

const onInput = (val: number, type: 'month' | 'year') => {
  const updated = { ...props.modelValue, [type]: val }
  emit('update:modelValue', updated)
}
</script>
