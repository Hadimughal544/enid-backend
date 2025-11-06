import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Projects } from './projects.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Projects)
    private repo: Repository<Projects>,
  ) {}

  async create(data: Partial<Projects>) {
    const item = this.repo.create(data);
    return this.repo.save(item);
  }

  findAll() {
    return this.repo.find({ order: { createdAt: 'ASC' } });
  }

  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Project is not found');
    return item;
  }

  async update(id: number, data: Partial<Projects>) {
    const item = await this.findOne(id);
    Object.assign(item, data);
    return this.repo.save(item);
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    return this.repo.remove(item);
  }
}
