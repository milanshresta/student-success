import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Student } from './student.entity';

export enum ModelType {
  CLASSICAL_ML = 'CLASSICAL_ML',
  DEEP_LEARNING = 'DEEP_LEARNING',
}

export enum RiskLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

@Entity('risk_assessments')
export class RiskAssessment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ name: 'student_id' })
  studentId: string;

  @ManyToOne(() => Student, (student) => student.riskAssessments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Column({ name: 'model_type', type: 'enum', enum: ModelType })
  modelType: ModelType;

  @Column({ name: 'model_version', default: 'v1' })
  modelVersion: string;

  @Column({ name: 'risk_score', type: 'decimal', precision: 5, scale: 4 })
  riskScore: number;

  @Column({ name: 'risk_level', type: 'enum', enum: RiskLevel })
  riskLevel: RiskLevel;

  @Column({ name: 'contributing_factors', type: 'jsonb', nullable: true })
  contributingFactors?: Record<string, number>;

  @Column({ name: 'predicted_at', type: 'timestamptz' })
  predictedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
