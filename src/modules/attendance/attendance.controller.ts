import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtUser } from 'src/types';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums/role.enum';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';

@ApiTags('Attendance')
@ApiBearerAuth()
@Controller('attendance')
// TUZATISH: JwtAuthGuard va RolesGuard qo'shildi (oldin himoyasiz edi)
@UseGuards(JwtAuthGuard, RolesGuard)
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  @Roles(UserRole.TEACHER, UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: 'Davomat belgilash' })
  async create(
    @Body() dto: CreateAttendanceDto,
    @Req() req: { user: JwtUser },
  ) {
    return this.attendanceService.create(dto, req.user);
  }

  @Get('group/:groupId')
  @Roles(UserRole.TEACHER, UserRole.ADMIN, UserRole.SUPERADMIN)
  @ApiOperation({ summary: "Guruh davomatini ko'rish" })
  async findByGroup(
    @Param('groupId', ParseUUIDPipe) groupId: string,
    @Req() req: { user: JwtUser },
  ) {
    return this.attendanceService.findByGroup(groupId, req.user);
  }
}
