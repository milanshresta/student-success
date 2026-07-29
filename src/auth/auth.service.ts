import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffUser } from '../database/entities/staff-user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(StaffUser)
    private readonly staffUserRepository: Repository<StaffUser>,
  ) {}

  findOrCreateByFirebaseUid(
    firebaseUid: string,
    email?: string,
  ): Promise<StaffUser> {
    return this.staffUserRepository
      .findOne({ where: { firebaseUid } })
      .then((existing) => {
        if (existing) {
          return existing;
        }
        const staffUser = this.staffUserRepository.create({
          firebaseUid,
          email: email ?? '',
        });
        return this.staffUserRepository.save(staffUser);
      });
  }
}
