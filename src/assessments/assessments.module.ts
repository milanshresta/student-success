import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssessmentRecord } from '../database/entities/assessment-record.entity';
import { AssessmentsService } from './assessments.service';
import { AssessmentsController } from './assessments.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AssessmentRecord])],
  controllers: [AssessmentsController],
  providers: [AssessmentsService],
  exports: [AssessmentsService],
})
export class AssessmentsModule {}
