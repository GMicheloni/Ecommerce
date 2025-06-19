import { Module } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductController } from './products.controller';
import { Products } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from 'src/categories/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Categories])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductsModule {}
