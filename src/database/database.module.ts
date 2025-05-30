/**
 * 기존 .NET Core 프로젝트 대응 파일: Telegram_Project2_Web/Models/AppDbContext.cs
 * 
 * 변경사항:
 * - Entity Framework Core → TypeORM 사용
 * - public class AppDbContext : DbContext → @Module() 데코레이터 사용
 * - DbSet<Model> 속성들 → entities 배열로 등록
 * - OnModelCreating() → forRootAsync() 설정에서 처리
 * - Connection String → ConfigService를 통한 환경변수 관리
 * - modelBuilder.Entity<>().ToTable() → @Entity() 데코레이터로 이동
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';
import { Livechat } from '../entities/livechat.entity';
import { Account } from '../entities/account.entity';
import { BotToken } from '../entities/bot-token.entity';
import { Channel } from '../entities/channel.entity';
import { Link } from '../entities/link.entity';
import { Mission } from '../entities/mission.entity';
import { BotMessage } from '../entities/bot-message.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get('DB_USERNAME', 'root'),
        password: configService.get('DB_PASSWORD', ''),
        database: configService.get('DB_DATABASE', 'telegram_project'),
        entities: [User, Livechat, Account, BotToken, Channel, Link, Mission, BotMessage],
        synchronize: configService.get('NODE_ENV') === 'development',
        logging: configService.get('NODE_ENV') === 'development',
        timezone: '+09:00',
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {} 