import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { JobRecruitmentsModule } from './recruitments/job-recruitments.module';
import { ApplicationsModule } from './applications/applications.module';

@Module({
  controllers: [JobController],
  providers: [JobService],
  imports: [JobRecruitmentsModule, ApplicationsModule]
})
export class JobModule {}
