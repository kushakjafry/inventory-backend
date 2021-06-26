import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/services/auth.service';
import { UserController } from './controller/user.controller';
import { UserInterceptor } from './interceptor/user.interceptor';
import { User, UserSchema } from './models/user.entitiy';
import { UserService } from './service/user.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        imports: [AuthModule],
        inject: [AuthService],
        useFactory: async (authService: AuthService) => {
          const schema = UserSchema;
          schema.pre('findOneAndUpdate', async function () {
            const user: any = this;
            if (user?._update?.$set?.password) {
              user._update.$set.password = await authService.hashPassword(
                user._update.$set.password,
              );
            }
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, UserInterceptor],
  exports: [UserService],
})
export class UserModule {}
