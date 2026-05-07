import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { Lead } from './entities/lead.entity';

@Injectable()
export class LeadsService {
  // 'export' borligini aniq tekshir!
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepo: Repository<Lead>,
  ) {}

  async create(createLeadDto: CreateLeadDto) {
    const lead = this.leadRepo.create(createLeadDto);
    return await this.leadRepo.save(lead);
  }

  async findAll() {
    return await this.leadRepo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string) {
    const lead = await this.leadRepo.findOne({ where: { id } });
    if (!lead) throw new NotFoundException('Murojaat topilmadi!');
    return lead;
  }

  async update(id: string, updateLeadDto: UpdateLeadDto) {
    const lead = await this.findOne(id);
    Object.assign(lead, updateLeadDto);
    return await this.leadRepo.save(lead);
  }

  async remove(id: string) {
    const lead = await this.findOne(id);
    await this.leadRepo.remove(lead);
    return { message: "Murojaat o'chirildi" };
  }
}
