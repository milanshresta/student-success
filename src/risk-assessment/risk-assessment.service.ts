import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ModelType,
  RiskAssessment,
  RiskLevel,
} from '../database/entities/risk-assessment.entity';
import { AnalyticsPipelineService } from '../analytics-pipeline/analytics-pipeline.service';
import {
  AnalyticsClientService,
  ModelPrediction,
} from '../analytics-pipeline/analytics-client.service';

const HIGH_RISK_THRESHOLD = 0.66;
const MEDIUM_RISK_THRESHOLD = 0.33;

@Injectable()
export class RiskAssessmentService {
  constructor(
    @InjectRepository(RiskAssessment)
    private readonly riskAssessmentRepository: Repository<RiskAssessment>,
    private readonly analyticsPipelineService: AnalyticsPipelineService,
    private readonly analyticsClientService: AnalyticsClientService,
  ) {}

  async runAssessment(studentId: string): Promise<RiskAssessment[]> {
    const features =
      await this.analyticsPipelineService.buildFeatureVector(studentId);

    const [classicalPrediction, deepLearningPrediction] = await Promise.all([
      this.analyticsClientService.predictClassicalMl(features),
      this.analyticsClientService.predictDeepLearning(features),
    ]);

    return Promise.all([
      this.saveAssessment(
        studentId,
        ModelType.CLASSICAL_ML,
        classicalPrediction,
      ),
      this.saveAssessment(
        studentId,
        ModelType.DEEP_LEARNING,
        deepLearningPrediction,
      ),
    ]);
  }

  private saveAssessment(
    studentId: string,
    modelType: ModelType,
    prediction: ModelPrediction,
  ): Promise<RiskAssessment> {
    const assessment = this.riskAssessmentRepository.create({
      studentId,
      modelType,
      modelVersion: prediction.modelVersion,
      riskScore: prediction.riskScore,
      riskLevel: this.toRiskLevel(prediction.riskScore),
      contributingFactors: prediction.contributingFactors,
      predictedAt: new Date(),
    });
    return this.riskAssessmentRepository.save(assessment);
  }

  private toRiskLevel(riskScore: number): RiskLevel {
    if (riskScore >= HIGH_RISK_THRESHOLD) {
      return RiskLevel.HIGH;
    }
    if (riskScore >= MEDIUM_RISK_THRESHOLD) {
      return RiskLevel.MEDIUM;
    }
    return RiskLevel.LOW;
  }

  findByStudent(studentId: string): Promise<RiskAssessment[]> {
    return this.riskAssessmentRepository.find({
      where: { studentId },
      order: { predictedAt: 'DESC' },
    });
  }

  findAtRisk(riskLevel: RiskLevel = RiskLevel.HIGH): Promise<RiskAssessment[]> {
    return this.riskAssessmentRepository.find({
      where: { riskLevel },
      relations: { student: true },
      order: { predictedAt: 'DESC' },
    });
  }
}
