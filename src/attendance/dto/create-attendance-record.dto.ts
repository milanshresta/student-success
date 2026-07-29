import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsISO8601, IsString, IsUUID, Min } from 'class-validator';

export class CreateAttendanceRecordDto {
  @ApiProperty()
  @IsUUID()
  studentId: string;

  @ApiProperty()
  @IsString()
  courseCode: string;

  @ApiProperty()
  @IsString()
  term: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  sessionsScheduled: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  sessionsAttended: number;

  @ApiProperty()
  @IsISO8601()
  recordedAt: string;
}
