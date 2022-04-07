import { Controller, Get, Logger, Query, Redirect, Res, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Response } from 'express'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name)

  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('oauth2'))
  @Get('login')
  login(): void {
    return
  }

  @Get('gitlab/callback')
  @Redirect('/', 302)
  async auth_callback(@Query('code') code, @Res({ passthrough: true }) response: Response): Promise<string> {
    const jwt = await this.authService.getJwt(code)
    response.cookie('SESSIONID', jwt, { httpOnly: false, secure: true })
    this.logger.log(`cookie 'SESSIONID' set to ${jwt}`)
    return jwt
  }
}
