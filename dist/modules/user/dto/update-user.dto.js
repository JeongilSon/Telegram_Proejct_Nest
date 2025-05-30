"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_user_dto_1 = require("./create-user.dto");
const swagger_2 = require("@nestjs/swagger");
class UpdateUserDto extends (0, swagger_1.PartialType)((0, swagger_2.OmitType)(create_user_dto_1.CreateUserDto, ['chat_ID'])) {
}
exports.UpdateUserDto = UpdateUserDto;
//# sourceMappingURL=update-user.dto.js.map