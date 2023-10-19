## 기술 정보
- 언어 및 프레임워크: Node.js & NestJS
- ORM: TypeORM
- RDBMS: PostgreSQL

## 관계형 데이터 모델링

![Alt text](./docs/images/erd_modeling.png)

- ERD Cloud Link: https://www.erdcloud.com/d/MEq9L3KrcRKmm2tBH

## 환경 설정

- 의존성 패키지 설치
```bash
$ npm install
```

- .env 파일 설정 (.env.example 참고)
```.env
DB_HOST=
DB_PORT=
DB_USER=
DB_PASS=
DB_NAME=
```

- PostgreSQL 설치 및 실행

위 환경변수와 맞춰서 데이터베이스 설정


## 실행 방법

- 서버 실행
```bash
$ npm run start
```


- 개발 모드로 실행
```bash
$ npm run start:dev
```

## 요구 사항 분석

### 채용공고 등록

#### Request
- REST API: `POST /job/recruitments`
- Body
```
{
	"company_id": number,
	"position": string,
	"compensation": number,
	"contents": string,
	"skills": string
}
```
#### Response
- 성공: 201 Created
- 반환 데이터 형식
```
{
  "job_recruitment_id": number
}
```

- 실패
  - 400 Bad Request (Body 정보 누락)
  - 404 Not Found (company_id not found)

### 채용공고 수정

#### Request
- REST API: `PATCH /job/recruitments/:id`
- Body
```
{
	"position": string,
	"compensation": number,
	"contents": string,
	"skills": string	
}
```
#### Response
- 성공: 200 OK
- 실패: 404 Not Found (job_recruitment_id not found)

### 채용공고 삭제

#### Request
- REST API: `DELETE /job/recruitments/:id`

#### Response
- 성공: 200 OK
- 실패: 404 Not Found (job_recruitment_id not found)

### 채용공고 목록 가져오기

#### Request
- REST API: `GET /job/recruitments`

#### Response
- 성공: 200 OK
- 반환 데이터 형식
```
[
	{
		"job_recruitment_id": number,
		"company_name": string,
		"nation": string,
		"area": string,
		"position": string,
		"compensation": number,
		"skills": string
	},
	{
		"job_recruitment_id": number,
		"company_name": string,
		"nation": string,
		"area": string,
		"position": string,
		"compensation": number,
		"skills": string
	},
	...
]
```

### 채용공고 검색 기능

#### Request
- REST API: `GET /job/recruitments?search=${string}`

#### Response
- 성공: 200 OK
- 반환 데이터 형식
```
[
	{
		"job_recruitment_id": number,
		"company_name": string,
		"nation": string,
		"area": string,
		"position": string,
		"compensation": number,
		"skills": string
	},
	{
		"job_recruitment_id": number,
		"company_name": string,
		"nation": string,
		"area": string,
		"position": string,
		"compensation": number,
		"skills": string
	},
	...
]
```

### 채용 상세 페이지 가져오기

#### Request
- REST API: `GET /job/recruitments/:id/details`

#### Response
- 성공: 200 OK
- 반환 데이터 형식
```
{
	"job_recruitment_id": number,
	"company_name": string,
	"nation": string,
	"area": string,
	"position": string,
	"compensation": number,
	"skills": string,
	"contents": string,
	"ohter_job_recruitment_ids_of_company": [number, number, ...]
}
```
- 실패: 404 Not Found (job_recruitment_id not found)

### 사용자가 채용공고 지원하기

#### Request
- REST API: `POST /job/applications`
- Body
```
{
	"job_recruitment_id": number,
	"user_id": number
}
```

#### Response
- 성공: 201 Created
- 반환 데이터 형식
```
{
  "job_application_id": number
}
```
- 실패
  - 400 Bad Request
    - Body 정보 누락
    - already created
  - 404 Not Found
    - recruitment_id not found
    - user_id not found

## 구현 과정

### `POST /job/recruitments`

- `CreateJobRecruitmentDto` 정의
	- Data Validation 적용
```ts
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
```

- 비즈니스 로직 코드 - `JobRecruitmentService.create()`
```ts
  async create(createRecruitmentDto: CreateJobRecruitmentDto) {
    const foundCompany: CompanyEntity = await this.companyEntity.findOne({
      where: {
        id: createRecruitmentDto.company_id,
      }
    });
    if (foundCompany === null) {
      throw new NotFoundException(`company_id not found`);
    }
    const newJobRcrt: JobRecruitmentEntity = this.jobRecruitmentEntity.create({
      position: createRecruitmentDto.position,
      compensation: createRecruitmentDto.compensation,
      contents: createRecruitmentDto.contents,
      skills: createRecruitmentDto.skills,
      companyEntity: foundCompany,
    });
    const savedJobRcrt = await this.jobRecruitmentEntity.save(newJobRcrt);
    return {
      "job_recruitment_id": +(savedJobRcrt.id)
    };
  }
```

### `PATCH /job/recruitments/:id`


- `CreateJobRecruitmentDto` 정의
```ts
export class UpdateJobRecruitmentDto extends PartialType(CreateJobRecruitmentDto) {}
```

- 비즈니스 로직 코드 - `JobRecruitmentService.update()`
```ts
  async update(id: number, updateRecruitmentDto: UpdateJobRecruitmentDto) {
    const foundRecruit = await this.jobRecruitmentEntity.findOne({
      where: {
        id: id,
      }
    });
    if (foundRecruit === null) {
      throw new NotFoundException(`job_recruitment_id not found`);
    }
    if (updateRecruitmentDto.position !== undefined) {
      foundRecruit.position = updateRecruitmentDto.position;
    }
    if (updateRecruitmentDto.compensation !== undefined) {
      foundRecruit.compensation = updateRecruitmentDto.compensation;
    }
    if (updateRecruitmentDto.contents !== undefined) {
      foundRecruit.contents = updateRecruitmentDto.contents;
    }
    if (updateRecruitmentDto.skills !== undefined) {
      foundRecruit.skills = updateRecruitmentDto.skills;
    }
    await this.jobRecruitmentEntity.save(foundRecruit);
    return ;
  }
```

### `DELETE /job/recruitments/:id`

- 비즈니스 로직 코드 - `JobRecruitmentService.delete()`
```ts
  async remove(id: number) {
    const foundRecruit = await this.jobRecruitmentEntity.findOne({
      where: {
        id: id,
      }
    });
    if (foundRecruit === null) {
      throw new NotFoundException(`job_recruitment_id not found`);
    }
    await this.jobRecruitmentEntity.delete(foundRecruit);
    return ;
  }
```

### `GET /job/recruitments`

- `ResponseJobRecruitmentDto` 정의
```ts
export class ResponseJobRecruitmentDto {
	recruitment_id: number;
	company_name: string;
	nation: string;
	area: string;
	position: string;
	compensation: number;
	skills: string;
}
```

- 비즈니스 로직 코드 - `JobRecruitmentService.findAll()`
```ts
  async findAll() {
    const ret: ResponseJobRecruitmentDto[] = [];
    const foundRecruits = await this.jobRecruitmentEntity.find({
      relations: {
        companyEntity: true,
      }
    });
    foundRecruits.sort((a, b) => a.id - b.id);
    for (const eachRecruit of foundRecruits) {
      ret.push({
        recruitment_id: +(eachRecruit.id),
        company_name: eachRecruit.companyEntity.name,
        nation: eachRecruit.companyEntity.name,
        area: eachRecruit.companyEntity.area,
        position: eachRecruit.position,
        compensation: eachRecruit.compensation,
        skills: eachRecruit.skills
      });
    }
    return ret;
  }
```

### `GET /job/recruitments?search=${string}`

- 비즈니스 로직 코드 - `JobRecruitmentService.findBySearchTerm()`
```ts
  async findBySearchTerm(search: string) {
    let ret: ResponseJobRecruitmentDto[] = [];
    const foundRecruits: JobRecruitmentEntity[] 
    = await this.jobRecruitmentEntity.find({
      where: [
        { position: Like(`%${search}%`) },
        { contents: Like(`%${search}%`) },
        { skills: Like(`%${search}%`) },
        {
          companyEntity: [
            { name: Like(`%${search}%`) },
            { nation: Like(`%${search}%`) },
            { area: Like(`%${search}%`) }
          ]
        }
      ],
      relations: {
        companyEntity: true
      }
    });
    foundRecruits.sort((a, b) => a.id - b.id);
    for (const eachRecruit of foundRecruits) {
      ret.push({
        job_recruitment_id: +(eachRecruit.id),
        company_name: eachRecruit.companyEntity.name,
        nation: eachRecruit.companyEntity.name,
        area: eachRecruit.companyEntity.area,
        position: eachRecruit.position,
        compensation: eachRecruit.compensation,
        skills: eachRecruit.skills
      });
    }
    return ret;
  }
```

### `GET /job/recruitments/:id/details`

- `ResponseJobRecruitmentDetailsDto` 정의
```ts
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
```

- 비즈니스 로직 코드 - `JobRecruitmentService.findOneDetails`
```ts
  async findOneDetails(id: number) {
    let ret: ResponseJobRecruitmentDetailsDto;
    const foundRecruit: JobRecruitmentEntity 
    = await this.jobRecruitmentEntity.findOne({
      relations: {
        companyEntity: {
          jobRecruitmentEntities: true,
        }
      },
      where: {
        id: id,
      }
    });
    let otherRecruitIds: number[] = [];
    foundRecruit.companyEntity
      .jobRecruitmentEntities.sort((a, b) => a.id - b.id);
    for (const eachRecruit 
    of foundRecruit.companyEntity.jobRecruitmentEntities) {
      if (+(eachRecruit.id) === id) continue;
      otherRecruitIds.push(+(eachRecruit.id));
    }
    ret = {
      job_recruitment_id: +(foundRecruit.id),
      company_name: foundRecruit.companyEntity.name,
      nation: foundRecruit.companyEntity.nation,
      area: foundRecruit.companyEntity.area,
      position: foundRecruit.position,
      compensation: foundRecruit.compensation,
      skills: foundRecruit.skills,
      contents: foundRecruit.contents,
      ohter_job_recruitment_ids_of_company: otherRecruitIds,
    };
    return ret;
  }
```

### `POST /job/applications`

- `CreateJobApplicationDto` 정의
```ts
import { IsInt, IsNotEmpty } from "class-validator";

export class CreateJobApplicationDto {
	@IsNotEmpty()
	@IsInt()
	"job_recruitment_id": number;

	@IsNotEmpty()
	@IsInt()
	"user_id": number;
}
```

- 비즈니스 로직 코드 - `JobApplicationService.create()`
```ts
  async create(createApplicationDto: CreateJobApplicationDto) {
    const foundJobRecruit 
    = await this.jobRecruitmentEntity.findOne({
      where: {
        id: createApplicationDto.job_recruitment_id
      }
    });
    if (foundJobRecruit === null) {
      throw new NotFoundException(`job_recruitment_id not found`);
    }
    const foundUser
    = await this.userEntity.findOne({
      where: {
        id: createApplicationDto.user_id
      }
    });
    if (foundUser === null) {
      throw new NotFoundException(`user_id not found`);
    }
    const foundAlreadyApplic 
    = await this.jobApplicationEntity.findOne({
      where: {
        userEntity: foundUser,
        jobRecruitmentEntity: foundJobRecruit
      }
    });
    if (foundAlreadyApplic !== null) {
      throw new BadRequestException(`already created`);
    }
    const savedApplic 
    = await this.jobApplicationEntity.save(
        this.jobApplicationEntity.create({
      userEntity: foundUser,
      jobRecruitmentEntity: foundJobRecruit
    }));
    return {
      "job_application_id": +(savedApplic.id)
    };
  }
```
