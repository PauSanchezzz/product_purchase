import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('orders')
export class OrderEntity {
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

  @Column()
  total: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;
}
