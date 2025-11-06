import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private adminRepo: Repository<UserEntity>,
  ) {}

  async createAdmin(email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    const admin = this.adminRepo.create({ email, password: hashed });
    return this.adminRepo.save(admin);
  }

  async findByEmail(email: string) {
    return this.adminRepo.findOne({ where: { email } });
  }
}
