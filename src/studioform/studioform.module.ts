import { Module } from '@nestjs/common';
import { StudioformController } from './studioform.controller';
import { StudioformService } from './studioform.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudioForm } from './studioform.entity';
import { InnovationMailModule } from 'src/innovationmail/innovationmail.module';

@Module({
  imports: [TypeOrmModule.forFeature([StudioForm]), InnovationMailModule],
  controllers: [StudioformController],
  providers: [StudioformService],
})
export class StudioformModule {}
