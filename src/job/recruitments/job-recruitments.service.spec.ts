import { Test, TestingModule } from '@nestjs/testing';
import { JobRecruitmentsService } from './job-recruitments.service';

describe('RecruitmentsService', () => {
  let service: JobRecruitmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobRecruitmentsService],
    }).compile();

    service = module.get<JobRecruitmentsService>(JobRecruitmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
