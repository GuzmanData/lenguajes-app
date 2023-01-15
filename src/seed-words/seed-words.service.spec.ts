import { Test, TestingModule } from '@nestjs/testing';
import { SeedWordsService } from './seed-words.service';

describe('SeedWordsService', () => {
  let service: SeedWordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeedWordsService],
    }).compile();

    service = module.get<SeedWordsService>(SeedWordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
