import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Oauth2Strategy } from './oauth2.strategy'
import { AuthController } from './auth.controller'
import { HttpModule } from '@nestjs/axios'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    // JwtModule.register({
    //  secret: 'abcd',
    //  signOptions: { expiresIn: '60m' },
    // }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXP', '10s'),
        },
      }),
    }),
  ],
  providers: [AuthService, Oauth2Strategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
