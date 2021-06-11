import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as Bcrypt from 'bcrypt';
import { User } from 'src/user/models/user.entitiy';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await Bcrypt.compare(password, hashedPassword);
  }

  async hashPassword(password: string): Promise<string> {
    return await Bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT));
  }

  async generateJwt(user: any): Promise<string> {
    return await this.jwtService.signAsync(user);
  }
}
