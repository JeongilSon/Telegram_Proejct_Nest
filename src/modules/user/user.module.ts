/**
 * Nest.js 고유의 모듈 시스템 - .NET Core에는 직접적인 대응 파일 없음
 * 
 * 기능:
 * - .NET Core에서는 Program.cs의 DI Container 설정과 유사한 역할
 * - Controller, Service, Repository를 하나의 모듈로 묶어서 관리
 * - 의존성 주입 설정: TypeOrmModule.forFeature([User])
 * - 서비스 등록: providers: [UserService]
 * - 컨트롤러 등록: controllers: [UserController]
 * - 다른 모듈에서 사용할 수 있도록 내보내기: exports: [UserService]
 * 
 * .NET Core와의 차이점:
 * - .NET Core: Program.cs에서 전역 DI 설정
 * - Nest.js: 각 기능별로 모듈을 분리하여 관리
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {} 