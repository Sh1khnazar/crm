import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums/role.enum';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentsService } from './payments.service';

@ApiTags('Payments')
@ApiBearerAuth()
@Controller('payments')
// TUZATISH: Auth guard qo'shildi (oldin himoyasiz edi)
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('top-up')
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @ApiOperation({ summary: "O'quvchi balansini to'ldirish (Kirim)" })
  topUp(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.topUp(createPaymentDto);
  }

  @Get('student/:studentId')
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN, UserRole.TEACHER)
  @ApiOperation({ summary: "O'quvchining barcha to'lovlar tarixini ko'rish" })
  findAllByStudent(@Param('studentId', ParseUUIDPipe) studentId: string) {
    return this.paymentsService.findAllByStudent(studentId);
  }
}
