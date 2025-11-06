import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FormService } from './form.service';
import { Form } from './form.entity';
import { MailService } from 'src/innovationmail/innovationmail.service';

@Controller('form')
export class FormController {
  constructor(
    private readonly formService: FormService, // ✅ lowercase "f" for instance
    private readonly mailService: MailService, // ✅ lowercase "m" for instance
  ) {}

  // ✅ Create a new form (save + send email)
  @Post()
  async create(@Body() formData: Partial<Form>) {
    try {
      // Save form data in DB
      const savedForm = await this.formService.create(formData);

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
      await this.mailService.sendMail(
        'info@enid.pk', // 📩 receiver email
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

  // ✅ Get all forms
  @Get()
  findAll() {
    return this.formService.findAll();
  }

  // ✅ Delete form by ID
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.formService.remove(id);
  }
}
