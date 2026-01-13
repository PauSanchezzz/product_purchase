import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShippingInformationModel } from '../../../../../domain/shipping/model/shipping.model';

@Entity('shippings')
export class ShippingEntity implements ShippingInformationModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customer: string;

  @Column()
  customerEmail: string;

  @Column()
  address: string;

  @Column()
  country: string;

  @Column()
  region: string;

  @Column()
  city: string;

  @Column()
  postalCode: string;

  @Column()
  phone: string;
}
