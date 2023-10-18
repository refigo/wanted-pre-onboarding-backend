import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { CompanyEntity } from "./company.entity";
import { UserEntity } from "./user.entity";
import { JobRecruitmentEntity } from "./job.recruitment.entity";

@Entity({ name: 'JOB_APPLICATION' })
@Unique(['userEntity', 'jobRecruitmentEntity'])
export class JobApplicationEntity {
	// id
	@PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
	id: number;

	// user_id
	@ManyToOne(() => UserEntity)
	@JoinColumn({ name: 'user_id' })
	userEntity: UserEntity;

	// job_recruitment_id
	@ManyToOne(() => JobRecruitmentEntity)
	@JoinColumn({ name: 'job_recruitment_id' })
	jobRecruitmentEntity: JobRecruitmentEntity;
}
