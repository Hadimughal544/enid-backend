import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { StudioformService } from './studioform.service';
import { MailService } from 'src/innovationmail/innovationmail.service';
import { StudioForm } from './studioform.entity';

@Controller('studioform')
export class StudioformController {
  constructor(
    private readonly FormService: StudioformService,
    private readonly mailservice: MailService,
  ) {}

  @Post()
  async create(@Body() formData: Partial<StudioForm>) {
    try {
      // Save form data in DB
      const savedForm = this.FormService.create(formData);

      // Build email body
      const message = `
        <h2>New Form Submission</h2>
        <p><strong>Name:</strong> ${formData.fullname}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phonenumber}</p>
        <p><strong>Service:</strong> ${formData.service}</p>
        <p><strong>Details:</strong> ${formData.details}</p>
      `;

      // Send email
      await this.mailservice.sendMail(
        'studio@enid.pk', // 📩 receiver email
        'New Form Submission',
        'A new form has been submitted.',
        message,
      );

      return {
        success: true,
        message: 'Form submitted and email sent!',
        data: savedForm,
      };
    } catch (error: unknown) {
      // ✅ Handle type-safe error logging
      console.error(
        'Error submitting form:',
        error instanceof Error ? error.message : error,
      );
      throw error;
    }
  }

  @Get()
  findAll() {
    return this.FormService.findAll();
  }

  @Get('id')
  findOne(@Param('id') id: number) {
    return this.FormService.findone(id);
  }

  @Delete('id')
  remove(@Param('id') id: number) {
    return this.FormService.remove(id);
  }
}
