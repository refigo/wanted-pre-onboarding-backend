import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobApplicationDto } from './dto/create-application.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobApplicationEntity } from 'src/database/entities/job.application.entity';
import { JobRecruitmentEntity } from 'src/database/entities/job.recruitment.entity';
import { UserEntity } from 'src/database/entities/user.entity';


@Injectable()
export class JobApplicationsService {
  constructor(
    @InjectRepository(JobApplicationEntity)
    private readonly jobApplicationEntity: Repository<JobApplicationEntity>,
    @InjectRepository(JobRecruitmentEntity)
    private readonly jobRecruitmentEntity: Repository<JobRecruitmentEntity>,
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
  ) {}

  async create(createApplicationDto: CreateJobApplicationDto) {
    const foundJobRecruit 
    = await this.jobRecruitmentEntity.findOne({
      where: {
        id: createApplicationDto.job_recruitment_id
      }
    });
    if (foundJobRecruit === null) {
      throw new NotFoundException(`job_recruitment_id not found`);
    }
    const foundUser
    = await this.userEntity.findOne({
      where: {
        id: createApplicationDto.user_id
      }
    });
    if (foundUser === null) {
      throw new NotFoundException(`user_id not found`);
    }
    const foundAlreadyApplic 
    = await this.jobApplicationEntity.findOne({
      where: {
        userEntity: foundUser,
        jobRecruitmentEntity: foundJobRecruit
      }
    });
    if (foundAlreadyApplic !== null) {
      throw new BadRequestException(`already created`);
    }
    const savedApplic 
    = await this.jobApplicationEntity.save(
        this.jobApplicationEntity.create({
      userEntity: foundUser,
      jobRecruitmentEntity: foundJobRecruit
    }));
    return {
      "job_application_id": +(savedApplic.id)
    };
  }
}
