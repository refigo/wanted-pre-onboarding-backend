import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { RecruitmentsModule } from './recruitments/recruitments.module';
import { ApplicationsModule } from './applications/applications.module';

@Module({
  controllers: [JobController],
  providers: [JobService],
  imports: [RecruitmentsModule, ApplicationsModule]
})
export class JobModule {}
