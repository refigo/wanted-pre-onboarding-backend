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
```
{
	"job_recruitment_id": number,
	"user_id": number
}
```

#### Response
- 성공: 201 Created
- 실패
  - 400 Bad Request (Body 정보 누락)
  - 404 Not Found
    - (recruitment_id not found)
    - (user_id not found)

## 구현 과정
