import { Test, TestingModule } from '@nestjs/testing';
import { GlobalGallaryResolver } from './global-gallary.resolver';
import { GlobalGallaryService } from './global-gallary.service';

describe('GlobalGallaryResolver', () => {
  let resolver: GlobalGallaryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GlobalGallaryResolver, GlobalGallaryService],
    }).compile();

    resolver = module.get<GlobalGallaryResolver>(GlobalGallaryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
