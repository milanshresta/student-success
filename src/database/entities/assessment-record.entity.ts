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

export enum AssessmentType {
  QUIZ = 'QUIZ',
  COURSEWORK = 'COURSEWORK',
  EXAM = 'EXAM',
  PROJECT = 'PROJECT',
}

@Entity('assessment_records')
export class AssessmentRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ name: 'student_id' })
  studentId: string;

  @ManyToOne(() => Student, (student) => student.assessmentRecords, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Column({ name: 'course_code' })
  courseCode: string;

  @Column({ name: 'term' })
  term: string;

  @Column({ type: 'enum', enum: AssessmentType })
  type: AssessmentType;

  @Column({ name: 'score', type: 'decimal', precision: 6, scale: 2 })
  score: number;

  @Column({ name: 'max_score', type: 'decimal', precision: 6, scale: 2 })
  maxScore: number;

  @Column({
    name: 'weight',
    type: 'decimal',
    precision: 4,
    scale: 2,
    default: 1,
  })
  weight: number;

  @Column({ name: 'submitted_at', type: 'date' })
  submittedAt: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
