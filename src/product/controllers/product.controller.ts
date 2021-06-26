import { Get, Param, Put } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { Body, Post } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product-dto';
import { ProductI } from '../interfaces/product.interface';
import { ProductService } from '../services/product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(@Query() query: any): Promise<any> {
    return await this.productService.getProducts(query);
  }

  @Post()
  async createProduct(
    @Body() input: CreateProductDto,
  ): Promise<ProductI | null> {
    return await this.productService.createProduct(input);
  }

  @Get('/critical')
  async getCriticalProducts(@Query() query: any): Promise<any> {
    return await this.productService.getCriticalProducts(query);
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<ProductI | null> {
    return await this.productService.getProductById(id);
  }

  @Put(':id')
  async updateProductById(
    @Param('id') id: string,
    @Body() input: UpdateProductDto,
  ): Promise<ProductI | null> {
    return await this.productService.updateProductById(id, input);
  }

  @Delete(':id')
  async deleteProductById(@Param('id') id: string): Promise<ProductI | null> {
    return await this.productService.deleteProductById(id);
  }
}
