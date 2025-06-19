import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OrderDetails } from './orderDetails.entity';
import { Users } from 'src/users/entities/user.entity';

@Entity({
  name: 'ORDERS',
})
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order)
  orderdetails: OrderDetails;

  @ManyToOne(() => Users, (user) => user.order)
  @JoinColumn({ name: 'user_id' })
  user: Users;
}
