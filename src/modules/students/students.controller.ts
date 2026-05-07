import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentsService } from './students.service';

@ApiTags('Students') // Swaggerda guruhlash
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi o'quvchi qo'shish" })
  @ApiResponse({
    status: 201,
    description: "O'quvchi muvaffaqiyatli yaratildi.",
  })
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha o'quvchilar ro'yxatini olish" })
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "ID bo'yicha bitta o'quvchini ko'rish" })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.studentsService.findOne(id);
  }
}
