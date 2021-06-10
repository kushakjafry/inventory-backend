import { Length } from 'class-validator';

export class createUserDto {
  name: String;
  @Length(5, 255)
  username: String;
  @Length(5, 255)
  password: String;
}
