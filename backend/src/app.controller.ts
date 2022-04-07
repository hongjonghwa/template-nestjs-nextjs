import { Controller, Get, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  index(): void {
    return
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('api')
  api(): string {
    return 'succeed'
  }
}
