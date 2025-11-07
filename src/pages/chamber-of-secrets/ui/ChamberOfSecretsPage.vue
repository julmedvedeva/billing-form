<template>
  <div class="relative z-0">
    <div class="mb-5">
      <InputPaying
        :model-value="cardData.paying"
        :errors="[]"
        @update:model-value="setPaying"
      />
    </div>
    <div class="relative">
      <div
        class="bg-[#333333] p-10 w-[500px] text-white z-99 absolute shadow-[0px_16px_6px_-5px_rgba(0,_0,_0,_0.1)]"
      >
        <div class="flex flex-row pb-4">
          <span class="basis-2/3">Paying: {{ cardData.paying }}</span>
          <div class="basis-1/3 flex row justify-between border border-amber-2">
            <IconMasterCard class="w-8 h-8" color="#fff"></IconMasterCard>
            <IconVisa class="w-8 h-8" color="#fff"></IconVisa>
          </div>
        </div>
        <div class="pb-4">
          <InputCardNumber
            :model-value="cardData.number"
            :errors="[]"
            @update:model-value="setCardNumber"
          />
        </div>
        <div class="flex flex-row">
          <InputCardHolder
            :model-value="fullName"
            :errors="[]"
            @update:model-value="setFullName"
            class="basis-2/3"
          />
          <InputCardExpirationDate
            :model-value="cardData.expirationDate"
            :errors="[]"
            @update:model-value="setExpDate"
            class="basis-1/3"
          />
        </div>
      </div>
      <div
        class="bg-[#4f4f4f] w-[500px] text-white z-1 absolute top-12 left-44 shadow-[12px_16px_6px_-5px_rgba(0,_0,_0,_0.1)]"
      >
        <div class="mt-16 bg-[#979797] h-[90px]"></div>
        <div class="mt-5 ml-[360px] mr-8 mb-20 max-w-[110px]">
          <InputCardCVC
            :model-value="cardData.cvc"
            :errors="[]"
            @update:model-value="setCardCvc"
          />
        </div>
      </div>
    </div>
    <div
      class="relative z-0 mt-[450px] shadow-[0px_5px_15px_4px_rgba(34,_197,_94,_0.5)] max-w-[670px] py-3.5 px-8 flex flex-row gap-6 justify-between items-center"
    >
      <div class="text-[#4f4f4f]">
        <div>Итого к зачислению</div>
        <div class="">{{ cardData.paying !== '' ? cardData.paying : 0 }}</div>
        <div class="text-[#979797]">Без комиссии</div>
      </div>
      <div class="w-full max-w-[300px]">
        <button class="w-full bg-[#979797] text-white py-5" disabled>
          Оплатить
        </button>
      </div>
    </div>

    <ResultPopup />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { useCardStore } from '@/entities/card/model/store'
import InputCardNumber from '@/shared/ui/input-card-number/InputCardNumber.vue'
import InputCardHolder from '@/shared/ui/input-card-holder/InputCardHolder.vue'
import InputCardExpirationDate from '@/shared/ui/input-card-expiration/InputCardExpirationDate.vue'
import InputCardCVC from '@/shared/ui/input-card-cvc/InputCardCVC.vue'
import InputPaying from '@/shared/ui/input-paying/InputPaying.vue'
import IconMasterCard from '@/shared/ui/icons/IconMasterCard.vue'
import IconVisa from '@/shared/ui/icons/IconVisa.vue'
import ResultPopup from '@/shared/ui/result-popup/ResultPopup.vue'
import { usePopup } from '@/shared/lib/composables/usePopup'

// Случайное число от 1 до 11
const getRandomInt1to11 = (): number => Math.floor(Math.random() * 11) + 1

// Стор
const cardStore = useCardStore()
const { cardData, fullName } = storeToRefs(cardStore)
const { getCardInfo } = cardStore
const popup = usePopup()

const id = ref<string>('')

// Методы для изменения стора
const setCardNumber = cardStore.setCardNumber
const setFullName = (value: string) => {
  cardStore.fullName = value
}
const setExpDate = cardStore.setCardExpirationDate
const setCardCvc = cardStore.setCardCvc
const setPaying = cardStore.setPaying

// При монтировании страницы генерируем id и подставляем данные из стора
onMounted(async () => {
  try {
    id.value = getRandomInt1to11().toString()
    await getCardInfo(id.value)
  } catch (err: any) {
    popup.showPopup('Ошибка при получении данных карты', 'error')
  }
})

onBeforeUnmount(() => {
  cardStore.clearCardData()
})
</script>
