<template>
  <div class="flex flex-col gap-[15px] max-w-[280px]">
    <label for="cvc">CVC</label>
    <input
      id="cvc"
      inputmode="numeric"
      autocomplete="cc-csc"
      placeholder="111"
      :value="displayValue"
      class="p-1 bg-[#fff] text-[#AAADAC]"
      :class="{ error: errors.length > 0 }"
      @input="onInput"
    />
    <div v-if="errors.length > 0">
      <p v-for="error in errors" :key="error.field">{{ error.message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { enrichCVC } from '@/shared/lib/utils/utils'
import { defineEmits, withDefaults, defineProps, computed } from 'vue'
import type { ErrorViolation } from '@/entities/card/model/types'

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

const displayValue = computed(() => enrichCVC(props.modelValue ?? ''))

const onInput = (e: Event) => {
  const input = e.target as HTMLInputElement
  // внутри стора сохраняем реальные цифры
  const digitsOnly = input.value.replace(/\D/g, '').slice(0, 3)
  emit('update:modelValue', digitsOnly)
}
</script>

<style scoped>
.error {
  border: 1px solid red;
}
</style>
