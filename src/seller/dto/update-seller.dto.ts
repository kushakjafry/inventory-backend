import { Length } from 'class-validator';

export class UpdateSellerDto {
  @Length(5, 255)
  name: string;
}
