import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { RecommendationsService } from './recommendations.service';
import { UpdateRecommendationStatusDto } from './dto/update-recommendation-status.dto';

@ApiTags('recommendations')
@ApiBearerAuth()
@UseGuards(FirebaseAuthGuard)
@Controller()
export class RecommendationsController {
  constructor(
    private readonly recommendationsService: RecommendationsService,
  ) {}

  @Post('students/:studentId/recommendations')
  generateForStudent(@Param('studentId', ParseUUIDPipe) studentId: string) {
    return this.recommendationsService.generateForStudent(studentId);
  }

  @Get('students/:studentId/recommendations')
  findByStudent(@Param('studentId', ParseUUIDPipe) studentId: string) {
    return this.recommendationsService.findByStudent(studentId);
  }

  @Get('recommendations/early-warnings')
  findPendingEarlyWarnings() {
    return this.recommendationsService.findPendingEarlyWarnings();
  }

  @Patch('recommendations/:id/status')
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateRecommendationStatusDto,
  ) {
    return this.recommendationsService.updateStatus(id, dto);
  }
}
