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

@Entity('attendance_records')
export class AttendanceRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ name: 'student_id' })
  studentId: string;

  @ManyToOne(() => Student, (student) => student.attendanceRecords, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Column({ name: 'course_code' })
  courseCode: string;

  @Column({ name: 'term' })
  term: string;

  @Column({ name: 'sessions_scheduled', type: 'int' })
  sessionsScheduled: number;

  @Column({ name: 'sessions_attended', type: 'int' })
  sessionsAttended: number;

  @Column({ name: 'attendance_rate', type: 'decimal', precision: 5, scale: 2 })
  attendanceRate: number;

  @Column({ name: 'recorded_at', type: 'date' })
  recordedAt: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
