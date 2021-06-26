import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProductInterfaceAttributes } from '../interfaces/product-type.interface';
import { productTypeAttributesSchema } from './product-type-attribute.entity';

@Schema({
  timestamps: true,
})
export class ProductType extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, type: [productTypeAttributesSchema] })
  attributes: ProductInterfaceAttributes[];
}

export const productTypeSchema = SchemaFactory.createForClass(ProductType);
