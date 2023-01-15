import { Module } from '@nestjs/common';
import { WordsService } from './words.service';
import { WordsController } from './words.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Word, WordSchema } from './entities/word.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [WordsController],
  providers: [WordsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Word.name,
        schema: WordSchema,
      },
    ]),
    CommonModule
  ],
  exports:[
    MongooseModule
  ]
})
export class WordsModule {}
