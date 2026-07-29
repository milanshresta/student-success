import { Injectable } from '@nestjs/common';
import { AttendanceService } from '../attendance/attendance.service';
import { AssessmentsService } from '../assessments/assessments.service';
import { EngagementService } from '../engagement/engagement.service';

export interface StudentFeatureVector {
  studentId: string;
  attendanceRate: number;
  weightedAssessmentPercentage: number;
  vleClicks: number;
  loginCount: number;
  forumPosts: number;
  resourceAccessCount: number;
}

@Injectable()
export class AnalyticsPipelineService {
  constructor(
    private readonly attendanceService: AttendanceService,
    private readonly assessmentsService: AssessmentsService,
    private readonly engagementService: EngagementService,
  ) {}

  async buildFeatureVector(studentId: string): Promise<StudentFeatureVector> {
    const [attendanceSummary, assessmentSummary, engagementSummary] =
      await Promise.all([
        this.attendanceService.getSummary(studentId),
        this.assessmentsService.getSummary(studentId),
        this.engagementService.getSummary(studentId),
      ]);

    return {
      studentId,
      attendanceRate: attendanceSummary.averageAttendanceRate,
      weightedAssessmentPercentage: assessmentSummary.weightedAveragePercentage,
      vleClicks: engagementSummary.totalVleClicks,
      loginCount: engagementSummary.totalLoginCount,
      forumPosts: engagementSummary.totalForumPosts,
      resourceAccessCount: engagementSummary.totalResourceAccessCount,
    };
  }
}
