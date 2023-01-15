import { Module } from '@nestjs/common';
import { SeedWordsService } from './seed-words.service';
import { SeedWordsController } from './seed-words.controller';
import { WordsModule } from 'src/words/words.module';
import { CommonModule } from '../common/common.module';

@Module({
  controllers: [SeedWordsController],
  providers: [SeedWordsService],
  imports: [ 
    WordsModule,
    CommonModule
   ]
})
export class SeedWordsModule {}
