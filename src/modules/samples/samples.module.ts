import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SamplesController } from './samples.controller';
import { SamplesService } from './samples.service';
import { Sample, SampleSchema } from './schemas/sample.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Sample.name, schema: SampleSchema },
    ]),
  ],
  controllers: [SamplesController],
  providers: [SamplesService],
  exports: [SamplesService],
})
export class SamplesModule {}
