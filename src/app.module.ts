import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './modules/employee/employee.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [EmployeeModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
