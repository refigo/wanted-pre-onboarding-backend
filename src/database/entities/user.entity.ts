import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'COMPANY' })
export class UserEntity {
	// id
	@PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
	id: number;

	// name
	@Column({ name: 'name', type: 'varchar'})
	name: string;
}
