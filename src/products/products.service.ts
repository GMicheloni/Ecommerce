import { Injectable, NotFoundException } from '@nestjs/common';
import * as data from '../data.json';
import { Products } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/categories/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  async createIntoDataBase() {
    const categories = await this.categoriesRepository.find();
    if (categories.length === 0)
      throw new NotFoundException('Las categorías aún no han sido creadas');
    const products = data.map((element) => {
      const category: Categories | undefined = categories.find(
        (category) => category.name === element.category,
      );
      const newProduct = new Products();
      newProduct.category = category!;
      newProduct.description = element.description;
      newProduct.name = element.name;
      newProduct.price = element.price;
      newProduct.stock = element.stock;
      return newProduct;
    });
    await this.productsRepository
      .createQueryBuilder()
      .insert()
      .into(Products)
      .values(products)
      .orIgnore()
      .execute();
    return 'Los productos fueron agregados con exito';
  }
  async getAll(page: number, limit: number): Promise<Products[]> {
    let products: Products[] = await this.productsRepository.find();
    const start = (page - 1) * limit;
    const end = start + +limit;
    products = products.slice(start, end);

    return products;
  }
  async updateProduct(id: string, update) {
    await this.productsRepository.update(id, update);
    return 'Producto Actualizado';
  }
}
