import { SellerI } from './seller.interface';

export interface GetAllSellerI {
  seller: SellerI[];
  totalCount: number;
}
