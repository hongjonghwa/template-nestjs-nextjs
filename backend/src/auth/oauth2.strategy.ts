import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { Strategy } from 'passport-oauth2'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class Oauth2Strategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    const options = {
      authorizationURL: configService.get('OAUTH2_GITLAB_AUTHORIZATION_ENDPOINT'),
      tokenURL: configService.get('OAUTH2_GITLAB_TOKEN_ENDPOINT'),
      clientID: configService.get('OAUTH2_GITLAB_CLIENT_ID'),
      callbackURL: configService.get('OAUTH2_GITLAB_REDIRECT_URI'),
      scope: configService.get('OAUTH2_GITLAB_SCOPE').split(' '),
    }
    super(options)
  }
}
