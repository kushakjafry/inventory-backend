import { Length } from 'class-validator';

export class CreateSellerDto {
  @Length(5, 255)
  name: string;

  @Length(5, 255)
  sellerId: string;
}
