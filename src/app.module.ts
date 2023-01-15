import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WordsModule } from './words/words.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { CategoryModule } from './category/category.module';
import { SeedWordsModule } from './seed-words/seed-words.module';
import { urlDB } from './constans';


@Module({
  imports: [
    MongooseModule.forRoot(urlDB),
    WordsModule,
    CommonModule,
    CategoryModule,
    SeedWordsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
