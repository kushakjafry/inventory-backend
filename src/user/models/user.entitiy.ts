import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
