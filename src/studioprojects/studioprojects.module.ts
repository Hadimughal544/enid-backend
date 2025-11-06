import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Studioprojects } from './studioprojects.entity';
import { StudioProjectController } from './studioprojects.controller';
import { StudioProjectService } from './studioprojects.service';

@Module({
  imports: [TypeOrmModule.forFeature([Studioprojects])],
  controllers: [StudioProjectController],
  providers: [StudioProjectService],
})
export class StudioprojectsModule {}
