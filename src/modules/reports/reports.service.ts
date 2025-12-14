import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Report, ReportDocument } from './schemas/report.schema';
import { ReportStatus } from './enums/report-status.enum';
import { CreateReportDto } from './dtos/create-report.dto';
import { AddResultDto } from './dtos/add-result.dto';
import { VerifyReportDto } from './dtos/verify-report.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Report.name)
    private reportModel: Model<ReportDocument>,
  ) {}

  // CREATE REPORT
  async create(dto: CreateReportDto) {
    return this.reportModel.create({
      orderId: new Types.ObjectId(dto.orderId),
      patientId: new Types.ObjectId(dto.patientId),
      testId: new Types.ObjectId(dto.testId),
    });
  }

  // ADD RESULT (ONLY IF DRAFT)
  async addResult(reportId: string, dto: AddResultDto) {
    const report = await this.reportModel.findById(reportId);

    if (!report)
      throw new NotFoundException('Report not found');

    if (report.status !== ReportStatus.DRAFT)
      throw new BadRequestException(
        'Cannot modify verified report',
      );

    report.results.push(dto as any);
    await report.save();

    return report;
  }

  // VERIFY REPORT (PATHOLOGIST)
  async verify(
    reportId: string,
    dto: VerifyReportDto,
    userId: string,
  ) {
    const report = await this.reportModel.findById(reportId);

    if (!report)
      throw new NotFoundException('Report not found');

    if (report.results.length === 0)
      throw new BadRequestException(
        'No results added',
      );

    report.status = ReportStatus.VERIFIED;
    report.verifiedBy = new Types.ObjectId(userId);
    report.verifiedAt = new Date();
    report.remarks = dto.remarks;

    return report.save();
  }

  // RELEASE REPORT (FINAL)
  async release(reportId: string) {
    const report = await this.reportModel.findById(reportId);

    if (!report)
      throw new NotFoundException('Report not found');

    if (report.status !== ReportStatus.VERIFIED)
      throw new BadRequestException(
        'Report must be verified first',
      );

    report.status = ReportStatus.RELEASED;
    return report.save();
  }

  async findAll(filter = {}) {
    return this.reportModel
      .find({ isDeleted: false, ...filter })
      .populate('patientId', 'name')
      .populate('testId', 'name')
      .populate('verifiedBy', 'name');
  }

  async findById(id: string) {
    const report = await this.reportModel
      .findOne({ _id: id, isDeleted: false })
      .populate('patientId')
      .populate('testId')
      .populate('verifiedBy');

    if (!report)
      throw new NotFoundException('Report not found');

    return report;
  }
}
