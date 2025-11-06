import { Module } from '@nestjs/common';
import { MailService } from './innovationmail.service';

@Module({
  providers: [MailService],
  exports: [MailService],
})
export class InnovationMailModule {}
