<template>
  <input
    id="expirationMonth"
    inputmode="numeric"
    autocomplete="cc-exp-month"
    placeholder="MM"
    :value="modelValue"
    class="border-[#333333] border-2 py-1 px-2 bg-[#fff] text-[#AAADAC] max-w-[40px]"
    @input="onInput"
  />
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps<{ modelValue: string }>()
const emit = defineEmits<{ (e: 'update:modelValue', val: string): void }>()

const onInput = (e: Event) => {
  const input = e.target as HTMLInputElement
  emit('update:modelValue', input.value)
}
</script>
