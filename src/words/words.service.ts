import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { Word } from './entities/word.entity';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class WordsService {

  constructor(
    @InjectModel(Word.name)
    private readonly wordModel: Model<Word>,
  ) {

  }
  async create(createWordDto: CreateWordDto) {


    if (!createWordDto.img) createWordDto.img = "https://res.cloudinary.com/dvmpfgqrs/image/upload/v1624291404/words/img/no-imagen_ipdhsx.jpg";


    if (!createWordDto.audio) createWordDto.audio = "PENDING";

    createWordDto.word = createWordDto.word.toLocaleLowerCase();
    createWordDto.wordSpanish = createWordDto.wordSpanish.toLocaleLowerCase();
    createWordDto.lenguajes = createWordDto.lenguajes.toLocaleLowerCase();
    try {
      const word = await this.wordModel.create(createWordDto);
      return word;

    } catch (error) {

      this.handleExceptions(error);

    }

  }

  findAll() {
    return this.wordModel.find();
  }

 async findOne(term: string) {
    
    let word: Word;


    // MongoID
    if ( isValidObjectId( term ) ) {
      word = await this.wordModel.findById( term );
    }

    // Word
    if ( !word ) {


      word = await this.wordModel.findOne({ word: { $regex: '.*' + term + '.*' } })
    }


    if ( !word ) 
      throw new NotFoundException(`Word with id or word "${ term }" not found`);
    

    return word;
  }


  async update(id: string, updateWordDto: UpdateWordDto) {
    const word = await this.wordModel.findById(id);

    if(updateWordDto.word ) {
      updateWordDto.word = updateWordDto.word.toLocaleLowerCase();
    }

    if(updateWordDto.wordSpanish ) {
      updateWordDto.wordSpanish = updateWordDto.wordSpanish.toLocaleLowerCase();
    }

    if(updateWordDto.lenguajes ) {
      updateWordDto.lenguajes = updateWordDto.lenguajes.toLocaleLowerCase();
    }

    
    try {
      await word.updateOne( updateWordDto );
      return { ...word.toJSON(), ...updateWordDto };
      
    } catch (error) {
      this.handleExceptions( error );
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.wordModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new BadRequestException(`Word with id "${id}" not found`);

    }

    return `Word with id ${id} was remove`;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Word exists in db ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create word - Check server logs`);
  }

}
