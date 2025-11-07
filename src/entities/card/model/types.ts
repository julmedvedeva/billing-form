export type CartData = {
  name: string
  surname: string
  number: string
  cvc: string
  expirationDate: ExpirationDate
  paying: string
}

export type ExpirationDate = {
  month: string
  year: string
}

export type ErrorViolation = {
  field: string
  message: string
}
