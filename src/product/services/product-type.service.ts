import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryBuilder } from 'src/shared/helper/query-builder.class';
import { UpdateProductTypeDto } from '../dto/update-product-type.dto';
import { ProductTypeI } from '../interfaces/product-type.interface';

@Injectable()
export class ProductTypeService {
  constructor(
    @InjectModel('ProductType')
    private readonly productTypeModel: Model<ProductTypeI>,
  ) {}

  async getProductTypes(query: any): Promise<any> {
    const queryBuilder = new QueryBuilder(
      this.productTypeModel.find(),
      query,
    ).execAll();
    const count = new QueryBuilder(
      this.productTypeModel.find(),
      query,
    ).filter();
    return {
      productTypes: await queryBuilder.query,
      totalCount: await count.query,
    };
  }

  async getProductTypeById(id: string): Promise<ProductTypeI | null> {
    return await this.productTypeModel.findById(id);
  }

  async updateProductById(
    id: string,
    input: UpdateProductTypeDto,
  ): Promise<ProductTypeI | null> {
    return await this.productTypeModel.findByIdAndUpdate(id, input);
  }

  async deleteProductTypeById(id: string): Promise<ProductTypeI | null> {
    return await this.productTypeModel.findByIdAndRemove(id);
  }

  async createProductType(input: any) {
    return await this.productTypeModel.create(input);
  }
}
