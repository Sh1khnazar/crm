import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from '../groups/entities/group.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    @InjectRepository(Group)
    private readonly groupRepo: Repository<Group>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const { groupId, ...studentData } = createStudentDto;
    const student = this.studentRepo.create(studentData);

    if (groupId) {
      const group = await this.groupRepo.findOneBy({ id: groupId });
      if (!group) throw new NotFoundException('Guruh topilmadi!');
      student.group = group;
    }

    return await this.studentRepo.save(student);
  }

  async findAll() {
    return await this.studentRepo.find({ relations: ['group'] });
  }
  async findOne(id: string) {
    const student = await this.studentRepo.findOne({
      where: { id },
      relations: ['group'], // Guruh ma'lumotlari bilan birga qaytaradi
    });

    if (!student) {
      throw new NotFoundException(
        `ID raqami ${id} bo'lgan o'quvchi topilmadi!`,
      );
    }
    return student;
  }
  async update(id: string, updateStudentDto: CreateStudentDto) {
    const { groupId, ...data } = updateStudentDto;
    const student = await this.findOne(id);

    if (groupId) {
      const group = await this.groupRepo.findOneBy({ id: groupId });
      if (!group) throw new NotFoundException('Guruh topilmadi!');
      student.group = group;
    }

    Object.assign(student, data);
    return await this.studentRepo.save(student);
  }

  async remove(id: string) {
    const student = await this.findOne(id);
    await this.studentRepo.remove(student);
    return { message: "O'quvchi muvaffaqiyatli o'chirildi" };
  }
}
