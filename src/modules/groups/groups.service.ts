import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from '../../common/enums/role.enum';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepo: Repository<Group>,
  ) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    const group = this.groupRepo.create(createGroupDto);
    return await this.groupRepo.save(group);
  }

  // Adminlar uchun barcha guruhlar statistikasi bilan
  async findAll(): Promise<any[]> {
    const groups = await this.groupRepo.find({
      relations: ['students', 'teacher'],
    });

    return groups.map((group) => ({
      ...group,
      studentsCount: group.students?.length || 0,
      paidStudentsCount:
        group.students?.filter((s) => Number(s.balance) >= 0).length || 0,
    }));
  }

  // O'qituvchi faqat o'z guruhlarini ko'rishi uchun maxsus metod
  async findTeacherGroups(teacherId: string): Promise<any[]> {
    const groups = await this.groupRepo.find({
      where: { teacher_id: teacherId },
      relations: ['students'],
    });

    return groups.map((group) => ({
      ...group,
      studentsCount: group.students?.length || 0,
    }));
  }

  // ID bo'yicha guruhni topish va ruxsatni tekshirish
  async findOne(
    id: string,
    user?: { id: string; role: string; phone: string },
  ): Promise<Group> {
    const group = await this.groupRepo.findOne({
      where: { id },
      relations: ['students', 'students.payments', 'teacher'],
    });

    if (!group) throw new NotFoundException('Guruh topilmadi!');

    // Agar so'rov o'qituvchidan kelsa va bu guruh uniki bo'lmasa - ruxsat bermaymiz
    if (
      user &&
      user.role === (UserRole.TEACHER as string) &&
      group.teacher_id !== user.id
    ) {
      throw new ForbiddenException(
        'Sizda ushbu guruh maʼlumotlarini koʻrishga ruxsat yoʻq!',
      );
    }

    return group;
  }

  async update(id: string, updateGroupDto: UpdateGroupDto): Promise<Group> {
    const group = await this.findOne(id);
    const updatedGroup = Object.assign(group, updateGroupDto);
    return await this.groupRepo.save(updatedGroup);
  }

  async remove(id: string): Promise<{ message: string }> {
    const group = await this.findOne(id);
    await this.groupRepo.remove(group);
    return { message: "Guruh muvaffaqiyatli o'chirildi" };
  }
}
