# .NET Core → Nest.js 파일 대응 매핑

## 📋 엔티티 (Models → Entities)

| Nest.js TypeScript | .NET Core C# | 설명 |
|-------------------|--------------|------|
| `src/entities/user.entity.ts` | `Models/UserModel.cs` | 사용자 엔티티 |
| `src/entities/livechat.entity.ts` | `Models/LivechatModel.cs` | 실시간 채팅 엔티티 |
| `src/entities/account.entity.ts` | `Models/AccountModel.cs` | 관리자 계정 엔티티 |
| `src/entities/bot-token.entity.ts` | `Models/BotTokenModel.cs` | 봇 토큰 엔티티 |

## 🗄️ 데이터베이스 설정

| Nest.js TypeScript | .NET Core C# | 설명 |
|-------------------|--------------|------|
| `src/database/database.module.ts` | `Models/AppDbContext.cs` | 데이터베이스 컨텍스트 및 설정 |

## 🎛️ 컨트롤러 (Controllers → Controllers)

| Nest.js TypeScript | .NET Core C# | 설명 |
|-------------------|--------------|------|
| `src/modules/user/user.controller.ts` | `Controllers/UserController.cs` | 사용자 API 컨트롤러 |

## ⚙️ 서비스 계층 (새로운 계층)

| Nest.js TypeScript | .NET Core 원본 위치 | 설명 |
|-------------------|-------------------|------|
| `src/modules/user/user.service.ts` | `Controllers/UserController.cs` 내부 로직 | 비즈니스 로직을 서비스로 분리 |

## 📦 모듈 시스템 (Nest.js 고유)

| Nest.js TypeScript | .NET Core 대응 | 설명 |
|-------------------|---------------|------|
| `src/modules/user/user.module.ts` | `Program.cs` DI 설정 | 모듈별 의존성 주입 관리 |
| `src/app.module.ts` | `Program.cs` + `appsettings.json` | 루트 모듈 및 글로벌 설정 |

## 📝 DTO (Data Transfer Objects) - 새로운 패턴

| Nest.js TypeScript | .NET Core 원본 | 설명 |
|-------------------|---------------|------|
| `src/modules/user/dto/create-user.dto.ts` | `UserModel` 직접 사용 | 사용자 생성용 DTO |
| `src/modules/user/dto/update-user.dto.ts` | `UserModel` 직접 사용 | 사용자 업데이트용 DTO |

## 🚀 애플리케이션 진입점

| Nest.js TypeScript | .NET Core C# | 설명 |
|-------------------|--------------|------|
| `src/main.ts` | `Program.cs` | 애플리케이션 부트스트랩 |

## 🔄 주요 변환 패턴

### 1. 엔티티 어노테이션 변환
```csharp
// .NET Core
[Table("user_list_table")]
public class UserModel
{
    [Key]
    public string Chat_ID { get; set; }
}
```

```typescript
// Nest.js
@Entity('user_list_table')
export class User {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  chat_ID: string;
}
```

### 2. 컨트롤러 어노테이션 변환
```csharp
// .NET Core
[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<UserModel>>> GetUsers()
}
```

```typescript
// Nest.js
@ApiTags('users')
@Controller('api/user')
export class UserController {
  @Get()
  @ApiOperation({ summary: '모든 사용자 조회' })
  async findAll(): Promise<User[]>
}
```

### 3. 의존성 주입 변환
```csharp
// .NET Core
public UserController(AppDbContext context)
{
    _context = context;
}
```

```typescript
// Nest.js
constructor(
  @InjectRepository(User)
  private userRepository: Repository<User>,
) {}
```

## 🆕 Nest.js에서 새로 도입된 개념

1. **모듈 시스템**: 기능별로 코드를 모듈로 분리
2. **DTO 패턴**: 입력/출력 데이터 검증 및 변환
3. **서비스 계층**: 비즈니스 로직을 컨트롤러에서 분리
4. **의존성 주입**: 더욱 체계적인 DI 시스템
5. **데코레이터**: TypeScript 데코레이터를 활용한 메타데이터 정의

## 📈 다음 마이그레이션 대상 파일들

| .NET Core 원본 | 예상 Nest.js 위치 | 우선순위 |
|---------------|------------------|---------|
| `Controllers/AccountController.cs` | `src/modules/auth/auth.controller.ts` | 높음 |
| `Controllers/LivechatController.cs` | `src/modules/chat/chat.controller.ts` | 높음 |
| `Controllers/BotController.cs` | `src/modules/bot/bot.controller.ts` | 중간 |
| `Controllers/ChannelController.cs` | `src/modules/channel/channel.controller.ts` | 중간 |
| `Controllers/LinkController.cs` | `src/modules/link/link.controller.ts` | 중간 |
| `Controllers/MissionController.cs` | `src/modules/mission/mission.controller.ts` | 중간 |
| `Controllers/QuestionController.cs` | `src/modules/question/question.controller.ts` | 낮음 |
| `Controllers/BotMessageController.cs` | `src/modules/bot-message/bot-message.controller.ts` | 낮음 | 