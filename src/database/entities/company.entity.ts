import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'COMPANY' })
export class CompanyEntity {
	// id
	@PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
	id: number;

	// name
	@Column({ name: 'name', type: 'varchar'})
	name: string;

	// nation
	@Column({ name: 'nation', type: 'varchar'})
	nation: string;

	// area
	@Column({ name: 'area', type: 'varchar'})
	area: string;
}
