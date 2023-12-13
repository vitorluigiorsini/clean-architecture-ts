import CustomerFactory from '../../../domain/customer/factory/customer.factory'
import CustomerRepositoryInterface from '../../../domain/customer/repository/customer.repository.interface'
import Address from '../../../domain/customer/value-object/address'
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from './update.customer.dto'

export default class UpdateCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository
  }

  async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {
    const customer = await this.customerRepository.find(input.id)
    customer.changeName(input.name)
    customer.changeAddress(
      new Address(input.address.street, input.address.number, input.address.zip, input.address.city)
    )

    await this.customerRepository.update(customer)

    const customerUpdated = await this.customerRepository.find(customer.id)

    return {
      id: customerUpdated.id,
      name: customerUpdated.name,
      address: {
        street: customerUpdated.address.street,
        number: customerUpdated.address.number,
        zip: customerUpdated.address.zip,
        city: customerUpdated.address.city
      }
    }
  }
}
