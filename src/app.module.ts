import { Module } from '@nestjs/common';
import { JobModule } from './job/job.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
    JobModule
  ],
})
export class AppModule {}
