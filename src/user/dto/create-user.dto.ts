import { Length } from 'class-validator';

export class createUserDto {
  @Length(5, 255)
  name: string;
  @Length(5, 255)
  username: string;
  @Length(8)
  password: string;
}
