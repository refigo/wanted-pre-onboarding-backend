import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

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
}
