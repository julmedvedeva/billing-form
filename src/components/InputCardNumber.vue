<template>
  <div class="input-card-number">
    <label for="cardNumber">Card Number</label>
    <input
      id="cardNumber"
      inputmode="numeric"
      autocomplete="cc-number"
      placeholder="1234 5678 9012 3456"
      :value="displayValue"
      :class="{ error: errors.length > 0 }"
      @input="onInput"
    />
    <div v-if="errors.length > 0">
      <p v-for="error in errors" :key="error.field">{{ error.message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatCardNumber } from '@/utils'
import { defineEmits, withDefaults, defineProps, computed } from 'vue'
import type { ErrorViolation } from '@/types'

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

const displayValue = computed(() => formatCardNumber(props.modelValue ?? ''))

const onInput = (e: Event) => {
  const input = e.target as HTMLInputElement
  const masked = formatCardNumber(input.value)
  input.value = masked
  emit('update:modelValue', masked)
}
</script>

<style scoped>
.input-card-number {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.error {
  border: 1px solid red;
}
</style>
