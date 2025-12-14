import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lab, LabDocument } from './schemas/lab.schema';
import { CreateLabDto } from './dtos/create-lab.dto';
import { UpdateLabDto } from './dtos/update-lab.dto';

@Injectable()
export class LabsService {
  constructor(@InjectModel(Lab.name) private labModel: Model<LabDocument>) {}

  async create(dto: CreateLabDto) {
    const exists = await this.labModel.findOne({
      name: dto.name,
      isDeleted: false,
    });

    if (exists) throw new BadRequestException('Lab already exists');

    return this.labModel.create(dto);
  }

  async findAll() {
    return this.labModel
      .find({ isDeleted: false })
      .populate('ownerId', 'email role');
  }

  async findById(id: string) {
    const lab = await this.labModel
      .findOne({ _id: id, isDeleted: false })
      .populate('ownerId', 'email role');

    if (!lab) throw new NotFoundException('Lab not found');
    return lab;
  }

  async update(id: string, dto: UpdateLabDto) {
    const lab = await this.labModel.findByIdAndUpdate(id, dto, {
      new: true,
    });

    if (!lab) throw new NotFoundException('Lab not found');
    return lab;
  }

  async softDelete(id: string) {
    const lab = await this.labModel.findByIdAndUpdate(
      id,
      { isDeleted: true, isActive: false },
      { new: true },
    );

    if (!lab) throw new NotFoundException('Lab not found');
    return { message: 'Lab deleted successfully' };
  }
}
