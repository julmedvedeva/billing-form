<template>
  <input
    id="expirationYear"
    inputmode="numeric"
    autocomplete="cc-exp-year"
    placeholder="YY"
    :value="modelValue"
    class="border-[#333333] border-2 p-1 bg-[#fff] text-[#AAADAC] max-w-[40px]"
    @input="onInput"
  />
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ (e: 'update:modelValue', val: string): void }>()

const onInput = (e: Event) => {
  const input = e.target as HTMLInputElement
  emit('update:modelValue', input.value)
}
</script>
