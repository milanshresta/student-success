import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EngagementRecord } from '../database/entities/engagement-record.entity';
import { CreateEngagementRecordDto } from './dto/create-engagement-record.dto';

@Injectable()
export class EngagementService {
  constructor(
    @InjectRepository(EngagementRecord)
    private readonly engagementRepository: Repository<EngagementRecord>,
  ) {}

  create(dto: CreateEngagementRecordDto): Promise<EngagementRecord> {
    const record = this.engagementRepository.create(dto);
    return this.engagementRepository.save(record);
  }

  findByStudent(studentId: string): Promise<EngagementRecord[]> {
    return this.engagementRepository.find({
      where: { studentId },
      order: { periodStart: 'DESC' },
    });
  }

  async getSummary(studentId: string): Promise<{
    totalVleClicks: number;
    totalLoginCount: number;
    totalForumPosts: number;
    totalResourceAccessCount: number;
  }> {
    const records = await this.findByStudent(studentId);
    return records.reduce(
      (totals, r) => ({
        totalVleClicks: totals.totalVleClicks + r.vleClicks,
        totalLoginCount: totals.totalLoginCount + r.loginCount,
        totalForumPosts: totals.totalForumPosts + r.forumPosts,
        totalResourceAccessCount:
          totals.totalResourceAccessCount + r.resourceAccessCount,
      }),
      {
        totalVleClicks: 0,
        totalLoginCount: 0,
        totalForumPosts: 0,
        totalResourceAccessCount: 0,
      },
    );
  }
}
