import { Module } from '@nestjs/common';
import { FormController } from './form.controller';
import { FormService } from './form.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from './form.entity';
import { InnovationMailModule } from 'src/innovationmail/innovationmail.module';

@Module({
  imports: [TypeOrmModule.forFeature([Form]), InnovationMailModule],
  controllers: [FormController],
  providers: [FormService],
})
export class FormModule {}
