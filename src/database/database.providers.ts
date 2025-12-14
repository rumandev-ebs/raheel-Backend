import { MongooseModule } from '@nestjs/mongoose';

import { ENTITIES } from './schemas/base.schema';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { ConfigService } from '@nestjs/config/dist/config.service';


export const DatabaseProvider = [
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get<string>('MONGODB_TEST_URI'),
    }),
  }),
  MongooseModule.forFeature(ENTITIES),
];