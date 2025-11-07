<template>
  <div class="flex flex-col gap-[15px]">
    <p>Expiration date</p>

    <div class="flex flex-row gap-[15px] items-center">
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

    <div v-if="errors.length > 0" class="-mt-4">
      <p
        class="text-[10px] text-red-500"
        v-for="error in errors"
        :key="error.field"
      >
        {{ error.message }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputCardExpirationMonth from './InputCardExpirationMonth.vue'
import InputCardExpirationYear from './InputCardExpirationYear.vue'
import type {
  ErrorViolation,
  ExpirationDate,
} from '@/entities/card/model/types'
import { defineProps, withDefaults, defineEmits } from 'vue'

type Props = {
  modelValue: ExpirationDate
  errors?: ErrorViolation[]
}

type Emits = {
  (e: 'update:modelValue', value: ExpirationDate): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({ month: '00', year: '00' }),
  errors: () => [],
})

const emit = defineEmits<Emits>()

const onInput = (val: string, type: 'month' | 'year') => {
  const updated = { ...props.modelValue, [type]: val }
  emit('update:modelValue', updated)
}
</script>
