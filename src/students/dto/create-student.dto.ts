import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({ description: 'Anonymized identifier from the source dataset' })
  @IsString()
  externalId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  programme?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  cohortYear?: number;

  @ApiPropertyOptional({ default: 'UCI' })
  @IsOptional()
  @IsString()
  sourceDataset?: string;
}
