import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  const appPort = configService.get<number>('APP_PORT', 3000)
  await app.listen(appPort)
  //await app.listen(3000)
}
bootstrap()
