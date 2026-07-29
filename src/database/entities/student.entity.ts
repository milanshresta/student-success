import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AttendanceRecord } from './attendance-record.entity';
import { AssessmentRecord } from './assessment-record.entity';
import { EngagementRecord } from './engagement-record.entity';
import { RiskAssessment } from './risk-assessment.entity';
import { Recommendation } from './recommendation.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column({ name: 'external_id' })
  externalId: string;

  @Column({ name: 'programme', nullable: true })
  programme?: string;

  @Column({ name: 'cohort_year', nullable: true })
  cohortYear?: number;

  @Column({ name: 'source_dataset', default: 'UCI' })
  sourceDataset: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => AttendanceRecord, (record) => record.student)
  attendanceRecords: AttendanceRecord[];

  @OneToMany(() => AssessmentRecord, (record) => record.student)
  assessmentRecords: AssessmentRecord[];

  @OneToMany(() => EngagementRecord, (record) => record.student)
  engagementRecords: EngagementRecord[];

  @OneToMany(() => RiskAssessment, (record) => record.student)
  riskAssessments: RiskAssessment[];

  @OneToMany(() => Recommendation, (record) => record.student)
  recommendations: Recommendation[];
}
