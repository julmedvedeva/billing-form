function formatCardNumber(value: string): string {
  const digitsOnly = value.replace(/\D/g, '').slice(0, 16)
  const groups = digitsOnly.match(/.{1,4}/g) ?? []
  return groups.join(' ')
}

/**
 * Вернёт строку из 12 точек + последних 4 цифр карты.
 */
function enrichCardNumber(raw: string | undefined | null): string {
  if (!raw) return '•'.repeat(12)

  const digits = raw.replace(/\D/g, '')
  const last4 =
    digits.length >= 4 ? digits.slice(-4) : digits.padStart(4, '0').slice(-4)

  return '•'.repeat(12) + last4
}

/**
 * Вернёт строку из 3 черных точек вместо цифр CVC.
 */
function enrichCVC(raw: string | undefined | null): string {
  if (!raw) return '•'.repeat(3)

  const digits = raw.replace(/\D/g, '')
  const last3 =
    digits.length >= 3 ? digits.slice(-3) : digits.padStart(3, '0').slice(-3)

  return '•'.repeat(last3.length)
}

/**
 * Генерация случайного месяца (1-12)
 */
function getRandomMonth(): number {
  return Math.floor(Math.random() * 12) + 1
}

/**
 * Генерация случайного года (последние две цифры)
 */
function getRandomYear(start = 25, end = 30): number {
  return Math.floor(Math.random() * (end - start + 1)) + start
}

export {
  formatCardNumber,
  enrichCardNumber,
  enrichCVC,
  getRandomMonth,
  getRandomYear,
}
