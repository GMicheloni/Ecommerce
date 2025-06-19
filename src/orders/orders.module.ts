import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetails } from './entities/orderDetails.entity';
import { Categories } from 'src/categories/entities/category.entity';
import { Products } from 'src/products/entities/product.entity';
import { Orders } from './entities/order.entity';
import { Users } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Products,
      Categories,
      OrderDetails,
      Orders,
      Users,
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
