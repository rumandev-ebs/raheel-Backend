import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { InsuranceService } from './insurance.service';
import { CreateProviderDto } from './dtos/create-provider.dto';
import { AssignInsuranceDto } from './dtos/assign-insurance.dto';
import { SubmitClaimDto } from './dtos/submit-claim.dto';
import { UpdateClaimDto } from './dtos/update-claim.dto';


@Controller('insurance')
export class InsuranceController {
  constructor(private readonly insuranceService: InsuranceService) {}

  @Post('provider')
  createProvider(@Body() dto: CreateProviderDto) {
    return this.insuranceService.createProvider(dto);
  }

  @Get('provider')
  listProviders() {
    return this.insuranceService.listProviders();
  }

  @Post('assign')
  assignInsurance(@Body() dto: AssignInsuranceDto) {
    return this.insuranceService.assignInsurance(dto);
  }

  @Get('patient/:id')
  listPatientInsurance(@Param('id') patientId: string) {
    return this.insuranceService.listPatientInsurance(patientId);
  }

  @Post('claim')
  submitClaim(@Body() dto: SubmitClaimDto) {
    return this.insuranceService.submitClaim(dto);
  }

  @Patch('claim/:id')
  updateClaim(@Param('id') id: string, @Body() dto: UpdateClaimDto) {
    return this.insuranceService.updateClaim(id, dto);
  }

  @Get('claim')
  listClaims() {
    return this.insuranceService.listClaims();
  }
}
