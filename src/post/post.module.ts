import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post, PostSchema } from '../post/Schema/post.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),AuthModule],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService]
})
export class PostModule {}
