import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { RecommendationStatus } from '../../database/entities/recommendation.entity';

export class UpdateRecommendationStatusDto {
  @ApiProperty({ enum: RecommendationStatus })
  @IsEnum(RecommendationStatus)
  status: RecommendationStatus;
}
