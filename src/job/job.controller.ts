import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { JobRecruitmentsService } from './recruitments/job-recruitments.service';
import { CreateJobRecruitmentDto } from './recruitments/dto/create-job-recruitment.dto';
import { UpdateJobRecruitmentDto } from './recruitments/dto/update-job-recruitment.dto';
import { JobApplicationsService } from './applications/job-applications.service';
import { CreateJobApplicationDto } from './applications/dto/create-application.dto';

@Controller('job')
export class JobController {
  constructor(
    private readonly recruitService: JobRecruitmentsService,
    private readonly applicService: JobApplicationsService
    ) {}

  @Post('/recruitments')
  async createRecruitment(
  @Body() createRecruitDto: CreateJobRecruitmentDto) {
    return await this.recruitService.create(createRecruitDto);
  }

  @Patch('/recruitments/:id')
  async updateRecruitment(
  @Param('id') id: string, 
  @Body() updateRecruitDto: UpdateJobRecruitmentDto) {
    return await this.recruitService.update(+id, updateRecruitDto);
  }

  @Delete('/recruitments/:id')
  async removeRecruitment(@Param('id') id: string) {
    return await this.recruitService.remove(+id);
  }


  @Get('/recruitments')
  async findOneRecruitments(@Query('search') search?: string) {
    if (search) {
      return await this.recruitService.findBySearchTerm(search);
    } else {
      return await this.recruitService.findAll();
    } 
  }

  @Get('/recruitments/:id/details')
  async findOneRecruitmentDetails(@Param('id') id: string) {
    return await this.recruitService.findOneDetails(+id);
  }

  @Post('/applications')
  async createApplication(@Body() createApplicDto: CreateJobApplicationDto) {
    return await this.applicService.create(createApplicDto);
  }
}
