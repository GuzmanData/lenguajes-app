import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Word extends Document {

    @Prop({
    })
    word: string;
    @Prop({
    })
    wordSpanish: string;

    @Prop({
        index: true,
    })
    lenguajes: string;


    @Prop({
    })
    category: [string]

    @Prop({
    })
    img?: string;

    @Prop({
    })
    audio?: string;



}

export const WordSchema = SchemaFactory.createForClass(Word);
