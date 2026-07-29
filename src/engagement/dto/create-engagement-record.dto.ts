import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsISO8601,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateEngagementRecordDto {
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
  @IsISO8601()
  periodStart: string;

  @ApiProperty()
  @IsISO8601()
  periodEnd: string;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  vleClicks?: number;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  loginCount?: number;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  forumPosts?: number;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  resourceAccessCount?: number;
}
