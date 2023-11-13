import { Test, TestingModule } from '@nestjs/testing';
import { GlobalGallaryService } from './global-gallary.service';

describe('GlobalGallaryService', () => {
  let service: GlobalGallaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GlobalGallaryService],
    }).compile();

    service = module.get<GlobalGallaryService>(GlobalGallaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
