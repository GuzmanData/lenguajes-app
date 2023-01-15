import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Word } from 'src/words/entities/word.entity';
import { SeedWordDummy } from './constans';


@Injectable()
export class SeedWordsService {

  constructor(
    @InjectModel(Word.name)
    private readonly wordsModel: Model<Word>

  ) {

  }


  async excuteSeedWords() {

    await this.wordsModel.deleteMany({})


    await this.wordsModel.insertMany(SeedWordDummy)
    return  'Seed Words Executed';
  }


}
