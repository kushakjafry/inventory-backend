import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { createUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { UserInterceptor } from '../interceptor/user.interceptor';
import { User } from '../models/user.entitiy';
import { UserService } from '../service/user.service';

@Controller('user')
@UseInterceptors(UserInterceptor)
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async addUser(@Body() input: createUserDto): Promise<User | null> {
    const user = await this.userService.registerUser(input);
    return user;
  }

  @Post('login')
  async loginUser(@Body() input: LoginUserDto): Promise<boolean> {
    return await this.userService.loginUser(input);
  }

  @Get(':username')
  async getUser(@Param('username') username: string): Promise<User> {
    const user = await this.userService.findOne(username);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
