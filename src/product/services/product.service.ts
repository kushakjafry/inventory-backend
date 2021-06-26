import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryBuilder } from 'src/shared/helper/query-builder.class';
import {
  CreateProductDto,
  ProductAttributesDto,
} from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product-dto';
import { ProductI } from '../interfaces/product.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductI>,
  ) {}

  // async advancedFilter(query: any, input: any) {
  //   const advanced;
  // }

  async getCriticalProducts(query: any): Promise<ProductI[] | null> {
    query.quantity = { lte: 2 };
    return await this.getProducts(query);
  }
  async getProducts(query: any): Promise<any> {
    const queryBuilder = new QueryBuilder(
      this.productModel.find(),
      query,
    ).execAll();
    return {
      products: await queryBuilder.query,
      count: await new QueryBuilder(this.productModel.find(), query)
        .filter()
        .limitFields()
        .sort()
        .query.countDocuments(),
    };
  }

  async createProduct(input: CreateProductDto): Promise<ProductI | null> {
    input.attributes = input?.attributes
      ? this.changeAttributesField(input.attributes)
      : [];
    return await this.productModel.create(input);
  }

  async getProductById(id: string): Promise<ProductI | null> {
    return await this.productModel.findById(id);
  }

  async updateProductById(
    id: string,
    input: UpdateProductDto,
  ): Promise<ProductI | null> {
    input.attributes = input?.attributes
      ? this.changeAttributesField(input.attributes)
      : [];
    return await this.productModel.findByIdAndUpdate(id, input);
  }

  async deleteProductById(id: string): Promise<ProductI | null> {
    return await this.productModel.findByIdAndDelete(id);
  }

  private changeAttributesField(attributes: ProductAttributesDto[]) {
    attributes.map((attribute) => {
      attribute.value =
        attribute?.type?.toString() === 'DATE'
          ? new Date(<Date>attribute.value)
          : attribute.value;
      return attribute;
    });
    return attributes;
  }
}
