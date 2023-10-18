import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateJobRecruitmentDto {
	@IsNotEmpty()
	@IsInt()
	company_id: number;

	@IsNotEmpty()
	@IsString()
	position: string;

	@IsNotEmpty()
	@IsInt()
	@Min(0)
	compensation: number;

	@IsNotEmpty()
	@IsString()
	contents: string;

	@IsNotEmpty()
	@IsString()
	skills: string;
}
