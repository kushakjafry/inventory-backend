import { Delete, Get, Param, Query } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductTypeDto } from '../dto/create-product-type.dto';
import { UpdateProductTypeDto } from '../dto/update-product-type.dto';
import { ProductTypeI } from '../interfaces/product-type.interface';
import { ProductTypeService } from '../services/product-type.service';

@Controller('product-type')
export class ProductTypeController {
  constructor(private readonly productTypeService: ProductTypeService) {}

  @Get()
  async getAllProductTypes(@Query() query: any): Promise<any> {
    return await this.productTypeService.getProductTypes(query);
  }

  @Post()
  async createProductType(
    @Body() input: CreateProductTypeDto,
  ): Promise<any | null> {
    return await this.productTypeService.createProductType(input);
  }

  @Get(':id')
  async getProductTypeById(
    @Param('id') id: string,
  ): Promise<ProductTypeI | null> {
    return await this.productTypeService.getProductTypeById(id);
  }

  @Put(':id')
  async updateProductTypeById(
    @Param('id') id: string,
    @Body() input: UpdateProductTypeDto,
  ): Promise<ProductTypeI | null> {
    return await this.productTypeService.updateProductById(id, input);
  }

  @Delete(':id')
  async deleteProductById(
    @Param('id') id: string,
  ): Promise<ProductTypeI | null> {
    return await this.productTypeService.deleteProductTypeById(id);
  }
}
