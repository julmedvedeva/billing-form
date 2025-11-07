<template>
  <div class="flex flex-col gap-[15px] max-w-[280px]">
    <input
      inputmode="numeric"
      placeholder="$111"
      :value="displayValue"
      class="p-1 bg-[#fff] text-[#4f4f4f] border-amber-2 border"
      :class="{ error: errors.length > 0 }"
      @input="onInput"
    />
    <div v-if="errors.length > 0">
      <p v-for="error in errors" :key="error.field">{{ error.message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatCardNumber } from '@/shared/lib/utils/utils'
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

const displayValue = computed(() => props.modelValue ?? 0)

const onInput = (e: Event) => {
  const input = e.target as HTMLInputElement

  emit('update:modelValue', input.value)
}
</script>

<style scoped>
.error {
  border: 1px solid red;
}
</style>
