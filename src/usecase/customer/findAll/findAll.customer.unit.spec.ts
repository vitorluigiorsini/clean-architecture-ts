import CustomerFactory from '../../../domain/customer/factory/customer.factory'
import Address from '../../../domain/customer/value-object/address'
import FindAllCustomerUseCase from './findAll.customer.usecase'

const customer1 = CustomerFactory.createWithAddress(
  'John',
  new Address('John Street', 1, 'John Zip', 'John City')
)
const customer2 = CustomerFactory.createWithAddress(
  'Mary',
  new Address('Mary Street', 1, 'Mary Zip', 'Mary City')
)

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('Unit test customer find all use case', () => {
  it('should find all customers', async () => {
    const customerRepository = MockRepository()
    const customerFindAllUseCase = new FindAllCustomerUseCase(customerRepository)

    const output = await customerFindAllUseCase.execute({})

    expect(output.customers).toBeDefined()
    expect(output.customers.length).toEqual(2)
    expect(output.customers[0].id).toBe(customer1.id)
    expect(output.customers[0].name).toBe(customer1.name)
    expect(output.customers[0].address.street).toBe(customer1.Address.street)
    expect(output.customers[1].id).toBe(customer2.id)
    expect(output.customers[1].name).toBe(customer2.name)
    expect(output.customers[1].address.street).toBe(customer2.Address.street)
  })
})
