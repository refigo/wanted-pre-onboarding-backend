import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CompanyEntity } from "./company.entity";

@Entity({ name: 'JOB_RECRUITMENT' })
export class JobRecruitmentEntity {
	// id
	@PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
	id: number;

	// position
	@Column({ name: 'position', type: 'varchar'})
	position: string;
	
	// compensation
	@Column({ name: 'compensation', type: 'integer'})
	compensation: number;

	// contents
	@Column({ name: 'contents', type: 'varchar'})
	contents: string;

	// skills
	@Column({ name: 'skills', type: 'varchar'})
	skills: string;

	// company_id
	@ManyToOne(() => CompanyEntity)
	@JoinColumn({ name: 'company_id' })
	companyEntity: CompanyEntity;
}
