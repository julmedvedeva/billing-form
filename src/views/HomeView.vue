<template>
  <InputCardNumber
    v-model="cardNumber"
    :errors="errors"
    @update:model-value="setCardNumber"
  ></InputCardNumber>
  <p>Card Number: {{ cardNumber }}</p>
</template>

<script setup lang="ts">
import InputCardNumber from '../components/InputCardNumber.vue'
import { onMounted, ref } from 'vue'
import { useCardStore } from '@/stores/card'
import type { ErrorViolation } from '@/types'

const cardStore = useCardStore()
const cardNumber = ref(cardStore.getCardData().number)
const errors = ref<ErrorViolation[]>([
  {
    field: 'cardNumber',
    message: 'Card number is required',
  },
])

const setCardNumber = (number: string) => {
  cardStore.setCardNumber(number)
}

onMounted(() => {})
</script>
