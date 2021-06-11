import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/services/auth.service';
import { createUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { UserI } from '../interfaces/user.interface';
import { User } from '../models/user.entitiy';
@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly UserModel: Model<UserI>,
    private authService: AuthService,
  ) {}
  private readonly users: UserI[];

  async findOne(username: string): Promise<UserI | null> {
    return await this.UserModel.findOne({ username: username });
  }

  async registerUser(payload: createUserDto): Promise<UserI | null> {
    if (!(await this.userExists(payload.username))) {
      const hashedPassword = await this.authService.hashPassword(
        payload.password,
      );
      return await this.UserModel.create({
        ...payload,
        password: hashedPassword,
      });
    } else {
      throw new ConflictException('Username already in use');
    }
  }

  async loginUser(payload: LoginUserDto): Promise<any> {
    const user = await this.UserModel.findOne({
      username: payload.username,
    }).select('password');
    if (!user) {
      throw new BadRequestException('No user Found');
    } else {
      if (
        await this.authService.comparePassword(payload.password, user.password)
      ) {
        const jwtObj = {
          sub: user._id,
          username: user.username,
        };
        const token = await this.authService.generateJwt(jwtObj);
        return {
          status: 'Successfully Logged In',
          success: true,
          token,
        };
      } else {
        throw new BadRequestException('password is incorrect');
      }
    }
  }

  private async userExists(username: string): Promise<boolean> {
    const user = await this.UserModel.findOne({ username: username });
    if (!user) return false;
    else return true;
  }
}
