import { IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Channel } from '../enums/channel.enum';

export class SendNotificationDto {

  @ApiPropertyOptional({ example: '64cfa0e6f8b9a3a2a9c1d111', description: 'Sender user ID (optional)' })
  @IsOptional()
  @IsMongoId()
  senderId?: string;

  @ApiPropertyOptional({ example: '64cfa0e6f8b9a3a2a9c1d222', description: 'Recipient user ID (optional)' })
  @IsOptional()
  @IsMongoId()
  recipientId?: string;

  @ApiProperty({ example: 'Your test results are available.', description: 'Notification message' })
  @IsString()
  message: string;

  @ApiProperty({ enum: Channel, example: Channel.EMAIL, description: 'Channel through which the notification is sent' })
  @IsEnum(Channel)
  channel: Channel;

  @ApiPropertyOptional({ example: '{"invoiceId":"64cfa0e6f8b9a3a2a9c1d333"}', description: 'Additional details in JSON string format' })
  @IsOptional()
  @IsString()
  details?: string;
}
