/**
 * 사용자 업데이트를 위한 DTO
 * .NET Core에서는 동일한 UserModel을 사용했지만, 업데이트 전용 DTO로 분리
 * 
 * 특징:
 * - PartialType을 사용하여 CreateUserDto의 모든 필드를 선택적으로 만듦
 * - OmitType으로 chat_ID 필드 제외 (Primary Key는 업데이트 불가)
 * - 모든 필드가 optional이므로 부분 업데이트 가능
 * 
 * .NET Core 대비 장점:
 * - 업데이트 시 필요한 필드만 정의
 * - Primary Key 수정 방지
 * - 타입 안전성 보장
 */

import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { OmitType } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['chat_ID'] as const)
) {} 