/**
 * DTO (Data Transfer Object) 패턴 적용
 * 기존 .NET Core에서는 UserModel을 직접 사용했지만, 보안과 유연성을 위해 DTO 분리
 * 
 * 기존 .NET Core 프로젝트와의 차이점:
 * - .NET Core: Controller에서 UserModel을 직접 받아서 처리
 * - Nest.js: CreateUserDto로 입력 데이터를 분리하여 검증 및 변환
 * 
 * 장점:
 * - 클라이언트로부터 받을 데이터만 명시적으로 정의
 * - class-validator로 입력 데이터 검증
 * - Swagger 문서 자동 생성을 위한 ApiProperty 데코레이터
 * - 엔티티와 API 계층 분리로 보안 강화
 * 
 * 참고: .NET Core에서도 DTO 패턴을 사용할 수 있지만, 이 프로젝트에서는 미적용
 */

import { IsString, IsOptional, IsNumber, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '채팅 ID', example: '123456789' })
  @IsString()
  chat_ID: string;

  @ApiProperty({ description: '텔레그램 ID', example: '@username', required: false })
  @IsOptional()
  @IsString()
  telegram_ID?: string;

  @ApiProperty({ description: '닉네임', example: '사용자1', required: false })
  @IsOptional()
  @IsString()
  nickName?: string;

  @ApiProperty({ description: '사용자 질문', required: false })
  @IsOptional()
  @IsString()
  user_Question?: string;

  @ApiProperty({ description: '링크 이동 여부 (0 또는 1)', example: 0, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  link_Move?: number;

  @ApiProperty({ description: '채널 이동 여부 (0 또는 1)', example: 0, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  channel_Move?: number;

  @ApiProperty({ description: '미션 완료 여부 (0 또는 1)', example: 0, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  mission_Complete?: number;
} 