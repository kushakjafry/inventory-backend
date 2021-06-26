// import { Type } from 'class-transformer';
// import {
//   IsEnum,
//   IsNotEmpty,
//   IsOptional,
//   IsString,
//   ValidateNested,
// } from 'class-validator';
// import { attributeTypesEnum } from '../interfaces/product-type.interface';

import { PartialType } from '@nestjs/mapped-types';
import { CreateProductTypeDto } from './create-product-type.dto';

// export class UpdateProductTypeAttributeDto {
//   @IsNotEmpty()
//   name: string;

//   @IsEnum(attributeTypesEnum)
//   type: attributeTypesEnum;
// }

// export class updateProductTypeDto {
//   @IsOptional()
//   @IsString()
//   name?: string;

//   @IsOptional()
//   @ValidateNested({ each: true })
//   @Type(() => UpdateProductTypeAttributeDto)
//   attributes: UpdateProductTypeAttributeDto[];
// }

export class UpdateProductTypeDto extends PartialType(CreateProductTypeDto) {}
