import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { JobApplicationEntity } from "./job.application.entity";

@Entity({ name: 'USER' })
export class UserEntity {
	// id
	@PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
	id: number;

	// name
	@Column({ name: 'name', type: 'varchar', length: 50})
	name: string;

	@OneToMany(() => JobApplicationEntity, (jae) => jae.userEntity)
	jobApplicationEntities: JobApplicationEntity[];
}
