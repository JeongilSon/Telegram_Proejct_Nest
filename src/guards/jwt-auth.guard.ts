/**
 * JWT 인증 가드
 * API 엔드포인트를 보호하기 위한 가드
 */

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {} 