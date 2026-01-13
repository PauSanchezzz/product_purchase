import { ProductModel } from 'domain/products/model/product.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
export class ProductEntity implements ProductModel {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @Column()
  description: string;
  @Column()
  image: string;
  @Column()
  name: string;
  @Column()
  price: number;
  @Column()
  stock: number;
}