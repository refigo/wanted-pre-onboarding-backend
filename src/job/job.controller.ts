import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { RecruitmentsService } from './recruitments/recruitments.service';
import { CreateJobRecruitmentDto } from './recruitments/dto/create-job-recruitment.dto';
import { UpdateJobRecruitmentDto } from './recruitments/dto/update-job-recruitment.dto';

@Controller('job')
export class JobController {
  constructor(
    private readonly jobService: JobService,
    private readonly recruitService: RecruitmentsService
    ) {}

  @Post('/recruitments')
  async createRecruitment(
  @Body() createRecruitDto: CreateJobRecruitmentDto) {
    return await this.recruitService.create(createRecruitDto);
  }

  @Patch('/recruitments/:id')
  async updateRecruitment(
  @Param('id') id: string, 
  @Body() updateJobDto: UpdateJobRecruitmentDto) {
    return await this.recruitService.update(+id, updateJobDto);
  }

  @Delete('/recruitments/:id')
  async removeRecruitment(@Param('id') id: string) {
    return await this.recruitService.remove(+id);
  }

  @Get('/recruitments')
  async findAllRecruitments() {
    return await this.recruitService.findAll();
  }

  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobService.create(createJobDto);
  }

  @Get()
  findAll() {
    return this.jobService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobService.update(+id, updateJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobService.remove(+id);
  }
}
