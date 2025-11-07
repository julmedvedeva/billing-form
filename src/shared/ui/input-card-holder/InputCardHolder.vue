<template>
  <div class="flex flex-col gap-[15px] w-[280px]">
    <label for="cardHolder">Card Holder</label>
    <input
      id="cardHolder"
      inputmode="text"
      autocomplete="cc-name"
      placeholder="Michael Nagarov"
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

const displayValue = computed(() => props.modelValue ?? '')

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
