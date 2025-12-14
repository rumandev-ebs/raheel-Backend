import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor, DoctorDocument } from './schemas/doctor.schema';
import { CreateDoctorDto } from './dtos/create-doctor.dto';
import { UpdateDoctorDto } from './dtos/update-doctor.dto';
import { QueryDoctorDto } from './dtos/query-doctor.dto';


@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel(Doctor.name)
    private doctorModel: Model<DoctorDocument>,
  ) {}

  async create(dto: CreateDoctorDto) {
    const exists = await this.doctorModel.findOne({
      userId: dto.userId,
      isDeleted: false,
    });

    if (exists)
      throw new BadRequestException('Doctor already exists for this user');

    return this.doctorModel.create(dto);
  }

  async findAll(query: QueryDoctorDto) {
    return this.doctorModel
      .find({ isDeleted: false, ...query })
      .populate('userId', 'email role');
  }

  async findById(id: string) {
    const doctor = await this.doctorModel
      .findOne({ _id: id, isDeleted: false })
      .populate('userId', 'email role');

    if (!doctor) throw new NotFoundException('Doctor not found');
    return doctor;
  }

  async update(id: string, dto: UpdateDoctorDto) {
    const doctor = await this.doctorModel.findByIdAndUpdate(id, dto, {
      new: true,
    });

    if (!doctor) throw new NotFoundException('Doctor not found');
    return doctor;
  }

  async softDelete(id: string) {
    const doctor = await this.doctorModel.findByIdAndUpdate(
      id,
      { isDeleted: true, isActive: false },
      { new: true },
    );

    if (!doctor) throw new NotFoundException('Doctor not found');

    return { message: 'Doctor deleted successfully' };
  }
}
