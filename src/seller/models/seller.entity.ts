import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SellerI } from '../interfaces/seller.interface';

@Schema({
  timestamps: true,
  id: false,
})
export class Seller extends Document<SellerI> {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  sellerId: string;

  @Prop({ required: true, default: 0 })
  totalProducts: number;
}
export const sellerSchema = SchemaFactory.createForClass(Seller);
