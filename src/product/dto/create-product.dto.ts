import { Type } from 'class-transformer';
import {
  Allow,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { attributeTypesEnum } from '../interfaces/product-type.interface';

export class ProductPricingDto {
  @IsString()
  MRP: string;
  @IsString()
  discount: string;
  @IsString()
  resellPrice: string;
  @IsString()
  costPrice: string;
}

export class ProductDimensionDto {
  @IsNumber()
  weight: number;
  @IsNumber()
  length: number;
  @IsNumber()
  width: number;
  @IsNumber()
  height: number;
}

export class ProductAttributesDto {
  @IsString()
  key: string;
  @IsNotEmpty()
  value: string | number | Date | boolean;
  @IsOptional()
  @IsEnum(attributeTypesEnum)
  type: attributeTypesEnum;
}

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  skuId: string;

  @IsString()
  productTypeId: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductPricingDto)
  pricing: ProductPricingDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductDimensionDto)
  dimension: ProductDimensionDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductAttributesDto)
  attributes: ProductAttributesDto[] | [];

  @IsOptional()
  quantity: number;

  @IsString()
  sellerId: number;
}
