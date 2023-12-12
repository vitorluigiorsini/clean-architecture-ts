export interface InputFindAllCustomerDto {}

type Customer = {
  id: string
  name: string
  address: {
    street: string
    number: number
    zip: string
    city: string
  }
}

export interface OutputFindAllCustomerDto {
  customers: Customer[]
}