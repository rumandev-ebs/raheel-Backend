import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient, PatientDocument } from './schemas/patient.schema';

import { v4 as uuid } from 'uuid';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { QueryPatientDto } from './dtos/query-patient.dto';
import { UpdatePatientDto } from './dtos/update-patient.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient.name)
    private patientModel: Model<PatientDocument>,
  ) {}

  private generateMRN(): string {
    return `MRN-${uuid().slice(0, 8).toUpperCase()}`;
  }

  async create(dto: CreatePatientDto) {
    const existing = await this.patientModel.findOne({
      userId: dto.userId,
      isDeleted: false,
    });

    if (existing)
      throw new BadRequestException('Patient already exists for this user');

    return this.patientModel.create({
      ...dto,
      mrn: this.generateMRN(),
    });
  }

  async findAll(query: QueryPatientDto) {
    const filter: any = { isDeleted: false };

    if (query.fullName) {
      filter.fullName = { $regex: query.fullName, $options: 'i' };
    }

    if (query.phone) {
      filter.phone = query.phone;
    }

    return this.patientModel.find(filter).populate('userId', 'email role');
  }

  async findById(id: string) {
    const patient = await this.patientModel
      .findOne({ _id: id, isDeleted: false })
      .populate('userId', 'email role');

    if (!patient) throw new NotFoundException('Patient not found');
    return patient;
  }

  async update(id: string, dto: UpdatePatientDto) {
    const patient = await this.patientModel.findByIdAndUpdate(id, dto, {
      new: true,
    });

    if (!patient) throw new NotFoundException('Patient not found');
    return patient;
  }

  async softDelete(id: string) {
    const patient = await this.patientModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
    );

    if (!patient) throw new NotFoundException('Patient not found');

    return { message: 'Patient deleted successfully' };
  }
}
