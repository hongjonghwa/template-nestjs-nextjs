import { Injectable, Logger } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom, map } from 'rxjs'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async getJwt(code: string) {
    // config
    const tokenUri = this.configService.get('OAUTH2_GITLAB_TOKEN_ENDPOINT')
    const clientId = this.configService.get('OAUTH2_GITLAB_CLIENT_ID')
    const clientSecret = this.configService.get('OAUTH2_GITLAB_CLIENT_SECRET')
    const redirectUri = this.configService.get('OAUTH2_GITLAB_REDIRECT_URI')
    const userinfoUri = this.configService.get('OAUTH2_GITLAB_USERINFO_ENDPOINT')
    // oauth token
    const token = await firstValueFrom(
      this.httpService
        .post(tokenUri, {
          code,
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'authorization_code',
          redirect_uri: redirectUri,
        })
        .pipe(map((res) => res.data)),
    )

    // profile
    const profile = await firstValueFrom(
      this.httpService
        .get(userinfoUri, {
          params: {
            access_token: token.access_token,
          },
        })
        .pipe(map((res) => res.data)),
    )
    this.logger.log(`profile ${JSON.stringify(profile)}`)

    // jwt
    const { sub, name, email } = profile
    const payload = { sub: sub, username: name, email: email }
    this.logger.log(`payload ${JSON.stringify(payload)}`)
    const jwt = this.jwtService.sign(payload)

    this.logger.log(`jwt created`)
    return jwt
  }
}
