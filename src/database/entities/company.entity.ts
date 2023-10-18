import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { JobRecruitmentEntity } from "./job.recruitment.entity";

@Entity({ name: 'COMPANY' })
@Unique(['name'])
export class CompanyEntity {
	// id
	@PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
	id: number;

	// name
	@Column({ name: 'name', type: 'varchar', length: 50})
	name: string;

	// nation
	@Column({ name: 'nation', type: 'varchar'})
	nation: string;

	// area
	@Column({ name: 'area', type: 'varchar'})
	area: string;

	@OneToMany(() => JobRecruitmentEntity, (jre) => jre.companyEntity)
	jobRecruitmentEntities: JobRecruitmentEntity[];
}
