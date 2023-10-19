import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobApplicationsService } from './job-applications.service';
import { JobApplicationEntity } from 'src/database/entities/job.application.entity';
import { JobRecruitmentEntity } from 'src/database/entities/job.recruitment.entity';
import { UserEntity } from 'src/database/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      JobApplicationEntity,
      JobRecruitmentEntity,
      UserEntity
    ])
  ],
  providers: [JobApplicationsService],
  exports: [JobApplicationsService]
})
export class JobApplicationsModule {}
