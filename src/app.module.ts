import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { StudentsModule } from './students/students.module';
import { AttendanceModule } from './attendance/attendance.module';
import { AssessmentsModule } from './assessments/assessments.module';
import { EngagementModule } from './engagement/engagement.module';
import { AnalyticsPipelineModule } from './analytics-pipeline/analytics-pipeline.module';
import { RiskAssessmentModule } from './risk-assessment/risk-assessment.module';
import { RecommendationsModule } from './recommendations/recommendations.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    DatabaseModule,
    AuthModule,
    StudentsModule,
    AttendanceModule,
    AssessmentsModule,
    EngagementModule,
    AnalyticsPipelineModule,
    RiskAssessmentModule,
    RecommendationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
