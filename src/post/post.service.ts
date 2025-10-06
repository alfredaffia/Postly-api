import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './Schema/post.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async create(createPostDto: CreatePostDto, userId: string): Promise<Post> {
    const newPost= await this.postModel.create({ ...createPostDto, author: new Types.ObjectId(userId) });
    return newPost;
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find().populate('author', 'email');
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postModel.findById(id).populate('author', 'email');
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto, userId: string): Promise<Post> {
    const post = await this.postModel.findById(id);
    if (!post) throw new NotFoundException('Post not found');
 if (post.author?.toString() !== userId.toString()) {
  throw new ForbiddenException('Not allowed');
}
    Object.assign(post, updatePostDto);
    return post.save();
  }

async remove(id: string, user: any): Promise<{ message: string }> {
  const post = await this.postModel.findById(id);
  if (!post) throw new NotFoundException('Post not found');

   if (post.author.toString() !== user._id.toString() && user.role !== 'admin') {
    throw new ForbiddenException('You are not allowed to delete this post');
  }

  await post.deleteOne();
  return { message: 'Post deleted successfully' };
}
}
