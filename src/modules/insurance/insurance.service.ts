import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Provider, ProviderDocument } from './schemas/provider.schema';
import { PatientInsurance, PatientInsuranceDocument } from './schemas/patient-insurance.schema';
import { Claim, ClaimDocument } from './schemas/claim.schema';
import { CreateProviderDto } from './dtos/create-provider.dto';
import { AssignInsuranceDto } from './dtos/assign-insurance.dto';
import { SubmitClaimDto } from './dtos/submit-claim.dto';
import { UpdateClaimDto } from './dtos/update-claim.dto';


@Injectable()
export class InsuranceService {
  constructor(
    @InjectModel(Provider.name) private providerModel: Model<ProviderDocument>,
    @InjectModel(PatientInsurance.name) private patientInsuranceModel: Model<PatientInsuranceDocument>,
    @InjectModel(Claim.name) private claimModel: Model<ClaimDocument>,
  ) {}

  // PROVIDER
  async createProvider(dto: CreateProviderDto) {
    return this.providerModel.create(dto);
  }

  async listProviders() {
    return this.providerModel.find({ isActive: true });
  }

  // ASSIGN INSURANCE
  async assignInsurance(dto: AssignInsuranceDto) {
    return this.patientInsuranceModel.create({
      patientId: new Types.ObjectId(dto.patientId),
      providerId: new Types.ObjectId(dto.providerId),
      policyNumber: dto.policyNumber,
      validTill: dto.validTill,
    });
  }

  async listPatientInsurance(patientId: string) {
    return this.patientInsuranceModel.find({ patientId, isActive: true });
  }

  // CLAIMS
  async submitClaim(dto: SubmitClaimDto) {
    return this.claimModel.create({
      patientInsuranceId: new Types.ObjectId(dto.patientInsuranceId),
      invoiceId: new Types.ObjectId(dto.invoiceId),
      claimedAmount: dto.claimedAmount,
    });
  }

  async updateClaim(claimId: string, dto: UpdateClaimDto) {
    const claim = await this.claimModel.findById(claimId);
    if (!claim) throw new NotFoundException('Claim not found');
    claim.status = dto.status;
    claim.remarks = dto.remarks;
    return claim.save();
  }

  async listClaims(filter = {}) {
    return this.claimModel.find(filter)
      .populate('patientInsuranceId')
      .populate('invoiceId');
  }
}
