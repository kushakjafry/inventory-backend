import { Injectable } from '@nestjs/common';
import * as Bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await Bcrypt.compare(password, hashedPassword);
  }

  async hashPassword(password: string): Promise<string> {
    return await Bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT));
  }
}
