import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Recommendation,
  RecommendationStatus,
  RecommendationType,
} from '../database/entities/recommendation.entity';
import {
  RiskAssessment,
  RiskLevel,
} from '../database/entities/risk-assessment.entity';
import { RiskAssessmentService } from '../risk-assessment/risk-assessment.service';
import { UpdateRecommendationStatusDto } from './dto/update-recommendation-status.dto';

const RISK_LEVEL_COPY: Record<RiskLevel, { title: string; message: string }> = {
  [RiskLevel.HIGH]: {
    title: 'Immediate academic support recommended',
    message:
      'This student shows a high combined risk score across attendance, assessment and engagement indicators. Consider scheduling a check-in and referring to student support services.',
  },
  [RiskLevel.MEDIUM]: {
    title: 'Monitor academic progress',
    message:
      'This student shows early signs of academic risk. Encourage engagement with course materials and monitor upcoming assessment results.',
  },
  [RiskLevel.LOW]: {
    title: 'On track',
    message:
      'This student currently shows no significant academic risk indicators.',
  },
};

@Injectable()
export class RecommendationsService {
  constructor(
    @InjectRepository(Recommendation)
    private readonly recommendationsRepository: Repository<Recommendation>,
    private readonly riskAssessmentService: RiskAssessmentService,
  ) {}

  async generateForStudent(studentId: string): Promise<Recommendation[]> {
    const assessments =
      await this.riskAssessmentService.findByStudent(studentId);
    const latestByModel = new Map<string, RiskAssessment>();
    for (const assessment of assessments) {
      if (!latestByModel.has(assessment.modelType)) {
        latestByModel.set(assessment.modelType, assessment);
      }
    }

    const created: Recommendation[] = [];
    for (const assessment of latestByModel.values()) {
      if (assessment.riskLevel === RiskLevel.LOW) {
        continue;
      }
      const copy = RISK_LEVEL_COPY[assessment.riskLevel];
      const recommendation = this.recommendationsRepository.create({
        studentId,
        riskAssessmentId: assessment.id,
        type:
          assessment.riskLevel === RiskLevel.HIGH
            ? RecommendationType.EARLY_WARNING
            : RecommendationType.GUIDANCE,
        title: copy.title,
        message: copy.message,
        status: RecommendationStatus.PENDING,
      });
      created.push(await this.recommendationsRepository.save(recommendation));
    }
    return created;
  }

  findByStudent(studentId: string): Promise<Recommendation[]> {
    return this.recommendationsRepository.find({
      where: { studentId },
      order: { createdAt: 'DESC' },
    });
  }

  findPendingEarlyWarnings(): Promise<Recommendation[]> {
    return this.recommendationsRepository.find({
      where: {
        type: RecommendationType.EARLY_WARNING,
        status: RecommendationStatus.PENDING,
      },
      relations: { student: true },
      order: { createdAt: 'DESC' },
    });
  }

  async updateStatus(
    id: string,
    dto: UpdateRecommendationStatusDto,
  ): Promise<Recommendation> {
    const recommendation = await this.recommendationsRepository.findOne({
      where: { id },
    });
    if (!recommendation) {
      throw new NotFoundException(`Recommendation ${id} not found`);
    }
    recommendation.status = dto.status;
    if (dto.status === RecommendationStatus.RESOLVED) {
      recommendation.resolvedAt = new Date();
    }
    return this.recommendationsRepository.save(recommendation);
  }
}
