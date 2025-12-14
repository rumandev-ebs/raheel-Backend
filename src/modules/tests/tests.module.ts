import { Module } from '@nestjs/common';
import { TestsService } from './tests.service';
import { TestsController } from './tests.controller';
import { Test, TestSchema } from './schemas/test.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TestCategory, TestCategorySchema } from './schemas/test-category.schema';
@Module({
    imports: [
      MongooseModule.forFeature([{ name: Test.name, schema: TestSchema },
         { name: TestCategory.name, schema: TestCategorySchema },
      ]),
    ],
  controllers: [TestsController],
  providers: [TestsService],
  exports: [TestsService],
})
export class TestsModule {}
