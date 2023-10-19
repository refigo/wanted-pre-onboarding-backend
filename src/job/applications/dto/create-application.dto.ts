import { IsInt, IsNotEmpty } from "class-validator";

export class CreateJobApplicationDto {
	@IsNotEmpty()
	@IsInt()
	"job_recruitment_id": number;

	@IsNotEmpty()
	@IsInt()
	"user_id": number;
}
