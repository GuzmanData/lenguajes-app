import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WordsService } from './words.service';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';

import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Post()
  create(@Body() createWordDto: CreateWordDto) {
    return this.wordsService.create(createWordDto);
  }

  @Get()
  findAll() {
    return this.wordsService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.wordsService.findOne(term);
  }


  @Patch(':id')
  update(@Param('id', ParseMongoIdPipe) id: string, @Body() updateWordDto: UpdateWordDto) {
    return this.wordsService.update(id, updateWordDto);
  }


  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.wordsService.remove(id);
  }

}
