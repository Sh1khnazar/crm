import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums/role.enum';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@ApiBearerAuth() // Swaggerda Authorize tugmasi ishlashi uchun
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN) // Faqat yuqori martabali adminlar yaratadi
  @ApiOperation({ summary: 'Yangi foydalanuvchi yaratish (Admin/Teacher)' })
  @ApiResponse({
    status: 201,
    description: 'Muvaffaqiyatli yaratildi',
    type: User,
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN) // O'qituvchilar barcha foydalanuvchilarni ko'rishi shart emas
  @ApiOperation({ summary: 'Barcha foydalanuvchilar roʻyxatini olish' })
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN, UserRole.TEACHER) // Hamma o'z profilini yoki boshqalarni ko'ra oladi
  @ApiOperation({ summary: 'ID boʻyicha foydalanuvchini olish' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return await this.usersService.findOne(id);
  }

  @Delete(':id')
  @Roles(UserRole.SUPERADMIN) // O'chirish huquqi faqat eng katta adminga
  @ApiOperation({ summary: 'Foydalanuvchini oʻchirish' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.usersService.remove(id);
  }
}
