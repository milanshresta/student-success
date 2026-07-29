import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceRecordDto } from './dto/create-attendance-record.dto';

@ApiTags('attendance')
@ApiBearerAuth()
@UseGuards(FirebaseAuthGuard)
@Controller()
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('attendance-records')
  create(@Body() dto: CreateAttendanceRecordDto) {
    return this.attendanceService.create(dto);
  }

  @Get('students/:studentId/attendance-records')
  findByStudent(@Param('studentId', ParseUUIDPipe) studentId: string) {
    return this.attendanceService.findByStudent(studentId);
  }

  @Get('students/:studentId/attendance-summary')
  getSummary(@Param('studentId', ParseUUIDPipe) studentId: string) {
    return this.attendanceService.getSummary(studentId);
  }
}
