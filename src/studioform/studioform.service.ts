import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudioForm } from './studioform.entity';

@Injectable()
export class StudioformService {
  constructor(
    @InjectRepository(StudioForm)
    private repo: Repository<StudioForm>,
  ) {}

  async create(data: Partial<StudioForm>) {
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
