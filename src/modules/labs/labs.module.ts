import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LabsService } from './labs.service';
import { LabsController } from './labs.controller';
import { Lab, LabSchema } from './schemas/lab.schema';
import { Branch, BranchSchema } from './branches/schemas/branch.schema';
import { BranchesService } from './branches/branches.service';
import { BranchesController } from './branches/branches.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Lab.name, schema: LabSchema },
      { name: Branch.name, schema: BranchSchema },
    ]),
  ],
  controllers: [LabsController, BranchesController],
  providers: [LabsService, BranchesService],
  exports: [LabsService],
})
export class LabsModule {}
