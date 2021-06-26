import { ProductAttributesDto } from '../dto/create-product.dto';
import { attributeTypesEnum } from './product-type.interface';

export interface ProductPricingI {
  MRP: string;
  discount: string;
  resellPrice: string;
  costPrice: string;
}

export interface ProductDimensionI {
  weight: number;
  length: number;
  width: number;
  height: number;
}

export interface ProductAttributeI {
  key: string;
  value: string | number | Date | boolean;
  type: attributeTypesEnum;
}

export interface ProductI {
  name: string;
  description: string;
  skuId: string;
  quantity: number;
  productTypeId: string;
  pricing: ProductPricingI;
  dimension: ProductDimensionI;
  attributes: ProductAttributeI[] | [];
}
