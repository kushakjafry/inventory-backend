import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { createUserDto } from '../dto/create-user.dto';
import { User } from '../interfaces/user.interface';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':username')
  async getUser(@Param('username') username: string): Promise<User> {
    const user = await this.userService.findOne(username);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Post('register')
  async addUser(@Body() input: createUserDto): Promise<User | null> {
    const user = await this.userService.registerUser(input);
    return user;
  }
}
