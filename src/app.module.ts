import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthService } from './modules/auth/auth.service';
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';

import { RolesService } from './modules/roles/roles.service';
import { RolesController } from './modules/roles/roles.controller';
import { RolesModule } from './modules/roles/roles.module';
import { PatientsService } from './modules/patients/patients.service';
import { PatientsController } from './modules/patients/patients.controller';
import { PatientsModule } from './modules/patients/patients.module';
import { DoctorsService } from './modules/doctors/doctors.service';
import { DoctorsController } from './modules/doctors/doctors.controller';
import { DoctorsModule } from './modules/doctors/doctors.module';
import { LabsService } from './modules/labs/labs.service';
import { LabsController } from './modules/labs/labs.controller';
import { LabsModule } from './modules/labs/labs.module';
import { TestsModule } from './modules/tests/tests.module';

import { SamplesService } from './modules/samples/samples.service';
import { SamplesController } from './modules/samples/samples.controller';
import { SamplesModule } from './modules/samples/samples.module';
import { ReportsService } from './modules/reports/reports.service';
import { ReportsController } from './modules/reports/reports.controller';
import { ReportsModule } from './modules/reports/reports.module';
import { BillingService } from './modules/billing/billing.service';
import { BillingController } from './modules/billing/billing.controller';
import { BillingModule } from './modules/billing/billing.module';
import { InsuranceService } from './modules/insurance/insurance.service';
import { InsuranceController } from './modules/insurance/insurance.controller';
import { InsuranceModule } from './modules/insurance/insurance.module';
import { NotificationsService } from './modules/notifications/notifications.service';
import { NotificationsController } from './modules/notifications/notifications.controller';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AuditService } from './modules/audit/audit.service';
import { AuditController } from './modules/audit/audit.controller';
import { AuditModule } from './modules/audit/audit.module';
import { DatabaseModule } from './database/database.module';
import { OrdersModule } from './modules/orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    RolesModule,
    PatientsModule,
    DoctorsModule,
    LabsModule,
    TestsModule,
    OrdersModule,
    SamplesModule,
    ReportsModule,
    BillingModule,
    InsuranceModule,
    NotificationsModule,
    AuditModule,
  ],

})
export class AppModule {}
