import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ShippingEntity } from "../entities/shipping.entity";
import { IShippingRepository } from "domain/shipping/repository/shipping.repository";
import { ShippingInformationModel } from "domain/shipping/model/shipping.model";

@Injectable()
export class ShippingPostgresRepository implements IShippingRepository {

    constructor(
        @InjectRepository(ShippingEntity)
        private readonly shippingRepository: Repository<ShippingEntity>
    ) {}

    async createShipping(shipping: Omit<ShippingInformationModel, 'id'>): Promise<ShippingInformationModel> {
        try {
            const shippingEntity = this.shippingRepository.create(shipping)
            return await this.shippingRepository.save(shippingEntity)
        } catch (error) {
            throw error
        }
    }
}