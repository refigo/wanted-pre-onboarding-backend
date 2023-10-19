import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { JobRecruitmentsModule } from './recruitments/job-recruitments.module';
import { JobApplicationsModule } from './applications/job-applications.module';

@Module({
  controllers: [JobController],
  providers: [JobService],
  imports: [JobRecruitmentsModule, JobApplicationsModule]
})
export class JobModule {}
