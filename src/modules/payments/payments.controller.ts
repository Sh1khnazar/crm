import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentsService } from './payments.service';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('top-up')
  @ApiOperation({ summary: "O'quvchi balansini to'ldirish (Kirim)" })
  topUp(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.topUp(createPaymentDto);
  }

  @Get('student/:studentId')
  @ApiOperation({ summary: "O'quvchining barcha to'lovlar tarixini ko'rish" })
  findAllByStudent(@Param('studentId') studentId: string) {
    return this.paymentsService.findAllByStudent(studentId);
  }
}
