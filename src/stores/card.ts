import { defineStore } from 'pinia'
import type { CartData, ExpirationDate } from '../types'
import { ref } from 'vue'

export const useCardStore = defineStore('card', () => {
  const cardData = ref<CartData>({
    name: '',
    surname: '',
    number: '',
    cvc: '',
    expirationDate: {
      month: 0,
      year: 0,
    },
  })

  const setCardData = (data: CartData) => {
    cardData.value = data
  }

  const getCardData = () => {
    return cardData.value
  }
  const clearCardData = () => {
    cardData.value = {
      name: '',
      surname: '',
      number: '',
      cvc: '',
      expirationDate: {
        month: 0,
        year: 0,
      },
    }
  }

  const setCardNumber = (number: string) => {
    cardData.value.number = number
  }
  const setCardName = (name: string) => {
    cardData.value.name = name
  }
  const setCardSurname = (surname: string) => {
    cardData.value.surname = surname
  }
  const setCardCvc = (cvc: string) => {
    cardData.value.cvc = cvc
  }
  const setCardExpirationDate = (expirationDate: ExpirationDate) => {
    cardData.value.expirationDate = expirationDate
  }

  return {
    cardData,
    setCardData,
    getCardData,
    clearCardData,
    setCardNumber,
    setCardName,
    setCardSurname,
    setCardCvc,
    setCardExpirationDate,
  }
})
