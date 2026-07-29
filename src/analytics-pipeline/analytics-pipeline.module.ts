import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AttendanceModule } from '../attendance/attendance.module';
import { AssessmentsModule } from '../assessments/assessments.module';
import { EngagementModule } from '../engagement/engagement.module';
import { AnalyticsPipelineService } from './analytics-pipeline.service';
import { AnalyticsClientService } from './analytics-client.service';

@Module({
  imports: [HttpModule, AttendanceModule, AssessmentsModule, EngagementModule],
  providers: [AnalyticsPipelineService, AnalyticsClientService],
  exports: [AnalyticsPipelineService, AnalyticsClientService],
})
export class AnalyticsPipelineModule {}
