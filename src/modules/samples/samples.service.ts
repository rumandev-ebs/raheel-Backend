import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Sample, SampleDocument } from './schemas/sample.schema';

import { SampleStatus } from './enums/sample-status.enum';
import { CreateSampleDto } from './dtos/create-sample.dto';
import { UpdateSampleStatusDto } from './dtos/update-sample.dto';

@Injectable()
export class SamplesService {
  constructor(
    @InjectModel(Sample.name)
    private sampleModel: Model<SampleDocument>,
  ) {}

  // BARCODE GENERATOR
  private generateBarcode() {
    return `SMP-${Date.now()}-${Math.floor(
      Math.random() * 1000,
    )}`;
  }

  async create(dto: CreateSampleDto) {
    return this.sampleModel.create({
      barcode: this.generateBarcode(),
      orderId: new Types.ObjectId(dto.orderId),
      patientId: new Types.ObjectId(dto.patientId),
      testId: new Types.ObjectId(dto.testId),
    });
  }

  async findAll(query = {}) {
    return this.sampleModel
      .find({ isDeleted: false, ...query })
      .populate('patientId', 'name')
      .populate('testId', 'name')
      .populate('technicianId', 'name');
  }

  async findById(id: string) {
    const sample = await this.sampleModel
      .findOne({ _id: id, isDeleted: false })
      .populate('patientId')
      .populate('testId')
      .populate('technicianId');

    if (!sample)
      throw new NotFoundException('Sample not found');

    return sample;
  }

  async updateStatus(
    id: string,
    dto: UpdateSampleStatusDto,
    technicianId?: string,
  ) {
    const updateData: any = {
      status: dto.status,
    };

    if (dto.status === SampleStatus.COLLECTED) {
      updateData.collectedAt = new Date();
      updateData.technicianId = technicianId
        ? new Types.ObjectId(technicianId)
        : undefined;
    }

    if (dto.status === SampleStatus.IN_LAB) {
      updateData.receivedAt = new Date();
    }

    if (dto.status === SampleStatus.REJECTED) {
      if (!dto.rejectedReason)
        throw new BadRequestException(
          'Rejection reason required',
        );
      updateData.rejectedReason = dto.rejectedReason;
    }

    const sample = await this.sampleModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true },
    );

    if (!sample)
      throw new NotFoundException('Sample not found');

    return sample;
  }
}
