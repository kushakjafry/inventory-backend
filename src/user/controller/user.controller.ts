import {
  Put,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { jwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { createUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserInterceptor } from '../interceptor/user.interceptor';
import { UserI } from '../interfaces/user.interface';
import { UserService } from '../service/user.service';

@Controller('user')
@UseInterceptors(UserInterceptor)
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  @UseGuards(jwtAuthGuard)
  async addUser(@Body() input: createUserDto): Promise<UserI | null> {
    const user = await this.userService.registerUser(input);
    return user;
  }

  @Post('login')
  async loginUser(@Body() input: LoginUserDto): Promise<any> {
    return await this.userService.loginUser(input);
  }

  @Get(':username')
  @UseGuards(jwtAuthGuard)
  async getUser(@Param('username') username: string): Promise<UserI> {
    const user = await this.userService.findOne(username);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Put(':username')
  @UseGuards(jwtAuthGuard)
  async updateUser(
    @Param('username') username: string,
    @Body()
    input: UpdateUserDto,
  ): Promise<UserI | null> {
    return await this.userService.updateUser(username, input);
  }
}
