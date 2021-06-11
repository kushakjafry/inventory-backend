import { Length } from 'class-validator';

export class LoginUserDto {
  @Length(5, 255) username: string;
  @Length(8) password: string;
}
