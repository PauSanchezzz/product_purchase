import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';
import { ShippingEntity } from './shipping.entity';
import { OrderStatus } from '../../../../../domain/order/model/order-status.enum';
import { OrderModel } from '../../../../../domain/order/model/order.model';

@Entity('orders')
export class OrderEntity implements OrderModel {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  productId: number;

  @Column()
  quantity: number;
  
  @Column()
  shippingCost: number;

  @Column()
  subtotal: number;

  @Column({ nullable: true })
  iva: number;

  @Column()
  total: number;

  @Column({ type: 'varchar', default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column({ nullable: true })
  externalPaymentId: string;

  @Column({ nullable: true })
  shippingId: number;

  @ManyToOne(() => ShippingEntity)
  @JoinColumn({ name: 'shippingId' })
  shipping: ShippingEntity;

  @Column({ nullable: true })
  personalDataAuthToken: string;

  @Column({ nullable: true })
  endUserPolicyToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;
}
