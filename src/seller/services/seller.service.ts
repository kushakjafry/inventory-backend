import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryBuilder } from 'src/shared/helper/query-builder.class';
import { CreateSellerDto } from '../dto/create-seller.dto';
import { UpdateSellerDto } from '../dto/update-seller.dto';
import { SellerI } from '../interfaces/seller.interface';

@Injectable()
export class SellerService {
  constructor(
    @InjectModel('Seller')
    private readonly sellerModel: Model<SellerI>,
  ) {}

  async getAllSellers(query): Promise<SellerI[] | null> {
    const queryBuilder = new QueryBuilder(
      this.sellerModel.find(),
      query,
    ).execAll();
    return await queryBuilder.query;
  }

  async createSeller(input: CreateSellerDto): Promise<SellerI | null> {
    return await this.sellerModel.create(input);
  }

  async updateSeller(
    sellerId: string,
    input: UpdateSellerDto,
  ): Promise<SellerI | null> {
    return await this.sellerModel.findOneAndUpdate(
      { sellerId: sellerId },
      { $set: input },
      { new: true },
    );
  }
  async deleteSeller(sellerId: string): Promise<SellerI | null> {
    return await this.sellerModel.findOneAndRemove({ sellerId: sellerId });
  }
}
