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


# Telegram Project - Nest.js Migration

기존 .NET Core Telegram 프로젝트를 Nest.js로 마이그레이션한 학습 프로젝트입니다.

## 🏗️ 프로젝트 구조

```
telegram-nestjs-project/
├── src/
│   ├── modules/
│   │   ├── auth/           # 인증 모듈 (AccountController)
│   │   ├── user/           # 사용자 관리 (UserController)
│   │   ├── bot/            # 봇 토큰 관리 (BotController)
│   │   ├── chat/           # 실시간 채팅 (LivechatController)
│   │   ├── channel/        # 채널 관리 (ChannelController)
│   │   ├── link/           # 링크 관리 (LinkController)
│   │   ├── mission/        # 미션 관리 (MissionController)
│   │   └── bot-message/    # 봇 메시지 (BotMessageController)
│   ├── entities/           # TypeORM 엔티티들
│   ├── dto/               # Data Transfer Objects
│   ├── guards/            # 인증 가드
│   ├── decorators/        # 커스텀 데코레이터
│   └── common/            # 공통 유틸리티
├── frontend/              # React.js 프론트엔드
└── docs/                  # 마이그레이션 문서
```

## 🛠️ 기술 스택

### 백엔드
- **Framework**: Nest.js (Express 기반)
- **Database**: MySQL + TypeORM
- **Authentication**: JWT + Passport
- **Real-time**: Socket.IO
- **Validation**: class-validator
- **Documentation**: Swagger

### 프론트엔드
- **Framework**: React.js + TypeScript
- **State Management**: Redux Toolkit
- **UI Library**: Material-UI
- **Real-time**: Socket.IO Client
- **HTTP Client**: Axios

## 📋 마이그레이션 단계

### Phase 1: 기본 설정
- [x] Nest.js 프로젝트 초기화
- [ ] TypeORM 설정
- [ ] MySQL 연결 설정
- [ ] 기본 모듈 구조 생성

### Phase 2: 엔티티 및 데이터베이스
- [ ] 모든 엔티티 마이그레이션
- [ ] 관계 설정
- [ ] 마이그레이션 파일 생성

### Phase 3: API 엔드포인트
- [ ] 인증 모듈 (AccountController)
- [ ] 사용자 관리 (UserController)
- [ ] 봇 관리 (BotController)
- [ ] 실시간 채팅 (LivechatController)
- [ ] 기타 모듈들

### Phase 4: 실시간 기능
- [ ] Socket.IO 설정
- [ ] 실시간 채팅 구현
- [ ] 실시간 알림

### Phase 5: 프론트엔드
- [ ] React 프로젝트 설정
- [ ] 컴포넌트 마이그레이션
- [ ] 상태 관리 구현

## 🚀 빠른 시작

```bash
# 1. 프로젝트 클론
git clone <repository-url>
cd telegram-nestjs-project

# 2. 백엔드 설정
npm install
cp .env.example .env
# .env 파일에서 데이터베이스 설정

# 3. 데이터베이스 마이그레이션
npm run migration:run

# 4. 개발 서버 시작
npm run start:dev

# 5. 프론트엔드 (별도 터미널)
cd frontend
npm install
npm start
```

## 📚 학습 목표

1. **Nest.js 아키텍처 이해**
   - 모듈, 컨트롤러, 서비스 패턴
   - 의존성 주입 (DI)
   - 가드, 인터셉터, 파이프

2. **TypeORM 활용**
   - 엔티티 설계
   - 관계 매핑
   - 쿼리 빌더

3. **실시간 통신**
   - Socket.IO 구현
   - WebSocket 연결 관리

4. **인증 및 보안**
   - JWT 토큰
   - Passport 전략
   - 권한 관리

5. **API 설계**
   - RESTful API
   - Swagger 문서화
   - 에러 핸들링

## 📖 참고 자료

- [Nest.js 공식 문서](https://docs.nestjs.com/)
- [TypeORM 문서](https://typeorm.io/)
- [Socket.IO 문서](https://socket.io/) 