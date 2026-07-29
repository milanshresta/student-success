import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { AssessmentType } from '../../database/entities/assessment-record.entity';

export class CreateAssessmentRecordDto {
  @ApiProperty()
  @IsUUID()
  studentId: string;

  @ApiProperty()
  @IsString()
  courseCode: string;

  @ApiProperty()
  @IsString()
  term: string;

  @ApiProperty({ enum: AssessmentType })
  @IsEnum(AssessmentType)
  type: AssessmentType;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  score: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  maxScore: number;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @IsNumber()
  weight?: number;

  @ApiProperty()
  @IsISO8601()
  submittedAt: string;
}
