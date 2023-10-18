import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobRecruitmentDto } from './dto/create-job-recruitment.dto';
import { UpdateJobRecruitmentDto } from './dto/update-job-recruitment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobRecruitmentEntity } from 'src/database/entities/job.recruitment.entity';
import { CompanyEntity } from 'src/database/entities/company.entity';
import { ResponseJobRecruitmentDto } from './dto/response-job-recruitment.dto';
import { ResponseDetailsJobRecruitmentDto } from './dto/response-details-job-recruitment.dto';

@Injectable()
export class JobRecruitmentsService {
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

  async update(id: number, updateRecruitmentDto: UpdateJobRecruitmentDto) {
    const foundRecruit = await this.jobRecruitmentEntity.findOne({
      where: {
        id: id,
      }
    });
    if (foundRecruit === null) {
      throw new NotFoundException(`job_recruitment_id not found`);
    }
    if (updateRecruitmentDto.position !== undefined) {
      foundRecruit.position = updateRecruitmentDto.position;
    }
    if (updateRecruitmentDto.compensation !== undefined) {
      foundRecruit.compensation = updateRecruitmentDto.compensation;
    }
    if (updateRecruitmentDto.contents !== undefined) {
      foundRecruit.contents = updateRecruitmentDto.contents;
    }
    if (updateRecruitmentDto.skills !== undefined) {
      foundRecruit.skills = updateRecruitmentDto.skills;
    }
    await this.jobRecruitmentEntity.save(foundRecruit);
    return ;
  }

  async remove(id: number) {
    const foundRecruit = await this.jobRecruitmentEntity.findOne({
      where: {
        id: id,
      }
    });
    if (foundRecruit === null) {
      throw new NotFoundException(`job_recruitment_id not found`);
    }
    await this.jobRecruitmentEntity.delete(foundRecruit);
    return ;
  }

  async findAll() {
    let ret: ResponseJobRecruitmentDto[] = [];
    const foundRecruits = await this.jobRecruitmentEntity.find({
      relations: {
        companyEntity: true,
      }
    });
    foundRecruits.sort((a, b) => a.id - b.id);
    for (const eachRecruit of foundRecruits) {
      ret.push({
        recruitment_id: eachRecruit.id,
        company_name: eachRecruit.companyEntity.name,
        nation: eachRecruit.companyEntity.name,
        area: eachRecruit.companyEntity.area,
        position: eachRecruit.position,
        compensation: eachRecruit.compensation,
        skills: eachRecruit.skills
      });
    }
    return ret;
  }

  async findOne(id: number) {
    let ret: ResponseDetailsJobRecruitmentDto;
    const foundRecruit = await this.jobRecruitmentEntity.findOne({
      relations: {
        companyEntity: {
          jobRecruitmentEntities: true,
        }
      },
      where: {
        id: id,
      }
    });
    let otherRecruitIds: number[] = [];
    foundRecruit.companyEntity
      .jobRecruitmentEntities.sort((a, b) => a.id - b.id);
    for (const eachRecruit 
    of foundRecruit.companyEntity.jobRecruitmentEntities) {
      if (+(eachRecruit.id) === id) continue;
      otherRecruitIds.push(+(eachRecruit.id));
    }
    ret = {
      recruitment_id: +(foundRecruit.id),
      company_name: foundRecruit.companyEntity.name,
      nation: foundRecruit.companyEntity.nation,
      area: foundRecruit.companyEntity.area,
      position: foundRecruit.position,
      compensation: foundRecruit.compensation,
      skills: foundRecruit.skills,
      contents: foundRecruit.contents,
      recruitment_ids_of_company: otherRecruitIds,
    };
    return ret;
  }
}
