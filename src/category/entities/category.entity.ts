import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';




export class Category extends Document {

    @Prop({
        unique: true,
        index: true,
    })
    category: string;


}

export const CategorySchema = SchemaFactory.createForClass(Category);

