import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { AdminService } from './src/admin/admin.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const adminService = app.get(AdminService);
  await adminService.createAdminUser();
  await app.close();
}

bootstrap();
