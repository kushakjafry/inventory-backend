import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { attributeTypes } from '../interfaces/product-type.interface';

@Schema()
class ProductTypeAttributes extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: attributeTypes })
  type: string;
}

export const productTypeAttributesSchema = SchemaFactory.createForClass(
  ProductTypeAttributes,
);
