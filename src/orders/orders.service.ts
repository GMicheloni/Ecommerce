import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Orders } from './entities/order.entity';
import { OrderDetails } from './entities/orderDetails.entity';
import { Products } from 'src/products/entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    @InjectRepository(Orders)
    private readonly orderRepository: Repository<Orders>,
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
    @InjectRepository(OrderDetails)
    private readonly orderDetailsRepository: Repository<OrderDetails>,
  ) {}
  async create(userId: string, productsId: string[]) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('usuario no encontrado');
    }
    const newOrder = new Orders();
    newOrder.date = new Date();
    newOrder.user = user;

    let total = 0;

    const productsArray = await Promise.all(
      productsId.map(async (productId) => {
        const product: Products | null = await this.productRepository.findOneBy(
          {
            id: productId,
          },
        );

        if (!product) {
          throw new NotFoundException('Producto no encontrado');
        }
        if (product.stock === 0)
          throw new NotFoundException(
            `No hay mas stock del producto ${product.name}`,
          );

        total += Number(product.price);

        await this.productRepository.update(
          { id: productId },
          { stock: product.stock - 1 },
        );
        return product;
      }),
    );

    const bdOrder = await this.orderRepository.save(newOrder);
    const newOrderDetails = new OrderDetails();
    newOrderDetails.order = bdOrder;
    newOrderDetails.price = Number(total.toFixed(2));
    newOrderDetails.products = productsArray;
    await this.orderDetailsRepository.save(newOrderDetails);
    return await this.orderRepository.find({
      where: { id: newOrder.id },
      relations: { orderdetails: true },
    });
  }

  async findOne(id: any) {
    return await this.orderRepository.find({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      where: { id: id },
      relations: { orderdetails: true },
    });
  }
}
