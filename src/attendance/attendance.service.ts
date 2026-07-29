import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttendanceRecord } from '../database/entities/attendance-record.entity';
import { CreateAttendanceRecordDto } from './dto/create-attendance-record.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(AttendanceRecord)
    private readonly attendanceRepository: Repository<AttendanceRecord>,
  ) {}

  create(dto: CreateAttendanceRecordDto): Promise<AttendanceRecord> {
    const attendanceRate =
      dto.sessionsScheduled === 0
        ? 0
        : Math.round((dto.sessionsAttended / dto.sessionsScheduled) * 10000) /
          100;
    const record = this.attendanceRepository.create({ ...dto, attendanceRate });
    return this.attendanceRepository.save(record);
  }

  findByStudent(studentId: string): Promise<AttendanceRecord[]> {
    return this.attendanceRepository.find({
      where: { studentId },
      order: { recordedAt: 'DESC' },
    });
  }

  async getSummary(studentId: string): Promise<{
    averageAttendanceRate: number;
    totalSessionsScheduled: number;
    totalSessionsAttended: number;
  }> {
    const records = await this.findByStudent(studentId);
    const totalSessionsScheduled = records.reduce(
      (sum, r) => sum + r.sessionsScheduled,
      0,
    );
    const totalSessionsAttended = records.reduce(
      (sum, r) => sum + r.sessionsAttended,
      0,
    );
    const averageAttendanceRate =
      totalSessionsScheduled === 0
        ? 0
        : Math.round((totalSessionsAttended / totalSessionsScheduled) * 10000) /
          100;
    return {
      averageAttendanceRate,
      totalSessionsScheduled,
      totalSessionsAttended,
    };
  }
}
