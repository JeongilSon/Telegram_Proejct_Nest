/**
 * 기존 .NET Core 프로젝트의 여러 설정 파일들을 통합한 루트 모듈
 * 대응 파일들: Program.cs, Startup.cs (만약 있었다면), appsettings.json
 * 
 * 역할:
 * - .NET Core의 DI Container 설정 통합
 * - 모든 하위 모듈들을 등록하고 관리
 * - 글로벌 설정 (ConfigModule, DatabaseModule) 등록
 * 
 * .NET Core와의 차이점:
 * - .NET Core: Program.cs에서 서비스 등록
 * - Nest.js: 루트 모듈에서 다른 모듈들을 imports로 등록
 * 
 * 모듈 구조:
 * - ConfigModule: 환경변수 관리 (.NET Core appsettings.json 역할)
 * - DatabaseModule: 데이터베이스 연결 설정
 * - UserModule: 사용자 관련 기능 모듈
 * - AuthModule: 인증 관련 기능 모듈
 * - ChatModule: 실시간 채팅 기능 모듈
 * - BotModule: 봇 토큰 관리 모듈
 * - ChannelModule: 채널 관리 모듈
 */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ChatModule } from './modules/chat/chat.module';
import { BotModule } from './modules/bot/bot.module';
import { ChannelModule } from './modules/channel/channel.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    ChatModule,
    BotModule,
    ChannelModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {} 