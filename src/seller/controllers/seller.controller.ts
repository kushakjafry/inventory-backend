import { Get, Query } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { SellerService } from '../services/seller.service';

@Controller('seller')
export class SellerController {
  constructor(private sellerService: SellerService) {}
  @Get()
  async getAllProducts(@Query() query: any) {
    return await this.sellerService.getAllSellers(query);
  }
}
