import { Products } from 'src/products/entities/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Orders } from './order.entity';

@Entity({
  name: 'ORDER_DETAILS',
})
export class OrderDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  @ManyToMany(() => Products)
  @JoinTable({ name: 'order_details_products' })
  products: Products[];

  @OneToOne(() => Orders, (order) => order.orderdetails)
  @JoinColumn({ name: 'order_id' })
  order: Orders;
}
