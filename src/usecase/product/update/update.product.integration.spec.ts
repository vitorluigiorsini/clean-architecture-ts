import { Sequelize } from 'sequelize-typescript'
import Product from '../../../domain/product/entity/product'
import ProductRepository from '../../../infrastructure/product/sequelize/product.repository'
import UpdateProductUseCase from './update.product.usecase'
import ProductModel from '../../../infrastructure/product/sequelize/product.model'

describe('Test update product use case', () => {
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
  it('should update a product', async () => {
    const productRepository = new ProductRepository()
    const usecase = new UpdateProductUseCase(productRepository)

    const product = new Product('123', 'Product', 100)
    await productRepository.create(product)

    const input = {
      id: '123',
      name: 'Product updated',
      price: 200
    }

    const output = await usecase.execute(input)

    expect(output).toEqual(input)
  })
})
