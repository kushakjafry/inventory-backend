import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { productSchema } from './models/product.entity';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { productTypeSchema } from './models/product-type.entity';
import { ProductTypeController } from './controllers/product-type.controller';
import { ProductTypeService } from './services/product-type.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: productSchema },
      { name: 'ProductType', schema: productTypeSchema },
    ]),
    AuthModule,
    UserModule,
  ],
  controllers: [ProductController, ProductTypeController],
  providers: [ProductService, ProductTypeService],
})
export class ProductModule {}
