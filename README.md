# Telegram Project - Nest.js Migration

기존 .NET Core Telegram 프로젝트를 Nest.js로 마이그레이션한 학습 프로젝트입니다.

## 🏗️ 현재 구현된 기능

### ✅ Phase 1: 기본 설정
- [x] Nest.js 프로젝트 초기화
- [x] TypeORM + MySQL 설정
- [x] 기본 모듈 구조 생성
- [x] Swagger API 문서화 설정

### ✅ Phase 2: 엔티티 및 데이터베이스
- [x] User 엔티티 생성
- [x] Livechat 엔티티 생성  
- [x] Account 엔티티 생성
- [x] BotToken 엔티티 생성
- [x] 엔티티 관계 설정

### ✅ Phase 3: 기본 API 구현
- [x] User 모듈 (Controller, Service, DTO)
- [x] CRUD 기본 기능
- [x] Validation 설정

### 🚧 다음 단계
- [ ] 인증 모듈 (JWT + Passport)
- [ ] 실시간 채팅 모듈 (Socket.IO)
- [ ] 봇 관리 모듈
- [ ] 채널/링크/미션 모듈들
- [ ] React 프론트엔드

## 🛠️ 기술 스택

### 백엔드
- **Framework**: Nest.js + TypeScript
- **Database**: MySQL + TypeORM  
- **Validation**: class-validator
- **Documentation**: Swagger/OpenAPI
- **Architecture**: 모듈화된 아키텍처

## 🚀 설치 및 실행

### 1. 의존성 설치
이미 설치 완료된 패키지들:
```bash
npm install
```

### 2. 환경 설정
`.env` 파일을 생성하고 다음 내용을 입력:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=telegram_project

# Application Configuration
PORT=3000
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:3001
```

### 3. 데이터베이스 설정
MySQL에서 데이터베이스 생성:
```sql
CREATE DATABASE telegram_project;
```

### 4. 개발 서버 실행
```bash
npm run start:dev
```

## 📚 API 문서

개발 서버 실행 후 다음 URL에서 Swagger API 문서 확인:
- http://localhost:3000/api/docs

## 🔍 현재 구현된 API 엔드포인트

### User API
- `GET /api/user` - 모든 사용자 조회
- `GET /api/user/:chatId` - 특정 사용자 조회  
- `POST /api/user` - 새 사용자 생성
- `PUT /api/user/:chatId` - 사용자 정보 업데이트
- `DELETE /api/user/:chatId` - 사용자 삭제

## 📝 .NET Core에서 Nest.js로 마이그레이션된 내용

### 1. 엔티티 변환
**.NET Core Entity Framework** → **TypeORM**
```csharp
// .NET Core (C#)
[Table("user_list_table")]
public class UserModel
{
    [Key]
    public string Chat_ID { get; set; }
    public string? Telegram_ID { get; set; }
}
```

```typescript
// Nest.js (TypeScript)
@Entity('user_list_table')
export class User {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  chat_ID: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  telegram_ID: string;
}
```

### 2. 컨트롤러 변환
**.NET Core Controller** → **Nest.js Controller**
```csharp
// .NET Core (C#)
[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<UserModel>>> GetUsers()
    {
        return await _context.Users.ToListAsync();
    }
}
```

```typescript
// Nest.js (TypeScript)
@ApiTags('users')
@Controller('api/user')
export class UserController {
  @Get()
  @ApiOperation({ summary: '모든 사용자 조회' })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
```

### 3. 의존성 주입
**.NET Core DI** → **Nest.js DI**
```csharp
// .NET Core (C#)
public UserController(AppDbContext context)
{
    _context = context;
}
```

```typescript
// Nest.js (TypeScript)
constructor(
  @InjectRepository(User)
  private userRepository: Repository<User>,
) {}
```

## 🎯 학습 목표 달성 체크리스트

### Nest.js 아키텍처 이해 ✅
- [x] 모듈, 컨트롤러, 서비스 패턴 구현
- [x] 의존성 주입 (DI) 활용
- [ ] 가드, 인터셉터, 파이프 구현

### TypeORM 활용 ✅
- [x] 엔티티 설계 및 생성
- [x] 관계 매핑 (OneToMany, ManyToOne)
- [x] Repository 패턴

### API 설계 ✅
- [x] RESTful API 구현
- [x] Swagger 문서화
- [x] DTO 및 Validation

### 다음 학습 목표 🚧
- [ ] JWT 인증 시스템
- [ ] Socket.IO 실시간 통신
- [ ] 에러 핸들링 및 로깅
- [ ] 테스트 코드 작성

## 📖 참고 자료

- [Nest.js 공식 문서](https://docs.nestjs.com/)
- [TypeORM 문서](https://typeorm.io/)
- [class-validator](https://github.com/typestack/class-validator)

## 🤝 기여하기

1. 프로젝트 포크
2. 새 브랜치 생성 (`git checkout -b feature/new-feature`)
3. 변경사항 커밋 (`git commit -am 'Add new feature'`)
4. 브랜치 푸시 (`git push origin feature/new-feature`)
5. Pull Request 생성
