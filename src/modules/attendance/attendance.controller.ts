import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';

@ApiTags('Attendance')
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  @ApiOperation({ summary: "O'quvchining yo'qlamasini qayd etish" })
  create(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceService.create(createAttendanceDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha yo'qlamalarni ko'rish" })
  findAll() {
    return this.attendanceService.findAll();
  }

  @Get('group/:groupId')
  @ApiOperation({ summary: "Guruh bo'yicha yo'qlamalarni filtrlash" })
  findByGroup(@Param('groupId') groupId: string) {
    return this.attendanceService.findByGroup(groupId);
  }
}
