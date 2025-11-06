import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from './form.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(Form)
    private repo: Repository<Form>,
  ) {}

  async create(data: Partial<Form>) {
    const form = this.repo.create(data);
    return this.repo.save(form);
  }

  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findone(id: number) {
    const form = await this.repo.findOne({ where: { id } });
    if (!form) throw new NotFoundException('form not found');
    return form;
  }

  async remove(id: number) {
    const form = await this.findone(id);
    return this.repo.remove(form);
  }
}
