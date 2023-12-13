import { Sequelize } from 'sequelize-typescript'
import Product from '../../../domain/product/entity/product'
import ProductRepository from '../../../infrastructure/product/sequelize/product.repository'
import ListProductUseCase from './list.product.usecase'
import ProductModel from '../../../infrastructure/product/sequelize/product.model'

describe('Test list product use case', () => {
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
  it('should list all products', async () => {
    const productRepository = new ProductRepository()
    const usecase = new ListProductUseCase(productRepository)

    const product1 = new Product('1', 'Product 1', 100)
    const product2 = new Product('2', 'Product 2', 200)
    await productRepository.create(product1)
    await productRepository.create(product2)

    const output = await usecase.execute({})

    expect(output.products).toBeDefined()
    expect(output.products.length).toEqual(2)
    expect(output.products[0].id).toBe(product1.id)
    expect(output.products[0].name).toBe(product1.name)
    expect(output.products[0].price).toBe(product1.price)
    expect(output.products[1].id).toBe(product2.id)
    expect(output.products[1].name).toBe(product2.name)
    expect(output.products[1].price).toBe(product2.price)
  })
})
