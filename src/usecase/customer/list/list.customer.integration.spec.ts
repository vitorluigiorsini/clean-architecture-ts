import { Sequelize } from 'sequelize-typescript'
import CustomerModel from '../../../infrastructure/customer/sequelize/customer.model'
import CustomerRepository from '../../../infrastructure/customer/sequelize/customer.repository'
import Address from '../../../domain/customer/value-object/address'
import ListCustomerUseCase from './list.customer.usecase'
import CustomerFactory from '../../../domain/customer/factory/customer.factory'

describe('Test list customers user case', () => {
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

  it('should list customers', async () => {
    const customerRepository = new CustomerRepository()
    const usecase = new ListCustomerUseCase(customerRepository)

    const customer1 = CustomerFactory.createWithAddress(
      'John',
      new Address('John Street', 1, 'John Zip', 'John City')
    )
    const customer2 = CustomerFactory.createWithAddress(
      'Mary',
      new Address('Mary Street', 1, 'Mary Zip', 'Mary City')
    )
    await customerRepository.create(customer1)
    await customerRepository.create(customer2)

    const input = {}

    const output = await usecase.execute(input)

    expect(output.customers).toBeDefined()
    expect(output.customers.length).toEqual(2)
    expect(output.customers[0].id).toBe(customer1.id)
    expect(output.customers[0].name).toBe(customer1.name)
    expect(output.customers[0].address.street).toBe(customer1.address.street)
    expect(output.customers[1].id).toBe(customer2.id)
    expect(output.customers[1].name).toBe(customer2.name)
    expect(output.customers[1].address.street).toBe(customer2.address.street)
  })
})
