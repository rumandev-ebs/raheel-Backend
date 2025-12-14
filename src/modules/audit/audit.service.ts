import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AuditLog, AuditLogDocument } from './schemas/audit-log.schema';
import { QueryLogDto } from './dto/query-log.dto';
import { ActionType } from './enums/action-type.enum';

@Injectable()
export class AuditService {
  constructor(
    @InjectModel(AuditLog.name) private auditModel: Model<AuditLogDocument>,
  ) {}

  // CREATE AUDIT LOG
  async createLog(params: {
    userId: string;
    actionType: ActionType;
    entity: string;
    entityId?: string;
    details?: string;
    ipAddress?: string;
    userAgent?: string;
  }) {
    return this.auditModel.create({
      userId: new Types.ObjectId(params.userId),
      actionType: params.actionType,
      entity: params.entity,
      entityId: params.entityId,
      details: params.details,
      ipAddress: params.ipAddress,
      userAgent: params.userAgent,
    });
  }

  // QUERY LOGS
  async findAll(query: QueryLogDto) {
    const filter: any = {};

    if (query.userId) filter.userId = query.userId;
    if (query.entity) filter.entity = query.entity;
    if (query.entityId) filter.entityId = query.entityId;
    if (query.actionType) filter.actionType = query.actionType;

    return this.auditModel.find(filter)
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
  }
}
