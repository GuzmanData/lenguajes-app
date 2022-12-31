import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
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

  findOne(id: number) {
    return `This action returns a #${id} word`;
  }

  update(id: number, updateWordDto: UpdateWordDto) {
    return `This action updates a #${id} word`;
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
