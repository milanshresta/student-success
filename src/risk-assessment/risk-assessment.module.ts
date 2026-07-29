import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiskAssessment } from '../database/entities/risk-assessment.entity';
import { AnalyticsPipelineModule } from '../analytics-pipeline/analytics-pipeline.module';
import { RiskAssessmentService } from './risk-assessment.service';
import { RiskAssessmentController } from './risk-assessment.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([RiskAssessment]),
    AnalyticsPipelineModule,
  ],
  controllers: [RiskAssessmentController],
  providers: [RiskAssessmentService],
  exports: [RiskAssessmentService],
})
export class RiskAssessmentModule {}
