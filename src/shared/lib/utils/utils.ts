/**
 * Форматирует номер карты с пробелами каждые 4 цифры
 */
export function formatCardNumber(value: string): string {
  const digitsOnly = value.replace(/\D/g, '').slice(0, 16)
  const groups = digitsOnly.match(/.{1,4}/g) ?? []
  return groups.join(' ')
}

/**
 * Вернёт строку из 12 точек + последних 4 цифр карты.
 */
export function enrichCardNumber(raw: string | undefined | null): string {
  if (!raw) return '•'.repeat(12)

  const digits = raw.replace(/\D/g, '')
  const last4 =
    digits.length >= 4 ? digits.slice(-4) : digits.padStart(4, '0').slice(-4)

  return '•'.repeat(12) + last4
}

/**
 * Генерация случайного месяца (1-12)
 */
export function getRandomMonth(): string {
  const month = Math.floor(Math.random() * 12) + 1
  return month.toString().padStart(2, '0')
}

/**
 * Генерация случайного года (последние две цифры)
 */
export function getRandomYear(start = 25, end = 30): string {
  const year = Math.floor(Math.random() * (end - start + 1)) + start
  return year.toString().padStart(2, '0')
}
