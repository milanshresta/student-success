import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Student } from './student.entity';
import { RiskAssessment } from './risk-assessment.entity';

export enum RecommendationType {
  EARLY_WARNING = 'EARLY_WARNING',
  GUIDANCE = 'GUIDANCE',
}

export enum RecommendationStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  ACKNOWLEDGED = 'ACKNOWLEDGED',
  RESOLVED = 'RESOLVED',
}

@Entity('recommendations')
export class Recommendation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ name: 'student_id' })
  studentId: string;

  @ManyToOne(() => Student, (student) => student.recommendations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Column({ name: 'risk_assessment_id', nullable: true })
  riskAssessmentId?: string;

  @ManyToOne(() => RiskAssessment, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'risk_assessment_id' })
  riskAssessment?: RiskAssessment;

  @Column({ type: 'enum', enum: RecommendationType })
  type: RecommendationType;

  @Column()
  title: string;

  @Column({ type: 'text' })
  message: string;

  @Column({
    type: 'enum',
    enum: RecommendationStatus,
    default: RecommendationStatus.PENDING,
  })
  status: RecommendationStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'resolved_at', type: 'timestamptz', nullable: true })
  resolvedAt?: Date;
}
