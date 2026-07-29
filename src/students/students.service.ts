import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../database/entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { QueryStudentDto } from './dto/query-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,
  ) {}

  create(dto: CreateStudentDto): Promise<Student> {
    const student = this.studentsRepository.create(dto);
    return this.studentsRepository.save(student);
  }

  async findAll(
    query: QueryStudentDto,
  ): Promise<{ data: Student[]; total: number }> {
    const { programme, cohortYear, page = 1, limit = 25 } = query;
    const [data, total] = await this.studentsRepository.findAndCount({
      where: {
        ...(programme ? { programme } : {}),
        ...(cohortYear ? { cohortYear } : {}),
      },
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { data, total };
  }

  async findOne(id: string): Promise<Student> {
    const student = await this.studentsRepository.findOne({ where: { id } });
    if (!student) {
      throw new NotFoundException(`Student ${id} not found`);
    }
    return student;
  }

  async update(id: string, dto: UpdateStudentDto): Promise<Student> {
    const student = await this.findOne(id);
    Object.assign(student, dto);
    return this.studentsRepository.save(student);
  }

  async remove(id: string): Promise<void> {
    const student = await this.findOne(id);
    await this.studentsRepository.remove(student);
  }
}
