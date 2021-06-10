import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createUserDto } from '../dto/create-user.dto';
import { User } from '../interfaces/user.interface';
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly UserModel: Model<User>) {}
  private readonly users: User[];

  async findOne(username: string): Promise<User | null> {
    return await this.UserModel.findOne({ username: username });
  }

  async registerUser(payload: createUserDto): Promise<User | null> {
    return await this.UserModel.create({ ...payload });
  }
}
