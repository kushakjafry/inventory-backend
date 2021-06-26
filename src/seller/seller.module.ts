import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SellerController } from './controllers/seller.controller';
import { Seller, sellerSchema } from './models/seller.entity';
import { SellerService } from './services/seller.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Seller.name, schema: sellerSchema }]),
  ],
  controllers: [SellerController],
  providers: [SellerService],
})
export class SellerModule {}
