import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from './entities/company.entity';
import { UserEntity } from './entities/user.entity';
import { typeORMConfig } from 'src/configs/typeorm.config';
import { JobRecruitmentEntity } from './entities/job.recruitment.entity';
import { JobApplicationEntity } from './entities/job.application.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    TypeOrmModule.forFeature([
      CompanyEntity,
      UserEntity,
      JobRecruitmentEntity,
      JobApplicationEntity
  ])],
})
export class DatabaseModule {}
