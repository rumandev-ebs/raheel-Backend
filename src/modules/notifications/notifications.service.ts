import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Notification, NotificationDocument } from './schemas/notification.schema';

import { Channel } from './enums/channel.enum';
import { SendNotificationDto } from './dtos/send-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
  ) {}

  async send(dto: SendNotificationDto) {
    // Save notification in DB
    const notification = await this.notificationModel.create({
      senderId: dto.senderId ? new Types.ObjectId(dto.senderId) : undefined,
      recipientId: dto.recipientId ? new Types.ObjectId(dto.recipientId) : undefined,
      message: dto.message,
      channel: dto.channel,
      isSent: false,
    });

    // Simulate sending (replace with real provider integration)
    try {
      switch (dto.channel) {
        case Channel.EMAIL:
          // call your email service here
          console.log('Email sent:', dto.message);
          break;
        case Channel.SMS:
          // call SMS provider API
          console.log('SMS sent:', dto.message);
          break;
        case Channel.WHATSAPP:
          // call WhatsApp API
          console.log('WhatsApp sent:', dto.message);
          break;
      }

      notification.isSent = true;
      notification.sentAt = new Date();
      await notification.save();
    } catch (err) {
      notification.details = err.message;
      await notification.save();
    }

    return notification;
  }

  async findAll(filter = {}) {
    return this.notificationModel.find(filter)
      .populate('senderId', 'name email')
      .populate('recipientId', 'name email')
      .sort({ createdAt: -1 });
  }
}
