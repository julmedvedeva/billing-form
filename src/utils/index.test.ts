import { describe, it, expect } from 'vitest'
import { formatCardNumber } from './index.ts'

describe('formatCardNumber', () => {
  it('форматирует 16-значный номер с пробелами', () => {
    const result = formatCardNumber('1234567812345678')
    expect(result).toBe('1234 5678 1234 5678')
  })

  it('обрезает номер длиннее 16 цифр', () => {
    const result = formatCardNumber('123456781234567890123')
    expect(result).toBe('1234 5678 1234 5678')
  })

  it('удаляет все нецифровые символы', () => {
    const result = formatCardNumber('1234-5678 abcd 1234_5678')
    expect(result).toBe('1234 5678 1234 5678')
  })

  it('форматирует неполный номер корректно', () => {
    const result = formatCardNumber('123456')
    expect(result).toBe('1234 56')
  })

  it('возвращает пустую строку, если нет цифр', () => {
    const result = formatCardNumber('abcd!@#')
    expect(result).toBe('')
  })
})
