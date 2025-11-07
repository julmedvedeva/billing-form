import { defineStore } from 'pinia'
import type { CartData, ExpirationDate } from './types'
import { ref, computed } from 'vue'
import { cardApiService } from '@/entities/card/api/cardApi'
import {
  enrichCardNumber,
  getRandomMonth,
  getRandomYear,
} from '@/shared/lib/utils/utils'

export const useCardStore = defineStore('card', () => {
  const cardData = ref<CartData>({
    name: '',
    surname: '',
    number: '',
    cvc: '',
    expirationDate: {
      month: '00',
      year: '25',
    },
    paying: '',
  })

  // computed fullName с валидацией
  const fullName = computed<string>({
    get: () => `${cardData.value.name} ${cardData.value.surname}`.trim(),
    set: (value: string) => {
      const parts = value.trim().split(' ').filter(Boolean)
      cardData.value.name = parts[0] || ''
      // если фамилия не введена, ставим дефолт
      cardData.value.surname = parts[1] || '-'
    },
  })

  const setCardData = (data: CartData) => {
    cardData.value = data
  }

  const getCardData = () => cardData.value

  const clearCardData = () => {
    cardData.value = {
      name: '',
      surname: '',
      number: '',
      cvc: '',
      expirationDate: {
        month: '00',
        year: '25',
      },
      paying: '',
    }
  }

  const setCardNumber = (number: string) => {
    cardData.value.number = number
  }

  const setCardCvc = (cvc: string) => {
    cardData.value.cvc = cvc
  }

  const setCardExpirationDate = (expirationDate: ExpirationDate) => {
    cardData.value.expirationDate = expirationDate
  }

  const setPaying = (paying: string) => {
    cardData.value.paying = paying
  }

  const sendCardInfo = async (cardInfo: CartData) => {
    return await cardApiService.send(cardInfo)
  }

  const getCardInfo = async (id: string) => {
    const data = await cardApiService.getCardInfo(id)
    const enrichedNumber = enrichCardNumber(data.number)
    const newCardData = {
      number: enrichedNumber,
      name: data.name,
      surname: data.surname,
      expirationDate: {
        month: getRandomMonth(),
        year: getRandomYear(),
      },
      cvc: '123',
      paying: '$123',
    }

    setCardData(newCardData)
  }

  return {
    cardData,
    fullName,
    setCardData,
    getCardData,
    clearCardData,
    setCardNumber,
    setCardCvc,
    setCardExpirationDate,
    setPaying,
    sendCardInfo,
    getCardInfo,
  }
})
