function formatCardNumber(value: string): string {
  const digitsOnly = value.replace(/\D/g, '').slice(0, 16)
  const groups = digitsOnly.match(/.{1,4}/g) ?? []
  return groups.join(' ')
}

export { formatCardNumber }
