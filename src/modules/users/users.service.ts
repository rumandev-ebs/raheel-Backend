import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { isValidObjectId, Model } from 'mongoose';
import { GetUsersQueryDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UsersService {
   private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(data: Partial<User>): Promise<UserDocument> {
    return this.userModel.create(data);
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async findById(id: string) {
    return this.userModel.findById(id);
  }

  async findAll() {
    return this.userModel.find();
  }


  // READ with pagination, search, filters
async getAllUsers(query: GetUsersQueryDto) {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      search,
      role,
      isActive,
      isDeleted,
    } = query;

    // ✅ whitelist allowed sort fields (avoid injection / invalid keys)
    const allowedSortFields = ['createdAt', 'firstName', 'lastName', 'email', 'role'];
    if (!allowedSortFields.includes(sortBy)) {
      throw new BadRequestException(
        `Invalid sortBy field. Allowed values: ${allowedSortFields.join(', ')}`,
      );
    }

    const filter: any = {};

    // Soft delete filter (default is only non-deleted)
    if (typeof isDeleted === 'boolean') {
      filter.isDeleted = isDeleted;
    } else {
      filter.isDeleted = false;
    }

    if (role) filter.role = role;
    if (typeof isActive === 'boolean') filter.isActive = isActive;

    if (search) {
      const regex = new RegExp(search, 'i');
      filter.$or = [{ firstName: regex }, { lastName: regex }, { email: regex }];
    }

    const safePage = Number(page) || 1;
    const safeLimit = Number(limit) || 10;

    if (safePage < 1 || safeLimit < 1) {
      throw new BadRequestException('page and limit must be positive numbers');
    }

    const skip = (safePage - 1) * safeLimit;
    const sort: Record<string, 1 | -1> = {
      [sortBy]: sortOrder === 'asc' ? 1 : -1,
    };

    const [items, total] = await Promise.all([
      this.userModel
        .find(filter)
        .sort(sort)
        .skip(skip)
        .limit(safeLimit)
        .select('-password') // don't return password
        .exec(),
      this.userModel.countDocuments(filter).exec(),
    ]);

    const totalPages = Math.ceil(total / safeLimit) || 1;

    return {
      data: items,
      meta: {
        total,
        page: safePage,
        limit: safeLimit,
        totalPages,
      },
    };
  } catch (error) {
    this.logger.error('Failed to get users', error.stack || error);
    if (error instanceof BadRequestException) throw error;
    throw new InternalServerErrorException('Failed to get users');
  }
}


// READ single user
async findOne(id: string) {
  try {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid user id format');
    }

    const user = await this.userModel
      .findOne({ _id: id, isDeleted: false })
      .select('-password')
      .exec();

    if (!user) throw new NotFoundException('User not found');

    return user;
  } catch (error) {
    this.logger.error(`Failed to find user with id ${id}`, error.stack || error);
    if (error instanceof BadRequestException || error instanceof NotFoundException) {
      throw error;
    }
    throw new InternalServerErrorException('Failed to fetch user');
  }
}


// UPDATE
async update(id: string, dto: UpdateUserDto) {
  try {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid user id format');
    }

    const updateData: any = { ...dto };

    if (dto.password) {
      updateData.password = await bcrypt.hash(dto.password, 10);
    }

    const user = await this.userModel
      .findOneAndUpdate(
        { _id: id, isDeleted: false },
        { $set: updateData },
        { new: true },
      )
      .select('-password')
      .exec();

    if (!user) throw new NotFoundException('User not found or deleted');

    return user;
  } catch (error) {
    this.logger.error(`Failed to update user with id ${id}`, error.stack || error);
    if (error instanceof BadRequestException || error instanceof NotFoundException) {
      throw error;
    }
    throw new InternalServerErrorException('Failed to update user');
  }
}



// SOFT DELETE
async softDelete(id: string) {
  try {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid user id format');
    }

    const user = await this.userModel
      .findOneAndUpdate(
        { _id: id, isDeleted: false },
        { $set: { isDeleted: true, deletedAt: new Date() } },
        { new: true },
      )
      .select('-password')
      .exec();

    if (!user) {
      throw new NotFoundException('User not found or already deleted');
    }

    return {
      message: 'User soft deleted successfully',
      user,
    };
  } catch (error) {
    this.logger.error(`Failed to soft delete user with id ${id}`, error.stack || error);
    if (error instanceof BadRequestException || error instanceof NotFoundException) {
      throw error;
    }
    throw new InternalServerErrorException('Failed to delete user');
  }
}



// RESTORE
async restore(id: string) {
  try {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid user id format');
    }

    const user = await this.userModel
      .findOneAndUpdate(
        { _id: id, isDeleted: true },
        { $set: { isDeleted: false, deletedAt: null } },
        { new: true },
      )
      .select('-password')
      .exec();

    if (!user) {
      throw new NotFoundException('User not found or not deleted');
    }

    return {
      message: 'User restored successfully',
      user,
    };
  } catch (error) {
    this.logger.error(`Failed to restore user with id ${id}`, error.stack || error);
    if (error instanceof BadRequestException || error instanceof NotFoundException) {
      throw error;
    }
    throw new InternalServerErrorException('Failed to restore user');
  }
}


}
