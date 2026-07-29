import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recommendation } from '../database/entities/recommendation.entity';
import { RiskAssessmentModule } from '../risk-assessment/risk-assessment.module';
import { RecommendationsService } from './recommendations.service';
import { RecommendationsController } from './recommendations.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Recommendation]), RiskAssessmentModule],
  controllers: [RecommendationsController],
  providers: [RecommendationsService],
  exports: [RecommendationsService],
})
export class RecommendationsModule {}
