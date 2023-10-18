import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobRecruitmentDto } from './dto/create-job-recruitment.dto';
import { UpdateRecruitmentDto } from './dto/update-job-recruitment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobRecruitmentEntity } from 'src/database/entities/job.recruitment.entity';
import { CompanyEntity } from 'src/database/entities/company.entity';

@Injectable()
export class RecruitmentsService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyEntity: Repository<CompanyEntity>,
    @InjectRepository(JobRecruitmentEntity)
    private readonly jobRecruitmentEntity: Repository<JobRecruitmentEntity>,
  ) {}

  async create(createRecruitmentDto: CreateJobRecruitmentDto) {
    const foundCompany: CompanyEntity = await this.companyEntity.findOne({
      where: {
        id: createRecruitmentDto.company_id,
      }
    });
    if (foundCompany === null) {
      throw new NotFoundException(`company_id not found`);
    }
    const newJobRcrt: JobRecruitmentEntity = this.jobRecruitmentEntity.create({
      position: createRecruitmentDto.position,
      compensation: createRecruitmentDto.compensation,
      contents: createRecruitmentDto.contents,
      skills: createRecruitmentDto.skills,
      companyEntity: foundCompany,
    });
    const savedJobRcrt = await this.jobRecruitmentEntity.save(newJobRcrt);
    return {
      "job_recruitment_id": savedJobRcrt.id
    };
  }

  findAll() {
    return `This action returns all recruitments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recruitment`;
  }

  update(id: number, updateRecruitmentDto: UpdateRecruitmentDto) {
    return `This action updates a #${id} recruitment`;
  }

  remove(id: number) {
    return `This action removes a #${id} recruitment`;
  }
}
