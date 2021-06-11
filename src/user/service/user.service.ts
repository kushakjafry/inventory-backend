import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/services/auth.service';
import { createUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { User } from '../models/user.entitiy';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly UserModel: Model<User>,
    private authService: AuthService,
  ) {}
  private readonly users: User[];

  async findOne(username: string): Promise<User | null> {
    return await this.UserModel.findOne({ username: username });
  }

  async registerUser(payload: createUserDto): Promise<User | null> {
    if (!(await this.userExists(payload.username))) {
      const hashedPassword = await this.authService.hashPassword(
        payload.password,
      );
      return await this.UserModel.create({
        ...payload,
        password: hashedPassword,
      });
    } else {
      throw new HttpException('Username already in use', HttpStatus.CONFLICT);
    }
  }

  async loginUser(payload: LoginUserDto): Promise<boolean> {
    const user = await this.UserModel.findOne({
      username: payload.username,
    }).select('password');
    return await this.authService.comparePassword(
      payload.password,
      user.password,
    );
  }

  private async userExists(username: string): Promise<boolean> {
    const user = await this.UserModel.findOne({ username: username });
    if (!user) return false;
    else return true;
  }
}
