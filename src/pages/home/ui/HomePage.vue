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
            <IconMasterCard class="w-8 h-8" color="#fff" />
            <IconVisa class="w-8 h-8" color="#fff" />
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
            @update:model-value="updateFullName"
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
        <div>{{ cardData.paying !== '' ? cardData.paying : 0 }}</div>
        <div class="text-[#979797]">Без комиссии</div>
      </div>
      <div class="w-full max-w-[300px]">
        <button class="w-full bg-[#333333] text-white py-5" @click="submitForm">
          Оплатить
        </button>
      </div>
    </div>
  </div>

  <ResultPopup />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCardStore } from '@/entities/card/model/store'
import { usePopup } from '@/shared/lib/composables/usePopup'

import InputCardNumber from '@/shared/ui/input-card-number/InputCardNumber.vue'
import InputCardHolder from '@/shared/ui/input-card-holder/InputCardHolder.vue'
import InputCardExpirationDate from '@/shared/ui/input-card-expiration/InputCardExpirationDate.vue'
import InputCardCVC from '@/shared/ui/input-card-cvc/InputCardCVC.vue'
import InputPaying from '@/shared/ui/input-paying/InputPaying.vue'
import ResultPopup from '@/shared/ui/result-popup/ResultPopup.vue'
import IconMasterCard from '@/shared/ui/icons/IconMasterCard.vue'
import IconVisa from '@/shared/ui/icons/IconVisa.vue'

const { setCardNumber, setCardCvc, setPaying, sendCardInfo, clearCardData } =
  useCardStore()
const popup = usePopup()
const { cardData, fullName } = storeToRefs(useCardStore())

const setExpDate = (newValue: { month: string; year: string }) =>
  useCardStore().setCardExpirationDate(newValue)

const updateFullName = (value: string) => {
  fullName.value = value
}

const submitForm = async () => {
  try {
    const { message } = await sendCardInfo(cardData.value)
    clearCardData()
    popup.showPopup(message, 'success')
  } catch (err: any) {
    popup.showPopup(err.message, 'error')
  }
}
</script>
