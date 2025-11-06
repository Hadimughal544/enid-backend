import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { Studioprojects } from './studioprojects.entity';

@Injectable()
export class StudioProjectService {
  constructor(
    @InjectRepository(Studioprojects)
    private readonly projectRepo: Repository<Studioprojects>,
  ) {}

  // CREATE
  async create(data: Partial<Studioprojects>) {
    const project = this.projectRepo.create(data);
    return this.projectRepo.save(project);
  }

  // READ ALL
  async findAll() {
    return this.projectRepo.find();
  }

  // READ ONE
  async findOne(id: number) {
    const project = await this.projectRepo.findOneBy({ id });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  // UPDATE
  async update(id: number, data: Partial<Studioprojects>) {
    const project = await this.findOne(id);

    if (data.headerImage && project.headerImage) {
      this.deleteFile(project.headerImage);
    }

    Object.assign(project, data);
    return this.projectRepo.save(project);
  }

  // DELETE PROJECT
  async remove(id: number) {
    const project = await this.findOne(id);

    // Delete all images from file system
    if (project.headerImage) this.deleteFile(project.headerImage);
    if (project.detailImages)
      project.detailImages.forEach((img) => this.deleteFile(img));

    await this.projectRepo.delete(id);
    return { message: 'Project deleted successfully' };
  }

  // DELETE SINGLE IMAGE
  async removeImage(id: number, filename: string) {
    const project = await this.findOne(id);
    project.detailImages = project.detailImages.filter(
      (img) => img !== filename,
    );
    this.deleteFile(filename);
    return this.projectRepo.save(project);
  }

  // Helper function to remove image file
  private deleteFile(filename: string) {
    const filePath = path.join(process.cwd(), 'uploads', filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
}
