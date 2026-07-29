import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssessmentRecord } from '../database/entities/assessment-record.entity';
import { CreateAssessmentRecordDto } from './dto/create-assessment-record.dto';

@Injectable()
export class AssessmentsService {
  constructor(
    @InjectRepository(AssessmentRecord)
    private readonly assessmentsRepository: Repository<AssessmentRecord>,
  ) {}

  create(dto: CreateAssessmentRecordDto): Promise<AssessmentRecord> {
    const record = this.assessmentsRepository.create(dto);
    return this.assessmentsRepository.save(record);
  }

  findByStudent(studentId: string): Promise<AssessmentRecord[]> {
    return this.assessmentsRepository.find({
      where: { studentId },
      order: { submittedAt: 'DESC' },
    });
  }

  async getSummary(studentId: string): Promise<{
    weightedAveragePercentage: number;
    assessmentCount: number;
  }> {
    const records = await this.findByStudent(studentId);
    const totalWeight = records.reduce((sum, r) => sum + Number(r.weight), 0);
    const weightedSum = records.reduce(
      (sum, r) =>
        sum + (Number(r.score) / Number(r.maxScore)) * Number(r.weight),
      0,
    );
    const weightedAveragePercentage =
      totalWeight === 0
        ? 0
        : Math.round((weightedSum / totalWeight) * 10000) / 100;
    return { weightedAveragePercentage, assessmentCount: records.length };
  }
}
