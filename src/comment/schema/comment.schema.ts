import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Comment extends Document {
  @Prop({ required: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Post', required: true })
  post: Types.ObjectId;

 @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null })
  replyTo?: Comment | null;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
