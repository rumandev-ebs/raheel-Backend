import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Branch, BranchDocument } from './schemas/branch.schema';
import { CreateBranchDto } from './dtos/create-branch.dto';

@Injectable()
export class BranchesService {
  constructor(
    @InjectModel(Branch.name)
    private branchModel: Model<BranchDocument>,
  ) {}

  async create(dto: CreateBranchDto) {
    return this.branchModel.create(dto);
  }

  async findByLab(labId: string) {
    return this.branchModel.find({
      labId,
      isDeleted: false,
    });
  }

  async remove(id: string) {
    const branch = await this.branchModel.findByIdAndUpdate(
      id,
      { isDeleted: true, isActive: false },
      { new: true },
    );

    if (!branch) throw new NotFoundException('Branch not found');
    return { message: 'Branch deleted successfully' };
  }
}
