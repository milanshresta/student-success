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
import { EngagementService } from './engagement.service';
import { CreateEngagementRecordDto } from './dto/create-engagement-record.dto';

@ApiTags('engagement')
@ApiBearerAuth()
@UseGuards(FirebaseAuthGuard)
@Controller()
export class EngagementController {
  constructor(private readonly engagementService: EngagementService) {}

  @Post('engagement-records')
  create(@Body() dto: CreateEngagementRecordDto) {
    return this.engagementService.create(dto);
  }

  @Get('students/:studentId/engagement-records')
  findByStudent(@Param('studentId', ParseUUIDPipe) studentId: string) {
    return this.engagementService.findByStudent(studentId);
  }

  @Get('students/:studentId/engagement-summary')
  getSummary(@Param('studentId', ParseUUIDPipe) studentId: string) {
    return this.engagementService.getSummary(studentId);
  }
}
