import { IsOptional, Length } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @Length(5, 255)
  name?: string;

  @IsOptional()
  @Length(8)
  password?: string;
}
