import type { ErrorViolation } from '@/entities/card/model/types'

/**
 * Валидация номера карты (16 цифр)
 */
export function validateCardNumber(value: string): ErrorViolation[] {
  const errors: ErrorViolation[] = []
  const digits = value.replace(/\s/g, '')

  if (!digits) {
    errors.push({ field: 'number', message: 'Номер карты обязателен' })
    return errors
  }

  if (!/^\d+$/.test(digits)) {
    errors.push({
      field: 'number',
      message: 'Номер карты должен содержать только цифры',
    })
  }

  if (digits.length !== 16) {
    errors.push({
      field: 'number',
      message: 'Номер карты должен содержать 16 цифр',
    })
  }

  return errors
}

/**
 * Валидация имени держателя карты
 */
export function validateCardHolder(value: string): ErrorViolation[] {
  const errors: ErrorViolation[] = []
  const trimmed = value.trim()

  if (!trimmed) {
    errors.push({ field: 'holder', message: 'Имя держателя карты обязательно' })
    return errors
  }

  if (trimmed.length < 3) {
    errors.push({
      field: 'holder',
      message: 'Имя должно содержать минимум 3 символа',
    })
  }

  if (!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(trimmed)) {
    errors.push({
      field: 'holder',
      message: 'Имя может содержать только буквы, пробелы и дефисы',
    })
  }

  const parts = trimmed.split(' ').filter(Boolean)
  if (parts.length < 2) {
    errors.push({ field: 'holder', message: 'Введите имя и фамилию' })
  }

  return errors
}

/**
 * Валидация CVC кода (3 цифры)
 */
export function validateCVC(value: string): ErrorViolation[] {
  const errors: ErrorViolation[] = []

  if (!value) {
    errors.push({ field: 'cvc', message: 'CVC код обязателен' })
    return errors
  }

  if (!/^\d+$/.test(value)) {
    errors.push({ field: 'cvc', message: 'CVC должен содержать только цифры' })
  }

  if (value.length !== 3) {
    errors.push({ field: 'cvc', message: 'CVC должен содержать 3 цифры' })
  }

  return errors
}

/**
 * Валидация даты истечения карты
 */
export function validateExpirationDate(
  month: string,
  year: string
): ErrorViolation[] {
  const errors: ErrorViolation[] = []

  if (!month || !year) {
    errors.push({ field: 'expiration', message: 'Дата истечения обязательна' })
    return errors
  }

  const monthNum = parseInt(month, 10)
  const yearNum = parseInt(year, 10)

  if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
    errors.push({ field: 'expiration', message: 'Неверный месяц (01-12)' })
  }

  if (isNaN(yearNum)) {
    errors.push({ field: 'expiration', message: 'Неверный год' })
  }

  // Проверка что дата не истекла
  const now = new Date()
  const currentYear = now.getFullYear() % 100 // Получаем последние 2 цифры
  const currentMonth = now.getMonth() + 1

  if (
    yearNum < currentYear ||
    (yearNum === currentYear && monthNum < currentMonth)
  ) {
    errors.push({ field: 'expiration', message: 'Карта истекла' })
  }

  return errors
}

/**
 * Валидация суммы оплаты
 */
export function validatePayingAmount(value: string): ErrorViolation[] {
  const errors: ErrorViolation[] = []

  if (!value || value.trim() === '') {
    errors.push({ field: 'paying', message: 'Сумма оплаты обязательна' })
    return errors
  }

  const numberValue = +value

  if (isNaN(numberValue)) {
    errors.push({ field: 'paying', message: 'Введите корректную сумму' })
    return errors
  }

  if (numberValue <= 0) {
    errors.push({ field: 'paying', message: 'Сумма должна быть больше 0' })
  }

  if (numberValue > 999999) {
    errors.push({ field: 'paying', message: 'Сумма слишком большая' })
  }

  return errors
}

/**
 * Валидация всей формы карты
 */
export function validateCardForm(cardData: {
  number: string
  holder: string
  cvc: string
  expirationDate: { month: string; year: string }
  paying: string
}): Record<string, ErrorViolation[]> {
  return {
    number: validateCardNumber(cardData.number),
    holder: validateCardHolder(cardData.holder),
    cvc: validateCVC(cardData.cvc),
    expiration: validateExpirationDate(
      cardData.expirationDate.month,
      cardData.expirationDate.year
    ),
    paying: validatePayingAmount(cardData.paying),
  }
}
