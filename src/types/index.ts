export type CartData = {
  name: string
  surname: string
  number: string
  cvc: string
  expirationDate: ExpirationDate
}

export type ExpirationDate = {
  month: number
  year: number
}

export type FormData = {
  paying: string
  cardData: CartData
}

export type ErrorViolation = {
  field: string
  message: string
}
