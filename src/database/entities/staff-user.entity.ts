import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum StaffRole {
  ACADEMIC_STAFF = 'ACADEMIC_STAFF',
  ADMIN = 'ADMIN',
}

@Entity('staff_users')
export class StaffUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column({ name: 'firebase_uid' })
  firebaseUid: string;

  @Column()
  email: string;

  @Column({ name: 'display_name', nullable: true })
  displayName?: string;

  @Column({ type: 'enum', enum: StaffRole, default: StaffRole.ACADEMIC_STAFF })
  role: StaffRole;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
