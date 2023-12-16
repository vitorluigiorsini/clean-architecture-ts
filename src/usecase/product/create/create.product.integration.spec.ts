import { Sequelize } from 'sequelize-typescript'
import ProductModel from '../../../infrastructure/product/sequelize/product.model'
import ProductRepository from '../../../infrastructure/product/sequelize/product.repository'
import CreateProductUseCase from './create.product.usecase'

describe('Test create product use case', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    await sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })
  it('should create a product', async () => {
    const productRepository = new ProductRepository()
    const usecase = new CreateProductUseCase(productRepository)

    const input = {
      type: 'a',
      name: 'Product',
      price: 100
    }

    const output = await usecase.execute(input)

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price
    })
  })
})
