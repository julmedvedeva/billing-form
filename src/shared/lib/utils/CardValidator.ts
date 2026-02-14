import type { ErrorViolation } from '@/entities/card/model/types.ts'

export class CardValidator {
  private errors: ErrorViolation[] = []

  /**
   * Валидация номера карты (16 цифр)
   */
  validateCardNumber(value: string): ErrorViolation[] {
    this.errors = []
    const digits = value.replace(/\s/g, '')

    if (!digits) {
      this.errors.push({ field: 'number', message: 'Номер карты обязателен' })
      return this.errors
    }

    if (!/^\d+$/.test(digits)) {
      this.errors.push({
        field: 'number',
        message: 'Номер карты должен содержать только цифры',
      })
    }

    if (digits.length !== 16) {
      this.errors.push({
        field: 'number',
        message: 'Номер карты должен содержать 16 цифр',
      })
    }

    return this.errors
  }

  /**
   * Валидация имени держателя карты
   */
  validateCardHolder(value: string): ErrorViolation[] {
    this.errors = []
    const trimmed = value.trim()

    if (!trimmed) {
      this.errors.push({ field: 'holder', message: 'Имя держателя карты обязательно' })
      return this.errors
    }

    if (trimmed.length < 3) {
      this.errors.push({
        field: 'holder',
        message: 'Имя должно содержать минимум 3 символа',
      })
    }

    if (!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(trimmed)) {
      this.errors.push({
        field: 'holder',
        message: 'Имя может содержать только буквы, пробелы и дефисы',
      })
    }

    const parts = trimmed.split(' ').filter(Boolean)
    if (parts.length < 2) {
      this.errors.push({ field: 'holder', message: 'Введите имя и фамилию' })
    }

    return this.errors
  }

  /**
   * Валидация CVC кода (3 цифры)
   */
  validateCVC(value: string): ErrorViolation[] {
    this.errors = []

    if (!value) {
      this.errors.push({ field: 'cvc', message: 'CVC код обязателен' })
      return this.errors
    }

    if (!/^\d+$/.test(value)) {
      this.errors.push({ field: 'cvc', message: 'CVC должен содержать только цифры' })
    }

    if (value.length !== 3) {
      this.errors.push({ field: 'cvc', message: 'CVC должен содержать 3 цифры' })
    }

    return this.errors
  }

  /**
   * Валидация даты истечения карты
   */
  validateExpirationDate(month: string, year: string): ErrorViolation[] {
    this.errors = []

    if (!month || !year) {
      this.errors.push({ field: 'expiration', message: 'Дата истечения обязательна' })
      return this.errors
    }

    const monthNum = parseInt(month, 10)
    const yearNum = parseInt(year, 10)

    if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
      this.errors.push({ field: 'expiration', message: 'Неверный месяц (01-12)' })
    }

    if (isNaN(yearNum)) {
      this.errors.push({ field: 'expiration', message: 'Неверный год' })
    }

    // Проверка что дата не истекла
    const now = new Date()
    const currentYear = now.getFullYear() % 100
    const currentMonth = now.getMonth() + 1

    if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
      this.errors.push({ field: 'expiration', message: 'Карта истекла' })
    }

    return this.errors
  }

  /**
   * Валидация суммы оплаты
   */
  validatePayingAmount(value: string): ErrorViolation[] {
    this.errors = []

    if (!value || value.trim() === '') {
      this.errors.push({ field: 'paying', message: 'Сумма оплаты обязательна' })
      return this.errors
    }

    const numberValue = +value

    if (isNaN(numberValue)) {
      this.errors.push({ field: 'paying', message: 'Введите корректную сумму' })
      return this.errors
    }

    if (numberValue <= 0) {
      this.errors.push({ field: 'paying', message: 'Сумма должна быть больше 0' })
    }

    if (numberValue > 999999) {
      this.errors.push({ field: 'paying', message: 'Сумма слишком большая' })
    }

    return this.errors
  }

  /**
   * Валидация всей формы карты
   */
  validateCardForm(cardData: {
    number: string
    holder: string
    cvc: string
    expirationDate: { month: string; year: string }
    paying: string
  }): Record<string, ErrorViolation[]> {
    return {
      number: this.validateCardNumber(cardData.number),
      holder: this.validateCardHolder(cardData.holder),
      cvc: this.validateCVC(cardData.cvc),
      expiration: this.validateExpirationDate(
        cardData.expirationDate.month,
        cardData.expirationDate.year
      ),
      paying: this.validatePayingAmount(cardData.paying),
    }
  }
}
