import { Sequelize } from 'sequelize-typescript'
import CustomerModel from '../../../infrastructure/customer/sequelize/customer.model'
import CustomerRepository from '../../../infrastructure/customer/sequelize/customer.repository'
import UpdateCustomerUseCase from './update.customer.usecase'
import CustomerFactory from '../../../domain/customer/factory/customer.factory'
import Address from '../../../domain/customer/value-object/address'
import Customer from '../../../domain/customer/entity/customer'

describe('Test update customer use case', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    await sequelize.addModels([CustomerModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should update a customer', async () => {
    const customerRepository = new CustomerRepository()
    const usecase = new UpdateCustomerUseCase(customerRepository)

    const customer = new Customer('123', 'John')
    const address = new Address('Street', 123, 'Zip', 'City')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const input = {
      id: '123',
      name: 'Mary',
      address: {
        street: 'Street updated',
        number: 123,
        zip: 'Zip updated',
        city: 'City updated'
      }
    }

    const output = await usecase.execute(input)

    expect(output).toEqual({
      id: input.id,
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zip: input.address.zip,
        city: input.address.city
      }
    })
  })
})
