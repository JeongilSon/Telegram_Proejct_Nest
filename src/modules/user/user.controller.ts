/**
 * 기존 .NET Core 프로젝트 대응 파일: Telegram_Project2_Web/Controllers/UserController.cs
 * 
 * 변경사항:
 * - [ApiController, Route("api/[controller]")] → @Controller('api/user')
 * - [HttpGet] → @Get()
 * - [HttpPost] → @Post()
 * - [HttpPut] → @Put()
 * - [HttpDelete] → @Delete()
 * - Task<ActionResult<List<UserModel>>> → Promise<User[]>
 * - Task<IActionResult> → Promise<void>
 * - 직접 DbContext 사용 → UserService 의존성 주입
 * - try-catch 에러 처리 → Nest.js Exception Filters로 자동 처리
 * - Swagger 어노테이션 → @ApiOperation, @ApiResponse 데코레이터
 */

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../../entities/user.entity';

@ApiTags('users')
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: '모든 사용자 조회' })
  @ApiResponse({ status: 200, description: '사용자 목록 반환', type: [User] })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':chatId')
  @ApiOperation({ summary: '특정 사용자 조회' })
  @ApiResponse({ status: 200, description: '사용자 정보 반환', type: User })
  @ApiResponse({ status: 404, description: '사용자를 찾을 수 없음' })
  async findOne(@Param('chatId') chatId: string): Promise<User> {
    return this.userService.findOne(chatId);
  }

  @Post()
  @ApiOperation({ summary: '새 사용자 생성' })
  @ApiResponse({ status: 201, description: '사용자가 성공적으로 생성됨', type: User })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Put(':chatId')
  @ApiOperation({ summary: '사용자 정보 업데이트' })
  @ApiResponse({ status: 200, description: '사용자 정보가 업데이트됨', type: User })
  @ApiResponse({ status: 404, description: '사용자를 찾을 수 없음' })
  async update(
    @Param('chatId') chatId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(chatId, updateUserDto);
  }

  @Delete(':chatId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '사용자 삭제' })
  @ApiResponse({ status: 204, description: '사용자가 성공적으로 삭제됨' })
  @ApiResponse({ status: 404, description: '사용자를 찾을 수 없음' })
  async remove(@Param('chatId') chatId: string): Promise<void> {
    return this.userService.remove(chatId);
  }
} 