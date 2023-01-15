import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeedWordsService } from './seed-words.service';


@Controller('seed-words')
export class SeedWordsController {
  constructor(private readonly seedWordsService: SeedWordsService) {}


  @Get()
  excuteSeedWords() {
    return this.seedWordsService.excuteSeedWords();
  }


}
