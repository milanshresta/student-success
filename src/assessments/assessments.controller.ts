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
import { AssessmentsService } from './assessments.service';
import { CreateAssessmentRecordDto } from './dto/create-assessment-record.dto';

@ApiTags('assessments')
@ApiBearerAuth()
@UseGuards(FirebaseAuthGuard)
@Controller()
export class AssessmentsController {
  constructor(private readonly assessmentsService: AssessmentsService) {}

  @Post('assessment-records')
  create(@Body() dto: CreateAssessmentRecordDto) {
    return this.assessmentsService.create(dto);
  }

  @Get('students/:studentId/assessment-records')
  findByStudent(@Param('studentId', ParseUUIDPipe) studentId: string) {
    return this.assessmentsService.findByStudent(studentId);
  }

  @Get('students/:studentId/assessment-summary')
  getSummary(@Param('studentId', ParseUUIDPipe) studentId: string) {
    return this.assessmentsService.getSummary(studentId);
  }
}
