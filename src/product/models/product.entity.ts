import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Seller } from 'src/seller/models/seller.entity';
import { attributeTypes } from '../interfaces/product-type.interface';
import {
  ProductDimensionI,
  ProductPricingI,
} from '../interfaces/product.interface';
import { ProductType } from './product-type.entity';

@Schema()
class ProductPricing extends Document {
  @Prop({ required: true })
  MRP: string;
  @Prop({ required: true })
  discount: string;
  @Prop({ required: true })
  resellPrice: string;
  @Prop({ required: true })
  costPrice: string;
}
const productPricingSchema = SchemaFactory.createForClass(ProductPricing);

@Schema()
class ProductDimension extends Document {
  @Prop({ required: true })
  weight: number;
  @Prop({ required: true })
  length: number;
  @Prop({ required: true })
  width: number;

  @Prop({ required: true })
  height: number;
}
const productDimensionSchema = SchemaFactory.createForClass(ProductDimension);

@Schema()
class productAttributes extends Document {
  @Prop({ required: true })
  key: string;

  @Prop({ required: true, type: SchemaTypes.Mixed })
  value: any;

  @Prop({ enum: attributeTypes, required: true, default: 'STRING' })
  type: string;
}
const productAttributesSchema = SchemaFactory.createForClass(productAttributes);
productAttributesSchema.index({ key: 1, value: 1 });

@Schema({
  timestamps: true,
})
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, unique: true })
  skuId: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true, type: productPricingSchema, _id: false })
  pricing: ProductPricingI;

  @Prop({ required: true, type: productDimensionSchema, _id: false })
  dimension: ProductDimensionI;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: ProductType.name })
  productTypeId: ProductType;

  @Prop({ required: true, default: [], type: [productAttributesSchema] })
  attributes: productAttributes[];

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: Seller.name })
  sellerId: Seller;
}

export const productSchema = SchemaFactory.createForClass(Product);
