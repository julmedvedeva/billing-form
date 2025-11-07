import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { useCardStore } from '@/entities/card/model/store'
import { usePopup } from '@/shared/lib/composables/usePopup'
import type { ErrorViolation } from '@/entities/card/model/types'
import {
  validateCardNumber,
  validateCardHolder,
  validateCVC,
  validateExpirationDate,
  validatePayingAmount,
  validateCardForm,
} from '@/shared/lib/validators/cardValidators'

export interface UseBillingFormOptions {
  mode?: 'edit' | 'view'
  fetchData?: () => Promise<void>
  autoClear?: boolean
}

export function useBillingForm(options: UseBillingFormOptions = {}) {
  const { mode = 'edit', fetchData, autoClear = false } = options
  const {
    setCardNumber: storeSetCardNumber,
    setCardCvc: storeSetCardCvc,
    setPaying: storeSetPaying,
    sendCardInfo,
    clearCardData,
  } = useCardStore()

  const popup = usePopup()
  const { cardData, fullName } = storeToRefs(useCardStore())

  // Состояние ошибок валидации
  const errors = reactive<Record<string, ErrorViolation[]>>({
    number: [],
    holder: [],
    cvc: [],
    expiration: [],
    paying: [],
  })

  // Флаг для отображения ошибок (показываем только после первой попытки отправки)
  const showErrors = ref(false)

  const isViewMode = mode === 'view'

  const setCardNumber = (value: string) => {
    storeSetCardNumber(value)
    if (showErrors.value && !isViewMode) {
      errors.number = validateCardNumber(value)
    }
  }

  const updateFullName = (value: string) => {
    fullName.value = value
    if (showErrors.value && !isViewMode) {
      errors.holder = validateCardHolder(value)
    }
  }

  const setCardCvc = (value: string) => {
    storeSetCardCvc(value)
    if (showErrors.value && !isViewMode) {
      errors.cvc = validateCVC(value)
    }
  }

  const setExpDate = (newValue: { month: string; year: string }) => {
    useCardStore().setCardExpirationDate(newValue)
    if (showErrors.value && !isViewMode) {
      errors.expiration = validateExpirationDate(newValue.month, newValue.year)
    }
  }

  const setPaying = (value: string) => {
    storeSetPaying(value)
    if (showErrors.value && !isViewMode) {
      errors.paying = validatePayingAmount(value)
    }
  }

  const submitForm = async () => {
    if (isViewMode) {
      return
    }

    showErrors.value = true

    // Валидация всей формы
    const validationErrors = validateCardForm({
      number: cardData.value.number,
      holder: fullName.value,
      cvc: cardData.value.cvc,
      expirationDate: cardData.value.expirationDate,
      paying: cardData.value.paying,
    })

    // Обновляем ошибки
    Object.assign(errors, validationErrors)

    const hasErrors = Object.values(validationErrors).some(
      errs => errs.length > 0
    )

    if (hasErrors) {
      popup.showPopup('Пожалуйста, исправьте ошибки в форме', 'error')
      return
    }

    try {
      const { message } = await sendCardInfo(cardData.value)
      clearCardData()
      showErrors.value = false

      // Очищаем ошибки
      Object.keys(errors).forEach(key => {
        errors[key] = []
      })

      popup.showPopup(message, 'success')
    } catch (err: any) {
      popup.showPopup(err.message, 'error')
    }
  }

  // Загрузка данных при монтировании (если передан callback)
  if (fetchData) {
    onMounted(async () => {
      try {
        await fetchData()
      } catch (err: any) {
        popup.showPopup(err.message || 'Ошибка при загрузке данных', 'error')
      }
    })
  }

  // Очистка данных при размонтировании (если нужно)
  if (autoClear) {
    onBeforeUnmount(() => {
      clearCardData()
    })
  }

  return {
    cardData,
    fullName,
    errors,
    isViewMode,
    setCardNumber,
    updateFullName,
    setCardCvc,
    setExpDate,
    setPaying,
    submitForm,
  }
}
