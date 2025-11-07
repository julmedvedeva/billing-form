<template>
  <BillingForm mode="view" :fetch-data="loadCardData" :auto-clear="true" />
</template>

<script setup lang="ts">
import { BillingForm } from '@/widgets/billing-form'
import { useCardStore } from '@/entities/card/model/store'

// Случайное число от 1 до 11
// необходимо для получения данных
const getRandomInt1to11 = (): number => Math.floor(Math.random() * 11) + 1

const { getCardInfo } = useCardStore()

const loadCardData = async () => {
  const id = getRandomInt1to11().toString()
  await getCardInfo(id)
}
</script>
