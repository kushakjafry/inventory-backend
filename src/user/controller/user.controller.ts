import {
  Body,
  ConflictException,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { createUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { UserInterceptor } from '../interceptor/user.interceptor';
import { UserI } from '../interfaces/user.interface';
import { UserService } from '../service/user.service';

@Controller('user')
@UseInterceptors(UserInterceptor)
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async addUser(@Body() input: createUserDto): Promise<UserI | null> {
    const user = await this.userService.registerUser(input);
    return user;
  }

  @Post('login')
  async loginUser(@Body() input: LoginUserDto): Promise<any> {
    return await this.userService.loginUser(input);
  }

  @Get(':username')
  async getUser(@Param('username') username: string): Promise<UserI> {
    const user = await this.userService.findOne(username);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
