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

@Entity('engagement_records')
export class EngagementRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ name: 'student_id' })
  studentId: string;

  @ManyToOne(() => Student, (student) => student.engagementRecords, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Column({ name: 'course_code' })
  courseCode: string;

  @Column({ name: 'term' })
  term: string;

  @Column({ name: 'period_start', type: 'date' })
  periodStart: string;

  @Column({ name: 'period_end', type: 'date' })
  periodEnd: string;

  @Column({ name: 'vle_clicks', type: 'int', default: 0 })
  vleClicks: number;

  @Column({ name: 'login_count', type: 'int', default: 0 })
  loginCount: number;

  @Column({ name: 'forum_posts', type: 'int', default: 0 })
  forumPosts: number;

  @Column({ name: 'resource_access_count', type: 'int', default: 0 })
  resourceAccessCount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
