import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {


  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,

  ) {

  }

  async create(createCategoryDto: CreateCategoryDto) {
    try {

      //  const existCategory = await this.categoryModel.find({ category: createCategoryDto.category })

      createCategoryDto.category = createCategoryDto.category.toUpperCase()


      const category = await this.categoryModel.create(createCategoryDto);

      return category;
    } catch (error) {

      this.handleExceptions(error);

    }
  }

  async findAll() {
    return await this.categoryModel.find().select(
      "category"
    );
  }

  async findOne(term: string) {


    let category: Category[];

    if (isValidObjectId(term)) {
      category = await this.categoryModel.findById(term);
    }

    const termToFind = term.toUpperCase()

    if (!category) {
      category = await this.categoryModel.find({
        category: { $regex: '.*' + termToFind + '.*' }
      }).select("category")
    }


    // if (!category) {

    //   return [];
    // }

  
    return category;


  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }


  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Category exists in db ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create category - Check server logs`);
  }
}
