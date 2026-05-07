import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepo: Repository<Group>,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    const group = this.groupRepo.create(createGroupDto);
    return await this.groupRepo.save(group);
  }

  async findAll() {
    const groups = await this.groupRepo.find({
      relations: ['students'],
    });

    return groups.map((group) => ({
      ...group,
      studentsCount: group.students?.length || 0,
      paidStudentsCount:
        group.students?.filter((s) => Number(s.balance) >= 0).length || 0,
    }));
  }

  async findOne(id: string) {
    const group = await this.groupRepo.findOne({
      where: { id },
      relations: ['students', 'students.payments'],
    });
    if (!group) throw new NotFoundException('Guruh topilmadi!');
    return group;
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    const group = await this.findOne(id);
    const updatedGroup = Object.assign(group, updateGroupDto);
    return await this.groupRepo.save(updatedGroup);
  }

  async remove(id: string) {
    const group = await this.findOne(id);
    await this.groupRepo.remove(group);
    return { message: "Guruh muvaffaqiyatli o'chirildi" };
  }
}
