export class ResponseJobRecruitmentDetailsDto {
	job_recruitment_id: number;
	company_name: string;
	nation: string;
	area: string;
	position: string;
	compensation: number;
	skills: string;
	contents: string;
	ohter_job_recruitment_ids_of_company: number[];
}