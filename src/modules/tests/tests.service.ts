import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Test, TestDocument } from './schemas/test.schema';
import { CreateTestDto } from './dtos/create-test.dto';
import { QueryTestDto } from './dtos/query-test.dto';
import { UpdateTestDto } from './dtos/update-test.dto';


@Injectable()
export class TestsService {
  constructor(
    @InjectModel(Test.name)
    private testModel: Model<TestDocument>,
  ) {}

  async create(dto: CreateTestDto) {
    const exists = await this.testModel.findOne({
      code: dto.code,
      isDeleted: false,
    });

    if (exists)
      throw new BadRequestException('Test code already exists');

    return this.testModel.create(dto);
  }

  async findAll(query: QueryTestDto) {
    return this.testModel
      .find({ isDeleted: false, ...query })
      .populate('categoryId', 'name');
  }

  async findById(id: string) {
    const test = await this.testModel
      .findOne({ _id: id, isDeleted: false })
      .populate('categoryId', 'name');

    if (!test) throw new NotFoundException('Test not found');
    return test;
  }

  async update(id: string, dto: UpdateTestDto) {
    const test = await this.testModel.findByIdAndUpdate(id, dto, {
      new: true,
    });

    if (!test) throw new NotFoundException('Test not found');
    return test;
  }

  async softDelete(id: string) {
    const test = await this.testModel.findByIdAndUpdate(
      id,
      { isDeleted: true, isActive: false },
      { new: true },
    );

    if (!test) throw new NotFoundException('Test not found');
    return { message: 'Test deleted successfully' };
  }
}
