import { Module } from '@nestjs/common';
import { JobModule } from './job/job.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    JobModule,
    DatabaseModule],
})
export class AppModule {}
