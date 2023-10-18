import { PartialType } from '@nestjs/mapped-types';
import { CreateJobRecruitmentDto } from './create-job-recruitment.dto';

export class UpdateJobRecruitmentDto extends PartialType(CreateJobRecruitmentDto) {}
