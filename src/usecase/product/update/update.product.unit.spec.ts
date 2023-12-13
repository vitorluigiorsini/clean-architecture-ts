import Product from '../../../domain/product/entity/product'
import UpdateProductUseCase from './update.product.usecase'

const product = new Product('123', 'Product', 100)

const input = {
  id: '123',
  name: 'Product updated',
  price: 200
}
const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    update: jest.fn(),
    create: jest.fn()
  }
}
describe('Unit test update product use case', () => {
  it('should update a product', async () => {
    const productRepository = MockRepository()
    const usecase = new UpdateProductUseCase(productRepository)

    const output = await usecase.execute(input)

    expect(output).toEqual(input)
  })
})
