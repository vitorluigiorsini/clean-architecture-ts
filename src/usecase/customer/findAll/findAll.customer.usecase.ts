import CustomerRepositoryInterface from '../../../domain/customer/repository/customer.repository.interface'
import { InputFindAllCustomerDto, OutputFindAllCustomerDto } from './findAll.customer.dto'

export default class FindAllCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository
  }

  async execute(input: InputFindAllCustomerDto): Promise<OutputFindAllCustomerDto> {
    const customers = await this.customerRepository.findAll()

    return {
      customers: customers.map((customer) => {
        return {
          id: customer.id,
          name: customer.name,
          address: {
            street: customer.Address.street,
            number: customer.Address.number,
            zip: customer.Address.zip,
            city: customer.Address.city
          }
        }
      })
    }
  }
}
