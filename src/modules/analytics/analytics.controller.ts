import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('dashboard')
  getStats() {
    return this.analyticsService.getDashboardStats();
  }

  @Get('monthly-chart')
  getChart() {
    return this.analyticsService.getMonthlyStats();
  }
}
