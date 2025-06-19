import { Injectable } from '@nestjs/common';
import * as data from '../data.json';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  async createIntoDataBase() {
    const categoriesFromData = Array.from(
      new Set(data.map((product) => product.category)),
    );
    const categoriesToSave = categoriesFromData.map((name) => ({ name }));
    await this.categoriesRepository
      .createQueryBuilder()
      .insert()
      .into(Categories)
      .values(categoriesToSave)
      .orIgnore()
      .execute();

    return 'Las categorias fueron agregadas con exito';
  }

  findAll() {
    return this.categoriesRepository.find();
  }
  async update(categories) {
    await this.categoriesRepository.save(categories);
    return 'categorias actualizadas';
  }
}
