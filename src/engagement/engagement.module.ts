import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EngagementRecord } from '../database/entities/engagement-record.entity';
import { EngagementService } from './engagement.service';
import { EngagementController } from './engagement.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EngagementRecord])],
  controllers: [EngagementController],
  providers: [EngagementService],
  exports: [EngagementService],
})
export class EngagementModule {}
