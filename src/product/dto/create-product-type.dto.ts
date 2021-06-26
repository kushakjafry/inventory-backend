import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, ValidateNested } from 'class-validator';
import { attributeTypesEnum } from '../interfaces/product-type.interface';

export class CreateProductTypeAttributeDto {
  @IsNotEmpty()
  name: string;

  @IsEnum(attributeTypesEnum)
  type: attributeTypesEnum;
}

export class CreateProductTypeDto {
  @IsNotEmpty()
  name: string;

  @ValidateNested({ each: true })
  @Type(() => CreateProductTypeAttributeDto)
  attributes: CreateProductTypeAttributeDto[];
}
