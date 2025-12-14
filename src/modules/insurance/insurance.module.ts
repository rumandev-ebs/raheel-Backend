import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InsuranceController } from './insurance.controller';
import { InsuranceService } from './insurance.service';
import { Provider, ProviderSchema } from './schemas/provider.schema';
import { PatientInsurance, PatientInsuranceSchema } from './schemas/patient-insurance.schema';
import { Claim, ClaimSchema } from './schemas/claim.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Provider.name, schema: ProviderSchema },
      { name: PatientInsurance.name, schema: PatientInsuranceSchema },
      { name: Claim.name, schema: ClaimSchema },
    ]),
  ],
  controllers: [InsuranceController],
  providers: [InsuranceService],
})
export class InsuranceModule {}
