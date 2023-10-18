import { Module } from '@nestjs/common';
import { JobRecruitmentsService } from './job-recruitments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobRecruitmentEntity } from 'src/database/entities/job.recruitment.entity';
import { CompanyEntity } from 'src/database/entities/company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      JobRecruitmentEntity,
      CompanyEntity
    ])
  ],
  providers: [JobRecruitmentsService],
  exports: [JobRecruitmentsService]
})
export class JobRecruitmentsModule {}
