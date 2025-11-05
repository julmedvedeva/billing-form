<template>
  <div class="flex flex-col gap-[15px] max-w-[280px]">
    <label for="cardNumber">Card Number</label>
    <input
      id="cardNumber"
      inputmode="numeric"
      autocomplete="cc-number"
      placeholder="1234 5678 9012 3456"
      :value="displayValue"
      class="border-[#333333] border-2 p-1 bg-[#fff] text-[#AAADAC]"
      :class="{ error: errors.length > 0 }"
      @input="onInput"
    />
    <div v-if="errors.length > 0">
      <p v-for="error in errors" :key="error.field">{{ error.message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, withDefaults } from 'vue'
import type { ErrorViolation } from '@/types'
import { formatCardNumber, enrichCardNumber } from '@/utils'

type Props = {
  modelValue?: string
  errors?: ErrorViolation[]
}

type Emits = {
  (e: 'update:modelValue', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  errors: () => [],
})

const emit = defineEmits<Emits>()

// Отображаем value в группах по 4, корректно обрабатываем маску из точек
const displayValue = computed(() => {
  const val = props.modelValue ?? ''
  // Если приходит маска с точками, группируем по 4
  if (/^•+\d{0,4}$/.test(val)) {
    return val.match(/.{1,4}/g)?.join(' ') ?? val
  }
  return formatCardNumber(val)
})

const onInput = (e: Event) => {
  const input = e.target as HTMLInputElement
  const raw = input.value.replace(/\s/g, '') // убираем пробелы
  const masked = formatCardNumber(raw)
  input.value = masked
  emit('update:modelValue', masked)
}
</script>

<style scoped>
.error {
  border: 1px solid red;
}
</style>
