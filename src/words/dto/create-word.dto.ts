import { IsInt, IsPositive, IsString, Min, MinLength, IsArray, IsIn } from 'class-validator';

export class CreateWordDto {


    @MinLength(2)
    word: string;
    @MinLength(2)
    wordSpanish: string;
    @MinLength(1)
    lenguajes: string;

    @IsArray()
    category: string;
    img?: string;
    audio?: string;

    @MinLength(1)
    level: string;
}


